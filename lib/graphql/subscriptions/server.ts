import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../schema';
import { resolvers } from '../resolvers';
import { createContext } from '../context';

/**
 * WebSocket server for GraphQL subscriptions
 * Note: This requires a custom server setup (e.g., standalone Node.js server)
 * Next.js Edge Runtime doesn't support WebSockets out of the box
 */
export function createWebSocketServer(httpServer: any) {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Create WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/api/graphql',
  });

  // Setup GraphQL subscription handler
  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx) => {
        // Extract token from connection params
        const token = ctx.connectionParams?.authorization as string | undefined;

        // Create context with user info
        return createContext();
      },
      onConnect: async (ctx) => {
        console.log('[WebSocket] Client connected');
      },
      onDisconnect: async (ctx, code, reason) => {
        console.log('[WebSocket] Client disconnected', { code, reason });
      },
      onSubscribe: async (ctx, msg) => {
        console.log('[WebSocket] Subscription started:', msg.payload.operationName);
      },
      onComplete: async (ctx, msg) => {
        console.log('[WebSocket] Subscription completed');
      },
      onError: (ctx, msg, errors) => {
        console.error('[WebSocket] Error:', errors);
      },
    },
    wsServer
  );

  return {
    wsServer,
    cleanup: serverCleanup,
  };
}

/**
 * Standalone subscription server
 * Run this separately from Next.js for production subscriptions
 *
 * Usage:
 * ```
 * node lib/graphql/subscriptions/standalone.js
 * ```
 */
export function createStandaloneSubscriptionServer(port: number = 4000) {
  const { createServer } = require('http');

  const httpServer = createServer((req, res) => {
    res.writeHead(200);
    res.end('GraphQL Subscription Server');
  });

  const { wsServer, cleanup } = createWebSocketServer(httpServer);

  httpServer.listen(port, () => {
    console.log(`[Subscription Server] Listening on ws://localhost:${port}/api/graphql`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('[Subscription Server] Shutting down...');
    cleanup.dispose();
    httpServer.close();
  });

  return {
    httpServer,
    wsServer,
    cleanup,
  };
}
