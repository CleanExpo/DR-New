// @ts-nocheck
/**
 * Jobs API Route
 * GET  /api/jobs - List jobs with filters (status, type, contractorId, dateFrom, dateTo)
 * POST /api/jobs - Create a new emergency job with auto-generated jobNumber
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { generateJobNumber, createJobSchema } from '@/lib/jobs';
import { notifyJobCreated } from '@/lib/notifications/job-notifications';
import { JobStatus } from '@prisma/client';

// ============================================================================
// GET /api/jobs - List jobs with filtering and pagination
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const contractorId = searchParams.get('contractorId');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const search = searchParams.get('search');

    const offset = (page - 1) * limit;

    // Build filter
    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status as JobStatus;
    }
    if (type) {
      where.type = type;
    }
    if (contractorId) {
      where.contractorId = contractorId;
    }
    if (dateFrom || dateTo) {
      where.createdAt = {
        ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
        ...(dateTo ? { lte: new Date(dateTo) } : {}),
      };
    }
    if (search) {
      where.OR = [
        { jobNumber: { contains: search, mode: 'insensitive' } },
        { notes: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [jobs, total] = await Promise.all([
      db.job.findMany({
        where,
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
              averageRating: true,
              isVerified: true,
            },
          },
          _count: {
            select: {
              documents: true,
              photos: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      db.job.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json(
      { error: 'Error fetching jobs' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST /api/jobs - Create new job
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const validation = createJobSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const { type, propertyId, estimatedCost, scheduledDate, notes, insuranceClaimId } =
      validation.data;

    // Verify property exists
    const property = await db.clientProperty.findUnique({
      where: { id: propertyId },
      select: { id: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }

    // Generate unique job number
    const jobNumber = await generateJobNumber();

    const job = await db.job.create({
      data: {
        jobNumber,
        type,
        propertyId,
        clientId: user.id,
        estimatedCost: estimatedCost ?? null,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        notes: notes ?? null,
        insuranceClaimId: insuranceClaimId ?? null,
        status: 'PENDING',
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
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Job',
        entityId: job.id,
        performedBy: user.id,
        newValues: { jobNumber, type, propertyId } as Record<string, unknown>,
      },
    });

    // Notify property owner (async, don't block response)
    notifyJobCreated({
      id: job.id,
      jobNumber: job.jobNumber,
      type: job.type,
      clientId: user.id,
      estimatedCost: estimatedCost,
      property: job.property,
    }).catch((err) => console.error('Job created notification failed:', err));

    return NextResponse.json(
      {
        success: true,
        data: job,
        message: `Job ${jobNumber} created successfully`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Error creating job' },
      { status: 500 }
    );
  }
}
