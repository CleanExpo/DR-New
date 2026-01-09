# Contractor Recruitment Email Campaign

Script to send Stage 6 beta testing invitations to active contractors.

## Quick Start

### 1. Dry Run (Preview emails without sending)

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts --dry-run
```

This shows:
- How many contractors will be contacted
- Who they are
- What they will receive
- No actual emails sent

### 2. Send Emails (with confirmation)

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts
```

This will:
- Show the campaign summary
- List all recipients
- Ask for confirmation (optional: add `--confirm` to skip)
- Send emails to all contractors
- Report results

### 3. Send With Confirmation Skip

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts --confirm
```

Sends emails immediately without confirmation prompt.

### 4. Test With Limited Recipients

```bash
npx ts-node scripts/send-contractor-recruitment-emails.ts --dry-run --limit 5
```

Test with only 5 contractors first.

## Configuration

### Environment Variables

Required in `.env`:
```
SENDGRID_API_KEY=sg_xxxxxxxxxxxx
NRPG_RECRUITMENT_PHONE=1800 XXX XXXX (optional, defaults in email)
```

### Email Template

Edit the template in the script:
```typescript
const RECRUITMENT_EMAIL_TEMPLATE = {
  subject: "You're Invited: Beta Test...",
  htmlTemplate: `...`
}
```

## Campaign Details

**Recruiting for**: Stage 6 Beta Testing
**Target**: 10 active contractors (20 sent, 50% response expected)
**Testing dates**: January 9-14, 2026
**Duration per contractor**: 2-3 hours
**Incentive**: $50 NRPG credit + Certificate

## Email Content

**Subject**: "You're Invited: Beta Test New Insurance Training & Features ($50 Credit)"

**Topics covered in email**:
- What the testing is about
- What contractors get in return
- Timeline and logistics
- Features they'll test
- How to respond
- Contact information

## Response Tracking

After sending:

1. **Monitor responses** (24-72 hours)
   - Check support@disasterrecovery.com.au for replies
   - Track confirmations in spreadsheet
   - Note preferred dates/times

2. **Follow-up** (Jan 11, if <8 confirmations)
   - Send reminder email to non-responders
   - Emphasize deadline & flexibility

3. **Confirm participants** (after 10 confirmations)
   - Send Zoom links
   - Send briefing documents
   - Reconfirm 24 hours before testing

## Troubleshooting

### No contractors found
**Problem**: "No active contractors found"
**Solution**: Check that contractors have:
- Email address on file
- At least one claim in past 90 days

### SendGrid auth error
**Problem**: "Invalid SendGrid API key"
**Solution**: Check `SENDGRID_API_KEY` in `.env`

### Emails not sending
**Problem**: Specific emails fail
**Solution**: Check email format, retry with `--limit 1` on failing email

## Rollback

If something goes wrong during sending:

1. Stop the script (Ctrl+C)
2. Fix the issue
3. Re-run with `--dry-run` to verify
4. Send to remaining contractors only (edit recipient list)

## Next Steps After Sending

1. **Day 1**: Monitor for responses
2. **Day 2**: Follow up with non-responders
3. **Day 3-5**: Conduct testing sessions
4. **Day 6**: Assess results
5. **Day 7-8**: Compile feedback report
6. **Day 9**: Finalize pre-deployment checklist

---

**Document Created**: January 9, 2026
**Script Language**: TypeScript/Node.js
**Status**: Ready to execute
