# Production Deployment Checklist
## disasterrecovery.com.au

Use this checklist to ensure all steps are completed before, during, and after deployment.

---

## Pre-Deployment Phase

### 1. Environment Variables ✓
- [ ] Verify NEXT_PUBLIC_APP_URL set to https://disasterrecovery.com.au (Production)
- [ ] Verify NEXTAUTH_URL set to https://disasterrecovery.com.au (Production)
- [ ] Confirm NEXTAUTH_SECRET is set (32+ characters)
- [ ] Verify DATABASE_URL points to production database
- [ ] Confirm Stripe keys are LIVE keys (sk_live_xxx, pk_live_xxx)
- [ ] Verify STRIPE_WEBHOOK_SECRET is configured
- [ ] Set EMAIL_FROM to noreply@disasterrecovery.com.au
- [ ] Configure email service API key (SendGrid/Resend)
- [ ] Set NEXT_PUBLIC_GA_MEASUREMENT_ID for production
- [ ] Verify Google Maps API key is set
- [ ] Remove or set SKIP_BUILD_ERRORS to false
- [ ] Set NODE_ENV to production
- [ ] Document all environment variables in secure location

**Verification Command**:
```bash
vercel env ls --scope unite-group
```

---

### 2. Configuration Files ✓
- [ ] Review vercel.json - remove hardcoded preview URLs
- [ ] Review next.config.mjs:
  - [ ] Verify image domains include disasterrecovery.com.au
  - [ ] Check security headers are production-ready
  - [ ] Consider re-enabling TypeScript checking
  - [ ] Review cache headers for optimization
- [ ] Verify .env.production exists locally
- [ ] Ensure .gitignore excludes sensitive files
- [ ] Review package.json build scripts

---

### 3. Code Quality ✓
- [ ] Run local build successfully: `npm run build`
- [ ] No TypeScript errors (if checking enabled)
- [ ] No critical ESLint warnings
- [ ] All tests passing (if applicable)
- [ ] Code review completed
- [ ] Latest changes committed to main branch
- [ ] Git repository clean (no uncommitted changes)

**Build Verification**:
```bash
npm run build
# Should output: Successfully built 253 pages
```

---

### 4. DNS Configuration ✓
- [ ] Verify DNS records at domain registrar:
  - [ ] A record: 76.76.21.21 OR
  - [ ] CNAME: cname.vercel-dns.com
- [ ] Configure www subdomain redirect
- [ ] Verify current DNS TTL (lower to 300 before deployment)
- [ ] Test DNS resolution: `nslookup disasterrecovery.com.au`
- [ ] Document current DNS settings (for rollback)

---

### 5. Domain Assignment (Vercel) ✓
- [ ] Login to Vercel Dashboard
- [ ] Navigate to dr-new project
- [ ] Go to Settings > Domains
- [ ] Verify disasterrecovery.com.au is listed
- [ ] Assign domain to dr-new project
- [ ] Wait for SSL certificate provisioning (usually 1-2 minutes)
- [ ] Test SSL certificate: `openssl s_client -connect disasterrecovery.com.au:443`

---

### 6. Database Preparation ✓ (if applicable)
- [ ] Backup current production database
- [ ] Run Prisma migrations on production:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] Verify database schema matches application
- [ ] Seed required data (service areas, initial content)
- [ ] Test database connectivity from Vercel IP ranges
- [ ] Document database rollback procedure

---

### 7. Third-Party Services ✓
- [ ] Update Stripe webhook endpoint:
  - Old: https://dr-new-ten.vercel.app/api/stripe/webhook
  - New: https://disasterrecovery.com.au/api/stripe/webhook
- [ ] Test Stripe webhook delivery
- [ ] Configure Google Search Console for new domain
- [ ] Add property in Google Analytics
- [ ] Update email service domain verification (if needed)
- [ ] Configure monitoring service (Sentry, UptimeRobot, etc.)
- [ ] Update any API allowlists with new domain

---

