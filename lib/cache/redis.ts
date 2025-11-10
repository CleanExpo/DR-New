import { Redis } from 'ioredis';
import { cache as redisConnection } from '../db/connection';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Cache tags for invalidation
  compress?: boolean; // Compress large payloads
}

export interface CacheResult<T> {
  data: T | null;
  cached: boolean;
  timestamp?: number;
}

export class CacheClient {
  private redis: Redis | null;
  private enabled: boolean;
  private readonly DEFAULT_TTL = 3600; // 1 hour
  private readonly MAX_SIZE = 1024 * 1024; // 1MB

  constructor() {
    this.redis = redisConnection.getInstance();
    this.enabled = this.redis !== null;
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<CacheResult<T>> {
    if (!this.enabled || !this.redis) {
      return { data: null, cached: false };
    }

    try {
      const value = await this.redis.get(this.prefixKey(key));

      if (!value) {
        return { data: null, cached: false };
      }

      const parsed = JSON.parse(value);
      return {
        data: parsed.data as T,
        cached: true,
        timestamp: parsed.timestamp,
      };
    } catch (error) {
      console.error('[Cache] Get error:', error);
      return { data: null, cached: false };
    }
  }

  /**
   * Set value in cache
   */
  async set<T>(key: string, value: T, options: CacheOptions = {}): Promise<boolean> {
    if (!this.enabled || !this.redis) {
      return false;
    }

    try {
      const ttl = options.ttl || this.DEFAULT_TTL;
      const payload = JSON.stringify({
        data: value,
        timestamp: Date.now(),
        tags: options.tags || [],
      });

      // Check payload size
      if (payload.length > this.MAX_SIZE) {
        console.warn('[Cache] Payload too large:', key, payload.length);
        return false;
      }

      await this.redis.setex(this.prefixKey(key), ttl, payload);

      // Store tag mappings for invalidation
      if (options.tags && options.tags.length > 0) {
        await this.storeTags(key, options.tags);
      }

      return true;
    } catch (error) {
      console.error('[Cache] Set error:', error);
      return false;
    }
  }

  /**
   * Delete single key
   */
  async delete(key: string): Promise<boolean> {
    if (!this.enabled || !this.redis) {
      return false;
    }

    try {
      await this.redis.del(this.prefixKey(key));
      return true;
    } catch (error) {
      console.error('[Cache] Delete error:', error);
      return false;
    }
  }

  /**
   * Delete multiple keys by pattern
   */
  async deletePattern(pattern: string): Promise<number> {
    if (!this.enabled || !this.redis) {
      return 0;
    }

    try {
      const keys = await this.redis.keys(this.prefixKey(pattern));
      if (keys.length === 0) {return 0;}

      await this.redis.del(...keys);
      return keys.length;
    } catch (error) {
      console.error('[Cache] Delete pattern error:', error);
      return 0;
    }
  }

  /**
   * Invalidate cache by tags
   */
  async invalidateByTags(tags: string[]): Promise<number> {
    if (!this.enabled || !this.redis) {
      return 0;
    }

    try {
      let totalDeleted = 0;

      for (const tag of tags) {
        const tagKey = this.tagKey(tag);
        const keys = await this.redis.smembers(tagKey);

        if (keys.length > 0) {
          // Delete all keys with this tag
          const prefixedKeys = keys.map(k => this.prefixKey(k));
          await this.redis.del(...prefixedKeys);
          totalDeleted += keys.length;
        }

        // Delete tag set
        await this.redis.del(tagKey);
      }

      return totalDeleted;
    } catch (error) {
      console.error('[Cache] Invalidate by tags error:', error);
      return 0;
    }
  }

  /**
   * Get or set with fallback
   */
  async getOrSet<T>(
    key: string,
    fallback: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache
    const cached = await this.get<T>(key);

    if (cached.cached && cached.data !== null) {
      return cached.data;
    }

    // Execute fallback
    const data = await fallback();

    // Store in cache (fire and forget)
    this.set(key, data, options).catch(err => {
      console.error('[Cache] Background set failed:', err);
    });

    return data;
  }

  /**
   * Increment counter
   */
  async increment(key: string, amount: number = 1): Promise<number> {
    if (!this.enabled || !this.redis) {
      return 0;
    }

    try {
      return await this.redis.incrby(this.prefixKey(key), amount);
    } catch (error) {
      console.error('[Cache] Increment error:', error);
      return 0;
    }
  }

  /**
   * Check if key exists
   */
  async exists(key: string): Promise<boolean> {
    if (!this.enabled || !this.redis) {
      return false;
    }

    try {
      const result = await this.redis.exists(this.prefixKey(key));
      return result === 1;
    } catch (error) {
      console.error('[Cache] Exists error:', error);
      return false;
    }
  }

  /**
   * Get TTL for key
   */
  async getTTL(key: string): Promise<number> {
    if (!this.enabled || !this.redis) {
      return -1;
    }

    try {
      return await this.redis.ttl(this.prefixKey(key));
    } catch (error) {
      console.error('[Cache] Get TTL error:', error);
      return -1;
    }
  }

  /**
   * Flush all cache
   */
  async flush(): Promise<boolean> {
    if (!this.enabled || !this.redis) {
      return false;
    }

    try {
      await this.redis.flushdb();
      return true;
    } catch (error) {
      console.error('[Cache] Flush error:', error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  async getStats(): Promise<{
    enabled: boolean;
    connected: boolean;
    keyCount: number;
    memoryUsed: string;
  }> {
    if (!this.enabled || !this.redis) {
      return {
        enabled: false,
        connected: false,
        keyCount: 0,
        memoryUsed: '0',
      };
    }

    try {
      const dbSize = await this.redis.dbsize();
      const info = await this.redis.info('memory');
      const memoryMatch = info.match(/used_memory_human:(\S+)/);

      return {
        enabled: true,
        connected: this.redis.status === 'ready',
        keyCount: dbSize,
        memoryUsed: memoryMatch ? memoryMatch[1] : 'unknown',
      };
    } catch (error) {
      console.error('[Cache] Get stats error:', error);
      return {
        enabled: true,
        connected: false,
        keyCount: 0,
        memoryUsed: 'unknown',
      };
    }
  }

  // Private helper methods

  private prefixKey(key: string): string {
    return `dr:${key}`;
  }

  private tagKey(tag: string): string {
    return `dr:tag:${tag}`;
  }

  private async storeTags(key: string, tags: string[]): Promise<void> {
    if (!this.redis) {return;}

    try {
      const pipeline = this.redis.pipeline();

      for (const tag of tags) {
        pipeline.sadd(this.tagKey(tag), key);
        pipeline.expire(this.tagKey(tag), 86400); // 24 hours
      }

      await pipeline.exec();
    } catch (error) {
      console.error('[Cache] Store tags error:', error);
    }
  }
}

// Export singleton instance
export const cacheClient = new CacheClient();

// Convenience exports
export const { get, set, delete: del, getOrSet, invalidateByTags, flush } = cacheClient;
