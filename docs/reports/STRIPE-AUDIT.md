# Stripe Integration Audit Report

**Date:** 2026-03-05
**Auditor:** xero-agent (DR-75)
**Platform:** DR-NRPG (disasterrecovery.com.au)
**Currency:** AUD (Australian Dollars)

---

## 1. Webhook Endpoints

The platform has **6 Stripe webhook handlers** across two directory trees, plus a monitoring endpoint. All handlers verify webhook signatures before processing.

### 1.1 `app/api/webhooks/stripe/payments/route.ts`

| Item | Detail |
|------|--------|
| **Events** | `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.refunded` |
| **Secret** | `STRIPE_PAYMENTS_WEBHOOK_SECRET` (falls back to `STRIPE_WEBHOOK_SECRET`) |
| **Signature check** | `stripe.webhooks.constructEvent(body, signature, webhookSecret)` with try/catch returning 400 |
| **Idempotency** | Yes -- `isEventProcessed()` / `recordWebhookEvent()` |
| **Error handling** | Catches handler errors, records failed event, returns 500. Re-throws refund errors for Stripe retry. |
| **Real-time events** | Emits `paymentSucceeded`, `paymentFailed`, `paymentRefunded` via WebSocket |
| **Status:** | PASS |

### 1.2 `app/api/webhooks/stripe/realtime/route.ts`

| Item | Detail |
|------|--------|
| **Events** | `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.payment_succeeded/failed` |
| **Filter** | Only processes events with `metadata.subscriptionType === 'realtime_addon'` |
| **Secret** | `STRIPE_REALTIME_WEBHOOK_SECRET` (falls back to `STRIPE_WEBHOOK_SECRET`) |
| **Signature check** | `stripe.webhooks.constructEvent()` with try/catch returning 400 |
| **Idempotency** | Yes -- `isEventProcessed()` / `recordWebhookEvent()` (added 2026-03-05) |
| **Error handling** | Catches handler errors, records failed event, returns 500 |
| **Status:** | PASS (fixed) |

### 1.3 `app/api/webhooks/stripe/tenant/route.ts`

| Item | Detail |
|------|--------|
| **Events** | `customer.subscription.created/updated/deleted`, `invoice.payment_succeeded/failed`, `customer.subscription.trial_will_end`, `checkout.session.completed` |
| **Filter** | Only processes events with `metadata.type === 'tenant_subscription'` |
| **Secret** | `STRIPE_TENANT_WEBHOOK_SECRET` (falls back to `STRIPE_WEBHOOK_SECRET`) |
| **Signature check** | `stripe.webhooks.constructEvent()` with try/catch returning 400 |
| **Idempotency** | Yes -- `isEventProcessed()` / `recordWebhookEvent()` |
| **Error handling** | Records failed events, sends Slack + email alerts for high-value failures, returns 500 |
| **Status:** | PASS |

### 1.4 `app/api/webhooks/stripe/subscription/route.ts`

| Item | Detail |
|------|--------|
| **Events** | `customer.subscription.created/updated/deleted`, `invoice.payment_succeeded/failed` |
| **Purpose** | Workspace-level subscriptions (separate from tenant billing) |
| **Secret** | `STRIPE_WEBHOOK_SECRET` |
| **Signature check** | `stripe.webhooks.constructEvent()` with try/catch returning 400 |
| **Idempotency** | Yes -- `isEventProcessed()` / `recordWebhookEvent()` |
| **Error handling** | Uses `retryPrismaOperation()` with exponential backoff for DB operations |
| **Status:** | PASS |

### 1.5 `app/api/stripe/webhook/route.ts`

| Item | Detail |
|------|--------|
| **Events** | `checkout.session.completed`, `payment_intent.succeeded` |
| **Purpose** | NRPG callout payment confirmation (the $550/$2750 flow) |
| **Secret** | `STRIPE_WEBHOOK_SECRET` (required, returns 500 if missing) |
| **Signature check** | `constructWebhookEvent()` wrapper from `@/lib/stripe` |
| **Idempotency** | Yes -- `isEventProcessed()` / `recordWebhookEvent()` |
| **Error handling** | Records failed events, uses `retryPrismaOperation()` |
| **Status:** | PASS |

### 1.6 `app/api/webhooks/monitoring/route.ts`

| Item | Detail |
|------|--------|
| **Purpose** | Webhook health monitoring dashboard (stats, failed events, alerts) |
| **Auth** | Bearer token via `WEBHOOK_MONITOR_SECRET` (added 2026-03-05) |
| **Status:** | PASS (fixed) |

---

## 2. Stripe Mode Detection

### 2.1 Environment Variables

The platform uses the following Stripe keys (from `.env.example`):

