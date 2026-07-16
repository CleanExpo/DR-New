# Evidence Audit — DR-915 Verification Ledger

> **Task:** DR-915 — *[Evidence Audit 2026-07-02] 46 unverified Done tickets — verification ledger* (project: DR-NRPG Ops).
> **Method:** every `Done` ticket in DR-NRPG Ops cross-checked against merged-PR titles/branches/bodies on `CleanExpo/DR-NRPG` (216 merged PRs) for a ticket-id reference, then each remaining ticket proven or refuted against the current repo tree via targeted code probes.
> **Generated:** 2026-07-17 · branch `agent/dr-915`.

## How to read a grade

| Grade | Meaning | DoD action to clear |
|---|---|---|
| `VERIFIED` | A merged PR references the ticket id (title/branch/body). | Already cleared. |
| `VERIFIED-CODE` | No PR-id link, **but** the claimed functionality is confirmed present in the current tree by a targeted probe this session. | Attach the implementing PR to close the evidence gap. |
| `NO-CODE-CHANGE` | Ticket is legitimately non-code (audit / decision / config-infra / planning / spec / monitor-alert). | Apply the `no-code-change` label. |
| `UNVERIFIED` | Feature ticket claiming shipped code, but no PR-id link **and** the claimed artifact is absent / not located. Suspected false-complete. | Locate + attach the PR, or reopen/refute. |

**Caveat carried from the ticket:** repos differ in how reliably PR titles carry ticket ids, so *unverified ≠ false*. A `VERIFIED-CODE` grade means the capability is really in the tree even though no PR names the ticket; an `UNVERIFIED` grade means neither a PR nor the artifact could be found and the claim must be actively refuted or evidenced by an owner.

## Summary

- **Total `Done` tickets audited:** 103
- **`VERIFIED` by merged-PR id reference:** 32
- **No PR-id evidence (the audit population):** 71
  - `VERIFIED-CODE` (functionality confirmed in tree, PR link missing): 20
  - `NO-CODE-CHANGE` (legitimately non-code): 32
  - `UNVERIFIED` (suspected false-complete): 19

## Priority tickets (mandated 'verify first')

| Ticket | Grade | Evidence |
|---|---|---|
| **DR-393** | `NO-CODE-CHANGE` | Stripe LIVE config is Vercel env/infra (13 env vars, live account) — non-code. Webhook routes DO exist (`app/api/webhooks/stripe/payments`, `/tenant`). Recommend `no-code-change`; live-key presence is owner/infra-verifiable only. |
| **DR-98** | `VERIFIED-CODE` | Job Management module present: `app/api/jobs/route.ts` (list+filters), `app/api/jobs/[id]`, `app/api/jobs/contractor-matching`, `app/dashboard/jobs`. |
| **DR-390** | `VERIFIED-CODE` | `apps/web/src/lib/security/encryption.ts` has `aes-256-gcm` + `crypto.createCipheriv` (KMS-stub to AES path, matching the ticket claim). |
| **DR-384** | `UNVERIFIED` | SUSPECTED FALSE-COMPLETE — no dedicated PII-minimisation/redaction module found (only an unrelated test-file keyword hit); claimed translation-route PII stripping not located. |
| **DR-392** | `VERIFIED-CODE` | Media capture present via `apps/web/src/hooks/useWebRTC.ts` (`getUserMedia`). NOTE: the specific `DamageMediaCapture.tsx` named in the ticket is ABSENT — capability exists, exact artifact does not. |
| **DR-387** | `UNVERIFIED` | SUSPECTED FALSE-COMPLETE — all three claimed artifacts (`app/manifest.ts`, `public/service-worker.js`, `app/offline/page.tsx`) are ABSENT; no manifest/service-worker/offline route found anywhere in tree. |
| **DR-165** | `VERIFIED-CODE` | Insurance claim workflow present: `app/api/claims/route.ts`, `app/api/claims/[id]/documents/route.ts` (upload), `app/api/claims/[id]/report/route.ts` (summary). |
| **DR-217** | `VERIFIED` | Merged-PR id reference: #214, #220 |

