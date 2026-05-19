import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar({ navigate, activePage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['home', 'services', 'team', 'contact'];

  const handleGetStarted = () => {
    navigate('contact');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div className="logo" onClick={() => navigate('home')}>
          <span className="logo-mark">N</span>
          <span className="logo-text">NexaTech</span>
        </div>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((l) => (
            <button
              key={l}
              className={`nav-link ${activePage === l ? 'active' : ''}`}
              onClick={() => { navigate(l); setMenuOpen(false); }}
            >
              {l.charAt(0).toUpperCase() + l.slice(1)}
            </button>
          ))}
          <button className="btn-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
