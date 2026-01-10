/**
 * Custom Node.js Server for Disaster Recovery NRPG Platform
 *
 * This server is used for:
 * 1. Local development with WebSocket support
 * 2. Custom Node.js deployments (Docker, VPS, etc.)
 * 3. Integrating Socket.io with Next.js App Router
 *
 * Usage:
 * ------
 * Development: npm run dev (uses next dev with HMR)
 * Production: node server.js (use this for custom deployments)
 *
 * Environment Variables:
 * ----------------------
 * NODE_ENV=production
 * PORT=3000
 * NEXT_PUBLIC_APP_URL=https://yourdomain.com
 * REDIS_URL=redis://localhost:6379
 */

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const hostname = process.env.HOST || 'localhost';

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Logger utility
const log = {
  info: (msg, meta = '') => console.log(`[${new Date().toISOString()}] INFO: ${msg}`, meta),
  error: (msg, err) => console.error(`[${new Date().toISOString()}] ERROR: ${msg}`, err),
  warn: (msg, meta = '') => console.warn(`[${new Date().toISOString()}] WARN: ${msg}`, meta),
};

let socketServer = null;
let httpServer = null;

/**
 * Initialize Socket.io server
 * This must happen after Next.js is ready
 */
async function initializeSocket(server) {
  try {
    // Dynamically require Socket.io (only needed if server is running)
    const { Server } = require('socket.io');
    const { createAdapter } = require('@socket.io/redis-adapter');
    const { createClient } = require('redis');

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || `http://${hostname}:${port}`;

    socketServer = new Server(server, {
      cors: {
        origin: appUrl,
        methods: ['GET', 'POST'],
        credentials: true,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    // Setup Redis adapter for clustering (optional)
    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      const pubClient = createClient({ url: redisUrl });
      const subClient = pubClient.duplicate();

      await pubClient.connect();
      await subClient.connect();

      socketServer.adapter(createAdapter(pubClient, subClient));
      log.info('Redis adapter configured for Socket.io', { url: redisUrl });
    } catch (redisError) {
      log.warn('Redis not available, using in-memory adapter', { error: redisError.message });
      // In-memory adapter is used by default
    }

    // Setup authentication middleware
    socketServer.use(async (socket, next) => {
      try {
        const { token, userId, userName, userRole, email } = socket.handshake.auth;

        if (!userId || !token) {
          return next(new Error('Authentication failed: missing userId or token'));
        }

        // Store user data on socket
        socket.data = {
          userId,
          userName,
          userRole,
          email,
          connectedAt: new Date(),
          subscriptions: new Set(),
        };

        next();
      } catch (error) {
        log.error('Socket.io auth middleware error', error);
        next(new Error('Authentication error'));
      }
    });

    // Setup connection handler
    socketServer.on('connection', (socket) => {
      const userData = socket.data;
      log.info('User connected', {
        socketId: socket.id,
        userId: userData.userId,
        userName: userData.userName,
      });

      // Broadcast user online status
      socketServer.emit('user:online', {
        userId: userData.userId,
        userName: userData.userName,
        status: 'online',
        lastSeen: new Date(),
      });

      // Handle disconnect
      socket.on('disconnect', (reason) => {
        log.info('User disconnected', {
          socketId: socket.id,
          userId: userData.userId,
          reason,
        });

        socketServer.emit('user:offline', {
          userId: userData.userId,
          status: 'offline',
          lastSeen: new Date(),
        });
      });

      // Simple ping/pong for keepalive
      socket.on('ping', (callback) => {
        callback?.();
      });

      // Chat message handler (if chat service is available)
      socket.on('chat:send', async (payload, callback) => {
        try {
          log.info('Chat message received', {
            roomId: payload.roomId,
            userId: userData.userId,
          });

          // Emit to room
          socketServer.to(payload.roomId).emit('chat:message', {
            ...payload,
            userId: userData.userId,
            userName: userData.userName,
            timestamp: new Date(),
          });

          callback?.();
        } catch (error) {
          log.error('Chat message error', error);
          callback?.(error);
        }
      });

      // Typing indicator
      socket.on('chat:typing', (payload) => {
        socket.to(payload.roomId).emit('chat:typing', {
          ...payload,
          userId: userData.userId,
          userName: userData.userName,
        });
      });

      // Subscribe to channels
      socket.on('subscribe', (channels) => {
        channels.forEach((channel) => {
          socket.join(channel);
          if (!userData.subscriptions) userData.subscriptions = new Set();
          userData.subscriptions.add(channel);
        });
      });

      // Unsubscribe from channels
      socket.on('unsubscribe', (channels) => {
        channels.forEach((channel) => {
          socket.leave(channel);
          userData.subscriptions?.delete(channel);
        });
      });
    });

    log.info('Socket.io server initialized successfully', { port });
    return socketServer;
  } catch (error) {
    log.error('Socket.io initialization failed', error);
    throw error;
  }
}

/**
 * Start the server
 */
async function start() {
  try {
    // Prepare Next.js app
    await app.prepare();
    log.info('Next.js app prepared');

    // Create HTTP server
    httpServer = createServer((req, res) => {
      // Handle Socket.io handshake
      const parsedUrl = parse(req.url, true);

      // Let Next.js handle all requests
      handle(req, res, parsedUrl);
    });

    // Initialize Socket.io
    if (process.env.DISABLE_WEBSOCKET !== 'true') {
      await initializeSocket(httpServer);
    } else {
      log.warn('WebSocket disabled via DISABLE_WEBSOCKET environment variable');
    }

    // Start listening
    await new Promise<void>((resolve, reject) => {
      httpServer.listen(port, hostname, () => {
        log.info('Server started successfully', {
          mode: dev ? 'development' : 'production',
          host: hostname,
          port,
          url: `http://${hostname}:${port}`,
        });
        resolve();
      });

      httpServer.on('error', (error) => {
        reject(error);
      });
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      log.info(`${signal} received, shutting down gracefully...`);

      if (socketServer) {
        socketServer.close();
      }

      if (httpServer) {
        httpServer.close(() => {
          log.info('Server shut down successfully');
          process.exit(0);
        });
      }

      // Force shutdown after 10 seconds
      setTimeout(() => {
        log.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    log.error('Server startup failed', error);
    process.exit(1);
  }
}

// Start server
start();
