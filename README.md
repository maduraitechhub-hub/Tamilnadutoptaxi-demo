# tamilnadudroptaxi — Next.js site

Premium cab service website (**TamilNadu Drop Taxi**) for Tamil Nadu, built with **Next.js 14** (App Router).

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
tamilnadudroptaxi/
├── app/
│   ├── layout.js          # Root layout (metadata, global CSS import)
│   └── page.js            # Entry page (renders main app shell component)
├── components/
│   ├── TamilNaduDropTaxi.js # Main SPA shell (file name; brand: TamilNadu Drop Taxi)
│   ├── Navbar.js            # Fixed responsive navigation
│   ├── Footer.js            # Site footer
│   ├── BookingForm.js       # Reusable booking form
│   ├── StatsBar.js          # Stats section
│   ├── HomePage.js          # Home page (hero, fleet, routes, FAQ, etc.)
│   ├── BookTaxiPage.js      # Full booking page with fare estimator
│   ├── CitiesPage.js        # Cities coverage page
│   ├── AboutPage.js         # About us page
│   ├── PartnerPage.js       # Driver partner registration
│   └── ContactPage.js       # Contact form & info
├── styles/
│   └── globals.css          # All styles (extracted from original JSX)
├── next.config.js
└── package.json
```

## 🛠 Tech Stack

- **Next.js 14** with App Router
- **React 18**
- **CSS** (plain CSS, extracted from inline styles)
- **Google Fonts** – Poppins & Inter

## 📱 Features

- Fully responsive (mobile, tablet, desktop)
- Multi-page SPA routing (Home, Book, Cities, About, Partner, Contact)
- Booking form with fare estimator
- WhatsApp floating button
- Mobile hamburger menu
- FAQ accordion
- Animated hero section

## ✏️ Customisation

- **Phone / WhatsApp number**: search `9876543210` across components and replace with your actual number.
- **Pricing**: update `fareDetails` in `components/BookTaxiPage.js`.
- **Cities**: edit the `cities` array in `components/CitiesPage.js`.
- **Routes**: edit the `routes` array in `components/HomePage.js`.
