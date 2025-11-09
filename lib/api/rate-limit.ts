/**
 * Rate Limiting Implementation
 * Token bucket algorithm with in-memory and Redis support
 */

import { RATE_LIMITS } from './config';

// In-memory store for development (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [key, value] of entries) {
    if (now > value.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export type RateLimitType = 'emergency' | 'contact' | 'general' | 'public';

/**
 * Check rate limit for a given key
 */
export function checkRateLimit(
  key: string,
  limitType: RateLimitType = 'general'
): RateLimitResult {
  const config = RATE_LIMITS[limitType];
  const now = Date.now();

  // Get or create record
  let record = rateLimitStore.get(key);

  // Reset if window has passed
  if (!record || now > record.resetTime) {
    record = {
      count: 0,
      resetTime: now + config.windowMs,
    };
    rateLimitStore.set(key, record);
  }

  // Check if limit exceeded
  const allowed = record.count < config.max;

  // Increment counter if allowed
  if (allowed) {
    record.count++;
  }

  return {
    allowed,
    limit: config.max,
    remaining: Math.max(0, config.max - record.count),
    reset: record.resetTime,
  };
}

/**
 * Generate rate limit key from IP and endpoint
 */
export function getRateLimitKey(ip: string, endpoint: string): string {
  return `ratelimit:${ip}:${endpoint}`;
}

/**
 * Reset rate limit for a key (admin use)
 */
export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Get rate limit info without incrementing
 */
export function getRateLimitInfo(
  key: string,
  limitType: RateLimitType = 'general'
): RateLimitResult {
  const config = RATE_LIMITS[limitType];
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    return {
      allowed: true,
      limit: config.max,
      remaining: config.max,
      reset: now + config.windowMs,
    };
  }

  return {
    allowed: record.count < config.max,
    limit: config.max,
    remaining: Math.max(0, config.max - record.count),
    reset: record.resetTime,
  };
}

/**
 * Redis-based rate limiting (for production)
 * Uncomment and configure when Redis is available
 */
/*
import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function checkRateLimitRedis(
  key: string,
  limitType: RateLimitType = 'general'
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[limitType];
  const now = Date.now();
  const windowKey = `${key}:${Math.floor(now / config.windowMs)}`;

  const count = await redis.incr(windowKey);

  if (count === 1) {
    await redis.expire(windowKey, Math.ceil(config.windowMs / 1000));
  }

  const ttl = await redis.ttl(windowKey);
  const resetTime = now + (ttl * 1000);

  return {
    allowed: count <= config.max,
    limit: config.max,
    remaining: Math.max(0, config.max - count),
    reset: resetTime,
  };
}
*/

/**
 * Rate limit middleware helper
 */
export interface RateLimitOptions {
  type?: RateLimitType;
  keyPrefix?: string;
  skip?: (ip: string) => boolean;
}

export function createRateLimiter(options: RateLimitOptions = {}) {
  const { type = 'general', keyPrefix = '', skip } = options;

  return (ip: string, endpoint: string): RateLimitResult => {
    // Allow skipping rate limit for specific IPs (e.g., internal services)
    if (skip && skip(ip)) {
      return {
        allowed: true,
        limit: Infinity,
        remaining: Infinity,
        reset: Date.now(),
      };
    }

    const key = getRateLimitKey(ip, `${keyPrefix}${endpoint}`);
    return checkRateLimit(key, type);
  };
}

/**
 * Sliding window rate limiter (more accurate)
 */
export function checkSlidingWindowRateLimit(
  key: string,
  limitType: RateLimitType = 'general'
): RateLimitResult {
  const config = RATE_LIMITS[limitType];
  const now = Date.now();
  const windowKey = `${key}:requests`;

  // Get existing timestamps
  const existingRecord = rateLimitStore.get(windowKey) as { timestamps: number[] } | undefined;
  const timestamps = existingRecord?.timestamps || [];

  // Remove timestamps outside the window
  const validTimestamps = timestamps.filter(ts => now - ts < config.windowMs);

  // Check if limit exceeded
  const allowed = validTimestamps.length < config.max;

  // Add current timestamp if allowed
  if (allowed) {
    validTimestamps.push(now);
  }

  // Update store with proper type
  const record = {
    count: validTimestamps.length,
    resetTime: now + config.windowMs,
    timestamps: validTimestamps
  };
  (rateLimitStore as any).set(windowKey, record);

  return {
    allowed,
    limit: config.max,
    remaining: Math.max(0, config.max - validTimestamps.length),
    reset: now + config.windowMs,
  };
}
