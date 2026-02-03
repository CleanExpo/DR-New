/**
 * Manual Contractor Matching Trigger Endpoint
 *
 * Admin/debug endpoint to manually trigger contractor matching for a claim.
 * Useful for:
 * - Re-running matching for existing claims
 * - Testing matching algorithm
 * - Recovery from failed matching jobs
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { z } from 'zod';
import { basePrisma } from '@/lib/prisma';
import { createJob, getJobStatus } from '@/lib/queue/background-jobs';
import { getStateFromPostcode } from '@/src/lib/validation/australia';

// Request validation schema
const triggerRequestSchema = z.object({
  claimId: z.string().cuid(),
  force: z.boolean().optional().default(false), // Force re-match even if already matched
});

/**
 * POST /api/jobs/contractor-matching
 * Manually trigger contractor matching for a claim
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate request (admin only)
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Parse and validate request body
    const body = await request.json();
    const validationResult = triggerRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Invalid request body',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { claimId, force } = validationResult.data;

    // 1. Load claim from database
    const claim = await basePrisma.publicClaim.findUnique({
      where: { id: claimId },
      select: {
        id: true,
        disasterType: true,
        suburb: true,
        postcode: true,
        priority: true,
        status: true,
        hasInsurance: true,
        tenantId: true,
        contractorMatches: {
          select: {
            id: true,
            notificationStatus: true,
          },
        },
      },
    });

    if (!claim) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: `Claim ${claimId} not found`,
        },
        { status: 404 }
      );
    }

    // 2. Check if already matched (unless force=true)
    if (!force && claim.contractorMatches.length > 0) {
      return NextResponse.json(
        {
          error: 'Already Matched',
          message: 'Claim already has contractor matches. Use force=true to re-match.',
          existingMatches: claim.contractorMatches.length,
          status: claim.status,
        },
        { status: 409 }
      );
    }

    // 3. Delete existing matches if forcing re-match
    if (force && claim.contractorMatches.length > 0) {
      await basePrisma.contractorMatch.deleteMany({
        where: { claimId },
      });

      console.log(
        `[Manual Matching] Deleted ${claim.contractorMatches.length} existing matches for claim ${claimId}`
      );
    }

    // 4. Extract state from postcode
    const state = getStateFromPostcode(claim.postcode) || 'NSW';

    // 5. Determine urgency from priority
    const urgency =
      claim.priority === 'Critical'
        ? 'emergency'
        : claim.priority === 'High'
        ? 'urgent'
        : 'standard';

    // 6. Create contractor matching job
    const matchingJob = await createJob(
      'CONTRACTOR_MATCHING',
      {
        claimId: claim.id,
        criteria: {
          serviceType: claim.disasterType,
          location: {
            state,
            suburb: claim.suburb,
            postcode: claim.postcode,
          },
          urgency,
          specialRequirements: claim.hasInsurance ? ['insurance'] : [],
        },
      },
      {
        priority: claim.priority === 'Critical' ? 1 : claim.priority === 'High' ? 3 : 5,
        claimId: claim.id,
        tenantId: claim.tenantId || undefined,
        initiatedBy: user.id,
      }
    );

    if (!matchingJob.success) {
      return NextResponse.json(
        {
          error: 'Job Creation Failed',
          message: matchingJob.error || 'Failed to create matching job',
        },
        { status: 500 }
      );
    }

    console.log(`[Manual Matching] Created job ${matchingJob.jobId} for claim ${claimId}`);

    // 7. Return job information
    return NextResponse.json(
      {
        success: true,
        message: 'Contractor matching job created',
        jobId: matchingJob.jobId,
        claimId,
        status: matchingJob.status,
        criteria: {
          serviceType: claim.disasterType,
          location: `${claim.suburb}, ${state} ${claim.postcode}`,
          urgency,
          priority: claim.priority,
        },
        forced: force && claim.contractorMatches.length > 0,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Manual contractor matching error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/jobs/contractor-matching?jobId={jobId}
 * Check status of a contractor matching job
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'jobId query parameter is required',
        },
        { status: 400 }
      );
    }

    // Get job status
    const job = await getJobStatus(jobId);

    if (!job) {
      return NextResponse.json(
        {
          error: 'Not Found',
          message: `Job ${jobId} not found`,
        },
        { status: 404 }
      );
    }

    // Return job status and results
    return NextResponse.json({
      success: true,
      job: {
        id: job.id,
        jobType: job.jobType,
        status: job.status,
        priority: job.priority,
        attemptCount: job.attemptCount,
        maxAttempts: job.maxAttempts,
        scheduledFor: job.scheduledFor,
        startedAt: job.startedAt,
        completedAt: job.completedAt,
        claimId: job.claimId,
        input: job.input,
        output: job.output,
        lastError: job.lastError,
        errorStack: job.errorStack,
        nextRetryAt: job.nextRetryAt,
      },
    });
  } catch (error) {
    console.error('Job status check error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
