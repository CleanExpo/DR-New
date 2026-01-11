# Vercel Environment Variables Setup Instructions

## Status
Due to project naming constraints with Vercel CLI, manual setup via dashboard is recommended.

## Quick Setup (Vercel Dashboard)

### Step 1: Access Environment Variables Settings
1. Go to: https://vercel.com/disaster-recovery/disaster-recovery-seven/settings/environment-variables
2. Login if needed

### Step 2: Add Each Variable

Click **Add New Variable** for each:

| # | Name | Value | Environment |
|---|------|-------|-------------|
| 1 | `CSRF_SECRET` | `52647752c113d62bcbbb23bc407df764f4f9104e4454363e60e1ea51413fc434` | Production |
| 2 | `SECURITY_ALERT_EMAIL` | `security@disasterrecovery.com.au` | Production |
| 3 | `FAILED_LOGIN_THRESHOLD` | `5` | Production |
| 4 | `FAILED_LOGIN_WINDOW` | `15` | Production |
| 5 | `ACCOUNT_LOCKOUT_DURATION` | `30` | Production |
| 6 | `MAX_FILE_UPLOAD_SIZE` | `10485760` | Production |
| 7 | `ALLOWED_FILE_TYPES` | `image/jpeg,image/png,image/webp,application/pdf` | Production |
| 8 | `MAX_CONCURRENT_SESSIONS` | `3` | Production |
| 9 | `SESSION_DEVICE_TRACKING` | `true` | Production |

### Step 3: Save & Redeploy

After adding all variables:
1. Click **Save** on each variable
2. Go to **Deployments** tab
3. Find the latest deployment
4. Click the **...** menu → **Redeploy**
5. Wait for deployment to complete (2-3 minutes)

### Step 4: Verify

Test the endpoints:
```bash
# Test CSRF endpoint
curl https://disaster-recovery-seven.vercel.app/api/csrf/token

# Test health check
curl https://disaster-recovery-seven.vercel.app/api/health

# Test analytics
curl https://disaster-recovery-seven.vercel.app/api/analytics/realtime?format=json
```

All should return successful responses (200 OK).

---

## Environment Variables Summary

**Critical (Required)**:
- `CSRF_SECRET` - Token generation secret
- `SECURITY_ALERT_EMAIL` - Alert recipient

**Security**:
- `FAILED_LOGIN_THRESHOLD` - Failed login attempts before lockout
- `FAILED_LOGIN_WINDOW` - Time window for counting attempts (minutes)
- `ACCOUNT_LOCKOUT_DURATION` - Lockout duration (minutes)

**File Upload**:
- `MAX_FILE_UPLOAD_SIZE` - Maximum file size in bytes (10 MB)
- `ALLOWED_FILE_TYPES` - Comma-separated MIME types

**Session Security**:
- `MAX_CONCURRENT_SESSIONS` - Max devices per user
- `SESSION_DEVICE_TRACKING` - Track device/location logins

---

## What Gets Activated

Once deployed with these variables:

✅ CSRF protection on all forms
✅ Failed login alerts via email
✅ Automatic account lockouts
✅ Real-time security monitoring
✅ File upload restrictions
✅ Session security controls
✅ Real-time analytics streaming
✅ Health check endpoint

---

## Troubleshooting

### Endpoints still returning 404
- Verify all 9 variables are set in Vercel
- Trigger a redeploy
- Wait 3-5 minutes for changes to propagate
- Check deployment status in Vercel dashboard

### Email alerts not working
- Verify `SECURITY_ALERT_EMAIL` is correct
- Check spam folder
- Verify SendGrid API key is configured in Vercel

### Build failures after setting variables
- Check Vercel build logs
- Ensure variable values don't contain invalid characters
- Redeploy with correct variable values

---

## Next Steps

After environment variables are set and verified:
1. Enable 2FA for users (see `docs/phase-5/2FA_USER_GUIDE.md`)
2. Configure optional features:
   - Twilio SMS: Add `TWILIO_*` variables
   - Analytics: Add `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - Error tracking: Add `SENTRY_DSN`
3. Monitor security alerts in dashboard
4. Review `docs/phase-5/SECURITY_MONITORING_ADMIN_GUIDE.md`

---

**Last Updated**: January 11, 2026
**Phase 5 Status**: Ready for production
