-- Append-only ICA acceptance records (DR-884). Additive only — new table, no
-- changes to existing tables. contractorId == User.id (Option B).

-- CreateTable
CREATE TABLE "contractor_agreement_acceptances" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "documentHash" TEXT NOT NULL,
    "signedName" VARCHAR(255) NOT NULL,
    "signatureType" VARCHAR(20) NOT NULL DEFAULT 'typed',
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "signedPdfUrl" VARCHAR(500),
    "signedPdfHash" TEXT,
    "pdfGeneratedAt" TIMESTAMP(3),
    "supersededAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_agreement_acceptances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractor_agreement_acceptances_contractorId_version_key" ON "contractor_agreement_acceptances"("contractorId", "version");

-- CreateIndex
CREATE INDEX "contractor_agreement_acceptances_contractorId_idx" ON "contractor_agreement_acceptances"("contractorId");
