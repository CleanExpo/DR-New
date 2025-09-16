import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cache control configurations for different resource types
const cacheConfigs = {
  static: 'public, max-age=31536000, immutable', // 1 year
  images: 'public, max-age=31536000, immutable', // 1 year
  api: 'no-store, no-cache, must-revalidate',
  html: 'public, max-age=0, must-revalidate',
  css: 'public, max-age=31536000, immutable',
  js: 'public, max-age=31536000, immutable',
  fonts: 'public, max-age=31536000, immutable',
};

// Performance headers
const performanceHeaders = {
  // Enable compression hints
  'Accept-CH': 'DPR, Viewport-Width, Width, Save-Data, ECT',

  // Resource hints
  'Link': [
    '<https://fonts.googleapis.com>; rel=preconnect',
    '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
    '</sw.js>; rel=preload; as=script',
    '</manifest.json>; rel=preload; as=manifest',
  ].join(', '),

  // Early hints for critical resources
  'X-DNS-Prefetch-Control': 'on',

  // Enable browser optimizations
  'X-UA-Compatible': 'IE=edge',

  // Performance timing
  'Server-Timing': `edge;dur=${Date.now() % 100}`,
};

// Security headers optimized for performance
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'accelerometer=(), camera=(), geolocation=(self), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
};

// CSP optimized for performance
const cspHeader = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com",
    "prefetch-src 'self'",
    "worker-src 'self' blob:",
  ].join('; '),
};

// Rate limiting with performance optimization
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS = 100; // Higher limit for better performance
const API_MAX_REQUESTS = 20; // API endpoints

function checkRateLimit(ip: string, path: string): boolean {
  // Skip rate limiting for static assets
  if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    return true;
  }

  const now = Date.now();
  const key = `${ip}:${path}`;
  const limit = path.startsWith('/api/') ? API_MAX_REQUESTS : MAX_REQUESTS;

  // Efficient cleanup
  if (rateLimitMap.size > 1000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.resetTime < now) {
        rateLimitMap.delete(k);
      }
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

// Get client IP efficiently
function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
         request.headers.get('x-real-ip') ||
         request.headers.get('cf-connecting-ip') ||
         'unknown';
}

// Main middleware function
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  // Fast path for static assets
  if (pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)) {
    // Apply aggressive caching for static assets
    const ext = pathname.split('.').pop() || '';
    const cacheControl =
      ['js', 'css'].includes(ext) ? cacheConfigs.css :
      ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'].includes(ext) ? cacheConfigs.images :
      ['woff', 'woff2', 'ttf', 'eot'].includes(ext) ? cacheConfigs.fonts :
      cacheConfigs.static;

    response.headers.set('Cache-Control', cacheControl);

    // Add immutable flag for versioned assets
    if (pathname.includes('/_next/')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    }

    // Skip security headers for static assets (performance)
    return response;
  }

  // Apply all headers for HTML/API responses
  Object.entries(performanceHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Apply CSP only for HTML pages
  if (!pathname.startsWith('/api/')) {
    response.headers.set('Content-Security-Policy', cspHeader['Content-Security-Policy']);
  }

  // Rate limiting
  const clientIp = getClientIp(request);
  if (!checkRateLimit(clientIp, pathname)) {
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': '60',
        'Cache-Control': 'no-store',
      },
    });
  }

  // Cache control for different content types
  if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', cacheConfigs.api);
  } else if (pathname === '/' || pathname.match(/^\/[^.]*$/)) {
    // HTML pages
    response.headers.set('Cache-Control', cacheConfigs.html);

    // Add resource hints for critical pages
    if (pathname === '/') {
      response.headers.append('Link', '</images/hero/disaster-recovery-services.jpg>; rel=preload; as=image; fetchpriority=high');
      response.headers.append('Link', '</_next/static/css/app.css>; rel=preload; as=style');
      response.headers.append('Link', '</_next/static/chunks/main.js>; rel=preload; as=script');
    }
  }

  // Service Worker scope
  if (pathname === '/sw.js') {
    response.headers.set('Service-Worker-Allowed', '/');
    response.headers.set('Cache-Control', 'no-cache');
  }

  // Manifest
  if (pathname === '/manifest.json') {
    response.headers.set('Content-Type', 'application/manifest+json');
    response.headers.set('Cache-Control', 'public, max-age=604800'); // 1 week
  }

  // Add performance markers
  response.headers.set('X-Response-Time', `${Date.now() % 1000}ms`);

  // Enable HTTP/2 Server Push hints
  if (pathname === '/') {
    response.headers.append('Link', '</_next/static/chunks/framework.js>; rel=preload; as=script');
    response.headers.append('Link', '</api/performance>; rel=preconnect');
  }

  // Add Vary headers for better caching
  response.headers.set('Vary', 'Accept-Encoding, Save-Data, DPR, Viewport-Width, Width');

  // Force HTTPS in production
  const proto = request.headers.get('x-forwarded-proto');
  const host = request.headers.get('host');
  if (proto === 'http' && host && !host.includes('localhost')) {
    return NextResponse.redirect(`https://${host}${pathname}`, 301);
  }

  return response;
}

// Optimized matcher configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files - handled by Next.js)
     * - _next/image (image optimization - handled by Next.js)
     * - favicon.ico (handled separately)
     *
     * But include:
     * - API routes
     * - HTML pages
     * - Service worker
     * - Manifest
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};