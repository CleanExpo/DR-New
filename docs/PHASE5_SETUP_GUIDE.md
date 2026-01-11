# Phase 5 Environment Variables Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

If you're on macOS/Linux, run the setup script:

```bash
bash scripts/setup-phase5-env.sh
```

Then redeploy:
```bash
git push origin main
```

### Option 2: Manual Setup via Vercel CLI

#### Step 1: Link Project to Vercel

```bash
cd "D:\Disaster Recovery - NRP"
vercel link --yes
```

#### Step 2: Set Critical Variables

The following **MUST** be set for Phase 5 to work:

```bash
# CSRF Protection (CRITICAL)
vercel env add CSRF_SECRET production
# Then paste: 52647752c113d62bcbbb23bc407df764f4f9104e4454363e60e1ea51413fc434

# Security Alert Email
vercel env add SECURITY_ALERT_EMAIL production
# Then paste: security@disasterrecovery.com.au

# Failed Login Settings
vercel env add FAILED_LOGIN_THRESHOLD production
# Then paste: 5

vercel env add FAILED_LOGIN_WINDOW production
# Then paste: 15

vercel env add ACCOUNT_LOCKOUT_DURATION production
# Then paste: 30
```

#### Step 3: Set File Upload Security

```bash
# Maximum file size (10 MB)
vercel env add MAX_FILE_UPLOAD_SIZE production
# Then paste: 10485760

# Allowed file types
vercel env add ALLOWED_FILE_TYPES production
# Then paste: image/jpeg,image/png,image/webp,application/pdf
```

#### Step 4: Set Session Security

```bash
# Max concurrent sessions per user
vercel env add MAX_CONCURRENT_SESSIONS production
# Then paste: 3

# Enable device tracking
vercel env add SESSION_DEVICE_TRACKING production
# Then paste: true
```

#### Step 5: Optional - Set Advanced Features

```bash
# VirusTotal file scanning
vercel env add VIRUS_SCAN_API_KEY production
# Then paste your API key from https://www.virustotal.com

# Google Analytics 4
vercel env add NEXT_PUBLIC_GA4_MEASUREMENT_ID production
# Then paste your G-XXXXXXXXXX ID

# Sentry error tracking
vercel env add SENTRY_DSN production
# Then paste your Sentry DSN URL
```

#### Step 6: Redeploy

```bash
git push origin main
# or manually redeploy from Vercel dashboard
```

### Option 3: Manual Setup via Vercel Dashboard

1. Go to: https://vercel.com/disaster-recovery/disaster-recovery-seven/settings/environment-variables
2. Click **Add New Variable**
3. Enter each variable with its value:

**Critical Variables:**
| Name | Value | Notes |
|------|-------|-------|
| `CSRF_SECRET` | `52647752c113d62bcbbb23bc407df764f4f9104e4454363e60e1ea51413fc434` | Required for CSRF protection |
| `SECURITY_ALERT_EMAIL` | `security@disasterrecovery.com.au` | Required for alerts |
| `FAILED_LOGIN_THRESHOLD` | `5` | Failed attempts before lockout |
| `FAILED_LOGIN_WINDOW` | `15` | Time window in minutes |
| `ACCOUNT_LOCKOUT_DURATION` | `30` | Lockout duration in minutes |

**File Upload Security:**
| Name | Value | Notes |
|------|-------|-------|
| `MAX_FILE_UPLOAD_SIZE` | `10485760` | 10 MB in bytes |
| `ALLOWED_FILE_TYPES` | `image/jpeg,image/png,image/webp,application/pdf` | Comma-separated MIME types |

**Session Security:**
| Name | Value | Notes |
|------|-------|-------|
| `MAX_CONCURRENT_SESSIONS` | `3` | Max devices per user |
| `SESSION_DEVICE_TRACKING` | `true` | Track devices |

**Optional Variables:**
| Name | Value | Notes |
|------|-------|-------|
| `VIRUS_SCAN_API_KEY` | Your API key | From virustotal.com |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | From analytics.google.com |
| `SENTRY_DSN` | Your DSN URL | From sentry.io |

---

## Verification

### 1. Check Environment Variables are Set

```bash
vercel env list production
```

You should see all variables listed.

### 2. Test CSRF Protection

```bash
# Test endpoint (should return token)
curl https://disaster-recovery-seven.vercel.app/api/csrf/token

# Should return:
# {"token":"xxxx-xxxx-xxxx"}
```

### 3. Test Health Check

```bash
curl https://disaster-recovery-seven.vercel.app/api/health

# Should return:
# {"status":"healthy","timestamp":"...","services":{...}}
```

### 4. Test Security Alerts

Login to the app and fail login 5+ times to trigger security alert.
Check email at `security@disasterrecovery.com.au` for alert.

---

## Troubleshooting

### "CSRF configuration error" on `/api/csrf/token`

**Problem**: CSRF_SECRET is not set or invalid

**Solution**:
```bash
# Verify CSRF_SECRET is set
vercel env list production | grep CSRF_SECRET

# If missing, set it:
vercel env add CSRF_SECRET production
# Paste: 52647752c113d62bcbbb23bc407df764f4f9104e4454363e60e1ea51413fc434

# Redeploy:
git push origin main
```

### "Not receiving security alerts"

**Problem**: SECURITY_ALERT_EMAIL not set or SendGrid not configured

**Solution**:
```bash
# Check email is set
vercel env list production | grep SECURITY_ALERT_EMAIL

# Check SendGrid API key exists
vercel env list production | grep SENDGRID_API_KEY

# If SendGrid missing, it needs to be added separately
# Contact DevOps to set SENDGRID_API_KEY in Vercel
```

### Endpoints still returning 404

**Problem**: New variables not picked up after redeploy

**Solution**:
1. Verify variables are set: `vercel env list production`
2. Trigger redeploy: `git push origin main`
3. Wait 2-3 minutes for build to complete
4. Check build status: https://vercel.com/disaster-recovery/disaster-recovery-seven
5. If build failed, check error logs in Vercel dashboard

---

## What Gets Enabled

Once environment variables are set and deployed, the following features become active:

✅ **CSRF Protection** - All forms protected against cross-site request forgery
✅ **Failed Login Alerts** - Email alerts when 5+ failed logins detected
✅ **Account Lockout** - Accounts locked after failed login attempts
✅ **Security Monitoring** - Real-time threat detection
✅ **File Upload Security** - Dangerous files blocked, allowed types enforced
✅ **Session Security** - Max 3 concurrent devices per user
✅ **Device Tracking** - Track which devices user logged in from

---

## Documentation

For detailed information about Phase 5 features, see:
- `docs/phase-5/README.md` - Feature overview
- `docs/phase-5/SECURITY_MONITORING_ADMIN_GUIDE.md` - Admin guide
- `docs/phase-5/ENVIRONMENT_VARIABLES_SETUP.md` - Detailed variable guide

---

## Next Steps

1. ✅ Set all critical environment variables
2. ✅ Redeploy to Vercel
3. ⏳ Test endpoints are working
4. ⏳ Enable 2FA for users
5. ⏳ Configure Twilio for SMS (optional)
6. ⏳ Set up analytics (optional)
