# Recruitment Email Campaign - Execution Report

**Date**: January 9, 2026
**Campaign**: Stage 6 Beta Testing - Insurance Training & Tools
**Target**: 20 active contractors (10 confirmations expected)
**Status**: Ready to Send

---

## EXECUTION SUMMARY

### What Will Be Sent

**Email Details**:
- **From**: support@disasterrecovery.com.au
- **Subject**: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
- **Recipients**: 20 active NRPG contractors (to be selected by system)
- **Format**: HTML email with personalization
- **Call-to-Action**: Reply with preferred testing date/time

### Email Content Preview

```
Hi [Contractor Name],

Great news! NRPG is launching new insurance training and tools designed
to help contractors like you work more effectively with insurance claims.

We'd like YOU to be among the first to test these features and help shape
the platform.

🎯 WHAT WE NEED:
- Contractors like you (you!)
- 2-3 hours of your time over the next week
- Honest feedback on training & features
- Testing 5 key scenarios

✅ WHAT YOU GET:
- Early access to powerful new tools
- Your feedback directly shapes the platform
- Certificate of Participation
- $50 NRPG credit as thanks
- Recognition as platform beta tester (if interested)

[... full email content ...]

💬 READY TO PARTICIPATE?

Reply to this email with:
1. Your preferred testing day & time (Jan 9-14)
2. Any specific features you want to test
3. Your phone number (for coordination)

Questions? Email support@disasterrecovery.com.au

NRPG Team
```

### Target Contractor Selection

**Selection Criteria**:
- ✅ Active (at least 1 claim in past 90 days)
- ✅ Email address on file
- ✅ Phone number available
- ✅ Geographic diversity (NSW, VIC, QLD, WA, SA)
- ✅ Experience level mix (50% new, 50% experienced)
- ✅ Specialty mix (water, fire, general)

**Expected Distribution**:
- NSW: 4-5 contractors
- VIC: 4-5 contractors
- QLD: 4-5 contractors
- WA/SA: 2-3 contractors
- New contractors: 10
- Experienced contractors: 10

---

## EXECUTION STEPS

### Step 1: Dry Run (Preview)

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts --dry-run
```

**Expected Output**:
```
🚀 NRPG Contractor Recruitment Email Campaign

Date: 2026-01-09T[TIME]Z
Mode: DRY RUN

📊 Campaign Summary:
   Total recipients: 20
   Subject: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
   Expected response rate: 50% (10 confirmations)
   Testing period: January 9-14, 2026

📬 Recipients:
   1. [Contractor Name] (email@address.com) - NSW
   2. [Contractor Name] (email@address.com) - VIC
   3. [Contractor Name] (email@address.com) - QLD
   ... (17 more)
   20. [Contractor Name] (email@address.com) - WA

[DRY RUN] Would send to: email@address.com (Contractor Name)
[DRY RUN] Would send to: email@address.com (Contractor Name)
... (18 more)

==================================================
📊 CAMPAIGN RESULTS

   [DRY RUN] Sent: 20/20
   Expected confirmations: 10
   Follow-up deadline: January 11, 2026

==================================================
```

**Action**: Review output, confirm recipients look correct

---

### Step 2: Send Emails (with confirmation)

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts
```

**Interactive Prompt**:
```
⚠️  Ready to send to 20 contractors.
   (Run with --confirm flag to skip this prompt)

   Proceeding...
```

**Expected Output**:
```
🚀 NRPG Contractor Recruitment Email Campaign

Date: 2026-01-09T[TIME]Z
Mode: SEND LIVE

📊 Campaign Summary:
   Total recipients: 20
   Subject: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)
   Expected response rate: 50% (10 confirmations)
   Testing period: January 9-14, 2026

   ✅ Sent to: contractor1@email.com (Contractor Name)
   ✅ Sent to: contractor2@email.com (Contractor Name)
   ✅ Sent to: contractor3@email.com (Contractor Name)
   ... (17 more)

==================================================
📊 CAMPAIGN RESULTS

   ✅ Sent: 20/20
   Expected confirmations: 10
   Follow-up deadline: January 11, 2026

==================================================

✅ All emails sent successfully!
📅 Next step: Monitor for responses (target: 10+ confirmations by Jan 11)
```

**Action**: Confirm all 20 sent successfully

---

### Step 3: Monitor Responses

**Tracking Spreadsheet**:

| Name | Email | Phone | Sent Date | Response | Date | Time | Confirmed |
|------|-------|-------|-----------|----------|------|------|-----------|
| [Name] | email@address.com | [phone] | Jan 9 | [pending] | - | - | [ ] |
| [Name] | email@address.com | [phone] | Jan 9 | [pending] | - | - | [ ] |
| ... | ... | ... | Jan 9 | ... | ... | ... | ... |

**Response Collection**:
- [ ] Monitor support@disasterrecovery.com.au inbox
- [ ] Log each response (date/time received)
- [ ] Extract preferred testing date/time
- [ ] Confirm if received phone number or email only
- [ ] Note any special requests

**Expected Timeline**:
- **Hour 1-6**: First responses (1-2 expected)
- **Day 1**: 3-5 responses
- **Day 1-2**: 8-10 total responses
- **Day 2-3**: Final confirmations (target: 10)

---

### Step 4: Confirmation Response

**For Each Positive Response**:

Send confirmation email with:
- [ ] Testing date & time confirmed
- [ ] Zoom link (TBD - to be generated)
- [ ] Briefing document attached
- [ ] What to prepare (internet, notepad, etc.)
- [ ] Facilitator name & contact
- [ ] Confirmation request ("Reply to confirm")

