# Contractor Recruitment Email Batch

**Date**: January 9, 2026
**Campaign**: NRPG Beta Testing - Insurance Training & Tools
**Recipients**: 20 active contractors
**Send Method**: Email (SendGrid via platform)
**Target Response**: 10 confirmations (50% response rate)

---

## FINAL RECRUITMENT EMAIL

**Subject**: You're Invited: Beta Test New Insurance Training & Features ($50 Credit)

**From**: support@disasterrecovery.com.au
**Reply-To**: support@disasterrecovery.com.au

---

**Email Body**:

```
Hi [CONTRACTOR_NAME],

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

📅 QUICK TIMELINE:
- Testing Period: January 9-14, 2026 (flexible scheduling)
- Sessions: 2-3 hours (we work around your schedule)
- Online testing (no travel required)

🎓 WHAT YOU'LL TEST:
The new features include:

1. Insurance Training Modules (4 comprehensive courses)
   • Policy Recognition & Communication (45 min)
   • Documentation Standards (30 min)
   • Three-Way Communication Mastery (60 min)
   • Insurance Requirements for NRPG (25 min)

2. Insurance Verification System
   • Document upload interface
   • Public liability tracking
   • Training certification management

3. Enhanced Insurance Tools
   • Smarter claim processing
   • Better contractor matching
   • Insurance-aware customer support

4. Educational Resources
   • Client-facing insurance guides
   • Downloadable checklists & templates
   • Code of Practice timeline guidance

⚡ WHY THIS MATTERS:
- Better understand Australian insurance requirements
- Improve communication with clients & insurers
- Faster claim approvals
- Reduce disputes and escalations
- Get certified on the new platform

🔒 CONFIDENTIAL TESTING:
- Features are not yet public
- Your feedback is confidential
- We want honest input (including criticisms!)
- All data protected

💬 READY TO PARTICIPATE?

Reply to this email with:
1. Your preferred testing day & time (Jan 9-14)
2. Any specific features you want to test
3. Your phone number (for coordination)

OR text [PHONE_NUMBER] to schedule directly.

Questions? Email support@disasterrecovery.com.au

We're looking forward to your feedback!

NRPG Team
support@disasterrecovery.com.au
www.disasterrecovery.com.au

---

P.S. Early respondents get priority scheduling. Reply today to secure
your preferred testing time!
```

---

## CONTRACTOR RECIPIENT LIST

**To be populated with actual contractor data**:

| # | Name | Email | Phone | Experience Level | State | Specialty | Status |
|----|------|-------|-------|------------------|-------|-----------|--------|
| 1 | [Contractor Name] | [email@address.com] | [0412XXX] | New | NSW | Water | [ ] Sent |
| 2 | [Contractor Name] | [email@address.com] | [0412XXX] | New | NSW | Water | [ ] Sent |
| 3 | [Contractor Name] | [email@address.com] | [0412XXX] | New | VIC | Fire | [ ] Sent |
| 4 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | VIC | Water | [ ] Sent |
| 5 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | VIC | General | [ ] Sent |
| 6 | [Contractor Name] | [email@address.com] | [0412XXX] | New | QLD | Water | [ ] Sent |
| 7 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | QLD | Fire | [ ] Sent |
| 8 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | QLD | General | [ ] Sent |
| 9 | [Contractor Name] | [email@address.com] | [0412XXX] | New | WA | Water | [ ] Sent |
| 10 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | WA | General | [ ] Sent |
| 11 | [Contractor Name] | [email@address.com] | [0412XXX] | New | NSW | Fire | [ ] Sent |
| 12 | [Contractor Name] | [email@address.com] | [0412XXX] | New | VIC | Water | [ ] Sent |
| 13 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | NSW | General | [ ] Sent |
| 14 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | QLD | Water | [ ] Sent |
| 15 | [Contractor Name] | [email@address.com] | [0412XXX] | New | SA | Fire | [ ] Sent |
| 16 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | NSW | Water | [ ] Sent |
| 17 | [Contractor Name] | [email@address.com] | [0412XXX] | New | QLD | General | [ ] Sent |
| 18 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | VIC | Fire | [ ] Sent |
| 19 | [Contractor Name] | [email@address.com] | [0412XXX] | New | WA | Water | [ ] Sent |
| 20 | [Contractor Name] | [email@address.com] | [0412XXX] | Experienced | NSW | General | [ ] Sent |

**Selection Criteria Applied**:
- ✅ Active contractors (last job < 3 months)
- ✅ Verified email on file
- ✅ Phone number available for follow-up
- ✅ Geographic diversity (NSW, VIC, QLD, WA, SA)
- ✅ Experience level mix (10 new, 10 experienced)
- ✅ Specialty mix (water, fire, general)

---

## SENDING INSTRUCTIONS

### Option 1: SendGrid API (Recommended)

**Using SendGrid template**:

