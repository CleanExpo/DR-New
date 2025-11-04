/**
 * Stripe Service Tests
 * Tests for Stripe payment integration
 */

import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';
import { StripeService } from '@/lib/stripe-service';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Mock Stripe SDK
jest.mock('@/lib/stripe', () => ({
  stripe: {
    customers: {
      create: jest.fn(),
    },
    subscriptions: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
    },
    paymentIntents: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
    prices: {
      create: jest.fn(),
    },
    refunds: {
      create: jest.fn(),
    },
    billingPortal: {
      sessions: {
        create: jest.fn(),
      },
    },
  },
}));

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    contractor: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    contractorSubscription: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    invoice: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    payment: {
      create: jest.fn(),
      findFirst: jest.fn(),
    },
  },
}));

describe('StripeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCustomer', () => {
    it('should create a Stripe customer and update contractor', async () => {
      const mockCustomer = {
        id: 'cus_test123',
      };

      (stripe.customers.create as jest.Mock).mockResolvedValue(mockCustomer);
      (prisma.contractor.update as jest.Mock).mockResolvedValue({});

      const customerId = await StripeService.createCustomer(
        'contractor-123',
        'test@example.com',
        'Test Contractor'
      );

      expect(stripe.customers.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        name: 'Test Contractor',
        metadata: {
          contractorId: 'contractor-123',
        },
      });

      expect(prisma.contractor.update).toHaveBeenCalledWith({
        where: { id: 'contractor-123' },
        data: { stripeCustomerId: 'cus_test123' },
      });

      expect(customerId).toBe('cus_test123');
    });

    it('should handle errors when creating customer', async () => {
      (stripe.customers.create as jest.Mock).mockRejectedValue(
        new Error('Stripe error')
      );

      await expect(
        StripeService.createCustomer(
          'contractor-123',
          'test@example.com',
          'Test Contractor'
        )
      ).rejects.toThrow('Failed to create Stripe customer');
    });
  });

  describe('createSubscription', () => {
    it('should create a subscription with existing customer', async () => {
      const mockContractor = {
        id: 'contractor-123',
        email: 'test@example.com',
        name: 'Test Contractor',
        stripeCustomerId: 'cus_test123',
      };

      const mockSubscription = {
        id: 'sub_test123',
        current_period_start: 1234567890,
        current_period_end: 1234567890,
        latest_invoice: {
          payment_intent: {
            client_secret: 'pi_secret_123',
          },
        },
      };

      (prisma.contractor.findUnique as jest.Mock).mockResolvedValue(mockContractor);
      (stripe.subscriptions.create as jest.Mock).mockResolvedValue(mockSubscription);
      (prisma.contractorSubscription.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.contractorSubscription.create as jest.Mock).mockResolvedValue({});

      const result = await StripeService.createSubscription({
        contractorId: 'contractor-123',
        tier: 'RADIUS_50KM',
      });

      expect(result.subscriptionId).toBe('sub_test123');
      expect(result.clientSecret).toBe('pi_secret_123');
    });

    it('should create customer if not exists', async () => {
      const mockContractor = {
        id: 'contractor-123',
        email: 'test@example.com',
        name: 'Test Contractor',
        stripeCustomerId: null,
      };

      const mockCustomer = {
        id: 'cus_new123',
      };

      const mockSubscription = {
        id: 'sub_test123',
        current_period_start: 1234567890,
        current_period_end: 1234567890,
        latest_invoice: {
          payment_intent: {
            client_secret: 'pi_secret_123',
          },
        },
      };

      (prisma.contractor.findUnique as jest.Mock).mockResolvedValue(mockContractor);
      (stripe.customers.create as jest.Mock).mockResolvedValue(mockCustomer);
      (prisma.contractor.update as jest.Mock).mockResolvedValue({});
      (stripe.subscriptions.create as jest.Mock).mockResolvedValue(mockSubscription);
      (prisma.contractorSubscription.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.contractorSubscription.create as jest.Mock).mockResolvedValue({});

      const result = await StripeService.createSubscription({
        contractorId: 'contractor-123',
        tier: 'RADIUS_50KM',
      });

      expect(stripe.customers.create).toHaveBeenCalled();
      expect(result.subscriptionId).toBe('sub_test123');
    });
  });

  describe('cancelSubscription', () => {
    it('should cancel a subscription', async () => {
      const mockSubscription = {
        id: 'db-sub-123',
        stripeSubscriptionId: 'sub_test123',
      };

      (stripe.subscriptions.update as jest.Mock).mockResolvedValue({});
      (prisma.contractorSubscription.findFirst as jest.Mock).mockResolvedValue(
        mockSubscription
      );
      (prisma.contractorSubscription.update as jest.Mock).mockResolvedValue({});

      await StripeService.cancelSubscription('sub_test123');

      expect(stripe.subscriptions.update).toHaveBeenCalledWith('sub_test123', {
        cancel_at_period_end: true,
      });

      expect(prisma.contractorSubscription.update).toHaveBeenCalledWith({
        where: { id: 'db-sub-123' },
        data: {
          status: 'CANCELLED',
          endDate: expect.any(Date),
        },
      });
    });
  });

  describe('createPaymentIntent', () => {
    it('should create a payment intent for an invoice', async () => {
      const mockInvoice = {
        id: 'invoice-123',
        invoiceNumber: 'INV-001',
        description: 'Test invoice',
        totalAmount: 100.0,
        status: 'PENDING',
        contractorId: 'contractor-123',
        contractor: {
          id: 'contractor-123',
          email: 'test@example.com',
          name: 'Test Contractor',
          stripeCustomerId: 'cus_test123',
        },
      };

      const mockPaymentIntent = {
        id: 'pi_test123',
        client_secret: 'pi_secret_123',
      };

      (prisma.invoice.findUnique as jest.Mock).mockResolvedValue(mockInvoice);
      (stripe.paymentIntents.create as jest.Mock).mockResolvedValue(mockPaymentIntent);
      (prisma.invoice.update as jest.Mock).mockResolvedValue({});

      const result = await StripeService.createPaymentIntent('invoice-123');

      expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
        amount: 10000, // $100 in cents
        currency: 'aud',
        customer: 'cus_test123',
        metadata: {
          invoiceId: 'invoice-123',
          contractorId: 'contractor-123',
        },
        description: 'Invoice INV-001 - Test invoice',
      });

      expect(result.paymentIntentId).toBe('pi_test123');
      expect(result.clientSecret).toBe('pi_secret_123');
    });

    it('should reject payment for already paid invoice', async () => {
      const mockInvoice = {
        id: 'invoice-123',
        status: 'PAID',
        contractor: {
          stripeCustomerId: 'cus_test123',
        },
      };

      (prisma.invoice.findUnique as jest.Mock).mockResolvedValue(mockInvoice);

      await expect(
        StripeService.createPaymentIntent('invoice-123')
      ).rejects.toThrow('Invoice already paid');
    });
  });

  describe('confirmPayment', () => {
    it('should confirm payment and update invoice', async () => {
      const mockPaymentIntent = {
        id: 'pi_test123',
        status: 'succeeded',
      };

      const mockInvoice = {
        id: 'invoice-123',
        totalAmount: 100.0,
        stripePaymentIntentId: 'pi_test123',
      };

      (stripe.paymentIntents.retrieve as jest.Mock).mockResolvedValue(
        mockPaymentIntent
      );
      (prisma.invoice.findFirst as jest.Mock).mockResolvedValue(mockInvoice);
      (prisma.invoice.update as jest.Mock).mockResolvedValue({});
      (prisma.payment.create as jest.Mock).mockResolvedValue({});

      await StripeService.confirmPayment('pi_test123');

      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'invoice-123' },
        data: {
          status: 'PAID',
          paidDate: expect.any(Date),
        },
      });

      expect(prisma.payment.create).toHaveBeenCalledWith({
        data: {
          invoiceId: 'invoice-123',
          amount: 100.0,
          paymentMethod: 'STRIPE',
          stripePaymentIntentId: 'pi_test123',
          paymentDate: expect.any(Date),
        },
      });
    });

    it('should reject if payment not successful', async () => {
      const mockPaymentIntent = {
        id: 'pi_test123',
        status: 'requires_payment_method',
      };

      (stripe.paymentIntents.retrieve as jest.Mock).mockResolvedValue(
        mockPaymentIntent
      );

      await expect(StripeService.confirmPayment('pi_test123')).rejects.toThrow(
        'Payment not successful'
      );
    });
  });

  describe('processRefund', () => {
    it('should process a full refund', async () => {
      const mockRefund = {
        id: 'ref_test123',
      };

      const mockPayment = {
        invoiceId: 'invoice-123',
        stripePaymentIntentId: 'pi_test123',
      };

      (stripe.refunds.create as jest.Mock).mockResolvedValue(mockRefund);
      (prisma.payment.findFirst as jest.Mock).mockResolvedValue(mockPayment);
      (prisma.invoice.update as jest.Mock).mockResolvedValue({});

      await StripeService.processRefund('pi_test123');

      expect(stripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: 'pi_test123',
      });

      expect(prisma.invoice.update).toHaveBeenCalledWith({
        where: { id: 'invoice-123' },
        data: {
          status: 'REFUNDED',
        },
      });
    });

    it('should process a partial refund', async () => {
      const mockRefund = {
        id: 'ref_test123',
      };

      (stripe.refunds.create as jest.Mock).mockResolvedValue(mockRefund);
      (prisma.payment.findFirst as jest.Mock).mockResolvedValue({
        invoiceId: 'invoice-123',
      });
      (prisma.invoice.update as jest.Mock).mockResolvedValue({});

      await StripeService.processRefund('pi_test123', 50.0);

      expect(stripe.refunds.create).toHaveBeenCalledWith({
        payment_intent: 'pi_test123',
        amount: 5000, // $50 in cents
      });
    });
  });

  describe('getSubscriptionStatus', () => {
    it('should retrieve subscription status from Stripe', async () => {
      const mockSubscription = {
        id: 'sub_test123',
        status: 'active',
        current_period_start: 1234567890,
        current_period_end: 1234567890,
      };

      (stripe.subscriptions.retrieve as jest.Mock).mockResolvedValue(
        mockSubscription
      );

      const result = await StripeService.getSubscriptionStatus('sub_test123');

      expect(result.id).toBe('sub_test123');
      expect(result.status).toBe('active');
    });
  });

  describe('createCustomerPortalSession', () => {
    it('should create a customer portal session', async () => {
      const mockSession = {
        url: 'https://billing.stripe.com/session/test123',
      };

      (stripe.billingPortal.sessions.create as jest.Mock).mockResolvedValue(
        mockSession
      );

      const url = await StripeService.createCustomerPortalSession(
        'cus_test123',
        'https://example.com/return'
      );

      expect(stripe.billingPortal.sessions.create).toHaveBeenCalledWith({
        customer: 'cus_test123',
        return_url: 'https://example.com/return',
      });

      expect(url).toBe('https://billing.stripe.com/session/test123');
    });
  });
});