**Template**:
```
Subject: You're Confirmed! Beta Testing - [DATE] at [TIME]

Hi [Contractor Name],

Excellent! You're confirmed for our beta testing program.

📅 YOUR SESSION:
Date: [DATE]
Time: [TIME] (approximately 2.5 hours)
Format: Online via Zoom
Facilitator: [FACILITATOR_NAME]

📋 BEFORE YOUR SESSION:
Please do the following 24 hours before:
1. Download/bookmark testing link: [ZOOM_LINK]
2. Test your internet connection
3. Have notepad ready
4. Close other applications

Please reply to confirm you received this email.

NRPG Team
```

---

### Step 5: Follow-Up (if needed)

**Trigger**: <8 confirmations by January 11

**Send Follow-Up Email**:
```bash
# Resend to non-respondents only
npx ts-node scripts/send-contractor-recruitment-emails.ts \
  --only-non-respondents \
  --template follow-up
```

**Follow-Up Message**:
```
Subject: Still interested? Beta test deadline tomorrow

Hi [CONTRACTOR_NAME],

Just a friendly reminder about our beta testing opportunity for new
insurance training and tools.

We're finalizing our testing group and would love to include you!

- Testing date: January [DATE]
- Time: [FLEXIBLE - your choice]
- Duration: 2-3 hours
- Incentive: $50 NRPG credit

If interested, reply with your preferred testing time or call [PHONE].

Looking forward to your participation!

NRPG Team
```

---

## REAL-TIME EXECUTION TRACKING

### Metrics to Monitor

**During Send**:
- [ ] Send time: __________ (when script started)
- [ ] Send completion: __________ (when all sent)
- [ ] Total time: __________ minutes
- [ ] Errors: __________ (target: 0)
- [ ] Success rate: __________% (target: 100%)

**Post-Send Response Tracking**:

| Day | Time | Responses | Confirmations | Status |
|-----|------|-----------|---------------|--------|
| Jan 9 | 12 hours after | [#] | [#] | [ ] Tracking |
| Jan 9 | 24 hours after | [#] | [#] | [ ] Tracking |
| Jan 10 | Morning | [#] | [#] | [ ] Tracking |
| Jan 10 | Evening | [#] | [#] | [ ] On target |
| Jan 11 | All day | [#] | [#] | [ ] Final count |

**Response Goals**:
- Hour 24: 3-5 responses
- Hour 48: 8-10 responses
- Hour 72: 10+ confirmed (goal met)

---

## FINAL CHECKLIST

**Before Sending**:
- [ ] Email template reviewed and approved
- [ ] SendGrid API key verified
- [ ] Recipient list criteria confirmed
- [ ] Dry run executed and reviewed
- [ ] Support team briefed on incoming responses
- [ ] Zoom meeting info ready (template)
- [ ] Facilitator schedule prepared
- [ ] Feedback forms prepared

**During Sending**:
- [ ] Execute `--dry-run` first
- [ ] Review output for recipient list
- [ ] Execute send command
- [ ] Monitor for errors
- [ ] Confirm 20/20 sent successfully

**After Sending**:
- [ ] Document send timestamp
- [ ] Set calendar reminders for response tracking
- [ ] Monitor support email daily
- [ ] Log responses as they arrive
- [ ] Send confirmations within 2 hours of response
- [ ] Send follow-up by Jan 11 if needed

---

## RISK MITIGATION

**If send fails midway**:
1. Note which contractor failed (email address)
2. Fix the issue (invalid email, API error, etc.)
3. Re-run script with `--limit 1` on that email
4. Continue with remaining recipients

**If response rate is low** (<5 by Day 1):
1. Check spam folder (email might be filtered)
2. Follow-up with phone call to 2-3 contractors
3. Re-send reminder email (template provided)

**If contractor doesn't show up**:
1. Call/text 1 hour before as reminder
2. Reschedule for later that week
3. Keep testing on schedule (can do without them)

---

## NEXT STEPS TIMELINE

```
Jan 9:
  - 10:00 AM: Dry run execution
  - 10:30 AM: Review output
  - 11:00 AM: Send emails (20 contractors)
  - 11:30 AM: Confirm 20/20 sent
  - Monitor inbox throughout day

Jan 10:
  - Morning: Check overnight responses
  - Send confirmations to early responders
  - Monitor inbox
  - Schedule first testing sessions

Jan 11:
  - Morning: Final follow-up to non-responders
  - Confirm final participant count (target: 10)
  - Begin confirming all 10 sessions
  - Prepare testing materials

Jan 12-13:
  - Prepare Zoom links & briefing docs
  - Brief facilitators
  - Final confirmations to contractors

Jan 9-14:
  - Execute 10 testing sessions
  - Collect feedback forms
  - Log issues & observations

Jan 15:
  - Compile feedback report
  - Assess success metrics
  - Brief leadership
  - Finalize pre-deployment checklist (Day 4)
```

---

## SUCCESS METRICS

**Recruitment Success**:
- [ ] 20 emails sent successfully
- [ ] 10+ confirmations received
- [ ] 10 testing sessions scheduled
- [ ] 10/10 sessions completed
- [ ] 10/10 feedback forms collected
- [ ] Average satisfaction >4.0/5.0

**Business Impact**:
- Feedback improving features before launch
- Contractor buy-in / early adoption
- Testimonials for marketing
- Identified issues for pre-launch fixes

---

**Campaign Status**: ✅ READY TO EXECUTE

**Next Action**: Run dry run and review output

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts --dry-run
```

---

**Document Version**: 1.0
**Created**: January 9, 2026
**Status**: Ready for execution
