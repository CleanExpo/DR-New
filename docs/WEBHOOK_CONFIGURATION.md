# Stripe Webhook Configuration Guide

Complete guide for configuring Stripe webhooks for the Disaster Recovery NRPG platform.

---

## Table of Contents

1. [Overview](#overview)
2. [Environment Variables](#environment-variables)
3. [Stripe Dashboard Setup](#stripe-dashboard-setup)
4. [Local Development Setup](#local-development-setup)
5. [Production Deployment](#production-deployment)
6. [Webhook Security](#webhook-security)
7. [Troubleshooting](#troubleshooting)
8. [Monitoring & Debugging](#monitoring--debugging)

---

## Overview

The DR-NRPG platform uses Stripe webhooks to handle subscription lifecycle events and payment processing. We have two separate webhook endpoints:

| Endpoint | Purpose | Events |
|----------|---------|--------|
| `/api/webhooks/stripe/tenant` | Tenant subscriptions | Payment events, trial endings, checkouts |
| `/api/webhooks/stripe/subscription` | Workspace subscriptions | Subscription lifecycle, payments |

**Key Features:**
- ✅ Idempotency (prevents duplicate processing)
- ✅ Retry logic with exponential backoff
- ✅ Email notifications (payment failures, successes, trial endings)
- ✅ Audit logging
- ✅ Signature verification

---

## Environment Variables

### Required Variables

Add these to your `.env.local` (development) and production environment:

```env
# ============================================================================
# STRIPE CONFIGURATION
# ============================================================================

# Stripe API Keys (from Stripe Dashboard → Developers → API keys)
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"  # Use sk_live_ for production
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"  # Use pk_live_ for production

# Webhook Signing Secrets (from Stripe Dashboard → Developers → Webhooks)
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"  # Workspace subscriptions
STRIPE_TENANT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"  # Tenant subscriptions

# ============================================================================
# DATABASE CONFIGURATION
# ============================================================================

# PostgreSQL connection (for webhook event storage)
DATABASE_URL="postgresql://user:password@host:5432/dr_nrpg?sslmode=require"
DIRECT_URL="postgresql://user:password@host:5432/dr_nrpg?sslmode=require"

# ============================================================================
# EMAIL CONFIGURATION
# ============================================================================

# Resend API Key (for payment notifications)
RESEND_API_KEY="re_xxxxxxxxxxxxx"

# Email settings
EMAIL_FROM="Disaster Recovery Australia <noreply@disasterrecovery.com.au>"
NEXT_PUBLIC_BASE_URL="https://disasterrecovery.com.au"  # Your production URL
```

### Optional Variables

```env
# Email support address (used in email templates)
EMAIL_SUPPORT="support@disasterrecovery.com.au"

# Webhook retry configuration (defaults shown)
WEBHOOK_MAX_RETRIES="3"
WEBHOOK_RETRY_DELAY_MS="1000"
```

---

## Stripe Dashboard Setup

### Step 1: Get API Keys

1. Log in to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers → API keys**
3. Copy your **Secret key** (starts with `sk_test_` or `sk_live_`)
4. Copy your **Publishable key** (starts with `pk_test_` or `pk_live_`)
5. Add to `.env.local`:
   ```env
   STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
   STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
   ```

**⚠️ Security Note:** Never commit API keys to version control. Keep them in `.env.local` which is git-ignored.

---

### Step 2: Create Webhook Endpoints

#### Workspace Subscription Webhook

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Configure:
   - **Endpoint URL:** `https://your-domain.com/api/webhooks/stripe/subscription`
   - **Description:** "Workspace subscription events"
   - **Events to send:**
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Click **Add endpoint**
5. Click **Reveal** under "Signing secret"
6. Copy the webhook secret (starts with `whsec_`)
7. Add to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
   ```

---

#### Tenant Subscription Webhook

1. Go to **Developers → Webhooks**
2. Click **Add endpoint**
3. Configure:
   - **Endpoint URL:** `https://your-domain.com/api/webhooks/stripe/tenant`
   - **Description:** "Tenant subscription events"
   - **Events to send:**
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
     - `customer.subscription.trial_will_end`
     - `checkout.session.completed`
4. Click **Add endpoint**
5. Click **Reveal** under "Signing secret"
6. Copy the webhook secret
7. Add to `.env.local`:
   ```env
   STRIPE_TENANT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
   ```

---

### Step 3: Configure Subscription Products

1. Go to **Products → Add product**
2. Create three subscription products:

**BASIC Tier:**
- Name: "DR-NRPG Basic"
- Price: $49 AUD / month
- Metadata: `type=tenant_subscription`, `tier=BASIC`

**PROFESSIONAL Tier:**
- Name: "DR-NRPG Professional"
- Price: $99 AUD / month
- Metadata: `type=tenant_subscription`, `tier=PROFESSIONAL`

**ENTERPRISE Tier:**
- Name: "DR-NRPG Enterprise"
- Price: $199 AUD / month
- Metadata: `type=tenant_subscription`, `tier=ENTERPRISE`

**⚠️ Important:** Metadata is crucial for webhook event filtering.

---

## Local Development Setup

### Using Stripe CLI

The Stripe CLI allows you to test webhooks locally without deploying.

#### 1. Install Stripe CLI

**macOS:**
```bash
brew install stripe/stripe-cli/stripe
```

**Windows:**
```powershell
scoop install stripe
```

**Linux:**
```bash
wget https://github.com/stripe/stripe-cli/releases/download/v1.19.0/stripe_1.19.0_linux_x86_64.tar.gz
tar -xvf stripe_1.19.0_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

---

#### 2. Login to Stripe

```bash
stripe login
```

This will open your browser to authorize the CLI.

---

#### 3. Forward Webhooks to Localhost

**Terminal 1:** Start your development server
```bash
npm run dev
```

**Terminal 2:** Forward webhooks (choose one)

**For Workspace Subscriptions:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe/subscription
```

**For Tenant Subscriptions:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe/tenant
```

The CLI will output a webhook signing secret:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Add this to your `.env.local`:
```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
# or
STRIPE_TENANT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
```

**⚠️ Restart your dev server** after updating `.env.local`.

---

#### 4. Trigger Test Events

**Payment Success:**
```bash
stripe trigger invoice.payment_succeeded
```

**Payment Failure:**
```bash
stripe trigger invoice.payment_failed
```

**Trial Ending:**
```bash
stripe trigger customer.subscription.trial_will_end
```

**Subscription Created:**
```bash
stripe trigger customer.subscription.created
```

**Subscription Deleted:**
```bash
stripe trigger customer.subscription.deleted
```

**Checkout Completed:**
```bash
stripe trigger checkout.session.completed
```

**Custom Event Data:**
```bash
stripe trigger invoice.payment_failed \
  --add invoice:metadata.type=tenant_subscription \
  --add invoice:metadata.tenantId=test_tenant_123 \
  --add invoice:attempt_count=2
```

---

#### 5. Monitor Webhook Events

Watch real-time webhook events:
```bash
stripe listen --print-json
```

Filter specific events:
```bash
stripe listen --events invoice.payment_succeeded,invoice.payment_failed
```

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] Switch to **live** Stripe API keys (`sk_live_`, `pk_live_`)
- [ ] Create **production** webhook endpoints in Stripe Dashboard
- [ ] Use production webhook secrets (`whsec_` from live mode)
- [ ] Set `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Configure `RESEND_API_KEY` for production
- [ ] Test webhook endpoints are publicly accessible
- [ ] Verify database can handle webhook load
- [ ] Enable webhook monitoring/alerts

---

### Production Environment Variables

Update your production environment (Vercel, AWS, etc.) with:

```env
# Production Stripe Keys
STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxx"
STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_live_xxxxxxxxxxxxx"
STRIPE_TENANT_WEBHOOK_SECRET="whsec_live_xxxxxxxxxxxxx"

# Production URLs
NEXT_PUBLIC_BASE_URL="https://disasterrecovery.com.au"

# Production Database
DATABASE_URL="postgresql://prod_user:pass@prod-host:5432/dr_nrpg_prod?sslmode=require"

# Production Email
RESEND_API_KEY="re_live_xxxxxxxxxxxxx"
EMAIL_FROM="Disaster Recovery Australia <noreply@disasterrecovery.com.au>"
```

---

### Vercel Deployment

1. Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**
2. Add all production environment variables
3. Set environment: **Production**
4. Deploy your project
5. Copy your production URL (e.g., `https://disasterrecovery.com.au`)

---

### Configure Stripe Production Webhooks

1. Switch to **Live mode** in Stripe Dashboard (toggle in top-left)
2. Go to **Developers → Webhooks**
3. Add endpoint: `https://disasterrecovery.com.au/api/webhooks/stripe/subscription`
4. Select events (same as test mode)
5. Add endpoint: `https://disasterrecovery.com.au/api/webhooks/stripe/tenant`
6. Select events (same as test mode)
7. Copy webhook secrets and update production environment variables

---

### Test Production Webhooks

**Using Stripe Dashboard:**

1. Go to **Developers → Webhooks**
2. Click on your production endpoint
3. Click **Send test webhook**
4. Select event type (e.g., `invoice.payment_succeeded`)
5. Click **Send test webhook**
6. Verify response shows `200 OK`

**Using Stripe CLI (Production Mode):**

```bash
# Test production webhooks
stripe listen --api-key sk_live_xxxxxxxxxxxxx \
  --forward-to https://disasterrecovery.com.au/api/webhooks/stripe/tenant

stripe trigger invoice.payment_succeeded --api-key sk_live_xxxxxxxxxxxxx
```

---

## Webhook Security

### Signature Verification

All webhooks verify the Stripe signature before processing:

```typescript
// Automatic signature verification in route handlers
const signature = request.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
// If signature is invalid, throws error and returns 400
```

**Security Features:**
- ✅ Signature verification on every webhook
- ✅ Prevents replay attacks
- ✅ Validates webhook origin from Stripe
- ✅ Rejects tampered payloads

---

### Idempotency Protection

Prevents duplicate processing of webhook events:

```typescript
// Check if event already processed
const alreadyProcessed = await isEventProcessed(event.id);
if (alreadyProcessed) {
  return NextResponse.json({ received: true });
}

// Process event...

// Record successful processing
await recordWebhookEvent(event.id, event.type, 200);
```

**Protection Against:**
- Network retries
- Stripe automatic retries
- Race conditions
- Duplicate deliveries

---

### Rate Limiting

**Stripe Rate Limits:**
- Test mode: 25 requests/second
- Live mode: 100 requests/second

**Recommended Setup:**
```typescript
// apps/web/lib/ratelimit.ts (if needed)
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const webhookRatelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 s'),
});
```

---

## Troubleshooting

### Webhook Not Receiving Events

**Check 1:** Verify endpoint URL is correct
```bash
curl https://your-domain.com/api/webhooks/stripe/tenant
# Should return: {"error":"Missing signature"}
```

**Check 2:** Verify webhook secret is correct
```bash
# Check environment variables
echo $STRIPE_WEBHOOK_SECRET
# Should start with "whsec_"
```

**Check 3:** Check Stripe Dashboard logs
1. Go to **Developers → Webhooks**
2. Click on your endpoint
3. Check **Logs** tab for delivery attempts
4. Look for HTTP status codes and error messages

**Check 4:** Verify webhook is enabled
1. Go to **Developers → Webhooks**
2. Ensure endpoint shows **Enabled** (not disabled)

---

### "Invalid Signature" Errors

**Common Causes:**
1. Wrong webhook secret (test vs live mode mismatch)
2. Webhook secret not updated after endpoint recreation
3. Environment variable not loaded properly

**Solution:**
```bash
# 1. Get correct webhook secret from Stripe Dashboard
# 2. Update .env.local or production environment
STRIPE_WEBHOOK_SECRET="whsec_correct_secret_here"

# 3. Restart application
npm run dev  # or redeploy to production
```

**Verify:**
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe/tenant
# Copy the webhook secret from output
# Update .env.local
# Restart dev server
```

---

### Events Being Processed Multiple Times

**Check:** Idempotency system
```sql
-- Check stripeWebhookEvent table
SELECT * FROM "StripeWebhookEvent"
WHERE "stripeEventId" = 'evt_xxxxxxxxxxxxx';

-- Should show single record if processed correctly
```

**Possible Causes:**
1. Database connection issues during recording
2. Webhook timeout before recording completes
3. Race condition (multiple servers processing simultaneously)

**Solution:**
- Webhook handlers use idempotency checks before processing
- Database unique constraint on `stripeEventId` prevents duplicates
- Check database logs for constraint violations

---

### Payment Emails Not Sending

**Check 1:** Verify Resend API key
```bash
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer YOUR_RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "test@yourdom ain.com",
    "to": "test@example.com",
    "subject": "Test",
    "text": "Test email"
  }'
```

**Check 2:** Check application logs
```bash
# Look for email send attempts
grep "Email sent successfully" logs.txt
grep "Failed to send email" logs.txt
```

**Check 3:** Verify email addresses exist
```sql
-- Check tenant has owner with email
SELECT t.id, t.name, u.email
FROM "Tenant" t
JOIN "User" u ON u."tenantId" = t.id
WHERE u.role = 'OWNER';

-- Check workspace has owner member with email
SELECT w.id, w."businessName", u.email
FROM "Workspace" w
JOIN "WorkspaceMember" wm ON wm."workspaceId" = w.id
JOIN "User" u ON u.id = wm."userId"
WHERE wm.role = 'OWNER';
```

**Note:** Email failures are non-blocking. Webhooks succeed even if emails fail.

---

### Webhook Timeouts

**Stripe Timeout:** 30 seconds

**If webhooks timeout:**

1. **Check database query performance:**
```sql
-- Analyze slow queries
EXPLAIN ANALYZE
SELECT * FROM "Tenant"
WHERE "stripeCustomerId" = 'cus_xxxxxxxxxxxxx';

-- Add index if needed
CREATE INDEX idx_tenant_stripe_customer
ON "Tenant"("stripeCustomerId");
```

2. **Check external API calls:**
- Resend email API (~200ms per email)
- Stripe API calls for additional data

3. **Optimize retry logic:**
```typescript
// Reduce retry delays if timeout issues
await retryPrismaOperation(
  'criticalPayment',
  operation,
  description,
  { maxRetries: 2, initialDelay: 500 }  // Faster retries
);
```

---

## Monitoring & Debugging

### Stripe Dashboard Monitoring

**Webhook Logs:**
1. Go to **Developers → Webhooks**
2. Click on endpoint name
3. View **Logs** tab
   - Delivery attempts
   - HTTP status codes
   - Response times
   - Retry attempts

**Useful Filters:**
- Failed requests (4xx, 5xx)
- Slow requests (>5s response time)
- Recent events (last 24 hours)

---

### Application Monitoring

**Check Webhook Events:**
```sql
-- Recent webhook events
SELECT *
FROM "StripeWebhookEvent"
ORDER BY "processedAt" DESC
LIMIT 100;

-- Failed webhook events
SELECT *
FROM "StripeWebhookEvent"
WHERE "processed" = false
ORDER BY "processedAt" DESC;

-- Events by type (last 24 hours)
SELECT "eventType", COUNT(*) as count
FROM "StripeWebhookEvent"
WHERE "processedAt" > NOW() - INTERVAL '24 hours'
GROUP BY "eventType"
ORDER BY count DESC;
```

**Check Audit Logs:**
```sql
-- Recent payment failures
SELECT *
FROM "AuditLog"
WHERE "action" = 'payment_failed'
ORDER BY "createdAt" DESC
LIMIT 20;

-- Subscription status changes
SELECT *
FROM "AuditLog"
WHERE "entityType" = 'subscription'
ORDER BY "createdAt" DESC;
```

---

### Performance Metrics

**Track Response Times:**
```sql
-- Average webhook processing time (if tracked)
SELECT
  "eventType",
  AVG(EXTRACT(EPOCH FROM ("processedAt" - "createdAt"))) as avg_seconds
FROM "StripeWebhookEvent"
WHERE "processedAt" > NOW() - INTERVAL '7 days'
GROUP BY "eventType";
```

**Monitor Success Rates:**
```sql
-- Webhook success rate by type
SELECT
  "eventType",
  COUNT(*) FILTER (WHERE "processed" = true) as successful,
  COUNT(*) FILTER (WHERE "processed" = false) as failed,
  ROUND(100.0 * COUNT(*) FILTER (WHERE "processed" = true) / COUNT(*), 2) as success_rate
FROM "StripeWebhookEvent"
WHERE "processedAt" > NOW() - INTERVAL '7 days'
GROUP BY "eventType";
```

---

### Debugging Tools

**Enable Verbose Logging:**
```env
# .env.local
DEBUG=stripe:*
LOG_LEVEL=debug
```

**Webhook Request Inspector:**
Use services like [webhook.site](https://webhook.site) to inspect raw webhook payloads:

1. Create temporary webhook endpoint at webhook.site
2. Add it to Stripe Dashboard
3. Trigger test event
4. Inspect full request headers, body, and signature

**Local Webhook Testing:**
```bash
# Save webhook payload to file
stripe listen --print-json > webhook_events.jsonl

# Replay specific event
stripe events resend evt_xxxxxxxxxxxxx
```

---

## Support & Resources

### Documentation
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe CLI Reference](https://stripe.com/docs/stripe-cli)
- [Stripe Events Reference](https://stripe.com/docs/api/events)

### Internal Documentation
- Test Suite: `apps/web/__tests__/webhooks/README.md`
- Email Templates: `apps/web/lib/email/billing.ts`
- Idempotency: `apps/web/src/lib/stripe/webhook-idempotency.ts`
- Retry Logic: `apps/web/src/lib/stripe/webhook-retry.ts`

### Getting Help
1. Check Stripe Dashboard webhook logs
2. Review application logs for errors
3. Run test suite: `npm run test -- __tests__/webhooks`
4. Use Stripe CLI for local debugging
5. Contact support: support@disasterrecovery.com.au

---

## Appendix

### Webhook Event Reference

**Subscription Lifecycle:**
- `customer.subscription.created` - New subscription activated
- `customer.subscription.updated` - Subscription tier/status changed
- `customer.subscription.deleted` - Subscription cancelled
- `customer.subscription.trial_will_end` - Trial ending in 3 days

**Payment Events:**
- `invoice.payment_succeeded` - Payment processed successfully
- `invoice.payment_failed` - Payment failed (retry scheduled)
- `invoice.finalized` - Invoice ready to be paid
- `invoice.payment_action_required` - 3DS authentication needed

**Checkout Events:**
- `checkout.session.completed` - Customer completed checkout
- `checkout.session.expired` - Checkout session expired

---

### Database Schema

**StripeWebhookEvent:**
```sql
CREATE TABLE "StripeWebhookEvent" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "stripeEventId" TEXT UNIQUE NOT NULL,
  "eventType" TEXT NOT NULL,
  processed BOOLEAN NOT NULL DEFAULT false,
  "statusCode" INTEGER NOT NULL,
  "errorMessage" TEXT,
  "processedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_stripe_webhook_event_type
ON "StripeWebhookEvent"("eventType");

CREATE INDEX idx_stripe_webhook_processed_at
ON "StripeWebhookEvent"("processedAt" DESC);
```

---

**Last Updated:** February 3, 2026
**Version:** 1.0
**Status:** Production Ready ✅
