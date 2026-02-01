-- ===================================================================
-- Backfill tenantId for all existing records
-- ===================================================================
--
-- PURPOSE: Populate tenantId columns for existing data based on relationships
-- WHEN TO RUN: After adding tenantId columns but before enforcing NOT NULL constraints
-- SAFETY: Uses transactions and NULL checks to prevent data loss
--
-- ===================================================================

BEGIN;

-- ===================================================================
-- PRIMARY SOURCES: Update from users table
-- ===================================================================

-- Booking (from client)
UPDATE "Booking" b
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE b."clientId" = u."id"
AND b."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- Contractor (from user)
UPDATE "Contractor" c
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE c."userId" = u."id"
AND c."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- client_profiles (from user)
UPDATE "client_profiles" cp
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE cp."userId" = u."id"
AND cp."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- contractor_profiles (from user)
UPDATE "contractor_profiles" cp
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE cp."userId" = u."id"
AND cp."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- ===================================================================
-- SECONDARY SOURCES: Update from Booking
-- ===================================================================

-- activities
UPDATE "activities" a
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE a."bookingId" = b."id"
AND a."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- tasks (Note: tasks are CRM-related via customerLifecycleId/opportunityId, not bookingId)
-- Will be backfilled via CRM section below

-- Payment
UPDATE "Payment" p
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE p."bookingId" = b."id"
AND p."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- InvoiceAU
UPDATE "InvoiceAU" i
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE i."bookingId" = b."id"
AND i."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- Rating
UPDATE "Rating" r
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE r."bookingId" = b."id"
AND r."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- InsuranceClaimAU
UPDATE "InsuranceClaimAU" ic
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ic."bookingId" = b."id"
AND ic."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- InsuranceProvider
UPDATE "InsuranceProvider" ip
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ip."bookingId" = b."id"
AND ip."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- inspection_reports
UPDATE "inspection_reports" ir
SET "tenantId" = b."tenantId"
FROM "Booking" b
WHERE ir."bookingId" = b."id"
AND ir."tenantId" IS NULL
AND b."tenantId" IS NOT NULL;

-- ===================================================================
-- TERTIARY SOURCES: Update from inspection_reports
-- ===================================================================

-- damage_areas
UPDATE "damage_areas" da
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE da."inspectionReportId" = ir."id"
AND da."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- inspection_photos
UPDATE "inspection_photos" ip
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE ip."inspectionReportId" = ir."id"
AND ip."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- moisture_readings
UPDATE "moisture_readings" mr
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE mr."inspectionReportId" = ir."id"
AND mr."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- cost_estimates
UPDATE "cost_estimates" ce
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE ce."inspectionReportId" = ir."id"
AND ce."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- compliance_checks
UPDATE "compliance_checks" cc
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE cc."inspectionReportId" = ir."id"
AND cc."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- report_revisions
UPDATE "report_revisions" rr
SET "tenantId" = ir."tenantId"
FROM "inspection_reports" ir
WHERE rr."reportId" = ir."id"
AND rr."tenantId" IS NULL
AND ir."tenantId" IS NOT NULL;

-- ===================================================================
-- QUATERNARY SOURCES: Update from cost_estimates
-- ===================================================================

-- labor_line_items
UPDATE "labor_line_items" lli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE lli."costEstimateId" = ce."id"
AND lli."tenantId" IS NULL
AND ce."tenantId" IS NOT NULL;

-- material_line_items
UPDATE "material_line_items" mli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE mli."costEstimateId" = ce."id"
AND mli."tenantId" IS NULL
AND ce."tenantId" IS NOT NULL;

-- equipment_line_items
UPDATE "equipment_line_items" eli
SET "tenantId" = ce."tenantId"
FROM "cost_estimates" ce
WHERE eli."costEstimateId" = ce."id"
AND eli."tenantId" IS NULL
AND ce."tenantId" IS NOT NULL;

-- ===================================================================
-- CLIENT RELATIONS: Update from client_profiles
-- ===================================================================

-- client_properties
UPDATE "client_properties" cp
SET "tenantId" = clp."tenantId"
FROM "client_profiles" clp
WHERE cp."clientProfileId" = clp."id"
AND cp."tenantId" IS NULL
AND clp."tenantId" IS NOT NULL;

-- client_insurance
UPDATE "client_insurance" ci
SET "tenantId" = clp."tenantId"
FROM "client_profiles" clp
WHERE ci."clientProfileId" = clp."id"
AND ci."tenantId" IS NULL
AND clp."tenantId" IS NOT NULL;

-- client_payments
UPDATE "client_payments" cp
SET "tenantId" = clp."tenantId"
FROM "client_profiles" clp
WHERE cp."clientId" = clp."userId"
AND cp."tenantId" IS NULL
AND clp."tenantId" IS NOT NULL;

-- client_onboarding
UPDATE "client_onboarding" co
SET "tenantId" = clp."tenantId"
FROM "client_profiles" clp
WHERE co."clientId" = clp."userId"
AND co."tenantId" IS NULL
AND clp."tenantId" IS NOT NULL;

-- ===================================================================
-- CONTRACTOR RELATIONS: Update from Contractor
-- ===================================================================

