/**
 * POST /api/store/checkout/confirm — DR-219
 *
 * Step 2 of 2: Verify Stripe payment succeeded → create Printful order.
 * Must be called only AFTER the client has confirmed payment via Stripe.js.
 *
 * Body: { paymentIntentId: string }
 *
 * On success returns: { orderId, externalId, estimatedDelivery, totalAUD }
 * On failure returns: 400/402/502 with { error }
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createPrintfulOrder } from '@/lib/printful/sync'

export const dynamic = 'force-dynamic'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null

interface CartItem {
  productId: string
  variantId: string
  quantity: number
  printfulProductId: string | null
}

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 })
  }

  let body: { paymentIntentId?: string }
  try {
    body = await request.json() as { paymentIntentId?: string }
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { paymentIntentId } = body
  if (!paymentIntentId || typeof paymentIntentId !== 'string') {
    return NextResponse.json({ error: 'paymentIntentId is required' }, { status: 400 })
  }

  // Retrieve and verify payment status
  let paymentIntent: Stripe.PaymentIntent
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  } catch (err) {
    console.error('[store:confirm] Failed to retrieve PaymentIntent:', err)
    return NextResponse.json({ error: 'Payment not found' }, { status: 404 })
  }

  if (paymentIntent.status !== 'succeeded') {
    return NextResponse.json(
      { error: `Payment not completed — status: ${paymentIntent.status}` },
      { status: 402 }
    )
  }

  // Reconstruct order details from PaymentIntent metadata
  const meta = paymentIntent.metadata
  const externalId = meta.pendingOrderId ?? `NRPG-${Date.now()}`
  let cartItems: CartItem[] = []

  try {
    cartItems = JSON.parse(meta.cartJson ?? '[]') as CartItem[]
  } catch {
    console.error('[store:confirm] Failed to parse cartJson from PaymentIntent metadata')
    return NextResponse.json({ error: 'Invalid order metadata — contact support' }, { status: 500 })
  }

  if (cartItems.length === 0) {
    return NextResponse.json({ error: 'Empty cart in payment metadata' }, { status: 400 })
  }

  // Submit Printful order — only after payment is confirmed
  try {
    const printfulOrder = await createPrintfulOrder({
      externalId,
      recipient: {
        name: meta.recipientName,
        address1: meta.recipientAddress,
        city: meta.recipientCity,
        state_code: meta.recipientState,
        country_code: 'AU',
        zip: meta.recipientPostcode,
        email: meta.recipientEmail || undefined,
      },
      items: cartItems
        .filter(i => i.printfulProductId)
        .map(i => ({
          external_variant_id: `${i.productId}-${i.variantId}`,
          quantity: i.quantity,
        })),
      confirm: true, // Payment verified — submit to production
    })

    return NextResponse.json({
      orderId: printfulOrder.id,
      externalId,
      estimatedDelivery: '7-14 business days',
      totalAUD: paymentIntent.amount / 100,
    })
  } catch (err) {
    console.error('[store:confirm] Printful order creation failed after payment:', err)
    // Payment was taken — log for manual fulfilment recovery
    console.error('[store:confirm] MANUAL RECOVERY REQUIRED — paymentIntentId:', paymentIntentId, 'externalId:', externalId)
    return NextResponse.json(
      { error: 'Payment received but fulfilment failed. Our team will contact you within 1 business day.' },
      { status: 502 }
    )
  }
}
