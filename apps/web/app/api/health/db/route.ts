/**
 * Database Health Check Endpoint - GET /api/health/db
 *
 * Lightweight DB connectivity check for smoke tests and monitoring.
 * Public endpoint - no authentication required.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();

  try {
    // Dynamic import to avoid bundling issues in edge cases
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      await prisma.$queryRaw`SELECT 1 AS ok`;
      const latencyMs = Date.now() - start;

      return NextResponse.json(
        { status: 'ok', latencyMs, timestamp: new Date().toISOString() },
        { status: 200 }
      );
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    const latencyMs = Date.now() - start;
    return NextResponse.json(
      {
        status: 'error',
        latencyMs,
        error: error instanceof Error ? error.message : 'Database connection failed',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
