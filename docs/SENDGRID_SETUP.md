# SendGrid Configuration & Environment Setup Guide

> **Prerequisites**: DNS records must be configured (see `EMAIL_DNS_SETUP.md`)
> **Status**: Required before email sending
> **Time Required**: 10-15 minutes

---

## Overview

SendGrid is the email service provider we use to send contractor recruitment emails. This guide covers:
1. Creating a SendGrid account and API key
2. Setting up environment variables locally
3. Configuring environment variables in Vercel (production)
4. Verifying the setup works

---

## Part 1: SendGrid Account & API Key

### Step 1: Access SendGrid

1. Go to https://sendgrid.com/
2. If you already have an account, click **"Sign In"** (top right)
3. If you don't have an account, click **"Start Free"** and follow signup

### Step 2: Verify Your Domain in SendGrid

Once logged in:

1. Go to **Settings** → **Sender Authentication** (or similar menu)
2. Look for "Authenticate your domain" section
3. You should see `disasterrecovery.com.au` in the list
4. **Status should show**: "Authenticated ✓" (if DNS records were added correctly)

> **Not authenticated yet?** This is normal if DNS records were just added. DNS takes 1-48 hours to propagate. Run `npm run email:verify-dns` to check status.

### Step 3: Create or Retrieve API Key

#### Creating a New API Key:

1. Go to **Settings** → **API Keys** (sometimes under "Developer" section)
2. Click **"Create API Key"** or **"Generate New Key"**
3. Give it a name like: `NRPG Recruitment Emails`
4. Select **"Restricted Access"** (more secure)
5. Under **Permissions**, select:
   - **Mail Send** → Full Access (required for sending)
   - Leave other permissions unchecked
6. Click **"Create & Copy"** or **"Save"**
7. **Copy the key immediately** - you'll need it in the next step
8. Key format: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (long string starting with "SG.")

#### If You Already Have a Key:

1. Go to **Settings** → **API Keys**
2. Find the key named `NRPG Recruitment Emails` or similar
3. If the key is visible, click **"Copy"** (usually a copy icon)
4. If the key is hidden/masked, you'll need to generate a new one

> **⚠️ Important**: API keys are sensitive. Never share them or commit them to Git. Only paste them in `.env` files or secret management systems.

---

## Part 2: Local Environment Setup (.env.local)

### Step 1: Create or Edit .env.local File

In the project root directory (same level as package.json), create or edit `.env.local`:

**File Location**: `D:\Disaster Recovery - NRP\.env.local`

### Step 2: Add SendGrid Variables

Copy and paste these lines into `.env.local`:

```bash
# SendGrid Configuration (Email Service)
SENDGRID_API_KEY=SG.YOUR_API_KEY_HERE
EMAIL_FROM=support@disasterrecovery.com.au
EMAIL_FROM_NAME=NRPG Team

# Recruitment Campaign
NRPG_RECRUITMENT_PHONE=1800 XXX XXXX
```

### Step 3: Replace with Your Values

