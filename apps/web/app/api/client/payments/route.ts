/**
 * Client Payments API
 *
 * GET /api/client/payments
 * Fetch all payments made by client
 *
 * Query params:
 * - limit: number (default: 20)
 * - offset: number (default: 0)
 * - status: PENDING | PROCESSING | COMPLETED | FAILED (optional)
 *
 * Required: CLIENT (own payments only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { checkResourceAccess } from '@/lib/services/authorization.service';

export async function GET(request: NextRequest) {
  try {
    // Authenticate and get tenant context
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Verify user role is CLIENT (resource-level authorization)
    if (user.userType !== 'CLIENT' && user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - insufficient permissions' },
        { status: 403 }
      );
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status');

    const clientId = user.id;

    // Build where clause
    const where: any = { clientId };
    if (status) {
      where.status = status;
    }

    // Get paginated payments with related data - automatically tenant-scoped
    const [payments, total] = await Promise.all([
      db.payment.findMany({
        where,
        include: {
          booking: {
            select: {
              id: true,
              australianServiceType: true,
              serviceSuburb: true,
              servicePostcode: true,
              completedAt: true,
            },
          },
          contractor: {
            select: {
              id: true,
              businessName: true,
            },
          },
          auInvoice: {
            select: {
              id: true,
              invoiceNumber: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      db.payment.count({ where }),
    ]);

    // Calculate summary statistics
    const totalSpent = payments.reduce(
      (sum, p) =>
        sum +
        (p.status === 'COMPLETED'
          ? parseFloat(p.amountAUD.toString()) +
            parseFloat(p.gstAUD.toString())
          : 0),
      0
    );

    const completedCount = payments.filter(p => p.status === 'COMPLETED').length;
    const pendingCount = payments.filter(p => p.status === 'PENDING' || p.status === 'PROCESSING').length;

    return NextResponse.json({
      success: true,
      payments: payments.map((payment) => ({
        id: payment.id,
        status: payment.status,
        amount: parseFloat(payment.amountAUD.toString()),
        gst: parseFloat(payment.gstAUD.toString()),
        total: parseFloat(payment.amountAUD.toString()) + parseFloat(payment.gstAUD.toString()),
        processedAt: payment.processedAt,
        createdAt: payment.createdAt,
        booking: payment.booking
          ? {
              id: payment.booking.id,
              serviceType: payment.booking.australianServiceType,
              location: `${payment.booking.serviceSuburb}, ${payment.booking.servicePostcode}`,
              completedAt: payment.booking.completedAt,
            }
          : null,
        contractor: payment.contractor
          ? {
              id: payment.contractor.id,
              businessName: payment.contractor.businessName,
            }
          : null,
        invoice: payment.auInvoice
          ? {
              id: payment.auInvoice.id,
              invoiceNumber: payment.auInvoice.invoiceNumber,
            }
          : null,
      })),
      summary: {
        totalSpent,
        totalPayments: total,
        completedCount,
        pendingCount,
        averagePayment: total > 0 ? totalSpent / completedCount : 0,
      },
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Get client payments error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}
