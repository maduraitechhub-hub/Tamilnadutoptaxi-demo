'use client';
import { useState } from 'react';
import BookingForm from './BookingForm';
import StatsBar from './StatsBar';

const services = [
  {
    icon: '/images/airport.png',
    title: 'Airport Pickup & Drop',
    desc: 'On-time airport transfers with professional drivers for a smooth and stress-free journey.'
  },
  {
    icon: '/images/outstation.png',
    title: 'Outstation Taxi',
    desc: 'Travel beyond city limits with comfortable and affordable outstation cab services'
  },
  {
    icon: '/images/oneway.png',
    title: 'One Way Drop',
    desc: 'Book convenient one-way rides without paying for a return trip.'
  },
  {
    icon: '/images/roundtrip.png',
    title: 'Round Trip',
    desc: 'Enjoy flexible round-trip travel with reliable service for business, family, or leisure journeys.'
  },
];

const features = [
  {
    icon: '/images/verified-driver.png',
    title: 'Verified Drivers',
    desc: 'All our drivers are fully licensed & Verified.'
  },
  {
    icon: '/images/safe-travel.png',
    title: 'Safe Travel',
    desc: 'GPS tracked rides for your complete safety'
  },
  {
    icon: '/images/affordable-price.png',
    title: 'Affordable Price',
    desc: 'Best rates with no hidden charges'
  },
  {
    icon: '/images/tamilnadu-wide.png',
    title: 'Tamil Nadu Wide',
    desc: 'Covering all 38 districts across Tamil Nadu'
  },
  {
    icon: '/images/support.png',
    title: '24/7 Support',
    desc: 'Round-the-clock customer care in Tamil & English'
  },
];

const fleet = [
  {
    name: 'Swift Dzire',
    badge: 'Economy',
    seats: '4 Seater',
    ac: 'AC',
    luggage: '2 Bags',
    price: '₹14/km',
    image: '/images/dzire.png',
  },
  {
    name: 'Toyota Etios',
    badge: 'Economy',
    seats: '4 Seater',
    ac: 'AC',
    luggage: '2 Bags',
    price: '₹15/km',
    image: '/images/etios.png',
  },
  {
    name: 'Toyota Innova',
    badge: 'Popular',
    seats: '6 Seater',
    ac: 'AC',
    luggage: '4 Bags',
    price: '₹19/km',
    image: '/images/innova.png',
  },
  {
    name: 'Innova Crysta',
    badge: 'Premium',
    seats: '7 Seater',
    ac: 'AC',
    luggage: '5 Bags',
    price: '₹22/km',
    image: '/images/crysta.webp',
  },
];

const routes = [
  {
    from: 'Chennai',
    to: 'Vellore',
    price: '₹2,318',
    est: 'Starting fare',
    image: '/images/chn-vel.png',
  },
  {
    from: 'Chennai',
    to: 'Pondicherry',
    price: '₹2,710',
    est: 'Starting fare',
    image: '/images/chn-pdy.png',
  },
  {
    from: 'Chennai',
    to: 'Trichy',
    price: '₹5,045',
    est: 'Starting fare',
    image: '/images/chn-trc.png',
  },
  {
    from: 'Chennai',
    to: 'Salem',
    price: '₹5,230',
    est: 'Starting fare',
    image: '/images/chn-slm.png',
  },
  {
    from: 'Chennai',
    to: 'Coimbatore',
    price: '₹7,477',
    est: 'Starting fare',
    image: '/images/chn-cbe.png',
  },
  {
    from: 'Chennai',
    to: 'Bangalore',
    price: '₹5,264',
    est: 'Starting fare',
    image: '/images/chn-bng.png',
  },
  {
    from: 'Chennai',
    to: 'Madurai',
    price: '₹6,872',
    est: 'Starting fare',
    image: '/images/chn-mdu.png',
  },
  {
    from: 'Chennai',
    to: 'Tiruvannamalai',
    price: '₹3,116',
    est: 'Starting fare',
    image: '/images/chn-thy.png',
  },
  {
    from: 'Chennai',
    to: 'Tirupati',
    price: '₹2,262',
    est: 'Starting fare',
    image: '/images/chn-tpt.png',
  },
];
const citiesLeft = [
  'Coimbatore Drop Taxi',
  'Chennai Drop Taxi',
  'Trichy Drop Taxi',
  'Namakkal Drop Taxi',
  'Pollachi Drop Taxi',
  'Vellore Drop Taxi',
  'Tirunelveli Drop Taxi',
  'Mettupalayam Drop Taxi',
  'Villupuram Drop Taxi',
  'Thoothukudi Drop Taxi',
  'Nagercoil Drop Taxi',
  'Thiruvannamalai Drop Taxi',
  'Neyveli Drop Taxi',
  'Kumbakonam Drop Taxi',
  'Salem Drop Taxi',
 
];

