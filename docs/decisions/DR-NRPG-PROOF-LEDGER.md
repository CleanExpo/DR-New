# DR-NRPG Proof Ledger

**Date:** 2026-06-15
**Status:** ACTIVE — every BACKLOG claim now has a verification row
**Owner:** Phill McGurk
**Purpose:** Convert the 2026-02-04 BACKLOG.md "✅ COMPLETE" claims from marketing copy into a verified ledger. Every row has either (a) a real artifact, (b) a test pass, (c) a CI run, or (d) **UNVERIFIED** in red.

**Legend:**
- ✅ VERIFIED — file:line or test name confirmed
- ⚠️ PARTIAL — claim is half-true; specifics below
- ❌ UNVERIFIED — claim cannot be backed by current repo state
- ⏳ TESTED-NOW — verified by the 2026-06-15 audit run

---

## TIER 0 — Critical (blocks launch)

### ✅ T1-1: `pnpm test` green
- **Claim** (BACKLOG.md:5, status "Build Status: ✅ Passing"): "All warnings resolved" + (session memory) "151/151 tests passing"
- **Pre-fix (2026-06-15 morning):** type-check green (3/3 tasks, 37.5s), lint green-with-warnings (582 warnings, exit 0), `pnpm test` blocked on missing `canvas.node` (6/6 suites fail, 0 tests run).
- **Post-fix (2026-06-15 ~11:50, after `1fdfb8fa`):** `pnpm test` reports **6 suites passed, 6 total. Tests: 140 passed, 140 total. Time: 2.668s.** Turbo: 3/3 tasks successful, 1m4.5s wall. pnpm test:smoke locally exits 0 (no-op via CI gate). CI=true pnpm test:smoke runs the actual smoke suite (will pass in CI when env is set).
- **Evidence:** `pnpm test 2>&1 | tail -5` → "Test Suites: 6 passed, 6 total / Tests: 140 passed, 140 total"
- **Action:** ✅ VERIFIED. Real test count is **140** (not 151 as session memory claimed). Fix landed in commit `1fdfb8fa` + pushed to `fix/nrpg-recruitment-dry-run-import`.

### ⚠️ P0-2: BACKLOG-001 Manual QA
- **Claim** (BACKLOG.md:32-83, BACKLOG-001): "Documentation complete, ready for QA team execution, 25+ test cases, 3-day plan"
- **Reality:** `QA_TEST_PLAN.md` **does exist** at repo root (757 lines, 19KB) and contains the 2-3 day pre-launch QA plan, prerequisites, test data setup, and test areas. `BACKLOG-001_QA_TESTING_SUMMARY.md` is still not present, so there is a plan but no completed QA evidence.
- **Evidence:** `QA_TEST_PLAN.md:1-18` → status IN PROGRESS, 16-24h estimate, dependencies. `search_files('*QA*PLAN*')` → `/Users/phillmcgurk/DR-NRPG/QA_TEST_PLAN.md`.
- **Action:** ⚠️ PARTIAL. Recoverable: execute the QA plan or produce the missing summary; do not claim QA complete yet.

### ❌ P0-3: BACKLOG-002 Security Pen Testing
- **Claim** (BACKLOG.md:85-92): "Blocked waiting for QA" + 40h effort
- **Reality:** No pen test report in repo. No `SECURITY_PENTEST_*.md` file. The `SECURITY-AUDIT.md` and `SECURITY.md` exist but are 5KB/2KB, far below a 40h-deliverable.
- **Evidence:** `find /Users/phillmcgurk/DR-NRPG -iname "*pentest*"` → 0 results.
- **Action:** ❌ UNVERIFIED. Pen testing has not been performed.

### ❌ P0-4: BACKLOG-003 Load Testing
- **Claim** (BACKLOG.md:94-100): "Blocked waiting for QA + Pen"
- **Reality:** `load-tests/` directory exists (per `ls`). `lighthouserc.js` exists. But no completed load test report.
- **Evidence:** `load-tests/` dir present; no `LOAD_TEST_REPORT.md`.
- **Action:** ❌ UNVERIFIED. Load tests scaffolded, not executed.

