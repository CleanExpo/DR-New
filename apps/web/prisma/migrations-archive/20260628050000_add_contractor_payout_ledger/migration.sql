-- Append-only contractor payout ledger (DR-858 N-02). Additive only — new table.
-- Deterministic idempotencyKey + unique stripeTransferId prevent double-pay.

-- CreateTable
CREATE TABLE "contractor_payouts" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT,
    "bookingId" TEXT,
    "paymentId" TEXT,
    "connectedAccount" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "stripeTransferId" TEXT,
    "amountAUD" DECIMAL(10,2) NOT NULL,
    "platformFeeAUD" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_payouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contractor_payouts_idempotencyKey_key" ON "contractor_payouts"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_payouts_stripeTransferId_key" ON "contractor_payouts"("stripeTransferId");

-- CreateIndex
CREATE INDEX "contractor_payouts_contractorId_idx" ON "contractor_payouts"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_payouts_paymentId_idx" ON "contractor_payouts"("paymentId");
