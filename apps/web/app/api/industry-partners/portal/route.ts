/**
 * POST /api/industry-partners/portal
 *
 * Creates a Stripe Customer Portal session so an active partner can manage
 * their subscription (update card, view invoices, cancel, upgrade/downgrade).
 *
 * Body: { customerId }
 * Returns: { url } — the Stripe Customer Portal URL
 */

import { NextRequest, NextResponse } from 'next/server'
import { createPartnerPortalSession } from '@/lib/stripe/industry-partners'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { customerId } = body as Record<string, unknown>

    if (!customerId || typeof customerId !== 'string') {
      return NextResponse.json({ error: 'customerId is required.' }, { status: 400 })
    }

    const { url } = await createPartnerPortalSession(customerId)
    return NextResponse.json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[industry-partners/portal] Error:', message)
    return NextResponse.json({ error: 'Failed to create portal session.' }, { status: 500 })
  }
}
