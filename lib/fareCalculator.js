import {
  getVehicleFare,
  parseRentalPackage,
  normalizeVehicleType,
} from './fareConfig';

export function formatDuration(seconds) {
  const totalMins = Math.max(0, Math.round(Number(seconds) / 60));
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  if (hours === 0) return `${mins} min${mins === 1 ? '' : 's'}`;
  if (mins === 0) return `${hours} hour${hours === 1 ? '' : 's'}`;

  return `${hours} hour${hours === 1 ? '' : 's'} ${mins} min${mins === 1 ? '' : 's'}`;
}

export function formatCurrency(amount) {
  const n = Math.round(Number(amount) || 0);
  return `Rs. ${n.toLocaleString('en-IN')}`;
}

/**
 * @param {object} params
 * @param {'oneway'|'roundtrip'|'rental'} params.tripType
 * @param {string} params.vehicleType
 * @param {number} params.distanceKm
 * @param {number} [params.durationSeconds]
 * @param {string} [params.rentalPackage]
 */
export function calculateTripFare({
  tripType,
  vehicleType,
  distanceKm,
  durationSeconds = 0,
  rentalPackage,
}) {
  const vehicle = getVehicleFare(vehicleType);
  const oneWayKm = Math.max(0, Math.round(Number(distanceKm) || 0));

  let billableKm;
  let durationForDisplay = durationSeconds;

  if (tripType === 'rental') {
    const pkg = parseRentalPackage(rentalPackage);
    billableKm = pkg.km ?? oneWayKm;

    if (pkg.hours) {
      durationForDisplay = pkg.hours * 3600;
    }
  } else if (tripType === 'roundtrip') {
    billableKm = oneWayKm * 2;
    durationForDisplay = durationSeconds * 2;
  } else {
    billableKm = oneWayKm;
  }

  // ONEWAY CONFIG
  const BASE_KM = 130;

  const FIXED_FARES = {
    Sedan: 2350,
    Etios: 2480,
    SUV: 3000,
    Innova: 3000,
    Crysta: 3390,
  };

  // ROUNDTRIP RATES ONLY
  const ROUNDTRIP_RATES = {
    Sedan: 14,
    Etios: 15,
    SUV: 19,
    Innova: 22,
    Crysta: 22,
  };

  let totalAmount = 0;
  let distanceCharge = 0;

  // ONEWAY
  if (tripType === 'oneway') {
    const vehicleKey = normalizeVehicleType(vehicleType);
    const baseFare = FIXED_FARES[vehicleKey] || FIXED_FARES.Sedan;

    if (billableKm <= BASE_KM) {
      totalAmount = baseFare;
      distanceCharge = baseFare;
    } else {
      const extraKm = billableKm - BASE_KM;

      totalAmount = baseFare + (extraKm * vehicle.perKm);
      distanceCharge = totalAmount;
    }
  }

  // ROUNDTRIP
  else if (tripType === 'roundtrip') {
    const vehicleKey = normalizeVehicleType(vehicleType);

    const roundTripRate =
      ROUNDTRIP_RATES[vehicleKey] || ROUNDTRIP_RATES.Sedan;

    distanceCharge = billableKm * roundTripRate;

    totalAmount =
      distanceCharge + vehicle.driverAllowance;
  }

  // RENTAL
  else {
    distanceCharge = billableKm * vehicle.perKm;
    totalAmount = distanceCharge + vehicle.driverAllowance;
  }

  return {
    totalAmount,
    totalAmountFormatted: formatCurrency(totalAmount),
    distanceKm: billableKm,
    distanceKmLabel: `${billableKm} KM`,
    durationSeconds: durationForDisplay,
    durationLabel: formatDuration(durationForDisplay),
    ratePerKm:
      tripType === 'roundtrip'
        ? (ROUNDTRIP_RATES[normalizeVehicleType(vehicleType)] || 14)
        : vehicle.perKm,
    ratePerKmLabel: `Rs. ${
      tripType === 'roundtrip'
        ? (ROUNDTRIP_RATES[normalizeVehicleType(vehicleType)] || 14)
        : vehicle.perKm
    }`,
    carType: vehicle.label,
    driverAllowance: 'Included',
    distanceCharge,
    driverAllowanceAmount: vehicle.driverAllowance,
    tripType,
  };
}
