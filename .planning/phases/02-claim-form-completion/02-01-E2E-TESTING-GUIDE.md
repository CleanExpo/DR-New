---
phase: 02-claim-form-completion
guide: e2e-testing
---

# End-to-End Testing Guide - Claim Form Completion

**Complete testing procedures for the 3-step claim form flow with all verification steps**

## Environment Setup

### Prerequisites:
- [ ] Project deployed to https://disaster-recovery-seven.vercel.app
- [ ] Database (Supabase) accessible
- [ ] Email service (Resend) configured
- [ ] Browser DevTools open (F12)
- [ ] Browser network tab enabled to monitor API calls
- [ ] Incognito/private window recommended (clean localStorage)

### Optional Testing Tools:
- Temp email service: [tempmail.com](https://tempmail.com) or [10minutemail.com](https://10minutemail.com)
- Database viewer: [Supabase Dashboard](https://supabase.com/dashboard)
- Email testing: [Mailtrap](https://mailtrap.io) or check temp email inbox

---

## Test 1: Happy Path - Complete Claim Submission

**Objective**: Verify users can successfully submit a complete claim through all 3 steps

### Step 1 Triage - Testing

1. **Navigate to claim form**
   - Open: `https://disaster-recovery-seven.vercel.app/claim/step-1`
   - Expected: Page loads with "Report a Claim" heading, Step 1 of 3

2. **Verify form validation - Empty Form**
   - Verify button is **disabled** initially
   - Reason: Form fields are empty, validation should prevent submission

3. **Fill Triage Information**
   ```
   What happened? → "Water Damage"
   When did this happen? → Select today's date + time
   Is it still happening? → "No, it has stopped"
   Is anyone in danger? → "No, everyone is safe"
   ```
   - Expected: Button becomes **enabled** as fields fill
   - Expected: No validation errors shown

4. **Click "Next: Location & Contact"**
   - Expected: Smooth page transition
   - Expected: Navigate to `/claim/step-2`
   - Expected: Page shows "Step 2 of 3"
   - **Verify in DevTools**:
     - Check Network tab - no errors
     - Check Console - no JavaScript errors
     - Check localStorage - claim data saved with step1 data

5. **Verify localStorage persistence**
   - Open DevTools → Application → Local Storage
   - Look for key: `nrpg-claim-wizard-state`
   - Should contain: `step1: { disasterType: "water-damage", ... }`

### Step 2 Location & Contact - Testing

6. **Verify step 2 form loads**
   - Page heading: "Report a Claim"
   - Form title: "Location & Contact Information"
   - GPS location button available

7. **Fill Location Information**
   ```
   Property Address → "123 Main Street"
   Suburb → "Sydney"
   Postcode → "2000"
   ```

8. **Fill Contact Information**
   ```
   Full Name → "Test User"
   Phone Number → "0412 345 678"
   Email Address → "test@tempmail.com" (or real email)
   ```
   - Expected: Button enabled as required fields filled
   - Expected: Phone number validation (Australian format)
   - Expected: Email validation (valid email format)

9. **Click "Next: Damage Details"**
   - Expected: Navigate to `/claim/step-3`
   - Expected: Page shows "Step 3 of 3"
   - **Verify in DevTools**:
     - localStorage includes step2 data
     - No console errors

### Step 3 Damage Details & Insurance - Testing

10. **Verify step 3 form loads**
    - Form title: "Damage Details & Insurance"
    - Damage description textarea visible
    - Insurance radio buttons visible
    - CAPTCHA section visible

11. **Fill Damage Details**
    ```
    Describe the damage → "Water damage in kitchen and lounge from broken pipe. Affects flooring and drywall."
    ```
    - Note: Minimum 20 characters required
    - Expected: Character count displayed

12. **Photo Upload (Optional)**
    - Skip for now (optional field)
    - Or upload a small image if available

13. **Fill Insurance Information**
    - Select: "Yes, I have insurance"
    - Expected: Insurance provider field appears
    - Fill: "NRMA"
    - Fill Policy Number: "ABC123456" (optional)

14. **Complete CAPTCHA**
    - Click: "I'm not a robot" button
    - Expected: Button changes to "CAPTCHA verified" with green checkmark
    - Expected: Submit button becomes enabled

15. **Submit Claim**
    - Click: "Submit Claim" button
    - Expected: Button shows "Submitting..." with loading indicator
    - **Monitor DevTools**:
      - Network tab: POST to `/api/public/claims/submit`
      - Request payload includes all 3 steps + CAPTCHA token
      - Expected response: 201 Created with `{ claimId: "CLM-..." }`

16. **Verify Success Page**
    - Expected: Navigate to `/claim/success?claimId=CLM-...`
    - Expected: Page shows "Help Is On The Way"
    - Expected: Claim reference displayed in monospace font
    - Expected: "Track My Claim" button visible
    - Expected: "Return to Homepage" button visible

17. **Verify Success Page Content**
    - Page should display:
      - ✓ Claim reference number
      - ✓ Confirmation message
      - ✓ 4-step next steps timeline
      - ✓ "What Happens Next?" detailed timeline
      - ✓ Important information section
      - ✓ Support/help center link

### Database Verification

18. **Verify claim saved to database**
    - Open Supabase dashboard
    - Navigate to: Tables → PublicClaim
    - Sort by: createdAt DESC (newest first)
    - Verify latest record contains:
      ```
      clientName: "Test User"
      clientEmail: "test@tempmail.com"
      clientPhone: "0412345678"
      propertyAddress: "123 Main Street"
      suburb: "Sydney"
      postcode: "2000"
      disasterType: "water-damage"
      incidentDate: [today's date]
      isOngoing: false
      isEmergency: false
      damageDescription: "Water damage in kitchen and lounge from broken pipe..."
      hasInsurance: true
      insuranceProvider: "NRMA"
      policyNumber: "ABC123456"
      priority: "Medium"
      status: "PENDING"
      submittedAt: [recent timestamp]
      ```

### Email Verification

19. **Check for confirmation email**
    - If using tempmail: Visit inbox, check for email from claims@disasterrecovery.com.au
    - If using real email: Check inbox and spam folder
    - Wait up to 2 minutes for email delivery
    - **Expected email contains**:
      - Subject: `Your Disaster Recovery Claim #CLM-... Has Been Received`
      - Claim reference number
      - Disaster type (Water Damage)
      - Location (Sydney)
      - Timeline explaining next steps
      - "View Your Claim" button
      - Important information about contractors
      - Support contact information

20. **Verify email HTML rendering**
    - Email should display properly in email client
    - Logo visible
    - Colors and formatting preserved
    - Links clickable
    - Mobile-responsive layout

### localStorage Cleanup Verification

21. **Verify localStorage cleared after success**
    - Go to DevTools → Application → Local Storage
    - Check if `nrpg-claim-wizard-state` is empty or cleared
    - Note: This should happen on navigation to success page

---

## Test 2: Validation & Error Paths

### Test 2.1: Missing Required Field Validation

1. **Go to step 1**
   - Navigate to `/claim/step-1`

2. **Try to submit with empty fields**
   - Don't fill any fields
   - Button should be **disabled** (cannot click)
   - Expected: Red tooltip or disabled state makes it clear

3. **Fill only one field**
   - Select "Water Damage" only
   - Don't fill other fields
   - Button should still be **disabled**
   - Expected: Cannot progress

4. **Fill all fields except one**
   - Fill everything except date
   - Button should be **disabled**
   - Expected: Clear validation requirement

### Test 2.2: Invalid Input Validation

1. **Go to step 2**
   - Complete step 1 and navigate to step 2

2. **Try invalid postcode**
   - Postcode field: "ABC" or "12345" (not 4 digits)
   - Expected: Error message "Postcode must be 4 digits"
   - Expected: Button disabled

3. **Try invalid phone number**
   - Phone field: "1234567" (incomplete)
   - Expected: Error message about invalid Australian number
   - Expected: Button disabled

4. **Try invalid email**
   - Email field: "not-an-email"
   - Expected: Error message "Please enter a valid email address"
   - Expected: Button disabled

### Test 2.3: Back Button & Data Persistence

1. **Navigate to step 3**
   - Complete steps 1 and 2 with test data

2. **Click "Back" button on step 3**
   - Expected: Navigate back to `/claim/step-2`
   - Expected: All step 2 form fields still filled with data entered
   - Expected: No data loss

3. **Click "Back" again**
   - Expected: Navigate back to `/claim/step-1`
   - Expected: All step 1 form fields still filled with data entered

4. **Click "Next" to return to step 2**
   - Expected: Step 2 data still preserved
   - This verifies localStorage is working correctly

### Test 2.4: Step 3 Validation

1. **Go to step 3 with valid steps 1 & 2**

2. **Try to submit with empty damage description**
   - Don't fill damage description
   - Button should be **disabled**
   - Expected: Cannot submit

3. **Fill damage description with < 20 characters**
   - Type: "Short text"
   - Expected: Error "Please provide at least 20 characters"
   - Expected: Button disabled

4. **Fill with valid damage description**
   - Expected: Error clears
   - But button still disabled because CAPTCHA not verified

5. **Select "Yes" for insurance**
   - Expected: Insurance provider field appears
   - Don't fill it
   - Expected: Error "Insurance provider is required"
   - Expected: Button disabled

6. **Fill insurance provider**
   - Type: "NRMA"
   - Expected: Error clears
   - But still need CAPTCHA

7. **Complete CAPTCHA**
   - Click "I'm not a robot"
   - Expected: Button becomes enabled
   - Expected: "Submit Claim" button clickable

### Test 2.5: Network Error Recovery

1. **Go to step 3 with all fields filled**
   - Complete all 3 steps and CAPTCHA

2. **Disable network**
   - DevTools → Network → Offline (throttle to "Offline")

3. **Try to submit**
   - Click "Submit Claim"
   - Expected: Show loading state briefly
   - Expected: Error message appears: "Network connection failed..."
   - Expected: Button re-enabled for retry
   - **CRITICAL**: CAPTCHA token should be preserved (no re-verification needed)

4. **Re-enable network**
   - DevTools → Network → Back to "Online"

5. **Retry submission**
   - Click "Submit Claim" again
   - Expected: Should submit successfully
   - Expected: No need to reverify CAPTCHA
   - Expected: Navigate to success page with claimId

### Test 2.6: Rate Limiting

**Note**: This requires 5 rapid submissions from the same IP

1. **Submit 5 claims rapidly**
   - Use same email or different emails
   - Submit quickly (within 1 hour window)

2. **On 6th submission attempt**
   - Expected: Error message
   - Message: "Too many claim submissions from your location. Please wait an hour..."
   - Expected: HTTP 429 response in network tab
   - Expected: Button disabled or shows error

### Test 2.7: Direct URL Access (Step Navigation)

1. **Open new incognito window**
   - Clear all localStorage

2. **Try to access step 2 directly**
   - URL: `/claim/step-2`
   - Expected: Redirect to `/claim/step-1`
   - Reason: Step 1 not completed, so can't access step 2

3. **Try to access step 3 directly**
   - URL: `/claim/step-3`
   - Expected: Redirect to `/claim/step-1`
   - Reason: Step 1 and 2 not completed

4. **Try to access success page directly**
   - URL: `/claim/success` (without claimId)
   - Expected: Redirect to `/claim/step-1`
   - Reason: No claimId parameter provided

5. **Try with fake claimId**
   - URL: `/claim/success?claimId=FAKE-123`
   - Expected: Page loads but claimId displayed is "FAKE-123"
   - Note: In production, this might show a 404 or fetch claim data

---

## Test 3: Mobile Experience

### Prerequisites:
- iPhone (iOS 15+) or Android phone
- Chrome browser (Android) or Safari (iOS)
- Test with 4G or 5G connection
- Landscape and portrait orientations

### Test 3.1: Touch Targets & Tapability

1. **Visit `/claim/step-1` on mobile**
   - Expected: Page loads without horizontal scroll
   - Expected: All form inputs readable

2. **Try to tap form fields**
   - Disaster type dropdown: Should open easily (tap target ≥ 44px)
   - Date input: Should open date picker (tap target ≥ 44px)
   - Radio buttons: Should select easily (tap target ≥ 44px)

3. **Try to tap buttons**
   - "Next" button: Should be easy to tap (≥ 48x48px on mobile)
   - Expected: No accidental taps of nearby elements

4. **Verify input focus**
   - Tap on text input
   - Expected: Keyboard appears
   - Expected: Input focused and visible
   - Expected: No auto-zoom (iOS shouldn't zoom to 16px baseline)

### Test 3.2: Form Responsiveness

1. **Fill out form on mobile**
   - Complete step 1 on portrait
   - Expected: All fields fit on screen
   - Expected: No horizontal scroll needed

2. **Rotate to landscape**
   - Expected: Layout adjusts
   - Expected: Still readable and tapable
   - Expected: No loss of data

3. **Verify progress bar**
   - Step 1: Progress bar shows ~33%
   - Step 2: Progress bar shows ~66%
   - Step 3: Progress bar shows ~100%
   - Expected: Visible and clear on mobile

### Test 3.3: Photo Upload on Mobile

1. **On step 3, try photo upload**
   - Expected: Tap to open file picker
   - Expected: Can select image from camera roll
   - Expected: Image preview displays
   - Expected: Can upload up to 5 images

### Test 3.4: CAPTCHA on Mobile

1. **On step 3, tap CAPTCHA button**
   - Expected: Button clickable (48x48px minimum)
   - Expected: "I'm not a robot" button easy to tap
   - Expected: Verification feedback displays clearly

### Test 3.5: Success Page on Mobile

1. **After submission, view success page**
   - Expected: Page loads without horizontal scroll
   - Expected: Claim reference displayed clearly
   - Expected: Buttons ("Track My Claim", "Return to Homepage") are tapable
   - Expected: All text readable on small screen

---

## Test 4: Accessibility

### Keyboard Navigation

1. **On step 1, use Tab key to navigate**
   - Expected: Can tab through all form fields
   - Expected: Can tab to buttons
   - Expected: Focus indicator visible

2. **Use Space/Enter to activate**
   - Radio buttons: Space to select
   - Buttons: Space or Enter to click
   - Expected: Keyboard fully navigable

### Screen Reader Testing (if available)

1. **Use NVDA (Windows) or VoiceOver (Mac)**
   - Expected: Form labels announced
   - Expected: Button states announced ("disabled" when disabled)
   - Expected: Error messages announced
   - Expected: Success page announced

### Semantic HTML

1. **In DevTools, inspect element structure**
   - Expected: Proper heading hierarchy (h1, h2, h3)
   - Expected: Form elements properly labeled
   - Expected: Button text clear and descriptive

---

## Regression Testing

### Verify No Existing Features Broken

1. **Home page still works**
   - Navigate to: `/`
   - Expected: Page loads, navigation works

2. **Other API endpoints still work**
   - Newsletter signup: `/api/public/newsletter`
   - Client feedback: `/api/public/client-feedback`
   - Other claim endpoints unchanged

3. **Database migrations**
   - No errors in Vercel logs
   - Prisma schema valid

---

## Success Criteria Checklist

### Happy Path:
- [x] User can complete step 1
- [x] User can progress to step 2
- [x] Data persists when navigating back
- [x] User can complete step 2
- [x] User can progress to step 3
- [x] User can fill damage description
- [x] User can select insurance options
- [x] User can complete CAPTCHA
- [x] User can submit claim
- [x] Claim saved to database
- [x] Email sent to user
- [x] Success page displays with claimId
- [x] "Track My Claim" button works

### Error Handling:
- [x] Network errors show clear messages
- [x] CAPTCHA token preserved on retry
- [x] Rate limiting handled gracefully
- [x] Validation errors shown
- [x] Required field checks working
- [x] Format validation working

### Mobile:
- [x] Touch targets are large enough
- [x] No horizontal scroll
- [x] Responsive layout
- [x] Photo upload works
- [x] Success page mobile-friendly

### Data Integrity:
- [x] All form fields saved to database
- [x] Data types correct (booleans, dates, strings)
- [x] No data loss between steps
- [x] No data corruption in database

---

## Logging & Debugging

### Important Console Logs to Check:

In browser DevTools Console, look for:
```
✓ "Form state saved successfully" (before navigation)
✓ "Navigating to /claim/step-2" (step transitions)
=== CLAIM SAVED TO DATABASE === (successful save)
✓ "Confirmation email sent to:" (email sent)
```

### Network Tab Inspection:

1. **POST to `/api/public/claims/submit`**
   - Method: POST
   - Status: 201 (success) or 4xx/5xx (error)
   - Response: `{ success: true, claimId: "CLM-..." }`

2. **Email sending**
   - No network call (happens server-side)
   - Check Vercel logs for email service logs

### Database Inspector:

In Supabase:
1. Public → PublicClaim table
2. Filter by email or clientName
3. Verify all fields populated
4. Check timestamps

---

## Common Issues & Troubleshooting

### Issue: Button Stays Disabled
**Solution**: Check each field:
- Disaster type selected?
- Date filled?
- Radio button selected?
- All fields on step 2 valid?
- Damage description > 20 chars?
- Insurance provider filled if insurance = yes?
- CAPTCHA verified on step 3?

### Issue: Email Not Received
**Likely Causes**:
- RESEND_API_KEY not configured in Vercel
- Email in spam folder (check spam)
- Email service temporarily down
- Rate limiting on email sends

**Solution**:
- Check Vercel environment variables
- Check email spam folder
- Check Resend dashboard for errors
- Check Vercel function logs

### Issue: Database Record Not Created
**Likely Causes**:
- Database connection error
- Prisma schema not migrated
- Invalid field values

**Solution**:
- Check Vercel logs for database errors
- Verify Prisma migrations: `npx prisma migrate status`
- Check PostgreSQL connection in Supabase

### Issue: localStorage Not Persisting
**Likely Causes**:
- Private/Incognito mode (localStorage disabled)
- Storage quota exceeded
- Browser settings blocking storage

**Solution**:
- Use normal (non-incognito) browser mode
- Clear browser cache
- Check localStorage quota

---

## Post-Testing Checklist

After all tests complete:
- [ ] Document any bugs found
- [ ] Create GitHub issues for failures
- [ ] Re-run failed tests after fixes
- [ ] Get sign-off from stakeholders
- [ ] Document edge cases discovered
- [ ] Update documentation if needed
- [ ] Archive test results

---

## Next Phase: Production Deployment

Once all tests pass:
1. Deploy to production (already at vercel)
2. Monitor error logs for first 24 hours
3. Check email delivery metrics
4. Monitor API response times
5. Set up monitoring and alerts
6. Prepare Phase 03: Dashboard Features
