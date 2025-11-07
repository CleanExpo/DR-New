/**
 * Deployment Metrics Endpoint
 * Provides performance and operational metrics
 */

import { NextResponse } from 'next/server';

interface Metrics {
  timestamp: string;
  deployment: {
    environment: string;
    version: string;
    commitSha?: string;
    deployedAt?: string;
  };
  performance: {
    memory: {
      heapUsed: number;
      heapTotal: number;
      external: number;
      rss: number;
    };
    cpu: {
      user: number;
      system: number;
    };
    uptime: number;
  };
  runtime: {
    nodeVersion: string;
    platform: string;
    arch: string;
  };
  requests?: {
    total: number;
    errors: number;
    errorRate: number;
  };
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const memoryUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();

    const metrics: Metrics = {
      timestamp: new Date().toISOString(),
      deployment: {
        environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'development',
        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
        commitSha: process.env.VERCEL_GIT_COMMIT_SHA,
        deployedAt: process.env.VERCEL_GIT_COMMIT_TIMESTAMP
      },
      performance: {
        memory: {
          heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024), // MB
          heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024), // MB
          external: Math.round(memoryUsage.external / 1024 / 1024), // MB
          rss: Math.round(memoryUsage.rss / 1024 / 1024) // MB
        },
        cpu: {
          user: Math.round(cpuUsage.user / 1000), // milliseconds
          system: Math.round(cpuUsage.system / 1000) // milliseconds
        },
        uptime: Math.round(process.uptime()) // seconds
      },
      runtime: {
        nodeVersion: process.version,
        platform: process.platform,
        arch: process.arch
      }
    };

    return NextResponse.json(metrics, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Metrics error:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve metrics',
        timestamp: new Date().toISOString()
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
      }
    );
  }
}
