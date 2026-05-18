import { NextResponse } from 'next/server';
import { calculateTripFare } from '../../../lib/fareCalculator';
import { getDrivingDistance } from '../../../lib/googleDistance';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function trim(v, max = 500) {
  if (v == null) return '';
  const s = String(v).trim();
  return s.length > max ? s.slice(0, max) : s;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const tripType = trim(body.tripType, 40);
  if (!['oneway', 'roundtrip', 'rental'].includes(tripType)) {
    return NextResponse.json({ ok: false, error: 'Invalid trip type.' }, { status: 400 });
  }

  const vehicleType = trim(body.vehicleType, 40) || 'Sedan';
  const rentalPackage = trim(body.rentalPackage, 80);

  let origin;
  let destination;

  if (tripType === 'rental') {
    origin = trim(body.rentalCity, 500);
    if (!origin) {
      return NextResponse.json({ ok: false, error: 'City / area is required.' }, { status: 400 });
    }
    if (!rentalPackage) {
      return NextResponse.json({ ok: false, error: 'Rental package is required.' }, { status: 400 });
    }
    destination = origin;
  } else if (tripType === 'roundtrip') {
    origin = trim(body.fromCity, 500);
    destination = trim(body.toCity, 500);
    if (!origin || !destination) {
      return NextResponse.json(
        { ok: false, error: 'From city and to city are required.' },
        { status: 400 }
      );
    }
  } else {
    origin = trim(body.pickup, 500);
    destination = trim(body.drop, 500);
    if (!origin || !destination) {
      return NextResponse.json(
        { ok: false, error: 'Pickup and drop locations are required.' },
        { status: 400 }
      );
    }
  }

  try {
    let distanceKm = 0;
    let durationSeconds = 0;

    if (tripType === 'rental') {
      const pkg = rentalPackage.match(/(\d+)\s*KM/i);
      distanceKm = pkg ? Number(pkg[1]) : 40;
      const hours = rentalPackage.match(/(\d+)\s*Hours?/i);
      durationSeconds = hours ? Number(hours[1]) * 3600 : 4 * 3600;
    } else {
      const route = await getDrivingDistance(origin, destination);
      distanceKm = route.distanceKm;
      durationSeconds = route.durationSeconds;
    }

    const estimate = calculateTripFare({
      tripType,
      vehicleType,
      distanceKm,
      durationSeconds,
      rentalPackage,
    });

    return NextResponse.json({
      ok: true,
      estimate: {
        ...estimate,
        origin,
        destination: tripType === 'rental' ? '—' : destination,
      },
    });
  } catch (err) {
    console.error('[trip-estimate]', err);
    const msg = err?.message || 'Could not estimate fare';
    return NextResponse.json(
      {
        ok: false,
        error:
          process.env.NODE_ENV === 'development'
            ? msg
            : 'Could not calculate trip fare. Check locations and try again.',
      },
      { status: 502 }
    );
  }
}
