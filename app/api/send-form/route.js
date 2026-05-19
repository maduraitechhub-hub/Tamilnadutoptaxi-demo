import { NextResponse } from 'next/server';
import { sendFormEmail } from '../../../lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX = 4000;

function trim(v, max = MAX) {
  if (v == null) return '';
  const s = String(v).trim();
  return s.length > max ? s.slice(0, max) : s;
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTime12h(value) {
  const s = String(value || '').trim();
  const match = /^(\d{1,2}):(\d{2})$/.exec(s);
  if (!match) return s;

  const hours24 = Number(match[1]);
  const minutes = match[2];
  if (!Number.isInteger(hours24) || hours24 < 0 || hours24 > 23) return s;

  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
}

function rowsHtml(obj) {
  return Object.entries(obj)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #eee;font-weight:600;">${escapeHtml(k)}</td><td style="padding:8px 12px;border:1px solid #eee;">${escapeHtml(String(v))}</td></tr>`
    )
    .join('');
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const formType = body?.formType;
  const payload = body?.payload;

  if (!formType || typeof payload !== 'object' || payload === null) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  let subject;
  let rows;

  try {
    if (formType === 'contact') {
      const customerName = trim(payload.customerName, 200);
      const phone = trim(payload.phone, 40);
      const email = trim(payload.email, 200);
      const subjectLine = trim(payload.subject, 200);
      const message = trim(payload.message, MAX);

      if (!customerName || !phone || !subjectLine || !message) {
        return NextResponse.json(
          { ok: false, error: 'Name, phone, subject, and message are required.' },
          { status: 400 }
        );
      }

      subject = `[Website Contact] ${subjectLine}`;
      rows = {
        Name: customerName,
        Phone: phone,
        Email: email || '—',
        Subject: subjectLine,
        Message: message,
      };
    } else if (formType === 'booking') {
      const tripType = trim(payload.tripType, 40);
      if (!['oneway', 'roundtrip', 'rental'].includes(tripType)) {
        return NextResponse.json({ ok: false, error: 'Invalid trip type.' }, { status: 400 });
      }

      const tripTypeLabel =
        tripType === 'oneway' ? 'One way' : tripType === 'roundtrip' ? 'Round trip' : 'Rental';

      subject = `[Website Booking] ${tripTypeLabel}`;

      const fieldLabels = {
        customerName: 'Name',
        phone: 'Phone',
        pickup: 'Pickup',
        drop: 'Drop',
        fromCity: 'From city',
        toCity: 'To city',
        pickupDate: 'Pickup date',
        pickupTime: 'Pickup time',
        returnDate: 'Return date',
        rentalCity: 'City / area',
        rentalPackage: 'Package',
        vehicleType: 'Vehicle type',
        estimatedAmountFormatted: 'Estimated fare',
        estimatedAmount: 'Estimated fare (₹)',
        totalDistance: 'Total distance',
        totalDuration: 'Total duration',
        ratePerKm: 'Rate per km',
        driverAllowance: 'Driver allowance',
      };

      rows = { 'Trip type': tripTypeLabel };
      for (const [k, v] of Object.entries(payload)) {
        if (k === 'tripType') continue;
        const label = fieldLabels[k] || k;
        let value = trim(v, k === 'message' ? MAX : 500);
        if (k === 'pickupTime') value = formatTime12h(value);
        rows[label] = value;
      }
    } else if (formType === 'partner') {
      const fullName = trim(payload.fullName, 200);
      const phone = trim(payload.phone, 40);
      const email = trim(payload.email, 200);
      const city = trim(payload.city, 120);
      const vehicle = trim(payload.vehicle, 120);
      const experience = trim(payload.experience, 120);
      const notes = trim(payload.notes, MAX);

      if (!fullName || !phone) {
        return NextResponse.json(
          { ok: false, error: 'Name and phone are required.' },
          { status: 400 }
        );
      }

      subject = '[Website Partner] Driver inquiry';
      rows = {
        Name: fullName,
        Phone: phone,
        Email: email || '—',
        'City / District': city || '—',
        'Vehicle type': vehicle || '—',
        Experience: experience || '—',
        Notes: notes || '—',
      };
    } else {
      return NextResponse.json({ ok: false, error: 'Unknown form type.' }, { status: 400 });
    }

    let replyTo;
    if (formType === 'contact' || formType === 'partner') {
      const em = trim(payload.email, 200);
      replyTo = em.includes('@') ? em : undefined;
    }

    const text = Object.entries(rows)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const html = `
      <table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:14px;">
        <tbody>${rowsHtml(rows)}</tbody>
      </table>
    `;

    await sendFormEmail({ subject, html, text, replyTo });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[send-form]', err);
    const msg = err?.message || 'Send failed';
    if (msg.includes('Missing SMTP')) {
      return NextResponse.json(
        { ok: false, error: 'Email is not configured on the server (SMTP env vars).' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        ok: false,
        error: process.env.NODE_ENV === 'development' ? msg : 'Failed to send email. Please try again later.',
      },
      { status: 500 }
    );
  }
}
