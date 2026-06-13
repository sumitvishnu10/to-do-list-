import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export default function Navbar({ todoCount, completedCount }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <div className="nav-logo-icon">T</div>
        <span className="nav-logo-text">TaskFlow</span>
      </Link>

      <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          onClick={() => setMobileOpen(false)}>
          Dashboard
        </NavLink>
      </div>

      <div className="nav-right">
        <div className="nav-stat" title="Total tasks">
          📝 Tasks: <strong>{todoCount ?? '—'}</strong>
        </div>
        <div className="nav-stat" title="Completed tasks">
          ✅ Done: <strong>{completedCount ?? '—'}</strong>
        </div>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label="Toggle dark mode"
          id="theme-toggle-btn"
        >
          <div className="theme-toggle-knob">
            {theme === 'light' ? '☀️' : '🌙'}
          </div>
        </button>

        <button
          className="nav-hamburger"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
