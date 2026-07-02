/**
 * @jest-environment node
 *
 * Stripe Connect Webhook Handler Tests (DR-898)
 *
 * - Signature verification failure -> 400, nothing processed
 * - Idempotency: duplicate events are skipped
 * - account.updated: capability flags persisted on ContractorProfile and
 *   dispatch eligibility recomputed for the owning user
 * - account.updated for an unknown account: skipped without error
 * - transfer.reversed: matching ContractorPayout ledger row marked REVERSED
 * - Unhandled event types: acknowledged and recorded
 */

// Mock Stripe SDK FIRST before any imports
jest.mock('stripe', () => {
  const mockConstructEventFn = jest.fn();

  const StripeMock = jest.fn().mockImplementation(() => ({
    webhooks: {
      constructEvent: mockConstructEventFn,
    },
  }));

  (StripeMock as any).mockConstructEvent = mockConstructEventFn;

  return StripeMock;
});

jest.mock('@/lib/prisma', () => ({
  prisma: {
    contractorProfile: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    contractorPayout: {
      updateMany: jest.fn(),
    },
  },
}));

jest.mock('@/src/lib/stripe/webhook-idempotency');
jest.mock('@/lib/services/dispatch-eligibility', () => ({
  isDispatchEligible: jest.fn().mockResolvedValue(true),
}));

import { NextRequest } from 'next/server';
import Stripe from 'stripe';
import { POST } from '@/app/api/webhooks/stripe/connect/route';
import { prisma } from '@/lib/prisma';
import * as webhookIdempotency from '@/src/lib/stripe/webhook-idempotency';
import { isDispatchEligible } from '@/lib/services/dispatch-eligibility';

const mockConstructEvent = (Stripe as any).mockConstructEvent as jest.Mock;
const mockIsEventProcessed = webhookIdempotency.isEventProcessed as jest.Mock;
const mockRecordWebhookEvent = webhookIdempotency.recordWebhookEvent as jest.Mock;

function makeRequest(body = '{}'): NextRequest {
  return new NextRequest('http://localhost/api/webhooks/stripe/connect', {
    method: 'POST',
    body,
    headers: { 'stripe-signature': 'sig_test' },
  });
}

function makeEvent(type: string, object: Record<string, unknown>, id = 'evt_test_1') {
  return { id, type, data: { object } };
}

beforeAll(() => {
  Object.assign(process.env, {
    STRIPE_SECRET_KEY: 'sk_test_mock_key',
    STRIPE_CONNECT_WEBHOOK_SECRET: 'whsec_test_mock_secret',
  });
});

beforeEach(() => {
  jest.clearAllMocks();
  mockIsEventProcessed.mockResolvedValue(false);
  mockRecordWebhookEvent.mockResolvedValue(undefined);
});

describe('POST /api/webhooks/stripe/connect', () => {
  it('returns 400 and processes nothing when the signature is invalid', async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error('bad signature');
    });

    const res = await POST(makeRequest());

    expect(res.status).toBe(400);
    expect(prisma.contractorProfile.findFirst).not.toHaveBeenCalled();
    expect(mockRecordWebhookEvent).not.toHaveBeenCalled();
  });

  it('returns 400 when the stripe-signature header is missing', async () => {
    const req = new NextRequest('http://localhost/api/webhooks/stripe/connect', {
      method: 'POST',
      body: '{}',
    });

    const res = await POST(req);

    expect(res.status).toBe(400);
    expect(mockConstructEvent).not.toHaveBeenCalled();
  });

  it('skips already-processed events (idempotency)', async () => {
    mockConstructEvent.mockReturnValue(makeEvent('account.updated', { id: 'acct_1' }));
    mockIsEventProcessed.mockResolvedValue(true);

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(prisma.contractorProfile.findFirst).not.toHaveBeenCalled();
    expect(mockRecordWebhookEvent).not.toHaveBeenCalled();
  });

  it('account.updated persists capability flags and recomputes eligibility', async () => {
    mockConstructEvent.mockReturnValue(
      makeEvent('account.updated', {
        id: 'acct_contractor_1',
        payouts_enabled: true,
        charges_enabled: false,
        requirements: { currently_due: ['external_account'] },
      })
    );
    (prisma.contractorProfile.findFirst as jest.Mock).mockResolvedValue({
      id: 'profile_1',
      userId: 'user_1',
    });
    (prisma.contractorProfile.update as jest.Mock).mockResolvedValue({});

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(prisma.contractorProfile.update).toHaveBeenCalledWith({
      where: { id: 'profile_1' },
      data: expect.objectContaining({
        stripePayoutsEnabled: true,
        stripeChargesEnabled: false,
        stripeRequirementsDue: ['external_account'],
        stripeCapabilitiesSyncedAt: expect.any(Date),
      }),
    });
    expect(isDispatchEligible).toHaveBeenCalledWith('user_1');
    expect(mockRecordWebhookEvent).toHaveBeenCalledWith('evt_test_1', 'account.updated', 200);
  });

  it('account.updated for an unknown account is acknowledged without writes', async () => {
    mockConstructEvent.mockReturnValue(
      makeEvent('account.updated', { id: 'acct_tenant_billing' })
    );
    (prisma.contractorProfile.findFirst as jest.Mock).mockResolvedValue(null);

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(prisma.contractorProfile.update).not.toHaveBeenCalled();
    expect(isDispatchEligible).not.toHaveBeenCalled();
    expect(mockRecordWebhookEvent).toHaveBeenCalledWith('evt_test_1', 'account.updated', 200);
  });

  it('transfer.reversed marks the matching ledger row REVERSED', async () => {
    mockConstructEvent.mockReturnValue(
      makeEvent('transfer.reversed', { id: 'tr_1', amount_reversed: 5000 })
    );
    (prisma.contractorPayout.updateMany as jest.Mock).mockResolvedValue({ count: 1 });

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(prisma.contractorPayout.updateMany).toHaveBeenCalledWith({
      where: { stripeTransferId: 'tr_1' },
      data: expect.objectContaining({ status: 'REVERSED' }),
    });
    expect(mockRecordWebhookEvent).toHaveBeenCalledWith('evt_test_1', 'transfer.reversed', 200);
  });

  it('unhandled event types are acknowledged and recorded', async () => {
    mockConstructEvent.mockReturnValue(makeEvent('payout.paid', { id: 'po_1' }));

    const res = await POST(makeRequest());

    expect(res.status).toBe(200);
    expect(mockRecordWebhookEvent).toHaveBeenCalledWith('evt_test_1', 'payout.paid', 200);
  });

  it('handler errors record the failure and return 500', async () => {
    mockConstructEvent.mockReturnValue(
      makeEvent('account.updated', { id: 'acct_1' })
    );
    (prisma.contractorProfile.findFirst as jest.Mock).mockRejectedValue(
      new Error('db down')
    );

    const res = await POST(makeRequest());

    expect(res.status).toBe(500);
    expect(mockRecordWebhookEvent).toHaveBeenCalledWith(
      'evt_test_1',
      'account.updated',
      500,
      'db down'
    );
  });
});
