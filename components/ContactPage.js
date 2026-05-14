'use client';

import { useState } from 'react';
import { submitSiteForm } from '../lib/submitSiteForm';
import FormFeedbackModal from './FormFeedbackModal';

const contactItems = [
  { icon: '📞', title: 'Phone', value: '+91 8122148519' },
  { icon: '📱', title: 'WhatsApp', value: '+91 8122148519' },
  { icon: '📧', title: 'Email', value: 'hello@tamilnadudroptaxi.com' },
  { icon: '🕐', title: 'Hours', value: '24/7 — Always Available' },
];

const initialForm = {
  customerName: '',
  phone: '',
  email: '',
  subject: 'Cab Booking Inquiry',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [modal, setModal] = useState({
    open: false,
    variant: 'success',
    title: '',
    message: '',
    detail: null,
  });

  const closeModal = () => setModal((m) => ({ ...m, open: false, detail: null }));

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    const msg = form.message.trim();
    if (msg.length < 3) {
      setValidationError('Please enter a message (at least a few characters).');
      return;
    }

    setSending(true);
    try {
      await submitSiteForm('contact', {
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        subject: form.subject,
        message: msg,
      });
      setForm(initialForm);
      setModal({
        open: true,
        variant: 'success',
        title: 'Message sent',
        message: "Thanks — your message was sent. We'll get back to you within 2 hours.",
        detail: null,
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Could not send your message. Check your connection or email us at hello@tamilnadudroptaxi.com';
      const showSmtpTip =
        typeof message === 'string' &&
        (message.includes('SMTP') ||
          message.includes('configured') ||
          message.includes('Email is not configured'));
      setModal({
        open: true,
        variant: 'error',
        title: 'Could not send',
        message,
        detail: showSmtpTip ? (
          <span>
            Tip: on your computer, add SMTP settings to <code>.env.local</code> (see <code>.env.example</code>) and
            restart <code>npm run dev</code>.
          </span>
        ) : null,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-title">Contact Us</div>
        <p className="page-hero-sub">
          We’re available 24/7 to help you with bookings, support, and travel assistance anytime. <br />
          Reach us easily through call, WhatsApp, or online support whenever you need us.
        </p>
      </div>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-info-title">Get In Touch</h2>
              <p className="contact-info-desc">
                Have a question, booking inquiry, or feedback? Our team is always ready to assist you. We typically
                respond within 30 minutes.
              </p>
              {contactItems.map((c) => (
                <div key={c.title} className="contact-item">
                  <div className="contact-icon">{c.icon}</div>
                  <div>
                    <div className="contact-item-title">{c.title}</div>
                    <div className="contact-item-value">{c.value}</div>
                  </div>
                </div>
              ))}
              <div className="map-placeholder">
                <span style={{ fontSize: 36 }}>🗺️</span>
                <span>45, Bypass Road, Madurai, Tamil Nadu</span>
              </div>
            </div>

            <div className="contact-form-card">
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Send a Message</h3>
              <p style={{ fontSize: 13, color: '#888', marginBottom: 16 }}>We'll reply within 30 minutes</p>

              {validationError ? (
                <p
                  role="alert"
                  style={{
                    marginBottom: 14,
                    fontSize: 13,
                    color: '#b91c1c',
                    lineHeight: 1.45,
                  }}
                >
                  {validationError}
                </p>
              ) : null}

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="contact-name">👤 Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    value={form.customerName}
                    onChange={update('customerName')}
                    placeholder="Full name"
                    required
                    disabled={sending}
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">📱 Mobile Number</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+91 XXXXX XXXXX"
                    required
                    disabled={sending}
                    autoComplete="tel"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">📧 Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="your@email.com"
                    disabled={sending}
                    autoComplete="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-subject">📋 Subject</label>
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={update('subject')}
                    required
                    disabled={sending}
                  >
                    <option value="Cab Booking Inquiry">Cab Booking Inquiry</option>
                    <option value="Fare Question">Fare Question</option>
                    <option value="Driver Feedback">Driver Feedback</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">💬 Message</label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={update('message')}
                    placeholder="How can we help you?"
                    required
                    rows={4}
                    disabled={sending}
                    style={{ width: '100%', resize: 'vertical' }}
                  />
                </div>
                <button type="submit" className="btn-book-full" style={{ marginTop: 8 }} disabled={sending}>
                  {sending ? 'Sending…' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FormFeedbackModal
        open={modal.open}
        variant={modal.variant}
        title={modal.title}
        message={modal.message}
        detail={modal.detail}
        onClose={closeModal}
      />
    </>
  );
}
