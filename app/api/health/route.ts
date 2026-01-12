/**
 * Health Check Endpoint - GET /api/health
 *
 * Provides health status for monitoring and uptime checks.
 * Checks database connectivity and reports service status.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const startTime = Date.now();

export async function GET() {
  const checks: Record<string, { status: string; latency?: number; error?: string }> = {};
  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';

  // Check database connectivity
  const dbStart = Date.now();
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = {
      status: 'healthy',
      latency: Date.now() - dbStart,
    };
  } catch (error) {
    checks.database = {
      status: 'unhealthy',
      latency: Date.now() - dbStart,
      error: error instanceof Error ? error.message : 'Database connection failed',
    };
    overallStatus = 'unhealthy';
  }

  // Check Redis (Upstash) - optional
  if (process.env.UPSTASH_REDIS_REST_URL) {
    checks.redis = { status: 'configured' };
  } else {
    checks.redis = { status: 'not_configured' };
    if (overallStatus === 'healthy') overallStatus = 'degraded';
  }

  // Check critical environment variables
  const criticalEnvVars = ['NEXTAUTH_SECRET', 'DATABASE_URL'];
  const missingVars = criticalEnvVars.filter(v => !process.env[v]);

  checks.environment = {
    status: missingVars.length === 0 ? 'healthy' : 'unhealthy',
    ...(missingVars.length > 0 && { error: `Missing: ${missingVars.join(', ')}` }),
  };

  if (missingVars.length > 0) {
    overallStatus = 'unhealthy';
  }

  // Build response
  const response = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Math.floor((Date.now() - startTime) / 1000),
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'unknown',
    checks,
  };

  const statusCode = overallStatus === 'unhealthy' ? 503 : 200;
  return NextResponse.json(response, { status: statusCode });
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
