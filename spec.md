# DR-NRPG — Production-Readiness Spec

> **Document Version:** 1.0  
> **Created:** 2026-06-22  
> **Author:** Senior PM (automated via new-spec)  
> **Status:** Active — gates not yet cleared  

---

## §0 — Where This Sits in the Pipeline

```
brainstorm → [spec ← YOU ARE HERE] → loop (gate-driven delivery)
```

This spec is the handover from "planning" to "doing." Nothing ships to production unless every gate in §4 and §6 is cleared. The final sign-off checklist in §7 is the only honest basis for a "% complete" claim.

---

## §1 — System Observatory

### What It Is

**Disaster Recovery National Restoration Professionals Group (DR-NRPG)** is an Australian multi-tenant SaaS platform that connects property owners who have suffered disaster damage (fire, flood, mould, water) with certified disaster recovery contractors. The platform manages the full lifecycle: claim submission → contractor matching → job dispatch → payment → reporting.

**Live domain:** disasterrecovery.com.au  
**Repo:** CleanExpo/DR-NRPG (GitHub)  
**Deployment:** Vercel (production)  

### Three User Roles

| Role | What They Do |
|------|-------------|
| **Client** (property owner) | Submit disaster claims, upload photos, track job progress, make payments |
| **Contractor** (restoration professional) | Receive matched jobs, submit bids, complete work, receive payouts via Stripe Connect |
| **Admin** | Verify contractors, manage platform, review analytics, handle disputes |

### Infrastructure (verified from codebase)

| Layer | Technology | Real Status |
|-------|------------|-------------|
| Frontend | Next.js 14 App Router + TypeScript | Build passes (type-checking disabled) |
| Database | PostgreSQL via Neon, 107 Prisma models | Connected |
| Cache | Upstash Redis | Connected |
| Auth | NextAuth.js v4 + JWT | Working |
| Payments | Stripe Connect | Integration complete; refund handler **incomplete** |
| Real-time | Supabase Realtime | Connected |
| File Storage | Cloudinary | Production ready |
| Email | Resend (primary) / SendGrid (fallback) | **Code ready; credentials missing** |
| Bot protection | hCaptcha | Production ready |
| Monitoring | Sentry | Config only — **not actually integrated** |
| Analytics | GA4 + custom BI suite (Phase 05) | Configured |
| Hosting | Vercel | Deployed, CI/CD active |

### Claims to Verify (Do Not Treat as Facts)

- **"98% complete"** — marketing language. True completion is measured by §7 only.
- **"1,726 TypeScript errors"** — original count from Feb 2026. `npx tsc --noEmit` crashes with heap exhaustion; actual current count is unknown.
- **"318 API endpoints"** — figure from planning docs; integration audit (Phase 2) has not run.
- **"All tests passing"** — unit/integration tests are disabled in CI. E2E Playwright suites exist; run status unverified on current branch.
- **Phases 1–5 "complete"** — execution summaries exist, but TypeScript errors bypass was in place during all of them. Code in those phases has never been compiler-verified.

### Context Not Available

- Google Drive was not reachable in this session. If project documents, brand guidelines, or client agreements live there, paste or upload the relevant ones to supplement this spec.
- Linear project board status not checked — pull current ticket state before sprint planning.

---

## §2 — Definition of "Production-Ready & Owned"

The platform is **Production-Ready & Owned** when ALL of the following are true. Not "mostly" — all.

### Ownership
- [ ] All code, DNS, and deployment credentials sit in Phill's accounts (GitHub: CleanExpo, Vercel, Neon/Supabase, Stripe, Cloudinary).
- [ ] A new engineer can clone the repo, follow `README.md` / `FINAL_HANDOVER.md`, and run the platform with zero oral knowledge transfer.
- [ ] No secrets live in developer laptops or chat history — all via Vercel environment variables.

