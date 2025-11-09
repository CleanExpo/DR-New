import { NextResponse } from 'next/server';

/**
 * Health Check Endpoint
 * Used by monitoring systems and deployment pipelines
 */

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface HealthCheck {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  version: string;
  checks: {
    database?: {
      status: 'up' | 'down';
      responseTime?: number;
    };
    memory?: {
      used: number;
      total: number;
      percentage: number;
    };
    uptime?: number;
  };
}

export async function GET() {
  const startTime = Date.now();

  try {
    const health: HealthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      version: process.env.npm_package_version || '1.0.0',
      checks: {},
    };

    // Memory check
    if (typeof process !== 'undefined' && process.memoryUsage) {
      const memory = process.memoryUsage();
      health.checks.memory = {
        used: Math.round(memory.heapUsed / 1024 / 1024), // MB
        total: Math.round(memory.heapTotal / 1024 / 1024), // MB
        percentage: Math.round((memory.heapUsed / memory.heapTotal) * 100),
      };
    }

    // Uptime check
    if (typeof process !== 'undefined' && process.uptime) {
      health.checks.uptime = Math.round(process.uptime()); // seconds
    }

    // Database check (optional - comment out if causing issues)
    // try {
    //   const dbStartTime = Date.now();
    //   await prisma.$queryRaw`SELECT 1`;
    //   health.checks.database = {
    //     status: 'up',
    //     responseTime: Date.now() - dbStartTime,
    //   };
    // } catch (error) {
    //   health.checks.database = {
    //     status: 'down',
    //   };
    //   health.status = 'degraded';
    // }

    const responseTime = Date.now() - startTime;

    return NextResponse.json(
      {
        ...health,
        responseTime,
      },
      {
        status: health.status === 'healthy' ? 200 : 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 503,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Support HEAD requests for simple uptime checks
export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
