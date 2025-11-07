# Deployment Checklist

Use this checklist for every production deployment to ensure consistency and reduce errors.

## Pre-Deployment Checklist

### Code Quality
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Code review completed and approved
- [ ] No console.log statements in production code
- [ ] No commented-out code blocks

### Environment & Configuration
- [ ] Environment variables validated (`npm run validate-env`)
- [ ] `.env.production` file reviewed
- [ ] Vercel environment variables synced
- [ ] API keys rotated if necessary
- [ ] Database migrations prepared (if applicable)
- [ ] Configuration files reviewed (next.config.js, vercel.json)

### Dependencies
- [ ] Package vulnerabilities checked (`npm audit`)
- [ ] Critical vulnerabilities resolved
- [ ] Dependencies up to date (or intentionally pinned)
- [ ] No unused dependencies
- [ ] Lock file (`package-lock.json`) committed

### Build & Performance
- [ ] Local build successful (`npm run build`)
- [ ] Build time < 30 seconds
- [ ] No build warnings
- [ ] Bundle size within limits
- [ ] Critical pages load < 2s locally
- [ ] Images optimized
- [ ] ISR configuration verified

### Security
- [ ] Security headers configured
- [ ] HTTPS enforcement enabled
- [ ] Rate limiting implemented
- [ ] CORS settings correct
- [ ] No secrets in code or version control
- [ ] Authentication/authorization working
- [ ] Input validation in place

### Backup & Recovery
- [ ] Current deployment backup created
- [ ] Backup verified and accessible
- [ ] Rollback procedure documented
- [ ] Database backup (if applicable)

### Documentation
- [ ] CHANGELOG.md updated
- [ ] API documentation updated (if changed)
- [ ] README.md current
- [ ] Deployment notes prepared
- [ ] Known issues documented

### Communication
- [ ] Team notified of deployment window
- [ ] Stakeholders informed
- [ ] Maintenance window scheduled (if needed)
- [ ] Status page updated

## Deployment Checklist

### Staging Deployment
- [ ] Deployed to staging environment
- [ ] Staging health check passed
- [ ] Critical user flows tested:
  - [ ] Homepage loads
  - [ ] Emergency water damage page
  - [ ] Emergency fire damage page
  - [ ] Booking form submission
  - [ ] About page displays
  - [ ] Search functionality
  - [ ] Mobile responsiveness
- [ ] No console errors in browser
- [ ] Performance metrics acceptable
- [ ] Staging monitoring active

### Production Deployment
- [ ] Final team approval received
- [ ] Deployment window confirmed
- [ ] Status page updated (maintenance mode if needed)
- [ ] Production deployment initiated
- [ ] Deployment progress monitored
- [ ] No errors during deployment
- [ ] Deployment completed successfully

## Post-Deployment Checklist

### Immediate Verification (< 5 minutes)
- [ ] Production health check passed
- [ ] Homepage accessible (https://disasterrecovery.com.au)
- [ ] Critical pages verified:
  - [ ] `/emergency/water-damage-brisbane`
  - [ ] `/emergency/fire-damage-brisbane`
  - [ ] `/emergency/storm-damage-queensland`
  - [ ] `/book-service`
  - [ ] `/about-phil-mcgurk`
  - [ ] `/services`
- [ ] API endpoints responding
- [ ] No 500 errors
- [ ] SSL certificate valid
- [ ] Security headers present

### Functional Testing (< 10 minutes)
- [ ] User authentication working (if applicable)
- [ ] Form submissions functional
- [ ] Database connectivity verified
- [ ] Search functionality working
- [ ] Navigation working
- [ ] External integrations working:
  - [ ] Google Analytics
  - [ ] Microsoft Clarity
  - [ ] Google Maps (if used)

### Performance Verification (< 5 minutes)
- [ ] Page load times < 3s
- [ ] Time to First Byte < 600ms
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] No memory leaks detected
- [ ] Response times acceptable

### Monitoring Setup (< 5 minutes)
- [ ] Deployment monitoring started
- [ ] Error tracking active
- [ ] Performance monitoring active
- [ ] Alerts configured
- [ ] Logs accessible
- [ ] Metrics dashboard updated