-- contractor_onboarding
UPDATE "contractor_onboarding" co
SET "tenantId" = c."tenantId"
FROM "Contractor" c
WHERE co."contractorId" = c."id"
AND co."tenantId" IS NULL
AND c."tenantId" IS NOT NULL;

-- contractor_assessments
UPDATE "contractor_assessments" ca
SET "tenantId" = co."tenantId"
FROM "contractor_onboarding" co
WHERE ca."onboardingId" = co."id"
AND ca."tenantId" IS NULL
AND co."tenantId" IS NOT NULL;

-- contractor_module_progress
UPDATE "contractor_module_progress" cmp
SET "tenantId" = co."tenantId"
FROM "contractor_onboarding" co
WHERE cmp."onboardingId" = co."id"
AND cmp."tenantId" IS NULL
AND co."tenantId" IS NOT NULL;

-- contractor_certifications
UPDATE "contractor_certifications" cc
SET "tenantId" = c."tenantId"
FROM "Contractor" c
WHERE cc."contractorId" = c."id"
AND cc."tenantId" IS NULL
AND c."tenantId" IS NOT NULL;

-- ===================================================================
-- SYSTEM/AUDIT: Update from user context
-- ===================================================================

-- AuditLog
UPDATE "AuditLog" al
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE al."performedBy" = u."id"
AND al."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- LoginAttempt
UPDATE "LoginAttempt" la
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE la."userId" = u."id"
AND la."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- VerificationToken
UPDATE "VerificationToken" vt
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE vt."userId" = u."id"
AND vt."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- messages
UPDATE "messages" m
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE m."senderId" = u."id"
AND m."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- service_requests
UPDATE "service_requests" sr
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE sr."userId" = u."id"
AND sr."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- ===================================================================
-- CRM: Update from customer lifecycle
-- ===================================================================

-- customer_lifecycle
UPDATE "customer_lifecycle" cl
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE cl."customerId" = u."id"
AND cl."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- opportunities
UPDATE "opportunities" o
SET "tenantId" = cl."tenantId"
FROM "customer_lifecycle" cl
WHERE o."customerLifecycleId" = cl."id"
AND o."tenantId" IS NULL
AND cl."tenantId" IS NOT NULL;

-- tasks (from customerLifecycle)
UPDATE "tasks" t
SET "tenantId" = cl."tenantId"
FROM "customer_lifecycle" cl
WHERE t."customerLifecycleId" = cl."id"
AND t."tenantId" IS NULL
AND cl."tenantId" IS NOT NULL;

-- tasks (from opportunities)
UPDATE "tasks" t
SET "tenantId" = o."tenantId"
FROM "opportunities" o
WHERE t."opportunityId" = o."id"
AND t."tenantId" IS NULL
AND o."tenantId" IS NOT NULL;

-- ===================================================================
-- BETA PROGRAM: Update from user
-- ===================================================================

-- beta_enrollments
UPDATE "beta_enrollments" be
SET "tenantId" = u."tenantId"
FROM "users" u
WHERE be."userId" = u."id"
AND be."tenantId" IS NULL
AND u."tenantId" IS NOT NULL;

-- beta_feedback
UPDATE "beta_feedback" bf
SET "tenantId" = be."tenantId"
FROM "beta_enrollments" be
WHERE bf."enrollmentId" = be."id"
AND bf."tenantId" IS NULL
AND be."tenantId" IS NOT NULL;

-- beta_nps_surveys
UPDATE "beta_nps_surveys" bns
SET "tenantId" = be."tenantId"
FROM "beta_enrollments" be
WHERE bns."enrollmentId" = be."id"
AND bns."tenantId" IS NULL
AND be."tenantId" IS NOT NULL;

-- ===================================================================
-- CONTENT: Set to NULL (shared across tenants) or system tenant
-- ===================================================================

-- blog_posts - Keep NULL for cross-tenant content
-- UPDATE "blog_posts" SET "tenantId" = NULL WHERE "tenantId" IS NULL;

-- faqs - Keep NULL for cross-tenant content
-- UPDATE "faqs" SET "tenantId" = NULL WHERE "tenantId" IS NULL;

-- case_studies - Keep NULL for cross-tenant content
-- UPDATE "case_studies" SET "tenantId" = NULL WHERE "tenantId" IS NULL;

-- beta_programs - Keep NULL for platform-wide programs
-- UPDATE "beta_programs" SET "tenantId" = NULL WHERE "tenantId" IS NULL;

-- ===================================================================
-- TENANT CONFIG: Should already have tenantId
-- ===================================================================

-- tenant_configurations - Each config should already have tenantId from creation
-- No backfill needed

COMMIT;

-- ===================================================================
-- VALIDATION QUERIES
-- ===================================================================

-- Run these after backfill to verify:

-- Count nulls per table
-- SELECT 'Booking' as table_name, COUNT(*) as null_count FROM "Booking" WHERE "tenantId" IS NULL
-- UNION ALL
-- SELECT 'activities', COUNT(*) FROM "activities" WHERE "tenantId" IS NULL
-- ... (repeat for all tables)

-- Check orphaned records (records with null tenantId that should have one)
-- SELECT COUNT(*) FROM "Booking" WHERE "tenantId" IS NULL;
-- SELECT COUNT(*) FROM "activities" WHERE "tenantId" IS NULL;
