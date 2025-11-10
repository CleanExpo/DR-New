# Deployment Guide - Disaster Recovery Brisbane

## Overview

This guide provides comprehensive deployment procedures, monitoring, and troubleshooting for the Disaster Recovery Brisbane website.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Environment Configuration](#environment-configuration)
3. [Build Process](#build-process)
4. [Deployment Process](#deployment-process)
5. [Monitoring & Health Checks](#monitoring--health-checks)
6. [Rollback Procedures](#rollback-procedures)
7. [Troubleshooting](#troubleshooting)
8. [Performance Optimization](#performance-optimization)

---

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Git
- Vercel CLI (for production deployments)

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd dr-new

# Install dependencies
npm ci --legacy-peer-deps

# Setup environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Validate environment
node scripts/env-validator.js

# Build and test
npm run build
npm run start
```

---

## Environment Configuration

### Required Environment Variables

```bash
# Core Application
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXT_PUBLIC_SITE_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au

# Security
NEXTAUTH_SECRET=<secure-random-string-32-chars-min>

# Database
DATABASE_URL=file:./prod.db

# Build Optimization
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=4096
```

### Environment Validation

Before deployment, always validate environment variables:

```bash
npm run validate-env
```

### Environment Files

- `.env.local` - Local development
- `.env.staging` - Staging environment
- `.env.production` - Production environment
- `.env.production.optimized` - Optimized production config

---

## Build Process

### Standard Build

```bash
npm run build
```

### Optimized Vercel Build

```bash
npm run build:vercel-optimized
```

This script:
- Cleans previous builds
- Validates environment
- Generates Prisma client
- Builds Next.js with optimization
- Analyzes build output

### Build Configuration

**Target Build Time:** < 30 seconds
**Memory Limit:** 4096 MB
**Optimization:** Enabled for production

---

## Deployment Process

### Automated Deployment (GitHub Actions)

Deployments are automatically triggered on push to main branch:

1. **Validate** - Lint, type-check, environment validation
2. **Test** - Run unit tests
3. **Build** - Optimized production build
4. **Deploy** - Deploy to Vercel
5. **Health Check** - Verify deployment
6. **Monitor** - Start monitoring

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to staging
vercel

# Deploy to production
vercel --prod
```

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Build completes successfully
- [ ] Critical pages load correctly
- [ ] No console errors in browser
- [ ] Database migrations applied (if any)
- [ ] Backup created

### Deployment Script

```bash
# Create backup before deployment
node scripts/backup-deployment.js create "Pre-deployment backup"

# Deploy
npm run deploy

# Verify deployment
node scripts/deployment-health-check.js production
```

---

## Monitoring & Health Checks

### Health Check Endpoints

**Primary Health Check:**
```
GET /api/deployment/health
```

Returns:
- Overall health status
- Database connectivity
- Memory usage
- System uptime
- Performance metrics

**Metrics Endpoint:**
```
GET /api/deployment/metrics
```

Returns:
- Deployment information
- Performance metrics
- Runtime statistics
- Resource usage

### Automated Monitoring

```bash
# Single health check
node scripts/deployment-monitor.js once

# Continuous monitoring
node scripts/deployment-monitor.js watch

# View metrics
node scripts/deployment-monitor.js metrics
```

### Monitoring Configuration

- **Check Interval:** 60 seconds
- **Alert Threshold:** 3 consecutive failures
- **Timeout:** 10 seconds per check

### Critical Pages to Monitor

1. Homepage (/)
2. Emergency Services (/emergency/*)
3. Booking Page (/book-service)
4. About Page (/about-phil-mcgurk)
5. API Routes (/api/*)

---

## Rollback Procedures

### Automatic Rollback

GitHub Actions automatically rolls back on deployment failure:

1. Health check fails
2. Automatic rollback initiated
3. Previous version restored
4. Alert sent

### Manual Rollback

**Using Vercel CLI:**

```bash
vercel rollback
```

**Using Backup System:**

```bash
# List available backups
node scripts/backup-deployment.js list

# Restore from backup
node scripts/backup-deployment.js restore <backup-name>

# Redeploy
npm run build
vercel --prod
```

### Rollback Checklist

- [ ] Identify issue and cause
- [ ] Notify team
- [ ] Initiate rollback
- [ ] Verify rollback success
- [ ] Update monitoring
- [ ] Document incident
- [ ] Plan fix for next deployment

---

## Troubleshooting

### Common Issues

#### Build Failures

**Memory Issues:**
```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Prisma Issues:**
```bash
# Regenerate Prisma client
npx prisma generate
npm run build
```

#### Deployment Failures

**Environment Variables:**
```bash
# Validate environment
node scripts/env-validator.js

# Check Vercel environment
vercel env ls
```

**Permission Issues:**
```bash
# Verify Vercel token
vercel whoami

# Re-authenticate
vercel login
```

#### Performance Issues

**Slow Page Load:**
1. Check ISR configuration: `lib/deployment/isr-config.ts`
2. Verify CDN caching headers
3. Analyze bundle size: `npm run analyze`
4. Review Core Web Vitals

**High Memory Usage:**
1. Check error logs
2. Review memory leaks
3. Optimize image sizes
4. Reduce bundle size

### Debug Mode

```bash
# Enable debug logging
DEBUG=* npm run build

# Vercel debug
vercel --debug

# Check deployment logs
vercel logs <deployment-url>
```

---

## Performance Optimization

### Build Optimization

- **Bundle Size:** Target < 500KB per route
- **Build Time:** Target < 30 seconds
- **Memory Usage:** Max 4GB during build

### Runtime Optimization

- **ISR Strategy:** Configured per page type
- **CDN Caching:** Aggressive caching for static assets
- **Edge Functions:** For API routes when possible
- **Image Optimization:** Automatic WebP/AVIF conversion

### ISR Configuration

```typescript
// lib/deployment/isr-config.ts

// Emergency pages - 5 minutes
revalidate: 300

// Service pages - 1 day
revalidate: 86400

// About pages - 7 days
revalidate: 604800
```

### Performance Monitoring

```bash
# Run Lighthouse audit
npm run lighthouse

# Check Core Web Vitals
npm run web-vitals

# Analyze bundle
npm run analyze
```

### Performance Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **TTFB (Time to First Byte):** < 600ms

---

## Backup & Recovery

### Automated Backups

Backups are automatically created:
- Before each production deployment
- On manual trigger
- Retained for 30 days

### Backup Contents

- `.next` build directory
- Configuration files
- Environment files
- Database schema
- Git repository bundle

### Recovery Process

1. List available backups
2. Select backup to restore
3. Restore files
4. Reinstall dependencies
5. Rebuild application
6. Verify functionality
7. Redeploy

---

## Alerting & Notifications

### Alert Triggers

- 3 consecutive health check failures
- Memory usage > 90%
- Error rate > 5%
- Response time > 3s
- Database connectivity issues

### Alert Channels

- Console logging (development)
- Email notifications (production)
- Slack integration (optional)
- PagerDuty (optional)

### Alert Configuration

Configure in `lib/monitoring/error-tracking.ts`:

```typescript
alertThreshold: 3,
criticalErrorRate: 0.05,
maxResponseTime: 3000
```

---

## Security Considerations

### Security Headers

All security headers configured in:
- `middleware.ts` - Runtime security
- `next.config.js` - Build-time security
- `vercel.json` - Platform security

### HTTPS Enforcement

- Automatic HTTPS redirect in production
- HSTS headers enabled
- TLS 1.3 preferred

### Rate Limiting

- API routes: 100 requests/minute
- Form submissions: 10 requests/minute
- Search: 30 requests/minute

---

## CI/CD Pipeline

### GitHub Actions Workflow

Located at: `.github/workflows/ci-cd-optimized.yml`

**Stages:**
1. Validate & Lint (10 min timeout)
2. Run Tests (15 min timeout)
3. Build Application (20 min timeout)
4. Deploy Staging (on PRs)
5. Deploy Production (on main)
6. Post-Deployment Tasks

### Pipeline Performance

- **Average Build Time:** 15-20 minutes
- **Average Deploy Time:** 2-3 minutes
- **Total Pipeline:** < 25 minutes

---

## Additional Resources

### Scripts

- `scripts/build-vercel-optimized.js` - Optimized build
- `scripts/deployment-health-check.js` - Health checks
- `scripts/deployment-monitor.js` - Continuous monitoring
- `scripts/env-validator.js` - Environment validation
- `scripts/backup-deployment.js` - Backup management

### Configuration Files

- `vercel.json` - Vercel platform config
- `vercel.optimized.json` - Optimized config
- `next.config.js` - Next.js configuration
- `.github/workflows/` - CI/CD pipelines

### Monitoring

- Health: `/api/deployment/health`
- Metrics: `/api/deployment/metrics`
- Logs: `logs/` directory

---

## Support & Maintenance

### Regular Maintenance Tasks

- **Daily:** Review error logs and monitoring
- **Weekly:** Check performance metrics
- **Monthly:** Review and cleanup old backups
- **Quarterly:** Security audit and dependency updates

### Contact Information

For deployment issues:
- Check logs first
- Review this documentation
- Check GitHub Issues
- Contact DevOps team

---

## Version History

- **1.0.0** - Initial deployment system
- **1.1.0** - Added automated backups
- **1.2.0** - Enhanced monitoring and health checks
- **1.3.0** - Optimized build pipeline

Last Updated: 2025-11-07
