-- DR-936: reinstate multi-tenant RLS after the baseline squash (PR #223).
-- The squashed baseline (migrate diff --from-empty) carries no RLS (Prisma
-- does not model row-level security). This trailing migration re-applies the
-- tenant-isolation policies from the archived 20250127200000_add_rls_policies /
-- 20260202000000_complete_rls_policies, regenerated against the CURRENT physical
-- schema: every table that declares a tenantId column gets RLS + the four
-- tenant_isolation policies. Idempotent (DROP POLICY IF EXISTS; ALTER ... IF
-- EXISTS) so it is safe to replay. On prod this migration is resolve --applied
-- (RLS already present); it runs for real only on fresh builds.

-- 55 tenant-scoped tables (derived from baseline tenantId columns).

CREATE OR REPLACE FUNCTION current_tenant_id() RETURNS TEXT AS $$
BEGIN
  RETURN NULLIF(current_setting('app.current_tenant_id', TRUE), '');
EXCEPTION
  WHEN OTHERS THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql STABLE;

GRANT EXECUTE ON FUNCTION current_tenant_id() TO PUBLIC;

ALTER TABLE IF EXISTS "AuditLog" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "AuditLog";
CREATE POLICY "tenant_isolation_select" ON "AuditLog" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "AuditLog";
CREATE POLICY "tenant_isolation_insert" ON "AuditLog" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "AuditLog";
CREATE POLICY "tenant_isolation_update" ON "AuditLog" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "AuditLog";
CREATE POLICY "tenant_isolation_delete" ON "AuditLog" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "Booking" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "Booking";
CREATE POLICY "tenant_isolation_select" ON "Booking" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "Booking";
CREATE POLICY "tenant_isolation_insert" ON "Booking" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "Booking";
CREATE POLICY "tenant_isolation_update" ON "Booking" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "Booking";
CREATE POLICY "tenant_isolation_delete" ON "Booking" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "Contractor" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "Contractor";
CREATE POLICY "tenant_isolation_select" ON "Contractor" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "Contractor";
CREATE POLICY "tenant_isolation_insert" ON "Contractor" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "Contractor";
CREATE POLICY "tenant_isolation_update" ON "Contractor" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "Contractor";
CREATE POLICY "tenant_isolation_delete" ON "Contractor" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "InsuranceClaimAU" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "InsuranceClaimAU";
CREATE POLICY "tenant_isolation_select" ON "InsuranceClaimAU" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "InsuranceClaimAU";
CREATE POLICY "tenant_isolation_insert" ON "InsuranceClaimAU" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "InsuranceClaimAU";
CREATE POLICY "tenant_isolation_update" ON "InsuranceClaimAU" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "InsuranceClaimAU";
CREATE POLICY "tenant_isolation_delete" ON "InsuranceClaimAU" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "InsuranceProvider" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "InsuranceProvider";
CREATE POLICY "tenant_isolation_select" ON "InsuranceProvider" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "InsuranceProvider";
CREATE POLICY "tenant_isolation_insert" ON "InsuranceProvider" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "InsuranceProvider";
CREATE POLICY "tenant_isolation_update" ON "InsuranceProvider" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "InsuranceProvider";
CREATE POLICY "tenant_isolation_delete" ON "InsuranceProvider" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "InvoiceAU" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "InvoiceAU";
CREATE POLICY "tenant_isolation_select" ON "InvoiceAU" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "InvoiceAU";
CREATE POLICY "tenant_isolation_insert" ON "InvoiceAU" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "InvoiceAU";
CREATE POLICY "tenant_isolation_update" ON "InvoiceAU" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "InvoiceAU";
CREATE POLICY "tenant_isolation_delete" ON "InvoiceAU" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "LoginAttempt" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "LoginAttempt";
CREATE POLICY "tenant_isolation_select" ON "LoginAttempt" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "LoginAttempt";
CREATE POLICY "tenant_isolation_insert" ON "LoginAttempt" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "LoginAttempt";
CREATE POLICY "tenant_isolation_update" ON "LoginAttempt" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "LoginAttempt";
CREATE POLICY "tenant_isolation_delete" ON "LoginAttempt" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "Payment" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "Payment";
CREATE POLICY "tenant_isolation_select" ON "Payment" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "Payment";
CREATE POLICY "tenant_isolation_insert" ON "Payment" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "Payment";
CREATE POLICY "tenant_isolation_update" ON "Payment" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "Payment";
CREATE POLICY "tenant_isolation_delete" ON "Payment" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "Rating" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "Rating";
CREATE POLICY "tenant_isolation_select" ON "Rating" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "Rating";
CREATE POLICY "tenant_isolation_insert" ON "Rating" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "Rating";
CREATE POLICY "tenant_isolation_update" ON "Rating" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "Rating";
CREATE POLICY "tenant_isolation_delete" ON "Rating" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "VerificationToken" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "VerificationToken";
CREATE POLICY "tenant_isolation_select" ON "VerificationToken" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "VerificationToken";
CREATE POLICY "tenant_isolation_insert" ON "VerificationToken" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "VerificationToken";
CREATE POLICY "tenant_isolation_update" ON "VerificationToken" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "VerificationToken";
CREATE POLICY "tenant_isolation_delete" ON "VerificationToken" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "activities" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "activities";
CREATE POLICY "tenant_isolation_select" ON "activities" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "activities";
CREATE POLICY "tenant_isolation_insert" ON "activities" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "activities";
CREATE POLICY "tenant_isolation_update" ON "activities" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "activities";
CREATE POLICY "tenant_isolation_delete" ON "activities" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "ai_batch_processing_jobs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "ai_batch_processing_jobs";
CREATE POLICY "tenant_isolation_select" ON "ai_batch_processing_jobs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "ai_batch_processing_jobs";
CREATE POLICY "tenant_isolation_insert" ON "ai_batch_processing_jobs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "ai_batch_processing_jobs";
CREATE POLICY "tenant_isolation_update" ON "ai_batch_processing_jobs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "ai_batch_processing_jobs";
CREATE POLICY "tenant_isolation_delete" ON "ai_batch_processing_jobs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "ai_image_enhancement_logs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "ai_image_enhancement_logs";
CREATE POLICY "tenant_isolation_select" ON "ai_image_enhancement_logs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "ai_image_enhancement_logs";
CREATE POLICY "tenant_isolation_insert" ON "ai_image_enhancement_logs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "ai_image_enhancement_logs";
CREATE POLICY "tenant_isolation_update" ON "ai_image_enhancement_logs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "ai_image_enhancement_logs";
CREATE POLICY "tenant_isolation_delete" ON "ai_image_enhancement_logs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "audit_logs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "audit_logs";
CREATE POLICY "tenant_isolation_select" ON "audit_logs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "audit_logs";
CREATE POLICY "tenant_isolation_insert" ON "audit_logs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "audit_logs";
CREATE POLICY "tenant_isolation_update" ON "audit_logs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "audit_logs";
CREATE POLICY "tenant_isolation_delete" ON "audit_logs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "background_jobs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "background_jobs";
CREATE POLICY "tenant_isolation_select" ON "background_jobs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "background_jobs";
CREATE POLICY "tenant_isolation_insert" ON "background_jobs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "background_jobs";
CREATE POLICY "tenant_isolation_update" ON "background_jobs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "background_jobs";
CREATE POLICY "tenant_isolation_delete" ON "background_jobs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "beta_enrollments" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "beta_enrollments";
CREATE POLICY "tenant_isolation_select" ON "beta_enrollments" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "beta_enrollments";
CREATE POLICY "tenant_isolation_insert" ON "beta_enrollments" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "beta_enrollments";
CREATE POLICY "tenant_isolation_update" ON "beta_enrollments" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "beta_enrollments";
CREATE POLICY "tenant_isolation_delete" ON "beta_enrollments" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "beta_feedback" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "beta_feedback";
CREATE POLICY "tenant_isolation_select" ON "beta_feedback" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "beta_feedback";
CREATE POLICY "tenant_isolation_insert" ON "beta_feedback" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "beta_feedback";
CREATE POLICY "tenant_isolation_update" ON "beta_feedback" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "beta_feedback";
CREATE POLICY "tenant_isolation_delete" ON "beta_feedback" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "beta_nps_surveys" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "beta_nps_surveys";
CREATE POLICY "tenant_isolation_select" ON "beta_nps_surveys" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "beta_nps_surveys";
CREATE POLICY "tenant_isolation_insert" ON "beta_nps_surveys" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "beta_nps_surveys";
CREATE POLICY "tenant_isolation_update" ON "beta_nps_surveys" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "beta_nps_surveys";
CREATE POLICY "tenant_isolation_delete" ON "beta_nps_surveys" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "beta_programs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "beta_programs";
CREATE POLICY "tenant_isolation_select" ON "beta_programs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "beta_programs";
CREATE POLICY "tenant_isolation_insert" ON "beta_programs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "beta_programs";
CREATE POLICY "tenant_isolation_update" ON "beta_programs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "beta_programs";
CREATE POLICY "tenant_isolation_delete" ON "beta_programs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "blog_posts" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "blog_posts";
CREATE POLICY "tenant_isolation_select" ON "blog_posts" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "blog_posts";
CREATE POLICY "tenant_isolation_insert" ON "blog_posts" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "blog_posts";
CREATE POLICY "tenant_isolation_update" ON "blog_posts" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "blog_posts";
CREATE POLICY "tenant_isolation_delete" ON "blog_posts" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "case_studies" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "case_studies";
CREATE POLICY "tenant_isolation_select" ON "case_studies" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "case_studies";
CREATE POLICY "tenant_isolation_insert" ON "case_studies" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "case_studies";
CREATE POLICY "tenant_isolation_update" ON "case_studies" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "case_studies";
CREATE POLICY "tenant_isolation_delete" ON "case_studies" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "client_insurance" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "client_insurance";
CREATE POLICY "tenant_isolation_select" ON "client_insurance" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "client_insurance";
CREATE POLICY "tenant_isolation_insert" ON "client_insurance" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "client_insurance";
CREATE POLICY "tenant_isolation_update" ON "client_insurance" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "client_insurance";
CREATE POLICY "tenant_isolation_delete" ON "client_insurance" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "client_onboarding" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "client_onboarding";
CREATE POLICY "tenant_isolation_select" ON "client_onboarding" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "client_onboarding";
CREATE POLICY "tenant_isolation_insert" ON "client_onboarding" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "client_onboarding";
CREATE POLICY "tenant_isolation_update" ON "client_onboarding" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "client_onboarding";
CREATE POLICY "tenant_isolation_delete" ON "client_onboarding" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "client_payments" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "client_payments";
CREATE POLICY "tenant_isolation_select" ON "client_payments" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "client_payments";
CREATE POLICY "tenant_isolation_insert" ON "client_payments" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "client_payments";
CREATE POLICY "tenant_isolation_update" ON "client_payments" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "client_payments";
CREATE POLICY "tenant_isolation_delete" ON "client_payments" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "client_profiles" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "client_profiles";
CREATE POLICY "tenant_isolation_select" ON "client_profiles" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "client_profiles";
CREATE POLICY "tenant_isolation_insert" ON "client_profiles" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "client_profiles";
CREATE POLICY "tenant_isolation_update" ON "client_profiles" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "client_profiles";
CREATE POLICY "tenant_isolation_delete" ON "client_profiles" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "client_properties" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "client_properties";
CREATE POLICY "tenant_isolation_select" ON "client_properties" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "client_properties";
CREATE POLICY "tenant_isolation_insert" ON "client_properties" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "client_properties";
CREATE POLICY "tenant_isolation_update" ON "client_properties" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "client_properties";
CREATE POLICY "tenant_isolation_delete" ON "client_properties" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "compliance_checks" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "compliance_checks";
CREATE POLICY "tenant_isolation_select" ON "compliance_checks" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "compliance_checks";
CREATE POLICY "tenant_isolation_insert" ON "compliance_checks" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "compliance_checks";
CREATE POLICY "tenant_isolation_update" ON "compliance_checks" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "compliance_checks";
CREATE POLICY "tenant_isolation_delete" ON "compliance_checks" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_assessments" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_assessments";
CREATE POLICY "tenant_isolation_select" ON "contractor_assessments" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_assessments";
CREATE POLICY "tenant_isolation_insert" ON "contractor_assessments" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_assessments";
CREATE POLICY "tenant_isolation_update" ON "contractor_assessments" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_assessments";
CREATE POLICY "tenant_isolation_delete" ON "contractor_assessments" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_certifications" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_certifications";
CREATE POLICY "tenant_isolation_select" ON "contractor_certifications" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_certifications";
CREATE POLICY "tenant_isolation_insert" ON "contractor_certifications" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_certifications";
CREATE POLICY "tenant_isolation_update" ON "contractor_certifications" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_certifications";
CREATE POLICY "tenant_isolation_delete" ON "contractor_certifications" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_matches" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_matches";
CREATE POLICY "tenant_isolation_select" ON "contractor_matches" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_matches";
CREATE POLICY "tenant_isolation_insert" ON "contractor_matches" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_matches";
CREATE POLICY "tenant_isolation_update" ON "contractor_matches" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_matches";
CREATE POLICY "tenant_isolation_delete" ON "contractor_matches" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_module_progress" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_module_progress";
CREATE POLICY "tenant_isolation_select" ON "contractor_module_progress" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_module_progress";
CREATE POLICY "tenant_isolation_insert" ON "contractor_module_progress" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_module_progress";
CREATE POLICY "tenant_isolation_update" ON "contractor_module_progress" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_module_progress";
CREATE POLICY "tenant_isolation_delete" ON "contractor_module_progress" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_onboarding" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_onboarding";
CREATE POLICY "tenant_isolation_select" ON "contractor_onboarding" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_onboarding";
CREATE POLICY "tenant_isolation_insert" ON "contractor_onboarding" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_onboarding";
CREATE POLICY "tenant_isolation_update" ON "contractor_onboarding" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_onboarding";
CREATE POLICY "tenant_isolation_delete" ON "contractor_onboarding" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "contractor_profiles" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "contractor_profiles";
CREATE POLICY "tenant_isolation_select" ON "contractor_profiles" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "contractor_profiles";
CREATE POLICY "tenant_isolation_insert" ON "contractor_profiles" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "contractor_profiles";
CREATE POLICY "tenant_isolation_update" ON "contractor_profiles" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "contractor_profiles";
CREATE POLICY "tenant_isolation_delete" ON "contractor_profiles" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "cost_estimates" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "cost_estimates";
CREATE POLICY "tenant_isolation_select" ON "cost_estimates" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "cost_estimates";
CREATE POLICY "tenant_isolation_insert" ON "cost_estimates" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "cost_estimates";
CREATE POLICY "tenant_isolation_update" ON "cost_estimates" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "cost_estimates";
CREATE POLICY "tenant_isolation_delete" ON "cost_estimates" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "customer_lifecycle" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "customer_lifecycle";
CREATE POLICY "tenant_isolation_select" ON "customer_lifecycle" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "customer_lifecycle";
CREATE POLICY "tenant_isolation_insert" ON "customer_lifecycle" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "customer_lifecycle";
CREATE POLICY "tenant_isolation_update" ON "customer_lifecycle" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "customer_lifecycle";
CREATE POLICY "tenant_isolation_delete" ON "customer_lifecycle" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "damage_areas" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "damage_areas";
CREATE POLICY "tenant_isolation_select" ON "damage_areas" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "damage_areas";
CREATE POLICY "tenant_isolation_insert" ON "damage_areas" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "damage_areas";
CREATE POLICY "tenant_isolation_update" ON "damage_areas" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "damage_areas";
CREATE POLICY "tenant_isolation_delete" ON "damage_areas" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "equipment_line_items" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "equipment_line_items";
CREATE POLICY "tenant_isolation_select" ON "equipment_line_items" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "equipment_line_items";
CREATE POLICY "tenant_isolation_insert" ON "equipment_line_items" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "equipment_line_items";
CREATE POLICY "tenant_isolation_update" ON "equipment_line_items" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "equipment_line_items";
CREATE POLICY "tenant_isolation_delete" ON "equipment_line_items" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "faqs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "faqs";
CREATE POLICY "tenant_isolation_select" ON "faqs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "faqs";
CREATE POLICY "tenant_isolation_insert" ON "faqs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "faqs";
CREATE POLICY "tenant_isolation_update" ON "faqs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "faqs";
CREATE POLICY "tenant_isolation_delete" ON "faqs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "inspection_photos" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "inspection_photos";
CREATE POLICY "tenant_isolation_select" ON "inspection_photos" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "inspection_photos";
CREATE POLICY "tenant_isolation_insert" ON "inspection_photos" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "inspection_photos";
CREATE POLICY "tenant_isolation_update" ON "inspection_photos" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "inspection_photos";
CREATE POLICY "tenant_isolation_delete" ON "inspection_photos" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "inspection_reports" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "inspection_reports";
CREATE POLICY "tenant_isolation_select" ON "inspection_reports" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "inspection_reports";
CREATE POLICY "tenant_isolation_insert" ON "inspection_reports" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "inspection_reports";
CREATE POLICY "tenant_isolation_update" ON "inspection_reports" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "inspection_reports";
CREATE POLICY "tenant_isolation_delete" ON "inspection_reports" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "job_outcome_logs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "job_outcome_logs";
CREATE POLICY "tenant_isolation_select" ON "job_outcome_logs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "job_outcome_logs";
CREATE POLICY "tenant_isolation_insert" ON "job_outcome_logs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "job_outcome_logs";
CREATE POLICY "tenant_isolation_update" ON "job_outcome_logs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "job_outcome_logs";
CREATE POLICY "tenant_isolation_delete" ON "job_outcome_logs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "jobs" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "jobs";
CREATE POLICY "tenant_isolation_select" ON "jobs" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "jobs";
CREATE POLICY "tenant_isolation_insert" ON "jobs" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "jobs";
CREATE POLICY "tenant_isolation_update" ON "jobs" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "jobs";
CREATE POLICY "tenant_isolation_delete" ON "jobs" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "labor_line_items" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "labor_line_items";
CREATE POLICY "tenant_isolation_select" ON "labor_line_items" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "labor_line_items";
CREATE POLICY "tenant_isolation_insert" ON "labor_line_items" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "labor_line_items";
CREATE POLICY "tenant_isolation_update" ON "labor_line_items" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "labor_line_items";
CREATE POLICY "tenant_isolation_delete" ON "labor_line_items" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "material_line_items" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "material_line_items";
CREATE POLICY "tenant_isolation_select" ON "material_line_items" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "material_line_items";
CREATE POLICY "tenant_isolation_insert" ON "material_line_items" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "material_line_items";
CREATE POLICY "tenant_isolation_update" ON "material_line_items" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "material_line_items";
CREATE POLICY "tenant_isolation_delete" ON "material_line_items" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "messages" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "messages";
CREATE POLICY "tenant_isolation_select" ON "messages" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "messages";
CREATE POLICY "tenant_isolation_insert" ON "messages" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "messages";
CREATE POLICY "tenant_isolation_update" ON "messages" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "messages";
CREATE POLICY "tenant_isolation_delete" ON "messages" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "moisture_readings" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "moisture_readings";
CREATE POLICY "tenant_isolation_select" ON "moisture_readings" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "moisture_readings";
CREATE POLICY "tenant_isolation_insert" ON "moisture_readings" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "moisture_readings";
CREATE POLICY "tenant_isolation_update" ON "moisture_readings" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "moisture_readings";
CREATE POLICY "tenant_isolation_delete" ON "moisture_readings" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "opportunities" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "opportunities";
CREATE POLICY "tenant_isolation_select" ON "opportunities" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "opportunities";
CREATE POLICY "tenant_isolation_insert" ON "opportunities" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "opportunities";
CREATE POLICY "tenant_isolation_update" ON "opportunities" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "opportunities";
CREATE POLICY "tenant_isolation_delete" ON "opportunities" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "public_claims" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "public_claims";
CREATE POLICY "tenant_isolation_select" ON "public_claims" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "public_claims";
CREATE POLICY "tenant_isolation_insert" ON "public_claims" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "public_claims";
CREATE POLICY "tenant_isolation_update" ON "public_claims" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "public_claims";
CREATE POLICY "tenant_isolation_delete" ON "public_claims" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "report_revisions" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "report_revisions";
CREATE POLICY "tenant_isolation_select" ON "report_revisions" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "report_revisions";
CREATE POLICY "tenant_isolation_insert" ON "report_revisions" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "report_revisions";
CREATE POLICY "tenant_isolation_update" ON "report_revisions" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "report_revisions";
CREATE POLICY "tenant_isolation_delete" ON "report_revisions" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "service_requests" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "service_requests";
CREATE POLICY "tenant_isolation_select" ON "service_requests" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "service_requests";
CREATE POLICY "tenant_isolation_insert" ON "service_requests" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "service_requests";
CREATE POLICY "tenant_isolation_update" ON "service_requests" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "service_requests";
CREATE POLICY "tenant_isolation_delete" ON "service_requests" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "tasks" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "tasks";
CREATE POLICY "tenant_isolation_select" ON "tasks" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "tasks";
CREATE POLICY "tenant_isolation_insert" ON "tasks" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "tasks";
CREATE POLICY "tenant_isolation_update" ON "tasks" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "tasks";
CREATE POLICY "tenant_isolation_delete" ON "tasks" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "tenant_configurations" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "tenant_configurations";
CREATE POLICY "tenant_isolation_select" ON "tenant_configurations" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "tenant_configurations";
CREATE POLICY "tenant_isolation_insert" ON "tenant_configurations" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "tenant_configurations";
CREATE POLICY "tenant_isolation_update" ON "tenant_configurations" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "tenant_configurations";
CREATE POLICY "tenant_isolation_delete" ON "tenant_configurations" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "triage_assessments" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "triage_assessments";
CREATE POLICY "tenant_isolation_select" ON "triage_assessments" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "triage_assessments";
CREATE POLICY "tenant_isolation_insert" ON "triage_assessments" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "triage_assessments";
CREATE POLICY "tenant_isolation_update" ON "triage_assessments" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "triage_assessments";
CREATE POLICY "tenant_isolation_delete" ON "triage_assessments" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "users" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "users";
CREATE POLICY "tenant_isolation_select" ON "users" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "users";
CREATE POLICY "tenant_isolation_insert" ON "users" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "users";
CREATE POLICY "tenant_isolation_update" ON "users" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "users";
CREATE POLICY "tenant_isolation_delete" ON "users" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

ALTER TABLE IF EXISTS "xero_tokens" ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "tenant_isolation_select" ON "xero_tokens";
CREATE POLICY "tenant_isolation_select" ON "xero_tokens" FOR SELECT USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_insert" ON "xero_tokens";
CREATE POLICY "tenant_isolation_insert" ON "xero_tokens" FOR INSERT WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_update" ON "xero_tokens";
CREATE POLICY "tenant_isolation_update" ON "xero_tokens" FOR UPDATE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  ) WITH CHECK (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );
DROP POLICY IF EXISTS "tenant_isolation_delete" ON "xero_tokens";
CREATE POLICY "tenant_isolation_delete" ON "xero_tokens" FOR DELETE USING (
    "tenantId" IS NULL OR
    "tenantId" = current_tenant_id() OR
    current_tenant_id() IS NULL
  );

