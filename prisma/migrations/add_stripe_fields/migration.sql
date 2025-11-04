-- Add Stripe integration fields
-- This migration adds necessary fields for Stripe payment integration

-- Add stripeCustomerId to Contractor table
ALTER TABLE "Contractor" ADD COLUMN "stripeCustomerId" TEXT;

-- Add Stripe fields to ContractorSubscription table
ALTER TABLE "ContractorSubscription" ADD COLUMN "stripeSubscriptionId" TEXT;
ALTER TABLE "ContractorSubscription" ADD COLUMN "lastBillingDate" TIMESTAMP(3);

-- Add Stripe fields to Invoice table (if not exists)
-- Check if the column exists first to avoid errors
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'Invoice' AND column_name = 'stripePaymentIntentId'
    ) THEN
        ALTER TABLE "Invoice" ADD COLUMN "stripePaymentIntentId" TEXT;
    END IF;
END $$;

-- Add Stripe fields to Payment table (using the expanded schema model)
-- For contractor payments
ALTER TABLE "ContractorPayment" ADD COLUMN "stripePaymentIntentId" TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS "Contractor_stripeCustomerId_idx" ON "Contractor"("stripeCustomerId");
CREATE INDEX IF NOT EXISTS "ContractorSubscription_stripeSubscriptionId_idx" ON "ContractorSubscription"("stripeSubscriptionId");
CREATE INDEX IF NOT EXISTS "Invoice_stripePaymentIntentId_idx" ON "Invoice"("stripePaymentIntentId");
CREATE INDEX IF NOT EXISTS "ContractorPayment_stripePaymentIntentId_idx" ON "ContractorPayment"("stripePaymentIntentId");
