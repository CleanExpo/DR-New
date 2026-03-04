/**
 * Contractor Payout Automation
 *
 * Handles automatic payout to contractors via Stripe Connect:
 * 1. Check 30-day dispute window has passed
 * 2. Calculate contractor's share (80% after 20% platform fee)
 * 3. Create payout via Stripe Connect
 * 4. Update database records
 * 5. Emit real-time events
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';
import { emitPayoutInitiated, emitPayoutCompleted } from '@/lib/realtime/payment-events';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null;

export const PLATFORM_FEE_PERCENTAGE = 20; // 20% platform fee
export const CONTRACTOR_PAYOUT_PERCENTAGE = 100 - PLATFORM_FEE_PERCENTAGE; // 80%
export const DISPUTE_WINDOW_DAYS = 30;

/**
 * Calculate contractor payout amount
 * Returns: gross amount, platform fee, net amount
 */
export function calculatePayoutAmount(jobAmount: number) {
  const platformFee = jobAmount * (PLATFORM_FEE_PERCENTAGE / 100);
  const netAmount = jobAmount * (CONTRACTOR_PAYOUT_PERCENTAGE / 100);

  return {
    grossAmount: jobAmount,
    platformFee,
    netAmount,
  };
}

/**
 * Check if dispute window has passed for a payment
 */
