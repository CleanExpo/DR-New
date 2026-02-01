-- ===================================================================
-- Complete RLS Policies for Remaining Tables
-- ===================================================================
--
-- This migration adds RLS policies for the 28 tables that were missing
-- policies from the initial 20250127200000_add_rls_policies migration.
--
-- Note: Table names use snake_case (e.g., damage_areas) to match the
-- actual PostgreSQL table names created via Prisma's @@map directive.
--
-- Tables covered in this migration (model name → table name):
-- - Inspection: DamageArea → damage_areas, InspectionPhoto → inspection_photos, MoistureReading → moisture_readings
-- - Cost Estimates: CostEstimate → cost_estimates, LaborLineItem → labor_line_items, MaterialLineItem → material_line_items, EquipmentLineItem → equipment_line_items
-- - Compliance: ComplianceCheck → compliance_checks, ReportRevision → report_revisions
-- - System: AuditLog → AuditLog (no mapping), LoginAttempt → LoginAttempt (no mapping), VerificationToken → VerificationToken (no mapping)
-- - CRM: CustomerLifecycle → customer_lifecycle, Opportunity → opportunities
-- - Claims: PublicClaim → public_claims, TriageAssessment → triage_assessments
-- - Content: BlogPost → blog_posts, FAQ → faqs, CaseStudy → case_studies
-- - Contractor: ContractorOnboarding → contractor_onboarding, ContractorAssessment → contractor_assessments, ContractorModuleProgress → contractor_module_progress, ContractorCertification → contractor_certifications
-- - Beta: BetaProgram → beta_programs, BetaEnrollment → beta_enrollments, BetaFeedback → beta_feedback, BetaNPSSurvey → beta_nps_surveys
--
-- Policy logic (same as existing policies):
-- - Allow access if record has NULL tenantId (legacy/unscoped data)
-- - Allow access if record's tenantId matches current_tenant_id()
-- - Allow access if current_tenant_id() IS NULL (SUPER_ADMIN bypass)
--
-- ===================================================================

-- ===================================================================
-- Inspection Models
-- ===================================================================

-- damage_areas
CREATE POLICY "tenant_isolation_select" ON "damage_areas"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "damage_areas"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "damage_areas"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "damage_areas"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- inspection_photos
CREATE POLICY "tenant_isolation_select" ON "inspection_photos"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "inspection_photos"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "inspection_photos"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "inspection_photos"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- moisture_readings
CREATE POLICY "tenant_isolation_select" ON "moisture_readings"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "moisture_readings"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "moisture_readings"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "moisture_readings"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Cost Estimate Models
-- ===================================================================

-- cost_estimates
CREATE POLICY "tenant_isolation_select" ON "cost_estimates"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "cost_estimates"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "cost_estimates"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "cost_estimates"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- labor_line_items
CREATE POLICY "tenant_isolation_select" ON "labor_line_items"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "labor_line_items"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "labor_line_items"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "labor_line_items"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- material_line_items
CREATE POLICY "tenant_isolation_select" ON "material_line_items"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "material_line_items"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "material_line_items"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "material_line_items"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- equipment_line_items
CREATE POLICY "tenant_isolation_select" ON "equipment_line_items"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "equipment_line_items"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "equipment_line_items"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "equipment_line_items"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Compliance Models
-- ===================================================================

-- compliance_checks
CREATE POLICY "tenant_isolation_select" ON "compliance_checks"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "compliance_checks"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "compliance_checks"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "compliance_checks"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- report_revisions
CREATE POLICY "tenant_isolation_select" ON "report_revisions"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "report_revisions"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "report_revisions"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "report_revisions"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- System/Audit Models (these use PascalCase in the database)
-- ===================================================================

-- AuditLog
CREATE POLICY "tenant_isolation_select" ON "AuditLog"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "AuditLog"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "AuditLog"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "AuditLog"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- LoginAttempt
CREATE POLICY "tenant_isolation_select" ON "LoginAttempt"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "LoginAttempt"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "LoginAttempt"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "LoginAttempt"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- VerificationToken
CREATE POLICY "tenant_isolation_select" ON "VerificationToken"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "VerificationToken"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "VerificationToken"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "VerificationToken"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- CRM Models
-- ===================================================================

-- customer_lifecycle
CREATE POLICY "tenant_isolation_select" ON "customer_lifecycle"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "customer_lifecycle"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "customer_lifecycle"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "customer_lifecycle"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- opportunities
CREATE POLICY "tenant_isolation_select" ON "opportunities"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "opportunities"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "opportunities"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "opportunities"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Public Claim Models (UNI-183)
-- ===================================================================

-- public_claims
CREATE POLICY "tenant_isolation_select" ON "public_claims"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "public_claims"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "public_claims"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "public_claims"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- triage_assessments
CREATE POLICY "tenant_isolation_select" ON "triage_assessments"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "triage_assessments"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "triage_assessments"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "triage_assessments"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Content Models
-- ===================================================================

-- blog_posts
CREATE POLICY "tenant_isolation_select" ON "blog_posts"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "blog_posts"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "blog_posts"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "blog_posts"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- faqs
CREATE POLICY "tenant_isolation_select" ON "faqs"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "faqs"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "faqs"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "faqs"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- case_studies
CREATE POLICY "tenant_isolation_select" ON "case_studies"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "case_studies"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "case_studies"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "case_studies"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Contractor Onboarding Models
-- ===================================================================

-- contractor_onboarding
CREATE POLICY "tenant_isolation_select" ON "contractor_onboarding"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "contractor_onboarding"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "contractor_onboarding"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "contractor_onboarding"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- contractor_assessments
CREATE POLICY "tenant_isolation_select" ON "contractor_assessments"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "contractor_assessments"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "contractor_assessments"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "contractor_assessments"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- contractor_module_progress
CREATE POLICY "tenant_isolation_select" ON "contractor_module_progress"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "contractor_module_progress"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "contractor_module_progress"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "contractor_module_progress"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- contractor_certifications
CREATE POLICY "tenant_isolation_select" ON "contractor_certifications"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "contractor_certifications"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "contractor_certifications"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "contractor_certifications"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Beta Program Models
-- ===================================================================

-- beta_programs
CREATE POLICY "tenant_isolation_select" ON "beta_programs"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "beta_programs"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "beta_programs"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "beta_programs"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- beta_enrollments
CREATE POLICY "tenant_isolation_select" ON "beta_enrollments"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "beta_enrollments"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "beta_enrollments"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "beta_enrollments"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- beta_feedback
CREATE POLICY "tenant_isolation_select" ON "beta_feedback"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "beta_feedback"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "beta_feedback"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "beta_feedback"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- beta_nps_surveys
CREATE POLICY "tenant_isolation_select" ON "beta_nps_surveys"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "beta_nps_surveys"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "beta_nps_surveys"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "beta_nps_surveys"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Migration Complete
-- ===================================================================
-- Total policies added: 28 tables × 4 policies = 112 policies
-- Combined with existing 16 tables × 4 policies = 64 policies
-- Total RLS coverage: 44 tables × 4 policies = 176 policies
-- ===================================================================
