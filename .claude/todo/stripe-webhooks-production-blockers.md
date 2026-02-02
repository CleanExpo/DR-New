# Stripe Webhooks - Production Blockers & Implementation Tasks

**Created:** 2026-02-03
**Status:** In Progress
**Priority:** P0 - CRITICAL
**Original Estimate:** 3-4 days
**Revised Estimate:** 1-2 days (60% already complete)

---

## Executive Summary

**CRITICAL FINDING:** The strategic plan assessment was incorrect. Stripe webhooks are **NOT missing** - they are **60% implemented** with comprehensive coverage.

### What Exists ✅
- 4 separate webhook handlers (tenant, workspace, payments, callout)
- 15+ webhook events handled
- Retry logic with exponential backoff
- Signature verification on all handlers
- Real-time event emission for payments
- Audit logging for subscriptions

### Critical Gaps ❌
1. **Missing idempotency** on 3 of 4 handlers (HIGH RISK - could cause duplicate charges)
2. **Email notifications not implemented** (all commented out/TODO)
3. **Missing checkout.session.completed** handler for tenant webhook
4. **No webhook tests** (integration tests missing)

---

## Task Breakdown - Ready for Linear Import

### Epic: Stripe Webhooks Production Hardening
**Priority:** P0 - CRITICAL
**Effort:** 12-16 hours
**Dependencies:** None
**Blocked:** No

---

### Task 1: Add Idempotency to Tenant Webhook Handler
**Priority:** P0 - CRITICAL
**Effort:** 1 hour
**File:** `apps/web/app/api/webhooks/stripe/tenant/route.ts`
**Assignee:** TBD
**Labels:** backend, stripe, webhooks, production-blocker

**Description:**
Add idempotency checks using `isEventProcessed()` and `recordWebhookEvent()` to prevent duplicate processing of subscription events.

**Why Critical:**
Without idempotency, Stripe retries could cause:
- Duplicate subscription activations
- Incorrect billing period extensions
- Multiple email notifications to customers

**Implementation:**
```typescript
// Add to POST handler before event processing
const alreadyProcessed = await isEventProcessed(event.id);
if (alreadyProcessed) {
  return NextResponse.json({ received: true });
}

// After successful processing
await recordWebhookEvent(event.id, event.type, 200);

// On error
await recordWebhookEvent(event.id, event.type, 500, errorMessage);
```

**Acceptance Criteria:**
- [ ] Import `isEventProcessed` and `recordWebhookEvent` from webhook-idempotency.ts
- [ ] Add idempotency check before switch statement
- [ ] Record successful processing after event handling
- [ ] Record failed processing in catch block
- [ ] Test with duplicate event IDs (should skip second event)

**Related Files:**
- `apps/web/src/lib/stripe/webhook-idempotency.ts` (utilities exist)
- `apps/web/app/api/webhooks/stripe/tenant/route.ts` (needs update)

---

### Task 2: Add Idempotency to Workspace Subscription Webhook Handler
**Priority:** P0 - CRITICAL
**Effort:** 1 hour
**File:** `apps/web/app/api/webhooks/stripe/subscription/route.ts`
**Assignee:** TBD
**Labels:** backend, stripe, webhooks, production-blocker

**Description:**
Add idempotency checks to workspace subscription webhook handler (same pattern as Task 1).

**Why Critical:**
Workspace subscription events control contractor access. Duplicate processing could:
- Charge customers twice
- Incorrectly suspend/activate workspaces
- Create duplicate audit logs

**Implementation:**
Same pattern as Task 1 (already has imports, just needs implementation)

**Acceptance Criteria:**
- [ ] Add idempotency check before event processing
- [ ] Record webhook events in database
- [ ] Handle race conditions (event already recorded)
- [ ] Test with Stripe webhook retry scenarios

---

### Task 3: Add Idempotency to Payments Webhook Handler
**Priority:** P0 - CRITICAL
**Effort:** 1 hour
**File:** `apps/web/app/api/webhooks/stripe/payments/route.ts`
**Assignee:** TBD
**Labels:** backend, stripe, webhooks, production-blocker

**Description:**
Add idempotency checks to booking payments webhook handler.

**Why Critical:**
Payment webhooks are the most critical. Duplicate processing could:
- Double-charge customers
- Mark bookings as paid twice
- Send duplicate payment confirmations
- Emit duplicate real-time events

