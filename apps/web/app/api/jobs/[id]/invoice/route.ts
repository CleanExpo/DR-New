// @ts-nocheck
/**
 * Job Invoice API Route
 * POST /api/jobs/[id]/invoice - Generate an invoice from completed job data
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { notifyInvoiceGenerated } from '@/lib/notifications/job-notifications';

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

    // Get job with full details
    const job = await db.job.findUnique({
      where: { id },
      include: {
        property: {
          select: {
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
            abnNumber: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    if (job.status !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Job must be completed before generating an invoice' },
        { status: 400 }
      );
    }

    if (!job.contractorId || !job.contractor) {
      return NextResponse.json(
        { error: 'Job must have an assigned contractor to generate an invoice' },
        { status: 400 }
      );
    }

    if (!job.actualCost) {
      return NextResponse.json(
        { error: 'Job must have an actual cost recorded to generate an invoice' },
        { status: 400 }
      );
    }

    // Calculate GST (10% in Australia)
    const subtotal = Number(job.actualCost);
    const gst = Math.round(subtotal * 0.1 * 100) / 100;
    const total = subtotal + gst;

    // Build invoice data
    const address = job.property
      ? `${job.property.streetAddress}, ${job.property.suburb}, ${job.property.state} ${job.property.postcode}`
      : 'N/A';

    const invoiceData = {
      jobId: job.id,
      jobNumber: job.jobNumber,
      jobType: job.type,
      contractor: {
        name: job.contractor.businessName,
        abn: job.contractor.abnNumber,
      },
      property: address,
      hoursWorked: job.hoursWorked ? Number(job.hoursWorked) : null,
      materialsUsed: job.materialsUsed,
      completedDate: job.completedDate,
      lineItems: [
        {
          description: `${job.type.charAt(0).toUpperCase() + job.type.slice(1)} restoration services`,
          amount: subtotal,
        },
        ...(job.hoursWorked
          ? [{ description: `Labour: ${Number(job.hoursWorked)} hours`, amount: 0 }]
          : []),
        ...(job.materialsUsed
          ? [{ description: `Materials: ${job.materialsUsed}`, amount: 0 }]
          : []),
      ],
      subtotalAUD: subtotal,
      gstAUD: gst,
      totalAUD: total,
    };

    // Update job status to INVOICED
    await db.job.update({
      where: { id },
      data: { status: 'INVOICED' },
    });

    // Audit log
    await db.auditLog.create({
      data: {
        action: 'GENERATE_INVOICE',
        entityType: 'Job',
        entityId: id,
        performedBy: user.id,
        newValues: {
          jobNumber: job.jobNumber,
          totalAUD: total,
          gstAUD: gst,
        } as Record<string, unknown>,
      },
    });

    // Notify property owner of invoice (async, don't block response)
    notifyInvoiceGenerated({
      id: job.id,
      jobNumber: job.jobNumber,
      type: job.type,
      clientId: job.clientId,
      contractor: job.contractor ? { businessName: job.contractor.businessName } : null,
      subtotalAUD: subtotal,
      gstAUD: gst,
      totalAUD: total,
    }).catch((err) => console.error('Invoice notification failed:', err));

    return NextResponse.json({
      success: true,
      data: invoiceData,
      message: `Invoice generated for job ${job.jobNumber}`,
    });
  } catch (error) {
    console.error('Error generating invoice:', error);
    return NextResponse.json(
      { error: 'Error generating invoice' },
      { status: 500 }
    );
  }
}
