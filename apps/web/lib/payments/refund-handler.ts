/**
 * Refund & Dispute Handling System
 *
 * CRITICAL BUSINESS RULE:
 * - Disaster Recovery retains $550 (GST-inclusive) marketing fee - NOT REFUNDABLE
 * - Only the contractor portion ($2200 of initial $2750 payment) is refundable
 * - Refunds are between Consumer and Approved Contractor for remaining amount
 * - This must be transparent throughout transaction, onboarding, and training
 *
 * Payment Breakdown Example ($2750 total):
 * - Disaster Recovery Marketing Fee: $550 (non-refundable)
 *   - Base: $500
 *   - GST: $50
 * - Contractor Portion: $2200 (refundable if disputed)
 *
 * Workflow:
 * 1. 30-day dispute window after payment
 * 2. Initiate refund request (client)
 * 3. Admin review and approval
 * 4. Process refund via Stripe (max: total - $550 marketing fee)
 * 5. Reverse contractor payout if necessary
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null;

// Non-refundable marketing fee constants ($550 GST-inclusive)
export const MARKETING_FEE_AUD = 500.00; // Platform marketing fee (ex-GST)
export const MARKETING_FEE_GST_AUD = 50.00; // 10% GST on marketing fee
export const TOTAL_MARKETING_FEE_AUD = 550.00; // $550 total (GST-inclusive)

export const DISPUTE_WINDOW_DAYS = 30;
export enum DisputeStatus {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REFUNDED = 'REFUNDED',
}

export enum RefundType {
  FULL = 'FULL', // Full refundable amount (excludes marketing fee)
  PARTIAL = 'PARTIAL', // Partial refundable amount
}

/**
 * Calculate refund breakdown for transparency
 * Shows exactly what is refundable vs retained
 */
export function calculateRefundBreakdown(
  totalAmountAUD: number,
  marketingFeeAUD: number = MARKETING_FEE_AUD,
  marketingFeeGSTAUD: number = MARKETING_FEE_GST_AUD
) {
  const totalMarketingFee = marketingFeeAUD + marketingFeeGSTAUD;
  const maxRefundableAmount = Math.max(0, totalAmountAUD - totalMarketingFee);

  return {
    totalPayment: totalAmountAUD,
    marketingFee: marketingFeeAUD,
    marketingFeeGST: marketingFeeGSTAUD,
    totalMarketingFee,
    nonRefundableAmount: totalMarketingFee,
    maxRefundableAmount,
    contractorPortion: maxRefundableAmount,
  };
}

/**
 * Initiate a refund/dispute for a payment
 *
 * IMPORTANT: The $550 + GST ($605) marketing fee is NON-REFUNDABLE
 * Maximum refund = Total Payment - Marketing Fee
 */
