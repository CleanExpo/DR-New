/**
 * @jest-environment node
 *
 * DR-902 — PII retention sweep (APP 11.2).
 *
 * Drives the REAL `runPiiRetentionSweep` service and the REAL
 * `app/api/cron/pii-retention-sweep/route.ts` handler with prisma and cloud
 * storage mocked.
 *
 * What it proves:
 *   1. CRON_SECRET gate (401 without/with wrong secret; DB untouched).
 *   2. DRY RUN is the default and is truly read-only: eligible/wouldDestroy
 *      counts are reported per class and ZERO writes / storage deletes happen.
 *      `?dryRun=1` forces dry run even when PII_SWEEP_EXECUTE=true.
 *   3. Execute mode destroys EXACTLY the eligible rows per class with the
 *      spec'd method (field-nulling / sentinel de-identification) and deletes
 *      the underlying storage objects for purged documents.
 *   4. Each carve-out blocks destruction: legal hold, active dispute/claim,
 *      and the 7-year financial floor (window clamp + RETAIN report-only).
 *   5. Idempotency guards and the injectable clock shape every query.
 */
import { NextRequest } from 'next/server';

jest.mock('@/lib/prisma', () => ({
  basePrisma: {
    insuranceClaimAU: { findMany: jest.fn() },
    contractorDocument: { findMany: jest.fn(), updateMany: jest.fn() },
    contractorApplication: { findMany: jest.fn(), updateMany: jest.fn() },
    contactEnquiry: { findMany: jest.fn(), updateMany: jest.fn() },
    contractorVerificationHistory: { findMany: jest.fn(), updateMany: jest.fn() },
    auditLogEntry: { findMany: jest.fn(), updateMany: jest.fn() },
    contractorPayout: { count: jest.fn() },
    invoiceAU: { count: jest.fn() },
    payment: { count: jest.fn() },
  },
}));

jest.mock('@/lib/storage/cloud-storage', () => ({
  deleteFile: jest.fn(),
}));

import { basePrisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/storage/cloud-storage';
import { runPiiRetentionSweep } from '@/lib/privacy/pii-retention-sweep';
import {
  FINANCIAL_RECORD_MINIMUM_DAYS,
  getEffectiveWindowDays,
  PII_PURGED_SENTINEL,
  PII_RETENTION_POLICY,
} from '@/lib/privacy/pii-retention-policy';
import { GET as cronGET } from '@/app/api/cron/pii-retention-sweep/route';

const db = basePrisma as unknown as {
  insuranceClaimAU: { findMany: jest.Mock };
  contractorDocument: { findMany: jest.Mock; updateMany: jest.Mock };
  contractorApplication: { findMany: jest.Mock; updateMany: jest.Mock };
  contactEnquiry: { findMany: jest.Mock; updateMany: jest.Mock };
  contractorVerificationHistory: { findMany: jest.Mock; updateMany: jest.Mock };
  auditLogEntry: { findMany: jest.Mock; updateMany: jest.Mock };
  contractorPayout: { count: jest.Mock };
  invoiceAU: { count: jest.Mock };
  payment: { count: jest.Mock };
};
const mockDeleteFile = deleteFile as jest.Mock;

const NOW = new Date('2026-07-02T04:15:00Z');
const DAY_MS = 24 * 60 * 60 * 1000;

const ALL_UPDATE_MANY = () => [
  db.contractorDocument.updateMany,
  db.contractorApplication.updateMany,
  db.contactEnquiry.updateMany,
  db.contractorVerificationHistory.updateMany,
  db.auditLogEntry.updateMany,
];

/** Seed every class with eligible rows (past window, correct state). */
function seedEligibleEverywhere(opts?: {
  verificationDocs?: Array<{ id: string; contractorId: string; fileUrl: string }>;
  policeDocs?: Array<{ id: string; contractorId: string; fileUrl: string }>;
}) {
  const verificationDocs = opts?.verificationDocs ?? [
    { id: 'doc_a', contractorId: 'c_1', fileUrl: 'https://bucket.example/docs/doc_a.pdf' },
    { id: 'doc_b', contractorId: 'c_2', fileUrl: 'docs/doc_b.pdf' },
  ];
  const policeDocs = opts?.policeDocs ?? [
    { id: 'pol_a', contractorId: 'c_1', fileUrl: 'docs/pol_a.pdf' },
  ];
  // Route by documentType: POLICE_CHECK query vs everything-else query.
  db.contractorDocument.findMany.mockImplementation(async ({ where }: any) =>
    where.documentType === 'POLICE_CHECK' ? policeDocs : verificationDocs
  );
  db.contractorApplication.findMany.mockResolvedValue([
    { id: 'app_1', convertedContractor: null },
    { id: 'app_2', convertedContractor: null },
  ]);
  db.contactEnquiry.findMany.mockResolvedValue([{ id: 'enq_1' }, { id: 'enq_2' }]);
  db.contractorVerificationHistory.findMany.mockResolvedValue([
    { id: 'vh_1', contractorId: 'c_1' },
  ]);
  db.auditLogEntry.findMany.mockResolvedValue([{ id: 'al_1', userId: 'u_9' }]);
  db.contractorPayout.count.mockResolvedValue(3);
  db.invoiceAU.count.mockResolvedValue(2);
  db.payment.count.mockResolvedValue(5);
}

function classResult(result: Awaited<ReturnType<typeof runPiiRetentionSweep>>, id: string) {
  const cls = result.classes.find((c) => c.classId === id);
  if (!cls) throw new Error(`class ${id} missing from sweep result`);
  return cls;
}

const ENV_KEYS = [
  'CRON_SECRET',
  'PII_SWEEP_EXECUTE',
  'PII_LEGAL_HOLD_CONTRACTOR_IDS',
  'PII_RETENTION_FINANCIAL_RECORDS_DAYS',
];
const savedEnv: Record<string, string | undefined> = {};

beforeAll(() => {
  for (const k of ENV_KEYS) savedEnv[k] = process.env[k];
});

afterAll(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
});

