# Todo Folder - Linear Sync Workflow

This folder contains task breakdowns that can be synced with Linear project management.

## Files

### `stripe-webhooks-production-blockers.md`
**Comprehensive task breakdown** for Stripe webhook production hardening.
- 10 detailed tasks with acceptance criteria
- Priority matrix and timeline
- Implementation examples
- Risk assessment
- Ready for technical review

### `linear-import.csv`
**CSV format** for easy Linear import.
- Title, Description, Priority, Estimate, Labels, Status
- Import via Linear UI: Settings → Import → CSV

## Workflow

### Push to Linear (Manual Sync)
1. Review `stripe-webhooks-production-blockers.md`
2. Import `linear-import.csv` into Linear project
3. OR manually create tasks in Linear using detailed descriptions

### Pull from Linear (Senior PM Updates)
1. Senior PM reviews and reprioritises tasks in Linear
2. Senior PM exports updated priorities from Linear
3. Save updated priorities to `linear-priorities-updated.md` in this folder
4. Claude will read and adjust implementation order

## Current Status

**Date:** 2026-02-03
**Epic:** Stripe Webhooks Production Hardening
**Priority:** P0 - CRITICAL
**Effort:** 16-19 hours (1.5-2 days)
**Status:** Ready for Linear sync

### Critical Finding
Strategic plan assessment was incorrect. Stripe webhooks are **60% implemented**, not missing. Only production hardening needed.

### Tasks Summary
- **P0 Critical:** 5 tasks (7 hours) - BLOCKS PRODUCTION
- **P1 High:** 3 tasks (7 hours) - Customer communication & QA
- **P2 Medium:** 2 tasks (4 hours) - Documentation & monitoring

### Next Steps
1. Import tasks into Linear
2. Senior PM reviews and assigns
3. Begin Phase 1: Critical Fixes (Day 1)
4. Deploy to production after Phase 1 complete
