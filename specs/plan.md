# Execution Plan: Fix NRP-021 to NRP-024 Vercel Deployment Issue

**Problem Statement:** Training modules NRP-001 to NRP-020 work in production, but NRP-021 to NRP-024 return 404 errors despite all files existing locally and being committed to repository.

**Success Criteria:** All 24 training modules (NRP-001 through NRP-024) return 200 OK with correct HTML content in production.

---

## Phase 1: Diagnostic Investigation

- [ ] **Task 1 (Builder)**: Access Vercel dashboard and navigate to latest deployment for commit `5783c164`
  - **Action:** Log in to https://vercel.com/cleanexpos-projects/disaster-recovery-nrp/deployments
  - **Expected Output:** Deployment details page showing build status

- [ ] **Task 2 (Validator)**: Verify deployment completed successfully without errors
  - **Check:** Deployment status shows "Ready" (green checkmark)
  - **Check:** Build logs contain no "ENOENT" or "Error copying" messages
  - **Check:** Build time is recent (within last 2 hours)
  - **Evidence:** Screenshot or text excerpt from deployment status

- [ ] **Task 3 (Builder)**: Examine build logs for copy-training-sources.js script output
  - **Action:** Open "Building" tab in deployment details
  - **Search For:** Lines containing "Copying training sources" and "COPIED NRP-02X"
  - **Expected Output:** Log lines showing all 4 files (NRP-021 through NRP-024) copied successfully

- [ ] **Task 4 (Validator)**: Verify build logs confirm all 24 modules were copied
  - **Check:** Logs contain "✓✓✓ COPIED NRP-02X: NRP-021-DR-NRPG-PLATFORM-OPERATIONS.html"
  - **Check:** Logs contain "✓✓✓ COPIED NRP-02X: NRP-022-CONTINUAL-EDUCATION-CREDITS.html"
  - **Check:** Logs contain "✓✓✓ COPIED NRP-02X: NRP-023-ASSOCIATION-MEMBERSHIPS-BENEFITS.html"
  - **Check:** Logs contain "✓✓✓ COPIED NRP-02X: NRP-024-MEMBERS-GATHERINGS-NETWORKING.html"
  - **Check:** Logs show "✅ Copied 24 files from NRP Folder" or similar count
  - **Evidence:** Extract log lines or note line numbers

- [ ] **Task 5 (Builder)**: Test diagnostic endpoint to check production file paths
  - **Action:** Navigate to https://disasterrecovery.com.au/api/debug/index-raw
  - **Expected Output:** JSON response showing which paths exist in production

- [ ] **Task 6 (Validator)**: Verify diagnostic endpoint reveals index file location and module count
  - **Check:** Response status is 200 OK (not 404)
  - **Check:** JSON contains `"exists": true` for at least one path attempt
  - **Check:** JSON shows `"totalModules": 24`
  - **Check:** JSON shows `"has_NRP_021": true`
  - **Evidence:** Copy JSON response or note key values

---

## Phase 2: Root Cause Identification & Fix

- [ ] **Task 7 (Builder)**: Based on diagnostic results, identify exact failure point
  - **If build logs missing copy output:** Copy script didn't run → Fix package.json build command
  - **If files copied but index not found:** Path issue → Fix generatedDir() function path
  - **If index found but missing NRP-021:** Index outdated → Regenerate index file
  - **If everything present but still 404:** Serverless function bundle issue → Fix outputFileTracingIncludes
  - **Action:** Document which scenario applies and note the fix needed

- [ ] **Task 8 (Validator)**: Verify root cause hypothesis matches observed symptoms
  - **Check:** Hypothesis explains why NRP-020 works but NRP-021 doesn't
  - **Check:** Hypothesis explains why all files work locally
  - **Check:** Hypothesis aligns with evidence from build logs and diagnostic endpoint
  - **Evidence:** Write 2-3 sentence explanation of how hypothesis fits all facts

