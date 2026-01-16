'use server';

/**
 * Socket.io Server Initializer
 *
 * Provides initialization and lifecycle management for Socket.io server
 * Handles both standalone Node.js and Vercel serverless environments
 *
 * Note: For Vercel deployments, Socket.io requires:
 * - Custom Node.js server running alongside Next.js
 * - OR managed WebSocket service (Ably, Pusher)
 * - OR Server-Sent Events (SSE) fallback
 *
 * This file sets up the server instance for use in custom server mode.
 */

import { Server as HttpServer } from 'http';
import { createServer } from 'http';
import { SocketServer } from './socket-server';
import { logInfo, logError } from '@/lib/logger/helpers';

class WebSocketServerManager {
  private static instance: WebSocketServerManager | null = null;
  private httpServer: HttpServer | null = null;
  private socketServer: typeof SocketServer | null = null;
  private initialized = false;

  private constructor() {}

  /**
   * Get singleton instance of WebSocket server manager
   */
  static getInstance(): WebSocketServerManager {
    if (!this.instance) {
      this.instance = new WebSocketServerManager();
    }
    return this.instance;
  }

  /**
   * Initialize WebSocket server in standalone mode
   * This is used when running a custom Node.js server (not Vercel serverless)
   */
  async initializeStandalone(port: number = 3001): Promise<HttpServer> {
    if (this.initialized && this.httpServer) {
      logInfo('WebSocket server already initialized', { port });
      return this.httpServer;
    }

    try {
      // Create HTTP server
      this.httpServer = createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Socket.io server running\n');
      });

      // Initialize Socket.io with the HTTP server
      await SocketServer.initialize(this.httpServer);

      // Start listening
      this.httpServer.listen(port, () => {
        logInfo('WebSocket server started', {
          mode: 'standalone',
          port,
          environment: process.env.NODE_ENV,
        });
      });

      this.initialized = true;
      return this.httpServer;
    } catch (error) {
      logError(error, { context: 'websocket_standalone_init' });
      throw error;
    }
  }

  /**
   * Initialize WebSocket with existing HTTP server
   * Use this when integrating with custom Next.js server
   */
  async initializeWithServer(httpServer: HttpServer): Promise<void> {
    if (this.initialized && this.httpServer) {
      logInfo('WebSocket server already initialized');
      return;
    }

    try {
      this.httpServer = httpServer;
      await SocketServer.initialize(this.httpServer);

      logInfo('WebSocket server initialized with existing HTTP server', {
        mode: 'existing_server',
        environment: process.env.NODE_ENV,
      });

      this.initialized = true;
    } catch (error) {
      logError(error, { context: 'websocket_init_with_server' });
      throw error;
    }
  }

  /**
   * Check if server is initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get HTTP server instance
   */
  getHttpServer(): HttpServer | null {
    return this.httpServer;
  }

  /**
   * Get Socket.io server instance
   */
  getSocketServer() {
    return SocketServer;
  }

  /**
   * Gracefully shutdown server
   */
  async shutdown(): Promise<void> {
    try {
      // Shutdown Socket.io
      await SocketServer.shutdown();

      // Close HTTP server
      if (this.httpServer) {
        await new Promise<void>((resolve, reject) => {
          this.httpServer?.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }

      this.initialized = false;
      logInfo('WebSocket server shutdown complete');
    } catch (error) {
      logError(error, { context: 'websocket_shutdown' });
      throw error;
    }
  }
}

/**
 * Export singleton instance
 */
export const wsManager = WebSocketServerManager.getInstance();

/**
 * For testing and direct access
 */
export { WebSocketServerManager };
