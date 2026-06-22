-- Fix _prisma_migrations time-bomb
-- Production's _prisma_migrations table has zero records for the 14 migration
-- files that exist in apps/web/prisma/migrations/. This script inserts the
-- missing rows so prisma migrate deploy won't try to re-apply them.
--
-- Checksums computed via: git show origin/main:apps/web/prisma/migrations/<name>/migration.sql | shasum -a 256
-- Generated: 2026-06-22
--
-- USAGE: Run against production Supabase (project: udooysjajglluvuxkijp)
--   psql $DATABASE_URL -f scripts/fix-prisma-migrations.sql
--   OR via Supabase Dashboard > SQL Editor

BEGIN;

-- Insert missing migration records (idempotent — skips already-present rows)
INSERT INTO _prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
SELECT gen_random_uuid()::text, v.checksum, NOW(), v.migration_name, NULL, NULL, NOW() - INTERVAL '1 second', 1
FROM (VALUES
  ('60a6284a4ef6c90f2fb8378726fb81c80c23b425772161bed1690c7364a40197', '20250127200000_add_rls_policies'),
  ('0f2e6c0381b357b1b2ea992179eed6d057c009a86b6277ba27b013aa58957e3c', '20250203000000_add_course_types'),
  ('0fb7c38522193900334921352c0b5a298c63d5249bcfb4c369b1e845e22c438e', '20250916043401_initalize_schema'),
  ('71268f02e04d5f3e921dfb95f8d87f153c8380dad45afd97cae53c7fe193ecd7', '20250921080802_add_admin_user_type'),
  ('283112e03d91ed3b9ae8d585960d1d105b25f92e288ddc507939d1037c754a3f', '20250928045119_add_tenant_system'),
  ('1878412c4dfccd1134d03285daf373fd62de011aff9f1e4c5aef2ea0ba875be4', '20250928111331_add_user_preferences'),
  ('c00cf0eaaacb15bd4fb25032c947a60d47ec29de81f7a4d6082ac1de33daf25e', '20250928113202_add_admin_preferences_and_theming'),
  ('56a33977d4f419133bcc9f26e5baad090d2116efadfe03f90b57aa890297166f', '20251231180000_fix_contractor_onboarding_contractor_id'),
  ('12054a27f23e540cf350534a942e9b316d7950c4c4458104f1c6dc2fa2cc73a2', '20251231190000_add_callout_payment'),
  ('47060119c075ee2c344287b4cd6b992eaf69fb367dc54d3937349dfb2e184aaf', '20260202000000_complete_rls_policies'),
  ('2ada1c900c6f217f934bb10f8fda0f9aaaca5d80e23618d57b46e40f2fba2c08', '20260305000000_add_job_module_xero_notifications'),
  ('cd80dd08b8b23ed52af31a1b06255c0687a811bca2a97c1918f9b6c496d9c066', '20260406000000_dr322_path_b_job_outcome_log'),
  ('20face274d49cc8c40582f82c8edd553cb821d238ecb740e5fad60c65d3a10d4', '20260414000000_add_module_progress_unique_constraint'),
  ('1d40bed598f9fa2e789810b3083639e9e80ba1de97c7b1150e9dd9a1e8392b86', '20260622000000_add_audit_logs_table')
) AS v(checksum, migration_name)
WHERE NOT EXISTS (
  SELECT 1 FROM _prisma_migrations pm WHERE pm.migration_name = v.migration_name
);

-- Verify
SELECT migration_name, checksum, finished_at FROM _prisma_migrations ORDER BY migration_name;

COMMIT;
