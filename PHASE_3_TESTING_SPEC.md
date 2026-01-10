# Phase 3 Testing Specification & Verification Guide

**Date**: January 10, 2026
**Phase**: Phase 3 - Security & Production Hardening
**Status**: Ready for Testing

## Overview

This document provides comprehensive testing specifications for Phase 3 implementation. All P0 and P1 features must pass testing before production deployment.

---

## 1. Duplicate Bid Prevention Testing

### Test Setup
- **Database**: Clean test database with migrations applied
- **User**: Test contractor account with CONTRACTOR role
- **Request**: Test service request with status = 'PENDING'

### Test Cases

#### 1.1 First Bid Success
**Scenario**: Contractor submits first bid on a service request

```
POST /api/contractor/requests/{requestId}/bid
Body: {
  "budget": "$5000",
  "timeline": "ASAP",
  "message": "I can complete this project quickly and efficiently.",
  "startDate": "2025-02-15",
  "estimatedHours": "40"
}
```

**Expected**:
- Status: 200 OK
- Response includes: bid ID, status='PENDING', matchScore=50
- Database: ContractorMatch record created with unique index

**Verification**:
- [ ] Response contains `success: true`
- [ ] Bid data stored in database
- [ ] Unique constraint is active (@@unique([contractorId, serviceRequestId]))

#### 1.2 Duplicate Bid Rejection
**Scenario**: Same contractor attempts second bid on same request

```
POST /api/contractor/requests/{requestId}/bid
Body: { budget: "$6000", timeline: "2 weeks", message: "Second bid attempt" }
```

**Expected**:
- Status: 409 Conflict
- Error code: 'DUPLICATE_BID'
- Message: "You have already submitted a bid for this request"

**Verification**:
- [ ] HTTP 409 status code
- [ ] Error code = DUPLICATE_BID
- [ ] Original bid unchanged in database
- [ ] No second bid record created

#### 1.3 Different Request Success
**Scenario**: Same contractor bids on different request

```
Contractor bids on Request A (succeeds)
→ Contractor bids on Request B (should succeed)
```

**Expected**:
- Both bids succeed with 200 OK
- Two ContractorMatch records exist
- Different serviceRequestIds

**Verification**:
- [ ] Both bids in database
- [ ] Can query 2 bids for contractor
- [ ] Separate bid IDs and records

#### 1.4 Different Contractor Same Request
**Scenario**: Two contractors bid on same request

```
Contractor A bids on Request X (succeeds)
→ Contractor B bids on Request X (succeeds)
```

**Expected**:
- Both bids succeed with 200 OK
- Two ContractorMatch records with same serviceRequestId

**Verification**:
- [ ] Both bids in database
- [ ] Can query 2 bids for same request
- [ ] Different contractorIds

---

## 2. Rate Limiting Testing

### Test Setup
- **Window**: 10 minutes (600 seconds)
- **Limit**: 5 bids per contractor
- **Rate Limit Key**: `bid-submission:{userId}`

### Test Cases

#### 2.1 Within Limit Success
**Scenario**: Contractor submits 5 bids on different requests within 10 minutes

```
Loop 5 times:
  POST /api/contractor/requests/{requestId}/bid
```

**Expected**:
- All 5 requests return 200 OK
- Each shows: `success: true`, bid data
- Remaining counter: 4, 3, 2, 1, 0

**Verification**:
- [ ] All 5 bids succeed
- [ ] 5 bids in database
- [ ] Status codes are all 200

#### 2.2 Exceeds Limit Rejection
**Scenario**: Contractor attempts 6th bid within window

```
(First 5 succeed)
→ 6th POST /api/contractor/requests/{newRequestId}/bid
```

**Expected**:
- Status: 429 Too Many Requests
- Error code: 'BID_SUBMISSION_RATE_LIMITED'
- Message: "Too many bid submissions. Please try again in X minutes."
- resetInSeconds value provided

**Verification**:
- [ ] HTTP 429 status code
- [ ] Error code = BID_SUBMISSION_RATE_LIMITED
- [ ] resetInSeconds > 0
- [ ] Only 5 bids in database
- [ ] 6th bid not created

