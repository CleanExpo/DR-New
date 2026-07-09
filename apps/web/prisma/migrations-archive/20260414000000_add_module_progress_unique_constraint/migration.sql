-- AddUniqueConstraint: contractor_module_progress (onboarding_id, module_id)
-- Enables idempotent upserts in the training modules API routes.
-- Safe to apply on existing data: if any duplicate (onboarding_id, module_id)
-- pairs exist they must be resolved first (run the SELECT below to check).
--
-- Pre-flight check (run manually before deploying if unsure):
--   SELECT onboarding_id, module_id, COUNT(*)
--   FROM contractor_module_progress
--   GROUP BY onboarding_id, module_id
--   HAVING COUNT(*) > 1;

CREATE UNIQUE INDEX "uq_module_progress_onboarding_module"
    ON "contractor_module_progress"("onboarding_id", "module_id");
