import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware allows all routes to be publicly accessible
// No authentication is required for any pages
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security and caching headers
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

// Only run middleware on specific paths if needed
// Currently allowing all paths
export const config = {
  matcher: [
    // Skip all internal Next.js paths
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};