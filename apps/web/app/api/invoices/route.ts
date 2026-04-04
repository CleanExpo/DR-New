// @ts-nocheck
/**
 * Invoices List API
 *
 * GET /api/invoices
 * Get all invoices for the authenticated user
 *
 * Query params:
 * - limit: number (default: 20)
 * - offset: number (default: 0)
 * - status: DRAFT | SENT | VIEWED | PAID (optional)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const isPaid = searchParams.get('isPaid');

    // Build where clause based on user role
    const where: any = {};

    if (user.role === 'USER') {
      // Clients can see invoices they're on
      where.clientId = user.id;
    } else if (user.role === 'CONTRACTOR') {
      // Contractors can see invoices they're on
      where.contractorId = user.id;
    }
    // Admins can see all invoices

    if (isPaid !== null) {
      where.isPaid = isPaid === 'true';
    }

    // Get paginated invoices
    const [invoices, total] = await Promise.all([
      db.invoiceAU.findMany({
        where,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          contractor: {
            select: {
              id: true,
              businessName: true,
            },
          },
          payment: {
            select: {
              id: true,
              status: true,
            },
          },
        },
        orderBy: {
          dateIssued: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      db.invoiceAU.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      invoices: invoices.map((invoice) => ({
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        dateIssued: invoice.dateIssued,
        dateDue: invoice.dateDue,
        totalAUD: invoice.totalAUD,
        isPaid: invoice.isPaid,
        paidDate: invoice.paidDate,
        client: invoice.client,
        contractor: invoice.contractor,
        payment: invoice.payment,
      })),
      pagination: {
        limit,
        offset,
        total,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error('Get invoices error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    );
  }
}
