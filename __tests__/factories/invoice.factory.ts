import { InvoiceStatus } from '@prisma/client';

export const createMockInvoice = (overrides = {}) => ({
  id: 'invoice-123',
  invoiceNumber: 'INV-2025-001',
  jobId: 'job-123',
  contractorId: 'contractor-123',

  // Line items
  lineItems: [
    {
      id: 'line-1',
      description: 'Emergency water extraction',
      quantity: 4,
      unitPrice: 150.00,
      subtotal: 600.00,
      gstAmount: 60.00,
      total: 660.00,
    },
    {
      id: 'line-2',
      description: 'Dehumidifier hire (3 days)',
      quantity: 3,
      unitPrice: 85.00,
      subtotal: 255.00,
      gstAmount: 25.50,
      total: 280.50,
    },
    {
      id: 'line-3',
      description: 'Ceiling plaster repair',
      quantity: 1,
      unitPrice: 850.00,
      subtotal: 850.00,
      gstAmount: 85.00,
      total: 935.00,
    },
  ],

  // Amounts (Australian GST at 10%)
  subtotal: 1705.00,
  gstAmount: 170.50,
  total: 1875.50,

  // Status and dates
  status: InvoiceStatus.DRAFT,
  issueDate: new Date('2025-11-05'),
  dueDate: new Date('2025-11-19'),
  paidDate: null,

  // Payment details
  paymentMethod: null,
  paymentReference: null,
  paymentNotes: null,

  // Client details
  billToName: 'John Smith',
  billToEmail: 'john.smith@example.com',
  billToAddress: '15 Riverside Drive, Hamilton QLD 4007',

  // Notes
  notes: 'Payment due within 14 days. Please reference invoice number.',
  internalNotes: 'Insurance claim - Suncorp INS-2025-12345',

  // Metadata
  createdAt: new Date('2025-11-04T16:00:00Z'),
  updatedAt: new Date('2025-11-04T16:00:00Z'),
  createdBy: 'user-admin',

  ...overrides,
});

export const createMockLineItem = (overrides = {}) => ({
  id: `line-${Date.now()}`,
  description: 'Service item',
  quantity: 1,
  unitPrice: 100.00,
  subtotal: 100.00,
  gstAmount: 10.00,
  total: 110.00,
  ...overrides,
});

export const createMockInvoiceList = (count: number = 5) => {
  const invoices = [];
  const statuses = [
    InvoiceStatus.DRAFT,
    InvoiceStatus.SENT,
    InvoiceStatus.PAID,
    InvoiceStatus.OVERDUE,
    InvoiceStatus.CANCELLED,
  ];

  for (let i = 0; i < count; i++) {
    const baseAmount = 1000 + (i * 500);
    const gst = baseAmount * 0.1;

    invoices.push(createMockInvoice({
      id: `invoice-${i + 1}`,
      invoiceNumber: `INV-2025-${String(i + 1).padStart(3, '0')}`,
      jobId: `job-${i + 1}`,
      status: statuses[i % statuses.length],
      subtotal: baseAmount,
      gstAmount: gst,
      total: baseAmount + gst,
    }));
  }

  return invoices;
};

export const calculateInvoiceTotals = (lineItems: any[]) => {
  const subtotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
  const gstAmount = subtotal * 0.1; // Australian GST is 10%
  const total = subtotal + gstAmount;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
};
