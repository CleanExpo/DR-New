-- Lead PII consent + retention markers (DR-858 N-09). Additive only.

-- AlterTable
ALTER TABLE "contact_enquiries" ADD COLUMN     "consentGivenAt" TIMESTAMP(3);
ALTER TABLE "contact_enquiries" ADD COLUMN     "consentVersion" TEXT;
ALTER TABLE "contact_enquiries" ADD COLUMN     "piiPurgedAt" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "contact_enquiries_piiPurgedAt_idx" ON "contact_enquiries"("piiPurgedAt");
