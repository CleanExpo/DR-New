/**
 * Real-time Events SSE Endpoint
 * Streams real-time events to connected clients via Server-Sent Events
 */

import { NextRequest, NextResponse } from 'next/server';
import { sseManager } from '@/lib/realtime/sse-manager';
import { authenticateRequest } from '@/lib/auth';

// Force dynamic rendering for SSE
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * GET /api/realtime/events
 * Establish SSE connection for real-time updates
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.authenticated || !authResult.user) {
      return NextResponse.json(
        { error: 'Unauthorised' },
        { status: 401 }
      );
    }

    const { user } = authResult;

    // Create ReadableStream for SSE
    const stream = new ReadableStream({
      start(controller) {
        // Register connection and get cleanup function
        const cleanup = sseManager.registerConnection(
          user.id,
          user.tenantId,
          controller
        );

        // Handle client disconnect
        request.signal.addEventListener('abort', () => {
          cleanup();
        });
      },
    });

    // Return SSE response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'X-Accel-Buffering': 'no', // Disable buffering in nginx
      },
    });
  } catch (error) {
    console.error('Error establishing SSE connection:', error);
    return NextResponse.json(
      { error: 'Failed to establish SSE connection' },
      { status: 500 }
    );
  }
}
