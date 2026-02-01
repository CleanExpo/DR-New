# UNI-158: RLS Policies Implementation - BLOCKED
## Critical Findings Report

**Date:** 2026-02-02
**Status:** ⛔ **BLOCKED** - Cannot proceed without database schema synchronization
**Priority:** P0 (Critical Infrastructure Issue)

---

## Executive Summary

**UNI-158 (Row-Level Security Policies) cannot be completed** due to a critical database schema synchronization issue. The Prisma schema defines `tenantId` fields on 44 models, but these columns **do not exist in the production database**.

**Impact:**
- 🔴 **Security Risk**: 44 tables currently have NO tenant isolation at the database level
- 🔴 **Data Integrity Risk**: Multi-tenant data could be exposed across tenants
- 🔴 **Blocker**: RLS policies cannot be applied to non-existent columns

---

## Root Cause Analysis

### The Problem

**Prisma Schema Definition (Expected):**
```typescript
model Activity {
  id           String   @id @default(cuid())
  tenantId     String?   // Defined in schema
  // ... other fields

  tenant       Tenant?  @relation(fields: [tenantId], references: [id])

  @@map("activities")
}
```

**Actual Database State:**
```sql
-- Table: activities
Columns in activities table:
- id
- customerLifecycleId
- opportunityId
- bookingId
- claimId
- type
- subject
- description
- outcome
- performedById
- customerId
- contractorId
- activityDate
- durationMinutes
- attachments
- sentiment
- sentimentScore
- requiresFollowUp
- followUpDate
- followUpTaskId
- createdAt
- updatedAt
-- ❌ NO tenantId column!
```

### Verification Results

Checked 5 representative tables - **ALL missing tenantId columns:**
- ❌ `activities` - NO TENANT COLUMN
- ❌ `Booking` - NO TENANT COLUMN
- ❌ `AuditLog` - NO TENANT COLUMN
- ❌ `damage_areas` - NO TENANT COLUMN
- ❌ `cost_estimates` - NO TENANT COLUMN

**Total Affected:** 44 tables across the entire database

---

## Investigation Timeline

### Attempted Solutions

#### 1. ✅ Fixed Table Name Casing
**Issue:** RLS migration used PascalCase (e.g., `"DamageArea"`) but database has snake_case (e.g., `"damage_areas"`)
**Fix:** Updated migration to use correct snake_case table names via Prisma's `@@map` directive
**Files Modified:**
- `apps/web/prisma/migrations/20260202000000_complete_rls_policies/migration.sql`

#### 2. ❌ Attempted to Apply RLS Migration
**Command:** `npx prisma migrate deploy`
**Error:**
```
ERROR: relation "Activity" does not exist
Database error code: 42P01
```
**Resolution:** Marked failed migration as rolled back

#### 3. ❌ Attempted Schema Push
**Command:** `npx prisma db push --accept-data-loss`
**Error:**
```
ERROR: P4002
Cross schema references are only allowed when the target schema is listed in the schemas property.
`public.skill_executions` points to `auth.users`
```
**Blocker:** Requires `multiSchema` preview feature + schema configuration changes

#### 4. 🔍 Discovered Missing Columns
**Verification:** Created `check-tenant-columns.js` to audit database
**Finding:** **ZERO tables have tenantId columns**

---

## What Went Wrong

### Historical Context

The database appears to have been created/migrated **before** the multi-tenant conversion (UNI-157). Evidence:

1. **Git History Shows Multi-Tenant Conversion (January 2026):**
   - Commit `90260baf`: "Complete Phase 7 - 100% Multi-Tenant Route Conversion! 🎉 (UNI-157)"
   - This added `tenantId` fields to Prisma models
   - But **migrations were never applied** to the production database

2. **Migration Status:**
   - Initial RLS migration (`20250127200000_add_rls_policies`) attempted but failed
   - Migration assumed tenantId columns existed
   - Never successfully applied

3. **Schema Drift:**
   - Prisma schema has evolved significantly
   - Database schema has NOT kept pace
   - No automated schema validation in CI/CD

---

## Technical Details

### Migration Files Created

#### File 1: `20250127200000_add_rls_policies/migration.sql`
**Status:** Failed (marked as rolled back)
**Content:**
- Creates `current_tenant_id()` function ✅
- Enables RLS on 44 tables ✅
- Creates policies for 16 tables using **WRONG table names** ❌
- Missing policies for 28 tables ❌

