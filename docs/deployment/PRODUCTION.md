# Production Deployment Guide

## Overview

This document outlines the production deployment process for Disaster Recovery Brisbane website.

## Deployment Architecture

### Infrastructure
- **Platform**: Vercel
- **Region**: Sydney (syd1)
- **Runtime**: Node.js 18.x
- **Framework**: Next.js 14.2.32 (App Router)
- **Database**: PostgreSQL (production) / SQLite (staging/dev)
- **CDN**: Vercel Edge Network

### Environments
1. **Production**: https://disasterrecovery.com.au
2. **Staging**: https://dr-new-staging.vercel.app
3. **Preview**: Auto-deployed for PRs

## Pre-deployment Checklist

### 1. Code Quality
- [ ] All tests passing (`npm run test:ci`)
- [ ] Type checking clean (`npm run type-check`)
- [ ] Linting passing (`npm run lint`)
- [ ] No security vulnerabilities (`npm audit`)

### 2. Environment Variables
- [ ] All required env vars configured in Vercel
- [ ] Secrets rotated if needed
- [ ] Database connection string updated
- [ ] Third-party API keys valid

### 3. Content Validation
- [ ] No Lorem Ipsum placeholder text
- [ ] All images optimized (<200KB)
- [ ] Contact information correct (1300 309 361)
- [ ] Service areas accurate (Brisbane, Ipswich, Logan)

### 4. Performance
- [ ] Lighthouse score >= 90
- [ ] Core Web Vitals passing
- [ ] Bundle size acceptable
- [ ] Image formats optimized (WebP/AVIF)

### 5. SEO
- [ ] Meta tags complete
- [ ] Structured data validated
- [ ] Sitemap generated
- [ ] Robots.txt configured

## Deployment Process

### Automatic Deployment (Recommended)

Deployments to production happen automatically when code is pushed to `main` branch:

```bash
# 1. Ensure you're on main branch
git checkout main
git pull origin main

# 2. Merge your feature branch
git merge feature/your-feature

# 3. Push to trigger deployment
git push origin main
```

The GitHub Actions workflow will:
1. Run validation checks
2. Deploy to staging
3. Run E2E tests on staging
4. Deploy to production
5. Run post-deployment validation
6. Rollback automatically if checks fail

### Manual Deployment

For emergency deployments or when bypassing CI:

```bash
# 1. Install Vercel CLI
npm install -g vercel@latest

# 2. Login to Vercel
vercel login

# 3. Deploy to production
vercel --prod

# 4. Verify deployment
npm run health-check
```

### Canary Deployment

For gradual rollout of critical changes:

```bash
# 1. Deploy canary version (10% traffic)
vercel --prod --canary

# 2. Monitor metrics for 30 minutes
npm run monitor:watch

# 3. Promote to 100% if metrics good
vercel promote <deployment-url>

# 4. Or rollback if issues detected
vercel rollback
```

## Post-deployment Validation

### Automated Checks

The CI pipeline automatically runs:
- Smoke tests on critical pages
- Lighthouse performance tests
- Security header validation
- Error rate monitoring

### Manual Verification

1. **Homepage**: https://disasterrecovery.com.au
   - Hero image loads correctly
   - CTA buttons functional
   - Contact info visible

2. **Service Pages**:
   - /services/water-damage-restoration
   - /services/fire-damage-restoration
   - /services/mould-remediation

3. **Emergency Page**: /emergency
   - 24/7 phone number visible
   - Forms submitting correctly

4. **Location Pages**:
   - /locations/hamilton
   - /locations/ascot
   - Dynamic routes working

5. **Contact Forms**:
   - Emergency form
   - Quote request form
   - Email notifications working

## Monitoring

### Real-time Monitoring

```bash
# Monitor deployment status
npm run monitor:watch

# Check error rates
npm run monitor:metrics

# View recent deployments
vercel ls
```

### Metrics to Watch

1. **Error Rate**: Should be < 0.5%
   - Check Vercel dashboard
   - Monitor Sentry for exceptions

