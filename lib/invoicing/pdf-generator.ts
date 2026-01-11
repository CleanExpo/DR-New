/**
 * Invoice PDF Generator
 *
 * Generates professional Australian invoices in PDF format
 * Uses jsPDF library for PDF creation
 *
 * Install: npm install jspdf
 */

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export interface InvoicePDFData {
  invoiceNumber: string;
  dateIssued: Date;
  dateDue: Date;
  clientName: string;
  clientEmail: string;
  clientAddress?: string;
  contractorName: string;
  contractorABN?: string;
  serviceDescription: string;
  location: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
  }>;
  subtotal: number;
  gstAmount: number;
  total: number;
  paymentMethod?: string;
  notes?: string;
}

/**
 * Generate professional Australian invoice PDF
 */
export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  // Create PDF document (A4, mm, AUD currency)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 10;

  // ============================================================================
  // HEADER
  // ============================================================================

  // Company header background (light blue)
  doc.setFillColor(240, 247, 255);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Company name and details
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Disaster Recovery Australia', 15, 15);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('ABN: 12 345 678 901', 15, 22);
  doc.text('Email: support@disasterrecovery.com.au', 15, 26);
  doc.text('Phone: 1800-RECOVERY', 15, 30);

  // Invoice title and number
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('INVOICE', pageWidth - 15, 15, { align: 'right' });

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Invoice #: ${data.invoiceNumber}`, pageWidth - 15, 22, { align: 'right' });
  doc.text(`Date: ${formatDate(data.dateIssued)}`, pageWidth - 15, 26, { align: 'right' });
  doc.text(`Due: ${formatDate(data.dateDue)}`, pageWidth - 15, 30, { align: 'right' });

  yPosition = 40;

  // ============================================================================
  // BILLING INFORMATION
  // ============================================================================

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('BILL TO:', 15, yPosition);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  yPosition += 6;
  doc.text(data.clientName, 15, yPosition);
  yPosition += 5;
  if (data.clientAddress) {
    doc.text(data.clientAddress, 15, yPosition);
    yPosition += 5;
  }
  doc.text(data.clientEmail, 15, yPosition);

  // Service provider info
  yPosition = 40;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('FROM:', pageWidth / 2 + 15, yPosition);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  yPosition += 6;
  doc.text(data.contractorName, pageWidth / 2 + 15, yPosition);
  if (data.contractorABN) {
    yPosition += 5;
    doc.text(`ABN: ${data.contractorABN}`, pageWidth / 2 + 15, yPosition);
  }

  yPosition = 70;

  // ============================================================================
  // SERVICE DESCRIPTION
  // ============================================================================

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('SERVICE DESCRIPTION:', 15, yPosition);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  yPosition += 6;
  doc.text(`Type: ${data.serviceDescription}`, 15, yPosition);
  yPosition += 5;
  doc.text(`Location: ${data.location}`, 15, yPosition);

  yPosition = 95;

  // ============================================================================
  // LINE ITEMS TABLE
  // ============================================================================

  const columns = ['Description', 'Qty', 'Unit Price', 'Amount'];
  const rows = data.lineItems.map((item) => [
    item.description,
    item.quantity.toString(),
    `$${item.unitPrice.toFixed(2)}`,
    `$${item.amount.toFixed(2)}`,
  ]);

  (doc as any).autoTable({
    head: [columns],
    body: rows,
    startY: yPosition,
    margin: { left: 15, right: 15 },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'left',
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [0, 0, 0],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    columnStyles: {
      0: { halign: 'left' },
      1: { halign: 'right', cellWidth: 15 },
      2: { halign: 'right' },
      3: { halign: 'right' },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 10;

  // ============================================================================
  // TOTALS
  // ============================================================================

  // Draw totals section
  const totalBoxX = pageWidth - 70;
  const totalBoxWidth = 55;

  doc.setDrawColor(200, 200, 200);
  doc.rect(totalBoxX, yPosition, totalBoxWidth, 8);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Subtotal:', totalBoxX + 2, yPosition + 6);
  doc.text(`$${data.subtotal.toFixed(2)}`, totalBoxX + totalBoxWidth - 2, yPosition + 6, {
    align: 'right',
  });

  yPosition += 9;
  doc.rect(totalBoxX, yPosition, totalBoxWidth, 8);
  doc.text('GST (10%):', totalBoxX + 2, yPosition + 6);
  doc.text(`$${data.gstAmount.toFixed(2)}`, totalBoxX + totalBoxWidth - 2, yPosition + 6, {
    align: 'right',
  });

  yPosition += 9;
  doc.setFillColor(59, 130, 246);
  doc.rect(totalBoxX, yPosition, totalBoxWidth, 10, 'F');

  doc.setFont('Helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('TOTAL DUE:', totalBoxX + 2, yPosition + 7);
  doc.text(`$${data.total.toFixed(2)}`, totalBoxX + totalBoxWidth - 2, yPosition + 7, {
    align: 'right',
  });

  yPosition += 15;
  doc.setTextColor(0, 0, 0);

  // ============================================================================
  // PAYMENT DETAILS
  // ============================================================================

  if (data.paymentMethod) {
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('PAYMENT METHOD:', 15, yPosition);

    doc.setFont('Helvetica', 'normal');
    yPosition += 5;
    doc.text(data.paymentMethod, 15, yPosition);
    yPosition += 10;
  }

  // ============================================================================
  // TERMS & CONDITIONS
  // ============================================================================

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('TERMS & CONDITIONS:', 15, yPosition);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  yPosition += 5;

  const termsText =
    'Payment is due within 30 days of invoice date. Late payments may incur interest charges. All work has been completed to the best of our ability. Disaster Recovery Australia is not liable for any indirect damages or consequential losses.';

  const splitText = doc.splitTextToSize(termsText, pageWidth - 30);
  doc.text(splitText, 15, yPosition);

  // ============================================================================
  // FOOTER
  // ============================================================================

  const footerY = pageHeight - 15;
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    `Invoice #${data.invoiceNumber} | Generated: ${new Date().toLocaleDateString('en-AU')} | Page 1 of 1`,
    pageWidth / 2,
    footerY,
    { align: 'center' }
  );

  // ============================================================================
  // RETURN PDF AS BUFFER
  // ============================================================================

  const pdf = doc.output('arraybuffer');
  return Buffer.from(pdf);
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
