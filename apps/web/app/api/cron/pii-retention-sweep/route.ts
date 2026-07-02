/**
 * PII retention sweep cron (DR-902, APP 11.2).
 *
 * GET /api/cron/pii-retention-sweep — daily Vercel cron, CRON_SECRET-gated
 * (same gate as app/api/cron/health-check/route.ts).
 *
 * SAFETY MODEL — DRY RUN BY DEFAULT:
 *   - Unless the env var PII_SWEEP_EXECUTE=true is set, every run is a DRY
 *     RUN: it reports, per PII class, what WOULD be destroyed/de-identified
 *     (with counts and carve-out held-back counts) and writes NOTHING.
 *   - `?dryRun=1` forces a dry run even when PII_SWEEP_EXECUTE=true — the
 *     owner can always preview safely.
 *   - Destruction therefore cannot happen until the owner both signs off the
 *     retention windows in lib/privacy/pii-retention-policy.ts (OWNER-TUNABLE)
 *     and deliberately flips PII_SWEEP_EXECUTE=true.
 *
 * Carve-outs (legal hold, active dispute/claim, 7-year financial floor) are
 * enforced inside the sweep service BEFORE any destruction — see
 * lib/privacy/pii-retention-sweep.ts.
 */

import { NextRequest, NextResponse } from 'next/server';
import { runPiiRetentionSweep } from '@/lib/privacy/pii-retention-sweep';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Same CRON_SECRET gate as app/api/cron/health-check/route.ts.
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

  const url = new URL(request.url);
  const dryRunParam = url.searchParams.get('dryRun');
  const dryRunForced = dryRunParam === '1' || dryRunParam === 'true';

  // Execute ONLY when explicitly enabled by env AND not overridden by query.
  const execute = process.env.PII_SWEEP_EXECUTE === 'true' && !dryRunForced;

  try {
    const result = await runPiiRetentionSweep({ execute });

    console.log(
      `[pii-retention-sweep] mode=${result.mode} eligible=${result.totals.eligible} ` +
        `wouldDestroy=${result.totals.wouldDestroy} destroyed=${result.totals.destroyed} ` +
        `heldBack=${result.totals.heldBack}`
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      dryRunForced,
      executeEnabled: process.env.PII_SWEEP_EXECUTE === 'true',
      ...result,
    });
  } catch (error) {
    console.error('[pii-retention-sweep] sweep crashed:', error);
    return NextResponse.json(
      { error: 'PII retention sweep failed', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
