# Production Deployment Plan: disasterrecovery.com.au

## Executive Summary

This document outlines the safe deployment strategy for migrating the Next.js application from Vercel preview (https://dr-new-ten.vercel.app) to production domain (https://disasterrecovery.com.au).

### Current Status
- **Preview Site**: https://dr-new-ten.vercel.app (253 pages, builds successfully)
- **Production Domain**: https://disasterrecovery.com.au (configured in Vercel)
- **GitHub Repo**: CleanExpo/DR-New (main branch)
- **Vercel Project**: dr-new (Project ID: prj_nCkxwNXcSXUHnq8vftc37YB7WmuZ)
- **Recent Deployment**: 14 minutes ago - READY status

### Critical Issues Identified

1. **Build History Shows Multiple Failures**: Recent deployment history shows multiple errors before the current successful build
2. **Environment Variable Mismatch**: vercel.json hardcodes preview URL instead of production domain
3. **Domain Not Linked**: disasterrecovery.com.au exists in domains but may not be assigned to dr-new project
4. **No Rollback Strategy**: Current setup lacks automated rollback capability

---

## Pre-Deployment Checklist

### Phase 1: Environment Verification

#### 1.1 Environment Variables Audit
**Location**: Vercel Dashboard > dr-new > Settings > Environment Variables

Required variables for PRODUCTION:
```bash
# Critical - Must Update for Production
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au

# Authentication
NEXTAUTH_SECRET=<32+ character secret>

# Database
DATABASE_URL=<production database URL>

# Stripe (Production Keys)
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional but Recommended
OPENAI_API_KEY=<if using AI features>
ANTHROPIC_API_KEY=<if using Claude>
GOOGLE_MAPS_API_KEY=<for maps>

# Email Service
SENDGRID_API_KEY=<or RESEND_API_KEY>
EMAIL_FROM=noreply@disasterrecovery.com.au

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Action Items**:
- [ ] Verify all environment variables are set for Production environment
- [ ] Remove SKIP_BUILD_ERRORS=true for production (currently in vercel.json)
- [ ] Confirm Stripe keys are LIVE keys (not test keys)
- [ ] Test database connectivity from Vercel IP ranges
- [ ] Verify NextAuth callback URLs include production domain

#### 1.2 Configuration Files Review

**vercel.json** - CRITICAL ISSUE FOUND:
```json
// Current (WRONG for production):
"NEXT_PUBLIC_APP_URL": "https://dr-new-ten.vercel.app"

// Should be (for production):
"NEXT_PUBLIC_APP_URL": "https://disasterrecovery.com.au"
```

**Action Items**:
- [ ] Update vercel.json to use environment-specific URL
- [ ] Consider removing hardcoded URLs from vercel.json
- [ ] Rely on Vercel's environment variable system instead

**next.config.mjs** - Review Findings:
- Image domains includes 'disasterrecovery.com.au' ✓
- Security headers configured ✓
- Build errors ignored (ignoreBuildErrors: true) - RISKY for production
- Cache-Control set to no-store - Consider adjusting for production

**Action Items**:
- [ ] Re-enable TypeScript checking for production builds
- [ ] Optimize cache headers for static assets
- [ ] Review CSP headers for production domain

#### 1.3 Domain Configuration

**Current Setup**:
- Domain: disasterrecovery.com.au (Third Party DNS)
- Listed in Vercel domains for unite-group team
- May not be assigned to dr-new project

**Action Items**:
- [ ] Verify DNS records point to Vercel:
  ```
  A Record: 76.76.21.21
  CNAME: cname.vercel-dns.com
  ```
- [ ] Assign domain to dr-new project in Vercel dashboard
- [ ] Configure www.disasterrecovery.com.au redirect
- [ ] Enable SSL certificate auto-renewal
- [ ] Test DNS propagation before deployment

### Phase 2: Application Testing

#### 2.1 Preview Environment Testing
**Test URL**: https://dr-new-ten.vercel.app

Critical functionality to verify:
- [ ] Homepage loads with all sections
- [ ] Emergency contact forms work
- [ ] Service area pages render (Brisbane, Ipswich, Logan)
- [ ] About Phill McGurk page displays correctly
- [ ] Image optimization working (WebP/AVIF)
- [ ] Mobile responsiveness
- [ ] SEO meta tags present
- [ ] Google Analytics tracking
- [ ] Contact form submissions
- [ ] Stripe payment integration (test mode)

#### 2.2 Build Verification
```bash
# Local build test
npm run build

# Expected output:
# - 253 static pages generated
# - No TypeScript errors (if checking enabled)
# - No build warnings for critical issues
# - Bundle size within acceptable limits
```

**Action Items**:
- [ ] Confirm local build completes successfully
- [ ] Review build output for warnings
- [ ] Check bundle sizes don't exceed limits
- [ ] Verify all 253 pages are generated

#### 2.3 Performance Testing
- [ ] Lighthouse score > 90 for all metrics
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1
- [ ] All images optimized and lazy-loaded

#### 2.4 SEO Verification
- [ ] robots.txt allows crawling (remove X-Robots-Tag: noindex if present)
- [ ] Sitemap.xml generates correctly
- [ ] Schema.org markup for LocalBusiness
- [ ] Service area pages have proper local SEO
- [ ] Meta descriptions for all pages
- [ ] Open Graph tags configured

### Phase 3: Deployment Preparation

#### 3.1 Backup Current Production
**If disasterrecovery.com.au currently has content**:
- [ ] Take screenshots of all pages
- [ ] Export current analytics data
- [ ] Backup DNS records
- [ ] Document current functionality

#### 3.2 Database Migration (if applicable)
- [ ] Create production database backup
- [ ] Run Prisma migrations on production DB
- [ ] Seed required data (service areas, etc.)
- [ ] Test database connectivity

#### 3.3 Third-Party Service Configuration
- [ ] Update Stripe webhook URLs to production domain
- [ ] Configure Google Search Console for new domain
- [ ] Update Google Analytics property
- [ ] Set up monitoring/alerting (Sentry, LogRocket, etc.)
- [ ] Configure email service for production domain

---

## Deployment Strategy

### Recommended Approach: Blue-Green Deployment with Gradual Rollout

#### Strategy Overview
1. Keep preview environment (blue) running
2. Deploy to production domain (green)
3. Monitor for issues
4. Gradual traffic shift
5. Full cutover when verified

### Step-by-Step Deployment Process

#### Step 1: Environment Variable Update (15 minutes)
```bash
# Via Vercel CLI or Dashboard
vercel env add NEXT_PUBLIC_APP_URL production
# Enter: https://disasterrecovery.com.au

vercel env add NEXTAUTH_URL production
# Enter: https://disasterrecovery.com.au
```

**Critical**: Update all production-specific environment variables

#### Step 2: Domain Assignment (10 minutes)
1. Go to Vercel Dashboard > dr-new > Settings > Domains
2. Add domain: disasterrecovery.com.au
3. Verify DNS configuration
4. Wait for SSL certificate provisioning
5. Test HTTPS access

#### Step 3: Code Preparation (30 minutes)
**Option A: Update vercel.json** (Recommended)
```json
{
  "env": {
    "NODE_OPTIONS": "--max-old-space-size=2048",
    "NEXT_TELEMETRY_DISABLED": "1"
    // Remove NEXT_PUBLIC_APP_URL - use environment variables instead
  }
}
```

**Option B: Environment-aware configuration**
Use Vercel's automatic environment detection instead of hardcoded values.

**Commit changes**:
```bash
git add vercel.json
git commit -m "fix: Update vercel.json for production deployment

- Remove hardcoded preview URL
- Rely on environment variables for APP_URL
- Prepare for production domain deployment

🚀 Ready for deployment to disasterrecovery.com.au"
git push origin main
```

#### Step 4: Trigger Production Deployment (5 minutes)
**Automatic** (if domain assigned):
- Push to main branch triggers automatic deployment
- Vercel will deploy to both preview and production domains

**Manual** (via CLI):
```bash
vercel --prod
```

#### Step 5: Post-Deployment Verification (30 minutes)

**Immediate Checks** (0-5 minutes):
```bash
# Check deployment status
curl -I https://disasterrecovery.com.au
# Should return: HTTP/2 200

# Verify SSL certificate
openssl s_client -connect disasterrecovery.com.au:443 -servername disasterrecovery.com.au

# Test key pages
curl -s https://disasterrecovery.com.au | grep -i "disaster recovery"
```

**Functional Testing** (5-30 minutes):
- [ ] Homepage loads completely
- [ ] All navigation links work
- [ ] Forms submit successfully
- [ ] Images load and optimize
- [ ] Emergency contact functionality
- [ ] Service area pages accessible
- [ ] Mobile rendering correct
- [ ] SSL certificate valid

**Performance Monitoring**:
```bash
# Monitor deployment logs
vercel logs dr-new-ten.vercel.app --prod --follow

# Check for errors
vercel logs dr-new-ten.vercel.app --prod | grep -i error
```

#### Step 6: DNS and Analytics Verification (2 hours)
- [ ] DNS propagation complete (use whatsmydns.net)
- [ ] Google Analytics receiving data
- [ ] Search Console verification
- [ ] Sitemap submitted to Google
- [ ] robots.txt accessible

---

## Rollback Procedures

### Scenario 1: Deployment Fails
**Symptoms**: Build errors, deployment stuck, or Vercel error

**Action**:
1. Check Vercel deployment logs
2. Identify the failing commit
3. Revert to last known good commit:
   ```bash
   git revert HEAD
   git push origin main
   ```
4. Automatic redeployment will trigger

**Time to Rollback**: 5-10 minutes

### Scenario 2: Production Site Has Issues
**Symptoms**: Site loads but features broken, forms not working, images missing

**Immediate Action**:
1. Check Vercel deployments dashboard
2. Redeploy previous working deployment:
   - Go to Vercel Dashboard > dr-new > Deployments
   - Find last working deployment (before current)
   - Click "..." > "Promote to Production"

**Time to Rollback**: 2-3 minutes

### Scenario 3: DNS or Domain Issues
**Symptoms**: Domain not resolving, SSL errors, DNS propagation problems

**Action**:
1. Verify DNS records in domain registrar
2. Check Vercel domain configuration
3. If critical, temporarily point DNS back to previous hosting
4. Contact Vercel support for SSL issues

**Time to Rollback**: 15-60 minutes (DNS propagation dependent)

### Scenario 4: Database Issues
**Symptoms**: Data not loading, migration errors, connection problems

**Action**:
1. Restore database from backup
2. Check DATABASE_URL environment variable
3. Verify Prisma schema matches production DB
4. Run database migrations manually if needed:
   ```bash
   npx prisma migrate deploy
   ```

**Time to Rollback**: 10-30 minutes

---

## Monitoring and Health Checks

### Automated Monitoring Setup

#### 1. Vercel Integration Monitor
**Script**: D:\DR New\scripts\deployment-monitor.js

**Current capabilities**:
- Verifies latest deployment matches Git commit
- Checks deployment status (READY/ERROR)
- Basic health checking

**Recommended enhancements**:
```javascript
// Add to monitoring script
async function healthCheck() {
  const checks = [
    { name: 'Homepage', url: 'https://disasterrecovery.com.au' },
    { name: 'Contact Form', url: 'https://disasterrecovery.com.au/contact' },
    { name: 'Service Areas', url: 'https://disasterrecovery.com.au/brisbane' },
    { name: 'API Health', url: 'https://disasterrecovery.com.au/api/health' }
  ];

  for (const check of checks) {
    const response = await fetch(check.url);
    if (!response.ok) {
      throw new Error(`${check.name} failed: ${response.status}`);
    }
  }
}
```

#### 2. Uptime Monitoring
**Recommended Services**:
- UptimeRobot (free tier: 50 monitors)
- Pingdom
- Vercel's built-in analytics

**Monitor URLs**:
- https://disasterrecovery.com.au (every 5 minutes)
- https://disasterrecovery.com.au/api/health (every 5 minutes)
- Key service pages (every 15 minutes)

#### 3. Error Tracking
**Recommended Setup**:
- Sentry for JavaScript errors
- Vercel Analytics for performance
- Google Search Console for crawl errors

#### 4. Performance Monitoring
**Metrics to Track**:
- Lighthouse scores (daily)
- Web Vitals (continuous)
- API response times
- Database query performance
- Image load times

---

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Monitor error logs for first 24 hours
- [ ] Check analytics for traffic patterns
- [ ] Verify all forms submitting to correct endpoints
- [ ] Test emergency contact flow end-to-end
- [ ] Confirm Stripe payments processing (if live)
- [ ] Review server costs and resource usage

### Short Term (Week 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for key pages
- [ ] Monitor search rankings for target keywords
- [ ] Set up automated backups
- [ ] Configure email alerts for downtime
- [ ] Review user feedback/contact form submissions

### Medium Term (Month 1)
- [ ] Analyze SEO performance for local keywords
- [ ] Review conversion rates (contact forms, calls)
- [ ] Optimize images based on actual usage
- [ ] Configure CDN for static assets if needed
- [ ] Set up regular security scans
- [ ] Plan content updates based on analytics

---

## Testing Procedures

### Pre-Production Testing Checklist

#### Functional Tests
```bash
# 1. Homepage
- [ ] Hero section loads
- [ ] Emergency contact button works
- [ ] Service cards display
- [ ] Testimonials (if any)
- [ ] Footer links work

# 2. Service Pages
- [ ] Water damage restoration
- [ ] Fire damage restoration
- [ ] Mould remediation
- [ ] Storm damage repair
- [ ] Commercial services
- [ ] Residential services

# 3. Service Area Pages (Critical for Local SEO)
- [ ] Brisbane main page
- [ ] Brisbane suburbs (Hamilton, Ascot, New Farm, Toowong)
- [ ] Ipswich main page
- [ ] Ipswich suburbs (Karalee, Brookwater, Springfield Lakes)
- [ ] Logan page

# 4. Forms and Contact
- [ ] Emergency contact form
- [ ] Quote request form
- [ ] Email delivery working
- [ ] Phone number click-to-call
- [ ] reCAPTCHA (if implemented)

# 5. About and Trust Signals
- [ ] Phill McGurk Master Restorer page
- [ ] Certifications display
- [ ] Insurance information
- [ ] Privacy policy
- [ ] Terms of service
```

#### Performance Tests
```bash
# Lighthouse CI (automated)
npx lighthouse https://dr-new-ten.vercel.app --only-categories=performance,seo,accessibility,best-practices --output=json --output-path=./lighthouse-report.json

# Expected thresholds:
# Performance: > 90
# SEO: > 95
# Accessibility: > 90
# Best Practices: > 90
```

#### Security Tests
- [ ] HTTPS enforced (no HTTP access)
- [ ] Security headers present (CSP, HSTS, etc.)
- [ ] No sensitive data in client-side code
- [ ] API routes protected
- [ ] Form submissions validated server-side
- [ ] SQL injection prevention (if using database)
- [ ] XSS protection enabled

#### SEO Tests
```bash
# Meta tags verification
curl -s https://dr-new-ten.vercel.app | grep -i "meta name=\"description\""

# Schema.org markup
curl -s https://dr-new-ten.vercel.app | grep -i "application/ld+json"

# Sitemap
curl -s https://dr-new-ten.vercel.app/sitemap.xml

# Robots.txt
curl -s https://dr-new-ten.vercel.app/robots.txt
```

---

## Environment Variables Configuration

### Production Environment Variables

**Critical - Must Set Before Deployment**:
```bash
# Application URLs
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au

# Authentication
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Database (if using)
DATABASE_URL=postgresql://user:password@host:5432/production_db

# Stripe LIVE Keys (not test)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Important - Recommended**:
```bash
# Email
EMAIL_FROM=noreply@disasterrecovery.com.au
SENDGRID_API_KEY=SG.xxxxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Maps
GOOGLE_MAPS_API_KEY=xxxxx

# Node Configuration
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=2048
```

**Optional - Based on Features**:
```bash
# AI Services (if using)
OPENAI_API_KEY=sk-xxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxx

# Monitoring
SENTRY_DSN=https://xxxxx@sentry.io/xxxxx

# Feature Flags
ENABLE_CHAT=false
ENABLE_2FA=false
MAINTENANCE_MODE=false
```

### How to Set Environment Variables

**Via Vercel Dashboard**:
1. Go to https://vercel.com/unite-group/dr-new
2. Settings > Environment Variables
3. Add each variable
4. Select "Production" environment
5. Click Save

**Via Vercel CLI**:
```bash
# Single variable
vercel env add NEXT_PUBLIC_APP_URL production

# From .env file
vercel env pull .env.production
```

---

## Risk Assessment

### High Risk Items
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| DNS not propagating | Site unreachable | Low | Pre-configure DNS 24h before |
| Environment variables missing | Site broken | Medium | Checklist verification |
| Database migration fails | Data loss | Low | Backup before deployment |
| Stripe webhooks fail | Payment issues | Medium | Test webhooks thoroughly |
| SSL certificate issues | Security warnings | Low | Vercel auto-provisions |

### Medium Risk Items
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Build failures | Deployment blocked | Medium | Test builds locally first |
| Performance degradation | Poor UX | Low | Performance testing |
| SEO meta tags missing | Poor rankings | Medium | Verify all pages |
| Analytics not tracking | Lost data | Medium | Test GA integration |
| Email delivery fails | Missed leads | Medium | Test email service |

### Low Risk Items
| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Minor UI bugs | Cosmetic issues | High | Post-deployment fixes |
| Image optimization issues | Slower load | Low | Monitor performance |
| Cache configuration | Stale content | Low | Adjust cache headers |

---

## Communication Plan

### Stakeholder Notifications

**Before Deployment**:
- [ ] Notify team of deployment window
- [ ] Set expectations for downtime (if any)
- [ ] Provide rollback contact information

**During Deployment**:
- [ ] Status updates every 15 minutes
- [ ] Immediate notification of any issues
- [ ] Completion notification with verification results

**After Deployment**:
- [ ] Success confirmation email
- [ ] Key metrics report (performance, errors)
- [ ] Next steps and monitoring plan

---

## Deployment Timeline

### Recommended Deployment Window
**Best Time**: Tuesday-Thursday, 10 AM - 2 PM AEST
- Avoid Mondays (post-weekend issues)
- Avoid Fridays (weekend support unavailable)
- Daytime allows immediate issue resolution
- Business hours for emergency contacts

### Estimated Timeline
```
Pre-Deployment Setup: 2-3 hours
├── Environment variable verification: 30 min
├── DNS configuration check: 15 min
├── Testing on preview: 1 hour
├── Database preparation: 30 min
└── Final checklist review: 30 min

Deployment Execution: 1 hour
├── Code commit and push: 10 min
├── Domain assignment: 15 min
├── Build and deployment: 20 min
└── Initial verification: 15 min

Post-Deployment Verification: 2-3 hours
├── Functional testing: 1 hour
├── Performance testing: 30 min
├── SEO verification: 30 min
└── Monitoring setup: 30 min

Total Estimated Time: 5-7 hours
```

---

## Success Criteria

### Deployment Considered Successful When:
- [ ] Site accessible at https://disasterrecovery.com.au
- [ ] SSL certificate valid and auto-renewing
- [ ] All 253 pages loading correctly
- [ ] Forms submitting successfully
- [ ] No console errors on critical pages
- [ ] Lighthouse performance score > 90
- [ ] Google Analytics tracking confirmed
- [ ] Mobile responsiveness verified
- [ ] All service area pages indexed
- [ ] Emergency contact flow working
- [ ] No increase in error rates
- [ ] Database connections stable (if applicable)

---

## Emergency Contacts

### Deployment Team
- **Lead Developer**: [Your contact]
- **DevOps Engineer**: [Contact]
- **Project Manager**: [Contact]

### Service Providers
- **Domain Registrar**: [Contact info]
- **Vercel Support**: support@vercel.com
- **Database Provider**: [Contact if applicable]
- **Stripe Support**: https://support.stripe.com

### Escalation Path
1. Check Vercel deployment logs
2. Review monitoring dashboards
3. Contact Vercel support (if platform issue)
4. Execute rollback procedure (if critical)
5. Notify stakeholders

---

## Appendix

### A. Useful Commands

```bash
# Check deployment status
vercel ls --scope unite-group

# View production logs
vercel logs dr-new --prod --follow

# Trigger manual deployment
vercel --prod

# Check environment variables
vercel env ls

# DNS verification
dig disasterrecovery.com.au
nslookup disasterrecovery.com.au

# SSL certificate check
openssl s_client -connect disasterrecovery.com.au:443 -servername disasterrecovery.com.au

# Quick health check
curl -I https://disasterrecovery.com.au
```

### B. Configuration Files to Review
- `D:\DR New\vercel.json` - Vercel deployment configuration
- `D:\DR New\next.config.mjs` - Next.js configuration
- `D:\DR New\.env.production` - Production environment variables
- `D:\DR New\package.json` - Build scripts and dependencies

### C. Critical URLs
- Preview: https://dr-new-ten.vercel.app
- Production: https://disasterrecovery.com.au
- Vercel Dashboard: https://vercel.com/unite-group/dr-new
- GitHub Repo: https://github.com/CleanExpo/DR-New

### D. Build Verification Script
```bash
#!/bin/bash
# Save as: scripts/verify-production-build.sh

echo "🔍 Verifying production build..."

# Test local build
echo "1. Testing local build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Local build failed"
    exit 1
fi

# Check for critical files
echo "2. Checking critical files..."
required_files=(
    "out/index.html"
    "out/404.html"
    "out/sitemap.xml"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing: $file"
        exit 1
    fi
done

# Test bundle size
echo "3. Checking bundle sizes..."
# Add bundle size checks here

echo "✅ Build verification complete!"
```

---

## Document Version
- **Version**: 1.0
- **Date**: 2025-11-05
- **Author**: Deployment Engineering Team
- **Next Review**: Before deployment execution

---

## Quick Start Guide

### For Immediate Deployment (if all prerequisites met):

1. **Verify Environment Variables** (15 min)
   ```bash
   # Check Vercel dashboard for all required env vars
   ```

2. **Update Configuration** (10 min)
   ```bash
   # Edit vercel.json to remove hardcoded preview URL
   git commit -am "fix: Prepare for production deployment"
   git push origin main
   ```

3. **Assign Domain** (5 min)
   - Vercel Dashboard > dr-new > Settings > Domains
   - Add: disasterrecovery.com.au

4. **Monitor Deployment** (30 min)
   ```bash
   vercel logs dr-new --prod --follow
   ```

5. **Verify and Test** (1 hour)
   - Run through testing checklist
   - Confirm all critical functionality

**Total Time: ~2 hours for streamlined deployment**

---

END OF DEPLOYMENT PLAN
