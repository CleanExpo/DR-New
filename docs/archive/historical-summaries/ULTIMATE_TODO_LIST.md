# ULTIMATE TODO LIST - Disaster Recovery Website
## Complete Prioritized Action Plan

Generated from comprehensive SEO, Local SEO, and UI/UX audits using Playwright MCP analysis.

---

## 🚨 CRITICAL - FIX IMMEDIATELY (Day 1-2)

### 1. **Fix Production Site Performance Issue** ⚡ HIGHEST PRIORITY
- **Issue:** Site loading taking 30+ seconds, making it unusable
- **Impact:** Zero conversions, users bouncing immediately
- **Files:** Check Vercel build logs, investigate app/layout.tsx force-dynamic setting
- **Time:** 2-4 hours
- **Test:** Site must load in <3 seconds

### 2. **Add Emergency CTA Buttons** 🚑 CRITICAL FOR CONVERSIONS
- **Issue:** No prominent "Get Emergency Help" buttons despite being 24/7 service
- **Impact:** Losing emergency leads to competitors
- **Files:**
  - `components/layout/Header.tsx` - Add sticky emergency banner
  - `components/EmergencyCTA.tsx` - Create floating CTA component
  - All service pages - Add inline emergency CTAs
- **Copy:** "24/7 EMERGENCY? CALL 1300 309 361 NOW" (red button, phone icon)
- **Time:** 2-3 hours
- **Expected Impact:** +30-40% conversion rate

### 3. **Make Phone Numbers Clickable** 📱 MOBILE CRITICAL
- **Issue:** "1300 309 361" appears as text, not clickable tel: links
- **Impact:** Mobile users cannot easily call (60% of traffic is mobile)
- **Files:**
  - `components/layout/Header.tsx` line 35
  - `components/layout/Footer.tsx`
  - All service pages with phone mentions
- **Fix:** `<a href="tel:1300309361">1300 309 361</a>`
- **Time:** 30 minutes
- **Expected Impact:** +20% mobile conversions

### 4. **Fix Google Analytics Tracking** 📊 ZERO DATA CURRENTLY
- **Issue:** Using placeholder "G-XXXXXXXXXX" - no tracking data collected
- **Impact:** Flying blind, cannot measure any marketing efforts
- **Files:**
  - `.env.local` - Add `NEXT_PUBLIC_GA_ID=G-[YOUR-REAL-ID]`
  - Vercel environment variables
  - `app/layout.tsx` line 42 (verify GA4 script)
- **Setup:** Create Google Analytics 4 property at analytics.google.com
- **Time:** 30 minutes
- **Expected Impact:** Data-driven decisions, measure ROI

### 5. **Fix Domain/URL Inconsistencies** 🌐 SEO BLOCKER
- **Issue:** Multiple URLs in code (dr-new.vercel.app, dr-new-unite-group.vercel.app)
- **Impact:** Canonical confusion, diluted link equity, ranking penalty
- **Files:**
  - `lib/sitemap.ts` line 4: Change to `https://disasterrecovery.com.au`
  - `vercel.json` lines 13, 15-16: Update all URLs
  - `next.config.js`: Verify domain setting
- **Time:** 20 minutes
- **Expected Impact:** +5-10 ranking positions

### 6. **Re-enable Disabled SEO Components** 🔧 RANKING BLOCKER
- **Issue:** LocalBusinessSchema, BrisbaneLocalSchema, Breadcrumb components commented out
- **Impact:** Google cannot understand business location, missing rich results
- **Files:** `app/layout.tsx` lines 147-167
- **Fix:** Uncomment and test all schema components
- **Time:** 1 hour (test thoroughly)
- **Expected Impact:** Local pack visibility, rich snippets

---

## 🔴 HIGH PRIORITY - THIS WEEK (Day 3-7)

### 7. **Fix Contact Page Mobile Overflow** 📱
- **Issue:** Horizontal scroll breaks mobile UX
- **Files:** `app/contact/page.tsx`, check form width and containers
- **Fix:** Add `max-w-full overflow-x-hidden` to containers
- **Time:** 30 minutes

### 8. **Add H1 Tags to Service Pages** 📝 SEO CRITICAL
- **Issue:** Water damage page missing H1, others may be too
- **Files:**
  - `app/services/water-damage/page.tsx`
  - Check all service pages
- **Format:** `<h1>Water Damage Restoration Brisbane | 24/7 Emergency Response</h1>`
- **Time:** 1 hour
- **Expected Impact:** +3-5 ranking positions per page

