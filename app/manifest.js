import { defaultPageSeo } from '../lib/seoConfig';

export default function manifest() {
  return {
    name: 'TamilNadu Drop Taxi',
    short_name: 'TN Drop Taxi',
    description: defaultPageSeo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0d9488',
    orientation: 'portrait-primary',
    categories: ['travel', 'business'],
    icons: [
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
