-- Add users.lastFailedLoginAt (used by lockout.service; missing from prod) — additive only (DR-869).

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "lastFailedLoginAt" TIMESTAMP(3);