#### 2.3 Window Expiration Reset
**Scenario**: Wait 10+ minutes, submit 6th bid

```
(Submit 5 bids)
→ Wait 10 minutes
→ Submit 6th bid
```

**Expected**:
- After 10 minute wait, 6th bid succeeds with 200 OK
- Counter resets to limit - 1

**Verification**:
- [ ] 6th bid returns 200 OK
- [ ] 6 bids total in database
- [ ] Timer/window properly resets

#### 2.4 Per-User Isolation
**Scenario**: Two contractors each submit bids

```
Contractor A: Submit 5 bids (succeeds), attempt 6th (429)
→ Contractor B: Submit 5 bids (should still succeed)
```

**Expected**:
- Contractor A's 6th bid blocked
- Contractor B's first 5 bids all succeed
- Separate rate limit per user

**Verification**:
- [ ] Contractor A: 5 succeed, 6th fails (429)
- [ ] Contractor B: All 5 succeed (200)
- [ ] Rate limits are independent per user

---

## 3. CAPTCHA Security Testing

### Test Setup
- **Mock Mode**: Enabled in development (NODE_ENV === 'development')
- **Mock Token**: 'mock-captcha-token-development-only'
- **Real Mode**: Uses actual hCaptcha in production

### Test Cases

#### 3.1 Development Mock Mode
**Scenario**: Submit form with mock CAPTCHA token in development

```
POST /api/public/claims/submit
Body: { captchaToken: "mock-captcha-token-development-only", ... }
Environment: NODE_ENV === 'development'
```

**Expected**:
- Status: 200 OK (or appropriate based on other validation)
- CAPTCHA verification succeeds
- Console message: "Mock CAPTCHA verification successful for IP: {ip}"

**Verification**:
- [ ] Accepts mock token in development
- [ ] Rejects mock token in production
- [ ] Proper environment switching

#### 3.2 Failed Attempt Tracking
**Scenario**: Submit invalid CAPTCHA token multiple times from same IP

```
POST with invalid token (3 times from same IP)
```

**Expected**:
- 1st attempt: Fails, tracked
- 2nd attempt: Fails, tracked
- 3rd attempt: Fails + rate limited

**Verification**:
- [ ] Failures tracked in memory/database
- [ ] Progressive penalties applied
- [ ] IP-based tracking (not per-user)

#### 3.3 Progressive Penalties
**Scenario**: Multiple failures trigger increasing penalties

```
Failures 1-2: Allow retry immediately
Failures 3+: 60-second block
Failures 5+: 600-second (10-minute) block
Failures 10+: 3600-second (1-hour) block
```

**Expected**:
- After 3 failures: 60-second timeout
- After 5 failures: 10-minute timeout
- After 10 failures: 1-hour timeout
- Error message includes wait time

**Verification**:
- [ ] Correct timeout duration
- [ ] Error message shows minutes to wait
- [ ] Penalties increase progressively

#### 3.4 Successful Attempt Resets
**Scenario**: Successful CAPTCHA resets failure counter

```
(3+ failures, rate limited)
→ Wait for timeout
→ Submit valid CAPTCHA
→ Verify counter resets
```

**Expected**:
- Failed attempt counter resets to 0
- IP can submit forms again
- New failure window starts

**Verification**:
- [ ] Counter resets on success
- [ ] Timeout not needed after success
- [ ] Clean state for new attempts

---

## 4. Stripe Webhook Idempotency Testing

### Test Setup
- **Webhook URL**: `/api/stripe/webhook` or `/api/webhooks/stripe/subscription`
- **Events**: `checkout.session.completed`, `payment_intent.succeeded`, `invoice.payment_succeeded`

### Test Cases

#### 4.1 First Webhook Processing
**Scenario**: Stripe sends webhook event for first time

```
POST /api/stripe/webhook
Headers: {
  "stripe-signature": "valid-signature",
  "content-type": "application/json"
}
Body: {
  "id": "evt_1234567890",
  "type": "checkout.session.completed",
  "data": { ... }
}
```

