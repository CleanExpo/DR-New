-- Reconcile: add code-expected contractor/auth/payout columns missing from prod (additive only).
-- Generated via 'prisma migrate diff --from-url <prod> --to-schema-datamodel' after db-pull baseline (DR-868).

-- AlterTable
ALTER TABLE "Contractor" ADD COLUMN     "licenseStatus" TEXT NOT NULL DEFAULT 'unverified',
ADD COLUMN     "licenseType" TEXT;

-- AlterTable
ALTER TABLE "contractor_inquiries" ADD COLUMN     "approvalReason" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "reviewNotes" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "contractor_profiles" ADD COLUMN     "stripeConnectAccountId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lockedUntil" TIMESTAMP(3),
ADD COLUMN     "twoFactorBackupCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorSecret" TEXT,
ADD COLUMN     "twoFactorSetupAt" TIMESTAMP(3);

