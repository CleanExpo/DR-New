# SQL Migration Audit Report

**Date:** 2026-01-28
**Auditor:** Claude Sonnet 4.5
**Total Migrations:** 10 files

## Migration Files Summary

| File | Status | Description | Issues |
|------|--------|-------------|--------|
| `20250127200000_add_rls_policies/migration.sql` | ⚠️ Incomplete | RLS policies for multi-tenant isolation | Missing policies for ~20 tables |
| `20250916043401_initalize_schema/migration.sql` | ✅ Good | Initial users table | None |
| `20250921080802_add_admin_user_type/migration.sql` | ✅ Good | Service requests, contractors, matches | None |
| `20250928045119_add_tenant_system/migration.sql` | ✅ Good | Tenant tables and foreign keys | None |
| `20250928111331_add_user_preferences/migration.sql` | ✅ Good | User preferences table | None |
| `20250928113202_add_admin_preferences_and_theming/migration.sql` | ✅ Good | Admin UI tables | None |
| `20251231180000_fix_contractor_onboarding_contractor_id/migration.sql` | ✅ Good | Fix contractor ID types | None |
| `20251231190000_add_callout_payment/migration.sql` | ✅ Good | Callout payment tracking | None |
| `add_public_api_tables.sql` | ⚠️ Warning | Public API tables (leads, triage, newsletter) | Missing IF NOT EXISTS clauses |
| `contractor_onboarding.sql` | ⚠️ Redundant | Contractor onboarding tables | Conflicts with migration 7 |

## Critical Issues

### 1. Incomplete RLS Policies (HIGH PRIORITY)

**File:** `20250127200000_add_rls_policies/migration.sql`
**Issue:** Only ~15 tables have explicit RLS policies created. The migration comment states:

```sql
-- Continue pattern for remaining 20+ tables...
-- DamageArea, InspectionPhoto, MoistureReading, CostEstimate, LaborLineItem,
-- MaterialLineItem, EquipmentLineItem, ComplianceCheck, ReportRevision, AuditLog,
-- CustomerLifecycle, Opportunity, PublicClaim, TriageAssessment, BlogPost, FAQ,
-- CaseStudy, LoginAttempt, VerificationToken, ContractorOnboarding, ContractorAssessment,
-- ContractorModuleProgress, ContractorCertification, BetaProgram, BetaEnrollment,
-- BetaFeedback, BetaNPSSurvey
```

**Missing Policies For:**
- ContractorOnboarding
- ContractorAssessment
- ContractorModuleProgress
- ContractorCertification
- ClientProperty
- ClientInsurance
- ClientPayment
- ClientOnboarding
- DamageArea
- InspectionPhoto
- MoistureReading
- CostEstimate
- LaborLineItem
- MaterialLineItem
- EquipmentLineItem
- ComplianceCheck
- ReportRevision
- AuditLog
- LoginAttempt
- VerificationToken
- CustomerLifecycle
- Opportunity
- PublicClaim
- TriageAssessment
- BlogPost
- FAQ
- CaseStudy
- BetaProgram
- BetaEnrollment
- BetaFeedback
- BetaNPSSurvey

**Impact:** Without RLS policies, these tables are vulnerable to cross-tenant data leakage at the database level (though application-level scoping still provides protection).

**Recommendation:** Complete the RLS policy creation for all remaining tables.

---

### 2. Non-Idempotent Migration (MEDIUM PRIORITY)

**File:** `add_public_api_tables.sql`
**Issue:** Uses `CREATE TABLE` without `IF NOT EXISTS` clause.

**Problem Lines:**
```sql
CREATE TABLE "LeadCapture" (...);
CREATE TABLE "TriageAssessment" (...);
CREATE TABLE "NewsletterSubscription" (...);
CREATE TABLE "ContractorInquiry" (...);
```

**Impact:** Re-running this migration will fail with "table already exists" errors.

**Recommendation:** Add `IF NOT EXISTS` to all CREATE TABLE statements.

---

### 3. Potentially Redundant Migration (LOW PRIORITY)

**File:** `contractor_onboarding.sql`
**Issue:** Creates contractor onboarding tables with UUID primary keys, but migration `20251231180000_fix_contractor_onboarding_contractor_id/migration.sql` later fixes the contractorId column type from UUID to TEXT.

