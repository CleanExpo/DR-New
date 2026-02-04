# Manual QA Testing Plan - DR-NRPG Platform

**Date:** 2026-02-04
**Project:** Disaster Recovery Australia (DR-NRPG Platform)
**Test Cycle:** Pre-Launch QA (BACKLOG-001)
**Status:** IN PROGRESS
**Tester:** Engineering Team
**Environment:** Staging / Local Development

---

## Executive Summary

Comprehensive manual QA testing to validate all critical user flows before production launch. This plan covers 9 testing areas across contractor and client journeys, ensuring the platform meets quality and functionality standards.

**Priority:** P0 (Critical - Blocking Launch)
**Estimated Effort:** 16-24 hours (2-3 days)
**Dependencies:** None - can start immediately

---

## Test Environment Setup

### Prerequisites

- [ ] Local development environment running
- [ ] Staging environment accessible (https://disasterrecovery.com.au)
- [ ] Test database with seed data
- [ ] Stripe test mode configured
- [ ] Email testing service configured (or manual email checking)
- [ ] Multiple browsers installed (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices or emulators available
- [ ] Admin test account credentials
- [ ] Contractor test account credentials
- [ ] Client test account credentials

### Test Data Setup

```bash
# Reset test database
cd apps/web
npx prisma migrate reset --force

# Generate test data
npx prisma db seed
```

**Test Accounts:**
- **Admin:** admin@disasterrecovery.com.au / Test123!
- **Contractor:** contractor-test@test.com / Test123!
- **Client:** client-test@test.com / Test123!

---

## Testing Areas

### 1. Contractor Onboarding Flow ✅ AUTOMATED

**Status:** Covered by E2E tests (`apps/web/e2e/contractor-flow.spec.ts`)

**Test Coverage:**
- ✅ Registration and profile setup
- ✅ Document upload and license verification
- ✅ Service area configuration
- ✅ Admin verification process
- ✅ Profile analytics tracking

**To Run:**
```bash
cd apps/web
npm run test:e2e -- contractor-flow.spec.ts
```

**Manual Verification Still Needed:**
- [ ] Visual inspection of UI/UX during onboarding
- [ ] File upload validation (actual documents)
- [ ] Error message clarity and helpfulness
- [ ] Mobile responsiveness of onboarding forms
- [ ] Email notifications sent during onboarding

---

### 2. Client Claim Submission Flow ⚠️ PARTIAL AUTOMATION

**Status:** Partially covered by E2E tests (`tests/e2e/claim-intake/claim-wizard.spec.ts`)

**Manual Test Cases:**

#### TC-CS-001: Submit Water Damage Claim
**Priority:** P0
**Steps:**
1. Login as client (client-test@test.com)
2. Navigate to "Submit Claim" or "Get Help"
3. Fill claim form:
   - Disaster Type: Water Damage
   - Property Address: 123 Test Street, Sydney, NSW 2000
   - Description: "Burst pipe in kitchen causing flooding"
   - Urgency: Emergency
   - Insurance: Yes, Insurance Provider: QBE
   - Policy Number: POL123456
4. Upload photos (if applicable)
5. Submit claim

**Expected Results:**
- ✅ Form validates all required fields
- ✅ Success message displayed
- ✅ Claim reference number provided
- ✅ Redirected to claim tracking page
- ✅ Email confirmation sent to client

**Test Data:**
| Field | Value |
|-------|-------|
| Claim Type | Water Damage |
| Address | 123 Test St, Sydney NSW 2000 |
| Urgency | Emergency |
| Insurance | QBE - POL123456 |

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-CS-002: Submit Fire Damage Claim
**Priority:** P0
**Steps:**
1. Login as client
2. Navigate to claim submission
3. Fill claim form:
   - Disaster Type: Fire Damage
   - Property Address: 456 Test Ave, Melbourne VIC 3000
   - Description: "Kitchen fire with smoke damage throughout house"
   - Urgency: High
   - Insurance: No
4. Submit claim

**Expected Results:**
- ✅ Form accepts "No Insurance" selection
- ✅ Claim submitted successfully
- ✅ Different contractors matched based on fire damage specialty
- ✅ Email sent with claim details

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-CS-003: Claim Validation - Missing Required Fields
**Priority:** P1
**Steps:**
1. Login as client
2. Navigate to claim submission
3. Leave required fields empty
4. Attempt to submit

**Expected Results:**
- ✅ Form validation prevents submission
- ✅ Clear error messages displayed
- ✅ Required fields highlighted
- ✅ User can correct and resubmit

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

### 3. Contractor Claim Response Flow ⚠️ NEEDS TESTING

**Manual Test Cases:**

#### TC-CR-001: Contractor Accepts Claim
**Priority:** P0
**Steps:**
1. Login as admin
2. Create a public claim manually or use test claim
3. Match claim to test contractor
4. Login as contractor (contractor-test@test.com)
5. Navigate to "My Claims" or notifications
6. View claim details
7. Click "Accept Job"
8. Confirm acceptance

**Expected Results:**
- ✅ Claim status changes to "CONTRACTOR_ASSIGNED"
- ✅ Client receives email notification with contractor details
- ✅ Contractor receives confirmation email
- ✅ Other contractors notified claim is no longer available
- ✅ Claim appears in contractor's "Active Jobs"

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-CR-002: Contractor Declines Claim
**Priority:** P1
**Steps:**
1. Login as contractor
2. View pending claim
3. Click "Decline Job"
4. Provide decline reason (optional)
5. Confirm decline

**Expected Results:**
- ✅ Claim status updated
- ✅ Decline reason saved
- ✅ System attempts to match backup contractors
- ✅ Decline tracked in contractor rotation stats
- ✅ Contractor no longer sees claim

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-CR-003: Response Deadline Expiry
**Priority:** P2
**Steps:**
1. Create claim matched to contractor
2. Wait for response deadline to pass (or manually set expired deadline)
3. Login as contractor
4. Attempt to accept expired claim

**Expected Results:**
- ✅ System prevents acceptance of expired claim
- ✅ Clear message: "Response deadline has passed"
- ✅ Claim automatically escalated to backup contractors
- ✅ Analytics track missed response

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

### 4. Payment Processing (Stripe Test Mode) ⚠️ CRITICAL

**Manual Test Cases:**

#### TC-PAY-001: Successful Payment
**Priority:** P0
**Environment:** Stripe Test Mode

**Test Credit Cards:**
- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Requires Auth: 4000 0025 0000 3155

**Steps:**
1. Login as client
2. Navigate to payment for completed job
3. Click "Pay Invoice"
4. Enter test card: 4242 4242 4242 4242
5. Expiry: 12/34, CVC: 123
6. Submit payment

**Expected Results:**
- ✅ Payment processed successfully
- ✅ Success message displayed
- ✅ Invoice status updated to "PAID"
- ✅ Contractor receives payment notification
- ✅ Receipt emailed to client
- ✅ Transaction logged in Stripe Dashboard

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-PAY-002: Declined Payment
**Priority:** P1
**Steps:**
1. Login as client
2. Navigate to payment
3. Enter declined test card: 4000 0000 0000 0002
4. Submit payment

**Expected Results:**
- ✅ Payment declined gracefully
- ✅ Clear error message: "Your card was declined"
- ✅ User prompted to try different payment method
- ✅ Invoice remains unpaid
- ✅ No charge recorded in Stripe

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-PAY-003: Payment Requires 3D Secure
**Priority:** P2
**Steps:**
1. Use test card requiring authentication: 4000 0025 0000 3155
2. Complete 3D Secure flow in test modal

**Expected Results:**
- ✅ 3D Secure modal displayed
- ✅ User can complete authentication
- ✅ Payment processed after auth
- ✅ Proper error handling if auth fails

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

### 5. Email Notifications ⚠️ CRITICAL

**Email Channels to Test:**

#### 1. Client Notifications

| Trigger | Email Subject | Recipient | Status |
|---------|---------------|-----------|--------|
| Claim submitted | "✅ Claim Submitted Successfully" | Client | [ ] SENT |
| Contractor assigned | "🎉 Contractor Assigned to Your Claim" | Client | [ ] SENT |
| Booking confirmed | "📅 Booking Confirmation" | Client | [ ] SENT |
| Review request | "⭐ How was your experience?" | Client | [ ] SENT |
| Account status change | Account notification | Client | [ ] SENT |

#### 2. Contractor Notifications

| Trigger | Email Subject | Recipient | Status |
|---------|---------------|-----------|--------|
| New claim matched | "🔔 New Job Opportunity" | Contractor | [ ] SENT |
| Verification approved | "✅ Verification Approved" | Contractor | [ ] SENT |
| Assignment confirmed | "✓ Job Assignment Confirmed" | Contractor | [ ] SENT |
| Booking requested | "New Booking Request" | Contractor | [ ] SENT |
| Review received | "New Review Received" | Contractor | [ ] SENT |

**Manual Test:**

#### TC-EMAIL-001: Verify All Email Templates
**Priority:** P0
**Steps:**
1. Trigger each email event (claim submission, contractor assignment, etc.)
2. Check inbox for email delivery
3. Verify email content:
   - Correct subject line
   - Proper recipient
   - Accurate data (claim ID, contractor name, etc.)
   - Links functional
   - Images display correctly
   - Mobile-friendly formatting
   - Unsubscribe link (if applicable)

**Email Testing Tools:**
- Mailtrap (if configured)
- Real email addresses
- Gmail, Outlook, Apple Mail testing

**Expected Results:**
- ✅ All 6 client emails delivered
- ✅ All 5 contractor emails delivered
- ✅ Proper formatting and branding
- ✅ Links work correctly
- ✅ No broken images
- ✅ Mobile-responsive design

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

### 6. SMS Notifications ⚠️ OPTIONAL

**Note:** Platform may not have SMS configured yet. If not, mark as DEFERRED.

#### TC-SMS-001: Contractor Emergency Notification
**Priority:** P2
**Steps:**
1. Submit emergency claim (Urgency: Emergency)
2. Verify contractor receives SMS notification

**Expected Results:**
- ✅ SMS sent to contractor's mobile
- ✅ Contains claim reference and urgency
- ✅ Link to view claim details

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED [ ] DEFERRED

---

### 7. Mobile Responsiveness ✅ PARTIAL AUTOMATION

**Automated Tests:** `tests/e2e/mobile/responsive.spec.ts`

**Manual Testing Required:**

#### TC-MOB-001: iPhone 13 Pro (390x844)
**Priority:** P0
**Pages to Test:**
- [ ] Home page
- [ ] Contractor directory
- [ ] Contractor profile page
- [ ] Claim submission form
- [ ] Client dashboard
- [ ] Contractor dashboard
- [ ] Admin verification dashboard

**Checks:**
- [ ] No horizontal scrolling
- [ ] Touch targets ≥ 44x44px
- [ ] Text readable without zooming
- [ ] Forms usable on mobile
- [ ] Navigation accessible
- [ ] Modals don't overflow

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-MOB-002: iPad Air (820x1180)
**Priority:** P1
**Steps:**
1. Test same pages as iPhone
2. Verify tablet-optimized layouts

**Expected Results:**
- ✅ Responsive layouts adapt properly
- ✅ Uses available screen space efficiently
- ✅ No desktop-only features broken

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-MOB-003: Samsung Galaxy S21 (360x800)
**Priority:** P1
**Steps:**
1. Test on Android device or Chrome DevTools
2. Check Android-specific UI behaviors

**Expected Results:**
- ✅ Works on Android devices
- ✅ Touch interactions smooth
- ✅ No iOS-specific bugs

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

### 8. Browser Compatibility ⚠️ CRITICAL

**Browsers to Test:**

#### Desktop Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest (v121+) | [ ] PASS / [ ] FAIL |
| Firefox | Latest (v122+) | [ ] PASS / [ ] FAIL |
| Safari | Latest (macOS) | [ ] PASS / [ ] FAIL |
| Edge | Latest (v121+) | [ ] PASS / [ ] FAIL |

#### Mobile Browsers

| Browser | Platform | Status |
|---------|----------|--------|
| Safari | iOS 16+ | [ ] PASS / [ ] FAIL |
| Chrome | Android 12+ | [ ] PASS / [ ] FAIL |

**Test Cases Per Browser:**

#### TC-BROWSER-001: Critical User Flows
**Priority:** P0
**Steps (repeat in each browser):**
1. Register new account
2. Login
3. Submit claim (client) OR complete profile (contractor)
4. Navigate between pages
5. Test form submissions
6. Test image uploads
7. Logout

**Known Issues to Watch:**
- [ ] CSS layout issues
- [ ] JavaScript errors in console
- [ ] Form submission problems
- [ ] File upload compatibility
- [ ] Date picker functionality
- [ ] Dropdown/select behavior

**Status:**
- Chrome: [ ] PASS [ ] FAIL
- Firefox: [ ] PASS [ ] FAIL
- Safari: [ ] PASS [ ] FAIL
- Edge: [ ] PASS [ ] FAIL

---

### 9. Multi-Tenant Isolation ⚠️ SECURITY CRITICAL

**Note:** Platform uses workspace-based multi-tenancy.

#### TC-TENANT-001: Contractor Data Isolation
**Priority:** P0
**Steps:**
1. Create Workspace A with Contractor 1
2. Create Workspace B with Contractor 2
3. Login as Contractor 1
4. Verify cannot see Contractor 2's data:
   - Claims
   - Clients
   - Bookings
   - Analytics
5. Try to access Contractor 2's data via URL manipulation

**Expected Results:**
- ✅ Contractor 1 sees only their workspace data
- ✅ API returns 404 for cross-workspace requests
- ✅ RLS policies enforced at database level
- ✅ No data leakage in logs or errors

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-TENANT-002: Admin Access Control
**Priority:** P0
**Steps:**
1. Login as admin for Workspace A
2. Verify can manage Workspace A contractors
3. Try to access Workspace B admin routes
4. Verify proper access control

**Expected Results:**
- ✅ Admin sees only their workspace
- ✅ Cannot access other workspaces
- ✅ Super admin (if exists) sees all workspaces

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

#### TC-TENANT-003: Database RLS Verification
**Priority:** P0
**Steps:**
1. Run RLS test suite: `npm run test:integration -- rls-tenant-isolation.test.ts`
2. Verify all tests pass
3. Check test coverage report

**Expected Results:**
- ✅ All RLS tests pass
- ✅ 44 tables with RLS policies
- ✅ Tenant isolation enforced

**Status:** [ ] PASS [ ] FAIL [ ] BLOCKED

---

## Test Execution Schedule

### Day 1: Automated Tests + Core Flows (8 hours)

**Morning (4 hours):**
- [x] Run E2E test suite
- [ ] Execute contractor onboarding tests
- [ ] Test claim submission flow
- [ ] Test contractor response flow

**Afternoon (4 hours):**
- [ ] Test payment processing (Stripe)
- [ ] Verify email notifications
- [ ] Test mobile responsiveness

### Day 2: Browser Compatibility + Security (8 hours)

**Morning (4 hours):**
- [ ] Test Chrome compatibility
- [ ] Test Firefox compatibility
- [ ] Test Safari compatibility
- [ ] Test Edge compatibility

**Afternoon (4 hours):**
- [ ] Multi-tenant isolation testing
- [ ] Security access control tests
- [ ] Edge case testing

### Day 3: Bug Fixes + Regression (8 hours)

**All Day:**
- [ ] Fix bugs discovered in Days 1-2
- [ ] Regression testing on fixes
- [ ] Final smoke test
- [ ] Document results

---

## Bug Tracking Template

### Bug Report Format

```markdown
**Bug ID:** QA-001
**Severity:** Critical / High / Medium / Low
**Test Case:** TC-CS-001
**Component:** Claim Submission
**Environment:** Staging / Chrome 121

**Description:**
[Clear description of the bug]

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Result:**
[What should happen]

**Actual Result:**
[What actually happens]

**Screenshots:**
[Attach screenshots if applicable]

**Impact:**
[User impact and business impact]

**Suggested Fix:**
[Optional: developer suggestion]

**Status:** Open / In Progress / Fixed / Closed
```

---

## Test Results Summary

### Overall Status

- **Total Test Cases:** 25
- **Passed:** 0
- **Failed:** 0
- **Blocked:** 0
- **Skipped:** 0
- **In Progress:** 25

### Coverage by Area

| Area | Test Cases | Pass | Fail | Status |
|------|-----------|------|------|--------|
| Contractor Onboarding | 1 (automated) | 0 | 0 | ⏳ PENDING |
| Claim Submission | 3 | 0 | 0 | ⏳ PENDING |
| Contractor Response | 3 | 0 | 0 | ⏳ PENDING |
| Payment Processing | 3 | 0 | 0 | ⏳ PENDING |
| Email Notifications | 1 | 0 | 0 | ⏳ PENDING |
| SMS Notifications | 1 | 0 | 0 | ⏳ PENDING |
| Mobile Responsiveness | 3 | 0 | 0 | ⏳ PENDING |
| Browser Compatibility | 6 | 0 | 0 | ⏳ PENDING |
| Multi-Tenant Isolation | 3 | 0 | 0 | ⏳ PENDING |

---

## Exit Criteria

**BACKLOG-001 can be marked COMPLETE when:**

- ✅ All automated E2E tests passing
- ✅ All critical (P0) manual test cases passed
- ✅ All high (P1) test cases passed or documented as known issues
- ✅ Email notifications verified working
- ✅ Payment processing tested in Stripe test mode
- ✅ Mobile responsiveness verified on 3+ devices
- ✅ Cross-browser compatibility confirmed (Chrome, Firefox, Safari, Edge)
- ✅ Multi-tenant isolation verified secure
- ✅ All critical bugs resolved
- ✅ Test results documented
- ✅ Known issues logged for post-launch

---

## Risks & Mitigation

### High Risks

1. **Payment Integration Failure**
   - **Risk:** Stripe test mode not configured
   - **Mitigation:** Set up Stripe test account before testing
   - **Status:** ⏳ PENDING

2. **Email Service Not Configured**
   - **Risk:** Email notifications can't be tested
   - **Mitigation:** Configure Mailtrap or test email service
   - **Status:** ⏳ PENDING

3. **Multi-Tenant Data Leakage**
   - **Risk:** Critical security vulnerability
   - **Mitigation:** Thorough RLS policy testing
   - **Priority:** CRITICAL

### Medium Risks

1. **Mobile Testing Limited**
   - **Risk:** May miss device-specific bugs
   - **Mitigation:** Test on real devices when possible

2. **Browser Compatibility Issues**
   - **Risk:** Platform broken in some browsers
   - **Mitigation:** Test early, fix quickly

---

## Next Steps After QA

Once BACKLOG-001 is complete:

1. **BACKLOG-002:** Security Penetration Testing (40 hours)
2. **BACKLOG-003:** Load Testing & Performance (16 hours)
3. **BACKLOG-008:** Production Deployment Dry Run (4 hours)
4. **BACKLOG-009:** Launch Day Deployment

---

## Appendix

### Useful Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npm run test:e2e -- contractor-flow.spec.ts

# Run E2E tests in UI mode (interactive)
npm run test:e2e:ui

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run all tests with coverage
npm run test:coverage

# Start development server
npm run dev

# Build for production
npm run build

# Database commands
npx prisma migrate reset  # Reset database
npx prisma db seed        # Seed test data
npx prisma studio         # Open database GUI
```

### Test Environment URLs

- **Local:** http://localhost:3000
- **Staging:** https://disasterrecovery.com.au (Vercel Preview)
- **Production:** https://disasterrecovery.com.au (After launch)

### Stripe Test Mode Dashboard

- **URL:** https://dashboard.stripe.com/test
- **Test Cards:** https://stripe.com/docs/testing#cards

---

**Document Status:** IN PROGRESS
**Created:** 2026-02-04
**Last Updated:** 2026-02-04
**Next Review:** After each test session
**Owner:** Engineering Team
