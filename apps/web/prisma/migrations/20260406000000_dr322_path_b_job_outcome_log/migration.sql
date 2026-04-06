-- Migration: DR-322 Path B — Job Outcome Log
-- Created: 06/04/2026
-- Structured outcome collection for BI/analytics.
-- Captures terminal-state transitions independently of Path A (publish decision).
-- Applied directly to Supabase (06/04/2026) — table verified in production.

-- CreateEnum
DO $$ BEGIN
  CREATE TYPE "JobOutcome" AS ENUM ('COMPLETED', 'CANCELLED', 'REJECTED_BY_CLIENT', 'REJECTED_BY_CONTRACTOR', 'TIMED_OUT');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- CreateTable: job_outcome_logs
CREATE TABLE IF NOT EXISTS "job_outcome_logs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "outcome" "JobOutcome" NOT NULL,
    "jobType" TEXT NOT NULL,
    "contractorId" TEXT,
    "clientId" TEXT,
    "insuranceClaimId" TEXT,
    "actualCost" DECIMAL(10,2),
    "hoursWorked" DECIMAL(6,2),
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedByUserId" TEXT NOT NULL,
    "tenantId" TEXT,
    "metadata" JSONB,
    CONSTRAINT "job_outcome_logs_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "job_outcome_logs_jobId_idx" ON "job_outcome_logs"("jobId");
CREATE INDEX IF NOT EXISTS "job_outcome_logs_outcome_idx" ON "job_outcome_logs"("outcome");
CREATE INDEX IF NOT EXISTS "job_outcome_logs_jobType_idx" ON "job_outcome_logs"("jobType");
CREATE INDEX IF NOT EXISTS "job_outcome_logs_loggedAt_idx" ON "job_outcome_logs"("loggedAt");
CREATE INDEX IF NOT EXISTS "job_outcome_logs_tenantId_idx" ON "job_outcome_logs"("tenantId");
CREATE INDEX IF NOT EXISTS "job_outcome_logs_contractorId_idx" ON "job_outcome_logs"("contractorId");

-- AddForeignKey: job_outcome_logs → jobs
DO $$ BEGIN
  ALTER TABLE "job_outcome_logs" ADD CONSTRAINT "job_outcome_logs_jobId_fkey"
    FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