### Build Integrity
- [ ] `npx tsc --noEmit` passes with zero errors (type-checking **not** bypassed in `next.config.mjs`).
- [ ] `npm run build` completes clean with `typescript.ignoreBuildErrors: false` and `eslint.ignoreDuringBuilds: false`.
- [ ] All E2E and integration tests pass in CI.

### Legal & Compliance (Australian context)
- [ ] Sensitive property data (access codes, keys, gate codes) encrypted at rest — KMS or equivalent.
- [ ] Audit trail exists for every admin action affecting contractor verification, payments, and user data.
- [ ] Platform is operating within Australian Privacy Act obligations (data residency, breach notification, data minimisation).
- [ ] Contractor-platform relationship clearly documented as independent contractor (not employee) — relevant to Fair Work Act exposure.

### Operational
- [ ] Sentry is receiving real errors from production (not just configured in env vars).
- [ ] Automated daily DB backup verified end-to-end (backup exists + restore tested).
- [ ] Rollback procedure documented and tested.
- [ ] On-call runbook exists for the 5 most likely production incidents.

---

## §3 — Gap-Discovery Mechanism

A mechanical pass over the codebase and CI results, scored by severity:

### CRITICAL — Blocks Production Launch

| ID | Gap | Evidence |
|----|-----|----------|
| C-01 | TypeScript build bypassed in production | `next.config.mjs` line 44: `ignoreBuildErrors: true` |
| C-02 | Email service has no credentials → 20+ API routes silently non-functional | `SPEC.md §2.1` — password reset, email verify, claim notifications, newsletter all broken |
| C-03 | Sensitive property data stored plaintext | `api/client/onboarding/property/route.ts:67` — TODO comment: "Encrypt with AWS KMS" |
| C-04 | Refund handler incomplete | `webhooks/stripe/payments/route.ts:211` — comment defers to "Phase 04 Task 7" |
| C-05 | AuditLog Prisma model missing `user` relation and `@@map` — table never migrated to DB | `prisma/schema.prisma` had model without `user User? @relation(...)`. `audit.service.ts` silently swallowed every failed DB write. **Fixed:** relation added, `@@map("audit_logs")` added, migration `20260622000000` created. Apply with `npx prisma migrate deploy`. |
| C-06 | ~~`/api/webhooks/monitoring` unauthenticated~~ | **Not a real gap.** `validateMonitorAuth()` with Bearer token was already implemented. `SPEC.md §2` entry was stale. No action needed. |

### HIGH — Must Resolve Before Beta

| ID | Gap | Evidence |
|----|-----|----------|
| H-01 | ~~Sentry not integrated~~ | **Partially fixed.** `sentry.server.config.ts` existed. `handleUnexpectedError` and `handleDatabaseError` in `lib/api-errors.ts` now call `Sentry.captureException`. Requires `NEXT_PUBLIC_SENTRY_DSN` env var to be set in Vercel. |
| H-02 | Unit and integration tests disabled | `SPEC.md §7.1`: "❌ Disabled — Commented out" |
| H-03 | ABN validation is mock-only — fake ABNs accepted | `SPEC.md §3.3`: "Mock only, no ABR API" |
| H-04 | Contractor application workflow missing | `SPEC.md §3.3`: "Template only, workflow missing" |
| H-05 | Console.log (406 instances) instead of structured logging | `SPEC.md §11.1` |
| H-06 | 91 TODO comments in production code | `SPEC.md §11.1` |

### MEDIUM — Resolve Before Soft Launch

| ID | Gap | Evidence |
|----|-----|----------|
| M-01 | `unsafe-eval` + `unsafe-inline` in CSP | `next.config.mjs` lines 147–148 — weakens XSS protection |
| M-02 | PDF export returns JSON (not a PDF) | `Phase 05 execution summary` — "PDF export returns JSON, requires client-side conversion" |
| M-03 | Messaging intentionally disabled — no contractor↔client comms | `SPEC.md §3.2`: 30% complete |
| M-04 | Daily reports generation works but distribution is missing | `SPEC.md §3.2`: 70% complete |
| M-05 | No API documentation (OpenAPI/Swagger) for 318 endpoints | `SPEC.md §11.3` |

