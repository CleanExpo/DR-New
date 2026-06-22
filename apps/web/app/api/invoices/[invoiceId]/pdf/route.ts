/**
 * Invoice PDF Download API
 *
 * GET /api/invoices/[invoiceId]/pdf
 * Download invoice as PDF file
 *
 * Required: CLIENT, CONTRACTOR, or ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { getInvoiceDetails, downloadInvoice } from '@/lib/invoicing/generate-invoice';
import { generateInvoicePDF } from '@/lib/invoicing/pdf-generator';

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
    const invoice = await getInvoiceDetails(invoiceId, db);

    if (!invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Verify user has access (client, contractor, or admin)
    if (
      user.userType !== 'ADMIN' &&
      invoice.clientId !== user.id &&
      invoice.contractorId !== user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden - You do not have access to this invoice' },
        { status: 403 }
      );
    }

    // Log download
    await downloadInvoice(invoiceId, db);

    // Prepare PDF data
    const pdfData = {
      invoiceNumber: invoice.invoiceNumber,
      dateIssued: invoice.dateIssued,
      dateDue: invoice.dateDue,
      clientName: invoice.client.name || 'Client',
      clientEmail: invoice.client.email,
      clientAddress: undefined,
      contractorName: invoice.contractor.businessName,
      contractorABN: undefined,
      serviceDescription: 'Disaster Recovery Services',
      location: 'Australia',
      lineItems: [
        {
          description: invoice.description,
          quantity: 1,
          unitPrice: parseFloat(invoice.subtotalAUD.toString()),
          amount: parseFloat(invoice.subtotalAUD.toString()),
        },
      ],
      subtotal: parseFloat(invoice.subtotalAUD.toString()),
      gstAmount: parseFloat(invoice.gstAUD.toString()),
      total: parseFloat(invoice.totalAUD.toString()),
      paymentMethod: invoice.payment?.status === 'COMPLETED' ? 'Credit Card (Processed)' : 'Pending',
      notes: 'Thank you for your business!',
    };

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(pdfData);

    // Return PDF file
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${invoice.invoiceNumber}.pdf"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return NextResponse.json(
      {
        error: 'Failed to generate PDF',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
