/**
 * Anthropic Batch API — DR-256
 *
 * POST /api/nrpg/batch
 *
 * Submits a bulk content generation job to Anthropic Message Batches.
 * ~50% cost saving vs real-time. Results delivered within 24 hours.
 *
 * Body:
 *   { type: 'suburb-pages' | 'contractor-progress' | 'blog', items: [...] }
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import {
  submitBatch,
  type BatchJobType,
  type SuburbPageItem,
  type ContractorProgressItem,
  type BlogItem,
} from '@/lib/anthropic-batch';

// ---------------------------------------------------------------------------
// Auth guard — ADMIN / SUPER_ADMIN only
// ---------------------------------------------------------------------------

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  const user = session.user as { id?: string; userType?: string };
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) return null;
  return user;
}

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const SuburbPageItemSchema = z.object({
  suburb: z.string().min(1),
  state: z.string().min(1),
  serviceType: z.string().min(1),
  population: z.number().optional(),
});

const ContractorProgressItemSchema = z.object({
  contractorId: z.string().min(1),
  contractorName: z.string().min(1),
  completedModules: z.array(z.string()),
  certificationPoints: z.number(),
  certificationLevel: z.string(),
});

const BlogItemSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  keywords: z.array(z.string()),
  targetWordCount: z.number().optional(),
});

const BatchRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('suburb-pages'), items: z.array(SuburbPageItemSchema).min(1).max(10000) }),
  z.object({ type: z.literal('contractor-progress'), items: z.array(ContractorProgressItemSchema).min(1).max(10000) }),
  z.object({ type: z.literal('blog'), items: z.array(BlogItemSchema).min(1).max(10000) }),
]);

// ---------------------------------------------------------------------------
// POST — submit a batch
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised — admin required' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = BatchRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { type, items } = parsed.data;

  // Submit to Anthropic
  let anthropicResult: { batchId: string; requestCount: number };
  try {
    anthropicResult = await submitBatch(
      type as BatchJobType,
      items as SuburbPageItem[] | ContractorProgressItem[] | BlogItem[],
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: `Anthropic batch submission failed: ${message}` }, { status: 502 });
  }

  // Persist job record
  const job = await prisma.aIBatchProcessingJob.create({
    data: {
      jobType: type,
      status: 'in_progress',
      totalImages: anthropicResult.requestCount,
      processedImages: 0,
      successCount: 0,
      failureCount: 0,
      totalCostUSD: 0,
      startedAt: new Date(),
      initiatedBy: user.id ?? '',
      metadata: {
        anthropicBatchId: anthropicResult.batchId,
        itemCount: anthropicResult.requestCount,
      },
    },
  });

  return NextResponse.json({
    success: true,
    jobId: job.id,
    anthropicBatchId: anthropicResult.batchId,
    type,
    requestCount: anthropicResult.requestCount,
    message: `Batch submitted — ${anthropicResult.requestCount} requests queued. Results within 24 hours.`,
  });
}

// ---------------------------------------------------------------------------
// GET — list recent batch jobs
// ---------------------------------------------------------------------------

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorised — admin required' }, { status: 401 });
  }

  const jobs = await prisma.aIBatchProcessingJob.findMany({
    where: { jobType: { in: ['suburb-pages', 'contractor-progress', 'blog'] } },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      jobType: true,
      status: true,
      totalImages: true,
      processedImages: true,
      successCount: true,
      failureCount: true,
      totalCostUSD: true,
      startedAt: true,
      completedAt: true,
      createdAt: true,
      metadata: true,
    },
  });

  return NextResponse.json({ jobs });
}