### 8. Content Verification ✓
- [ ] Verify homepage content is production-ready
- [ ] Review all service pages for accuracy
- [ ] Confirm service area pages (Brisbane, Ipswich, Logan) are correct
- [ ] Verify contact information is up-to-date
- [ ] Check emergency contact numbers are correct
- [ ] Review "About Phill McGurk" page
- [ ] Ensure no placeholder or test content
- [ ] Verify all images are optimized and loading
- [ ] Check legal pages (Privacy Policy, Terms)

---

### 9. Testing on Preview ✓
**Test URL**: https://dr-new-ten.vercel.app

#### Functional Testing
- [ ] Homepage loads completely
- [ ] Navigation menu works on all pages
- [ ] Emergency contact form submits
- [ ] Quote request form works
- [ ] Email delivery confirmed
- [ ] All service pages accessible
- [ ] Service area pages load (all suburbs)
- [ ] About page displays correctly
- [ ] Contact page shows correct information
- [ ] 404 page works
- [ ] Sitemap accessible: /sitemap.xml
- [ ] Robots.txt accessible: /robots.txt

#### Mobile Testing
- [ ] Responsive design on mobile (320px width)
- [ ] Navigation menu on mobile
- [ ] Forms work on mobile
- [ ] Images scale correctly
- [ ] Text readable without zooming
- [ ] Touch targets appropriately sized

#### Performance Testing
- [ ] Run Lighthouse audit:
  ```bash
  npx lighthouse https://dr-new-ten.vercel.app
  ```
- [ ] Performance score > 90
- [ ] SEO score > 95
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

#### Security Testing
- [ ] HTTPS enforced (no HTTP access)
- [ ] Security headers present:
  ```bash
  curl -I https://dr-new-ten.vercel.app
  ```
  - [ ] Strict-Transport-Security
  - [ ] X-Content-Type-Options
  - [ ] X-Frame-Options
  - [ ] Content-Security-Policy
- [ ] No sensitive data in client-side code
- [ ] Forms have CSRF protection
- [ ] API routes protected appropriately

#### SEO Testing
- [ ] Meta title present on all pages
- [ ] Meta description on all pages
- [ ] Open Graph tags configured
- [ ] Schema.org LocalBusiness markup
- [ ] Canonical URLs set correctly
- [ ] Alt text on all images
- [ ] Heading hierarchy correct (H1, H2, H3)
- [ ] Internal linking structure logical

---

### 10. Backup Current State ✓
- [ ] Take screenshots of current production site (if exists)
- [ ] Export current analytics data
- [ ] Backup current DNS records
- [ ] Document current Vercel deployment URL
- [ ] Save current environment variables
- [ ] Create code snapshot: `git tag pre-production-$(date +%Y%m%d)`

---

## Deployment Phase

### 11. Pre-Flight Check ✓
- [ ] All team members notified of deployment
- [ ] Rollback plan documented and understood
- [ ] Emergency contacts list prepared
- [ ] Monitoring dashboards open and ready
- [ ] Deployment time scheduled (Tues-Thurs, 10 AM - 2 PM AEST)
- [ ] No other critical deployments in progress

---

### 12. Code Deployment ✓

**Option A: Automatic (Recommended)**
```bash
# Commit final changes
git add .
git commit -m "chore: Prepare for production deployment to disasterrecovery.com.au"
git push origin main

# Vercel auto-deploys on push to main
```

**Option B: Manual**
```bash
# Deploy via Vercel CLI
vercel --prod
```

- [ ] Code pushed to main branch
- [ ] Vercel deployment triggered
- [ ] Deployment building (check Vercel dashboard)
- [ ] Build completed successfully
- [ ] Note deployment URL and commit SHA

**Monitor Deployment**:
```bash
vercel logs dr-new --prod --follow
```

---

### 13. Domain Cutover ✓
- [ ] Verify domain assigned in Vercel dashboard
- [ ] SSL certificate provisioned and active
- [ ] Test HTTPS access: https://disasterrecovery.com.au
- [ ] Verify SSL certificate details:
  ```bash
  openssl s_client -connect disasterrecovery.com.au:443 -servername disasterrecovery.com.au < /dev/null | openssl x509 -noout -dates
  ```
