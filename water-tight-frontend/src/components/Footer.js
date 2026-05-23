import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {
  // Use your actual Render backend URL
  const BACKEND_URL = 'https://nexatech-backend-qeti.onrender.com';

  const handleAdminClick = () => {
    window.open(`${BACKEND_URL}/admin/`, '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <button className="logo" onClick={() => navigate('home')} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
              <span className="logo-mark">N</span>
              <span className="logo-text">NexaTech</span>
            </button>
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
            <button onClick={() => alert('Privacy policy coming soon')}>Privacy Policy</button>
            <button onClick={() => alert('Terms of service coming soon')}>Terms of Service</button>
          </div>
          <div className="footer-links">
            <h4>Admin</h4>
            <button onClick={handleAdminClick}>Admin Login</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 NexaTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
