-- Add tenantId columns ONLY to tables that actually exist in the database
-- Excludes tables that are defined in Prisma but not yet migrated

BEGIN;

-- Core tables (verified to exist)
ALTER TABLE "Booking" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "Payment" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "InvoiceAU" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "tasks" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "Rating" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Contractor tables
ALTER TABLE "Contractor" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "contractor_onboarding" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "contractor_assessments" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "contractor_module_progress" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "contractor_certifications" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Client tables
ALTER TABLE "client_profiles" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "client_properties" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "client_insurance" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "client_payments" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "client_onboarding" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Insurance tables
ALTER TABLE "InsuranceClaimAU" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "InsuranceProvider" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Inspection tables
ALTER TABLE "inspection_reports" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "damage_areas" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "inspection_photos" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "moisture_readings" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Cost estimate tables
ALTER TABLE "cost_estimates" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "labor_line_items" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "material_line_items" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "equipment_line_items" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Compliance tables
ALTER TABLE "compliance_checks" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "report_revisions" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- System/Audit tables
ALTER TABLE "AuditLog" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "LoginAttempt" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "VerificationToken" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- CRM tables
ALTER TABLE "customer_lifecycle" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "opportunities" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "activities" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Content tables
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Beta program tables
ALTER TABLE "beta_programs" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_enrollments" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_feedback" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_nps_surveys" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- NOTE: The following tables are defined in Prisma schema but DO NOT exist in database yet:
-- - public_claims (UNI-183 not fully migrated)
-- - triage_assessments (UNI-183 not fully migrated)
-- These need separate migration from Prisma schema

COMMIT;
