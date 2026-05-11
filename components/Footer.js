'use client';

export default function Footer({ setPage }) {
  const go = (id) => {
    setPage(id);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/logo.png" alt="Tamil Nadu Top Taxi" className="footer-logo-img" />
              <div>
                <div className="footer-logo-name">TamilNadu Top Taxi</div>
                <div className="footer-logo-sub">Premium Cab Service</div>
              </div>
            </div>
            <p className="footer-brand-desc">
              Tamil Nadu's most trusted taxi service. Safe, affordable, and reliable cab booking
              across all 38 districts since 2015.
            </p>
            <div className="footer-socials">
              {[
                {
                  img: "/images/fb.png",
                  name: "Facebook",
                  link: "https://facebook.com",
                },
                {
                  img: "/images/insta.png",
                  name: "Instagram",
                  link: "https://instagram.com",
                },
                {
                  img: "/images/whatsapp.png",
                  name: "WhatsApp",
                  link: "https://wa.me/919999999999",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title={item.name}
                >
                  <img src={item.img} alt={item.name} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              {[
                ['Home', 'home'],
                ['Book Taxi', 'book'],
                ['Cities', 'cities'],
                ['About Us', 'about'],
                ['Partner', 'partner'],
                ['Contact', 'contact'],
              ].map(([label, id]) => (
                <li key={id}>
                  <button onClick={() => go(id)}>{label}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Services</div>
            <ul className="footer-links">
              {[
                 'Airport Drop/Pickup',
                'Outstation Cabs',
                'One Way Taxi',
                'Round Trip Cabs',               
              ].map((s) => (
                <li key={s}>
                  <a href="#">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Popular Routes</div>
            <ul className="footer-links">
              {[
                'Madurai → Chennai',
                'Chennai → Bangalore',
                'Madurai → Coimbatore',
                'Trichy → Chennai',
                'Coimbatore → Ooty',
                'Salem → Chennai',
              ].map((r) => (
                <li key={r}>
                  <button onClick={() => go('book')}>{r}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 <span className="footer-bottom-brand">TamilNadu Top Taxi</span>. All rights reserved.
          </span>
          <span>Made with ❤️ in Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
