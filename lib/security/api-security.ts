import { NextRequest, NextResponse } from 'next/server';
import { validateFormData, ValidationRule } from './input-validation';
import { validateCSRFToken } from './csrf';
import { rateLimit } from './rate-limiter';
import { securityLogger, SecurityEventType, SecuritySeverity } from './security-logger';
import { getClientIp } from './rate-limiter';

/**
 * API Security Handler
 * Comprehensive security for API routes
 */

export interface APISecurityConfig {
  requireAuth?: boolean;
  requireCSRF?: boolean;
  rateLimit?: {
    windowMs: number;
    max: number;
  };
  validation?: Record<string, ValidationRule>;
  allowedMethods?: string[];
  allowedOrigins?: string[];
  requireAPIKey?: boolean;
  logAccess?: boolean;
}

export interface SecureAPIRequest extends NextRequest {
  validatedData?: Record<string, any>;
  userId?: string;
  clientIp: string;
}

/**
 * Secure API handler wrapper
 */
export function secureAPI(
  handler: (req: SecureAPIRequest) => Promise<NextResponse>,
  config: APISecurityConfig = {}
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const clientIp = getClientIp(request);
    const secureRequest = request as SecureAPIRequest;
    secureRequest.clientIp = clientIp;

    try {
      // 1. Check allowed HTTP methods
      if (config.allowedMethods) {
        if (!config.allowedMethods.includes(request.method)) {
          securityLogger.log({
            type: SecurityEventType.UNAUTHORIZED_ACCESS_ATTEMPT,
            severity: SecuritySeverity.MEDIUM,
            ipAddress: clientIp,
            resource: request.nextUrl.pathname,
            details: { method: request.method, allowedMethods: config.allowedMethods },
            success: false,
          });

          return NextResponse.json(
            { error: 'Method not allowed' },
            { status: 405 }
          );
        }
      }

      // 2. Check CORS
      if (config.allowedOrigins) {
        const origin = request.headers.get('origin');
        if (origin && !config.allowedOrigins.includes(origin)) {
          securityLogger.log({
            type: SecurityEventType.UNAUTHORIZED_ACCESS_ATTEMPT,
            severity: SecuritySeverity.MEDIUM,
            ipAddress: clientIp,
            resource: request.nextUrl.pathname,
            details: { origin, allowedOrigins: config.allowedOrigins },
            success: false,
          });

          return NextResponse.json(
            { error: 'Origin not allowed' },
            { status: 403 }
          );
        }
      }

      // 3. Rate limiting
      if (config.rateLimit) {
        const rateLimitResult = await rateLimit(request, config.rateLimit);
        if (!rateLimitResult.allowed) {
          securityLogger.log({
            type: SecurityEventType.RATE_LIMIT_EXCEEDED,
            severity: SecuritySeverity.MEDIUM,
            ipAddress: clientIp,
            resource: request.nextUrl.pathname,
            success: false,
          });

          return NextResponse.json(
            { error: rateLimitResult.message || 'Rate limit exceeded' },
            {
              status: 429,
              headers: rateLimitResult.headers,
            }
          );
        }
      }

      // 4. API Key validation
      if (config.requireAPIKey) {
        const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
        if (!apiKey || !await validateAPIKey(apiKey)) {
          securityLogger.log({
            type: SecurityEventType.INVALID_API_KEY,
            severity: SecuritySeverity.HIGH,
            ipAddress: clientIp,
            resource: request.nextUrl.pathname,
            success: false,
          });

          return NextResponse.json(
            { error: 'Invalid or missing API key' },
            { status: 401 }
          );
        }
      }

      // 5. CSRF validation
      if (config.requireCSRF) {
        const isValid = await validateCSRFToken(request);
        if (!isValid) {
          securityLogger.log({
            type: SecurityEventType.CSRF_VIOLATION,
            severity: SecuritySeverity.HIGH,
            ipAddress: clientIp,
            resource: request.nextUrl.pathname,
            success: false,
          });

          return NextResponse.json(
            { error: 'Invalid CSRF token' },
            { status: 403 }
          );
        }
      }

      // 6. Input validation
      if (config.validation) {
        let data: Record<string, any> = {};

        try {
          const contentType = request.headers.get('content-type') || '';

          if (contentType.includes('application/json')) {
            data = await request.clone().json();
          } else if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await request.clone().formData();
            data = Object.fromEntries(formData.entries());
          }

          const validationResult = validateFormData(data, config.validation);

          if (!validationResult.valid) {
            securityLogger.log({
              type: SecurityEventType.SUSPICIOUS_ACTIVITY,
              severity: SecuritySeverity.MEDIUM,
              ipAddress: clientIp,
              resource: request.nextUrl.pathname,
              details: { errors: validationResult.errors },
              success: false,
            });

            return NextResponse.json(
              { error: 'Validation failed', errors: validationResult.errors },
              { status: 400 }
            );
          }

          secureRequest.validatedData = validationResult.sanitized;
        } catch (error) {
          return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
          );
        }
      }

      // 7. Log access if configured
      if (config.logAccess) {
        securityLogger.log({
          type: SecurityEventType.SENSITIVE_DATA_ACCESS,
          severity: SecuritySeverity.LOW,
          userId: secureRequest.userId,
          ipAddress: clientIp,
          resource: request.nextUrl.pathname,
          action: request.method,
          success: true,
        });
      }

      // 8. Call the actual handler
      const response = await handler(secureRequest);

      // 9. Add security headers to response
      addSecurityHeaders(response);

      return response;

    } catch (error) {
      // Log the error securely (without sensitive data)
      securityLogger.log({
        type: SecurityEventType.SUSPICIOUS_ACTIVITY,
        severity: SecuritySeverity.HIGH,
        ipAddress: clientIp,
        resource: request.nextUrl.pathname,
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      });

      // Return generic error message (don't leak implementation details)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

/**
 * Add security headers to response
 */
function addSecurityHeaders(response: NextResponse): void {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
}

/**
 * Validate API key
 */
async function validateAPIKey(apiKey: string): Promise<boolean> {
  // TODO: Implement actual API key validation against database
  // This is a placeholder implementation

  // Check format
  if (!apiKey.startsWith('dr_')) {
    return false;
  }

  // In production, you would:
  // 1. Hash the API key
  // 2. Look it up in the database
  // 3. Check if it's active and not expired
  // 4. Check rate limits for this API key

  // For now, we'll check against environment variable
  const validKeys = process.env.API_KEYS?.split(',') || [];
  return validKeys.includes(apiKey);
}

/**
 * Extract and validate JWT token
 */
export async function validateJWT(token: string): Promise<{ valid: boolean; payload?: any }> {
  // TODO: Implement JWT validation
  // This should use a library like 'jose' or 'jsonwebtoken'

  try {
    // Placeholder - in production, properly validate JWT
    // 1. Verify signature
    // 2. Check expiration
    // 3. Validate issuer
    // 4. Check not before claim

    return { valid: false };
  } catch (error) {
    return { valid: false };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  // Check for session cookie or JWT token
  const sessionToken = request.cookies.get('session')?.value;
  const authHeader = request.headers.get('authorization');

  if (sessionToken) {
    // Validate session token
    // TODO: Implement session validation
    return false;
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const result = await validateJWT(token);
    return result.valid;
  }

  return false;
}

/**
 * Get user ID from request
 */
export async function getUserId(request: NextRequest): Promise<string | null> {
  // TODO: Implement user ID extraction from session/JWT
  return null;
}

/**
 * Check user permissions
 */
export async function hasPermission(
  request: NextRequest,
  permission: string
): Promise<boolean> {
  // TODO: Implement permission checking
  return false;
}

/**
 * Validate webhook signature
 */
export function validateWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  // TODO: Implement webhook signature validation
  // Typically uses HMAC-SHA256
  const crypto = require('crypto');
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return signature === expectedSignature;
}

/**
 * Sanitize API error messages
 */
export function sanitizeErrorMessage(error: Error): string {
  // Don't leak sensitive information in error messages
  const safeMessages: Record<string, string> = {
    'ECONNREFUSED': 'Service temporarily unavailable',
    'ETIMEDOUT': 'Request timeout',
    'ENOTFOUND': 'Resource not found',
  };

  // Check if error code matches known safe messages
  if ('code' in error && typeof error.code === 'string') {
    return safeMessages[error.code] || 'An error occurred';
  }

  // For production, return generic message
  if (process.env.NODE_ENV === 'production') {
    return 'An error occurred';
  }

  // In development, return actual message
  return error.message;
}

/**
 * Create secure API response
 */
export function createSecureResponse(
  data: any,
  status = 200
): NextResponse {
  const response = NextResponse.json(data, { status });
  addSecurityHeaders(response);
  return response;
}

/**
 * Create error response
 */
export function createErrorResponse(
  error: string | Error,
  status = 500
): NextResponse {
  const message = typeof error === 'string'
    ? error
    : sanitizeErrorMessage(error);

  return createSecureResponse({ error: message }, status);
}