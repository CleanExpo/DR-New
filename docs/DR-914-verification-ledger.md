# DR-914 — Evidence Audit Verification Ledger

**Project:** DR-NRPG Contractor Go-Live
**Audit date:** 2026-07-17
**Method:** Each suspect "Done" ticket's shipped-functionality claim was cross-checked against the code surfaces that actually back it — the Prisma schema (`apps/web/prisma/schema.prisma`) and the baseline DDL migration (`apps/web/prisma/migrations/00000000000000_init_baseline/migration.sql`), which is what creates the production tables. Table names were resolved by introspection of `@@map` (not assumed snake_case vs PascalCase). The audit is captured as a runnable regression guard: `apps/web/src/__tests__/unit/dr-914-schema-presence.test.ts` (26 assertions, all green).

Both tickets carried the `unverified-complete` label (Done with zero merged-PR evidence). This ledger proves or refutes each — unverified ≠ false.

## DR-863 — Assert the 9 contractor/NRPG lifecycle tables exist

**Verdict: VERIFIED (not a false-complete).** All 9 Prisma models are declared and each has a matching `CREATE TABLE` in the baseline migration.

| # | Prisma model | Resolved table (relname) | schema.prisma | migration.sql |
|---|---|---|---|---|
| 1 | Contractor | `Contractor` (no `@@map`) | L280 | L302 |
| 2 | ContractorOnboarding | `contractor_onboarding` | L1234 | L1072 |
| 3 | NRPGOnboardingPhase | `nrpg_onboarding_phases` | L1344 | L1168 |
| 4 | NRPGCommitment | `nrpg_commitments` | L1423 | L1245 |
| 5 | NRPGTrainingProgress | `nrpg_training_progress` | L1393 | L1217 |
| 6 | ContractorModuleProgress | `contractor_module_progress` | L1258 | L1090 |
| 7 | ContractorAssessment | `contractor_assessments` | L1278 | L1107 |
| 8 | ContractorDocument | `ContractorDocument` (no `@@map`) | L2506 | L2127 |
| 9 | ContractorVerificationHistory | `ContractorVerificationHistory` (no `@@map`) | L2537 | L2155 |

## DR-864 — Assert previously-missing columns exist (User.lockedUntil, payout-settings)

**Verdict: VERIFIED (not a false-complete).** `User.lockedUntil` and its account-lockout companion exist on the `User` model/table; the payout-settings fields live on the `ContractorProfile` (`contractor_profiles`) surface. None of the asserted columns are absent.

| Column | Owning model / table | schema.prisma | migration.sql |
|---|---|---|---|
| `lockedUntil` | User | L115 | L194 |
| `failedLoginAttempts` | User | L116 | L195 |
| `stripeConnectAccountId` | ContractorProfile / `contractor_profiles` | L537 | L509 |
| `stripePayoutsEnabled` | ContractorProfile / `contractor_profiles` | L538 | L510 |

## Disposition

Both DR-863 and DR-864 are **assertion-only** tickets (they assert schema presence; no application code was to change). The claims are true at both the ORM layer and the DDL layer, so neither is a false-complete and neither is reopened. They clear the DR-914 ledger via evidence: this document plus the passing regression test. The `unverified-complete` label can be removed from both.

**Evidence artifact:** `apps/web/src/__tests__/unit/dr-914-schema-presence.test.ts` — run with `pnpm --filter nrpg-web test -- src/__tests__/unit/dr-914-schema-presence.test.ts`.