export function isDisputeWindowPassed(paymentDate: Date): boolean {
  const now = new Date();
  const daysSincePayment = Math.floor(
    (now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysSincePayment >= DISPUTE_WINDOW_DAYS;
}

/**
 * Get payout amount for a booking
 */
export async function getPayoutAmount(bookingId: string) {
  // Get payment for this booking
  const payment = await prisma.payment.findFirst({
    where: { bookingId },
    include: {
      booking: {
        select: {
          id: true,
          contractorId: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error(`No payment found for booking: ${bookingId}`);
  }

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

/**
 * Validate contractor has Stripe Connect account
 */
async function validateContractorStripeAccount(contractorId: string): Promise<string> {
  const contractorProfile = await prisma.contractorProfile.findFirst({
    where: { contractorId },
    select: {
      stripeConnectAccountId: true,
    },
  });

  if (
    !contractorProfile ||
    !contractorProfile.stripeConnectAccountId
  ) {
    throw new Error(
      `Contractor ${contractorId} does not have Stripe Connect account`
    );
  }

  return contractorProfile.stripeConnectAccountId;
}

/**
 * Create payout via Stripe Connect
 */
async function createStripePayout(
  connectedAccountId: string,
  amountAUD: number,
  description: string
): Promise<string> {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const amountInCents = Math.round(amountAUD * 100);

  try {
    // Create payout to connected account
    const payout = await stripe.payouts.create(
      {
        amount: amountInCents,
        currency: 'aud',
        description,
      },
      {
        stripeAccount: connectedAccountId,
      }
    );

    return payout.id;
  } catch (error) {
    console.error('Stripe payout creation failed:', error);
    throw new Error(`Failed to create Stripe payout: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Trigger payout for a completed booking (after dispute window)
 */
export async function triggerPayoutForBooking(bookingId: string) {
  // Get booking
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      contractor: {
        select: {
          id: true,
          businessName: true,
          userId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  if (!booking.contractorId) {
    throw new Error(`No contractor assigned to booking: ${bookingId}`);
  }

  // Get payout amount
  const payoutInfo = await getPayoutAmount(bookingId);

  // Validate dispute window has passed
  if (!payoutInfo.processedAt) {
    throw new Error('Payment not processed yet');
  }

  if (!isDisputeWindowPassed(payoutInfo.processedAt)) {
    throw new Error('Dispute window has not yet passed');
  }

  // Validate contractor has Stripe account
  const stripeConnectId = await validateContractorStripeAccount(
    booking.contractorId
  );

  try {
    // Create Stripe payout
    const payoutId = await createStripePayout(
      stripeConnectId,
      payoutInfo.netAmount,
      `Payout for booking ${bookingId}`
    );

    // Update payment record with payout info
    await prisma.payment.update({
      where: { id: payoutInfo.paymentId },
      data: {
        // Add fields if needed in Payment model
        updatedAt: new Date(),
      },
    });

    // Update contractor profile totals
    await prisma.contractorProfile.update({
      where: { contractorId: booking.contractorId },
      data: {
        totalPaidOut: {
          increment: payoutInfo.netAmount,
        },
      },
    });

    // Log payout
    console.log('=== PAYOUT INITIATED ===');
    console.log('Booking ID:', bookingId);
    console.log('Contractor:', booking.contractor?.businessName);
    console.log('Net Amount:', payoutInfo.netAmount);
    console.log('Stripe Payout ID:', payoutId);

    // Emit real-time events
    await emitPayoutInitiated(
      payoutId,
      bookingId,
      booking.contractor!.id,
      payoutInfo.netAmount,
      payoutInfo.platformFee
    );

    return {
      payoutId,
      bookingId,
      amount: payoutInfo.netAmount,
      status: 'INITIATED',
    };
  } catch (error) {
    console.error('Error triggering payout:', error);
    throw error;
  }
}

/**
 * Manual payout for contractor (admin only)
 */
export async function manualPayoutToContractor(
  contractorId: string,
  amountAUD: number,
  description: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  try {
    // Validate contractor has Stripe account
    const stripeConnectId = await validateContractorStripeAccount(contractorId);

    // Create Stripe payout
    const payoutId = await createStripePayout(
      stripeConnectId,
      amountAUD,
      description
    );

    // Update contractor profile
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      select: { businessName: true },
    });

    // Log payout
    console.log('=== MANUAL PAYOUT INITIATED ===');
    console.log('Contractor ID:', contractorId);
    console.log('Contractor:', contractor?.businessName);
    console.log('Amount:', amountAUD);
    console.log('Stripe Payout ID:', payoutId);

    // Emit event
    if (contractor) {
      await emitPayoutInitiated(
        payoutId,
        'manual',
        contractorId,
        amountAUD,
        0
      );
    }

    return {
      payoutId,
      contractorId,
      amount: amountAUD,
      status: 'INITIATED',
    };
  } catch (error) {
    console.error('Error creating manual payout:', error);
    throw error;
  }
}

/**
 * Get payout status from Stripe
 */
export async function getPayoutStatus(payoutId: string, connectedAccountId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  try {
    const payout = await stripe.payouts.retrieve(
      payoutId,
      {
        stripeAccount: connectedAccountId,
      }
    );

    return {
      id: payout.id,
      amount: payout.amount / 100, // Convert from cents
      currency: payout.currency?.toUpperCase(),
      status: payout.status,
      arrivalDate: payout.arrival_date ? new Date(payout.arrival_date * 1000) : null,
      failureReason: payout.failure_reason,
    };
  } catch (error) {
    console.error('Error getting payout status:', error);
    throw error;
  }
}

/**
 * Get contractor earnings summary
 */
export async function getContractorEarnings(contractorId: string) {
  const [payments, profile] = await Promise.all([
    prisma.payment.findMany({
      where: {
        contractorId,
        status: 'COMPLETED',
      },
      select: {
        amountAUD: true,
        processedAt: true,
        createdAt: true,
      },
      orderBy: { processedAt: 'desc' },
    }),
    prisma.contractorProfile.findFirst({
      where: { contractorId },
      select: {
        totalEarnings: true,
        totalPaidOut: true,
      },
    }),
  ]);

  // Calculate gross earnings from completed payments
  const grossEarnings = payments.reduce((total, payment) => {
    return total + parseFloat(payment.amountAUD.toString());
  }, 0);

  // Calculate payouts (80% of completed jobs)
  const expectedPayouts = payments
    .filter((p) => p.processedAt && isDisputeWindowPassed(p.processedAt))
    .reduce((total, payment) => {
      const { netAmount } = calculatePayoutAmount(parseFloat(payment.amountAUD.toString()));
      return total + netAmount;
    }, 0);

  const totalPaidOut = profile?.totalPaidOut ? parseFloat(profile.totalPaidOut.toString()) : 0;
  const pendingPayout = expectedPayouts - totalPaidOut;

  return {
    totalEarnings: grossEarnings,
    totalPaidOut,
    pendingPayout: Math.max(0, pendingPayout),
    paymentCount: payments.length,
    lastPayment: payments[0]?.processedAt || null,
  };
}
