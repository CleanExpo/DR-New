# 🚀 Live Website Deployment Guide - disasterrecovery.com.au

## ✅ Pre-Deployment Checklist

### Completed Preparations:
- [x] 125+ optimized pages generated
- [x] Production sitemap.xml created
- [x] Production robots.txt configured
- [x] Environment variables set for production
- [x] All URLs updated to disasterrecovery.com.au
- [x] Schema markup implemented on all pages
- [x] GMB integration prepared

## 📋 Deployment Steps

### Step 1: Build for Production
```bash
npm run build
```
This will create an optimized production build with all pages.

### Step 2: Test Production Build Locally
```bash
npm run start
```
Visit http://localhost:3000 to verify everything works.

### Step 3: Deploy to Your Hosting

#### Option A: Vercel Deployment (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_APP_URL` = `https://www.disasterrecovery.com.au`
   - Add all variables from `.env.production`
3. Configure custom domain in Vercel:
   - Add domain: disasterrecovery.com.au
   - Update DNS records as instructed

#### Option B: Traditional Hosting
1. Upload the `.next` folder to your server
2. Upload `public` folder contents
3. Configure nginx/Apache for Next.js
4. Set up SSL certificate
5. Configure environment variables on server

#### Option C: Netlify Deployment
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add custom domain

## 🌐 DNS Configuration

### Required DNS Records:
```
Type    Name    Value                   TTL
A       @       [Your server IP]        3600
CNAME   www     disasterrecovery.com.au 3600
```

### For Vercel:
```
Type    Name    Value               TTL
A       @       76.76.21.21         3600
CNAME   www     cname.vercel-dns.com 3600
```

## 📊 New Site Structure (125+ Pages)

### Core Pages (6)
- `/` - Homepage
- `/about` - About Us
- `/about` - Master Restorer Profile
- `/contact` - Contact Page
- `/services` - Services Overview
- `/emergency` - Emergency Services

### Service Pages (8)
- `/services/water-damage`
- `/services/fire-damage`
- `/services/mould-remediation`
- `/services/storm-damage`
- `/services/biohazard`
- `/services/commercial`
- `/services/sewage-cleanup`
- `/services/trauma-cleaning`

### Location Hub Pages (3)
- `/locations/brisbane`
- `/locations/ipswich`
- `/locations/logan`

### Brisbane Suburb Pages (15 + 25 service combinations)
Premium suburbs with 5 service pages each:
- Hamilton (+ 5 service pages)
- Ascot (+ 5 service pages)
- New Farm (+ 5 service pages)
- Bulimba (+ 5 service pages)
- Hawthorne (+ 5 service pages)

Standard suburb pages:
- Morningside, Balmoral, Cannon Hill, Murarrie, Tingalpa
- Wynnum, Carina, Camp Hill, Seven Hills, Norman Park

### Ipswich Suburb Pages (13 + 20 service combinations)
Premium suburbs with 5 service pages each:
- Karalee (+ 5 service pages)
- Brookwater (+ 5 service pages)
- Springfield Lakes (+ 5 service pages)
- Augustine Heights (+ 5 service pages)

Standard suburb pages:
- Bellbird Park, Redbank Plains, Goodna, Camira
- Booval, Bundamba, Raceview, Forest Lake, Springfield

### Logan Suburb Pages (13 + 20 service combinations)
Key suburbs with 5 service pages each:
- Springwood (+ 5 service pages)
- Shailer Park (+ 5 service pages)
- Daisy Hill (+ 5 service pages)
- Rochedale (+ 5 service pages)

Standard suburb pages:
- Underwood, Eight Mile Plains, Slacks Creek, Meadowbrook
- Loganholme, Tanah Merah, Waterford, Beenleigh, Eagleby

## 🎯 Post-Deployment Tasks

### Immediate (Day 1):
1. **Submit Sitemap to Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add property: www.disasterrecovery.com.au
   - Submit: https://www.disasterrecovery.com.au/sitemap.xml

2. **Submit to Bing Webmaster Tools**
   - Go to: https://www.bing.com/webmasters
   - Add site and verify
   - Submit sitemap

3. **Test Critical Pages**
   - Homepage loads correctly
   - All service pages accessible
   - Location pages working
   - Contact form functional
   - Mobile responsive check

4. **Verify Schema Markup**
   - Test with: https://search.google.com/test/rich-results
   - Check LocalBusiness schema
   - Verify FAQ schema
   - Confirm BreadcrumbList

### Week 1:
- [ ] Monitor Google Search Console for indexing
- [ ] Check for crawl errors
- [ ] Submit URL inspection for priority pages
- [ ] Update GMB website link
- [ ] Create GMB posts announcing new pages
- [ ] Begin local citation building

### Week 2:
- [ ] Monitor keyword rankings
- [ ] Check page load speeds
- [ ] Review analytics data
- [ ] Create first blog post
- [ ] Request customer reviews

## 🔍 Verification Checklist

### Technical:
- [ ] SSL certificate active
- [ ] All pages return 200 status
- [ ] Sitemap accessible at /sitemap.xml
- [ ] Robots.txt accessible at /robots.txt
- [ ] No broken links
- [ ] Images loading correctly
- [ ] Forms submitting properly

### SEO:
- [ ] Title tags unique on all pages
- [ ] Meta descriptions present
- [ ] H1 tags on all pages
- [ ] Alt text on images
- [ ] Internal linking working
- [ ] Canonical URLs set correctly

### Content:
- [ ] Phill McGurk name spelled correctly
- [ ] Master Restorer claim accurate
- [ ] No placeholder content
- [ ] Contact information correct
- [ ] Service areas accurate

## 📈 Expected Results Timeline

### Week 1-2:
- Google begins indexing new pages
- Initial visibility in local searches

### Week 3-4:
- 50%+ pages indexed
- Long-tail keyword rankings appear
- GMB impressions increase

### Month 2:
- 80%+ pages indexed
- Primary keywords entering top 20
- Local pack visibility improves

### Month 3:
- Full indexation complete
- Top 10 rankings for suburb keywords
- Significant traffic increase
- Lead generation improvement

## 🚨 Important Notes

1. **DO NOT** delete old pages immediately - set up 301 redirects
2. **MONITOR** 404 errors in Search Console
3. **MAINTAIN** consistent NAP (Name, Address, Phone)
4. **UPDATE** all existing backlinks if URLs change
5. **TRACK** keyword rankings weekly

## 💡 Quick Commands

### Build and test:
```bash
npm run build && npm run start
```

### Deploy to Vercel:
```bash
vercel --prod
```

### Check for broken links:
```bash
npx broken-link-checker https://www.disasterrecovery.com.au
```

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Production URL**: https://www.disasterrecovery.com.au
**Total Pages**: 125+
**Target Market**: Brisbane, Ipswich, Logan

*Remember: After deployment, submit the new sitemap immediately to Google Search Console!*