**Expected**:
- Status: 200 OK
- Response: `{ received: true }`
- Event recorded in database
- Payment status updated

**Verification**:
- [ ] Event processed successfully
- [ ] StripeWebhookEvent record created
- [ ] Idempotency key stored

#### 4.2 Duplicate Webhook Idempotency
**Scenario**: Stripe retries same event

```
(First webhook succeeds)
→ Stripe retries same event (same event.id)
```

**Expected**:
- Status: 200 OK (success response)
- Response: `{ received: true }`
- No duplicate processing
- Payment status not changed
- Database shows event was already processed

**Verification**:
- [ ] Returns 200 immediately
- [ ] No duplicate payment record
- [ ] Log shows "already processed"
- [ ] Only 1 StripeWebhookEvent record for ID

#### 4.3 Multiple Different Events
**Scenario**: Multiple different events from Stripe

```
Event 1: evt_111 (checkout.session.completed) → succeeds
Event 2: evt_222 (payment_intent.succeeded) → succeeds
Event 3: evt_111 (checkout.session.completed retry) → idempotent success
```

**Expected**:
- All unique events processed once
- Retried events skip processing but return 200
- Correct payment status for each event

**Verification**:
- [ ] 3 StripeWebhookEvent records created
- [ ] 2 payment status updates (not 3)
- [ ] Correct event matching

#### 4.4 Error Handling & Recording
**Scenario**: Webhook processing fails

```
POST /api/stripe/webhook with invalid data causing error
```

**Expected**:
- Status: 500 Internal Server Error
- Error recorded in StripeWebhookEvent
- Error message stored
- Status code recorded

**Verification**:
- [ ] StripeWebhookEvent.processed = false
- [ ] StripeWebhookEvent.statusCode = 500
- [ ] StripeWebhookEvent.errorMessage populated
- [ ] Can query failed events for monitoring

---

## 5. Webhook Retry Logic Testing

### Test Setup
- **Config**: Exponential backoff with configurable retry limits
- **Database**: Simulate transient failures

### Test Cases

#### 5.1 Transient Failure Recovery
**Scenario**: Database temporarily unavailable, then recovers

```
Webhook received
→ Query fails (connection timeout) → Retries
→ Query succeeds → Returns 200 OK
```

**Expected**:
- Automatic retry with exponential backoff
- Initial delay: 100ms
- Retry delays: 100ms → 200ms → 400ms
- Eventual success and processing

**Verification**:
- [ ] Retries occur automatically
- [ ] Delays increase exponentially
- [ ] Event eventually processed
- [ ] Payment status updated correctly

#### 5.2 Non-Retryable Errors
**Scenario**: Permanent error (validation error)

```
Webhook received with invalid data
→ Processing fails (non-retryable error)
```

**Expected**:
- Error thrown immediately
- No retry attempts
- Error recorded
- Status: 500 Internal Server Error

**Verification**:
- [ ] No retry attempts for non-retryable errors
- [ ] Error recorded with full message
- [ ] Proper error response to Stripe

#### 5.3 Retry Limits
**Scenario**: Continuous failures (database down)

```
Webhook received
→ Retries: 100ms wait, 200ms wait, 400ms wait
→ All fail (exceeds retry limit)
```

**Expected**:
- Max 3-5 retries depending on operation type
- Error recorded after final failure
- Response: 500 Internal Server Error
- Alert triggered for monitoring

**Verification**:
- [ ] Appropriate number of retry attempts
- [ ] Respects max retry count
- [ ] Error recorded for investigation

---

## 6. Webhook Monitoring & Alerting Testing

### Test Setup
- **Monitoring API**: `/api/webhooks/monitoring`
- **Cron Job**: `/api/webhooks/cron/health-check` (every 5 minutes)

### Test Cases

#### 6.1 Failed Event Tracking
**Scenario**: Multiple webhook events fail

```
Event 1: payment_intent.succeeded → fails
Event 2: invoice.payment_succeeded → fails
Event 3: checkout.session.completed → fails
```