---

## §4 — Consequential-Action Gates

> **The standing rule:** the system may *prepare* any consequential action, but may not *commit* it until a human or a hard rule explicitly clears the gate. Prepare ≠ commit. Every gate below enforces this.

DR-NRPG performs three classes of hard-to-reverse, high-impact actions in the real world. The gates are built around exactly those.

---

### Gate A — Money Movement (Stripe Payments & Contractor Payouts)

**Why it matters:** Real AUD moves from clients → platform → contractors. A bug here overpays, underpays, or pays the wrong party. Stripe charges are not automatically reversible; refunds require explicit action and take 5–10 business days to appear.

| Step | Rule | Hard Check |
|------|------|------------|
| A-1 | Payment **intent** created — do not charge | `PaymentIntent` status must be `requires_confirmation` before any UI shows "Pay" |
| A-2 | Charge confirmed only on explicit client action | Server-side confirmation gate: session user ID must match booking's client ID |
| A-3 | Payout to contractor **prepared** as a Stripe Transfer — not executed | Transfer remains in `pending` status in DB until admin or cron rule approves |
| A-4 | Payout requires job status = `COMPLETED` AND client rating submitted | Hard DB check before Transfer execution |
| A-5 | Refund **prepared** (refund object created) — not submitted to Stripe | Refund requires admin approval record in DB before `stripe.refunds.create()` is called |
| A-6 | Refund > $500 AUD requires explicit admin approval | Hard amount check — no automation above this threshold |
| A-7 | Stripe webhook handler must be idempotent | Each event ID logged to `StripeWebhookEvent` table; duplicate events are silently discarded |

**Current gap:** Gate A-5 is not implemented (C-04 above). **No refund processing must go live until A-5 is in place.**

---

### Gate B — People Dispatch (Contractor → Client Property)

**Why it matters:** This platform sends people to private properties. A wrong match, an unverified contractor, or a cancelled job not communicated creates real-world harm (unverified person accessing a home, property left unsecured, client financial loss).

| Step | Rule | Hard Check |
|------|------|------------|
| B-1 | Contractor must be `VERIFIED` status to receive job matches | DB check on `Contractor.status` before match algorithm runs |
| B-2 | IICRC certification must be current (not expired) | `IICRCCertification.expiryDate > now()` enforced at match time |
| B-3 | Contractor must hold ABN validated against ABR | ABN validation must be live (not mock) before contractor can be verified — **H-03 above must be resolved** |
| B-4 | Job dispatch is **prepared** (notification sent) — property access details not released until booking confirmed | Access codes/gate details only released after `Booking.status = CONFIRMED` AND `Payment.status = PAID` |
| B-5 | Contractor cannot access property data of jobs they are not assigned to | Prisma query scope: `where: { contractorId: session.user.contractorId }` enforced on all property routes |
| B-6 | Cancellation notifications sent within 30 minutes | Cron or webhook trigger — not manual |

---

### Gate C — Insurance & Claims Data

**Why it matters:** DR-NRPG processes insurance claim data for 8 Australian providers. Incorrect claim submissions, data leakage, or wrong insurer routing causes financial and legal harm to clients who depend on these claims for disaster recovery funding.

| Step | Rule | Hard Check |
|------|------|------------|
| C-1 | Claim submitted to insurer only after client confirms all details | Two-step: draft → client confirmation → submission. No single-step auto-submit |
| C-2 | Claim data is tenant-scoped — cross-tenant read is impossible | Every Prisma query on `InsuranceClaimAU` includes `where: { tenantId: session.user.tenantId }` |
| C-3 | Claim status updates from insurer logged verbatim before any UI update | Inbound webhook payload persisted before processing — enables audit/replay |
| C-4 | Admin cannot modify a submitted claim without creating an audit record | Every write to `InsuranceClaimAU` by admin role creates `AuditLog` record — **C-05 above must be resolved first** |
| C-5 | Sensitive claim attachments (photos, documents) are access-controlled | Cloudinary signed URL required — no public URLs on claim documents |

