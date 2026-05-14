'use client';

import { useState } from 'react';
import { submitSiteForm } from '../lib/submitSiteForm';
import FormFeedbackModal from './FormFeedbackModal';

export default function BookingForm({ compact = false }) {
  const [activeTab, setActiveTab] = useState('oneway');
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
      await submitSiteForm('booking', payload);
      form.reset();
      setModal({
        open: true,
        variant: 'success',
        title: 'Request received',
        message:
          'Thank you! Our team will contact you shortly with a fare quote. You can also WhatsApp us at +91 8122148519.',
      });
    } catch (err) {
      setModal({
        open: true,
        variant: 'error',
        title: 'Could not send',
        message: err instanceof Error ? err.message : 'Could not send booking request.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="booking-wrapper">
      <div className="booking-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'oneway' ? 'active' : ''}`}
          onClick={() => setActiveTab('oneway')}
        >
          One Way
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'roundtrip' ? 'active' : ''}`}
          onClick={() => setActiveTab('roundtrip')}
        >
          Round Trip
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'rental' ? 'active' : ''}`}
          onClick={() => setActiveTab('rental')}
        >
          Rental
        </button>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <input type="hidden" name="tripType" value={activeTab} readOnly />

        {activeTab === 'oneway' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter your name"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter mobile number"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Pickup Location</label>
              <input
                type="text"
                name="pickup"
                placeholder="Enter pickup city"
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label>Drop Location</label>
              <input
                type="text"
                name="drop"
                placeholder="Enter destination"
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={sending} />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={sending} />
            </div>
          </div>
        )}

        {activeTab === 'roundtrip' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter your name"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter mobile number"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>From City</label>
              <input
                type="text"
                name="fromCity"
                placeholder="Enter from city"
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label>To City</label>
              <input
                type="text"
                name="toCity"
                placeholder="Enter to city"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={sending} />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={sending} />
            </div>
            <div className="form-group">
              <label>Return Date</label>
              <input type="date" name="returnDate" required disabled={sending} />
            </div>
          </div>
        )}

        {activeTab === 'rental' && (
          <div className="form-grid">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="rentalCity"
                placeholder="Enter Airport Name / City / Area"
                required
                disabled={sending}
              />
            </div>

            <div className="form-group">
              <label>Package</label>
              <select name="rentalPackage" required disabled={sending}>
                <option value="">Select Package</option>
                <option value="2 Hours / 20 KM">2 Hours / 20 KM</option>
                <option value="4 Hours / 40 KM">4 Hours / 40 KM</option>
                <option value="5 Hours / 50 KM">5 Hours / 50 KM</option>
                <option value="6 Hours / 60 KM">6 Hours / 60 KM</option>
                <option value="7 Hours / 70 KM">7 Hours / 70 KM</option>
                <option value="8 Hours / 80 KM">8 Hours / 80 KM</option>
                <option value="9 Hours / 90 KM">9 Hours / 90 KM</option>
                <option value="12 Hours / 120 KM">12 Hours / 120 KM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="customerName"
                placeholder="Enter your name"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                required
                disabled={sending}
              />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={sending} />
            </div>

            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={sending} />
            </div>
          </div>
        )}

        <button type="submit" className="submit-btn btn-book-full" disabled={sending}>
          {sending ? 'Sending…' : 'Get Fare Quote'}
        </button>
      </form>

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
