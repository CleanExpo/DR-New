/**
 * Stripe Connect Webhook Handler (DR-898)
 *
 * POST /api/webhooks/stripe/connect
 *
 * Handles Connect-account lifecycle events:
 * - account.updated: persist payouts_enabled / charges_enabled /
 *   requirements.currently_due on ContractorProfile and recompute the
 *   contractor's dispatch eligibility (the gate reads these fields live).
 * - transfer.reversed: mark the matching ContractorPayout ledger row
 *   REVERSED so paid-out totals stay truthful.
 *
 * Signature is verified with STRIPE_CONNECT_WEBHOOK_SECRET (Connect events
 * are signed by a dedicated endpoint secret; falls back to
 * STRIPE_WEBHOOK_SECRET for single-endpoint test environments).
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { isDispatchEligible } from '@/lib/services/dispatch-eligibility';
import { isEventProcessed, recordWebhookEvent } from '@/src/lib/stripe/webhook-idempotency';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
      })
    : null;

  const webhookSecret =
    process.env.STRIPE_CONNECT_WEBHOOK_SECRET ||
    process.env.STRIPE_WEBHOOK_SECRET ||
    '';

  if (!stripe || !webhookSecret) {
    console.error('[Connect Webhook] Stripe not configured');
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 503 }
    );
  }

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('[Connect Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const alreadyProcessed = await isEventProcessed(event.id);
    if (alreadyProcessed) {
      console.info(`[Connect Webhook] Event ${event.id} already processed, skipping`);
      return NextResponse.json({ received: true });
    }
  } catch (error) {
    console.error('[Connect Webhook] Idempotency check failed:', error);
    return NextResponse.json(
      { error: 'Idempotency check failed' },
      { status: 503 }
    );
  }

  try {
    switch (event.type) {
      case 'account.updated': {
        const account = event.data.object as Stripe.Account;
        await handleAccountUpdated(account);
        break;
      }

      case 'transfer.reversed': {
        const transfer = event.data.object as Stripe.Transfer;
        await handleTransferReversed(transfer);
        break;
      }

      default:
        console.log(`[Connect Webhook] Unhandled event: ${event.type}`);
    }

    await recordWebhookEvent(event.id, event.type, 200);
    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Webhook handler failed';
    await recordWebhookEvent(event.id, event.type, 500, errorMessage);

    console.error('[Connect Webhook] Handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

/**
 * Persist the account's capability flags on the owning ContractorProfile and
 * recompute dispatch eligibility for the owning contractor (User.id key —
 * DR-879 Option B). Unknown accounts are logged and skipped: tenant billing
 * accounts share the Stripe platform but have no contractor profile.
 */
async function handleAccountUpdated(account: Stripe.Account): Promise<void> {
  const profile = await prisma.contractorProfile.findFirst({
    where: { stripeConnectAccountId: account.id },
    select: { id: true, userId: true },
  });

  if (!profile) {
    console.log(`[Connect Webhook] No contractor profile for account ${account.id}, skipping`);
    return;
  }

  await prisma.contractorProfile.update({
    where: { id: profile.id },
    data: {
      stripePayoutsEnabled: account.payouts_enabled === true,
      stripeChargesEnabled: account.charges_enabled === true,
      stripeRequirementsDue: account.requirements?.currently_due ?? [],
      stripeCapabilitiesSyncedAt: new Date(),
    },
  });

  const eligible = await isDispatchEligible(profile.userId);
  console.log(
    `[Connect Webhook] account.updated ${account.id}: payouts=${account.payouts_enabled} charges=${account.charges_enabled} -> dispatchEligible=${eligible} (user ${profile.userId})`
  );
}

/**
 * Mark the ledger row for a reversed transfer REVERSED. The ledger row is
 * keyed by the unique stripeTransferId written when the transfer was created
 * (DR-858 N-01/N-02).
 */
async function handleTransferReversed(transfer: Stripe.Transfer): Promise<void> {
  const result = await prisma.contractorPayout.updateMany({
    where: { stripeTransferId: transfer.id },
    data: {
      status: 'REVERSED',
      failureReason: `transfer.reversed (amount_reversed: ${transfer.amount_reversed})`,
    },
  });

  if (result.count === 0) {
    console.warn(`[Connect Webhook] transfer.reversed for unknown transfer ${transfer.id} — no ledger row updated`);
    return;
  }

  console.log(`[Connect Webhook] Ledger row for transfer ${transfer.id} marked REVERSED`);
}