---

## §5 — Phases with Completion Criteria

> Each phase has a **Definition of Done (DoD)**, a **hard test gate** (checkable in CI), and a **Review gate** assigned to a Unite-Hub agent.

---

### Phase 1 — TypeScript Zero-Error Build

**DoD:** `npx tsc --noEmit` exits 0. `next.config.mjs` has `ignoreBuildErrors: false`. Build passes in CI.

**Hard test gate:**
```bash
cd apps/web && npx tsc --noEmit --incremental
# Exit code must be 0
```

**Review gate:** Forge (developer agent) — confirms no `as any` workarounds introduced to silence errors.

**Blocking:** Everything else. No other phase may be marked complete while this is open.

---

### Phase 2 — Critical Blocker Resolution (C-01 through C-06)

**DoD:** All six CRITICAL gaps from §3 resolved and verified:
- Email service live (send a real verification email in staging)
- KMS encryption on property access fields
- Refund gate A-5 implemented and tested
- Audit trail table migrated and logging
- Monitoring webhook authenticated
- TypeScript build clean (from Phase 1)

**Hard test gate:**
```bash
# Email: trigger password reset, check inbox
# KMS: query DB directly — access_code field must not be plaintext
# Refund: create test refund, verify it stays pending without admin approval
# Audit: perform contractor verification action, verify AuditLog record exists
# Webhook: call /api/webhooks/monitoring without auth header, expect 401
```

**Review gate:** Lens (legal/ethics agent) — confirms KMS scope and audit trail coverage meet Australian Privacy Act obligations.

---

### Phase 3 — ABN Validation & Contractor Workflow

**DoD:** ABN validated against Australian Business Register (ABR API) for all contractor applications. Contractor application workflow end-to-end (apply → admin review → approve/reject → notification).

**Hard test gate:**
- Submit application with known invalid ABN → rejected
- Submit application with valid ABN → proceeds to review queue
- Admin approves → contractor status = `VERIFIED`, email sent, Gate B-3 passes

**Review gate:** Forge — confirms ABR integration handles ABN format edge cases (GST registration, cancelled ABNs, sole traders vs companies).

---

### Phase 4 — Test Suite Activation

**DoD:** All commented-out unit and integration tests uncommented and passing. E2E Playwright suite passing on staging. Coverage report generated.

**Hard test gate:**
```bash
npm run test:ci
# Exit code 0, coverage > 60%
npx playwright test --project=chromium
# Zero failures on critical flows (claim submission, payment, contractor dispatch)
```

**Review gate:** Vex (data/QA agent) — reviews coverage report, flags untested critical paths.

---

### Phase 5 — Production Hardening

**DoD:** Sentry receiving real errors. Console.log replaced with structured logging (Pino). Top 20 TODO comments resolved or documented as accepted technical debt. CSP `unsafe-eval`/`unsafe-inline` reduced to minimum.

**Hard test gate:**
- Trigger a deliberate 500 error in staging → verify Sentry event appears in dashboard
- `grep -r "console\.log" apps/web/app/api` → zero results
- `grep -r "TODO" apps/web/app/api` → count ≤ 20 (down from 91)

**Review gate:** Grid (ops agent) — confirms monitoring coverage and logging pipeline.

---

### Phase 6 — Handover & Documentation

**DoD:** A new engineer can clone the repo, run `FINAL_HANDOVER.md` instructions, and reach a working staging environment within 2 hours with no verbal guidance.

**Hard test gate:** Phill (or a fresh engineer) follows `FINAL_HANDOVER.md` from scratch on a clean machine. Any step that fails = phase not done.

