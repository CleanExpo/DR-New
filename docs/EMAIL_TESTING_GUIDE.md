# Email Testing & Deployment Guide

> **Purpose**: Step-by-step procedures to test and deploy the contractor recruitment email campaign
> **Target**: Stage 6 Beta Testing - 20 contractors, targeting 10+ confirmations
> **Timeline**: 4-6 hours (including waiting periods)

---

## Overview

Before sending emails to 20 contractors, we need to verify everything works correctly. This guide walks through 6 testing phases:

| Phase | Description | Time | Purpose |
|-------|-------------|------|---------|
| **1** | DNS Verification | 5 min | Confirm domain authentication is ready |
| **2** | Preflight Check | 5 min | Comprehensive system validation |
| **3** | Dry Run | 10 min | Preview what will be sent without sending |
| **4** | Test Email | 5 min | Send to yourself to verify delivery |
| **5** | Limited Batch | 15 min | Send to 2-3 contractors as final test |
| **6** | Production Send | 30 min | Send to all 20 contractors |

---

## Prerequisites

✅ You must complete these **before** starting testing:

- [ ] DNS records added to domain registrar (see `EMAIL_DNS_SETUP.md`)
- [ ] SendGrid account created and API key generated (see `SENDGRID_SETUP.md`)
- [ ] `.env.local` file created with all 4 environment variables
- [ ] Vercel environment variables configured (for production)

---

## Phase 1: DNS Verification (5 minutes)

### Purpose
Verify that DNS records are configured correctly and SendGrid domain authentication is ready.

### Command
```bash
npm run email:verify-dns
```

### Expected Output

**If DNS is ready:**
```
🔍 Verifying DNS Records...

Checking CNAME: em7959.disasterrecovery.com.au
  ✅ PASS: u49942585.wl086.sendgrid.net

Checking CNAME: s1._domainkey.disasterrecovery.com.au
  ✅ PASS: s1.domainkey.u49942585.wl086.sendgrid.net

Checking CNAME: s2._domainkey.disasterrecovery.com.au
  ✅ PASS: s2.domainkey.u49942585.wl086.sendgrid.net

Checking TXT: _dmarc.disasterrecovery.com.au
  ✅ PASS: v=DMARC1; p=none;

===========================================================
📊 DNS VERIFICATION SUMMARY

✅ Passed:  4/4

===========================================================

✅ ALL DNS RECORDS VERIFIED!

📋 Next Steps:
1. ✅ DNS is configured correctly
2. 📝 Set up environment variables (see SENDGRID_SETUP.md)
3. 🧪 Run pre-flight check: npm run email:preflight
4. 🚀 Ready to send emails!
```

### What to Do If DNS is Not Ready

**Status: PENDING (DNS still propagating)**

```
⏳ DNS RECORDS ARE STILL PROPAGATING

📋 What to do:
1. ⏳ Wait 1-4 hours for DNS to propagate
2. 🔄 Run this verification again: npm run email:verify-dns
3. 📞 If still failing after 24 hours, check:
   - All 4 records are in your domain registrar
   - Spelling is exactly correct (check underscores!)
   - Record types are correct (CNAME vs TXT)
```

**Solution**: Wait 1-4 hours and retry. Skip to Phase 2 if DNS passes.

**Status: FAILED (DNS configuration error)**

```
❌ DNS VERIFICATION FAILED

⚠️ Issues Found:

s1._domainkey:
  Expected: s1.domainkey.u49942585.wl086.sendgrid.net
  Actual:   (not found)
```

**Solutions**:
1. Log into domain registrar
2. Check that all 4 DNS records are added
3. Look for typos (especially underscores `_`)
4. Verify record types (CNAME vs TXT)
5. Wait another hour and try again

---

## Phase 2: Preflight Check (5 minutes)

### Purpose
Comprehensive validation that all systems are ready (environment, API key, database, etc.)

### Command
```bash
npm run email:preflight
```

### Expected Output

