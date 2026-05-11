'use client';

const contactItems = [
  { icon: '📞', title: 'Phone', value: '+91 8122148519' },
  { icon: '📱', title: 'WhatsApp', value: '+91 8122148519' },
  { icon: '📧', title: 'Email', value: 'tamilnadutoptaxi@gmail.com' },
  { icon: '🕐', title: 'Hours', value: '24/7 — Always Available' },
];

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you within 2 hours.");
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-title">Contact Us</div>
        <p className="page-hero-sub">We’re available 24/7 to help you with bookings, support, and travel assistance anytime. <br/>
Reach us easily through call, WhatsApp, or online support whenever you need us. . 
</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="contact-info-title">Get In Touch</h2>
              <p className="contact-info-desc">
                Have a question, booking inquiry, or feedback? Our team is always ready to assist you. We typically respond within 30 minutes.
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
              <p style={{ fontSize: 13, color: '#888', marginBottom: 24 }}>We'll reply within 30 minutes</p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>👤 Your Name</label>
                  <input type="text" placeholder="Full name" required />
                </div>
                <div className="form-group">
                  <label>📱 Mobile Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="form-group">
                  <label>📧 Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label>📋 Subject</label>
                  <select>
                    <option>Cab Booking Inquiry</option>
                    <option>Fare Question</option>
                    <option>Driver Feedback</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>💬 Message</label>
                  <input type="text" placeholder="How can we help you?" required />
                </div>
                <button type="submit" className="btn-book-full" style={{ marginTop: 8 }}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