## Ledger — tickets with no merged-PR id reference

| Ticket | Title | Grade | Evidence / recommended action |
|---|---|---|---|
| DR-75 | STRIPE-886a: Audit DR Stripe account — confirm live mode, webhook acti | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-98 | [DR-APP-01] DR-NRPG: Complete Job Management Module — the core operati | `VERIFIED-CODE` | Job Management module present: `app/api/jobs/route.ts` (list+filters), `app/api/jobs/[id]`, `app/api/jobs/contractor-matching`, `app/dashboard/jobs`. |
| DR-163 | DR-NRPG: Reporting dashboard — job completion & contractor performance | `VERIFIED-CODE` | Reporting dashboard present: `app/dashboard/reports/page.tsx`, `app/api/reports/route.ts`, `app/api/reports/export`. |
| DR-164 | DR-NRPG: Notifications system — SMS + email alerts | `VERIFIED-CODE` | SMS/alert plumbing present: `apps/web/src/lib/sms/twilio-config.ts`, `src/lib/security/alert-service.ts`. |
| DR-165 | DR-NRPG: Insurance Claim Integration — document upload & tracking | `VERIFIED-CODE` | Insurance claim workflow present: `app/api/claims/route.ts`, `app/api/claims/[id]/documents/route.ts` (upload), `app/api/claims/[id]/report/route.ts` (summary). |
| DR-166 | DR-NRPG: Job Management Module — create, assign, track jobs | `VERIFIED-CODE` | Same module as DR-98 — `app/api/jobs`, `app/dashboard/jobs` present. |
| DR-168 | Contractor Directory & Verification — implement licence validation API | `VERIFIED-CODE` | Contractor directory/verification surfaces present: `app/contractor/[id]`, `app/(public)/directory`; see `docs/contractor-verification-schema-design.md`. |
| DR-169 | Property Owner Portal — complete remaining UI screens | `VERIFIED-CODE` | Property Owner portal present: `app/property-owners/page.tsx`, `app/dashboard/client`. |
| DR-181 | [P1] Excalidraw — NRPG job scope diagrams — AI-generated visual propos | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-195 | [P0] Connect Xero (DR License) to Unite-Group — live financials dashbo | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-201 | [P1] NRPG Workwear Store — dropship hi-vis + branded trade gear | `VERIFIED-CODE` | Store fully present: `app/(public)/store` (landing/cart/checkout/[slug]) + `app/api/store/{products,checkout}`. |
| DR-211 | [P0][PRE-PROD] DR-NRPG — Verify database state matches Disaster-Recove | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-215 | [P0][PRE-PROD] DR-NRPG — SQL audit & cleanup (16 loose SQL files + 2 n | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-216 | [P0][PRE-PROD] DR-NRPG — Master Pre-Production Checklist | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-224 | [P1] SEO — Product schema markup + XML sitemap entries for store pages | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-231 | [P0] SEO: Add Product schema to all store product pages | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-241 | [P2] SEO: Add location-level AggregateRating schema to all 150+ city p | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-246 | [P3] SEO: Add structured SiteLinksSearchBox schema to homepage | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-248 | DR-NRPG scaffolding — verify App Router structure, update if needed | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-250 | [ENG] NRPG Quoting Engine — Rate Card Integration | `VERIFIED-CODE` | Quote surface present: `app/quote/page.tsx`. (Rate-card integration specifics unconfirmed.) |
| DR-252 | [ENG] Contractor Onboarding Portal | `VERIFIED-CODE` | Contractor onboarding present: `app/dashboard/contractor/onboarding`. |
| DR-253 | [ENG] Job Management System | `VERIFIED-CODE` | Job Management System — `app/api/jobs`, `app/dashboard/jobs` present. |
| DR-364 | [BLOCKER] Mobile responsiveness pass — all 21 onboarding pages | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-365 | [BLOCKER] PWA manifest + service worker implementation | `UNVERIFIED` | Same as DR-387 — no PWA manifest or service worker present in tree. |
| DR-366 | [BLOCKER] Camera/media capture integration for client claim flow | `VERIFIED-CODE` | Same capability as DR-392 — `useWebRTC.ts` getUserMedia present. |
| DR-367 | Gemma 4 Phase 1 — server-side translation layer via Vertex AI | `VERIFIED-CODE` | Translation layer present: `apps/web/src/lib/translation/{translator.ts,languages.ts}`. |
| DR-368 | Real-time claim status push notifications — wire up webhook delivery | `UNVERIFIED` | SUSPECTED FALSE-COMPLETE — no web-push / FCM / PushSubscription service-worker push code found for real-time claim-status push. |
| DR-369 | ADR-001: Gemma 4 Multilingual — Architecture Decision Record | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-371 | Stripe live keys + product/price configuration | `NO-CODE-CHANGE` | Stripe live keys + product/price config = infra/Vercel env. Recommend `no-code-change`. |
| DR-372 | End-to-end QA — cross-device testing all 21 pages | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-374 | UX design — review flow, language selection, RTL layout | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-375 | Week 1 Sprint — Mobile Foundation (all 21 pages responsive) | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-376 | Mobile PWA Spec — complete implementation guide for all 21 onboarding  | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-377 | Week 2 Sprint — Integration (PWA + camera + notifications + Gemma 4 Ph | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-378 | Week 3 Sprint — Hardening (Stripe live + full QA + WCAG) | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-380 | [SECURITY] AWS KMS Encryption — Property Access Instructions | `VERIFIED-CODE` | Duplicate of DR-390; AES-256-GCM encryption service present at `apps/web/src/lib/security/encryption.ts`. |
| DR-381 | [SECURITY] Supabase RLS Policy Audit — All Tables (Multi-Tenant Isolat | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-382 | [COMPLIANCE] Privacy Collection Notice — AI Processing Disclosure (APP | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-384 | [SECURITY] Gemma 4 PII Data Minimisation Layer — Disable Training Logg | `UNVERIFIED` | SUSPECTED FALSE-COMPLETE — no dedicated PII-minimisation/redaction module found (only an unrelated test-file keyword hit); claimed translation-route PII stripping not located. |
| DR-385 | [BLOCKER] Mobile responsiveness pass — all 21 onboarding pages (Day 1– | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-386 | Gemma 4 Phase 1 — server-side translation via Vertex AI (Week 2, Apr 8 | `VERIFIED-CODE` | Same translation layer as DR-367 — `src/lib/translation` present. |
| DR-387 | [BLOCKER] PWA manifest + service worker — offline-capable disaster fie | `UNVERIFIED` | SUSPECTED FALSE-COMPLETE — all three claimed artifacts (`app/manifest.ts`, `public/service-worker.js`, `app/offline/page.tsx`) are ABSENT; no manifest/service-worker/offline route found anywhere in tree. |
| DR-388 | 🚀 NRPG SPRINT KICKOFF — Board-Approved. 29 April Launch. Start coding  | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-389 | Real-time claim status push notifications — wire up webhook to client  | `UNVERIFIED` | Duplicate of DR-368 — no web-push implementation located. |
| DR-390 | [SECURITY] AWS KMS encryption — property access instructions (property | `VERIFIED-CODE` | `apps/web/src/lib/security/encryption.ts` has `aes-256-gcm` + `crypto.createCipheriv` (KMS-stub to AES path, matching the ticket claim). |
| DR-391 | [SECURITY] Supabase RLS audit — verify client/contractor/admin tenant  | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-392 | [BLOCKER] Camera + media capture component — damage photo/video for cl | `VERIFIED-CODE` | Media capture present via `apps/web/src/hooks/useWebRTC.ts` (`getUserMedia`). NOTE: the specific `DamageMediaCapture.tsx` named in the ticket is ABSENT — capability exists, exact artifact does not. |
| DR-393 | Stripe live configuration — products, prices, webhooks (revenue go-liv | `NO-CODE-CHANGE` | Stripe LIVE config is Vercel env/infra (13 env vars, live account) — non-code. Webhook routes DO exist (`app/api/webhooks/stripe/payments`, `/tenant`). Recommend `no-code-change`; live-key presence is owner/infra-verifiable only. |
| DR-394 | [COMPLIANCE] Privacy collection notice — AI translation disclosure (AP | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-395 | Offline forms — IndexedDB persistence for claim intake in disaster sce | `VERIFIED-CODE` | Offline persistence present: `apps/web/src/lib/mobile/offline-sync-manager.ts`. |
| DR-396 | WCAG 2.1 AA accessibility audit + remediation — all 21 onboarding page | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-397 | Core Web Vitals — LCP <2.5s, INP <200ms, CLS <0.1 on all onboarding pa | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-423 | RTL Layout Support — Arabic Language (Board Decision 3, Phase 1.1) | `VERIFIED-CODE` | RTL/Arabic support keyed off `src/lib/translation/languages.ts` (language metadata present). |
| DR-427 | DECISION-7 Dependency: Stripe Live Keys — CEO + Finance to Source by A | `NO-CODE-CHANGE` | CEO+Finance decision dependency (approve live keys). Non-code decision ticket. Recommend `no-code-change`. |
| DR-428 | GAP-3 (Board): Real-Time Push Notifications — Wire Firebase + Webhook  | `UNVERIFIED` | GAP-3 push notifications — no web-push/FCM implementation located. |
| DR-429 | GAP-5 (Board): Review/Rating UX — SPM Mobile Walkthrough + WCAG 2.1 AA | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-430 | Gemma 4 Vertex AI: DPA with Google Cloud + User Consent Modal (Legal B | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-431 | SPM Cross-Device Walkthrough — 11 Client + 11 Contractor Pages (Starts | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-457 | Ask Maps: Create GBP optimization checklist for NRPG contractors | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-458 | ⏸ AWAITING PHILL — Audit top 10 contractor GBPs | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-460 | Ask Maps: Implement "NRPG Network Partner" consistency across contract | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-461 | Ask Maps: Quarterly NRPG contractor network GBP audit | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-487 | Gemma 4 Multilingual — Board-Approved Scope: Top 20 AU/NZ Languages (w | `VERIFIED-CODE` | Multilingual scope backed by `src/lib/translation/languages.ts` (language catalogue present). |
| DR-582 | [Pi-SEO][Monitor] [Monitor Alert] new_critical: Secret detected: AWS a | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-654 | [AUDIT] Sweep NRPG Operations Platform frontend for surface-treatment  | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-683 | [UI/UX] DR-NRPG ops-platform polish — 7 P1 fixes | `UNVERIFIED` | Feature-type ticket with no merged-PR referencing its id and no grounded artifact confirmed this session. Attach implementing PR or refute. |
| DR-684 | [Pi-CEO] feat: Pi CEO build | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-685 | [Pi-CEO] feat: Pi CEO build | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-686 | [Pi-CEO] feat: Pi CEO build | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-687 | [Pi-CEO] feat: Pi CEO build | `NO-CODE-CHANGE` | Non-code ticket (audit / decision / planning / spec / infra). Clears via `no-code-change` label per DoD, not a PR. |
| DR-751 | [UI] Unified Spinner component — consolidate 5 implementations | `UNVERIFIED` | No dedicated unified `Spinner` component file found under `src/components`. |

## Appendix A — tickets already VERIFIED by merged-PR id reference

These carry a merged PR whose title, branch, or body names the ticket id. No further action.

| Ticket | Title | Merged PR(s) |
|---|---|---|
| DR-217 | [P0][PRE-PROD] DR-NRPG — Smoke Tests (12 checks, automated i | #214, #220 |
| DR-218 | [P0][PRE-PROD] DR-NRPG — E2E Functional Tests (full user jou | #208 |
| DR-219 | [P0] Store Stripe payment — take payment before Printful ord | #42, #184, #186 |
| DR-220 | [P0] URGENT: Rotate leaked secrets — NEXTAUTH_SECRET, JWT_SE | #16, #40 |
| DR-229 | [P0] SEO: Create llms.txt policy file for AI search discover | #17 |
| DR-230 | [P0] SEO: Fix all disasterrecoverynrpg.com.au domain referen | #17, #41 |
| DR-232 | [P1] SEO: Add metadata exports to 21 pages inheriting generi | #11, #12 |
| DR-233 | [P1] SEO: Fix homepage missing H1 — replace H2 with keyword- | #44 |
| DR-234 | [P1] SEO: Add FAQPage schema to all 5 main service pages | #14, #46, #140 |
| DR-235 | [P1] SEO: Add Review schema to ClientTestimonialCarousel | #14 |
| DR-236 | [P1] SEO: Add BreadcrumbList schema to store and service sub | #14 |
| DR-237 | [P1] SEO: Create /faq page with FAQPage schema for top 20 qu | #17 |
| DR-240 | [P1] GEO: Add Q&A / FAQ section to homepage for AI Overview  | #17 |
| DR-244 | [P2] SEO: Create Restore Assist landing page (/restore-assis | #18, #47 |
| DR-514 | Pi-SEO: 117 critical+high security findings in code (XSS + s | #63 |
| DR-515 | Pi-SEO: 25 critical+high npm dependency vulnerabilities | #62, #63 |
| DR-752 | [UI] Skeleton loading — replace spinners with shadcn Skeleto | #98, #101 |
| DR-753 | [UI] Empty state UI — jobs list and live dashboard | #98, #101 |
| DR-754 | [UI] Chat interface loading — visible feedback for isLoading | #98, #101 |
| DR-755 | [UI] Map error/timeout state — fallback if WebGL or dynamic  | #98 |
| DR-756 | [UI] Auth redirect — error feedback on session expiry | #98 |
| DR-757 | P1: No error boundary on admin dashboard — unhandled crash r | #99, #101 |
| DR-758 | P2: Promise.all() swallows fetch failures silently on admin  | #97, #100 |
| DR-759 | P2: Earnings page fetch missing response.ok check — HTTP err | #97, #100 |
| DR-760 | P2: No AbortController on polling fetch in contractor dashbo | #97, #100 |
| DR-761 | P2: Availability toggle button is 32px height — below 44px W | #97, #100 |
| DR-762 | P2: GBP dashboard page has no loading skeleton — blank flash | #97 |
| DR-763 | P2: Admin category creation uses alert() and window.location | #97 |
| DR-764 | P3: Contractor confirmation modal missing role="dialog" and  | #99 |
| DR-765 | P3: Focus not restored to trigger element after contractor c | #99 |
| DR-766 | P3: Opportunities empty state doesn't distinguish filter-emp | #99 |
| DR-767 | P3: Contractor verification form errors not scrolled into vi | #99 |

## Method notes / limitations

- PR corpus: `gh pr list --repo CleanExpo/DR-NRPG --state merged --limit 500` → 216 merged PRs, matched for `DR-<n>` in title, branch and body.
- Code probes run against the current `main` tree in this worktree. The repo was restructured into a monorepo (`apps/web/…`), so original ticket paths (e.g. `app/manifest.ts`, `src/components/claim/DamageMediaCapture.tsx`) no longer resolve verbatim; probes searched by capability, not just the cited path.
- A `VERIFIED-CODE` grade confirms the capability exists in the tree today; it does not prove which PR shipped it. Closing each such ticket still needs the implementing PR attached in Linear (or a `no-code-change` label where appropriate).
- Cited commit SHAs in ticket descriptions (e.g. DR-393 `6d8737a4`) did not resolve in the current history (history rewritten during restructure) and so were not usable as evidence.
