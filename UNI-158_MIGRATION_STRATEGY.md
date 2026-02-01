# UNI-158: Database Schema Synchronization Strategy

**Date:** 2026-02-02
**Status:** Planning - Ready for Execution
**Est. Time:** 8-13 hours

---

## Objective

Synchronize Prisma schema with production database to enable Row-Level Security (RLS) policies for multi-tenant isolation.

**Goal:** Add `tenantId` columns to 44 tables, backfill existing data, and apply 176 RLS policies.

---

## Prerequisites

**Before Starting:**
- [ ] Full database backup created
- [ ] Staging environment available for testing
- [ ] Maintenance window scheduled (if required)
- [ ] All team members notified
- [ ] Rollback plan documented

---

## Strategy Overview

We'll use a **phased approach** with validation at each step:

1. **Phase 1:** Add tenantId Columns (Schema Migration)
2. **Phase 2:** Backfill Existing Data
3. **Phase 3:** Apply RLS Policies
4. **Phase 4:** Validate & Test
5. **Phase 5:** Cleanup & Documentation

---

## Phase 1: Add tenantId Columns

### Step 1.1: Fix Cross-Schema Reference Issue

**Problem:** `skill_executions` table references `auth.users`

**Solution:** Drop the foreign key constraint temporarily

```sql
-- Execute in production database
ALTER TABLE "skill_executions"
DROP CONSTRAINT IF EXISTS "skill_executions_user_id_fkey";
```

**Verification:**
```bash
cd apps/web
npx prisma db push --accept-data-loss --skip-generate 2>&1 | grep -i "error"
# Should return no errors about cross-schema references
```

### Step 1.2: Push Schema to Database

**Command:**
```bash
cd apps/web
npx prisma db push --accept-data-loss --skip-generate
```

