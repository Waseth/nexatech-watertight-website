import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" onClick={() => navigate('home')} style={{ cursor: 'pointer' }}>
              <span className="logo-mark">N</span>
              <span className="logo-text">NexaTech</span>
            </div>
            <p>Powering tomorrow's enterprises with cutting-edge technology solutions.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <button onClick={() => navigate('services')}>Services</button>
            <button onClick={() => navigate('team')}>Team</button>
            <button onClick={() => navigate('contact')}>Contact</button>
          </div>
          <div className="footer-links">
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
          <div className="footer-links">
            <h4>Admin</h4>
            <a href="http://localhost:8000/admin/" target="_blank" rel="noopener noreferrer">Admin Login</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NexaTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
