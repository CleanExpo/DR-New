# Manual Testing Guide for P0 Blocker Fixes

## Testing Checklist for Vercel Deployment

Once deployed to production, follow these tests to verify both blockers are fixed.

---

## TEST 1: Dashboard Session Timeout Fix

### Test Scenario 1a: Session Loads Successfully
**What to test:** Dashboard loads normally when NEXTAUTH_SECRET is set
**Steps:**
1. Ensure NEXTAUTH_SECRET is set in Vercel environment
2. Navigate to https://disaster-recovery-seven.vercel.app/dashboard
3. Either see dashboard OR be redirected to login (no infinite spinner)
4. Expected time: <3 seconds for authenticated users, <10 seconds max

**Pass Criteria:**
- ✅ Dashboard loads without infinite spinner
- ✅ Dashboard appears within 10 seconds OR redirects to login
- ✅ No blank white screen with spinning loader forever

---

### Test Scenario 1b: Session Timeout Fallback
**What to test:** Dashboard redirects after 10 seconds if session fails
**Prerequisites:** Temporarily set NEXTAUTH_SECRET to invalid value in Vercel
**Steps:**
1. Modify Vercel NEXTAUTH_SECRET to invalid value: `INVALID_SECRET_FOR_TESTING`
2. Redeploy application
3. Navigate to https://disaster-recovery-seven.vercel.app/dashboard
4. Wait 10 seconds and observe

**Expected Behavior:**
- ✅ See "Initializing session..." message for first 10 seconds
- ✅ Message says "If this takes more than 10 seconds, you'll be redirected to login"
- ✅ After 10 seconds, redirect to login page with `?error=session_timeout`
- ✅ See error boundary page with "Session Error" message
- ✅ Option to "Go to Login" is available

**Pass Criteria:**
- ✅ Timeout triggers after 10 seconds
- ✅ Redirect includes error parameter
- ✅ Error boundary displays helpful message
- ✅ No infinite loading state

---

### Test Scenario 1c: Error Boundary Display
**What to test:** Error boundary shows appropriate error message
**Steps:**
1. After being redirected due to timeout, observe error page
2. Check message content and layout

**Expected Behavior:**
- ✅ Red icon with alert symbol
- ✅ Title: "Session Error"
- ✅ Message: "Your session could not be initialized. Please log in again to continue."
- ✅ Button: "Go to Login"
- ✅ Support message at bottom

**Pass Criteria:**
- ✅ Professional-looking error page
- ✅ Clear explanation of problem
- ✅ Clear action button to fix it

---

## TEST 2: Form Navigation Fix

### Test Scenario 2a: Step 1 - Form Loads Without Errors
**What to test:** Form loads without disabled button
**Steps:**
1. Navigate to https://disaster-recovery-seven.vercel.app/claim/step-1
2. Observe initial page state
3. Check if "Next: Location & Contact" button is enabled or disabled

**Expected Behavior:**
- ✅ Page loads without showing validation errors
- ✅ Form fields are empty (no error messages visible)
- ✅ "Next" button is DISABLED initially (form not filled)
- ✅ No red error messages under fields

**Pass Criteria:**
- ✅ Button is disabled (as expected for empty form)
- ✅ No premature error messages
- ✅ Clean, error-free form

---

### Test Scenario 2b: Step 1 - Button Enables on Valid Input
**What to test:** Button enables when form becomes valid
**Steps:**
1. On Step 1 page, fill in required fields:
   - Select disaster type (dropdown)
   - Select incident date
   - Select "Yes" or "No" for "Is this ongoing?"
   - Select "Yes" or "No" for "Is there immediate danger?"
2. Watch button state as you fill fields

**Expected Behavior:**
- ✅ After filling all required fields, "Next" button ENABLES
- ✅ Button changes from gray/disabled to colored/enabled
- ✅ Button becomes clickable
- ✅ No validation errors appear

**Pass Criteria:**
- ✅ Button enables when form is valid
- ✅ Button enables AFTER user fills fields
- ✅ No errors shown during filling

---

### Test Scenario 2c: Step 1 - Button Disables on Invalid Input
**What to test:** Button disables when form becomes invalid
**Steps:**
1. Fill form as in 2b (button should be enabled)
2. Clear one required field
3. Observe button state

**Expected Behavior:**
- ✅ After clearing a required field, button DISABLES
- ✅ Button becomes unclickable
- ✅ Appropriate error message appears under field

**Pass Criteria:**
- ✅ Button disables when form invalid
- ✅ Validation feedback is immediate
- ✅ User knows which field is causing problem

---

### Test Scenario 2d: Progress to Step 2
**What to test:** Can click Next button and proceed to Step 2
**Steps:**
1. Fill all Step 1 fields with valid data
2. Click "Next: Location & Contact" button
3. Observe navigation

**Expected Behavior:**
- ✅ Button click succeeds
- ✅ Navigates to /claim/step-2
- ✅ Step 2 form loads successfully
- ✅ Submitted data is persisted (if page refreshed, data returns)

**Pass Criteria:**
- ✅ Navigation works
- ✅ Step 2 page loads
- ✅ Form data saved to localStorage

---

### Test Scenario 2e: Step 2 - Same Button Behavior
**What to test:** Step 2 has same working button logic
**Steps:**
1. On Step 2, observe initial button state
2. Fill fields gradually, watching button state
3. Try clearing fields

**Expected Behavior:**
- ✅ Same pattern as Step 1:
  - Button disabled initially
  - Button enables when valid
  - Button disables when invalid