**What This Does:**
- Adds `tenantId String?` column to all 44 tables
- Sets default value to NULL
- Does NOT populate values (that's Phase 2)

**Verification:**
```bash
node check-tenant-columns.js
# Should show tenantId column for all tables
```

**Expected Output:**
```
activities:
  - tenantId

Booking:
  - tenantId

AuditLog:
  - tenantId

damage_areas:
  - tenantId

cost_estimates:
  - tenantId
```

### Step 1.3: Regenerate Prisma Client

```bash
cd apps/web
npx prisma generate
```

### Step 1.4: Verify Application Still Works

```bash
npm run build
# Should complete without errors

npm run dev
# Test key endpoints:
# - GET /api/bookings
# - GET /api/contractors
# - POST /api/ratings
```

---

## Phase 2: Backfill Existing Data

### Step 2.1: Identify Tenant Relationships

**Create Data Lineage Map:**

```
PRIMARY SOURCES (have tenantId via user):
├── users (tenantId exists)
├── Booking (via clientId → users.id)
├── Contractor (via userId → users.id)
└── client_profiles (via userId → users.id)

SECONDARY SOURCES (derive from PRIMARY):
├── activities (via bookingId → Booking.tenantId)
├── tasks (via bookingId → Booking.tenantId)
├── Payments (via bookingId → Booking.tenantId)
├── InvoiceAU (via bookingId → Booking.tenantId)
├── Rating (via bookingId → Booking.tenantId)
└── ... (continue mapping)

TERTIARY SOURCES (derive from SECONDARY):
├── damage_areas (via inspectionReportId → InspectionReport → Booking)
├── inspection_photos (via inspectionReportId → InspectionReport → Booking)
└── ... (continue mapping)
```

### Step 2.2: Create Backfill Script

**File:** `apps/web/scripts/backfill-tenant-ids.sql`

```sql
-- ===================================================================
-- Backfill tenantId for all existing records
-- ===================================================================

BEGIN;

-- 1. PRIMARY: Update from users table
UPDATE "Booking" b
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE b."clientId" = u."id"
AND b."tenantId" IS NULL;

UPDATE "Contractor" c
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE c."userId" = u."id"
AND c."tenantId" IS NULL;

UPDATE "client_profiles" cp
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE cp."userId" = u."id"
AND cp."tenantId" IS NULL;

-- 2. SECONDARY: Update from Booking
UPDATE "activities" a
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE a."bookingId" = b."id"
AND a."tenantId" IS NULL;

UPDATE "tasks" t
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE t."bookingId" = b."id"
AND t."tenantId" IS NULL;

UPDATE "Payment" p
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE p."bookingId" = b."id"
AND p."tenantId" IS NULL;

UPDATE "InvoiceAU" i
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE i."bookingId" = b."id"
AND i."tenantId" IS NULL;

UPDATE "Rating" r
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE r."bookingId" = b."id"
AND r."tenantId" IS NULL;

UPDATE "InsuranceClaimAU" ic
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ic."bookingId" = b."id"
AND ic."tenantId" IS NULL;

UPDATE "InsuranceProvider" ip
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ip."bookingId" = b."id"
AND ip."tenantId" IS NULL;

-- 3. TERTIARY: Update from relations
UPDATE "inspection_reports" ir
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ir."bookingId" = b."id"
AND ir."tenantId" IS NULL;

UPDATE "damage_areas" da
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE da."inspectionReportId" = ir."id"
AND da."tenantId" IS NULL;

UPDATE "inspection_photos" ip
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE ip."inspectionReportId" = ir."id"
AND ip."tenantId" IS NULL;

UPDATE "moisture_readings" mr
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE mr."inspectionReportId" = ir."id"
AND mr."tenantId" IS NULL;

UPDATE "cost_estimates" ce
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE ce."inspectionReportId" = ir."id"
AND ce."tenantId" IS NULL;

UPDATE "labor_line_items" lli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE lli."costEstimateId" = ce."id"
AND lli."tenantId" IS NULL;

UPDATE "material_line_items" mli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE mli."costEstimateId" = ce."id"
AND mli."tenantId" IS NULL;

UPDATE "equipment_line_items" eli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE eli."costEstimateId" = ce."id"
AND eli."tenantId" IS NULL;

UPDATE "compliance_checks" cc
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE cc."inspectionReportId" = ir."id"
AND cc."tenantId" IS NULL;

UPDATE "report_revisions" rr
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE rr."reportId" = ir."id"
AND rr."tenantId" IS NULL;

-- 4. SYSTEM/AUDIT: Update from user context
UPDATE "AuditLog" al
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE al."performedBy" = u."id"
AND al."tenantId" IS NULL;

UPDATE "LoginAttempt" la
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE la."userId" = u."id"
AND la."tenantId" IS NULL;

UPDATE "VerificationToken" vt
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE vt."userId" = u."id"
AND vt."tenantId" IS NULL;

-- 5. CRM: Update from customer lifecycle
UPDATE "customer_lifecycle" cl
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE cl."customerId" = u."id"
AND cl."tenantId" IS NULL;

UPDATE "opportunities" o
SET "tenantId" = cl."tenantId"
FROM "customer_lifecycle" cl
WHERE o."customerLifecycleId" = cl."id"
AND o."tenantId" IS NULL;

-- 6. CLAIMS (UNI-183): Update from email matching (best effort)
UPDATE "public_claims" pc
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE pc."email" = u."email"
AND pc."tenantId" IS NULL;

UPDATE "triage_assessments" ta
SET "tenantId" = pc."tenantId"
FROM "public_claims" pc
WHERE ta."claimId" = pc."id"
AND ta."tenantId" IS NULL;

-- 7. CONTENT: Set to NULL or default tenant (decision needed)
-- Option A: Leave NULL (accessible to all tenants)
-- Option B: Assign to primary tenant
-- TODO: Decide on content tenant strategy

-- 8. CONTRACTOR ONBOARDING: Update from contractor
UPDATE "contractor_onboarding" co
SET "tenantId" = c."tenantId"
FROM "Contractor" c
WHERE co."contractorId" = c."id"
AND co."tenantId" IS NULL;

UPDATE "contractor_assessments" ca
SET "tenantId" = co."tenantId"
FROM "contractor_onboarding" co
WHERE ca."onboardingId" = co."id"
AND ca."tenantId" IS NULL;

UPDATE "contractor_module_progress" cmp
SET "tenantId" = co."tenantId"
FROM "contractor_onboarding" co
WHERE cmp."onboardingId" = co."id"
AND cmp."tenantId" IS NULL;

UPDATE "contractor_certifications" cc
SET "tenantId" = c."tenantId"
FROM "Contractor" c
WHERE cc."contractorId" = c."id"
AND cc."tenantId" IS NULL;

-- 9. BETA PROGRAMS: Update from user
UPDATE "beta_enrollments" be
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE be."userId" = u."id"
AND be."tenantId" IS NULL;

UPDATE "beta_feedback" bf
SET "tenantId" = be."tenantId"
FROM "beta_enrollments" be
WHERE bf."enrollmentId" = be."id"
AND bf."tenantId" IS NULL;

UPDATE "beta_nps_surveys" bns
SET "tenantId" = be."tenantId"
FROM "beta_enrollments" be
WHERE bns."enrollmentId" = be."id"
AND bns."tenantId" IS NULL;

-- 10. BETA PROGRAMS: Set to NULL or system tenant
UPDATE "beta_programs" bp
SET "tenantId" = NULL
WHERE bp."tenantId" IS NULL;
-- Or assign to system/platform tenant if one exists

COMMIT;
```

### Step 2.3: Validation Queries

```sql
-- Count records without tenantId per table
SELECT
  'Booking' as table_name,
  COUNT(*) as null_tenant_count
FROM "Booking"
WHERE "tenantId" IS NULL

UNION ALL

SELECT
  'activities' as table_name,
  COUNT(*) as null_tenant_count
FROM "activities"
WHERE "tenantId" IS NULL

UNION ALL

SELECT
  'Contractor' as table_name,
  COUNT(*) as null_tenant_count
FROM "Contractor"
WHERE "tenantId" IS NULL

-- ... repeat for all 44 tables

ORDER BY null_tenant_count DESC;
```

**Expected Result:** All counts should be 0 (or acceptable for content tables)

### Step 2.4: Execute Backfill

```bash
cd apps/web
npx prisma db execute --file scripts/backfill-tenant-ids.sql

# Verify
node scripts/validate-tenant-ids.js
```

---

## Phase 3: Apply RLS Policies

### Step 3.1: Fix First Migration

**Edit:** `apps/web/prisma/migrations/20250127200000_add_rls_policies/migration.sql`

**Changes:**
- Replace all PascalCase table names with snake_case (using @@map)
- Verify against actual database table names

### Step 3.2: Mark Migration as Applied

```bash
cd apps/web
npx prisma migrate resolve --applied 20250127200000_add_rls_policies
```

### Step 3.3: Apply Completion Migration

```bash
npx prisma migrate deploy
```

**This applies:** `20260202000000_complete_rls_policies` (already created)

### Step 3.4: Verify RLS Policies

**Create:** `apps/web/scripts/verify-rls-policies.js`

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verifyRLSPolicies() {
  const result = await prisma.$queryRaw`
    SELECT
      schemaname,
      tablename,
      policyname
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname
  `;

  console.log(`Found ${result.length} RLS policies`);
  console.log('Expected: 176 policies (44 tables × 4 policies)');

  const tableCount = new Set(result.map(r => r.tablename)).size;
  console.log(`Policies applied to ${tableCount} tables`);
  console.log('Expected: 44 tables');

  if (result.length === 176 && tableCount === 44) {
    console.log('✅ All RLS policies successfully applied!');
  } else {
    console.error('❌ Policy count mismatch - investigate');
  }

  prisma.$disconnect();
}

verifyRLSPolicies();
```

---

## Phase 4: Testing & Validation

### Step 4.1: Fix Test Suite

**File:** `apps/web/tests/rls-tenant-isolation.test.ts`

**Add missing fields:**
```typescript
const booking = await prisma.booking.create({
  data: {
    tenantId: TENANT_A_ID,
    clientId: `test-client-${Date.now()}`,  // ADD
    bookingDate: new Date(),
    status: 'CONFIRMED',
    australianServiceType: 'RESTORATION',   // ADD
  },
});
```

### Step 4.2: Run Tests

```bash
cd apps/web
npm test -- rls-tenant-isolation.test.ts
```

**Expected:** All 13 tests pass

### Step 4.3: Manual Verification

```bash
# Start dev server
npm run dev

# Test tenant isolation via API
curl -X GET 'http://localhost:3000/api/bookings' \
  -H 'Cookie: session=<tenant-a-session>'
# Should only return Tenant A bookings

curl -X GET 'http://localhost:3000/api/bookings' \
  -H 'Cookie: session=<tenant-b-session>'
# Should only return Tenant B bookings
```

---

## Phase 5: Cleanup & Documentation

### Step 5.1: Remove Temporary Scripts

```bash
rm apps/web/list-tables.js
rm apps/web/check-columns.js
rm apps/web/check-tenant-columns.js
```

### Step 5.2: Update Documentation

**Create:** `UNI-158_COMPLETION_SUMMARY.md`

Include:
- Final schema state
- RLS policy coverage (176 policies)
- Test results
- Performance impact (if any)
- Security improvements

### Step 5.3: Commit & Push

```bash
git add .
git commit -m "feat: Complete UNI-158 - Add tenantId columns and RLS policies for multi-tenant isolation

- Add tenantId column to all 44 tables
- Backfill existing data with correct tenant associations
- Apply 176 RLS policies (44 tables × 4 policies)
- Update tests to include required booking fields
- Verify all RLS policies applied successfully

Security improvement: Database-level tenant isolation now enforced via PostgreSQL RLS"

git push origin main
```

---

## Rollback Plan

**If anything goes wrong:**

### Rollback Step 1: Drop RLS Policies

```sql
-- Drop all RLS policies
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public')
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
    END LOOP;
END $$;

-- Disable RLS
-- (List of all 44 tables)
ALTER TABLE "activities" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" DISABLE ROW LEVEL SECURITY;
-- ... (continue for all tables)
```

### Rollback Step 2: Remove tenantId Columns

```sql
-- Only if absolutely necessary!
-- This will lose all tenant associations

ALTER TABLE "activities" DROP COLUMN IF EXISTS "tenantId";
ALTER TABLE "Booking" DROP COLUMN IF EXISTS "tenantId";
-- ... (continue for all tables)
```

### Rollback Step 3: Restore from Backup

```bash
# If all else fails, restore full database backup
pg_restore -h <host> -U <user> -d <database> <backup-file>
```

---

## Performance Considerations

### Indexes

After adding tenantId columns, add indexes for performance:

```sql
-- Add indexes on tenantId for frequently queried tables
CREATE INDEX CONCURRENTLY "idx_booking_tenant_id" ON "Booking"("tenantId");
CREATE INDEX CONCURRENTLY "idx_activities_tenant_id" ON "activities"("tenantId");
CREATE INDEX CONCURRENTLY "idx_contractor_tenant_id" ON "Contractor"("tenantId");
CREATE INDEX CONCURRENTLY "idx_rating_tenant_id" ON "Rating"("tenantId");
-- ... (continue for high-traffic tables)
```

**Note:** `CONCURRENTLY` allows index creation without locking the table

### Query Performance

**Before RLS:**
```sql
SELECT * FROM "Booking" WHERE "clientId" = '...';
-- Uses index on clientId
```

**After RLS:**
```sql
SELECT * FROM "Booking" WHERE "clientId" = '...' AND "tenantId" = '...';
-- Uses composite index on (tenantId, clientId) for optimal performance
```

**Recommendation:** Add composite indexes where needed after monitoring production queries

---

## Timeline Estimate

| Phase | Task | Time |
|-------|------|------|
| 1.1 | Fix cross-schema reference | 15min |
| 1.2 | Push schema (add columns) | 30min |
| 1.3 | Regenerate Prisma client | 5min |
| 1.4 | Verify application | 30min |
| 2.1 | Map tenant relationships | 1hr |
| 2.2 | Create backfill script | 2hr |
| 2.3 | Create validation queries | 30min |
| 2.4 | Execute & verify backfill | 1hr |
| 3.1 | Fix first migration | 30min |
| 3.2-3.3 | Apply both migrations | 30min |
| 3.4 | Verify RLS policies | 30min |
| 4.1 | Fix test suite | 30min |
| 4.2-4.3 | Run & validate tests | 1hr |
| 5.1-5.3 | Cleanup & documentation | 1hr |
| **Total** | | **10-11 hours** |

**Add buffer:** 2-3 hours for unexpected issues = **12-14 hours total**

---

## Success Criteria

**UNI-158 is COMPLETE when:**
- [ ] All 44 tables have tenantId column
- [ ] All existing records have tenantId populated (or NULL intentionally)
- [ ] All 176 RLS policies applied successfully
- [ ] `verify-rls-policies.js` shows 176 policies on 44 tables
- [ ] Test suite passes (13/13 tests)
- [ ] Manual API testing shows tenant isolation working
- [ ] No performance degradation observed
- [ ] Documentation updated
- [ ] Code committed and pushed

---

*Strategy documented: 2026-02-02*
*Ready for execution when approved*
