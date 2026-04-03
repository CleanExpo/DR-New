# 3-Business Lead Funnel Design

**Issue:** DR-73
**Status:** Design Complete
**Owner:** Product
**Date:** April 2026

---

## Overview

The NRPG platform serves three distinct business types, each requiring a separate lead funnel with different entry points, qualification criteria, and conversion goals.

| Business | Target | Entry Point | Goal |
|----------|--------|-------------|------|
| **Disaster Recovery Australia** (DR) | Property owners in crisis | `/claim/step-1`, homepage CTAs | Submit verified damage claim |
| **NRPG Contractor Marketplace** | Licensed restoration contractors | `/contractors/join` | Complete contractor application |
| **RestoreAssist** | Field technicians at contractor companies | `/restore-assist` | Activate RestoreAssist via NRPG membership |

---

## Funnel 1 — Property Owner (Disaster Recovery Australia)

### Entry Points
- Homepage hero CTA: "Report a Claim" → `/claim/step-1`
- Event landing pages (e.g., `/events/cyclone-narelle-2026-wa`)
- Google Ads: emergency keywords ("water damage restoration near me")
- Organic search: service pillar pages (`/services/water-damage`)

### Funnel Stages

```
Stage 1: AWARENESS
  Channel: Google Ads (emergency intent) + SEO pillar pages
  Page: Homepage / Service page
  Goal: Visitor understands NRPG can solve their problem NOW
  KPI: Bounce rate < 60%, time on page > 90s

Stage 2: INTENT
  Channel: CTA click (Report a Claim / Get a Quote)
  Page: /claim/step-1 — Property type + damage type
  Goal: Qualify the damage (fire/water/storm/mould) and property type
  KPI: Step 1 completion rate > 70%

Stage 3: QUALIFICATION
  Page: /claim/step-2 — Location + postcode + urgency
  Goal: Geo-match to available contractors; confirm 24/7 vs scheduled
  KPI: Step 2 completion rate > 65%

Stage 4: CONVERSION
  Page: /claim/step-3 — Contact details + submit
  Goal: Capture name, property address, preferred contact
  Trigger: Auto-match to nearest IICRC-certified contractor
  KPI: Submission rate > 55% of Step 2 completions

Stage 5: POST-CONVERSION
  Page: /request-submitted
  Action: SMS confirmation + contractor ETD sent to property owner
  Goal: Reduce call-back anxiety; confirm ETA within 15 min
  KPI: < 5% call-in rate post-submission
```

### Qualification Criteria
- Australian address (postcode validation)
- Damage occurred within last 72 hours (urgency flag)
- Property is residential or SME commercial (not large industrial)
- Not already engaged with another restoration company

### Drop-off Recovery
- **Step 1 abandon:** Retargeting pixel → Google Display ad with "Still need help?"
- **Step 2 abandon:** Exit-intent modal with "Get a free call-back in 60 min"
- **Step 3 abandon:** Email/SMS follow-up if email captured at Step 2

### Conversion Metrics (Target)
| Stage | Target Rate | Notes |
|-------|-------------|-------|
| Homepage → Step 1 | 8% | Emergency intent visitors |
| Step 1 → Step 2 | 70% | Simple qualification only |
| Step 2 → Step 3 | 65% | Contractor availability check |
| Step 3 → Submit | 55% | Contact detail friction point |
| End-to-end | ~2.5% | Of all site visitors |

---

## Funnel 2 — Contractor Application (NRPG Marketplace)

### Entry Points
- `/contractors` → "Join the Network" CTA
- `/contractors/join` direct
- LinkedIn Ads (targeting: IICRC certified, restoration industry, Australia)
- Industry publications (AIRC, Master Builders magazine)

### Funnel Stages

```
Stage 1: DISCOVERY
  Channel: LinkedIn Ads + SEO ("join disaster recovery network")
  Page: /contractors — value proposition for contractors
  Goal: Contractor understands revenue opportunity
  KPI: CTA click rate > 12%

Stage 2: INTEREST
  Page: /contractors/join — Application form page
  Goal: Contractor begins multi-step application
  Fields (Step 1): Business name, ABN, state, services offered
  KPI: Application start rate > 40% of page visitors

Stage 3: VERIFICATION
  Internal process (async, 24-72 hours):
  - ABN validation via ABR API
  - IICRC certification check
  - Insurance currency verification (public liability min $10M)
  - Police check consent (for biohazard/trauma contractors)
  Goal: Only verified, qualified contractors on the platform
  KPI: Verification pass rate target 65% of applicants

Stage 4: ONBOARDING
  Pages: /dashboard/contractor/onboarding
  Action: Profile completion, service area definition, rate setting
  Goal: Contractor live and job-ready within 48 hours
  KPI: Profile completion > 80% within 7 days

Stage 5: ACTIVATION
  Trigger: First job lead received
  Goal: Contractor responds to lead within 60 minutes
  KPI: First lead response rate > 75%
```

