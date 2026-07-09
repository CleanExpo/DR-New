-- Add signing-provenance columns to nrpg_commitments (DR-890) so the commitment
-- route can record the signatory name, the agreement version, and a document
-- hash. Additive only — all nullable, existing rows unaffected.

-- AlterTable
ALTER TABLE "nrpg_commitments" ADD COLUMN     "signedName" VARCHAR(255);
ALTER TABLE "nrpg_commitments" ADD COLUMN     "version" VARCHAR(50);
ALTER TABLE "nrpg_commitments" ADD COLUMN     "documentHash" TEXT;
