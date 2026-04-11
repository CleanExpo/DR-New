/**
 * Stripe — Industry Partners Subscription Management
 *
 * Handles subscription creation, upgrades, and portal access for
 * NRPG industry partner tiers: Standard ($49/mo) and Premium ($149/mo).
 * Community tier is free and does not require Stripe.
 *
 * Products and Prices must be created in the Stripe Dashboard (or via
 * the setup script at scripts/stripe-setup-industry-partners.ts) and
 * referenced via env vars below.
 */

import Stripe from 'stripe'

// ── Stripe client ─────────────────────────────────────────────────────────────

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null

// ── Price IDs ─────────────────────────────────────────────────────────────────
//
// Set these in .env.local after creating the products in Stripe Dashboard:
//   STRIPE_IP_STANDARD_MONTHLY_PRICE_ID=price_xxx
//   STRIPE_IP_STANDARD_ANNUAL_PRICE_ID=price_xxx
//   STRIPE_IP_PREMIUM_MONTHLY_PRICE_ID=price_xxx
//   STRIPE_IP_PREMIUM_ANNUAL_PRICE_ID=price_xxx

export const INDUSTRY_PARTNER_PRICE_IDS = {
  standard: {
    monthly: process.env.STRIPE_IP_STANDARD_MONTHLY_PRICE_ID ?? '',
    annual: process.env.STRIPE_IP_STANDARD_ANNUAL_PRICE_ID ?? '',
  },
  premium: {
    monthly: process.env.STRIPE_IP_PREMIUM_MONTHLY_PRICE_ID ?? '',
    annual: process.env.STRIPE_IP_PREMIUM_ANNUAL_PRICE_ID ?? '',
  },
} as const

// ── Product config ────────────────────────────────────────────────────────────
//
// Used by the setup script to create Stripe products programmatically.

export const INDUSTRY_PARTNER_PRODUCTS = [
  {
    tier: 'standard' as const,
    name: 'NRPG Industry Partner — Standard',
    description: 'Enhanced directory listing, job referrals, logo display, and premium templates for restoration industry contractors.',
    prices: [
      { billing: 'monthly' as const, amount: 4900, currency: 'aud', interval: 'month' as const },
      { billing: 'annual' as const, amount: 49000, currency: 'aud', interval: 'year' as const },
    ],
  },
  {
    tier: 'premium' as const,
    name: 'NRPG Industry Partner — Premium',
    description: 'Featured top placement, verified badge, priority job referrals, quarterly benchmark reports, and unlimited categories.',
    prices: [
      { billing: 'monthly' as const, amount: 14900, currency: 'aud', interval: 'month' as const },
      { billing: 'annual' as const, amount: 149000, currency: 'aud', interval: 'year' as const },
    ],
  },
]

// ── Types ─────────────────────────────────────────────────────────────────────

export type PartnerTier = 'standard' | 'premium'
export type BillingInterval = 'monthly' | 'annual'

export interface CreatePartnerCheckoutParams {
  partnerId: string
  email: string
  businessName: string
  tier: PartnerTier
  billing: BillingInterval
}

export interface PartnerCheckoutResult {
  sessionId: string
  url: string
}

// ── Checkout session ──────────────────────────────────────────────────────────

/**
 * Create a Stripe Checkout session for an industry partner subscription.
 * Returns the session URL to redirect the user to.
 */
export async function createPartnerCheckoutSession(
  params: CreatePartnerCheckoutParams
): Promise<PartnerCheckoutResult> {
  if (!stripe) {
    throw new Error('Stripe is not configured. Set STRIPE_SECRET_KEY in environment.')
  }

  const { partnerId, email, businessName, tier, billing } = params
  const priceId = INDUSTRY_PARTNER_PRICE_IDS[tier][billing]

  if (!priceId) {
    throw new Error(
      `Stripe Price ID not configured for tier=${tier} billing=${billing}. ` +
      `Set STRIPE_IP_${tier.toUpperCase()}_${billing.toUpperCase()}_PRICE_ID.`
    )
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://disasterrecovery.com.au'
  const customer = await getOrCreatePartnerCustomer(email, businessName, partnerId)

  const session = await stripe.checkout.sessions.create({
    customer: customer.id,
    payment_method_types: ['card'],
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: {
      type: 'NRPG_INDUSTRY_PARTNER',
      partnerId,
      tier,
      billing,
    },
    subscription_data: {
      metadata: { partnerId, tier, billing },
    },
    success_url: `${baseUrl}/industry-partners/dashboard?session_id={CHECKOUT_SESSION_ID}&upgraded=true`,
    cancel_url: `${baseUrl}/industry-partners/join?tier=${tier}&canceled=true`,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    customer_update: { address: 'auto' },
    tax_id_collection: { enabled: true },
    automatic_tax: { enabled: true },
  })

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL.')
  }

  return { sessionId: session.id, url: session.url }
}

// ── Customer ──────────────────────────────────────────────────────────────────

async function getOrCreatePartnerCustomer(
  email: string,
  businessName: string,
  partnerId: string
): Promise<Stripe.Customer> {
  if (!stripe) throw new Error('Stripe is not configured.')

  const existing = await stripe.customers.list({ email, limit: 1 })
  if (existing.data.length > 0) return existing.data[0]

  return stripe.customers.create({
    email,
    name: businessName,
    metadata: { partnerId, source: 'nrpg_industry_partner_signup' },
  })
}

// ── Billing portal ────────────────────────────────────────────────────────────

/**
 * Create a Stripe Customer Portal session so a partner can manage their
 * subscription (update card, view invoices, cancel).
 */
export async function createPartnerPortalSession(
  customerId: string
): Promise<{ url: string }> {
  if (!stripe) throw new Error('Stripe is not configured.')

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://disasterrecovery.com.au'

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${baseUrl}/industry-partners/dashboard`,
  })

  return { url: session.url }
}

// ── Subscription retrieval ────────────────────────────────────────────────────

export async function getPartnerSubscription(subscriptionId: string) {
  if (!stripe) throw new Error('Stripe is not configured.')
  return stripe.subscriptions.retrieve(subscriptionId)
}

export async function cancelPartnerSubscription(subscriptionId: string) {
  if (!stripe) throw new Error('Stripe is not configured.')
  return stripe.subscriptions.cancel(subscriptionId)
}

export async function updatePartnerTier(
  subscriptionId: string,
  newTier: PartnerTier,
  newBilling: BillingInterval
) {
  if (!stripe) throw new Error('Stripe is not configured.')

  const newPriceId = INDUSTRY_PARTNER_PRICE_IDS[newTier][newBilling]
  if (!newPriceId) throw new Error(`Price ID not configured for ${newTier}/${newBilling}`)

  const sub = await stripe.subscriptions.retrieve(subscriptionId)

  return stripe.subscriptions.update(subscriptionId, {
    items: [{ id: sub.items.data[0].id, price: newPriceId }],
    proration_behavior: 'always_invoice',
    metadata: { tier: newTier, billing: newBilling },
  })
}
