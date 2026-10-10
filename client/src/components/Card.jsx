import './Card.css';

export default function Card({ icon, title, children }) {
  return (
    <article className="card">
      {icon && <span className="card-icon" aria-hidden="true">{icon}</span>}
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}