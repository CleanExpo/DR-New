/**
 * Job Completion API Route
 * POST /api/jobs/[id]/complete - Mark a job as completed with hours, materials, cost
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { completeJobSchema } from '@/lib/jobs';
import { notifyJobCompleted } from '@/lib/notifications/job-notifications';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const validation = completeJobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    // Verify job exists and is in progress
    const job = await db.job.findUnique({
      where: { id },
      select: { id: true, status: true, jobNumber: true, contractorId: true, clientId: true, type: true, insuranceClaimId: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    if (job.status !== 'IN_PROGRESS' && job.status !== 'ASSIGNED') {
      return NextResponse.json(
        { error: `Cannot complete a job with status ${job.status}` },
        { status: 400 }
      );
    }

    const { hoursWorked, materialsUsed, actualCost, completedDate } = validation.data;

    const updatedJob = await db.job.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        hoursWorked,
        materialsUsed: materialsUsed ?? null,
        actualCost,
        completedDate: completedDate ? new Date(completedDate) : new Date(),
      },
      include: {
        property: {
          select: {
            id: true,
            streetAddress: true,
            suburb: true,
            state: true,
            postcode: true,
          },
        },
        contractor: {
          select: {
            id: true,
            businessName: true,
          },
        },
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'COMPLETE',
        entityType: 'Job',
        entityId: id,
        performedBy: user.id,
        newValues: {
          hoursWorked,
          materialsUsed,
          actualCost,
          jobNumber: job.jobNumber,
        } as Record<string, unknown>,
      },
    });

    // Notify property owner of completion (async, don't block response)
    notifyJobCompleted({
      id: updatedJob.id,
      jobNumber: job.jobNumber,
      type: job.type,
      clientId: job.clientId,
      insuranceClaimId: job.insuranceClaimId,
      hoursWorked,
      actualCost,
      contractor: updatedJob.contractor ? { businessName: updatedJob.contractor.businessName } : null,
      property: updatedJob.property,
    }).catch((err) => console.error('Job completed notification failed:', err));

    return NextResponse.json({
      success: true,
      data: updatedJob,
      message: `Job ${job.jobNumber} marked as completed`,
    });
  } catch (error) {
    console.error('Error completing job:', error);
    return NextResponse.json(
      { error: 'Error completing job' },
      { status: 500 }
    );
  }
}
