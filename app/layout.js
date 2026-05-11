import '../styles/globals.css';

export const metadata = {
  title: 'Tamil Nadu Top Taxi – Premium Cab Service',
  description: "Tamil Nadu's most trusted taxi service. Safe, affordable, and reliable cab booking across all 38 districts since 2015.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
