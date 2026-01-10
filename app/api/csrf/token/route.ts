/**
 * CSRF Token Endpoint
 *
 * GET /api/csrf/token
 * Generate and return a new CSRF token for the client
 *
 * Returns:
 * ```json
 * {
 *   "token": "random32bytes.hmacsha256signature"
 * }
 * ```
 *
 * Usage:
 * 1. Frontend calls GET /api/csrf/token
 * 2. Receives token in response
 * 3. Includes token in form submission:
 *    - Hidden input: <input type="hidden" name="csrfToken" value="..." />
 *    - Header: X-CSRF-Token: ...
 * 4. Backend validates token before processing request
 */

import { NextRequest, NextResponse } from 'next/server';
import { csrfProtection } from '@/lib/security/csrf';
import { logInfo, logError } from '@/lib/logger/helpers';

/**
 * GET /api/csrf/token
 * Generate new CSRF token
 */
export async function GET(request: NextRequest) {
  try {
    // Generate new token
    const token = csrfProtection.generateToken();

    logInfo('CSRF token generated', {
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    // Return token with secure headers
    return NextResponse.json(
      { token },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    logError(error, { context: 'csrf_token_generation' });

    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/csrf/token
 * Verify CSRF token (used by forms to validate before submission)
 *
 * Request:
 * ```json
 * {
 *   "token": "random32bytes.hmacsha256signature"
 * }
 * ```
 *
 * Response on valid token:
 * ```json
 * {
 *   "valid": true,
 *   "message": "Token is valid"
 * }
 * ```
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token not provided', valid: false },
        { status: 400 }
      );
    }

    // Verify token
    const isValid = csrfProtection.verifyToken(token);

    if (!isValid) {
      logInfo('CSRF token verification failed', {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
      });

      return NextResponse.json(
        { error: 'Invalid or expired token', valid: false },
        { status: 403 }
      );
    }

    logInfo('CSRF token verified successfully', {
      ip: request.headers.get('x-forwarded-for') || 'unknown',
    });

    return NextResponse.json({
      valid: true,
      message: 'Token is valid',
    });
  } catch (error) {
    logError(error, { context: 'csrf_token_verification' });

    return NextResponse.json(
      { error: 'Token verification failed', valid: false },
      { status: 500 }
    );
  }
}
