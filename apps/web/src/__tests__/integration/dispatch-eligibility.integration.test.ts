/**
 * Phase-5 DB invariant — Dispatch eligibility exclusion (DR-858 N-04, PR #177)
 *
 * Proves against a REAL Postgres that `filterDispatchEligible` physically
 * EXCLUDES a contractor who fails any single gate, and includes only the one who
 * passes all of them. The unit test
 * (src/__tests__/dispatch/dispatch-eligibility.test.ts) proves the query is
 * CONSTRUCTED with the gates; this proves the database actually enforces them.
 *
 * Seeds one contractor per failure mode (each its own User, Option B: the
 * dispatch key is User.id) plus one fully-eligible contractor:
 *   - eligible        : all gates pass
 *   - noIca           : no current-version ICA acceptance
 *   - expiredIns      : public liability insurance expired
 *   - expiredCert     : IICRC cert expired
 *   - suspended       : contractor isSuspended = true
 *   - inactiveUser    : owning User isActive = false
 * Expectation: filterDispatchEligible returns EXACTLY { eligible }.
 *
 * SAFETY: writes to DATABASE_URL. OPT-IN via RUN_DB_INTEGRATION=1 (CI sets this
 * against a TEST database, never prod). Excluded from the default `jest` run;
 * runs via `npm run test:integration`.
 */
// Use the app's configured singleton (typed `any` in this codebase, and remapped
// by jest to the freshly-generated .prisma/client), not a direct @prisma/client
// import whose types tsc resolves stale in this monorepo.
import { prisma } from '@/lib/prisma';
import { ICA_VERSION } from '@/lib/legal/ica';
import { NRPG_CERTIFICATION_NAME } from '@/lib/training/training-policy';
import { filterDispatchEligible, isDispatchEligible } from '@/lib/services/dispatch-eligibility';

const ENABLED = process.env.RUN_DB_INTEGRATION === '1';
if (!ENABLED) {
  // eslint-disable-next-line no-console
  console.warn(
    '[dispatch-eligibility.integration] SKIPPED — set RUN_DB_INTEGRATION=1 (with a TEST database, never prod) to run.'
  );
}
const describeDb = ENABLED ? describe : describe.skip;

