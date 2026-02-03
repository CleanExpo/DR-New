/**
 * Email Queue Processor Cron Job
 *
 * Processes failed emails in the queue with exponential backoff retry logic.
 * Should be configured to run every 5 minutes in Vercel Cron Jobs.
 *
 * Cron Configuration (vercel.json):
 * {
 *   "crons": [{
 *     "path": "/api/cron/process-email-queue",
 *     "schedule": "*/5 * * * *"
 *   }]
 * }
 */

import { NextRequest, NextResponse } from 'next/server';
import { processEmailQueue, getEmailQueueStats } from '@/lib/email/email-queue';

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
    console.log('[Email Queue Cron] Running in development mode without secret');
    return true;
  }

  // Require secret in production
  if (!expectedSecret) {
    console.error('[Email Queue Cron] CRON_SECRET not configured');
    return false;
  }

  return cronSecret === expectedSecret;
}

/**
 * GET /api/cron/process-email-queue
 * Processes the email queue with retry logic
 */
export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // Authenticate cron request
  if (!isValidCronRequest(request)) {
    console.error('[Email Queue Cron] Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('[Email Queue Cron] Starting email queue processing...');

    // Get queue stats before processing
    const statsBefore = await getEmailQueueStats();
    console.log('[Email Queue Cron] Queue stats before:', statsBefore);

    // Process the email queue
    const result = await processEmailQueue();

    // Get queue stats after processing
    const statsAfter = await getEmailQueueStats();

    const duration = Date.now() - startTime;

    console.log('[Email Queue Cron] Processing complete:', {
      duration: `${duration}ms`,
      processed: result.processed,
      sent: result.sent,
      failed: result.failed,
      deadLetter: result.deadLetter,
      queuedBefore: statsBefore.queued,
      queuedAfter: statsAfter.queued,
      deadLetterBefore: statsBefore.deadLetter,
      deadLetterAfter: statsAfter.deadLetter,
    });

    // Send alert if there are emails in dead letter queue
    if (statsAfter.deadLetter > 0) {
      console.warn(
        `[Email Queue Cron] WARNING: ${statsAfter.deadLetter} emails in dead letter queue require manual intervention`
      );
      // TODO: Send Slack alert for dead letter queue items
    }

    return NextResponse.json(
      {
        success: true,
        timestamp: new Date().toISOString(),
        duration: `${duration}ms`,
        processing: {
          processed: result.processed,
          sent: result.sent,
          failed: result.failed,
          deadLetter: result.deadLetter,
        },
        queue: {
          before: {
            queued: statsBefore.queued,
            deadLetter: statsBefore.deadLetter,
            totalSent24h: statsBefore.totalSent24h,
            totalFailed24h: statsBefore.totalFailed24h,
          },
          after: {
            queued: statsAfter.queued,
            deadLetter: statsAfter.deadLetter,
            totalSent24h: statsAfter.totalSent24h,
            totalFailed24h: statsAfter.totalFailed24h,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error('[Email Queue Cron] Processing failed:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Email queue processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/cron/process-email-queue
 * Alternative endpoint for manual triggering with authentication
 */
export async function POST(request: NextRequest) {
  // Reuse the GET handler for consistency
  return GET(request);
}
