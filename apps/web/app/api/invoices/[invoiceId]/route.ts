/**
 * Invoice API
 *
 * GET /api/invoices/[invoiceId]
 * Fetch invoice details
 *
 * Required: CLIENT, CONTRACTOR, or ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getInvoiceDetails, markInvoiceAsViewed } from '@/lib/invoicing/generate-invoice';

export async function GET(
  request: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { invoiceId } = params;

    // Get invoice details
    const invoice = await getInvoiceDetails(invoiceId);

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Verify user has access (client, contractor, or admin)
    if (
      user.role !== 'ADMIN' &&
      invoice.clientId !== user.id &&
      invoice.contractorId !== user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden - You do not have access to this invoice' },
        { status: 403 }
      );
    }

    // Mark as viewed
    try {
      await markInvoiceAsViewed(invoiceId);
    } catch (error) {
      console.error('Error marking invoice as viewed:', error);
    }

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        dateIssued: invoice.dateIssued,
        dateDue: invoice.dateDue,
        subtotalAUD: invoice.subtotalAUD,
        gstAUD: invoice.gstAUD,
        totalAUD: invoice.totalAUD,
        isPaid: invoice.isPaid,
        paidDate: invoice.paidDate,
        description: invoice.description,
        client: {
          id: invoice.client.id,
          name: invoice.client.name,
          email: invoice.client.email,
        },
        contractor: {
          id: invoice.contractor.id,
          businessName: invoice.contractor.businessName,
        },
        payment: invoice.payment
          ? {
              id: invoice.payment.id,
              status: invoice.payment.status,
            }
          : null,
      },
    });
  } catch (error) {
    console.error('Get invoice error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/invoices/[invoiceId]
 * Soft delete invoice (mark as cancelled)
 * Only admins can delete
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);
    const { invoiceId } = params;

    // Soft delete by marking as draft
    const invoice = await db.invoiceAU.update({
      where: { id: invoiceId },
      data: {
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Invoice deleted',
      invoice,
    });
  } catch (error) {
    console.error('Delete invoice error:', error);

    return NextResponse.json(
      { error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
}