**If all checks pass:**
```
🔍 NRPG Email System Preflight Check

Running comprehensive validation...

📊 Preflight Check Results:

✅ 1. Environment Variables
   All required environment variables present
   📝 SENDGRID_API_KEY=set, EMAIL_FROM=support@disasterrecovery.com.au, EMAIL_FROM_NAME=NRPG Team

✅ 2. DNS Records
   DNS records found and configured
   📝 em7959 → u49942585.wl086.sendgrid.net

✅ 3. SendGrid API Key
   SendGrid API key is valid and authentication works

✅ 4. Domain Authentication
   Domain authentication ready (DNS configured)
   📝 Your domain should show "Authenticated" in SendGrid dashboard

✅ 5. Database Connection
   Database not available (using mock data fallback)
   📝 Mock data will be used for testing. This is fine for development.

✅ 6. Email Script
   Recruitment email script is valid
   📝 Run "npm run email:dry-run" to execute

✅ 7. Email Template
   Email template is configured
   📝 Subject line, HTML template, and placeholders verified

============================================================

📈 Summary:

✅ Passed:  7/7

✅ PREFLIGHT CHECK PASSED!

📋 Next Steps:

1. Run dry run: npm run email:dry-run
2. Send test email: npm run email:test your.email@example.com
3. Send limited batch: npm run email:send -- --limit 3
4. Send to all 20: npm run email:send -- --confirm
```

### What to Do If Checks Fail

**Common Issues:**

1. **❌ Environment Variables - Missing SENDGRID_API_KEY**
   - Check `.env.local` exists and has `SENDGRID_API_KEY=SG.xxxxx`
   - Verify the key format (starts with "SG.")

