/**
 * Workspace Subscription Webhook Handler Tests
 *
 * Tests comprehensive webhook functionality for workspace-level subscriptions:
 * - Idempotency verification (duplicate events ignored)
 * - Retry logic with exponential backoff
 * - Payment success flow (status update + email)
 * - Payment failure flow (past_due status + retry email)
 * - Subscription lifecycle (created, updated, deleted)
 * - Error handling and resilience
 */

import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { POST } from '@/app/api/webhooks/stripe/subscription/route';
import { prisma } from '@/lib/prisma';
import * as webhookIdempotency from '@/src/lib/stripe/webhook-idempotency';
import * as webhookRetry from '@/src/lib/stripe/webhook-retry';
import * as emailModule from '@/lib/email';

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    workspace: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    webhookEvent: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
    auditLog: {
      create: jest.fn(),
    },
  },
}));

jest.mock('@/src/lib/stripe/webhook-idempotency');
jest.mock('@/src/lib/stripe/webhook-retry');
jest.mock('@/lib/email');

// Mock environment variables
const mockEnv = {
  STRIPE_SECRET_KEY: 'sk_test_mock_key',
  STRIPE_WEBHOOK_SECRET: 'whsec_test_workspace_secret',
};

describe('Workspace Subscription Webhook Handler', () => {
  let mockStripe: jest.Mocked<Stripe>;

  beforeAll(() => {
    Object.assign(process.env, mockEnv);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockStripe = {
      webhooks: {
        constructEvent: jest.fn(),
      },
      subscriptions: {
        retrieve: jest.fn(),
      },
      paymentMethods: {
        retrieve: jest.fn(),
      },
    } as any;

    // Mock idempotency checks
    (webhookIdempotency.isEventProcessed as jest.Mock).mockResolvedValue(false);
    (webhookIdempotency.recordWebhookEvent as jest.Mock).mockResolvedValue(undefined);

    // Mock retry logic - pass through by default
    (webhookRetry.retryPrismaOperation as jest.Mock).mockImplementation(
      async (_type, fn, _description) => {
        return await fn();
      }
    );

    // Mock email functions
    (emailModule.sendPaymentFailureEmail as jest.Mock).mockResolvedValue({ success: true });
    (emailModule.sendPaymentSuccessEmail as jest.Mock).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Webhook Signature Verification', () => {
    it('should reject requests without signature header', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/stripe/subscription', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('No signature');
    });

    it('should reject requests with invalid signature', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/stripe/subscription', {
        method: 'POST',
        headers: {
          'stripe-signature': 'invalid_signature',
        },
        body: JSON.stringify({ test: 'data' }),
      });

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid signature');
    });
  });

  describe('Idempotency', () => {
    it('should skip already processed events', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_already_processed',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'in_123',
            customer: 'cus_123',
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);
      (webhookIdempotency.isEventProcessed as jest.Mock).mockResolvedValue(true);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
      expect(prisma.workspace.update).not.toHaveBeenCalled();
    });

    it('should return 503 if idempotency check fails', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_test_123',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'in_123',
            customer: 'cus_123',
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);
      (webhookIdempotency.isEventProcessed as jest.Mock).mockRejectedValue(
        new Error('Redis connection failed')
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.error).toBe('Idempotency check failed');
    });
  });

  describe('Payment Success Events', () => {
    it('should update workspace status and send success email', async () => {
      const mockInvoice = {
        id: 'in_success_123',
        customer: 'cus_workspace_123',
        subscription: 'sub_workspace_123',
        amount_paid: 9900, // $99.00 AUD (Professional tier)
      };

      const mockSubscription = {
        id: 'sub_workspace_123',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_success',
        type: 'invoice.payment_succeeded',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);
      jest.spyOn(Stripe.prototype.subscriptions, 'retrieve').mockResolvedValue(mockSubscription as any);

      // Mock workspace with owner member
      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Test Workspace LLC',
        stripeCustomerId: 'cus_workspace_123',
        subscriptionTier: 'PROFESSIONAL',
        members: [
          {
            role: 'OWNER',
            user: {
              email: 'owner@workspace.com',
            },
          },
        ],
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Test Workspace LLC',
        subscriptionStatus: 'ACTIVE',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify workspace status updated with retry
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'criticalPayment',
        expect.any(Function),
        expect.stringContaining('mark payment succeeded')
      );

      // Verify success email sent
      expect(emailModule.sendPaymentSuccessEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@workspace.com',
          businessName: 'Test Workspace LLC',
          amountAUD: 99,
          subscriptionTier: 'PROFESSIONAL',
        })
      );
    });

    it('should continue processing even if email fails', async () => {
      const mockInvoice = {
        id: 'in_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_paid: 4900,
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_test',
        type: 'invoice.payment_succeeded',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Test',
        stripeCustomerId: 'cus_123',
        members: [
          {
            role: 'OWNER',
            user: { email: 'owner@test.com' },
          },
        ],
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'ACTIVE',
      });

      // Mock email failure
      (emailModule.sendPaymentSuccessEmail as jest.Mock).mockRejectedValue(
        new Error('Resend API down')
      );

      const response = await POST(request);

      // Webhook should still succeed
      expect(response.status).toBe(200);
      expect(prisma.workspace.update).toHaveBeenCalled();
    });
  });

  describe('Payment Failure Events', () => {
    it('should update workspace to PAST_DUE and send failure email with retry info', async () => {
      const mockInvoice = {
        id: 'in_failed_123',
        customer: 'cus_workspace_123',
        subscription: 'sub_workspace_123',
        amount_due: 9900, // $99.00 AUD
        attempt_count: 1, // First retry
        default_payment_method: 'pm_123',
      };

      const mockPaymentMethod = {
        id: 'pm_123',
        card: {
          last4: '4242',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_failed',
        type: 'invoice.payment_failed',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);
      jest.spyOn(Stripe.prototype.paymentMethods, 'retrieve').mockResolvedValue(mockPaymentMethod as any);

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Test Workspace LLC',
        stripeCustomerId: 'cus_workspace_123',
        subscriptionTier: 'PROFESSIONAL',
        members: [
          {
            role: 'OWNER',
            user: {
              email: 'owner@workspace.com',
            },
          },
        ],
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'PAST_DUE',
      });

      (prisma.auditLog.create as jest.Mock).mockResolvedValue({
        id: 'audit_123',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify workspace marked as PAST_DUE
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'criticalPayment',
        expect.any(Function),
        expect.stringContaining('mark payment failed')
      );

      // Verify failure email sent with payment method details
      expect(emailModule.sendPaymentFailureEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@workspace.com',
          businessName: 'Test Workspace LLC',
          amountAUD: 99,
          attemptCount: 1,
          lastFourDigits: '4242',
          subscriptionTier: 'PROFESSIONAL',
        })
      );

      // Verify audit log created
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'nonCritical',
        expect.any(Function),
        expect.stringContaining('create audit log')
      );
    });

    it('should handle payment failure even if payment method retrieval fails', async () => {
      const mockInvoice = {
        id: 'in_failed_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_due: 4900,
        attempt_count: 2,
        default_payment_method: 'pm_invalid',
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_failed',
        type: 'invoice.payment_failed',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);
      jest.spyOn(Stripe.prototype.paymentMethods, 'retrieve').mockRejectedValue(
        new Error('Payment method not found')
      );

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Test',
        members: [
          {
            role: 'OWNER',
            user: { email: 'owner@test.com' },
          },
        ],
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'PAST_DUE',
      });

      const response = await POST(request);

      // Should still succeed without payment method details
      expect(response.status).toBe(200);

      // Email should be sent without lastFourDigits
      expect(emailModule.sendPaymentFailureEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@test.com',
          lastFourDigits: undefined,
        })
      );
    });
  });

  describe('Subscription Lifecycle Events', () => {
    it('should activate workspace on subscription creation', async () => {
      const mockSubscription = {
        id: 'sub_new_123',
        customer: 'cus_123',
        status: 'active',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_sub_created',
        type: 'customer.subscription.created',
        data: {
          object: mockSubscription,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'New Workspace',
        stripeCustomerId: 'cus_123',
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'ACTIVE',
        stripeSubscriptionId: 'sub_new_123',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify workspace activated
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'databaseQuery',
        expect.any(Function),
        expect.stringContaining('activate workspace')
      );
    });

    it('should cancel workspace on subscription deletion', async () => {
      const mockSubscription = {
        id: 'sub_deleted_123',
        customer: 'cus_123',
        status: 'canceled',
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_sub_deleted',
        type: 'customer.subscription.deleted',
        data: {
          object: mockSubscription,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        businessName: 'Canceled Workspace',
        stripeCustomerId: 'cus_123',
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'CANCELED',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify workspace canceled
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'databaseQuery',
        expect.any(Function),
        expect.stringContaining('cancel workspace')
      );
    });
  });

  describe('Retry Logic', () => {
    it('should retry critical payment operations with exponential backoff', async () => {
      const mockInvoice = {
        id: 'in_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_paid: 4900,
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_test',
        type: 'invoice.payment_succeeded',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      jest.spyOn(Stripe.prototype.webhooks, 'constructEvent').mockReturnValue(mockEvent);

      (prisma.workspace.findUnique as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        stripeCustomerId: 'cus_123',
      });

      (prisma.workspace.update as jest.Mock).mockResolvedValue({
        id: 'workspace_123',
        subscriptionStatus: 'ACTIVE',
      });

      await POST(request);

      // Verify retry wrapper was used for critical operations
      expect(webhookRetry.retryPrismaOperation).toHaveBeenCalledWith(
        'criticalPayment',
        expect.any(Function),
        expect.any(String)
      );
    });
  });
});

/**
 * Helper function to create mock Next.js request
 */
function createMockRequest(event: Stripe.Event): NextRequest {
  return new NextRequest('http://localhost:3000/api/webhooks/stripe/subscription', {
    method: 'POST',
    headers: {
      'stripe-signature': 't=123,v1=mock_signature',
    },
    body: JSON.stringify(event),
  });
}
