/**
 * Health Check Endpoint
 *
 * GET /api/health
 * GET /api/health?detailed=true
 *
 * Basic health check returns 200 if service is running
 * Detailed health check verifies all system services:
 * - Database connectivity
 * - Redis connectivity
 * - Socket.io status
 * - SMS service availability
 * - Message queue status
 */

import { NextRequest, NextResponse } from 'next/server';
import { logInfo, logError, logWarn } from '@/lib/logger/helpers';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  checks: {
    database: { status: string; latency?: number };
    redis: { status: string; latency?: number };
    socketio: { status: string };
    sms: { status: string };
    messageQueue: { status: string };
  };
}

/**
 * Check database connectivity
 */
async function checkDatabase(): Promise<{ status: string; latency?: number }> {
  try {
    const start = Date.now();

    // Try a simple query using Prisma if available
    try {
      const prisma = require('@/lib/prisma').prisma;
      if (prisma) {
        // Simple health check query
        await prisma.$queryRaw`SELECT 1`;
        const latency = Date.now() - start;
        return { status: 'healthy', latency };
      }
    } catch (e) {
      // Prisma not available or query failed
    }

    return { status: 'unknown' };
  } catch (error) {
    logError(error, { context: 'health_check_database' });
    return { status: 'unhealthy' };
  }
}

/**
 * Check Redis connectivity
 */
async function checkRedis(): Promise<{ status: string; latency?: number }> {
  try {
    const start = Date.now();
    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;

    if (!redisUrl) {
      return { status: 'not_configured' };
    }

    // Try to connect to Redis
    try {
      const redis = require('redis');
      const client = redis.createClient({ url: redisUrl });
      await client.connect();
      await client.ping();
      await client.disconnect();

      const latency = Date.now() - start;
      return { status: 'healthy', latency };
    } catch (e) {
      // Redis library not available or connection failed
      return { status: 'unhealthy' };
    }
  } catch (error) {
    logError(error, { context: 'health_check_redis' });
    return { status: 'unhealthy' };
  }
}

/**
 * Check Socket.io status
 */
async function checkSocketio(): Promise<{ status: string }> {
  try {
    // Check if Socket.io server is configured
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || process.env.SOCKET_SERVER_URL;

    if (!socketUrl) {
      return { status: 'not_configured' };
    }

    // Try to reach the Socket.io server
    try {
      const response = await fetch(`${socketUrl}/socket.io/?EIO=4&transport=polling`, {
        timeout: 5000,
      });
      if (response.ok || response.status === 400) {
        // 400 is expected when not a proper Socket.io client
        return { status: 'healthy' };
      }
    } catch (e) {
      logWarn('Socket.io health check failed', { error: (e as any)?.message });
      return { status: 'unhealthy' };
    }

    return { status: 'unhealthy' };
  } catch (error) {
    logError(error, { context: 'health_check_socketio' });
    return { status: 'unknown' };
  }
}

/**
 * Check SMS service status
 */
async function checkSMS(): Promise<{ status: string }> {
  try {
    // Check if Twilio is configured
    const hasTwilio =
      !!process.env.TWILIO_ACCOUNT_SID &&
      !!process.env.TWILIO_AUTH_TOKEN &&
      !!process.env.TWILIO_PHONE_NUMBER;

    if (!hasTwilio) {
      return { status: 'not_configured' };
    }

    // Try to get SMS service status
    try {
      const smsService = require('@/lib/notifications/sms-service').smsService;
      if (smsService && smsService.isAvailable()) {
        return { status: 'healthy' };
      }
    } catch (e) {
      // SMS service not available
    }

    return { status: 'unhealthy' };
  } catch (error) {
    logError(error, { context: 'health_check_sms' });
    return { status: 'unknown' };
  }
}

/**
 * Check message queue status
 */
async function checkMessageQueue(): Promise<{ status: string }> {
  try {
    // Check if Bull/Redis queue is configured
    const redisUrl = process.env.REDIS_URL || process.env.UPSTASH_REDIS_REST_URL;

    if (!redisUrl) {
      return { status: 'not_configured' };
    }

    // Bull requires Redis, so if Redis is up, queue is up
    const redisStatus = await checkRedis();
    if (redisStatus.status === 'healthy') {
      return { status: 'healthy' };
    }

    return { status: 'unhealthy' };
  } catch (error) {
    logError(error, { context: 'health_check_queue' });
    return { status: 'unknown' };
  }
}

/**
 * Perform all health checks
 */
async function performHealthChecks(): Promise<HealthStatus> {
  const startTime = Date.now();

  const [database, redis, socketio, sms, messageQueue] = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkSocketio(),
    checkSMS(),
    checkMessageQueue(),
  ]);

  // Determine overall status
  const unhealthyServices = [database, redis, socketio, sms, messageQueue].filter(
    (s) => s.status === 'unhealthy'
  ).length;

  let overallStatus: 'healthy' | 'degraded' | 'unhealthy' = 'healthy';
  if (unhealthyServices > 2) {
    overallStatus = 'unhealthy';
  } else if (unhealthyServices > 0) {
    overallStatus = 'degraded';
  }

  return {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    uptime: Date.now() / 1000,
    checks: {
      database,
      redis,
      socketio,
      sms,
      messageQueue,
    },
  };
}

/**
 * GET /api/health
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const detailed = searchParams.get('detailed') === 'true';

    if (detailed) {
      const health = await performHealthChecks();

      const statusCode = health.status === 'healthy' ? 200 : health.status === 'degraded' ? 503 : 503;

      logInfo('Detailed health check completed', {
        status: health.status,
        services: Object.entries(health.checks)
          .map(([k, v]) => `${k}:${v.status}`)
          .join(','),
      });

      return NextResponse.json(health, { status: statusCode });
    } else {
      // Basic health check
      return NextResponse.json(
        {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          message: 'Service is running',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    logError(error, { context: 'health_check_endpoint' });
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 503 }
    );
  }
}

/**
 * OPTIONS handler for CORS
 */
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    { message: 'OK' },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
      status: 200,
    }
  );
}
