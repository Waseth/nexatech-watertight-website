import React, { useEffect, useState } from 'react';
import './Services.css';

export default function Services({ standalone }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('/api/services/')
      .then((r) => r.json())
      .then((data) => { setServices(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <section className="services" id="services" style={standalone ? { paddingTop: 120 } : {}}>
        <div className="container">
          <p className="section-label">What We Do</p>
          <h2 className="section-title">Our Services</h2>
          <p className="section-sub" style={{ marginBottom: 48 }}>
            From infrastructure to intelligence — we cover every layer of your technology stack.
          </p>
          {loading ? (
            <div className="loading">Loading services…</div>
          ) : (
            <div className="services-grid">
              {services.map((s, i) => (
                <div 
                  className="service-card" 
                  key={s.id} 
                  style={{ animationDelay: `${i * 0.07}s` }}
                  onClick={() => handleServiceClick(s)}
                >
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-desc">{s.description.substring(0, 80)}...</p>
                  <div className="service-arrow">→</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal for service details */}
      {selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-icon">{selectedService.icon}</div>
            <h2 className="modal-title">{selectedService.title}</h2>
            <div className="modal-divider"></div>
            <p className="modal-description">{selectedService.description}</p>
            
            <div className="modal-features">
              <h4>What's included:</h4>
              <ul>
                <li>✓ Free consultation</li>
                <li>✓ 24/7 support</li>
                <li>✓ Customized solution</li>
                <li>✓ Training & documentation</li>
              </ul>
            </div>
            
            <button 
              className="modal-contact-btn"
              onClick={() => {
                closeModal();
                // Navigate to contact page - you'll need to pass navigate prop
                window.location.href = '/contact';
              }}
            >
              Request this Service →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
