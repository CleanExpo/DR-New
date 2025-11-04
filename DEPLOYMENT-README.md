# Deployment Documentation Index
## Disaster Recovery - Production Deployment to disasterrecovery.com.au

This folder contains all documentation and tools for safely deploying the Disaster Recovery Next.js application from Vercel preview to production.

---

## Documentation Overview

### 1. DEPLOYMENT-QUICKSTART.md
**Best for**: Quick deployments when you know what you're doing
- **Time**: 30 minutes
- **Level**: Intermediate
- **Content**: Condensed step-by-step deployment guide
- **Use when**: You've deployed before or need a quick reference

### 2. DEPLOYMENT-PLAN.md
**Best for**: First-time deployments or complex scenarios
- **Time**: 5-7 hours (includes testing)
- **Level**: Comprehensive
- **Content**:
  - Complete deployment strategy
  - Environment configuration
  - Security procedures
  - Rollback procedures
  - Risk assessment
  - Post-deployment monitoring
- **Use when**: First deployment, major changes, or need detailed procedures

### 3. DEPLOYMENT-CHECKLIST.md
**Best for**: Ensuring nothing is missed
- **Time**: Follow along with deployment
- **Level**: Detailed
- **Content**:
  - 30+ checkpoint items
  - Pre-deployment verification
  - Post-deployment testing
  - Week 1 and Month 1 follow-ups
- **Use when**: Any deployment to ensure completeness

### 4. This File (DEPLOYMENT-README.md)
**Best for**: Overview and quick navigation
- **Content**: You're reading it!

---

## Automated Deployment Tools

