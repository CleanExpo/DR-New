# REMEDIATION GUIDE - PRODUCTION DEPLOYMENT FAILURES

## ISSUE SUMMARY

Production site has 95 percent page failure rate. Local build generated 305 pages but only 14 are accessible.

Build marked FAILED despite generating pages:
- Error: <Html> should not be imported outside of pages/_document.
- SEMrush API test error: TypeError: i.isConfigured is not a function
- Export encountered errors on paths: /_error: /404, /_error: /500

---

## STEP 1: FIX BUILD ERRORS (Priority 1 - BLOCKING)

### Error 1: HTML Component Import
Search for incorrect Html imports in app directory.

Fix: Only app/layout.tsx should use Html. Remove from all other files.

### Error 2: SEMrush API isConfigured
Location: app/api/semrush/test/route.js

Fix Options:
- Fix the route initialization
- Or disable the route (it's a test route)

### Error 3: Error Pages Not Compiling
Check app/error.tsx and app/not-found.tsx - must NOT import Html component.

---

## STEP 2: FIX MISSING LOCATION PAGES

Missing pages (all return 404):
- /locations/brisbane
- /locations/ipswich
- /locations/logan
- /locations/gold-coast
- /locations/sunshine-coast
- /locations/toowoomba

Solution:
1. Create app/locations/[location]/page.tsx
2. Add generateStaticParams for all locations
3. Implement page component to render location content

---

## STEP 3: FIX MISSING BUSINESS PAGES

Create these files:
- app/insurance-claims/page.tsx
- app/commercial/page.tsx
- app/residential/page.tsx

Add minimal content to each file.

---

## STEP 4: VERIFY BUILD SUCCEEDS

Commands:
rm -rf .next/ .vercel/
npm run build

Should see: Generating static pages (305/305)
Should NOT see: Build failed

---

## STEP 5: TEST LOCALLY

Start server: npm run start

Test these URLs:
- http://localhost:3000/
- http://localhost:3000/locations/brisbane
- http://localhost:3000/insurance-claims
- http://localhost:3000/commercial
- http://localhost:3000/residential

All should return 200.

---

## STEP 6: DEPLOY

Commands:
git add .
git commit -m "fix: Resolve build errors and missing pages"
git push origin main

---

## STEP 7: VERIFY PRODUCTION

After Vercel deployment completes, test production URLs.
All should return 200.

---

## ESTIMATED TIME: 1.5-2 hours

Critical issues to fix:
1. Build errors (HTML component, SEMrush API)
2. Missing location pages
3. Missing business critical pages
4. Deploy and verify all pages accessible

---

## VERIFICATION CHECKLIST

Before considering resolved:
- Local build completes without errors
- All 305 pages generated
- npm run start works
- /locations/brisbane returns 200 locally
- /insurance-claims returns 200 locally
- Vercel deployment shows Build Successful
- Production URLs all return 200
- Sitemap URLs are accessible
