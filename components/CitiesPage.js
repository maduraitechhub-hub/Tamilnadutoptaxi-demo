'use client';

const cities = [
  {
    image: '/images/madurai.png',
    name: 'Madurai',
    info: 'Meenakshi Amman Temple City',
    routes: '12 routes'
  },
  {
    image: '/images/chennai.png',
    name: 'Chennai',
    info: 'Tamil Nadu Capital',
    routes: '25 routes'
  },
  {
    image: '/images/coimbatore.png',
    name: 'Coimbatore',
    info: 'Manchester of South India',
    routes: '18 routes'
  },
  {
    image: '/images/trichy.png',
    name: 'Trichy',
    info: 'Rock Fort City',
    routes: '14 routes'
  },
  {
    image: '/images/salem.png',
    name: 'Salem',
    info: 'Steel City of Tamil Nadu',
    routes: '10 routes'
  },
 
];

export default function CitiesPage({ setPage }) {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-title">Cities We Serve</div>
        <p className="page-hero-sub">Reliable taxi service available across all major cities in Tamil Nadu, <br/> enjoy timely pickups, professional drivers, and hassle-free rides for local and outstation trips.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="section-label">Coverage</div>
          <h2 className="section-title">Taxi Service Across <span>Tamil Nadu</span></h2>
          <p className="section-sub">From major metro cities to smaller towns, we provide reliable taxi services with the same trusted quality everywhere with a safe travel experience.</p>
          <div className="cities-grid">
            {cities.map((c) => (
              <div
                key={c.name}
                className="city-card"
                onClick={() => {
                  setPage('book');
                  window.scrollTo(0, 0);
                }}
              >
                <div className="city-img">
                  <img src={c.image} alt={c.name} />
                </div>

                <div className="city-body">
                  <div className="city-name">{c.name}</div>
                  <div className="city-info">{c.info}</div>

                  <div
                    style={{
                      fontSize: 12,
                      color: 'var(--green)',
                      fontWeight: 600,
                      marginBottom: 10
                    }}
                  >
                    🗺️ {c.routes}
                  </div>

                  <button className="btn-city">
                    Book Taxi Here →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
