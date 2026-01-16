/**
 * Stripe Webhook Idempotency Handler
 *
 * Prevents duplicate processing of webhook events by tracking
 * processed Stripe event IDs in the database.
 *
 * Usage:
 * 1. Check if event already processed: isEventProcessed(eventId)
 * 2. Process event: ... do work ...
 * 3. Record successful processing: recordWebhookEvent(eventId, eventType, 200)
 * 4. On error, record failure: recordWebhookEvent(eventId, eventType, 500, errorMessage)
 */

import { prisma } from '@/lib/prisma';

/**
 * Check if a Stripe webhook event has already been processed
 * @param stripeEventId - The Stripe event ID from event.id
 * @returns true if already processed, false if new event
 */
export async function isEventProcessed(stripeEventId: string): Promise<boolean> {
  try {
    const existing = await prisma.stripeWebhookEvent.findUnique({
      where: { stripeEventId },
    });
    return !!existing;
  } catch (error) {
    console.error('Error checking webhook event idempotency:', error);
    // In case of database error, log and let the webhook retry
    // This is safer than assuming it's safe to reprocess
    throw error;
  }
}

/**
 * Record a webhook event as processed (or failed)
 * @param stripeEventId - The Stripe event ID
 * @param eventType - The Stripe event type (e.g., "checkout.session.completed")
 * @param statusCode - HTTP status code of the response
 * @param errorMessage - Optional error message if processing failed
 */
export async function recordWebhookEvent(
  stripeEventId: string,
  eventType: string,
  statusCode: number,
  errorMessage?: string
): Promise<void> {
  try {
    await prisma.stripeWebhookEvent.create({
      data: {
        stripeEventId,
        eventType,
        processed: statusCode === 200,
        statusCode,
        errorMessage: errorMessage || null,
      },
    });
  } catch (error) {
    // If record already exists (race condition), that's fine
    // The duplicate will be caught by isEventProcessed on retry
    if ((error as any)?.code === 'P2002') {
      console.warn(`Webhook event ${stripeEventId} already recorded (race condition)`);
      return;
    }
    // Other errors should be logged but not block the response
    console.error('Error recording webhook event:', error);
  }
}

/**
 * Get retry count for a failed webhook event
 * Useful for implementing exponential backoff logic
 * @param stripeEventId - The Stripe event ID
 * @returns Number of times this event has been processed
 */
export async function getWebhookEventRetryCount(stripeEventId: string): Promise<number> {
  try {
    // Note: Our current implementation only stores one record per event
    // For retry counting, we'd need to track each attempt
    // For now, this returns 1 if event exists, 0 if new
    const existing = await prisma.stripeWebhookEvent.findUnique({
      where: { stripeEventId },
    });
    return existing ? 1 : 0;
  } catch (error) {
    console.error('Error getting webhook event retry count:', error);
    return 0;
  }
}

/**
 * Get webhook event details for monitoring/debugging
 * @param stripeEventId - The Stripe event ID
 * @returns Event record with status and error info
 */
export async function getWebhookEventStatus(stripeEventId: string) {
  try {
    return await prisma.stripeWebhookEvent.findUnique({
      where: { stripeEventId },
      select: {
        eventType: true,
        processed: true,
        statusCode: true,
        errorMessage: true,
        processedAt: true,
      },
    });
  } catch (error) {
    console.error('Error getting webhook event status:', error);
    return null;
  }
}