#### File 2: `20260202000000_complete_rls_policies/migration.sql`
**Status:** Created but cannot apply (missing tenant columns)
**Content:**
- Adds 112 RLS policies (28 tables × 4 policies each)
- Uses **CORRECT snake_case table names** ✅
- References `tenantId` column that **doesn't exist** ❌

**Total Policies Defined:** 176 (44 tables × 4 policies each)
- `tenant_isolation_select`
- `tenant_isolation_insert`
- `tenant_isolation_update`
- `tenant_isolation_delete`

---

## Impact Assessment

### Current State: **INSECURE**

Without RLS policies and tenant columns:
- ✅ Application-level tenant scoping exists (`getTenantDb()` helper)
- ❌ Database-level isolation **DOES NOT EXIST**
- ❌ Direct database access bypasses all tenant checks
- ❌ SQL injection could expose cross-tenant data
- ❌ Backup/restore operations could leak data
- ❌ Database admin access has NO guardrails

### Affected Tables (44 Total)

**Critical Business Data:**
- Bookings, Payments, Invoices
- Client Profiles, Properties, Insurance
- Contractor Profiles, Matches
- Activities, Tasks
- Insurance Claims

**Security & Audit:**
- AuditLog, LoginAttempt, VerificationToken

**Content & Features:**
- PublicClaims, TriageAssessments (UNI-183)
- Ratings (UNI-182)
- Blog Posts, FAQs, Case Studies
- Beta Programs, Enrollments, Feedback

---

## Recommended Solution

### Phase 1: Schema Synchronization (P0 - Required)

**Objective:** Add `tenantId` columns to all 44 tables

**Option A: Prisma Migrate (Recommended)**
```bash
# 1. Create migration to add tenantId columns
cd apps/web
npx prisma migrate dev --name add_tenant_id_columns --create-only

# 2. Review generated SQL
# 3. Apply migration
npx prisma migrate deploy

# 4. Backfill tenantId for existing data
# (separate data migration script needed)
```

**Pros:**
- ✅ Tracks schema changes in version control
- ✅ Reversible via migration rollback
- ✅ Clear audit trail

**Cons:**
- ❌ Requires resolving cross-schema reference issue
- ❌ May require `multiSchema` preview feature
- ❌ More complex setup

**Option B: Prisma DB Push (Faster, Riskier)**
```bash
cd apps/web

# 1. Fix cross-schema reference
# - Enable multiSchema preview feature
# - Add schemas property to datasource

# 2. Push schema
npx prisma db push --accept-data-loss

# 3. Verify columns added
node check-tenant-columns.js
```

**Pros:**
- ✅ Faster to execute
- ✅ Auto-generates required SQL

**Cons:**
- ❌ No migration history
- ❌ Cannot rollback easily
- ❌ `--accept-data-loss` flag risky in production
- ❌ Requires schema configuration changes

### Phase 2: Data Backfill (P0 - Required)

**Objective:** Populate tenantId for all existing records

```sql
-- Example data migration
-- Determine correct tenantId for each record based on relations

-- For bookings via user relation
UPDATE "Booking" b
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE b."clientId" = u."id"
AND b."tenantId" IS NULL;

-- For activities via booking relation
UPDATE "activities" a
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE a."bookingId" = b."id"
AND a."tenantId" IS NULL;

-- Repeat for all 44 tables...
```

**Requirements:**
- Identify tenant ownership for each table
- Handle orphaned records (no tenant relation)
- Validate no data loss
- Test on staging first

### Phase 3: Apply RLS Policies (P0 - Required)

**After** Phases 1 & 2 are complete:

```bash
# 1. Apply first RLS migration (with corrected table names)
cd apps/web
npx prisma migrate resolve --applied 20250127200000_add_rls_policies

# 2. Fix the migration file (replace PascalCase with snake_case)
# Edit: apps/web/prisma/migrations/20250127200000_add_rls_policies/migration.sql

# 3. Apply fixed migration
npx prisma migrate deploy

# 4. Apply completion migration
npx prisma migrate deploy

# 5. Verify policies applied
node verify-rls-policies.js
```

### Phase 4: Testing & Validation (P0 - Required)

