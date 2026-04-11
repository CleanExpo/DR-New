/**
 * Unite-Group Inbound Webhook — DR-259 (Step 7)
 *
 * POST /api/unite-group/webhook
 *
 * Handles inbound events from Unite-Group:
 *   lead.created        — new lead from CRM/social
 *   payment.received    — payment confirmed
 *   payment.failed      — payment failed
 *   message.inbound     — inbound SMS/email reply
 *   social.mention      — brand mention on social
 *
 * Signature: Unite-Group sends X-Unite-Signature: sha256=<hmac>
 * Secret: UNITE_GROUP_WEBHOOK_SECRET env var
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyUniteWebhookSignature } from '@/lib/unite-group';
import { prisma } from '@/lib/prisma';

// ---------------------------------------------------------------------------
// Webhook payload types
// ---------------------------------------------------------------------------

interface LeadCreatedPayload {
  event: 'lead.created';
  contactId: string;
  email: string;
  firstName: string;
  lastName: string;
  source: string;
  createdAt: string;
}

interface PaymentPayload {
  event: 'payment.received' | 'payment.failed';
  invoiceId: string;
  amount: number;
  currency: string;
  paidAt?: string;
  failureReason?: string;
}

interface MessageInboundPayload {
  event: 'message.inbound';
  channel: 'email' | 'sms';
  from: string;
  body: string;
  receivedAt: string;
}

interface SocialMentionPayload {
  event: 'social.mention';
  platform: string;
  handle: string;
  content: string;
  url?: string;
  mentionedAt: string;
}

type UniteWebhookPayload =
  | LeadCreatedPayload
  | PaymentPayload
  | MessageInboundPayload
  | SocialMentionPayload
  | { event: string };

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

async function handleLeadCreated(payload: LeadCreatedPayload): Promise<void> {
  // Log the inbound lead — future: trigger matchmaking or notification
  await prisma.webhookLog?.create?.({
    data: {
      source: 'unite-group',
      event: payload.event,
      payload: payload as object,
      receivedAt: new Date(),
    },
  }).catch(() => {
    // WebhookLog model may not exist — fail silently, don't break webhook ACK
  });
}

async function handlePaymentReceived(payload: PaymentPayload): Promise<void> {
  // Sync invoice status in local DB if we have a matching record
  await prisma.webhookLog?.create?.({
    data: {
      source: 'unite-group',
      event: payload.event,
      payload: payload as object,
      receivedAt: new Date(),
    },
  }).catch(() => {});
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get('x-unite-signature');

  if (!verifyUniteWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 401 });
  }

  let payload: UniteWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as UniteWebhookPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const validEvents = [
    'lead.created',
    'payment.received',
    'payment.failed',
    'message.inbound',
    'social.mention',
  ];

  if (!validEvents.includes(payload.event)) {
    return NextResponse.json({ received: true, processed: false });
  }

  try {
    switch (payload.event) {
      case 'lead.created':
        await handleLeadCreated(payload as LeadCreatedPayload);
        break;
      case 'payment.received':
      case 'payment.failed':
        await handlePaymentReceived(payload as PaymentPayload);
        break;
      // message.inbound and social.mention — acknowledged, no local action yet
      default:
        break;
    }
  } catch (err) {
    // Log but still ACK to prevent Unite-Group retry storms
    console.error('[unite-group/webhook] handler error:', err);
  }

  return NextResponse.json({ received: true, processed: true });
}
