import { getSiteUrl } from '../lib/site';

export default function sitemap() {
  const base = getSiteUrl();
  const now = new Date();
  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
