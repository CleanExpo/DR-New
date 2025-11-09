# Environment Configuration Guide

## Overview

Disaster Recovery Brisbane uses three primary environments with distinct configurations and purposes.

## Environments

### 1. Development (Local)

**Purpose**: Local development and testing

**URL**: http://localhost:3000

**Database**: SQLite (`prisma/dev.db`)

**Configuration**:
```bash
# .env.local
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=development-secret-not-for-production

# Feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
```

**Characteristics**:
- Fast reload with Turbopack
- Verbose logging enabled
- Debug mode active
- No analytics tracking
- Test payment providers
- Unrestricted CORS

**Setup**:
```bash
# 1. Clone repository
git clone https://github.com/org/disaster-recovery.git

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Setup environment
cp .env.development.template .env.local

# 4. Initialize database
npx prisma db push

# 5. Start development server
npm run dev
```

### 2. Staging

**Purpose**: Pre-production testing and QA

**URL**: https://dr-new-staging.vercel.app

**Database**: PostgreSQL (staging instance)

**Configuration**:
```bash
# Vercel Environment Variables (Staging)
NODE_ENV=staging
NEXT_PUBLIC_APP_URL=https://dr-new-staging.vercel.app
DATABASE_URL=postgresql://user:pass@staging-host:5432/staging_db

# Use test versions of services
STRIPE_SECRET_KEY=sk_test_...
SMTP_HOST=smtp.mailtrap.io
NEXT_PUBLIC_GA_ID=G-STAGING

# Feature flags
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_DEBUG_MODE=true
```

**Characteristics**:
- Mirrors production architecture
- Uses test payment processors
- Email sent to testing service
- Analytics to separate property
- Demo mode enabled
- Extended logging

**Deployment**:
```bash
# Automatic deployment
git push origin develop

# Manual deployment
vercel --target staging

# Deploy PR preview
# Automatic on PR creation
```

**Use Cases**:
- QA testing before production
- Client demos
- Integration testing
- Performance testing
- Load testing

### 3. Production

**Purpose**: Live customer-facing environment

**URL**: https://disasterrecovery.com.au

**Database**: PostgreSQL (production instance with backups)

**Configuration**:
```bash
# Vercel Environment Variables (Production)
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
DATABASE_URL=postgresql://user:pass@prod-host:5432/prod_db?sslmode=require

# Live services
STRIPE_SECRET_KEY=sk_live_...
SMTP_HOST=smtp.sendgrid.net
NEXT_PUBLIC_GA_ID=G-XXXXXXXXX

# Feature flags
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_ENABLE_ANALYTICS=true

# Security
NEXTAUTH_SECRET=<strong-random-secret>
```

**Characteristics**:
- SSL/TLS enforced
- Aggressive caching
- Minimal logging
- Production API keys
- Real payment processing
- Analytics enabled
- High availability (99.9%)

**Deployment**:
```bash
# Automatic deployment (recommended)
git push origin main

# Manual emergency deployment
vercel --prod

# Canary deployment
vercel --prod --canary
```

**Monitoring**:
- Real-time error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring (99.9% SLA)
- Database monitoring
- Cost tracking

## Environment Variables

### Required Variables

All environments must have:

```bash
# Application URLs
NEXT_PUBLIC_APP_URL
NEXTAUTH_URL

# Authentication
NEXTAUTH_SECRET  # Min 32 characters

# Database
DATABASE_URL
```

### Optional but Recommended

```bash
# External Services
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
NEXT_PUBLIC_GA_ID
SENTRY_DSN

# Email
SMTP_HOST
SMTP_PORT
SMTP_USER
SMTP_PASSWORD

# Payment (if enabled)
STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
```

### Environment-Specific Variables

**Production Only**:
```bash
# Backup
BACKUP_S3_BUCKET
BACKUP_S3_ACCESS_KEY
BACKUP_S3_SECRET_KEY

# Monitoring
SENTRY_AUTH_TOKEN
LOG_SERVICE_KEY
```

**Development Only**:
```bash
# Debug
NEXT_PUBLIC_DEBUG_MODE=true
SKIP_ENV_VALIDATION=true
```

## Managing Environment Variables

### Local Development

```bash
# 1. Copy template
cp .env.development.template .env.local

# 2. Fill in values
nano .env.local

# 3. Validate
npm run env:validate

# 4. Never commit .env.local
# Already in .gitignore
```

### Vercel Environments

#### Adding Variables

```bash
# Via CLI
vercel env add DATABASE_URL production

# Via dashboard
1. Go to project settings
2. Navigate to Environment Variables
3. Add variable
4. Select environment (Production/Preview/Development)
```

#### Updating Variables

```bash
# Remove old
vercel env rm DATABASE_URL production

# Add new
vercel env add DATABASE_URL production

# Or update via dashboard
```

#### Pulling Variables Locally

```bash
# Pull production variables
vercel env pull .env.production

# Pull preview variables
vercel env pull .env.preview

# Pull development variables
vercel env pull .env.local
```

### Secrets Management

#### Best Practices

1. **Never commit secrets to git**
   - All `.env*` files in `.gitignore`
   - Use `.template` files for structure

2. **Use strong secrets**
   ```bash
   # Generate NEXTAUTH_SECRET
   openssl rand -base64 32
   ```

