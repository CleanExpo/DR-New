-- Migration: Add Job Module, Xero Integration, and Notifications
-- Created: 05/03/2026
-- Apply this in Supabase SQL Editor if prisma migrate dev fails

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable: jobs
CREATE TABLE IF NOT EXISTS "jobs" (
    "id" TEXT NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "propertyId" TEXT NOT NULL,
    "contractorId" TEXT,
    "clientId" TEXT,
    "estimatedCost" DECIMAL(12,2),
    "actualCost" DECIMAL(12,2),
    "scheduledDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "notes" TEXT,
    "insuranceClaimId" TEXT,
    "hoursWorked" DECIMAL(8,2),
    "materialsUsed" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "jobs_jobNumber_key" ON "jobs"("jobNumber");
CREATE INDEX IF NOT EXISTS "jobs_status_idx" ON "jobs"("status");
CREATE INDEX IF NOT EXISTS "jobs_contractorId_idx" ON "jobs"("contractorId");
CREATE INDEX IF NOT EXISTS "jobs_propertyId_idx" ON "jobs"("propertyId");
CREATE INDEX IF NOT EXISTS "jobs_tenantId_idx" ON "jobs"("tenantId");

-- CreateTable: job_documents
CREATE TABLE IF NOT EXISTS "job_documents" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_documents_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "job_documents_jobId_idx" ON "job_documents"("jobId");

-- CreateTable: job_photos
CREATE TABLE IF NOT EXISTS "job_photos" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_photos_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "job_photos_jobId_idx" ON "job_photos"("jobId");

-- CreateTable: xero_tokens
CREATE TABLE IF NOT EXISTS "xero_tokens" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "scopes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xero_tokens_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "xero_tokens_tenantId_key" ON "xero_tokens"("tenantId");

-- CreateTable: notification_logs
CREATE TABLE IF NOT EXISTS "notification_logs" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "recipientId" TEXT,
    "recipient" TEXT NOT NULL,
    "jobId" TEXT,
    "jobNumber" TEXT,
    "subject" TEXT,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "notification_logs_jobId_idx" ON "notification_logs"("jobId");
CREATE INDEX IF NOT EXISTS "notification_logs_recipientId_idx" ON "notification_logs"("recipientId");
CREATE INDEX IF NOT EXISTS "notification_logs_channel_idx" ON "notification_logs"("channel");
CREATE INDEX IF NOT EXISTS "notification_logs_sentAt_idx" ON "notification_logs"("sentAt");

-- CreateTable: lead_captures
CREATE TABLE IF NOT EXISTS "lead_captures" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL DEFAULT false,
    "insuranceProvider" TEXT,
    "claimNumber" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'STANDARD',
    "preferredContactMethod" TEXT DEFAULT 'EMAIL',
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "referrer" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "contactedAt" TIMESTAMP(3),
    "convertedToClientAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_captures_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "lead_captures_email_idx" ON "lead_captures"("email");
CREATE INDEX IF NOT EXISTS "lead_captures_status_idx" ON "lead_captures"("status");

-- CreateTable: newsletter_subscriptions
CREATE TABLE IF NOT EXISTS "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "interests" TEXT[],
    "state" TEXT,
    "postcode" TEXT,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "resubscribedAt" TIMESTAMP(3),
    "unsubscribeToken" TEXT,
    "source" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "emailsOpened" INTEGER NOT NULL DEFAULT 0,
    "emailsClicked" INTEGER NOT NULL DEFAULT 0,
    "lastEmailSentAt" TIMESTAMP(3),
    "lastEmailOpenedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");

-- CreateTable: contractor_inquiries
CREATE TABLE IF NOT EXISTS "contractor_inquiries" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "contactFirstName" TEXT NOT NULL,
    "contactLastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "servicesOffered" TEXT[],
    "serviceAreas" TEXT[],
    "certifications" JSONB,
    "yearsInBusiness" INTEGER NOT NULL DEFAULT 0,
    "numberOfEmployees" INTEGER NOT NULL DEFAULT 0,
    "hasPublicLiability" BOOLEAN NOT NULL DEFAULT false,
    "publicLiabilityAmount" DECIMAL(12,2),
    "hasWorkersCompensation" BOOLEAN NOT NULL DEFAULT false,
    "additionalInfo" TEXT,
    "website" TEXT,
    "availability24x7" BOOLEAN NOT NULL DEFAULT false,
    "emergencyResponseTime" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "backgroundCheckConsent" BOOLEAN NOT NULL DEFAULT false,
    "applicationScore" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_inquiries_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "contractor_inquiries_status_idx" ON "contractor_inquiries"("status");
CREATE INDEX IF NOT EXISTS "contractor_inquiries_contactEmail_idx" ON "contractor_inquiries"("contactEmail");

-- AddForeignKey (only if properties table exists)
DO $$ BEGIN
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_propertyId_fkey"
    FOREIGN KEY ("propertyId") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
  WHEN undefined_table THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "jobs" ADD CONSTRAINT "jobs_contractorId_fkey"
    FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
  WHEN undefined_table THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "job_documents" ADD CONSTRAINT "job_documents_jobId_fkey"
    FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  ALTER TABLE "job_photos" ADD CONSTRAINT "job_photos_jobId_fkey"
    FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
