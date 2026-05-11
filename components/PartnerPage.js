'use client';

export default function PartnerPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest! Our partnership team will contact you within 24 hours.');
  };

  return (
    <div className="partner-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--yellow)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
            — Partner With Us —
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', fontWeight: 800, color: 'white', marginBottom: 16, letterSpacing: '-0.5px' }}>
            Drive With Tamil Nadu Top Taxi
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 520, margin: '0 auto' }}>
            Join our growing network of 500+ drivers. Earn more, work flexibly, and be part of Tamil Nadu's #1 taxi service.
          </p>
        </div>

        <div className="partner-card">
          <div className="partner-title">Join Our Driver Network</div>
          <p className="partner-sub">Fill in your details and we'll get back to you within 24 hours.</p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>👤 Full Name</label>
                <input type="text" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label>📱 Mobile Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>📧 Email Address</label>
                <input type="email" placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>📍 City / District</label>
                <select>
                  <option>Madurai</option>
                  <option>Chennai</option>
                  <option>Coimbatore</option>
                  <option>Trichy</option>
                  <option>Salem</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>🚗 Vehicle Type</label>
                <select>
                  <option>Sedan (Dzire / Etios)</option>
                  <option>SUV (Innova)</option>
                  <option>Premium (Innova Crysta)</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>📅 Driving Experience</label>
                <select>
                  <option>1-2 years</option>
                  <option>2-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>📝 Tell Us About Yourself</label>
              <input type="text" placeholder="Brief description (optional)" />
            </div>
            <button type="submit" className="btn-book-full" style={{ marginTop: 8 }}>
              Join Tamil Nadu Top Taxi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
