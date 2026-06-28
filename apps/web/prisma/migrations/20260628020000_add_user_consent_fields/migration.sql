-- Capture Terms of Service / Privacy Policy consent at signup with a server-authoritative
-- timestamp + version (DR-881). Additive only — both columns are nullable so existing rows
-- are unaffected and the migration is safe to apply via CI.

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "consentAcceptedAt" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN     "consentVersion" TEXT;
