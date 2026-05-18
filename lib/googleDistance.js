function getMapsApiKey() {
  return (
    process.env.GOOGLE_MAPS_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ||
    ''
  ).trim();
}

/** @param {string | { seconds?: string | number }} duration */
function parseDurationSeconds(duration) {
  if (!duration) return 0;
  if (typeof duration === 'string') {
    const match = duration.match(/^(\d+)s$/);
    return match ? Number(match[1]) : 0;
  }
  if (typeof duration === 'object' && duration.seconds != null) {
    return Number(duration.seconds) || 0;
  }
  return 0;
}

/**
 * Driving distance & duration via Routes API (replaces legacy Distance Matrix).
 * @see https://developers.google.com/maps/documentation/routes/compute_route_directions
 * @returns {{ distanceKm: number, durationSeconds: number }}
 */
export async function getDrivingDistance(origin, destination) {
  const key = getMapsApiKey();
  if (!key) {
    throw new Error('Google Maps API key is not configured');
  }

  const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': key,
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
    },
    body: JSON.stringify({
      origin: { address: origin },
      destination: { address: destination },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      computeAlternativeRoutes: false,
      languageCode: 'en-IN',
      units: 'METRIC',
      regionCode: 'IN',
    }),
    next: { revalidate: 0 },
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      (typeof data?.error === 'string' ? data.error : null) ||
      'Route calculation service unavailable';
    throw new Error(msg);
  }

  const route = data.routes?.[0];
  if (!route) {
    throw new Error('Could not find a driving route between these locations.');
  }

  const distanceKm = Math.round((route.distanceMeters || 0) / 1000);
  const durationSeconds = parseDurationSeconds(route.duration);

  return { distanceKm: Math.max(1, distanceKm), durationSeconds };
}