**Sequence:**
1. `contractor_onboarding.sql` creates tables with `id UUID` and `contractorId TEXT`
2. `20251231180000_fix...` alters `contractorId` type to TEXT (but it's already TEXT?)

**Confusion:** The fix migration assumes contractorId was UUID, but the creation script shows it as TEXT.

**Recommendation:**
- If `contractor_onboarding.sql` runs first, the fix migration is unnecessary
- If the fix migration is needed, then `contractor_onboarding.sql` may be outdated
- Clarify the migration order or consolidate these files

---

## Tables Requiring RLS Policies

Based on the schema and existing patterns, these tables need RLS policies added:

### Contractor Models (7 tables)
- ContractorOnboarding
- ContractorAssessment
- ContractorModuleProgress
- ContractorCertification
- ContractorMatch (✅ Already has policies)
- Contractor (✅ Already has policies)

### Client Models (4 tables - Partially Complete)
- ClientProfile (✅ Already has policies)
- ClientProperty (⚠️ Partial - only condensed format)
- ClientInsurance (⚠️ Partial - only condensed format)
- ClientPayment (⚠️ Partial - only condensed format)
- ClientOnboarding (⚠️ Partial - only condensed format)

### Inspection & Cost Models (8 tables)
- DamageArea
- InspectionPhoto
- MoistureReading
- CostEstimate
- LaborLineItem
- MaterialLineItem
- EquipmentLineItem

### Compliance & Audit (4 tables)
- ComplianceCheck
- ReportRevision
- AuditLog (needs special consideration for performance)
- LoginAttempt

### CRM Models (2 tables)
- CustomerLifecycle
- Opportunity

### Public API Models (2 tables)
- PublicClaim
- TriageAssessment

### Content Models (3 tables)
- BlogPost
- FAQ
- CaseStudy

### Beta Program (4 tables)
- BetaProgram
- BetaEnrollment
- BetaFeedback
- BetaNPSSurvey

### System Models (1 table)
- VerificationToken

---

## Recommendations

### Immediate Actions

1. **Complete RLS Policies** ✅ HIGH
   - Create comprehensive RLS policy migration for all remaining tables
   - Test with multiple tenants to verify isolation
   - Priority tables: ContractorOnboarding, AuditLog, CustomerLifecycle

2. **Fix add_public_api_tables.sql** ✅ MEDIUM
   - Add IF NOT EXISTS to all CREATE TABLE statements
   - Add IF NOT EXISTS to all CREATE INDEX statements
   - Test idempotency by running twice

3. **Clarify contractor_onboarding.sql** ✅ LOW
   - Determine if this file should be removed
   - Or update fix migration to match actual schema
   - Document the intended migration order

### Future Improvements

4. **Add Migration Testing** 🔄
   - Create test script to run all migrations on clean database
   - Verify idempotency (all migrations can run twice)
   - Check RLS policy effectiveness with test tenants

5. **Document Migration Process** 📝
   - Add MIGRATION_GUIDE.md with best practices
   - Document naming convention (timestamp prefix)
   - Explain RLS policy patterns

6. **Consider Squashing Old Migrations** 🗜️
   - Once in production, consider squashing early migrations
   - Create single "initial schema" migration
   - Keep only recent incremental migrations

---

## Testing Checklist

Before deploying to production:

- [ ] Run all migrations on clean Postgres instance
- [ ] Verify all tables have RLS enabled
- [ ] Test RLS policies with 2+ test tenants
- [ ] Verify cross-tenant queries fail
- [ ] Test idempotency (run all migrations twice)
- [ ] Check for foreign key constraint violations
- [ ] Verify indexes are created properly
- [ ] Test rollback procedures (if applicable)
- [ ] Performance test RLS policies with large datasets
- [ ] Document any manual steps required

---

## Migration Order

Correct execution order:
1. `20250916043401_initalize_schema` - Creates users table
2. `20250921080802_add_admin_user_type` - Adds ADMIN type, service requests, contractors
3. `20250928045119_add_tenant_system` - Adds tenant system
4. `20250928111331_add_user_preferences` - User preferences
5. `20250928113202_add_admin_preferences_and_theming` - Admin tables
6. `contractor_onboarding.sql` - Contractor onboarding tables
7. `20251231180000_fix_contractor_onboarding_contractor_id` - Fix contractor IDs
8. `20251231190000_add_callout_payment` - Callout payments
9. `add_public_api_tables.sql` - Public API tables
10. `20250127200000_add_rls_policies` - RLS policies (should be LAST)

**Note:** RLS policies should always be applied AFTER all tables are created.

---

## Status

**Overall Status:** ⚠️ Needs Attention
**Blocking Issues:** None (RLS is defense-in-depth, application layer provides primary isolation)
**Recommended Before Production:** Complete RLS policies for all tenant-scoped tables
