# Deployment Runbook - Quick Reference

## Emergency Contacts

- **DevOps Lead:** [Contact Info]
- **System Administrator:** [Contact Info]
- **On-Call Engineer:** [Contact Info]

## Quick Commands Reference

### Pre-Deployment

```bash
# Validate environment
node scripts/env-validator.js

# Create backup
node scripts/backup-deployment.js create "Pre-deployment"

# Run tests
npm test

# Build locally
npm run build:vercel-optimized
```

### Deployment

```bash
# Deploy to staging
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```

### Post-Deployment

```bash
# Health check
node scripts/deployment-health-check.js production

# Start monitoring
node scripts/deployment-monitor.js watch

# View metrics
curl https://disasterrecovery.com.au/api/deployment/metrics
```

### Rollback

```bash
# Automatic rollback (Vercel)
vercel rollback

# Manual rollback from backup
node scripts/backup-deployment.js list
node scripts/backup-deployment.js restore <backup-name>
```

---

## Standard Deployment Procedure

### Phase 1: Pre-Deployment (5 minutes)

1. **Verify Changes**
   ```bash
   git status
   git log -5 --oneline
   ```

2. **Run Checks**
   ```bash
   npm run validate-env
   npm run lint
   npm test
   ```

3. **Create Backup**
   ```bash
   node scripts/backup-deployment.js create "Release v1.x.x"
   ```

4. **Notify Team**
   - Post in deployment channel
   - Update status page

### Phase 2: Build (2-3 minutes)

1. **Local Build Test**
   ```bash
   npm run build:vercel-optimized
   ```

2. **Verify Build Output**
   - Check for errors
   - Review bundle sizes
   - Verify page count

### Phase 3: Staging Deployment (5 minutes)

1. **Deploy to Staging**
   ```bash
   vercel
   ```

2. **Run Smoke Tests**
   ```bash
   # Manual verification
   - Homepage loads
   - Emergency pages work
   - Booking form functional
   - About page displays
   ```

3. **Staging Health Check**
   ```bash
   node scripts/deployment-health-check.js staging
   ```

### Phase 4: Production Deployment (3 minutes)

1. **Deploy to Production**
   ```bash
   vercel --prod
   ```

2. **Monitor Deployment**
   - Watch Vercel dashboard
   - Monitor error logs
   - Check response times

3. **Production Health Check**
   ```bash
   node scripts/deployment-health-check.js production
   ```

### Phase 5: Post-Deployment (10 minutes)

