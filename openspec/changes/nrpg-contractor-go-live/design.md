# Design: NRPG Contractor Go-Live

## Approach

Wire the existing, mostly-built subsystems into one gated journey on a verified database, fixing only the blockers needed for the first cohort. The design rests on three pillars: (1) a reconciled data model with a verified migration baseline, (2) a single computed dispatch gate as the source of truth, and (3) a phased delivery that verifies the production database **before** any migration is authored.

## Data-model reconciliation

**Two contractor models, distinct roles.** `Contractor` is the canonical *lifecycle* model (signup -> verify -> ICA -> training -> admin-approve -> Connect -> dispatch). `ContractorProfile` (table `contractor_profiles`, `@unique` on `userId`, holds `stripeConnectAccountId`) is the *existing booking-flow* model the live `/signup?type=contractor` path already writes, alongside `ContractorPreferences`/`ContractorMatch`. Do not collapse them: define `Contractor` as the lifecycle source of truth and keep `ContractorProfile` for booking/matching. The canonical owner of `abnNumber`/`acnNumber`/`nrpgMemberId` uniqueness is `Contractor`. The backfill reconciles legacy `User`+`ContractorProfile` rows into `Contractor`+`ContractorOnboarding` at the correct pre-verification step — idempotent, dry-run-reported, with ON CONFLICT/quarantine for duplicate/NULL ABNs. **No legacy row may become `isDispatchEligible` without passing every gate.**

**Missing-migration drift — verify prod first.** ~18 lifecycle tables + their enums have NO CREATE migration (`Contractor`, `contractor_onboarding`, `contractor_certifications`, `contractor_module_progress`, `contractor_assessments`, `ContractorDocument`, `ContractorVerificationHistory`, `contractor_applications`, `nrpg_onboarding_phases`, `nrpg_commitments`, etc.), yet `20251231180000` ALTERs `contractor_onboarding`/`contractor_certifications` (resolve-applied without running) and the RLS migrations (`20250127200000`, `20260202000000`) `CREATE POLICY` on tables that never existed — so the chain is non-deployable from zero. Reconcile by introspecting prod via CI (read-only direct URL / Supabase MCP) into a three-way diff (schema <-> migrations <-> prod), then generate the repair via `prisma migrate diff --from-migrations --to-schema-datamodel --script` (NOT hand-written `CREATE TABLE`), gated by `migrate diff --exit-code == 0`. Squash/regenerate a clean baseline (with `CREATE EXTENSION IF NOT EXISTS pgcrypto` before any `gen_random_uuid()` default) and prove `migrate deploy` green on a truly empty DB. Use exact Prisma-resolved names (mixed PascalCase `Contractor`/`ContractorDocument` and snake_case `contractor_onboarding`/`_certifications`/`_profiles`); rewrite RLS statements to the real `relname` and prove tenant isolation with a live cross-tenant SELECT returning zero rows.

