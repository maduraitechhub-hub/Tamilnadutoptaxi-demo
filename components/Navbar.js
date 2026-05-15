'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Book Taxi', id: 'book' },
  { label: 'Cities', id: 'cities' },
  { label: 'About Us', id: 'about' },
  { label: 'Partner', id: 'partner' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setPage(id);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go('home')}>
            <Image src="/logo.png" alt="TamilNadu Drop Taxi Logo" className="nav-logo-img" width={100} height={100} />
            <div className="nav-logo-text">
              <span className="nav-logo-main">TamilNadu Drop Taxi</span>
              <span className="nav-logo-sub">Premium Cab Service</span>
            </div>
          </div>
          <div className="nav-links">
            {navItems.map((n) => (
              <button
                key={n.id}
                className={`nav-link${page === n.id ? ' active' : ''}`}
                onClick={() => go(n.id)}
              >
                {n.label}
              </button>
            ))}
            <button className="nav-cta" onClick={() => go('book')}>
              Book Now
            </button>
          </div>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map((n) => (
          <button
            key={n.id}
            className={`nav-link${page === n.id ? ' active' : ''}`}
            onClick={() => go(n.id)}
          >
            {n.label}
          </button>
        ))}
        <button className="nav-cta" onClick={() => go('book')}>
          Book Now
        </button>
      </div>
    </>
  );
}
