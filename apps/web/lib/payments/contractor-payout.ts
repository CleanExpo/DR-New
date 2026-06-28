/**
 * Contractor Payout Automation (DR-858 N-01 / N-02)
 *
 * Moves the contractor's share from the PLATFORM Stripe balance to the
 * contractor's connected account via `transfers.create` (destination charge
 * model) — NOT `payouts.create`, which would have paid out of the connected
 * account's own balance.
 *
 * No-double-pay is enforced at two layers:
 *   1. A deterministic Stripe idempotency key (`payout:<paymentId>`).
 *   2. The ContractorPayout ledger: unique `idempotencyKey` + unique
 *      `stripeTransferId`.
 *
 * NOTE (N-10, tracked P1): platform fee here is a flat 20% constant while
 * Payment.platformFeePercentage defaults to 15%. Behaviour is intentionally
 * preserved in this PR; reconciling the single source of truth is N-10.
 */

import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';
import Stripe from 'stripe';
import { emitPayoutInitiated } from '@/lib/realtime/payment-events';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null;

export const PLATFORM_FEE_PERCENTAGE = 20; // 20% platform fee
export const CONTRACTOR_PAYOUT_PERCENTAGE = 100 - PLATFORM_FEE_PERCENTAGE; // 80%
export const DISPUTE_WINDOW_DAYS = 30;

export function calculatePayoutAmount(jobAmount: number) {
  const platformFee = jobAmount * (PLATFORM_FEE_PERCENTAGE / 100);
  const netAmount = jobAmount * (CONTRACTOR_PAYOUT_PERCENTAGE / 100);
  return { grossAmount: jobAmount, platformFee, netAmount };
}

