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
import { escalateToNextContractor } from '@/lib/claim-intake';

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

    // Fetch stale assignments and completed-without-invoice jobs in parallel
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

    const [staleAssignments, completedJobs] = await Promise.all([
      prisma.job.findMany({
        where: { status: 'ASSIGNED', updatedAt: { lt: twentyFourHoursAgo } },
        select: { id: true, jobNumber: true, contractorId: true, updatedAt: true },
      }),
      prisma.job.findMany({
        where: { status: 'COMPLETED', completedDate: { lt: fortyEightHoursAgo } },
        select: { id: true, jobNumber: true, contractorId: true, completedDate: true },
      }),
    ]);

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

    // ── ContractorMatch timeout escalation ─────────────────────────────────
    // Find matches where the response deadline has passed and the contractor
    // has not responded. Escalate each to the next backup contractor.
    const timedOutMatches = await prisma.contractorMatch.findMany({
      where: {
        notificationStatus: 'SENT',
        contractorResponse: null,
        responseDeadline: { lt: now },
      },
      select: {
        id: true,
        serviceRequestId: true,
        contractorId: true,
        matchScore: true,
        responseDeadline: true,
      },
    });

    let escalatedCount = 0;
    let escalationFailures = 0;

    for (const match of timedOutMatches) {
      if (!match.serviceRequestId) continue;
      try {
        const escalated = await escalateToNextContractor(match.serviceRequestId, match.id);
        if (escalated) {
          escalatedCount++;
        } else {
          // No backup available — mark as EXPIRED so we don't retry
          await prisma.contractorMatch.update({
            where: { id: match.id },
            data: { notificationStatus: 'EXPIRED' },
          });
          escalationFailures++;
        }
      } catch (err) {
        console.error(`[JOB ALERTS] Escalation failed for match ${match.id}:`, err);
        escalationFailures++;
      }
    }

    if (timedOutMatches.length > 0) {
      console.warn(`[JOB ALERTS] Match escalation: ${escalatedCount} escalated, ${escalationFailures} no-backup`, {
        timestamp: now.toISOString(),
        timedOutCount: timedOutMatches.length,
      });
    }
    // ───────────────────────────────────────────────────────────────────────

    // Log alerts
    if (alerts.length > 0) {
      console.warn(`[JOB ALERTS] ${alerts.length} alert(s) detected:`, {
        timestamp: now.toISOString(),
        staleAssignments: staleAssignments.length,
        missingInvoices: completedJobs.length,
        alerts,
      });
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
      matchEscalation: {
        timedOut: timedOutMatches.length,
        escalated: escalatedCount,
        noBackupAvailable: escalationFailures,
      },
    });
  } catch (error) {
    console.error('[JOB ALERTS] Cron error:', error);
    return NextResponse.json(
      {
        error: 'Job alerts cron failed',
      },
      { status: 500 }
    );
  }
}