beforeEach(() => {
  jest.clearAllMocks();
  for (const k of ENV_KEYS) delete process.env[k];
  // Empty world by default.
  db.insuranceClaimAU.findMany.mockResolvedValue([]);
  db.contractorDocument.findMany.mockResolvedValue([]);
  db.contractorApplication.findMany.mockResolvedValue([]);
  db.contactEnquiry.findMany.mockResolvedValue([]);
  db.contractorVerificationHistory.findMany.mockResolvedValue([]);
  db.auditLogEntry.findMany.mockResolvedValue([]);
  db.contractorPayout.count.mockResolvedValue(0);
  db.invoiceAU.count.mockResolvedValue(0);
  db.payment.count.mockResolvedValue(0);
  // updateMany echoes the number of targeted ids.
  const echoCount = async ({ where }: any) => ({ count: where?.id?.in?.length ?? 0 });
  for (const m of ALL_UPDATE_MANY()) m.mockImplementation(echoCount);
  mockDeleteFile.mockResolvedValue(undefined);
});

describe('GET /api/cron/pii-retention-sweep — CRON_SECRET gate', () => {
  beforeEach(() => {
    process.env.CRON_SECRET = 'test-cron-secret';
  });

  it('rejects a request with no secret and never touches the DB', async () => {
    const res = await cronGET(new NextRequest('http://localhost/api/cron/pii-retention-sweep'));
    expect(res.status).toBe(401);
    expect(db.insuranceClaimAU.findMany).not.toHaveBeenCalled();
    expect(db.contractorDocument.findMany).not.toHaveBeenCalled();
  });

  it('rejects a wrong secret', async () => {
    const res = await cronGET(
      new NextRequest('http://localhost/api/cron/pii-retention-sweep', {
        headers: { authorization: 'Bearer wrong-secret' },
      })
    );
    expect(res.status).toBe(401);
    expect(db.insuranceClaimAU.findMany).not.toHaveBeenCalled();
  });

  it('accepts the configured secret and runs (DRY_RUN by default)', async () => {
    const res = await cronGET(
      new NextRequest('http://localhost/api/cron/pii-retention-sweep', {
        headers: { authorization: 'Bearer test-cron-secret' },
      })
    );
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.mode).toBe('DRY_RUN');
    expect(body.executeEnabled).toBe(false);
    expect(body.classes.length).toBeGreaterThanOrEqual(6);
  });
});

