/**
 * Xero Overdue Invoice Alerts
 *
 * GET /api/xero/overdue
 * Returns overdue invoices from Xero for dashboard alerts.
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
    const today = new Date().toISOString().split('T')[0];

    // Fetch overdue invoices: AUTHORISED (unpaid) with dueDate before today
    const invoicesResponse = await xero.accountingApi.getInvoices(
      xeroTenantId,
      undefined, // ifModifiedSince
      `Status=="AUTHORISED" AND DueDate<DateTime(${today.replace(/-/g, ',')})`,
      'DueDate ASC',
    );

    const overdueInvoices = invoicesResponse.body.invoices || [];

    const totalOverdue = overdueInvoices.reduce(
      (sum: number, inv: Invoice) => sum + (inv.amountDue || 0),
      0
    );

    // Categorise by days overdue
    const now = new Date();
    const categorised = {
      lessThan30Days: [] as any[],
      thirtyTo60Days: [] as any[],
      sixtyTo90Days: [] as any[],
      over90Days: [] as any[],
    };

    overdueInvoices.forEach((inv: Invoice) => {
      const dueDate = inv.dueDate ? new Date(inv.dueDate) : now;
      const daysOverdue = Math.floor(
        (now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      const item = {
        invoiceId: inv.invoiceID,
        invoiceNumber: inv.invoiceNumber,
        contact: inv.contact?.name,
        amountDue: inv.amountDue,
        dueDate: inv.dueDate,
        daysOverdue,
      };

      if (daysOverdue < 30) {
        categorised.lessThan30Days.push(item);
      } else if (daysOverdue < 60) {
        categorised.thirtyTo60Days.push(item);
      } else if (daysOverdue < 90) {
        categorised.sixtyTo90Days.push(item);
      } else {
        categorised.over90Days.push(item);
      }
    });

    return NextResponse.json({
      success: true,
      connected: true,
      overdue: {
        count: overdueInvoices.length,
        totalAmount: totalOverdue,
        categorised,
      },
    });
  } catch (error) {
    console.error('Xero overdue invoices error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch overdue invoices' },
      { status: 500 }
    );
  }
}