const citiesRight = [
   'Tirupur Drop Taxi',
  'Karur Drop Taxi',
  'Madurai Drop Taxi',
  'Erode Drop Taxi',
  'Hosur Drop Taxi',
  'Thanjavur Drop Taxi',
  'Dindigul Drop Taxi',
  'Krishnagiri Drop Taxi',
  'Kanyakumari Drop Taxi',
  'Kallakurichi Drop Taxi',
  'Dharmapuri Drop Taxi',
  'Karaikudi Drop Taxi',
  'Rameshwaram Drop Taxi',
  'Ramanathapuram Drop Taxi',
  
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    route: 'Madurai → Chennai',
    text: 'Excellent service! The driver was punctual, polite, and the car was spotless. Highly recommend Tamil Nadu Top Taxi for intercity travel.',
    rating: 5,
    image: '/images/user-1.png',
  },
  {
    name: 'Priya Sundar',
    route: 'Chennai → Coimbatore',
    text: 'Booked through WhatsApp and got a callback in minutes. Very affordable pricing and comfortable Innova. Will definitely book again!',
    rating: 5,
    image: '/images/user-2.png',
  },
  {
    name: 'Janagarajan',
    route: 'Trichy → Madurai',
    text: 'Safe and reliable. The driver knew all the routes perfectly and we reached on time. Great experience overall.',
    rating: 5,
    image: '/images/user-3.png',
  },
];

const faqs = [
  { q: 'How do I book a taxi with Tamil Nadu Top Taxi?', a: 'You can book easily via our website form, by calling us at +91 8122148519, or by sending a WhatsApp message. We confirm your booking within 2 minutes.' },
  { q: 'Are your drivers verified and licensed?', a: 'Yes, all our drivers are background verified, hold valid commercial licenses, and undergo regular training for safety and hospitality standards.' },
  { q: 'Do you provide service 24/7 including holidays?', a: 'Absolutely! We operate 24 hours a day, 7 days a week including all public holidays. You can reach us any time.' },
  { q: 'What cab types are available for outstation travel?', a: 'We offer Swift Dzire, Toyota Etios (economy), Toyota Innova (family), and Innova Crysta (premium) for all intercity and outstation trips.' },
  { q: 'Is GPS tracking available for rides?', a: 'Yes, all our vehicles are equipped with GPS trackers. You can share your live location with family members for added safety.' },
  { q: 'What areas do you cover in Tamil Nadu?', a: 'We cover all 38 districts of Tamil Nadu including major cities like Madurai, Chennai, Coimbatore, Trichy, Salem, Tirunelveli, and Erode.' },
];

