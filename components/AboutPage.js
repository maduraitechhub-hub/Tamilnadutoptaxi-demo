const values = [
  'Safety First Approach',
  'Transparent Pricing',
  'Verified Drivers Only',
  '24/7 Customer Support',
  'GPS Tracked Rides',
  'No Hidden Charges',
  'Pan Tamil Nadu Coverage',
  'Comfortable Fleet',
];

export default function AboutPage() {
  return (
    <>
      <div className="page-hero">
        <div className="page-hero-title">About Us</div>
        <p className="page-hero-sub">Tamil Nadu’s most trusted taxi service since 2015,  delivering safe and reliable rides. <br/> With professional drivers and quality service, we make every journey comfortable and hassle-free.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-placeholder">
              <img src="images/aboutimg.png" alt="About Tamil Nadu Top Taxi"  className="abtimg"/>
              <div className="about-year-badge">
                <div className="about-year">10+</div>
                <div className="about-year-label">Years of Service</div>
              </div>
            </div>
            <div>
              <div className="about-label">Our Story</div>
              <h2 className="about-title">Your trusted travel connection across Tamil Nadu.</h2>
              <p className="about-desc">
                Founded in 2015 in Madurai, Tamil Nadu Top Taxi started with a simple mission: to make safe, reliable intercity travel accessible to everyone across Tamil Nadu. What began as a small fleet of 5 cars has grown into a trusted network of 500+ verified drivers covering all 38 districts.
              </p>
              <p className="about-desc">
                We understand the unique needs of Tamil Nadu travelers — from pilgrimage trips to Madurai and Rameswaram, to corporate travel between Chennai and Coimbatore. Our local knowledge, combined with professional service standards, makes us the preferred choice for millions.
              </p>
              <div className="about-values">
                {values.map((v) => (
                  <div key={v} className="about-value">
                    <div className="about-value-dot" />
                    {v}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
