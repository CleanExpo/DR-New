/**
 * API Caching Utilities
 * In-memory and Redis caching with TTL support
 */

import { CACHE_DURATION } from './config';

// In-memory cache store
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
  createdAt: number;
}

const cacheStore = new Map<string, CacheEntry<any>>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(cacheStore.entries());
  for (const [key, entry] of entries) {
    if (now >= entry.expiresAt) {
      cacheStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Get cached data
 */
export function getCache<T>(key: string): T | null {
  const entry = cacheStore.get(key);

  if (!entry) {
    return null;
  }

  // Check if expired
  if (Date.now() >= entry.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return entry.data as T;
}

/**
 * Set cache data with TTL
 */
export function setCache<T>(key: string, data: T, ttlSeconds?: number): void {
  const ttl = ttlSeconds || CACHE_DURATION.services;

  cacheStore.set(key, {
    data,
    expiresAt: Date.now() + (ttl * 1000),
    createdAt: Date.now(),
  });
}

/**
 * Delete cached data
 */
export function deleteCache(key: string): boolean {
  return cacheStore.delete(key);
}

/**
 * Clear cache by pattern
 */
export function clearCachePattern(pattern: string): number {
  let count = 0;
  const regex = new RegExp(pattern);
  const keys = Array.from(cacheStore.keys());

  for (const key of keys) {
    if (regex.test(key)) {
      cacheStore.delete(key);
      count++;
    }
  }

  return count;
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cacheStore.clear();
}

/**
 * Get cache stats
 */
export function getCacheStats(): {
  size: number;
  entries: Array<{ key: string; age: number; ttl: number }>;
} {
  const now = Date.now();
  const entries = Array.from(cacheStore.entries()).map(([key, entry]) => ({
    key,
    age: Math.floor((now - entry.createdAt) / 1000),
    ttl: Math.floor((entry.expiresAt - now) / 1000),
  }));

  return {
    size: cacheStore.size,
    entries,
  };
}

/**
 * Cache key builders
 */
export const cacheKeys = {
  services: (filters?: string) => `services:${filters || 'all'}`,
  service: (slug: string) => `service:${slug}`,
  locations: (type?: string) => `locations:${type || 'all'}`,
  location: (slug: string) => `location:${slug}`,
  serviceAreas: (serviceId?: string) => `service-areas:${serviceId || 'all'}`,
  availability: (serviceId: string, locationId: string) =>
    `availability:${serviceId}:${locationId}`,
};

/**
 * Memoize function with cache
 */
export function memoize<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => TResult | Promise<TResult>,
  options: {
    keyFn: (...args: TArgs) => string;
    ttl?: number;
  }
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const key = options.keyFn(...args);
    const cached = getCache<TResult>(key);

    if (cached !== null) {
      return cached;
    }

    const result = await fn(...args);
    setCache(key, result, options.ttl);

    return result;
  };
}

/**
 * Cache-aside pattern helper
 */
export async function cacheAside<T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  // Try to get from cache
  const cached = getCache<T>(key);
  if (cached !== null) {
    return cached;
  }

  // Fetch fresh data
  const data = await fetchFn();

  // Store in cache
  setCache(key, data, ttlSeconds);

  return data;
}

/**
 * Write-through cache helper
 */
export async function cacheWriteThrough<T>(
  key: string,
  data: T,
  persistFn: (data: T) => Promise<void>,
  ttlSeconds?: number
): Promise<void> {
  // Persist data
  await persistFn(data);

  // Update cache
  setCache(key, data, ttlSeconds);
}

/**
 * Cache invalidation helper
 */
export function invalidateCache(keys: string | string[]): void {
  const keyArray = Array.isArray(keys) ? keys : [keys];

  keyArray.forEach(key => {
    // If key contains wildcard, use pattern matching
    if (key.includes('*')) {
      const pattern = key.replace(/\*/g, '.*');
      clearCachePattern(pattern);
    } else {
      deleteCache(key);
    }
  });
}

/**
 * Redis-based caching (for production)
 * Uncomment and configure when Redis is available
 */
/*
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCacheRedis<T>(key: string): Promise<T | null> {
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setCacheRedis<T>(
  key: string,
  data: T,
  ttlSeconds?: number
): Promise<void> {
  const ttl = ttlSeconds || CACHE_DURATION.services;
  await redis.setex(key, ttl, JSON.stringify(data));
}

export async function deleteCacheRedis(key: string): Promise<void> {
  await redis.del(key);
}

export async function clearCachePatternRedis(pattern: string): Promise<number> {
  const keys = await redis.keys(pattern);
  if (keys.length === 0) return 0;
  return await redis.del(...keys);
}
*/
