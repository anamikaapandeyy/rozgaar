import { Link } from 'react-router-dom';
import { interests, skills } from '../data/quizOptions';
import labelFor from '../utils/labelFor';
import './CareerCard.css';

export default function CareerCard({ career }) {
  const { title, slug, category, summary, salary, matchPercent, matchedInterests, matchedSkills } = career;

  const reasons = [
    ...matchedInterests.map((id) => labelFor(interests, id)),
    ...matchedSkills.map((id) => labelFor(skills, id)),
  ];

  return (
    <article className="career-card">
      <div className="career-card-top">
        <span className="career-category">{category}</span>
        <span className="career-match">{matchPercent}% match</span>
      </div>

      <h3><Link to={`/career/${slug}`}>{title}</Link></h3>
      <p className="career-summary">{summary}</p>

      <div
        className="match-bar"
        role="progressbar"
        aria-label={`${matchPercent}% match`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={matchPercent}
      >
        <div className="match-bar-fill" style={{ width: `${matchPercent}%` }} />
      </div>

      {reasons.length > 0 && (
        <p className="career-why">
          <strong>Why it matched:</strong> {reasons.join(', ')}
        </p>
      )}

      <p className="career-salary">₹{salary.min}–{salary.max} LPA</p>
    </article>
  );
}