/**
 * Webhook Monitoring API
 *
 * Provides endpoints for monitoring webhook health and failed events.
 * This endpoint should be protected by authentication in production.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getFailedWebhookEvents, getWebhookStats, getAlertSummary } from '@/src/lib/stripe/webhook-monitoring';

export const dynamic = 'force-dynamic';

/**
 * GET /api/webhooks/monitoring
 *
 * Returns webhook monitoring data
 *
 * Query parameters:
 * - summary=true - Return alert summary (default)
 * - stats=true - Return statistics
 * - failed=true - Return list of failed events
 * - timeWindow=60 - Time window in minutes (default 60)
 * - limit=50 - Limit for failed events list (default 50)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // Parse query parameters
    const returnSummary = searchParams.get('summary') !== 'false';
    const returnStats = searchParams.get('stats') === 'true';
    const returnFailed = searchParams.get('failed') === 'true';
    const timeWindow = parseInt(searchParams.get('timeWindow') || '60', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // TODO: Add authentication check here
    // if (!hasMonitoringAccess(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const response: Record<string, unknown> = {};

    // Get alert summary
    if (returnSummary) {
      response.summary = await getAlertSummary(timeWindow);
    }

    // Get statistics
    if (returnStats) {
      response.stats = await getWebhookStats(timeWindow);
    }

    // Get failed events
    if (returnFailed) {
      response.failedEvents = await getFailedWebhookEvents({
        limit,
        offsetMinutes: timeWindow,
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching webhook monitoring data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitoring data', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/webhooks/monitoring/retry
 *
 * Manually retry a failed webhook event
 *
 * Body:
 * {
 *   "stripeEventId": "evt_1234567890"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { stripeEventId } = body;

    if (!stripeEventId || typeof stripeEventId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid stripeEventId' }, { status: 400 });
    }

    // TODO: Add authentication check here
    // if (!hasMonitoringAccess(request)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    // Import at usage to avoid circular dependency
    const { retryFailedWebhookEvent } = await import('@/src/lib/stripe/webhook-monitoring');

    const success = await retryFailedWebhookEvent(stripeEventId);

    if (!success) {
      return NextResponse.json({ error: 'Failed to retry webhook event' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Webhook event ${stripeEventId} has been reset for retry`,
      stripeEventId,
    });
  } catch (error) {
    console.error('Error retrying webhook event:', error);
    return NextResponse.json(
      { error: 'Failed to retry webhook event', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