2. **❌ SendGrid API Key - 401 Unauthorized**
   - SendGrid account free trial may have expired
   - Solution: Upgrade to paid plan (https://sendgrid.com/pricing/)
   - Or generate a new API key

3. **❌ DNS Records - Not yet propagated**
   - Normal if records were just added
   - Solution: Wait 1-4 hours and retry

4. **❌ Domain Authentication - Not ready**
   - DNS records are configured but not yet authenticated
   - Solution: Run Phase 1 again after DNS propagates

---

## Phase 3: Dry Run (10 minutes)

### Purpose
Preview exactly what will be sent without actually sending emails. Useful for reviewing:
- How many contractors will receive emails
- Email subject and content
- Any template rendering issues

### Command
```bash
npm run email:dry-run
```

### Expected Output

```
🚀 NRPG Contractor Recruitment Email Campaign

Date: 2026-01-09T14:30:45.123Z
Mode: DRY RUN

📊 Campaign Summary:
   Total recipients: 20
   Subject: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
   Expected response rate: 50% (10 confirmations)
   Testing period: January 9-14, 2026

📬 Recipients:
   1. ABC Water Restoration (john@abcwater.com.au) - NSW
   2. Premier Fire Services (contact@premierfire.com.au) - VIC
   3. QuickFix Restoration (admin@quickfix.com.au) - QLD
   ... (17 more)
   20. Adelaide Emergency Services (dispatch@adelaideem.com.au) - SA

   [DRY RUN] Would send to: john@abcwater.com.au (John Smith)
   [DRY RUN] Would send to: contact@premierfire.com.au (Mike Johnson)
   ... (18 more)

==================================================
📊 CAMPAIGN RESULTS

   [DRY RUN] Sent: 20/20
   Expected confirmations: 10
   Follow-up deadline: January 11, 2026

==================================================

✅ All emails ready to send!
📅 Next step: Send test email to yourself (npm run email:test)
```

### What to Check

1. **Recipient count**: Should be 20 contractors
2. **Email addresses**: Check they look valid (name@domain.com.au)
3. **Subject line**: Should mention "$50 Credit"
4. **Contractor distribution**: Should include various states (NSW, VIC, QLD, WA, SA)
5. **Contact names**: Should be personalised (not "null" or blank)

### If Something Looks Wrong

- **Wrong email addresses**: Update mock data in script
- **Wrong contractor names**: Check primaryContact field
- **Missing contractors**: Check database query criteria
- **Template issues**: Check HTML for rendering errors

---

## Phase 4: Test Email (5 minutes)

### Purpose
Send a test email to your own email address to verify:
- Email delivery works end-to-end
- Email formatting looks correct
- SendGrid is functioning properly

### Command

```bash
npm run email:test john@example.com "John Doe"
```

Replace:
- `john@example.com` with **your email address**
- `"John Doe"` with **your name** (optional)

### Example

```bash
npm run email:test support@disasterrecovery.com.au "DR Support"
```

### Expected Output

```
🚀 NRPG Test Email Sender

📋 Test Email Configuration:

  From:       support@disasterrecovery.com.au
  To:         john@example.com (John Doe)
  Subject:    Test Email - NRPG Platform Configuration Verification
  Status:     Sending...

✅ TEST EMAIL SENT SUCCESSFULLY!

📧 Email Details:
  Recipient:  john@example.com
  Status Code: 202 (Accepted)

📋 Next Steps:

1. ✅ Check your inbox (including spam folder)
2. ✅ If received: SendGrid is working correctly
3. 📝 Run dry run: npm run email:dry-run
4. 🚀 Send to limited batch: npm run email:send -- --limit 3
5. 📧 Send to all 20 contractors: npm run email:send -- --confirm
```

### What to Do Next

1. **Check your inbox** (and spam/junk folder)
2. **If email arrived**: Great! SendGrid is working
   - Review the email format and content
   - Proceed to Phase 5
3. **If email didn't arrive**: See troubleshooting below

### Troubleshooting Test Email

| Issue | Cause | Solution |
|-------|-------|----------|
| No email received | Email bounced | Check email address is correct |
| Email in spam folder | Sender domain not authenticated | Wait for DNS propagation, run Phase 1 again |
| 401 Error | API key invalid | Check SENDGRID_API_KEY in .env.local |
| Network timeout | Cannot reach SendGrid API | Check internet connection |

---

## Phase 5: Limited Batch Test (15 minutes)

### Purpose
Send emails to a small group (2-3 contractors) as a final validation before sending to all 20.

This is the last check before production. It helps catch any issues with:
- Bulk sending (vs single test email)
- Contractor data in database
- Template personalization with real data
- SendGrid rate limiting

### Command

```bash
npm run email:send -- --limit 3
```

This will:
1. Show a summary of the first 3 contractors
2. Ask for confirmation (or use `--confirm` to skip)
3. Send emails to those 3 contractors

### Expected Output

```
🚀 NRPG Contractor Recruitment Email Campaign

Date: 2026-01-09T14:35:20.123Z
Mode: SEND LIVE

📊 Campaign Summary:
   Total recipients: 3 (limited batch)
   Subject: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
   Expected response rate: 50% (1.5 confirmations)
   Testing period: January 9-14, 2026

📬 Recipients:
   1. ABC Water Restoration (john@abcwater.com.au) - NSW
   2. Premier Fire Services (contact@premierfire.com.au) - VIC
   3. QuickFix Restoration (admin@quickfix.com.au) - QLD

⚠️  Ready to send to 3 contractors.
   (Run with --confirm flag to skip this prompt)

   Proceeding...

   ✅ Sent to: john@abcwater.com.au (John Smith)
   ✅ Sent to: contact@premierfire.com.au (Mike Johnson)
   ✅ Sent to: admin@quickfix.com.au (Sarah Lee)

==================================================
📊 CAMPAIGN RESULTS

   ✅ Sent: 3/3
   Expected confirmations: 1.5
   Follow-up deadline: January 11, 2026

==================================================

✅ All test emails sent successfully!
📅 Next step: Monitor for responses (target: 10+ confirmations by Jan 11)
```

### What to Do Next

1. **Wait 30-60 minutes** for emails to be delivered
2. **Check contractor inboxes** (if you have access to test accounts)
3. **Look for any bounce-back emails** in your support inbox
4. **If all goes well**: Proceed to Phase 6 (production send)

### If Emails Don't Deliver

- Check contractor email addresses are valid
- Verify SendGrid quota hasn't been exceeded
- Check SendGrid dashboard for suppression list issues
- Review bounce rate in SendGrid analytics

---

## Phase 6: Production Send (30 minutes)

### Purpose
Send to all 20 contractors. This is the live campaign.

### Command

**Option A: With Confirmation Prompt**
```bash
npm run email:send
```

This will:
1. Show all 20 contractors
2. Ask for confirmation before sending
3. Send emails

**Option B: Skip Confirmation**
```bash
npm run email:send -- --confirm
```

Use this if you've already verified the list and want to send immediately.

### Expected Output

```
🚀 NRPG Contractor Recruitment Email Campaign

Date: 2026-01-09T14:45:30.123Z
Mode: SEND LIVE

📊 Campaign Summary:
   Total recipients: 20
   Subject: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
   Expected response rate: 50% (10 confirmations)
   Testing period: January 9-14, 2026

📬 Recipients:
   1. ABC Water Restoration (john@abcwater.com.au) - NSW
   2. Premier Fire Services (contact@premierfire.com.au) - VIC
   3. QuickFix Restoration (admin@quickfix.com.au) - QLD
   ... (17 more)
   20. Adelaide Emergency Services (dispatch@adelaideem.com.au) - SA

⚠️  Ready to send to 20 contractors.
   (Run with --confirm flag to skip this prompt)

   Proceeding...

   ✅ Sent to: john@abcwater.com.au (John Smith)
   ✅ Sent to: contact@premierfire.com.au (Mike Johnson)
   ... (18 more)

==================================================
📊 CAMPAIGN RESULTS

   ✅ Sent: 20/20
   Expected confirmations: 10
   Follow-up deadline: January 11, 2026

==================================================

✅ All emails sent successfully!
📅 Next step: Monitor for responses (target: 10+ confirmations by Jan 11)
```

### Verification

After sending, check:

1. **Email count**: Should show 20/20 sent
2. **No errors**: Should have no failed sends
3. **SendGrid dashboard**: Should show 20 emails delivered
4. **Timestamp recorded**: Note the send time for tracking

---

## Phase 7: Monitoring & Response Tracking (Ongoing)

### Purpose
Monitor contractor responses and track confirmations for the 10-day testing window.

### Timeline

| When | What to Check | Target |
|------|---------------|--------|
| **Immediately** | Check SendGrid delivery status | 0 bounces |
| **1 hour** | First responses arrive | 1-2 replies |
| **6 hours** | Email open tracking | 50%+ opens |
| **24 hours** | Day 1 responses | 3-5 confirmations |
| **48 hours** | Day 2 responses | 8-10 confirmations |
| **72 hours** | Confirm final count | 10+ confirmations |

### What to Monitor

**SendGrid Dashboard** (https://app.sendgrid.com/):
- Delivery rate (should be 95%+)
- Bounce rate (should be <5%)
- Click rate (monitor response CTA clicks)
- Open rate (should be 30%+)

**Response Inbox** (support@disasterrecovery.com.au):
- Log each reply
- Track preferred testing dates/times
- Note any questions or concerns
- Send confirmations within 2 hours of response

### Tracking Spreadsheet

Create a tracking spreadsheet with columns:
- Name
- Email
- Phone
- Sent Date
- Response Date/Time
- Preferred Testing Date
- Preferred Testing Time
- Status (Pending / Confirmed)
- Notes

### Response Template

When a contractor responds with interest, send this confirmation:

```
Subject: You're Confirmed! Beta Testing - [DATE] at [TIME]

Hi [CONTRACTOR_NAME],

Excellent! You're confirmed for our beta testing program.

📅 YOUR SESSION:
Date: [DATE]
Time: [TIME] (approximately 2.5 hours)
Format: Online via Zoom
Facilitator: [FACILITATOR_NAME]

📋 BEFORE YOUR SESSION:
Please do the following 24 hours before:
1. Download/bookmark the testing link: [ZOOM_LINK]
2. Test your internet connection
3. Have notepad ready for notes
4. Close other applications

✉️ Please reply to confirm you received this email.

💬 QUESTIONS?
Call [PHONE] or email support@disasterrecovery.com.au

Looking forward to your feedback!

NRPG Team
```

### Follow-Up (if needed)

If responses are slow (<5 by Day 1):

```bash
# Resend reminder to non-responders (manual process)
# Or send follow-up email template (see execution report)
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Emails not arriving | DNS not ready | Run Phase 1 again |
| 401 errors | API key expired/invalid | Check SENDGRID_API_KEY |
| Low delivery rate | Spam filters | Check SendGrid reputation, verify sender domain |
| No responses | Low email engagement | Check open rate, follow up with phone calls |
| Database errors | Contractor data issue | Use `--dry-run` to check data |

---

## Checklist

### Before Starting
- [ ] DNS records verified (Phase 1)
- [ ] Preflight check passed (Phase 2)
- [ ] Dry run reviewed (Phase 3)
- [ ] Test email received (Phase 4)

### During Testing
- [ ] Limited batch sent successfully (Phase 5)
- [ ] All 20 emails sent (Phase 6)
- [ ] SendGrid delivery confirmed (dashboard check)
- [ ] Response tracking initiated

### After Sending
- [ ] First responses logged (24 hours)
- [ ] Confirmations sent (within 2 hours)
- [ ] Follow-up tracking setup (by Jan 11)
- [ ] Testing sessions scheduled (by Jan 12)

---

## Success Metrics

✅ **Recruitment Success**:
- 20 emails sent (100%)
- Delivery rate >95%
- 10+ confirmations received
- 10 testing sessions scheduled

---

## Support

- **DNS Issues**: See `EMAIL_DNS_SETUP.md`
- **SendGrid Config**: See `SENDGRID_SETUP.md`
- **Script Usage**: See `scripts/README-RECRUITMENT-EMAILS.md`
- **Email**: support@disasterrecovery.com.au

---

**Version**: 1.0
**Created**: January 9, 2026
**Status**: Ready to execute
