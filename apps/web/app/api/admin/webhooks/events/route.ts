/**
 * Admin API: Webhook Events Monitoring
 *
 * Provides webhook event data for admin monitoring dashboard
 * - Recent events
 * - Failed events
 * - Success rates
 * - Event type statistics
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/webhooks/events
 *
 * Query parameters:
 * - status: 'success' | 'failed' | 'all' (default: all)
 * - eventType: filter by event type
 * - limit: number of results (default: 50, max: 200)
 * - offset: pagination offset (default: 0)
 * - days: number of days to look back (default: 7)
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication (admin only)
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // TODO: Add admin role check
    // if (session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const status = searchParams.get('status') || 'all';
    const eventType = searchParams.get('eventType');
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
    const offset = parseInt(searchParams.get('offset') || '0');
    const days = parseInt(searchParams.get('days') || '7');

    // Build where clause
    const where: any = {
      processedAt: {
        gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000),
      },
    };

    if (status === 'success') {
      where.processed = true;
      where.statusCode = 200;
    } else if (status === 'failed') {
      where.OR = [
        { processed: false },
        { statusCode: { not: 200 } },
      ];
    }

    if (eventType) {
      where.eventType = eventType;
    }

    // Fetch events
    const [events, totalCount] = await Promise.all([
      prisma.stripeWebhookEvent.findMany({
        where,
        orderBy: { processedAt: 'desc' },
        take: limit,
        skip: offset,
        select: {
          id: true,
          stripeEventId: true,
          eventType: true,
          processed: true,
          statusCode: true,
          errorMessage: true,
          processedAt: true,
        },
      }),
      prisma.stripeWebhookEvent.count({ where }),
    ]);

    // Get statistics
    const stats = await getWebhookStatistics(days);

    return NextResponse.json({
      events,
      pagination: {
        total: totalCount,
        limit,
        offset,
        hasMore: offset + limit < totalCount,
      },
      statistics: stats,
    });
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch webhook events' },
      { status: 500 }
    );
  }
}

/**
 * Get webhook statistics for the dashboard
 */
async function getWebhookStatistics(days: number) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  // Get event counts by type
  const eventsByType = await prisma.stripeWebhookEvent.groupBy({
    by: ['eventType'],
    where: { processedAt: { gte: since } },
    _count: {
      eventType: true,
    },
    orderBy: {
      _count: {
        eventType: 'desc',
      },
    },
  });

  // Get success/failure counts
  const successCount = await prisma.stripeWebhookEvent.count({
    where: {
      processedAt: { gte: since },
      processed: true,
      statusCode: 200,
    },
  });

  const failureCount = await prisma.stripeWebhookEvent.count({
    where: {
      processedAt: { gte: since },
      OR: [
        { processed: false },
        { statusCode: { not: 200 } },
      ],
    },
  });

  const totalCount = successCount + failureCount;
  const successRate = totalCount > 0 ? (successCount / totalCount) * 100 : 0;

  // Get recent failed events
  const recentFailures = await prisma.stripeWebhookEvent.findMany({
    where: {
      processedAt: { gte: since },
      OR: [
        { processed: false },
        { statusCode: { not: 200 } },
      ],
    },
    orderBy: { processedAt: 'desc' },
    take: 10,
    select: {
      id: true,
      stripeEventId: true,
      eventType: true,
      statusCode: true,
      errorMessage: true,
      processedAt: true,
    },
  });

  // Get payment failure audit logs (for payment tracking)
  const paymentFailures = await prisma.auditLog.findMany({
    where: {
      action: 'payment_failed',
      createdAt: { gte: since },
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true,
      workspaceId: true,
      tenantId: true,
      entityId: true,
      metadata: true,
      createdAt: true,
    },
  });

  return {
    overview: {
      total: totalCount,
      successful: successCount,
      failed: failureCount,
      successRate: Math.round(successRate * 100) / 100,
    },
    eventsByType: eventsByType.map((item) => ({
      type: item.eventType,
      count: item._count.eventType,
    })),
    recentFailures,
    paymentFailures,
  };
}
