import { randomBytes } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * CSRF Protection Implementation
 * Provides double-submit cookie pattern for CSRF protection
 */

const CSRF_TOKEN_NAME = 'csrf-token';
const CSRF_HEADER_NAME = 'X-CSRF-Token';
const TOKEN_LENGTH = 32;

export interface CSRFConfig {
  cookieName?: string;
  headerName?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  httpOnly?: boolean;
  maxAge?: number;
}

const defaultConfig: Required<CSRFConfig> = {
  cookieName: CSRF_TOKEN_NAME,
  headerName: CSRF_HEADER_NAME,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  httpOnly: true,
  maxAge: 3600, // 1 hour
};

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return randomBytes(TOKEN_LENGTH).toString('hex');
}

/**
 * Set CSRF token in cookies
 */
export async function setCSRFToken(config: CSRFConfig = {}): Promise<string> {
  const mergedConfig = { ...defaultConfig, ...config };
  const token = generateCSRFToken();

  const cookieStore = cookies();
  cookieStore.set(mergedConfig.cookieName, token, {
    httpOnly: mergedConfig.httpOnly,
    secure: mergedConfig.secure,
    sameSite: mergedConfig.sameSite,
    maxAge: mergedConfig.maxAge,
    path: '/',
  });

  return token;
}

/**
 * Get CSRF token from cookies
 */
export async function getCSRFToken(config: CSRFConfig = {}): Promise<string | null> {
  const mergedConfig = { ...defaultConfig, ...config };
  const cookieStore = cookies();
  const token = cookieStore.get(mergedConfig.cookieName);
  return token?.value || null;
}

/**
 * Validate CSRF token from request
 */
export async function validateCSRFToken(
  request: NextRequest,
  config: CSRFConfig = {}
): Promise<boolean> {
  const mergedConfig = { ...defaultConfig, ...config };

  // Skip validation for safe methods
  const method = request.method.toUpperCase();
  if (['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    return true;
  }

  // Get token from cookie
  const cookieToken = request.cookies.get(mergedConfig.cookieName)?.value;
  if (!cookieToken) {
    return false;
  }

  // Get token from header or body
  let submittedToken = request.headers.get(mergedConfig.headerName);

  // If not in header, try to get from body (for form submissions)
  if (!submittedToken) {
    try {
      const contentType = request.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const body = await request.clone().json();
        submittedToken = body._csrf || body.csrfToken;
      } else if (contentType.includes('application/x-www-form-urlencoded')) {
        const body = await request.clone().formData();
        submittedToken = body.get('_csrf')?.toString() || body.get('csrfToken')?.toString();
      }
    } catch (error) {
      // Body parsing failed, token not found
      return false;
    }
  }

  if (!submittedToken) {
    return false;
  }

  // Constant time comparison to prevent timing attacks
  return constantTimeCompare(cookieToken, submittedToken);
}

/**
 * Constant time string comparison to prevent timing attacks
 */
function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

/**
 * Middleware helper for CSRF protection
 */
export async function csrfMiddleware(
  request: NextRequest,
  config: CSRFConfig = {}
): Promise<{ valid: boolean; error?: string }> {
  const isValid = await validateCSRFToken(request, config);

  if (!isValid) {
    return {
      valid: false,
      error: 'Invalid or missing CSRF token',
    };
  }

  return { valid: true };
}

/**
 * React hook helper for CSRF token (client-side)
 */
export function getCSRFTokenFromCookie(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(new RegExp(`${CSRF_TOKEN_NAME}=([^;]+)`));
  return match ? match[1] : null;
}