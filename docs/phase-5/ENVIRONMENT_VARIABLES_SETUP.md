# Environment Variables Setup Guide

## Critical Variables (Required)

These variables **MUST** be set for Phase 5 to function:

### CSRF_SECRET

**Purpose**: Secret key for CSRF token generation and validation

**Type**: String (minimum 32 characters)

**Required**: YES

**Generate**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Setup**: Set in `.env.local` for development or Vercel for production

---

### SECURITY_ALERT_EMAIL

**Purpose**: Email address where security alerts are sent

**Type**: Email address

**Required**: YES (for alerts to be useful)

**Setup**:
```
security@disasterrecovery.com.au
```

---

## Failed Login Settings

### FAILED_LOGIN_THRESHOLD
- **Default**: 5 failed attempts
- **Type**: Number
- **Purpose**: Lockout trigger

### FAILED_LOGIN_WINDOW
- **Default**: 15 minutes
- **Type**: Number
- **Purpose**: Time window for counting attempts

### ACCOUNT_LOCKOUT_DURATION
- **Default**: 30 minutes
- **Type**: Number
- **Purpose**: How long account is locked

---

## File Upload Security

### MAX_FILE_UPLOAD_SIZE
- **Default**: 10485760 (10 MB)
- **Type**: Number (bytes)

### ALLOWED_FILE_TYPES
- **Default**: `image/jpeg,image/png,image/webp,application/pdf`
- **Type**: Comma-separated MIME types

### VIRUS_SCAN_API_KEY (Optional)
- **Purpose**: VirusTotal file scanning
- **Obtain**: https://www.virustotal.com
- **Free Tier**: 500 requests/day

---

## Analytics & Error Tracking (Optional)

### NEXT_PUBLIC_GA4_MEASUREMENT_ID
- **Purpose**: Google Analytics 4 tracking
- **Format**: `G-XXXXXXXXXX`
- **Obtain**: https://analytics.google.com

### SENTRY_DSN
- **Purpose**: Error tracking and monitoring
- **Format**: `https://key@sentry.io/projectid`
- **Obtain**: https://sentry.io

---

## Session Security

### MAX_CONCURRENT_SESSIONS
- **Default**: 3
- **Purpose**: Max devices per user

### SESSION_DEVICE_TRACKING
- **Default**: true
- **Purpose**: Track device/location logins

---

## Setup Instructions

### For Development (Local)

1. Copy variables to `.env.local`
2. Run: `npm run dev`
3. Test endpoints locally

### For Production (Vercel)

**Option 1: Vercel Dashboard**
1. Go to: https://vercel.com/disaster-recovery/disaster-recovery-seven/settings/environment-variables
2. Click **Add New Variable**
3. Enter name and value
4. Select "Production" environment
5. Save and redeploy

**Option 2: Vercel CLI**
```bash
vercel env add VARIABLE_NAME production
# Then enter value and press Enter
```

**Option 3: Automated Script**
```bash
bash scripts/setup-phase5-env.sh
```

---

## Verification

After setting variables:

```bash
# Test CSRF endpoint
curl https://disaster-recovery-seven.vercel.app/api/csrf/token

# Test health check
curl https://disaster-recovery-seven.vercel.app/api/health

# Test real-time analytics
curl https://disaster-recovery-seven.vercel.app/api/analytics/realtime?format=json
```

All should return successful responses (200 OK).

---

## Troubleshooting

### Endpoints returning 404
- Variables not set yet
- Vercel deployment in progress
- Wait 2-3 minutes for build to complete

### "CSRF configuration error"
- CSRF_SECRET not set
- Length < 32 characters
- Redeploy after setting

### Missing email alerts
- SECURITY_ALERT_EMAIL not set
- SendGrid API key not configured
- Check email spam folder

---

## Security Best Practices

✅ **DO**:
- Use strong, randomly generated secrets
- Store in Vercel secrets, not .env files
- Rotate secrets every 6 months
- Use different secrets for dev/staging/production

❌ **DON'T**:
- Commit secrets to git
- Share secrets via email
- Use simple/guessable values
- Log secret values in errors

---

## For More Information

- `PHASE5_SETUP_GUIDE.md` - Quick start setup
- `phase-5/README.md` - Feature overview
- `phase-5/SECURITY_MONITORING_ADMIN_GUIDE.md` - Admin guide
- `phase-5/API_DOCUMENTATION.md` - API reference
