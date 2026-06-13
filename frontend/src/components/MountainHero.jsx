import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section" aria-label="TaskFlow hero">
      <div className="hero-content">
        <div className="hero-badge">
          ✨ <span>Premium Productivity Platform</span>
        </div>

        <h1 className="hero-title">
          Task<span className="hero-title-accent">Flow</span>
        </h1>

        <p className="hero-quote">
          Organize your tasks. Track your progress. Stay productive.
        </p>

        <div className="hero-cta">
          <Link to="/dashboard" className="btn-hero-primary" id="cta-dashboard">
            ✓ Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Explore</span>
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
