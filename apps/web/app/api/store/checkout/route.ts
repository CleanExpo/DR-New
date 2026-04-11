/**
 * POST /api/store/checkout — DR-219
 *
 * Step 1 of 2: Validate cart → create Stripe PaymentIntent → return clientSecret.
 * Printful order is NOT created here. It is created in /api/store/checkout/confirm
 * after the frontend confirms payment with Stripe.js.
 *
 * Flow:
 *   Client → POST /api/store/checkout            → { clientSecret, pendingOrderId, totalAUD }
 *   Client → stripe.confirmCardPayment(secret)   → payment confirmed
 *   Client → POST /api/store/checkout/confirm    → { orderId, estimatedDelivery }
 */

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getProductById, type StoreProduct } from '@/lib/printful/products'

export const dynamic = 'force-dynamic'

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
    })
  : null

// ---------------------------------------------------------------------------
// Request / Response shapes
// ---------------------------------------------------------------------------

interface CheckoutItem {
  productId: string
  variantId: string
  quantity: number
}

interface CheckoutRecipient {
  name: string
  address: string
  address2?: string
  city: string
  state: string
  postcode: string
  country: 'AU'
  email?: string
}

interface CheckoutRequest {
  items: CheckoutItem[]
  recipient: CheckoutRecipient
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validatePayload(body: unknown): { data?: CheckoutRequest; error?: string } {
  const req = body as CheckoutRequest

  if (!req.items || !Array.isArray(req.items) || req.items.length === 0) {
    return { error: 'items must be a non-empty array' }
  }

  for (const item of req.items) {
    if (!item.productId || !item.variantId || !item.quantity) {
      return { error: 'Each item requires productId, variantId, and quantity' }
    }
    if (item.quantity < 1 || item.quantity > 50) {
      return { error: 'Quantity must be between 1 and 50' }
    }
  }

  const r = req.recipient
  if (!r || !r.name || !r.address || !r.city || !r.state || !r.postcode) {
    return { error: 'Recipient must include name, address, city, state, and postcode' }
  }

  if (r.country !== 'AU') {
    return { error: 'Only Australian delivery addresses are currently supported' }
  }

  return { data: req }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  if (!stripe) {
    console.error('[store:checkout] STRIPE_SECRET_KEY not configured')
    return NextResponse.json({ error: 'Payment service unavailable' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { data, error } = validatePayload(body)
  if (error || !data) {
    return NextResponse.json({ error }, { status: 400 })
  }

  // Resolve products and calculate totals
  type ResolvedItem = {
    product: StoreProduct
    variantId: string
    quantity: number
    lineTotal: number
  }

  const resolvedOrErrors = await Promise.all(
    data.items.map(async (item): Promise<ResolvedItem | NextResponse> => {
      const product = getProductById(item.productId)
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 })
      }

      const variant = product.variants.find((v) => v.id === item.variantId)
      if (!variant) {
        return NextResponse.json(
          { error: `Variant "${item.variantId}" not found for product "${product.name}"` },
          { status: 400 }
        )
      }

      if (!variant.inStock) {
        return NextResponse.json(
          { error: `Variant "${variant.name}" of "${product.name}" is currently out of stock` },
          { status: 400 }
        )
      }

      const unitPrice = product.basePrice + variant.priceAdjustment
      return { product, variantId: item.variantId, quantity: item.quantity, lineTotal: unitPrice * item.quantity }
    })
  )

  const firstError = resolvedOrErrors.find((r): r is NextResponse => r instanceof NextResponse)
  if (firstError) return firstError

  const resolvedItems = resolvedOrErrors as ResolvedItem[]
  const subtotalAUD = resolvedItems.reduce((sum, i) => sum + i.lineTotal, 0)
  const pendingOrderId = `NRPG-${Date.now()}`

  // Create Stripe PaymentIntent — Printful order is NOT submitted yet
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(subtotalAUD * 100), // cents
      currency: 'aud',
      metadata: {
        pendingOrderId,
        recipientName: data.recipient.name,
        recipientEmail: data.recipient.email ?? '',
        recipientAddress: data.recipient.address,
        recipientCity: data.recipient.city,
        recipientState: data.recipient.state,
        recipientPostcode: data.recipient.postcode,
        // Serialise cart for use in confirm step
        cartJson: JSON.stringify(
          resolvedItems.map(i => ({
            productId: i.product.id,
            variantId: i.variantId,
            quantity: i.quantity,
            printfulProductId: i.product.printfulProductId ?? null,
          }))
        ),
      },
      automatic_payment_methods: { enabled: true },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      pendingOrderId,
      paymentIntentId: paymentIntent.id,
      totalAUD: subtotalAUD,
    })
  } catch (err) {
    console.error('[store:checkout] Stripe PaymentIntent creation failed:', err)
    return NextResponse.json({ error: 'Failed to initialise payment. Please try again.' }, { status: 502 })
  }
}
