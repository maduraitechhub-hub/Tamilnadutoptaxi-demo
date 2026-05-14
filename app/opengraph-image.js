import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'TamilNadu Drop Taxi — Premium Cab Service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #0f766e 0%, #0d9488 45%, #115e59 100%)',
          fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            padding: '0 48px',
            letterSpacing: '-0.02em',
          }}
        >
          TamilNadu Drop Taxi
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: '#ccfbf1',
            marginTop: 20,
            textAlign: 'center',
          }}
        >
          Premium cab service · All 38 districts · Since 2015
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            color: '#99f6e4',
            opacity: 0.95,
          }}
        >
          Book online · Outstation · Airport · Safe & transparent fares
        </div>
      </div>
    ),
    { ...size }
  );
}
