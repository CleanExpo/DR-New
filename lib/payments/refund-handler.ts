/**
 * Refund & Dispute Handling System
 *
 * Manages refund requests and disputes:
 * 1. 30-day dispute window after payment
 * 2. Initiate refund request (client)
 * 3. Admin review and approval
 * 4. Process refund via Stripe
 * 5. Reverse contractor payout if necessary
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

export const DISPUTE_WINDOW_DAYS = 30;
export enum DisputeStatus {
  OPEN = 'OPEN',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REFUNDED = 'REFUNDED',
}

export enum RefundType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
}

/**
 * Initiate a refund/dispute for a payment
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
    ).toString()
  );

  const refundAmount = requestedRefundAmount || totalAmount;
  const refundType =
    refundAmount < totalAmount ? RefundType.PARTIAL : RefundType.FULL;

  // Create dispute record (simulated - would be in separate Dispute table)
  const disputeRecord = {
    paymentId,
    clientId,
    reason,
    status: DisputeStatus.OPEN,
    refundType,
    requestedAmount: refundAmount,
    totalAmount,
    createdAt: new Date(),
  };

  console.log('=== DISPUTE INITIATED ===');
  console.log('Payment ID:', paymentId);
  console.log('Client ID:', clientId);
  console.log('Reason:', reason);
  console.log('Requested Refund:', refundAmount);
  console.log('Total Amount:', totalAmount);

  return disputeRecord;
}

/**
 * Admin reviews and approves/rejects dispute
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
    ).toString()
  );

  let statusUpdate = DisputeStatus.REJECTED;
  let refundAmount = 0;

  if (decision === 'APPROVED') {
    statusUpdate = DisputeStatus.APPROVED;
    refundAmount = totalAmount;
  } else if (decision === 'PARTIAL' && approvedAmount) {
    statusUpdate = DisputeStatus.APPROVED;
    refundAmount = approvedAmount;
  }

  console.log('=== DISPUTE REVIEWED ===');
  console.log('Payment ID:', paymentId);
  console.log('Decision:', decision);
  console.log('Approved Amount:', refundAmount);
  console.log('Notes:', notes);

  return {
    paymentId,
    status: statusUpdate,
    approvedAmount: refundAmount,
    reviewedBy: adminId,
    reviewedAt: new Date(),
    notes,
  };
}

/**
 * Process refund via Stripe
 */
export async function processRefund(
  paymentId: string,
  refundAmount: number
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Get payment
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      stripePaymentIntentId: true,
      amountAUD: true,
      gstAUD: true,
      clientId: true,
      contractorId: true,
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
      ).toString()
    );

    // Get Stripe charge ID from payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      payment.stripePaymentIntentId
    );

    const chargeId = paymentIntent.charges.data[0]?.id;
    if (!chargeId) {
      throw new Error('No charge ID found for payment intent');
    }

    // Process refund
    const refundInCents = Math.round(refundAmount * 100);
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: refundInCents,
    });

    console.log('=== REFUND PROCESSED ===');
    console.log('Payment ID:', paymentId);
    console.log('Stripe Refund ID:', refund.id);
    console.log('Amount:', refundAmount);

    return {
      stripeRefundId: refund.id,
      amount: refundAmount,
      status: refund.status,
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
 */
export async function completeRefund(
  paymentId: string,
  refundAmount: number,
  stripeRefundId: string
) {
  // Update payment status
  const updatedPayment = await prisma.payment.update({
    where: { id: paymentId },
    data: {
      status: 'REFUNDED',
      updatedAt: new Date(),
    },
  });

  // If refunding contractor payout, reverse earnings
  if (updatedPayment.contractorId) {
    // This would be handled by a separate function to reverse payout
    console.log(
      `Marking contractor payout reversal needed for: ${updatedPayment.contractorId}`
    );
  }

  return {
    paymentId,
    refundAmount,
    stripeRefundId,
    status: DisputeStatus.REFUNDED,
    completedAt: new Date(),
  };
}

/**
 * Get dispute details
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
    ).toString()
  );

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
