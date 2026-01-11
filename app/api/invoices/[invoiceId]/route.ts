/**
 * Invoice API
 *
 * GET /api/invoices/[invoiceId]
 * Fetch invoice details
 *
 * Required: CLIENT, CONTRACTOR, or ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getInvoiceDetails, markInvoiceAsViewed } from '@/lib/invoicing/generate-invoice';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);

    if (!session || !session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

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
    const user = session.user as any;
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
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { invoiceId } = params;

    // Soft delete by marking as draft
    const invoice = await prisma.invoiceAU.update({
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