All scripts are located in `D:\DR New\scripts\` and can be run via npm scripts.

### Preparation Script
```bash
npm run deploy:prepare
```
**What it does**:
- Backs up current configuration
- Updates vercel.json for production
- Checks environment variables
- Provides pre-deployment checklist
- Generates deployment commands

**When to use**: Before every deployment

---

### Verification Script
```bash
npm run deploy:verify
```
**What it does**:
- Fetches deployed site HTML
- Verifies Next.js hydration
- Checks for errors
- Validates critical resources
- Tests both preview and production URLs

**When to use**: After deployment to verify rendering

---

### Rollback Script
```bash
npm run deploy:rollback
```
**What it does**:
- Shows current deployment status
- Lists recent deployments
- Provides rollback options:
  - Vercel Dashboard rollback (fastest)
  - Git revert rollback
  - Emergency rollback (guided)
- Interactive assistance

**When to use**: When deployment fails or issues detected

---

### Monitoring Script
```bash
npm run monitor
```
**What it does**:
- Verifies latest deployment
- Checks Git commit matches deployment
- Validates deployment status
- Provides deployment health report

**When to use**: Continuous monitoring after deployment

---

## Current Deployment Status

### Preview Environment
- **URL**: https://dr-new-ten.vercel.app
- **Status**: ✓ Building successfully
- **Pages**: 253 static pages generated
- **Branch**: main
- **Project**: dr-new (Vercel)

### Production Environment
- **Target URL**: https://disasterrecovery.com.au
- **Domain Status**: Registered (Third Party DNS)
- **Vercel Assignment**: Not yet assigned to dr-new project
- **Status**: ⚠️ Awaiting deployment

### Critical Issues Identified

1. **Environment Variables**
   - vercel.json hardcodes preview URL
   - Need to set production environment variables in Vercel
   - Required: NEXT_PUBLIC_APP_URL, NEXTAUTH_URL, etc.

2. **Domain Configuration**
   - Domain exists in Vercel but not assigned to project
   - DNS records need verification
   - SSL certificate needs provisioning

3. **Build Configuration**
   - Recent deployment history shows errors before current success
   - SKIP_BUILD_ERRORS is enabled (risky for production)
   - TypeScript checking disabled (should re-enable)

---

## Recommended Deployment Workflow

### For First-Time Production Deployment

1. **Read Documentation** (1 hour)
   - Start with `DEPLOYMENT-QUICKSTART.md`
   - Skim `DEPLOYMENT-PLAN.md` for context
   - Keep `DEPLOYMENT-CHECKLIST.md` open

2. **Prepare Environment** (30 min)
   ```bash
   npm run deploy:prepare
   ```
   - Follow script instructions
   - Set all environment variables in Vercel Dashboard
   - Verify DNS configuration

3. **Configure Domain** (15 min)
   - Assign disasterrecovery.com.au to dr-new project
   - Wait for SSL certificate provisioning
   - Verify DNS records

4. **Deploy** (5 min)
   ```bash
   # If config changes needed
   git add vercel.json package.json
   git commit -m "fix: Prepare for production deployment"
   git push origin main

   # Or manual deployment
   vercel --prod
   ```

5. **Verify** (15 min)
   ```bash
   npm run deploy:verify
   ```
   - Test all critical pages
   - Check forms and functionality
   - Verify mobile responsiveness

6. **Monitor** (Ongoing)
   ```bash
   npm run monitor
   vercel logs dr-new --prod --follow
   ```

---

### For Subsequent Deployments

1. **Test Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   ```bash
   git push origin main  # Auto-deploys via GitHub integration
   ```

3. **Verify**
   ```bash
   npm run deploy:verify
   ```

4. **Monitor**
   - Check logs for errors
   - Verify functionality
   - Monitor performance

---

## Key Configuration Files

### vercel.json
**Location**: `D:\DR New\vercel.json`
**Purpose**: Vercel deployment configuration
**Critical Settings**:
- Build command
- Environment variables (remove hardcoded URLs)
- Function timeouts
- Headers and redirects

**Current Issue**: Hardcodes preview URL instead of production domain

---

### next.config.mjs
**Location**: `D:\DR New\next.config.mjs`
**Purpose**: Next.js application configuration
**Critical Settings**:
- Image domains
- Security headers
- Build optimization
- TypeScript/ESLint checking

**Current Issue**: Build error checking disabled (ignoreBuildErrors: true)

---

### .env.production
**Location**: `D:\DR New\.env.production`
**Purpose**: Production environment variables template
**Note**: Actual values should be set in Vercel Dashboard, not committed to repo

---

## Environment Variables Required

### Critical (Must Set Before Deployment)

```bash
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au
NEXTAUTH_SECRET=<32+ character secret>
```

### Important (Recommended)

```bash
DATABASE_URL=<production database>
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
EMAIL_FROM=noreply@disasterrecovery.com.au
SENDGRID_API_KEY=SG.xxxxx
GOOGLE_MAPS_API_KEY=xxxxx
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Where to Set
- Vercel Dashboard > dr-new > Settings > Environment Variables
- Select "Production" environment
- DO NOT set in "Preview" or "Development"

---

## Common Scenarios

### Scenario 1: First Production Deployment
**Follow**: `DEPLOYMENT-PLAN.md` (comprehensive)
**Use**: `DEPLOYMENT-CHECKLIST.md` (track progress)
**Tools**: All scripts in order (prepare → deploy → verify → monitor)

### Scenario 2: Routine Update Deployment
**Follow**: `DEPLOYMENT-QUICKSTART.md`
**Use**: Quick verification
**Tools**: `npm run deploy:verify` after deployment

### Scenario 3: Emergency Rollback Needed
**Follow**: Rollback section in `DEPLOYMENT-PLAN.md`
**Use**: `DEPLOYMENT-CHECKLIST.md` rollback procedures
**Tools**: `npm run deploy:rollback`

### Scenario 4: Deployment Failed to Build
**Follow**: Build troubleshooting in `DEPLOYMENT-PLAN.md`
**Use**: `DEPLOYMENT-CHECKLIST.md` pre-deployment checks
**Tools**: Local build testing: `npm run build`

### Scenario 5: Site Deployed but Not Rendering
**Issue**: "Just 1 image and HTML text" - This is your current concern!
**Follow**: Rendering troubleshooting section
**Use**: Verification script
**Tools**:
```bash
npm run deploy:verify
vercel logs dr-new --prod
```

