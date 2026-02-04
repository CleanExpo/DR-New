# Linear Update - NRP-021 to NRP-024 Deployment Resolution

## Issue to Create in DR-NRPG Project

**Title:** ✅ RESOLVED: NRP-021 to NRP-024 Training Modules Deployment Issue

**Status:** Done/Completed

**Priority:** High (was blocking issue)

**Description:**

### Summary
Successfully resolved deployment issue affecting training modules NRP-021 through NRP-024. All 24 NRPG training modules are now working in production.

### Root Cause
Production domain `disasterrecovery.com.au` was pointing to wrong Vercel project:
- ❌ Pointed to: "dr-new" project (last updated January 13, 2026 - 22 days old)
- ✅ Should point to: "dr-nrpg" project (where all recent deployments were going)

All code fixes were deploying successfully to "dr-nrpg", but the production domain was still serving the old "dr-new" deployment that didn't have modules 21-24.

### Solution Implemented
1. Identified issue using Vercel CLI inspection
2. Removed domain from old "dr-new" project
3. Reassigned `disasterrecovery.com.au` to "dr-nrpg" project
4. Verified all 24 modules working in production

### Verification Results
```
✅ NRP-001 through NRP-024: ALL SUCCESSFUL (100%)
```

### Technical Details
- **Time to resolve:** 4+ hours of debugging
- **Commits pushed:** 15+ commits
- **Success rate:** 100%
- **Production URL:** https://disasterrecovery.com.au/api/training/nrp/module/NRP-XXX

### Files Modified
- `apps/web/scripts/copy-training-sources.js` - Created build-time file copy script
- `apps/web/package.json` - Added copy script to build command
- `apps/web/lib/training/nrp-training.ts` - Fixed path resolution for production
- `apps/web/next.config.mjs` - Added outputFileTracingIncludes configuration
- `BUILD-FIX-SUMMARY.md` - Comprehensive documentation

### Key Learnings
- Infrastructure configuration (domain assignment) was the blocker, not code issues
- Vercel CLI inspection tools were critical for diagnosis
- Multiple Vercel projects can create confusion when production domains aren't clearly assigned

### Links
- Latest commit: `0c3bbf1d` - "docs: Document final resolution - all 24 modules working"
- Documentation: `BUILD-FIX-SUMMARY.md`
- Vercel Project: https://vercel.com/unite-group/dr-nrpg

---

**Completed:** February 4, 2026
**Assignee:** Claude Code + Phill McGurk
