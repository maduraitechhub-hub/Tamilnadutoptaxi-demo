/**
 * Request a fare estimate from the server (uses Google Distance Matrix when needed).
 * @param {Record<string, string>} params
 */
export async function fetchTripEstimate(params) {
  const res = await fetch('/api/trip-estimate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  let data = {};
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }

  if (!res.ok || data.ok !== true) {
    throw new Error(
      (typeof data.error === 'string' && data.error) ||
        'Could not calculate fare. Please check your locations and try again.'
    );
  }

  return data.estimate;
}
