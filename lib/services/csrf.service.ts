/**
 * CSRF (Cross-Site Request Forgery) Protection Service
 * Generates and verifies CSRF tokens to prevent unauthorized form submissions
 *
 * Implementation:
 * - Generate unique CSRF tokens for each session/form
 * - Store tokens in database with expiration
 * - Verify tokens on form submission
 * - Prevent token reuse and replay attacks
 */

import { randomBytes } from 'crypto';
import { prisma } from '@/lib/prisma';

export interface CSRFTokenData {
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

/**
 * Configuration for CSRF protection
 */
export const CSRF_CONFIG = {
  tokenLength: 32, // 32 bytes = 256 bits of entropy
  tokenExpiryMinutes: 60, // Tokens valid for 1 hour
  maxTokensPerUser: 10, // Prevent token exhaustion attacks
};

/**
 * Generate a new CSRF token
 * Returns a cryptographically random token
 */
export function generateCSRFToken(): string {
  return randomBytes(CSRF_CONFIG.tokenLength).toString('hex');
}

/**
 * Create and store a CSRF token for a user
 *
 * @param userId - User ID (from session)
 * @returns Token string and expiration time
 */
export async function createCSRFToken(userId: string): Promise<CSRFTokenData> {
  try {
    const token = generateCSRFToken();
    const now = new Date();
    const expiresAt = new Date(now.getTime() + CSRF_CONFIG.tokenExpiryMinutes * 60 * 1000);

    // Clean up old tokens for this user (keep only recent ones)
    const oldTokens = await prisma.cSRFToken.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: CSRF_CONFIG.maxTokensPerUser - 1,
      select: { id: true },
    });

    if (oldTokens.length > 0) {
      await prisma.cSRFToken.deleteMany({
        where: {
          id: {
            in: oldTokens.map((t) => t.id),
          },
        },
      });
    }

    // Create new token
    const csrfToken = await prisma.cSRFToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });

    return {
      token: csrfToken.token,
      createdAt: csrfToken.createdAt,
      expiresAt: csrfToken.expiresAt,
    };
  } catch (error) {
    console.error('Error creating CSRF token:', error);
    throw new Error('Failed to create CSRF token');
  }
}

/**
 * Verify a CSRF token
 *
 * @param userId - User ID (from session)
 * @param token - Token to verify
 * @returns true if token is valid, false otherwise
 */
export async function verifyCSRFToken(userId: string, token: string): Promise<boolean> {
  try {
    if (!token || typeof token !== 'string' || token.length !== CSRF_CONFIG.tokenLength * 2) {
      return false;
    }

    const now = new Date();

    // Find and verify token
    const csrfToken = await prisma.cSRFToken.findFirst({
      where: {
        userId,
        token,
        expiresAt: {
          gt: now, // Token must not be expired
        },
      },
    });

    if (!csrfToken) {
      return false;
    }

    // Delete token after verification (single-use)
    await prisma.cSRFToken.delete({
      where: { id: csrfToken.id },
    });

    return true;
  } catch (error) {
    console.error('Error verifying CSRF token:', error);
    return false;
  }
}

/**
 * Verify CSRF token from request headers or form data
 * Checks x-csrf-token header first, then form body
 */
export async function verifyCSRFTokenFromRequest(
  userId: string,
  request: Request
): Promise<boolean> {
  try {
    // Try to get token from headers first (for JSON requests)
    let token = request.headers.get('x-csrf-token');

    if (!token) {
      // Try to get from form data (for form submissions)
      const contentType = request.headers.get('content-type');

      if (contentType?.includes('application/x-www-form-urlencoded')) {
        const formData = await request.formData();
        token = formData.get('_csrf') as string;
      } else if (contentType?.includes('application/json')) {
        const body = await request.json();
        token = body._csrf as string;
      }
    }

    if (!token) {
      console.warn('CSRF token not provided in request');
      return false;
    }

    return verifyCSRFToken(userId, token);
  } catch (error) {
    console.error('Error verifying CSRF token from request:', error);
    return false;
  }
}

/**
 * Get a CSRF token for a user (for use in forms/AJAX)
 * Creates a new token if one doesn't exist or if existing is expired
 */
export async function getOrCreateCSRFToken(userId: string): Promise<string> {
  try {
    const now = new Date();

    // Try to find a valid existing token
    const existingToken = await prisma.cSRFToken.findFirst({
      where: {
        userId,
        expiresAt: {
          gt: now,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (existingToken) {
      return existingToken.token;
    }

    // Create a new token
    const tokenData = await createCSRFToken(userId);
    return tokenData.token;
  } catch (error) {
    console.error('Error getting or creating CSRF token:', error);
    throw new Error('Failed to get CSRF token');
  }
}

/**
 * Clean up expired CSRF tokens (run periodically)
 */
export async function cleanupExpiredCSRFTokens(): Promise<number> {
  try {
    const result = await prisma.cSRFToken.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });

    return result.count;
  } catch (error) {
    console.error('Error cleaning up expired CSRF tokens:', error);
    return 0;
  }
}

/**
 * Revoke all CSRF tokens for a user (e.g., on logout)
 */
export async function revokeUserCSRFTokens(userId: string): Promise<number> {
  try {
    const result = await prisma.cSRFToken.deleteMany({
      where: { userId },
    });

    return result.count;
  } catch (error) {
    console.error('Error revoking user CSRF tokens:', error);
    return 0;
  }
}