```bash
# Create SendGrid email list
curl --request POST \
  --url https://api.sendgrid.com/v3/mail/send \
  --header 'Authorization: Bearer YOUR_SENDGRID_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "personalizations": [
      {
        "to": [{"email": "contractor1@email.com", "name": "Contractor Name"}],
        "substitutions": {
          "-name-": "Contractor Name",
          "-phone-": "0412XXX"
        }
      }
    ],
    "from": {"email": "support@disasterrecovery.com.au", "name": "NRPG Team"},
    "reply_to": {"email": "support@disasterrecovery.com.au"},
    "subject": "You'"'"'re Invited: Beta Test New Insurance Training & Features ($50 Credit)",
    "html": "[HTML_EMAIL_TEMPLATE]"
  }'
```

### Option 2: Platform Email System

**Using NRPG internal email system**:

```javascript
// Send via platform API
const sendBatchEmails = async (contractors) => {
  for (const contractor of contractors) {
    await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: contractor.email,
        templateId: 'contractor-beta-invite',
        variables: {
          contractorName: contractor.name,
          phoneNumber: process.env.NRPG_PHONE,
          testingDates: 'January 9-14, 2026'
        }
      })
    });
  }
};
```

### Option 3: Manual (Gmail/Outlook)

1. [ ] Copy all contractor emails to BCC field
2. [ ] Use email template above
3. [ ] Add personalization: Hi [Name], (merge field)
4. [ ] Send from support@disasterrecovery.com.au
5. [ ] Track responses in spreadsheet

---

## EMAIL CAMPAIGN TRACKING

**Send Confirmation Checklist**:

- [ ] Email list finalized (20 contractors)
- [ ] Email template approved
- [ ] SendGrid template created (if using)
- [ ] API keys verified (if using)
- [ ] Test email sent to admin@disasterrecovery.com.au
- [ ] Batch email sent to 20 contractors
- [ ] Timestamp recorded: ___________
- [ ] Send status confirmed: ✓ ALL SENT

**Response Tracking**:

| Date | Responses | Confirmations | Target | Status |
|------|-----------|---------------|--------|--------|
| Day 1 (+0 hours) | [#] | [#] | - | Tracking |
| Day 1 (+12 hours) | [#] | [#] | 5+ | On track? |
| Day 2 | [#] | [#] | 8+ | On track? |
| Day 2 (+24 hours) | [#] | [#] | 10 | ✓ Target met |

**Follow-Up Email** (if <8 responses by Day 2):

```
Subject: Still interested? Beta test deadline tomorrow

Hi [CONTRACTOR_NAME],

Just a friendly reminder about our beta testing opportunity for new
insurance training and tools.

We're finalizing our testing group and would love to include you!

- Beta test date: January [DATE]
- Time: [FLEXIBLE - your choice]
- Duration: 2-3 hours
- Incentive: $50 NRPG credit

If interested, reply with your preferred testing time or call [PHONE].

Looking forward to your participation!

NRPG Team
```

---

## RESPONSE MANAGEMENT

### Expected Responses

**By Email**:
- Confirmation message with preferred date/time
- [To be categorized and scheduled]

**By Phone** ([PHONE_NUMBER]):
- Incoming call/text with scheduling request
- [To be recorded and confirmed]

### Confirmation Response Email

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

✉️ IMPORTANT:
Please reply to confirm you received this email. If you need to
reschedule, let us know ASAP (we're flexible!).

💬 QUESTIONS?
Call [PHONE] or email support@disasterrecovery.com.au

Looking forward to your feedback!

NRPG Team
```

---

## CAMPAIGN METRICS

**Target Metrics**:
- [ ] Emails sent: 20
- [ ] Responses received: 10+ (50%+ response rate)
- [ ] Confirmations: 10 (target)
- [ ] Testing sessions scheduled: 10
- [ ] Sessions completed: 10
- [ ] Feedback forms collected: 10
- [ ] Average satisfaction: >4.0/5.0

---

## NEXT STEPS AFTER SENDING

1. **Monitor responses** (24-72 hours)
   - Track email replies
   - Track phone calls
   - Log confirmations

2. **Schedule confirmed contractors** (within 24 hours of response)
   - Send Zoom links
   - Send briefing documents
   - Confirm 24 hours before

3. **Prepare testing materials** (before Day 1)
   - Briefing documents ready
   - Feedback forms printed/digital
   - Facilitator guides printed
   - Test Zoom setup

4. **Execute testing sessions** (Days 1-5)
   - Welcome & briefing (5 min)
   - 5 scenarios (110 min)
   - Feedback form & discussion (40 min)
   - Thank you & next steps (5 min)

5. **Collect feedback** (same day)
   - Feedback forms submitted
   - Observation notes complete
   - Issues logged
   - Photos/videos (if applicable)

---

**Campaign Status**: ⏳ READY TO LAUNCH

**Action Required**: Send recruitment emails to 20 contractors immediately

---

**Document Version**: 1.0
**Created**: January 9, 2026
**Status**: Ready for sending