2. **Performance**:
   - PageSpeed >= 90/100
   - Core Web Vitals all green
   - TTFB < 600ms

3. **Traffic**:
   - No sudden drops (indicates broken deployment)
   - Conversion rates stable

4. **Uptime**:
   - Target: 99.9% SLA
   - Alert if < 99.5%

### Alerting

Alerts configured for:
- Error rate > 0.5%
- Performance score < 90
- Uptime < 99.5%
- Critical security vulnerabilities

## Rollback Procedures

### Automatic Rollback

If post-deployment checks fail, the workflow automatically rolls back.

### Manual Rollback

```bash
# 1. View recent deployments
vercel ls

# 2. Rollback to previous deployment
vercel rollback

# 3. Verify rollback successful
npm run health-check

# 4. Investigate issue
vercel logs
```

### Emergency Rollback

For critical issues:

1. **Immediate**: Use Vercel dashboard to rollback
   - Go to deployments tab
   - Click "Promote to Production" on last known good deployment

2. **Notify Team**: Alert via Slack #deployments channel

3. **Investigate**:
   - Check error logs
   - Review recent changes
   - Fix issue in hotfix branch

## Database Migrations

### Production Migration Process

1. **Test Migration Locally**:
```bash
# Copy production schema
DATABASE_URL=postgresql://... npx prisma db pull

# Test migration
npx prisma migrate dev --name migration_name
```

2. **Run in Staging**:
```bash
# Deploy to staging
vercel --target staging

# Run migration
npx prisma migrate deploy
```

3. **Production Migration**:
```bash
# Run during low-traffic window (2-4 AM AEST)
npx prisma migrate deploy

# Verify data integrity
npm run db:test-performance
```

### Rollback Database Changes

For backwards-incompatible schema changes:
1. Maintain backwards compatibility for at least one deployment
2. Deploy code first, schema second
3. Never drop columns immediately - deprecate first

## Security

### Pre-deployment Security Checks

```bash
# Run security scan
npm run security:check

# Check for secrets in code
git secrets --scan

# Validate environment variables
npm run env:validate
```

### Production Security Headers

Verified headers:
- Content-Security-Policy
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

### SSL/TLS

- Certificate auto-renewed by Vercel
- Force HTTPS enabled
- HSTS max-age: 1 year

## Performance Optimization

### Build Optimizations

- Standalone output for smaller deployments
- Tree-shaking enabled
- Code splitting configured
- CSS optimization enabled

### Runtime Optimizations

- Edge caching (31536000s for static assets)
- Image optimization (WebP/AVIF)
- Font preloading
- Critical CSS inlined

## Backup and Recovery

### Automated Backups

- Database: Daily at 2 AM AEST
- Retention: 90 days
- Location: S3 bucket (ap-southeast-2)

### Recovery Procedures

See [ROLLBACK.md](./ROLLBACK.md) for detailed recovery procedures.

### Disaster Recovery Objectives

- **RTO** (Recovery Time Objective): 1 hour
- **RPO** (Recovery Point Objective): 15 minutes

## Compliance

### Audit Trail

All deployments logged with:
- Commit SHA
- Deployer identity
- Timestamp
- Deployment URL
- Test results

### Data Retention

- Deployment logs: 90 days
- Error logs: 30 days
- Analytics data: 2555 days
- Database backups: 90 days

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node version (must be 18.x)
   - Verify all dependencies installed
   - Check for TypeScript errors

2. **Database Connection Issues**:
   - Verify DATABASE_URL in Vercel
   - Check connection pool settings
   - Ensure Prisma client generated

3. **Performance Regressions**:
   - Check bundle size
   - Review new dependencies
   - Analyze Core Web Vitals

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions.

## Support Contacts

- **DevOps Lead**: Check internal docs
- **Vercel Support**: https://vercel.com/support
- **On-call**: See PagerDuty schedule

## References

- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [ENVIRONMENTS.md](./ENVIRONMENTS.md) - Environment configuration
- [ROLLBACK.md](./ROLLBACK.md) - Rollback procedures
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
