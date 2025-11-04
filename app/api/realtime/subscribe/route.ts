/**
 * SSE (Server-Sent Events) subscription endpoint
 * Provides real-time updates to connected clients
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { sseManager } from '@/lib/realtime/sse-manager';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max duration

export async function GET(request: NextRequest) {
  // Authenticate the request
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !session?.user?.tenantId) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const userId = session.user.id;
  const tenantId = session.user.tenantId;
  const clientId = `${userId}-${uuidv4()}`;

  // Create SSE response stream
  const stream = new ReadableStream({
    start(controller) {
      console.log(`SSE: Client connecting - User: ${userId}, Client: ${clientId}`);

      // Register the client with SSE manager
      const cleanup = sseManager.registerConnection(userId, tenantId, controller);

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        console.log(`SSE: Client disconnecting - User: ${userId}, Client: ${clientId}`);
        cleanup();
      });
    },
  });

  // Return SSE response with proper headers
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable Nginx buffering
    },
  });
}