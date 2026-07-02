/**
 * NRPG onboarding phase-checklist policy (DR-895).
 *
 * Single source of truth for WHO may set each nrpg_onboarding_phases checklist
 * field and for the Phase 4 probation semantics. Deliberately dependency-free
 * (no fs/prisma/next) so it is importable from server routes, services,
 * scripts, and tests alike — same discipline as lib/training/training-policy.
 *
 * Field taxonomy (spec: "NRPG phase checklist integrity"):
 *  - CONTRACTOR-ATTESTABLE: facts only the contractor can attest about their
 *    own actions. Settable by the contractor (and by admins).
 *  - ADMIN-ONLY: review/verification outcomes. A CONTRACTOR PATCHing any of
 *    these gets 403 with no state change.
 *  - DERIVED: computed by the server from real records (training progress,
 *    certification, NRPGCommitment). Never accepted from ANY client.
 */

/** Fields a contractor may legitimately attest about themselves. */
export const CONTRACTOR_ATTESTABLE_PHASE_FIELDS = [
  'applicationSubmitted',
  'carsiOnboarded',
  'associationIntegrated',
  'platformActivated',
] as const;

/** Fields only ADMIN/SUPER_ADMIN may set (403 for contractors). */
export const ADMIN_ONLY_PHASE_FIELDS = [
  'eligibilityReviewed',
  'backgroundCheckInitiated',
  'competencyVerified',
  'performanceReviewScore',
  'fullCertificationGranted',
  'allChecksPass',
] as const;

/** Fields the server derives from real records — not settable by anyone. */
export const DERIVED_PHASE_FIELDS = ['standardsTrainingComplete', 'commitmentSigned'] as const;

export type ContractorAttestablePhaseField = (typeof CONTRACTOR_ATTESTABLE_PHASE_FIELDS)[number];
export type AdminOnlyPhaseField = (typeof ADMIN_ONLY_PHASE_FIELDS)[number];
export type DerivedPhaseField = (typeof DERIVED_PHASE_FIELDS)[number];

/**
 * Which phase each settable checklist field belongs to — a field for phase N
 * may only be set once phases 1..N-1 are complete (no invalid skips).
 * allChecksPass summarises the four background checks and is not
 * order-gated (admin bookkeeping, not a phase-advancing item).
 */
export const PHASE_FIELD_PHASE: Readonly<Record<string, 1 | 2 | 3 | 4>> = Object.freeze({
  applicationSubmitted: 1,
  eligibilityReviewed: 1,
  backgroundCheckInitiated: 1,
  carsiOnboarded: 2,
  associationIntegrated: 2,
  competencyVerified: 2,
  standardsTrainingComplete: 3,
  commitmentSigned: 3,
  platformActivated: 3,
  performanceReviewScore: 4,
  fullCertificationGranted: 4,
});

// ---------------------------------------------------------------------------
// Phase 4 probation semantics (90-day)
// ---------------------------------------------------------------------------

/** Probation length: recorded when Phase 4 begins (phase3 completes). */
export const NRPG_PROBATION_DAYS = 90;

/**
 * Minimum performanceReviewScore required before fullCertificationGranted may
 * be set. The spec fixes the mechanism ("performanceReviewScore >= threshold,
 * never auto-granted below it") but not the number — 80 is the operating
 * default; tune here, nowhere else.
 */
export const NRPG_PERFORMANCE_REVIEW_PASS_SCORE = 80;

/** Commitment signatures expire after a year (annual renewal enforced). */
export const NRPG_COMMITMENT_RENEWAL_DAYS = 365;

const DAY_MS = 24 * 60 * 60 * 1000;

/** probationEndDate = probation start (Phase 4 begins) + 90 days. */
export function getProbationEndDate(phase4Start: Date): Date {
  return new Date(phase4Start.getTime() + NRPG_PROBATION_DAYS * DAY_MS);
}

/** Whether a commitment signature is still within its annual validity. */
export function isCommitmentSignatureCurrent(signedAt: Date | null | undefined, now: Date): boolean {
  if (!signedAt) return false;
  return now.getTime() - signedAt.getTime() < NRPG_COMMITMENT_RENEWAL_DAYS * DAY_MS;
}

export type ProbationDerivedStatus = 'NOT_STARTED' | 'ACTIVE' | 'REVIEW_DUE' | 'CLEARED';

export interface ProbationDerivation {
  /** Phase 4 in progress and full certification not yet granted. */
  isOnProbation: boolean;
  /** Day-90 auto-review: probationEndDate reached without a grant. */
  reviewDue: boolean;
  status: ProbationDerivedStatus;
  probationEndDate: Date | null;
  daysRemaining: number | null;
}

/**
 * Pure server-side derivation of the day-90 auto-review (no cron, no schema
 * change): computed whenever phases are read or updated. `reviewDue` is the
 * admin-queue flag — an admin list of contractors needing review is
 * "every phase row where this derivation returns reviewDue=true".
 */
export function deriveProbationStatus(
  phases: {
    phase4Status: string;
    probationEndDate: Date | null;
    fullCertificationGranted: boolean;
  },
  now: Date = new Date()
): ProbationDerivation {
  const end = phases.probationEndDate;

  if (phases.fullCertificationGranted) {
    return { isOnProbation: false, reviewDue: false, status: 'CLEARED', probationEndDate: end, daysRemaining: null };
  }

  const started = phases.phase4Status === 'IN_PROGRESS' && end != null;
  if (!started) {
    return { isOnProbation: false, reviewDue: false, status: 'NOT_STARTED', probationEndDate: end, daysRemaining: null };
  }

  const reviewDue = now.getTime() >= (end as Date).getTime();
  return {
    isOnProbation: true,
    reviewDue,
    status: reviewDue ? 'REVIEW_DUE' : 'ACTIVE',
    probationEndDate: end,
    daysRemaining: reviewDue
      ? 0
      : Math.ceil(((end as Date).getTime() - now.getTime()) / DAY_MS),
  };
}

/**
 * Gate on fullCertificationGranted=true (spec: "Grant blocked before probation
 * ends"): rejected before probationEndDate has passed OR while
 * performanceReviewScore is missing/below threshold.
 */
export function canGrantFullCertification(
  phases: { probationEndDate: Date | null; performanceReviewScore: number | null },
  now: Date = new Date()
): { allowed: true } | { allowed: false; reason: string } {
  if (!phases.probationEndDate) {
    return { allowed: false, reason: 'Probation has not started (Phase 4 not begun)' };
  }
  if (now.getTime() < phases.probationEndDate.getTime()) {
    return {
      allowed: false,
      reason: `Probation period has not ended (ends ${phases.probationEndDate.toISOString()})`,
    };
  }
  if (
    phases.performanceReviewScore == null ||
    phases.performanceReviewScore < NRPG_PERFORMANCE_REVIEW_PASS_SCORE
  ) {
    return {
      allowed: false,
      reason: `performanceReviewScore must be >= ${NRPG_PERFORMANCE_REVIEW_PASS_SCORE} before full certification (got ${phases.performanceReviewScore ?? 'none'})`,
    };
  }
  return { allowed: true };
}
