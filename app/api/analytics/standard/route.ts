import { NextResponse } from 'next/server';

// Analytics data storage
const analyticsData = {
  pageViews: 0,
  uniqueVisitors: new Set(),
  events: [] as any[],
  sessions: new Map(),
};

export async function GET(request: Request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric') || 'all';
    const period = searchParams.get('period') || '24h';

    // Filter data based on period
    const now = Date.now();
    const periodMs = getPeriodInMs(period);
    const filteredEvents = analyticsData.events.filter(
      event => now - event.timestamp < periodMs
    );

    // Prepare response based on requested metric
    let response: any = {};

    switch (metric) {
      case 'pageViews':
        response = {
          total: analyticsData.pageViews,
          period: filteredEvents.length,
        };
        break;

      case 'uniqueVisitors':
        response = {
          total: analyticsData.uniqueVisitors.size,
          period: new Set(filteredEvents.map(e => e.visitorId)).size,
        };
        break;

      case 'events':
        response = {
          total: analyticsData.events.length,
          period: filteredEvents.length,
          recent: filteredEvents.slice(-10),
        };
        break;

      case 'all':
      default:
        response = {
          pageViews: {
            total: analyticsData.pageViews,
            period: filteredEvents.filter(e => e.type === 'pageView').length,
          },
          uniqueVisitors: {
            total: analyticsData.uniqueVisitors.size,
            period: new Set(filteredEvents.map(e => e.visitorId)).size,
          },
          events: {
            total: analyticsData.events.length,
            period: filteredEvents.length,
          },
          activeSessions: analyticsData.sessions.size,
        };
        break;
    }

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Record the analytics event
    const event = {
      ...data,
      timestamp: Date.now(),
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    };

    // Update analytics data
    analyticsData.events.push(event);

    if (data.type === 'pageView') {
      analyticsData.pageViews++;
    }

    if (data.visitorId) {
      analyticsData.uniqueVisitors.add(data.visitorId);
    }

    if (data.sessionId) {
      analyticsData.sessions.set(data.sessionId, {
        lastActivity: Date.now(),
        events: (analyticsData.sessions.get(data.sessionId)?.events || 0) + 1,
      });
    }

    // Clean old events (keep last 10000)
    if (analyticsData.events.length > 10000) {
      analyticsData.events = analyticsData.events.slice(-10000);
    }

    // Clean old sessions (older than 30 minutes)
    const sessionTimeout = 30 * 60 * 1000;
    const now = Date.now();
    for (const [sessionId, session] of analyticsData.sessions.entries()) {
      if (now - session.lastActivity > sessionTimeout) {
        analyticsData.sessions.delete(sessionId);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Analytics event recorded',
    });
  } catch (error) {
    console.error('Error recording analytics:', error);
    return NextResponse.json(
      { error: 'Failed to record analytics event' },
      { status: 500 }
    );
  }
}

function getPeriodInMs(period: string): number {
  switch (period) {
    case '1h':
      return 60 * 60 * 1000;
    case '24h':
      return 24 * 60 * 60 * 1000;
    case '7d':
      return 7 * 24 * 60 * 60 * 1000;
    case '30d':
      return 30 * 24 * 60 * 60 * 1000;
    default:
      return 24 * 60 * 60 * 1000;
  }
}