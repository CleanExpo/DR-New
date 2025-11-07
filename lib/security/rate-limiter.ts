import { LRUCache } from 'lru-cache';
import { NextRequest } from 'next/server';

/**
 * Advanced Rate Limiting Implementation
 * Protects against DoS attacks and abuse
 */

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests per window
  message?: string; // Error message to send
  statusCode?: number; // HTTP status code for rate limited requests
  headers?: boolean; // Send rate limit headers
  skipSuccessfulRequests?: boolean; // Don't count successful requests
  skipFailedRequests?: boolean; // Don't count failed requests
  keyGenerator?: (req: NextRequest) => string; // Function to generate unique key
  skip?: (req: NextRequest) => boolean; // Function to skip rate limiting
  handler?: (req: NextRequest) => void; // Custom handler for rate limited requests
}

const defaultConfig: Required<Omit<RateLimitConfig, 'keyGenerator' | 'skip' | 'handler'>> = {
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'Too many requests from this IP, please try again later.',
  statusCode: 429,
  headers: true,
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
};

/**
 * Rate limiter store using LRU cache for memory efficiency
 */
class RateLimiterStore {
  private cache: LRUCache<string, { count: number; resetTime: number }>;

  constructor(maxSize = 10000) {
    this.cache = new LRUCache({
      max: maxSize,
      ttl: 60 * 60 * 1000, // 1 hour TTL
    });
  }

  increment(key: string, windowMs: number): { count: number; resetTime: number } {
    const now = Date.now();
    const record = this.cache.get(key);

    if (!record || now > record.resetTime) {
      const newRecord = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.cache.set(key, newRecord);
      return newRecord;
    }

    record.count++;
    this.cache.set(key, record);
    return record;
  }

  get(key: string): { count: number; resetTime: number } | undefined {
    return this.cache.get(key);
  }

  reset(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Global rate limiter stores for different endpoints
const stores = new Map<string, RateLimiterStore>();

/**
 * Get or create a rate limiter store
 */
function getStore(storeName = 'default'): RateLimiterStore {
  if (!stores.has(storeName)) {
    stores.set(storeName, new RateLimiterStore());
  }
  return stores.get(storeName)!;
}

/**
 * Extract client IP from request
 */
export function getClientIp(request: NextRequest): string {
  // Try to get the real IP from various headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  if (cfConnectingIp) {
    return cfConnectingIp;
  }

  // Fallback to request.ip or unknown
  return request.ip || 'unknown';
}

/**
 * Default key generator using IP and path
 */
function defaultKeyGenerator(request: NextRequest): string {
  const ip = getClientIp(request);
  const path = request.nextUrl.pathname;
  return `${ip}:${path}`;
}

/**
 * Rate limiter middleware
 */
export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = {},
  storeName = 'default'
): Promise<{ allowed: boolean; headers?: Record<string, string>; message?: string }> {
  const mergedConfig = { ...defaultConfig, ...config };

  // Check if we should skip this request
  if (config.skip && config.skip(request)) {
    return { allowed: true };
  }

  // Generate unique key for this request
  const keyGenerator = config.keyGenerator || defaultKeyGenerator;
  const key = keyGenerator(request);

  // Get the store and increment the counter
  const store = getStore(storeName);
  const record = store.increment(key, mergedConfig.windowMs);

  // Calculate remaining requests
  const remaining = Math.max(0, mergedConfig.max - record.count);
  const isAllowed = record.count <= mergedConfig.max;

  // Prepare headers if needed
  const headers: Record<string, string> = {};
  if (mergedConfig.headers) {
    headers['X-RateLimit-Limit'] = String(mergedConfig.max);
    headers['X-RateLimit-Remaining'] = String(remaining);
    headers['X-RateLimit-Reset'] = new Date(record.resetTime).toISOString();

    if (!isAllowed) {
      const retryAfter = Math.ceil((record.resetTime - Date.now()) / 1000);
      headers['Retry-After'] = String(retryAfter);
    }
  }

  // Handle rate limited request
  if (!isAllowed) {
    if (config.handler) {
      config.handler(request);
    }

    return {
      allowed: false,
      headers,
      message: mergedConfig.message,
    };
  }

  return {
    allowed: true,
    headers,
  };
}

/**
 * Create a rate limiter for specific endpoints
 */
export function createRateLimiter(config: RateLimitConfig, storeName?: string) {
  return async (request: NextRequest) => {
    return rateLimit(request, config, storeName);
  };
}

/**
 * Rate limiter for API endpoints
 */
export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per minute
  message: 'API rate limit exceeded. Please try again later.',
}, 'api');

/**
 * Strict rate limiter for authentication endpoints
 */
export const authRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many authentication attempts. Please try again later.',
}, 'auth');

/**
 * Rate limiter for form submissions
 */
export const formRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 submissions per minute
  message: 'Too many form submissions. Please wait before trying again.',
}, 'forms');

/**
 * Rate limiter for file uploads
 */
export const uploadRateLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 uploads per hour
  message: 'Upload limit exceeded. Please try again later.',
}, 'uploads');

/**
 * Sliding window rate limiter for more accurate limiting
 */
export class SlidingWindowRateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(
    private windowMs: number,
    private maxRequests: number
  ) {}

  isAllowed(key: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing timestamps for this key
    let timestamps = this.requests.get(key) || [];

    // Remove old timestamps outside the window
    timestamps = timestamps.filter(t => t > windowStart);

    // Check if limit is exceeded
    if (timestamps.length >= this.maxRequests) {
      this.requests.set(key, timestamps);
      return false;
    }

    // Add current timestamp
    timestamps.push(now);
    this.requests.set(key, timestamps);

    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      this.cleanup();
    }

    return true;
  }

  private cleanup(): void {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    for (const [key, timestamps] of this.requests.entries()) {
      const filtered = timestamps.filter(t => t > windowStart);
      if (filtered.length === 0) {
        this.requests.delete(key);
      } else {
        this.requests.set(key, filtered);
      }
    }
  }

  reset(key: string): void {
    this.requests.delete(key);
  }

  clear(): void {
    this.requests.clear();
  }
}

/**
 * Distributed rate limiter interface (for Redis/database backed limiting)
 */
export interface DistributedRateLimiter {
  isAllowed(key: string): Promise<boolean>;
  reset(key: string): Promise<void>;
}

/**
 * Token bucket algorithm for rate limiting
 */
export class TokenBucket {
  private tokens: number;
  private lastRefill: number;

  constructor(
    private capacity: number,
    private refillRate: number, // Tokens per second
    private initialTokens?: number
  ) {
    this.tokens = initialTokens ?? capacity;
    this.lastRefill = Date.now();
  }

  consume(tokens = 1): boolean {
    this.refill();

    if (this.tokens >= tokens) {
      this.tokens -= tokens;
      return true;
    }

    return false;
  }

  private refill(): void {
    const now = Date.now();
    const timePassed = (now - this.lastRefill) / 1000; // Convert to seconds
    const tokensToAdd = timePassed * this.refillRate;

    this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
    this.lastRefill = now;
  }

  getAvailableTokens(): number {
    this.refill();
    return Math.floor(this.tokens);
  }
}