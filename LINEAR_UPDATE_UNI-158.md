# UNI-158: Row-Level Security (RLS) Policies - Multi-Tenant Isolation
## Status: ⛔ BLOCKED - Cannot Complete

**Date:** 2026-02-02
**Investigation Status:** Complete
**Implementation Status:** 0% (Blocked by schema synchronization)
**Blocker Severity:** P0 - Critical Infrastructure Issue

---

## Executive Summary

**UNI-158 cannot be completed** due to a critical database schema synchronization issue discovered during implementation. The Prisma schema defines `tenantId` fields on 44 models for multi-tenant isolation, but **these columns do not exist in the production database**.

**Impact:**
- RLS policies cannot be applied to non-existent columns
- Database-level tenant isolation cannot be implemented
- Application-level isolation is working (via `getTenantDb()` helper)
- Security posture incomplete without database-level RLS

**Blocker:** Database schema out of sync with code (UNI-157 multi-tenant conversion was incomplete)

---

## What Was Attempted

### Investigation Phase ✅
1. Reviewed existing RLS migration (`20250127200000_add_rls_policies`)
   - Found it only covered 16 of 44 tables
   - Used incorrect table names (PascalCase instead of snake_case)
   - Never successfully applied to database

2. Created completion migration (`20260202000000_complete_rls_policies`)
   - 112 RLS policies for remaining 28 tables
   - Correct snake_case table names
   - Ready to apply AFTER schema sync

3. Attempted to apply migrations
   - **Error:** `column "tenantId" does not exist`
   - Discovered fundamental issue: database missing tenant columns

4. Verified database state
   - Checked 44 tables across all models
   - **ZERO tables have tenantId columns**
   - Confirmed via diagnostic scripts

---

## Root Cause Analysis

### The Problem

**Expected State (Prisma Schema):**
```typescript
model Activity {
  id           String   @id @default(cuid())
  tenantId     String?  // Defined in schema ✅
  // ... other fields

  tenant       Tenant?  @relation(fields: [tenantId], references: [id])
  @@map("activities")
}
```

**Actual State (Database):**
```sql
-- Table: activities (44 similar tables)
SELECT column_name FROM information_schema.columns
WHERE table_name = 'activities';

Results:
- id
- customerLifecycleId
- bookingId
- type
- subject
... (20+ columns)
-- ❌ NO tenantId column
```

### Why This Happened

**Timeline:**
1. **UNI-157 (January 2026):** Multi-tenant route conversion
   - Added `tenantId` fields to Prisma models
   - Updated application code to use `getTenantDb()`
   - Commit: `90260baf` - "Complete Phase 7 - 100% Multi-Tenant Route Conversion!"

2. **Schema Migration:** Never executed
   - `prisma migrate deploy` was never run for tenant columns
   - Or migration failed silently
   - Database schema never updated

3. **UNI-158 (February 2026):** RLS implementation attempted
   - Assumed tenantId columns existed
   - Discovered schema drift during RLS policy application

**Result:** 6+ weeks of schema drift between code and database

---

## Current Security Posture

### What's Working ✅
- **Application-Level Isolation:** All API routes use `getTenantDb()` helper
- **Route Protection:** Tenant context enforced in middleware
- **Client Separation:** Users can only access their tenant's data via API

### What's Missing ❌
- **Database-Level Isolation:** No RLS policies (cannot apply without columns)
- **Direct DB Access Protection:** Database admin access has no tenant guardrails
- **Defense-in-Depth:** No secondary security layer if application bypass occurs
- **Compliance Readiness:** May not meet SOC 2 / HIPAA requirements

### Risk Assessment

| Scenario | Risk Level | Mitigation |
|----------|-----------|------------|
| Normal API usage | ✅ **LOW** | App-level isolation working |
| SQL injection attack | 🟡 **MEDIUM** | Could bypass app isolation |
| Direct DB admin access | 🔴 **HIGH** | No tenant filtering |
| Backup/restore operations | 🟡 **MEDIUM** | Could leak cross-tenant data |
| Third-party DB tools | 🔴 **HIGH** | Bypass all isolation |

**Current State:** Acceptable for development/staging, **risky for production at scale**

---

## Work Completed

### Documentation Created ✅

1. **`UNI-158_CRITICAL_FINDINGS.md`** (2,200 lines)
   - Complete investigation report
   - Root cause analysis
   - Security impact assessment
   - Detailed technical findings
   - Risk analysis

2. **`UNI-158_MIGRATION_STRATEGY.md`** (1,000+ lines)
   - 5-phase execution plan
   - SQL backfill scripts for all 44 tables
   - Validation queries
   - Rollback procedures
   - Performance considerations
   - Timeline estimates (8-13 hours)

3. **`LINEAR_UPDATE_UNI-158.md`** (this document)