**Pass Criteria:**
- ✅ Consistent behavior across form steps
- ✅ Button logic working correctly
- ✅ Real-time validation feedback

---

### Test Scenario 2f: Complete Form and Submit
**What to test:** Can submit completed form and save to database
**Steps:**
1. Fill all 3 steps of the form with valid data:
   - Step 1: Disaster type, date, ongoing status, emergency status
   - Step 2: Address, suburb, postcode, name, phone, email
   - Step 3: Damage description, insurance status, complete CAPTCHA
2. Click Submit button
3. Observe response

**Expected Behavior:**
- ✅ Form submits successfully
- ✅ See success message with claim ID
- ✅ Response includes database record ID
- ✅ HTTP 201 response (created)

**Pass Criteria:**
- ✅ Form submission works end-to-end
- ✅ Data saved to database
- ✅ User sees confirmation

---

### Test Scenario 2g: Verify Data in Database
**What to test:** Submitted claim data appears in database
**Steps:**
1. After successful form submission, open Supabase dashboard
2. Navigate to Database > public > public_claim
3. Look for recent record with submitted data

**Expected Behavior:**
- ✅ New row exists in `public_claim` table
- ✅ Contains all submitted data:
  - clientName, clientEmail, clientPhone
  - propertyAddress, suburb, postcode
  - disasterType, incidentDate
  - damageDescription, hasInsurance
  - priority set to submitted priority level
  - status set to 'PENDING'

**Pass Criteria:**
- ✅ Data persists in database
- ✅ All fields correctly saved
- ✅ No data truncation or type errors

---

## TEST 3: Integration Testing

### Test Scenario 3a: User Session Recovery
**What to test:** Dashboard recovers when session loads within timeout
**Steps:**
1. Restore valid NEXTAUTH_SECRET in Vercel
2. Redeploy
3. Login with valid credentials
4. Navigate to /dashboard
5. Check if dashboard loads normally

**Expected Behavior:**
- ✅ Dashboard loads within timeout period
- ✅ Session initializes properly
- ✅ Redirect does NOT occur
- ✅ Dashboard displays as expected

**Pass Criteria:**
- ✅ Valid sessions work normally
- ✅ No false-positive redirects
- ✅ Timeout only triggers for real failures

---

### Test Scenario 3b: Multiple Form Submissions
**What to test:** Form can be used multiple times without issues
**Steps:**
1. Submit form (Test 2f)
2. Navigate back to Step 1
3. Submit different data
4. Check both records in database

**Expected Behavior:**
- ✅ Both submissions succeed
- ✅ Both records appear in database
- ✅ No data corruption or overwriting
- ✅ Each has unique ID and timestamp

**Pass Criteria:**
- ✅ Multiple submissions work reliably
- ✅ No data loss or conflicts
- ✅ Rate limiting still works

---

### Test Scenario 3c: Error Recovery
**What to test:** System recovers from transient errors
**Steps:**
1. Try to submit form with database temporarily unavailable (stop Supabase)
2. Observe error handling
3. Restore database connection
4. Try again

**Expected Behavior:**
- ✅ First submission shows error: "Failed to save claim to database"
- ✅ HTTP 500 response
- ✅ After database restored, submission succeeds
- ✅ No data loss

**Pass Criteria:**
- ✅ Errors handled gracefully
- ✅ User sees meaningful message
- ✅ Can retry after fixing issue

---

## Quick Reference: Pass/Fail Criteria

### Dashboard Fixes
- [ ] Session loads without infinite spinner
- [ ] Dashboard loads in <10 seconds or redirects
- [ ] Timeout triggers after exactly 10 seconds
- [ ] Error boundary shows helpful message
- [ ] Login button on error page works

### Form Fixes
- [ ] Step 1 loads without validation errors
- [ ] Button disabled initially, enables when valid
- [ ] Button enables/disables correctly as user types
- [ ] Can progress through all 3 steps
- [ ] Form submit creates database record
- [ ] Data persists in public_claim table
- [ ] Multiple submissions work correctly

### Overall
- [ ] No infinite loading states
- [ ] No form submission errors
- [ ] All user data properly persisted
- [ ] Error messages are helpful
- [ ] System recovers from failures

---

## Troubleshooting

### Issue: Dashboard still shows infinite spinner after 10 seconds
**Cause:** NEXTAUTH_SECRET not set or incorrect
**Fix:**
1. Verify NEXTAUTH_SECRET in Vercel: Settings > Environment Variables
2. If missing, generate new: `openssl rand -base64 32`
3. Add to Vercel production environment
4. Redeploy application

### Issue: Form button never enables
**Cause:** Validation still failing on seemingly valid input
**Fix:**
1. Check browser console for validation errors
2. Verify all required fields are filled
3. Check for type mismatches (dates, numbers)
4. Try clearing browser cache and reloading

### Issue: Form submits but data not in database
**Cause:** Prisma migration not applied or PublicClaim table missing
**Fix:**
1. Check Supabase Tables: should see `public_claim` table
2. If missing, run Prisma migration: `npx prisma migrate deploy`
3. Or redeploy from Vercel (auto-applies migrations)

### Issue: Dashboard error page not showing
**Cause:** Error boundary not catching errors
**Fix:**
1. Check browser console for JavaScript errors
2. Verify app/dashboard/error.tsx exists
3. Check Next.js error boundary is properly configured
4. May need to restart dev server

---

## Testing Complete ✅

If all tests pass, both P0 blockers are fixed and the system is ready for production use.

For issues, refer to troubleshooting or check Vercel logs for more details.