describeDb('filterDispatchEligible — DB exclusion invariants', () => {
  const TEST_ID = Date.now().toString();
  let tenantId: string;
  // case label -> the contractor's User.id (the dispatch key)
  const userIds: Record<string, string> = {};

  const future = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
  const past = new Date(Date.now() - 24 * 60 * 60 * 1000);

  /**
   * Create a User + Contractor (+ optional cert + optional ICA acceptance) for a
   * case. Defaults describe a fully-eligible contractor; pass overrides to break
   * exactly one gate.
   */
  async function seedContractor(
    label: string,
    opts: {
      acceptIca?: boolean;
      insuranceExpiry?: Date;
      certExpiry?: Date;
      certActive?: boolean;
      isSuspended?: boolean;
      userActive?: boolean;
      stripePayoutsEnabled?: boolean;
      stripeChargesEnabled?: boolean;
      trainingCertExpiry?: Date | null; // null => no NRP training cert (DR-893)
      trainingCertVerified?: boolean;
    } = {}
  ) {
    const {
      acceptIca = true,
      insuranceExpiry = future,
      certExpiry = future,
      certActive = true,
      isSuspended = false,
      userActive = true,
      stripePayoutsEnabled = true,
      stripeChargesEnabled = true,
      trainingCertExpiry = future,
      trainingCertVerified = true,
    } = opts;

    const user = await prisma.user.create({
      data: {
        email: `disp-${label}-${TEST_ID}@test.com`,
        name: `Dispatch ${label}`,
        userType: 'CONTRACTOR',
        tenantId,
        isActive: userActive,
      },
    });
    userIds[label] = user.id;

    const contractor = await prisma.contractor.create({
      data: {
        userId: user.id,
        businessName: `Dispatch ${label} Co ${TEST_ID}`,
        tenantId,
        isActive: true,
        isSuspended,
        publicLiabilityExpiryDate: insuranceExpiry,
      },
    });

    await prisma.iICRCCertification.create({
      data: {
        contractorId: contractor.id,
        certificationLevel: 'TECHNICIAN',
        certificationCode: `CERT-${label}-${TEST_ID}`,
        certificationDate: past,
        expiryDate: certExpiry,
        isActive: certActive,
      },
    });

    // Stripe capability flags live on ContractorProfile (webhook-synced, DR-898)
    await prisma.contractorProfile.create({
      data: {
        userId: user.id,
        businessName: `Dispatch ${label} Co ${TEST_ID}`,
        tenantId,
        stripeConnectAccountId: `acct_${label}_${TEST_ID}`,
        stripePayoutsEnabled,
        stripeChargesEnabled,
      },
    });

    if (acceptIca) {
      await prisma.contractorAgreementAcceptance.create({
        data: {
          contractorId: user.id, // Option B: ICA acceptance keyed on User.id
          version: ICA_VERSION,
          documentHash: 'test-hash',
          signedName: `Dispatch ${label}`,
        },
      });
    }

    // DR-893: verified NRP training certification, keyed on User.id.
    if (trainingCertExpiry !== null) {
      await prisma.contractorCertification.create({
        data: {
          contractorId: user.id,
          certificationName: NRPG_CERTIFICATION_NAME,
          certificationLevel: 1,
          issueDate: past,
          expiryDate: trainingCertExpiry,
          specializations: ['water'],
          verified: trainingCertVerified,
          tenantId,
        },
      });
    }
  }

  beforeAll(async () => {
    const tenant = await prisma.tenant.create({
      data: { name: `Dispatch Tenant ${TEST_ID}`, domain: `disp-${TEST_ID}.local`, isActive: true },
    });
    tenantId = tenant.id;

    await seedContractor('eligible');
    await seedContractor('noIca', { acceptIca: false });
    await seedContractor('expiredIns', { insuranceExpiry: past });
    await seedContractor('expiredCert', { certExpiry: past });
    await seedContractor('suspended', { isSuspended: true });
    await seedContractor('inactiveUser', { userActive: false });
    await seedContractor('payoutsDisabled', { stripePayoutsEnabled: false });
    await seedContractor('noTrainingCert', { trainingCertExpiry: null });
    await seedContractor('expiredTrainingCert', { trainingCertExpiry: past });
    await seedContractor('unverifiedTrainingCert', { trainingCertVerified: false });
  });

  afterAll(async () => {
    const uids = Object.values(userIds);
    await prisma.iICRCCertification.deleteMany({
      where: { contractor: { userId: { in: uids } } },
    });
    await prisma.contractorCertification.deleteMany({
      where: { contractorId: { in: uids } },
    });
    await prisma.contractorAgreementAcceptance.deleteMany({
      where: { contractorId: { in: uids } },
    });
    await prisma.contractorProfile.deleteMany({ where: { userId: { in: uids } } });
    await prisma.contractor.deleteMany({ where: { userId: { in: uids } } });
    await prisma.user.deleteMany({ where: { tenantId } });
    await prisma.tenant.delete({ where: { id: tenantId } });
    await prisma.$disconnect();
  });

  it('returns EXACTLY the fully-eligible contractor', async () => {
    const all = Object.values(userIds);
    const eligible = await filterDispatchEligible(all);

    expect(eligible.has(userIds.eligible)).toBe(true);
    expect(eligible.size).toBe(1);
  });

  it.each([
    ['noIca', 'no current-version ICA acceptance'],
    ['expiredIns', 'expired public liability insurance'],
    ['expiredCert', 'expired IICRC certification'],
    ['suspended', 'suspended contractor'],
    ['inactiveUser', 'inactive owning user'],
    ['payoutsDisabled', 'Stripe payouts capability disabled (DR-898)'],
    ['noTrainingCert', 'no NRP training certification (DR-893)'],
    ['expiredTrainingCert', 'expired NRP training certification (DR-893)'],
    ['unverifiedTrainingCert', 'unverified NRP training certification (DR-893)'],
  ])('excludes %s (%s)', async (label) => {
    await expect(isDispatchEligible(userIds[label])).resolves.toBe(false);
  });

  it('includes the eligible contractor via the single-id helper', async () => {
    await expect(isDispatchEligible(userIds.eligible)).resolves.toBe(true);
  });
});