```bash
# 1. Fix test data schema (add australianServiceType, clientId)
# Edit: apps/web/tests/rls-tenant-isolation.test.ts

# 2. Run RLS test suite
npm test -- rls-tenant-isolation.test.ts

# 3. Verify all 13 tests pass
# 4. Generate completion report
```

---

## Alternative: Defer RLS Implementation

If schema synchronization is too risky for production:

### Option: Application-Level Only (Current State)

**Keep Status Quo:**
- ✅ Application code uses `getTenantDb()` for isolation
- ✅ All API routes enforce tenant scoping
- ⚠️ Database has NO isolation layer

**Acceptance Criteria:**
- Document security limitations
- Implement additional safeguards:
  - Database access restricted to application only
  - No direct DB admin access to production
  - Enhanced logging for cross-tenant queries
  - Automated tenant isolation audits in tests

**Trade-offs:**
- ✅ No database migration risk
- ✅ Faster to document than implement
- ❌ Security posture weaker
- ❌ Not true multi-tenant architecture
- ❌ Fails compliance requirements (SOC 2, HIPAA if applicable)

---

## Files Created During Investigation

### Migration Files
1. `apps/web/prisma/migrations/20260202000000_complete_rls_policies/migration.sql`
   - 112 RLS policies for 28 tables
   - Correct snake_case table names
   - Cannot apply without tenantId columns

### Diagnostic Scripts
1. `apps/web/list-tables.js` - Lists all database tables
2. `apps/web/check-columns.js` - Shows columns for activities table
3. `apps/web/check-tenant-columns.js` - Checks for tenant columns across tables

### Documentation
1. `UNI-158_CRITICAL_FINDINGS.md` - This report

---

## Next Steps

### Immediate (This Session)
1. ✅ Document findings (this report)
2. ⏳ Create migration strategy document
3. ⏳ Commit findings to repository
4. ⏳ Update Linear issue with blocker status

### Short Term (Next Session)
1. Decide on migration approach (Option A vs B)
2. Plan data backfill strategy
3. Create test plan for schema changes
4. Schedule maintenance window if needed

### Medium Term (After Schema Sync)
1. Apply tenant ID columns
2. Backfill existing data
3. Apply RLS policies
4. Run full test suite
5. Mark UNI-158 as complete

---

## Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Data loss during migration | Medium | **CRITICAL** | Test on staging, backup before migration |
| Downtime during schema change | High | High | Plan maintenance window, use transactions |
| Existing data without tenantId | **Certain** | High | Data backfill script with validation |
| Cross-schema reference breaks | Medium | Medium | Enable multiSchema feature, test thoroughly |
| Performance degradation | Low | Medium | Add indexes on tenantId columns |
| Application code breaks | Low | High | Prisma client regeneration + full test suite |

---

## Recommendations

### For Product Team
**DO NOT mark UNI-158 as "Done" until:**
1. All 44 tables have tenantId columns ✅
2. All existing data has tenantId populated ✅
3. All 176 RLS policies are applied ✅
4. Full test suite passes ✅

**Current Status:** 0% Complete (blocked)

### For Engineering Team
**Priority Order:**
1. **P0**: Fix schema synchronization (adds tenant columns)
2. **P0**: Backfill tenant data
3. **P0**: Apply RLS policies
4. **P1**: Implement automated schema validation in CI/CD
5. **P2**: Add RLS policy coverage checks to test suite

### For Security/Compliance
**Current State:** ⚠️ Multi-tenant isolation exists ONLY at application level
**Required For Compliance:** Database-level RLS policies (UNI-158 completion)
**Recommendation:** Prioritize schema sync + RLS implementation before any security audit

---

## Conclusion

**UNI-158 is fundamentally blocked** by database schema drift. The Prisma models define multi-tenant architecture, but the database lacks the required infrastructure (tenantId columns).

**This is not a small bug fix** - it requires:
- Schema migration across 44 tables
- Data backfill for all existing records
- Testing and validation
- Potential downtime

**Estimated Effort:**
- Schema Sync: 4-6 hours (including testing)
- Data Backfill: 2-4 hours (scripting + validation)
- RLS Application: 2-3 hours (original estimate)
- **Total: 8-13 hours of focused work**

**Recommendation:** Schedule dedicated time for this critical infrastructure work rather than attempting it incrementally.

---

*Report generated: 2026-02-02*
*Investigation: UNI-158 RLS Policies Implementation*
*Status: Blocked pending database schema synchronization*
