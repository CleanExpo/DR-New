// @ts-nocheck
/**
 * CORS Configuration for Production
 *
 * Whitelist of allowed origins for cross-origin API requests
 * Protects against unauthorized access to public APIs
 */

export interface CORSConfig {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  credentials: boolean;
  maxAge: number;
}

/**
 * Get allowed origins based on environment
 */
function getAllowedOrigins(): string[] {
  const env = process.env.NODE_ENV;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  // Production origins (must be configured via environment variables)
  const productionOrigins = process.env.CORS_ALLOWED_ORIGINS
    ? process.env.CORS_ALLOWED_ORIGINS.split(',').map((origin) => origin.trim())
    : [];

  // Development origins
  const devOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
  ];

  // Add staging origins if applicable
  const stagingOrigins = process.env.STAGING_URL ? [process.env.STAGING_URL] : [];

  if (env === 'production') {
    // Production: only use explicitly configured origins
    return [...productionOrigins, baseUrl].filter(Boolean);
  }

  if (env === 'staging') {
    // Staging: production origins + staging
    return [...productionOrigins, ...stagingOrigins, baseUrl].filter(Boolean);
  }

  // Development: allow local origins
  return [...devOrigins, baseUrl, ...productionOrigins].filter(Boolean);
}

/**
 * Main CORS configuration
 */
export const corsConfig: CORSConfig = {
  // Whitelist specific origins (no wildcards in production)
  allowedOrigins: getAllowedOrigins(),

  // Allow only necessary HTTP methods
  allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

  // Allow necessary headers for API requests
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Accept-Language',
    'Content-Language',
    'Last-Event-ID',
  ],

  // Headers that client can access from response
  exposedHeaders: [
    'Content-Length',
    'X-RateLimit-Limit',
    'X-RateLimit-Remaining',
    'X-RateLimit-Reset',
    'Retry-After',
  ],

  // Allow credentials (cookies, auth headers)
  credentials: true,

  // Cache preflight requests for 24 hours
  maxAge: 86400,
};

/**
 * Check if origin is allowed
 */
export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) {
    // Allow non-origin requests (same-origin, curl, Postman, etc.)
    return true;
  }

  return corsConfig.allowedOrigins.some((allowedOrigin) => {
    // Exact match
    if (allowedOrigin === origin) return true;

    // Pattern match for wildcard origins (e.g., *.example.com)
    if (allowedOrigin.startsWith('*.')) {
      const pattern = new RegExp(
        `^([a-z0-9]+\\.)*${allowedOrigin.slice(2).replace(/\./g, '\\.')}`
      );
      return pattern.test(origin);
    }

    return false;
  });
}

/**
 * Get CORS headers for response
 */
export function getCORSHeaders(
  origin: string | undefined
): Record<string, string> {
  const headers: Record<string, string> = {};

  if (isOriginAllowed(origin)) {
    headers['Access-Control-Allow-Origin'] = origin || corsConfig.allowedOrigins[0];
    headers['Access-Control-Allow-Credentials'] = corsConfig.credentials
      ? 'true'
      : 'false';
    headers['Access-Control-Allow-Methods'] = corsConfig.allowedMethods.join(', ');
    headers['Access-Control-Allow-Headers'] = corsConfig.allowedHeaders.join(', ');
    headers['Access-Control-Expose-Headers'] = corsConfig.exposedHeaders.join(', ');
    headers['Access-Control-Max-Age'] = corsConfig.maxAge.toString();
  }

  return headers;
}

/**
 * Handle CORS preflight requests (OPTIONS)
 */
export function handleCORSPreflight(
  origin: string | undefined
): Record<string, string> {
  return getCORSHeaders(origin);
}

/**
 * Log CORS violations for monitoring
 */
export function logCORSViolation(origin: string | undefined, path: string): void {
  console.warn(
    `[CORS VIOLATION] Rejected request from origin: ${origin || 'unknown'} for path: ${path}`
  );
}