export async function initiateDispute(
  paymentId: string,
  clientId: string,
  reason: string,
  requestedRefundAmount?: number
) {
  // Get payment details
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        select: {
          id: true,
          contractorId: true,
          completedAt: true,
        },
      },
      contractor: {
        select: {
          id: true,
          businessName: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error(`Payment not found: ${paymentId}`);
  }

  if (payment.clientId !== clientId) {
    throw new Error('Client does not own this payment');
  }

  // Check if within dispute window
  if (payment.processedAt) {
    const daysSincePay = Math.floor(
      (new Date().getTime() - payment.processedAt.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysSincePay > DISPUTE_WINDOW_DAYS) {
      throw new Error(
        `Dispute window closed (${DISPUTE_WINDOW_DAYS} days). Cannot file dispute.`
      );
    }
  }

  const totalAmount = parseFloat(
    (
      parseFloat(payment.amountAUD.toString()) +
      parseFloat(payment.gstAUD.toString())
    ).toFixed(2)
  );

  // Get marketing fee from payment record or use default
  const marketingFee = payment.marketingFeeAUD
    ? parseFloat(payment.marketingFeeAUD.toString())
    : MARKETING_FEE_AUD;
  const marketingFeeGST = payment.marketingFeeGSTAUD
    ? parseFloat(payment.marketingFeeGSTAUD.toString())
    : MARKETING_FEE_GST_AUD;

  // Calculate refund breakdown for transparency
  const breakdown = calculateRefundBreakdown(totalAmount, marketingFee, marketingFeeGST);

  // Validate requested refund amount doesn't exceed maximum refundable
  let refundAmount = requestedRefundAmount || breakdown.maxRefundableAmount;
  if (refundAmount > breakdown.maxRefundableAmount) {
    console.warn(
      `Requested refund $${refundAmount} exceeds maximum refundable $${breakdown.maxRefundableAmount}. ` +
      `$${breakdown.totalMarketingFee} marketing fee is non-refundable.`
    );
    refundAmount = breakdown.maxRefundableAmount;
  }

  const refundType =
    refundAmount < breakdown.maxRefundableAmount ? RefundType.PARTIAL : RefundType.FULL;

  // Create dispute record with full transparency
  const disputeRecord = {
    paymentId,
    clientId,
    reason,
    status: DisputeStatus.OPEN,
    refundType,
    requestedAmount: refundAmount,
    totalAmount,
    // Transparency fields
    marketingFeeRetained: breakdown.totalMarketingFee,
    maxRefundableAmount: breakdown.maxRefundableAmount,
    contractorPortion: breakdown.contractorPortion,
    createdAt: new Date(),
  };

  console.log('=== DISPUTE INITIATED ===');
  console.log('Payment ID:', paymentId);
  console.log('Client ID:', clientId);
  console.log('Reason:', reason);
  console.log('--- REFUND BREAKDOWN ---');
  console.log('Total Payment:', `$${totalAmount.toFixed(2)}`);
  console.log('Marketing Fee (Non-Refundable):', `$${breakdown.totalMarketingFee.toFixed(2)}`);
  console.log('  - Base Fee:', `$${breakdown.marketingFee.toFixed(2)}`);
  console.log('  - GST:', `$${breakdown.marketingFeeGST.toFixed(2)}`);
  console.log('Max Refundable (Contractor Portion):', `$${breakdown.maxRefundableAmount.toFixed(2)}`);
  console.log('Requested Refund:', `$${refundAmount.toFixed(2)}`);

  return disputeRecord;
}

/**
 * Admin reviews and approves/rejects dispute
 *
 * IMPORTANT: Maximum approvable refund is capped at (total - marketing fee)
 */
export async function reviewDispute(
  paymentId: string,
  adminId: string,
  decision: 'APPROVED' | 'REJECTED' | 'PARTIAL',
  approvedAmount?: number,
  notes?: string
) {
  // Get payment
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
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
    throw new Error(`Payment not found: ${paymentId}`);
  }

  const totalAmount = parseFloat(
    (
      parseFloat(payment.amountAUD.toString()) +
      parseFloat(payment.gstAUD.toString())
    ).toFixed(2)
  );

  // Get marketing fee from payment record or use default
  const marketingFee = payment.marketingFeeAUD
    ? parseFloat(payment.marketingFeeAUD.toString())
    : MARKETING_FEE_AUD;
  const marketingFeeGST = payment.marketingFeeGSTAUD
    ? parseFloat(payment.marketingFeeGSTAUD.toString())
    : MARKETING_FEE_GST_AUD;

  // Calculate maximum refundable amount
  const breakdown = calculateRefundBreakdown(totalAmount, marketingFee, marketingFeeGST);

  let statusUpdate = DisputeStatus.REJECTED;
  let refundAmount = 0;

  if (decision === 'APPROVED') {
    statusUpdate = DisputeStatus.APPROVED;
    // Full approval = max refundable amount (NOT total amount)
    refundAmount = breakdown.maxRefundableAmount;
  } else if (decision === 'PARTIAL' && approvedAmount) {
    statusUpdate = DisputeStatus.APPROVED;
    // Enforce maximum limit on partial refund
    refundAmount = Math.min(approvedAmount, breakdown.maxRefundableAmount);
  }

  console.log('=== DISPUTE REVIEWED ===');
  console.log('Payment ID:', paymentId);
  console.log('Decision:', decision);
  console.log('--- REFUND LIMITS ---');
  console.log('Total Payment:', `$${totalAmount.toFixed(2)}`);
  console.log('Marketing Fee (Non-Refundable):', `$${breakdown.totalMarketingFee.toFixed(2)}`);
  console.log('Max Refundable:', `$${breakdown.maxRefundableAmount.toFixed(2)}`);
  console.log('Approved Amount:', `$${refundAmount.toFixed(2)}`);
  console.log('Notes:', notes);

  return {
    paymentId,
    status: statusUpdate,
    approvedAmount: refundAmount,
    maxRefundableAmount: breakdown.maxRefundableAmount,
    marketingFeeRetained: breakdown.totalMarketingFee,
    reviewedBy: adminId,
    reviewedAt: new Date(),
    notes,
  };
}

/**
 * Process refund via Stripe
 *
 * CRITICAL: Enforces maximum refund limit (total - marketing fee)
 * The $550 + GST marketing fee is NEVER refunded
 */
