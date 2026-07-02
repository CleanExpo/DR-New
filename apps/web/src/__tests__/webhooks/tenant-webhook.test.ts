/**
 * @jest-environment node
 *
 * Tenant Webhook Handler Tests
 *
 * Tests comprehensive webhook functionality:
 * - Idempotency verification (duplicate events ignored)
 * - Payment success flow (status update + email)
 * - Payment failure flow (past_due status + retry email)
 * - Trial ending notifications
 * - Checkout session completion
 * - Error handling and retries
 */

// Mock Stripe SDK FIRST before any imports
jest.mock('stripe', () => {
  const mockConstructEventFn = jest.fn();
  const mockRetrieveSubscriptionFn = jest.fn();

  const StripeMock = jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: mockConstructEventFn,
    },
    subscriptions: {
      retrieve: mockRetrieveSubscriptionFn,
    },
  }));

  // Expose mocks for test access
  (StripeMock as any).mockConstructEvent = mockConstructEventFn;
  (StripeMock as any).mockRetrieveSubscription = mockRetrieveSubscriptionFn;

  return StripeMock;
});

import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import * as webhookIdempotency from '@/src/lib/stripe/webhook-idempotency';
import * as emailModule from '@/lib/email';

// Get mocks after import
const mockConstructEvent = (Stripe as any).mockConstructEvent;
const mockRetrieveSubscription = (Stripe as any).mockRetrieveSubscription;

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  prisma: {
    tenant: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    webhookEvent: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('@/src/lib/stripe/webhook-idempotency');
jest.mock('@/lib/email');

// Mock environment variables
const mockEnv = {
  STRIPE_SECRET_KEY: 'sk_test_mock_key',
  STRIPE_TENANT_WEBHOOK_SECRET: 'whsec_test_mock_secret',
};

// The route module instantiates Stripe at load time from process.env, so it
// must be required AFTER mockEnv is applied (CI has no ambient Stripe env).
let POST: typeof import('@/app/api/webhooks/stripe/tenant/route').POST;

describe('Tenant Webhook Handler', () => {
  beforeAll(() => {
    // Set mock environment variables
    Object.assign(process.env, mockEnv);
    ({ POST } = require('@/app/api/webhooks/stripe/tenant/route'));
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock idempotency checks - default to not processed
    (webhookIdempotency.isEventProcessed as jest.Mock).mockResolvedValue(false);
    (webhookIdempotency.recordWebhookEvent as jest.Mock).mockResolvedValue(undefined);

    // Mock email functions - default to success
    (emailModule.sendPaymentFailureEmail as jest.Mock).mockResolvedValue({ success: true });
    (emailModule.sendPaymentSuccessEmail as jest.Mock).mockResolvedValue({ success: true });
    (emailModule.sendTrialEndingEmail as jest.Mock).mockResolvedValue({ success: true });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Webhook Signature Verification', () => {
    it('should reject requests without signature header', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/stripe/tenant', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Missing signature');
    });

    it('should reject requests with invalid signature', async () => {
      const request = new NextRequest('http://localhost:3000/api/webhooks/stripe/tenant', {
        method: 'POST',
        headers: {
          'stripe-signature': 'invalid_signature',
        },
        body: JSON.stringify({ test: 'data' }),
      });

      // Mock Stripe to throw on invalid signature
      mockConstructEvent.mockImplementation(() => {
        throw new Error('Invalid signature');
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Invalid signature');
    });
  });

  describe('Event Filtering', () => {
    it('should skip non-tenant subscription events', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_test_123',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            metadata: {
              type: 'workspace_subscription', // Not a tenant event
            },
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
      expect(data.skipped).toBe(true);
      expect(webhookIdempotency.isEventProcessed).not.toHaveBeenCalled();
    });

    it('should process tenant subscription events', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_test_123',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_123',
            customer: 'cus_123',
            status: 'active',
            metadata: {
              type: 'tenant_subscription',
              tenantId: 'tenant_123',
            },
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      // Mock tenant lookup
      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Tenant',
        stripeCustomerId: 'cus_123',
      });

      (prisma.tenant.update as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Tenant',
        subscriptionStatus: 'ACTIVE',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);
      expect(webhookIdempotency.isEventProcessed).toHaveBeenCalledWith('evt_test_123');
    });
  });

  describe('Idempotency', () => {
    it('should skip already processed events', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_already_processed',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            metadata: {
              type: 'tenant_subscription',
              tenantId: 'tenant_123',
            },
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      // Mock event as already processed
      (webhookIdempotency.isEventProcessed as jest.Mock).mockResolvedValue(true);

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.received).toBe(true);

      // Verify no database operations were performed
      expect(prisma.tenant.update).not.toHaveBeenCalled();
      expect(emailModule.sendPaymentSuccessEmail).not.toHaveBeenCalled();
    });

    it('should return 503 if idempotency check fails', async () => {
      const mockEvent: Stripe.Event = {
        id: 'evt_test_123',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            metadata: {
              type: 'tenant_subscription',
              tenantId: 'tenant_123',
            },
          },
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      // Mock idempotency check failure
      (webhookIdempotency.isEventProcessed as jest.Mock).mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data.error).toBe('Idempotency check failed');
    });
  });

  describe('Payment Success Events', () => {
    it('should update tenant status and send success email', async () => {
      const mockInvoice = {
        id: 'in_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_paid: 4900, // $49.00 AUD in cents
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
        },
      };

      const mockSubscription = {
        id: 'sub_123',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
          tier: 'BASIC',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_success',
        type: 'invoice.payment_succeeded',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);
      mockRetrieveSubscription.mockResolvedValue(mockSubscription as any);

      // Mock tenant with owner email
      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        stripeCustomerId: 'cus_123',
      });

      (prisma.tenant.update as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        subscriptionStatus: 'ACTIVE',
        subscriptionTier: 'BASIC',
        currentPeriodStart: new Date(mockSubscription.current_period_start * 1000),
        currentPeriodEnd: new Date(mockSubscription.current_period_end * 1000),
        users: [
          {
            email: 'owner@testbusiness.com',
            role: 'OWNER',
          },
        ],
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify status update
      expect(prisma.tenant.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'tenant_123' },
          data: expect.objectContaining({
            subscriptionStatus: 'ACTIVE',
          }),
        })
      );

      // Verify success email sent
      expect(emailModule.sendPaymentSuccessEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@testbusiness.com',
          businessName: 'Test Business',
          amountAUD: 49,
          subscriptionTier: 'BASIC',
        })
      );
    });

    it('should handle payment success even if email fails', async () => {
      const mockInvoice = {
        id: 'in_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_paid: 4900,
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
        },
      };

      const mockSubscription = {
        id: 'sub_123',
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
          tier: 'BASIC',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_success',
        type: 'invoice.payment_succeeded',
        data: {
          object: mockInvoice,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);
      mockRetrieveSubscription.mockResolvedValue(mockSubscription as any);

      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
      });

      (prisma.tenant.update as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        subscriptionStatus: 'ACTIVE',
        users: [{ email: 'owner@test.com' }],
      });

      // Mock email failure
      (emailModule.sendPaymentSuccessEmail as jest.Mock).mockRejectedValue(
        new Error('Email service down')
      );

      const response = await POST(request);

      // Webhook should still succeed even if email fails
      expect(response.status).toBe(200);
      expect(prisma.tenant.update).toHaveBeenCalled();
    });
  });

  describe('Payment Failure Events', () => {
    it('should update tenant to PAST_DUE and send failure email', async () => {
      const mockInvoice = {
        id: 'in_failed_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        amount_due: 4900, // $49.00 AUD
        attempt_count: 2, // Second retry
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_payment_failed',
        type: 'invoice.payment_failed',
        data: {
          object: mockInvoice,
        },
      } as any;

      const mockSubscription = {
        id: 'sub_123',
        customer: 'cus_123',
        status: 'past_due',
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
          tier: 'BASIC',
        },
      };

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);
      mockRetrieveSubscription.mockResolvedValue(mockSubscription as any);

      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        stripeCustomerId: 'cus_123',
      });

      (prisma.tenant.update as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        subscriptionStatus: 'PAST_DUE',
        subscriptionTier: 'BASIC',
        users: [
          {
            email: 'owner@testbusiness.com',
            role: 'OWNER',
          },
        ],
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify status updated to PAST_DUE
      expect(prisma.tenant.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'tenant_123' },
          data: expect.objectContaining({
            subscriptionStatus: 'PAST_DUE',
          }),
        })
      );

      // Verify failure email sent with retry info
      expect(emailModule.sendPaymentFailureEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@testbusiness.com',
          businessName: 'Test Business',
          amountAUD: 49,
          attemptCount: 2,
          subscriptionTier: 'BASIC',
        })
      );
    });
  });

  describe('Trial Ending Events', () => {
    it('should send trial ending reminder 3 days before expiry', async () => {
      const trialEndTimestamp = Math.floor(Date.now() / 1000) + 3 * 24 * 60 * 60; // 3 days from now

      const mockSubscription = {
        id: 'sub_123',
        customer: 'cus_123',
        trial_end: trialEndTimestamp,
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_trial_ending',
        type: 'customer.subscription.trial_will_end',
        data: {
          object: mockSubscription,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        subscriptionTier: 'PROFESSIONAL',
        users: [
          {
            email: 'owner@testbusiness.com',
            role: 'OWNER',
          },
        ],
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify trial ending email sent
      expect(emailModule.sendTrialEndingEmail).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'owner@testbusiness.com',
          businessName: 'Test Business',
          trialEndsAt: new Date(trialEndTimestamp * 1000),
          subscriptionTier: 'PROFESSIONAL',
          monthlyPrice: 99, // Professional tier pricing
        })
      );
    });
  });

  describe('Checkout Session Completed', () => {
    it('should activate tenant subscription after successful checkout', async () => {
      const mockSession = {
        id: 'cs_test_123',
        customer: 'cus_123',
        subscription: 'sub_123',
        metadata: {
          type: 'tenant_subscription',
          tenantId: 'tenant_123',
        },
      };

      const mockEvent: Stripe.Event = {
        id: 'evt_checkout_complete',
        type: 'checkout.session.completed',
        data: {
          object: mockSession,
        },
      } as any;

      const request = createMockRequest(mockEvent);

      mockConstructEvent.mockReturnValue(mockEvent);

      (prisma.tenant.findUnique as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
      });

      (prisma.tenant.update as jest.Mock).mockResolvedValue({
        id: 'tenant_123',
        name: 'Test Business',
        subscriptionStatus: 'ACTIVE',
        stripeSubscriptionId: 'sub_123',
      });

      const response = await POST(request);

      expect(response.status).toBe(200);

      // Verify tenant activated with checkout details
      // Note: subscription details (status, tier) are filled by subscription.created event
      expect(prisma.tenant.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'tenant_123' },
          data: expect.objectContaining({
            onboardingCompleted: true,
            stripeCustomerId: 'cus_123',
            stripeCheckoutSessionId: 'cs_test_123',
          }),
        })
      );
    });
  });
});

/**
 * Helper function to create mock Next.js request
 */
function createMockRequest(event: Stripe.Event): NextRequest {
  return new NextRequest('http://localhost:3000/api/webhooks/stripe/tenant', {
    method: 'POST',
    headers: {
      'stripe-signature': 't=123,v1=mock_signature',
    },
    body: JSON.stringify(event),
  });
}
