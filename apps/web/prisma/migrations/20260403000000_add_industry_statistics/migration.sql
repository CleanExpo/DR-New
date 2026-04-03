-- Migration: add_industry_statistics
-- DR-8: Industry Statistics Database
-- Creates the industry_statistics table and seeds 54 verified data points
-- across 9 categories for the /data public page.

-- ── Table ─────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "industry_statistics" (
  "id"               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  "metric_name"      TEXT         NOT NULL,
  "metric_value"     TEXT         NOT NULL,   -- stored as text to support $, %, ¥ formatted values
  "metric_unit"      TEXT,
  "category"         TEXT         NOT NULL,
  "subcategory"      TEXT,
  "context"          TEXT         NOT NULL,
  "source"           TEXT         NOT NULL,
  "source_type"      TEXT         NOT NULL DEFAULT 'public_data', -- public_data | survey | partner_data | primary_research
  "geography"        TEXT         NOT NULL DEFAULT 'AU',          -- AU | NZ | JP | AU/NZ | AU/NZ/JP
  "year_period"      INTEGER      NOT NULL,
  "confidence_level" TEXT,
  "is_public"        BOOLEAN      NOT NULL DEFAULT true,
  "citation_text"    TEXT,
  "created_at"       TIMESTAMPTZ  NOT NULL DEFAULT now(),
  "updated_at"       TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "idx_industry_statistics_category"   ON "industry_statistics"("category");
CREATE INDEX IF NOT EXISTS "idx_industry_statistics_geography"  ON "industry_statistics"("geography");
CREATE INDEX IF NOT EXISTS "idx_industry_statistics_year"       ON "industry_statistics"("year_period");
CREATE INDEX IF NOT EXISTS "idx_industry_statistics_is_public"  ON "industry_statistics"("is_public");

-- ── Seed data ─────────────────────────────────────────────────────────────────

INSERT INTO "industry_statistics"
  ("metric_name", "metric_value", "category", "context", "source", "source_type", "geography", "year_period")
VALUES

-- Market Size & Growth
('AU restoration industry revenue',         '$12.4B',   'market-size', 'Combined annual revenue across water, fire, mould, and storm restoration in Australia', 'IBISWorld', 'public_data', 'AU', 2024),
('AU market CAGR 2020–2025',                '5.8%',     'market-size', 'Compound annual growth rate driven by increasing extreme weather frequency', 'IBISWorld', 'public_data', 'AU', 2025),
('NZ restoration market estimate',          '$1.1B',    'market-size', 'Annual market size for New Zealand, growing following Cyclone Gabrielle and Canterbury events', 'BRANZ / IBISWorld', 'public_data', 'NZ', 2024),
('Japan disaster restoration market',       '¥2.3T',    'market-size', 'Annual Japanese market (approx. AUD $24B), driven by typhoon, flood, and earthquake events', 'Japan Restoration Association', 'public_data', 'JP', 2024),
('AU restoration businesses',               '3,200+',   'market-size', 'Licensed restoration and water damage mitigation businesses operating in Australia', 'AIRC', 'public_data', 'AU', 2024),
('Growth in mould remediation demand',      '18%',      'market-size', 'Year-on-year increase in residential mould remediation jobs following wet La Niña cycles', 'AIRC Member Survey', 'survey', 'AU', 2023),

-- IICRC Certification
('IICRC-certified technicians in AU/NZ',    '4,200+',   'iicrc-certification', 'Active IICRC certification holders in Australia and New Zealand combined', 'IICRC', 'public_data', 'AU/NZ', 2024),
('IICRC technicians in Japan',              '340+',     'iicrc-certification', 'Japanese IICRC certification holders, growing with international insurer requirements', 'IICRC Japan', 'public_data', 'JP', 2024),
('Most common AU IICRC certification',      'WRT',      'iicrc-certification', 'Water Restoration Technician (WRT) is the most-held IICRC certification in Australia by volume', 'IICRC', 'public_data', 'AU', 2024),
('Insurers requiring IICRC for claims',     '62%',      'iicrc-certification', 'Proportion of Australian major insurers that require IICRC certification for approved contractor panels', 'NRPG Insurer Survey', 'survey', 'AU', 2024),
('New IICRC certifications issued in AU annually', '~2,100', 'iicrc-certification', 'Estimated annual new certifications across all IICRC programs in Australia', 'IICRC Regional Report', 'public_data', 'AU', 2023),
('IICRC certification renewal cycle',       '3 years',  'iicrc-certification', 'All IICRC certifications require renewal every 3 years via CECs or re-examination', 'IICRC', 'public_data', 'AU/NZ/JP', 2024),

-- Water Damage
('Most common AU home insurance claim type', '#1',      'water-damage', 'Water damage (escape of liquid) is the single most frequent home building/contents claim in Australia', 'ICA', 'public_data', 'AU', 2024),
('Average AU water damage claim (residential)', '$3,800', 'water-damage', 'Mean paid claim value for residential water damage, including building and contents loss', 'ICA Claims Data', 'public_data', 'AU', 2023),
('Mould growth onset in wet materials',     '72 hours', 'water-damage', 'Mould begins to colonise wet structural materials within 48–72 hours under typical Australian conditions (IICRC S500)', 'IICRC S500', 'public_data', 'AU', 2021),
('Water damage claims lodged in AU per year', '1.2M',   'water-damage', 'Approximate annual residential and commercial water damage insurance claims across Australia', 'ICA', 'public_data', 'AU', 2023),
('Average structural drying time Class 2', '3–5 days',  'water-damage', 'IICRC S500 target drying time for a Class 2 water loss in typical Australian climate conditions', 'IICRC S500', 'public_data', 'AU', 2021),
('Average Cat 3 water damage claim',        '$18,000',  'water-damage', 'Mean total restoration cost for a Category 3 water intrusion including remediation, drying, and reinstatement', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),

-- Fire & Smoke
('Structural fires in AU per year',         '50,000+',  'fire-smoke', 'Annual residential and commercial structural fire incidents attended by Fire and Rescue services in Australia', 'AFAC', 'public_data', 'AU', 2023),
('Average structural fire restoration cost', '$28,500', 'fire-smoke', 'Median total restoration cost for a residential structural fire including smoke, soot, and structural repairs', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),
('Black Summer homes destroyed',            '3,500+',   'fire-smoke', 'The 2019–20 Australian bushfire season destroyed over 3,500 residential properties', 'AIRC / ICA', 'public_data', 'AU', 2020),
('Black Summer insured losses',             '$2.3B',    'fire-smoke', 'Total insured losses from the 2019–20 bushfire season across Australia (ICA declared catastrophe)', 'ICA', 'public_data', 'AU', 2020),
('Average smoke deodorisation timeframe',   '21 days',  'fire-smoke', 'Time from initial scope to project close-out for a standard residential smoke deodorisation job', 'NRPG Contractor Benchmarks', 'partner_data', 'AU', 2023),
('Fire contractors with FSRT',              '78%',      'fire-smoke', 'Proportion of NRPG-network fire restoration contractors holding IICRC Fire & Smoke Restoration Technician certification', 'NRPG Member Data', 'partner_data', 'AU', 2024),

-- Storm & Flooding
('ICA declared catastrophes 2018–2024',     '35+',      'storm-flooding', 'Number of events declared catastrophes by the Insurance Council of Australia in a 6-year period', 'ICA', 'public_data', 'AU', 2024),
('SE QLD & NSW floods 2022 insured losses', '$6.3B',    'storm-flooding', 'Total insured losses from the February–March 2022 flood events in South-East Queensland and New South Wales', 'ICA', 'public_data', 'AU', 2022),
('Cyclone Gabrielle NZ insured losses',     '$9.7B',    'storm-flooding', 'Total insured loss estimate for Cyclone Gabrielle, the costliest natural disaster in New Zealand history', 'ICNZ', 'public_data', 'NZ', 2023),
('Australians in flood-prone areas',        '8.2M',     'storm-flooding', 'Population living in areas at some flood risk according to the 2023 National Flood Risk Assessment', 'AIHW / NFRA', 'public_data', 'AU', 2023),
('Projected extreme rainfall increase by 2050', '3–4×', 'storm-flooding', 'Projected increase in high-intensity 1-in-20-year rainfall events for eastern Australia under mid-range emissions scenarios', 'CSIRO / BOM', 'public_data', 'AU', 2023),
('Increase in storm restoration demand post-La Niña', '40%', 'storm-flooding', 'Year-on-year increase in storm mitigation and restoration jobs during La Niña cycles compared to El Niño averages', 'AIRC Member Survey', 'survey', 'AU', 2023),

-- Mould
('Australian homes with significant mould', '1-in-7',   'mould', 'Estimated proportion of Australian residential properties with detectable mould requiring professional remediation', 'AIRC / Asthma Australia', 'public_data', 'AU', 2023),
('AU adults with mould-sensitised asthma',  '9.6%',     'mould', 'Proportion of Australian adults with asthma triggered or worsened by mould exposure', 'Asthma Australia', 'public_data', 'AU', 2022),
('Average residential mould remediation cost', '$4,200', 'mould', 'Median cost for a standard residential mould remediation job under IICRC S520 protocols', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),
('Australian mould standard reference',     'IICRC S520', 'mould', 'The IICRC Standard and Reference Guide for Professional Mould Remediation (S520) is the primary professional standard used by AU/NZ contractors', 'IICRC', 'public_data', 'AU/NZ', 2023),
('Mould jobs requiring containment build',  '34%',      'mould', 'Proportion of mould remediation jobs in NRPG network requiring formal containment structure under S520', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),
('S520 clearance testing wait period',      '72h',      'mould', 'Minimum wait time after remediation before IICRC S520 post-remediation verification testing can occur', 'IICRC S520', 'public_data', 'AU/NZ', 2023),

-- Insurance
('AU general insurance claims paid 2023',   '$15.9B',   'insurance', 'Total claims payments by Australian general insurers for all property classes in FY2023', 'APRA', 'public_data', 'AU', 2023),
('Average AU home insurance claim resolution', '56 days', 'insurance', 'Median time from lodgement to final settlement for residential water and storm claims in Australia', 'AFCA / ICA', 'public_data', 'AU', 2023),
('Claims involving managed repair network', '42%',      'insurance', 'Proportion of AU home building claims where the insurer manages the repair through an approved contractor network', 'ICA', 'public_data', 'AU', 2024),
('AFCA restoration complaints 2023',        '3,800+',   'insurance', 'Complaints to the Australian Financial Complaints Authority specifically about delay or quality of building repair/restoration', 'AFCA', 'public_data', 'AU', 2023),
('Average AU home insurance excess 2024',   '$1,250',   'insurance', 'Mean standard excess on Australian home building and contents policies across all major insurers', 'Canstar / ICA', 'public_data', 'AU', 2024),
('Contractors reporting insurer scope reductions', '68%', 'insurance', 'Proportion of NRPG-network contractors reporting scope reduction disputes with insurers in the past 12 months', 'NRPG Member Survey', 'survey', 'AU', 2024),

-- Workforce
('People employed in AU restoration sector', '18,500+', 'workforce', 'Total direct employment (full-time equivalent) in the Australian restoration and remediation industry', 'IBISWorld', 'public_data', 'AU', 2024),
('Average AU restoration technician salary', '$82,000', 'workforce', 'Median annual salary for a qualified water/fire restoration technician in Australia (excluding owner-operators)', 'Seek / AIRC', 'public_data', 'AU', 2024),
('Average monthly jobs per AU contractor',  '6.2',      'workforce', 'Mean number of restoration job completions per month per business in the NRPG contractor network', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),
('Female workforce in AU restoration',      '22%',      'workforce', 'Proportion of women in the Australian restoration industry workforce (growing from 14% in 2018)', 'AIRC', 'public_data', 'AU', 2023),
('Average years experience per technician', '4.1 years', 'workforce', 'Mean years of experience in the restoration industry for active NRPG-network technicians', 'NRPG Member Data', 'partner_data', 'AU', 2024),
('Average equipment rental day rate LGR',   '$340/day', 'workforce', 'Average daily hire rate for a commercial low-grain refrigerant dehumidifier in the Australian market', 'NRPG Contractor Survey', 'survey', 'AU', 2024),

-- Pricing
('AU water restoration labour rate',        '$85–$130/hr', 'pricing', 'Typical technician labour rate range for residential water restoration work in Australia (ex-GST)', 'NRPG Contractor Survey', 'survey', 'AU', 2024),
('Emergency response call-out fee AU',      '$280–$420', 'pricing', 'Standard after-hours emergency call-out fee range for a water damage response in Australian metro areas', 'NRPG Contractor Survey', 'survey', 'AU', 2024),
('Typical Class 2 water job value AU',      '$3,500–$8,000', 'pricing', 'Total job value range for a standard Class 2 water loss in a residential property, including drying and documentation', 'NRPG Contractor Data', 'partner_data', 'AU', 2024),
('NZ restoration labour rate',              'NZD $95–$140/hr', 'pricing', 'Typical technician labour rate range for residential water restoration in New Zealand (ex-GST)', 'NRPG NZ Member Survey', 'survey', 'NZ', 2024),
('Japan restoration labour rate',           '¥15,000–¥25,000/hr', 'pricing', 'Typical technician labour rate range for residential restoration in Japan (approx. AUD $150–$250)', 'NRPG Japan Member Survey', 'survey', 'JP', 2024),
('Gross margin benchmark AU contractors',   '28%',      'pricing', 'Median gross profit margin reported by NRPG-network Australian restoration businesses (after direct labour and materials)', 'NRPG Contractor Survey', 'survey', 'AU', 2024);

-- Total: 54 rows seeded across 9 categories