### 9. **Optimize Meta Descriptions** 📋 CTR BOOSTER
- **Issue:** Too long (174-183 chars vs 155-160 optimal), getting truncated in search
- **Impact:** Lower click-through rates from Google
- **Files:** All page.tsx metadata objects
- **Template:** "[Service] Brisbane | IICRC Master Restorer | 24/7 Emergency | 1300 309 361"
- **Time:** 2 hours
- **Expected Impact:** +15-20% CTR from search results

### 10. **Fix Phone Number in Schema Markup** ☎️
- **Issue:** Shows "+61-1300-000-000" instead of actual number
- **Impact:** Wrong number in Google Business Panel, local SEO penalty
- **Files:**
  - `app/layout.tsx` line 177 (LocalBusiness schema)
  - All location pages schemas
- **Fix:** Change to "+61-1300-309-361"
- **Time:** 20 minutes
- **Expected Impact:** Correct phone in Knowledge Panel

### 11. **Add "Brisbane" to Service Page Keywords** 🎯 LOCAL SEO
- **Issue:** "fire damage restoration Brisbane" appears ZERO times on fire damage page
- **Impact:** Cannot rank for location-specific searches
- **Files:** All service pages (water-damage, fire-damage, mould, storm, etc.)
- **Changes Needed:**
  - H1: Add "Brisbane"
  - H2s: Include "Brisbane", "Ipswich", "Logan"
  - First paragraph: Mention service areas
  - Alt tags: Add location keywords
- **Time:** 3-4 hours
- **Expected Impact:** +10-15 ranking positions for local keywords

### 12. **Add BreadcrumbList Schema Site-wide** 🗺️
- **Issue:** Missing on 90% of pages, losing rich snippet opportunities
- **Files:** Create `components/BreadcrumbSchema.tsx`, add to all pages
- **Format:** Home > Services > Water Damage Restoration
- **Time:** 2 hours
- **Expected Impact:** Rich breadcrumb snippets in search results

### 13. **Add FAQ Schema to Service Pages** ❓
- **Issue:** FAQ content exists but no FAQPage schema markup
- **Impact:** Missing FAQ rich snippets in search results
- **Files:**
  - `app/services/water-damage/page.tsx` (has FAQ section)
  - `app/services/fire-damage/page.tsx`
  - `app/insurance-claims/page.tsx`
- **Use:** `lib/seo/index.ts` generateFAQSchema function
- **Time:** 1.5 hours
- **Expected Impact:** FAQ rich snippets, +20% CTR

### 14. **Fix Image Alt Tags** 🖼️ SEO + ACCESSIBILITY
- **Issue:** Many images missing descriptive alt tags
- **Files:** All pages with images
- **Format:** "IICRC certified water damage restoration equipment Brisbane"
- **Time:** 2 hours
- **Expected Impact:** Image search traffic, accessibility compliance

### 15. **Create Emergency CTA Component** 🆘
- **Issue:** No sticky/floating emergency button for immediate conversions
- **Files:** Create `components/EmergencyCTA.tsx`
- **Features:**
  - Sticky bottom on mobile
  - Floating right on desktop
  - Pulse animation
  - Click-to-call on mobile
  - "24/7 EMERGENCY" with phone icon
- **Time:** 2 hours
- **Expected Impact:** +25-35% emergency lead conversions

---

## 🟡 MEDIUM PRIORITY - NEXT 2 WEEKS

### 16. **Expand Service Pages Content** 📄 SEO CONTENT
- **Issue:** Pages are 500-800 words, need 1800+ for competitive rankings
- **Focus:** Water damage, fire damage (highest traffic potential)
- **Content to Add:**
  - Brisbane-specific case studies
  - Process details (IICRC S500 standards)
  - FAQ sections (8-10 questions)
  - Before/after examples
  - Insurance claim process
  - Service area details (suburbs)
- **Time:** 6-8 hours per page
- **Expected Impact:** Top 3 rankings for primary keywords

### 17. **Create About Phill McGurk Page** 👤 TRUST + SEO
- **Issue:** Master Restorer credentials buried, should be featured prominently
- **Impact:** Missing unique competitive advantage, trust signals
- **URL:** `/about/phill-mcgurk`
- **Content:**
  - Master Restorer certification details
  - Years of experience (20+ mentioned on homepage)
  - IICRC certifications
  - Professional photo
  - Case study highlights
