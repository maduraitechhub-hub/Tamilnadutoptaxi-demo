'use client';

import { useRef, useState } from 'react';
import { submitSiteForm } from '../lib/submitSiteForm';
import { fetchTripEstimate } from '../lib/fetchTripEstimate';
import FormFeedbackModal from './FormFeedbackModal';
import PlacesAutocompleteInput from './PlacesAutocompleteInput';
import TripEstimationPanel from './TripEstimationPanel';
// import {
//   isValidPickupTime,
//   PICKUP_TIME_INVALID_MESSAGE,
//   PICKUP_TIME_MAX,
//   PICKUP_TIME_MIN,
// } from '../lib/pickupTime';

const TRIP_TYPE_LABELS = {
  oneway: 'One way',
  roundtrip: 'Round trip',
  rental: 'Rental',
};

function estimatePayloadFromForm(form, tripType) {
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  return {
    tripType,
    vehicleType: data.vehicleType || 'Sedan',
    pickup: data.pickup,
    drop: data.drop,
    fromCity: data.fromCity,
    toCity: data.toCity,
    rentalCity: data.rentalCity,
    rentalPackage: data.rentalPackage,
  };
}

function bookingPayloadFromForm(form, tripType, estimate) {
  const fd = new FormData(form);
  const data = Object.fromEntries(fd.entries());
  return {
    ...data,
    tripType,
    estimatedAmount: String(estimate.totalAmount),
    estimatedAmountFormatted: estimate.totalAmountFormatted,
    totalDistance: estimate.distanceKmLabel,
    totalDuration: estimate.durationLabel,
    ratePerKm: estimate.ratePerKmLabel,
    driverAllowance: estimate.driverAllowance,
  };
}

export default function BookingForm({ compact = false }) {
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState('oneway');
  const [estimating, setEstimating] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [formKey, setFormKey] = useState(0);
  const [modal, setModal] = useState({
    open: false,
    variant: 'success',
    title: '',
    message: '',
  });

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const resetEstimate = () => setEstimate(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    resetEstimate();
  };

  const handleGetEstimate = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setEstimating(true);
    resetEstimate();
    try {
      const result = await fetchTripEstimate(estimatePayloadFromForm(form, activeTab));
      setEstimate(result);
      form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      setModal({
        open: true,
        variant: 'error',
        title: 'Could not estimate fare',
        message: err instanceof Error ? err.message : 'Could not calculate trip fare.',
      });
    } finally {
      setEstimating(false);
    }
  };

  const handleConfirmBooking = async () => {
    const form = formRef.current;
    if (!form || !estimate) return;

    setConfirming(true);
    try {
      await submitSiteForm('booking', bookingPayloadFromForm(form, activeTab, estimate));
      form.reset();
      setFormKey((k) => k + 1);
      resetEstimate();
      setModal({
        open: true,
        variant: 'success',
        title: 'Booking confirmed',
        message: `Your booking request was sent. Estimated fare: ${estimate.totalAmountFormatted}. Our team will contact you shortly. You can also WhatsApp us at +91 8122148519.`,
      });
    } catch (err) {
      setModal({
        open: true,
        variant: 'error',
        title: 'Could not send',
        message: err instanceof Error ? err.message : 'Could not send booking request.',
      });
    } finally {
      setConfirming(false);
    }
  };

  const formDisabled = estimating || confirming;
  const showEstimatePanel = estimating || estimate;

  return (
    <div className="booking-wrapper">
      <div className="booking-tabs">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'oneway' ? 'active' : ''}`}
          onClick={() => handleTabChange('oneway')}
        >
          One Way
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'roundtrip' ? 'active' : ''}`}
          onClick={() => handleTabChange('roundtrip')}
        >
          Round Trip
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === 'rental' ? 'active' : ''}`}
          onClick={() => handleTabChange('rental')}
        >
          Rental
        </button>
      </div>

      <form ref={formRef} onSubmit={handleGetEstimate} className="booking-form">
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
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter mobile number"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Pickup Location</label>
              <PlacesAutocompleteInput
                key={`pickup-${formKey}`}
                name="pickup"
                placeholder="Enter pickup location"
                required
                disabled={formDisabled}
              />
            </div>

            <div className="form-group">
              <label>Drop Location</label>
              <PlacesAutocompleteInput
                key={`drop-${formKey}`}
                name="drop"
                placeholder="Enter destination"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" required disabled={formDisabled}>
                <option value="Sedan">Sedan</option>
                <option value="Etios">Etios</option>
                <option value="SUV">SUV</option>
                <option value="Innova">Innova</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={formDisabled} />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={formDisabled} />
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
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter mobile number"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>From City</label>
              <PlacesAutocompleteInput
                key={`from-${formKey}`}
                name="fromCity"
                mode="city"
                placeholder="Enter from city"
                required
                disabled={formDisabled}
              />
            </div>

            <div className="form-group">
              <label>To City</label>
              <PlacesAutocompleteInput
                key={`to-${formKey}`}
                name="toCity"
                mode="city"
                placeholder="Enter to city"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" required disabled={formDisabled}>
                <option value="Sedan">Sedan</option>
                <option value="Etios">Etios</option>
                <option value="SUV">SUV</option>
                <option value="Innova">Innova</option>
              </select>
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={formDisabled} />
            </div>
            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={formDisabled} />
            </div>
            <div className="form-group">
              <label>Return Date</label>
              <input type="date" name="returnDate" required disabled={formDisabled} />
            </div>
          </div>
        )}

        {activeTab === 'rental' && (
          <div className="form-grid">
            <div className="form-group">
              <label>City</label>
              <PlacesAutocompleteInput
                key={`rental-${formKey}`}
                name="rentalCity"
                placeholder="Enter airport, city, or area"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <select name="vehicleType" required disabled={formDisabled}>
                <option value="Sedan">Sedan</option>
                <option value="Etios">Etios</option>
                <option value="SUV">SUV</option>
                <option value="Innova">Innova</option>
              </select>
            </div>
            <div className="form-group">
              <label>Package</label>
              <select name="rentalPackage" required disabled={formDisabled}>
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
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+91 XXXXX XXXXX"
                required
                disabled={formDisabled}
              />
            </div>
            <div className="form-group">
              <label>Pickup Date</label>
              <input type="date" name="pickupDate" required disabled={formDisabled} />
            </div>

            <div className="form-group">
              <label>Pickup Time</label>
              <input type="time" name="pickupTime" required disabled={formDisabled} />
            </div>
          </div>
        )}

        {!estimate && (
          <button type="submit" className="submit-btn btn-book-full" disabled={formDisabled}>
            {estimating ? 'Calculating…' : 'Get Trip Estimation'}
          </button>
        )}
      </form>

      {showEstimatePanel && (
        <TripEstimationPanel
          estimate={estimate}
          tripTypeLabel={TRIP_TYPE_LABELS[activeTab]}
          loading={estimating}
          confirming={confirming}
          onConfirm={handleConfirmBooking}
          onBack={estimate ? resetEstimate : undefined}
        />
      )}

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