- [ ] Check for SSL warnings in browser

---

### 14. Immediate Verification (0-15 minutes) ✓

#### Basic Connectivity
```bash
# HTTP status check
curl -I https://disasterrecovery.com.au
# Expected: HTTP/2 200

# DNS resolution
nslookup disasterrecovery.com.au

# SSL certificate
curl -vI https://disasterrecovery.com.au 2>&1 | grep -i "SSL certificate"
```

- [ ] Site responds with HTTP 200
- [ ] DNS resolving correctly
- [ ] SSL certificate valid
- [ ] No redirect loops
- [ ] Homepage loads visual content (not just HTML text)

#### Quick Functionality Check
- [ ] Homepage displays correctly (all sections visible)
- [ ] Images loading and optimized
- [ ] Navigation menu works
- [ ] Emergency contact button clickable
- [ ] Forms render correctly
- [ ] Mobile view responsive

---

## Post-Deployment Phase

### 15. Comprehensive Testing (15-60 minutes) ✓

#### All Critical Pages
Test each page and verify:
- [ ] Homepage: https://disasterrecovery.com.au
- [ ] Services: https://disasterrecovery.com.au/services
- [ ] Water Damage: https://disasterrecovery.com.au/services/water-damage
- [ ] Fire Damage: https://disasterrecovery.com.au/services/fire-damage
- [ ] Mould Remediation: https://disasterrecovery.com.au/services/mould
- [ ] Storm Damage: https://disasterrecovery.com.au/services/storm-damage
- [ ] Brisbane: https://disasterrecovery.com.au/brisbane
- [ ] Ipswich: https://disasterrecovery.com.au/ipswich
- [ ] Logan: https://disasterrecovery.com.au/logan
- [ ] About: https://disasterrecovery.com.au/about
- [ ] Contact: https://disasterrecovery.com.au/contact

#### Form Functionality
- [ ] Submit emergency contact form
- [ ] Verify email received
- [ ] Test quote request form
- [ ] Check form validation
- [ ] Verify reCAPTCHA (if enabled)
- [ ] Test on mobile device

#### API Endpoints
- [ ] Test health check (if exists): /api/health
- [ ] Stripe webhook receiving events
- [ ] Contact form API working
- [ ] File upload working (if applicable)

---

### 16. Performance Verification ✓
```bash
# Run Lighthouse on production
npx lighthouse https://disasterrecovery.com.au --output=json --output-path=./production-lighthouse.json
```

- [ ] Performance score > 90
- [ ] SEO score > 95
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] Compare with preview environment scores
- [ ] Investigate any score drops > 5 points

**Web Vitals**:
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] First Input Delay (FID) < 100ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Contentful Paint (FCP) < 1.8s
- [ ] Time to First Byte (TTFB) < 600ms

---

### 17. SEO Verification ✓

#### Meta Tags
```bash
# Check title and description
curl -s https://disasterrecovery.com.au | grep -i "<title>"
curl -s https://disasterrecovery.com.au | grep -i "meta name=\"description\""
```

- [ ] Title tag present and relevant
- [ ] Meta description present (150-160 characters)
- [ ] Open Graph tags present
- [ ] Twitter card tags present
- [ ] Canonical URL set correctly
- [ ] No noindex tags (unless intended)

#### Structured Data
- [ ] LocalBusiness schema present
- [ ] Validate schema: https://validator.schema.org/
- [ ] Test rich results: https://search.google.com/test/rich-results

#### Crawlability
- [ ] Robots.txt accessible: https://disasterrecovery.com.au/robots.txt
- [ ] Sitemap accessible: https://disasterrecovery.com.au/sitemap.xml
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for homepage
- [ ] Verify no crawl errors in Search Console

---

### 18. Analytics Setup ✓

- [ ] Google Analytics receiving pageviews
- [ ] Real-time analytics showing activity
- [ ] Event tracking working (form submits, clicks)
- [ ] Conversion goals configured
- [ ] E-commerce tracking (if applicable)
- [ ] Verify GA property ID correct
- [ ] Test on multiple browsers

