/**
 * Deployment Health Check Endpoint
 * Provides comprehensive health status for monitoring
 */

import { NextResponse } from 'next/server';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  deployment: {
    environment: string;
    commitSha?: string;
    buildId?: string;
  };
  checks: {
    database: boolean;
    memory: {
      used: number;
      total: number;
      percentage: number;
    };
    uptime: number;
  };
  performance: {
    averageResponseTime?: number;
    requestCount?: number;
  };
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const startTime = Date.now();

    // Memory check
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    const memoryTotalMB = Math.round(memoryUsage.heapTotal / 1024 / 1024);
    const memoryPercentage = (memoryUsedMB / memoryTotalMB) * 100;

    // Database check (basic)
    let databaseHealthy = true;
    try {
      // Add actual database check here
      // const db = await prisma.$queryRaw`SELECT 1`;
      databaseHealthy = true;
    } catch (error) {
      console.error('Database health check failed:', error);
      databaseHealthy = false;
    }

    // Determine overall health status
    let status: HealthCheck['status'] = 'healthy';
    if (!databaseHealthy || memoryPercentage > 90) {
      status = 'unhealthy';
    } else if (memoryPercentage > 75) {
      status = 'degraded';
    }

    const health: HealthCheck = {
      status,
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      deployment: {
        environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA,
        buildId: process.env.NEXT_BUILD_ID
      },
      checks: {
        database: databaseHealthy,
        memory: {
          used: memoryUsedMB,
          total: memoryTotalMB,
          percentage: Math.round(memoryPercentage)
        },
        uptime: process.uptime()
      },
      performance: {
        averageResponseTime: Date.now() - startTime
      }
    };

    return NextResponse.json(health, {
      status: status === 'healthy' ? 200 : status === 'degraded' ? 200 : 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Health check error:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  }
}

// HEAD request for simple health check
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    }
  });
}