export function isDisputeWindowPassed(paymentDate: Date): boolean {
  const daysSincePayment = Math.floor(
    (Date.now() - paymentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSincePayment >= DISPUTE_WINDOW_DAYS;
}

export async function getPayoutAmount(bookingId: string) {
  const payment = await prisma.payment.findFirst({
    where: { bookingId },
    include: { booking: { select: { id: true, contractorId: true } } },
  });

  if (!payment) throw new Error(`No payment found for booking: ${bookingId}`);
  if (payment.status !== 'COMPLETED') {
    throw new Error(`Cannot payout for ${payment.status} payment`);
  }

  const jobAmount = parseFloat(payment.amountAUD.toString());
  const { platformFee, netAmount } = calculatePayoutAmount(jobAmount);

  return {
    paymentId: payment.id,
    jobAmount,
    platformFee,
    netAmount,
    contractorId: payment.contractorId,
    processedAt: payment.processedAt,
  };
}

async function validateContractorStripeAccount(contractorId: string): Promise<string> {
  const contractorProfile = await prisma.contractorProfile.findFirst({
    where: { contractorId },
    select: { stripeConnectAccountId: true },
  });

  if (!contractorProfile?.stripeConnectAccountId) {
    throw new Error(`Contractor ${contractorId} does not have Stripe Connect account`);
  }
  return contractorProfile.stripeConnectAccountId;
}

/**
 * Move funds from the platform balance to a connected account.
 * `idempotencyKey` makes the call safe to retry: Stripe returns the SAME
 * transfer for a repeated key (within its idempotency window).
 */
async function createStripeTransfer(
  connectedAccountId: string,
  amountAUD: number,
  description: string,
  idempotencyKey: string,
  metadata: Record<string, string> = {}
): Promise<string> {
  if (!stripe) throw new Error('Stripe is not configured');

  const amountInCents = Math.round(amountAUD * 100);

  const transfer = await stripe.transfers.create(
    {
      amount: amountInCents,
      currency: 'aud',
      destination: connectedAccountId,
      description,
      metadata,
    },
    { idempotencyKey }
  );

  return transfer.id;
}

export interface PayoutResult {
  payoutId: string;
  bookingId?: string;
  contractorId?: string;
  amount: number;
  status: 'TRANSFERRED' | 'ALREADY_PAID';
}

/**
 * Trigger payout for a completed booking (after the dispute window).
 * Idempotent: a second call for the same payment returns the existing transfer.
 */
export async function triggerPayoutForBooking(bookingId: string): Promise<PayoutResult> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      contractor: { select: { id: true, businessName: true, userId: true } },
    },
  });

  if (!booking) throw new Error(`Booking not found: ${bookingId}`);
  if (!booking.contractorId) throw new Error(`No contractor assigned to booking: ${bookingId}`);

  const payoutInfo = await getPayoutAmount(bookingId);

  if (!payoutInfo.processedAt) throw new Error('Payment not processed yet');
  if (!isDisputeWindowPassed(payoutInfo.processedAt)) {
    throw new Error('Dispute window has not yet passed');
  }

  const stripeConnectId = await validateContractorStripeAccount(booking.contractorId);

  // Deterministic key: one payout per payment.
  const idempotencyKey = `payout:${payoutInfo.paymentId}`;

  // Layer-2 guard: if we already transferred for this payment, return it.
  const existing = await prisma.contractorPayout.findUnique({ where: { idempotencyKey } });
  if (existing?.status === 'TRANSFERRED' && existing.stripeTransferId) {
    return {
      payoutId: existing.stripeTransferId,
      bookingId,
      contractorId: booking.contractorId,
      amount: parseFloat(existing.amountAUD.toString()),
      status: 'ALREADY_PAID',
    };
  }

  // Create (or reuse) the PENDING ledger row. The unique idempotencyKey makes
  // concurrent creators collide; the loser re-reads the winner's row.
  let ledger = existing;
  if (!ledger) {
    try {
      ledger = await prisma.contractorPayout.create({
        data: {
          idempotencyKey,
          contractorId: booking.contractorId,
          bookingId,
          paymentId: payoutInfo.paymentId,
          connectedAccount: stripeConnectId,
          amountAUD: payoutInfo.netAmount,
          platformFeeAUD: payoutInfo.platformFee,
          status: 'PENDING',
        },
      });
    } catch {
      // Another worker created it first — re-read and bail if already paid.
      const concurrent = await prisma.contractorPayout.findUnique({ where: { idempotencyKey } });
      if (concurrent?.status === 'TRANSFERRED' && concurrent.stripeTransferId) {
        return {
          payoutId: concurrent.stripeTransferId,
          bookingId,
          contractorId: booking.contractorId,
          amount: parseFloat(concurrent.amountAUD.toString()),
          status: 'ALREADY_PAID',
        };
      }
      ledger = concurrent;
    }
  }
  if (!ledger) throw new Error('Failed to create payout ledger row');

  let transferId: string;
  try {
    transferId = await createStripeTransfer(
      stripeConnectId,
      payoutInfo.netAmount,
      `Payout for booking ${bookingId}`,
      idempotencyKey,
      { bookingId, paymentId: payoutInfo.paymentId ?? '' }
    );
  } catch (error) {
    await prisma.contractorPayout.update({
      where: { id: ledger.id },
      data: {
        status: 'FAILED',
        failureReason: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    throw new Error(
      `Failed to create Stripe transfer: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  await prisma.contractorPayout.update({
    where: { id: ledger.id },
    data: { status: 'TRANSFERRED', stripeTransferId: transferId },
  });

  await emitPayoutInitiated(
    transferId,
    bookingId,
    booking.contractor!.id,
    payoutInfo.netAmount,
    payoutInfo.platformFee
  );

  return {
    payoutId: transferId,
    bookingId,
    contractorId: booking.contractorId,
    amount: payoutInfo.netAmount,
    status: 'TRANSFERRED',
  };
}

/**
 * Manual payout for a contractor (admin only). Uses a fresh idempotency key per
 * call (legitimate manual payouts may repeat), still recorded in the ledger.
 */
export async function manualPayoutToContractor(
  contractorId: string,
  amountAUD: number,
  description: string
): Promise<PayoutResult> {
  if (!stripe) throw new Error('Stripe is not configured');

  const stripeConnectId = await validateContractorStripeAccount(contractorId);
  const idempotencyKey = `payout:manual:${randomUUID()}`;

  const ledger = await prisma.contractorPayout.create({
    data: {
      idempotencyKey,
      contractorId,
      connectedAccount: stripeConnectId,
      amountAUD,
      platformFeeAUD: 0,
      status: 'PENDING',
    },
  });

  let transferId: string;
  try {
    transferId = await createStripeTransfer(stripeConnectId, amountAUD, description, idempotencyKey, {
      contractorId,
      kind: 'manual',
    });
  } catch (error) {
    await prisma.contractorPayout.update({
      where: { id: ledger.id },
      data: {
        status: 'FAILED',
        failureReason: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    throw new Error(
      `Failed to create manual transfer: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }

  await prisma.contractorPayout.update({
    where: { id: ledger.id },
    data: { status: 'TRANSFERRED', stripeTransferId: transferId },
  });

  await emitPayoutInitiated(transferId, 'manual', contractorId, amountAUD, 0);

  return { payoutId: transferId, contractorId, amount: amountAUD, status: 'TRANSFERRED' };
}

/** Retrieve a transfer's reversal state from Stripe (platform account). */
export async function getPayoutStatus(transferId: string) {
  if (!stripe) throw new Error('Stripe is not configured');

  const transfer = await stripe.transfers.retrieve(transferId);
  return {
    id: transfer.id,
    amount: transfer.amount / 100,
    currency: transfer.currency?.toUpperCase(),
    reversed: transfer.reversed,
    amountReversed: transfer.amount_reversed / 100,
    destination:
      typeof transfer.destination === 'string'
        ? transfer.destination
        : transfer.destination?.id ?? null,
  };
}

/**
 * Contractor earnings summary. `totalPaidOut` is derived from the payout ledger
 * (the source of truth) — no ContractorProfile ghost fields.
 */
export async function getContractorEarnings(contractorId: string) {
  const [payments, paidAgg] = await Promise.all([
    prisma.payment.findMany({
      where: { contractorId, status: 'COMPLETED' },
      select: { amountAUD: true, processedAt: true, createdAt: true },
      orderBy: { processedAt: 'desc' },
    }),
    prisma.contractorPayout.aggregate({
      where: { contractorId, status: 'TRANSFERRED' },
      _sum: { amountAUD: true },
    }),
  ]);

  const grossEarnings = payments.reduce(
    (total, payment) => total + parseFloat(payment.amountAUD.toString()),
    0
  );

  const expectedPayouts = payments
    .filter((p) => p.processedAt && isDisputeWindowPassed(p.processedAt))
    .reduce((total, payment) => {
      const { netAmount } = calculatePayoutAmount(parseFloat(payment.amountAUD.toString()));
      return total + netAmount;
    }, 0);

  const totalPaidOut = paidAgg._sum.amountAUD
    ? parseFloat(paidAgg._sum.amountAUD.toString())
    : 0;

  return {
    totalEarnings: grossEarnings,
    totalPaidOut,
    pendingPayout: Math.max(0, expectedPayouts - totalPaidOut),
    paymentCount: payments.length,
    lastPayment: payments[0]?.processedAt || null,
  };
}
