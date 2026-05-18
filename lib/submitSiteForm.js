import { trackLeadFormConversion } from './googleAds';

/**
 * POST website form payloads to the server mail API (browser only).
 * @param {'contact'|'booking'|'partner'} formType
 * @param {Record<string, string>} payload
 */
export async function submitSiteForm(formType, payload) {
  const res = await fetch('/api/send-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formType, payload }),
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
        'Something went wrong. Please try again or call +91 8122148519.'
    );
  }

  trackLeadFormConversion();
  return data;
}
