export type InvoiceStatus = "DRAFT" | "SENT" | "PAID" | "OVERDUE" | "CANCELLED";

export type PaymentMethod = "CASH" | "CREDIT_CARD" | "BANK_TRANSFER" | "INSURANCE";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  status: InvoiceStatus;
  createdAt: string;
  dueDate: string;
  paymentTerms: string;
  notes?: string;
  totalAmount: number;
  subtotal: number;
  gstAmount: number;
  client: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  workOrder?: {
    id: string;
    jobNumber: string;
  };
  lineItems: InvoiceLineItem[];
  payments: Payment[];
}

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Payment {
  id: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentDate: string;
  reference?: string;
  notes?: string;
  createdAt: string;
}

export interface InvoiceFilters {
  status?: InvoiceStatus;
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface InvoiceListResponse {
  invoices: Invoice[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FinancialSummary {
  totalRevenue: number;
  outstandingInvoices: number;
  overdueAmount: number;
  paidThisMonth: number;
}
