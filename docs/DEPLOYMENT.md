# Deployment Guide - Disaster Recovery Platform

## Overview

This document provides comprehensive deployment instructions for the Disaster Recovery Platform, a Next.js 14 application optimized for production deployment on Vercel.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Deployment Platforms](#deployment-platforms)
- [CI/CD Pipeline](#cicd-pipeline)
- [Production Checklist](#production-checklist)
- [Monitoring & Observability](#monitoring--observability)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Prerequisites

### Required Software
- Node.js 20.x or higher
- npm 10.x or higher
- Git
- Vercel CLI (optional): `npm i -g vercel`

### Required Accounts
- GitHub account (for repository and CI/CD)
- Vercel account (for hosting)
- Database provider (for production database)
- Email service (SendGrid or Resend)
- Analytics providers (Google Analytics, Clarity)

## Environment Setup

### 1. Environment Variables

Copy the example environment file and configure for your environment:

```bash
cp .env.example .env.local
```

### 2. Required Environment Variables

#### Core Application
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
```

#### Database
```bash
# Production: Use PostgreSQL
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

#### Authentication
```bash
SESSION_COOKIE_NAME=dr-session
SESSION_COOKIE_MAX_AGE=86400
JWT_SECRET=<secure-secret>
JWT_REFRESH_SECRET=<secure-secret>
```

#### Email Service
```bash
EMAIL_FROM=noreply@your-domain.com
SENDGRID_API_KEY=<your-key>
# OR
RESEND_API_KEY=<your-key>
```

#### Analytics & Monitoring
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
SENTRY_DSN=<your-sentry-dsn>
```

### 3. Generate Secrets

```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Generate JWT secrets
openssl rand -base64 64
```

## Deployment Platforms

### Vercel (Recommended)

#### Initial Setup

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Link project:
```bash
vercel link
```

#### Configuration

The project includes `vercel.json` with optimized settings:

```json
{
  "framework": "nextjs",
  "buildCommand": "npx prisma generate && npm run build",
  "installCommand": "npm ci --legacy-peer-deps",
  "regions": ["syd1"]
}
```

#### Deploy to Production

```bash
# Deploy to production
vercel --prod

# Or push to main branch (automatic deployment)
git push origin main
```

#### Environment Variables in Vercel

Set environment variables in Vercel Dashboard:
1. Go to Project Settings > Environment Variables
2. Add all required variables from `.env.example`
3. Set appropriate scope (Production, Preview, Development)

### Manual Deployment

#### Build Locally

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Start production server
npm start
```

## CI/CD Pipeline

### GitHub Actions

The project includes a comprehensive CI/CD pipeline at `.github/workflows/ci.yml`.

#### Pipeline Stages

1. **Lint & Format Check** (5 min timeout)
   - ESLint validation
   - Prettier formatting check

2. **TypeScript Type Check** (5 min timeout)
   - Prisma client generation
   - TypeScript compilation

3. **Unit Tests** (10 min timeout)
   - Jest test suite
   - Coverage reporting

4. **E2E Tests** (15 min timeout)
   - Playwright browser tests
   - Visual regression tests

5. **Build** (10 min timeout)
   - Production build
   - Build artifact upload

#### Triggering CI/CD

```bash
# Push to main (automatic deployment)
git push origin main

# Create pull request (runs tests)
git checkout -b feature/new-feature
git push origin feature/new-feature
```

#### CI Environment Variables

Set in GitHub Secrets:
- `DATABASE_URL`: Test database URL
- `NEXTAUTH_SECRET`: Test auth secret
- `NEXT_PUBLIC_APP_URL`: Test application URL

## Production Checklist

### Pre-Deployment

- [ ] All environment variables configured
- [ ] Database migrations prepared
- [ ] Static assets optimized
- [ ] Security headers configured
- [ ] Analytics tracking enabled
- [ ] Error monitoring configured (Sentry)
- [ ] Performance monitoring enabled
- [ ] SSL/TLS certificates configured
- [ ] DNS records configured
- [ ] CDN configured (if applicable)

### Build Validation

```bash
# Run all checks locally
npm run validate

# Type checking
npm run type-check

# Linting
npm run lint

# Unit tests
npm run test:ci

# E2E tests
npm run test:e2e

# Production build
npm run build
```

### Post-Deployment

- [ ] Verify application loads
- [ ] Test authentication flow
- [ ] Verify database connectivity
- [ ] Check email delivery
- [ ] Verify analytics tracking
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify API endpoints
- [ ] Test form submissions
- [ ] Check image optimization

### Security Checklist

- [ ] Environment variables not exposed in client
- [ ] Security headers configured (CSP, HSTS, etc.)
- [ ] API rate limiting enabled
- [ ] SQL injection prevention (Prisma)
- [ ] XSS prevention configured
- [ ] CSRF protection enabled
- [ ] Secure session management
- [ ] Input validation on all forms
- [ ] File upload restrictions
- [ ] HTTPS enforced

## Monitoring & Observability

### Analytics

**Google Analytics 4**
- Page views
- User engagement
- Conversion tracking
- Custom events

**Microsoft Clarity**
- Session recordings
- Heatmaps
- User behavior analysis

### Error Tracking

**Sentry** (when configured)
- Error aggregation
- Stack traces
- User context
- Release tracking

### Performance Monitoring

**Web Vitals**
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Time to First Byte (TTFB)
- Interaction to Next Paint (INP)

### Health Checks

```bash
# Run health check
npm run health-check

# Check staging
npm run health-check:staging
```

### Deployment Monitoring

```bash
# Monitor deployment
npm run monitor

# Watch deployment status
npm run monitor:watch

# View metrics
npm run monitor:metrics
```

## Build Optimization

### Current Build Stats

- Build Size: ~679MB (includes all dependencies)
- Pages Generated: 307 static pages
- Build Time: ~2-3 minutes on Vercel
- First Load JS: Optimized with code splitting

### Performance Features

1. **Image Optimization**
   - Next.js Image component
   - AVIF/WebP format support
   - Responsive image sizing
   - Lazy loading

2. **Code Splitting**
   - Automatic route-based splitting
   - Dynamic imports for heavy components
   - Optimized chunk strategy

3. **Caching Strategy**
   - Static assets: 1 year cache
   - Images: Immutable cache
   - API routes: No cache
   - Pages: Stale-while-revalidate

4. **Bundle Optimization**
   - Tree shaking enabled
   - Console removal in production
   - Optimized package imports
   - Standalone output mode

## Troubleshooting

### Common Issues

#### Build Failures

**Issue**: Out of memory during build
```bash
# Solution: Increase Node memory
export NODE_OPTIONS="--max-old-space-size=3072"
npm run build
```

**Issue**: Prisma client not generated
```bash
# Solution: Generate manually
npx prisma generate
npm run build
```

**Issue**: Type errors during build
```bash
# Solution: Check types first
npm run type-check
# Fix errors, then build
npm run build
```

#### Deployment Issues

**Issue**: Environment variables not loading
- Verify variables are set in Vercel dashboard
- Check variable names match exactly
- Ensure `NEXT_PUBLIC_` prefix for client-side variables

**Issue**: Database connection failed
- Verify DATABASE_URL is correct
- Check database is accessible from deployment region
- Ensure database allows connections from Vercel IPs

**Issue**: Images not loading
- Verify image domains in `next.config.js`
- Check image paths are correct
- Ensure images are in `public` directory

#### Runtime Issues

**Issue**: 500 errors in production
- Check Vercel logs for error details
- Verify all environment variables are set
- Check database connectivity
- Review error tracking in Sentry

**Issue**: Slow page loads
- Check bundle size with `npm run build:analyze`
- Review Lighthouse reports
- Optimize images and assets
- Enable caching headers

### Debug Commands

```bash
# Check environment variables
npm run env:validate

# Generate environment template
npm run env:template

# View build output
npm run build

# Analyze bundle size
npm run build:analyze

# Run in development mode
npm run dev

# Check for critical issues
npm run check:critical
```

## Rollback Procedures

### Vercel Rollback

1. **Via Vercel Dashboard**
   - Go to Deployments
   - Find previous working deployment
   - Click "Promote to Production"

2. **Via Vercel CLI**
```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

### Git Rollback

```bash
# Revert last commit
git revert HEAD
git push origin main

# Rollback to specific commit
git reset --hard <commit-hash>
git push --force origin main  # Use with caution
```

### Database Rollback

```bash
# Restore from backup
npm run backup:restore

# Or manually restore
# Use your database provider's restore tools
```

## Database Migrations

### Development

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate dev
```

### Production

```bash
# Deploy migrations
npx prisma migrate deploy

# Or via npm script
npm run db:migrate
```

### Migration Strategy

1. Always test migrations in staging first
2. Backup database before migration
3. Use backward-compatible changes
4. Plan for rollback scenarios
5. Monitor application after migration

## Performance Targets

### Core Web Vitals

- LCP: < 2.5s (Good)
- FID: < 100ms (Good)
- CLS: < 0.1 (Good)
- FCP: < 1.8s (Good)
- TTFB: < 600ms (Good)

### Lighthouse Scores

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### Build Performance

- Build Time: < 5 minutes
- Cold Start: < 1 second
- API Response: < 200ms

## Security Best Practices

### Environment Variables

- Never commit `.env` files
- Use Vercel environment variables for production
- Rotate secrets regularly
- Use different secrets for different environments

### API Security

- Rate limiting enabled on all API routes
- Input validation on all endpoints
- SQL injection prevention via Prisma
- CORS configured properly

### Session Security

- HTTP-only cookies
- Secure flag in production
- SameSite=strict
- Session rotation on privilege escalation

## Support & Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

### Project Scripts
- See `docs/SCRIPTS.md` for all available commands
- See `docs/DEVELOPMENT.md` for development guide
- See `docs/SECURITY_CHECKLIST.md` for security details

### Monitoring Dashboards
- Vercel Analytics: Project dashboard
- Google Analytics: Analytics dashboard
- Clarity: Session recordings
- Sentry: Error tracking (when configured)

## Version History

- v1.0.0: Initial production release
- Latest: Check `package.json` for current version

## Contact

For deployment issues or questions:
- Create an issue in the GitHub repository
- Check existing documentation
- Review Vercel logs for errors

---

Last Updated: 2025-11-08
Deployment Platform: Vercel
Framework: Next.js 14.2.32
Node Version: 20.x