**Expected**:
- All 3 failures tracked in StripeWebhookEvent table
- Failure count queryable
- Error messages recorded

**Verification**:
- [ ] 3 records with processed=false
- [ ] Error messages populated
- [ ] Timestamps accurate

#### 6.2 Monitoring Dashboard API
**Scenario**: Query monitoring data

```
GET /api/webhooks/monitoring?summary=true&stats=true
```

**Expected**:
- Status: 200 OK
- Response includes:
  - Alert summary with recent failures
  - Statistics: total processed, failed, failure rate
  - Event type breakdown

**Verification**:
- [ ] Returns monitoring data
- [ ] Accurate failure counts
- [ ] Failure rate calculation correct
- [ ] Per-event-type breakdown

#### 6.3 Alert Threshold Monitoring
**Scenario**: High failure rate detected

```
5+ failures in 10 minutes
→ Monitoring check runs
```

**Expected**:
- Alert triggered: HIGH_FAILURE_RATE
- Severity: CRITICAL
- Alert logged/recorded for external services

**Verification**:
- [ ] Alert created when threshold exceeded
- [ ] Severity = CRITICAL
- [ ] Can be queried from monitoring API
- [ ] Includes failure details

#### 6.4 Health Check Cron Job
**Scenario**: Periodic health check runs

```
Cron job: /api/webhooks/cron/health-check
Schedule: Every 5 minutes
```

**Expected**:
- Cron executes successfully
- Checks webhook health
- Returns: `{ success: true, hasCriticalAlert: boolean }`
- Verifies Vercel cron secret

**Verification**:
- [ ] Cron endpoint accessible
- [ ] Returns proper response format
- [ ] Checks failure thresholds
- [ ] Triggers alerts if needed

#### 6.5 Manual Webhook Retry
**Scenario**: Manually retry failed webhook event

```
POST /api/webhooks/monitoring/retry
Body: { "stripeEventId": "evt_failed_123" }
```

**Expected**:
- Status: 200 OK
- Event record deleted from StripeWebhookEvent table
- Allows Stripe to retry the webhook
- Response includes confirmation

**Verification**:
- [ ] Event record removed from database
- [ ] Allows reprocessing by Stripe
- [ ] Returns success confirmation
- [ ] Can query missing event

---

## 7. Bid Validation Testing

### Test Setup
- **Endpoint**: POST `/api/contractor/requests/{id}/bid`
- **Validation Schema**: Uses bidValidationSchema from bid-validation.ts

### Test Cases

#### 7.1 Valid Budget Formats
**Scenario**: Submit bids with various budget formats

| Input | Expected | Result |
|-------|----------|--------|
| `"$5000"` | Valid | 200 OK |
| `"5000"` | Valid | 200 OK |
| `"$5,000"` | Valid | 200 OK |
| `"5,000"` | Valid | 200 OK |
| `"$5,000 AUD"` | Valid | 200 OK |
| `"$100"` | Valid (min) | 200 OK |
| `"$1000000"` | Valid (max) | 200 OK |
| `"$99"` | Invalid (below min) | 400 |
| `"$2000000"` | Invalid (above max) | 400 |
| `"abc"` | Invalid | 400 |

**Verification**:
- [ ] All valid formats accepted
- [ ] All invalid formats rejected with clear error
- [ ] Boundary values (100, 1M) accepted

#### 7.2 Valid Timeline Formats
**Scenario**: Submit bids with various timeline formats

| Input | Expected | Result |
|-------|----------|--------|
| `"ASAP"` | Valid | 200 OK |
| `"Urgent"` | Valid | 200 OK |
| `"2 weeks"` | Valid | 200 OK |
| `"14 days"` | Valid | 200 OK |
| `"2025-02-15"` | Valid | 200 OK |
| `"Monday"` | Valid | 200 OK |
| `"24 hours"` | Valid | 200 OK |
| `"xyz"` | Invalid | 400 |
| `""` | Invalid | 400 |

