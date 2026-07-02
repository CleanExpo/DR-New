import { NextRequest, NextResponse } from 'next/server';
import { runCertExpirySweep } from '@/lib/training/cert-expiry-sweep';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * DR-894 — Daily certificate-expiry sweep (registered in vercel.json crons).
 *
 * Auth mirrors the other cron routes (e.g. health-check): the shared
 * CRON_SECRET, via either the x-vercel-cron-secret header or a Bearer token.
 */
function isValidCronRequest(request: NextRequest): boolean {
  const cronSecret =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedSecret = process.env.CRON_SECRET;

  if (process.env.NODE_ENV === 'development' && !expectedSecret) {
    return true;
  }

  if (!expectedSecret) return false;
  return cronSecret === expectedSecret;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await runCertExpirySweep();

    console.log('[CERT EXPIRY SWEEP] Completed', {
      timestamp: new Date().toISOString(),
      ...result,
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      result,
    });
  } catch (error) {
    console.error('Cert expiry sweep cron error:', error);
    return NextResponse.json(
      {
        error: 'Cert expiry sweep failed',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
