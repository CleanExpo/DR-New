import { PrismaClient } from '@prisma/client';
import { Redis } from 'ioredis';

// Prisma Client Singleton with Connection Pooling
class DatabaseConnection {
  private static instance: PrismaClient | null = null;
  private static connectionCount = 0;
  private static readonly MAX_CONNECTIONS = 10;

  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development'
          ? ['query', 'error', 'warn']
          : ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });

      // Connection lifecycle hooks
      this.instance.$on('query' as never, ((e: any) => {
        if (e.duration > 1000) {
          console.warn(`[DB] Slow query detected (${e.duration}ms):`, e.query);
        }
      }) as never);

      // Global error handler
      this.instance.$on('error' as never, ((e: any) => {
        console.error('[DB] Database error:', e);
      }) as never);
    }

    return this.instance;
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.$disconnect();
      this.instance = null;
      this.connectionCount = 0;
    }
  }

  static getConnectionCount(): number {
    return this.connectionCount;
  }
}

// Redis Client Singleton
class RedisConnection {
  private static instance: Redis | null = null;

  static getInstance(): Redis | null {
    // Redis is optional - only create if configured
    if (!process.env.REDIS_URL && !process.env.UPSTASH_REDIS_REST_URL) {
      return null;
    }

    if (!this.instance) {
      try {
        this.instance = new Redis(
          process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL || '',
          {
            maxRetriesPerRequest: 3,
            retryStrategy: (times: number) => {
              const delay = Math.min(times * 50, 2000);
              return delay;
            },
            lazyConnect: true,
            enableReadyCheck: true,
            enableOfflineQueue: true,
          }
        );

        this.instance.on('error', (err) => {
          console.error('[Redis] Connection error:', err);
        });

        this.instance.on('connect', () => {
          console.log('[Redis] Connected successfully');
        });
      } catch (error) {
        console.error('[Redis] Failed to initialize:', error);
        return null;
      }
    }

    return this.instance;
  }

  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      this.instance = null;
    }
  }

  static isAvailable(): boolean {
    return this.instance !== null && this.instance.status === 'ready';
  }
}

// Export singleton instances
export const prisma = DatabaseConnection.getInstance();
export const redis = RedisConnection.getInstance();

// Export utility functions
export const db = {
  getInstance: () => DatabaseConnection.getInstance(),
  disconnect: () => DatabaseConnection.disconnect(),
  getConnectionCount: () => DatabaseConnection.getConnectionCount(),
};

export const cache = {
  getInstance: () => RedisConnection.getInstance(),
  disconnect: () => RedisConnection.disconnect(),
  isAvailable: () => RedisConnection.isAvailable(),
};

// Global cleanup on process exit
if (typeof process !== 'undefined') {
  process.on('beforeExit', async () => {
    await DatabaseConnection.disconnect();
    await RedisConnection.disconnect();
  });
}

export default prisma;
