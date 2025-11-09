/**
 * API Response Utilities
 * Standardized response formatting and helper functions
 */

import { NextResponse } from 'next/server';
import type { ApiResponse, ApiError, PaginatedResponse } from './types';
import { SECURITY_HEADERS, ERROR_CODES } from './config';

/**
 * Generate unique request ID for tracing
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

/**
 * Success response builder
 */
export function successResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    metadata: {
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  };

  return NextResponse.json(response, {
    status,
    headers: SECURITY_HEADERS,
  });
}

/**
 * Error response builder
 */
export function errorResponse(
  message: string,
  code: string = ERROR_CODES.INTERNAL_SERVER_ERROR,
  status: number = 500,
  details?: any
): NextResponse<ApiResponse> {
  const error: ApiError = {
    code,
    message,
    details,
  };

  const response: ApiResponse = {
    success: false,
    error: message,
    metadata: {
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  };

  return NextResponse.json(response, {
    status,
    headers: SECURITY_HEADERS,
  });
}

/**
 * Validation error response
 */
export function validationErrorResponse(
  errors: Array<{ field: string; message: string }>
): NextResponse<ApiResponse> {
  return errorResponse(
    'Validation failed',
    ERROR_CODES.VALIDATION_ERROR,
    400,
    { validationErrors: errors }
  );
}

/**
 * Rate limit error response
 */
export function rateLimitErrorResponse(
  resetTime: number,
  limit: number
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      metadata: {
        timestamp: new Date().toISOString(),
        version: 'v1',
      },
    },
    {
      status: 429,
      headers: {
        ...SECURITY_HEADERS,
        'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
        'X-RateLimit-Limit': String(limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(resetTime),
      },
    }
  );
}

/**
 * Not found response
 */
export function notFoundResponse(resource: string = 'Resource'): NextResponse<ApiResponse> {
  return errorResponse(
    `${resource} not found`,
    ERROR_CODES.RESOURCE_NOT_FOUND,
    404
  );
}

/**
 * Method not allowed response
 */
export function methodNotAllowedResponse(
  allowedMethods: string[]
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed',
      message: `Allowed methods: ${allowedMethods.join(', ')}`,
      metadata: {
        timestamp: new Date().toISOString(),
        version: 'v1',
      },
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

/**
 * Paginated response builder
 */
export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<PaginatedResponse<T>> {
  const totalPages = Math.ceil(total / limit);

  const response: PaginatedResponse<T> = {
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
    metadata: {
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  };

  return NextResponse.json(response, {
    status: 200,
    headers: SECURITY_HEADERS,
  });
}

/**
 * Created response (201)
 */
export function createdResponse<T>(
  data: T,
  message?: string
): NextResponse<ApiResponse<T>> {
  return successResponse(data, message, 201);
}

/**
 * No content response (204)
 */
export function noContentResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: SECURITY_HEADERS,
  });
}

/**
 * Cached response with headers
 */
export function cachedResponse<T>(
  data: T,
  cacheMaxAge: number,
  message?: string
): NextResponse<ApiResponse<T>> {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    metadata: {
      timestamp: new Date().toISOString(),
      version: 'v1',
    },
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      ...SECURITY_HEADERS,
      'Cache-Control': `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}, stale-while-revalidate`,
      'CDN-Cache-Control': `public, max-age=${cacheMaxAge}`,
      'Vercel-CDN-Cache-Control': `public, max-age=${cacheMaxAge}`,
    },
  });
}

/**
 * Add CORS headers to response
 */
export function withCORS(response: NextResponse, origin?: string): NextResponse {
  const headers = new Headers(response.headers);

  headers.set('Access-Control-Allow-Origin', origin || '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  headers.set('Access-Control-Max-Age', '86400');

  return new NextResponse(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