### Qualification Criteria
- Valid Australian ABN
- Active IICRC certification (S500, FSRT, S520 or S540 minimum one)
- Public liability insurance ≥ $10M AUD current
- Operating in at least one NRPG service postcode
- No active deregistration or insolvency action

### Rejection Handling
- Unverified ABN → Guided to ABR registration
- Lapsed IICRC → Link to IICRC renewal portal (iicrc.org/certification)
- Insufficient insurance → "We'll revisit your application once renewed"
- Full coverage area → Waitlist with estimated activation date

### Conversion Metrics (Target)
| Stage | Target Rate | Notes |
|-------|-------------|-------|
| /contractors → Apply start | 12% | Page visitors to form start |
| Apply start → Verification submit | 60% | All fields completed |
| Verification submit → Pass | 65% | Quality gate — do not compromise |
| Pass → Profile complete | 80% | 7-day window |
| Profile complete → First job | 70% | 30-day window |
| End-to-end activated | ~3.4% | Of /contractors page visitors |

---

## Funnel 3 — RestoreAssist Activation (Field Tool)

### Entry Points
- `/restore-assist` landing page
- NRPG contractor onboarding email sequence (Day 2 email)
- In-dashboard prompt after contractor profile completion

### Funnel Stages

```
Stage 1: AWARENESS
  Channel: NRPG contractor onboarding email (Day 2 of 5-email sequence)
  Page: /restore-assist
  Goal: Contractor understands RestoreAssist is included free
  KPI: Email open rate > 35%, CTA click > 15%

Stage 2: SIGN-UP
  Trigger: Contractor clicks "Get RestoreAssist" in email or /restore-assist CTA
  Action: Redirects to contractor dashboard → RestoreAssist activation tab
  Goal: Contractor activates RestoreAssist from their existing NRPG account
  KPI: Activation start > 60% of CTAs

Stage 3: DEVICE SETUP
  Page: /dashboard/contractor/restore-assist/setup
  Action: Download iOS/Android app OR use web app
  Goal: First device registered to contractor profile
  KPI: Device registered within 48 hours of activation > 50%

Stage 4: FIRST USE
  Trigger: First job started in RestoreAssist (photo + moisture reading logged)
  Goal: Contractor experiences core value loop on a real job
  KPI: First job completed in RestoreAssist > 40% within 14 days

Stage 5: RETENTION
  Metric: 30-day active use (≥ 1 job per month)
  Goal: RestoreAssist becomes default field documentation tool
  KPI: 30-day retention > 65%
```

### Target Users Within Contractor Companies
1. **Lead Technician** — Primary user; documents every job
2. **Operations Manager** — Uses dashboard view; approves reports
3. **Site Crew** — Receives task assignments via app

### Adoption Accelerators
- Integration with NRPG job assignment system (auto-creates job in RestoreAssist when contractor accepts lead)
- IICRC compliance checklists pre-built (reduces setup effort)
- Insurance report export removes manual PDF writing (time saving = adoption driver)

### Conversion Metrics (Target)
| Stage | Target Rate | Notes |
|-------|-------------|-------|
| Email/page → Activation start | 60% | Low friction — already logged in |
| Activation start → Device registered | 50% | App download friction point |
| Device registered → First job | 40% | 14-day window |
| First job → 30-day retention | 65% | After experiencing value |
| End-to-end retained users | ~7.8% | Of contractor base |

---

## Cross-Funnel Attribution

Each funnel has a distinct UTM structure for attribution:

| Funnel | UTM Source | UTM Medium | UTM Campaign |
|--------|------------|------------|--------------|
| Property owner (paid) | google | cpc | dr-emergency-[service] |
| Property owner (organic) | organic | seo | dr-pillar-[service] |
| Contractor | linkedin | paid-social | nrpg-contractor-[state] |
| RestoreAssist | nrpg-email | email | ra-onboarding-d2 |

---

## Implementation Notes

### Data Requirements
- All funnel stage transitions tracked via Google Analytics 4 custom events
- Funnel visualisation in GA4 Exploration reports per segment
- Contractor pipeline tracked in Linear (DR project) with stage labels

### Privacy Compliance
- Property owner lead data: collected under Privacy Act 1988 (Cth) schedule
- Contractor ABN/insurance data: retained per Australian financial services records obligations
- RestoreAssist usage analytics: aggregated, no individual job data shared

### Next Steps
1. Instrument GA4 events for all funnel stage transitions
2. Build A/B test on `/claim/step-1` CTA wording (emergency vs standard)
3. Build contractor application progress-save (reduce drop-off at long form)
4. Create RestoreAssist onboarding email sequence (Day 1–5)