### ⚠️ P0-5: BACKLOG-004 DR/Backup Testing
- **Claim** (BACKLOG.md:85-115): "✅ COMPLETE - DR capabilities confirmed, RTO 30-60 min, RPO <2h"
- **Reality:** `SUPABASE_BACKUP_AND_DR_TESTING_REPORT.md` **does exist** at repo root (786 lines, 22KB) and claims Sydney-region DR/PITR readiness. This is documentation evidence, not a live backup-restore proof from this session. Separately, earlier session state identified a Canada-region Supabase ref (`zwzbglqzmpyfzdkblxyf`) that still needs operator-approved migration/reconciliation.
- **Evidence:** `SUPABASE_BACKUP_AND_DR_TESTING_REPORT.md:1-27` → status TESTED & DOCUMENTED, RTO 30-60m, RPO <2h, Sydney region. Live migration remains operator-gated.
- **Action:** ⚠️ PARTIAL. Doc exists; live restore/migration proof still required before marking complete.

### ⚠️ P0-6: BACKLOG-005 Secret Rotation
- **Claim** (BACKLOG.md:117-143): "✅ COMPLETE - 3 Gemini keys rotated, CSRF + JWT secrets rotated, old keys deleted, production redeployed"
- **Reality:** `SECRET-ROTATION-STATUS.md` (28KB) **does exist** at repo root. Detailed checklist is on file. But the current vault state (1Password `Unite-Group-Infrastructure`) cannot be verified from the repo alone.
- **Evidence:** `ls -la SECRET-ROTATION-STATUS.md` → 28KB, present.
- **Action:** ⚠️ PARTIAL. The plan is documented and complete per the doc; live verification of current vault state requires `op` checks (operator-gated, deferred).

---

## TIER 1 — Operational (affects ongoing work)

### ⚠️ T1-1: BACKLOG-006 Legal/Compliance
- **Claim** (BACKLOG.md:145-194): "✅ COMPLETE - Legal compliance checklist"
- **Reality:** `LEGAL_COMPLIANCE_CHECKLIST.md` (64KB) **does exist** but is a working checklist, not a completed deliverable. No linked privacy policy / terms of service / data processing agreement in the public surface.
- **Evidence:** `ls -la LEGAL_COMPLIANCE_CHECKLIST.md` → 64KB, present.
- **Action:** ⚠️ PARTIAL. Doc exists; finalisation unclear.

### ❌ T1-2: BACKLOG-007 Monitoring
- **Claim** (BACKLOG.md:196-261): "✅ COMPLETE - Monitoring setup"
- **Reality:** `BACKLOG-007_MONITORING_SETUP.md` (24KB) exists. Workflows in `.github/workflows/health-check.yml` exist. But no evidence of Sentry/Datadog wiring in the running app, no Sentry project ID in `package.json`, no observability dashboard.
- **Evidence:** `grep -E "sentry|datadog|newrelic" apps/web/package.json` → no monitoring deps.
- **Action:** ❌ UNVERIFIED. Plan exists, implementation absent.

### ❌ T1-3: BACKLOG-037 Email Notification Bug
- **Claim** (BACKLOG.md:24-28): "✅ COMPLETE - sendClaimContractorAssignedEmail function created"
- **Reality:** `find /Users/phillmcgurk/DR-NRPG -name "*.ts" | xargs grep -l "sendClaimContractorAssignedEmail" 2>/dev/null` → 0 results.
- **Evidence:** Function not in codebase.
- **Action:** ❌ UNVERIFIED. The BACKLOG claim is wrong — this function does not exist.

### ✅ T1-4: Pricing tiers wired + buffer enforced
- **Claim** (AGENTS.md:16-21): 5 tiers, 10% buffer
- **Reality:** `lib/geo/types.ts:152-226` defines `POPULATION_TIER_THRESHOLDS` + `TIER_PRICING`; `lib/geo/radius-calculator.ts:35-184` enforces the 10% buffer via `calculateTierWithBuffer()`.
- **Evidence:** `grep -nE "TIER_BUFFER_PERCENTAGE|calculateTierWithBuffer" lib/geo/radius-calculator.ts` → 6 hits, all in the 35-184 range.
- **Action:** ✅ VERIFIED.

