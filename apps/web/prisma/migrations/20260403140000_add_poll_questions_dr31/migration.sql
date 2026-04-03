-- DR-31: Social Media Poll Engine
-- Creates the poll_questions table for managing weekly social polls and capturing results.

CREATE TABLE IF NOT EXISTS "poll_questions" (
  "id"             TEXT NOT NULL,
  "question"       TEXT NOT NULL,
  "category"       TEXT NOT NULL,
  "options"        JSONB NOT NULL,
  "platforms"      TEXT[] NOT NULL DEFAULT '{}',
  "status"         TEXT NOT NULL DEFAULT 'queued',
  "scheduledDate"  TIMESTAMPTZ,
  "publishedAt"    TIMESTAMPTZ,
  "closedAt"       TIMESTAMPTZ,
  "results"        JSONB,
  "totalResponses" INTEGER NOT NULL DEFAULT 0,
  "statEntryId"    TEXT,
  "notes"          TEXT,
  "createdAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt"      TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT "poll_questions_pkey" PRIMARY KEY ("id")
);

-- Indexes
CREATE INDEX IF NOT EXISTS "poll_questions_status_idx"        ON "poll_questions" ("status");
CREATE INDEX IF NOT EXISTS "poll_questions_category_idx"      ON "poll_questions" ("category");
CREATE INDEX IF NOT EXISTS "poll_questions_scheduledDate_idx" ON "poll_questions" ("scheduledDate");

-- Seed: First 12 questions across all 9 categories
-- Full 52-week bank to be seeded via separate script

INSERT INTO "poll_questions" ("id", "question", "category", "options", "platforms", "status", "scheduledDate") VALUES
  ('pq-pricing-01',   'What is your minimum callout fee for a residential water damage job in 2026?', 'pricing',    '["Under $300","$300–$500","$500–$800","Over $800"]',                            '{"linkedin","facebook"}',   'queued', '2026-04-08'),
  ('pq-pricing-02',   'Have you increased your hourly rates in the last 12 months?',                  'pricing',    '["Yes, by 10%+","Yes, by 5–10%","Yes, by under 5%","No change"]',               '{"linkedin","instagram"}',  'queued', '2026-04-15'),
  ('pq-workforce-01', 'What is your biggest recruitment challenge right now?',                         'workforce',  '["Finding certified techs","Retaining staff","Casual vs full-time","Wages"]',    '{"linkedin","facebook"}',   'queued', '2026-04-22'),
  ('pq-workforce-02', 'How many active technicians does your business employ?',                        'workforce',  '["Just me","2–5","6–15","16+"]',                                                 '{"linkedin"}',              'queued', '2026-04-29'),
  ('pq-tech-01',      'Which job management software do you use?',                                    'technology', '["ASCORA","Encircle","Xactimate","Other/none"]',                                  '{"linkedin","instagram"}',  'queued', '2026-05-06'),
  ('pq-tech-02',      'Are you using AI tools in your workflow?',                                     'technology', '["Yes, regularly","Yes, occasionally","Exploring it","No"]',                     '{"linkedin","facebook"}',   'queued', '2026-05-13'),
  ('pq-insurance-01', 'How long does your average insurance claim take to settle?',                   'insurance',  '["Under 2 weeks","2–4 weeks","1–3 months","Over 3 months"]',                     '{"linkedin","facebook"}',   'queued', '2026-05-20'),
  ('pq-insurance-02', 'Have you been underpaid on an insurance claim in the last 12 months?',         'insurance',  '["Yes, significantly","Yes, slightly","No","Not applicable"]',                   '{"linkedin","instagram"}',  'queued', '2026-05-27'),
  ('pq-training-01',  'Which IICRC certification do you consider most valuable for your business?',   'training',   '["WRT","ASD","AMRT","FSRT"]',                                                    '{"linkedin","instagram"}',  'queued', '2026-06-03'),
  ('pq-safety-01',    'Do you conduct toolbox talks on your job sites?',                              'safety',     '["Yes, every job","Yes, weekly","Monthly","Rarely/never"]',                      '{"linkedin","facebook"}',   'queued', '2026-06-10'),
  ('pq-business-01',  'What is your biggest business challenge in 2026?',                             'business',   '["Cash flow","Insurance delays","Finding staff","Rising costs"]',                 '{"linkedin","instagram"}',  'queued', '2026-06-17'),
  ('pq-regional-01',  'Which region are you based in?',                                               'regional',   '["Australian capital city","Australian regional","New Zealand","Japan"]',         '{"linkedin","instagram"}',  'queued', '2026-06-24')
ON CONFLICT ("id") DO NOTHING;

-- RLS (Supabase): Poll questions readable by authenticated users; writable by service_role only
-- ALTER TABLE "poll_questions" ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "poll_questions_read" ON "poll_questions" FOR SELECT USING (true);
-- CREATE POLICY "poll_questions_write" ON "poll_questions" FOR ALL USING (auth.role() = 'service_role');