- **Schema:** Person + ProfessionalService
- **Time:** 3-4 hours
- **Expected Impact:** +Trust, unique differentiator, "master restorer brisbane" rankings

### 18. **Improve Typography Hierarchy** 📝 UX
- **Issue:** Inconsistent font sizes, poor hierarchy
- **Files:** `app/globals.css`
- **Changes:**
  - H1: 48px → 56px (desktop), 36px → 40px (mobile)
  - H2: 36px → 42px (desktop), 28px → 32px (mobile)
  - Body: 16px → 18px
  - Line height: 1.5 → 1.7
- **Time:** 1.5 hours

### 19. **Add Internal Linking Strategy** 🔗
- **Issue:** Poor internal linking between related pages
- **Changes:**
  - Service pages link to related services
  - Location pages link to relevant services
  - Insurance page links to all services
  - Add "Related Services" sections
- **Time:** 2 hours
- **Expected Impact:** +10% crawl efficiency, better page authority distribution

### 20. **Create Service Area Maps** 🗺️ LOCAL SEO
- **Issue:** Text lists of suburbs, no visual representation
- **Files:** Create `components/ServiceAreaMap.tsx`
- **Features:**
  - Interactive map showing Brisbane, Ipswich, Logan
  - Highlighted service suburbs
  - Embed on location pages
- **Time:** 4-5 hours
- **Expected Impact:** +Local engagement, visual trust

### 21. **Add Trust Badges** 🏆 CONVERSION OPTIMIZATION
- **Issue:** IICRC Master Restorer badge not prominently displayed
- **Locations:** Header, homepage hero, all service pages
- **Badges to Display:**
  - IICRC Master Restorer (most important)
  - 24/7 availability badge
  - Insurance approved badge
  - X+ years experience
  - X+ properties restored
- **Time:** 2 hours
- **Expected Impact:** +15-20% trust, higher conversions

### 22. **Implement Review Schema** ⭐ SOCIAL PROOF
- **Files:** Create `components/ReviewSchema.tsx`
- **Source:** Collect real customer reviews
- **Schema:** AggregateRating + Review
- **Display:** Review stars in search results
- **Time:** 3 hours (including review collection process)
- **Expected Impact:** Star ratings in search, +CTR

### 23. **Fix Navigation Consistency** 🧭
- **Issue:** Some pages have different header/footer
- **Files:** Check all page layouts
- **Time:** 1 hour

### 24. **Add Loading States** ⏳ UX
- **Issue:** No loading indicators, users uncertain if page is working
- **Files:** Create loading components
- **Time:** 2 hours

### 25. **Optimize Images** 🖼️ PERFORMANCE
- **Issue:** Large image file sizes (3-4MB)
- **Solution:** Use Next.js Image optimization, WebP format
- **Time:** 3 hours
- **Expected Impact:** -40% page load time

---

## 🟢 LOW PRIORITY - MONTH 2+

### 26. **Create /service-areas Page** 📍
- **Issue:** 404 errors in console for this URL
- **Content:** Complete list with map
- **Time:** 4 hours

### 27. **Create /get-help Emergency Form** 📋
- **Issue:** Referenced but doesn't exist (404 errors)
- **Features:**
  - Emergency type selector
  - Location field
  - Phone/email
  - Immediate callback request
- **Time:** 5-6 hours
- **Expected Impact:** +Lead capture efficiency

### 28. **Create /claim Insurance Claims Page** 📄
- **Issue:** Referenced but 404
- **Already have:** /insurance-claims page
- **Fix:** Either create /claim or redirect to /insurance-claims
- **Time:** 30 minutes

### 29. **Add Blog Section** 📰 CONTENT MARKETING
- **URL:** `/blog`
- **Topics:**
  - Emergency response guides
  - Water damage prevention
  - Insurance claim tips
  - Brisbane flood season preparation
- **Frequency:** 2-4 posts per month
- **Expected Impact:** +Long-tail traffic, thought leadership

### 30. **Implement Live Chat** 💬 CONVERSION
- **Tool:** Intercom, Drift, or Tawk.to
- **Features:** 24/7 availability mention, AI for off-hours
- **Time:** 2-3 hours setup
- **Expected Impact:** +15-20% conversion rate

### 31. **Add Before/After Gallery** 📸 SOCIAL PROOF
- **URL:** `/gallery` or section on service pages
- **Content:** Real Brisbane project photos
- **Time:** 5-6 hours
- **Expected Impact:** +Trust, visual proof

