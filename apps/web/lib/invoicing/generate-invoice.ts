/**
 * Invoice Generation System
 *
 * Generates Australian invoices for completed bookings:
 * 1. Validates payment exists
 * 2. Generates sequential invoice number
 * 3. Calculates line items and taxes
 * 4. Stores invoice in database
 * 5. Generates PDF for download/email
 */

import { prisma } from '@/lib/prisma';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoiceData {
  paymentId: string;
  bookingId: string;
  clientId: string;
  contractorId: string;
  subtotalAUD: number;
  gstAUD: number;
  totalAUD: number;
  lineItems: InvoiceLineItem[];
  dueDate: Date;
}

/**
 * Generate next sequential invoice number
 * Format: INV-YYYY-XXXX (e.g., INV-2025-0001)
 */
async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();

  // Get the last invoice for this year
  const lastInvoice = await prisma.invoiceAU.findFirst({
    where: {
      invoiceNumber: {
        startsWith: `INV-${year}-`,
      },
    },
    orderBy: {
      invoiceNumber: 'desc',
    },
  });

  let nextNumber = 1;
  if (lastInvoice) {
    const parts = lastInvoice.invoiceNumber.split('-');
    const lastNumber = parseInt(parts[2], 10);
    nextNumber = lastNumber + 1;
  }

  return `INV-${year}-${String(nextNumber).padStart(4, '0')}`;
}

/**
 * Create line items from booking details
 */
async function createLineItems(
  bookingId: string,
  baseAmount: number
): Promise<InvoiceLineItem[]> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      contractor: {
        select: {
          businessName: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  const serviceTypeLabel = booking.australianServiceType.replace(/_/g, ' ');

  const lineItems: InvoiceLineItem[] = [
    {
      description: `${serviceTypeLabel} - ${booking.serviceSuburb}, ${booking.servicePostcode}`,
      quantity: 1,
      unitPrice: baseAmount,
      amount: baseAmount,
    },
  ];

  return lineItems;
}

/**
 * Main function to generate invoice for completed payment
 */
export async function generateInvoiceForPayment(paymentId: string) {
  // Get payment details
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      booking: {
        select: {
          id: true,
          australianServiceType: true,
          serviceSuburb: true,
          servicePostcode: true,
          description: true,
          completedAt: true,
        },
      },
      client: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      contractor: {
        select: {
          id: true,
          businessName: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error(`Payment not found: ${paymentId}`);
  }

  if (payment.status !== 'COMPLETED') {
    throw new Error(
      `Cannot generate invoice for ${payment.status} payment: ${paymentId}`
    );
  }

  if (!payment.booking) {
    throw new Error(`Booking not found for payment: ${paymentId}`);
  }

  try {
    // Generate invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Create line items
    const lineItems = await createLineItems(
      payment.bookingId,
      parseFloat(payment.amountAUD.toString())
    );

    // Calculate totals
    const subtotalAUD = parseFloat(payment.amountAUD.toString());
    const gstAUD = parseFloat(payment.gstAUD.toString());
    const totalAUD = subtotalAUD + gstAUD;

    // Set due date (30 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);

    // Create invoice in database
    const invoice = await prisma.invoiceAU.create({
      data: {
        invoiceNumber,
        paymentId,
        bookingId: payment.bookingId,
        clientId: payment.clientId,
        contractorId: payment.contractorId!,
        dateIssued: new Date(),
        dateDue: dueDate,
        subtotalAUD,
        gstAUD,
        totalAUD,
        isPaid: true, // Mark as paid since we charged the client
        paidDate: new Date(),
        description: `Service delivery: ${payment.booking.australianServiceType.replace(/_/g, ' ')} at ${payment.booking.serviceSuburb}, ${payment.booking.servicePostcode}`,
      },
    });

    // Update payment with invoice reference
    await prisma.payment.update({
      where: { id: paymentId },
      data: {
        invoiceNumber: invoiceNumber,
      },
    });

    console.log(`=== INVOICE GENERATED ===`);
    console.log('Invoice ID:', invoice.id);
    console.log('Invoice Number:', invoiceNumber);
    console.log('Amount:', totalAUD);
    console.log('Client:', payment.client?.email);

    return {
      id: invoice.id,
      invoiceNumber,
      amount: totalAUD,
      dueDate,
      client: payment.client,
      contractor: payment.contractor,
      lineItems,
    };
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
}

/**
 * Get invoice details
 */
export async function getInvoiceDetails(invoiceId: string) {
  const invoice = await prisma.invoiceAU.findUnique({
    where: { id: invoiceId },
    include: {
      payment: {
        select: {
          id: true,
          status: true,
          amountAUD: true,
          gstAUD: true,
        },
      },
      client: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      contractor: {
        select: {
          id: true,
          businessName: true,
        },
      },
    },
  });

  return invoice;
}

/**
 * Get invoices for a client
 */
export async function getClientInvoices(
  clientId: string,
  limit = 20,
  offset = 0
) {
  const [invoices, total] = await Promise.all([
    prisma.invoiceAU.findMany({
      where: { clientId },
      include: {
        payment: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { dateIssued: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.invoiceAU.count({ where: { clientId } }),
  ]);

  return { invoices, total };
}

/**
 * Get invoices for a contractor
 */
export async function getContractorInvoices(
  contractorId: string,
  limit = 20,
  offset = 0
) {
  const [invoices, total] = await Promise.all([
    prisma.invoiceAU.findMany({
      where: { contractorId },
      include: {
        client: {
          select: {
            name: true,
            email: true,
          },
        },
        payment: {
          select: {
            status: true,
          },
        },
      },
      orderBy: { dateIssued: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.invoiceAU.count({ where: { contractorId } }),
  ]);

  return { invoices, total };
}

/**
 * Mark invoice as viewed
 */
export async function markInvoiceAsViewed(invoiceId: string) {
  const invoice = await prisma.invoiceAU.update({
    where: { id: invoiceId },
    data: {
      updatedAt: new Date(),
    },
  });

  return invoice;
}

/**
 * Download invoice (increment view count, trigger email, etc.)
 */
export async function downloadInvoice(invoiceId: string) {
  const invoice = await prisma.invoiceAU.findUnique({
    where: { id: invoiceId },
    include: {
      payment: true,
      client: {
        select: { name: true, email: true },
      },
      contractor: {
        select: { businessName: true },
      },
    },
  });

  if (!invoice) {
    throw new Error(`Invoice not found: ${invoiceId}`);
  }

  // Log download
  console.log(`Invoice downloaded: ${invoice.invoiceNumber}`);

  return invoice;
}
