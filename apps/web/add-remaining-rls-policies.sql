-- Add RLS policies for remaining tables that have tenantId but no policies yet
-- This completes the RLS coverage for UNI-158

BEGIN;

-- ===================================================================
-- Core Business Tables
-- ===================================================================

-- Booking
CREATE POLICY "tenant_isolation_select" ON "Booking"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "Booking"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "Booking"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "Booking"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- Payment
CREATE POLICY "tenant_isolation_select" ON "Payment"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "Payment"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "Payment"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "Payment"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- InvoiceAU
CREATE POLICY "tenant_isolation_select" ON "InvoiceAU"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "InvoiceAU"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "InvoiceAU"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "InvoiceAU"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- activities
CREATE POLICY "tenant_isolation_select" ON "activities"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "activities"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "activities"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "activities"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- tasks
CREATE POLICY "tenant_isolation_select" ON "tasks"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "tasks"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "tasks"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "tasks"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Contractor Tables
-- ===================================================================

-- Contractor
CREATE POLICY "tenant_isolation_select" ON "Contractor"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "Contractor"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "Contractor"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "Contractor"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- contractor_profiles
CREATE POLICY "tenant_isolation_select" ON "contractor_profiles"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "contractor_profiles"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "contractor_profiles"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "contractor_profiles"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Client Tables
-- ===================================================================

-- client_profiles
CREATE POLICY "tenant_isolation_select" ON "client_profiles"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "client_profiles"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "client_profiles"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "client_profiles"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- client_properties
CREATE POLICY "tenant_isolation_select" ON "client_properties"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "client_properties"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "client_properties"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "client_properties"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- client_insurance
CREATE POLICY "tenant_isolation_select" ON "client_insurance"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "client_insurance"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "client_insurance"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "client_insurance"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- client_payments
CREATE POLICY "tenant_isolation_select" ON "client_payments"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "client_payments"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "client_payments"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "client_payments"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- client_onboarding
CREATE POLICY "tenant_isolation_select" ON "client_onboarding"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "client_onboarding"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "client_onboarding"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "client_onboarding"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Insurance Tables
-- ===================================================================

-- InsuranceClaimAU
CREATE POLICY "tenant_isolation_select" ON "InsuranceClaimAU"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "InsuranceClaimAU"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "InsuranceClaimAU"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "InsuranceClaimAU"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- InsuranceProvider
CREATE POLICY "tenant_isolation_select" ON "InsuranceProvider"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "InsuranceProvider"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "InsuranceProvider"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "InsuranceProvider"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Rating Table
-- ===================================================================

-- Rating
CREATE POLICY "tenant_isolation_select" ON "Rating"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "Rating"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "Rating"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "Rating"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- Inspection Tables
-- ===================================================================

-- inspection_reports
CREATE POLICY "tenant_isolation_select" ON "inspection_reports"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "inspection_reports"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "inspection_reports"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "inspection_reports"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- ===================================================================
-- System Tables
-- ===================================================================

-- users (special case - may need different policy)
CREATE POLICY "tenant_isolation_select" ON "users"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "users"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "users"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "users"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- messages
CREATE POLICY "tenant_isolation_select" ON "messages"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "messages"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "messages"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "messages"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- service_requests
CREATE POLICY "tenant_isolation_select" ON "service_requests"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "service_requests"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "service_requests"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "service_requests"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

-- tenant_configurations
CREATE POLICY "tenant_isolation_select" ON "tenant_configurations"
  FOR SELECT USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_insert" ON "tenant_configurations"
  FOR INSERT WITH CHECK ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_update" ON "tenant_configurations"
  FOR UPDATE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);
CREATE POLICY "tenant_isolation_delete" ON "tenant_configurations"
  FOR DELETE USING ("tenantId" IS NULL OR "tenantId" = current_tenant_id() OR current_tenant_id() IS NULL);

COMMIT;