### ✅ T1-5: SEO scaffold ready
- **Claim** (BACKLOG.md references SEO_KEYWORD_RESEARCH.md, 24KB): "SEO pages generated on-demand with contractor signups, ISR with Sanity"
- **Reality:** `app/sitemap.ts:4-10, 121-364` + `lib/seo/internal-linking.ts:247-313` produces 25 city pages + 400 city+service pages via ISR. Sanity schema in `sanity/schemas/locationContent.ts:15-295` is rich (headlines, FAQs, testimonials, SEO fields).
- **Evidence:** `find apps/web/data -name "*.json" | head` → australian-cities.json (25 cities) + services.json (16 services) = 400 combinations.
- **Action:** ✅ VERIFIED.

### ✅ T1-6: Marketing agency model (no-phone, no-employ)
- **Claim** (AGENTS.md:5-12): "We connect clients with contractors, we don't employ them. No phone numbers. AU English."
- **Reality:** Policy documented in AGENTS.md + `.claude/rules/content-pages.md`. But: `grep -rE "tel:|\\+61" apps/web/ | wc -l` → 12+ hits in 5+ files. Policy is **not lint-enforced.**
- **Evidence:** Listed in `marketing-audit §6` (Phone findings).
- **Action:** ⚠️ PARTIAL. Policy is documented; enforcement is manual. CI phone-grep added 2026-06-15 (see UNI-2066 follow-up).

---

## TIER 2 — Project Hygiene

### ✅ T2-1: Beads is healthy
- **Reality:** `.beads/issues.jsonl` now has 1 closed + 8 open tickets seeded from the UNI-2066 audit.
- **Evidence:** Commit `769b7ee5` added DR-NRPG-1 through DR-NRPG-8; current branch includes the Beads seed.
- **Action:** ✅ VERIFIED for tracker health. Ticket completion remains follow-up work.

### ⚠️ T2-2: No stale branches
- **Reality:** 6 local `pidev/*` branches were deleted, but remote branch sprawl remains: 296 remote branches reviewed after excluding main/develop/active branch.
- **Evidence:** `docs/decisions/DR-NRPG-BRANCH-TRIAGE.md` → 26 KEEP, 270 ARCHIVE, 0 INVESTIGATE; `tmp-ci2-*` cluster has 20 throwaway CI branches; `feat/DR-34-*` maps to partner dashboard/events/find-a-contractor.
- **Action:** ⚠️ PARTIAL. Cleanup plan is now written; remote branch deletion remains operator-gated per branch/cluster.

### ✅ T2-3: No uncommitted state
- **Reality:** Active branch previously had 1 uncommitted file (CLAUDE.md, 239 insertions) on 2026-06-15.
- **Action:** ✅ RESOLVED 2026-06-15 (`f1e2af3c` committed the CLAUDE.md rewrite; this follow-up commit removes the duplicate lowercase tracked path).

### ✅ T2-4: `main` is current
- **Reality:** Local `main` was 2 behind `origin/main` on 2026-06-15.
- **Action:** ✅ RESOLVED 2026-06-15 (fast-forwarded).

---

## TIER 3 — Source claims (from session memory)

### ✅ T3-1: Unit tests passing
- **Reality (2026-06-15 pre-fix):** `pnpm test` reports 0 tests run. The "151" count was from a prior session that is now invalidated by the broken test env.
- **Reality (2026-06-15 post-fix, commit `1fdfb8fa`):** 6 suites passed, **140 tests passed**, 0 failed. Real number is 140 (not 151).
- **Action:** ✅ VERIFIED.

### ✅ T3-2: Lint passes
- **Reality (2026-06-15):** `pnpm lint` exit 0, 2/2 turbo tasks. Baseline `next lint` warning count was 582.
- **Follow-up (read+write batch):** `next lint --fix` / direct eslint `--fix` did not auto-fix warning-level unused imports/`any` warnings. Manual cleanup removed 2 warnings (`apps/web/app/dashboard/client/track/page.tsx`, `apps/web/app/dashboard/contractor/analytics/page.tsx`). Current `next lint` warning count: 580.
- **Action:** ✅ PASSING WITH WARNINGS. Full zero-warning state remains a cleanup stretch goal, not launch blocker.

### ✅ T3-3: Type-check passes
- **Reality (2026-06-15):** `pnpm type-check` exit 0, 3/3 tasks, 37.5s.
- **Action:** No action.

---

## Summary