export default function HomePage({ setPage }) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-left fade-in text-center">
            <div style={{ marginBottom: 20 }}>

              <div className="hero-badge" style={{ marginBottom: 0 }}>
                <span className="hero-badge-dot" />
                #1 Taxi Service in Tamil Nadu
              </div>
            </div>
            <h1 className="hero-title">
              Book Trusted <span> Tamil Nadu</span> <em> Top Taxi</em>
            </h1>
            <p className="hero-sub">
              Premium intercity cab booking across all 38 districts. Safe, reliable, and affordable
              travel with verified drivers.
            </p>

            <div className="hero-btns">
              {/* <button className="btn-primary" onClick={() => { setPage('book'); window.scrollTo(0, 0); }}>
                Book Now
              </button> */}
              <a href="tel:+918122148519" className="btn-primary">Call Now</a>
              <a href="https://wa.me/918122148519" target="_blank" rel="noopener noreferrer" className="btn-primary">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-right" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <div className="booking-card">
              <BookingForm compact={true} setPage={setPage} />
            </div>
          </div>
        </div>
      </section>

      {/* service Us */}
      <section className="section servicesbg">
        <div className="container">
          <div className="section-label">Explore our Top Taxi Services</div>
          <h2 className="section-title">Tamil Nadu's Most <span>Trusted</span> Taxi Service</h2>
          <p className="section-sub">Reliable taxi services across Tamil Nadu offering safe, comfortable, and affordable rides for airport transfers, outstation trips, one-way drops, and round trips.</p>
          <div className="features-grid">
            {services.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">
                  <img src={f.icon} alt={f.title} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <button className="btn-primary" onClick={() => { setPage('book'); window.scrollTo(0, 0); }}>
              Book Your Ride Now
            </button>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section className="section section-alt">
        <div className="container">

          <div className="section-label">Our Fleet</div>

          <h2 className="section-title">
            Choose Your <span>Ride</span>
          </h2>

          <p className="section-sub">
            From economy to premium — we have the right cab for every trip and budget.
          </p>

          <div className="fleet-grid">
            {fleet.map((f) => (
              <div key={f.name} className="fleet-card">

                <div className="fleet-img">

                  <img
                    src={f.image}
                    alt={f.name}
                    className="fleet-car-image"
                  />

                  <div className="fleet-img-overlay"></div>

                  <span className="fleet-badge">
                    {f.badge}
                  </span>

                </div>

                <div className="fleet-body">

                  <div className="fleet-name">
                    {f.name}
                  </div>

                  <div className="fleet-specs">
                    <span className="fleet-spec">
                      👥 {f.seats}
                    </span>

                    <span className="fleet-spec">
                      ❄️ {f.ac}
                    </span>

                    <span className="fleet-spec">
                      🧳 {f.luggage}
                    </span>
                  </div>

                  <div className="fleet-price">
                    <strong>{f.price}</strong> · Outstation
                  </div>

                  <button
                    className="btn-fleet"
                    onClick={() => {
                      setPage('book');
                      window.scrollTo(0, 0);
                    }}
                  >
                    Book This Cab →
                  </button>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">Trusted by <span>Travelers</span> across Tamil Nadu</h2>
          <p className="section-sub">We're committed to safe, affordable, and comfortable travel across every corner of Tamil Nadu.</p>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">
                  <img src={f.icon} alt={f.title} />
                </div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Popular Routes */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-label">Popular Routes</div>

          <h2 className="section-title">
            Most Travelled <span>Routes</span>
          </h2>

          <p className="section-sub">
            Transparent pricing for the most popular intercity cab routes in Tamil Nadu.
          </p>

          <div className="routes-grid">
            {routes.map((r) => (
              <div key={r.from + r.to} className="route-card">

                <div className="route-header">
                  <div className="route-cities">
                    <span>{r.from}</span>
                    <span className="route-arrow">→</span>
                    <span>{r.to}</span>
                  </div>

                  <div className="route-dist">{r.dist}</div>
                </div>

                {/* Route Image */}
                <div className="route-image">
                  <img src={r.image} alt={`${r.from} to ${r.to}`} />
                </div>

                <div className="route-price">{r.price}</div>

                <div className="route-price-label">
                  {r.est} (Sedan)
                </div>

                <button
                  className="btn-route"
                  onClick={() => {
                    setPage('book');
                    window.scrollTo(0, 0);
                  }}
                >
                  Book This Route →
                </button>

              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="section service-cities-section">
        <div className="container">
          <div className="section-label">Our Serviceable Cities</div>
          <h2 className="section-title"> Our Serviceable <span> Cities</span> in Tamil Nadu</h2>
          <p className="section-sub">From Chennai to Kanyakumari, our taxi network connects every major city with smooth rides, experienced drivers, and hassle-free booking services.</p>
          <div className="cities-flex">

            <div className="cities-grid">
              {/* LEFT LIST */}

              <ul>
                {citiesLeft.map((city, index) => (
                  <li key={index}>
                    <span className="dot"></span>
                    <a href="#" onClick={() => { setPage('book'); window.scrollTo(0, 0); }}>{city}</a>
                  </li>
                ))}
              </ul>

              {/* RIGHT LIST */}

              <ul>
                {citiesRight.map((city, index) => (
                  <li key={index}>
                    <span className="dot"></span>
                    <a href="#" onClick={() => { setPage('book'); window.scrollTo(0, 0); }}>{city}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cities-map">

              <img
                src="/images/tamilnadu-map.png"
                alt="Tamil Nadu Cities"
                width={650}
                height={650}
                className="map-image"
              />

            </div>
          </div>

        </div>
      </section>
      <StatsBar />

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-label">Testimonials</div>

          <h2 className="section-title">
            What Our <span>Customers</span> Say
          </h2>

          <p className="section-sub">
            Real reviews from thousands of happy travelers across Tamil Nadu.
          </p>

          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testi-card">
                <div className="testi-stars">
                  {'★'.repeat(t.rating)}
                </div>

                <p className="testi-text">
                  "{t.text}"
                </p>

                <div className="testi-author">
                  <div className="testi-avatar">
                    <img src={t.image} alt={t.name} />
                  </div>

                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-route">{t.route}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* App Coming Soon */}
      <div className="app-section">
        <div className="container">

          <div className="app-title">
            Tamil Nadu Top Taxi App — Coming Soon!
          </div>

          <p className="app-sub">
            Book cabs, track rides, and manage trips — all from your smartphone.
            Available soon.
          </p>

          <div className="app-btns">

            {/* GOOGLE PLAY */}
            <button
              className="app-btn"
              onClick={() =>
                alert(
                  'App coming soon! WhatsApp us at +91 8122148519 for updates.'
                )
              }
            >
              <div className="app-btn-icon">
                <img
                  src="/images/playstore.png"
                  alt="Google Play"
                />
              </div>

              <div className="app-btn-text">
                <div className="app-btn-small">Get it on</div>
                <div className="app-btn-label">Google Play</div>
              </div>
            </button>

            {/* APP STORE */}
            <button
              className="app-btn"
              onClick={() =>
                alert(
                  'App coming soon! WhatsApp us at +91 8122148519 for updates.'
                )
              }
            >
              <div className="app-btn-icon">
                <img
                  src="/images/app-store.png"
                  alt="App Store"
                />
              </div>

              <div className="app-btn-text">
                <div className="app-btn-small">Download on</div>
                <div className="app-btn-label">App Store</div>
              </div>
            </button>

            {/* WHATSAPP */}
            <button
              className="app-btn whatsapp-btn"
              onClick={() =>
                window.open('https://wa.me/918122148519', '_blank')
              }
            >
              <div className="app-btn-icon">
                <img
                  src="/images/whatsapp.png"
                  alt="WhatsApp"
                />
              </div>

              <div className="app-btn-text">
                <div className="app-btn-small">Get updates on</div>
                <div className="app-btn-label">WhatsApp</div>
              </div>
            </button>

          </div>
        </div>
      </div>
      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Frequently Asked <span>Questions</span></h2>
          <p className="section-sub">Everything you need to know about our taxi service.</p>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <span className={`faq-icon${openFaq === i ? ' open' : ''}`}>+</span>
                </div>
                <div className={`faq-a${openFaq === i ? ' open' : ''}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </>
  );
}
