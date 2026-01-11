/**
 * Health Check Endpoint - GET /api/health
 *
 * Comprehensive health status for all system components:
 * - Database connectivity
 * - Redis/Cache connectivity
 * - External service integrations
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { redis } from '@/lib/config/redis.config';
import { logInfo, logError } from '@/lib/logger/helpers';

export const dynamic = 'force-dynamic';

interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'unhealthy';
  latency: number;
  lastChecked: string;
  error?: string;
}

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  services: {
    database: ServiceHealth;
    redis: ServiceHealth;
    externalApis: {
      sendgrid: ServiceHealth;
      twilio?: ServiceHealth;
      sentry?: ServiceHealth;
    };
  };
}

const startTime = Date.now();

async function checkDatabase(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    await prisma.$queryRaw`SELECT NOW()`;
    return {
      status: 'healthy',
      latency: Date.now() - start,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logError(error, { context: 'health_check_database' });
    return {
      status: 'unhealthy',
      latency: Date.now() - start,
      lastChecked: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkRedis(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const result = await redis.ping();
    return {
      status: result === 'PONG' ? 'healthy' : 'degraded',
      latency: Date.now() - start,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logError(error, { context: 'health_check_redis' });
    return {
      status: 'unhealthy',
      latency: Date.now() - start,
      lastChecked: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function checkSendGrid(): Promise<ServiceHealth> {
  const start = Date.now();
  const apiKey = process.env.SENDGRID_API_KEY;
  const latency = Date.now() - start;

  if (!apiKey || apiKey.length < 10) {
    return {
      status: 'degraded',
      latency,
      lastChecked: new Date().toISOString(),
      error: 'API key not configured',
    };
  }

  return {
    status: 'healthy',
    latency,
    lastChecked: new Date().toISOString(),
  };
}

async function checkTwilio(): Promise<ServiceHealth | undefined> {
  if (!process.env.TWILIO_ACCOUNT_SID) return undefined;

  const hasAll =
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_PHONE_NUMBER;

  return {
    status: hasAll ? 'healthy' : 'degraded',
    latency: 0,
    lastChecked: new Date().toISOString(),
  };
}

async function checkSentry(): Promise<ServiceHealth | undefined> {
  if (!process.env.SENTRY_DSN) return undefined;

  return {
    status: 'healthy',
    latency: 0,
    lastChecked: new Date().toISOString(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const [db, redisHealth] = await Promise.all([
      checkDatabase(),
      checkRedis(),
    ]);

    const [sendgrid, twilio, sentry] = await Promise.all([
      checkSendGrid(),
      checkTwilio(),
      checkSentry(),
    ]);

    const isUnhealthy = [db, redisHealth].some(s => s.status === 'unhealthy');
    const isDegraded = [db, redisHealth].some(s => s.status === 'degraded');
    const status = isUnhealthy ? 'unhealthy' : isDegraded ? 'degraded' : 'healthy';

    const response: HealthStatus = {
      status: status as any,
      timestamp: new Date().toISOString(),
      uptime: Date.now() - startTime,
      services: {
        database: db,
        redis: redisHealth,
        externalApis: {
          sendgrid,
          ...(twilio && { twilio }),
          ...(sentry && { sentry }),
        },
      },
    };

    logInfo('Health check performed', { status });

    const statusCode = status === 'unhealthy' ? 503 : 200;
    return NextResponse.json(response, { status: statusCode });
  } catch (error) {
    logError(error, { context: 'health_endpoint' });
    return NextResponse.json({ status: 'unhealthy' }, { status: 503 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ message: 'OK' }, { status: 200 });
}
