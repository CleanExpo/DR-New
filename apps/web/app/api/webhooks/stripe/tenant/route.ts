/**
 * Stripe Tenant Subscription Webhook Handler
 *
 * Handles tenant-level subscription lifecycle events:
 * - customer.subscription.created → Activate tenant subscription
 * - customer.subscription.updated → Update tier/status
 * - invoice.payment_succeeded → Extend billing period
 * - invoice.payment_failed → Handle payment failure
 * - customer.subscription.deleted → Cancel tenant subscription
 *
 * Note: This is separate from contractor workspace subscriptions.
 * Filters events by metadata.type === 'tenant_subscription'
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-11-20.acacia' })
  : null;

// Use dedicated tenant webhook secret (separate from workspace webhooks)
const webhookSecret = process.env.STRIPE_TENANT_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  if (!stripe) {
    console.error('[Tenant Webhook] Stripe not configured');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('[Tenant Webhook] Missing signature');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Tenant Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Filter: Only process tenant subscription events
  const eventData = event.data.object as any;
  if (eventData.metadata?.type !== 'tenant_subscription') {
    console.log(`[Tenant Webhook] Skipping non-tenant event: ${event.type}`);
    return NextResponse.json({ received: true, skipped: true });
  }

  try {
    console.log(`[Tenant Webhook] Processing event: ${event.type} (${event.id})`);

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

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleTrialWillEnd(subscription);
        break;
      }

      default:
        console.log(`[Tenant Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Tenant Webhook] Handler error:', error);
    return NextResponse.json(
      {
        error: 'Webhook handler failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ============================================================================
// WEBHOOK HANDLERS
// ============================================================================

/**
 * Handle subscription.created event
 * Activates tenant subscription and updates Tenant model
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const tenantId = subscription.metadata.tenantId;

  if (!tenantId) {
    console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
    return;
  }

  console.log(`[Tenant Webhook] Activating subscription for tenant ${tenantId}`);

  try {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        subscriptionStatus: mapStripeStatusToSubscriptionStatus(subscription.status),
        subscriptionTier: (subscription.metadata.tier as any) || 'BASIC',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      },
    });

    console.log(`[Tenant Webhook] Subscription activated for tenant ${tenantId}`);
  } catch (error) {
    console.error(`[Tenant Webhook] Failed to activate subscription for tenant ${tenantId}:`, error);
    throw error;
  }
}

/**
 * Handle subscription.updated event
 * Updates subscription status and tier
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const tenantId = subscription.metadata.tenantId;

  if (!tenantId) {
    console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
    return;
  }

  console.log(`[Tenant Webhook] Updating subscription for tenant ${tenantId}`);

  try {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: mapStripeStatusToSubscriptionStatus(subscription.status),
        subscriptionTier: (subscription.metadata.tier as any) || 'BASIC',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        trialEndsAt: subscription.trial_end ? new Date(subscription.trial_end * 1000) : null,
      },
    });

    console.log(`[Tenant Webhook] Subscription updated for tenant ${tenantId}`);
  } catch (error) {
    console.error(`[Tenant Webhook] Failed to update subscription for tenant ${tenantId}:`, error);
    throw error;
  }
}

/**
 * Handle subscription.deleted event
 * Cancels tenant subscription
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const tenantId = subscription.metadata.tenantId;

  if (!tenantId) {
    console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
    return;
  }

  console.log(`[Tenant Webhook] Canceling subscription for tenant ${tenantId}`);

  try {
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: 'CANCELED',
        // Keep subscription ID and customer ID for records
      },
    });

    console.log(`[Tenant Webhook] Subscription canceled for tenant ${tenantId}`);
  } catch (error) {
    console.error(`[Tenant Webhook] Failed to cancel subscription for tenant ${tenantId}:`, error);
    throw error;
  }
}

/**
 * Handle invoice.payment_succeeded event
 * Extends billing period and reactivates if needed
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  if (!invoice.subscription) {
    return;
  }

  try {
    // Fetch full subscription details
    const subscription = await stripe!.subscriptions.retrieve(invoice.subscription as string);

    if (subscription.metadata.type !== 'tenant_subscription') {
      return;
    }

    const tenantId = subscription.metadata.tenantId;

    if (!tenantId) {
      console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
      return;
    }

    console.log(`[Tenant Webhook] Payment succeeded for tenant ${tenantId}`);

    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
    });

    console.log(`[Tenant Webhook] Billing period extended for tenant ${tenantId}`);
  } catch (error) {
    console.error('[Tenant Webhook] Failed to process payment success:', error);
    throw error;
  }
}

/**
 * Handle invoice.payment_failed event
 * Marks subscription as past due
 */
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  if (!invoice.subscription) {
    return;
  }

  try {
    // Fetch full subscription details
    const subscription = await stripe!.subscriptions.retrieve(invoice.subscription as string);

    if (subscription.metadata.type !== 'tenant_subscription') {
      return;
    }

    const tenantId = subscription.metadata.tenantId;

    if (!tenantId) {
      console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
      return;
    }

    console.log(`[Tenant Webhook] Payment failed for tenant ${tenantId}`);

    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: 'PAST_DUE',
      },
    });

    console.log(`[Tenant Webhook] Tenant ${tenantId} marked as PAST_DUE`);

    // TODO: Send email notification to tenant admin about payment failure
  } catch (error) {
    console.error('[Tenant Webhook] Failed to process payment failure:', error);
    throw error;
  }
}

/**
 * Handle customer.subscription.trial_will_end event
 * Notify tenant that trial is ending soon (3 days before)
 */
async function handleTrialWillEnd(subscription: Stripe.Subscription) {
  const tenantId = subscription.metadata.tenantId;

  if (!tenantId) {
    console.error('[Tenant Webhook] Missing tenantId in subscription metadata');
    return;
  }

  console.log(`[Tenant Webhook] Trial ending soon for tenant ${tenantId}`);

  // TODO: Send email notification to tenant admin about trial ending
  // This gives them 3 days to add payment method before trial expires
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Map Stripe subscription status to Prisma SubscriptionStatus enum
 */
function mapStripeStatusToSubscriptionStatus(
  stripeStatus: Stripe.Subscription.Status
): 'TRIAL' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'UNPAID' {
  switch (stripeStatus) {
    case 'trialing':
      return 'TRIAL';
    case 'active':
      return 'ACTIVE';
    case 'past_due':
      return 'PAST_DUE';
    case 'canceled':
    case 'incomplete_expired':
      return 'CANCELED';
    case 'incomplete':
    case 'unpaid':
      return 'UNPAID';
    default:
      console.warn(`[Tenant Webhook] Unknown Stripe status: ${stripeStatus}, defaulting to ACTIVE`);
      return 'ACTIVE';
  }
}
