/**
 * POST /api/industry-partners/checkout
 *
 * Creates a Stripe Checkout session for an industry partner subscription.
 * Called from /industry-partners/join after the partner application is
 * submitted (Standard or Premium tiers only — Community is free).
 *
 * Body: { partnerId, email, businessName, tier, billing }
 * Returns: { url } — the Stripe Checkout URL to redirect to
 */

import { NextRequest, NextResponse } from 'next/server'
import { createPartnerCheckoutSession, type PartnerTier, type BillingInterval } from '@/lib/stripe/industry-partners'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const VALID_TIERS: PartnerTier[] = ['standard', 'premium']
const VALID_BILLING: BillingInterval[] = ['monthly', 'annual']

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { partnerId, email, businessName, tier, billing } = body as Record<string, unknown>

    // Validate required fields
    if (!partnerId || typeof partnerId !== 'string') {
      return NextResponse.json({ error: 'partnerId is required.' }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }
    if (!businessName || typeof businessName !== 'string') {
      return NextResponse.json({ error: 'businessName is required.' }, { status: 400 })
    }
    if (!tier || !VALID_TIERS.includes(tier as PartnerTier)) {
      return NextResponse.json(
        { error: `tier must be one of: ${VALID_TIERS.join(', ')}.` },
        { status: 400 }
      )
    }
    if (!billing || !VALID_BILLING.includes(billing as BillingInterval)) {
      return NextResponse.json(
        { error: `billing must be one of: ${VALID_BILLING.join(', ')}.` },
        { status: 400 }
      )
    }

    const result = await createPartnerCheckoutSession({
      partnerId,
      email,
      businessName,
      tier: tier as PartnerTier,
      billing: billing as BillingInterval,
    })

    return NextResponse.json({ url: result.url, sessionId: result.sessionId })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[industry-partners/checkout] Error:', message)

    if (message.includes('not configured')) {
      return NextResponse.json({ error: 'Payment system is not yet configured.' }, { status: 503 })
    }

    return NextResponse.json({ error: 'Failed to create checkout session.' }, { status: 500 })
  }
}
