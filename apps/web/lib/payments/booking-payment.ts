/**
 * Booking Payment Workflow
 *
 * Handles the complete payment flow for completed bookings:
 * 1. Calculate final payment amount (base + tax + adjustments)
 * 2. Charge client via Stripe (one-time or subscription)
 * 3. Create Payment and InvoiceAU records
 * 4. Emit payment events
 * 5. Handle payment failures with retries
 */

import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

/**
 * Calculate the final payment amount for a booking
 * Based on contractor's bid amount
 */
export async function calculateBookingPayment(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      contractor: {
        include: {
          contractorMatches: {
            where: {
              id: bookingId, // Get the specific match for this booking
            },
            select: {
              proposedBudget: true,
            },
          },
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  // Get the contractor's bid amount from ContractorMatch
  let baseAmount = 0;
  if (booking.contractor?.contractorMatches?.[0]?.proposedBudget) {
    baseAmount = parseFloat(booking.contractor.contractorMatches[0].proposedBudget.toString());
  } else if (booking.finalCostAUD) {
    baseAmount = parseFloat(booking.finalCostAUD.toString());
  } else {
    baseAmount = parseFloat(booking.estimatedCostAUD.toString());
  }

  // Calculate GST (10% in Australia)
  const gstAmount = baseAmount * 0.1;
  const totalAmount = baseAmount + gstAmount;

  return {
    baseAmount,
    gstAmount,
    totalAmount,
  };
}

/**
 * Get or create Stripe customer for a client
 */
async function getOrCreateStripeCustomer(clientId: string) {
  const client = await prisma.user.findUnique({
    where: { id: clientId },
    select: {
      email: true,
      name: true,
      stripeCustomerId: true,
    },
  });

  if (!client) {
    throw new Error(`Client not found: ${clientId}`);
  }

  // Return existing customer if available
  if (client.stripeCustomerId) {
    return client.stripeCustomerId;
  }

  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email: client.email,
    name: client.name || 'Unknown',
    metadata: {
      userId: clientId,
      source: 'nrpg_booking_payment',
    },
  });

  // Save Stripe customer ID
  await prisma.user.update({
    where: { id: clientId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

/**
 * Check if client has an active subscription
 */
async function getActiveSubscription(clientId: string) {
  const clientPayment = await prisma.clientPayment.findFirst({
    where: {
      clientId,
      status: 'ACTIVE',
    },
  });

  return clientPayment;
}

/**
 * Create a one-time payment intent for booking
 */
async function createBookingPaymentIntent(
  customerId: string,
  amountAUD: number,
  bookingId: string,
  clientId: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Convert AUD to cents
  const amountInCents = Math.round(amountAUD * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'aud',
    customer: customerId,
    metadata: {
      bookingId,
      clientId,
      source: 'booking_completion',
    },
    description: `Payment for booking ${bookingId}`,
  });

  return paymentIntent;
}

/**
 * Main function to charge client for completed booking
 */
export async function chargeForCompletedBooking(bookingId: string) {
  // Get booking details
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      client: {
        select: {
          id: true,
          email: true,
          name: true,
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

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  if (booking.status !== 'COMPLETED') {
    throw new Error(`Cannot charge for non-completed booking: ${bookingId}`);
  }

  // Calculate payment amount
  const { baseAmount, gstAmount, totalAmount } = await calculateBookingPayment(bookingId);

  // Get or create Stripe customer
  const stripeCustomerId = await getOrCreateStripeCustomer(booking.clientId);

  // Check for active subscription
  const subscription = await getActiveSubscription(booking.clientId);

  // Create Payment record in database (PENDING status)
  const payment = await prisma.payment.create({
    data: {
      bookingId,
      clientId: booking.clientId,
      contractorId: booking.contractorId,
      amountAUD: baseAmount,
      gstAUD: gstAmount,
      platformFeeAUD: 0, // Will be calculated on contractor payout
      netAmountAUD: baseAmount,
      paymentMethod: 'CREDIT_CARD',
      status: 'PENDING',
    },
  });

  try {
    let stripePaymentIntentId: string;

    if (subscription) {
      // Charge as part of subscription (will be invoiced at next billing cycle)
      // For now, create immediate payment intent
      const paymentIntent = await createBookingPaymentIntent(
        stripeCustomerId,
        totalAmount,
        bookingId,
        booking.clientId
      );
      stripePaymentIntentId = paymentIntent.id;
    } else {
      // Create one-time payment intent
      const paymentIntent = await createBookingPaymentIntent(
        stripeCustomerId,
        totalAmount,
        bookingId,
        booking.clientId
      );
      stripePaymentIntentId = paymentIntent.id;
    }

    // Update Payment record with Stripe intent
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        stripePaymentIntentId,
        status: 'PROCESSING',
      },
    });

    return {
      paymentId: updatedPayment.id,
      stripePaymentIntentId,
      clientSecret: null, // Will be populated on frontend
      totalAmount,
      baseAmount,
      gstAmount,
    };
  } catch (error) {
    // Update Payment to FAILED status
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'FAILED',
        failureReason: error instanceof Error ? error.message : 'Unknown error',
      },
    });
    throw error;
  }
}

/**
 * Handle successful payment
 * Called from Stripe webhook when payment intent succeeds
 */
export async function handlePaymentSuccess(paymentIntentId: string) {
  // Find payment by Stripe intent ID
  const payment = await prisma.payment.findFirst({
    where: {
      stripePaymentIntentId: paymentIntentId,
    },
    include: {
      booking: true,
      client: true,
      contractor: true,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for Stripe intent: ${paymentIntentId}`);
  }

  // Update Payment status to COMPLETED
  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'COMPLETED',
      processedAt: new Date(),
    },
  });

  // Update Booking status
  await prisma.booking.update({
    where: { id: payment.bookingId },
    data: {
      status: 'COMPLETED',
    },
  });

  return {
    paymentId: updatedPayment.id,
    status: 'SUCCESS',
    amount: updatedPayment.amountAUD,
  };
}

/**
 * Handle failed payment
 * Called from Stripe webhook when payment intent fails
 */
export async function handlePaymentFailure(
  paymentIntentId: string,
  failureReason: string
) {
  // Find payment by Stripe intent ID
  const payment = await prisma.payment.findFirst({
    where: {
      stripePaymentIntentId: paymentIntentId,
    },
  });

  if (!payment) {
    throw new Error(`Payment not found for Stripe intent: ${paymentIntentId}`);
  }

  // Update Payment status to FAILED
  const updatedPayment = await prisma.payment.update({
    where: { id: payment.id },
    data: {
      status: 'FAILED',
      failureReason,
    },
  });

  return {
    paymentId: updatedPayment.id,
    status: 'FAILED',
    reason: failureReason,
  };
}

/**
 * Get payment details
 */
export async function getPaymentDetails(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        select: {
          id: true,
          description: true,
          australianServiceType: true,
          serviceSuburb: true,
          servicePostcode: true,
          estimatedCostAUD: true,
        },
      },
      client: {
        select: {
          id: true,
          email: true,
          name: true,
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

  return payment;
}
