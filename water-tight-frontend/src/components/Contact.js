import React, { useState } from 'react';
import './Contact.css';

export default function Contact({ standalone }) {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const getCSRFToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'csrftoken') return value;
    }
    return '';
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '', website: '' });
      } else {
        const data = await res.json();
        setErrors(data);
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contact" id="contact" style={standalone ? { paddingTop: 120 } : {}}>
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">Let's Build Something Together</h2>
            <p className="section-sub">
              Ready to transform your technology stack? Drop us a message and we'll get back within 24 hours.
            </p>
            <div className="contact-details">
              {[
                ['📍', 'Upper Hill, Nairobi, Kenya'],
                ['📧', 'hello@nexatech.co.ke'],
                ['📞', '+254 700 000 000'],
              ].map(([icon, text]) => (
                <div className="contact-row" key={text}>
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-box">
            {status === 'success' ? (
              <div className="success-msg">
                <div className="success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll be in touch shortly.</p>
                <button className="btn-outline" onClick={() => setStatus(null)}>Send Another</button>
              </div>
            ) : (
              <>
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  style={{ display: 'none' }}
                  tabIndex="-1"
                  autoComplete="off"
                />
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="err">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className={errors.email ? 'input-error' : ''}
                    />
                    {errors.email && <span className="err">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your project…"
                    className={errors.message ? 'input-error' : ''}
                  />
                  {errors.message && <span className="err">{errors.message}</span>}
                </div>
                <button
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message →'}
                </button>
                {status === 'error' && !Object.keys(errors).length && (
                  <p className="err" style={{ marginTop: 12 }}>Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
