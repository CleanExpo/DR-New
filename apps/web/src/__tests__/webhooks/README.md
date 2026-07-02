# Stripe Webhook Testing Guide

Comprehensive testing guide for Stripe webhook handlers covering unit tests, integration tests, and manual testing with Stripe CLI.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Test Structure](#test-structure)
3. [Running Tests](#running-tests)
4. [Manual Testing with Stripe CLI](#manual-testing-with-stripe-cli)
5. [Test Coverage](#test-coverage)
6. [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Install dependencies
npm install

# Run all webhook tests
npm run test -- __tests__/webhooks

# Run specific test file
npm run test -- __tests__/webhooks/tenant-webhook.test.ts

# Run tests with coverage
npm run test:coverage -- __tests__/webhooks

# Watch mode for development
npm run test:watch -- __tests__/webhooks
```

---

## Test Structure

### Test Files

```
__tests__/webhooks/
├── README.md                          # This file
├── tenant-webhook.test.ts             # Tenant subscription webhook tests
├── workspace-webhook.test.ts          # Workspace subscription webhook tests
├── idempotency.test.ts                # Event idempotency tracking tests
└── email-notifications.test.ts        # Email notification delivery tests
```

### What Each Test Suite Covers

#### 1. `tenant-webhook.test.ts`

Tests for tenant-level subscription webhooks (`/api/webhooks/stripe/tenant`):

- ✅ Webhook signature verification
- ✅ Event filtering (tenant vs workspace events)
- ✅ Idempotency (duplicate event handling)
- ✅ Payment success flow
- ✅ Payment failure flow
- ✅ Trial ending notifications
- ✅ Checkout session completion
- ✅ Email integration (non-blocking)

**Key Scenarios:**
- Valid signature → Process event
- Invalid signature → Reject with 400
- Already processed event → Skip with 200
- Email failure → Continue webhook processing

---

#### 2. `workspace-webhook.test.ts`

Tests for workspace-level subscription webhooks (`/api/webhooks/stripe/subscription`):

- ✅ Webhook signature verification
- ✅ Idempotency checks
- ✅ Retry logic with exponential backoff
- ✅ Payment success updates
- ✅ Payment failure handling
- ✅ Subscription lifecycle (created, updated, deleted)
- ✅ Audit log creation
- ✅ Payment method retrieval

**Key Scenarios:**
- Payment success → Update workspace ACTIVE, send email
- Payment failure → Update workspace PAST_DUE, send retry email
- Subscription deleted → Cancel workspace
- Database error → Retry with backoff

---

#### 3. `idempotency.test.ts`

Tests for webhook event idempotency tracking:

- ✅ Duplicate event detection
- ✅ Event recording (success and failure)
- ✅ Race condition handling
- ✅ Retry count tracking
- ✅ Event status retrieval
- ✅ Database error handling

**Key Scenarios:**
- New event → Process normally
- Duplicate event → Skip processing
- Concurrent requests → Handle race conditions
- Database down → Return 503 for retry

---

#### 4. `email-notifications.test.ts`

Tests for billing email notifications:

- ✅ Payment failure emails (with retry schedule)
- ✅ Payment success emails (with receipt)
- ✅ Trial ending emails (with pricing)
- ✅ HTML + plain text versions
- ✅ Email service failures (non-blocking)
- ✅ Australian English formatting

**Key Scenarios:**
- Payment failed → Email with retry schedule (Day 1, 3, 7)
- Payment succeeded → Email with receipt and next billing date
- Trial ending → Email 3 days before expiry
- Email service down → Log error, don't fail webhook

---

## Running Tests

### Run All Tests

```bash
# All webhook tests
npm run test -- __tests__/webhooks

# All tests with coverage
npm run test:coverage
```

### Run Specific Test Suite

```bash
# Tenant webhook tests only
npm run test -- tenant-webhook.test.ts

# Idempotency tests only
npm run test -- idempotency.test.ts

# Email tests only
npm run test -- email-notifications.test.ts
```

### Run Tests in Watch Mode

```bash
# Watch for changes and re-run tests
npm run test:watch -- __tests__/webhooks
```

### Run Tests with Verbose Output

```bash
# See detailed test output
npm run test -- __tests__/webhooks --verbose
```

### CI/CD Test Run

```bash
# Run tests as they would in CI
npm run test:ci
```

---

## Manual Testing with Stripe CLI

For realistic webhook testing, use the Stripe CLI to trigger actual webhook events locally.

### 1. Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Or download from: https://stripe.com/docs/stripe-cli
```

### 2. Login to Stripe

```bash
stripe login
```

This will open your browser to authorize the CLI with your Stripe account.

### 3. Forward Webhooks to Local Server

```bash
# Start your Next.js dev server first
npm run dev

# In another terminal, forward webhooks
stripe listen --forward-to localhost:3000/api/webhooks/stripe/tenant

# For workspace webhooks:
stripe listen --forward-to localhost:3000/api/webhooks/stripe/subscription
```

**Important:** Copy the webhook signing secret that appears:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

Update your `.env.local`:
```env
STRIPE_TENANT_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
# or
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 4. Trigger Test Events

#### Payment Success

```bash
# Trigger successful payment
stripe trigger invoice.payment_succeeded

# With custom data
stripe trigger invoice.payment_succeeded \
  --add invoice:amount_paid=4900 \
  --add invoice:metadata.type=tenant_subscription \
  --add invoice:metadata.tenantId=test_tenant_123
```

#### Payment Failure

```bash
# Trigger failed payment
stripe trigger invoice.payment_failed

# With attempt count
stripe trigger invoice.payment_failed \
  --add invoice:attempt_count=2 \
  --add invoice:metadata.type=tenant_subscription \
  --add invoice:metadata.tenantId=test_tenant_123
```

#### Trial Ending

```bash
# Trigger trial ending notification
stripe trigger customer.subscription.trial_will_end
```

#### Checkout Completed

```bash
# Trigger checkout session completion
stripe trigger checkout.session.completed
```

#### Subscription Created

```bash
# Trigger subscription creation
stripe trigger customer.subscription.created
```

#### Subscription Deleted

```bash
# Trigger subscription cancellation
stripe trigger customer.subscription.deleted
```

### 5. Test Idempotency

Send the same event twice to verify duplicate detection:

```bash
# First event (should process)
stripe trigger invoice.payment_succeeded

# Copy the event ID from the logs, then send again
# (should be skipped as duplicate)
```

### 6. Monitor Webhook Events

```bash
# Watch webhook events in real-time
stripe listen --print-json

# Filter specific event types
stripe listen --events invoice.payment_succeeded,invoice.payment_failed
```

---

## Test Coverage

### Current Coverage

Run tests with coverage to see detailed metrics:

```bash
npm run test:coverage -- __tests__/webhooks
```

### Expected Coverage Goals

| Component | Target Coverage |
|-----------|----------------|
| Webhook Handlers | 90%+ |
| Idempotency Logic | 95%+ |
| Email Functions | 85%+ |
| Error Handling | 90%+ |

### Coverage Report Location

After running tests with coverage, view the HTML report:

```bash
# Generate coverage report
npm run test:coverage

# Open in browser (macOS)
open coverage/lcov-report/index.html

# Open in browser (Windows)
start coverage/lcov-report/index.html
```

---

## Environment Setup for Testing

### Required Environment Variables

Create `.env.test.local` for test environment:

```env
# Database (use test database)
DATABASE_URL="postgresql://user:pass@localhost:5432/dr_nrpg_test"
DIRECT_URL="postgresql://user:pass@localhost:5432/dr_nrpg_test"

# Stripe (use test keys)
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_test_xxxxxxxxxxxxx"
STRIPE_TENANT_WEBHOOK_SECRET="whsec_test_tenant_xxxxxxxxx"

# Email (optional - mocked in tests)
RESEND_API_KEY="re_test_xxxxxxxxxxxxx"
```

### Test Database Setup

```bash
# Create test database
createdb dr_nrpg_test

# Run migrations
DATABASE_URL="postgresql://user:pass@localhost:5432/dr_nrpg_test" \
  npx prisma migrate deploy

# Seed test data (optional)
DATABASE_URL="postgresql://user:pass@localhost:5432/dr_nrpg_test" \
  npx prisma db seed
```

---

## Testing Checklist

### Before Deployment

- [ ] All unit tests passing
- [ ] Integration tests with Stripe CLI completed
- [ ] Idempotency verified (duplicate events ignored)
- [ ] Email delivery tested (success, failure, trial)
- [ ] Error handling tested (database down, Stripe API errors)
- [ ] Retry logic validated
- [ ] Webhook signatures verified
- [ ] Audit logs created correctly

### Manual Verification

Use Stripe CLI to verify:

1. **Payment Success:**
   ```bash
   stripe trigger invoice.payment_succeeded
   ```
   - [ ] Tenant/workspace status updated to ACTIVE
   - [ ] Success email sent
   - [ ] Audit log created
   - [ ] Event recorded in database

2. **Payment Failure:**
   ```bash
   stripe trigger invoice.payment_failed
   ```
   - [ ] Status updated to PAST_DUE
   - [ ] Failure email sent with retry schedule
   - [ ] Audit log created
   - [ ] Attempt count tracked correctly

3. **Trial Ending:**
   ```bash
   stripe trigger customer.subscription.trial_will_end
   ```
   - [ ] Trial ending email sent
   - [ ] Correct pricing shown
   - [ ] 3-day advance notice confirmed

4. **Idempotency:**
   - Send same event twice
   - [ ] First event processed
   - [ ] Second event skipped
   - [ ] No duplicate database updates

5. **Error Resilience:**
   - Stop database during webhook
   - [ ] Webhook returns 503
   - [ ] Stripe retries event
   - [ ] Event processes on retry

---

## Troubleshooting

### Tests Failing

**Problem:** Tests fail with "Stripe not configured"

**Solution:**
```bash
# Ensure test environment variables are set
export STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"

# Or use .env.test.local file
```

---

**Problem:** "Cannot find module '@/lib/prisma'"

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Re-run tests
npm test
```

---

**Problem:** Database connection errors in tests

**Solution:**
```bash
# Use in-memory mock instead of real database
# Tests already use mocked Prisma client

# Or use test database
DATABASE_URL="postgresql://localhost:5432/test_db" npm test
```

---

### Stripe CLI Issues

**Problem:** Webhook events not appearing in local server

**Solution:**
```bash
# Verify server is running
curl http://localhost:3000/api/webhooks/stripe/tenant

# Check Stripe CLI is forwarding correctly
stripe listen --forward-to localhost:3000/api/webhooks/stripe/tenant

# Verify webhook secret in .env.local matches CLI output
```

---

**Problem:** "Invalid signature" error

**Solution:**
```bash
# Update .env.local with current webhook secret from Stripe CLI
# Restart dev server after updating .env.local
```

---

### Email Testing

**Problem:** Emails not being sent during manual testing

**Solution:**
```bash
# Check Resend API key is valid
curl -H "Authorization: Bearer YOUR_API_KEY" https://api.resend.com/domains

# Check email logs in webhook handler console output
# Emails are non-blocking, so check for error logs

# Test email function directly
npm run test -- email-notifications.test.ts
```

---

## Production Webhook URLs

After deployment, configure these webhook endpoints in Stripe Dashboard:

### Tenant Subscription Webhooks

**URL:** `https://disasterrecovery.com.au/api/webhooks/stripe/tenant`

**Events to Subscribe:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.trial_will_end`
- `checkout.session.completed`

**Description:** Handles tenant-level subscription events

---

### Workspace Subscription Webhooks

**URL:** `https://disasterrecovery.com.au/api/webhooks/stripe/subscription`

**Events to Subscribe:**
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Description:** Handles workspace/contractor subscription events

---

## Additional Resources

- [Stripe Webhook Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Jest Testing Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Documentation](https://testing-library.com/docs/)

---

## Support

For issues or questions about webhook testing:

1. Check the [Troubleshooting](#troubleshooting) section above
2. Review test output for detailed error messages
3. Verify environment variables are set correctly
4. Check Stripe Dashboard for webhook delivery logs
5. Review webhook handler code in `apps/web/app/api/webhooks/stripe/`

---

**Last Updated:** February 3, 2026
**Test Coverage:** 4 test suites, 50+ test cases
**Status:** Production Ready ✅
