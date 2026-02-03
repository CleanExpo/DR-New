/**
 * Background Job Processor Cron Job
 *
 * Processes pending background jobs from the queue.
 * Runs every 1 minute via Vercel Cron.
 *
 * Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-background-jobs",
 *     "schedule": "* * * * *"
 *   }]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getNextJob,
  processJob,
  getQueueStats,
  JobResult,
} from '@/lib/queue/background-jobs';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // 60 seconds max execution

/**
 * Validates cron request authentication
 */
function isValidCronRequest(request: NextRequest): boolean {
  const cronSecret =
    request.headers.get('x-vercel-cron-secret') ||
    request.headers.get('authorization')?.replace('Bearer ', '');
  const expectedSecret = process.env.CRON_SECRET;

  // Allow in development without secret
  if (process.env.NODE_ENV === 'development' && !expectedSecret) {
    console.log('[Background Jobs Cron] Running in development mode without secret');
    return true;
  }

  // Require secret in production
  if (!expectedSecret) {
    console.error('[Background Jobs Cron] CRON_SECRET not configured');
    return false;
  }

  return cronSecret === expectedSecret;
}

/**
 * GET /api/cron/process-background-jobs
 * Processes background jobs from the queue
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Authenticate cron request
  if (!isValidCronRequest(request)) {
    console.error('[Background Jobs Cron] Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[Background Jobs Cron] Starting job processing...');

    // Get queue stats before processing
    const statsBefore = await getQueueStats();
    console.log('[Background Jobs Cron] Queue stats before:', statsBefore);

    // Process jobs until timeout or no more jobs
    const results: JobResult[] = [];
    const maxProcessingTime = 55000; // 55 seconds (leave 5s buffer)
    let processedCount = 0;
    let successCount = 0;
    let failureCount = 0;

    while (Date.now() - startTime < maxProcessingTime) {
      // Get next job
      const job = await getNextJob();

      if (!job) {
        console.log('[Background Jobs Cron] No more jobs to process');
        break;
      }

      console.log(`[Background Jobs Cron] Processing job ${job.id} (${job.jobType})`);

      // Process the job
      const result = await processJob(job);
      results.push(result);

      processedCount++;
      if (result.success) {
        successCount++;
      } else {
        failureCount++;
      }

      // Log result
      console.log(
        `[Background Jobs Cron] Job ${job.id} ${result.success ? 'succeeded' : 'failed'} (${result.status})`
      );
    }

    // Get queue stats after processing
    const statsAfter = await getQueueStats();

    const duration = Date.now() - startTime;

    console.log('[Background Jobs Cron] Processing complete:', {
      duration: `${duration}ms`,
      processed: processedCount,
      succeeded: successCount,
      failed: failureCount,
      pendingBefore: statsBefore.pending,
      pendingAfter: statsAfter.pending,
    });

    // Alert if queue is growing
    if (statsAfter.pending > statsBefore.pending + 10) {
      console.warn(
        `[Background Jobs Cron] WARNING: Queue is growing! ${statsAfter.pending} pending jobs (was ${statsBefore.pending})`
      );
      // TODO: Send Slack alert
    }

    // Alert if jobs are stalled
    if (statsAfter.processing > 5) {
      console.warn(
        `[Background Jobs Cron] WARNING: ${statsAfter.processing} jobs stuck in PROCESSING state`
      );
      // TODO: Send Slack alert for stalled jobs
    }

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`,
        processing: {
          processed: processedCount,
          succeeded: successCount,
          failed: failureCount,
        },
        queue: {
          before: {
            pending: statsBefore.pending,
            processing: statsBefore.processing,
            retry: statsBefore.retry,
            avgProcessingTimeMs: statsBefore.avgProcessingTimeMs,
          },
          after: {
            pending: statsAfter.pending,
            processing: statsAfter.processing,
            retry: statsAfter.retry,
            avgProcessingTimeMs: statsAfter.avgProcessingTimeMs,
          },
        },
        results: results.map((r) => ({
          jobId: r.jobId,
          success: r.success,
          status: r.status,
          error: r.error,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[Background Jobs Cron] Processing failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Background job processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/process-background-jobs
 * Alternative endpoint for manual triggering with authentication
 */
export async function POST(request: NextRequest) {
  // Reuse the GET handler for consistency
  return GET(request);
}