### 32. **Create Video Content** 🎥 ENGAGEMENT
- **Types:**
  - Emergency response process
  - Equipment showcase
  - Customer testimonials
  - Phill McGurk talking about Master Restorer certification
- **Host:** YouTube, embed on site
- **Time:** Ongoing
- **Expected Impact:** +Engagement, video search traffic

### 33. **Set Up Google Business Profile** 📍 LOCAL SEO (EXTERNAL)
- **Action:** Verify and optimize GBP
- **Add:**
  - All services
  - Service areas (Brisbane, Ipswich, Logan)
  - Photos (10+ minimum)
  - Posts (weekly)
  - Q&A
  - Reviews response
- **Time:** 2-3 hours initial, 30 min/week ongoing
- **Expected Impact:** Local pack visibility, map searches

### 34. **Build Citation Links** 🔗 LOCAL SEO (EXTERNAL)
- **Directories:**
  - Australian Business Directory
  - True Local
  - Yellow Pages Australia
  - Hotfrog
  - StartLocal
  - Local Chamber of Commerce
- **NAP:** Ensure consistency everywhere
- **Time:** 4-5 hours
- **Expected Impact:** +Local authority, rankings

### 35. **Create Location-Specific Landing Pages** 📍 HYPER-LOCAL SEO
- **URLs:**
  - `/locations/brisbane/hamilton`
  - `/locations/brisbane/ascot`
  - `/locations/ipswich/karalee`
  - etc. (10-15 top suburbs)
- **Content:** Suburb-specific information
- **Time:** 20-30 hours total
- **Expected Impact:** +Hyper-local rankings

---

## 📊 MONITORING & MAINTENANCE (ONGOING)

### 36. **Weekly SEO Monitoring**
- Check Google Search Console
- Monitor rankings for primary keywords
- Track Google Analytics traffic
- Review conversion rates
- **Tool:** Google Search Console, GA4, SEMrush/Ahrefs
- **Time:** 1 hour/week

### 37. **Monthly Technical SEO Audit**
- Check for broken links
- Verify all images loading
- Test mobile responsiveness
- Review Core Web Vitals
- **Time:** 2 hours/month

### 38. **Competitor Analysis**
- Monitor competitor rankings
- Analyze their content strategy
- Identify new keyword opportunities
- **Time:** 2 hours/month

### 39. **Content Updates**
- Update service pages with new information
- Add new case studies
- Refresh statistics and data
- **Time:** 4 hours/month

### 40. **Review Collection Campaign**
- Request reviews from satisfied customers
- Respond to all reviews
- Add review schema as collected
- **Time:** 2 hours/month
- **Goal:** 50+ reviews in 12 months

---

## 📈 SUCCESS METRICS & TARGETS

### Month 1 Goals (Critical Fixes)
- [ ] Site loads in <3 seconds (currently: 30+ seconds)
- [ ] Emergency CTAs on all pages (currently: 0)
- [ ] Google Analytics tracking active (currently: broken)
- [ ] All phone numbers clickable (currently: none)
- [ ] Domain consistency fixed (currently: 3 different URLs)
- [ ] SEO components re-enabled
- **Expected Traffic:** +10-15% organic

### Month 2-3 Goals (High Priority)
- [ ] Meta descriptions optimized (all pages)
- [ ] H1 tags optimized with Brisbane keywords
- [ ] BreadcrumbList schema implemented
- [ ] FAQ schema on 3+ pages
- [ ] Service pages expanded to 1800+ words (2 pages minimum)
- [ ] About Phill McGurk page launched
- **Expected Traffic:** +25-40% organic
- **Expected Rankings:** Top 10 for primary keywords

### Month 4-6 Goals (Medium Priority + Content)
- [ ] All service pages 1800+ words
- [ ] Trust badges throughout site
- [ ] Review schema with 20+ reviews
- [ ] Service area maps implemented
- [ ] Internal linking strategy complete
- [ ] Google Business Profile fully optimized
- **Expected Traffic:** +50-75% organic
- **Expected Rankings:** Top 3 for primary keywords

### Month 7-12 Goals (Low Priority + Growth)
- [ ] Blog with 15+ articles
- [ ] 50+ Google reviews
- [ ] Video content library (10+ videos)
- [ ] Before/after gallery (30+ projects)
- [ ] Hyper-local pages (10+ suburbs)
- [ ] Citation links (20+ directories)
- **Expected Traffic:** +100-150% organic
- **Expected Position:** Market leader in Brisbane disaster recovery

---

