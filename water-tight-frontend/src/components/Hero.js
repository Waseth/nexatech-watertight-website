import React from 'react';
import './Hero.css';

export default function Hero({ navigate }) {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="grid-lines" />
      </div>
      <div className="container hero-content">
        <div className="hero-badge">🚀 Nairobi's #1 Tech Partner</div>
        <h1 className="hero-title">
          Powering<br />
          <span className="gradient-text">Tomorrow's</span><br />
          Enterprises
        </h1>
        <p className="hero-sub">
          NexaTech delivers cutting-edge cloud, security, and AI solutions
          to ambitious businesses across East Africa and beyond.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate('services')}>
            Explore Services
          </button>
          <button className="btn-ghost" onClick={() => navigate('contact')}>
            Talk to Us →
          </button>
        </div>
        <div className="hero-stats">
          {[['150+', 'Clients Served'], ['99.9%', 'Uptime SLA'], ['24/7', 'Support']].map(([n, l]) => (
            <div className="stat" key={l}>
              <span className="stat-num">{n}</span>
              <span className="stat-label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