**Deliverables:**
- `FINAL_HANDOVER.md` — complete operations guide
- `RUNBOOK.md` — top 10 incident playbooks
- `.env.example` — all 150+ variables documented
- `scripts/deploy-staging.sh` and `scripts/deploy-production.sh`

**Review gate:** Nova (senior PM agent) — final readiness review before sign-off.

---

## §6 — The Review Layer

### How a Phase Passes

A phase is **PASSED** when:
1. **Hard gate exits 0** (CI check, script output, or verifiable state in DB) — AND
2. **Assigned soft reviewer raises no blocking objection** — "multiple eyes"

A phase is **FAILED** if either condition is not met. A soft reviewer's objection blocks until resolved.

### Hard Gates (automated, binary)

| Check | Tool | Passing Condition |
|-------|------|-------------------|
| TypeScript | `tsc --noEmit` | Exit 0 |
| Build | `npm run build` | Exit 0, no ignored errors |
| Unit/integration tests | `npm run test:ci` | Exit 0 |
| E2E tests | `playwright test` | Zero failures on 5 critical flows |
| Security scan | `npm audit --audit-level=high` | Zero high/critical vulnerabilities |
| Secrets scan | TruffleHog (CI workflow `security.yml`) | Zero findings |
| Stripe refund gate | Manual test script | Refund stays pending without admin approval |
| Audit log | DB query | Admin action creates `AuditLog` record |

### Soft Gates (agent reviewers)

| Agent | Role | Reviews |
|-------|------|---------|
| Forge | Developer | Phase 1, 3 — code quality, TypeScript correctness, no `as any` hacks |
| Lens | Legal/ethics | Phase 2 — KMS scope, Privacy Act, contractor classification |
| Vex | Data/QA | Phase 4 — test coverage, critical path coverage |
| Grid | Ops | Phase 5 — monitoring, logging, alerting |
| Nova | Senior PM | Phase 6 — handover completeness, launch readiness |

---

## §7 — Final Sign-Off Checklist

> This checklist is the **only honest basis for a "% complete" claim.** Marketing figures are not used here.

### Build & Code Quality
- [ ] `npx tsc --noEmit` exits 0 (no bypass in config)
- [ ] `npm run build` exits 0 (no bypass in config)
- [ ] Zero high/critical npm vulnerabilities
- [ ] Zero TruffleHog secret findings
- [ ] Console.log replaced with structured logging in all API routes
- [ ] TODO comments ≤ 20 in `apps/web/app/api`

### Security
- [ ] KMS encryption on property access codes, gate codes, key safe codes
- [ ] Audit trail logging for all admin actions (contractor verification, payment overrides)
- [ ] `/api/webhooks/monitoring` requires authentication
- [ ] Stripe webhook signature verified on all webhook routes
- [ ] hCaptcha enforced in production (`REQUIRE_CAPTCHA=true`)
- [ ] All secrets rotated from development values

### Payments (Gate A)
- [ ] Stripe refund gate (A-5) implemented — no auto-refund without admin approval
- [ ] Contractor payout requires job `COMPLETED` + client rating
- [ ] Stripe webhook idempotency verified (duplicate event test)
- [ ] Live Stripe keys configured (not test keys)
- [ ] Stripe webhooks pointing to production URL

### People Dispatch (Gate B)
- [ ] ABN validation live against ABR (not mock)
- [ ] Contractor `VERIFIED` status required before any job match
- [ ] IICRC cert expiry checked at match time
- [ ] Property access details gated behind confirmed booking + paid status

### Claims / Insurance (Gate C)
- [ ] Claim two-step confirmation (draft → client confirms → submit)
- [ ] All claim queries tenant-scoped in Prisma
- [ ] Claim attachments behind signed Cloudinary URLs (no public URLs)
- [ ] Audit record on every admin claim modification

### Email & Comms
- [ ] Email service credentials configured (`RESEND_API_KEY` or `SENDGRID_API_KEY`)
- [ ] Verification email sends (test in staging)
- [ ] Password reset email sends
- [ ] Claim confirmation notification sends
- [ ] Contractor application notification sends

