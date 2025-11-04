import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

/**
 * Handle Stripe webhook events
 */
export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  console.log(`Received webhook event: ${event.type}`);

  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(
          event.data.object as Stripe.PaymentIntent
        );
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error handling webhook event ${event.type}:`, error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle subscription created event
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const contractorId = subscription.metadata.contractorId;

  if (!contractorId) {
    console.error('No contractorId in subscription metadata');
    return;
  }

  const tier = subscription.metadata.tier as any;

  // Update or create contractor subscription
  const existingSubscription = await prisma.contractorSubscription.findUnique({
    where: { contractorId },
  });

  if (existingSubscription) {
    await prisma.contractorSubscription.update({
      where: { contractorId },
      data: {
        stripeSubscriptionId: subscription.id,
        status: subscription.status === 'active' ? 'ACTIVE' : 'PENDING',
        startDate: new Date(subscription.current_period_start * 1000),
        nextBillingDate: new Date(subscription.current_period_end * 1000),
        tier,
      },
    });
  } else {
    await prisma.contractorSubscription.create({
      data: {
        contractorId,
        tier,
        status: subscription.status === 'active' ? 'ACTIVE' : 'PENDING',
        stripeSubscriptionId: subscription.id,
        startDate: new Date(subscription.current_period_start * 1000),
        nextBillingDate: new Date(subscription.current_period_end * 1000),
      },
    });
  }
}

/**
 * Handle subscription updated event
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const dbSubscription = await prisma.contractorSubscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!dbSubscription) {
    console.error('Subscription not found in database');
    return;
  }

  // Determine status
  let status: 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'PENDING' = 'ACTIVE';

  if (subscription.status === 'canceled') {
    status = 'CANCELLED';
  } else if (subscription.status === 'past_due') {
    status = 'PAST_DUE';
  } else if (subscription.status === 'incomplete' || subscription.status === 'incomplete_expired') {
    status = 'PENDING';
  }

  await prisma.contractorSubscription.update({
    where: { id: dbSubscription.id },
    data: {
      status,
      nextBillingDate: new Date(subscription.current_period_end * 1000),
      endDate: subscription.canceled_at
        ? new Date(subscription.canceled_at * 1000)
        : null,
    },
  });
}

/**
 * Handle subscription deleted event
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const dbSubscription = await prisma.contractorSubscription.findFirst({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!dbSubscription) {
    console.error('Subscription not found in database');
    return;
  }

  await prisma.contractorSubscription.update({
    where: { id: dbSubscription.id },
    data: {
      status: 'CANCELLED',
      endDate: new Date(),
    },
  });
}

/**
 * Handle invoice paid event (for subscriptions)
 */
async function handleInvoicePaid(invoice: Stripe.Invoice) {
  if (!invoice.subscription) {
    return; // Not a subscription invoice
  }

  const subscription = await prisma.contractorSubscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) {
    console.error('Subscription not found for invoice');
    return;
  }

  // Update subscription billing dates
  await prisma.contractorSubscription.update({
    where: { id: subscription.id },
    data: {
      lastBillingDate: new Date(invoice.created * 1000),
      nextBillingDate: invoice.period_end
        ? new Date(invoice.period_end * 1000)
        : subscription.nextBillingDate,
      status: 'ACTIVE',
    },
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      amount: invoice.amount_paid / 100, // Convert from cents
      paymentMethod: 'STRIPE',
      paymentDate: new Date(invoice.created * 1000),
      contractorId: subscription.contractorId,
      // Note: This is a subscription payment, not linked to a specific invoice
    },
  });
}

/**
 * Handle invoice payment failed event
 */
async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) {
    return;
  }

  const subscription = await prisma.contractorSubscription.findFirst({
    where: { stripeSubscriptionId: invoice.subscription as string },
  });

  if (!subscription) {
    console.error('Subscription not found for invoice');
    return;
  }

  await prisma.contractorSubscription.update({
    where: { id: subscription.id },
    data: {
      status: 'PAST_DUE',
    },
  });

  // TODO: Send notification email to contractor
}

/**
 * Handle payment intent succeeded (for one-time invoice payments)
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent) {
  const invoiceId = paymentIntent.metadata.invoiceId;

  if (!invoiceId) {
    return; // Not linked to an invoice
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (!invoice) {
    console.error('Invoice not found for payment intent');
    return;
  }

  // Update invoice status
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      status: 'PAID',
      paidDate: new Date(),
    },
  });

  // Create payment record
  await prisma.payment.create({
    data: {
      invoiceId,
      amount: paymentIntent.amount / 100, // Convert from cents
      paymentMethod: 'STRIPE',
      stripePaymentIntentId: paymentIntent.id,
      paymentDate: new Date(),
    },
  });

  // TODO: Send receipt email
}

/**
 * Handle payment intent failed
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent) {
  const invoiceId = paymentIntent.metadata.invoiceId;

  if (!invoiceId) {
    return;
  }

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
  });

  if (!invoice) {
    return;
  }

  // Update invoice status to overdue
  await prisma.invoice.update({
    where: { id: invoiceId },
    data: {
      status: 'OVERDUE',
    },
  });

  // TODO: Send notification email
}

/**
 * Handle charge refunded
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = charge.payment_intent as string;

  if (!paymentIntentId) {
    return;
  }

  // Find payment record
  const payment = await prisma.payment.findFirst({
    where: { stripePaymentIntentId: paymentIntentId },
  });

  if (!payment || !payment.invoiceId) {
    return;
  }

  // Update invoice status
  await prisma.invoice.update({
    where: { id: payment.invoiceId },
    data: {
      status: 'REFUNDED',
    },
  });

  // TODO: Create refund record or update payment record
}
