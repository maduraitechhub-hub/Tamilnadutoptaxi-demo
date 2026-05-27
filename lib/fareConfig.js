/** Per-km rates and driver allowance (₹) — aligned with site pricing. */
export const VEHICLE_FARES = {
  Sedan: { perKm: 15, driverAllowance: 400, label: 'SEDAN' },
  Etios: { perKm: 16, driverAllowance: 400, label: 'ETIOS' },
  SUV: { perKm: 20, driverAllowance: 400, label: 'SUV' },
  Innova: { perKm: 20, driverAllowance: 400, label: 'INNOVA' },
  Crysta: { perKm: 23, driverAllowance: 400, label: 'CRYSTA' },
};

const CAB_ID_TO_VEHICLE = {
  sedan: 'Sedan',
  etios: 'Etios',
  innova: 'Innova',
  crysta: 'Crysta',
};

export function normalizeVehicleType(value) {
  if (!value) return 'Sedan';
  const key = String(value).trim();
  if (VEHICLE_FARES[key]) return key;
  const lower = key.toLowerCase();
  if (CAB_ID_TO_VEHICLE[lower]) return CAB_ID_TO_VEHICLE[lower];
  const match = Object.keys(VEHICLE_FARES).find((v) => v.toLowerCase() === lower);
  return match || 'Sedan';
}

export function getVehicleFare(vehicleType) {
  return VEHICLE_FARES[normalizeVehicleType(vehicleType)];
}

/** Parse "8 Hours / 80 KM" → { hours, km } */
export function parseRentalPackage(packageLabel) {
  const text = String(packageLabel || '');
  const kmMatch = text.match(/(\d+)\s*KM/i);
  const hourMatch = text.match(/(\d+)\s*Hours?/i);
  return {
    hours: hourMatch ? Number(hourMatch[1]) : null,
    km: kmMatch ? Number(kmMatch[1]) : null,
  };
}
