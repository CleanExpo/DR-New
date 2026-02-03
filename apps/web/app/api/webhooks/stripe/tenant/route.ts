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
import { isEventProcessed, recordWebhookEvent } from '@/src/lib/stripe/webhook-idempotency';
import {
  sendPaymentFailureEmail,
  sendPaymentSuccessEmail,
  sendTrialEndingEmail,
} from '@/lib/email';

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

  // Check if this event has already been processed (idempotency)
  try {
    const alreadyProcessed = await isEventProcessed(event.id);
    if (alreadyProcessed) {
      console.info(`[Tenant Webhook] Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('[Tenant Webhook] Error checking event idempotency:', error);
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

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      default:
        console.log(`[Tenant Webhook] Unhandled event type: ${event.type}`);
    }

    // Record successful processing
    await recordWebhookEvent(event.id, event.type, 200);
    return NextResponse.json({ received: true });
  } catch (error) {
    // Record failed processing
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    await recordWebhookEvent(event.id, event.type, 500, errorMessage);

    console.error('[Tenant Webhook] Handler error:', error);
    return NextResponse.json(
      {
        error: 'Webhook handler failed',
        message: errorMessage,
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

    // Update tenant subscription status
    const tenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: 'ACTIVE',
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      },
      include: {
        users: {
          where: { role: 'OWNER' },
          take: 1,
        },
      },
    });

    console.log(`[Tenant Webhook] Billing period extended for tenant ${tenantId}`);

    // Send payment success confirmation email (non-blocking)
    if (tenant.users[0]?.email) {
      const amountPaidCents = invoice.amount_paid || 0;
      const amountPaidAUD = amountPaidCents / 100;

      sendPaymentSuccessEmail({
        email: tenant.users[0].email,
        businessName: tenant.name,
        amountAUD: amountPaidAUD,
        subscriptionTier: tenant.subscriptionTier,
        nextBillingDate: new Date(subscription.current_period_end * 1000),
      }).catch((error) => {
        console.error('[Tenant Webhook] Failed to send payment success email:', error);
        // Don't throw - email failure shouldn't fail the webhook
      });
    }
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

    // Update tenant subscription status
    const tenant = await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        subscriptionStatus: 'PAST_DUE',
      },
      include: {
        users: {
          where: { role: 'OWNER' },
          take: 1,
        },
      },
    });

    console.log(`[Tenant Webhook] Tenant ${tenantId} marked as PAST_DUE`);

    // Send payment failure email notification (non-blocking)
    if (tenant.users[0]?.email) {
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
        email: tenant.users[0].email,
        businessName: tenant.name,
        amountAUD: amountDueAUD,
        attemptCount,
        lastFourDigits,
        subscriptionTier: tenant.subscriptionTier,
      }).catch((error) => {
        console.error('[Tenant Webhook] Failed to send payment failure email:', error);
        // Don't throw - email failure shouldn't fail the webhook
      });
    }
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

  try {
    // Get tenant with owner email
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: {
        users: {
          where: { role: 'OWNER' },
          take: 1,
        },
      },
    });

    if (!tenant || !tenant.users[0]?.email) {
      console.error('[Tenant Webhook] No owner email found for tenant ${tenantId}');
      return;
    }

    // Determine monthly price based on subscription tier
    const tierPricing: Record<string, number> = {
      BASIC: 49,
      PROFESSIONAL: 99,
      ENTERPRISE: 199,
    };
    const monthlyPrice = tierPricing[tenant.subscriptionTier] || 49;

    // Send trial ending email (non-blocking)
    const trialEnd = subscription.trial_end ? new Date(subscription.trial_end * 1000) : new Date();

    sendTrialEndingEmail({
      email: tenant.users[0].email,
      businessName: tenant.name,
      trialEndsAt: trialEnd,
      subscriptionTier: tenant.subscriptionTier,
      monthlyPrice,
    }).catch((error) => {
      console.error('[Tenant Webhook] Failed to send trial ending email:', error);
      // Don't throw - email failure shouldn't fail the webhook
    });

    console.log(`[Tenant Webhook] Trial ending email sent for tenant ${tenantId}`);
  } catch (error) {
    console.error('[Tenant Webhook] Failed to process trial ending:', error);
    // Don't throw - this is a non-critical operation
  }
}

/**
 * Handle checkout.session.completed event
 * Activates tenant immediately after Stripe Checkout completion
 * This provides instant activation instead of waiting for subscription.created
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const tenantId = session.metadata?.tenantId;

  if (!tenantId) {
    console.log('[Tenant Webhook] Checkout session without tenantId metadata');
    return;
  }

  console.log(`[Tenant Webhook] Checkout completed for tenant ${tenantId}`);

  try {
    // Activate tenant immediately (subscription details will be filled by subscription.created)
    await prisma.tenant.update({
      where: { id: tenantId },
      data: {
        stripeCustomerId: session.customer as string,
        stripeCheckoutSessionId: session.id,
        onboardingCompleted: true,
        updatedAt: new Date(),
      },
    });

    console.log(`[Tenant Webhook] Tenant ${tenantId} activated via checkout`);
  } catch (error) {
    console.error(`[Tenant Webhook] Failed to activate tenant ${tenantId} via checkout:`, error);
    throw error;
  }
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
