# DR-NRPG remote branch triage

## Summary
- Total remote branches reviewed: 296
- KEEP: 26
- ARCHIVE: 270
- INVESTIGATE: 0
- Heuristic: KEEP = merged into origin/main or <=60 days old; ARCHIVE = >60 days old; INVESTIGATE = none surfaced from git-only evidence

## The 5 branches Phill should look at first
- `feat/training-modules-api` — 2026-04-14 — feat: wire training modules JSON to API with progress tracking (61 days stale)
- `feat/training-dashboard-ui` — 2026-04-14 — feat: add training dashboard UI — module list with start/complete actions (61 days stale)
- `feature/mobile-auth-api` — 2026-04-13 — fix: RA-687 — resolve false-positive AWS credential scanner alerts in DR-NRPG (62 days stale)
- `tmp-ci2-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit (64 days stale)
- `feat/DR-34-partner-dashboard` — 2026-04-12 — feat: DR-34/45/74 — partner dashboard, events calendar, find-a-contractor (63 days stale)

## The tmp-ci2-* cluster
- `tmp-ci2-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-31-poll-engine` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-324-omx-patterns` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-27-verified-facts-seed` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-54-event-submission-api` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-43-social-community-hub` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-38-stripe-industry-partners` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-34-partner-dashboard` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-33-statistics-newsletter` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-55-industry-calendar` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-15-location-pages` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-73-74-funnel-handoff` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-244-restore-assist-page` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-230-229-237-240-seo` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-48-49-calculators` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-320-event-pages` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-234-235-236-schema` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-feat/DR-60-hydration-fix` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit
- `tmp-ci2-chore/sandbox-setup` — 2026-04-11 — fix(ci): run prisma generate before tsc --noEmit

## The feat/DR-34-* cluster
- `feat/DR-34-partner-dashboard` — 2026-04-12 — feat: DR-34/45/74 — partner dashboard, events calendar, find-a-contractor
- DR-34 appears to be the partner dashboard workstream (`partner dashboard, events calendar, find-a-contractor`).
- Status: not merged into main; worth keeping only if still active downstream.

## Full list
| name | last commit date | days stale | last subject | suggested disposition |
|---|---:|---:|---|---|
| `nexus/autofix-nextjs-20260609` | 2026-06-09 | 5 | fix(DR-NRPG): resolve Next.js build/test failure (Nexus autofix) | KEEP |
| `sandbox` | 2026-05-20 | 26 | feat(consolidation): merge all open branches, production-ready build | KEEP |
| `feature/auto-security-20260509` | 2026-05-09 | 36 | fix: resolve all 4 ESLint errors blocking lint CI | KEEP |
| `docs/ra-1744-review-skills-mandate` | 2026-04-27 | 48 | docs: add review skills mandate (RA-1744) | KEEP |
| `fix/dr-758-761-nrpg-ops-bugs` | 2026-04-25 | 50 | fix(dr-758,dr-759,dr-760,dr-761): NRPG ops-platform surface bug fixes | KEEP |
| `pidev/auto-0afe35b1` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides (#92) | KEEP |
| `pidev/auto-717eec89` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides (#92) | KEEP |
| `pidev/auto-bf619206` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides (#92) | KEEP |
| `pidev/auto-d79ad0e8` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides (#92) | KEEP |
| `pidev/auto-f3b34a4b` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides (#92) | KEEP |
| `fix/deps-full-audit-sweep` | 2026-04-18 | 58 | fix(deps): full pnpm audit sweep — patch 13 vulns via overrides | KEEP |
| `fix/basic-ftp-cve-path-traversal` | 2026-04-18 | 58 | fix(deps): bump basic-ftp override to >=5.3.0 — patch path-traversal CVE | KEEP |
| `fix/trufflehog-scan-config` | 2026-04-17 | 58 | fix(security): let TruffleHog auto-detect scan range | KEEP |
| `fix/backup-abs-pgdump-path` | 2026-04-17 | 58 | fix(backup): prepend postgresql-17 to PATH | KEEP |
| `fix/backup-client-17` | 2026-04-17 | 58 | fix(backup): upgrade client to postgresql-client-17 (server is 17.6) | KEEP |
| `fix/backup-use-direct-url` | 2026-04-17 | 58 | fix(backup): use DIRECT_URL_PRODUCTION for pg_dump (Supabase pgbouncer) | KEEP |
| `fix/backup-pipefail-size-check` | 2026-04-17 | 58 | fix(backup): pipefail + sane-size gate to stop silent-empty artifacts | KEEP |
| `fix/backup-artifact-replace-s3` | 2026-04-17 | 58 | fix(backup): replace broken AWS S3 workflow with pg_dump to GitHub artifact | KEEP |
| `fix/backup-drop-awscli-install` | 2026-04-17 | 58 | fix(backup): drop apt awscli install (pre-installed on Ubuntu 24.04 runners) | KEEP |
| `fix/backup-pg-client-version` | 2026-04-17 | 58 | fix(backup): install postgresql-client-15 from official APT repo | KEEP |
| `docs/karpathy-principles` | 2026-04-17 | 59 | docs(claude): add Karpathy-inspired coding guidelines | KEEP |
| `feat/training-dashboard-ui` | 2026-04-14 | 61 | feat: add training dashboard UI — module list with start/complete actions | ARCHIVE |
| `feat/training-modules-api` | 2026-04-14 | 61 | feat: wire training modules JSON to API with progress tracking | ARCHIVE |
| `fix/persist-contractor-inquiry` | 2026-04-14 | 62 | fix: persist contractor inquiry form data to ContractorApplication table | ARCHIVE |
| `fix/deps-health-2026-04` | 2026-04-14 | 62 | chore(deps): update outdated packages to restore dependency health score | ARCHIVE |
| `fix/DR-phase3-onboarding-persistence` | 2026-04-13 | 62 | fix: remove @ts-nocheck from phases route + fix db-out-of-scope bug | KEEP |
| `fix/pr75-rebase` | 2026-04-13 | 62 | fix: resolve TypeScript errors in onboarding module content and start routes | ARCHIVE |
| `fix/city-route-async-params` | 2026-04-13 | 62 | fix: await params in [city] and [city]/[service] routes for Next.js 15 compatibility | ARCHIVE |
| `fix/env-validation-training-deploy` | 2026-04-13 | 62 | fix: resolve TypeScript errors in onboarding module content and start routes | ARCHIVE |
| `fix/backend-health-check-orchestrator-stub` | 2026-04-13 | 62 | fix: real health checks + honest orchestrator workflow routing | ARCHIVE |
| `fix/dr-593-type-safety-nocheck-removal` | 2026-04-13 | 62 | fix: remove @ts-nocheck from onboarding routes, fix enum types and user.role bug | ARCHIVE |
| `fix/ra-687-dr-574-mobile-auth-security` | 2026-04-13 | 62 | fix: RA-687 — resolve false-positive AWS credential scanner alerts in DR-NRPG | ARCHIVE |
| `feature/mobile-auth-api` | 2026-04-13 | 62 | fix: RA-687 — resolve false-positive AWS credential scanner alerts in DR-NRPG | ARCHIVE |
| `fix/ra-601-xss-sql-injection` | 2026-04-12 | 63 | feat(phase5): wire remaining P0 gaps — claims, reconciliation, revenue, doc upload | ARCHIVE |
| `fix/DR-559-DR-560-xss-sqli-security` | 2026-04-12 | 63 | fix: DR-561 — reduce npm vulnerabilities from 104 to 76 (6 critical → 1) | ARCHIVE |
| `feat/DR-34-partner-dashboard` | 2026-04-12 | 63 | feat: DR-34/45/74 — partner dashboard, events calendar, find-a-contractor | ARCHIVE |
| `phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-12 | 63 | fix: add OnboardingMilestone and OnboardingCheckIn Prisma models (DR-191) | ARCHIVE |
| `feat/DR-234-235-236-schema` | 2026-04-12 | 63 | fix: remove duplicate faqs/categoryName properties in biohazard page (TS1117) | ARCHIVE |
| `feat/DR-320-event-pages` | 2026-04-12 | 63 | fix: move event pages to (public) route group, remove conflicting duplicate | ARCHIVE |
| `cto/dr-529-nsw-qld-storms-april-2026` | 2026-04-12 | 64 | feat: GAP-089 NSW/QLD Storms April 2026 event stub (DR-529) | ARCHIVE |
| `cto/dr-528-alfred-qld-2026-recovery` | 2026-04-12 | 64 | feat: BUILD-008 Cyclone Alfred QLD 2026 recovery page (DR-528) | ARCHIVE |
| `chore/sandbox-setup` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-15-location-pages` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix: remove 404 path smoke test (dynamic routes match any path) | ARCHIVE |
| `tmp-art-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-art-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): include-hidden-files for artifact upload | ARCHIVE |
| `tmp-csrf-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-csrf-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to build env | ARCHIVE |
| `tmp-ds-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ds-chore/sandbox-setup` | 2026-04-11 | 64 | fix: add 'use client' to design system barrel and PriorityCard | ARCHIVE |
| `tmp-ts-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-ts-chore/sandbox-setup` | 2026-04-11 | 64 | fix: @ts-nocheck before 'use client' + component ordering | ARCHIVE |
| `tmp-uc-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-uc-chore/sandbox-setup` | 2026-04-11 | 64 | fix: add 'use client' to hook-using components + prisma generate in CI | ARCHIVE |
| `tmp-ci2-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-ci2-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): run prisma generate before tsc --noEmit | ARCHIVE |
| `tmp-rebase-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-rebase-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-ci-fix-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `tmp-ci-fix-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): correct pnpm --if-present flag placement | ARCHIVE |
| `ci2-fix` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-phillmcgurk/dr-191-p1-30-day-onboarding-workflow-automated-milestone-tracking` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-phillmcgurk/dr-192-p1-professional-commitment-framework-digital-agreement-code` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-31-poll-engine` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-324-omx-patterns` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-27-verified-facts-seed` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-54-event-submission-api` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-43-social-community-hub` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-38-stripe-industry-partners` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-34-partner-dashboard` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-33-statistics-newsletter` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-55-industry-calendar` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-15-location-pages` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-73-74-funnel-handoff` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-244-restore-assist-page` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-230-229-237-240-seo` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-48-49-calculators` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-320-event-pages` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-234-235-236-schema` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-feat/DR-60-hydration-fix` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `tmp-patch-chore/sandbox-setup` | 2026-04-11 | 64 | fix(ci): restore correct ci.yml with pnpm version fix | ARCHIVE |
| `ci-fix-batch` | 2026-04-11 | 64 | fix(ci): remove explicit PNPM_VERSION — use packageManager from package.json | ARCHIVE |
| `fix-ci` | 2026-04-11 | 64 | fix(ci): remove explicit PNPM_VERSION — use packageManager from package.json | ARCHIVE |
| `tmp22` | 2026-04-11 | 64 | feat(DR-10): add JSON-LD schema markup to all missing public pages | ARCHIVE |
| `batch-fix` | 2026-04-11 | 64 | fix: sync tsconfig.json and schema.prisma with develop HEAD | ARCHIVE |
| `validate-22` | 2026-04-11 | 64 | fix: sync tsconfig.json and schema.prisma with develop HEAD | ARCHIVE |
| `validate-16` | 2026-04-11 | 64 | fix: sync tsconfig.json and schema.prisma with develop HEAD | ARCHIVE |
| `validate-14` | 2026-04-11 | 64 | fix: sync tsconfig.json and schema.prisma with develop HEAD | ARCHIVE |
| `validate-9` | 2026-04-11 | 64 | fix: sync tsconfig.json and schema.prisma with develop HEAD | ARCHIVE |
| `fix-pr57` | 2026-04-11 | 64 | fix: sync schema.prisma and tsconfig.json with develop (adds NRPGCertScore + sdk shim) | ARCHIVE |
| `fix-tsconfig` | 2026-04-11 | 64 | fix: restore @anthropic-ai/sdk shim path in tsconfig (lost in #54 merge) | ARCHIVE |
| `tmp-pass` | 2026-04-11 | 64 | security(DR-220): strengthen secrets validation — block default/leaked values in production | ARCHIVE |
| `tmp-retry` | 2026-04-11 | 64 | feat(DR-324): Sprint 3 — Boardroom Dashboard at /admin/boardroom | ARCHIVE |
| `tmp-merge` | 2026-04-11 | 64 | fix(DR-233): keyword-rich H1 on homepage — Water, Fire, Storm & Mould Damage Repair | ARCHIVE |
| `tmp-pr55` | 2026-04-11 | 64 | fix(DR-198): use ComponentType over ElementType to fix 'never' TS error on icon className | ARCHIVE |
| `tmp-pr35` | 2026-04-11 | 64 | feat(DR-40): Tools Hub — /tools with 6 professional restoration calculators | ARCHIVE |
| `pr56-branch` | 2026-04-11 | 64 | fix(DR-192): use ComponentType over ElementType to fix 'never' TS error on icon className | ARCHIVE |
| `feat/DR-219-stripe-payment` | 2026-04-11 | 64 | fix(payments): DR-219 — take Stripe payment before creating Printful order | ARCHIVE |
| `feat/DR-232-page-metadata` | 2026-04-11 | 64 | feat(seo): DR-232 — add metadata exports to 8 public pages | ARCHIVE |
| `feat/DR-233-keyword-h1` | 2026-04-11 | 64 | feat(seo): update homepage H1 to keyword-rich text for Google ranking | ARCHIVE |
| `feat/DR-212-213-214-preproduction` | 2026-04-11 | 64 | feat(ci): pre-production checklist, smoke tests, E2E tests, pnpm CI fix (DR-212/213/214) | ARCHIVE |
| `feat/DR-42-supplier-directory` | 2026-04-11 | 64 | feat(industry): Supplier Directory, Drying Calculator, Templates, Event Submit (DR-42, DR-49, DR-51, DR-36) | ARCHIVE |
| `feat/DR-39-industry-partners` | 2026-04-11 | 64 | feat(industry): Industry Partners hub, Learning, Guides, Tools + nav update (DR-39, DR-41, DR-44, DR-52, DR-53) | ARCHIVE |
| `feat/DR-16-aeo-blitz` | 2026-04-11 | 64 | feat(DR-16): AEO blitz — FAQPage schema + stat citations + /events links on all 5 service category pages | ARCHIVE |
| `feat/DR-10-schema-blitz` | 2026-04-11 | 64 | feat(DR-10): add JSON-LD schema markup to all missing public pages | ARCHIVE |
| `feat/DR-5-emergency-finance` | 2026-04-11 | 64 | feat(DR-5): add /emergency-finance BlueFire Finance landing page | ARCHIVE |
| `feat/autonomous-sprint-system` | 2026-04-11 | 64 | fix(autonomous-sprint): restore tsconfig exclude list — preserve agents/seo/scripts exclusions | ARCHIVE |
| `feat/opensrc-source-intelligence` | 2026-04-11 | 64 | fix(opensrc): restore tsconfig exclude list — preserve agents/seo/scripts exclusions | ARCHIVE |
| `feat/DR-29-DR-46-DR-7-DR-6` | 2026-04-11 | 64 | feat(DR-29/DR-46/DR-7/DR-6): community hub, data contributor form, Unite-Hub connector + NEXUS branding | ARCHIVE |
| `feat/DR-50-supplier-directory` | 2026-04-11 | 64 | feat(DR-50): Supplier Directory — /directory with 8 categories + 4 listing tiers | ARCHIVE |
| `feat/DR-40-tools-hub` | 2026-04-11 | 64 | feat(DR-40): Tools Hub — /tools with 6 professional restoration calculators | ARCHIVE |
| `feat/DR-26-fact-shield-protocol` | 2026-04-11 | 64 | feat(DR-26): Fact Shield Protocol — 5-gate content verification system | ARCHIVE |
| `phillmcgurk/dr-220-p0-urgent-rotate-leaked-secrets-nextauth_secret-jwt_secret` | 2026-04-11 | 64 | security(DR-220): strengthen secrets validation — block default/leaked values in production | ARCHIVE |
| `phillmcgurk/dr-230-p0-seo-fix-all-disasterrecoverynrpgcomau-domain-references` | 2026-04-11 | 64 | fix(DR-230): replace all disasterrecoverynrpg.com.au → disasterrecovery.com.au | ARCHIVE |
| `phillmcgurk/dr-219-p0-store-stripe-payment-take-payment-before-printful-order` | 2026-04-11 | 64 | fix(DR-219): gate Printful order behind Stripe payment confirmation | ARCHIVE |
| `phillmcgurk/dr-320-build-001p0-dual-event-landing-pages-cyclone-narelle-wa-qld` | 2026-04-11 | 64 | feat(DR-320/DR-326): dual event landing pages — Cyclone Narelle WA + QLD Floods 2026 | ARCHIVE |
| `phillmcgurk/dr-233-p1-seo-fix-homepage-missing-h1` | 2026-04-11 | 64 | fix(DR-233): keyword-rich H1 on homepage — Water, Fire, Storm & Mould Damage Repair | ARCHIVE |
| `phillmcgurk/dr-198-p1-contractor-application-form-pre-onboarding-screening` | 2026-04-11 | 64 | fix(DR-198): use ComponentType over ElementType to fix 'never' TS error on icon className | ARCHIVE |
| `phillmcgurk/dr-189-p1-100-point-certification-system-build-scoring-engine` | 2026-04-11 | 64 | feat(nrpg): DR-189 — 100-point certification scoring engine + dashboard | ARCHIVE |
| `phillmcgurk/dr-193-p1-carsi-onboarding-sync-auto-assign-courses-when-contractor` | 2026-04-11 | 64 | fix(DR-193): fix ScoreInput property names + add @anthropic-ai/sdk shim for type resolution | ARCHIVE |
| `fix/anthropic-sdk-shim` | 2026-04-11 | 64 | fix: add @anthropic-ai/sdk shim for type resolution (batch processing) | ARCHIVE |
| `fix/turbo-csrf-env-vars` | 2026-04-11 | 64 | fix(ci): add CSRF_SECRET and JWT_SECRET to turbo globalEnv for cache key correctness | ARCHIVE |
| `fix/ci-env-vars-develop` | 2026-04-11 | 64 | ci: add CSRF_SECRET and JWT_SECRET env vars to test job | ARCHIVE |
| `fix/ci-add-auth-env-vars-to-all-jobs` | 2026-04-11 | 64 | ci: add CSRF_SECRET and JWT_SECRET to test and build jobs | ARCHIVE |
| `phillmcgurk/dr-232-p1-seo-add-metadata-exports-to-21-pages` | 2026-04-11 | 64 | chore: UNI-1760 — replace legacy Claude model strings with Claude 4.6 | ARCHIVE |
| `fix/DR-514-xss-secrets` | 2026-04-11 | 64 | chore: update pnpm-lock.yaml for dompurify, remove deprecated @types/dompurify stub | ARCHIVE |
| `fix/sec-hardcoded-fallback-secrets` | 2026-04-11 | 65 | ci: add CSRF_SECRET and JWT_SECRET test env vars to build and smoke-test steps | ARCHIVE |
| `fix/sec-hardcoded-fallback-secrets-local` | 2026-04-11 | 65 | fix(security): remove hardcoded fallback secrets in JWT and CSRF modules | ARCHIVE |
| `fix/DR-515-dependency-vulnerabilities` | 2026-04-11 | 65 | fix: disable @next/next/no-html-link-for-pages — pre-existing across 30+ files (same treatment as DR consumer site DR-525) | KEEP |
| `feat/gap-061-payment-model-correction` | 2026-04-08 | 67 | Fix TypeScript type configuration — install @types/node, remove test-only types | KEEP |
| `phillmcgurk/dr-333-dr-330-boardroom-state-ralplan` | 2026-04-04 | 71 | feat(boardroom): DR-330 add RALPLAN-DR block requirement to claude.md | ARCHIVE |
| `phillmcgurk/uni-1760` | 2026-04-04 | 72 | chore: UNI-1760 — replace legacy Claude model strings with Claude 4.6 | ARCHIVE |
| `phillmcgurk/dr-73-funnel-884a` | 2026-04-04 | 72 | docs: DR-73 — 3-business lead funnel design document | ARCHIVE |
| `phillmcgurk/dr-60-dr-fix-nextjs-hydration-mismatch` | 2026-04-04 | 72 | fix: DR-60 — fix Next.js hydration mismatches | ARCHIVE |
| `phillmcgurk/dr-244-p2-seo-create-restore-assist-landing-page` | 2026-04-04 | 72 | feat(seo): DR-244 — /restore-assist landing page | ARCHIVE |
| `phillmcgurk/dr-234-p1-seo-add-faqpage-schema` | 2026-04-04 | 72 | feat(seo): DR-234 — FAQPage schema + FAQ sections for 5 service pages | ARCHIVE |
| `feat/framework-governance-upgrade` | 2026-04-03 | 72 | feat(governance): adopt NodeJS Starter V1 framework upgrades | ARCHIVE |
| `chore/claude-config-ts-fixes-fullscreen` | 2026-04-03 | 72 | chore: claude config, fullscreen rendering, fix all TypeScript errors | ARCHIVE |
| `feature/nrpg-cost-calculator` | 2026-03-03 | 103 | feat: Add Cost Estimate nav link to UltraModernHeader | KEEP |
| `staging` | 2026-01-10 | 155 | fix: Update Jest config and fix test dates for Phase 3 tests | KEEP |
| `feature/backend-integration` | 2025-12-30 | 166 | docs: Add migration completion report | ARCHIVE |

## 5-second summary
296 remote branches audited; 26 KEEP, 270 ARCHIVE, 0 INVESTIGATE; tmp-ci2-* is a 20-branch throwaway CI cluster, and feat/DR-34-* is the partner-dashboard line.