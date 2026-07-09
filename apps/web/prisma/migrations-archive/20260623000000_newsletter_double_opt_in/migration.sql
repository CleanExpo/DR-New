-- AlterTable
-- Double opt-in support for newsletter subscriptions.
-- Used by app/api/newsletter/subscribe/route.ts (sets confirmationToken) and
-- app/api/newsletter/confirm/route.ts (marks confirmed/confirmedAt, clears token).
ALTER TABLE "newsletter_subscriptions" ADD COLUMN "confirmed" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "newsletter_subscriptions" ADD COLUMN "confirmedAt" TIMESTAMP(3);
ALTER TABLE "newsletter_subscriptions" ADD COLUMN "confirmationToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_confirmationToken_key" ON "newsletter_subscriptions"("confirmationToken");
