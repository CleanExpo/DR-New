/**
 * POST /api/store/checkout
 *
 * Validates cart items against the local catalogue, then submits
 * a fulfilment order to Printful. Returns the Printful order ID,
 * estimated delivery window, and total in AUD.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getProductById, type StoreProduct } from '@/lib/printful/products'
import { createPrintfulOrder } from '@/lib/printful/sync'

export const dynamic = 'force-dynamic'

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

  // Resolve products and calculate totals in parallel (Von Neumann: no blocking serial loop)
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
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        )
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
      return {
        product,
        variantId: item.variantId,
        quantity: item.quantity,
        lineTotal: unitPrice * item.quantity,
      }
    })
  )

  // Surface the first validation error, if any
  const firstError = resolvedOrErrors.find((r): r is NextResponse => r instanceof NextResponse)
  if (firstError) return firstError

  const resolvedItems = resolvedOrErrors as ResolvedItem[]
  const subtotalAUD = resolvedItems.reduce((sum, i) => sum + i.lineTotal, 0)

  // Build Printful order
  const externalId = `NRPG-${Date.now()}`

  try {
    const printfulOrder = await createPrintfulOrder({
      externalId,
      recipient: {
        name: data.recipient.name,
        address1: data.recipient.address,
        address2: data.recipient.address2,
        city: data.recipient.city,
        state_code: data.recipient.state,
        country_code: data.recipient.country,
        zip: data.recipient.postcode,
        email: data.recipient.email,
      },
      items: resolvedItems
        .filter((i) => i.product.printfulProductId)
        .map((i) => ({
          external_variant_id: `${i.product.id}-${i.variantId}`,
          quantity: i.quantity,
        })),
      confirm: false,
    })

    // Shannon: return only what the client needs — it already holds cart state locally
    return NextResponse.json({
      orderId: printfulOrder.id,
      externalId,
      estimatedDelivery: '7-14 business days',
      totalAUD: subtotalAUD,
    })
  } catch (err) {
    console.error('[store:checkout] Printful order failed:', err)
    return NextResponse.json(
      { error: 'Failed to create fulfilment order. Please try again or contact support@disasterrecovery.com.au' },
      { status: 502 }
    )
  }
}
