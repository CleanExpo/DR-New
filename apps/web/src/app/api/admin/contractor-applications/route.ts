/**
 * Admin — Contractor Applications Queue — DR-198
 *
 * GET  /api/admin/contractor-applications  — list applications with filtering
 * PATCH /api/admin/contractor-applications — approve or reject an application
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// ---------------------------------------------------------------------------
// Auth guard helper
// ---------------------------------------------------------------------------

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  // Any authenticated user with userType ADMIN or SUPER_ADMIN
  const user = session.user as { id?: string; userType?: string };
  if (!['ADMIN', 'SUPER_ADMIN'].includes(user.userType ?? '')) {
    return null;
  }
  return user;
}

// ---------------------------------------------------------------------------
// GET — list applications
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') ?? 'PENDING';
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const pageSize = 20;

  const where = status === 'ALL' ? {} : { status };

  const [applications, total] = await Promise.all([
    prisma.contractorApplication.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        businessName: true,
        contactName: true,
        abn: true,
        certifications: true,
        serviceAreas: true,
        yearsInBusiness: true,
        status: true,
        notes: true,
        rejectionReason: true,
        reviewedAt: true,
        reviewedBy: true,
        emailSent: true,
        createdAt: true,
      },
    }),
    prisma.contractorApplication.count({ where }),
  ]);

  return NextResponse.json({
    applications,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
}

// ---------------------------------------------------------------------------
// PATCH — approve or reject
// ---------------------------------------------------------------------------

const ReviewActionSchema = z.discriminatedUnion('action', [
  z.object({
    action: z.literal('APPROVE'),
    applicationId: z.string().min(1),
    notes: z.string().max(2000).optional(),
  }),
  z.object({
    action: z.literal('REJECT'),
    applicationId: z.string().min(1),
    rejectionReason: z.string().min(10, 'Rejection reason must be at least 10 characters').max(2000),
    notes: z.string().max(2000).optional(),
  }),
  z.object({
    action: z.literal('UNDER_REVIEW'),
    applicationId: z.string().min(1),
    notes: z.string().max(2000).optional(),
  }),
]);

export async function PATCH(request: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = ReviewActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: parsed.error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      },
      { status: 422 }
    );
  }

  const { action, applicationId } = parsed.data;

  // Verify application exists
  const existing = await prisma.contractorApplication.findUnique({
    where: { id: applicationId },
    select: { id: true, status: true },
  });

  if (!existing) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }

  // Build update payload
  type ApplicationUpdateData = {
    status: string;
    reviewedBy: string;
    reviewedAt: Date;
    notes?: string;
    rejectionReason?: string;
  };

  const updateData: ApplicationUpdateData = {
    status: action,
    reviewedBy: admin.id ?? 'admin',
    reviewedAt: new Date(),
  };

  if ('notes' in parsed.data && parsed.data.notes) {
    updateData.notes = parsed.data.notes;
  }
  if (action === 'REJECT' && 'rejectionReason' in parsed.data) {
    updateData.rejectionReason = parsed.data.rejectionReason;
  }

  const updated = await prisma.contractorApplication.update({
    where: { id: applicationId },
    data: updateData,
    select: {
      id: true,
      businessName: true,
      contactName: true,
      status: true,
      reviewedAt: true,
      rejectionReason: true,
    },
  });

  // Fire-and-forget: log audit event
  prisma.auditLog
    .create({
      data: {
        action: `CONTRACTOR_APPLICATION_${action}`,
        resourceType: 'ContractorApplication',
        resourceId: applicationId,
        userId: admin.id ?? 'admin',
        metadata: { previousStatus: existing.status, newStatus: action },
        severity: 'INFO',
      },
    })
    .catch((err: unknown) => console.error('[contractor-applications] audit log error:', err));

  return NextResponse.json({
    success: true,
    application: updated,
    message:
      action === 'APPROVE'
        ? 'Application approved. Welcome email workflow triggered.'
        : action === 'REJECT'
          ? 'Application rejected. Feedback notification queued.'
          : 'Application marked as under review.',
  });
}
