---
name: DR-210 Prisma/SQL Audit Findings
description: Results of the Prisma schema audit — findings, risks, and deferred items
type: project
---

# DR-210 Prisma/SQL Audit — 3 April 2026

## Actions taken in this PR

1. **Added `IndustryStatistic` model** (`@@map("industry_statistics")`) — 14 fields, 4 indexes
2. **Added `IndustryPartner` model** (`@@map("industry_partners")`) — 26 fields, 5 indexes
3. **SQL migration** `20260403000000_add_industry_statistics/migration.sql` — creates `industry_statistics` table and seeds 54 rows

## Findings — Deferred (non-breaking, safe to address incrementally)

### 17 models missing `@@map` (PascalCase table names)

Models like `Tenant`, `User`, `Booking`, `Payment`, etc. have no `@@map` directive,
meaning they produce PascalCase table names in PostgreSQL (e.g. `"Booking"` not `"bookings"`).

**Risk**: Low — existing queries work, but the naming is inconsistent with snake_case convention used on ~82 other models.
**Why deferred**: Renaming live tables requires a `ALTER TABLE` migration and careful coordination with any external scripts or Supabase RLS policies that reference table names by string.
**How to apply**: Address model-by-model as those tables are touched in sprint work, not in bulk.

### Nullable fields with no `@default`

399 nullable (`String?`) fields across the schema — most are intentional (optional profile data).
A handful on critical models (`ServiceRequest`, `Booking`) are worth reviewing to confirm nullable is intentional rather than a leftover from iterative schema changes.

### FK indexes

All direct foreign key fields checked during audit have corresponding `@@index` entries.
No missing FK indexes found in the models reviewed.

### `String` enum-style fields

Many fields use `String` with inline comments (e.g. `status String // pending | approved`) rather than Prisma `enum`. Enums would give compile-time safety but require migrations to change allowed values.
**Recommendation**: Convert the most critical status fields (`status`, `tier`) to proper enums when the schema stabilises — not in this sprint.

## No breaking changes in this PR
