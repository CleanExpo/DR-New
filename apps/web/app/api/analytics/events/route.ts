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
import { timingSafeEqual } from 'crypto';
import { authenticateRequest } from '@/lib/auth-middleware';
import { requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { recordAnalyticsEvent } from '@/lib/analytics/event-processor';

function isValidApiKey(provided: string): boolean {
  const expected = process.env.ANALYTICS_API_KEY;
  if (!expected) return false;
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

export async function POST(request: NextRequest) {
  try {
    // Events can be recorded by authenticated users or system with API key
    const apiKey = request.headers.get('X-API-Key');

    let userId: string | undefined;

    if (apiKey) {
      if (!isValidApiKey(apiKey)) {
        return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
      }
    } else {
      // Require authentication if no API key
      const authResult = await authenticateRequest(request);
      if (!authResult.success) {
        return authResult.response;
      }
      userId = authResult.context.user.id;
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
    await recordAnalyticsEvent(type, data, userId);

    return NextResponse.json({
      success: true,
      message: 'Event recorded successfully',
      eventType: type,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('[Analytics] Error recording event:', error);

    return NextResponse.json(
      { error: 'Failed to record analytics event' },
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
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
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