### Mobile Verification
- [ ] Mobile homepage loads correctly
- [ ] Mobile emergency pages functional
- [ ] Mobile booking form works
- [ ] Mobile navigation usable
- [ ] Touch interactions working

### Browser Compatibility
- [ ] Chrome (latest) verified
- [ ] Firefox (latest) verified
- [ ] Safari (latest) verified
- [ ] Edge (latest) verified
- [ ] Mobile browsers verified

### SEO Verification
- [ ] Sitemap accessible
- [ ] Robots.txt correct
- [ ] Meta tags present
- [ ] Structured data valid
- [ ] Canonical URLs correct
- [ ] Open Graph tags working

### Accessibility
- [ ] Keyboard navigation working
- [ ] Screen reader compatibility verified
- [ ] ARIA labels present
- [ ] Color contrast acceptable
- [ ] Focus indicators visible

## Extended Monitoring (First 24 Hours)

### First Hour
- [ ] Error rate < 1%
- [ ] Response times normal
- [ ] No critical errors
- [ ] User traffic patterns normal
- [ ] No rollback required

### First 6 Hours
- [ ] Performance metrics stable
- [ ] No unusual errors
- [ ] Database performance normal
- [ ] CDN serving correctly
- [ ] Monitoring alerts reviewed

### First 24 Hours
- [ ] All metrics within normal range
- [ ] No user complaints
- [ ] Error logs reviewed
- [ ] Performance trends positive
- [ ] Backup verified

## Rollback Conditions

Immediate rollback required if:
- [ ] Complete site outage
- [ ] Critical functionality broken
- [ ] Security vulnerability exposed
- [ ] Data loss or corruption
- [ ] Error rate > 10%

Consider rollback if:
- [ ] Major functionality impaired
- [ ] Performance degradation > 50%
- [ ] Error rate > 5%
- [ ] User complaints increasing
- [ ] Monitoring alerts triggered

## Post-Deployment Tasks

### Documentation
- [ ] Deployment notes completed
- [ ] Incident log updated (if issues occurred)
- [ ] Lessons learned documented
- [ ] Runbook updated if needed
- [ ] Team wiki updated

### Communication
- [ ] Team notified of successful deployment
- [ ] Stakeholders updated
- [ ] Status page updated (if used)
- [ ] Deployment ticket closed
- [ ] Post-deployment report sent

### Cleanup
- [ ] Old backups cleaned up (keep last 10)
- [ ] Temporary files removed
- [ ] Logs archived
- [ ] Test data cleaned (if any)

### Review
- [ ] Deployment process reviewed
- [ ] Issues documented
- [ ] Improvements identified
- [ ] Checklist updated if needed
- [ ] Team feedback collected

## Emergency Rollback Checklist

If rollback is required:

1. **Immediate Actions**
   - [ ] Execute rollback command: `vercel rollback`
   - [ ] Notify team immediately
   - [ ] Update status page
   - [ ] Stop ongoing deployments

2. **Verification**
   - [ ] Rollback completed
   - [ ] Previous version active
   - [ ] Health checks passing
   - [ ] Service restored
   - [ ] Users can access site

3. **Investigation**
   - [ ] Error logs collected
   - [ ] Root cause identified
   - [ ] Incident documented
   - [ ] Fix planned
   - [ ] Prevention measures identified

4. **Communication**
   - [ ] Incident report sent
   - [ ] Stakeholders notified
   - [ ] Timeline for fix communicated
   - [ ] Post-mortem scheduled

## Notes

- This checklist should be completed for every production deployment
- Items can be checked off in order or as completed
- Any failed item should be investigated before proceeding
- Keep a copy of this checklist with deployment notes
- Update this checklist based on lessons learned

## Deployment Sign-Off

- **Deployer:** _______________
- **Date:** _______________
- **Deployment ID:** _______________
- **Git Commit:** _______________
- **Approved By:** _______________

**Deployment Status:** ☐ Success ☐ Partial ☐ Rolled Back

**Issues Encountered:**
_______________________________________________
_______________________________________________

**Resolution:**
_______________________________________________
_______________________________________________

---

**Last Updated:** 2025-11-07
**Version:** 1.0.0