1. **SENDGRID_API_KEY**: Replace `SG.YOUR_API_KEY_HERE` with the key you copied in Part 1
   - Should look like: `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (very long string)
   - Paste the entire key, don't add quotes

2. **EMAIL_FROM**: This is the "From" address for emails
   - Default: `support@disasterrecovery.com.au` (must be verified in SendGrid!)
   - This must match a verified sender in SendGrid, or emails will bounce

3. **EMAIL_FROM_NAME**: This is the display name
   - Default: `NRPG Team`
   - Change if desired

4. **NRPG_RECRUITMENT_PHONE**: Optional phone number for contractors to call
   - Current: `1800 XXX XXXX` (placeholder)
   - Update with actual phone if available

### Step 4: Save the File

1. Save `.env.local` (Ctrl+S or File → Save)
2. **Never commit this file to Git** - it's already in `.gitignore`

### Step 5: Verify Local Setup

Test that environment variables are loaded correctly:

```bash
npm run email:dry-run
```

**Expected output** should show:
- Email configuration loaded
- 20 mock contractors found
- Campaign ready (no actual emails sent in dry-run mode)

**If you see errors**, check:
- `.env.local` file exists and is readable
- No syntax errors (colons, quotes, etc.)
- API key is complete and correct

---

## Part 3: Production Setup (Vercel)

### Step 1: Access Vercel Dashboard

1. Go to https://vercel.com/
2. Log in with your credentials
3. Select the project: **Disaster Recovery NRPG** (or similar)
4. Go to **Settings** tab (usually top navigation)

### Step 2: Environment Variables Section

1. In Settings, find **"Environment Variables"** (left sidebar)
2. Click on it to expand
3. You should see a form to add new variables

### Step 3: Add SendGrid Variables

Add each variable separately by filling in the form and clicking **"Save"**:

#### Variable 1: SENDGRID_API_KEY

| Field | Value |
|-------|-------|
| **Key** | `SENDGRID_API_KEY` |
| **Value** | `SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (your API key) |
| **Environments** | Select all: Production, Preview, Development |
| **Encrypt** (if available) | ✅ Check this for security |

1. Type the key name in the first field
2. Paste your API key in the "Value" field
3. Select all environments (checkboxes for Production/Preview/Development)
4. If there's an "Encrypt this variable" option, check it
5. Click **"Save"** or **"Add"**

#### Variable 2: EMAIL_FROM

| Field | Value |
|-------|-------|
| **Key** | `EMAIL_FROM` |
| **Value** | `support@disasterrecovery.com.au` |
| **Environments** | Select all: Production, Preview, Development |

Repeat the add process for this variable.

#### Variable 3: EMAIL_FROM_NAME

| Field | Value |
|-------|-------|
| **Key** | `EMAIL_FROM_NAME` |
| **Value** | `NRPG Team` |
| **Environments** | Select all: Production, Preview, Development |

Repeat the add process for this variable.

#### Variable 4: NRPG_RECRUITMENT_PHONE

| Field | Value |
|-------|-------|
| **Key** | `NRPG_RECRUITMENT_PHONE` |
| **Value** | `1800 XXX XXXX` (or actual phone) |
| **Environments** | Select all: Production, Preview, Development |

Repeat the add process for this variable.

### Step 4: Verify Variables in Vercel

1. After adding all 4 variables, they should appear in the list
2. You should see:
   - ✅ SENDGRID_API_KEY (encrypted, showing only first/last few characters)
   - ✅ EMAIL_FROM
   - ✅ EMAIL_FROM_NAME
   - ✅ NRPG_RECRUITMENT_PHONE

### Step 5: Redeploy (if needed)

If you modified environment variables on production:

1. In Vercel, go to **"Deployments"** tab
2. Find the latest deployment
3. Click **"⋯"** (three dots) → **"Redeploy"**
4. Or push a commit to trigger automatic redeploy

---

## Part 4: Verification

### Local Verification

Test locally that everything is configured:

```bash
npm run email:verify-dns
```

**Expected output**:
- ✅ Passed: 4/4
- SendGrid is configured correctly

Then test the email system:

```bash
npm run email:dry-run
```

**Expected output**:
- 20 contractors loaded
- Campaign ready to send
- No errors about environment variables

### SendGrid Verification

1. Go to https://app.sendgrid.com/
2. Check **Settings** → **Sender Authentication**
3. Verify your domain shows: **"Authenticated ✓"**

---

## Troubleshooting

### Issue: "Invalid API Key" or 401 Errors

**Symptoms**: Emails fail with 401 Unauthorized error

