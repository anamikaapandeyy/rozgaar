import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCareers } from '../api/careers';
import useFetch from '../hooks/useFetch';
import usePageTitle from '../hooks/usePageTitle';
import useDebounce from '../hooks/useDebounce';
import './Browse.css';

const categories = [
  'Technology', 'Design', 'Business', 'Finance', 'Healthcare',
  'Education', 'Law', 'Public Service', 'Media',
];

export default function Browse() {
  usePageTitle('Browse careers');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const debouncedQuery = useDebounce(query);

  const fetchList = useCallback(
    () => getCareers({ q: debouncedQuery, category }),
    [debouncedQuery, category]
  );
  const { data: careers, loading, error } = useFetch(fetchList);

  return (
    <section className="container browse">
      <h1>Browse careers</h1>

      <div className="browse-filters">
        <label>
          <span className="sr-only">Search careers</span>
          <input
            type="search"
            placeholder="Search careers, e.g. data"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <label>
          <span className="sr-only">Filter by category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <p className="browse-count" aria-live="polite">
        {careers ? `${careers.length} careers` : 'Loading…'}
      </p>

      {error && <p role="alert" className="browse-error">Couldn't load careers: {error.message}</p>}

      {loading && !careers && <div className="browse-skeleton" />}

      {careers && careers.length === 0 && <p>No careers match your search.</p>}

      {careers && careers.length > 0 && (
        <ul className="browse-list">
          {careers.map((c) => (
            <li key={c.slug}>
              <article className="browse-item">
                <span className="browse-category">{c.category}</span>
                <h2><Link to={`/career/${c.slug}`}>{c.title}</Link></h2>
                <p>{c.summary}</p>
                <p className="browse-salary">₹{c.salary.min}–{c.salary.max} LPA</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}