**Implementation:**
Same pattern as Task 1

**Acceptance Criteria:**
- [ ] Add idempotency for payment_intent.succeeded
- [ ] Add idempotency for payment_intent.payment_failed
- [ ] Add idempotency for charge.refunded
- [ ] Prevent duplicate real-time event emissions
- [ ] Test with payment retry scenarios

---

### Task 4: Implement Payment Failure Email Notifications
**Priority:** P0 - CRITICAL
**Effort:** 2-3 hours
**Files:**
- `apps/web/lib/email/payment-failure.ts` (new)
- `apps/web/app/api/webhooks/stripe/subscription/route.ts` (update)
- `apps/web/app/api/webhooks/stripe/tenant/route.ts` (update)

**Assignee:** TBD
**Labels:** backend, email, stripe, customer-communication

**Description:**
Implement email notifications when invoice payments fail. Currently commented out in webhook handlers.

**Why Critical:**
Customers don't know their payment failed. This leads to:
- Unexpected service suspensions
- Poor customer experience
- Churn and support tickets

**Email Content Requirements:**
- Subject: "Payment Failed - Action Required"
- Body should include:
  - Amount that failed
  - Last 4 digits of payment method
  - Retry schedule (Day 1, 3, 7)
  - Link to update payment method
  - Grace period (10 days before suspension)
- Attempt count (1st, 2nd, 3rd retry)

**Implementation Plan:**
1. Create email template (Resend or SendGrid)
2. Create `sendPaymentFailedEmail(workspace, attemptCount)` function
3. Uncomment and implement in webhook handlers
4. Add to both workspace and tenant handlers

**Acceptance Criteria:**
- [ ] Create payment failure email template
- [ ] Implement sendPaymentFailedEmail() function
- [ ] Send email on first failure (immediate)
- [ ] Send email on retry attempts (day 3, 7)
- [ ] Include retry schedule and grace period
- [ ] Test email delivery in staging
- [ ] Verify email links work correctly

---

### Task 5: Implement Payment Success Email Notifications
**Priority:** P1 - HIGH
**Effort:** 1-2 hours
**Files:**
- `apps/web/lib/email/payment-success.ts` (new)
- `apps/web/app/api/webhooks/stripe/subscription/route.ts` (update)

**Assignee:** TBD
**Labels:** backend, email, stripe, customer-communication

**Description:**
Send payment confirmation emails when invoices are paid successfully.

**Why Important:**
- Builds customer trust
- Provides receipt for accounting
- Standard SaaS practice

**Email Content Requirements:**
- Subject: "Payment Received - Thank You"
- Body should include:
  - Amount paid
  - Invoice number
  - Payment method (last 4 digits)
  - Next billing date
  - Download invoice link
  - Receipt for tax purposes

**Acceptance Criteria:**
- [ ] Create payment success email template
- [ ] Implement sendPaymentConfirmationEmail() function
- [ ] Send on invoice.payment_succeeded
- [ ] Include invoice PDF link
- [ ] Test email delivery

---

### Task 6: Implement Trial Ending Email Notifications
**Priority:** P1 - HIGH
**Effort:** 1-2 hours
**Files:**
- `apps/web/lib/email/trial-ending.ts` (new)
- `apps/web/app/api/webhooks/stripe/tenant/route.ts` (update)

**Assignee:** TBD
**Labels:** backend, email, stripe, customer-communication

**Description:**
Send email 3 days before trial ends (customer.subscription.trial_will_end event).

**Why Important:**
- Prevents surprise charges
- Gives customers time to add payment method
- Reduces chargebacks and support tickets

**Email Content Requirements:**
- Subject: "Trial Ending in 3 Days"
- Body should include:
  - Trial end date
  - What happens after trial (charge amount)
  - Link to add payment method
  - Link to cancel if not interested
  - Summary of features used during trial

**Acceptance Criteria:**
- [ ] Create trial ending email template
- [ ] Implement sendTrialEndingEmail() function
- [ ] Send 3 days before trial expiry
- [ ] Include payment method setup link
- [ ] Test email timing

---

