# Rollback Procedures

## Overview

This document provides detailed procedures for rolling back deployments when issues are detected in production.

## When to Rollback

Rollback immediately if:
- Error rate > 1% (critical) or > 0.5% (warning)
- Performance degradation > 20%
- Critical functionality broken (emergency forms, phone display)
- Security vulnerability detected
- Data corruption or loss
- Third-party service failures affecting core functionality

## Automatic Rollback

### GitHub Actions Workflow

The deployment pipeline includes automatic rollback if post-deployment checks fail:

```yaml
# Triggers on:
- Health check failures
- Error rate threshold exceeded
- Performance regression detected
- E2E test failures
```

### Monitoring Alerts

Automated rollback triggers:
- Error rate > 1% for 5 minutes
- Response time > 3000ms (p95) for 10 minutes
- Availability < 99% for 5 minutes

## Manual Rollback

### Quick Rollback (< 5 minutes)

#### Using Vercel Dashboard

1. **Navigate to Deployments**
   - Go to https://vercel.com/dashboard
   - Select "Disaster Recovery Brisbane" project
   - Click "Deployments" tab

2. **Identify Last Known Good Deployment**
   - Look for deployment before the problematic one
   - Check timestamp and commit message
   - Verify it has "Ready" status

3. **Promote to Production**
   - Click three dots (...) next to deployment
   - Select "Promote to Production"
   - Confirm the action

4. **Verify Rollback**
   ```bash
   npm run health-check
   ```

#### Using Vercel CLI

```bash
# 1. List recent deployments
vercel ls

# 2. Rollback to previous deployment
vercel rollback

# Or specify a deployment URL
vercel alias set <deployment-url> disasterrecovery.com.au

# 3. Verify
npm run health-check
```

### Database Rollback

#### For Schema Changes

**Before Rollback:**
1. Check if schema change is backwards compatible
2. Verify no data loss will occur
3. Create backup

**Rollback Process:**

```bash
# 1. Create backup
npm run backup:create

# 2. Revert migration
npx prisma migrate resolve --rolled-back <migration-name>

# 3. Apply previous migration
npx prisma migrate deploy

# 4. Verify data integrity
npm run db:test-performance
```

#### For Data Changes

```bash
# 1. Stop application (if needed)
vercel env pull

# 2. Restore from backup
npm run backup:restore <backup-id>

# 3. Verify restoration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM critical_table;"

# 4. Restart application
vercel redeploy
```

## Rollback Decision Tree

```
Issue Detected
    |
    ├─ Critical (affects all users)
    │   └─> Immediate rollback
    │
    ├─ High (affects >10% users)
    │   ├─> Quick fix available (<15 min)
    │   │   └─> Deploy hotfix
    │   └─> No quick fix
    │       └─> Rollback
    │
    ├─ Medium (affects <10% users)
    │   ├─> Workaround available
    │   │   └─> Document & schedule fix
    │   └─> No workaround
    │       └─> Rollback
    │
    └─ Low (minor issues)
        └─> Schedule fix for next deployment
```

## Rollback Scenarios

### Scenario 1: Build Failure

**Symptoms:**
- Deployment fails to build
- Build logs show errors

**Action:**
```bash
# 1. Check build logs
vercel logs <deployment-url>

# 2. Fix issue locally
npm run build

# 3. Commit fix
git add .
git commit -m "fix: resolve build error"
git push origin main

# No rollback needed - deployment never went live
```

### Scenario 2: Runtime Error

**Symptoms:**
- Pages returning 500 errors
- Error rate spiking in monitoring

**Action:**
```bash
# 1. Immediate rollback via dashboard
# (See "Quick Rollback" section above)

# 2. Investigate error
vercel logs --follow

# 3. Create hotfix branch
git checkout -b hotfix/runtime-error

# 4. Fix and test
npm run dev
# Test the fix

# 5. Deploy hotfix
git commit -m "hotfix: resolve runtime error"
git push origin hotfix/runtime-error
vercel --prod
```

### Scenario 3: Performance Degradation

**Symptoms:**
- PageSpeed score dropped > 10 points
- TTFB increased significantly
- Core Web Vitals failing

**Action:**
```bash
# 1. Check if affecting users
npm run monitor:metrics

# 2. If critical, rollback
vercel rollback

# 3. Analyze performance
npm run build:analyze

# 4. Identify bottleneck
# - Check bundle size
# - Review new dependencies
# - Test database queries

# 5. Optimize and redeploy
```

