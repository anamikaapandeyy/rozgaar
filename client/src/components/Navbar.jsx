import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label="Main">
        <Link to="/" className="logo" onClick={close}>Rozgaar</Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="nav-links"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <ul id="nav-links" className={`nav-links ${open ? 'open' : ''}`}>
          <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
          <li><NavLink to="/quiz" onClick={close}>Take the Quiz</NavLink></li>
          <li><NavLink to="/browse" onClick={close}>Browse</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}