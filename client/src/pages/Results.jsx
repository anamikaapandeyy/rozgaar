import { useCallback } from 'react';
import { useQuiz } from '../context/QuizContext';
import { matchCareers } from '../api/careers';
import useFetch from '../hooks/useFetch';
import CareerCard from '../components/CareerCard';
import Button from '../components/Button';
import './Results.css';

export default function Results() {
  const { answers, reset } = useQuiz();
  const hasAnswers =
    answers.stage && answers.interests.length > 0 && answers.skills.length > 0;

  const fetchMatches = useCallback(
    () => (hasAnswers ? matchCareers(answers) : Promise.resolve([])),
    [answers, hasAnswers]
  );
  const { data: matches, loading, error } = useFetch(fetchMatches);

  if (!hasAnswers) {
    return (
      <section className="container results">
        <h1>No answers yet</h1>
        <p>Take the quiz first, and we'll match you with careers.</p>
        <Button to="/quiz">Take the quiz</Button>
      </section>
    );
  }

  return (
    <section className="container results">
      <h1>Your career matches</h1>

      {loading && (
        <div className="results-grid" role="status" aria-busy="true">
          <span className="sr-only">Finding your matches…</span>
          {[1, 2, 3].map((n) => <div key={n} className="skeleton" />)}
        </div>
      )}

      {error && (
        <div role="alert" className="results-error">
          <p>Couldn't load your matches: {error.message}</p>
          <Button onClick={() => window.location.reload()}>Try again</Button>
        </div>
      )}

      {matches && matches.length === 0 && (
        <p className="muted">No close matches yet. Try picking more interests or skills.</p>
      )}

      {matches && matches.length > 0 && (
        <div className="results-grid">
          {matches.map((career) => (
            <CareerCard key={career.slug} career={career} />
          ))}
        </div>
      )}

      <Button variant="outline" to="/quiz" onClick={reset}>Retake quiz</Button>
    </section>
  );
}