**Common Causes**:
1. JavaScript not loading (Next.js scripts missing)
2. Environment variables incorrect
3. Build output incomplete
4. Static generation failed

**Solution**:
1. Run verification script to diagnose
2. Check Vercel build logs
3. Verify environment variables set correctly
4. Test local build matches deployed build

---

## Pre-Deployment Checklist (Quick)

Before deploying to production:

- [ ] Local build succeeds: `npm run build`
- [ ] Environment variables set in Vercel (Production)
- [ ] Domain assigned to dr-new project
- [ ] DNS records point to Vercel
- [ ] SSL certificate will auto-provision
- [ ] Team notified of deployment
- [ ] Rollback plan understood
- [ ] Monitoring ready

---

## Post-Deployment Checklist (Quick)

After deploying to production:

- [ ] Site loads: https://disasterrecovery.com.au
- [ ] SSL certificate valid (green padlock)
- [ ] Homepage displays completely (not just HTML)
- [ ] Forms work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Analytics tracking
- [ ] Logs show no errors

---

## Rollback Procedures

### Quick Rollback (2 minutes)
```bash
npm run deploy:rollback
# Select option 1: Vercel Dashboard rollback
```

### Manual Rollback
1. Go to: https://vercel.com/unite-group/dr-new/deployments
2. Find last working deployment (● Ready status)
3. Click ⋯ > "Promote to Production"

### Emergency Rollback
If site is completely broken:
```bash
npm run deploy:rollback
# Select option 3: Emergency rollback (guided)
```

---

## Troubleshooting Guide

### Issue: Domain not accessible
**Check**:
```bash
nslookup disasterrecovery.com.au
```
**Fix**: Verify DNS records at registrar

---

### Issue: SSL certificate error
**Wait**: 5 minutes for auto-provisioning
**Check**: Vercel dashboard for SSL status
**Fix**: Contact Vercel support if not provisioning

---

### Issue: Site shows only HTML text (no styling/images)
**Diagnosis**:
```bash
npm run deploy:verify
```
**Common Causes**:
- JavaScript not loading
- Build failed to generate static assets
- Environment variables incorrect
- CSP headers blocking resources

**Fix**:
1. Check Vercel build logs
2. Verify environment variables
3. Test local build matches deployed
4. Check browser console for errors

---

### Issue: Forms not submitting
**Check**:
- API routes deployed
- Database connected
- Environment variables correct
- CORS configuration

---

### Issue: Environment variables not working
**Verify**:
- Set in "Production" environment (not Preview)
- No typos in variable names
- Values are correct
- Redeployed after setting variables

---

## Monitoring & Alerting

### Real-time Monitoring
```bash
# Production logs
vercel logs dr-new --prod --follow

# Check deployment status
vercel ls --scope unite-group

# Monitor errors
vercel logs dr-new --prod | grep -i error
```

### Recommended Monitoring Services
- **Uptime**: UptimeRobot, Pingdom
- **Errors**: Sentry, LogRocket
- **Performance**: Vercel Analytics, Google Analytics
- **Logs**: Vercel built-in logging

---

## Support Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Repo: https://github.com/CleanExpo/DR-New

### Dashboards
- Vercel Project: https://vercel.com/unite-group/dr-new
- Deployments: https://vercel.com/unite-group/dr-new/deployments
- Settings: https://vercel.com/unite-group/dr-new/settings

### Getting Help
- Vercel Support: support@vercel.com
- Vercel Status: https://www.vercel-status.com/
- Community: https://github.com/vercel/vercel/discussions

---

## File Locations

### Documentation
```
D:\DR New\DEPLOYMENT-README.md          # This file
D:\DR New\DEPLOYMENT-QUICKSTART.md      # Quick start guide
D:\DR New\DEPLOYMENT-PLAN.md            # Comprehensive guide
D:\DR New\DEPLOYMENT-CHECKLIST.md       # Detailed checklist
```

