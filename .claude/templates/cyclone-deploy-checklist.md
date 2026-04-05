# Cyclone Rapid-Deploy Checklist (BUILD-006)

Use this BEFORE deploying any new cyclone event page.

## Pre-Deploy Gate (all 5 must be GREEN before committing)

- [ ] **G1 — Official declaration confirmed**
  Source: BOM naming bulletin OR DRFA/state government declaration
  URL of source: _______________

- [ ] **G2 — Affected LGAs verified**
  Source: Official DRFA declaration or state emergency management site
  LGA list matches declaration exactly (no extras, no guesses)

- [ ] **G3 — Financial assistance verified**
  Every amount, deadline, and program name has a direct government URL
  No invented figures. If amount unknown, field omitted.

- [ ] **G4 — Qualifying language applied**
  Remote/inaccessible LGAs use: "subject to access conditions being met"
  Applied to: _______________

- [ ] **G5 — Phase correct**
  - `pre-landfall`: system named, NOT made landfall yet → urgent prep tone
  - `recovery`: landfall confirmed, recovery underway → claims/assistance focus

## Deploy Steps

1. Copy template: `cp .claude/templates/cyclone-event-page.template.tsx apps/web/app/(public)/cyclone-[name]-[state]-[year]/page.tsx`
2. Fill all `[PLACEHOLDER]` values with verified data
3. Run: `npx tsc --noEmit` (0 errors required)
4. Commit to `develop` branch
5. Open PR → main
6. After merge, run: `cd apps/web && vercel deploy --prebuilt --prod` (or push triggers GitHub Action if secrets are configured)
7. Verify live URL within 5 minutes of deploy

## Quick Data Sources by State

| State | DRFA/Recovery Portal | Hotline |
|-------|---------------------|---------|
| QLD | disaster.qld.gov.au | 1800 173 349 |
| WA | dfes.wa.gov.au/recovery | 1800 032 965 |
| NT | nt.gov.au/emergency | 1800 723 375 |
| NSW | service.nsw.gov.au | 13 77 88 |
| VIC | emergency.vic.gov.au | 1800 226 226 |

## Common Financial Programs (QLD cyclone events)

| Program | Abbrev | Typical amount | Open duration |
|---------|--------|----------------|---------------|
| Essential Services Hardship Allowance | ESHA | $150/person | ~2 weeks |
| Personal Hardship Assistance | PHA | $180/person | ~6 weeks |
| QRIDA Disaster Assistance Loan | DAL | up to $250K | varies |
| Commonwealth Disaster Recovery Payment | DRP | $1,000/adult | varies |
| Commonwealth Disaster Recovery Allowance | DRA | 13 weeks income support | varies |

**VERIFY ALL AMOUNTS** — these change per event. Always link to official source.
