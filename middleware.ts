import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers configuration
const securityHeaders = {
  // XSS Protection
  'X-XSS-Protection': '1; mode=block',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',

  // HTTPS enforcement
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Referrer Policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Permissions Policy (replaces Feature-Policy)
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=()',

  // Cross-Origin policies
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Cross-Origin-Embedder-Policy': 'credentialless',

  // DNS Prefetch Control
  'X-DNS-Prefetch-Control': 'on',

  // Download Options
  'X-Download-Options': 'noopen',

  // Content Security Policy - Comprehensive and strict
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google-analytics.com https://www.googletagmanager.com https://maps.googleapis.com https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com wss: ws:",
    "media-src 'self'",
    "object-src 'none'",
    "frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com https://maps.google.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
    "block-all-mixed-content"
  ].join('; '),

  // Report-To header for security reporting
  'Report-To': JSON.stringify({
    group: 'csp-reports',
    max_age: 86400,
    endpoints: [{ url: '/api/security/csp-report' }]
  }),

  // NEL (Network Error Logging)
  'NEL': JSON.stringify({
    report_to: 'csp-reports',
    max_age: 86400
  })
};

// Rate limiting configuration
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count++;
  return true;
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  // 1. HTTPS Enforcement (redirect HTTP to HTTPS in production)
  if (process.env.NODE_ENV === 'production' &&
      request.headers.get('x-forwarded-proto') !== 'https') {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}${request.nextUrl.search}`,
      301
    );
  }

  // 2. Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // 3. Rate limiting for API routes
  if (pathname.startsWith('/api')) {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
               request.headers.get('x-real-ip') ||
               request.ip ||
               'unknown';

    const identifier = `${ip}:${pathname}`;
    const isAllowed = checkRateLimit(identifier);

    if (!isAllowed) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '100',
          'X-RateLimit-Remaining': '0',
          ...Object.fromEntries(Object.entries(securityHeaders))
        }
      });
    }

    response.headers.set('X-RateLimit-Limit', '100');
    response.headers.set('X-RateLimit-Remaining', String(100 - (rateLimitStore.get(identifier)?.count || 0)));
  }

  // 4. CSRF Token generation for forms
  if (pathname === '/' || pathname.includes('/contact') || pathname.includes('/book-service')) {
    const csrfToken = crypto.randomUUID();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });
  }

  // 5. Add request ID for tracking
  const requestId = crypto.randomUUID();
  response.headers.set('X-Request-Id', requestId);

  // 6. Add timing headers for performance monitoring
  response.headers.set('Server-Timing', `total;dur=${Date.now()}`);

  // 7. Security logging headers
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  // 8. Clean up old rate limit entries periodically
  if (Math.random() < 0.01) { // 1% chance on each request
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};