describe('dry run is first-class and truly read-only', () => {
  it('reports per-class wouldDestroy counts and issues ZERO writes', async () => {
    seedEligibleEverywhere();

    const result = await runPiiRetentionSweep({ execute: false, now: NOW, env: {} });

    expect(result.mode).toBe('DRY_RUN');
    expect(classResult(result, 'VERIFICATION_DOCUMENTS').targets[0]).toMatchObject({
      eligible: 2,
      wouldDestroy: 2,
      destroyed: 0,
    });
    expect(classResult(result, 'POLICE_CHECK_RESULTS').targets[0]).toMatchObject({
      eligible: 1,
      wouldDestroy: 1,
      destroyed: 0,
    });
    expect(classResult(result, 'UNSUCCESSFUL_APPLICANTS').targets[0]).toMatchObject({
      eligible: 2,
      wouldDestroy: 2,
      destroyed: 0,
    });
    expect(classResult(result, 'CONTACT_ENQUIRIES').targets[0]).toMatchObject({
      eligible: 2,
      wouldDestroy: 2,
      destroyed: 0,
    });
    expect(result.totals.destroyed).toBe(0);
    expect(result.totals.wouldDestroy).toBeGreaterThan(0);

    // The safety property: nothing was written, nothing was deleted.
    for (const m of ALL_UPDATE_MANY()) expect(m).not.toHaveBeenCalled();
    expect(mockDeleteFile).not.toHaveBeenCalled();
  });

  it('route defaults to DRY_RUN when PII_SWEEP_EXECUTE is unset', async () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    seedEligibleEverywhere();

    const res = await cronGET(
      new NextRequest('http://localhost/api/cron/pii-retention-sweep', {
        headers: { authorization: 'Bearer test-cron-secret' },
      })
    );
    const body = await res.json();

    expect(body.mode).toBe('DRY_RUN');
    for (const m of ALL_UPDATE_MANY()) expect(m).not.toHaveBeenCalled();
  });

  it('?dryRun=1 forces DRY_RUN even when PII_SWEEP_EXECUTE=true', async () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    process.env.PII_SWEEP_EXECUTE = 'true';
    seedEligibleEverywhere();

    const res = await cronGET(
      new NextRequest('http://localhost/api/cron/pii-retention-sweep?dryRun=1', {
        headers: { authorization: 'Bearer test-cron-secret' },
      })
    );
    const body = await res.json();

    expect(body.mode).toBe('DRY_RUN');
    expect(body.dryRunForced).toBe(true);
    expect(body.executeEnabled).toBe(true);
    for (const m of ALL_UPDATE_MANY()) expect(m).not.toHaveBeenCalled();
    expect(mockDeleteFile).not.toHaveBeenCalled();
  });

  it('route executes only when PII_SWEEP_EXECUTE=true and no dryRun override', async () => {
    process.env.CRON_SECRET = 'test-cron-secret';
    process.env.PII_SWEEP_EXECUTE = 'true';
    seedEligibleEverywhere();

    const res = await cronGET(
      new NextRequest('http://localhost/api/cron/pii-retention-sweep', {
        headers: { authorization: 'Bearer test-cron-secret' },
      })
    );
    const body = await res.json();

    expect(body.mode).toBe('EXECUTE');
    expect(db.contractorDocument.updateMany).toHaveBeenCalled();
  });
});

