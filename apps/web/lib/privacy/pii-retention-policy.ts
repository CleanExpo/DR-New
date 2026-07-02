/**
 * PII retention policy — single reviewable config (DR-902, APP 11.2).
 *
 * ============================================================================
 * ⚠️  OWNER-TUNABLE — EVERY WINDOW BELOW IS A PLACEHOLDER DEFAULT  ⚠️
 * ============================================================================
 * The per-class retention windows are an OWNER (legal) decision per the
 * pii-privacy spec ("the owner supplies the values; this spec does not
 * hard-code them"). The defaults here are conservative, engineering-supplied
 * placeholders so the machinery is testable; they carry NO legal sign-off
 * except where an Australian statutory floor is cited. The owner reviews and
 * tunes this ONE file (or the per-class env override) — nothing else needs
 * to change.
 *
 * Enforcement is `app/api/cron/pii-retention-sweep/route.ts`, which is
 * DRY-RUN by default: nothing is destroyed until `PII_SWEEP_EXECUTE=true`
 * is set (and even then `?dryRun=1` forces a report-only run).
 *
 * This module is PURE CONFIG — no prisma imports, no runtime values from
 * `@prisma/client` (CI has no generated client; see PR #204). Table/field
 * names are documented literals matching `prisma/schema.prisma`.
 */

/** Sentinel written into purged string fields (same as purge-lead-pii cron). */
export const PII_PURGED_SENTINEL = '[purged]';

/** Destruction method per APP 11.2 — delete vs irreversible de-identification. */
export type RetentionMethod =
  | 'DELETE' // hard-delete rows
  | 'DE_IDENTIFY' // null/overwrite PII fields, keep the de-identified record
  | 'RETAIN'; // never destroyed by the sweep (statutory floor / legal evidence)

export type PiiRetentionClassId =
  | 'VERIFICATION_DOCUMENTS'
  | 'POLICE_CHECK_RESULTS'
  | 'UNSUCCESSFUL_APPLICANTS'
  | 'CONTACT_ENQUIRIES'
  | 'AUDIT_TRAIL_IP_UA'
  | 'FINANCIAL_RECORDS'
  | 'TRAINING_ASSESSMENT'
  | 'SIGNATURE_LEGAL_EVIDENCE'
  | 'MARKETING_CONSENT';

export interface PiiRetentionClass {
  id: PiiRetentionClassId;
  /** Human description of the data class. */
  description: string;
  /**
   * prisma models + PII fields in scope, and what "start of the clock" means.
   * Documentation for the owner/reviewer; the sweep implements it.
   */
  tables: string[];
  /** OWNER-TUNABLE default retention window in days. */
  defaultWindowDays: number;
  /** Env var that overrides the default without a deploy. */
  envVar: string;
  method: RetentionMethod;
  /**
   * Legal basis for the default. 'APP 11.2' alone means "no statutory floor
   * identified — window is a pure owner decision".
   */
  legalBasis: string;
  /** Whether the pii-retention-sweep cron enforces this class today. */
  enforced: boolean;
  /** Notes / gaps for the owner. */
  notes?: string;
}

const DAY = 1;
const YEAR = 365;

/**
 * Statutory floor for financial/tax records: Corporations Act 2001 (Cth)
 * s 286 requires financial records be kept for 7 years. The sweep CLAMPS the
 * financial class to this minimum — an owner-configured shorter window is
 * ignored (never destroys earlier than 7 years).
 */
export const FINANCIAL_RECORD_MINIMUM_DAYS = 7 * YEAR;

/**
 * OWNER-TUNABLE retention matrix. One entry per PII class.
 * Windows are DEFAULTS pending owner legal sign-off (see header).
 */
