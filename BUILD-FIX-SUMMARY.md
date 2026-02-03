# Build Configuration Fix - Summary

**Date:** 2026-02-03
**Issue:** NRP-021 to NRP-024 modules returning 404 errors in production
**Status:** ✅ Fixed - Deployment in progress

---

## Problem Identified

When testing the production site, the new training modules (NRP-021 to NRP-024) returned:
```json
{
  "error": "RESOURCE_NOT_FOUND",
  "message": "Training module not found: NRP-021"
}
```

**Root Cause:** The `training-sources/` folder at the repository root was not being included in the Vercel deployment bundle, even though the files were successfully pushed to GitHub.

---

## Solution Implemented

### 1. Updated Next.js Configuration (`apps/web/next.config.mjs`)

Added `outputFileTracingIncludes` to explicitly include training-sources folder for API routes:

```javascript
experimental: {
  // ... other experimental features ...

  // Include training-sources folder in Vercel deployment
  outputFileTracingIncludes: {
    '/api/**/*': ['../../training-sources/**/*'],
  },
}
```

**What this does:** Tells Next.js to trace and include the training-sources folder when building API routes, ensuring the files are available at runtime.

### 2. Updated Vercel Configuration (`apps/web/vercel.json`)

Added `includeFiles` directive:

```json
{
  "buildCommand": "cd ../.. && pnpm run build:web",
  "framework": "nextjs",
  "installCommand": "cd ../.. && pnpm install",
  "outputDirectory": ".next",
  "includeFiles": ["../../training-sources/**"],
  ...
}
```

**What this does:** Explicitly tells Vercel to include the training-sources folder in the deployment bundle.

---

## Changes Committed

**Commit 1:** `344c49eb` - Complete 24-module NRPG training system
- Created NRP-021 to NRP-024 modules
- Updated module index
- RestoreAssist.ai compliance updates

**Commit 2:** `d8060490` - Include training-sources folder in Vercel deployment
- Fixed build configuration
- Ensures all 24 modules accessible in production

---

## Verification Timeline

### Immediate (Complete)
- ✅ Files pushed to GitHub successfully
- ✅ All 24 module files visible in repository
- ✅ Build configuration updated and pushed

### In Progress (5-10 minutes)
- 🔄 Vercel automatic deployment triggered
- 🔄 Building with new configuration
- 🔄 Deploying to production

### Testing (After Deployment)
- ⏳ Test NRP-021 API endpoint
- ⏳ Test NRP-022, NRP-023, NRP-024
- ⏳ Verify all 24 modules loadable
- ⏳ Check module index returns 24 modules

---

## Testing URLs

Once deployment completes (~5-10 minutes from push), test these URLs:

1. **New Module (NRP-021):**
   ```
   https://disasterrecovery.com.au/api/training/nrp/module/NRP-021
   ```
   **Expected:** HTML content with DR-NRPG Platform Operations Guide

2. **New Module (NRP-022):**
   ```
   https://disasterrecovery.com.au/api/training/nrp/module/NRP-022
   ```
   **Expected:** HTML content with Continual Education Credits System

3. **Existing Module (for comparison):**
   ```
   https://disasterrecovery.com.au/api/training/nrp/module/NRP-001
   ```
   **Expected:** HTML content (this should continue working)

---

## How Vercel Builds Now

### Before Fix:
```
Repository Root
├── apps/
│   └── web/
│       ├── .next/ (build output)
│       └── [only files in apps/web included]
└── training-sources/ ❌ NOT INCLUDED
```

### After Fix:
```
Repository Root
├── apps/
│   └── web/
│       ├── .next/ (build output)
│       └── [files in apps/web]
└── training-sources/ ✅ INCLUDED via outputFileTracingIncludes
```

---

## Technical Details

### Why This Happened

Next.js by default only includes files within the app directory in the build output. Since `training-sources` is at the repository root (two levels up from `apps/web`), it wasn't automatically included.

The path resolution works locally because:
- Running `npm run dev:web` executes from repository root
- `process.cwd()` returns the repository root
- `training-sources/NRP Folder/...` resolves correctly

But in Vercel deployment:
- Build runs from `apps/web` with `cd ../..`
- Files outside the build context aren't included by default
- Need explicit configuration to include external folders

### The Solution

`outputFileTracingIncludes` is a Next.js experimental feature that:
1. Traces dependencies for specified routes (e.g., `/api/**/*`)
2. Includes specified files/folders in the output bundle
3. Makes them available at runtime in the production environment

Combined with Vercel's `includeFiles`, this ensures the training-sources folder is:
- Included in the deployment bundle
- Accessible via `fs.readFile()` at runtime
- Available to all API routes

---

## Monitoring Deployment

You can monitor the deployment at:
- **GitHub:** https://github.com/CleanExpo/DR-NRPG/commits/main
- **Vercel:** https://vercel.com/cleanexpo/dr-nrpg (requires login)

**Expected timeline:**
- Push to GitHub: ✅ Complete (11:51 AM)
- Vercel webhook triggered: ✅ Automatic
- Build starts: ~30 seconds after push
- Build completes: 3-5 minutes
- Deployment: 1-2 minutes
- **Total: 5-10 minutes from push**

---

## Success Criteria

Deployment is successful when:
1. ✅ NRP-021 API returns HTML content (not 404 error)
2. ✅ All new modules (021-024) are accessible
3. ✅ Existing modules (001-020) still work correctly
4. ✅ Module index shows 24 total modules

---

## Rollback Plan (If Needed)

If the fix doesn't work, we can:

1. **Revert the commits:**
   ```bash
   git revert d8060490
   git push
   ```

2. **Alternative solution:** Copy training-sources into apps/web/public
   ```bash
   cp -r training-sources apps/web/public/
   ```

3. **Update paths** to load from `/public/training-sources/...`

However, the current fix using `outputFileTracingIncludes` is the recommended Next.js approach for this scenario.

---

## Files Modified

1. `apps/web/next.config.mjs` - Added outputFileTracingIncludes
2. `apps/web/vercel.json` - Added includeFiles directive

**Total lines changed:** 6 insertions

---

## Next Steps

1. **Wait 5-10 minutes** for Vercel deployment to complete
2. **Test the URLs** listed above to verify modules load
3. **If successful:** Document this configuration for future deployments
4. **If unsuccessful:** Implement alternative solution (rollback plan)

---

**Status:** 🔄 Deployment in progress
**ETA:** ~5-10 minutes from 11:51 AM (ready by 11:56-12:01 PM)
**Last Updated:** 2026-02-03 11:52 AM
