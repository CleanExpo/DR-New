import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getSupabaseServerEnv } from '@/lib/supabase/server-env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface HealthCheck {
  status: 'ok' | 'degraded' | 'unhealthy';
  latencyMs?: number;
  error?: string;
}

interface DeepHealthResponse {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  environment: string;
  version: string;
  services: {
    database: HealthCheck;
    redis: HealthCheck;
    supabase: HealthCheck;
    memory: {
      status: 'ok' | 'warning' | 'critical';
      heapUsedMB: number;
      heapTotalMB: number;
      percentage: number;
    };
  };
  uptime: number;
}

async function checkDatabase(): Promise<HealthCheck> {
  const start = Date.now();
  const prisma = new PrismaClient();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', latencyMs: Date.now() - start };
  } catch (error) {
    return {
      status: 'unhealthy',
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Database connection failed',
    };
  } finally {
    await prisma.$disconnect();
  }
}

async function checkRedis(): Promise<HealthCheck> {
  if (!process.env.REDIS_URL) {
    return { status: 'ok', error: 'Redis not configured (optional)' };
  }

  const start = Date.now();
  try {
    // Dynamic import to avoid bundling issues
    const { Redis } = await import('ioredis');
    const redis = new Redis(process.env.REDIS_URL, {
      tls: process.env.REDIS_URL.startsWith('rediss://')
        ? { rejectUnauthorized: false }
        : undefined,
      connectTimeout: 5000,
      maxRetriesPerRequest: 1,
    });

    await redis.ping();
    await redis.quit();
    return { status: 'ok', latencyMs: Date.now() - start };
  } catch (error) {
    return {
      status: 'degraded',
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Redis connection failed',
    };
  }
}

async function checkSupabase(): Promise<HealthCheck> {
  // Non-inlined env reads — see lib/supabase/server-env.ts (NEXT_PUBLIC_* is
  // inlined at build time and prod prebuilt builds can't see sensitive values).
  const { url: supabaseUrl, serviceRoleKey } = getSupabaseServerEnv();
  if (!supabaseUrl || !serviceRoleKey) {
    return { status: 'ok', error: 'Supabase not configured (optional)' };
  }

  const start = Date.now();
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Simple query to check connectivity
    const { error } = await supabase.from('_prisma_migrations').select('id').limit(1);

    if (error && error.code !== 'PGRST116' && error.code !== '42P01') {
      return {
        status: 'degraded',
        latencyMs: Date.now() - start,
        error: error.message,
      };
    }
    return { status: 'ok', latencyMs: Date.now() - start };
  } catch (error) {
    return {
      status: 'degraded',
      latencyMs: Date.now() - start,
      error: error instanceof Error ? error.message : 'Supabase connection failed',
    };
  }
}

function checkMemory(): DeepHealthResponse['services']['memory'] {
  const used = process.memoryUsage();
  const heapUsedMB = Math.round(used.heapUsed / 1024 / 1024);
  const heapTotalMB = Math.round(used.heapTotal / 1024 / 1024);
  const percentage = Math.round((used.heapUsed / used.heapTotal) * 100);

  return {
    status: percentage > 90 ? 'critical' : percentage > 75 ? 'warning' : 'ok',
    heapUsedMB,
    heapTotalMB,
    percentage,
  };
}

export async function GET() {
  const [database, redis, supabase] = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkSupabase(),
  ]);

  const memory = checkMemory();

  // Determine overall status
  const statuses = [database.status, redis.status, supabase.status];
  let overallStatus: 'ok' | 'degraded' | 'unhealthy' = 'ok';

  if (statuses.includes('unhealthy')) {
    overallStatus = 'unhealthy';
  } else if (statuses.includes('degraded') || memory.status === 'critical') {
    overallStatus = 'degraded';
  }

  const response: DeepHealthResponse = {
    status: overallStatus,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    services: {
      database,
      redis,
      supabase,
      memory,
    },
    uptime: process.uptime(),
  };

  return NextResponse.json(response, {
    status: overallStatus === 'ok' ? 200 : overallStatus === 'degraded' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
