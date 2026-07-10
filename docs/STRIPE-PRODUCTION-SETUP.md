# Stripe production setup — DR-NRPG (for Rana)

**Why this exists:** the "Deploy Production" workflow is red at the *Production Smoke Tests*
step. The site deploys fine, but the post-deploy smoke asserts `GET /api/health == 200`, and
`/api/health` returns **503** because Stripe is not configured in production. Verified live
2026-07-10 on both `https://dr-nrpg-platform.vercel.app/api/health` and
`https://nrpg.business/api/health` — database and storage are healthy; **stripe = `not_configured`**.

Everything below is ready to commit; the only missing piece is the live Stripe values, which
Rana owns (Phill/Rana enter secrets directly into Vercel — the agent never handles Stripe keys).

## What gates CI vs what's needed for payments

- **`STRIPE_SECRET_KEY` is the only variable that gates CI.** `/api/health` runs an
  authenticated `stripe.balance.retrieve()`; a valid live key flips health to `200` and greens
  Deploy Production. (`apps/web/app/api/health/route.ts` — `checkStripe()`, gated set =
  database + stripe + storage.)
- The **publishable key, 5 webhook secrets, and 9 price IDs** are required for the payment
  *flows* to actually work, but do **not** gate the health check.

## The variables (exact names the code reads — 16 total)

`git grep process.env.STRIPE` confirms these are the names in the code; set them **exactly**.

| Group | Variable | Format | Gates CI |
|---|---|---|:--:|
| Core | `STRIPE_SECRET_KEY` | `sk_live_…` | ✅ |
| Core | `STRIPE_PUBLISHABLE_KEY` | `pk_live_…` | |
| Webhook | `STRIPE_WEBHOOK_SECRET` | `whsec_…` | |
| Webhook | `STRIPE_PAYMENTS_WEBHOOK_SECRET` | `whsec_…` | |
| Webhook | `STRIPE_CONNECT_WEBHOOK_SECRET` | `whsec_…` | |
| Webhook | `STRIPE_TENANT_WEBHOOK_SECRET` | `whsec_…` | |
| Webhook | `STRIPE_REALTIME_WEBHOOK_SECRET` | `whsec_…` | |
| Price (base) | `STRIPE_BASIC_PRICE_ID` | `price_…` | |
| Price (base) | `STRIPE_PRO_PRICE_ID` | `price_…` | |
| Price (base) | `STRIPE_ENTERPRISE_PRICE_ID` | `price_…` | |
| Price (tenant) | `STRIPE_TENANT_BASIC_PRICE_ID` | `price_…` | |
| Price (tenant) | `STRIPE_TENANT_PRO_PRICE_ID` | `price_…` | |
| Price (tenant) | `STRIPE_TENANT_ENTERPRISE_PRICE_ID` | `price_…` | |
| Price (realtime) | `STRIPE_REALTIME_BASIC_PRICE_ID` | `price_…` | |
| Price (realtime) | `STRIPE_REALTIME_PRO_PRICE_ID` | `price_…` | |
| Price (realtime) | `STRIPE_REALTIME_ENTERPRISE_PRICE_ID` | `price_…` | |

The 6 base+tenant price IDs must match `/^price_[A-Za-z0-9]+$/` — `/api/health` env-parity flags
placeholder text as not-set (`apps/web/lib/monitoring/env-parity.ts`).

## Steps (Rana)

1. **Products + prices in the Stripe live dashboard** (or via the Stripe MCP, now installed —
   `stripe: https://mcp.stripe.com`, authenticate with the DR-NRPG Stripe account). Create the
   9 prices; copy each `price_…` id.
2. **Webhook endpoints** (Stripe → Developers → Webhooks) for the payments/connect/tenant/
   realtime handlers; copy each `whsec_…` signing secret.
3. **Set all 16 in Vercel** → DR-NRPG project → Settings → Environment Variables → **Production**
   scope. (Names above, exactly.)
4. **Redeploy** production (uncheck "Use existing Build Cache" — module-level `process.env`
   reads serve stale otherwise).
5. **Verify:** `curl -s -o /dev/null -w "%{http_code}" https://nrpg.business/api/health` → `200`,
   and `checks.stripe.status` → `healthy`. Deploy Production then greens on the next run.

## Notes

- Minimum to unblock CI = `STRIPE_SECRET_KEY` alone. Full list = payments functional.
- Secrets are never committed to git; they live only in Vercel env. `.env.production.example`
  (updated in this PR) is the template, values are `…` placeholders.
- If a var is set under a *different* name than the table above, the code won't read it — that's
  the class of bug to avoid; match names exactly.
