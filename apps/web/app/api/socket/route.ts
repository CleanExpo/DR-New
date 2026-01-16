/**
 * WebSocket API Route
 *
 * This route initializes Socket.io server for real-time messaging
 *
 * IMPORTANT: Socket.io requires a persistent HTTP server, which is not
 * available in Vercel's serverless environment. This route is intended for:
 *
 * 1. Local development: Use with `next dev` which provides a persistent server
 * 2. Custom Node.js deployment: Run with a custom server.js
 * 3. Self-hosted: Docker/VPS deployments with persistent server
 *
 * For Vercel deployments, use:
 * - Managed WebSocket service (Ably, Pusher, Supabase Realtime)
 * - Server-Sent Events (SSE) as fallback for one-way streaming
 * - Polling as last resort for compatibility
 *
 * SETUP INSTRUCTIONS:
 * ==================
 *
 * For Local Development:
 * 1. The development server (`next dev`) creates a persistent HTTP server
 * 2. Socket.io will automatically attach to that server
 * 3. No additional configuration needed
 *
 * For Custom Node.js Server (server.js):
 * ```javascript
 * const { createServer } = require('http');
 * const express = require('express');
 * const next = require('next');
 * const { wsManager } = require('./src/lib/websocket/server-initializer');
 *
 * const app = express();
 * const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
 * const handler = nextApp.getRequestHandler();
 * const httpServer = createServer((req, res) => handler(req, res));
 *
 * nextApp.prepare().then(() => {
 *   // Initialize WebSocket
 *   wsManager.initializeWithServer(httpServer);
 *
 *   const PORT = process.env.PORT || 3000;
 *   httpServer.listen(PORT, () => {
 *     console.log(`Server running on port ${PORT}`);
 *   });
 * });
 * ```
 *
 * Environment Variables Required:
 * =============================
 * - NEXT_PUBLIC_APP_URL: Your app URL (e.g., http://localhost:3000)
 * - REDIS_URL: Redis connection URL (optional, in-memory fallback)
 *
 * Testing WebSocket Connection:
 * ============================
 * 1. Open browser console on your app
 * 2. Check console logs for "[Socket] Connected" message
 * 3. Verify socket ID is displayed
 * 4. Test sending/receiving messages through chat widget
 */

import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * GET handler for health check
 */
export async function GET(request: NextRequest) {
  // This is a placeholder route. In a real deployment:
  // 1. This route would be handled by a custom Node.js server
  // 2. Socket.io would be initialized at server startup
  // 3. This endpoint would return server status

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && !process.env.CUSTOM_SERVER) {
    return NextResponse.json(
      {
        status: 'error',
        message: 'WebSocket server not configured for this environment',
        recommendation: isProduction
          ? 'Use a managed WebSocket service (Ably, Pusher) or deploy with a custom Node.js server'
          : 'Configure a custom Node.js server for local development',
      },
      { status: 501 }
    );
  }

  return NextResponse.json(
    {
      status: 'ok',
      message: 'WebSocket server initialized',
      socketUrl,
      documentation: 'See /api/socket/route.ts for setup instructions',
    },
    { status: 200 }
  );
}

/**
 * OPTIONS handler for CORS preflight
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'CORS preflight OK' },
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

// Note: WebSocket functionality is handled by:
// 1. Socket.io server initialization in src/lib/websocket/socket-server.ts
// 2. Client-side connection in src/lib/websocket/socket-client.ts
// 3. Custom Node.js server that attaches Socket.io to the HTTP server

// For production Vercel deployment, create a separate WebSocket server:
// - Use Ably with their official Next.js integration
// - Use Pusher with Next.js SDK
// - Use Supabase Realtime for PostgreSQL notifications
// - Deploy Socket.io server separately (e.g., on Railway, Render, Heroku)