### Task 7: Add checkout.session.completed Handler to Tenant Webhook
**Priority:** P0 - CRITICAL
**Effort:** 1 hour
**File:** `apps/web/app/api/webhooks/stripe/tenant/route.ts`
**Assignee:** TBD
**Labels:** backend, stripe, webhooks, onboarding

**Description:**
Add handler for checkout.session.completed event to activate tenants who sign up via Stripe Checkout.

**Why Critical:**
Currently tenant webhook only handles subscription.created. If a tenant signs up via Stripe Checkout, they won't be activated until subscription.created fires (which may be delayed).

**Current Gap:**
- User completes Stripe Checkout
- Checkout session completed event fires
- ❌ No handler processes it
- User sees "pending activation" screen
- subscription.created fires later
- ✅ User finally activated (delay: 1-5 minutes)

**Implementation:**
```typescript
case 'checkout.session.completed': {
  const session = event.data.object as Stripe.Checkout.Session;
  await handleCheckoutSessionCompleted(session);
  break;
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const tenantId = session.metadata?.tenantId;
  if (!tenantId) return;

  // Activate tenant immediately (don't wait for subscription.created)
  await prisma.tenant.update({
    where: { id: tenantId },
    data: {
      stripeCustomerId: session.customer as string,
      stripeCheckoutSessionId: session.id,
      onboardingCompleted: true,
      // subscription details will be filled by subscription.created
    },
  });
}
```

**Acceptance Criteria:**
- [ ] Add checkout.session.completed to switch statement
- [ ] Implement handleCheckoutSessionCompleted function
- [ ] Extract tenantId from session metadata
- [ ] Mark tenant as activated immediately
- [ ] Test with Stripe Checkout flow
- [ ] Verify no duplicate activation when subscription.created fires

---

### Task 8: Create Comprehensive Webhook Tests
**Priority:** P1 - HIGH
**Effort:** 4-5 hours
**Files:**
- `apps/web/__tests__/webhooks/stripe-tenant.test.ts` (new)
- `apps/web/__tests__/webhooks/stripe-subscription.test.ts` (new)
- `apps/web/__tests__/webhooks/stripe-payments.test.ts` (new)

**Assignee:** TBD
**Labels:** backend, testing, stripe, webhooks

**Description:**
Create integration tests for all webhook handlers. Currently only 1 basic test exists.

**Test Coverage Needed:**

**Tenant Webhook Tests (15 tests):**
- [ ] Rejects missing signature
- [ ] Rejects invalid signature
- [ ] Skips non-tenant events (metadata.type !== 'tenant_subscription')
- [ ] Handles subscription.created (activates tenant)
- [ ] Handles subscription.updated (updates tier)
- [ ] Handles subscription.deleted (cancels tenant)
- [ ] Handles invoice.payment_succeeded (extends period)
- [ ] Handles invoice.payment_failed (marks PAST_DUE)
- [ ] Handles trial_will_end (sends email)
- [ ] Handles checkout.session.completed (activates tenant)
- [ ] Idempotency: Skips duplicate events
- [ ] Idempotency: Records successful processing
- [ ] Idempotency: Records failed processing
- [ ] Error handling: Database errors
- [ ] Error handling: Missing tenant ID

**Workspace Webhook Tests (12 tests):**
- [ ] Similar coverage as tenant tests
- [ ] Audit log creation verified
- [ ] Workspace status transitions tested

**Payment Webhook Tests (10 tests):**
- [ ] payment_intent.succeeded updates payment
- [ ] payment_intent.failed marks failed
- [ ] charge.refunded processes refund
- [ ] Real-time events emitted correctly
- [ ] Idempotency prevents duplicate charges
- [ ] Partial refunds calculated correctly

**Acceptance Criteria:**
- [ ] All webhook handlers have test coverage
- [ ] Idempotency logic tested
- [ ] Error scenarios tested
- [ ] Mock Stripe signature verification
- [ ] Tests run in CI/CD pipeline
- [ ] Coverage report > 80%

---

### Task 9: Document Webhook Configuration in README
**Priority:** P2 - MEDIUM
**Effort:** 1 hour
**Files:**
- `docs/webhooks/STRIPE_WEBHOOKS.md` (new)
- `README.md` (update)

**Assignee:** TBD
**Labels:** documentation, stripe

**Description:**
Create comprehensive webhook setup documentation for production deployment.

**Documentation Requirements:**

