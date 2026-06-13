import { Link } from 'react-router-dom';
import MountainHero from '../components/MountainHero';

const FEATURES = [
  {
    icon: '✓',
    title: 'Task Management',
    desc: 'Create, edit, and organize your to-dos with priorities and due dates. Stay on top of everything.',
    gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)',
    bg: 'rgba(99,102,241,0.1)',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    desc: 'See your completion stats at a glance. Track how many tasks you finish each day.',
    gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    bg: 'rgba(139,92,246,0.1)',
  },
  {
    icon: '🎯',
    title: 'Priority System',
    desc: 'Mark tasks as High, Medium, or Low priority. Focus on what matters most first.',
    gradient: 'linear-gradient(135deg, #db2777, #ec4899)',
    bg: 'rgba(236,72,153,0.1)',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    desc: 'Beautiful light and dark themes. Easy on the eyes, day or night.',
    gradient: 'linear-gradient(135deg, #059669, #10b981)',
    bg: 'rgba(16,185,129,0.1)',
  },
];

export default function Landing() {
  return (
    <div className="page page-theme-landing">
      <MountainHero />

      {/* FEATURES */}
      <section className="features-section" id="features" aria-labelledby="features-title">
        <div className="section-header">
          <div className="section-label">✨ Features</div>
          <h2 className="section-title" id="features-title">
            Everything You Need
          </h2>
          <p className="section-subtitle">
            A simple, beautiful, and powerful to-do list — built with the MERN stack.
          </p>
        </div>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div
              key={f.title}
              className="feature-card"
              style={{
                '--feature-gradient': f.gradient,
                '--feature-bg': f.bg,
              }}
            >
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="stats-strip" aria-label="Statistics">
        <div className="stats-strip-inner">
          <div className="strip-stat">
            <h3>∞</h3>
            <p>Tasks to Create</p>
          </div>
          <div className="strip-stat">
            <h3>3</h3>
            <p>Priority Levels</p>
          </div>
          <div className="strip-stat">
            <h3>🔥</h3>
            <p>Streak Tracking</p>
          </div>
          <div className="strip-stat">
            <h3>🌙</h3>
            <p>Dark Mode</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
          🚀 Get Started
        </div>
        <h2 className="section-title" id="cta-title" style={{ marginTop: 12, marginBottom: 16 }}>
          Start Managing Your Tasks
        </h2>
        <p className="section-subtitle" style={{ marginBottom: 36, margin: '0 auto 36px' }}>
          Your next achievement is just one task away. Open the dashboard and get productive.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn-hero-primary" id="cta-dashboard-bottom">
            ✓ Open Dashboard
          </Link>
        </div>
      </section>

      <footer className="footer">
        <p>✨ <strong>TaskFlow</strong> — Built with React, Node.js, Express & MongoDB.</p>
      </footer>
    </div>
  );
}
