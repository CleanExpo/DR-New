# Go-Live Handoff — NRPG Contractor Program

**Change:** `nrpg-contractor-go-live` · **Phase 6** · Ticket **DR-913** (parent **DR-861**)
**Prepared:** 2026-07-17 · **Branch of record:** `main` (tip `0e3371ea`)
**Companion:** [`design.md`](./design.md) (approach, data model, dispatch gate, rollback, observability)

---

## 1. State — one sentence

The contractor go-live program (signup → email-verify → ICA → documents → admin approval → NRPG phases → 24-module training → NRPG Commitment → Stripe Connect payouts → dispatch) has been **live in production since 2026-07-02** behind the `NRPG_CONTRACTOR_GO_LIVE` kill switch; the **buildable** scope of Phases 0–5 is merged to `main`, and what remains is a set of **owner/live-stack decisions**, not engineering work.

### Phase status

| Phase | Scope | State |
|-------|-------|-------|
| 0 — Verify prod DB first | Introspect prod read-only; existing-vs-missing matrix; STOP-gate | Done (informed the DR-879 `User.id` decision — 0 `contractor_onboarding` rows, 0 orphans) |
| 1 — Auth + gates | Lockout, verification email, email-verified gate, RBAC, ownership scoping | Merged |
| 2 — Signup → lifecycle wiring | `Contractor`+`ContractorOnboarding` on signup, canonical path, eligibility id fix, backfill | Merged |
| 3 — ICA acceptance | Acceptance page + API + append-only model + signed PDF + version/hash | Merged; **counsel sign-off owner-gated** (see §4) |
| 4 — Training / payments dispatch-gate | 24-module set-equality, cert issue/expiry, Commitment, payout ledger, Connect webhook | Merged; **live Stripe keys owner-gated** (see §4) |
| 5 — Stress + judge | Single-missing-gate matrix, load scenario, kill switch, deep health, migrate-deploy baseline | Merged |
| 6 — Handoff | This document | In progress (DR-913) |

---

## 2. The single dispatch gate (source of truth)

`Contractor.isDispatchEligible` is the ONE flag every bid/match/dispatch path reads. It is written by one recompute function over the full gate set: `emailVerified` AND current-version ICA accepted AND all required documents APPROVED + unexpired AND admin-approved (`isVerified`) AND all 24 modules passed with a valid non-expired certificate AND NRPG Commitment signed (not renewal-due) AND Stripe `charges_enabled && payouts_enabled` AND NRPG phase ≥ LIVE AND status ACTIVE/not-suspended. Any single gate failing forces it `false`. Full derivation and the recompute triggers are in [`design.md`](./design.md) §"The single computed dispatch gate".

---

## 3. Evidence — merged work

Each row is a merged PR on `main`; commit is the squash SHA.