describe('execute mode destroys exactly the eligible rows per class', () => {
  it('de-identifies each class with the spec method and exact id sets', async () => {
    seedEligibleEverywhere();

    const result = await runPiiRetentionSweep({ execute: true, now: NOW, env: {} });
    expect(result.mode).toBe('EXECUTE');

    // Verification documents: sentinel file fields, nulled numbers, storage gone.
    expect(db.contractorDocument.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['doc_a', 'doc_b'] } },
      data: {
        fileName: PII_PURGED_SENTINEL,
        fileUrl: PII_PURGED_SENTINEL,
        documentNumber: null,
        issuingAuthority: null,
        rejectionReason: null,
      },
    });
    // Police check: raw certificate purged (outcome/status row retained).
    expect(db.contractorDocument.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['pol_a'] } },
      data: expect.objectContaining({ fileUrl: PII_PURGED_SENTINEL, documentNumber: null }),
    });
    expect(classResult(result, 'VERIFICATION_DOCUMENTS').targets[0].destroyed).toBe(2);
    expect(classResult(result, 'POLICE_CHECK_RESULTS').targets[0].destroyed).toBe(1);

    // Storage objects deleted for every purged document (URL → key derived).
    expect(mockDeleteFile).toHaveBeenCalledTimes(3);
    expect(mockDeleteFile).toHaveBeenCalledWith('docs/doc_a.pdf'); // from https URL
    expect(mockDeleteFile).toHaveBeenCalledWith('docs/doc_b.pdf'); // raw key
    expect(mockDeleteFile).toHaveBeenCalledWith('docs/pol_a.pdf');

    // Unsuccessful applicants: identity + JSON PII blobs neutralised.
    expect(db.contractorApplication.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['app_1', 'app_2'] } },
      data: expect.objectContaining({
        contactName: PII_PURGED_SENTINEL,
        email: PII_PURGED_SENTINEL,
        phone: PII_PURGED_SENTINEL,
        abn: PII_PURGED_SENTINEL,
        notes: null,
        bankingData: { piiPurged: true },
        insuranceData: { piiPurged: true },
      }),
    });

    // Contact enquiries: purge-lead-pii-compatible nulling + piiPurgedAt stamp.
    expect(db.contactEnquiry.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['enq_1', 'enq_2'] }, piiPurgedAt: null },
      data: expect.objectContaining({
        firstName: PII_PURGED_SENTINEL,
        email: PII_PURGED_SENTINEL,
        phone: null,
        ipAddress: null,
        userAgent: null,
        piiPurgedAt: NOW,
      }),
    });

    // Audit trails: IP/UA nulled, event rows retained (no deleteMany exists).
    expect(db.contractorVerificationHistory.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['vh_1'] } },
      data: { ipAddress: null, userAgent: null },
    });
    expect(db.auditLogEntry.updateMany).toHaveBeenCalledWith({
      where: { id: { in: ['al_1'] } },
      data: { ipAddress: null, userAgent: null },
    });

    expect(result.totals.destroyed).toBe(2 + 1 + 2 + 2 + 1 + 1);
  });

  it('uses the injectable clock: cutoffs derive from `now` minus each window', async () => {
    await runPiiRetentionSweep({ execute: false, now: NOW, env: {} });

    const verifWindow = PII_RETENTION_POLICY.VERIFICATION_DOCUMENTS.defaultWindowDays;
    const verifCall = db.contractorDocument.findMany.mock.calls.find(
      ([args]: any) => args.where.documentType?.not === 'POLICE_CHECK'
    );
    expect(verifCall[0].where.updatedAt.lt).toEqual(
      new Date(NOW.getTime() - verifWindow * DAY_MS)
    );

    const enquiryWindow = PII_RETENTION_POLICY.CONTACT_ENQUIRIES.defaultWindowDays;
    expect(db.contactEnquiry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          submittedAt: { lt: new Date(NOW.getTime() - enquiryWindow * DAY_MS) },
          piiPurgedAt: null, // idempotency guard
        }),
      })
    );
  });

  it('queries carry idempotency guards (already-purged rows excluded)', async () => {
    await runPiiRetentionSweep({ execute: false, now: NOW, env: {} });

    for (const [args] of db.contractorDocument.findMany.mock.calls) {
      expect(args.where.fileName).toEqual({ not: PII_PURGED_SENTINEL });
    }
    expect(db.contractorApplication.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ email: { not: PII_PURGED_SENTINEL } }),
      })
    );
    expect(db.auditLogEntry.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: [{ ipAddress: { not: null } }, { userAgent: { not: null } }],
        }),
      })
    );
  });
});

