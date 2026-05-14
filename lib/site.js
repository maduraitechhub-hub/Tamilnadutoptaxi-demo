/** Canonical site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL (e.g. when HTTPS is enabled). */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'http://tamilnadudroptaxi.com';
  return raw.replace(/\/$/, '');
}
