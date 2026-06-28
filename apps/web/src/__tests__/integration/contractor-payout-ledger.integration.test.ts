/**
 * Phase-5 DB invariant — Contractor payout ledger (DR-858 N-02, PR #174)
 *
 * Proves against a REAL Postgres that the `contractor_payouts` ledger physically
 * prevents a double payout under replay/concurrency — the guarantee the unit
 * test (src/__tests__/payments/contractor-payout-idempotency.test.ts) cannot
 * make because it mocks Prisma:
 *
 *   1. A duplicate `idempotencyKey` insert is rejected (P2002).
 *   2. A duplicate `stripeTransferId` insert is rejected (P2002).
 *   3. Under N concurrent inserts of the same key, exactly ONE wins — the DB
 *      unique index is the serialization point, so the payout can fire once.
 *
 * SAFETY: this writes to the database in DATABASE_URL. The only DB reachable
 * from a dev box here is PRODUCTION, so the suite is OPT-IN: it runs only when
 * RUN_DB_INTEGRATION=1 (CI sets this against a dedicated test database). It is
 * also excluded from the default `jest` run (jest.config.ts ignores
 * src/__tests__/integration/) and runs via `npm run test:integration`.
 */
// Use the app's configured singleton (typed `any` in this codebase, and remapped
// by jest to the freshly-generated .prisma/client), not a direct @prisma/client
// import whose types tsc resolves stale in this monorepo.
import { prisma } from '@/lib/prisma';

const ENABLED = process.env.RUN_DB_INTEGRATION === '1';
if (!ENABLED) {
  // Loud, not silent — a skipped suite must not read as "covered".
  // eslint-disable-next-line no-console
  console.warn(
    '[contractor-payout-ledger] SKIPPED — set RUN_DB_INTEGRATION=1 (with a TEST database, never prod) to run.'
  );
}
const describeDb = ENABLED ? describe : describe.skip;

function isUniqueViolation(e: unknown): boolean {
  // P2002 = Prisma unique-constraint violation. Duck-typed to avoid depending on
  // @prisma/client types (stale in this monorepo's tsc resolution).
  return (e as { code?: string })?.code === 'P2002';
}

describeDb('ContractorPayout ledger — DB uniqueness invariants', () => {
  const TEST_ID = Date.now().toString();
  const keyPrefix = `payout:test:${TEST_ID}`;

  afterAll(async () => {
    await prisma.contractorPayout.deleteMany({
      where: { idempotencyKey: { startsWith: keyPrefix } },
    });
    await prisma.$disconnect();
  });

  it('rejects a second insert with the same idempotencyKey', async () => {
    const idempotencyKey = `${keyPrefix}:dup-key`;
    await prisma.contractorPayout.create({
      data: { idempotencyKey, amountAUD: 800, platformFeeAUD: 200, status: 'TRANSFERRED' },
    });

    let threw = false;
    try {
      await prisma.contractorPayout.create({
        data: { idempotencyKey, amountAUD: 800, platformFeeAUD: 200, status: 'TRANSFERRED' },
      });
    } catch (e) {
      threw = true;
      expect(isUniqueViolation(e)).toBe(true);
    }
    expect(threw).toBe(true);

    // Exactly one row exists for the key.
    const count = await prisma.contractorPayout.count({ where: { idempotencyKey } });
    expect(count).toBe(1);
  });

  it('rejects a second insert with the same stripeTransferId', async () => {
    const stripeTransferId = `tr_test_${TEST_ID}`;
    await prisma.contractorPayout.create({
      data: {
        idempotencyKey: `${keyPrefix}:xfer-a`,
        stripeTransferId,
        amountAUD: 500,
        platformFeeAUD: 125,
        status: 'TRANSFERRED',
      },
    });

    let threw = false;
    try {
      await prisma.contractorPayout.create({
        data: {
          idempotencyKey: `${keyPrefix}:xfer-b`,
          stripeTransferId, // same transfer id, different key
          amountAUD: 500,
          platformFeeAUD: 125,
          status: 'TRANSFERRED',
        },
      });
    } catch (e) {
      threw = true;
      expect(isUniqueViolation(e)).toBe(true);
    }
    expect(threw).toBe(true);
  });

  it('serializes concurrent inserts of the same key: exactly one wins', async () => {
    const idempotencyKey = `${keyPrefix}:concurrent`;
    const attempts = 8;

    const results = await Promise.allSettled(
      Array.from({ length: attempts }, () =>
        prisma.contractorPayout.create({
          data: { idempotencyKey, amountAUD: 800, platformFeeAUD: 200, status: 'PENDING' },
        })
      )
    );

    const fulfilled = results.filter((r) => r.status === 'fulfilled');
    const rejected = results.filter(
      (r): r is PromiseRejectedResult => r.status === 'rejected'
    );

    expect(fulfilled).toHaveLength(1);
    expect(rejected).toHaveLength(attempts - 1);
    // Every loser failed specifically on the unique constraint.
    for (const r of rejected) {
      expect(isUniqueViolation(r.reason)).toBe(true);
    }

    const count = await prisma.contractorPayout.count({ where: { idempotencyKey } });
    expect(count).toBe(1);
  });
});
