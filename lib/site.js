/** Canonical site origin (no trailing slash). Override with NEXT_PUBLIC_SITE_URL */
export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.tamilnadudroptaxi.com';

  return raw.replace(/\/$/, '');
}
