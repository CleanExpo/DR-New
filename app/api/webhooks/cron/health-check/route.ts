/**
 * Webhook Health Check Cron Job
 *
 * Runs periodically to check webhook processing health and trigger alerts
 * if critical issues are detected.
 *
 * Add to vercel.json:
 * {
 *   "path": "/api/webhooks/cron/health-check",
 *   "schedule": "*/5 * * * *"  // Every 5 minutes
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkWebhookHealth } from '@/src/lib/stripe/webhook-monitoring';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Verify request is from Vercel's cron service
 * In production, validate the cron secret from Vercel
 */
function isValidCronRequest(request: NextRequest): boolean {
  // TODO: Implement Vercel cron secret validation
  // See: https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const cronSecret = request.headers.get('x-vercel-cron-secret');
  const expectedSecret = process.env.CRON_SECRET;

  // If no secret is configured, allow the request (development mode)
  if (!expectedSecret) {
    console.warn('CRON_SECRET not configured - allowing all requests');
    return true;
  }

  return cronSecret === expectedSecret;
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is a valid cron request
    if (!isValidCronRequest(request)) {
      console.warn('Unauthorized cron request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check webhook health
    const hasCriticalAlert = await checkWebhookHealth();

    return NextResponse.json({
      success: true,
      message: 'Webhook health check completed',
      hasCriticalAlert,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in webhook health check cron:', error);
    return NextResponse.json(
      {
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
