/**
 * CSRF Token API Endpoint
 * GET /api/csrf - Generate and return a new CSRF token
 */

import { NextResponse } from 'next/server';
import { csrfProtection } from '@/src/lib/security/csrf';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const token = csrfProtection.generateToken();

    return NextResponse.json(
      {
        token,
        expiresIn: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('Failed to generate CSRF token:', error);
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