**Causes & Solutions**:
1. **Expired API Key**: SendGrid account free trial expired
   - Solution: Upgrade to paid plan (https://sendgrid.com/pricing/)
   - Cost: Starting at $19.95/month for 50,000 emails

2. **Wrong API Key**: Key was regenerated or incorrect
   - Solution: Generate a new API key and update both `.env.local` and Vercel

3. **API Key Not Copied Correctly**: Key is incomplete or has extra characters
   - Solution: Copy again from SendGrid, paste carefully
   - Format should be: `SG.xxxxxxxxx` (starts with SG.)

### Issue: "Domain Not Authenticated"

**Symptoms**: Emails bounced with "Domain authentication required"

**Causes & Solutions**:
1. **DNS records not configured**: Haven't added the 4 DNS records yet
   - Solution: Complete `EMAIL_DNS_SETUP.md` first

2. **DNS not propagated**: Added records but DNS hasn't propagated
   - Solution: Wait 1-4 hours, then run `npm run email:verify-dns`

3. **Wrong domain in SendGrid**: Authenticated a different domain
   - Solution: Go to SendGrid Settings, add `disasterrecovery.com.au` and authenticate

### Issue: Emails Not Sending (Script Runs But No Emails Delivered)

**Check in order**:

1. **Is the SendGrid account active?**
   - Go to https://app.sendgrid.com/
   - Should show active plan (paid or extended trial)

2. **Are environment variables set?**
   - Run: `npm run email:dry-run`
   - Check output for "Email configured" or similar
   - Should NOT show error about missing variables

3. **Are contractor emails correct?**
   - Run: `npm run email:dry-run`
   - Check the email list - all should be valid email formats

4. **Is SendGrid API reachable?**
   - Test: `curl https://api.sendgrid.com/v3/mail/send -H "Authorization: Bearer YOUR_KEY"`
   - Should respond with error (that's ok), not timeout

### Issue: Test Email to Wrong Address

**Prevention**: Always test with `npm run email:dry-run` first

**If Already Sent**:
1. Check the email address in contractor list
2. Ask the recipient to delete it
3. SendGrid doesn't have recall feature

---

## Security Best Practices

✅ **DO**:
- Store API keys in `.env.local` and Vercel only
- Mark API keys as "Encrypted" in Vercel
- Use "Restricted Access" API keys (only email send permission)
- Rotate API keys monthly for added security
- Never share API key via email or chat

❌ **DON'T**:
- Commit `.env` files to Git
- Share API key in GitHub issues or PRs
- Use the same API key across multiple projects
- Leave API keys in code comments
- Give full access permissions to API keys

---

## Verification Checklist

Before sending emails, verify:

- [ ] SendGrid account created and active
- [ ] API key generated (format: `SG.xxxxx`)
- [ ] DNS records added and propagated (run `npm run email:verify-dns`)
- [ ] `.env.local` file created with all 4 variables
- [ ] Vercel environment variables set for all 4 variables
- [ ] Dry run succeeds: `npm run email:dry-run`
- [ ] Email template renders correctly (check dry run output)
- [ ] Contractor list shows 20 contractors
- [ ] SendGrid domain authenticated in dashboard
- [ ] Ready to send!

---

## Next Steps

Once all variables are configured:

1. **Run DNS verification**: `npm run email:verify-dns`
2. **Create test scripts**: See `EMAIL_TESTING_GUIDE.md`
3. **Execute pre-flight check**: `npm run email:preflight` (when created)
4. **Dry run test**: `npm run email:dry-run`
5. **Send test email**: Test with your own email first
6. **Production send**: `npm run email:send --confirm`

---

## Support

**SendGrid Help**:
- Documentation: https://docs.sendgrid.com/
- Support: https://support.sendgrid.com/
- Status: https://status.sendgrid.com/

**Project Support**:
- Email: support@disasterrecovery.com.au
- For DNS issues: See `EMAIL_DNS_SETUP.md`
- For email script: See `scripts/README-RECRUITMENT-EMAILS.md`

---

## Summary

| Task | Completed? |
|------|-----------|
| Create SendGrid account | ☐ |
| Generate API key | ☐ |
| Create `.env.local` | ☐ |
| Add Vercel environment variables | ☐ |
| Verify DNS records | ☐ |
| Test dry run | ☐ |
| Ready to send | ☐ |

---

**Created**: January 9, 2026
**Version**: 1.0
**Status**: Ready for configuration
