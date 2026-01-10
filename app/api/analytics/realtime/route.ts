/**
 * Real-Time Analytics Streaming Endpoint
 *
 * GET /api/analytics/realtime
 *
 * Streams real-time analytics data using Server-Sent Events (SSE)
 * Alternative to WebSocket for browsers without WebSocket support
 *
 * Returns JSON-formatted analytics updates every 5 seconds:
 * - Active jobs count
 * - Response time averages
 * - Error rates
 * - Message throughput
 * - Connected users
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { logInfo, logError } from '@/lib/logger/helpers';

interface RealtimeMetrics {
  timestamp: string;
  activeJobs: number;
  activeUsers: number;
  averageResponseTime: number;
  messagesPerMinute: number;
  errorRate: number;
  activeConnections: number;
  systemHealth: {
    database: 'healthy' | 'degraded' | 'unhealthy';
    redis: 'healthy' | 'degraded' | 'unhealthy';
    socketio: 'healthy' | 'degraded' | 'unhealthy';
  };
}

/**
 * Generate mock real-time metrics
 * In production, these would come from actual system monitoring
 */
function generateMetrics(): RealtimeMetrics {
  const baseTime = 150; // Base response time in ms
  const variance = 50;

  return {
    timestamp: new Date().toISOString(),
    activeJobs: Math.floor(Math.random() * 150) + 50,
    activeUsers: Math.floor(Math.random() * 200) + 100,
    averageResponseTime: baseTime + Math.random() * variance,
    messagesPerMinute: Math.floor(Math.random() * 500) + 200,
    errorRate: Math.random() * 0.05, // 0-5% error rate
    activeConnections: Math.floor(Math.random() * 300) + 100,
    systemHealth: {
      database: Math.random() > 0.05 ? 'healthy' : 'degraded',
      redis: Math.random() > 0.1 ? 'healthy' : 'degraded',
      socketio: Math.random() > 0.05 ? 'healthy' : 'degraded',
    },
  };
}

/**
 * Format SSE message
 */
function formatSSEMessage(data: RealtimeMetrics): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

/**
 * GET /api/analytics/realtime
 * Stream real-time metrics via Server-Sent Events
 */
export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    logInfo('Real-time analytics stream started', {
      userId: (session.user as any)?.id,
      userEmail: session.user?.email,
    });

    // Create ReadableStream for SSE
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Send initial data
          const initialMetrics = generateMetrics();
          controller.enqueue(new TextEncoder().encode(formatSSEMessage(initialMetrics)));

          // Send updates every 5 seconds
          const intervalId = setInterval(() => {
            try {
              const metrics = generateMetrics();
              const message = formatSSEMessage(metrics);
              controller.enqueue(new TextEncoder().encode(message));
            } catch (error) {
              logError(error, { context: 'realtime_analytics_stream_error' });
              controller.close();
            }
          }, 5000);

          // Handle client disconnect
          const originalOnAbort = (request as any).signal?.onabort;
          if ((request as any).signal) {
            (request as any).signal.onabort = () => {
              clearInterval(intervalId);
              logInfo('Real-time analytics stream closed by client');
              if (originalOnAbort) originalOnAbort();
            };
          }

          // Auto-close after 30 minutes to prevent long-lived connections
          setTimeout(() => {
            clearInterval(intervalId);
            controller.close();
            logInfo('Real-time analytics stream auto-closed (30 min timeout)');
          }, 30 * 60 * 1000);
        } catch (error) {
          logError(error, { context: 'realtime_analytics_stream_init' });
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable buffering in reverse proxies
        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (error) {
    logError(error, { context: 'realtime_analytics_endpoint' });
    return NextResponse.json(
      { error: 'Failed to start real-time analytics stream' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics/realtime/query
 * Query specific metrics snapshot (for non-streaming use)
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { metrics: requestedMetrics } = body;

    // Generate current metrics
    const allMetrics = generateMetrics();

    // Filter to requested metrics if specified
    let responseData: any = allMetrics;
    if (requestedMetrics && Array.isArray(requestedMetrics)) {
      responseData = {};
      requestedMetrics.forEach((metric: string) => {
        if (metric in allMetrics) {
          responseData[metric] = (allMetrics as any)[metric];
        }
      });
      responseData.timestamp = allMetrics.timestamp;
    }

    logInfo('Analytics query executed', {
      userId: (session.user as any)?.id,
      metricsRequested: requestedMetrics?.length || 'all',
    });

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    logError(error, { context: 'analytics_query_endpoint' });
    return NextResponse.json(
      { error: 'Failed to query analytics' },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      status: 200,
    }
  );
}
