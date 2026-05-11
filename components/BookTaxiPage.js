'use client';
import { useState } from 'react';

const cabs = [
  {
    id: 'sedan',
    image: '/images/dzire.png',
    name: 'Sedan',
    price: '₹12/km'
  },
  {
    id: 'etios',
    image: '/images/etios.png',
    name: 'Etios',
    price: '₹14/km'
  },
  {
    id: 'innova',
    image: '/images/innova.png',
    name: 'Innova',
    price: '₹19/km'
  },
  {
    id: 'crysta',
    image: '/images/crysta.webp',
    name: 'Crysta',
    price: '₹22/km'
  },
];

const fareDetails = {
  sedan: { perKm: '₹12', driver: '₹400'},
  etios: { perKm: '₹14', driver: '₹400',},
  innova: { perKm: '₹19', driver: '₹400',},
  crysta: { perKm: '₹22', driver: '₹400',},
};

export default function BookTaxiPage() {
  const [selectedCab, setSelectedCab] = useState('sedan');
  const fare = fareDetails[selectedCab];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking request received! Our team will call you within 5 minutes to confirm your cab.');
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-title">Book Your Taxi</div>
        <p className="page-hero-sub">Instant cab booking across Tamil Nadu • Best rates guaranteed</p>
      </div>
      <section className="section section-alt">
        <div className="container">
          <div className="booking-page-grid">
            <div>
              <div className="form-section-card">
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>Trip Details</h2>
                <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>Fill in your travel details and we'll get you the best fare.</p>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Select Cab Type</div>
                  <div className="cab-select-grid">
                    {cabs.map((c) => (
                      <div
                        key={c.id}
                        className={`cab-option${selectedCab === c.id ? ' selected' : ''}`}
                        onClick={() => setSelectedCab(c.id)}
                      >
                        <div className="cab-option-image">
                          <img src={c.image} alt={c.name} />
                        </div>

                        <div className="cab-option-name">{c.name}</div>
                        <div className="cab-option-price">{c.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>📍 Pickup Location</label>
                      <input type="text" placeholder="City / Area / Address" required />
                    </div>
                    <div className="form-group">
                      <label>🏁 Drop Location</label>
                      <input type="text" placeholder="Destination" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>🔄 Trip Type</label>
                      <select>
                        <option>One Way</option>
                        <option>Round Trip</option>
                        <option>Local / Hourly</option>
                        <option>Airport Transfer</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>📅 Pickup Date</label>
                      <input type="date" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>🕐 Pickup Time</label>
                      <input type="time" required />
                    </div>
                    <div className="form-group">
                      <label>👥 Passengers</label>
                      <select>
                        <option>1-2 Passengers</option>
                        <option>3-4 Passengers</option>
                        <option>5-6 Passengers</option>
                        <option>7+ Passengers</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>👤 Your Name</label>
                      <input type="text" placeholder="Full name" required />
                    </div>
                    <div className="form-group">
                      <label>📱 Mobile Number</label>
                      <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>📝 Special Requests</label>
                    <input type="text" placeholder="Any special requirements..." />
                  </div>
                 <div className='btn-flex'>
                   <button type="submit" className="btn-book-full">
                    Confirm Booking
                  </button>
                  <button type="button" className="btn-book-full"
                    onClick={() => window.open('https://wa.me/918122148519?text=Hi, I want to book a taxi', '_blank')}>
                    Book via WhatsApp
                  </button>
                 </div>
                </form>
              </div>
            </div>

            <div>
              <div className="fare-card">
                <div className="fare-title">Fare Estimate</div>
                <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>Approximate fare for selected cab type</div>
                {[
                  // ['Base Charge', fare.base],
                  ['Per KM Rate', fare.perKm],
                  ['Driver Allowance', fare.driver],
                  // ['Night Surcharge', fare.night],
                  // ['GST (5%)', fare.gst],
                ].map(([label, value]) => (
                  <div key={label} className="fare-row">
                    <span className="fare-label">{label}</span>
                    <span className="fare-value">{value}</span>
                  </div>
                ))}
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 12, lineHeight: 1.6 }}>
                  * Final fare depends on actual distance and route. Toll charges extra.
                </div>
              </div>

              <div className="fare-card" style={{ marginTop: 20 }}>
                <div className="fare-title">📞 Need Help?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                  <a href="tel:+918122148519" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--green-light)', borderRadius: 10, textDecoration: 'none', color: 'var(--green)', fontWeight: 600, fontSize: 14 }}>
                    📞 +91 8122148519
                  </a>
                  <a href="https://wa.me/918122148519" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f0fff4', borderRadius: 10, textDecoration: 'none', color: '#25d366', fontWeight: 600, fontSize: 14 }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
