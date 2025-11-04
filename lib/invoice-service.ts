/**
 * Invoice Service
 * Handles invoice creation, payment processing, and refunds
 *
 * @module InvoiceService
 * @version 1.0.0
 */

import { PrismaClient, ContractorInvoice } from '@prisma/client';
import { addDays } from 'date-fns';
import { eventEmitter, RealtimeEventType } from './realtime/event-emitter';
import { notificationService } from './realtime/notification-service';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Invoice creation input
 */
export interface CreateInvoiceInput {
  subscriptionId: string;
  amount: number;
  description?: string;
  dueDate?: Date;
  items?: InvoiceItem[];
}

/**
 * Invoice item structure
 */
export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  discount?: number;
}

/**
 * Payment record input
 */
export interface RecordPaymentInput {
  invoiceId: string;
  amount: number;
  paymentMethod: string;
  transactionId?: string;
  paymentIntentId?: string;
}

/**
 * Refund input
 */
export interface RefundPaymentInput {
  invoiceId: string;
  amount: number;
  reason?: string;
}

/**
 * Invoice Service Class
 * Manages all invoice-related operations
 */
export class InvoiceService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  /**
   * Create a new invoice
   */
  async createInvoice(input: CreateInvoiceInput): Promise<ContractorInvoice> {
    const {
      subscriptionId,
      amount,
      description,
      dueDate = addDays(new Date(), 7),
      items = []
    } = input;

    // Validate subscription exists
    const subscription = await this.prisma.contractorSubscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      throw new Error('Subscription not found');
    }

    // Calculate GST (10% in Australia)
    const gst = amount * 0.1;
    const total = amount + gst;

    // Generate invoice number
    const invoiceNumber = await this.generateInvoiceNumber();

    // Create invoice
    const invoice = await this.prisma.contractorInvoice.create({
      data: {
        subscriptionId,
        invoiceNumber,
        amount,
        gst,
        total,
        status: 'ISSUED',
        issueDate: new Date(),
        dueDate,
        items: JSON.stringify(items.length > 0 ? items : [
          {
            description: description || 'Subscription Fee',
            quantity: 1,
            unitPrice: amount,
            discount: 0,
            subtotal: amount,
            gst,
            total
          }
        ])
      }
    });

    return invoice;
  }

  /**
   * Record a payment for an invoice
   */
  async recordPayment(input: RecordPaymentInput): Promise<ContractorInvoice> {
    const { invoiceId, amount, paymentMethod, transactionId, paymentIntentId } = input;

    // Get invoice with subscription details
    const invoice = await this.prisma.contractorInvoice.findUnique({
      where: { id: invoiceId },
      include: {
        subscription: {
          include: {
            contractor: true
          }
        }
      }
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice.status === 'PAID') {
      throw new Error('Invoice is already paid');
    }

    // Update invoice status
    const updatedInvoice = await this.prisma.contractorInvoice.update({
      where: { id: invoiceId },
      data: {
        status: 'PAID',
        paidAt: new Date()
      }
    });

    // Create payment record
    await this.prisma.contractorPayment.create({
      data: {
        subscriptionId: invoice.subscriptionId,
        amount,
        type: 'SUBSCRIPTION',
        status: 'COMPLETED',
        paymentMethod,
        transactionId: transactionId || paymentIntentId || `manual_${Date.now()}`,
        paidAt: new Date(),
        dueDate: invoice.dueDate
      }
    });

    // Emit real-time event
    const contractor = invoice.subscription?.contractor;
    if (contractor) {
      eventEmitter.broadcastToTenant(
        RealtimeEventType.PAYMENT_RECEIVED,
        {
          invoiceId: invoice.id,
          invoiceNumber: invoice.invoiceNumber,
          amount: invoice.total,
          tenantId: contractor.tenantId,
          contractorId: contractor.id,
        },
        contractor.tenantId
      );

      // Create notification for contractor
      await notificationService.notifyPaymentReceived(
        contractor.id,
        contractor.tenantId,
        invoice.invoiceNumber,
        invoice.total
      );
    }

    return updatedInvoice;
  }

  /**
   * Refund a payment
   */
  async refundPayment(input: RefundPaymentInput): Promise<ContractorInvoice> {
    const { invoiceId, amount, reason } = input;

    // Get invoice
    const invoice = await this.prisma.contractorInvoice.findUnique({
      where: { id: invoiceId }
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    if (invoice.status !== 'PAID') {
      throw new Error('Invoice is not paid');
    }

    if (amount > invoice.total) {
      throw new Error('Refund amount cannot exceed invoice total');
    }

    // Update invoice status
    const updatedInvoice = await this.prisma.contractorInvoice.update({
      where: { id: invoiceId },
      data: {
        status: amount === invoice.total ? 'CANCELLED' : 'PAID'
      }
    });

    // Create refund payment record
    await this.prisma.contractorPayment.create({
      data: {
        subscriptionId: invoice.subscriptionId,
        amount: -amount,
        type: 'SUBSCRIPTION',
        status: 'REFUNDED',
        paymentMethod: 'REFUND',
        transactionId: `refund_${Date.now()}`,
        paidAt: new Date(),
        dueDate: new Date(),
        failureReason: reason
      }
    });

    return updatedInvoice;
  }

  /**
   * Get invoice by ID
   */
  async getInvoice(invoiceId: string): Promise<ContractorInvoice | null> {
    return await this.prisma.contractorInvoice.findUnique({
      where: { id: invoiceId },
      include: {
        subscription: {
          include: {
            contractor: {
              include: {
                companyProfile: true
              }
            }
          }
        }
      }
    });
  }

  /**
   * Get invoices for a subscription
   */
  async getInvoicesBySubscription(subscriptionId: string): Promise<ContractorInvoice[]> {
    return await this.prisma.contractorInvoice.findMany({
      where: { subscriptionId },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * Send invoice to contractor
   */
  async sendInvoice(invoiceId: string, checkoutUrl?: string): Promise<void> {
    const invoice = await this.getInvoice(invoiceId);

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    // TODO: Implement email sending
    console.log('Invoice email sent', {
      invoiceId,
      invoiceNumber: invoice.invoiceNumber,
      checkoutUrl
    });
  }

  /**
   * Generate unique invoice number
   */
  private async generateInvoiceNumber(): Promise<string> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    // Get count of invoices this month
    const startOfMonth = new Date(year, date.getMonth(), 1);
    const endOfMonth = new Date(year, date.getMonth() + 1, 0);

    const count = await this.prisma.contractorInvoice.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      }
    });

    const sequence = String(count + 1).padStart(4, '0');
    return `INV-${year}${month}-${sequence}`;
  }

  /**
   * Mark invoice as overdue
   */
  async markOverdueInvoices(): Promise<void> {
    const today = new Date();

    await this.prisma.contractorInvoice.updateMany({
      where: {
        status: 'ISSUED',
        dueDate: {
          lt: today
        }
      },
      data: {
        status: 'OVERDUE'
      }
    });
  }
}

// Export singleton instance
export const invoiceService = new InvoiceService();

// Export default
export default InvoiceService;
