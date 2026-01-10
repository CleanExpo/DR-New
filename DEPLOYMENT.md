# Production Deployment Guide

**Disaster Recovery NRPG Platform**
**Last Updated**: January 11, 2026

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Environment Configuration](#environment-configuration)
4. [Deployment to Vercel](#deployment-to-vercel)
5. [Post-Deployment Verification](#post-deployment-verification)
6. [Monitoring & Alerts](#monitoring--alerts)
7. [Rollback Procedures](#rollback-procedures)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- [ ] Vercel account and project created
- [ ] PostgreSQL database (Cloud SQL, RDS, or Supabase)
- [ ] Upstash Redis account
- [ ] SendGrid account with API key
- [ ] Twilio account for SMS (optional)
- [ ] Sentry account for error tracking
- [ ] Google OAuth credentials
- [ ] VirusTotal API key (optional)
- [ ] GitHub repository with secrets configured

---

## Database Setup

### 1. Create Cloud PostgreSQL Database

**Option A: Using Supabase (Recommended)**
```bash
# Create new Supabase project
# Copy connection string to DATABASE_URL and DIRECT_URL
# Includes PostgREST, Auth, Storage, Realtime
```

**Option B: Using AWS RDS**
```bash
# Create RDS PostgreSQL instance
# Configure security groups for Vercel IP ranges
# Copy connection string to DATABASE_URL
```

**Option C: Using Google Cloud SQL**
```bash
# Create Cloud SQL instance
# Enable Cloud SQL Auth proxy
# Configure SSL certificates
```

### 2. Run Database Migrations

```bash
# Set DATABASE_URL to your production database
export DATABASE_URL="postgresql://user:password@host/db"

# Push Prisma schema
npx prisma migrate deploy

# Run seed script (if applicable)
npm run db:seed

# Verify migration
npx prisma db:execute --stdin < verify.sql
```

### 3. Verify Database Connection

```bash
# Test connection from local machine
psql $DATABASE_URL -c "SELECT NOW();"

# Check migration status
npx prisma migrate status

# View database info
npx prisma db:info
```

---

## Environment Configuration

### 1. Generate Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate CSRF secret
openssl rand -hex 16 | base64

# Generate JWT secret
openssl rand -hex 32
```

### 2. Vercel Secrets Manager

Go to **Project Settings → Environment Variables** and add:

```env
# Database
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://disaster-recovery-seven.vercel.app
NEXTAUTH_SECRET=<generated-secret>

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=<token>

# OAuth
GOOGLE_CLIENT_ID=<google-id>
GOOGLE_CLIENT_SECRET=<google-secret>

# Security
CSRF_SECRET=<generated-secret>
JWT_SECRET=<generated-secret>
SECURITY_ALERT_EMAIL=security@disasterrecovery.com.au

# Email
SENDGRID_API_KEY=<key>
SENDGRID_FROM_EMAIL=noreply@disasterrecovery.com.au

# SMS (Optional)
TWILIO_ACCOUNT_SID=<sid>
TWILIO_AUTH_TOKEN=<token>
TWILIO_PHONE_NUMBER=+61XXXXXXXXX

# Monitoring
SENTRY_DSN=https://...
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-...

# File Upload
VIRUS_SCAN_API_KEY=<optional>
```

### 3. Verify Environment Variables

```bash
# Check which env vars are set
vercel env ls

# View specific environment
vercel env pull .env.local

# Test variable access
curl https://disaster-recovery-seven.vercel.app/api/health
```

---

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Deploy from Git (Recommended)

```bash
# Push to main branch
git push origin main

# Vercel automatically deploys via GitHub integration
# Monitor at: https://vercel.com/projects/disaster-recovery-nrpg
```

### 3. Manual Deployment

```bash
# Login to Vercel
vercel login

# Deploy to staging
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel status

# View logs
vercel logs
```

### 4. Configure Custom Domain

```bash
# Add domain in Vercel project settings
# Update DNS records at registrar:
# - Add A record: 76.76.19.0
# - Add CNAME record for www

# Verify DNS
vercel domains ls
```

### 5. Setup GitHub Integration

```
1. Go to Vercel Dashboard → Project Settings
2. Click "Git"
3. Connect GitHub repository
4. Enable "Automatic Deployments" for main branch
5. Set production branch: main
6. Set preview deployment source: All
```

---

## Post-Deployment Verification

### 1. Health Check

```bash
# Check API health
curl https://disaster-recovery-seven.vercel.app/api/health

# Expected response:
# {
#   "status": "healthy",
#   "database": "connected",
#   "redis": "connected",
#   "timestamp": "2026-01-11T00:00:00Z"
# }
```

### 2. Authentication Test

```bash
# Test NextAuth
curl -X POST https://disaster-recovery-seven.vercel.app/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### 3. Database Connection

```bash
# Check database is accessible
curl https://disaster-recovery-seven.vercel.app/api/db-health
```

### 4. Security Tests

```bash
# Test CSRF protection
curl -X POST https://disaster-recovery-seven.vercel.app/api/csrf/token \
  -H "Content-Type: application/json" \
  -d '{"token":"invalid"}'

# Test rate limiting
for i in {1..50}; do curl https://disaster-recovery-seven.vercel.app/api/health; done
```

### 5. Analytics

```bash
# Check Google Analytics
# View: https://analytics.google.com → disaster-recovery-nrpg

# Check Sentry
# View: https://sentry.io → disaster-recovery-nrpg
```

---

## Monitoring & Alerts

### 1. Setup Sentry Error Tracking

```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Authenticate
sentry-cli login

# Create release
sentry-cli releases create $(git rev-parse --short HEAD)

# Verify
curl https://sentry.io/api/0/organizations/your-org/releases/
```

### 2. Configure Prometheus Metrics

```bash
# Access metrics endpoint
curl https://disaster-recovery-seven.vercel.app/api/metrics

# Setup Prometheus scraper (external)
# Scrape interval: 15s
# Targets: https://disaster-recovery-seven.vercel.app/api/metrics
```

### 3. Setup Slack Notifications

```bash
# Create Slack webhook
# Settings → Apps → Incoming Webhooks

# Add to Vercel
vercel env add SLACK_WEBHOOK <webhook-url>

# Test
curl -X POST <webhook-url> \
  -H "Content-Type: application/json" \
  -d '{"text":"Deployment successful"}'
```

### 4. Email Alerts

```bash
# Configure SendGrid for alerts
# SENDGRID_API_KEY is set in env vars
# Alerts sent to: SECURITY_ALERT_EMAIL

# Test email
curl -X POST https://disaster-recovery-seven.vercel.app/api/test/email \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## Rollback Procedures

### 1. Rollback to Previous Deployment

```bash
# View deployment history
vercel ls

# Rollback to previous
vercel rollback <deployment-id>

# Or promote a specific deployment
vercel promote <deployment-id> --prod
```

### 2. Database Rollback

```bash
# List migrations
npx prisma migrate status

# Rollback one migration
npx prisma migrate resolve --rolled-back <migration-name>

# Re-deploy
npx prisma migrate deploy
```

### 3. Code Rollback

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Vercel will auto-deploy the reverted code
```

---

## Troubleshooting

### Issue: Database Connection Failed

```bash
# Check connection string
vercel env pull
grep DATABASE_URL .env.local

# Verify database is accessible
psql $DATABASE_URL -c "SELECT NOW();"

# Check firewall rules
# - Allow Vercel IP ranges (76.76.19.0/24)
# - Allow your local IP for testing

# Solution:
# 1. Verify DATABASE_URL syntax
# 2. Check database server is running
# 3. Verify network/firewall rules
# 4. Re-deploy: vercel --prod
```

### Issue: CSRF Tokens Invalid

```bash
# Check CSRF_SECRET is set
vercel env ls | grep CSRF

# Generate new secret
openssl rand -hex 16 | base64
vercel env add CSRF_SECRET <new-secret>

# Clear token cache
curl -X DELETE https://disaster-recovery-seven.vercel.app/api/csrf/cache

# Solution: Redeploy with new secret
vercel --prod
```

### Issue: 2FA Not Working

```bash
# Check TOTP dependencies
npm list otplib qrcode

# Verify TOTP secret generation
curl https://disaster-recovery-seven.vercel.app/api/auth/2fa/setup

# Check database 2FA fields exist
npx prisma db:execute --stdin < check-2fa.sql

# Solution:
# 1. Run migrations: npx prisma migrate deploy
# 2. Verify twoFactorSecret field exists
# 3. Restart application: vercel --prod
```

### Issue: File Upload Blocked

```bash
# Check file scanner config
curl https://disaster-recovery-seven.vercel.app/api/security/upload

# Check VirusTotal API key
vercel env ls | grep VIRUS

# Verify ALLOWED_FILE_TYPES
grep ALLOWED_FILE_TYPES .env.production

# Solution:
# 1. Set VIRUS_SCAN_API_KEY if using VirusTotal
# 2. Verify ALLOWED_FILE_TYPES includes your format
# 3. Re-deploy: vercel --prod
```

### Issue: High Memory Usage

```bash
# Check Vercel logs
vercel logs --limit 100

# Monitor functions
vercel env ls | grep NODE

# Increase timeout
# In vercel-production.json: "maxDuration": 60

# Solution:
# 1. Check for memory leaks in code
# 2. Optimize database queries
# 3. Increase function timeout
# 4. Re-deploy: vercel --prod
```

---

## Monitoring Checklist

Daily:
- [ ] Check Sentry error tracking dashboard
- [ ] Review application logs
- [ ] Monitor database performance
- [ ] Check uptime monitoring

Weekly:
- [ ] Review security alerts
- [ ] Check backups were completed
- [ ] Verify SSL certificates
- [ ] Review failed login attempts

Monthly:
- [ ] Security audit
- [ ] Performance review
- [ ] Database optimization
- [ ] Dependency updates

---

## Support & Escalation

**On-Call Engineering**: security@disasterrecovery.com.au
**Emergency Contact**: +61-2-XXXX-XXXX
**Sentry Alerts**: Automatic to security email
**Slack Alerts**: #disaster-recovery-alerts channel

---

## Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificates valid
- [ ] Security headers enabled
- [ ] CSRF protection active
- [ ] 2FA working
- [ ] File upload scanning enabled
- [ ] Sentry error tracking configured
- [ ] Slack notifications configured
- [ ] Email alerts configured
- [ ] Health check passing
- [ ] Authentication tests passing
- [ ] Database tests passing
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Team training completed
- [ ] Runbook documented
- [ ] Rollback procedure tested

---

## Post-Deployment Support

For issues or questions after deployment, contact the engineering team or open an issue in GitHub.

**Production Status**: https://status.disasterrecovery.com.au
**Documentation**: https://docs.disasterrecovery.com.au
**API Reference**: https://api.disasterrecovery.com.au/docs

---

**Last Deployed**: [timestamp]
**Deployed By**: [user]
**Commit Hash**: [hash]
**Environment**: production
