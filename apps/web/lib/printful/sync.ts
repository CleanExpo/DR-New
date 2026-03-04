/**
 * Printful Sync Service
 *
 * Handles product synchronisation, shipping rate lookups,
 * and order creation via the Printful API.
 */

import { printful, PrintfulApiError } from './client'
import type { StoreProduct } from './products'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PrintfulSyncProduct {
  id: number
  external_id: string
  name: string
  variants: number
  synced: number
}

interface PrintfulShippingRate {
  id: string
  name: string
  rate: string
  currency: string
  minDeliveryDays: number
  maxDeliveryDays: number
}

interface PrintfulRecipient {
  name: string
  address1: string
  address2?: string
  city: string
  state_code: string
  country_code: string
  zip: string
  email?: string
}

interface PrintfulOrderItem {
  sync_variant_id?: number
  external_variant_id?: string
  quantity: number
}

interface PrintfulOrder {
  id: number
  external_id: string
  status: string
  shipping: string
  created: number
  updated: number
  recipient: PrintfulRecipient
  items: PrintfulOrderItem[]
  costs: {
    currency: string
    subtotal: string
    discount: string
    shipping: string
    tax: string
    total: string
  }
}

// ---------------------------------------------------------------------------
// Product sync
// ---------------------------------------------------------------------------

/**
 * Creates or updates a product in the connected Printful store.
 * Products without a `printfulProductId` are skipped (e.g. lanyards,
 * hard hats, and bundles are fulfilled outside Printful).
 */
export async function syncProductToPrintful(
  product: StoreProduct
): Promise<PrintfulSyncProduct | null> {
  if (!product.printfulProductId) {
    console.log(
      `[printful:sync] Skipping "${product.name}" — no Printful product ID`
    )
    return null
  }

  const storeId = process.env.PRINTFUL_STORE_ID
  const basePath = storeId ? `/store/products` : '/store/products'

  const syncVariants = product.variants.map((v) => ({
    external_id: v.sku,
    variant_id: product.printfulProductId,
    retail_price: (product.basePrice + v.priceAdjustment).toFixed(2),
    sku: v.sku,
  }))

  const body = {
    sync_product: {
      external_id: product.id,
      name: product.name,
    },
    sync_variants: syncVariants,
  }

  try {
    // Try to find an existing product first
    const existing = await printful.get<PrintfulSyncProduct>(
      `${basePath}/@${product.id}`
    )
    // Update if found
    const updated = await printful.put<PrintfulSyncProduct>(
      `${basePath}/${existing.result.id}`,
      body
    )
    console.log(`[printful:sync] Updated "${product.name}"`)
    return updated.result
  } catch (err) {
    if (err instanceof PrintfulApiError && err.statusCode === 404) {
      // Create new
      const created = await printful.post<PrintfulSyncProduct>(basePath, body)
      console.log(`[printful:sync] Created "${product.name}"`)
      return created.result
    }
    throw err
  }
}

// ---------------------------------------------------------------------------
// Shipping rates
// ---------------------------------------------------------------------------

export async function getPrintfulShippingRates(
  recipient: PrintfulRecipient,
  items: PrintfulOrderItem[]
): Promise<PrintfulShippingRate[]> {
  const response = await printful.post<PrintfulShippingRate[]>(
    '/shipping/rates',
    {
      recipient,
      items,
    }
  )
  return response.result
}

// ---------------------------------------------------------------------------
// Order creation
// ---------------------------------------------------------------------------

interface CreateOrderInput {
  externalId: string
  recipient: PrintfulRecipient
  items: PrintfulOrderItem[]
  /** If true the order is submitted for fulfilment immediately */
  confirm?: boolean
}

export async function createPrintfulOrder(
  order: CreateOrderInput
): Promise<PrintfulOrder> {
  const response = await printful.post<PrintfulOrder>('/orders', {
    external_id: order.externalId,
    recipient: order.recipient,
    items: order.items,
    confirm: order.confirm ?? false,
  })

  console.log(
    `[printful:order] Created order ${response.result.id} (external: ${order.externalId})`
  )

  return response.result
}
