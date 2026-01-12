/**
 * CSRF Middleware Helper
 * Use this in API routes to protect POST/PUT/DELETE requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { verifyCSRFTokenFromRequest } from '@/lib/services/csrf.service';

/**
 * CSRF protection middleware for API routes
 * Use this to protect POST/PUT/DELETE endpoints
 *
 * @example
 * ```ts
 * export async function POST(request: NextRequest) {
 *   // Check CSRF token
 *   const csrfError = await requireCSRFProtection(request);
 *   if (csrfError) return csrfError;
 *
 *   // Continue with handler...
 * }
 * ```
 */
export async function requireCSRFProtection(
  request: NextRequest
): Promise<NextResponse | null> {
  // Get user session
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Verify CSRF token
  const isValid = await verifyCSRFTokenFromRequest(session.user.id, request);

  if (!isValid) {
    console.warn(
      `CSRF token verification failed for user ${session.user.id} on ${request.method} ${request.url}`
    );

    return NextResponse.json(
      { error: 'CSRF token validation failed' },
      { status: 403 }
    );
  }

  // CSRF token is valid, continue processing
  return null;
}

/**
 * Check if request method requires CSRF protection
 */
export function requiresCSRFProtection(method: string): boolean {
  // Only protect state-changing methods
  return ['POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase());
}

/**
 * Middleware wrapper for protecting entire route
 */
export async function withCSRFProtection(
  request: NextRequest,
  handler: (request: NextRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  // Check if method requires CSRF protection
  if (requiresCSRFProtection(request.method)) {
    const csrfError = await requireCSRFProtection(request);
    if (csrfError) return csrfError;
  }

  // Call handler
  return handler(request);
}
