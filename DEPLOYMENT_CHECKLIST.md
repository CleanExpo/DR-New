# Production Deployment Checklist

**Project**: Disaster Recovery - NRPG Platform
**Version**: 1.0.0
**Date**: 2026-01-13

---

## Pre-Deployment Verification

### Build Status
- [x] Production build succeeds (`npm run build`)
- [x] No TypeScript errors
- [x] No critical ESLint errors
- [x] Prisma schema valid

### Security Audit
- [x] Redis rate limiting configured (Upstash)
- [x] CORS whitelist configured (no wildcard)
- [x] Server-side authentication on dashboard routes
- [x] Resource-level authorization on API endpoints
- [x] NEXTAUTH_SECRET validation (fails in production if missing)
- [x] hCaptcha enforced in production
- [x] Account lockout after failed login attempts
- [x] Audit logging for login events

---

## Required Environment Variables

### Critical (App Won't Start Without These)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Session signing secret (32+ chars) | Generate: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Application URL | `https://disaster-recovery-seven.vercel.app` |

### Important (Features Degraded Without These)

| Variable | Description | Service |
|----------|-------------|---------|
| `STRIPE_SECRET_KEY` | Stripe API key | Payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing | Payment webhooks |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | Rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis token | Rate limiting |
| `HCAPTCHA_SECRET` | hCaptcha server key | Bot protection |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha client key | Bot protection |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | Security |

### Optional (Enhanced Features)

| Variable | Description | Service |
|----------|-------------|---------|
| `SENDGRID_API_KEY` | SendGrid API key | Email |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key | Maps |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics | Analytics |
| `SENTRY_DSN` | Sentry DSN | Error tracking |

---

## Vercel Deployment Steps

### 1. Environment Variables Setup

```bash
# In Vercel Dashboard > Settings > Environment Variables

# Critical - Mark as "Encrypted"
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generated-secret>
NEXTAUTH_URL=https://your-domain.vercel.app

# Stripe - Mark as "Encrypted"
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Redis - Mark as "Encrypted"
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=...

# CAPTCHA - Mark HCAPTCHA_SECRET as "Encrypted"
HCAPTCHA_SECRET=...
NEXT_PUBLIC_HCAPTCHA_SITE_KEY=...

# CORS
CORS_ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### 2. Database Setup

```bash
# Run migrations on production database
npx prisma migrate deploy

# Verify schema
npx prisma validate
```

### 3. Stripe Webhook Configuration

1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.*`
   - `invoice.*`
4. Copy webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### 4. hCaptcha Setup

1. Go to https://dashboard.hcaptcha.com/
2. Create new site
3. Copy Site Key to `NEXT_PUBLIC_HCAPTCHA_SITE_KEY`
4. Copy Secret Key to `HCAPTCHA_SECRET`

### 5. Upstash Redis Setup

1. Go to https://console.upstash.com/
2. Create new Redis database
3. Copy REST URL to `UPSTASH_REDIS_REST_URL`
4. Copy REST Token to `UPSTASH_REDIS_REST_TOKEN`

---

## Post-Deployment Verification

### Functional Tests

- [ ] Homepage loads correctly (`/`)
- [ ] Login/logout works (`/login`)
- [ ] Dashboard accessible after login (`/dashboard`)
- [ ] Contractor join form works (`/join`)
- [ ] Service request form works
- [ ] Payment flow completes (test mode)
- [ ] Email notifications sent

### Security Tests

- [ ] Rate limiting active (try 10+ rapid requests)
- [ ] CORS blocks unauthorized origins
- [ ] Unauthenticated users redirected from `/dashboard`
- [ ] hCaptcha required on public forms
- [ ] Account locks after 5 failed logins

### Performance Tests

- [ ] Core Web Vitals passing
- [ ] First Contentful Paint < 2s
- [ ] No console errors on production

---

## Monitoring Setup

### Recommended Services

1. **Error Tracking**: Sentry
   - Configure `SENTRY_DSN`
   - Enable source maps

2. **Analytics**: Google Analytics 4
   - Configure `NEXT_PUBLIC_GA4_MEASUREMENT_ID`

3. **Uptime Monitoring**: UptimeRobot or Vercel Analytics
   - Monitor `/api/health` endpoint

4. **Log Aggregation**: Vercel Logs or LogDNA
   - Review logs weekly

---

## Rollback Procedure

If issues occur after deployment:

1. **Immediate**: Revert to previous deployment in Vercel Dashboard
2. **Database**: Keep database migrations backward-compatible
3. **Emergency**: Use Vercel's instant rollback feature

---

## Support Contacts

- **Technical Issues**: Check GitHub Issues
- **Platform Support**: support@disasterrecovery.com.au
- **Security Issues**: Report via GitHub Security tab

---

## Deployment Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| Reviewer | | | |
| Approver | | | |

---

**Note**: This checklist should be reviewed and updated before each major deployment.
