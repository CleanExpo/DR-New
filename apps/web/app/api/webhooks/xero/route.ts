/**
 * Xero Webhook Handler
 *
 * POST /api/webhooks/xero
 * Receives webhook notifications from Xero.
 *
 * Xero sends an Intent to Receive check (ITR) on registration:
 *   - Responds with HMAC-SHA256 hash of the request body
 *   - Xero verifies the response matches expected hash
 *
 * After registration, processes events:
 *   - invoice.created / invoice.updated
 *   - contact.created / contact.updated
 *   - payment.created
 *
 * Security: All requests must include a valid x-xero-signature header,
 * which is an HMAC-SHA256 of the raw request body using XERO_WEBHOOK_KEY.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';

export const dynamic = 'force-dynamic';

const XERO_WEBHOOK_KEY = process.env.XERO_WEBHOOK_KEY || '';

/**
 * Validate the Xero webhook signature.
 *
 * Xero signs webhook payloads using HMAC-SHA256 with the webhook key.
 * The signature is sent in the x-xero-signature header as a base64 string.
 */
function isValidXeroSignature(payload: string, signature: string): boolean {
  if (!XERO_WEBHOOK_KEY) {
    console.error('[Xero Webhook] XERO_WEBHOOK_KEY is not configured');
    return false;
  }

  const expectedSignature = createHmac('sha256', XERO_WEBHOOK_KEY)
    .update(payload)
    .digest('base64');

  // Constant-time comparison to prevent timing attacks
  if (expectedSignature.length !== signature.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    mismatch |= expectedSignature.charCodeAt(i) ^ signature.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-xero-signature');

  if (!signature) {
    console.warn('[Xero Webhook] Missing x-xero-signature header');
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 401 }
    );
  }

  // Validate HMAC-SHA256 signature
  if (!isValidXeroSignature(body, signature)) {
    console.warn('[Xero Webhook] Invalid signature');
    // Xero requires 401 for failed signature validation.
    // For ITR (Intent to Receive) checks, Xero expects a 200 with the correct
    // hash in the response. A 401 tells Xero the key is wrong.
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  // Parse the webhook payload
  let payload: any;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  // Handle webhook events
  const events = payload.events;

  if (!events || !Array.isArray(events) || events.length === 0) {
    // This is likely an ITR (Intent to Receive) validation request.
    // Xero sends an empty events array to verify webhook endpoint.
    // Respond with 200 to confirm receipt.
    return NextResponse.json({ received: true });
  }

  try {
    for (const event of events) {
      const { resourceUrl, resourceId, eventDateUtc, eventType, eventCategory, tenantId } = event;

      console.log(
        `[Xero Webhook] ${eventCategory}.${eventType} | ` +
        `Resource: ${resourceId} | Tenant: ${tenantId} | Date: ${eventDateUtc}`
      );

      // Log all events for now. As the integration matures, specific handlers
      // can be added here (e.g. syncing invoice status changes back to the platform).
      switch (eventCategory) {
        case 'INVOICE':
          console.log(`[Xero Webhook] Invoice ${eventType}: ${resourceId}`);
          break;

        case 'CONTACT':
          console.log(`[Xero Webhook] Contact ${eventType}: ${resourceId}`);
          break;

        case 'PAYMENT':
          console.log(`[Xero Webhook] Payment ${eventType}: ${resourceId}`);
          break;

        default:
          console.log(`[Xero Webhook] Unhandled category: ${eventCategory}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Xero Webhook] Handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
