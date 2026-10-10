import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { stages, interests, skills } from '../data/quizOptions';
import Button from '../components/Button';
import './Quiz.css';

const TOTAL_STEPS = 3;

export default function Quiz() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const { answers, setAnswers } = useQuiz();
  const navigate = useNavigate();

  function chooseStage(id) {
    setAnswers({ ...answers, stage: id });
    setError('');
  }

  function toggle(field, id) {
    const current = answers[field];
    const updated = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setAnswers({ ...answers, [field]: updated });
    setError('');
  }

  function isStepValid() {
    if (step === 1) return answers.stage !== '';
    if (step === 2) return answers.interests.length > 0;
    return answers.skills.length > 0;
  }

  function next() {
    if (!isStepValid()) {
      setError('Please choose at least one option to continue.');
      return;
    }
    if (step < TOTAL_STEPS) setStep(step + 1);
    else navigate('/results');
  }

  function back() {
    setError('');
    setStep(step - 1);
  }

  const percent = (step / TOTAL_STEPS) * 100;

  return (
    <section className="container quiz">
      <p className="quiz-count">Step {step} of {TOTAL_STEPS}</p>
      <div
        className="progress"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent}
      >
        <div className="progress-bar" style={{ width: `${percent}%` }} />
      </div>

      {step === 1 && (
        <fieldset>
          <legend>Where are you right now?</legend>
          {stages.map((s) => (
            <label key={s.id} className="option">
              <input
                type="radio"
                name="stage"
                checked={answers.stage === s.id}
                onChange={() => chooseStage(s.id)}
              />
              {s.label}
            </label>
          ))}
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend>What are you interested in? (pick any)</legend>
          {interests.map((i) => (
            <label key={i.id} className="option">
              <input
                type="checkbox"
                checked={answers.interests.includes(i.id)}
                onChange={() => toggle('interests', i.id)}
              />
              {i.label}
            </label>
          ))}
        </fieldset>
      )}

      {step === 3 && (
        <fieldset>
          <legend>What are you good at? (pick any)</legend>
          {skills.map((s) => (
            <label key={s.id} className="option">
              <input
                type="checkbox"
                checked={answers.skills.includes(s.id)}
                onChange={() => toggle('skills', s.id)}
              />
              {s.label}
            </label>
          ))}
        </fieldset>
      )}

      {error && <p className="quiz-error" role="alert">{error}</p>}

      <div className="quiz-actions">
        {step > 1 && <Button variant="outline" onClick={back}>Back</Button>}
        <Button onClick={next}>{step === TOTAL_STEPS ? 'See my matches' : 'Next'}</Button>
      </div>
    </section>
  );
}