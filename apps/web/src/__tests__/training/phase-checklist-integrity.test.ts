/**
 * @jest-environment node
 *
 * DR-895 — NRPG phase checklist integrity + Phase 4 probation semantics.
 *
 * Drives the REAL `app/api/onboarding/nrpg/phases/route.ts` GET/PATCH handlers
 * with auth, the tenant DB, and the audit service mocked (field taxonomy,
 * derivation, ordering, and probation logic stay REAL).
 *
 * What it proves:
 *   1. A contractor setting a derived field (standardsTrainingComplete,
 *      commitmentSigned) is rejected 400 and nothing is persisted.
 *   2. A contractor setting an admin-attested field is rejected 403 and
 *      nothing is persisted; ADMIN/SUPER_ADMIN succeeds and is audit-logged.
 *   3. standardsTrainingComplete is DERIVED from real training records
 *      (onboarding COMPLETED + 24-module set-equality + live verified cert) —
 *      a forged stored value is neutralised on read and un-persisted on write.
 *   4. No invalid skips: a phase-N item cannot be set while phases 1..N-1 are
 *      incomplete; the prerequisite-complete path succeeds.
 *   5. Phase 4 probation: review-due derivation flips at day 90 in the GET
 *      payload; fullCertificationGranted is rejected before probation ends or
 *      below the performance threshold, and succeeds after both gates pass.
 */
import { NextRequest } from 'next/server';

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

jest.mock('@/lib/get-tenant-db', () => ({
  getTenantDb: jest.fn(),
}));

// The audit service writes through the global prisma client — mock the sink,
// assert the call.
jest.mock('@/lib/services/audit.service', () => ({
  logAuditEvent: jest.fn().mockResolvedValue(true),
}));

import { GET as phasesGET, PATCH as phasesPATCH } from '@/app/api/onboarding/nrpg/phases/route';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { logAuditEvent } from '@/lib/services/audit.service';
import { NRPG_CANONICAL_MODULE_IDS } from '@/lib/training/training-policy';
import { NRPG_PERFORMANCE_REVIEW_PASS_SCORE } from '@/lib/training/nrpg-phase-policy';

const mockAuth = authenticateRequest as jest.Mock;
const mockGetTenantDb = getTenantDb as jest.Mock;
const mockLogAudit = logAuditEvent as jest.Mock;

const CONTRACTOR_USER = { id: 'user_c1', userType: 'CONTRACTOR' };
const ADMIN_USER = { id: 'user_admin', userType: 'ADMIN' };

const DAY_MS = 24 * 60 * 60 * 1000;

