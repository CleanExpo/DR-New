/**
 * Xero Invoices List
 *
 * GET /api/xero/invoices
 * Returns a list of invoices from Xero with status breakdown.
 *
 * Query params:
 *   ?status=AUTHORISED|PAID|DRAFT|VOIDED (optional filter)
 *   ?page=1 (optional pagination)
 *
 * Required: ADMIN role
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getXeroClient, loadXeroTokens } from '@/lib/xero/client';
import { Invoice } from 'xero-node';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const xeroTenantId = await loadXeroTokens();
    if (!xeroTenantId) {
      return NextResponse.json(
        { error: 'Xero not connected', connected: false },
        { status: 401 }
      );
    }

    const xero = getXeroClient();
    const { searchParams } = new URL(request.url);
    const statusFilter = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1', 10);

    const where = statusFilter ? `Status=="${statusFilter}"` : undefined;

    const invoicesResponse = await xero.accountingApi.getInvoices(
      xeroTenantId,
      undefined, // ifModifiedSince
      where,
      'Date DESC', // order
      undefined, // ids
      undefined, // invoiceNumbers
      undefined, // contactIDs
      undefined, // statuses
      page,
      undefined, // includeArchived
      undefined, // createdByMyApp
      undefined, // unitdp
      undefined, // summaryOnly
    );

    const invoices = invoicesResponse.body.invoices || [];

    // Calculate summary stats
    const summary = {
      total: invoices.length,
      totalAmount: 0,
      totalOutstanding: 0,
      byStatus: {} as Record<string, { count: number; amount: number }>,
    };

    invoices.forEach((inv: Invoice) => {
      const amount = inv.total || 0;
      const outstanding = inv.amountDue || 0;
      const status = inv.status || 'UNKNOWN';

      summary.totalAmount += amount;
      summary.totalOutstanding += outstanding;

      if (!summary.byStatus[status]) {
        summary.byStatus[status] = { count: 0, amount: 0 };
      }
      summary.byStatus[status].count++;
      summary.byStatus[status].amount += amount;
    });

    return NextResponse.json({
      success: true,
      connected: true,
      invoices: invoices.map((inv: Invoice) => ({
        invoiceId: inv.invoiceID,
        invoiceNumber: inv.invoiceNumber,
        reference: inv.reference,
        type: inv.type,
        status: inv.status,
        contact: inv.contact?.name,
        date: inv.date,
        dueDate: inv.dueDate,
        total: inv.total,
        amountDue: inv.amountDue,
        amountPaid: inv.amountPaid,
        currencyCode: inv.currencyCode,
      })),
      summary,
      page,
    });
  } catch (error) {
    console.error('Xero invoices error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch Xero invoices' },
      { status: 500 }
    );
  }
}