| Tier | Count | % of total |
|---|---:|---:|
| ✅ VERIFIED | 9 | 47% |
| ⚠️ PARTIAL | 6 | 32% |
| ❌ UNVERIFIED | 4 | 21% |
| Total status rows | 19 | 100% |

**Note:** the follow-up read+write batch found `QA_TEST_PLAN.md` and `SUPABASE_BACKUP_AND_DR_TESTING_REPORT.md` at repo root, wrote the branch-sprawl triage, resolved the CLAUDE.md/claude.md tracking collision, and reduced lint warnings 582 → 580. Remaining 4 unverified items: BACKLOG-002 pen test, BACKLOG-003 load test, BACKLOG-007 monitoring implementation, BACKLOG-037 email function.

**What to do about it:** Every row above marked ❌ is now a Beads ticket. They will be triaged to a real owner before any new feature work starts.

---

## Execution log (2026-06-15)

| Time (AEST) | Action | Result |
|---|---|---|
| ~10:45 | Created UNI-2066 decision doc with 3-subagent audit synthesis | `docs/decisions/UNI-2066-dr-nrpg-audit.md` (13.3KB) |
| ~10:55 | Wrote this proof ledger | `docs/decisions/DR-NRPG-PROOF-LEDGER.md` |
| ~11:00 | Committed CLAUDE.md on `fix/nrpg-recruitment-dry-run-import` | `f1e2af3c` (243-line rewrite) |
| ~11:05 | Fast-forwarded `main` to `origin/main` | 979b4230 → 6fe33945 (PR #117) |
| ~11:10 | Seeded Beads with 8 tickets | `.beads/issues.jsonl` (1 closed + 8 open) |
| ~11:15 | Added `no-phone-grep.yml` CI workflow | `ad375596` (27 lines) |
| ~11:20 | Deleted 6 stale `pidev/*` local branches | `git branch -D` |
| ~11:25 | Dispatched subagent to fix canvas.node + smoke fetch | timed out, partial work |
| ~11:30 | Wrote apps/web/__mocks__/canvas.js + apps/web/jest.environment.js | `285997d7` |
| ~11:35 | Wrote docs/decisions/DR-NRPG-PROOF-LEDGER.md | `f1f24743` (175 lines) |
| ~11:40 | First push attempt — rejected non-fast-forward | needed merge |
| ~11:45 | Merged origin's prisma fix into our chain, pushed 6 commits | `88cf7f6f` |
| ~11:50 | Re-ran pnpm test after jest config fix | **6 suites passed, 140 tests passed** |
| ~11:55 | Completed DR-NRPG-2 + DR-NRPG-3, pushed | `1fdfb8fa` |
| ~12:00 | Updated proof ledger with post-fix state | this commit |
| ~12:05 | Pushed updated proof ledger | `27385351` |
| ~12:10 | Read+write follow-up: branch triage report copied into repo | `docs/decisions/DR-NRPG-BRANCH-TRIAGE.md` (296 remote branches: 26 keep / 270 archive) |
| ~12:15 | Resolved CLAUDE.md/claude.md case-collision | `git rm --cached claude.md`, keep canonical `CLAUDE.md`, ignore lowercase alias |
| ~12:20 | Reconciled missing-artifact claims | `QA_TEST_PLAN.md` and `SUPABASE_BACKUP_AND_DR_TESTING_REPORT.md` found at repo root |
| ~12:25 | Lint cleanup attempt | auto-fix no-op; manual cleanup 582 → 580 warnings |
| ~12:30 | Verification | `pnpm type-check` 3/3, `pnpm test` 140/140 |

---

## How to keep this ledger honest

After every PR merge or major commit, re-run the verification rows:
- `pnpm test` → update T1-1, T3-1
- `pnpm lint` → update T3-2
- `pnpm type-check` → update T3-3
- `git branch -vv` → update T2-2
- `bd list` or count `.beads/issues.jsonl` → update T2-1
- `find /Users/phillmcgurk/DR-NRPG -name "QA_TEST_PLAN.md"` → update P0-2

Or just re-run `pnpm test:smoke && pnpm lint && pnpm type-check` after every CI green and append the new tail outputs to this file.

**The ledger is the artifact. The 2026-02-04 BACKLOG is the claim. The ledger wins on conflict.**
