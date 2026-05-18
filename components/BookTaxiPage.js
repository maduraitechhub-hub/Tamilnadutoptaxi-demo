'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { submitSiteForm } from '../lib/submitSiteForm';
import { fetchTripEstimate } from '../lib/fetchTripEstimate';
import FormFeedbackModal from './FormFeedbackModal';
import PlacesAutocompleteInput from './PlacesAutocompleteInput';
import TripEstimationPanel from './TripEstimationPanel';

const cabs = [
  { id: 'sedan', image: '/images/dzire.png', name: 'Sedan', price: '₹14/km' },
  { id: 'etios', image: '/images/etios.png', name: 'Etios', price: '₹14/km' },
  { id: 'innova', image: '/images/innova.png', name: 'Innova', price: '₹19/km' },
  { id: 'crysta', image: '/images/crysta.webp', name: 'Crysta', price: '₹22/km' },
];

const CAB_VEHICLE = {
  sedan: 'Sedan',
  etios: 'Etios',
  innova: 'Innova',
  crysta: 'Crysta',
};

export default function BookTaxiPage() {
  const formRef = useRef(null);
  const [selectedCab, setSelectedCab] = useState('sedan');
  const [tripType, setTripType] = useState('oneway');
  const [estimating, setEstimating] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [estimate, setEstimate] = useState(null);
  const [bookingModal, setBookingModal] = useState({
    open: false,
    variant: 'success',
    title: '',
    message: '',
  });

  const closeBookingModal = () => setBookingModal((m) => ({ ...m, open: false }));
  const formDisabled = estimating || confirming;

  const handleGetEstimate = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const fd = new FormData(form);
    const pickup = fd.get('pickup');
    const drop = fd.get('drop');

    setEstimating(true);
    setEstimate(null);
    try {
      const result = await fetchTripEstimate({
        tripType: tripType === 'roundtrip' ? 'roundtrip' : 'oneway',
        vehicleType: CAB_VEHICLE[selectedCab] || 'Sedan',
        pickup: String(pickup || ''),
        drop: String(drop || ''),
      });
      setEstimate(result);
    } catch (err) {
      setBookingModal({
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

    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());

    setConfirming(true);
    try {
      await submitSiteForm('booking', {
        ...payload,
        tripType: tripType === 'roundtrip' ? 'roundtrip' : 'oneway',
        vehicleType: CAB_VEHICLE[selectedCab] || 'Sedan',
        estimatedAmount: String(estimate.totalAmount),
        estimatedAmountFormatted: estimate.totalAmountFormatted,
        totalDistance: estimate.distanceKmLabel,
        totalDuration: estimate.durationLabel,
        ratePerKm: estimate.ratePerKmLabel,
        driverAllowance: estimate.driverAllowance,
      });
      form.reset();
      setEstimate(null);
      setBookingModal({
        open: true,
        variant: 'success',
        title: 'Booking confirmed',
        message: `Your booking was sent. Estimated fare: ${estimate.totalAmountFormatted}. Our team will call you within 5 minutes.`,
      });
    } catch (err) {
      setBookingModal({
        open: true,
        variant: 'error',
        title: 'Could not send',
        message: err instanceof Error ? err.message : 'Could not send booking request.',
      });
    } finally {
      setConfirming(false);
    }
  };

  const tripTypeLabel =
    tripType === 'roundtrip' ? 'Round trip' : tripType === 'rental' ? 'Rental' : 'One way';

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
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
                  Trip Details
                </h2>
                <p style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
                  Fill in your travel details to see your fare, then confirm to send the booking.
                </p>

                <div style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      marginBottom: 10,
                    }}
                  >
                    Select Cab Type
                  </div>
                  <div className="cab-select-grid">
                    {cabs.map((c) => (
                      <div
                        key={c.id}
                        className={`cab-option${selectedCab === c.id ? ' selected' : ''}`}
                        onClick={() => {
                          setSelectedCab(c.id);
                          setEstimate(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedCab(c.id);
                            setEstimate(null);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="cab-option-image">
                          <Image src={c.image} alt={c.name} width={100} height={100} />
                        </div>
                        <div className="cab-option-name">{c.name}</div>
                        <div className="cab-option-price">{c.price}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <form ref={formRef} onSubmit={handleGetEstimate}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>📍 Pickup Location</label>
                      <PlacesAutocompleteInput
                        name="pickup"
                        placeholder="City / area / address"
                        required
                        disabled={formDisabled}
                      />
                    </div>
                    <div className="form-group">
                      <label>🏁 Drop Location</label>
                      <PlacesAutocompleteInput
                        name="drop"
                        placeholder="Destination"
                        required
                        disabled={formDisabled}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>🔄 Trip Type</label>
                      <select
                        value={tripType}
                        onChange={(e) => {
                          setTripType(e.target.value);
                          setEstimate(null);
                        }}
                        disabled={formDisabled}
                      >
                        <option value="oneway">One Way</option>
                        <option value="roundtrip">Round Trip</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>📅 Pickup Date</label>
                      <input type="date" name="pickupDate" required disabled={formDisabled} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>🕐 Pickup Time</label>
                      <input type="time" name="pickupTime" required disabled={formDisabled} />
                    </div>
                    <div className="form-group">
                      <label>👥 Passengers</label>
                      <select name="passengers" disabled={formDisabled}>
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
                      <input
                        type="text"
                        name="customerName"
                        placeholder="Full name"
                        required
                        disabled={formDisabled}
                      />
                    </div>
                    <div className="form-group">
                      <label>📱 Mobile Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        disabled={formDisabled}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>📝 Special Requests</label>
                    <input
                      type="text"
                      name="message"
                      placeholder="Any special requirements..."
                      disabled={formDisabled}
                    />
                  </div>
                  {!estimate && (
                    <div className="btn-flex">
                      <button type="submit" className="btn-book-full" disabled={formDisabled}>
                        {estimating ? 'Calculating…' : 'Get Trip Estimation'}
                      </button>
                      <button
                        type="button"
                        className="btn-book-full"
                        onClick={() =>
                          window.open(
                            'https://wa.me/918122148519?text=Hi, I want to book a taxi',
                            '_blank'
                          )
                        }
                      >
                        Book via WhatsApp
                      </button>
                    </div>
                  )}
                </form>

                {(estimating || estimate) && (
                  <TripEstimationPanel
                    estimate={estimate}
                    tripTypeLabel={tripTypeLabel}
                    loading={estimating}
                    confirming={confirming}
                    onConfirm={handleConfirmBooking}
                    onBack={estimate ? () => setEstimate(null) : undefined}
                  />
                )}
              </div>
            </div>

            <div>
              <div className="fare-card">
                <div className="fare-title">Fare Estimate</div>
                {estimate ? (
                  <>
                    <div className="fare-row fare-total">
                      <span className="fare-label">Estimated total</span>
                      <span className="fare-value">{estimate.totalAmountFormatted}</span>
                    </div>
                    {[
                      ['Distance', estimate.distanceKmLabel],
                      ['Duration', estimate.durationLabel],
                      ['Rate per km', estimate.ratePerKmLabel],
                      ['Driver allowance', estimate.driverAllowance],
                    ].map(([label, value]) => (
                      <div key={label} className="fare-row">
                        <span className="fare-label">{label}</span>
                        <span className="fare-value">{value}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
                      Enter pickup & drop, then get trip estimation for live pricing.
                    </div>
                    {[
                      ['Per KM Rate', cabs.find((c) => c.id === selectedCab)?.price || '—'],
                      ['Driver Allowance', 'Included (₹400)'],
                    ].map(([label, value]) => (
                      <div key={label} className="fare-row">
                        <span className="fare-label">{label}</span>
                        <span className="fare-value">{value}</span>
                      </div>
                    ))}
                  </>
                )}
                <div style={{ fontSize: 12, color: '#aaa', marginTop: 12, lineHeight: 1.6 }}>
                  * Final fare depends on actual distance and route. Toll charges extra.
                </div>
              </div>

              <div className="fare-card" style={{ marginTop: 20 }}>
                <div className="fare-title">📞 Need Help?</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                  <a
                    href="tel:+918122148519"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 16px',
                      background: 'var(--green-light)',
                      borderRadius: 10,
                      textDecoration: 'none',
                      color: 'var(--green)',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    📞 +91 8122148519
                  </a>
                  <a
                    href="https://wa.me/918122148519"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '12px 16px',
                      background: '#f0fff4',
                      borderRadius: 10,
                      textDecoration: 'none',
                      color: '#25d366',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FormFeedbackModal
        open={bookingModal.open}
        variant={bookingModal.variant}
        title={bookingModal.title}
        message={bookingModal.message}
        onClose={closeBookingModal}
      />
    </>
  );
}