| Area | Ticket / PR | Commit | What it proves |
|------|-------------|--------|----------------|
| Stripe Connect webhook + capability-gated eligibility | DR-898 / #192 | `bd2c2bf5` | `account.updated` feeds the dispatch gate |
| Sealed quiz keys + server-side grading | DR-892 / #195 | `243ee5ef` | Training cannot be self-graded client-side |
| Payout ledger idempotency + idempotent Connect account creation | DR-897 / #200 | `18a4abd3` | DB-level `stripeTransferId`/`idempotencyKey` uniqueness |
| 24-module set-equality + auto-issue certification | DR-893 / #199 | `57c0394f` | Single-source threshold/validity; 24-module completeness |
| Cert-expiry sweep + retake policy (cap/cooldown/admin reset) | DR-894 / #202 | `c90e47d8` | Expiry re-gates eligibility |
| NRPG phase-checklist integrity + Phase 4 probation | DR-895 / #203 | `2ee89761` | Phase ≥ LIVE gate semantics |
| Canonical transfer path + deferred payout sweep cron | DR-896 / #204 | `b48ea107` | One transfer path for every call site |
| Single-missing-gate matrix against the real handler | DR-904 / #205 | `68c9586b` | Removing any one precondition flips the flag `false` |
| Enforce eligibility on bid submit/accept + canonical claims match | DR-925 / #211 | `1398bad0` | No dispatch path bypasses the flag |
| PII retention policy config + dry-run retention sweep cron | DR-902 / #209 | `c3566a0a` | Retention machinery built; windows owner-tunable (§4) |
| Deep `/api/health` (db/stripe/storage) + env-parity gate | DR-907 / #212 | `f1dc3f37` | Health asserts real dependency health; accept-503 removed |
| signup→eligibility k6 load scenario + negative-path ledger | DR-906 / #213 | `faa346fc` | Concurrency/load coverage |
| Credentials-authorize sign-in fix + env-honest CI smoke | DR-905/907 / #214 | `e1adff86` | Sign-in regression closed |
| Go-live E2E as required blocking gate + zero-residual teardown | DR-905 / #208 | `3f6a7635` | E2E Tests job is blocking (no `continue-on-error`) |
| `NRPG_CONTRACTOR_GO_LIVE` kill switch + flag-off rollback proof | DR-929 / #221 | `09e6b9e8` | Runtime revert to safe state without redeploy of code |
| `migrate deploy` + drift check replaces `db push` in E2E gate | DR-930 / #220 | `d331344d` | Deploy path exercised in CI, not just schema push |
| Squash migrations to a rebuildable baseline | DR-868 / #223 | `d148bb77` | `00000000000000_init_baseline` deploys green on an empty DB |
| Reinstate tenant RLS as a trailing migration after squash | DR-936 / #224 | `5652acf3` | `20260710000002_reinstate_tenant_rls` restores tenant isolation |
| Stripe production env template + Rana setup checklist | #226 | `0756f2ee` | Names the 16 prod Stripe vars; unblocks Deploy Production |
| AU-English contractor training + guard | #227 | `42617007` | Content guard over `NRPG-Onboarding-Framework/**` |

**Key artefacts to read on pickup**
- Dispatch identity convention: `apps/web/lib/contractor-identity.ts` (`contractorKey`, `ownsContractorResource`) — codifies the DR-879 `User.id` decision.
- ICA source of truth: `apps/web/lib/legal/ica.ts` (`ICA_VERSION = '2026-03-05'`).
- Kill switch: `apps/web/lib/feature-flags/nrpg-go-live.ts` + runbook `apps/web/docs/runbooks/nrpg-kill-switch.md`.
- Migration baseline: `apps/web/prisma/migrations/00000000000000_init_baseline` + `20260710000002_reinstate_tenant_rls`.
- PII retention: `apps/web/lib/privacy/pii-retention-policy.ts` + `pii-retention-sweep.ts` + `app/api/cron/pii-retention-sweep/route.ts`.
- Stripe prod checklist: `docs/STRIPE-PRODUCTION-SETUP.md`.

---

## 4. Residual OWNER items (not engineering work)

These are the items DR-913 exists to surface. Each is a decision/credential only the owner (or counsel) can supply; the code seam for each is already merged and waiting.

### 4.1 Live Stripe keys — BLOCKS payouts + health-200

- **State:** `/api/health` returns 503 in prod because Stripe is `not_configured` (verified live on `dr-nrpg-platform.vercel.app` and `nrpg.business`; database + storage healthy). The health gate runs an authenticated `stripe.balance.retrieve()`.
- **Owner action:** set the production Stripe vars (secret + publishable, 5 webhook secrets, 9 price IDs — the 16 names listed in `.env.production.example`) on the **Vercel Production** scope, then redeploy without build cache. Full checklist: `docs/STRIPE-PRODUCTION-SETUP.md` (Rana-facing).
- **Owner:** Rana / account owner. **Proof of done:** `/api/health` → 200 with `stripe: healthy`.
- Until then, real payouts and `payouts_enabled=true` on the dispatch gate cannot be proven on the live stack (test mode proves the code path).

### 4.2 ICA counsel sign-off — BLOCKS the dispatch gate going GREEN for real cohorts

- **State:** ICA text, version (`2026-03-05`), hashing, append-only acceptance, and signed PDF are all merged (DR-885/DR-889). Per the module header and DR-891, **"the accepted version must have a recorded counsel sign-off before the dispatch gate may go GREEN."**
- **Owner action:** obtain legal counsel's written sign-off on the current `ICA_VERSION`; record it against that version. Any content revision requires bumping `ICA_VERSION`, which supersedes prior acceptances and re-gates every contractor to `false` until re-accepted.
- **Owner:** founder + engaged legal counsel.

