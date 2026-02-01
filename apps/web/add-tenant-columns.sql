-- Add tenantId columns to all tables that need them
-- This unblocks the RLS policy migrations

BEGIN;

-- Core tables
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

-- Public claim tables (UNI-183)
ALTER TABLE "public_claims" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "triage_assessments" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Content tables
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "faqs" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "case_studies" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

-- Beta program tables
ALTER TABLE "beta_programs" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_enrollments" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_feedback" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;
ALTER TABLE "beta_nps_surveys" ADD COLUMN IF NOT EXISTS "tenantId" TEXT;

COMMIT;

-- Verify columns were added
SELECT
  table_name,
  column_name,
  data_type
FROM information_schema.columns
WHERE column_name = 'tenantId'
AND table_schema = 'public'
ORDER BY table_name;