### Monitoring & Ops
- [ ] Sentry receiving errors from production (trigger test error, verify in Sentry dashboard)
- [ ] Daily DB backup verified (backup exists + restore tested)
- [ ] Health check endpoints responding (`/api/health`, `/api/health/deep`)
- [ ] Rollback procedure documented and tested once

### Testing
- [ ] `npm run test:ci` exits 0
- [ ] Playwright E2E: claim submission flow passes
- [ ] Playwright E2E: payment flow passes
- [ ] Playwright E2E: contractor dispatch flow passes
- [ ] Playwright E2E: contractor login + job acceptance passes
- [ ] Load test: 100 VU smoke test passes without errors

### Handover
- [ ] `FINAL_HANDOVER.md` exists and is complete
- [ ] `RUNBOOK.md` covers top 10 incidents
- [ ] `.env.example` documents all 150+ variables
- [ ] New engineer cold-start test: staging up in under 2 hours from docs alone
- [ ] All production credentials in Phill's accounts (not developer laptops)

---

## §8 — Open Items for Phill to Close

These are decisions only you can make. Bring answers to the next planning session.

| # | Decision | Why It's Yours |
|---|----------|---------------|
| 1 | **Email service provider** — Resend or SendGrid? | Both have code paths. Resend is primary in config. You need to create the account and generate the API key. |
| 2 | **KMS provider** — AWS KMS, or a simpler alternative (e.g., Vercel encrypted env vars + application-layer AES-256)? | AWS KMS requires an AWS account and adds infrastructure cost. For an early-stage Australian SaaS, application-layer encryption may be acceptable with a legal review. Lens should advise. |
| 3 | **ABN validation** — the ABR API (free, Australian Government) requires a GUID registration. Have you registered for ABR Web Services access? | ABR requires business entity registration. Takes 1–5 business days. Must be done by the platform owner. See: abr.business.gov.au/Tools/AbrWebServices |
| 4 | **Contractor independent-contractor status** — has a lawyer reviewed the platform's contractor-matching model against the Fair Work Act and recent gig-economy rulings? | Highly relevant to Australian law (Deliveroo/Uber precedents). A misclassification finding means penalty exposure. |
| 5 | **TypeScript memory limit** — the current machine cannot run `tsc --noEmit` on the full codebase (heap exhaustion at 8GB). Will you allocate a build server / CI machine with 16GB+ RAM, or take the incremental split-check approach? | Cost and architecture decision. |
| 6 | **Beta cohort** — 100 NSW/VIC contractors is the stated target. Have any been pre-qualified? Do you have a recruitment plan? | You own the business relationships. |
| 7 | **Stripe live mode** — are you ready to enable live payments, or is staging still needed? Enabling live mode creates real financial obligations. | Your call + your Stripe account. |
| 8 | **Data residency** — Neon PostgreSQL is hosted on AWS us-east-1. Australian clients' disaster data (insurance claims, property addresses) is stored offshore. Under **Privacy Act 1988 (Cth), APP 8.1**, before disclosing personal information to an overseas recipient you must take reasonable steps to ensure that recipient does not breach the APPs in relation to that information — there is no absolute residency mandate. However, APP 8 also exposes the disclosing entity to liability for the overseas recipient's breach. The practical question is: can you document "reasonable steps" (encryption, contractual clauses, DPA with AWS) sufficient to satisfy APP 8.1? If not, migrating to an Australian-region host (Supabase Sydney is available; Neon has no AU region) removes the cross-border disclosure question entirely. Lens should advise on whether your current AWS SCC/DPA with Neon constitutes "reasonable steps." | Neon account is yours; Supabase migration is a major infrastructure decision. |

---

*Spec created 2026-06-22 by Senior PM via new-spec skill.*  
*Next review trigger: completion of Phase 1 (TypeScript zero-error build).*