**Setup Guide:**
- How to create webhook endpoints in Stripe Dashboard
- Required environment variables
- Webhook secret configuration
- Multiple webhook endpoint strategy (tenant vs workspace vs payments)

**Webhook Endpoints:**
```
Production URLs:
- https://disasterrecovery.com.au/api/webhooks/stripe/tenant
- https://disasterrecovery.com.au/api/webhooks/stripe/subscription
- https://disasterrecovery.com.au/api/webhooks/stripe/payments
- https://disasterrecovery.com.au/api/stripe/webhook (callout payments)
```

**Environment Variables:**
```
STRIPE_WEBHOOK_SECRET=whsec_xxx (callout payments)
STRIPE_TENANT_WEBHOOK_SECRET=whsec_xxx (tenant subscriptions)
STRIPE_PAYMENTS_WEBHOOK_SECRET=whsec_xxx (booking payments)
# Note: subscription handler uses STRIPE_WEBHOOK_SECRET
```

**Event Routing Table:**
| Event | Handler | Purpose |
|-------|---------|---------|
| customer.subscription.created | tenant, subscription | Activate subscription |
| customer.subscription.updated | tenant, subscription | Update tier/status |
| customer.subscription.deleted | tenant, subscription | Cancel subscription |
| invoice.payment_succeeded | tenant, subscription | Extend billing period |
| invoice.payment_failed | tenant, subscription | Mark PAST_DUE |
| checkout.session.completed | tenant, callout | Activate on signup |
| payment_intent.succeeded | payments, callout | Mark payment complete |
| payment_intent.payment_failed | payments | Mark payment failed |
| charge.refunded | payments | Process refund |

**Testing with Stripe CLI:**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local dev
stripe listen --forward-to localhost:3000/api/webhooks/stripe/tenant