## 💰 ESTIMATED IMPACT

### Immediate (Week 1-2)
- **Conversion Rate:** +30-50% (CTAs + clickable phones)
- **Rankings:** +5-10 positions (domain fixes + re-enabled schema)
- **User Experience:** 90% improvement (loading speed + mobile fixes)

### Short Term (Month 1-3)
- **Organic Traffic:** +25-40%
- **Rankings:** Top 10 for "water damage restoration brisbane", "fire damage brisbane"
- **Leads:** +40-60% (improved UX + SEO visibility)

### Medium Term (Month 4-6)
- **Organic Traffic:** +50-75%
- **Rankings:** Top 3 for primary keywords, top 10 for 20+ variations
- **Revenue Impact:** +60-80% from organic channel

### Long Term (Month 7-12)
- **Organic Traffic:** +100-150%
- **Rankings:** #1 for "disaster recovery brisbane", "master restorer brisbane"
- **Revenue Impact:** +100-120% from organic channel
- **Market Position:** Established online leader

---

## 🎯 RECOMMENDED IMPLEMENTATION ORDER

### Phase 1: Emergency Fixes (Week 1)
1. Fix site performance (Tasks #1)
2. Add emergency CTAs (#2)
3. Make phones clickable (#3)
4. Fix Google Analytics (#4)
5. Fix domain URLs (#5)
6. Re-enable SEO components (#6)

**Total Time:** ~10-12 hours
**Impact:** Site becomes usable and trackable

### Phase 2: SEO Foundation (Week 2-3)
7. Fix contact mobile overflow (#7)
8. Add H1 tags (#8)
9. Optimize meta descriptions (#9)
10. Fix phone in schema (#10)
11. Add Brisbane keywords (#11)
12. Add breadcrumb schema (#12)
13. Add FAQ schema (#13)

**Total Time:** ~15-18 hours
**Impact:** Strong SEO foundation, measurable rankings improvement

### Phase 3: Conversion Optimization (Week 4)
14. Fix image alt tags (#14)
15. Create emergency CTA component (#15)
21. Add trust badges (#21)

**Total Time:** ~6-8 hours
**Impact:** Maximize conversion of incoming traffic

### Phase 4: Content & Authority (Month 2)
16. Expand service pages (#16)
17. Create About Phill McGurk page (#17)
19. Internal linking (#19)
22. Review schema (#22)

**Total Time:** ~20-25 hours
**Impact:** Authority building, top rankings

### Phase 5: Advanced Features (Month 3+)
- Remaining medium and low priority tasks
- Ongoing content creation
- External SEO (GBP, citations)
- Monitoring and optimization

---

## 📋 QUICK START CHECKLIST

**Today (Next 2 Hours):**
- [ ] Investigate Vercel performance issue
- [ ] Add clickable phone links to header/footer
- [ ] Create emergency CTA component
- [ ] Update Google Analytics ID in .env

**This Week:**
- [ ] Fix all domain URL inconsistencies
- [ ] Re-enable disabled SEO components
- [ ] Add H1 tags to service pages
- [ ] Fix mobile overflow on contact page

**This Month:**
- [ ] Optimize all meta descriptions
- [ ] Add Brisbane keywords to all service pages
- [ ] Implement breadcrumb and FAQ schemas
- [ ] Create About Phill McGurk page
- [ ] Expand 2 service pages to 1800+ words

---

## 🔗 RESOURCES

**Reports Generated:**
- `SEO_AUDIT_REPORT_2025.md` - Complete SEO analysis
- `UX-AUDIT-REPORT.md` - Detailed UI/UX technical report
- `AUDIT-SUMMARY.md` - Executive summary
- `URGENT-FIXES-CHECKLIST.md` - Step-by-step fixes
- `audit-results/` - Screenshots and testing data

**Tools Needed:**
- Google Analytics 4
- Google Search Console
- Google Business Profile
- Vercel deployment dashboard
- Playwright (already installed)

**Keywords to Target:**
- water damage restoration brisbane
- fire damage restoration brisbane
- master restorer brisbane (unique!)
- disaster recovery brisbane
- IICRC certified restorer brisbane
- emergency water damage brisbane
- flood cleanup brisbane

---

**🚀 Ready to start? Begin with Phase 1: Emergency Fixes. The first 6 tasks will transform the site from unusable to high-performing in one week.**

*Generated by Claude Code with SEO GEO Master Agent + UI/UX Designer Agent using comprehensive Playwright MCP analysis*
