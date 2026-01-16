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
} from '@/lib/realtime/payment-events';

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

    return NextResponse.json({ received: true });
  } catch (error) {
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
 * NOTE: For Phase 04 Task 7 (Refunds) - will implement later
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log('Charge refunded:', charge.id);
  console.log('Refund amount:', charge.amount_refunded);

  // TODO: Handle refund logic in Task 7
  // For now, just log the event
}
