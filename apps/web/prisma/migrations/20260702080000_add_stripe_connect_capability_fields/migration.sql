-- AlterTable
ALTER TABLE "contractor_profiles" ADD COLUMN     "stripeCapabilitiesSyncedAt" TIMESTAMP(3),
ADD COLUMN     "stripeChargesEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripePayoutsEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stripeRequirementsDue" JSONB;

