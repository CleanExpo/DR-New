/**
 * Stripe Subscription Webhook Handler
 *
 * Handles all subscription lifecycle events:
 * - customer.subscription.created → Activate workspace
 * - customer.subscription.updated → Update tier/status
 * - invoice.payment_succeeded → Extend period
 * - invoice.payment_failed → Start dunning cycle (3-day retry)
 * - customer.subscription.deleted → Cancel workspace
 *
 * Strategic decision: Smart retry + 3-day grace period
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { isEventProcessed, recordWebhookEvent } from '@/src/lib/stripe/webhook-idempotency';
import { retryPrismaOperation } from '@/src/lib/stripe/webhook-retry';
import {
  sendPaymentFailureEmail,
  sendPaymentSuccessEmail,
} from '@/lib/email';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Check if this event has already been processed (idempotency)
  try {
    const alreadyProcessed = await isEventProcessed(event.id);
    if (alreadyProcessed) {
      console.info(`Webhook event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('Error checking webhook event idempotency:', error);
    // Don't block the response, but let Stripe know we had trouble
    // Stripe will retry on the next attempt
    return NextResponse.json(
      { error: 'Idempotency check failed', message: error instanceof Error ? error.message : 'Idempotency check failed' },
      { status: 503 }
    );
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    // Record successful processing
    await recordWebhookEvent(event.id, event.type, 200);
    return NextResponse.json({ received: true });
  } catch (error) {
    // Record failed processing
    const errorMessage = error instanceof Error ? error.message : 'Webhook handler failed';
    await recordWebhookEvent(event.id, event.type, 500, errorMessage);

    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const workspace = await retryPrismaOperation(
    'databaseQuery',
    () =>
      prisma.workspace.findUnique({
        where: { stripeCustomerId: subscription.customer as string },
      }),
    `find workspace for customer ${subscription.customer}`
  );

  if (!workspace) return;

  await retryPrismaOperation(
    'criticalPayment',
    () =>
      prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: 'ACTIVE',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      }),
    `activate subscription ${subscription.id}`
  );

  // Audit log (non-critical)
  await retryPrismaOperation(
    'nonCritical',
    () =>
      prisma.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: 'subscription_created',
          entityType: 'subscription',
          entityId: subscription.id,
          metadata: {
            tier: workspace.subscriptionTier,
            amount: subscription.items.data[0]?.price.unit_amount,
          },
        },
      }),
    `create audit log for subscription ${subscription.id}`
  );
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const workspace = await retryPrismaOperation(
    'databaseQuery',
    () =>
      prisma.workspace.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      }),
    `find workspace for subscription ${subscription.id}`
  );

  if (!workspace) return;

  await retryPrismaOperation(
    'criticalPayment',
    () =>
      prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          subscriptionStatus: subscription.status === 'active' ? 'ACTIVE' : 'PAST_DUE',
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        },
      }),
    `update subscription status to ${subscription.status}`
  );
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const workspace = await retryPrismaOperation(
    'databaseQuery',
    () =>
      prisma.workspace.findUnique({
        where: { stripeSubscriptionId: subscription.id },
      }),
    `find workspace for subscription ${subscription.id}`
  );

  if (!workspace) return;

  await retryPrismaOperation(
    'criticalPayment',
    () =>
      prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          subscriptionStatus: 'CANCELLED',
          cancelledAt: new Date(),
          isActive: false,
        },
      }),
    `cancel subscription ${subscription.id}`
  );

  // Audit log (non-critical)
  await retryPrismaOperation(
    'nonCritical',
    () =>
      prisma.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: 'subscription_cancelled',
          entityType: 'subscription',
          entityId: subscription.id,
        },
      }),
    `create audit log for subscription cancellation ${subscription.id}`
  );
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const workspace = await retryPrismaOperation(
    'databaseQuery',
    () =>
      prisma.workspace.findUnique({
        where: { stripeCustomerId: invoice.customer as string },
        include: {
          members: {
            where: { role: 'OWNER' },
            include: { user: true },
            take: 1,
          },
        },
      }),
    `find workspace for customer ${invoice.customer}`
  );

  if (!workspace) return;

  // Fetch subscription details for next billing date
  let nextBillingDate = new Date();
  if (invoice.subscription) {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      nextBillingDate = new Date(subscription.current_period_end * 1000);
    } catch {
      // Use default if subscription retrieval fails
    }
  }

  // Update subscription status to active
  await retryPrismaOperation(
    'criticalPayment',
    () =>
      prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          subscriptionStatus: 'ACTIVE',
        },
      }),
    `mark payment succeeded for invoice ${invoice.id}`
  );

  // Send payment confirmation email (non-blocking)
  if (workspace.members[0]?.user?.email) {
    const amountPaidCents = invoice.amount_paid || 0;
    const amountPaidAUD = amountPaidCents / 100;

    sendPaymentSuccessEmail({
      email: workspace.members[0].user.email,
      businessName: workspace.businessName,
      amountAUD: amountPaidAUD,
      subscriptionTier: workspace.subscriptionTier,
      nextBillingDate,
    }).catch((error) => {
      console.error('[Workspace Webhook] Failed to send payment success email:', error);
      // Don't throw - email failure shouldn't fail the webhook
    });
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const workspace = await retryPrismaOperation(
    'databaseQuery',
    () =>
      prisma.workspace.findUnique({
        where: { stripeCustomerId: invoice.customer as string },
        include: {
          members: {
            where: { role: 'OWNER' },
            include: { user: true },
            take: 1,
          },
        },
      }),
    `find workspace for customer ${invoice.customer}`
  );

  if (!workspace) return;

  // Strategic decision: Smart retry + 3-day grace
  // Stripe handles auto-retry (Day 1, 2, 3)
  // We just update status and send warning emails

  await retryPrismaOperation(
    'criticalPayment',
    () =>
      prisma.workspace.update({
        where: { id: workspace.id },
        data: {
          subscriptionStatus: 'PAST_DUE',
        },
      }),
    `mark payment failed for invoice ${invoice.id}`
  );

  // Send payment failure email notification (non-blocking)
  if (workspace.members[0]?.user?.email) {
    const attemptCount = invoice.attempt_count || 1;
    const amountDueCents = invoice.amount_due || 0;
    const amountDueAUD = amountDueCents / 100;

    // Get last 4 digits of payment method if available
    const paymentMethod = invoice.default_payment_method || invoice.payment_intent;
    let lastFourDigits: string | undefined;

    if (typeof paymentMethod === 'string' && paymentMethod.startsWith('pm_')) {
      try {
        const pm = await stripe!.paymentMethods.retrieve(paymentMethod);
        lastFourDigits = pm.card?.last4;
      } catch {
        // Ignore payment method retrieval errors
      }
    }

    sendPaymentFailureEmail({
      email: workspace.members[0].user.email,
      businessName: workspace.businessName,
      amountAUD: amountDueAUD,
      attemptCount,
      lastFourDigits,
      subscriptionTier: workspace.subscriptionTier,
    }).catch((error) => {
      console.error('[Workspace Webhook] Failed to send payment failure email:', error);
      // Don't throw - email failure shouldn't fail the webhook
    });
  }

  // Audit log (non-critical)
  await retryPrismaOperation(
    'nonCritical',
    () =>
      prisma.auditLog.create({
        data: {
          workspaceId: workspace.id,
          action: 'payment_failed',
          entityType: 'subscription',
          entityId: invoice.id,
          metadata: {
            attemptCount: invoice.attempt_count,
            amountDue: invoice.amount_due,
          },
        },
      }),
    `create audit log for failed payment ${invoice.id}`
  );
}
