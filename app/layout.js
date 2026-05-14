import '../styles/globals.css';
import { defaultPageSeo } from '../lib/seoConfig';
import { getSiteUrl } from '../lib/site';

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  applicationName: 'TamilNadu Drop Taxi',
  title: defaultPageSeo.title,
  description: defaultPageSeo.description,
  keywords: defaultPageSeo.keywords,
  authors: [{ name: 'TamilNadu Drop Taxi', url: siteUrl }],
  category: 'travel',
  referrer: 'origin-when-cross-origin',
  alternates: {
    canonical: '/',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    apple: [{ url: '/logo.png', type: 'image/png' }],
  },
  openGraph: {
    title: defaultPageSeo.title,
    description: defaultPageSeo.description,
    type: 'website',
    locale: 'en_IN',
    siteName: 'TamilNadu Drop Taxi',
    url: `${siteUrl}/`,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultPageSeo.title,
    description: defaultPageSeo.description,
  },
  other: {
    'search-keywords': defaultPageSeo.searchKeywords,
    'geo.region': 'IN-TN',
    'geo.placename': 'Tamil Nadu, India',
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export const viewport = {
  themeColor: '#0d9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    name: 'TamilNadu Drop Taxi',
    alternateName: ['tamilnadudroptaxi', 'TamilNaduDropTaxi'],
    description: defaultPageSeo.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}/opengraph-image`,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Tamil Nadu',
      containedInPlace: { '@type': 'Country', name: 'India' },
    },
    serviceType: ['Drop taxi', 'Outstation cab', 'Airport transfer', 'Local taxi'],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
