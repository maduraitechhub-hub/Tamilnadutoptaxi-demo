const LEAD_FORM_CONVERSION = 'AW-18168765995/epMNCKKrw64cEKu8xddD';

/** Fire Google Ads conversion after a successful lead form submission. */
export function trackLeadFormConversion() {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: LEAD_FORM_CONVERSION,
    value: 1.0,
    currency: 'INR',
  });
}
