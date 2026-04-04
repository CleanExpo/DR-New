// @ts-nocheck
/**
 * Single Job API Route
 * GET   /api/jobs/[id] - Get job detail with all relations
 * PATCH /api/jobs/[id] - Update job status, notes, costs
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { updateJobSchema } from '@/lib/jobs';
import { notifyWorkStarted } from '@/lib/notifications/job-notifications';

// ============================================================================
// GET /api/jobs/[id] - Get single job with all relations
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { id } = await params;
    const db = getTenantDb(authResult.context);

    const job = await db.job.findUnique({
      where: { id },
      include: {
        property: {
          select: {
            id: true,
            streetAddress: true,
            suburb: true,
            state: true,
            postcode: true,
            propertyType: true,
          },
        },
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            completedJobs: true,
            isVerified: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        documents: {
          orderBy: { createdAt: 'desc' },
        },
        photos: {
          orderBy: { takenAt: 'desc' },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Error fetching job' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH /api/jobs/[id] - Update job
// ============================================================================

export async function PATCH(
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
    const validation = updateJobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    // Check job exists
    const existingJob = await db.job.findUnique({
      where: { id },
      select: { id: true, status: true },
    });

    if (!existingJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    const updateData: Record<string, unknown> = {};
    const { status, notes, estimatedCost, actualCost, scheduledDate } = validation.data;

    if (status !== undefined) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (estimatedCost !== undefined) updateData.estimatedCost = estimatedCost;
    if (actualCost !== undefined) updateData.actualCost = actualCost;
    if (scheduledDate !== undefined) updateData.scheduledDate = new Date(scheduledDate);

    const job = await db.job.update({
      where: { id },
      data: updateData,
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
            isVerified: true,
          },
        },
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Job',
        entityId: id,
        performedBy: user.id,
        oldValues: { status: existingJob.status } as Record<string, unknown>,
        newValues: updateData as Record<string, unknown>,
      },
    });

    // Notify property owner when work starts (async, don't block response)
    if (status === 'IN_PROGRESS' && existingJob.status !== 'IN_PROGRESS') {
      notifyWorkStarted({
        id: job.id,
        jobNumber: job.jobNumber,
        type: job.type,
        clientId: job.clientId,
        contractor: job.contractor ? { businessName: job.contractor.businessName } : null,
        property: job.property,
      }).catch((err) => console.error('Work started notification failed:', err));
    }

    return NextResponse.json({
      success: true,
      data: job,
      message: 'Job updated successfully',
    });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Error updating job' },
      { status: 500 }
    );
  }
}