### 4.3 PII retention windows — owner (legal) decision, sweep is DRY-RUN until set

- **State:** the retention matrix (9 classes, table/field mapping, destruction method, legal basis, per-class env override) is merged in `apps/web/lib/privacy/pii-retention-policy.ts`. The window **values are DEFAULTS pending owner legal sign-off** (financial records carry a Corporations Act s 286 7-year floor as a code clamp). The sweep cron is **dry-run by default** — it destroys nothing until `PII_SWEEP_EXECUTE=true`.
- **Owner action:** (a) confirm or tune each per-class window (env knobs, e.g. `PII_RETENTION_VERIFICATION_DOCUMENTS_DAYS`, `PII_RETENTION_POLICE_CHECK_DAYS`, `PII_RETENTION_UNSUCCESSFUL_APPLICANTS_DAYS`); (b) decide when to set `PII_SWEEP_EXECUTE=true`; (c) note the documented gap — there is no schema legal-hold mechanism yet, so legal holds are an env id list (`PII_LEGAL_HOLD_CONTRACTOR_IDS`).
- **Owner:** founder + legal.

### 4.4 Background-check provider — decision + contract

- **State:** police checks are handled today as a **manual document upload** — `ContractorDocument` with `documentType = POLICE_CHECK`, admin-reviewed (APPROVED/REJECTED/EXPIRED), retention already modelled (class `POLICE_CHECK`, `DE_IDENTIFY`, short window). There is **no integrated automated background-check provider** (no NationalCrimeCheck / Checkr / Equifax integration in code).
- **Owner action:** decide whether to select and contract an automated provider or keep the manual upload + admin-review flow for the first cohort. If a provider is chosen, that is net-new integration scope (new ticket), not part of this change.
- **Owner:** founder.

### 4.5 Live-stack proofs still pending (sibling tickets)

These require the live keys (§4.1) and prod access and are therefore gated on owner action:

| Ticket | What | Blocked on |
|--------|------|-----------|
| **DR-910** | Take one real test contractor fully end-to-end on the live stack; capture DB rows across lifecycle tables, verification email, signed ICA PDF, a passed module, Stripe test `payouts_enabled=true` | §4.1 (Stripe keys) + prod access |
| **DR-911** | Confirm `prisma migrate status` clean against prod; existing client/booking flows unaffected; no secrets committed; main site untouched | prod DB access |
| **DR-912** | Cross-repo main-site dropdown link to `https://nrpg.business` — **NOT yet live** (2026-07-13 grooming): the `Contractors` dropdown in the main-site `LandingHeader.tsx` links only to internal `/contractor/*`; the `nrpg.business` link must still be **added and shipped in the CleanExpo/Disaster-Recovery repo**, not just confirmed | owner-gated; lives in a different repo |

---

## 5. Rollback / safety on pickup

- **Kill switch:** set `NRPG_CONTRACTOR_GO_LIVE=false` on Vercel Production and redeploy (1–3 min; not instant — no edge toggle wired). Contractor registration and bid submit/accept then return `503`; CLIENT registration and bid-decline are unaffected. Runbook: `apps/web/docs/runbooks/nrpg-kill-switch.md`.
- **Migrations** are additive/expand-contract, so N-1 code stays schema-compatible. Take a fresh Supabase PITR checkpoint (record ID/timestamp) **before** any `migrate deploy`.
- **Do not** collapse `Contractor` (lifecycle source of truth) into `ContractorProfile` (booking/matching). Dispatch identity is keyed on `User.id` (DR-879 Option B) — use `apps/web/lib/contractor-identity.ts`, never re-derive `Contractor.id` vs `User.id`.

---

## 6. Pickup checklist

1. Read [`design.md`](./design.md) then this file.
2. Owner supplies §4.1 Stripe prod keys → verify `/api/health` → 200.
3. Counsel signs off §4.2 ICA `2026-03-05` → record against the version.
4. Owner confirms §4.3 PII windows + decides `PII_SWEEP_EXECUTE`.
5. Owner decides §4.4 background-check provider (or keep manual).
6. With keys live, run DR-910 (E2E on live stack) and DR-911 (prod `migrate status`).
7. Ship DR-912 cross-repo `nrpg.business` link in the main-site repo.
