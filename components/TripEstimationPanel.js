'use client';

export default function TripEstimationPanel({
  estimate,
  tripTypeLabel,
  loading = false,
  confirming = false,
  onConfirm,
  onBack,
}) {
  if (!estimate && !loading) return null;

  const rows = estimate
    ? [
        ['Total Distance', estimate.distanceKmLabel],
        ['Total Duration', estimate.durationLabel],
        ['Rate Per Km', estimate.ratePerKmLabel],
        ['Car Type', estimate.carType],
        ['Driver Allowance', estimate.driverAllowance],
      ]
    : [];

  return (
    <div className="trip-estimation">
      <div className="trip-estimation-header">
        <h3 className="trip-estimation-title">Trip Estimation</h3>
        {estimate && (
          <span className="trip-estimation-amount">{estimate.totalAmountFormatted}</span>
        )}
      </div>

      {loading ? (
        <p className="trip-estimation-loading">Calculating your trip fare…</p>
      ) : (
        <>
          {tripTypeLabel && (
            <p className="trip-estimation-trip-type">{tripTypeLabel}</p>
          )}
          <table className="trip-estimation-table">
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="trip-estimation-note">
            Note: Toll gate and state permit are extra
          </p>
          <div className="trip-estimation-actions">
            {onBack && (
              <button
                type="button"
                className="trip-estimation-back"
                onClick={onBack}
                disabled={confirming}
              >
                Edit details
              </button>
            )}
            <button
              type="button"
              className="btn-confirm-booking"
              onClick={onConfirm}
              disabled={confirming}
            >
              {confirming ? 'Sending…' : 'Confirm Booking'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
