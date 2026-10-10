import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Main">
        <Link to="/" className="logo">Rozgaar</Link>
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/quiz">Take the Quiz</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}