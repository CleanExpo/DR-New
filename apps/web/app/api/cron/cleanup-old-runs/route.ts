// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronRequest(request: NextRequest): boolean {
  const cronSecret =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedSecret = process.env.CRON_SECRET;

  // In development, allow requests without secret
  if (process.env.NODE_ENV === 'development' && !expectedSecret) {
    return true;
  }

  if (!expectedSecret) {
    console.warn('CRON_SECRET not configured');
    return false;
  }

  return cronSecret === expectedSecret;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const retentionDays = parseInt(process.env.AGENT_RUN_RETENTION_DAYS || '30', 10);
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

  const prisma = new PrismaClient();

  try {
    // Delete old agent jobs from Prisma
    const deletedJobs = await prisma.agentJob.deleteMany({
      where: {
        completedAt: {
          lt: cutoffDate,
        },
        status: {
          in: ['COMPLETED', 'FAILED', 'CANCELLED'],
        },
      },
    });

    // Also clean up Supabase agent_runs if configured
    let deletedSupabase = 0;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const { count, error } = await supabase
          .from('agent_runs')
          .delete()
          .lt('completed_at', cutoffDate.toISOString())
          .in('status', ['completed', 'failed', 'cancelled']);

        if (!error && count) {
          deletedSupabase = count;
        }
      } catch (e) {
        console.warn('Failed to cleanup Supabase agent_runs:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Cleanup completed',
      deletedCount: {
        prisma: deletedJobs.count,
        supabase: deletedSupabase,
      },
      retentionDays,
      cutoffDate: cutoffDate.toISOString(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cleanup cron error:', error);
    return NextResponse.json(
      {
        error: 'Cleanup failed',
        message: 'Internal server error',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
