// Real-time Analytics API Route with Server-Sent Events
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';

// GET /api/analytics/realtime - Stream real-time analytics updates
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Set up Server-Sent Events
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          // Send initial connection message
          const message = `event: connected\ndata: ${JSON.stringify({
            message: 'Real-time analytics stream connected',
            user: { id: user.id, role: user.role },
            timestamp: new Date().toISOString()
          })}\n\n`;
          controller.enqueue(encoder.encode(message));

          // Set up interval for sending updates
          const interval = setInterval(async () => {
            try {
              // Get real-time metrics
              const metrics = await analyticsService.getRealTimeMetrics();

              // Format SSE message
              const eventMessage = `event: metrics\ndata: ${JSON.stringify({
                type: 'metrics_update',
                data: metrics,
                timestamp: new Date().toISOString()
              })}\n\n`;

              controller.enqueue(encoder.encode(eventMessage));

              // Occasionally send alerts or notifications
              if (Math.random() > 0.8) {
                const alertMessage = `event: alert\ndata: ${JSON.stringify({
                  type: 'system_alert',
                  severity: Math.random() > 0.5 ? 'info' : 'warning',
                  message: generateRandomAlert(),
                  timestamp: new Date().toISOString()
                })}\n\n`;

                controller.enqueue(encoder.encode(alertMessage));
              }
            } catch (error) {
              console.error('Error sending real-time update:', error);

              // Send error event
              const errorMessage = `event: error\ndata: ${JSON.stringify({
                type: 'stream_error',
                message: 'Failed to fetch metrics',
                timestamp: new Date().toISOString()
              })}\n\n`;

              controller.enqueue(encoder.encode(errorMessage));
            }
          }, 5000); // Send updates every 5 seconds

          // Clean up on close
          req.signal.addEventListener('abort', () => {
            clearInterval(interval);
            controller.close();
          });
        }
      });

      // Return SSE response with appropriate headers
      return new NextResponse(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'X-Accel-Buffering': 'no', // Disable Nginx buffering
        }
      });
    } catch (error) {
      console.error('Real-time analytics error:', error);

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'STREAM_ERROR',
            message: 'Failed to establish real-time connection'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER',
    permissions: [PERMISSIONS.VIEW_ANALYTICS]
  }
);

// OPTIONS /api/analytics/realtime - Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function generateRandomAlert(): string {
  const alerts = [
    'New emergency job received from QBE Insurance',
    'Contractor John Smith has completed water damage restoration at Brisbane CBD',
    'Insurance claim approved for job #2024-1234',
    'High priority storm damage job assigned to team',
    'System performance optimal - all services running smoothly',
    'Weekly revenue target achieved - 105% of goal',
    'New contractor certification uploaded',
    'Customer satisfaction rating: 4.8/5 for recent job'
  ];

  return alerts[Math.floor(Math.random() * alerts.length)];
}