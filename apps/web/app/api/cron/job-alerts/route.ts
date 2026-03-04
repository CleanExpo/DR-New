/**
 * Job Failure Alerts Cron
 * GET /api/cron/job-alerts
 *
 * Scheduled to run every hour. Detects:
 * 1. Jobs ASSIGNED for 24+ hours without a status update
 * 2. Jobs COMPLETED for 48+ hours without an invoice generated
 *
 * Logs alerts for admin review. When the notifications system (DR-164)
 * is implemented, this will send email/SMS alerts.
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isValidCronRequest(request: NextRequest): boolean {
  const cronSecret =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedSecret = process.env.CRON_SECRET;

  if (process.env.NODE_ENV === 'development' && !expectedSecret) {
    return true;
  }

  if (!expectedSecret) return false;
  return cronSecret === expectedSecret;
}

interface JobAlert {
  jobId: string;
  jobNumber: string;
  alertType: 'stale_assignment' | 'missing_invoice';
  contractorId: string | null;
  message: string;
  hoursSinceEvent: number;
}

export async function GET(request: NextRequest) {
  if (!isValidCronRequest(request)) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  try {
    const alerts: JobAlert[] = [];
    const now = new Date();

    // 1. Jobs ASSIGNED for 24+ hours with no status update
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const staleAssignments = await prisma.job.findMany({
      where: {
        status: 'ASSIGNED',
        updatedAt: { lt: twentyFourHoursAgo },
      },
      select: {
        id: true,
        jobNumber: true,
        contractorId: true,
        updatedAt: true,
      },
    });

    for (const job of staleAssignments) {
      const hoursSince = Math.round(
        (now.getTime() - job.updatedAt.getTime()) / (1000 * 60 * 60)
      );

      alerts.push({
        jobId: job.id,
        jobNumber: job.jobNumber,
        alertType: 'stale_assignment',
        contractorId: job.contractorId,
        message: `Job ${job.jobNumber} has been ASSIGNED for ${hoursSince}h with no status update`,
        hoursSinceEvent: hoursSince,
      });
    }

    // 2. Jobs COMPLETED for 48+ hours with no invoice
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const completedJobs = await prisma.job.findMany({
      where: {
        status: 'COMPLETED',
        completedDate: { lt: fortyEightHoursAgo },
      },
      select: {
        id: true,
        jobNumber: true,
        contractorId: true,
        completedDate: true,
      },
    });

    for (const job of completedJobs) {
      const hoursSince = job.completedDate
        ? Math.round(
            (now.getTime() - job.completedDate.getTime()) / (1000 * 60 * 60)
          )
        : 0;

      alerts.push({
        jobId: job.id,
        jobNumber: job.jobNumber,
        alertType: 'missing_invoice',
        contractorId: job.contractorId,
        message: `Job ${job.jobNumber} completed ${hoursSince}h ago but no invoice has been generated`,
        hoursSinceEvent: hoursSince,
      });
    }

    // Log alerts
    if (alerts.length > 0) {
      console.warn(`[JOB ALERTS] ${alerts.length} alert(s) detected:`, {
        timestamp: now.toISOString(),
        staleAssignments: alerts.filter((a) => a.alertType === 'stale_assignment').length,
        missingInvoices: alerts.filter((a) => a.alertType === 'missing_invoice').length,
        alerts,
      });

      // TODO (DR-164): Send email/SMS notifications to admins
      // await sendAdminAlert(alerts);
    } else {
      console.log('[JOB ALERTS] No alerts — all jobs are on track', {
        timestamp: now.toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      timestamp: now.toISOString(),
      alertCount: alerts.length,
      alerts,
    });
  } catch (error) {
    console.error('[JOB ALERTS] Cron error:', error);
    return NextResponse.json(
      {
        error: 'Job alerts cron failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
