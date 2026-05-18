'use client';
import { useState, useEffect } from 'react';
import { pageSeo, applySeoToDocument } from '../lib/seoConfig';
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import BookTaxiPage from './BookTaxiPage';
import CitiesPage from './CitiesPage';
import AboutPage from './AboutPage';
import PartnerPage from './PartnerPage';
import ContactPage from './ContactPage';
import Image from 'next/image';

export default function TamilNaduDropTaxi() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    const seo = pageSeo[page] ?? pageSeo.home;
    applySeoToDocument(seo);
  }, [page]);

  return (
    <div className="tntt-root">
      <Navbar page={page} setPage={setPage} />
      <main style={{ paddingTop: 0 }}>
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'book' && <BookTaxiPage />}
        {page === 'cities' && <CitiesPage setPage={setPage} />}
        {page === 'about' && <AboutPage />}
        {page === 'partner' && <PartnerPage />}
        {page === 'contact' && <ContactPage />}
      </main>
      <Footer setPage={setPage} />
      <button
        className="whatsapp-float"
        onClick={() => window.open('https://wa.me/918122148519', '_blank')}
        title="Chat on WhatsApp"
      >
        <Image src="/images/floatingwb.png" width={58} height={58} alt="WhatsApp" className="whatsapp-icon" />
      </button>
    </div>
  );
}
