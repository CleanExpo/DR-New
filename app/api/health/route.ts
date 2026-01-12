/**
 * Health Check Endpoint - GET /api/health
 *
 * Simple health check for monitoring and uptime checks.
 * Updated: 2026-01-13 - Added auth imports to match working routes
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  // Health check - always responds, no auth required
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