### Migration Files Created ✅

**File:** `apps/web/prisma/migrations/20260202000000_complete_rls_policies/migration.sql`

**Content:**
- 112 RLS policies (28 tables × 4 policies each)
  - `tenant_isolation_select`
  - `tenant_isolation_insert`
  - `tenant_isolation_update`
  - `tenant_isolation_delete`
- Correct snake_case table names (fixed from initial migration)
- Ready to apply AFTER schema synchronization

**Total RLS Coverage (when complete):**
- 176 policies (44 tables × 4 policies)
- From initial migration: 64 policies (16 tables)
- From this migration: 112 policies (28 tables)

### Diagnostic Tools Created ✅

1. `apps/web/list-tables.js` - Lists all database tables
2. `apps/web/check-columns.js` - Shows columns for specific table
3. `apps/web/check-tenant-columns.js` - Audits tenant column presence

---

## Required Work to Unblock

### Phase 1: Schema Synchronization (P0 - Prerequisite)

**Objective:** Add `tenantId String?` column to all 44 tables

**Estimated Time:** 2-3 hours

**Steps:**
1. Fix cross-schema reference blocking `prisma db push`
   ```sql
   -- Drop foreign key to auth.users
   ALTER TABLE "skill_executions"
   DROP CONSTRAINT IF EXISTS "skill_executions_user_id_fkey";
   ```

2. Push Prisma schema to database
   ```bash
   cd apps/web
   npx prisma db push --accept-data-loss --skip-generate
   ```

3. Verify columns added
   ```bash
   node check-tenant-columns.js
   # Should show tenantId column on all 44 tables
   ```

4. Regenerate Prisma Client
   ```bash
   npx prisma generate
   ```

**Risk:** `--accept-data-loss` flag - Review schema diff before executing

### Phase 2: Data Backfill (P0 - Required)

**Objective:** Populate `tenantId` for all existing records

**Estimated Time:** 3-4 hours

**Approach:** SQL scripts to derive tenant from existing relationships

**Example:**
```sql
-- Bookings via client relation
UPDATE "Booking" b
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE b."clientId" = u."id"
AND b."tenantId" IS NULL;

-- Activities via booking relation
UPDATE "activities" a
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE a."bookingId" = b."id"
AND a."tenantId" IS NULL;

-- ... (similar for all 44 tables)
```

**Full Script:** See `UNI-158_MIGRATION_STRATEGY.md` Section 2.2

**Validation:**
```sql
-- Count records without tenantId per table
SELECT 'activities', COUNT(*) FROM "activities" WHERE "tenantId" IS NULL
UNION ALL
SELECT 'Booking', COUNT(*) FROM "Booking" WHERE "tenantId" IS NULL
-- ... (all tables)
-- Expected: All counts = 0
```

### Phase 3: Apply RLS Policies (P0 - UNI-158 Core)

**Objective:** Apply all 176 RLS policies

**Estimated Time:** 2-3 hours

**Steps:**
1. Fix initial migration table names
   ```bash
   # Edit: apps/web/prisma/migrations/20250127200000_add_rls_policies/migration.sql
   # Replace PascalCase → snake_case
   ```

2. Mark as applied (was rolled back earlier)
   ```bash
   npx prisma migrate resolve --applied 20250127200000_add_rls_policies
   ```

3. Apply completion migration
   ```bash
   npx prisma migrate deploy
   ```

4. Verify 176 policies created
   ```bash
   node scripts/verify-rls-policies.js
   ```

### Phase 4: Testing & Validation (P1 - Required)

**Estimated Time:** 1-2 hours

**Test Suite:**
1. Fix test data schema (add missing required fields)
2. Run RLS isolation tests (`npm test -- rls-tenant-isolation.test.ts`)
3. Manual API testing for tenant isolation
4. Performance validation

### Phase 5: Documentation & Cleanup (P2)

**Estimated Time:** 1 hour

**Tasks:**
- Create completion summary
- Remove diagnostic scripts
- Update security documentation
- Mark UNI-158 as Done in Linear

---

## Total Effort Estimate

| Phase | Task | Hours |
|-------|------|-------|
| 1 | Schema Synchronization | 2-3 |
| 2 | Data Backfill | 3-4 |
| 3 | Apply RLS Policies | 2-3 |
| 4 | Testing & Validation | 1-2 |
| 5 | Documentation | 1 |
| **Total** | | **9-13 hours** |

**Recommendation:** Schedule as dedicated sprint task, not incremental work

---

## Alternative: Defer Implementation

If schema migration is too risky or time-consuming:

### Option: Document Limitation & Defer

**Accept Current State:**
- ✅ Application-level isolation working
- ⚠️ Database-level isolation missing
- 📝 Document security trade-offs

