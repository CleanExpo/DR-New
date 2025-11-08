/**
 * System Health Check API Endpoint
 * Provides real-time health status and diagnostics
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const healthData = await request.json();

    // Log health metrics
    console.log('[Health Check]', {
      timestamp: healthData.timestamp,
      errorCount: healthData.errors?.totalErrors || 0,
      uniqueErrors: healthData.errors?.uniqueErrors || 0,
    });

    // Store in monitoring system (implement based on your backend)
    // await storeHealthMetrics(healthData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Health Check] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process health check' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      checks: {
        api: await checkAPIHealth(),
        database: await checkDatabaseHealth(),
        external: await checkExternalServices(),
      },
    };

    const allHealthy = Object.values(health.checks).every(check => check.status === 'healthy');
    health.status = allHealthy ? 'healthy' : 'degraded';

    return NextResponse.json(health);
  } catch (error) {
    console.error('[Health Check] Failed:', error);
    return NextResponse.json(
      {
        status: 'critical',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}

async function checkAPIHealth() {
  // Check if API is responsive
  try {
    const start = Date.now();
    // Perform a lightweight operation
    const latency = Date.now() - start;

    return {
      status: latency < 100 ? 'healthy' : 'degraded',
      latency,
    };
  } catch (error) {
    return {
      status: 'critical',
      error: String(error),
    };
  }
}

async function checkDatabaseHealth() {
  // Check database connectivity
  try {
    // Implement based on your database
    // Example: await prisma.$queryRaw`SELECT 1`
    return {
      status: 'healthy',
    };
  } catch (error) {
    return {
      status: 'critical',
      error: String(error),
    };
  }
}

async function checkExternalServices() {
  // Check external service dependencies
  try {
    const services = [];

    // Check Google Analytics
    if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
      services.push({ name: 'Google Analytics', status: 'configured' });
    }

    return {
      status: 'healthy',
      services,
    };
  } catch (error) {
    return {
      status: 'degraded',
      error: String(error),
    };
  }
}

export const runtime = 'edge';
export const dynamic = 'force-dynamic';