### Scripts
```
D:\DR New\scripts\prepare-production-deployment.js
D:\DR New\scripts\verify-deployment-rendering.js
D:\DR New\scripts\rollback-deployment.js
D:\DR New\scripts\deployment-monitor.js
D:\DR New\scripts\auto-deploy.js
```

### Configuration
```
D:\DR New\vercel.json                   # Vercel configuration
D:\DR New\next.config.mjs               # Next.js configuration
D:\DR New\.env.production               # Production env template
D:\DR New\package.json                  # NPM scripts
```

---

## Quick Command Reference

```bash
# Preparation
npm run deploy:prepare          # Prepare for deployment

# Deployment
git push origin main            # Auto-deploy (if GitHub integration)
vercel --prod                   # Manual deploy

# Verification
npm run deploy:verify          # Verify deployment rendering
curl -I https://disasterrecovery.com.au  # Quick health check

# Monitoring
npm run monitor                 # Check deployment health
vercel logs dr-new --prod       # View production logs

# Rollback
npm run deploy:rollback        # Interactive rollback

# Testing
npm run build                   # Test local build
npx lighthouse https://disasterrecovery.com.au  # Performance audit
```

---

## Next Steps

### If You Haven't Deployed Yet

1. **Start here**: Read `DEPLOYMENT-QUICKSTART.md`
2. **Run preparation**: `npm run deploy:prepare`
3. **Set environment variables** in Vercel Dashboard
4. **Follow deployment steps** in Quick Start guide
5. **Verify after deployment**: `npm run deploy:verify`

### If You've Already Deployed

1. **Verify rendering**: `npm run deploy:verify`
2. **Check functionality**: Test forms, pages, mobile
3. **Monitor logs**: `vercel logs dr-new --prod --follow`
4. **Set up monitoring**: Configure uptime monitoring
5. **Submit sitemap**: Google Search Console

### If Deployment Failed

1. **Check logs**: `vercel logs dr-new --prod`
2. **Run verification**: `npm run deploy:verify`
3. **Review errors**: Identify specific failure
4. **Rollback if needed**: `npm run deploy:rollback`
5. **Fix and redeploy**: Address issues and try again

---

## Important Notes

### About the Rendering Issue

The user reported: "Vercel preview shows rendering issues (just 1 image and html text)"

This suggests:
1. **JavaScript not executing** - Next.js hydration failing
2. **Static generation incomplete** - Pages not fully built
3. **Environment variables missing** - API calls failing
4. **CSP headers too strict** - Blocking resources

**To diagnose**, run:
```bash
npm run deploy:verify
```

This will check:
- HTML structure
- Next.js scripts presence
- React hydration
- Error indicators
- Resource loading

### About Production Readiness

Current status:
- ✓ Builds successfully (253 pages)
- ✓ Local builds work
- ⚠️ Environment variables need updating
- ⚠️ Domain not yet assigned
- ⚠️ Rendering issues on preview

**Before production deployment**:
1. Fix rendering issues on preview
2. Update environment variables
3. Assign and verify domain
4. Test thoroughly

---

## Version Information

- **Documentation Version**: 1.0
- **Last Updated**: 2025-11-05
- **Next.js Version**: 14.2.32
- **Node Version**: 22.x
- **Vercel Project**: dr-new
- **Production Domain**: disasterrecovery.com.au

---

## Contact & Escalation

For deployment issues:
1. Check this documentation
2. Review Vercel logs
3. Run diagnostic scripts
4. Contact Vercel support if platform issue

For critical production issues:
1. Run rollback: `npm run deploy:rollback`
2. Notify team
3. Review logs for root cause
4. Plan fix and redeployment

---

**Ready to deploy? Start with `DEPLOYMENT-QUICKSTART.md`**

For comprehensive coverage, see `DEPLOYMENT-PLAN.md`

For detailed checkpoints, use `DEPLOYMENT-CHECKLIST.md`

---

END OF DEPLOYMENT DOCUMENTATION INDEX