**Verification**:
1. Visit site in incognito mode
2. Check Google Analytics Real-Time view
3. Verify pageview appears

---

### 19. Monitoring Setup ✓

#### Uptime Monitoring
- [ ] Configure UptimeRobot or similar:
  - Monitor: https://disasterrecovery.com.au
  - Interval: 5 minutes
  - Alert method: Email/SMS
- [ ] Set up status page (if needed)
- [ ] Configure Vercel Analytics
- [ ] Enable Vercel deployment notifications

#### Error Tracking
- [ ] Configure Sentry (if using):
  ```javascript
  // Verify Sentry initialization
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: 'production'
  })
  ```
- [ ] Test error reporting
- [ ] Set up error alert thresholds
- [ ] Configure Slack/email notifications

#### Performance Monitoring
- [ ] Set up Web Vitals monitoring
- [ ] Configure performance alerts
- [ ] Monitor Vercel dashboard for metrics
- [ ] Track API response times

---

### 20. Security Verification ✓

#### SSL and HTTPS
- [ ] Force HTTPS redirect working
- [ ] SSL certificate valid and trusted
- [ ] Certificate auto-renewal enabled
- [ ] No mixed content warnings
- [ ] Test SSL with: https://www.ssllabs.com/ssltest/

#### Security Headers
```bash
curl -I https://disasterrecovery.com.au
```
- [ ] Strict-Transport-Security present
- [ ] Content-Security-Policy present
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] X-XSS-Protection enabled

#### Application Security
- [ ] Forms have CSRF protection
- [ ] API rate limiting working (if enabled)
- [ ] No sensitive data in console logs
- [ ] Environment variables not exposed
- [ ] Database credentials secure

---

### 21. Third-Party Integration Testing ✓

#### Stripe (if live payments)
- [ ] Test payment flow end-to-end
- [ ] Verify webhooks receiving events
- [ ] Check Stripe dashboard for test transactions
- [ ] Verify refund functionality (if applicable)
- [ ] Test different payment methods

#### Email Service
- [ ] Send test email from contact form
- [ ] Verify email received correctly
- [ ] Check email formatting (HTML/text)
- [ ] Test email deliverability
- [ ] Verify SPF/DKIM records (if custom domain)

#### Google Maps (if using)
- [ ] Maps loading correctly
- [ ] Service area boundaries displaying
- [ ] Location markers showing
- [ ] Directions functionality working

---

### 22. Browser Compatibility ✓
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Test on tablet devices

---

### 23. Final Checks ✓

- [ ] No console errors on any page
- [ ] No broken images
- [ ] No broken links (use broken link checker)
- [ ] All CTAs working (call, email, forms)
- [ ] Phone numbers clickable on mobile
- [ ] Email addresses clickable
- [ ] Social media links correct (if present)
- [ ] Legal pages accessible
- [ ] Copyright year current

---

## Monitoring Phase (First 24 Hours)

### 24. Active Monitoring ✓

#### Hour 1
- [ ] Check error logs every 15 minutes
- [ ] Monitor deployment status
- [ ] Verify form submissions working
- [ ] Check analytics for traffic
- [ ] Review performance metrics

#### Hours 2-6
- [ ] Check error logs hourly
- [ ] Monitor server resource usage
- [ ] Verify all integrations working
- [ ] Check for any user reports
- [ ] Review analytics trends

#### Hours 6-24
- [ ] Check error logs every 2-3 hours
- [ ] Monitor conversion rates
- [ ] Check for any anomalies
- [ ] Verify backup services running
- [ ] Review performance data

**Monitoring Commands**:
```bash
# View production logs
vercel logs dr-new --prod --follow

# Check for errors
vercel logs dr-new --prod | grep -i error

# Monitor deployment status
vercel ls --scope unite-group
```

---

### 25. Day 1 Metrics Collection ✓

