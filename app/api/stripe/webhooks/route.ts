/**
 * Stripe Webhook Handler API
 * POST /api/stripe/webhooks
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe/config';
import { handleSubscriptionWebhook } from '@/lib/stripe/subscription-service';
import { handlePaymentWebhook } from '@/lib/stripe/payment-service';

export async function POST(request: NextRequest) {
  try {
    // Get request body as text
    const body = await request.text();

    // Get Stripe signature from headers
    const headersList = headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing Stripe signature',
        },
        { status: 400 }
      );
    }

    if (!STRIPE_WEBHOOK_SECRET) {
      console.error('STRIPE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        {
          success: false,
          error: 'Webhook secret not configured',
        },
        { status: 500 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid signature',
        },
        { status: 400 }
      );
    }

    console.log(`Received Stripe webhook: ${event.type}`);

    // Handle different event types
    try {
      switch (event.type) {
        // Subscription events
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
        case 'invoice.paid':
        case 'invoice.payment_failed':
          await handleSubscriptionWebhook(event);
          break;

        // Payment events
        case 'payment_intent.succeeded':
        case 'payment_intent.payment_failed':
        case 'checkout.session.completed':
        case 'charge.refunded':
          await handlePaymentWebhook(event);
          break;

        // Customer events
        case 'customer.created':
        case 'customer.updated':
          console.log(`Customer event received: ${event.type}`);
          break;

        // Payment method events
        case 'payment_method.attached':
        case 'payment_method.detached':
          console.log(`Payment method event received: ${event.type}`);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      return NextResponse.json({
        success: true,
        received: true,
      });
    } catch (error) {
      console.error('Error processing webhook event:', error);

      // Return 200 to acknowledge receipt even if processing failed
      // This prevents Stripe from retrying the webhook
      return NextResponse.json(
        {
          success: false,
          error: 'Error processing event',
          received: true,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Webhook handler error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

// Disable body parsing, as we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