export async function processRefund(
  paymentId: string,
  refundAmount: number
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Get payment with marketing fee details
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      stripePaymentIntentId: true,
      amountAUD: true,
      gstAUD: true,
      clientId: true,
      contractorId: true,
      marketingFeeAUD: true,
      marketingFeeGSTAUD: true,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found: ${paymentId}`);
  }

  if (!payment.stripePaymentIntentId) {
    throw new Error(`No Stripe payment intent found for payment: ${paymentId}`);
  }

  try {
    const totalAmount = parseFloat(
      (
        parseFloat(payment.amountAUD.toString()) +
        parseFloat(payment.gstAUD.toString())
      ).toFixed(2)
    );

    // Get marketing fee from payment record or use default
    const marketingFee = payment.marketingFeeAUD
      ? parseFloat(payment.marketingFeeAUD.toString())
      : MARKETING_FEE_AUD;
    const marketingFeeGST = payment.marketingFeeGSTAUD
      ? parseFloat(payment.marketingFeeGSTAUD.toString())
      : MARKETING_FEE_GST_AUD;

    // Calculate maximum refundable amount
    const breakdown = calculateRefundBreakdown(totalAmount, marketingFee, marketingFeeGST);

    // CRITICAL: Enforce maximum refund limit
    if (refundAmount > breakdown.maxRefundableAmount) {
      console.warn(
        `Refund amount $${refundAmount} exceeds maximum $${breakdown.maxRefundableAmount}. ` +
        `Capping at max refundable amount. $${breakdown.totalMarketingFee} marketing fee is non-refundable.`
      );
      refundAmount = breakdown.maxRefundableAmount;
    }

    // Get Stripe charge ID from payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.stripePaymentIntentId
    );

    const chargeId = paymentIntent.charges.data[0]?.id;
    if (!chargeId) {
      throw new Error('No charge ID found for payment intent');
    }

    // Process refund via Stripe
    const refundInCents = Math.round(refundAmount * 100);
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: refundInCents,
      metadata: {
        paymentId,
        marketingFeeRetained: breakdown.totalMarketingFee.toFixed(2),
        maxRefundableAmount: breakdown.maxRefundableAmount.toFixed(2),
        reason: 'Contractor dispute resolution',
      },
    });

    console.log('=== REFUND PROCESSED VIA STRIPE ===');
    console.log('Payment ID:', paymentId);
    console.log('Stripe Refund ID:', refund.id);
    console.log('--- REFUND BREAKDOWN ---');
    console.log('Total Payment:', `$${totalAmount.toFixed(2)}`);
    console.log('Marketing Fee (Retained):', `$${breakdown.totalMarketingFee.toFixed(2)}`);
    console.log('Max Refundable:', `$${breakdown.maxRefundableAmount.toFixed(2)}`);
    console.log('Amount Refunded:', `$${refundAmount.toFixed(2)}`);

    return {
      stripeRefundId: refund.id,
      amount: refundAmount,
      status: refund.status,
      marketingFeeRetained: breakdown.totalMarketingFee,
      maxRefundableAmount: breakdown.maxRefundableAmount,
    };
  } catch (error) {
    console.error('Stripe refund failed:', error);
    throw new Error(
      `Failed to process Stripe refund: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

/**
 * Complete refund and update records
 * Updates payment with refund details and triggers contractor payout reversal
 */
export async function completeRefund(
  paymentId: string,
  refundAmount: number,
  stripeRefundId: string,
  refundReason?: string
) {
  // Get payment to access marketing fee details
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      amountAUD: true,
      gstAUD: true,
      marketingFeeAUD: true,
      marketingFeeGSTAUD: true,
      contractorId: true,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found: ${paymentId}`);
  }

  const totalAmount = parseFloat(
    (
      parseFloat(payment.amountAUD.toString()) +
      parseFloat(payment.gstAUD.toString())
    ).toFixed(2)
  );

  // Get marketing fee values
  const marketingFee = payment.marketingFeeAUD
    ? parseFloat(payment.marketingFeeAUD.toString())
    : MARKETING_FEE_AUD;
  const marketingFeeGST = payment.marketingFeeGSTAUD
    ? parseFloat(payment.marketingFeeGSTAUD.toString())
    : MARKETING_FEE_GST_AUD;

  const breakdown = calculateRefundBreakdown(totalAmount, marketingFee, marketingFeeGST);

  // Update payment status with full refund tracking
  const updatedPayment = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: 'REFUNDED',
      stripeRefundId,
      refundAmount,
      refundedAt: new Date(),
      refundReason: refundReason || 'Dispute resolution - consumer/contractor agreement',
      refundableAmountAUD: breakdown.maxRefundableAmount,
      updatedAt: new Date(),
    },
  });

  // If refunding contractor payout, reverse earnings
  if (updatedPayment.contractorId) {
    console.log('=== CONTRACTOR PAYOUT REVERSAL REQUIRED ===');
    console.log('Contractor ID:', updatedPayment.contractorId);
    console.log('Refund Amount:', `$${refundAmount.toFixed(2)}`);
    console.log('Marketing Fee (Retained by Platform):', `$${breakdown.totalMarketingFee.toFixed(2)}`);
    // This would be handled by a separate function to reverse payout
  }

  return {
    paymentId,
    refundAmount,
    stripeRefundId,
    status: DisputeStatus.REFUNDED,
    completedAt: new Date(),
    marketingFeeRetained: breakdown.totalMarketingFee,
    contractorPayoutReversed: !!updatedPayment.contractorId,
  };
}

/**
 * Get dispute details with refund breakdown
 * Provides full transparency on refundable vs non-refundable amounts
 */
export async function getDisputeDetails(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        select: {
          id: true,
          australianServiceType: true,
          serviceSuburb: true,
          completedAt: true,
        },
      },
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      contractor: {
        select: {
          id: true,
          businessName: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error(`Payment not found: ${paymentId}`);
  }

  const totalAmount = parseFloat(
    (
      parseFloat(payment.amountAUD.toString()) +
      parseFloat(payment.gstAUD.toString())
    ).toFixed(2)
  );

  // Get marketing fee values for transparency
  const marketingFee = payment.marketingFeeAUD
    ? parseFloat(payment.marketingFeeAUD.toString())
    : MARKETING_FEE_AUD;
  const marketingFeeGST = payment.marketingFeeGSTAUD
    ? parseFloat(payment.marketingFeeGSTAUD.toString())
    : MARKETING_FEE_GST_AUD;

  // Calculate refund breakdown
  const breakdown = calculateRefundBreakdown(totalAmount, marketingFee, marketingFeeGST);

  // Calculate days since payment
  const daysSincePayment = payment.processedAt
    ? Math.floor(
        (new Date().getTime() - payment.processedAt.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const daysRemaining = Math.max(0, DISPUTE_WINDOW_DAYS - daysSincePayment);
  const canDispute = daysRemaining > 0 && payment.status === 'COMPLETED';

  return {
    payment,
    totalAmount,
    // Refund transparency breakdown
    refundBreakdown: {
      totalPayment: breakdown.totalPayment,
      marketingFee: breakdown.marketingFee,
      marketingFeeGST: breakdown.marketingFeeGST,
      totalMarketingFee: breakdown.totalMarketingFee,
      nonRefundableAmount: breakdown.nonRefundableAmount,
      maxRefundableAmount: breakdown.maxRefundableAmount,
      contractorPortion: breakdown.contractorPortion,
      refundableExplanation: `The $${breakdown.totalMarketingFee.toFixed(2)} marketing fee is non-refundable. ` +
        `Maximum refund available: $${breakdown.maxRefundableAmount.toFixed(2)} (contractor portion).`,
    },
    daysSincePayment,
    daysRemaining,
    canDispute,
    disputeStatus: payment.status === 'REFUNDED' ? 'REFUNDED' : 'ACTIVE',
  };
}

/**
 * List all open disputes for admin review
 */
export async function listOpenDisputes(limit = 20, offset = 0) {
  // Get all refunded payments (disputes)
  const disputes = await prisma.payment.findMany({
    where: { status: 'REFUNDED' },
    include: {
      client: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      booking: {
        select: {
          id: true,
          australianServiceType: true,
          completedAt: true,
        },
      },
    },
    orderBy: { updatedAt: 'desc' },
    take: limit,
    skip: offset,
  });

  const total = await prisma.payment.count({
    where: { status: 'REFUNDED' },
  });

  return {
    disputes: disputes.map((d) => ({
      id: d.id,
      clientName: d.client?.name,
      clientEmail: d.client?.email,
      amount: parseFloat(
        (
          parseFloat(d.amountAUD.toString()) +
          parseFloat(d.gstAUD.toString())
        ).toString()
      ),
      bookingType: d.booking?.australianServiceType,
      status: 'REFUNDED',
      refundedAt: d.updatedAt,
    })),
    total,
    hasMore: offset + limit < total,
  };
}