describe('carve-outs block destruction BEFORE any write', () => {
  it('legal hold (config/env list) exempts every row of a held contractor', async () => {
    seedEligibleEverywhere();

    const result = await runPiiRetentionSweep({
      execute: true,
      now: NOW,
      env: { PII_LEGAL_HOLD_CONTRACTOR_IDS: 'c_1' },
    });

    // doc_a (c_1) held; doc_b (c_2) destroyed. pol_a (c_1) held entirely.
    expect(db.contractorDocument.updateMany).toHaveBeenCalledTimes(1);
    expect(db.contractorDocument.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: { in: ['doc_b'] } } })
    );
    const verif = classResult(result, 'VERIFICATION_DOCUMENTS').targets[0];
    expect(verif.heldBack.legalHold).toBe(1);
    expect(verif.destroyed).toBe(1);
    const police = classResult(result, 'POLICE_CHECK_RESULTS').targets[0];
    expect(police.heldBack.legalHold).toBe(1);
    expect(police.destroyed).toBe(0);
    // vh_1 (c_1) audit-trail row also held.
    expect(db.contractorVerificationHistory.updateMany).not.toHaveBeenCalled();
    expect(result.carveOuts.legalHoldIds).toBe(1);
    // Held document's storage object survives.
    expect(mockDeleteFile).not.toHaveBeenCalledWith('docs/doc_a.pdf');
    expect(mockDeleteFile).not.toHaveBeenCalledWith('docs/pol_a.pdf');
  });

  it('active dispute/claim exempts the contractor (via booking linkage)', async () => {
    seedEligibleEverywhere();
    db.insuranceClaimAU.findMany.mockResolvedValue([
      { booking: { contractorId: 'c_2' } }, // c_2 is in an open claim
      { booking: null },
    ]);

    const result = await runPiiRetentionSweep({ execute: true, now: NOW, env: {} });

    // Only asks for NON-terminal claim statuses.
    expect(db.insuranceClaimAU.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          status: {
            in: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PARTIALLY_APPROVED'],
          },
        },
      })
    );
    // doc_b (c_2) is held back; doc_a (c_1) is destroyed.
    expect(db.contractorDocument.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: { in: ['doc_a'] } } })
    );
    const verif = classResult(result, 'VERIFICATION_DOCUMENTS').targets[0];
    expect(verif.heldBack.activeDispute).toBe(1);
    expect(verif.destroyed).toBe(1);
    expect(result.carveOuts.activeDisputeContractorIds).toBe(1);
    expect(mockDeleteFile).not.toHaveBeenCalledWith('docs/doc_b.pdf');
  });

  it('financial minimum: a shorter owner window is clamped to the 7-year floor and nothing is ever destroyed', async () => {
    seedEligibleEverywhere();

    const result = await runPiiRetentionSweep({
      execute: true,
      now: NOW,
      env: { PII_RETENTION_FINANCIAL_RECORDS_DAYS: '30' }, // owner mis-set: 30 days
    });

    const fin = classResult(result, 'FINANCIAL_RECORDS');
    expect(fin.windowDays).toBe(FINANCIAL_RECORD_MINIMUM_DAYS); // clamp wins
    expect(fin.action).toBe('REPORT_ONLY');
    expect(result.carveOuts.financialMinimumClamped).toBe(true);
    // Rows past even the 7-year cutoff are REPORTED, never destroyed.
    expect(fin.targets.map((t) => t.eligible)).toEqual([3, 2, 5]);
    for (const t of fin.targets) {
      expect(t.wouldDestroy).toBe(0);
      expect(t.destroyed).toBe(0);
    }
    // The financial cutoff actually used the clamped window.
    expect(db.contractorPayout.count).toHaveBeenCalledWith({
      where: { createdAt: { lt: new Date(NOW.getTime() - FINANCIAL_RECORD_MINIMUM_DAYS * DAY_MS) } },
    });
  });
});

describe('pii-retention-policy config', () => {
  it('every class has a window, method, legal basis and env override', () => {
    for (const cls of Object.values(PII_RETENTION_POLICY)) {
      expect(cls.defaultWindowDays).toBeGreaterThan(0);
      expect(['DELETE', 'DE_IDENTIFY', 'RETAIN']).toContain(cls.method);
      expect(cls.legalBasis.length).toBeGreaterThan(0);
      expect(cls.envVar).toMatch(/^[A-Z0-9_]+$/);
      expect(cls.tables.length).toBeGreaterThan(0);
    }
  });

  it('getEffectiveWindowDays: env override wins, junk is ignored, financial is floored', () => {
    const env = (vars: Record<string, string>) => vars;
    expect(getEffectiveWindowDays('CONTACT_ENQUIRIES', env({}))).toBe(365);
    expect(
      getEffectiveWindowDays('CONTACT_ENQUIRIES', env({ LEAD_PII_RETENTION_DAYS: '90' }))
    ).toBe(90);
    expect(
      getEffectiveWindowDays('CONTACT_ENQUIRIES', env({ LEAD_PII_RETENTION_DAYS: 'banana' }))
    ).toBe(365);
    expect(
      getEffectiveWindowDays(
        'FINANCIAL_RECORDS',
        env({ PII_RETENTION_FINANCIAL_RECORDS_DAYS: '1' })
      )
    ).toBe(FINANCIAL_RECORD_MINIMUM_DAYS);
    expect(
      getEffectiveWindowDays(
        'FINANCIAL_RECORDS',
        env({
          PII_RETENTION_FINANCIAL_RECORDS_DAYS: String(FINANCIAL_RECORD_MINIMUM_DAYS + 100),
        })
      )
    ).toBe(FINANCIAL_RECORD_MINIMUM_DAYS + 100);
  });
});