export const PII_RETENTION_POLICY: Record<PiiRetentionClassId, PiiRetentionClass> = {
  VERIFICATION_DOCUMENTS: {
    id: 'VERIFICATION_DOCUMENTS',
    description:
      'Identity/licence/insurance verification documents no longer needed: ' +
      'ContractorDocument rows (all types except POLICE_CHECK) in a terminal ' +
      'state (REJECTED or EXPIRED). Clock starts at the terminal decision ' +
      '(updatedAt). Documents for live/approved contractors are still "needed" ' +
      'and are NOT in scope.',
    tables: [
      'ContractorDocument (status REJECTED|EXPIRED, documentType != POLICE_CHECK): ' +
        'fileName, fileUrl (+ underlying storage object), documentNumber, ' +
        'issuingAuthority, rejectionReason',
    ],
    defaultWindowDays: 2 * YEAR,
    envVar: 'PII_RETENTION_VERIFICATION_DOCUMENTS_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis: 'APP 11.2 (no statutory floor identified — owner decision)',
    enforced: true,
  },
  POLICE_CHECK_RESULTS: {
    id: 'POLICE_CHECK_RESULTS',
    description:
      'Background/police-check documents. Spec: only outcome/status and a ' +
      'reference are retained; the raw certificate carries a SHORT distinct ' +
      'window after the admin decision. Clock starts at the decision ' +
      '(status APPROVED|REJECTED|EXPIRED, updatedAt).',
    tables: [
      'ContractorDocument (documentType = POLICE_CHECK, decided): fileName, ' +
        'fileUrl (+ storage object), documentNumber, issuingAuthority, ' +
        'rejectionReason — status/outcome row is kept',
    ],
    defaultWindowDays: 1 * YEAR,
    envVar: 'PII_RETENTION_POLICE_CHECK_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis:
      'APP 11.2 + APP 3.3/APP 9 minimisation (spec mandates a short, distinct window — owner decision)',
    enforced: true,
  },
  UNSUCCESSFUL_APPLICANTS: {
    id: 'UNSUCCESSFUL_APPLICANTS',
    description:
      'Unsuccessful/withdrawn contractor applications (never onboarded). ' +
      'Clock starts at rejection/withdrawal (status REJECTED|WITHDRAWN, updatedAt).',
    tables: [
      'ContractorApplication (status REJECTED|WITHDRAWN): contactName, email, ' +
        'phone, abn, notes, insuranceData, experienceData, equipmentData, ' +
        'healthSafetyData, bankingData — aggregate/UTM/status fields kept',
    ],
    defaultWindowDays: 1 * YEAR,
    envVar: 'PII_RETENTION_UNSUCCESSFUL_APPLICANTS_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis: 'APP 11.2 (no statutory floor identified — owner decision)',
    enforced: true,
  },
  CONTACT_ENQUIRIES: {
    id: 'CONTACT_ENQUIRIES',
    description:
      'Public contact-form leads. Clock starts at submittedAt. NOTE: the ' +
      'existing purge-lead-pii cron (DR-858 N-09) already enforces this class ' +
      'with the same fields and the same env knob; this sweep is mutually ' +
      'idempotent with it (both guard on piiPurgedAt).',
    tables: [
      'ContactEnquiry: firstName, lastName, email, phone, ipAddress, userAgent ' +
        '(piiPurgedAt stamped) — subject/message/status kept',
    ],
    defaultWindowDays: 1 * YEAR,
    envVar: 'LEAD_PII_RETENTION_DAYS', // shared with purge-lead-pii — ONE knob
    method: 'DE_IDENTIFY',
    legalBasis: 'APP 11.2 (no statutory floor identified — owner decision)',
    enforced: true,
  },
  AUDIT_TRAIL_IP_UA: {
    id: 'AUDIT_TRAIL_IP_UA',
    description:
      'IP address / user-agent captured on audit and verification-history ' +
      'events. The EVENT rows are retained (audit trail integrity); only the ' +
      'network identifiers are de-identified. Clock starts at createdAt.',
    tables: [
      'ContractorVerificationHistory: ipAddress, userAgent',
      'AuditLogEntry (@@map AuditLog): ipAddress, userAgent',
    ],
    defaultWindowDays: 2 * YEAR,
    envVar: 'PII_RETENTION_AUDIT_IP_UA_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis: 'APP 11.2 (no statutory floor identified — owner decision)',
    enforced: true,
  },
  FINANCIAL_RECORDS: {
    id: 'FINANCIAL_RECORDS',
    description:
      'Financial/tax records linked to contractors (payout ledger, invoices, ' +
      'payments). NEVER destroyed by this sweep: statutory 7-year floor is ' +
      'CLAMPED in code — a shorter configured window is ignored. The sweep ' +
      'reports counts past the window for owner visibility only.',
    tables: ['ContractorPayout', 'InvoiceAU', 'Payment'],
    defaultWindowDays: FINANCIAL_RECORD_MINIMUM_DAYS,
    envVar: 'PII_RETENTION_FINANCIAL_RECORDS_DAYS',
    method: 'RETAIN',
    legalBasis:
      'Corporations Act 2001 (Cth) s 286 — 7 years (statutory floor, enforced as a code clamp)',
    enforced: true, // enforced as REPORT-ONLY + clamp; never destroys
  },
  TRAINING_ASSESSMENT: {
    id: 'TRAINING_ASSESSMENT',
    description:
      'Training/assessment records (module progress, assessment attempts, ' +
      'certifications). Low direct PII; needed while the contractor is active.',
    tables: [
      'ContractorAssessment, ContractorModuleProgress, NRPGTrainingProgress, ' +
        'ContractorCertification, CompetencyTestResult',
    ],
    defaultWindowDays: 7 * YEAR,
    envVar: 'PII_RETENTION_TRAINING_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis: 'APP 11.2 (owner decision; competency evidence may be needed for claims defence)',
    enforced: false,
    notes:
      'NOT YET ENFORCED: destruction should key off contractor departure, ' +
      'which has no schema anchor yet. Follow-up wiring once an offboarding ' +
      'timestamp exists.',
  },
  SIGNATURE_LEGAL_EVIDENCE: {
    id: 'SIGNATURE_LEGAL_EVIDENCE',
    description:
      'Typed-signature / ICA / commitment acceptance evidence (signature, IP, ' +
      'user agent). Contract-claim limitation periods (6 years in most AU ' +
      'states) mean this is legal evidence, kept well past onboarding.',
    tables: ['ContractorAgreementAcceptance, NRPGCommitment (signature, ipAddress, userAgent)'],
    defaultWindowDays: 7 * YEAR,
    envVar: 'PII_RETENTION_SIGNATURE_EVIDENCE_DAYS',
    method: 'RETAIN',
    legalBasis: 'Limitation of Actions Acts (6y contract claims, state-based) + APP 11.2',
    enforced: false,
    notes:
      'NOT YET ENFORCED: clock must start at CONTRACT END (termination), which ' +
      'has no schema anchor yet. Spec also lists executed ICAs under legal ' +
      'hold: de-identify rather than destroy when wired.',
  },
  MARKETING_CONSENT: {
    id: 'MARKETING_CONSENT',
    description:
      'Marketing/newsletter consent records. Kept while consent is active; ' +
      'after withdrawal, the consent/withdrawal evidence is retained for Spam ' +
      'Act 2003 defence, then de-identified.',
    tables: ['NewsletterSubscription, LeadCapture (marketing consent trail)'],
    defaultWindowDays: 2 * YEAR,
    envVar: 'PII_RETENTION_MARKETING_CONSENT_DAYS',
    method: 'DE_IDENTIFY',
    legalBasis: 'Spam Act 2003 (Cth) evidence of consent/withdrawal + APP 11.2',
    enforced: false,
    notes:
      'NOT YET ENFORCED: clock starts at consent withdrawal; withdrawal ' +
      'supersession records are not yet modelled (spec: consent scenarios).',
  },
};