- [ ] Total pageviews
- [ ] Unique visitors
- [ ] Form submissions
- [ ] Error rate
- [ ] Average page load time
- [ ] Bounce rate
- [ ] Top landing pages
- [ ] Traffic sources
- [ ] Mobile vs desktop traffic

---

## Week 1 Follow-Up

### 26. SEO Activities ✓

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Request indexing for key pages:
  - Homepage
  - Service pages
  - Service area pages (Brisbane, Ipswich, Logan)
- [ ] Monitor crawl errors in Search Console
- [ ] Check for any manual actions
- [ ] Verify structured data in Search Console
- [ ] Monitor search appearance

---

### 27. Performance Optimization ✓

- [ ] Review real user metrics (RUM)
- [ ] Identify slow-loading pages
- [ ] Optimize images if needed
- [ ] Review and adjust cache headers
- [ ] Consider CDN for static assets
- [ ] Optimize database queries (if applicable)
- [ ] Review and reduce bundle sizes

---

### 28. Analytics Review ✓

- [ ] Set up custom dashboards
- [ ] Configure conversion funnels
- [ ] Set up automated reports
- [ ] Review traffic sources
- [ ] Identify popular content
- [ ] Check for any drop-offs
- [ ] Analyze user behavior flow

---

### 29. Security Audit ✓

- [ ] Review access logs for anomalies
- [ ] Check for any failed login attempts
- [ ] Verify no unauthorized API calls
- [ ] Review firewall rules
- [ ] Check for any DDoS attempts
- [ ] Update dependencies (if security patches)
- [ ] Run security scanner (OWASP ZAP, etc.)

---

### 30. Backup Verification ✓

- [ ] Verify automated backups running
- [ ] Test database restore procedure
- [ ] Verify code repository backed up
- [ ] Check media/upload backups
- [ ] Document backup locations
- [ ] Test recovery time objective (RTO)

---

## Rollback Procedures (If Needed)

### Scenario 1: Critical Bug Detected
1. [ ] Identify the failing commit
2. [ ] Revert to previous deployment in Vercel dashboard:
   - Go to Deployments
   - Find last working deployment
   - Click "Promote to Production"
3. [ ] Or revert via Git:
   ```bash
   git revert HEAD
   git push origin main
   ```
4. [ ] Monitor rollback deployment
5. [ ] Verify issue resolved
6. [ ] Communicate rollback to team

**Estimated Time**: 2-5 minutes

---

### Scenario 2: DNS Issues
1. [ ] Check DNS propagation status
2. [ ] Verify DNS records at registrar
3. [ ] If critical, point DNS back to previous hosting
4. [ ] Contact Vercel support
5. [ ] Document issue for post-mortem

**Estimated Time**: 15-60 minutes

---

### Scenario 3: Database Issues
1. [ ] Stop accepting new traffic (maintenance mode)
2. [ ] Restore database from backup
3. [ ] Verify data integrity
4. [ ] Re-run migrations if needed
5. [ ] Test application with restored DB
6. [ ] Resume traffic

**Estimated Time**: 10-30 minutes

---

## Sign-Off

### Pre-Deployment Sign-Off
- [ ] Technical Lead: _________________ Date: _______
- [ ] Project Manager: ________________ Date: _______
- [ ] Stakeholder: ____________________ Date: _______

### Post-Deployment Sign-Off
- [ ] Technical Lead: _________________ Date: _______
- [ ] Project Manager: ________________ Date: _______
- [ ] Stakeholder: ____________________ Date: _______

### Deployment Summary
- Deployment Date: _________________
- Deployment Time: _________________
- Deployed By: _____________________
- Deployment Status: ☐ Success ☐ Rollback ☐ Partial
- Issues Encountered: ______________
- Rollback Required: ☐ Yes ☐ No
- Notes: ___________________________

---

## Additional Resources

- Deployment Plan: `DEPLOYMENT-PLAN.md`
- Vercel Dashboard: https://vercel.com/unite-group/dr-new
- GitHub Repository: https://github.com/CleanExpo/DR-New
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com

---

**Last Updated**: 2025-11-05
**Version**: 1.0
**Next Review**: After deployment completion
