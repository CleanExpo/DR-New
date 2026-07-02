/**
 * Phase-5 e2e — Contractor payout idempotency & concurrency (DR-858 N-01/N-02, PR #174)
 *
 * Exercises the REAL `triggerPayoutForBooking` control flow with only its
 * boundaries mocked (Prisma, the Stripe SDK, the realtime emitter). No database
 * is required, so this runs in the default `jest` suite.
 *
 * What it proves:
 *   1. The payout uses a DETERMINISTIC idempotency key (`payout:<paymentId>`).
 *   2. A second call for an already-TRANSFERRED payment returns ALREADY_PAID and
 *      NEVER calls `stripe.transfers.create` again (no double pay).
 *   3. The concurrency loser (ledger create collides on the unique key) re-reads
 *      the winner's row and returns ALREADY_PAID without creating a 2nd transfer.
 *   4. The happy path creates exactly ONE transfer and writes the ledger.
 *   5. A Stripe failure marks the ledger FAILED and surfaces the error.
 *
 * The complementary test that proves the Postgres UNIQUE constraint itself
 * rejects a concurrent double-insert lives in
 * `src/__tests__/integration/contractor-payout-ledger.integration.test.ts`
 * and only runs against a real test database (npm run test:integration).
 */

export {}; // mark as a module so block-scoped test vars don't leak to global scope

const mockPrisma = {
  booking: { findUnique: jest.fn() },
  payment: { findFirst: jest.fn() },
  contractor: { findUnique: jest.fn() },
  contractorProfile: { findUnique: jest.fn() },
  contractorPayout: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

const mockCreateTransfer = jest.fn();
const mockEmitPayoutInitiated = jest.fn();

jest.mock('@/lib/prisma', () => ({ prisma: mockPrisma }));

// DR-896: the payout module must move money ONLY through the canonical
// `createTransfer` helper in `@/lib/stripe` — no ad-hoc Stripe client.
jest.mock('@/lib/stripe', () => ({
  createTransfer: (...args: unknown[]) => mockCreateTransfer(...args),
  getTransfer: jest.fn(),
}));

jest.mock('@/lib/realtime/payment-events', () => ({
  emitPayoutInitiated: (...args: unknown[]) => mockEmitPayoutInitiated(...args),
}));

const PAYMENT_ID = 'pay_1';
const BOOKING_ID = 'booking_1';
const CONTRACTOR_ID = 'contractor_1';
const EXPECTED_KEY = `payout:${PAYMENT_ID}`;
const FORTY_DAYS_AGO = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000);

// The canonical `@/lib/stripe` module is mocked above, so the payout module
// never constructs a real Stripe client under test.
type PayoutModule = typeof import('@/lib/payments/contractor-payout');
let mod: PayoutModule;

beforeAll(async () => {
  mod = await import('@/lib/payments/contractor-payout');
});

beforeEach(() => {
  mockPrisma.booking.findUnique.mockResolvedValue({
    id: BOOKING_ID,
    contractorId: CONTRACTOR_ID,
    contractor: { id: CONTRACTOR_ID, businessName: 'Acme Restoration', userId: 'user_1' },
  });
  mockPrisma.payment.findFirst.mockResolvedValue({
    id: PAYMENT_ID,
    status: 'COMPLETED',
    amountAUD: 1000,
    processedAt: FORTY_DAYS_AGO,
    contractorId: CONTRACTOR_ID,
    booking: { id: BOOKING_ID, contractorId: CONTRACTOR_ID },
  });
  // Canonical profile mapping: Contractor.id -> Contractor.userId ->
  // ContractorProfile.userId (ContractorProfile has NO contractorId column).
  mockPrisma.contractor.findUnique.mockResolvedValue({ userId: 'user_1' });
  mockPrisma.contractorProfile.findUnique.mockResolvedValue({
    stripeConnectAccountId: 'acct_123',
    stripePayoutsEnabled: true,
    stripeChargesEnabled: true,
  });
  mockPrisma.contractorPayout.findUnique.mockResolvedValue(null);
  mockPrisma.contractorPayout.create.mockResolvedValue({ id: 'ledger_1', amountAUD: 800 });
  mockPrisma.contractorPayout.update.mockResolvedValue({});
  mockCreateTransfer.mockResolvedValue({ id: 'tr_new' });
  mockEmitPayoutInitiated.mockResolvedValue(undefined);
});

describe('calculatePayoutAmount (pure)', () => {
  it('splits 80% contractor / 20% platform fee', () => {
    const { grossAmount, platformFee, netAmount } = mod.calculatePayoutAmount(1000);
    expect(grossAmount).toBe(1000);
    expect(platformFee).toBe(200);
    expect(netAmount).toBe(800);
  });
});

describe('isDisputeWindowPassed (pure)', () => {
  it('is false inside the 30-day window and true after it', () => {
    expect(mod.isDisputeWindowPassed(new Date())).toBe(false);
    expect(mod.isDisputeWindowPassed(FORTY_DAYS_AGO)).toBe(true);
  });
});

