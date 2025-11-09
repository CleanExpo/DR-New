import { Redis } from 'ioredis';

/**
 * Redis client for caching
 * Supports both development (optional) and production (required) modes
 */
class RedisCache {
  private client: Redis | null = null;
  private enabled: boolean = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Only initialize Redis if URL is provided
    const redisUrl = process.env.REDIS_URL;

    if (redisUrl) {
      try {
        this.client = new Redis(redisUrl, {
          retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
          },
          maxRetriesPerRequest: 3,
        });

        this.client.on('connect', () => {
          console.log('[Redis] Connected successfully');
          this.enabled = true;
        });

        this.client.on('error', (error) => {
          console.error('[Redis] Connection error:', error);
          this.enabled = false;
        });
      } catch (error) {
        console.warn('[Redis] Failed to initialize:', error);
        this.enabled = false;
      }
    } else {
      console.log('[Redis] No REDIS_URL provided, caching disabled');
    }
  }

  /**
   * Get cached value
   */
  async get<T>(key: string): Promise<T | null> {
    if (!this.enabled || !this.client) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('[Redis] Get error:', error);
      return null;
    }
  }

  /**
   * Set cached value with TTL
   */
  async set(key: string, value: any, ttlSeconds: number = 300): Promise<boolean> {
    if (!this.enabled || !this.client) return false;

    try {
      await this.client.setex(key, ttlSeconds, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('[Redis] Set error:', error);
      return false;
    }
  }

  /**
   * Delete cached value
   */
  async del(key: string): Promise<boolean> {
    if (!this.enabled || !this.client) return false;

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      console.error('[Redis] Delete error:', error);
      return false;
    }
  }

  /**
   * Delete multiple cached values by pattern
   */
  async delPattern(pattern: string): Promise<number> {
    if (!this.enabled || !this.client) return 0;

    try {
      const keys = await this.client.keys(pattern);
      if (keys.length === 0) return 0;

      const deleted = await this.client.del(...keys);
      return deleted;
    } catch (error) {
      console.error('[Redis] Delete pattern error:', error);
      return 0;
    }
  }

  /**
   * Check if cache is enabled and connected
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Close Redis connection
   */
  async close() {
    if (this.client) {
      await this.client.quit();
      this.enabled = false;
    }
  }
}

// Singleton instance
export const redisCache = new RedisCache();

/**
 * Cache decorator for GraphQL resolvers
 */
export function cached(ttl: number = 300, keyPrefix: string = 'gql') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // Generate cache key from arguments
      const cacheKey = `${keyPrefix}:${propertyKey}:${JSON.stringify(args)}`;

      // Try to get from cache
      const cached = await redisCache.get(cacheKey);
      if (cached !== null) {
        console.log(`[Cache Hit] ${cacheKey}`);
        return cached;
      }

      // Execute original method
      const result = await originalMethod.apply(this, args);

      // Store in cache
      if (result !== null && result !== undefined) {
        await redisCache.set(cacheKey, result, ttl);
        console.log(`[Cache Miss] ${cacheKey}`);
      }

      return result;
    };

    return descriptor;
  };
}

/**
 * Cache invalidation helper
 */
export async function invalidateCache(patterns: string[]) {
  let totalDeleted = 0;

  for (const pattern of patterns) {
    const deleted = await redisCache.delPattern(`gql:${pattern}`);
    totalDeleted += deleted;
  }

  console.log(`[Cache Invalidation] Deleted ${totalDeleted} keys`);
  return totalDeleted;
}

/**
 * Response caching plugin for Apollo Server
 */
export const responseCachePlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ request, response, contextValue }: any) {
        // Only cache successful queries (not mutations)
        if (
          request.operationName &&
          !request.query?.trim().startsWith('mutation') &&
          response.body.kind === 'single' &&
          !response.body.singleResult.errors
        ) {
          const cacheKey = `gql:response:${request.operationName}:${JSON.stringify(
            request.variables
          )}`;

          await redisCache.set(cacheKey, response.body.singleResult.data, 60);
        }
      },
    };
  },
};
