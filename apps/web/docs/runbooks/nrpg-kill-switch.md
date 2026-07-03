# NRPG contractor go-live kill switch

**Flag:** `NRPG_CONTRACTOR_GO_LIVE`
**Code:** `apps/web/lib/feature-flags/nrpg-go-live.ts`
**Ticket:** DR-929 (spec gap flagged by judge re-score DR-909, 74/100)

The contractor go-live program (signup, ICA acceptance, training/quiz,
dispatch eligibility, Stripe Connect payouts, bid/accept, admin
claims-matching — PRs #191-#219) has been **live in production since
2026-07-02**. This flag is a kill switch for an already-live program, not a
pre-launch gate.

## Default behaviour

- **Unset, or any value other than the literal string `false`** → program is
  ON (current live behaviour, unchanged).
- **Set to exactly `false`** → program is killed.

`isGoLiveEnabled()` in `apps/web/lib/feature-flags/nrpg-go-live.ts` is the
single source of truth. Nothing else reads
`process.env.NRPG_CONTRACTOR_GO_LIVE` directly.

## How to flip it off

1. Open the Vercel dashboard → the DR-NRPG project → **Settings → Environment
   Variables**.
2. Set `NRPG_CONTRACTOR_GO_LIVE` = `false` on the **Production** scope (and
   Preview, if you need preview deploys to reflect the kill state too — the
   two scopes are independent in Vercel).
3. **Redeploy is required.** Next.js inlines/reads `process.env` values at
   request time on the server for route handlers (this flag is only read
   server-side, never in client bundles), but Vercel serverless functions are
   built per-deploy — an env var change alone does not hot-reload already-built
   functions. Trigger a redeploy of the current production build (Vercel
   dashboard → Deployments → \[latest] → **Redeploy**, no code change needed)
   immediately after saving the env var.
4. This is **not instant**: budget for the redeploy time (typically 1-3
   minutes for this app) before the kill takes effect. There is no
   in-request/edge-config toggle wired up — that would require a workflow/
   infra change, tracked as a gap below.

## What happens to in-flight work when OFF

- **New contractor registrations** (`POST /api/auth/register` with
  `userType: "CONTRACTOR"`) → `503 SERVICE_UNAVAILABLE`. CLIENT registrations
  are unaffected.
- **New bid submissions** (`POST /api/contractor/requests/[id]/bid`) →
  `503 SERVICE_UNAVAILABLE`. No `ContractorMatch` row is created.
- **Bid ACCEPTED / COUNTER_OFFER** (`POST /api/contractor/bids/[matchId]/respond`)
  → `503 SERVICE_UNAVAILABLE`. **Bid DECLINED still works** — declining grants
  nothing and frees the job for escalation, so it is deliberately exempt.
- **Admin claims-matching** (`matchContractorsToBooking`, called from
  `/api/admin/claims/convert` and `/api/admin/claims/match`) → returns an
  empty match set immediately. Claim intake itself (PublicClaim → Booking
  conversion) still runs; no contractor is matched or notified.
- **NOT gated — keep working when OFF:**
  - Existing contractor login, session, dashboard, and profile access.
  - Payout sweep crons — money already owed still gets paid out.
  - Existing accepted matches / bids already in the database are untouched;
    nothing is cancelled or corrupted. This flag only stops **new** activity.
  - The DR-905 go-live e2e proof (`e2e/contractor-go-live.spec.ts`) runs
    against the default (ON) state in CI and is unaffected by this flag.

## How to verify it's off

Fastest live check — attempt a contractor signup and confirm the 503:

```bash
curl -s -o /dev/null -w '%{http_code}\n' -X POST \
  https://<prod-host>/api/auth/register \
  -H 'content-type: application/json' \
  -d '{"email":"kill-switch-check@example.com","password":"CheckOnly1","name":"Kill Switch Check","userType":"CONTRACTOR","consentAccepted":true}'
# Expect: 503
```

A `201` means the flag is still ON (or the redeploy from step 3 above hasn't
landed yet). A CLIENT signup with the same payload (`userType: "CLIENT"`)
should still return `201` regardless of the flag — if it also 503s, something
else is wrong and this is not the kill switch working as designed.

## How to turn it back on

1. In the Vercel dashboard, either delete the `NRPG_CONTRACTOR_GO_LIVE`
   env var or set it to any value other than `false` (e.g. `true`).
2. Redeploy (same as step 3 above) — this is required again, for the same
   reason.
3. Re-run the curl check above and confirm `201` for the CONTRACTOR payload.

## Known gap

There is no Edge Config / instant-toggle path — every flip requires a
Vercel redeploy (minutes, not seconds). Wiring an instant toggle (e.g. Vercel
Edge Config or a database-backed flag) would touch deploy/workflow
infrastructure, which is out of scope for this ticket (DR-929) and owned by
a concurrent workstream (DR-930, migration-gate CI/workflow files). Track as
a follow-up if a sub-minute kill is ever required.