- [ ] **Task 9 (Builder)**: Implement targeted fix based on identified root cause
  - **Scenario A (Build script didn't run):**
    - Edit `apps/web/package.json` line 8
    - Ensure build script is: `"build": "node scripts/copy-training-sources.js && prisma generate && next build"`
  - **Scenario B (Path issue):**
    - Edit `apps/web/lib/training/nrp-training.ts` generatedDir() function
    - Ensure path doesn't include 'src': `path.join(process.cwd(), 'lib', 'training', 'generated')`
  - **Scenario C (Index outdated):**
    - Run: `cd "D:\Disaster Recovery - NRP\apps\web" && node scripts/copy-training-sources.js`
    - Verify lib/training/generated/nrp-training-index.json has all 24 modules
  - **Scenario D (Serverless bundle issue):**
    - Edit `apps/web/next.config.mjs` outputFileTracingIncludes
    - Ensure includes: `'/api/**/*': ['./lib/training/sources/**/*', './lib/training/generated/**/*']`
  - **Action:** Make the required code changes and commit

- [ ] **Task 10 (Validator)**: Verify fix was correctly implemented in code
  - **Check:** Changed file(s) contain the exact modifications specified
  - **Check:** No syntax errors introduced (run `npm run type-check` or similar)
  - **Check:** Git commit created with descriptive message
  - **Check:** Changes pushed to GitHub (verify on github.com)
  - **Evidence:** Commit SHA and git log --oneline -1 output

- [ ] **Task 11 (Builder)**: Force fresh Vercel deployment with fix
  - **Action:** Either wait for automatic deployment OR manually redeploy via Vercel dashboard
  - **If manual:** Go to deployments → Click "..." menu → "Redeploy" → "Use existing Build Cache" = OFF
  - **Expected Output:** New deployment initiated with unique deployment URL

- [ ] **Task 12 (Validator)**: Verify new deployment completed successfully
  - **Check:** Deployment status shows "Ready" (not "Building" or "Error")
  - **Check:** Deployment timestamp is after the fix commit
  - **Check:** Deployment commit SHA matches latest commit with fix
  - **Check:** Build logs show successful build (no errors in red)
  - **Evidence:** Deployment URL and timestamp

---

## Phase 3: Comprehensive Testing

- [ ] **Task 13 (Builder)**: Test NRP-001 (regression test - should still work)
  - **Action:** Navigate to https://disasterrecovery.com.au/api/training/nrp/module/NRP-001
  - **Expected Output:** JSON response with `"success": true` and HTML content

- [ ] **Task 14 (Validator)**: Verify NRP-001 returns valid response
  - **Check:** HTTP status code is 200 OK
  - **Check:** Response JSON contains `"success": true`
  - **Check:** Response JSON contains `"moduleId": "NRP-001"`
  - **Check:** Response JSON contains `"html"` field with content length > 10000 characters
  - **Evidence:** First 100 characters of HTML or note response size

- [ ] **Task 15 (Builder)**: Test NRP-020 (boundary test - last working module)
  - **Action:** Navigate to https://disasterrecovery.com.au/api/training/nrp/module/NRP-020
  - **Expected Output:** JSON response with `"success": true` and HTML content

- [ ] **Task 16 (Validator)**: Verify NRP-020 returns valid response
  - **Check:** HTTP status code is 200 OK
  - **Check:** Response JSON contains `"success": true`
  - **Check:** Response JSON contains `"moduleId": "NRP-020"`
  - **Check:** Response JSON contains `"html"` field with content length > 10000 characters
  - **Evidence:** Note response size or status

- [ ] **Task 17 (Builder)**: Test NRP-021 (critical test - first failing module)
  - **Action:** Navigate to https://disasterrecovery.com.au/api/training/nrp/module/NRP-021
  - **Expected Output:** JSON response with `"success": true` and HTML content (NOT 404 error)

- [ ] **Task 18 (Validator)**: Verify NRP-021 now returns valid response
  - **Check:** HTTP status code is 200 OK (NOT 404)
  - **Check:** Response JSON contains `"success": true` (NOT `"error": "RESOURCE_NOT_FOUND"`)
  - **Check:** Response JSON contains `"moduleId": "NRP-021"`
  - **Check:** Response JSON contains `"html"` field with content length > 10000 characters
  - **Check:** Response JSON contains `"title"` mentioning "Platform Operations"
  - **Evidence:** Copy response status and moduleId field

- [ ] **Task 19 (Builder)**: Test NRP-022, NRP-023, NRP-024 (remaining new modules)
  - **Action:** Navigate to each URL:
    - https://disasterrecovery.com.au/api/training/nrp/module/NRP-022
    - https://disasterrecovery.com.au/api/training/nrp/module/NRP-023
    - https://disasterrecovery.com.au/api/training/nrp/module/NRP-024
  - **Expected Output:** All three return JSON with `"success": true`

- [ ] **Task 20 (Validator)**: Verify NRP-022, NRP-023, NRP-024 all return valid responses
  - **Check:** NRP-022 returns 200 OK with `"success": true` and title about "Continual Education"
  - **Check:** NRP-023 returns 200 OK with `"success": true` and title about "Association Memberships"
  - **Check:** NRP-024 returns 200 OK with `"success": true` and title about "Members Gatherings"
  - **Check:** All three have unique SHA256 hashes (different module content)
  - **Evidence:** List status codes and module titles

- [ ] **Task 21 (Builder)**: Run comprehensive module availability test script
  - **Action:** Create and run test script that checks all 24 modules:
    ```bash
    for i in {001..024}; do
      curl -s "https://disasterrecovery.com.au/api/training/nrp/module/NRP-$i" | jq -r '.success // "ERROR"'
    done
    ```
  - **Expected Output:** 24 lines showing "true" (no "ERROR" or "null")

- [ ] **Task 22 (Validator)**: Verify all 24 modules return success
  - **Check:** Script output shows "true" for all 24 modules
  - **Check:** No lines contain "ERROR", "null", or "RESOURCE_NOT_FOUND"
  - **Check:** All 24 responses received (no timeouts or connection errors)
  - **Evidence:** Count of successful responses (should be 24/24)

---

## Phase 4: Documentation & Cleanup

- [ ] **Task 23 (Builder)**: Update BUILD-FIX-SUMMARY.md with resolution
  - **Action:** Edit `BUILD-FIX-SUMMARY.md`
  - **Add Section:** "## ✅ FINAL RESOLUTION" with:
    - Root cause description
    - Fix implemented
    - Verification results
    - Date/time resolved
  - **Action:** Commit changes

- [ ] **Task 24 (Validator)**: Verify documentation accurately describes solution
  - **Check:** BUILD-FIX-SUMMARY.md contains new "FINAL RESOLUTION" section
  - **Check:** Root cause description matches what was actually found
  - **Check:** Fix description matches code changes made
  - **Check:** Timestamp is accurate (today's date)
  - **Evidence:** Read summary section and confirm accuracy

- [ ] **Task 25 (Builder)**: Remove diagnostic endpoints (cleanup)
  - **Action:** Delete temporary diagnostic files:
    - `apps/web/app/api/debug/files/route.ts`
    - `apps/web/app/api/debug/module-index/route.ts`
    - `apps/web/app/api/debug/index-raw/route.ts`
  - **Action:** Optionally remove verbose logging from `copy-training-sources.js`
  - **Action:** Commit cleanup changes

- [ ] **Task 26 (Validator)**: Verify diagnostic endpoints removed and production still works
  - **Check:** Diagnostic files no longer exist in apps/web/app/api/debug/
  - **Check:** Git shows files deleted in latest commit
  - **Check:** After deployment, NRP-021 still returns 200 OK (fix didn't break)
  - **Evidence:** Confirm NRP-021 still accessible after cleanup deployment

- [ ] **Task 27 (Builder)**: Update todo list to mark task complete
  - **Action:** Run TodoWrite tool to update status:
    - Mark "Test all 24 modules return 200 OK" as completed
    - Mark "Confirm 100% success" as completed
  - **Expected Output:** Todo list shows all items completed

- [ ] **Task 28 (Validator)**: Verify project is in clean, production-ready state
  - **Check:** All 24 training modules accessible in production
  - **Check:** No diagnostic/debug endpoints exposed
  - **Check:** No pending git changes (git status clean or only docs)
  - **Check:** Build logs show successful builds with no warnings
  - **Check:** Todo list shows all deployment tasks completed
  - **Evidence:** Final checklist confirmation

---

## Success Metrics

**Definition of Done:**
- ✅ All 24 modules (NRP-001 through NRP-024) return HTTP 200 with valid JSON
- ✅ Each module contains `"success": true` and correct `moduleId`
- ✅ Production deployment stable with no errors in logs
- ✅ Root cause documented and understood
- ✅ Cleanup completed (no temporary debugging code in production)

**Risk Mitigation:**
- Each Builder task is immediately followed by Validator verification
- Regression testing ensures existing functionality (NRP-001 to NRP-020) not broken
- Comprehensive testing catches any edge cases (NRP-022, 023, 024)
- Documentation ensures knowledge transfer and future debugging

---

**Plan Status:** Ready for execution
**Estimated Time:** 1-2 hours (depending on Vercel deployment times)
**Last Updated:** 2026-02-04