**Verification**:
- [ ] All valid timelines accepted
- [ ] Invalid formats rejected
- [ ] Error message clear

#### 7.3 Valid Estimated Hours
**Scenario**: Submit bids with various hour formats

| Input | Expected | Result |
|-------|----------|--------|
| `"8"` | Valid | 200 OK |
| `"8.5"` | Valid | 200 OK |
| `"0.25"` | Valid (15 min) | 200 OK |
| `"40 hours"` | Valid | 200 OK |
| (omitted) | Valid (optional) | 200 OK |
| `"0"` | Invalid | 400 |
| `"-8"` | Invalid | 400 |
| `"10000"` | Invalid (>max) | 400 |
| `"abc"` | Invalid | 400 |

**Verification**:
- [ ] All valid hours accepted
- [ ] Invalid formats rejected
- [ ] Optional field works
- [ ] Parse function converts to numbers

#### 7.4 Valid Start Dates
**Scenario**: Submit bids with various date formats

| Input | Expected | Result |
|-------|----------|--------|
| `"2025-02-15"` (future) | Valid | 200 OK |
| `"02/15/2025"` | Valid | 200 OK |
| `"15-02-2025"` | Valid | 200 OK |
| (omitted) | Valid (optional) | 200 OK |
| Yesterday's date | Invalid | 400 |
| `"2025-13-01"` | Invalid | 400 |
| `"2025-02-30"` | Invalid | 400 |
| `"invalid"` | Invalid | 400 |

**Verification**:
- [ ] All valid formats accepted
- [ ] Past dates rejected
- [ ] Optional field works
- [ ] Parse function converts to ISO format

#### 7.5 Message Validation
**Scenario**: Submit bids with various message lengths

| Input | Expected | Result |
|-------|----------|--------|
| 10+ characters | Valid | 200 OK |
| Less than 10 | Invalid | 400 |
| Max 5000 chars | Valid | 200 OK |
| More than 5000 | Invalid | 400 |
| Only whitespace | Invalid | 400 |

**Verification**:
- [ ] Minimum length enforced
- [ ] Maximum length enforced
- [ ] Whitespace trimmed for validation
- [ ] Clear error messages

---

## 8. Comprehensive End-to-End Scenarios

### Scenario 8.1: Complete Happy Path
**Steps**:
1. Client submits claim (CAPTCHA passes)
2. Contractor receives notification
3. Contractor views request
4. Contractor submits bid
5. Bid creates payment intent
6. Payment webhook processes
7. Payment confirmed

**Verification Checklist**:
- [ ] Claim created in database
- [ ] Service request created
- [ ] Contractor can view request
- [ ] Bid creation succeeds
- [ ] Duplicate bid rejected (409)
- [ ] Rate limit enforced
- [ ] Payment webhook processes
- [ ] Idempotent processing confirmed
- [ ] Monitoring shows success

### Scenario 8.2: Error Recovery Path
**Steps**:
1. Client submits claim (invalid CAPTCHA)
2. CAPTCHA failures tracked
3. Rate limiting applied
4. Client waits and retries
5. Successful on retry

**Verification Checklist**:
- [ ] Failures tracked
- [ ] Penalties applied
- [ ] Reset time calculated
- [ ] Retry allowed after timeout
- [ ] Success recorded
- [ ] Counter resets

### Scenario 8.3: Webhook Failure & Recovery
**Steps**:
1. Stripe sends webhook
2. Database temporarily unavailable
3. Webhook retries automatically
4. Database comes back online
5. Webhook succeeds on retry

**Verification Checklist**:
- [ ] Transient failures detected
- [ ] Retry logic activated
- [ ] Exponential backoff applied
- [ ] Eventually succeeds
- [ ] Idempotency prevents duplicates
- [ ] Payment status correct

---

## 9. Performance & Load Testing

### 9.1 Rate Limit Performance
- **Test**: 1000 contractors, 5 bids each simultaneously
- **Expected**: All within limit succeed, others fail gracefully
- **Metrics**: Response times < 200ms