**Additional Safeguards:**
1. Restrict database access to application service account only
2. No direct DB admin access to production (or require approval)
3. Enhanced logging for potential cross-tenant queries
4. Automated tenant isolation tests in CI/CD
5. Regular security audits

**Compliance Impact:**
- May not pass SOC 2 Type II audit
- May not meet HIPAA technical safeguards
- Acceptable for early-stage / non-regulated environments

**Timeline:** Defer to next quarter or after MVP launch

---

## Files & Resources

### Documentation
- `UNI-158_CRITICAL_FINDINGS.md` - Full investigation report
- `UNI-158_MIGRATION_STRATEGY.md` - Detailed execution plan
- `LINEAR_UPDATE_UNI-158.md` - This document

### Migration Files
- `apps/web/prisma/migrations/20260202000000_complete_rls_policies/migration.sql`
- `apps/web/prisma/migrations/20250127200000_add_rls_policies/migration.sql` (needs fixing)

### Scripts
- `apps/web/list-tables.js`
- `apps/web/check-tenant-columns.js`

### Related Issues
- **UNI-157:** Multi-tenant route conversion (completed, but schema not migrated)
- **UNI-182:** Review/rating system (complete, has tenantId in schema)
- **UNI-183:** Property owner portal (complete, has tenantId in schema)

---

## Recommendations

### For Product Team

**DO NOT mark UNI-158 as "Done"** - It is fundamentally blocked.

**Two Paths:**
1. **Complete Implementation:** Schedule 9-13 hours for schema migration
2. **Defer & Document:** Accept current risk, plan for future sprint

**Decision Factors:**
- Time to market pressure
- Security/compliance requirements
- Availability of database expertise
- Risk tolerance for production

### For Engineering Team

**If Proceeding with Migration:**
- Follow `UNI-158_MIGRATION_STRATEGY.md` exactly
- Test on staging environment first
- Schedule maintenance window (potential downtime)
- Have rollback plan ready
- Monitor performance after migration

**If Deferring:**
- Document security limitations clearly
- Implement additional app-level safeguards
- Add "Database RLS" to technical debt backlog
- Schedule for future sprint with dedicated time

### For Security/Compliance

**Current State:** ⚠️ Single layer of protection (application-level only)

**Required for Audit:**
- Defense-in-depth architecture (application + database RLS)
- Database-level tenant isolation
- Audit trail at DB level

**Recommendation:** Complete schema migration before security audit / certification

---

## Success Criteria (When Unblocked)

UNI-158 will be COMPLETE when:
- [ ] All 44 tables have `tenantId` column in database
- [ ] All existing records have `tenantId` populated (or NULL intentionally)
- [ ] All 176 RLS policies applied successfully
- [ ] Verification script shows 176 policies on 44 tables
- [ ] Test suite passes (13/13 RLS isolation tests)
- [ ] Manual API testing confirms tenant isolation working
- [ ] No performance degradation observed
- [ ] Documentation updated
- [ ] Code committed and pushed

**Current Completion:** 0% (Investigation: 100%, Implementation: Blocked)

---

## Next Actions

### Immediate
1. **Review this Linear update** - Share with team
2. **Make decision:** Complete migration vs. Defer
3. **If completing:** Schedule dedicated time (9-13 hours)
4. **If deferring:** Document security limitations, add to backlog

### Short Term (If Completing)
1. Create database backup
2. Test migration on staging environment
3. Execute Phase 1 (schema sync)
4. Execute Phase 2 (data backfill)
5. Execute Phase 3 (apply RLS policies)
6. Execute Phase 4 (testing)
7. Mark UNI-158 as Done ✅

### Medium Term (If Deferring)
1. Add to technical debt backlog
2. Document security trade-offs
3. Implement additional safeguards
4. Plan for future sprint (Q2 2026?)

---

## Conclusion

UNI-158 is **not a simple feature addition** - it requires fundamental database schema changes that were missed during the multi-tenant conversion (UNI-157).

**The work is well-scoped and ready to execute** (complete migration strategy documented), but requires **9-13 hours of focused effort** and carries **moderate risk** to production database.

**Recommendation:** Make an explicit decision on path forward:
- ✅ **Complete Now:** Schedule dedicated time, follow migration strategy
- ✅ **Defer:** Document limitation, add safeguards, plan for future
- ❌ **Ignore:** Not acceptable - creates security debt

---

**Status:** ⛔ BLOCKED awaiting decision on schema migration approach

**Priority:** P0 (Critical infrastructure) but timing flexible based on product priorities

**Owner:** Engineering Lead + Database Administrator

**Next Update:** After migration decision made

---

*Investigation completed: 2026-02-02*
*Linear Issue: UNI-158*
*Status: Blocked - Awaiting schema migration*
*Estimated Unblock Time: 9-13 hours of dedicated work*
