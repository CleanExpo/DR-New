/**
 * Health Check Endpoint - GET /api/health
 *
 * Simple health check for monitoring and uptime checks.
 * Does NOT require database connection to respond.
 * Updated: 2026-01-13 - Force clean rebuild
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'production',
    checks: {
      api: { status: 'healthy' },
      database: { status: process.env.DATABASE_URL ? 'configured' : 'not_configured' },
      auth: { status: process.env.NEXTAUTH_SECRET ? 'configured' : 'not_configured' },
      redis: { status: process.env.UPSTASH_REDIS_REST_URL ? 'configured' : 'not_configured' },
    },
  };

  return NextResponse.json(response, { status: 200 });
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
