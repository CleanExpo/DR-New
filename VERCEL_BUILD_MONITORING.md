# Vercel Build Error Monitoring Process

## 🎯 Deployment URLs to Monitor

### Primary Deployment URL
- **Correct Disaster Recovery Site**: `https://dr-kv13xi3us-unite-group.vercel.app`
- **Incorrect Medical Site**: `https://dr-new.vercel.app` (shows Dr PathCares - wrong repository)

## 🔧 Development Process with Build Error Monitoring

### 1. Pre-Commit Checks
```bash
# Always run these commands before committing
cd "D:\DR New"

# Check for build errors locally
npm run build

# Run type checking
npm run lint

# Test readability compliance
node scripts/simple-readability-test.js
```

### 2. Post-Commit Verification Process
```bash
# After pushing to GitHub, monitor Vercel deployment
# Use Playwright MCP to test the deployment

# 1. Check the correct Vercel URL
playwright.navigate("https://dr-kv13xi3us-unite-group.vercel.app")

# 2. Look for these specific error patterns:
# - React hydration errors (#418, #423)
# - 404 resources (missing images, API endpoints)
# - Build timeout issues
# - Schema markup errors
# - Client-side provider mismatches
```

### 3. Playwright MCP Build Error Detection Script

Use this process whenever making significant changes:

```javascript
// Playwright MCP monitoring commands for build errors
await page.goto('https://dr-kv13xi3us-unite-group.vercel.app');

// Check for console errors
const errors = await page.evaluate(() => {
  return {
    jsErrors: window.__jsErrors || [],
    consoleErrors: window.__consoleErrors || [],
    hydrationErrors: window.__hydrationErrors || []
  };
});

// Look for specific error patterns:
// - "Minified React error #418" (hydration mismatch)
// - "Minified React error #423" (text content mismatch)
// - "Failed to load resource" (404 errors)
// - "TypeError: Failed to fetch" (API errors)
```

### 4. Common Build Issues to Watch For

#### ❌ React Hydration Errors
- **Error #418**: Server/client content mismatch
- **Error #423**: Text content differs between server and client
- **Solution**: Check ClientProviders component wrapping

#### ❌ Missing Resources (404s)
- Images not found
- API endpoints failing
- CSS/JS assets missing
- **Solution**: Verify public/ folder structure

#### ❌ Provider Issues
- MasterIntegrationProvider initialization errors
- PersonalizationProvider state mismatches
- ChatProvider client-side only code
- **Solution**: Ensure all providers are in ClientProviders component

#### ❌ Schema Markup Errors
- LocalBusinessSchema rendering issues
- EmergencyServiceSchema validation
- **Solution**: Check schema component imports

### 5. Deployment Verification Checklist

After each deployment, verify:

- [ ] **Correct Website Loads**: Disaster Recovery Brisbane (not Dr PathCares)
- [ ] **No Console Errors**: Check browser console for React errors
- [ ] **Emergency Phone Link**: 1300 309 361 works correctly
- [ ] **Schema Markup**: LocalBusiness + EmergencyService schemas present
- [ ] **Mobile Responsive**: Site works on mobile devices
- [ ] **Page Load Speed**: Under 3 seconds
- [ ] **SEO Elements**: Meta tags, sitemap, robots.txt accessible

### 6. Emergency Rollback Process

If critical errors are detected:

```bash
# 1. Immediately revert last commit
git revert HEAD

# 2. Push the revert
git push origin main

# 3. Wait for Vercel auto-deployment

# 4. Verify rollback with Playwright
playwright.navigate("https://dr-kv13xi3us-unite-group.vercel.app")
```

### 7. Integration with Development Workflow

Add this to every major change workflow:

1. **Before Coding**: Check current deployment status
2. **During Development**: Run local build tests
3. **Before Committing**: Full build + lint + readability check
4. **After Pushing**: Monitor Vercel deployment with Playwright MCP
5. **Post-Deployment**: Run full verification checklist

## 🚨 Critical Error Patterns

Watch for these patterns that indicate serious deployment issues:

```javascript
// Console error patterns to monitor:
const criticalErrors = [
  /Minified React error #418/,
  /Minified React error #423/,
  /Failed to load resource.*404/,
  /TypeError: Failed to fetch/,
  /Hydration.*mismatch/,
  /Provider.*not found/
];
```

## 📊 Success Metrics

A successful deployment should show:
- ✅ Zero React hydration errors
- ✅ Zero 404 resource errors
- ✅ Disaster Recovery Brisbane content (not Dr PathCares)
- ✅ Emergency phone link functional
- ✅ Schema markup validated
- ✅ Under 3-second load time
- ✅ Mobile responsive design

---

**Last Updated**: September 17, 2025
**Primary Deployment**: `https://dr-kv13xi3us-unite-group.vercel.app`
**Repository**: `CleanExpo/DR-New`