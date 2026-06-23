/**
 * CSRF Protection System
 *
 * Implements Cross-Site Request Forgery protection using:
 * - Double Submit Cookie pattern
 * - Token rotation on use
 * - Timing-safe comparison
 * - Configurable exclusions
 *
 * Usage:
 * ```ts
 * import { csrfProtection } from '@/lib/security/csrf';
 *
 * // In middleware or API route
 * const csrfToken = csrfProtection.generateToken();
 * const isValid = csrfProtection.verifyToken(token);
 * ```
 */

import { createHmac, randomBytes } from 'crypto';
import { logError, logWarn } from '@/lib/logger/helpers';

interface CSRFToken {
  value: string;
  createdAt: Date;
  expiresAt: Date;
}

interface CSRFConfig {
  secret: string;
  tokenExpiryHours: number;
  excludeRoutes: string[];
  methods: string[]; // Methods requiring CSRF protection
}

class CSRFProtection {
  private config: CSRFConfig;
  private tokenCache = new Map<string, CSRFToken>();
  private lastCleanup = Date.now();
  private cleanupInterval = 60 * 60 * 1000; // 1 hour

  constructor() {
    const secret = process.env.CSRF_SECRET || process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('CSRF_SECRET or JWT_SECRET environment variable must be set');
    }

    if (secret.length < 32) {
      logWarn('CSRF_SECRET is less than 32 characters', {
        length: secret.length,
      });
    }

