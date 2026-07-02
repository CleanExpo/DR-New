/**
 * @jest-environment node
 *
 * DR-897 — Idempotent Stripe Connect account creation.
 *
 * Drives the REAL POST handler for
 * `app/api/contractor/stripe/connect/onboard/route.ts` with its boundaries
 * mocked (auth, tenant db, the Stripe helper).
 *
 * What it proves (no duplicate connected accounts):
 *   1. Two sequential calls (double-click/retry) mint exactly ONE
 *      `accounts.create`; the second call reuses the persisted
 *      `stripeConnectAccountId` and only mints a fresh account-link.
 *   2. The account id is persisted via an ATOMIC conditional claim
 *      (`updateMany` guarded on `stripeConnectAccountId: null`), so a
 *      concurrent loser cannot overwrite the winner's account.
 *   3. The concurrent loser reuses the WINNER's account id in its response
 *      and account-link; its own freshly-created account is discarded.
 *   4. A contractor already connected never triggers `accounts.create`.
 */

import { NextRequest, NextResponse } from 'next/server';

// api-errors (pulled in by the route) imports @sentry/nextjs, which is not
// resolvable under test; it only calls captureException.
jest.mock('@sentry/nextjs', () => ({ captureException: jest.fn() }), { virtual: true });

jest.mock('@/lib/auth-middleware', () => {
  const { NextResponse: MockNextResponse } = jest.requireActual('next/server');
  return {
    authenticateRequest: jest.fn(),
    requireRole: (user: { userType?: string }, roles: string[]) =>
      roles.includes(user?.userType as string),
    unauthorizedRoleResponse: (roles: string[]) =>
      MockNextResponse.json(
        { error: 'FORBIDDEN', message: `Access denied. Required roles: ${roles.join(', ')}` },
        { status: 403 }
      ),
  };
});

const mockDb = {
  user: { findUnique: jest.fn() },
  contractorProfile: {
    findUnique: jest.fn(),
    create: jest.fn(),
    updateMany: jest.fn(),
    update: jest.fn(),
  },
};
jest.mock('@/lib/get-tenant-db', () => ({ getTenantDb: () => mockDb }));

const mockCreateConnectedAccount = jest.fn();
const mockCreateAccountLink = jest.fn();
jest.mock('@/lib/stripe', () => ({
  createConnectedAccount: (...args: unknown[]) => mockCreateConnectedAccount(...args),
  createAccountLink: (...args: unknown[]) => mockCreateAccountLink(...args),
}));

import { POST } from '@/app/api/contractor/stripe/connect/onboard/route';
import { authenticateRequest } from '@/lib/auth-middleware';

const mockAuth = authenticateRequest as jest.Mock;

const CONTRACTOR = { id: 'user_1', userType: 'CONTRACTOR' };
const PROFILE_NO_ACCOUNT = { id: 'profile_1', userId: 'user_1', stripeConnectAccountId: null };
const PROFILE_CONNECTED = { id: 'profile_1', userId: 'user_1', stripeConnectAccountId: 'acct_existing' };

function onboardReq() {
  return new NextRequest('http://localhost/api/contractor/stripe/connect/onboard', {
    method: 'POST',
  });
}

beforeEach(() => {
  mockAuth.mockResolvedValue({ success: true, context: { user: CONTRACTOR } });
  mockDb.user.findUnique.mockResolvedValue({ id: 'user_1', email: 'contractor@example.com' });
  mockDb.contractorProfile.findUnique.mockResolvedValue(PROFILE_NO_ACCOUNT);
  mockDb.contractorProfile.updateMany.mockResolvedValue({ count: 1 });
  mockCreateConnectedAccount.mockResolvedValue({ id: 'acct_new' });
  mockCreateAccountLink.mockResolvedValue({ url: 'https://connect.stripe.com/setup/s/test' });
});