1. **Verify Critical Pages**
   - [ ] Homepage (https://disasterrecovery.com.au)
   - [ ] Water Damage (https://disasterrecovery.com.au/emergency/water-damage-brisbane)
   - [ ] Fire Damage (https://disasterrecovery.com.au/emergency/fire-damage-brisbane)
   - [ ] Booking (https://disasterrecovery.com.au/book-service)
   - [ ] About (https://disasterrecovery.com.au/about-phil-mcgurk)

2. **Start Monitoring**
   ```bash
   node scripts/deployment-monitor.js watch
   ```

3. **Update Documentation**
   - Update changelog
   - Document any issues
   - Update runbook if needed

4. **Notify Completion**
   - Post success message
   - Update status page
   - Close deployment ticket

---

## Emergency Rollback Procedure

### Immediate Actions (< 2 minutes)

1. **Assess Severity**
   - Critical: Complete outage
   - High: Major functionality broken
   - Medium: Minor issues affecting users
   - Low: Cosmetic or edge case issues

2. **For Critical/High Issues - Rollback Immediately**
   ```bash
   # Vercel automatic rollback
   vercel rollback
   ```

3. **Verify Rollback**
   ```bash
   node scripts/deployment-health-check.js production
   ```

4. **Notify Team**
   - Alert all stakeholders
   - Post in incident channel
   - Update status page

### Root Cause Analysis (< 30 minutes)

1. **Collect Information**
   ```bash
   # Check logs
   vercel logs <deployment-url>

   # Check metrics
   curl https://disasterrecovery.com.au/api/deployment/metrics

   # Check error tracking
   cat logs/deployment-*.log
   ```

2. **Identify Issue**
   - Review error messages
   - Check recent changes
   - Compare with previous deployment

3. **Document Incident**
   - What happened
   - When it happened
   - Impact assessment
   - Root cause
   - Action items

### Fix and Redeploy (Variable)

1. **Develop Fix**
   - Create hotfix branch
   - Implement fix
   - Test locally

2. **Deploy Fix**
   - Follow standard deployment procedure
   - Extra verification on fixed functionality

---

## Monitoring Checklist

### Real-Time Monitoring

- [ ] Response times < 2s
- [ ] Error rate < 1%
- [ ] Memory usage < 80%
- [ ] All health checks passing
- [ ] No 5xx errors

### Hourly Checks

- [ ] Review error logs
- [ ] Check performance metrics
- [ ] Verify critical pages
- [ ] Monitor traffic patterns

### Daily Checks

- [ ] Review deployment statistics
- [ ] Check backup status
- [ ] Verify monitoring alerts
- [ ] Review performance trends

---

## Troubleshooting Quick Reference

### Build Failures

**Symptom:** Build fails with memory error
**Solution:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**Symptom:** Prisma client not generated
**Solution:**
```bash
npx prisma generate
npm run build
```

**Symptom:** TypeScript errors
**Solution:**
```bash
npm run type-check
# Fix errors, then rebuild
```

### Deployment Failures

**Symptom:** Vercel deployment fails
**Solution:**
```bash
# Check Vercel status
vercel --debug

# Verify environment variables
vercel env ls

# Re-authenticate if needed
vercel login
```

**Symptom:** Health check fails after deployment
**Solution:**
```bash
# Check specific endpoint
curl https://disasterrecovery.com.au/api/deployment/health

# View deployment logs
vercel logs

# If critical, rollback
vercel rollback
```

### Performance Issues

**Symptom:** Slow page load times
**Solution:**
1. Check ISR configuration
2. Verify CDN caching
3. Review bundle size
4. Check database queries

**Symptom:** High memory usage
**Solution:**
1. Check for memory leaks
2. Review error logs
3. Optimize images
4. Consider increasing instance size

### Database Issues

**Symptom:** Database connection errors
**Solution:**
```bash
# Verify DATABASE_URL
echo $DATABASE_URL

# Test database connection
npx prisma db pull

# Regenerate client
npx prisma generate
```

---

## Performance Optimization Checklist

### Before Deployment

- [ ] Bundle size analyzed
- [ ] Images optimized
- [ ] ISR configured correctly
- [ ] Critical CSS extracted
- [ ] Unnecessary dependencies removed

### After Deployment

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] All pages load < 3s
- [ ] No console errors
- [ ] Mobile performance verified

---

## Security Checklist

### Pre-Deployment

- [ ] Environment variables secured
- [ ] No secrets in code
- [ ] Dependencies updated
- [ ] Security headers configured
- [ ] HTTPS enforced

### Post-Deployment

- [ ] SSL certificate valid
- [ ] Security headers present
- [ ] Rate limiting functional
- [ ] CORS configured correctly
- [ ] API authentication working

---

## Scheduled Maintenance Tasks

### Daily

- [ ] Review error logs
- [ ] Check monitoring alerts
- [ ] Verify backups
- [ ] Monitor performance metrics

### Weekly

- [ ] Performance audit
- [ ] Security scan
- [ ] Backup verification
- [ ] Dependency updates check

### Monthly

- [ ] Full security audit
- [ ] Performance optimization review
- [ ] Backup cleanup (keep last 10)
- [ ] Documentation update

### Quarterly

- [ ] Comprehensive security review
- [ ] Infrastructure optimization
- [ ] Disaster recovery drill
- [ ] Team training update

---

## Escalation Procedures

### Level 1: Warning (Auto-resolve)
- Single health check failure
- Minor performance degradation
- Low error rate increase

**Action:** Monitor, auto-retry

### Level 2: Alert (Team notification)
- 3 consecutive health check failures
- Moderate performance issues
- Error rate > 2%

**Action:**
1. Notify on-call engineer
2. Begin investigation
3. Consider rollback if worsening

### Level 3: Critical (Immediate action)
- Complete service outage
- Security breach
- Data loss risk

**Action:**
1. Page on-call lead
2. Initiate incident response
3. Rollback immediately
4. All-hands escalation

---

## Useful Commands

### Vercel Commands

```bash
# List deployments
vercel ls

# Get deployment details
vercel inspect <deployment-url>

# View environment variables
vercel env ls

# Add environment variable
vercel env add <name>

# Remove environment variable
vercel env rm <name>

# View logs
vercel logs <deployment-url>

# Rollback deployment
vercel rollback

# Promote deployment to production
vercel promote <deployment-url>
```

### Monitoring Commands

```bash
# Single health check
node scripts/deployment-monitor.js once

# Continuous monitoring
node scripts/deployment-monitor.js watch

# View metrics
node scripts/deployment-monitor.js metrics

# Check specific endpoint
curl -I https://disasterrecovery.com.au/api/deployment/health
```

### Backup Commands

```bash
# Create backup
node scripts/backup-deployment.js create "Description"

# List backups
node scripts/backup-deployment.js list

# Restore backup
node scripts/backup-deployment.js restore <backup-name>

# Cleanup old backups
node scripts/backup-deployment.js cleanup
```

### Environment Commands

```bash
# Validate environment
node scripts/env-validator.js

# Generate template
node scripts/env-validator.js generate-template

# Check environment variables
printenv | grep NEXT_PUBLIC
```

---

## Common Issues and Solutions

### Issue: Build timeout on Vercel

**Symptoms:**
- Build exceeds time limit
- Vercel cancels build

**Solutions:**
1. Reduce build scope
2. Use ISR instead of SSG for large page counts
3. Optimize dependencies
4. Contact Vercel support for timeout increase

### Issue: Memory exceeded during build

**Symptoms:**
- "JavaScript heap out of memory" error
- Build crashes midway

**Solutions:**
1. Increase NODE_OPTIONS memory
2. Reduce parallel builds
3. Split large pages
4. Use dynamic imports

### Issue: Pages not updating after deployment

**Symptoms:**
- Changes not visible
- Old content showing

**Solutions:**
1. Clear CDN cache
2. Force revalidation
3. Check ISR configuration
4. Verify build artifacts

### Issue: API routes returning 500

**Symptoms:**
- API endpoints fail
- Internal server errors

**Solutions:**
1. Check environment variables
2. Review API logs
3. Verify database connection
4. Check CORS configuration

---

## Contact Information

### Primary Contacts

- **Deployment Lead:** [Name]
- **DevOps Engineer:** [Name]
- **On-Call Rotation:** [Schedule Link]

### External Services

- **Vercel Support:** [Link]
- **GitHub Actions:** [Link]
- **Monitoring Dashboard:** [Link]

---

## Document Version

- **Version:** 1.0.0
- **Last Updated:** 2025-11-07
- **Next Review:** 2025-12-07
- **Owner:** DevOps Team

---

## Notes

This runbook should be updated after each significant incident or procedure change. All team members should be familiar with these procedures.