    this.config = {
      secret,
      tokenExpiryHours: 24,
      excludeRoutes: [
        '/api/auth/signin',
        '/api/auth/callback',
        '/api/auth/signup',
        '/api/health',
        '/api/metrics',
        '/socket.io',
      ],
      methods: ['POST', 'PUT', 'DELETE', 'PATCH'],
    };
  }

  /**
   * Generate a new CSRF token
   */
  generateToken(): string {
    try {
      // Generate random token value
      const randomToken = randomBytes(32).toString('hex');

      // Create HMAC signature
      const signature = createHmac('sha256', this.config.secret)
        .update(randomToken)
        .digest('hex');

      // Combine token and signature
      const token = `${randomToken}.${signature}`;

      // Cache token with expiry
      const now = new Date();
      const expiresAt = new Date(now.getTime() + this.config.tokenExpiryHours * 60 * 60 * 1000);

      this.tokenCache.set(token, {
        value: token,
        createdAt: now,
        expiresAt,
      });

      // Cleanup expired tokens periodically
      this.cleanupExpiredTokens();

      return token;
    } catch (error) {
      logError(error, { context: 'csrf_token_generation' });
      throw new Error('Failed to generate CSRF token');
    }
  }

  /**
   * Verify a CSRF token
   */
  verifyToken(token: string): boolean {
    try {
      if (!token || typeof token !== 'string') {
        logWarn('Invalid CSRF token format', { hasToken: !!token });
        return false;
      }

      // Split token and signature
      const parts = token.split('.');
      if (parts.length !== 2) {
        logWarn('Invalid CSRF token structure', { parts: parts.length });
        return false;
      }

      const [randomToken, providedSignature] = parts;

      // Check if token exists in cache and is not expired
      const cachedToken = this.tokenCache.get(token);
      if (!cachedToken) {
        logWarn('CSRF token not found in cache or expired');
        return false;
      }

      const now = new Date();
      if (now > cachedToken.expiresAt) {
        logWarn('CSRF token expired');
        this.tokenCache.delete(token);
        return false;
      }

      // Recalculate signature
      const expectedSignature = createHmac('sha256', this.config.secret)
        .update(randomToken)
        .digest('hex');

      // Timing-safe comparison
      const isValid = this.timingSafeCompare(providedSignature, expectedSignature);

      if (!isValid) {
        logWarn('CSRF token signature mismatch');
        return false;
      }

      // Token is valid, remove it to prevent reuse (one-time use)
      this.tokenCache.delete(token);

      return true;
    } catch (error) {
      logError(error, { context: 'csrf_token_verification' });
      return false;
    }
  }

  /**
   * Timing-safe string comparison
   * Prevents timing attacks that could reveal token validity
   */
  private timingSafeCompare(provided: string, expected: string): boolean {
    // Use Node.js crypto.timingSafeEqual if available
    try {
      const crypto = require('crypto');
      if (crypto.timingSafeEqual) {
        try {
          crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
          return true;
        } catch {
          return false;
        }
      }
    } catch {
      // Fallback to manual timing-safe comparison
    }

    // Manual timing-safe comparison
    if (provided.length !== expected.length) {
      return false;
    }

    let result = 0;
    for (let i = 0; i < provided.length; i++) {
      result |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
    }

    return result === 0;
  }

  /**
   * Clean up expired tokens from cache
   */
  private cleanupExpiredTokens(): void {
    const now = Date.now();

    // Only cleanup if interval has passed
    if (now - this.lastCleanup < this.cleanupInterval) {
      return;
    }

    const currentTime = new Date();
    let expiredCount = 0;

    for (const [token, tokenData] of this.tokenCache.entries()) {
      if (currentTime > tokenData.expiresAt) {
        this.tokenCache.delete(token);
        expiredCount++;
      }
    }

    this.lastCleanup = now;

    if (expiredCount > 0) {
      logWarn('CSRF tokens cleaned up', {
        removed: expiredCount,
        remaining: this.tokenCache.size,
      });
    }
  }

  /**
   * Check if route should be protected
   */
  shouldProtect(method: string, pathname: string): boolean {
    // Only protect certain HTTP methods
    if (!this.config.methods.includes(method.toUpperCase())) {
      return false;
    }

    // Check if route is excluded
    for (const excludeRoute of this.config.excludeRoutes) {
      if (pathname.startsWith(excludeRoute)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get CSRF configuration
   */
  getConfig(): CSRFConfig {
    return { ...this.config };
  }

  /**
   * Get token cache statistics
   */
  getStats(): {
    cachedTokens: number;
    oldestToken: Date | null;
    newestToken: Date | null;
  } {
    let oldestToken: Date | null = null;
    let newestToken: Date | null = null;

    for (const tokenData of this.tokenCache.values()) {
      if (!oldestToken || tokenData.createdAt < oldestToken) {
        oldestToken = tokenData.createdAt;
      }
      if (!newestToken || tokenData.createdAt > newestToken) {
        newestToken = tokenData.createdAt;
      }
    }

    return {
      cachedTokens: this.tokenCache.size,
      oldestToken,
      newestToken,
    };
  }

  /**
   * Clear all cached tokens (for testing or emergency)
   */
  clearCache(): void {
    this.tokenCache.clear();
  }
}

/**
 * Export singleton instance.
 *
 * Instantiation is deferred behind a lazy proxy so that importing this module
 * does not read CSRF_SECRET/JWT_SECRET at module-load time. Next.js imports
 * route modules while "collecting page data" during the build, where those
 * secrets are intentionally absent — eager construction would throw and fail
 * the build. The real instance is created on first property access at request
 * time, when the secrets are present.
 */
let csrfProtectionInstance: CSRFProtection | null = null;

function getCsrfProtection(): CSRFProtection {
  if (!csrfProtectionInstance) {
    csrfProtectionInstance = new CSRFProtection();
  }
  return csrfProtectionInstance;
}

export const csrfProtection = new Proxy({} as CSRFProtection, {
  get(_target, prop, receiver) {
    const instance = getCsrfProtection();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

/**
 * Export class for testing
 */
export { CSRFProtection };

export function generateCsrfToken(secret?: string): string {
  return csrfProtection.generateToken();
}

export function verifyCsrfToken(token: string): boolean {
  return csrfProtection.verifyToken(token);
}