describe('POST /api/contractor/stripe/connect/onboard — idempotent account creation', () => {
  it('first call creates one account and persists it via an atomic conditional claim', async () => {
    const res = await POST(onboardReq());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ success: true, accountId: 'acct_new' });
    expect(body.url).toContain('connect.stripe.com');

    expect(mockCreateConnectedAccount).toHaveBeenCalledTimes(1);
    // The claim is conditional on no account having been set concurrently.
    expect(mockDb.contractorProfile.updateMany).toHaveBeenCalledWith({
      where: { id: 'profile_1', stripeConnectAccountId: null },
      data: { stripeConnectAccountId: 'acct_new' },
    });
    expect(mockDb.contractorProfile.update).not.toHaveBeenCalled();
    expect(mockCreateAccountLink).toHaveBeenCalledWith(
      'acct_new',
      expect.stringContaining('stripe=return'),
      expect.stringContaining('stripe=refresh')
    );
  });

  it('two sequential calls mint exactly one accounts.create; the second reuses it', async () => {
    // Call 1: no account yet -> creates and claims.
    mockDb.contractorProfile.findUnique.mockResolvedValueOnce(PROFILE_NO_ACCOUNT);
    const res1 = await POST(onboardReq());
    const body1 = await res1.json();

    // Call 2 (double-click/retry): the persisted id is read back.
    mockDb.contractorProfile.findUnique.mockResolvedValueOnce({
      ...PROFILE_NO_ACCOUNT,
      stripeConnectAccountId: 'acct_new',
    });
    const res2 = await POST(onboardReq());
    const body2 = await res2.json();

    expect(res1.status).toBe(200);
    expect(res2.status).toBe(200);
    expect(body1.accountId).toBe('acct_new');
    expect(body2.accountId).toBe('acct_new');

    // Exactly ONE connected account across both calls.
    expect(mockCreateConnectedAccount).toHaveBeenCalledTimes(1);
    // But a FRESH account-link is minted each time.
    expect(mockCreateAccountLink).toHaveBeenCalledTimes(2);
  });

  it('concurrent race loser reuses the winner account and never overwrites it', async () => {
    // Loser read the profile before the winner persisted; its conditional
    // claim then matches zero rows.
    mockDb.contractorProfile.findUnique
      .mockResolvedValueOnce(PROFILE_NO_ACCOUNT) // initial profile read
      .mockResolvedValueOnce({ stripeConnectAccountId: 'acct_winner' }); // winner re-read
    mockDb.contractorProfile.updateMany.mockResolvedValue({ count: 0 });

    const res = await POST(onboardReq());
    const body = await res.json();

    expect(res.status).toBe(200);
    // The response reuses the WINNER's account, not the discarded duplicate.
    expect(body.accountId).toBe('acct_winner');
    expect(mockCreateAccountLink).toHaveBeenCalledWith(
      'acct_winner',
      expect.any(String),
      expect.any(String)
    );
    // No unconditional write ever ran — the winner's id cannot be clobbered.
    expect(mockDb.contractorProfile.update).not.toHaveBeenCalled();
  });

  it('already-connected contractor: no accounts.create, only a fresh account-link', async () => {
    mockDb.contractorProfile.findUnique.mockResolvedValue(PROFILE_CONNECTED);

    const res = await POST(onboardReq());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.accountId).toBe('acct_existing');
    expect(mockCreateConnectedAccount).not.toHaveBeenCalled();
    expect(mockDb.contractorProfile.updateMany).not.toHaveBeenCalled();
    expect(mockCreateAccountLink).toHaveBeenCalledWith(
      'acct_existing',
      expect.any(String),
      expect.any(String)
    );
  });

  it('rejects callers without a contractor-capable role', async () => {
    mockAuth.mockResolvedValue({
      success: true,
      context: { user: { id: 'client_1', userType: 'CLIENT' } },
    });

    const res = await POST(onboardReq());

    expect(res.status).toBe(403);
    expect(mockCreateConnectedAccount).not.toHaveBeenCalled();
  });

  it('unauthenticated callers get the auth response untouched', async () => {
    mockAuth.mockResolvedValue({
      success: false,
      response: NextResponse.json({ error: 'unauthorized' }, { status: 401 }),
    });

    const res = await POST(onboardReq());

    expect(res.status).toBe(401);
    expect(mockCreateConnectedAccount).not.toHaveBeenCalled();
  });
});
