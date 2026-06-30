# Stripe Setup — Handoff for RANA

**Prepared 2026-06-30** · Project: **NRPG platform** (Vercel project `dr-nrpg`, prod URL `https://dr-nrpg-platform.vercel.app`)
**Currency:** AUD · **All listed prices are GST-inclusive** unless noted.

> **Why this exists:** The store checkout was just fixed to take Stripe payment *before* fulfilling orders (PR #184, live in prod). A live probe on 2026-06-30 confirmed **no Stripe keys are set in production** — so checkout currently returns `503 "Payment processing is not configured"` and the store cannot sell. This document gives you everything to configure Stripe. Nothing here charges anyone until you set the keys and redeploy.

---

## 0. TL;DR — the minimum to make the store work

1. In the **`dr-nrpg` Vercel project → Settings → Environment Variables (Production)**, set:
   - `STRIPE_SECRET_KEY` = `sk_live_…`
   - `STRIPE_WEBHOOK_SECRET` = `whsec_…` (from step 2)
   - `NEXT_PUBLIC_BASE_URL` = the real production domain (e.g. `https://disasterrecovery.com.au`)
2. In **Stripe → Developers → Webhooks**, add an endpoint:
   - URL: `https://<prod-domain>/api/stripe/webhook`
   - Events: **`checkout.session.completed`** and **`payment_intent.succeeded`**
   - Copy its **Signing secret** into `STRIPE_WEBHOOK_SECRET` above.
3. **Redeploy** the project (env changes only apply on a new deployment).
4. Tell me and I'll re-run the live probe to confirm checkout returns a real Stripe URL instead of 503.

> **No Stripe Products needed for the store.** Checkout builds line items **inline** (`price_data`) from the catalogue in section 2 — Stripe just charges the amount sent. You only create Stripe Products/Prices for the **subscriptions** in section 4.

> **Fulfilment dependency (not Stripe):** completed store orders are sent to **Printful**. That needs `PRINTFUL_API_KEY` and `PRINTFUL_STORE_ID` set too, or paid orders won't be produced. (Owner/Phill to confirm Printful account.)

---

## 1. The money flows that use Stripe

| # | Flow | Type | Pricing source | Stripe webhook endpoint |
|---|------|------|----------------|-------------------------|
| 1 | **Store merchandise** | one-time | Inline `price_data` (section 2) | `/api/stripe/webhook` |
| 2 | **NRPG call-out fee** | one-time | Inline `price_data`, fixed (section 3) | `/api/stripe/webhook` |
| 3 | **Realtime notifications add-on** | recurring | Inline, fixed in code (section 4a) | `/api/webhooks/stripe/realtime` |
| 4 | **Contractor subscription** | recurring | **Stripe Price IDs** (section 4b) | `/api/stripe/webhook` (payments) |
| 5 | **Tenant/white-label subscription** | recurring | **Stripe Price IDs** (section 4c) | `/api/webhooks/stripe/tenant` |

---

## 2. Store merchandise catalogue (one-time, AUD inc. GST)

All variants are the same price as the base (no per-variant surcharge). Items **without** a Printful ID are **not auto-fulfilled** — see the ⚠️ note below.

| Product | Price (AUD) | Variants | Printful ID |
|---------|-------------|----------|-------------|
| NRPG Hi-Vis Polo | **$65** | S–XXL | 380 |
| NRPG Work Shirt (Embroidered) | **$55** | S–XXL | 438 |
| NRPG Safety Vest | **$45** | One Size | 382 |
| NRPG Cap (Structured, Teal) | **$38** | One Size | 206 |
| NRPG Beanie | **$32** | One Size | 228 |
| NRPG Sticker Pack (5×) | **$18** | Standard | 358 |
| NRPG Lanyard + ID Holder | **$22** | Standard | — ⚠️ |
| NRPG Tote Bag | **$35** | Natural / Black | 358 |
| NRPG Hoodie | **$85** | S–XXL | 146 |
| NRPG Polo (Casual, Black) | **$58** | S–XXL | 380 |
| NRPG Hard Hat (Yellow) | **$42** | Standard | — ⚠️ |
| NRPG Contractor Welcome Bundle | **$110** | S–XXL | — ⚠️ |
| NRPG Bronze — Certified Specialist Pack | **$95** | S–XXL | — ⚠️ |
| NRPG Silver — Certified Professional Pack | **$185** | S–XXL | — ⚠️ |
| NRPG Gold — Certified Expert Pack | **$295** | S–XXL | — ⚠️ |

Source of truth: `apps/web/lib/printful/products.ts`.

⚠️ **6 products have no Printful mapping** (lanyard, hard hat, welcome bundle, bronze/silver/gold packs). They can be **purchased and charged**, but won't auto-create a Printful production order — they need a **manual fulfilment process** (or a Printful sync). This does not block Stripe setup. **Handler patched in PR #186** so these items no longer break the whole order — they're logged as `MANUAL FULFILMENT REQUIRED` and mapped items in the same cart still fulfil. The owner still needs a manual-fulfilment process (or Printful sync) for these 6.

---

## 3. NRPG call-out fee (one-time, AUD inc. GST)

Fixed price, charged when a client books a call-out. Built inline (no Stripe Product needed).

| Component | Amount (AUD inc. GST) |
|-----------|------------------------|
| **Total charged to client** | **$2,750** |
| → Platform fee (kept by NRPG) | $550 |
| → Contractor entitlement (paid out) | $2,200 |

Source: `apps/web/lib/pricing/nrpg-callout.ts`. GST is calculated as inclusive by default.

---

## 4. Subscriptions (recurring) — ⚠️ pricing needs an owner decision

There are **three separate subscription systems** in the code with **inconsistent numbers**. Before you create recurring Prices in Stripe, the owner (Phill) must confirm the canonical pricing. Here is exactly what the code currently says:

### 4a. Realtime notifications add-on — fixed in code (inline, no Price ID)
| Tier | Price/month (AUD) | Includes |
|------|-------------------|----------|
| BASIC | **$49** | Status updates, notifications |
| PRO | **$99** | + Live ETA, in-app messaging |
| ENTERPRISE | **$199** | + GPS tracking, video/voice |

Source: `apps/web/app/api/realtime/subscription/route.ts`. Webhook: `/api/webhooks/stripe/realtime`.

### 4b. Contractor subscription — **needs Stripe Price IDs** (amounts not in code)
Env vars to create recurring Prices for and set:
- `STRIPE_BASIC_PRICE_ID`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_ENTERPRISE_PRICE_ID`

Amounts are **whatever you set on the Stripe Price** — not defined in code. **Owner must specify.**

### 4c. Tenant / white-label subscription — **needs Stripe Price IDs**
Env vars:
- `STRIPE_TENANT_BASIC_PRICE_ID`
- `STRIPE_TENANT_PRO_PRICE_ID`
- `STRIPE_TENANT_ENTERPRISE_PRICE_ID`

The onboarding wizard currently *displays* **$49 / $199 / $499 per month** (14-day trial on Basic), but this is just UI text. **Owner must confirm before creating the Prices.**

### ⚠️ Pricing inconsistency to resolve first
Three different tier price sets exist across the codebase:
- Realtime add-on: **$49 / $99 / $199**
- Tenant onboarding UI: **$49 / $199 / $499**
- `/how-it-works` marketing page: **$99 / $299 / $799** (Basic / Professional / Enterprise)

**These do not reconcile.** Decide one canonical subscription price structure with the owner, then create the matching Stripe recurring Prices and paste their IDs into the env vars above.

---

## 5. Complete environment-variable checklist (Vercel → Production)

| Variable | Needed for | Value format |
|----------|-----------|--------------|
| `STRIPE_SECRET_KEY` | **everything** | `sk_live_…` |
| `STRIPE_PUBLISHABLE_KEY` | client-side Stripe | `pk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | store + call-out webhook | `whsec_…` (from `/api/stripe/webhook` endpoint) |
| `STRIPE_PAYMENTS_WEBHOOK_SECRET` | payments webhook | `whsec_…` |
| `STRIPE_TENANT_WEBHOOK_SECRET` | tenant subs webhook | `whsec_…` (from `/api/webhooks/stripe/tenant`) |
| `STRIPE_BASIC_PRICE_ID` | contractor sub | `price_…` (recurring) |
| `STRIPE_PRO_PRICE_ID` | contractor sub | `price_…` (recurring) |
| `STRIPE_ENTERPRISE_PRICE_ID` | contractor sub | `price_…` (recurring) |
| `STRIPE_TENANT_BASIC_PRICE_ID` | tenant sub | `price_…` (recurring) |
| `STRIPE_TENANT_PRO_PRICE_ID` | tenant sub | `price_…` (recurring) |
| `STRIPE_TENANT_ENTERPRISE_PRICE_ID` | tenant sub | `price_…` (recurring) |
| `NEXT_PUBLIC_BASE_URL` | store success/cancel URLs + product images | `https://<prod-domain>` |
| `NEXT_PUBLIC_SITE_URL` | subscription success/cancel URLs | `https://<prod-domain>` |
| `PRINTFUL_API_KEY` | store fulfilment (not Stripe) | Printful API key |
| `PRINTFUL_STORE_ID` | store fulfilment (not Stripe) | Printful store ID |

> Use **live** keys (`sk_live_` / `pk_live_`). A `sk_test_` key in production will throw a guard error and break payment routes. After setting any variable, **redeploy**.

---

## 6. Stripe webhook endpoints to create

Each endpoint has its **own signing secret** — copy each into the matching env var above.

| Stripe endpoint URL | Events to enable | Secret env var |
|---------------------|------------------|----------------|
| `https://<prod>/api/stripe/webhook` | `checkout.session.completed`, `payment_intent.succeeded` | `STRIPE_WEBHOOK_SECRET` |
| `https://<prod>/api/webhooks/stripe/tenant` | subscription + invoice events | `STRIPE_TENANT_WEBHOOK_SECRET` |
| `https://<prod>/api/webhooks/stripe/realtime` | subscription + invoice events | (realtime add-on) |

> Start with the **first** endpoint — it's all the store needs. Add the others when subscriptions go live.

---

## 7. How to verify it worked

After setting keys + redeploying, the store checkout should return a real Stripe URL. The same live probe used on 2026-06-30 (currently failing) should flip to success:

- `POST https://<prod>/api/store/checkout` with an empty body → should return **`400 Invalid JSON`** (key present), **not** `503` (key missing).
- A real cart checkout → returns `{ "url": "https://checkout.stripe.com/…" }` and redirects the buyer to Stripe.
- `POST https://<prod>/api/stripe/webhook` (no valid signature) → should return **`400 Invalid signature`** (secret present), **not** `500 Missing STRIPE_WEBHOOK_SECRET`.

Ping me (Claude) and I'll re-run these against prod and confirm green.

---

### Summary for RANA
- **To open the store today:** set `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_BASE_URL` + one webhook endpoint + redeploy. Catalogue pricing is in section 2 and is already wired — no Stripe Products required.
- **For subscriptions:** the owner must first pick the canonical tier pricing (section 4 inconsistency), then you create recurring Stripe Prices and paste the IDs into the env vars.
- **Two non-Stripe to-dos:** Printful keys (fulfilment) and the 6 unmapped products.
