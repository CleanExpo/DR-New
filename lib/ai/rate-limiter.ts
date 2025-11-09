/**
 * Rate Limiter for AI API calls
 * Prevents cost explosion from excessive API usage
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

interface RateLimitStore {
  minute: Map<string, RateLimitEntry>;
  hour: Map<string, RateLimitEntry>;
  day: Map<string, RateLimitEntry>;
}

class RateLimiter {
  private store: RateLimitStore = {
    minute: new Map(),
    hour: new Map(),
    day: new Map(),
  };

  private limits = {
    minute: 20,
    hour: 500,
    day: 5000,
  };

  /**
   * Check if request should be allowed
   */
  async checkLimit(
    identifier: string,
    options?: {
      minuteLimit?: number;
      hourLimit?: number;
      dayLimit?: number;
    }
  ): Promise<{ allowed: boolean; reason?: string; retryAfter?: number }> {
    const now = Date.now();

    // Apply custom limits if provided
    const limits = {
      minute: options?.minuteLimit || this.limits.minute,
      hour: options?.hourLimit || this.limits.hour,
      day: options?.dayLimit || this.limits.day,
    };

    // Check minute limit
    const minuteKey = `${identifier}:${Math.floor(now / 60000)}`;
    const minuteEntry = this.store.minute.get(minuteKey) || {
      count: 0,
      resetTime: Math.floor(now / 60000) * 60000 + 60000,
    };

    if (minuteEntry.count >= limits.minute) {
      return {
        allowed: false,
        reason: 'Rate limit exceeded (per minute)',
        retryAfter: Math.ceil((minuteEntry.resetTime - now) / 1000),
      };
    }

    // Check hour limit
    const hourKey = `${identifier}:${Math.floor(now / 3600000)}`;
    const hourEntry = this.store.hour.get(hourKey) || {
      count: 0,
      resetTime: Math.floor(now / 3600000) * 3600000 + 3600000,
    };

    if (hourEntry.count >= limits.hour) {
      return {
        allowed: false,
        reason: 'Rate limit exceeded (per hour)',
        retryAfter: Math.ceil((hourEntry.resetTime - now) / 1000),
      };
    }

    // Check day limit
    const dayKey = `${identifier}:${Math.floor(now / 86400000)}`;
    const dayEntry = this.store.day.get(dayKey) || {
      count: 0,
      resetTime: Math.floor(now / 86400000) * 86400000 + 86400000,
    };

    if (dayEntry.count >= limits.day) {
      return {
        allowed: false,
        reason: 'Rate limit exceeded (per day)',
        retryAfter: Math.ceil((dayEntry.resetTime - now) / 1000),
      };
    }

    // Increment counters
    this.store.minute.set(minuteKey, {
      ...minuteEntry,
      count: minuteEntry.count + 1,
    });

    this.store.hour.set(hourKey, {
      ...hourEntry,
      count: hourEntry.count + 1,
    });

    this.store.day.set(dayKey, {
      ...dayEntry,
      count: dayEntry.count + 1,
    });

    // Clean up old entries
    this.cleanup(now);

    return { allowed: true };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(now: number): void {
    // Clean minute entries older than 2 minutes
    for (const [key, entry] of this.store.minute.entries()) {
      if (entry.resetTime < now - 120000) {
        this.store.minute.delete(key);
      }
    }

    // Clean hour entries older than 2 hours
    for (const [key, entry] of this.store.hour.entries()) {
      if (entry.resetTime < now - 7200000) {
        this.store.hour.delete(key);
      }
    }

    // Clean day entries older than 2 days
    for (const [key, entry] of this.store.day.entries()) {
      if (entry.resetTime < now - 172800000) {
        this.store.day.delete(key);
      }
    }
  }

  /**
   * Get current usage statistics
   */
  getUsage(identifier: string): {
    minute: { count: number; limit: number; resetTime: number };
    hour: { count: number; limit: number; resetTime: number };
    day: { count: number; limit: number; resetTime: number };
  } {
    const now = Date.now();

    const minuteKey = `${identifier}:${Math.floor(now / 60000)}`;
    const minuteEntry = this.store.minute.get(minuteKey) || {
      count: 0,
      resetTime: Math.floor(now / 60000) * 60000 + 60000,
    };

    const hourKey = `${identifier}:${Math.floor(now / 3600000)}`;
    const hourEntry = this.store.hour.get(hourKey) || {
      count: 0,
      resetTime: Math.floor(now / 3600000) * 3600000 + 3600000,
    };

    const dayKey = `${identifier}:${Math.floor(now / 86400000)}`;
    const dayEntry = this.store.day.get(dayKey) || {
      count: 0,
      resetTime: Math.floor(now / 86400000) * 86400000 + 86400000,
    };

    return {
      minute: {
        count: minuteEntry.count,
        limit: this.limits.minute,
        resetTime: minuteEntry.resetTime,
      },
      hour: {
        count: hourEntry.count,
        limit: this.limits.hour,
        resetTime: hourEntry.resetTime,
      },
      day: {
        count: dayEntry.count,
        limit: this.limits.day,
        resetTime: dayEntry.resetTime,
      },
    };
  }

  /**
   * Reset limits for identifier
   */
  reset(identifier: string): void {
    const now = Date.now();

    const minuteKey = `${identifier}:${Math.floor(now / 60000)}`;
    const hourKey = `${identifier}:${Math.floor(now / 3600000)}`;
    const dayKey = `${identifier}:${Math.floor(now / 86400000)}`;

    this.store.minute.delete(minuteKey);
    this.store.hour.delete(hourKey);
    this.store.day.delete(dayKey);
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Rate limit decorator for API functions
 */
export function withRateLimit<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  identifier: (args: Parameters<T>) => string,
  options?: {
    minuteLimit?: number;
    hourLimit?: number;
    dayLimit?: number;
  }
): T {
  return (async (...args: Parameters<T>) => {
    const id = identifier(args);
    const result = await rateLimiter.checkLimit(id, options);

    if (!result.allowed) {
      throw new Error(
        `${result.reason}. Retry after ${result.retryAfter} seconds.`
      );
    }

    return fn(...args);
  }) as T;
}
