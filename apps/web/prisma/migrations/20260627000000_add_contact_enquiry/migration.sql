-- CreateTable
CREATE TABLE "contact_enquiries" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL DEFAULT 'General Inquiry',
    "message" TEXT NOT NULL,
    "source" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "respondedAt" TIMESTAMP(3),

    CONSTRAINT "contact_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "contact_enquiries_status_idx" ON "contact_enquiries"("status");

-- CreateIndex
CREATE INDEX "contact_enquiries_submittedAt_idx" ON "contact_enquiries"("submittedAt");