3. **Rotate secrets regularly**
   - NEXTAUTH_SECRET: Every 90 days
   - API keys: When compromised or every 6 months
   - Database passwords: Every 180 days

4. **Use different secrets per environment**
   - Development: Weak secrets OK
   - Staging: Moderate strength
   - Production: Strong secrets required

5. **Audit access**
   - Review who has access to Vercel project
   - Use team permissions appropriately
   - Log secret access

#### Secret Storage

```bash
# Development
# Store in .env.local (gitignored)

# Staging/Production
# Store in Vercel dashboard
# Or use Vercel CLI:
vercel env add SECRET_NAME production

# Emergency access
# Document secret recovery process
# Use password manager for team access
```

## Database Configuration

### Development (SQLite)

```bash
DATABASE_URL=file:./dev.db

# Initialize
npx prisma db push

# Reset
npx prisma migrate reset

# View data
npx prisma studio
```

**Advantages**:
- No external dependencies
- Fast setup
- Easy to reset

**Limitations**:
- No concurrent writes
- No connection pooling
- Not production-suitable

### Staging/Production (PostgreSQL)

```bash
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public&sslmode=require

# Connection pool settings
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=30000
```

**Advantages**:
- Concurrent access
- Advanced features
- Scalable
- Production-ready

**Configuration**:
- SSL enforced (`sslmode=require`)
- Connection pooling
- Automated backups
- Point-in-time recovery

## Feature Flags

### Available Flags

```bash
# Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=true|false

# Chat widget
NEXT_PUBLIC_ENABLE_CHAT=true|false

# Online booking
NEXT_PUBLIC_ENABLE_BOOKING=true|false

# Demo mode (test data)
NEXT_PUBLIC_DEMO_MODE=true|false

# Debug logging
NEXT_PUBLIC_DEBUG_MODE=true|false
```

### Usage

```typescript
// lib/feature-flags.ts
export const FEATURES = {
  ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  BOOKING: process.env.NEXT_PUBLIC_ENABLE_BOOKING === 'true',
  DEMO: process.env.NEXT_PUBLIC_DEMO_MODE === 'true',
  DEBUG: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
};

// In component
if (FEATURES.ANALYTICS) {
  // Load analytics
}
```

### Per-Environment Defaults

| Flag | Development | Staging | Production |
|------|-------------|---------|------------|
| ANALYTICS | false | true | true |
| CHAT | true | true | true |
| BOOKING | true | true | true |
| DEMO | true | true | false |
| DEBUG | true | true | false |

## Environment Validation

### Validation Script

```bash
# Validate current environment
npm run env:validate

# Generate template
npm run env:template

# Validate specific environment
NODE_ENV=production npm run env:validate
```

### Pre-deployment Checks

```bash
# 1. Validate environment variables
npm run env:validate

# 2. Check for weak secrets (production only)
# Script checks for:
# - Default/test secrets
# - Short secrets (< 32 chars)
# - Localhost URLs
# - HTTP (not HTTPS)
# - SQLite in production

# 3. Verify database connection
npx prisma db pull
```

## Environment Promotion

### Development → Staging

```bash
# 1. Merge to develop branch
git checkout develop
git merge feature/my-feature

# 2. Push to trigger deployment
git push origin develop

# 3. Verify deployment
npm run health-check:staging

# 4. Run E2E tests
PLAYWRIGHT_BASE_URL=https://dr-new-staging.vercel.app npm run test:e2e
```

### Staging → Production

```bash
# 1. Merge develop to main
git checkout main
git merge develop

# 2. Push to trigger deployment
git push origin main

# 3. Automated process:
# - Pre-deployment validation
# - Deploy to staging
# - Run E2E tests
# - Deploy to production
# - Post-deployment validation
# - Auto-rollback on failure

# 4. Verify production
npm run health-check
```

## Debugging Environment Issues

### Common Issues

**Issue: Environment variable not loading**
```bash
# Check if variable is set
vercel env ls | grep VARIABLE_NAME

# Pull latest variables
vercel env pull

# Redeploy to pick up changes
vercel --prod --force
```

**Issue: Wrong environment used**
```bash
# Check NODE_ENV
echo $NODE_ENV

# Verify in build logs
vercel logs | grep NODE_ENV
```

**Issue: Database connection failed**
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;"

# Check connection string format
echo $DATABASE_URL
# Should be: postgresql://user:pass@host:5432/db
```

## Best Practices

1. **Use environment templates**
   - Keep `.template` files updated
   - Document all required variables
   - Include example values

2. **Separate concerns**
   - Development for coding
   - Staging for testing
   - Production for customers

3. **Test in staging first**
   - Never deploy directly to production
   - Validate in environment similar to production
   - Run full test suite

4. **Monitor all environments**
   - Track errors in staging too
   - Watch for performance regressions
   - Alert on failures

5. **Document changes**
   - Update this guide when adding variables
   - Document feature flag behavior
   - Explain non-obvious configurations

## References

- [PRODUCTION.md](./PRODUCTION.md) - Deployment procedures
- [.env.production.template](../../.env.production.template) - Production template
- [.env.staging.template](../../.env.staging.template) - Staging template
- [.env.development.template](../../.env.development.template) - Development template
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
