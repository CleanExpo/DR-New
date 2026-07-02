/**
 * Contractor Payout Sweep (DR-896)
 *
 * GET /api/cron/contractor-payout-sweep — daily Vercel cron (CRON_SECRET).
 *
 * Payouts are DEFERRED: job completion only enqueues (marks the payment
 * COMPLETED); this sweep is the ONLY automatic executor. Per the payments
 * spec ("Deferred payout via sweep cron") it selects COMPLETED payments where
 * `processedAt + 30d <= now` (the dispute-window hold), skips contractors who
 * are not currently payable, and transfers each idempotently through the
 * canonical ledgered path (`triggerPayoutForBooking` -> `createTransfer`).
 *
 * Window semantics:
 *   - HOLD (30 days = DISPUTE_WINDOW_DAYS): a payment 31 days old is paid in
 *     one cycle; one 29 days old is not.
 *   - QUARANTINE (older than 90 days = hold + 60-day sweep window): never
 *     auto-paid. A QUARANTINED ContractorPayout ledger row is written and a
 *     warning logged so admins can release it deliberately (the admin payout
 *     routes reuse the same idempotency key, so release stays double-pay safe).
 *     This protects the first production run from blind-paying months-old
 *     backlog.
 *
 * Idempotent & crash-safe: every transfer goes through the ContractorPayout
 * ledger (unique idempotencyKey `payout:<paymentId>`) + the same deterministic
 * Stripe idempotency key (DR-897 pattern). Re-running the sweep never
 * double-pays; a crash mid-run is repaired by the next run.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  DISPUTE_WINDOW_DAYS,
  calculatePayoutAmount,
  getContractorPayoutProfile,
  triggerPayoutForBooking,
} from '@/lib/payments/contractor-payout';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Payments older than this are quarantined, never auto-paid. */
export const QUARANTINE_AFTER_DAYS = DISPUTE_WINDOW_DAYS + 60; // 90 days

/** Bounded batch per run — the daily cadence drains any backlog. */
const SWEEP_BATCH_LIMIT = 100;

const DAY_MS = 24 * 60 * 60 * 1000;

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

export type SweepSkipReason =
  | 'HOLD_WINDOW_NOT_PASSED'
  | 'ALREADY_QUARANTINED'
  | 'QUARANTINED_TOO_OLD'
  | 'CONTRACTOR_PROFILE_NOT_FOUND'
  | 'NO_CONNECT_ACCOUNT'
  | 'PAYOUTS_DISABLED'
  | 'CHARGES_DISABLED';

interface SweepResults {
  paid: Array<{ paymentId: string; bookingId: string; transferId: string; amountAUD: number }>;
  alreadyPaid: Array<{ paymentId: string; transferId: string | null }>;
  skipped: Array<{ paymentId: string; contractorId: string | null; reason: SweepSkipReason }>;
  failed: Array<{ paymentId: string; bookingId: string; error: string }>;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = Date.now();
  const holdCutoff = new Date(now - DISPUTE_WINDOW_DAYS * DAY_MS);
  const quarantineCutoff = new Date(now - QUARANTINE_AFTER_DAYS * DAY_MS);

  const results: SweepResults = { paid: [], alreadyPaid: [], skipped: [], failed: [] };

  try {
    // Eligible universe: COMPLETED payments past the dispute-window hold with
    // an assigned contractor. "No successful ledger row exists" is enforced
    // per-payment below (and again, race-safely, inside the ledgered path).
    const payments = await prisma.payment.findMany({
      where: {
        status: 'COMPLETED',
        processedAt: { lte: holdCutoff },
        contractorId: { not: null },
      },
      select: {
        id: true,
        bookingId: true,
        contractorId: true,
        processedAt: true,
        amountAUD: true,
      },
      orderBy: { processedAt: 'asc' },
      take: SWEEP_BATCH_LIMIT,
    });

    for (const payment of payments) {
      const idempotencyKey = `payout:${payment.id}`;

      // Defence in depth: never pay inside the hold window, whatever the
      // query returned (a payment 29 days old is NOT paid).
      if (!payment.processedAt || payment.processedAt.getTime() > holdCutoff.getTime()) {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'HOLD_WINDOW_NOT_PASSED',
        });
        continue;
      }

