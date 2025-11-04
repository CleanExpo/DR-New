# Production Deployment Quick Start Guide
## disasterrecovery.com.au

This is a condensed quick-start guide for deploying to production. For comprehensive details, see `DEPLOYMENT-PLAN.md` and `DEPLOYMENT-CHECKLIST.md`.

---

## Prerequisites (5 minutes)

Before starting, ensure you have:

- [ ] Vercel CLI installed: `npm i -g vercel`
- [ ] Git repository up to date
- [ ] Access to Vercel Dashboard (unite-group team)
- [ ] Access to domain registrar for DNS

---

## Quick Deployment Path (30 minutes)

### 1. Prepare Configuration (5 min)

```bash
# Run automated preparation script
npm run deploy:prepare
```

This will:
- Update vercel.json for production
- Check environment variables
- Provide deployment checklist

### 2. Set Environment Variables (10 min)

Go to: https://vercel.com/unite-group/dr-new/settings/environment-variables

Set for **Production** environment:

```bash
# Required
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>

# Stripe (LIVE keys)
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Database (if using)
DATABASE_URL=postgresql://...

# Email
EMAIL_FROM=noreply@disasterrecovery.com.au
SENDGRID_API_KEY=SG.xxxxx

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Maps
GOOGLE_MAPS_API_KEY=xxxxx
```

### 3. Assign Domain (5 min)

1. Go to: https://vercel.com/unite-group/dr-new/settings/domains
2. Click "Add"
3. Enter: `disasterrecovery.com.au`
4. Follow DNS verification steps
5. Wait for SSL certificate (1-2 minutes)

### 4. Deploy (5 min)

**Option A: Automatic** (Recommended)
```bash
# If configuration was updated
git add vercel.json package.json
git commit -m "fix: Prepare for production deployment"
git push origin main

# Vercel auto-deploys on push
```

**Option B: Manual**
```bash
vercel --prod
```

### 5. Verify Deployment (5 min)

```bash
# Automated verification
npm run deploy:verify

# Or manually check
curl -I https://disasterrecovery.com.au
```

Visit site: https://disasterrecovery.com.au

Check:
- [ ] Homepage loads completely
- [ ] All images display
- [ ] Forms work
- [ ] Mobile responsive
- [ ] No console errors

---

## If Something Goes Wrong

### Quick Rollback (2 minutes)

```bash
npm run deploy:rollback
```

Or manually:

1. Go to: https://vercel.com/unite-group/dr-new/deployments
2. Find last working deployment (● Ready)
3. Click ⋯ > "Promote to Production"

---

## Post-Deployment (15 minutes)

### Immediate Actions

1. **Monitor Logs**
   ```bash
   vercel logs dr-new --prod --follow
   ```

2. **Test Critical Flows**
   - Submit contact form
   - Test on mobile device
   - Check service area pages

3. **Verify Analytics**
   - Check Google Analytics real-time
   - Verify pageview tracking

### SEO Setup

1. **Google Search Console**
   - Add property: https://disasterrecovery.com.au
   - Submit sitemap: https://disasterrecovery.com.au/sitemap.xml
   - Request indexing for homepage

2. **Update Third-Party Services**
   - Stripe webhooks: https://disasterrecovery.com.au/api/stripe/webhook
   - Any other API callbacks

---

## Common Issues & Solutions

### Issue: Domain not resolving
**Solution**: Check DNS records at registrar
```bash
nslookup disasterrecovery.com.au
# Should show Vercel IP: 76.76.21.21
```

### Issue: SSL certificate error
**Solution**: Wait 5 minutes for provisioning, or contact Vercel support

### Issue: Site shows "just 1 image and HTML text"
**Solution**: This indicates JavaScript not loading
```bash
# Verify deployment rendering
npm run deploy:verify

# Check for:
# - Next.js scripts present
# - No build errors
# - Correct environment variables
```

### Issue: Environment variables not working
**Solution**: Ensure set for "Production" environment in Vercel, not "Preview"

### Issue: Forms not submitting
**Solution**: Check API routes are deployed and database connected

---

## Useful Commands

```bash
# Deployment
npm run deploy:prepare          # Prepare for deployment
npm run deploy:verify          # Verify site rendering
npm run deploy:rollback        # Interactive rollback

# Monitoring
vercel logs dr-new --prod      # View production logs
vercel ls --scope unite-group  # List deployments

# DNS/SSL
nslookup disasterrecovery.com.au                    # Check DNS
openssl s_client -connect disasterrecovery.com.au:443 # Check SSL

# Testing
curl -I https://disasterrecovery.com.au            # Quick health check
npx lighthouse https://disasterrecovery.com.au     # Performance audit
```