/* ============================================================================
 * Carve-outs (enforced by the sweep BEFORE any destruction)
 * ==========================================================================*/

/**
 * LEGAL HOLD — GAP: the schema has NO legal-hold mechanism (no hold flag or
 * hold table exists). Until one is modelled, holds are a config-level list of
 * contractor/user ids (this constant, merged with the
 * PII_LEGAL_HOLD_CONTRACTOR_IDS env var — comma-separated). Any row linked to
 * a held id is NEVER destroyed by the sweep. OWNER-TUNABLE.
 */
export const LEGAL_HOLD_CONTRACTOR_IDS: string[] = [];

/** Env var carrying additional legal-hold ids (comma-separated). */
export const LEGAL_HOLD_ENV_VAR = 'PII_LEGAL_HOLD_CONTRACTOR_IDS';

/**
 * Code seam for legal holds: swap the internals for a schema-backed hold
 * table when one exists — callers only see a Set of held ids.
 */
export function getLegalHoldIds(env: Record<string, string | undefined> = process.env): Set<string> {
  const fromEnv = (env[LEGAL_HOLD_ENV_VAR] || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return new Set([...LEGAL_HOLD_CONTRACTOR_IDS, ...fromEnv]);
}

/**
 * ACTIVE DISPUTE/CLAIM carve-out: contractors attached (via Booking) to an
 * insurance claim in one of these non-terminal statuses are excluded from
 * destruction. Literal strings on purpose (InsuranceClaimStatus values) — no
 * runtime import from @prisma/client (CI has no generated client, PR #204).
 */
export const ACTIVE_DISPUTE_CLAIM_STATUSES = [
  'DRAFT',
  'SUBMITTED',
  'UNDER_REVIEW',
  'APPROVED',
  'PARTIALLY_APPROVED',
] as const;

/* ============================================================================
 * Window resolution
 * ==========================================================================*/

/**
 * Effective window for a class: env override > config default, with the
 * financial statutory floor clamped (FINANCIAL_RECORDS can never be tuned
 * below FINANCIAL_RECORD_MINIMUM_DAYS).
 */
export function getEffectiveWindowDays(
  classId: PiiRetentionClassId,
  env: Record<string, string | undefined> = process.env
): number {
  const def = PII_RETENTION_POLICY[classId];
  const raw = env[def.envVar];
  const parsed = raw ? parseInt(raw, 10) : NaN;
  let days = Number.isFinite(parsed) && parsed > 0 ? parsed : def.defaultWindowDays;
  if (classId === 'FINANCIAL_RECORDS' && days < FINANCIAL_RECORD_MINIMUM_DAYS) {
    days = FINANCIAL_RECORD_MINIMUM_DAYS; // statutory floor — never earlier
  }
  return days;
}

/** Classes the sweep actually enforces today. */
export function getEnforcedClasses(): PiiRetentionClass[] {
  return Object.values(PII_RETENTION_POLICY).filter((c) => c.enforced);
}
