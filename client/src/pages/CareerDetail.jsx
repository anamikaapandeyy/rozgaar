import { useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCareerBySlug } from '../api/careers';
import useFetch from '../hooks/useFetch';
import './CareerDetail.css';

export default function CareerDetail() {
  const { slug } = useParams();
  const fetchCareer = useCallback(() => getCareerBySlug(slug), [slug]);
  const { data: career, loading, error } = useFetch(fetchCareer);

  if (loading) {
    return (
      <section className="container detail" role="status" aria-busy="true">
        <span className="sr-only">Loading career…</span>
        <div className="detail-skeleton" />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container detail" role="alert">
        <h1>Career not found</h1>
        <p>{error.message}</p>
        <Link to="/results">Back to results</Link>
      </section>
    );
  }

  return (
    <article className="container detail">
      <Link to="/results" className="back-link">← Back to results</Link>

      <header className="detail-header">
        <span className="detail-category">{career.category}</span>
        <h1>{career.title}</h1>
        <p className="detail-summary">{career.summary}</p>
        <p className="detail-salary">
          Typical salary in India: ₹{career.salary.min}–{career.salary.max} LPA
        </p>
      </header>

      <section aria-labelledby="roadmap-title">
        <h2 id="roadmap-title">Your roadmap</h2>
        <ol className="timeline">
          {career.roadmap.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <span className="timeline-duration">{step.duration}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="expect-title">
        <h2 id="expect-title">What to expect</h2>
        <ul className="plain-list">
          {career.expect.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section aria-labelledby="exams-title">
        <h2 id="exams-title">Exams and entry</h2>
        <ul className="plain-list">
          {career.exams.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section aria-labelledby="resources-title">
        <h2 id="resources-title">Free resources</h2>
        <ul className="plain-list">
          {career.resources.map((r) => (
            <li key={r.url}>
              <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="companies-title">
        <h2 id="companies-title">Who hires</h2>
        <ul className="detail-chips">
          {career.companies.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </section>
    </article>
  );
}