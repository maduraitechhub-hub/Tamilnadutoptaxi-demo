'use client';

import { useState } from 'react';

export default function BookingForm({ compact = false, setPage }) {

  const [activeTab, setActiveTab] = useState('oneway');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      'Thank you! Our team will contact you shortly with a fare quote. You can also WhatsApp us at +91 8122148519'
    );
  };

  return (
    <div className="booking-wrapper">

      {/* TAB BUTTONS */}

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

      {/* FORM */}

      <form onSubmit={handleSubmit} className="booking-form">

        {/* ONE WAY */}

        {activeTab === 'oneway' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="form-group">
              <label>Pickup Location</label>
              <input
                type="text"
                placeholder="Enter pickup city"
                required
              />
            </div>

            <div className="form-group">
              <label>Drop Location</label>
              <input
                type="text"
                placeholder="Enter destination"
                required
              />
            </div>

            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" required />
            </div>
          </div>
        )}

        {/* OUTSTATION */}

        {activeTab === 'roundtrip' && (
          <div className="form-grid">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="form-group">
              <label>From City</label>
              <input
                type="text"
                placeholder="Enter from city"
                required
              />
            </div>

            <div className="form-group">
              <label>To City</label>
              <input
                type="text"
                placeholder="Enter to city"
                required
              />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" required />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" required />
            </div>
            <div className="form-group">
              <label>Return Date</label>
              <input type="date" required />
            </div>
          </div>
        )}

        {/* RENTAL */}

        {activeTab === 'rental' && (
          <div className="form-grid">

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter Airport Name / City / Area"
                required
              />
            </div>

            <div className="form-group">
              <label>Package</label>
              <select required>
                <option value="">Select Package</option>
                <option>2 Hours / 20 KM</option>
                <option>4 Hours / 40 KM</option>
                <option>5 Hours / 50 KM</option>
                <option>6 Hours / 60 KM</option>
                <option>7 Hours / 70 KM</option>
                <option>8 Hours / 80 KM</option>
                <option>9 Hours / 90 KM</option>
                <option>12 Hours / 120 KM</option>
              </select>
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" required />
            </div>

            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" required />
            </div>
          </div>
        )}

        {/* SUBMIT */}

        <button type="submit" className="submit-btn btn-book-full">
          Get Fare Quote
        </button>

      </form>

    </div>
  );
}
