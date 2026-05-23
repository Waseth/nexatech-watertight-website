import React from 'react';
import './Footer.css';

export default function Footer({ navigate }) {

  const getBackendUrl = () => {
    if (process.env.NODE_ENV === 'production') {
      return 'https://nexatech-backend-qeti.onrender.com';
    }
    return 'http://localhost:8000';
  };

  const handleAdminClick = () => {
    const adminUrl = `${getBackendUrl()}/admin/`;
    window.open(adminUrl, '_blank');
  };

  const handlePrivacyClick = () => {
    alert('Privacy policy coming soon');
  };

  const handleTermsClick = () => {
    alert('Terms of service coming soon');
  };

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
            <button onClick={handlePrivacyClick}>Privacy Policy</button>
            <button onClick={handleTermsClick}>Terms of Service</button>
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