### 9.2 CAPTCHA Performance
- **Test**: 100 concurrent CAPTCHA verifications
- **Expected**: All complete in < 1 second
- **Metrics**: P95 < 500ms

### 9.3 Webhook Processing
- **Test**: 50 webhooks/second for 10 minutes
- **Expected**: All processed correctly, no duplicates
- **Metrics**: Processing lag < 5 seconds

---

## 10. Security Validation

### 10.1 SQL Injection Prevention
- **Test**: Attempt SQL injection in bid fields
- **Expected**: Sanitized by Prisma, no SQL execution
- **Verification**: [ ] Validation prevents injection

### 10.2 XSS Prevention
- **Test**: HTML/JavaScript in bid message
- **Expected**: Stored as text, escaped on display
- **Verification**: [ ] No script execution

### 10.3 CSRF Protection
- **Test**: Cross-site form submission
- **Expected**: Requires authentication, csrf token validated
- **Verification**: [ ] Request denied

### 10.4 Rate Limit Bypass Prevention
- **Test**: Manipulate rate limit headers/tokens
- **Expected**: Server-side validation enforces limits
- **Verification**: [ ] Bypass attempts blocked

---

## 11. Testing Checklist

### Pre-Testing
- [ ] Database migrations applied
- [ ] Environment variables configured
- [ ] Redis (rate limiting) available
- [ ] Test accounts created
- [ ] Test data prepared

### Unit Tests
- [ ] Run: `npm run test -- bid-validation.test.ts`
- [ ] All tests pass
- [ ] Coverage > 80%

- [ ] Run: `npm run test -- rate-limit.test.ts`
- [ ] All tests pass
- [ ] Coverage > 80%

### Integration Tests
- [ ] Run: `npm run test:integration`
- [ ] Bid submission endpoint tests pass
- [ ] Rate limiting tests pass
- [ ] Database constraints verified

### Manual Testing
- [ ] Follow Scenario 8.1 (Happy Path)
- [ ] Follow Scenario 8.2 (Error Recovery)
- [ ] Follow Scenario 8.3 (Webhook Recovery)
- [ ] Test all validation cases (7.1 - 7.5)
- [ ] Test CAPTCHA sequences
- [ ] Test rate limiting

### Production Testing (Staging)
- [ ] Deploy to staging environment
- [ ] Run full test suite
- [ ] Verify monitoring dashboard
- [ ] Test webhook retry logic
- [ ] Verify alerting system
- [ ] Load test critical paths
- [ ] Security scan

---

## 12. Sign-Off

### Developer Sign-Off
- [ ] All code changes reviewed
- [ ] All tests passing locally
- [ ] No console errors or warnings
- [ ] Database migrations clean
- [ ] Code follows style guide

### QA Sign-Off
- [ ] All manual tests completed
- [ ] All acceptance criteria met
- [ ] No critical bugs found
- [ ] Performance acceptable
- [ ] Security validated

### Deployment Sign-Off
- [ ] Staging tests passed
- [ ] Monitoring configured
- [ ] Alerts configured
- [ ] Rollback plan ready
- [ ] Ready for production deployment

---

## 13. Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| 409 Conflict on first bid | Database constraint already has bid | Clear test data, retry |
| Rate limit blocking all requests | Key collision in Redis | Check rate limit key format |
| Webhook not processing | Database connection timeout | Check database availability |
| CAPTCHA tests failing | Mock token not enabled in dev | Verify NODE_ENV === 'development' |
| Monitoring dashboard empty | Events not being recorded | Check StripeWebhookEvent table |

---

## 14. Success Criteria

Phase 3 testing is complete when:

- ✅ All unit tests passing (> 80% coverage)
- ✅ All integration tests passing
- ✅ Manual test scenarios completed successfully
- ✅ No P0 or P1 bugs found
- ✅ Performance metrics acceptable
- ✅ Security validation passed
- ✅ Monitoring and alerting operational
- ✅ Documentation complete
- ✅ Team sign-off obtained

**Current Status**: Ready for execution

---

**Last Updated**: January 10, 2026
**Next Phase**: Deploy to Production