---

## Support & Resources

### Documentation
- **Full Guide**: `DEPLOYMENT-PLAN.md` (comprehensive 40-page guide)
- **Checklist**: `DEPLOYMENT-CHECKLIST.md` (detailed 30-step checklist)
- **This Guide**: `DEPLOYMENT-QUICKSTART.md` (you are here)

### Scripts
- `scripts/prepare-production-deployment.js` - Preparation automation
- `scripts/verify-deployment-rendering.js` - Post-deployment verification
- `scripts/rollback-deployment.js` - Rollback assistance
- `scripts/deployment-monitor.js` - Deployment monitoring

### Dashboards
- **Vercel**: https://vercel.com/unite-group/dr-new
- **GitHub**: https://github.com/CleanExpo/DR-New
- **Deployments**: https://vercel.com/unite-group/dr-new/deployments

### Getting Help
- Vercel Support: support@vercel.com
- Vercel Status: https://www.vercel-status.com/
- Vercel Docs: https://vercel.com/docs

---

## Pre-Flight Checklist

Before deploying, confirm:

- [ ] All tests passing locally
- [ ] Local build succeeds: `npm run build`
- [ ] Environment variables set in Vercel
- [ ] Domain DNS configured
- [ ] Backup plan ready
- [ ] Team notified of deployment
- [ ] Monitoring/alerting configured

## Success Criteria

Deployment is successful when:

- [ ] Site accessible at https://disasterrecovery.com.au
- [ ] SSL certificate valid (green padlock)
- [ ] All 253 pages loading
- [ ] Forms submitting successfully
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Analytics tracking
- [ ] Mobile responsive

---

## Timeline

| Phase | Duration | Critical |
|-------|----------|----------|
| Preparation | 5 min | Yes |
| Environment Setup | 10 min | Yes |
| Domain Assignment | 5 min | Yes |
| Deployment | 5 min | Yes |
| Verification | 5 min | Yes |
| **Total** | **30 min** | - |
| Post-Deployment | 15 min | Recommended |
| Monitoring (24h) | Ongoing | Recommended |

---

## What to Expect

### During Deployment
- Vercel will build 253 static pages
- Build time: ~5 minutes
- SSL provisioning: 1-2 minutes
- DNS propagation: 0-60 minutes (usually instant)

### After Deployment
- Monitor logs for first hour
- Check error rates
- Verify all functionality
- Track analytics

### First 24 Hours
- Watch for any error spikes
- Monitor performance metrics
- Check form submissions
- Review user feedback

---

## Emergency Contacts

### Critical Issue?
1. Run rollback: `npm run deploy:rollback`
2. Check Vercel status: https://www.vercel-status.com/
3. Review logs: `vercel logs dr-new --prod`
4. Contact Vercel support if platform issue

### Need Help?
- Review full documentation in `DEPLOYMENT-PLAN.md`
- Check rollback procedures
- Consult Vercel documentation
- Contact Vercel support for platform issues

---

## Next Steps After Successful Deployment

1. **Week 1**
   - Submit sitemap to Google Search Console
   - Monitor search indexing
   - Track conversion rates
   - Review performance metrics

2. **Week 2**
   - Analyze SEO performance
   - Optimize based on real data
   - Review and adjust caching
   - Plan content updates

3. **Month 1**
   - Full performance review
   - Security audit
   - User feedback analysis
   - Optimization roadmap

---

**Last Updated**: 2025-11-05
**Version**: 1.0
**For**: Production deployment to disasterrecovery.com.au

---

## Quick Command Reference

```bash
# Complete deployment workflow
npm run deploy:prepare           # 1. Prepare
# Set env vars in Vercel Dashboard  # 2. Configure
# Assign domain in Vercel           # 3. Domain
git push origin main              # 4. Deploy
npm run deploy:verify            # 5. Verify

# Rollback if needed
npm run deploy:rollback          # Emergency rollback

# Monitor
vercel logs dr-new --prod --follow
```

---

END OF QUICK START GUIDE

For comprehensive information, please refer to:
- `DEPLOYMENT-PLAN.md` - Full deployment guide with all details
- `DEPLOYMENT-CHECKLIST.md` - Step-by-step checklist with 30+ items