### Scenario 4: Database Migration Issues

**Symptoms:**
- Migration failed
- Data inconsistencies
- Query errors

**Action:**
```bash
# 1. Assess damage
npx prisma studio

# 2. Stop writes (if needed)
# Set read-only mode in database

# 3. Rollback migration
npx prisma migrate resolve --rolled-back <migration>

# 4. Restore from backup if needed
npm run backup:restore <backup-id>

# 5. Verify data integrity
npm run db:test-performance

# 6. Create corrected migration
npx prisma migrate dev --name fix_migration

# 7. Test thoroughly before redeploying
```

### Scenario 5: Third-party Service Failure

**Symptoms:**
- External API calls failing
- Payment processing errors
- Email sending failures

**Action:**
```bash
# 1. Verify service status
curl -I https://api.service.com/health

# 2. Check if issue is on their end
# Visit status page

# 3. If service is down:
# - Enable fallback mode (if available)
# - Display maintenance message
# - Notify users

# 4. If caused by our changes:
vercel rollback

# No rollback if third-party outage
```

## Post-Rollback Actions

### 1. Immediate

- [ ] Verify all critical functionality working
- [ ] Check error rates returned to normal
- [ ] Monitor performance metrics
- [ ] Test emergency contact forms
- [ ] Verify phone numbers displaying correctly

### 2. Within 1 Hour

- [ ] Document incident in incident log
- [ ] Notify team via Slack #deployments
- [ ] Create incident report
- [ ] Schedule post-mortem meeting

### 3. Within 24 Hours

- [ ] Root cause analysis
- [ ] Fix the underlying issue
- [ ] Update tests to catch similar issues
- [ ] Review deployment process
- [ ] Update monitoring/alerting if needed

## Preventing Future Rollbacks

### Better Testing

```bash
# Add more comprehensive tests
npm run test:full

# Test against production-like environment
npm run test:production:comprehensive

# Load testing
artillery run load-test.yml
```

### Gradual Rollouts

Use canary deployments for risky changes:

```bash
# Deploy to 10% of traffic
vercel --prod --canary

# Monitor for 30 minutes
npm run monitor:watch

# Promote to 100% if all good
vercel promote <deployment-url>
```

### Feature Flags

For major features, use feature flags:

```typescript
// lib/feature-flags.ts
export const FEATURES = {
  NEW_BOOKING_SYSTEM: process.env.NEXT_PUBLIC_ENABLE_NEW_BOOKING === 'true',
  EXPERIMENTAL_CHAT: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
};
```

Enable in stages:
1. Internal testing only
2. Beta users (10%)
3. All users (100%)

### Database Safety

For schema changes:
1. Add columns (backwards compatible)
2. Deploy code
3. Backfill data
4. Remove old columns (in separate deployment)

## Rollback Checklist

### Pre-Rollback
- [ ] Identify last known good deployment
- [ ] Verify rollback target is healthy
- [ ] Create current state backup
- [ ] Notify team of impending rollback

### During Rollback
- [ ] Execute rollback procedure
- [ ] Monitor rollback progress
- [ ] Check for errors during rollback

### Post-Rollback
- [ ] Run health checks
- [ ] Verify critical functionality
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Update status page
- [ ] Document incident

## Emergency Contacts

### Escalation Path

1. **Level 1** (0-15 min): Development team
2. **Level 2** (15-30 min): DevOps lead
3. **Level 3** (30+ min): Technical director
4. **Level 4** (Critical): CEO / Business owner

### Contact Information

See internal documentation for current contact details.

## Incident Log Template

```markdown
# Incident Report: [Date]

## Summary
Brief description of the incident

## Timeline
- HH:MM - Issue detected
- HH:MM - Rollback initiated
- HH:MM - Rollback completed
- HH:MM - Service restored

## Impact
- Users affected: X%
- Duration: X minutes
- Revenue impact: $X (if applicable)
- Critical functionality affected: Yes/No

## Root Cause
Detailed explanation of what went wrong

## Resolution
How the issue was resolved

## Lessons Learned
- What went well
- What could be improved
- Action items

## Action Items
- [ ] Fix underlying issue
- [ ] Update tests
- [ ] Update documentation
- [ ] Review deployment process
```

## References

- [PRODUCTION.md](./PRODUCTION.md) - Deployment procedures
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
- [ENVIRONMENTS.md](./ENVIRONMENTS.md) - Environment configuration
