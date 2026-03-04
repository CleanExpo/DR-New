/**
 * Printful Webhook Handler
 *
 * Receives fulfilment lifecycle events from Printful.
 * Validates the HMAC-SHA256 signature before processing.
 *
 * Events handled:
 *   - order_created
 *   - order_updated
 *   - order_shipped
 *   - order_failed
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------

function verifySignature(rawBody: string, signature: string | null): boolean {
  const secret = process.env.PRINTFUL_WEBHOOK_SECRET
  if (!secret) {
    console.warn('[printful:webhook] PRINTFUL_WEBHOOK_SECRET not configured — skipping verification')
    return false
  }

  if (!signature) {
    return false
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('hex')

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  )
}

// ---------------------------------------------------------------------------
// Event types
// ---------------------------------------------------------------------------

interface PrintfulWebhookPayload {
  type: string
  created: number
  retries: number
  store: number
  data: {
    order: {
      id: number
      external_id: string
      status: string
      shipping: string
      created: number
      updated: number
      shipments?: Array<{
        id: number
        carrier: string
        service: string
        tracking_number: string
        tracking_url: string
        ship_date: string
        delivered_at?: string
      }>
    }
  }
}

// ---------------------------------------------------------------------------
// Handlers per event type
// ---------------------------------------------------------------------------

function handleOrderCreated(payload: PrintfulWebhookPayload) {
  const { id, external_id, status } = payload.data.order
  console.log(
    `[printful:webhook] order_created — Printful #${id}, external: ${external_id}, status: ${status}`
  )
}

function handleOrderUpdated(payload: PrintfulWebhookPayload) {
  const { id, external_id, status } = payload.data.order
  console.log(
    `[printful:webhook] order_updated — Printful #${id}, external: ${external_id}, status: ${status}`
  )
}

function handleOrderShipped(payload: PrintfulWebhookPayload) {
  const { id, external_id, shipments } = payload.data.order
  const tracking = shipments?.[0]
  console.log(
    `[printful:webhook] order_shipped — Printful #${id}, external: ${external_id}, ` +
      `carrier: ${tracking?.carrier ?? 'unknown'}, tracking: ${tracking?.tracking_number ?? 'n/a'}`
  )
}

function handleOrderFailed(payload: PrintfulWebhookPayload) {
  const { id, external_id, status } = payload.data.order
  console.error(
    `[printful:webhook] order_failed — Printful #${id}, external: ${external_id}, status: ${status}`
  )
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('x-printful-signature')

  if (!verifySignature(rawBody, signature)) {
    console.warn('[printful:webhook] Invalid signature — rejecting request')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let payload: PrintfulWebhookPayload
  try {
    payload = JSON.parse(rawBody) as PrintfulWebhookPayload
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  switch (payload.type) {
    case 'order_created':
      handleOrderCreated(payload)
      break
    case 'order_updated':
      handleOrderUpdated(payload)
      break
    case 'order_shipped':
      handleOrderShipped(payload)
      break
    case 'order_failed':
      handleOrderFailed(payload)
      break
    default:
      console.log(`[printful:webhook] Unhandled event type: ${payload.type}`)
  }

  return NextResponse.json({ received: true })
}
