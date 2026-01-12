/**
 * POST /api/analytics/events
 * Record an analytics event
 *
 * Body:
 * {
 *   type: 'payment:created' | 'booking:completed' | ...
 *   data: { ... }
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { recordAnalyticsEvent } from '@/lib/analytics/event-processor';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Events can be recorded by authenticated users or system
    if (!session && !request.headers.get('X-API-Key')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { type, data } = body;

    // Validate request body
    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing required fields: type, data' },
        { status: 400 }
      );
    }

    // Validate event type
    const validTypes = [
      'payment:created',
      'payment:succeeded',
      'payment:failed',
      'booking:completed',
      'job:requested',
      'contractor:joined',
      'client:joined',
      'message:sent',
    ];

    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: `Invalid event type: ${type}` },
        { status: 400 }
      );
    }

    // Record the event
    const userId = session?.user?.id;
    await recordAnalyticsEvent(type, data, userId);

    return NextResponse.json({
      success: true,
      message: 'Event recorded successfully',
      eventType: type,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('[Analytics] Error recording event:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        error: 'Failed to record analytics event',
        details: message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics/events
 * Get event statistics (admin only)
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today'; // today, week, month

    // Calculate date range
    const now = new Date();
    let startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default: // today
        startDate.setHours(0, 0, 0, 0);
    }

    return NextResponse.json({
      success: true,
      period,
      startDate,
      endDate: now,
      message: 'Event tracking active',
      note: 'Detailed event history requires accessing the event queue',
    });
  } catch (error) {
    console.error('[Analytics] Error fetching event stats:', error);

    return NextResponse.json(
      { error: 'Failed to fetch event statistics' },
      { status: 500 }
    );
  }
}
