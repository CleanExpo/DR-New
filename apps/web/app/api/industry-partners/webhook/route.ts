/**
 * POST /api/industry-partners/webhook
 *
 * Stripe webhook endpoint for industry partner subscription events.
 * Handles: checkout.session.completed, customer.subscription.updated,
 *          customer.subscription.deleted, invoice.payment_failed
 *
 * Configure in Stripe Dashboard:
 *   Endpoint URL: https://disasterrecovery.com.au/api/industry-partners/webhook
 *   Events: checkout.session.completed, customer.subscription.*,
 *            invoice.payment_failed, invoice.payment_succeeded
 *
 * Env: STRIPE_IP_WEBHOOK_SECRET — the signing secret from Stripe Dashboard
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// ── Stripe client ──────────────────────────────────────────────────────────────

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null

const webhookSecret = process.env.STRIPE_IP_WEBHOOK_SECRET ?? ''

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  if (!stripe) {
    console.error('[ip-webhook] Stripe not configured.')
    return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  }

  const sig = req.headers.get('stripe-signature')
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    const rawBody = await req.text()
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[ip-webhook] Signature verification failed:', msg)
    return NextResponse.json({ error: `Webhook signature invalid: ${msg}` }, { status: 400 })
  }

  // Only process events tagged as industry partner events
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_succeeded':
        // Subscription renewed — log for audit trail
        console.info('[ip-webhook] Payment succeeded for subscription:', (event.data.object as Stripe.Invoice).subscription)
        break

      default:
        // Ignore unhandled event types
        break
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error(`[ip-webhook] Handler error for ${event.type}:`, msg)
    // Return 200 to prevent Stripe retries for non-transient errors
    return NextResponse.json({ received: true, error: msg })
  }

  return NextResponse.json({ received: true })
}

// ── Event handlers ────────────────────────────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const meta = session.metadata ?? {}

  // Only process industry partner sessions
  if (meta.type !== 'NRPG_INDUSTRY_PARTNER') return

  const { partnerId, tier, billing } = meta

  if (!partnerId || !tier) {
    console.warn('[ip-webhook] checkout.session.completed missing partnerId or tier', meta)
    return
  }

  const subscriptionId = typeof session.subscription === 'string'
    ? session.subscription
    : session.subscription?.id ?? null

  const customerId = typeof session.customer === 'string'
    ? session.customer
    : session.customer?.id ?? null

  console.info('[ip-webhook] Partner checkout completed', {
    partnerId,
    tier,
    billing,
    subscriptionId,
    customerId,
  })

  // TODO (DR-38 backend sprint): Update partner record in Supabase:
  //   UPDATE industry_partners
  //   SET tier = $tier,
  //       stripe_customer_id = $customerId,
  //       stripe_subscription_id = $subscriptionId,
  //       subscription_status = 'active',
  //       status = 'approved',
  //       active_until = NOW() + INTERVAL '1 month'
  //   WHERE id = $partnerId
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const meta = subscription.metadata ?? {}
  if (!meta.partnerId) return

  const { partnerId, tier } = meta
  const status = subscription.status

  console.info('[ip-webhook] Subscription updated', { partnerId, tier, status })

  // TODO (DR-38 backend sprint): Sync subscription status to partner record:
  //   UPDATE industry_partners
  //   SET tier = $tier,
  //       subscription_status = $status,
  //       active_until = $currentPeriodEnd
  //   WHERE id = $partnerId
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const meta = subscription.metadata ?? {}
  if (!meta.partnerId) return

  const { partnerId } = meta

  console.info('[ip-webhook] Subscription cancelled', { partnerId })

  // TODO (DR-38 backend sprint): Downgrade partner to Community tier:
  //   UPDATE industry_partners
  //   SET tier = 'community',
  //       subscription_status = 'cancelled',
  //       stripe_subscription_id = NULL,
  //       active_until = NULL
  //   WHERE id = $partnerId
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = typeof invoice.customer === 'string'
    ? invoice.customer
    : invoice.customer?.id ?? null

  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id ?? null

  console.warn('[ip-webhook] Payment failed', { customerId, subscriptionId })

  // TODO (DR-38 backend sprint): Flag partner payment as failed:
  //   UPDATE industry_partners
  //   SET subscription_status = 'past_due'
  //   WHERE stripe_customer_id = $customerId
  //
  // Send payment failure notification email via Resend
}
