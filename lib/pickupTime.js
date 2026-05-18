export const PICKUP_TIME_MIN = '10:00';
export const PICKUP_TIME_MAX = '22:00';

export const PICKUP_TIME_INVALID_MESSAGE =
  'Pickup time must be between 10:00 AM and 10:00 PM.';

export function isValidPickupTime(value) {
  const t = String(value ?? '').trim();
  if (!/^\d{2}:\d{2}$/.test(t)) return false;
  return t >= PICKUP_TIME_MIN && t <= PICKUP_TIME_MAX;
}