| Variable | Example Value | Purpose |
|----------|---------------|---------|
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_your_key_here` | Client-side Stripe.js |
| `STRIPE_SECRET_KEY` | `sk_test_your_key_here` | Server-side API calls |
| `STRIPE_RESTRICTED_KEY` | `rk_test_your_key_here` | Restricted operations |
| `STRIPE_WEBHOOK_SECRET` | `whsec_your_webhook_secret_here` | Webhook signature verification |

### 2.2 Mode Guards

| Guard | Location | Description |
|-------|----------|-------------|
| `verify-stripe-config.ts` | `scripts/` | Pre-deploy script that warns if keys are not `sk_test_` prefixed. Does NOT block live keys. |
| `test-stripe-tenant-billing.ts` | `scripts/` | Detects test mode via `startsWith('sk_test')` for logging |
| `secrets-validation.ts` | `lib/config/` | Validates `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` exist, warns if missing in production |
| `validate-secrets.ts` | `src/lib/` | Startup validation, lists `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` as optional |

### 2.3 Runtime Mode Detection

**Finding:** There is **no runtime guard** preventing test keys in production or live keys in development. The `verify-stripe-config.ts` script is a manual pre-deploy check, not an automatic enforcement.

**Risk level:** Medium. The `.env.example` uses test key placeholders, and production deploys on Vercel use separate environment variables. However, there is no code-level check like:

```typescript
if (process.env.NODE_ENV === 'production' && key.startsWith('sk_test_')) {
  throw new Error('Cannot use test keys in production');
}
```

---

## 3. $550 Callout Charge Flow

### 3.1 Pricing Model

Defined in `lib/pricing/nrpg-callout.ts`:

| Component | Amount (AUD, GST inclusive) |
|-----------|---------------------------|
| **Total callout fee** | $2,750 |
| **Platform fee (NRPG)** | $550 |
| **Contractor entitlement** | $2,200 |

All amounts are GST-inclusive by default (10% Australian GST).

### 3.2 Charge Flow

**Step 1: Client initiates checkout**
- Route: `POST /api/service-requests/[id]/callout/checkout`
- Auth: CLIENT role required, must own the service request
- Creates a Stripe Checkout Session in `payment` mode
- Charges the **full $2,750** (total callout fee, not just $550)
- Line item: "NRPG Initial Callout -- Initial callout fee held by NRPG until job completion"
- Records `ServiceRequestCalloutPayment` with status `CHECKOUT_CREATED`
- Metadata includes `serviceRequestId`, `clientId`, `type: 'NRPG_CALLOUT'`

**Step 2: Payment verification**
- Route: `POST /api/service-requests/[id]/callout/verify`
- Client polls to check `session.payment_status === 'paid'`
- Updates payment record to status `PAID`

**Step 3: Webhook confirmation**
- Route: `POST /api/stripe/webhook`
- On `checkout.session.completed`: upserts payment record with split breakdown
- On `payment_intent.succeeded`: updates status to `PAID`

**Step 4: Fund release (admin action)**
- Route: `POST /api/admin/service-requests/[id]/callout/release`
- Auth: ADMIN or SUPER_ADMIN required
- Transfers contractor entitlement ($2,200) to contractor's Stripe Connect account
- Uses `stripe.transfers.create()` with transfer group `nrpg_callout_[id]`
- Updates payment status to `RELEASED`

### 3.3 Key Observations

- The **$550** is the platform fee, not the total charge. The client pays **$2,750** total.
- The $550 platform fee is retained by NRPG after the contractor's $2,200 is transferred out.
- All amounts include GST breakdown (ex-GST + GST amounts stored separately).
- The charge uses **Stripe Checkout Sessions** (hosted payment page), not raw PaymentIntents.

---

## 4. Issues Found

### 4.1 Critical

None.

### 4.2 High Priority

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 1 | ~~Webhook monitoring endpoint has no authentication~~ | `app/api/webhooks/monitoring/route.ts` | **FIXED** (2026-03-05) -- Bearer token auth via `WEBHOOK_MONITOR_SECRET` |

### 4.3 Medium Priority

| # | Issue | Location | Status |
|---|-------|----------|--------|
| 2 | ~~No runtime guard against test keys in production~~ | `src/lib/stripe/index.ts` | **FIXED** (2026-03-05) -- Throws if `NODE_ENV=production` and key starts with `sk_test_` |
| 3 | ~~Realtime webhook handler lacks idempotency~~ | `app/api/webhooks/stripe/realtime/route.ts` | **FIXED** (2026-03-05) -- Added `isEventProcessed()` / `recordWebhookEvent()` |
| 4 | ~~Inconsistent Stripe API versions~~ | All 15 production files | **FIXED** (2026-03-05) -- Standardised to `2024-12-18.acacia` |

### 4.4 Low Priority

| # | Issue | Location | Recommendation |
|---|-------|----------|----------------|
| 5 | **Two Stripe client singletons** | `src/lib/stripe/index.ts` and inline `new Stripe()` in webhook handlers | Consider consolidating to a single shared client. |
| 6 | **`STRIPE_WEBHOOK_SECRET` missing from `.env.example` template** | `.env.example` | Fixed in this sprint -- added `STRIPE_WEBHOOK_SECRET` and per-endpoint secrets. |

---

## 5. Summary

| Category | Status |
|----------|--------|
| Webhook signature verification | All 5 handlers verified |
| Idempotency | All 5 handlers now covered |
| Error handling | Good -- exponential backoff, audit logging |
| $550 charge flow | Correct -- $2,750 total via Checkout Session, $550 retained as platform fee |
| Mode detection | Runtime guard added -- throws if test key used in production |
| Monitoring auth | Bearer token auth via `WEBHOOK_MONITOR_SECRET` |
| API version consistency | All production files standardised to `2024-12-18.acacia` |

**Overall assessment:** The Stripe integration is well-structured with proper signature verification and idempotency on all handlers. The $2,750 callout flow with $550/$2,200 split is correctly implemented with proper GST handling. All four identified issues have been remediated as of 2026-03-05.