      // Ledger pre-check: a TRANSFERRED row means this payment is already
      // paid — re-running the sweep makes no Stripe call for it.
      const ledger = await prisma.contractorPayout.findUnique({ where: { idempotencyKey } });
      if (ledger?.status === 'TRANSFERRED') {
        results.alreadyPaid.push({ paymentId: payment.id, transferId: ledger.stripeTransferId });
        continue;
      }
      if (ledger?.status === 'QUARANTINED') {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'ALREADY_QUARANTINED',
        });
        continue;
      }

      // Quarantine: older than the sweep window — flag for admin, never
      // auto-pay (crash-safe: the QUARANTINED row is idempotent too).
      if (payment.processedAt.getTime() < quarantineCutoff.getTime()) {
        console.warn(
          `[payout-sweep] QUARANTINED payment ${payment.id} (booking ${payment.bookingId}): ` +
            `processedAt ${payment.processedAt.toISOString()} is older than ` +
            `${QUARANTINE_AFTER_DAYS} days — requires manual admin release`
        );
        if (!ledger) {
          const { platformFee, netAmount } = calculatePayoutAmount(
            parseFloat(payment.amountAUD.toString())
          );
          try {
            await prisma.contractorPayout.create({
              data: {
                idempotencyKey,
                contractorId: payment.contractorId,
                bookingId: payment.bookingId,
                paymentId: payment.id,
                amountAUD: netAmount,
                platformFeeAUD: platformFee,
                status: 'QUARANTINED',
                failureReason: `Quarantined by payout sweep: payment older than ${QUARANTINE_AFTER_DAYS} days`,
              },
            });
          } catch {
            // Unique-key race with a concurrent run — the row exists; fine.
          }
        }
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'QUARANTINED_TOO_OLD',
        });
        continue;
      }

      // Capability gate (DR-896 item 3, Connect flags synced by the
      // account.updated webhook — PR #192): skip contractors who are not
      // currently payable, with a recorded reason. Skipped payments stay
      // PENDING and are retried on the next sweep.
      const profile = await getContractorPayoutProfile(payment.contractorId as string);
      if (!profile) {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'CONTRACTOR_PROFILE_NOT_FOUND',
        });
        continue;
      }
      if (!profile.stripeConnectAccountId) {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'NO_CONNECT_ACCOUNT',
        });
        continue;
      }
      if (!profile.stripePayoutsEnabled) {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'PAYOUTS_DISABLED',
        });
        continue;
      }
      if (!profile.stripeChargesEnabled) {
        results.skipped.push({
          paymentId: payment.id,
          contractorId: payment.contractorId,
          reason: 'CHARGES_DISABLED',
        });
        continue;
      }

      // Pay through the canonical ledgered, idempotent path. One payment
      // failing must never abort the rest of the sweep.
      try {
        const payout = await triggerPayoutForBooking(payment.bookingId);
        if (payout.status === 'TRANSFERRED') {
          results.paid.push({
            paymentId: payment.id,
            bookingId: payment.bookingId,
            transferId: payout.payoutId,
            amountAUD: payout.amount,
          });
        } else {
          results.alreadyPaid.push({ paymentId: payment.id, transferId: payout.payoutId });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error(
          `[payout-sweep] payout FAILED for payment ${payment.id} (booking ${payment.bookingId}): ${message}`
        );
        results.failed.push({ paymentId: payment.id, bookingId: payment.bookingId, error: message });
      }
    }

    return NextResponse.json({
      success: results.failed.length === 0,
      timestamp: new Date().toISOString(),
      holdCutoff: holdCutoff.toISOString(),
      quarantineCutoff: quarantineCutoff.toISOString(),
      counts: {
        scanned: payments.length,
        paid: results.paid.length,
        alreadyPaid: results.alreadyPaid.length,
        skipped: results.skipped.length,
        failed: results.failed.length,
      },
      ...results,
    });
  } catch (error) {
    console.error('[payout-sweep] sweep crashed:', error);
    return NextResponse.json(
      { error: 'Payout sweep failed', message: 'Internal server error' },
      { status: 500 }
    );
  }
}
