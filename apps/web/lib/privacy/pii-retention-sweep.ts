/**
 * PII retention sweep service (DR-902, APP 11.2).
 *
 * Finds rows past their class retention window (windows live in ONE
 * owner-reviewable config: `./pii-retention-policy`) and destroys or
 * de-identifies them per the class method — AFTER enforcing carve-outs:
 *
 *   1. LEGAL HOLD  — config/env id list (schema has no hold mechanism yet;
 *                    see policy module). Held rows are never destroyed.
 *   2. ACTIVE DISPUTE/CLAIM — contractors on a non-terminal InsuranceClaimAU
 *                    are excluded from destruction.
 *   3. FINANCIAL MINIMUM — the FINANCIAL_RECORDS class is RETAIN/report-only
 *                    and its window is clamped to the 7-year statutory floor.
 *
 * DRY RUN IS FIRST-CLASS: `execute: false` (the default at the route) reports
 * exactly what WOULD be destroyed per class, with counts, and issues ZERO
 * writes. Injectable clock (`now`) per the pii-privacy spec; idempotent —
 * already-purged rows are filtered out by sentinel/null guards in every query.
 *
 * Uses the tenant-neutral `basePrisma` client (same as the purge-lead-pii
 * cron) and the same `[purged]` sentinel. No runtime values are imported from
 * `@prisma/client` (CI has no generated client — PR #204): enum/status values
 * are local literals matching prisma/schema.prisma.
 */

import { basePrisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/storage/cloud-storage';
import {
  ACTIVE_DISPUTE_CLAIM_STATUSES,
  getEffectiveWindowDays,
  getLegalHoldIds,
  PII_PURGED_SENTINEL,
  PII_RETENTION_POLICY,
  type PiiRetentionClassId,
  type RetentionMethod,
} from './pii-retention-policy';

const DAY_MS = 24 * 60 * 60 * 1000;

/** Bounded batch per class per run — the daily cadence drains any backlog. */
export const SWEEP_BATCH_LIMIT = 500;

export interface SweepOptions {
  /** false = DRY RUN (report only, zero writes). true = destroy/de-identify. */
  execute: boolean;
  /** Injectable clock (spec requirement); defaults to the real clock. */
  now?: Date;
  env?: Record<string, string | undefined>;
}

export interface TargetResult {
  table: string;
  /** Rows past the window matching the class state filters (before carve-outs). */
  eligible: number;
  /** Rows that pass carve-outs — what a dry run reports as destroyable. */
  wouldDestroy: number;
  /** Rows actually destroyed/de-identified this run (always 0 in dry run). */
  destroyed: number;
  heldBack: { legalHold: number; activeDispute: number };
  storage?: { deletesAttempted: number; deleteFailures: number };
}

export interface ClassSweepResult {
  classId: PiiRetentionClassId;
  method: RetentionMethod;
  windowDays: number;
  cutoff: string;
  /** RETAIN classes are REPORT_ONLY even in execute mode. */
  action: 'SWEPT' | 'REPORT_ONLY';
  targets: TargetResult[];
}

export interface PiiSweepResult {
  mode: 'DRY_RUN' | 'EXECUTE';
  now: string;
  batchLimit: number;
  carveOuts: {
    legalHoldIds: number;
    activeDisputeContractorIds: number;
    financialMinimumClamped: boolean;
  };
  classes: ClassSweepResult[];
  totals: { eligible: number; wouldDestroy: number; destroyed: number; heldBack: number };
}

interface CandidateRow {
  id: string;
  contractorId?: string | null;
  userId?: string | null;
  fileUrl?: string | null;
}

/** Partition candidates into destroyable vs carve-out-held. */
function partition(
  rows: CandidateRow[],
  legalHold: Set<string>,
  disputes: Set<string>
): { destroy: CandidateRow[]; heldLegal: number; heldDispute: number } {
  const destroy: CandidateRow[] = [];
  let heldLegal = 0;
  let heldDispute = 0;
  for (const row of rows) {
    const subject = row.contractorId || row.userId || row.id;
    if (legalHold.has(subject)) {
      heldLegal += 1; // carve-out 1: legal hold blocks destruction
    } else if (disputes.has(subject)) {
      heldDispute += 1; // carve-out 2: active dispute/claim blocks destruction
    } else {
      destroy.push(row);
    }
  }
  return { destroy, heldLegal, heldDispute };
}

/** Best-effort storage-object deletion for a purged document (execute mode). */
async function deleteStorageObject(fileUrl: string): Promise<boolean> {
  try {
    let key = fileUrl;
    if (/^https?:\/\//i.test(fileUrl)) {
      key = new URL(fileUrl).pathname.replace(/^\/+/, '');
    }
    if (!key || key === PII_PURGED_SENTINEL) return true;
    await deleteFile(key);
    return true;
  } catch (error) {
    console.error(`[pii-retention-sweep] storage delete failed for ${fileUrl}:`, error);
    return false;
  }
}

function cutoffFor(classId: PiiRetentionClassId, now: Date, env: Record<string, string | undefined>) {
  const windowDays = getEffectiveWindowDays(classId, env);
  return { windowDays, cutoff: new Date(now.getTime() - windowDays * DAY_MS) };
}

export async function runPiiRetentionSweep(opts: SweepOptions): Promise<PiiSweepResult> {
  const now = opts.now ?? new Date();
  const env = opts.env ?? process.env;
  const execute = opts.execute === true;

  // ---- Carve-out universe (computed BEFORE any destruction) ----------------
  const legalHold = getLegalHoldIds(env);

  // Active dispute/claim: contractors attached (via Booking) to a claim in a
  // non-terminal status. Statuses are local literals (see policy module).
  const activeClaims = await basePrisma.insuranceClaimAU.findMany({
    where: { status: { in: [...ACTIVE_DISPUTE_CLAIM_STATUSES] } },
    select: { booking: { select: { contractorId: true } } },
  });
  const disputes = new Set<string>();
  for (const claim of activeClaims) {
    const contractorId = claim.booking?.contractorId;
    if (contractorId) disputes.add(contractorId);
  }

  const classes: ClassSweepResult[] = [];

  // ==== VERIFICATION_DOCUMENTS (de-identify + storage delete) ===============
  {
    const classId: PiiRetentionClassId = 'VERIFICATION_DOCUMENTS';
    const { windowDays, cutoff } = cutoffFor(classId, now, env);
    const rows = await basePrisma.contractorDocument.findMany({
      where: {
        documentType: { not: 'POLICE_CHECK' },
        status: { in: ['REJECTED', 'EXPIRED'] },
        updatedAt: { lt: cutoff },
        fileName: { not: PII_PURGED_SENTINEL }, // idempotency guard
      },
      select: { id: true, contractorId: true, fileUrl: true },
      take: SWEEP_BATCH_LIMIT,
    });
    const { destroy, heldLegal, heldDispute } = partition(rows, legalHold, disputes);
    const target: TargetResult = {
      table: 'ContractorDocument (non-police, terminal)',
      eligible: rows.length,
      wouldDestroy: destroy.length,
      destroyed: 0,
      heldBack: { legalHold: heldLegal, activeDispute: heldDispute },
      storage: { deletesAttempted: 0, deleteFailures: 0 },
    };
    if (execute && destroy.length > 0) {
      const result = await basePrisma.contractorDocument.updateMany({
        where: { id: { in: destroy.map((r) => r.id) } },
        data: {
          fileName: PII_PURGED_SENTINEL,
          fileUrl: PII_PURGED_SENTINEL,
          documentNumber: null,
          issuingAuthority: null,
          rejectionReason: null,
        },
      });
      target.destroyed = result.count;
      for (const row of destroy) {
        if (!row.fileUrl || row.fileUrl === PII_PURGED_SENTINEL) continue;
        target.storage!.deletesAttempted += 1;
        const ok = await deleteStorageObject(row.fileUrl);
        if (!ok) target.storage!.deleteFailures += 1;
      }
    }
    classes.push({
      classId,
      method: 'DE_IDENTIFY',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'SWEPT',
      targets: [target],
    });
  }

  // ==== POLICE_CHECK_RESULTS (short window; keep outcome, purge raw doc) ====
  {
    const classId: PiiRetentionClassId = 'POLICE_CHECK_RESULTS';
    const { windowDays, cutoff } = cutoffFor(classId, now, env);
    const rows = await basePrisma.contractorDocument.findMany({
      where: {
        documentType: 'POLICE_CHECK',
        status: { in: ['APPROVED', 'REJECTED', 'EXPIRED'] }, // decided only
        updatedAt: { lt: cutoff },
        fileName: { not: PII_PURGED_SENTINEL }, // idempotency guard
      },
      select: { id: true, contractorId: true, fileUrl: true },
      take: SWEEP_BATCH_LIMIT,
    });
    const { destroy, heldLegal, heldDispute } = partition(rows, legalHold, disputes);
    const target: TargetResult = {
      table: 'ContractorDocument (POLICE_CHECK, decided)',
      eligible: rows.length,
      wouldDestroy: destroy.length,
      destroyed: 0,
      heldBack: { legalHold: heldLegal, activeDispute: heldDispute },
      storage: { deletesAttempted: 0, deleteFailures: 0 },
    };
    if (execute && destroy.length > 0) {
      const result = await basePrisma.contractorDocument.updateMany({
        where: { id: { in: destroy.map((r) => r.id) } },
        data: {
          // Outcome (status) is retained per spec; raw certificate + numbers go.
          fileName: PII_PURGED_SENTINEL,
          fileUrl: PII_PURGED_SENTINEL,
          documentNumber: null,
          issuingAuthority: null,
          rejectionReason: null,
        },
      });
      target.destroyed = result.count;
      for (const row of destroy) {
        if (!row.fileUrl || row.fileUrl === PII_PURGED_SENTINEL) continue;
        target.storage!.deletesAttempted += 1;
        const ok = await deleteStorageObject(row.fileUrl);
        if (!ok) target.storage!.deleteFailures += 1;
      }
    }
    classes.push({
      classId,
      method: 'DE_IDENTIFY',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'SWEPT',
      targets: [target],
    });
  }

  // ==== UNSUCCESSFUL_APPLICANTS (de-identify application PII) ===============
  {
    const classId: PiiRetentionClassId = 'UNSUCCESSFUL_APPLICANTS';
    const { windowDays, cutoff } = cutoffFor(classId, now, env);
    const rows = await basePrisma.contractorApplication.findMany({
      where: {
        status: { in: ['REJECTED', 'WITHDRAWN'] },
        updatedAt: { lt: cutoff },
        email: { not: PII_PURGED_SENTINEL }, // idempotency guard
      },
      select: { id: true, convertedContractor: true },
      take: SWEEP_BATCH_LIMIT,
    });
    const candidates: CandidateRow[] = rows.map((r) => ({
      id: r.id,
      contractorId: r.convertedContractor,
    }));
    const { destroy, heldLegal, heldDispute } = partition(candidates, legalHold, disputes);
    const target: TargetResult = {
      table: 'ContractorApplication (REJECTED|WITHDRAWN)',
      eligible: rows.length,
      wouldDestroy: destroy.length,
      destroyed: 0,
      heldBack: { legalHold: heldLegal, activeDispute: heldDispute },
    };
    if (execute && destroy.length > 0) {
      const result = await basePrisma.contractorApplication.updateMany({
        where: { id: { in: destroy.map((r) => r.id) } },
        data: {
          contactName: PII_PURGED_SENTINEL,
          email: PII_PURGED_SENTINEL,
          phone: PII_PURGED_SENTINEL,
          abn: PII_PURGED_SENTINEL,
          notes: null,
          // JSON PII blobs replaced with a purge marker (Prisma.DbNull is a
          // runtime value from @prisma/client — banned in test-loaded code).
          insuranceData: { piiPurged: true },
          experienceData: { piiPurged: true },
          equipmentData: { piiPurged: true },
          healthSafetyData: { piiPurged: true },
          bankingData: { piiPurged: true },
        },
      });
      target.destroyed = result.count;
    }
    classes.push({
      classId,
      method: 'DE_IDENTIFY',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'SWEPT',
      targets: [target],
    });
  }

  // ==== CONTACT_ENQUIRIES (same semantics as purge-lead-pii; idempotent) ====
  {
    const classId: PiiRetentionClassId = 'CONTACT_ENQUIRIES';
    const { windowDays, cutoff } = cutoffFor(classId, now, env);
    const rows = await basePrisma.contactEnquiry.findMany({
      where: { submittedAt: { lt: cutoff }, piiPurgedAt: null },
      select: { id: true },
      take: SWEEP_BATCH_LIMIT,
    });
    // No contractor linkage — legal hold by enquiry id only.
    const { destroy, heldLegal, heldDispute } = partition(rows, legalHold, disputes);
    const target: TargetResult = {
      table: 'ContactEnquiry',
      eligible: rows.length,
      wouldDestroy: destroy.length,
      destroyed: 0,
      heldBack: { legalHold: heldLegal, activeDispute: heldDispute },
    };
    if (execute && destroy.length > 0) {
      const result = await basePrisma.contactEnquiry.updateMany({
        where: { id: { in: destroy.map((r) => r.id) }, piiPurgedAt: null },
        data: {
          firstName: PII_PURGED_SENTINEL,
          lastName: PII_PURGED_SENTINEL,
          email: PII_PURGED_SENTINEL,
          phone: null,
          ipAddress: null,
          userAgent: null,
          piiPurgedAt: now,
        },
      });
      target.destroyed = result.count;
    }
    classes.push({
      classId,
      method: 'DE_IDENTIFY',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'SWEPT',
      targets: [target],
    });
  }

  // ==== AUDIT_TRAIL_IP_UA (null IP/UA; keep the event rows) =================
  {
    const classId: PiiRetentionClassId = 'AUDIT_TRAIL_IP_UA';
    const { windowDays, cutoff } = cutoffFor(classId, now, env);
    const targets: TargetResult[] = [];

    const vhRows = await basePrisma.contractorVerificationHistory.findMany({
      where: {
        createdAt: { lt: cutoff },
        OR: [{ ipAddress: { not: null } }, { userAgent: { not: null } }], // idempotency guard
      },
      select: { id: true, contractorId: true },
      take: SWEEP_BATCH_LIMIT,
    });
    const vh = partition(vhRows, legalHold, disputes);
    const vhTarget: TargetResult = {
      table: 'ContractorVerificationHistory (ipAddress/userAgent)',
      eligible: vhRows.length,
      wouldDestroy: vh.destroy.length,
      destroyed: 0,
      heldBack: { legalHold: vh.heldLegal, activeDispute: vh.heldDispute },
    };
    if (execute && vh.destroy.length > 0) {
      const result = await basePrisma.contractorVerificationHistory.updateMany({
        where: { id: { in: vh.destroy.map((r) => r.id) } },
        data: { ipAddress: null, userAgent: null },
      });
      vhTarget.destroyed = result.count;
    }
    targets.push(vhTarget);

    const alRows = await basePrisma.auditLogEntry.findMany({
      where: {
        createdAt: { lt: cutoff },
        OR: [{ ipAddress: { not: null } }, { userAgent: { not: null } }], // idempotency guard
      },
      select: { id: true, userId: true },
      take: SWEEP_BATCH_LIMIT,
    });
    const al = partition(alRows, legalHold, disputes);
    const alTarget: TargetResult = {
      table: 'AuditLogEntry (ipAddress/userAgent)',
      eligible: alRows.length,
      wouldDestroy: al.destroy.length,
      destroyed: 0,
      heldBack: { legalHold: al.heldLegal, activeDispute: al.heldDispute },
    };
    if (execute && al.destroy.length > 0) {
      const result = await basePrisma.auditLogEntry.updateMany({
        where: { id: { in: al.destroy.map((r) => r.id) } },
        data: { ipAddress: null, userAgent: null },
      });
      alTarget.destroyed = result.count;
    }
    targets.push(alTarget);

    classes.push({
      classId,
      method: 'DE_IDENTIFY',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'SWEPT',
      targets,
    });
  }

  // ==== FINANCIAL_RECORDS (RETAIN — report-only, 7-year floor clamped) ======
  {
    const classId: PiiRetentionClassId = 'FINANCIAL_RECORDS';
    const { windowDays, cutoff } = cutoffFor(classId, now, env); // clamped >= 7y
    const [payouts, invoices, payments] = await Promise.all([
      basePrisma.contractorPayout.count({ where: { createdAt: { lt: cutoff } } }),
      basePrisma.invoiceAU.count({ where: { createdAt: { lt: cutoff } } }),
      basePrisma.payment.count({ where: { createdAt: { lt: cutoff } } }),
    ]);
    // Carve-out 3: financial minimum — NEVER destroyed by this sweep, even in
    // execute mode. Counts are owner visibility only.
    const mk = (table: string, eligible: number): TargetResult => ({
      table,
      eligible,
      wouldDestroy: 0,
      destroyed: 0,
      heldBack: { legalHold: 0, activeDispute: 0 },
    });
    classes.push({
      classId,
      method: 'RETAIN',
      windowDays,
      cutoff: cutoff.toISOString(),
      action: 'REPORT_ONLY',
      targets: [
        mk('ContractorPayout', payouts),
        mk('InvoiceAU', invoices),
        mk('Payment', payments),
      ],
    });
  }

  const totals = classes.reduce(
    (acc, c) => {
      for (const t of c.targets) {
        acc.eligible += t.eligible;
        acc.wouldDestroy += t.wouldDestroy;
        acc.destroyed += t.destroyed;
        acc.heldBack += t.heldBack.legalHold + t.heldBack.activeDispute;
      }
      return acc;
    },
    { eligible: 0, wouldDestroy: 0, destroyed: 0, heldBack: 0 }
  );

  const financialConfigured = env[PII_RETENTION_POLICY.FINANCIAL_RECORDS.envVar];
  return {
    mode: execute ? 'EXECUTE' : 'DRY_RUN',
    now: now.toISOString(),
    batchLimit: SWEEP_BATCH_LIMIT,
    carveOuts: {
      legalHoldIds: legalHold.size,
      activeDisputeContractorIds: disputes.size,
      financialMinimumClamped:
        !!financialConfigured &&
        parseInt(financialConfigured, 10) <
          classes.find((c) => c.classId === 'FINANCIAL_RECORDS')!.windowDays,
    },
    classes,
    totals,
  };
}
