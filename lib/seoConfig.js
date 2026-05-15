/** Site-wide terms appended to each view for consistent discoverability */
export const siteWideKeywords = [
  'TamilNadu Drop Taxi',
  'TamilNaduDropTaxi',
  'tamilnadudroptaxi',
  'tamilnadudroptaxi.com',
  'drop taxi Tamil Nadu',
  'cab service Tamil Nadu',
  'taxi booking Tamil Nadu',
  'outstation cab Tamil Nadu',
  'premium cab Tamil Nadu',
  'safe taxi Tamil Nadu',
  'affordable taxi Tamil Nadu',
  'Tamil Nadu taxi 2015',
];

/** Broader “search” style phrases (local intent, services, cities) */
export const siteWideSearchKeywords = [
  'book drop taxi online Tamil Nadu',
  'one way taxi Tamil Nadu',
  'round trip cab Tamil Nadu',
  'airport taxi Tamil Nadu',
  'Chennai taxi',
  'Coimbatore taxi',
  'Madurai taxi',
  'Trichy taxi',
  'Salem taxi',
  'Tirunelveli taxi',
  'Vellore taxi',
  'Erode taxi',
  'Thanjavur taxi',
  'Dindigul taxi',
  'Hosur taxi',
  'Kanyakumari taxi',
  'Tamil Nadu intercity cab',
];

const join = (arr) => arr.join(', ');

/**
 * @param {string[]} pageKeywords
 * @param {string[]} pageSearchKeywords
 */
function buildMeta(pageKeywords, pageSearchKeywords) {
  const keywords = [...new Set([...pageKeywords, ...siteWideKeywords])];
  const searchKeywords = [...new Set([...pageSearchKeywords, ...siteWideSearchKeywords])];
  return {
    keywords,
    searchKeywords: join(searchKeywords),
    keywordsContent: join(keywords),
  };
}

export const pageSeo = {
  home: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'Tamil Nadu taxi service',
        'trusted cab service',
        'reliable drop taxi',
        'Tamil Nadu 38 districts taxi',
        'premium cab service home',
      ],
      [
        'best drop taxi Tamil Nadu',
        'hire cab Tamil Nadu',
        'tamilnadudroptaxi',
        'online taxi booking',
      ]
    );
    return {
      title: 'TamilNadu Drop Taxi – Premium Cab Service | Book Online',
      description:
        "Book Tamil Nadu Drop Taxi for safe, affordable, and reliable travel across Tamil Nadu. One-way drops, airport pickups, and outstation taxi service with verified drivers.",
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
  book: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'book taxi Tamil Nadu',
        'online cab booking',
        'drop taxi booking',
        'outstation taxi booking',
        'airport transfer Tamil Nadu',
        'instant taxi quote',
      ],
      [
        'book cab now Tamil Nadu',
        'reserve drop taxi',
        'same day taxi booking',
        'corporate cab booking',
      ]
    );
    return {
      title: 'Book Taxi | TamilNadu Drop Taxi – Online Cab Booking',
      description:
        'Book a drop taxi or cab in Tamil Nadu in minutes. Outstation, airport pickup, and local rides with transparent fares and professional drivers.',
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
  cities: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'Tamil Nadu cities taxi',
        'cab service all districts',
        'drop taxi cities list',
        'intercity taxi Tamil Nadu',
      ],
      [
        'taxi from Chennai to Coimbatore',
        'Madurai to Trichy cab',
        'Salem to Bangalore drop taxi',
        'Tamil Nadu city to city cab',
      ]
    );
    return {
      title: 'Cities We Serve | TamilNadu Drop Taxi – All Districts',
      description:
        'Book Tamil Nadu Drop Taxi for safe, affordable, and reliable travel across Tamil Nadu. One-way drops, airport pickups, and outstation taxi service with verified drivers.',
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
  about: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'about TamilNadu Drop Taxi',
        'trusted taxi company Tamil Nadu',
        'cab service since 2015',
        'professional drivers Tamil Nadu',
      ],
      [
        'why choose TamilNadu Drop Taxi',
        'safe taxi company',
        'customer reviews drop taxi',
      ]
    );
    return {
      title: 'About Us | TamilNadu Drop Taxi – Our Story & Values',
      description:
        'Learn about TamilNadu Drop Taxi: our mission, safety standards, fleet, and commitment to reliable cab service across Tamil Nadu since 2015.',
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
  partner: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'taxi partner program Tamil Nadu',
        'drive with TamilNadu Drop Taxi',
        'fleet partner cab',
        'become a taxi partner',
      ],
      [
        'partner with drop taxi company',
        'owner driver partnership Tamil Nadu',
        'attach car to taxi service',
      ]
    );
    return {
      title: 'Partner With Us | TamilNadu Drop Taxi – Fleet & Drivers',
      description:
        'Partner with TamilNadu Drop Taxi as a driver or fleet owner. Grow your earnings with a trusted brand serving riders across Tamil Nadu.',
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
  contact: (() => {
    const { keywords, searchKeywords, keywordsContent } = buildMeta(
      [
        'contact TamilNadu Drop Taxi',
        'taxi customer care Tamil Nadu',
        'WhatsApp taxi booking',
        'Tamil Nadu cab phone number',
      ],
      [
        'call drop taxi support',
        'taxi helpline Tamil Nadu',
        'reach TamilNadu Drop Taxi',
      ]
    );
    return {
      title: 'Contact | TamilNadu Drop Taxi – Call & WhatsApp',
      description:
        'Contact TamilNadu Drop Taxi for bookings, quotes, and support. Reach us by phone or WhatsApp for fast assistance across Tamil Nadu.',
      keywords,
      keywordsContent,
      searchKeywords,
    };
  })(),
};

/** Default export for root layout (landing / first paint) */
export const defaultPageSeo = pageSeo.home;

/**
 * Updates document title and meta tags for client-side “page” changes (SPA).
 * @param {typeof pageSeo.home} seo
 */
export function applySeoToDocument(seo) {
  if (typeof document === 'undefined') return;
  document.title = seo.title;
  const setNameContent = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  setNameContent('description', seo.description);
  setNameContent('keywords', seo.keywordsContent);
  setNameContent('search-keywords', seo.searchKeywords);
}
