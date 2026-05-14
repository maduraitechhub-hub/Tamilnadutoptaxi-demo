'use client';

import { useState } from 'react';
import { submitSiteForm } from '../lib/submitSiteForm';
import FormFeedbackModal from './FormFeedbackModal';

export default function PartnerPage() {
  const [sending, setSending] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    variant: 'success',
    title: '',
    message: '',
  });

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    setSending(true);
    try {
      await submitSiteForm('partner', payload);
      form.reset();
      setModal({
        open: true,
        variant: 'success',
        title: "You're on the list",
        message: 'Thank you for your interest! Our partnership team will contact you within 24 hours.',
      });
    } catch (err) {
      setModal({
        open: true,
        variant: 'error',
        title: 'Could not send',
        message: err instanceof Error ? err.message : 'Could not send your application.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="partner-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--yellow)',
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            — Partner With Us —
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 3vw, 2.8rem)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 16,
              letterSpacing: '-0.5px',
            }}
          >
            Drive With TamilNadu Drop Taxi
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto' }}>
            Join our growing network of 500+ drivers. Earn more, work flexibly, and be part of Tamil Nadu's #1 taxi
            service.
          </p>
        </div>

        <div className="partner-card">
          <div className="partner-title">Join Our Driver Network</div>
          <p className="partner-sub">Fill in your details and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>👤 Full Name</label>
                <input type="text" name="fullName" placeholder="Your full name" required disabled={sending} />
              </div>
              <div className="form-group">
                <label>📱 Mobile Number</label>
                <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX" required disabled={sending} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>📧 Email Address</label>
                <input type="email" name="email" placeholder="your@email.com" disabled={sending} />
              </div>
              <div className="form-group">
                <label>📍 City / District</label>
                <select name="city" required disabled={sending}>
                  <option value="Madurai">Madurai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Trichy">Trichy</option>
                  <option value="Salem">Salem</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>🚗 Vehicle Type</label>
                <select name="vehicle" required disabled={sending}>
                  <option value="Sedan (Dzire / Etios)">Sedan (Dzire / Etios)</option>
                  <option value="SUV (Innova)">SUV (Innova)</option>
                  <option value="Premium (Innova Crysta)">Premium (Innova Crysta)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>📅 Driving Experience</label>
                <select name="experience" required disabled={sending}>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>📝 Tell Us About Yourself</label>
              <input type="text" name="notes" placeholder="Brief description (optional)" disabled={sending} />
            </div>
            <button type="submit" className="btn-book-full" style={{ marginTop: 8 }} disabled={sending}>
              {sending ? 'Sending…' : 'Join TamilNadu Drop Taxi'}
            </button>
          </form>
        </div>
      </div>

      <FormFeedbackModal
        open={modal.open}
        variant={modal.variant}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}
