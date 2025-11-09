/**
 * API Middleware
 * Request processing, rate limiting, and security
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRateLimitKey, type RateLimitType } from '@/lib/api/rate-limit';
import { getClientIP, getUserAgent } from '@/lib/api/validation';
import { rateLimitErrorResponse, errorResponse } from '@/lib/api/response';
import { SECURITY_HEADERS, REQUEST_LIMITS, ERROR_CODES } from '@/lib/api/config';

export interface ApiMiddlewareOptions {
  rateLimit?: RateLimitType;
  requireAuth?: boolean;
  allowedMethods?: string[];
  maxBodySize?: number;
}

/**
 * Apply API middleware to request
 */
export async function applyApiMiddleware(
  request: NextRequest,
  options: ApiMiddlewareOptions = {}
): Promise<NextResponse | null> {
  const {
    rateLimit = 'general',
    requireAuth = false,
    allowedMethods = ['GET', 'POST', 'OPTIONS'],
    maxBodySize = 10 * 1024 * 1024, // 10MB
  } = options;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': allowedMethods.join(', '),
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Check allowed methods
  if (!allowedMethods.includes(request.method)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Method not allowed',
        message: `Allowed methods: ${allowedMethods.join(', ')}`,
      },
      {
        status: 405,
        headers: {
          ...SECURITY_HEADERS,
          Allow: allowedMethods.join(', '),
        },
      }
    );
  }

  // Get client IP
  const ip = getClientIP(request.headers);

  // Check rate limit
  const endpoint = new URL(request.url).pathname;
  const rateLimitKey = getRateLimitKey(ip, endpoint);
  const rateLimitResult = checkRateLimit(rateLimitKey, rateLimit);

  if (!rateLimitResult.allowed) {
    return rateLimitErrorResponse(rateLimitResult.reset, rateLimitResult.limit);
  }

  // Check body size for POST requests
  if (request.method === 'POST') {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > maxBodySize) {
      return errorResponse(
        'Request body too large',
        ERROR_CODES.INVALID_REQUEST,
        413
      );
    }
  }

  // Add rate limit headers to response (will be applied by caller)
  const headers = new Headers(SECURITY_HEADERS);
  headers.set('X-RateLimit-Limit', String(rateLimitResult.limit));
  headers.set('X-RateLimit-Remaining', String(rateLimitResult.remaining));
  headers.set('X-RateLimit-Reset', String(rateLimitResult.reset));

  // Store rate limit info in request context (for route handlers)
  (request as any).rateLimit = rateLimitResult;

  // No middleware blocked the request
  return null;
}

/**
 * Request logging middleware
 */
export function logRequest(request: NextRequest): void {
  const ip = getClientIP(request.headers);
  const userAgent = getUserAgent(request.headers);
  const url = new URL(request.url);

  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    method: request.method,
    path: url.pathname,
    query: url.search,
    ip,
    userAgent,
    referer: request.headers.get('referer'),
  }));
}

/**
 * Security headers middleware
 */
export function addSecurityHeaders(response: NextResponse): NextResponse {
  const headers = new Headers(response.headers);

  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/**
 * Compression middleware (for large responses)
 */
export async function compressResponse(
  response: NextResponse
): Promise<NextResponse> {
  // Check if response is JSON and large enough to compress
  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json')) {
    return response;
  }

  // For large responses, add compression hint
  const contentLength = response.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 1024) {
    const headers = new Headers(response.headers);
    headers.set('Vary', 'Accept-Encoding');

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
}

/**
 * Error boundary middleware
 */
export async function withErrorBoundary<T>(
  handler: () => Promise<T>
): Promise<T | NextResponse> {
  try {
    return await handler();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('API Error:', errorMessage);

    return errorResponse(
      'An internal error occurred. Please try again later.',
      ERROR_CODES.INTERNAL_SERVER_ERROR,
      500
    ) as any;
  }
}

/**
 * Compose multiple middleware functions
 */
export function composeMiddleware(
  ...middlewares: Array<(request: NextRequest) => Promise<NextResponse | null>>
) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    for (const middleware of middlewares) {
      const result = await middleware(request);
      if (result !== null) {
        return result;
      }
    }
    return null;
  };
}
