/**
 * Anthropic Batch Status + Results — DR-256
 *
 * GET    /api/nrpg/batch/[batchId]          — poll status
 * GET    /api/nrpg/batch/[batchId]?results=1 — collect results (only when ended)
 * DELETE /api/nrpg/batch/[batchId]          — cancel batch
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  getBatchStatus,
  collectBatchResults,
  cancelBatch,
} from '@/lib/anthropic-batch';

// ---------------------------------------------------------------------------
// Auth guard
// ---------------------------------------------------------------------------

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// GET — poll status (or fetch results)
// ---------------------------------------------------------------------------

export async function GET(
  request: NextRequest,
  { params }: { params: { batchId: string } },
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised — admin required' }, { status: 401 });
  }

  const job = await prisma.aIBatchProcessingJob.findUnique({
    where: { id: params.batchId },
  });

  if (!job) {
    return NextResponse.json({ error: 'Batch job not found' }, { status: 404 });
  }

  const meta = job.metadata as { anthropicBatchId?: string } | null;
  const anthropicBatchId = meta?.anthropicBatchId;

  if (!anthropicBatchId) {
    return NextResponse.json({ error: 'No Anthropic batch ID on record' }, { status: 500 });
  }

  // Poll Anthropic for current status
  const status = await getBatchStatus(anthropicBatchId);

  // Sync local record if batch has ended
  if (status.processingStatus === 'ended' && job.status === 'in_progress') {
    await prisma.aIBatchProcessingJob.update({
      where: { id: job.id },
      data: {
        status: 'completed',
        processedImages: status.requestCounts.succeeded + status.requestCounts.errored,
        successCount: status.requestCounts.succeeded,
        failureCount: status.requestCounts.errored,
        completedAt: status.endedAt ? new Date(status.endedAt) : new Date(),
      },
    });
  }

  const wantResults = request.nextUrl.searchParams.get('results') === '1';

  if (wantResults) {
    if (status.processingStatus !== 'ended') {
      return NextResponse.json(
        { error: 'Batch is still processing — results not yet available', status },
        { status: 409 },
      );
    }
    const results = await collectBatchResults(anthropicBatchId);
    return NextResponse.json({ status, results });
  }

  return NextResponse.json({ status, jobId: job.id });
}

// ---------------------------------------------------------------------------
// DELETE — cancel batch
// ---------------------------------------------------------------------------

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { batchId: string } },
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised — admin required' }, { status: 401 });
  }

  const job = await prisma.aIBatchProcessingJob.findUnique({
    where: { id: params.batchId },
  });

  if (!job) {
    return NextResponse.json({ error: 'Batch job not found' }, { status: 404 });
  }

  const meta = job.metadata as { anthropicBatchId?: string } | null;
  const anthropicBatchId = meta?.anthropicBatchId;

  if (!anthropicBatchId) {
    return NextResponse.json({ error: 'No Anthropic batch ID on record' }, { status: 500 });
  }

  await cancelBatch(anthropicBatchId);

  await prisma.aIBatchProcessingJob.update({
    where: { id: job.id },
    data: { status: 'cancelled', completedAt: new Date() },
  });

  return NextResponse.json({ success: true, message: 'Batch cancellation requested' });
}