**`ContractorOnboarding.contractorId` referent — DECISION (DR-879, Option B, 2026-06-28): canonical key is `User.id`, NOT `Contractor.id`.** The lifecycle tables are already keyed on `User.id` across ~24 call sites (`onboarding/start` sets `contractorId = user.id`) and the frontend (`/api/onboarding/progress/${userId}`), with a 1:1 User↔Contractor relationship. Verified against prod: **0 `contractor_onboarding` rows → 0 orphans → no data to migrate.** We standardise on `User.id` rather than remap `contractorId` across dozens of lifecycle tables (a high-risk live-data migration for a 1:1 relationship). Consequences: (a) `contractor-eligibility.service.ts` querying by `userId` is **correct** under this model — DR-880 becomes a verification, not a fix; (b) ownership checks compare `contractorId === user.id` (restored by the #159 revert after the DR-875 regression); (c) the convention is codified in `lib/contractor-identity.ts` (`contractorKey`, `ownsContractorResource`) to prevent the Contractor.id-vs-User.id mistake recurring. Optional future hardening: add FK `contractor_onboarding.contractorId → users(id)` once rows exist.

## The single computed dispatch gate

`isDispatchEligible` is the **single source of truth** for job dispatch. No backing column or derivation exists today.

- Schema: `Contractor.isDispatchEligible Boolean @default(false)` + `dispatchEligibilityComputedAt DateTime?` (+ denormalized `dispatchBlockReason` JSON).
- Written by ONE recompute function over the full gate set: `emailVerified` AND current-version ICA accepted AND all required documents APPROVED+unexpired AND admin-approved (`isVerified`) AND all 24 modules passed with a valid non-expired certificate AND Commitment signed (not renewal-due) AND Stripe `charges_enabled && payouts_enabled` AND NRPG phase >= LIVE AND status ACTIVE/not suspended.
- Shared by the completion flow AND every sweep/webhook. Recompute triggers: training completion, ICA (re)acceptance, commitment signing, admin approve/reject/suspend, cert/document expiry sweep, Stripe `account.updated`.
- Every bid/match/dispatch path reads only this flag; the derived predicate must equal the stored value (proven). Any single gate failing forces it false; removing any precondition flips it false (table-driven test).

## Gated state machine

The contractor advances through ordered gates, each persisted with an audit trail and none skippable:

`signup (User+Contractor+ContractorOnboarding) -> email verified -> ICA accepted (signature+version+hash+signed PDF) -> documents uploaded -> admin APPROVED -> NRPG phases (1->2->3->4, 90-day probation in Phase 4) -> 24 modules passed (>=threshold) + auto-certification -> Commitment signed -> Stripe Connect payouts_enabled -> LIVE`

Acceptance/verification records are append-only and immutable; version bumps (ICA, Commitment, policy) supersede prior acceptances and re-gate eligibility to false until re-accepted.

## Concrete schema fields to add (one coordinated CI batch)

- `User.lockedUntil DateTime?` + `User.failedLoginAttempts Int @default(0)` + `User.lastFailedLoginAt DateTime?` (auth lockout blocker; `lib/auth.ts` reads them).
- ICA acceptance record (`ContractorAgreementAcceptance`, append-only): `agreementVersion`, `agreementAcceptedAt`, `documentHash`, typed `signature`, `ipAddress`, `signedPdfUrl`, `signedPdfHash`, `supersededAt`; unique on (contractorId, agreementVersion). Same pattern applied to `NRPGCommitment` (version, hash, signedName column, PDF).
- `ContractorPayout` ledger keyed to `Contractor.id`: `stripeTransferId @unique` (DB-level idempotency, not app-level), `grossAUD`/`platformFeeAUD`/`netAUD`/GST fields, `status` enum (INITIATED/PAID/FAILED/REVERSED), `idempotencyKey @unique`, `paymentId`/sourceRef, timestamps. Derive `totalEarnings`/`totalPaidOut` from it; drop the ghost denormalized counters.
- Enums needing idempotent `CREATE TYPE`: `OnboardingStatus`, `ModuleStatus`, `ContractorVerificationStatus`, `ContractorDocumentType`, `DocumentStatus`, `VerificationAction`, `NRPGPhaseStatus`, `NRPGPartnershipLevel`, `AustralianState`, `AustralianServiceType`.

## Phased delivery

- **Phase 0 — Verify prod DB FIRST (BLOCKER GATE).** Introspect prod read-only; assert the 9 contractor/NRPG tables and missing columns exist; emit an existing-vs-missing matrix. If any core table is missing or `migrate status` is dirty -> STOP, report, get owner decision before writing migrations.
- **Phase 1 — Auth + gates.** `lockedUntil` + lockout, verification email on signup, email-verified gate, verification gate on contractor dashboard, RBAC, ownership scoping.
- **Phase 2 — Signup -> lifecycle wiring.** Ensure `Contractor`+`ContractorOnboarding` on signup, one canonical signup path, fix eligibility id bug, backfill legacy.
- **Phase 3 — ICA acceptance.** Acceptance page + API + append-only model + signed PDF + version/hash; gate LIVE on it (counsel sign-off owner-gated).
- **Phase 4 — Training / payments dispatch-gate.** Prove training + commitment + Stripe feed `isDispatchEligible`; payout transfer + ledger + Connect webhook; remove ghost fields (live keys owner-gated, test mode for proof).
- **Phase 5 — Stress + judge.** Single-missing-gate matrix, concurrency/load, re-score.
- **Phase 6 — Handoff.** Capture state, evidence, residual owner items.

## Rollback

All go-live migrations are additive/expand-contract (nullable/defaulted columns, add+backfill renames, no destructive drops in one release) so N-1 code stays schema-compatible. A fresh Supabase PITR checkpoint is taken (ID/timestamp recorded) BEFORE `migrate deploy`; the job aborts if the snapshot fails. The whole flow ships behind `NRPG_CONTRACTOR_GO_LIVE` (default OFF) so a runtime flag flip reverts to the safe legacy/coming-soon state with no redeploy. `rollback.yml` (owner-gated) promotes the prior deployment; the runbook documents the PITR restore command, RTO/RPO, a rehearsed drill, and the env/domain revert (since `vercel rollback` reverts code only). Rollback that cannot be demonstrated blocks go-live.

## Observability

Errors captured in Sentry tagged `release=SHA` with PII scrubbed via `beforeSend`. Alerts on: signup/verification-email failures, ICA/Commitment signing failures, Stripe webhook signature/delivery failures, `payout.failed`/transfer failures, and expiry/payout sweep failures or non-runs. A failed production transfer alerts within one cron cycle and records `ContractorPayout.status=FAILED` without overstating totals. Sweeps (`contractor-expiry-sweep`, `contractor-payout-sweep`, renewal-notify) are registered in `vercel.json`, `CRON_SECRET`-protected, bounded/resumable (`maxDuration`), idempotent on `stripeTransferId`, and verified present in the Vercel dashboard. The `/api/health` gate asserts `database`/`stripe`/`storage` report healthy (accept-503 branch removed); a synthetic signup emits expected telemetry.
