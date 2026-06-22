// @ts-nocheck

/**
 * Job Documents API Route
 * POST /api/jobs/[id]/documents - Upload a document reference for a job
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { uploadDocumentSchema } from '@/lib/jobs';

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
    const validation = uploadDocumentSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    // Verify job exists
    const job = await db.job.findUnique({
      where: { id },
      select: { id: true, jobNumber: true },
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    const { name, url, type, size } = validation.data;

    const document = await db.jobDocument.create({
      data: {
        jobId: id,
        name,
        url,
        type,
        size,
      },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'UPLOAD_DOCUMENT',
        entityType: 'Job',
        entityId: id,
        performedBy: user.id,
        newValues: {
          documentId: document.id,
          documentName: name,
          jobNumber: job.jobNumber,
        } as Record<string, unknown>,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: document,
        message: `Document "${name}" uploaded to job ${job.jobNumber}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading document:', error);
    return NextResponse.json(
      { error: 'Error uploading document' },
      { status: 500 }
    );
  }
}
