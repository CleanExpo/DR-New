/**
 * Single source of truth for NRPG training policy (DR-893).
 *
 * Every consumer — quiz grading, checklist/progression, certificate issuance
 * and display, and dispatch eligibility — reads these values from HERE. Do not
 * hardcode a passing score, validity period, certification name, or module
 * count anywhere else (this module resolves the historical 70-vs-80 conflict
 * in favour of the enforced grading value introduced in DR-892).
 *
 * Deliberately dependency-free (no fs/prisma/next) so it is importable from
 * server routes, services, scripts, and client components alike.
 */

/** The one passing-score threshold for training quiz/assessment grading. */
export const NRPG_QUIZ_PASSING_SCORE = 70;

/** How long an issued NRP Contractor Certification remains valid. */
export const NRPG_CERT_VALIDITY_YEARS = 1;

/** Canonical name of the auto-issued training certification row. */
export const NRPG_CERTIFICATION_NAME = 'NRP Contractor Certification';

/** Training completion requires ALL of these — set equality, not a count. */
export const NRPG_CANONICAL_MODULE_COUNT = 24;

/** The canonical module set NRP-001..NRP-024 (generated: unique by construction). */
export const NRPG_CANONICAL_MODULE_IDS: readonly string[] = Object.freeze(
  Array.from(
    { length: NRPG_CANONICAL_MODULE_COUNT },
    (_, i) => `NRP-${String(i + 1).padStart(3, '0')}`
  )
);

const CANONICAL_SET: ReadonlySet<string> = new Set(NRPG_CANONICAL_MODULE_IDS);

function normalizeModuleId(moduleId: string): string {
  return moduleId.trim().toUpperCase();
}

/**
 * Count of DISTINCT canonical modules in `moduleIds`. Duplicates never inflate
 * the count and non-canonical ids (CSE-xx, WRT-xx, NRP-025…) never count.
 */
export function countNrpgCanonicalModulesPassed(moduleIds: Iterable<string>): number {
  const passed = new Set<string>();
  for (const raw of moduleIds) {
    const id = normalizeModuleId(raw);
    if (CANONICAL_SET.has(id)) passed.add(id);
  }
  return passed.size;
}

/**
 * Set-equality completion check (DR-893): the completed module set must EQUAL
 * the canonical NRP-001..NRP-024 set. A `count >= 24` check is forgeable with
 * duplicate module ids; this is not.
 */
export function isNrpgTrainingSetComplete(completedModuleIds: Iterable<string>): boolean {
  return countNrpgCanonicalModulesPassed(completedModuleIds) === NRPG_CANONICAL_MODULE_COUNT;
}

/** Certificate expiry = issue date + the configured validity period. */
export function getNrpgCertificationExpiryDate(issueDate: Date): Date {
  const expiry = new Date(issueDate.getTime());
  expiry.setFullYear(expiry.getFullYear() + NRPG_CERT_VALIDITY_YEARS);
  return expiry;
}
