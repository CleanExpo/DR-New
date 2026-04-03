-- CreateTable: event_submissions (DR-54)
-- Self-service event submission system for training providers, suppliers,
-- and event organisers to submit events to the DR industry calendar.
-- Status flow: PENDING → APPROVED | REJECTED (via /admin/approvals queue)

CREATE TABLE "event_submissions" (
    "id"                       TEXT NOT NULL,
    "eventName"                TEXT NOT NULL,
    "organizerName"            TEXT NOT NULL,
    "organizerCompany"         TEXT,
    "category"                 TEXT NOT NULL,
    "format"                   TEXT NOT NULL,
    "country"                  TEXT NOT NULL,
    "state"                    TEXT,
    "city"                     TEXT,
    "venue"                    TEXT,
    "startDate"                TIMESTAMP(3) NOT NULL,
    "endDate"                  TIMESTAMP(3) NOT NULL,
    "description"              TEXT NOT NULL,
    "websiteUrl"               TEXT,
    "ticketUrl"                TEXT,
    "priceAud"                 DECIMAL(10,2),
    "isFree"                   BOOLEAN NOT NULL DEFAULT false,
    "iicrcCeus"                INTEGER,
    "iicrcCertApplicable"      TEXT,
    "submittedByEmail"         TEXT NOT NULL,
    "status"                   TEXT NOT NULL DEFAULT 'PENDING',
    "adminNotes"               TEXT,
    "reviewedAt"               TIMESTAMP(3),
    "reviewedBy"               TEXT,
    "createdAt"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"                TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_submissions_pkey" PRIMARY KEY ("id")
);

-- Indexes for admin queue queries
CREATE INDEX "event_submissions_status_idx"    ON "event_submissions"("status");
CREATE INDEX "event_submissions_country_idx"   ON "event_submissions"("country");
CREATE INDEX "event_submissions_category_idx"  ON "event_submissions"("category");
CREATE INDEX "event_submissions_startDate_idx" ON "event_submissions"("startDate");
CREATE INDEX "event_submissions_createdAt_idx" ON "event_submissions"("createdAt");

-- RLS: Only service role can write; public can read APPROVED rows via API
-- Apply in Supabase dashboard:
--   ALTER TABLE event_submissions ENABLE ROW LEVEL SECURITY;
--   CREATE POLICY "public_read_approved" ON event_submissions FOR SELECT USING (status = 'APPROVED');
--   CREATE POLICY "service_write" ON event_submissions FOR ALL USING (auth.role() = 'service_role');
