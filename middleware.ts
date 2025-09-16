import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Security headers configuration
const securityHeaders = {
  // HTTPS enforcement
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Content Security Policy - Strict but functional
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' ws://localhost:* wss://localhost:* https://www.google-analytics.com https://analytics.google.com",
    "media-src 'self' https://www.w3schools.com",
    "object-src 'none'",
    "child-src 'self'",
    "frame-src 'self'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests"
  ].join('; '),

  // Permissions Policy (formerly Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
    // 'ambient-light-sensor=()', // Not supported
    'autoplay=()',
    'encrypted-media=()',
    'picture-in-picture=()',
    'fullscreen=(self)',
    'sync-xhr=()'
  ].join(', '),

  // Additional security headers
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'X-DNS-Prefetch-Control': 'on',
  'X-Permitted-Cross-Domain-Policies': 'none',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Cross-Origin-Embedder-Policy': 'require-corp',
};

// Rate limiting configuration
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute per IP
const EMERGENCY_ENDPOINTS = ['/api/emergency', '/api/contact'];
const EMERGENCY_MAX_REQUESTS = 10; // Stricter limit for form submissions

// IP extraction helper
function getClientIp(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  const xri = request.headers.get('x-real-ip');
  const cfIp = request.headers.get('cf-connecting-ip');

  if (xff) {
    return xff.split(',')[0].trim();
  }
  if (xri) {
    return xri;
  }
  if (cfIp) {
    return cfIp;
  }

  return 'unknown';
}

// Rate limiting function
function checkRateLimit(ip: string, path: string): boolean {
  const now = Date.now();
  const key = `${ip}:${path}`;
  const limit = EMERGENCY_ENDPOINTS.some(endpoint => path.startsWith(endpoint))
    ? EMERGENCY_MAX_REQUESTS
    : MAX_REQUESTS;

  // Clean up old entries
  for (const [k, v] of rateLimitMap.entries()) {
    if (v.resetTime < now) {
      rateLimitMap.delete(k);
    }
  }

  const current = rateLimitMap.get(key);

  if (!current) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (current.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}

// CSRF token validation (for API routes)
function validateCsrfToken(request: NextRequest): boolean {
  // Skip CSRF for GET requests
  if (request.method === 'GET' || request.method === 'HEAD') {
    return true;
  }

  // Skip CSRF validation in development
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const token = request.headers.get('x-csrf-token');
  const cookie = request.cookies.get('csrf-token');

  if (!token || !cookie || token !== cookie.value) {
    return false;
  }

  return true;
}

// Security logging
function logSecurityEvent(type: string, details: any) {
  const event = {
    timestamp: new Date().toISOString(),
    type,
    details,
  };

  // In production, send to logging service
  console.log('[SECURITY]', JSON.stringify(event));
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const clientIp = getClientIp(request);
  const path = request.nextUrl.pathname;

  // Apply security headers to all responses
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Check rate limiting
  if (!checkRateLimit(clientIp, path)) {
    logSecurityEvent('RATE_LIMIT_EXCEEDED', {
      ip: clientIp,
      path,
      method: request.method
    });

    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'X-RateLimit-Limit': String(MAX_REQUESTS),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(Date.now() + RATE_LIMIT_WINDOW),
      },
    });
  }

  // CSRF validation for API routes
  if (path.startsWith('/api/')) {
    if (!validateCsrfToken(request)) {
      logSecurityEvent('CSRF_VALIDATION_FAILED', {
        ip: clientIp,
        path,
        method: request.method
      });

      return new NextResponse('Invalid CSRF Token', { status: 403 });
    }
  }

  // Force HTTPS redirect (except localhost)
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host');
  if (proto === 'http' && host && !host.includes('localhost')) {
    return NextResponse.redirect(`https://${host}${request.nextUrl.pathname}`, 301);
  }

  // Security monitoring for suspicious patterns
  const userAgent = request.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /sqlmap/i,
    /nikto/i,
    /acunetix/i,
    /nessus/i,
    /metasploit/i,
    /burp/i,
    /owasp/i,
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];

  if (suspiciousPatterns.some(pattern => pattern.test(userAgent) || pattern.test(path))) {
    logSecurityEvent('SUSPICIOUS_ACTIVITY', {
      ip: clientIp,
      path,
      userAgent,
      method: request.method
    });
  }

  // Add security headers for API responses
  if (path.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  // Add CSRF token to response cookies if not present
  if (!request.cookies.get('csrf-token')) {
    const csrfToken = generateCsrfToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 24 hours
      path: '/',
    });
  }

  return response;
}

// Generate secure CSRF token
function generateCsrfToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};