function patchReq(body: unknown) {
  return new NextRequest('http://localhost/api/onboarding/nrpg/phases', {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function getReq(query = '') {
  return new NextRequest(`http://localhost/api/onboarding/nrpg/phases${query}`);
}

/** A full nrpg_onboarding_phases row with everything at its default. */
function basePhases(overrides: Record<string, unknown> = {}) {
  return {
    id: 'phase_row_1',
    contractorId: 'user_c1',
    phase1Status: 'NOT_STARTED',
    phase1StartDate: null,
    phase1CompleteDate: null,
    applicationSubmitted: false,
    eligibilityReviewed: false,
    backgroundCheckInitiated: false,
    phase2Status: 'NOT_STARTED',
    phase2StartDate: null,
    phase2CompleteDate: null,
    carsiOnboarded: false,
    associationIntegrated: false,
    competencyVerified: false,
    phase3Status: 'NOT_STARTED',
    phase3StartDate: null,
    phase3CompleteDate: null,
    standardsTrainingComplete: false,
    commitmentSigned: false,
    commitmentSignedAt: null,
    platformActivated: false,
    phase4Status: 'NOT_STARTED',
    phase4StartDate: null,
    phase4CompleteDate: null,
    probationEndDate: null,
    performanceReviewScore: null,
    fullCertificationGranted: false,
    criminalCheckStatus: 'NOT_INITIATED',
    criminalCheckDate: null,
    criminalCheckRef: null,
    financialCheckStatus: 'NOT_INITIATED',
    financialCheckDate: null,
    financialCheckRef: null,
    professionalCheckStatus: 'NOT_INITIATED',
    professionalCheckDate: null,
    professionalCheckRef: null,
    insuranceCheckStatus: 'NOT_INITIATED',
    insuranceCheckDate: null,
    insuranceCheckRef: null,
    allChecksPass: false,
    overallStatus: 'NOT_STARTED',
    createdAt: new Date('2026-01-01T00:00:00Z'),
    updatedAt: new Date('2026-01-01T00:00:00Z'),
    ...overrides,
  };
}

/** Stored state for phases 1-3 fully complete (checklist flags only). */
function phase123Complete(overrides: Record<string, unknown> = {}) {
  return basePhases({
    applicationSubmitted: true,
    eligibilityReviewed: true,
    backgroundCheckInitiated: true,
    phase1Status: 'COMPLETED',
    carsiOnboarded: true,
    associationIntegrated: true,
    competencyVerified: true,
    phase2Status: 'COMPLETED',
    standardsTrainingComplete: true,
    commitmentSigned: true,
    platformActivated: true,
    phase3Status: 'COMPLETED',
    phase4Status: 'IN_PROGRESS',
    phase4StartDate: new Date(Date.now() - 91 * DAY_MS),
    overallStatus: 'IN_PROGRESS',
    ...overrides,
  });
}

const completed = (moduleId: string) => ({ moduleId, status: 'COMPLETED' });

/**
 * Stateful tenant-DB mock: nRPGOnboardingPhase.update mutates the row so the
 * route's post-write reads (updatePhaseStatuses, final read) see fresh state.
 */
function makeDb(opts: {
  phases?: ReturnType<typeof basePhases> | null;
  /** Real-training source records the derivation reads. */
  onboarding?: { status: string; moduleProgress: Array<{ moduleId: string; status: string }> } | null;
  liveCert?: { id: string } | null;
  commitment?: { signedAt: Date | null } | null;
}) {
  let row: ReturnType<typeof basePhases> | null = opts.phases === undefined ? basePhases() : opts.phases;

  const db = {
    contractor: {
      findFirst: jest.fn().mockResolvedValue({ id: 'contractor_row_1' }),
    },
    nRPGOnboardingPhase: {
      findUnique: jest.fn().mockImplementation(async () => row),
      create: jest.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => {
        row = basePhases(data);
        return row;
      }),
      update: jest.fn().mockImplementation(async ({ data }: { data: Record<string, unknown> }) => {
        row = { ...(row as ReturnType<typeof basePhases>), ...data };
        return row;
      }),
    },
    contractorOnboarding: {
      findUnique: jest.fn().mockResolvedValue(opts.onboarding ?? null),
    },
    contractorCertification: {
      findFirst: jest.fn().mockResolvedValue(opts.liveCert ?? null),
    },
    nRPGCommitment: {
      findUnique: jest.fn().mockResolvedValue(opts.commitment ?? null),
    },
  };

  return { db, getRow: () => row };
}

/** Source records making the DERIVED facts true (legitimate completion). */
const REAL_TRAINING_DONE = {
  onboarding: { status: 'COMPLETED', moduleProgress: NRPG_CANONICAL_MODULE_IDS.map(completed) },
  liveCert: { id: 'cert_live' },
  commitment: { signedAt: new Date(Date.now() - 30 * DAY_MS) },
};

function authAs(user: { id: string; userType: string }) {
  mockAuth.mockResolvedValue({ success: true, context: { user } });
}

beforeEach(() => {
  mockAuth.mockReset();
  mockGetTenantDb.mockReset();
  mockLogAudit.mockClear();
});

// ---------------------------------------------------------------------------
// 1. Derived fields are never client-settable
// ---------------------------------------------------------------------------

describe('PATCH — derived fields rejected (DR-895)', () => {
  it.each(['standardsTrainingComplete', 'commitmentSigned'])(
    'a contractor setting %s directly gets 400 and nothing is persisted',
    async (field) => {
      authAs(CONTRACTOR_USER);
      const { db } = makeDb({});
      mockGetTenantDb.mockReturnValue(db);

      const res = await phasesPATCH(patchReq({ [field]: true }));
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body.error).toBe('INVALID_INPUT');
      expect(body.details.rejectedFields).toContain(field);
      expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
    }
  );

  it('an ADMIN cannot set derived fields either — they are server-computed', async () => {
    authAs(ADMIN_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({ contractorId: 'user_c1', standardsTrainingComplete: true })
    );

    expect(res.status).toBe(400);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// 2. Admin-attested fields require ADMIN/SUPER_ADMIN
// ---------------------------------------------------------------------------

describe('PATCH — admin-only fields rejected for contractors (DR-895)', () => {
  it('a contractor setting admin-attested fields gets 403 with no state change', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({
        eligibilityReviewed: true,
        competencyVerified: true,
        performanceReviewScore: 100,
        fullCertificationGranted: true,
        allChecksPass: true,
      })
    );
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(body.error).toBe('FORBIDDEN');
    expect(body.details.rejectedFields).toEqual(
      expect.arrayContaining([
        'eligibilityReviewed',
        'competencyVerified',
        'performanceReviewScore',
        'fullCertificationGranted',
        'allChecksPass',
      ])
    );
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
    expect(db.nRPGOnboardingPhase.create).not.toHaveBeenCalled();
  });

  it('a contractor cannot target another contractor', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({ contractorId: 'someone_else', applicationSubmitted: true })
    );

    expect(res.status).toBe(403);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('an ADMIN attestation succeeds, persists, and is audit-logged', async () => {
    authAs(ADMIN_USER);
    const { db, getRow } = makeDb({
      phases: basePhases({ applicationSubmitted: true }),
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({
        contractorId: 'user_c1',
        eligibilityReviewed: true,
        backgroundCheckInitiated: true,
      })
    );

    expect(res.status).toBe(200);
    expect(getRow()?.eligibilityReviewed).toBe(true);
    expect(getRow()?.backgroundCheckInitiated).toBe(true);
    // Phase 1 completed -> Phase 2 started (in-order transition)
    expect(getRow()?.phase1Status).toBe('COMPLETED');
    expect(getRow()?.phase2Status).toBe('IN_PROGRESS');

    expect(mockLogAudit).toHaveBeenCalledTimes(1);
    expect(mockLogAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user_admin',
        action: 'ADMIN_ACTION',
        resourceId: 'user_c1',
        resourceType: 'NRPGOnboardingPhase',
        status: 'SUCCESS',
        details: expect.objectContaining({
          fields: { eligibilityReviewed: true, backgroundCheckInitiated: true },
        }),
      })
    );
  });

  it('an ADMIN must supply contractorId', async () => {
    authAs(ADMIN_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ eligibilityReviewed: true }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBe('MISSING_FIELDS');
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('contractor attestations are NOT audit-logged as admin actions', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ applicationSubmitted: true }));

    expect(res.status).toBe(200);
    expect(mockLogAudit).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// 3. standardsTrainingComplete is derived from REAL training records
// ---------------------------------------------------------------------------

describe('derivation — standardsTrainingComplete computed, never trusted (DR-895)', () => {
  it('GET reports true when onboarding is COMPLETED with all 24 modules and a live cert, even when the stored flag is false', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: basePhases({ standardsTrainingComplete: false }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.data.phases.standardsTrainingComplete).toBe(true);
    expect(
      body.data.summary.phase3.checklist.find(
        (i: { key: string }) => i.key === 'standardsTrainingComplete'
      ).complete
    ).toBe(true);
  });

  it('GET neutralises a forged stored flag when training is NOT really complete (23/24 modules)', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: basePhases({ standardsTrainingComplete: true }), // forged
      onboarding: {
        status: 'COMPLETED',
        moduleProgress: NRPG_CANONICAL_MODULE_IDS.slice(0, 23).map(completed),
      },
      liveCert: { id: 'cert_live' },
      commitment: null,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(body.data.phases.standardsTrainingComplete).toBe(false);
  });

  it('derived flag cannot be true while ContractorOnboarding.status != COMPLETED', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: basePhases({ standardsTrainingComplete: true }), // forged
      onboarding: {
        status: 'IN_PROGRESS',
        moduleProgress: NRPG_CANONICAL_MODULE_IDS.map(completed),
      },
      liveCert: { id: 'cert_live' },
      commitment: null,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(body.data.phases.standardsTrainingComplete).toBe(false);
  });

  it('PATCH un-persists a forged stored flag (server re-derives and writes back false)', async () => {
    authAs(CONTRACTOR_USER);
    const { db, getRow } = makeDb({
      phases: basePhases({ standardsTrainingComplete: true }), // forged earlier
      // no real training records at all
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ applicationSubmitted: true }));

    expect(res.status).toBe(200);
    expect(getRow()?.standardsTrainingComplete).toBe(false);
    expect(getRow()?.applicationSubmitted).toBe(true);
  });

  it('commitmentSigned derives from a current NRPGCommitment signature (stale >365d = false)', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: basePhases({ commitmentSigned: true }),
      commitment: { signedAt: new Date(Date.now() - 400 * DAY_MS) }, // expired
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(body.data.phases.commitmentSigned).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 4. No invalid phase skips
// ---------------------------------------------------------------------------

describe('PATCH — phase ordering enforced (DR-895)', () => {
  it('rejects a phase-2 item while phase 1 is incomplete, with no state change', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({ phases: basePhases({ applicationSubmitted: true }) });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ carsiOnboarded: true }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBe('INVALID_INPUT');
    expect(body.details).toMatchObject({ field: 'carsiOnboarded', phase: 2 });
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('rejects a phase-3 item while phase 2 is incomplete', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: basePhases({
        applicationSubmitted: true,
        eligibilityReviewed: true,
        backgroundCheckInitiated: true,
        phase1Status: 'COMPLETED',
        phase2Status: 'IN_PROGRESS',
      }),
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ platformActivated: true }));

    expect(res.status).toBe(400);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('accepts a phase-2 item when phase 1 prerequisites are complete', async () => {
    authAs(CONTRACTOR_USER);
    const { db, getRow } = makeDb({
      phases: basePhases({
        applicationSubmitted: true,
        eligibilityReviewed: true,
        backgroundCheckInitiated: true,
        phase1Status: 'COMPLETED',
        phase2Status: 'IN_PROGRESS',
      }),
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ carsiOnboarded: true }));

    expect(res.status).toBe(200);
    expect(getRow()?.carsiOnboarded).toBe(true);
  });

  it('clearing a flag (false) is not order-gated', async () => {
    authAs(CONTRACTOR_USER);
    const { db, getRow } = makeDb({
      phases: basePhases({ applicationSubmitted: true }),
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ applicationSubmitted: false }));

    expect(res.status).toBe(200);
    expect(getRow()?.applicationSubmitted).toBe(false);
  });

  it('phase transitions cascade strictly in order (phase 3 cannot complete over an incomplete phase 2)', async () => {
    // Legacy/forged row: phase-3 items all true but phase 2 items incomplete.
    authAs(CONTRACTOR_USER);
    const { db, getRow } = makeDb({
      phases: basePhases({
        applicationSubmitted: true,
        eligibilityReviewed: true,
        backgroundCheckInitiated: true,
        phase1Status: 'COMPLETED',
        phase2Status: 'IN_PROGRESS',
        platformActivated: true,
        standardsTrainingComplete: true,
        commitmentSigned: true,
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    // A harmless write triggers the transition pass.
    const res = await phasesPATCH(patchReq({ applicationSubmitted: true }));

    expect(res.status).toBe(200);
    expect(getRow()?.phase3Status).not.toBe('COMPLETED');
    expect(getRow()?.phase4Status).toBe('NOT_STARTED');
    expect(getRow()?.probationEndDate).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// 5. Phase 4 probation semantics
// ---------------------------------------------------------------------------

describe('Phase 4 probation — 90-day semantics (DR-895)', () => {
  it('probation starts when Phase 4 begins: probationEndDate = start + 90 days', async () => {
    authAs(CONTRACTOR_USER);
    const before = Date.now();
    const { db, getRow } = makeDb({
      phases: basePhases({
        applicationSubmitted: true,
        eligibilityReviewed: true,
        backgroundCheckInitiated: true,
        phase1Status: 'COMPLETED',
        carsiOnboarded: true,
        associationIntegrated: true,
        competencyVerified: true,
        phase2Status: 'COMPLETED',
        standardsTrainingComplete: true,
        commitmentSigned: true,
        phase3Status: 'IN_PROGRESS',
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    // The last phase-3 item completes the phase and starts Phase 4.
    const res = await phasesPATCH(patchReq({ platformActivated: true }));

    expect(res.status).toBe(200);
    const row = getRow();
    expect(row?.phase3Status).toBe('COMPLETED');
    expect(row?.phase4Status).toBe('IN_PROGRESS');
    const end = (row?.probationEndDate as unknown as Date).getTime();
    expect(end).toBeGreaterThanOrEqual(before + 90 * DAY_MS);
    expect(end).toBeLessThanOrEqual(Date.now() + 90 * DAY_MS);
  });

  it('GET derives ACTIVE probation (not review-due) before day 90', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: phase123Complete({ probationEndDate: new Date(Date.now() + 10 * DAY_MS) }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(body.data.summary.phase4.probation).toMatchObject({
      isOnProbation: true,
      reviewDue: false,
      status: 'ACTIVE',
      daysRemaining: 10,
    });
  });

  it('GET flips to REVIEW_DUE at day 90 (admin-queue flag) without any cron or schema change', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: phase123Complete({ probationEndDate: new Date(Date.now() - DAY_MS) }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesGET(getReq());
    const body = await res.json();

    expect(body.data.summary.phase4.probation).toMatchObject({
      isOnProbation: true,
      reviewDue: true,
      status: 'REVIEW_DUE',
      daysRemaining: 0,
    });
  });

  it('rejects fullCertificationGranted before probationEndDate has passed', async () => {
    authAs(ADMIN_USER);
    const { db } = makeDb({
      phases: phase123Complete({
        probationEndDate: new Date(Date.now() + 30 * DAY_MS),
        performanceReviewScore: 95,
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({ contractorId: 'user_c1', fullCertificationGranted: true })
    );
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.message).toMatch(/probation period has not ended/i);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('rejects fullCertificationGranted when performanceReviewScore is below threshold — never auto-granted', async () => {
    authAs(ADMIN_USER);
    const { db } = makeDb({
      phases: phase123Complete({
        probationEndDate: new Date(Date.now() - DAY_MS),
        performanceReviewScore: NRPG_PERFORMANCE_REVIEW_PASS_SCORE - 1,
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({ contractorId: 'user_c1', fullCertificationGranted: true })
    );
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.message).toContain(`>= ${NRPG_PERFORMANCE_REVIEW_PASS_SCORE}`);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });

  it('grants full certification after day 90 with a passing score: phase 4 completes, probation clears, audit logged', async () => {
    authAs(ADMIN_USER);
    const { db, getRow } = makeDb({
      phases: phase123Complete({
        probationEndDate: new Date(Date.now() - DAY_MS),
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(
      patchReq({
        contractorId: 'user_c1',
        performanceReviewScore: NRPG_PERFORMANCE_REVIEW_PASS_SCORE,
        fullCertificationGranted: true,
      })
    );
    const body = await res.json();

    expect(res.status).toBe(200);
    const row = getRow();
    expect(row?.fullCertificationGranted).toBe(true);
    expect(row?.phase4Status).toBe('COMPLETED');
    expect(row?.overallStatus).toBe('COMPLETED');
    expect(body.probation).toMatchObject({ isOnProbation: false, status: 'CLEARED' });
    expect(mockLogAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: 'ADMIN_ACTION',
        resourceId: 'user_c1',
        details: expect.objectContaining({
          fields: expect.objectContaining({ fullCertificationGranted: true }),
        }),
      })
    );
  });

  it('a contractor can never grant themselves full certification (403 before any gate)', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({
      phases: phase123Complete({
        probationEndDate: new Date(Date.now() - DAY_MS),
        performanceReviewScore: 100,
      }),
      ...REAL_TRAINING_DONE,
    });
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ fullCertificationGranted: true }));

    expect(res.status).toBe(403);
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// 6. Payload hygiene
// ---------------------------------------------------------------------------

describe('PATCH — payload hygiene', () => {
  it('unknown fields are rejected by the strict schema', async () => {
    authAs(CONTRACTOR_USER);
    const { db } = makeDb({});
    mockGetTenantDb.mockReturnValue(db);

    const res = await phasesPATCH(patchReq({ totallyMadeUpField: true }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.error).toBe('VALIDATION_ERROR');
    expect(db.nRPGOnboardingPhase.update).not.toHaveBeenCalled();
  });
});
