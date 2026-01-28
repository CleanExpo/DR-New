/**
 * Agent Job Status API Route
 * GET /api/agents/status/[jobId] - Get the status of an agent job
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getOrchestrator } from '@/lib/agents/core/orchestrator';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    // Check authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { jobId } = await params;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Job ID is required' },
        { status: 400 }
      );
    }

    // Get the orchestrator
    const orchestrator = getOrchestrator();

    // Get job status
    const status = await orchestrator.getJobStatus(jobId);

    return NextResponse.json({
      jobId,
      ...status,
    });
  } catch (error) {
    console.error('Job status check error:', error);

    // Check if it's a not found error
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json(
        { error: 'Not Found', message: `Job ${(await params).jobId} not found` },
        { status: 404 }
      );
    }

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
 * POST /api/agents/status/[jobId] - Cancel or resume a job
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    // Check authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { jobId } = await params;
    const body = await request.json();
    const { action } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Job ID is required' },
        { status: 400 }
      );
    }

    if (!action || !['cancel', 'resume'].includes(action)) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Action must be "cancel" or "resume"' },
        { status: 400 }
      );
    }

    // Get the orchestrator
    const orchestrator = getOrchestrator();

    if (action === 'cancel') {
      await orchestrator.cancelJob(jobId);
      return NextResponse.json({
        success: true,
        jobId,
        message: 'Job cancelled successfully',
      });
    }

    if (action === 'resume') {
      const result = await orchestrator.resumeJob(jobId);
      return NextResponse.json({
        success: result.status === 'COMPLETED',
        jobId: result.jobId,
        status: result.status,
        output: result.output,
        error: result.error,
      });
    }

    return NextResponse.json(
      { error: 'Bad Request', message: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Job action error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
