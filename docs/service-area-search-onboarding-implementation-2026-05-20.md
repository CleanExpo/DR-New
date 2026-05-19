# DR/NRPG Service-Area Search + Onboarding Implementation

Date: 2026-05-20
Status: Active build packet

## Operating Decision

DR/NRPG is an online-first service-area and contractor-network business, not a storefront-location business.

The platform must win local search in locations where the network can actually serve clients, while client and contractor onboarding remain digital-first. Do not create fake office locations, fake Google Business Profiles, phone-first funnels, or keyword-stuffed business names.

## Existing Surface

This repo already has the load-bearing pieces:

- Client intake: `apps/web/app/api/public/lead-capture/route.ts`, `apps/web/app/api/public/claims/submit/route.ts`, `apps/web/app/api/public/service-requests/route.ts`, `apps/web/app/claim/*`
- Contractor intake: `apps/web/app/(contractor)/join/page.tsx`, `apps/web/app/contractors/join/page.tsx`, `apps/web/app/api/public/contractor/application/route.ts`
- Contractor verification: `apps/web/app/api/admin/contractors/verification/route.ts`, `apps/web/app/dashboard/admin/contractors/verification/page.tsx`
- Contractor service areas: `apps/web/app/api/contractor/verification/service-areas/route.ts`, contractor onboarding pages, contractor directory pages
- Search pages: `apps/web/app/[city]/[service]/page.tsx`, `apps/web/app/[city]/area/[suburb]/[service]/page.tsx`
- Admin search view: `apps/web/app/dashboard/admin/search-dominance/page.tsx`
- Existing tests and evidence: `docs/RETESTING-CYCLES.md`, `docs/UNI-182-PROJECT-COMPLETION.md`, `docs/testing/e2e-contractor-flow.md`

## Architecture Rule

Entry routes stay thin. Domain decisions live in service modules and reusable helpers:

```text
public/client routes
  -> validation
  -> intake service
  -> matching/triage service
  -> persistence/events
  -> email/notification adapters

public/contractor routes
  -> validation
  -> contractor onboarding service
  -> verification/service-area service
  -> persistence/events
  -> Synthex/Unite-Group event bridge
```

## Search Model

### What Ranks

Rank service-area pages and contractor-network authority, not fake branch offices.

Required page families:

- `/[city]/[service]` for city-level commercial intent
- `/[city]/area/[suburb]/[service]` for suburb-level service proof
- contractor directory/profile pages for verified local capacity
- educational restoration guides for AEO/GEO support

High-value service clusters:

- water damage restoration
- flood damage restoration
- storm damage restoration
- fire and smoke damage restoration
- mould remediation
- structural drying
- emergency make-safe
- insurance restoration documentation

### Page Evidence Requirements

Every location/service page needs:

- served location and surrounding service radius
- service category and urgency level
- visible client intake CTA
- visible contractor onboarding CTA where contractor coverage is thin
- contractor coverage proof or a clear "network expanding" state
- compliant NRPG language from `docs/contractor-network/nrpg-network-partner-language.md`
- Australian English
- no direct phone-number-first CTA
- schema-ready business/service/FAQ content
- internal links to relevant services, suburbs, contractor directory, and onboarding

### Search Data Loop

Use the existing PostgreSQL search preference from `AGENTS.md`. Treat any Algolia-era document as legacy unless current code proves it is still active.

Minimum loop:

```text
Search Console query/location data
  -> Synthex opportunity packet
  -> DR/NRPG page or contractor-gap action
  -> service-area evidence check
  -> publish/update through approval gate
  -> KPI registration and controlled-retreat review
```

## GBP Rule

DR/NRPG can use GBP only where eligible:

- service-area or hybrid profile if real in-person service is delivered
- public address hidden if customers are not served at that address
- no fake city profiles
- no keyword/location stuffing in business names
- contractor GBP improvements are support work, not central DR/NRPG identity substitution

Contractor GBP audits must respect the repo's no-phone-first model. Public profile contact fields can be audited for contractor-owned accuracy where required, but DR/NRPG pages and components must not add phone-number CTAs.

## Onboarding Build Slice

### Client Intake

Capture:

- damage type
- urgency
- location/suburb/postcode
- property type
- photos/documents
- insurer context if supplied
- consent for contact, matching, and documentation
- email-first contact path

Route to:

- triage
- contractor matching
- claim/service request dashboard
- Synthex attribution event
- Unite-Group command-center visibility

### Contractor Intake

Capture:

- business identity
- ABN/licence/insurance
- IICRC and trade credentials
- services offered
- service areas and radius
- response capacity
- evidence documents
- consent for public listing and network standards

Route to:

- verification queue
- service-area coverage model
- contractor onboarding event
- Synthex budget/KPI/search pipeline
- Unite-Group command-center visibility

## Synthex Integration

Synthex already has primitives for this pipeline:

- `lib/contractor` emits contractor onboarding events.
- `lib/budget` gates new service-area openings and per-contractor spend.
- `lib/kpi` records per-location attribution snapshots.
- `lib/nrpg-pipeline/handler.ts` orchestrates contractor onboarding into service-area expansion workers.

DR/NRPG should send only evidence-backed onboarding/search events into Synthex. Synthex decides automation, budget, QA, and publish readiness; DR/NRPG remains the product surface for clients and contractors.

## Unite-Group Integration

Unite-Group should see the operating picture, not own the domain work:

- new client intake volume
- contractor applications awaiting verification
- service-area coverage gaps
- local search wins/losses
- pages awaiting evidence/QA
- budget caps and retreat candidates
- GBP/API blockers

## First Build Tasks

- [ ] Confirm current client intake routes write the location/service fields needed by search and matching.
- [ ] Confirm current contractor application routes write service-area radius, services, certifications, insurance, and public-listing consent.
- [ ] Add or verify a service-area coverage object that can feed Synthex `ContractorOnboardedEvent`.
- [ ] Add a location/service page readiness checklist to the admin search-dominance view.
- [ ] Add Synthex event bridge documentation or handler wiring only after route payloads are verified.
- [ ] Add command-center visibility for intake, contractor gaps, and search-dominance state.

## Verification

- `pnpm test:web` or targeted tests for client intake and contractor application.
- `pnpm type-check` before any app-code PR.
- Search page smoke for `/[city]/[service]` and `/[city]/area/[suburb]/[service]`.
- No phone-number CTA regression.
- No fake GBP/storefront copy regression.
