/**
 * Stripe Payment Webhook Handler
 *
 * Handles payment events for booking charges:
 * - payment_intent.succeeded → Charge successful
 * - payment_intent.payment_failed → Charge failed
 * - charge.refunded → Refund processed
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import {
  handlePaymentSuccess,
  handlePaymentFailure,
} from '@/lib/payments/booking-payment';
import {
  emitPaymentSucceeded,
  emitPaymentFailed,
  emitPaymentRefunded,
} from '@/lib/realtime/payment-events';
import { isEventProcessed, recordWebhookEvent } from '@/src/lib/stripe/webhook-idempotency';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-11-20.acacia',
    })
  : null;

const webhookSecret =
  process.env.STRIPE_PAYMENTS_WEBHOOK_SECRET ||
  process.env.STRIPE_WEBHOOK_SECRET ||
  '';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Check if this event has already been processed (idempotency)
  try {
    const alreadyProcessed = await isEventProcessed(event.id);
    if (alreadyProcessed) {
      console.info(`[Payment Webhook] Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('[Payment Webhook] Error checking event idempotency:', error);
    // Don't block the response, let Stripe retry
    return NextResponse.json(
      {
        error: 'Idempotency check failed',
        message: error instanceof Error ? error.message : 'Idempotency check failed',
      },
      { status: 503 }
    );
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentSucceeded(paymentIntent);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await handlePaymentIntentFailed(paymentIntent);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;
        await handleChargeRefunded(charge);
        break;
      }

      default:
        console.log(`Unhandled payment webhook event: ${event.type}`);
    }

    // Record successful processing
    await recordWebhookEvent(event.id, event.type, 200);
    return NextResponse.json({ received: true });
  } catch (error) {
    // Record failed processing
    const errorMessage = error instanceof Error ? error.message : 'Webhook handler failed';
    await recordWebhookEvent(event.id, event.type, 500, errorMessage);

    console.error('Payment webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

/**
 * Handle payment intent succeeded
 */
async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
) {
  const { metadata } = paymentIntent;

  if (!metadata?.bookingId) {
    console.log('Payment intent without booking metadata:', paymentIntent.id);
    return;
  }

  try {
    // Handle payment success in database
    const result = await handlePaymentSuccess(paymentIntent.id);

    // Get booking and client/contractor details for events
    const payment = await prisma.payment.findUnique({
      where: { id: result.paymentId },
      include: {
        booking: true,
        client: true,
        contractor: true,
      },
    });

    if (payment) {
      // Emit real-time events
      await emitPaymentSucceeded(
        payment.id,
        payment.bookingId,
        payment.clientId,
        payment.contractorId,
        parseFloat(payment.amountAUD.toString()),
        'AUD'
      );

      // Log successful payment
      console.log(`=== PAYMENT SUCCEEDED ===`);
      console.log('Payment ID:', payment.id);
      console.log('Booking ID:', payment.bookingId);
      console.log('Amount:', payment.amountAUD);
      console.log('Client:', payment.client?.email);
    }
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

/**
 * Handle payment intent failed
 */
async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
) {
  const { metadata, last_payment_error } = paymentIntent;

  if (!metadata?.bookingId) {
    console.log('Payment intent without booking metadata:', paymentIntent.id);
    return;
  }

  try {
    // Get failure reason
    const failureReason =
      last_payment_error?.message || 'Payment declined by card';

    // Handle payment failure in database
    const result = await handlePaymentFailure(paymentIntent.id, failureReason);

    // Get booking and client/contractor details for events
    const payment = await prisma.payment.findUnique({
      where: { id: result.paymentId },
      include: {
        booking: true,
        client: true,
      },
    });

    if (payment) {
      // Emit real-time events
      await emitPaymentFailed(
        payment.id,
        payment.bookingId,
        payment.clientId,
        parseFloat(payment.amountAUD.toString()),
        failureReason,
        'AUD'
      );

      // Log failed payment
      console.log(`=== PAYMENT FAILED ===`);
      console.log('Payment ID:', payment.id);
      console.log('Booking ID:', payment.bookingId);
      console.log('Amount:', payment.amountAUD);
      console.log('Client:', payment.client?.email);
      console.log('Reason:', failureReason);
    }
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

/**
 * Handle charge refunded
 * Processes refund webhook from Stripe and updates payment records
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === 'string'
    ? charge.payment_intent
    : charge.payment_intent?.id;

  if (!paymentIntentId) {
    console.log('Charge refund without payment intent:', charge.id);
    return;
  }

  try {
    // Find the payment by Stripe payment intent ID
    const payment = await prisma.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
      include: {
        booking: true,
        client: true,
        contractor: true,
      },
    });

    if (!payment) {
      console.log('Payment not found for refund:', paymentIntentId);
      return;
    }

    // Calculate refund amounts (Stripe uses cents)
    const refundAmountAUD = charge.amount_refunded / 100;
    const originalAmountAUD = parseFloat(
      (
        parseFloat(payment.amountAUD.toString()) +
        parseFloat(payment.gstAUD.toString())
      ).toFixed(2)
    );
    const isPartialRefund = refundAmountAUD < originalAmountAUD;

    // Get the latest refund ID from the charge
    const latestRefund = charge.refunds?.data?.[0];
    const stripeRefundId = latestRefund?.id || `refund_${charge.id}`;

    // Update the payment record with refund details
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: 'REFUNDED',
        stripeRefundId,
        refundAmount: refundAmountAUD,
        refundedAt: new Date(),
        refundReason: latestRefund?.reason || 'Refund processed via Stripe',
        updatedAt: new Date(),
      },
    });

    // Emit real-time events for client and contractor
    await emitPaymentRefunded(
      payment.id,
      payment.bookingId,
      payment.clientId,
      payment.contractorId,
      refundAmountAUD,
      originalAmountAUD,
      stripeRefundId,
      isPartialRefund,
      'AUD'
    );

    // Log successful refund
    console.log(`=== REFUND PROCESSED ===`);
    console.log('Payment ID:', payment.id);
    console.log('Booking ID:', payment.bookingId);
    console.log('Stripe Refund ID:', stripeRefundId);
    console.log('Refund Amount:', refundAmountAUD);
    console.log('Original Amount:', originalAmountAUD);
    console.log('Partial Refund:', isPartialRefund);
    console.log('Client:', payment.client?.email);
    if (payment.contractor) {
      console.log('Contractor:', payment.contractor.businessName);
    }
  } catch (error) {
    console.error('Error handling charge refund:', error);
    throw error; // Re-throw to trigger webhook retry
  }
}