# Trigger test events
stripe trigger customer.subscription.created
stripe trigger invoice.payment_failed
stripe trigger checkout.session.completed
```

**Monitoring:**
- How to view webhook logs in Stripe Dashboard
- Interpreting webhook retry attempts
- Debugging failed webhooks
- Idempotency verification

**Acceptance Criteria:**
- [ ] Setup instructions documented
- [ ] All webhook endpoints documented
- [ ] Event routing table created
- [ ] Testing guide with Stripe CLI
- [ ] Monitoring and debugging section
- [ ] Production deployment checklist

---

### Task 10: Setup Webhook Monitoring Dashboard
**Priority:** P2 - MEDIUM
**Effort:** 2-3 hours
**Files:**
- `apps/web/app/dashboard/admin/webhooks/page.tsx` (new)
- `apps/web/app/api/admin/webhooks/route.ts` (new)

**Assignee:** TBD
**Labels:** frontend, monitoring, admin-dashboard

**Description:**
Create admin dashboard to monitor webhook health and troubleshoot issues.

**Dashboard Features:**
- Recent webhook events (last 100)
- Event type filter
- Status filter (success/failed)
- Search by Stripe event ID
- Retry count for failed events
- Error message display
- Manual retry button for failed events

**Database Query:**
```typescript
const events = await prisma.stripeWebhookEvent.findMany({
  where: {
    eventType: eventTypeFilter,
    processed: statusFilter === 'success' ? true : false,
  },
  orderBy: { processedAt: 'desc' },
  take: 100,
});
```

**Acceptance Criteria:**
- [ ] Admin can view recent webhook events
- [ ] Filter by event type and status
- [ ] Display error messages for failed events
- [ ] Show retry count for each event
- [ ] Manual retry functionality
- [ ] Export webhook logs to CSV

---

## Priority Matrix

| Task | Priority | Effort | Impact | Blocks Production? |
|------|----------|--------|--------|--------------------|
| 1. Tenant idempotency | P0 | 1h | CRITICAL | Yes - duplicate charges |
| 2. Workspace idempotency | P0 | 1h | CRITICAL | Yes - duplicate charges |
| 3. Payment idempotency | P0 | 1h | CRITICAL | Yes - duplicate charges |
| 4. Payment failure emails | P0 | 2-3h | CRITICAL | Yes - customer communication |
| 7. Checkout handler | P0 | 1h | CRITICAL | Yes - user activation |
| 5. Payment success emails | P1 | 1-2h | HIGH | No - nice to have |
| 6. Trial ending emails | P1 | 1-2h | HIGH | No - nice to have |
| 8. Webhook tests | P1 | 4-5h | HIGH | No - QA requirement |
| 9. Documentation | P2 | 1h | MEDIUM | No - ops requirement |
| 10. Monitoring dashboard | P2 | 2-3h | MEDIUM | No - ops nice to have |

---

## Implementation Timeline

### Phase 1: Critical Fixes (Day 1 - 6 hours)
**Goal:** Prevent duplicate charges and activate users
- Task 1: Tenant idempotency (1h)
- Task 2: Workspace idempotency (1h)
- Task 3: Payment idempotency (1h)
- Task 7: Checkout handler (1h)
- Task 4: Payment failure emails (2h)
✅ **PRODUCTION BLOCKERS RESOLVED**

### Phase 2: Customer Communication (Day 2 - 3 hours)
**Goal:** Complete email notification system
- Task 5: Payment success emails (1.5h)
- Task 6: Trial ending emails (1.5h)

### Phase 3: Quality Assurance (Day 2-3 - 5 hours)
**Goal:** Test coverage and documentation
- Task 8: Webhook tests (4h)
- Task 9: Documentation (1h)

### Phase 4: Operations (Optional - 3 hours)
**Goal:** Monitoring and troubleshooting tools
- Task 10: Monitoring dashboard (3h)

**Total Estimated Effort:** 16-19 hours (2-3 days)

---

## Success Metrics

**Pre-Launch Checklist:**
- [ ] All webhook handlers have idempotency
- [ ] All critical emails implemented (payment failure)
- [ ] Checkout session handler activated
- [ ] Webhook tests passing in CI/CD
- [ ] Documentation complete
- [ ] Stripe webhook endpoints configured in production
- [ ] Webhook secrets stored in Vercel environment variables
- [ ] Manual webhook testing completed

**Post-Launch Monitoring:**
- Webhook success rate > 99%
- Idempotency blocks duplicate events (no duplicate charges)
- Email delivery rate > 95%
- Average webhook processing time < 500ms
- Zero unhandled webhook events in Stripe Dashboard

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Duplicate charges without idempotency | HIGH | CRITICAL | Implement idempotency first (Tasks 1-3) |
| Customers don't know payment failed | HIGH | HIGH | Implement email notifications (Task 4) |
| Users stuck on "pending activation" | MEDIUM | HIGH | Add checkout handler (Task 7) |
| Webhook processing failures | MEDIUM | HIGH | Add comprehensive tests (Task 8) |
| Production setup incorrect | MEDIUM | MEDIUM | Document setup thoroughly (Task 9) |

---

## Dependencies & Blockers

**External Dependencies:**
- Stripe production account configured ✅
- Email service configured (Resend/SendGrid) ✅
- Vercel production environment ✅

**Internal Dependencies:**
- Database models (StripeWebhookEvent) ✅
- Idempotency utilities ✅
- Retry logic ✅
- Email templates (need to create)

**Current Blockers:**
- None - all dependencies exist

---

## Notes for Linear Sync

**Labels to Add:**
- `stripe`
- `webhooks`
- `production-blocker`
- `email`
- `testing`
- `documentation`
- `monitoring`

**Milestones:**
- Phase 1: Critical Fixes (Week 1)
- Phase 2: Customer Communication (Week 1)
- Phase 3: Quality Assurance (Week 2)
- Phase 4: Operations (Week 2 - optional)

**Team Assignment:**
- Backend Developer: Tasks 1-7
- Frontend Developer: Task 10
- QA Engineer: Task 8
- Technical Writer: Task 9

---

## Revised Strategic Assessment

**Original Plan Assessment:** "Stripe webhooks NOT implemented (only utilities exist)" ❌ INCORRECT

**Actual Status:** "Stripe webhooks 60% implemented, need production hardening" ✅ ACCURATE

**Impact on Timeline:**
- Original estimate: 3-4 days
- Revised estimate: 1.5-2 days
- Time saved: 1.5-2 days

**Impact on Production Readiness:**
- Original: 60% production ready
- After webhook hardening: 75% production ready
- Remaining blockers: Audit logging, error alerting, payment dunning, testing

**Next Priority After Webhooks:**
Priority 1.2: Fix Audit Logging (currently stubbed)