describe('triggerPayoutForBooking — idempotency & concurrency', () => {
  it('happy path: creates exactly one transfer with the deterministic key', async () => {
    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('TRANSFERRED');
    expect(result.payoutId).toBe('tr_new');
    expect(result.amount).toBe(800);

    // Exactly one call to the CANONICAL helper (DR-896), carrying the
    // deterministic idempotency key and correlatable metadata.
    expect(mockCreateTransfer).toHaveBeenCalledTimes(1);
    expect(mockCreateTransfer).toHaveBeenCalledWith(
      800,
      'acct_123',
      undefined,
      'aud',
      EXPECTED_KEY,
      expect.objectContaining({
        metadata: expect.objectContaining({
          bookingId: BOOKING_ID,
          paymentId: PAYMENT_ID,
          contractorId: CONTRACTOR_ID,
        }),
      })
    );
    // Correct id mapping: the payout profile is joined via Contractor.userId,
    // never a (nonexistent) ContractorProfile.contractorId filter.
    expect(mockPrisma.contractor.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: CONTRACTOR_ID } })
    );
    expect(mockPrisma.contractorProfile.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user_1' } })
    );
    // Ledger advanced to TRANSFERRED with the transfer id.
    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'TRANSFERRED', stripeTransferId: 'tr_new' }),
      })
    );
  });

  it('already paid: a second call returns ALREADY_PAID and never re-transfers', async () => {
    mockPrisma.contractorPayout.findUnique.mockResolvedValue({
      id: 'ledger_1',
      status: 'TRANSFERRED',
      stripeTransferId: 'tr_existing',
      amountAUD: 800,
    });

    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('ALREADY_PAID');
    expect(result.payoutId).toBe('tr_existing');
    expect(mockCreateTransfer).not.toHaveBeenCalled();
    expect(mockPrisma.contractorPayout.create).not.toHaveBeenCalled();
  });

  it('concurrency loser: ledger insert collides, re-reads winner, no second transfer', async () => {
    // 1st findUnique (the layer-2 guard) sees nothing yet; the create then loses
    // the race on the unique idempotencyKey; the catch re-reads the winner's row.
    mockPrisma.contractorPayout.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'ledger_winner',
        status: 'TRANSFERRED',
        stripeTransferId: 'tr_winner',
        amountAUD: 800,
      });
    mockPrisma.contractorPayout.create.mockRejectedValue(
      new Error('Unique constraint failed on the fields: (`idempotencyKey`)')
    );

    const result = await mod.triggerPayoutForBooking(BOOKING_ID);

    expect(result.status).toBe('ALREADY_PAID');
    expect(result.payoutId).toBe('tr_winner');
    expect(mockCreateTransfer).not.toHaveBeenCalled();
  });

  it('stripe failure: marks the ledger FAILED and throws', async () => {
    mockCreateTransfer.mockRejectedValue(new Error('insufficient funds'));

    await expect(mod.triggerPayoutForBooking(BOOKING_ID)).rejects.toThrow(
      /Failed to create Stripe transfer/
    );

    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'FAILED' }),
      })
    );
  });

  it('refuses to pay before the dispute window has passed', async () => {
    mockPrisma.payment.findFirst.mockResolvedValue({
      id: PAYMENT_ID,
      status: 'COMPLETED',
      amountAUD: 1000,
      processedAt: new Date(), // today — inside the 30-day window
      contractorId: CONTRACTOR_ID,
      booking: { id: BOOKING_ID, contractorId: CONTRACTOR_ID },
    });

    await expect(mod.triggerPayoutForBooking(BOOKING_ID)).rejects.toThrow(
      /Dispute window has not yet passed/
    );
    expect(mockCreateTransfer).not.toHaveBeenCalled();
  });
});

describe('manualPayoutToContractor — canonical helper + ledger (DR-896)', () => {
  it('moves money only through createTransfer, with a ledgered payout: key', async () => {
    const result = await mod.manualPayoutToContractor(CONTRACTOR_ID, 150, 'Goodwill adjustment');

    expect(result.status).toBe('TRANSFERRED');
    expect(result.payoutId).toBe('tr_new');

    // Exactly one canonical-helper call carrying the ledgered idempotency key.
    expect(mockCreateTransfer).toHaveBeenCalledTimes(1);
    const [amount, destination, transferGroup, currency, idempotencyKey] =
      mockCreateTransfer.mock.calls[0];
    expect(amount).toBe(150);
    expect(destination).toBe('acct_123');
    expect(transferGroup).toBeUndefined();
    expect(currency).toBe('aud');
    expect(idempotencyKey).toMatch(/^payout:manual:/);

    // The ledger row is claimed BEFORE the Stripe call with the SAME key.
    expect(mockPrisma.contractorPayout.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        idempotencyKey,
        contractorId: CONTRACTOR_ID,
        connectedAccount: 'acct_123',
        amountAUD: 150,
        status: 'PENDING',
      }),
    });
    const createOrder = mockPrisma.contractorPayout.create.mock.invocationCallOrder[0];
    const transferOrder = mockCreateTransfer.mock.invocationCallOrder[0];
    expect(createOrder).toBeLessThan(transferOrder);

    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ status: 'TRANSFERRED', stripeTransferId: 'tr_new' }),
      })
    );
  });

  it('stripe failure: ledger marked FAILED, error surfaced', async () => {
    mockCreateTransfer.mockRejectedValue(new Error('balance_insufficient'));

    await expect(
      mod.manualPayoutToContractor(CONTRACTOR_ID, 150, 'Goodwill adjustment')
    ).rejects.toThrow(/Failed to create manual transfer/);

    expect(mockPrisma.contractorPayout.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: 'FAILED',
          failureReason: 'balance_insufficient',
        }),
      })
    );
  });
});
