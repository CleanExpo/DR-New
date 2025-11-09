# Design System Implementation Checklist

**Project:** Disaster Recovery Brisbane Website Overhaul
**Objective:** Apply landing page visual design system to all pages
**Reference:** See `DESIGN-SYSTEM.md` for complete specifications

---

## Overview

This checklist tracks the implementation of the design system across all website pages. Each page should be updated to match the dramatic storm/fire/lightning aesthetic from `app/page.tsx`.

**Status Legend:**
- ⬜ Not Started
- 🔄 In Progress
- ✅ Complete
- ⚠️ Issues/Blocked

---

## Phase 1: Critical Service Pages (Week 1)

### Service Pages - Top Priority
**Impact:** Highest traffic pages for emergency inquiries

#### Water Damage Service Page
- ⬜ **File:** `app/services/water-damage/page.tsx`
- **Changes Required:**
  - ⬜ Replace generic hero with Service Page Hero pattern
  - ⬜ Add water-wave CSS effect to relevant sections
  - ⬜ Update service cards to match landing page style
  - ⬜ Add trust indicator cards (60-min response, Master Restorer, etc.)
  - ⬜ Implement emergency CTA section with red gradient
  - ⬜ Update FAQ accordion to landing page style
  - ⬜ Color scheme: Blue primary, emergency red CTAs
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 4 hours

#### Fire Damage Service Page
- ⬜ **File:** `app/services/fire-damage/page.tsx`
- **Changes Required:**
  - ⬜ Replace generic hero with Service Page Hero pattern
  - ⬜ Add fire-glow CSS effect to hero and key sections
  - ⬜ Update service cards with red/orange color scheme
  - ⬜ Add trust indicator cards
  - ⬜ Implement emergency CTA section with red gradient
  - ⬜ Update FAQ accordion
  - ⬜ Color scheme: Red primary, fire orange accents
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 4 hours

#### Mould Remediation Service Page
- ⬜ **File:** `app/services/mould-remediation/page.tsx`
- **Changes Required:**
  - ⬜ Replace generic hero with Service Page Hero pattern
  - ⬜ Update service cards with green color scheme
  - ⬜ Add trust indicator cards
  - ⬜ Implement emergency CTA section
  - ⬜ Update FAQ accordion
  - ⬜ Color scheme: Green primary (success-600), blue secondary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3.5 hours

#### Storm Damage Service Page
- ⬜ **File:** `app/services/storm-damage/page.tsx`
- **Changes Required:**
  - ⬜ Replace generic hero with Service Page Hero pattern
  - ⬜ Add storm/lightning imagery
  - ⬜ Update service cards with blue/gray color scheme
  - ⬜ Add trust indicator cards
  - ⬜ Implement emergency CTA section
  - ⬜ Update FAQ accordion
  - ⬜ Color scheme: Storm blue (primary-800/900)
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3.5 hours

**Phase 1 Total Estimated Time:** 15 hours

---

## Phase 2: Premium Location Pages (Week 2)

### High-Value Brisbane Suburbs

#### Hamilton Location Page
- ⬜ **File:** `app/locations/hamilton/page.tsx`
- **Changes Required:**
  - ⬜ Implement Location Page Hero pattern with stats
  - ⬜ Add glass morphism stat cards (30-min response, 24/7, Master)
  - ⬜ Update service area map styling
  - ⬜ Add benefit cards with colored icon badges
  - ⬜ Implement emergency CTA section
  - ⬜ Update location-specific trust indicators
  - ⬜ Color scheme: Blue primary (premium Brisbane suburb)
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3 hours

#### Ascot Location Page
- ⬜ **File:** `app/locations/ascot/page.tsx`
- **Changes Required:**
  - ⬜ Implement Location Page Hero pattern
  - ⬜ Add glass morphism stat cards
  - ⬜ Update service offerings with landing page card style
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Blue primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3 hours

#### New Farm Location Page
- ⬜ **File:** `app/locations/new-farm/page.tsx`
- **Changes Required:**
  - ⬜ Implement Location Page Hero pattern
  - ⬜ Add glass morphism stat cards
  - ⬜ Update service offerings
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Blue primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3 hours

#### Toowong Location Page
- ⬜ **File:** `app/locations/toowong/page.tsx`
- **Changes Required:**
  - ⬜ Implement Location Page Hero pattern
  - ⬜ Add glass morphism stat cards
  - ⬜ Update service offerings
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Blue primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3 hours

**Phase 2 Total Estimated Time:** 12 hours

---

## Phase 3: Emergency Response Pages (Week 3)

### Critical Emergency Pages

#### After-Hours Emergency Page
- ⬜ **File:** `app/emergency/after-hours/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero (red gradient, centered)
  - ⬜ Add pulsing urgent badge
  - ⬜ Oversized emergency CTA button (px-16 py-8)
  - ⬜ Emergency pulse animation on phone icon
  - ⬜ Red gradient background for CTA section
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Weekend Emergency Page
- ⬜ **File:** `app/emergency/weekend-emergency/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero
  - ⬜ Add pulsing urgent badge
  - ⬜ Oversized emergency CTA
  - ⬜ Emphasize 24/7 availability
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Christmas Emergency Page
- ⬜ **File:** `app/emergency/christmas-emergency/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero
  - ⬜ Add pulsing urgent badge ("We're Open Christmas Day")
  - ⬜ Oversized emergency CTA
  - ⬜ Holiday-specific messaging
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Midnight Emergency Page
- ⬜ **File:** `app/emergency/midnight-emergency/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero
  - ⬜ Add pulsing urgent badge
  - ⬜ Oversized emergency CTA
  - ⬜ Emphasize immediate response
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Public Holiday Emergency Page
- ⬜ **File:** `app/emergency/public-holiday-emergency/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero
  - ⬜ Add pulsing urgent badge
  - ⬜ Oversized emergency CTA
  - ⬜ List all public holidays covered
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Main Emergency Page
- ⬜ **File:** `app/emergency/page.tsx`
- **Changes Required:**
  - ⬜ Implement Emergency Page Hero
  - ⬜ Add comprehensive emergency service cards
  - ⬜ Trust indicator section
  - ⬜ Multiple emergency CTAs
  - ⬜ Color scheme: Emergency red primary
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3.5 hours

**Phase 3 Total Estimated Time:** 16 hours

---

## Phase 4: Component Library Creation (Week 4)

### Reusable Components
**Location:** `components/design-system/`

#### Core Components

- ⬜ **TrustCard.tsx**
  - Glass morphism card with icon, stat, label, detail
  - Props: icon, stat, label, detail, iconColor
  - Used in: Trust sections across all pages
  - **Time:** 1 hour

- ⬜ **ServiceCard.tsx**
  - White card with colored icon, hover border
  - Props: icon, iconColor, borderColor, title, description, features, link
  - Used in: Service pages, homepage
  - **Time:** 1.5 hours

- ⬜ **BenefitCard.tsx**
  - Gray bg card with colored icon badge
  - Props: icon, bgColor, title, description
  - Used in: About, location pages, service benefits
  - **Time:** 1 hour

- ⬜ **LocationCard.tsx**
  - White card with icon header for service areas
  - Props: icon, iconColor, location, areas, link
  - Used in: Location listing pages
  - **Time:** 1 hour

- ⬜ **FAQItem.tsx**
  - Accordion with arrow rotation
  - Props: question, answer
  - Used in: FAQ sections across site
  - **Time:** 0.5 hours

- ⬜ **EmergencyCTA.tsx**
  - Large phone button with pulse animation
  - Props: phone, displayText, variant, size
  - Used in: All pages (primary CTA)
  - **Time:** 1 hour

- ⬜ **Badge.tsx**
  - Pill-shaped badge/tag
  - Props: text, emoji, variant, animate
  - Used in: Hero sections, highlights
  - **Time:** 0.5 hours

- ⬜ **InfoBox.tsx**
  - Colored background info banner
  - Props: children, bgColor
  - Used in: Important notices, tips
  - **Time:** 0.5 hours

- ⬜ **HeroSection.tsx**
  - Flexible hero with variants (service, location, emergency, insurance)
  - Props: variant, image, title, subtitle, badges, ctas
  - Used in: All page types
  - **Time:** 3 hours

- ⬜ **StatDisplay.tsx**
  - Stat number with label
  - Props: emoji, stat, label
  - Used in: CTA sections, trust sections
  - **Time:** 0.5 hours

**Phase 4 Total Estimated Time:** 10.5 hours

---

## Phase 5: Insurance Provider Pages (Week 5)

### Top 5 Insurers

#### Suncorp Insurance Page
- ⬜ **File:** `app/insurance/suncorp/page.tsx`
- **Changes Required:**
  - ⬜ Implement Insurance Provider Hero (blue gradient, 2-column)
  - ⬜ Add trust badge grid (4 badges)
  - ⬜ Benefit checklist with green checkmarks
  - ⬜ Direct billing emphasis
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Professional blue
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 3 hours

#### RACQ Insurance Page
- ⬜ **File:** `app/insurance/racq/page.tsx`
- **Changes Required:**
  - ⬜ Implement Insurance Provider Hero
  - ⬜ Add trust badge grid
  - ⬜ Benefit checklist
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Professional blue
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### Allianz Insurance Page
- ⬜ **File:** `app/insurance/allianz/page.tsx`
- **Changes Required:**
  - ⬜ Implement Insurance Provider Hero
  - ⬜ Add trust badge grid
  - ⬜ Benefit checklist
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Professional blue
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### QBE Insurance Page
- ⬜ **File:** `app/insurance/qbe/page.tsx`
- **Changes Required:**
  - ⬜ Implement Insurance Provider Hero
  - ⬜ Add trust badge grid
  - ⬜ Benefit checklist
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Professional blue
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

#### NRMA Insurance Page
- ⬜ **File:** `app/insurance/nrma/page.tsx`
- **Changes Required:**
  - ⬜ Implement Insurance Provider Hero
  - ⬜ Add trust badge grid
  - ⬜ Benefit checklist
  - ⬜ Add emergency CTA section
  - ⬜ Color scheme: Professional blue
  - ⬜ Test: Color contrast, keyboard nav, mobile responsive
- **Estimated Time:** 2.5 hours

**Phase 5 Total Estimated Time:** 13 hours

---

## Phase 6: Secondary Location Pages (Week 6)

### Ipswich Premium Suburbs

#### Karalee Location Page
- ⬜ **File:** `app/locations/karalee/page.tsx`
- **Changes:** Location Page Hero, stat cards, emergency CTA
- **Color:** Purple accent (Ipswich branding)
- **Time:** 2.5 hours

#### Brookwater Location Page
- ⬜ **File:** `app/locations/brookwater/page.tsx`
- **Changes:** Location Page Hero, stat cards, emergency CTA
- **Color:** Purple accent
- **Time:** 2.5 hours

#### Springfield Lakes Location Page
- ⬜ **File:** `app/locations/springfield-lakes/page.tsx`
- **Changes:** Location Page Hero, stat cards, emergency CTA
- **Color:** Purple accent
- **Time:** 2.5 hours

### Additional Brisbane Suburbs

#### Paddington Location Page
- ⬜ **File:** `app/locations/paddington/page.tsx`
- **Changes:** Location Page Hero, stat cards, emergency CTA
- **Color:** Blue accent
- **Time:** 2.5 hours

#### Bulimba Location Page
- ⬜ **File:** `app/locations/bulimba/page.tsx`
- **Changes:** Location Page Hero, stat cards, emergency CTA
- **Color:** Blue accent
- **Time:** 2.5 hours

### Logan Areas

#### Logan Central Location Page
- ⬜ **File:** `app/locations/logan-central/page.tsx`
- **Changes:** Location Page Hero (commercial focus), stat cards, emergency CTA
- **Color:** Orange accent (Logan branding)
- **Time:** 2.5 hours

**Phase 6 Total Estimated Time:** 15 hours

---

## Phase 7: FAQ & Guide Pages (Week 7-8)

### FAQ Pages

#### Water Damage FAQ
- ⬜ **File:** `app/faq/water-damage/page.tsx`
- **Changes:** Update accordion items to landing page style, add emergency CTA
- **Time:** 1.5 hours

#### Fire Damage FAQ
- ⬜ **File:** `app/faq/fire-damage/page.tsx`
- **Changes:** Update accordion items, add emergency CTA
- **Time:** 1.5 hours

#### Insurance Claims FAQ
- ⬜ **File:** `app/faq/insurance-claims/page.tsx`
- **Changes:** Update accordion items, add trust indicators
- **Time:** 1.5 hours

#### Mould Removal FAQ
- ⬜ **File:** `app/faq/mould-removal/page.tsx`
- **Changes:** Update accordion items, add emergency CTA
- **Time:** 1.5 hours

#### Storm Damage FAQ
- ⬜ **File:** `app/faq/storm-damage/page.tsx`
- **Changes:** Update accordion items, add emergency CTA
- **Time:** 1.5 hours

#### Emergency Response FAQ
- ⬜ **File:** `app/faq/emergency-response/page.tsx`
- **Changes:** Update accordion items, urgent styling
- **Time:** 1.5 hours

### Guide Pages (Sample - Apply to All)

#### Emergency Christmas Water Damage Guide
- ⬜ **File:** `app/guides/emergency/christmas-emergency-water-damage/page.tsx`
- **Changes:** Article hero, info boxes, emergency CTAs throughout
- **Time:** 2 hours

#### Fire Smoke Damage Cleaning Guide
- ⬜ **File:** `app/guides/fire-damage/smoke-damage-cleaning-guide/page.tsx`
- **Changes:** Article hero, step-by-step cards, fire-glow effects
- **Time:** 2 hours

#### Insurance Section 54 Contractor Rights
- ⬜ **File:** `app/guides/insurance/section-54-contractor-rights/page.tsx`
- **Changes:** Professional blue scheme, trust indicators, info boxes
- **Time:** 2 hours

**Phase 7-8 Total Estimated Time:** 15 hours (for priority guides + all FAQs)

---

## Testing Checklist (Per Page)

### Visual Design
- ⬜ Hero section matches design system specification
- ⬜ Color scheme consistent with page type (service, location, emergency, insurance)
- ⬜ Typography hierarchy correct (h1 > h2 > h3 > p)
- ⬜ Spacing consistent (py-20 sections, gap-8 grids)
- ⬜ Cards have correct shadow and hover states
- ⬜ Animations present but not overwhelming

### Accessibility
- ⬜ Color contrast meets WCAG AA (4.5:1 normal, 3:1 large)
- ⬜ All images have descriptive alt text
- ⬜ Heading hierarchy is logical (no skipped levels)
- ⬜ All interactive elements have focus indicators
- ⬜ Phone links have proper aria-labels
- ⬜ Reduced motion respected (test with prefers-reduced-motion)
- ⬜ Keyboard navigation works (tab through all elements)
- ⬜ Screen reader announces content correctly (test with NVDA/VoiceOver)

### Responsive Design
- ⬜ Mobile (375px): Layout doesn't break, text readable
- ⬜ Tablet (768px): Grid transitions work (1 col → 2/3 col)
- ⬜ Desktop (1280px): Full layout displays correctly
- ⬜ Touch targets minimum 48x48px on mobile
- ⬜ Images load correctly on all sizes
- ⬜ CTAs accessible with thumb on mobile

### Performance
- ⬜ Hero image uses priority loading
- ⬜ Below-fold images use lazy loading
- ⬜ Images in WebP format where possible
- ⬜ No layout shift on load (CLS < 0.1)
- ⬜ First Contentful Paint < 2s
- ⬜ Largest Contentful Paint < 2.5s

### Content Compliance
- ⬜ No "RAI" or "RIA" certification claims
- ⬜ No national/interstate coverage claims
- ⬜ Phone number is 1300 309 361
- ⬜ Email is admin@disasterrecovery.com.au
- ⬜ Phill McGurk identified as "IICRC Master Restorer"
- ⬜ Service areas limited to Brisbane, Ipswich, Logan
- ⬜ No fake statistics or testimonials

### Code Quality
- ⬜ TypeScript errors resolved (npx tsc --noEmit)
- ⬜ Build succeeds (npm run build)
- ⬜ No console errors
- ⬜ ESLint warnings addressed
- ⬜ Components use design system imports where applicable

---

## Implementation Notes

### Before Starting Each Page:
1. Read relevant section in `DESIGN-SYSTEM.md`
2. Review landing page (`app/page.tsx`) for reference
3. Check `rules.md` for project constraints
4. Verify correct hero variant for page type
5. Have color contrast checker ready (https://webaim.org/resources/contrastchecker/)

### During Implementation:
1. Work in feature branch (e.g., `design-system/service-water-damage`)
2. Test each section as you build it
3. Verify mobile responsive at each breakpoint
4. Check color contrast for all text/background combinations
5. Test keyboard navigation after adding interactive elements

### After Completing Page:
1. Run full testing checklist
2. Get peer review if available
3. Test on real mobile device (not just DevTools)
4. Screenshot before/after for documentation
5. Merge to main after all tests pass

### Build Verification:
```bash
# Before committing
npm run build
npx tsc --noEmit

# Content checks
grep -r "RAI\|RIA" app/services/ app/locations/ app/emergency/
grep -r "national\|nationwide" app/

# Verify contact info
grep -r "1300.*309.*361" app/ components/
```

---

## Progress Tracking

### Summary
- **Total Pages to Update:** ~60+ pages
- **Total Estimated Time:** ~80-100 hours
- **Phases:** 8 phases over 8-10 weeks
- **Current Phase:** Phase 0 (Planning)

### Weekly Goals
- **Week 1:** Complete 4 service pages
- **Week 2:** Complete 4 premium location pages
- **Week 3:** Complete 6 emergency pages
- **Week 4:** Build component library
- **Week 5:** Complete 5 insurance pages
- **Week 6:** Complete 6 secondary location pages
- **Week 7-8:** Complete FAQ + priority guide pages

### Blockers & Issues
*Document any blockers here as they arise*

---

## Sign-Off

**Page Completion Sign-Off Template:**

```markdown
### [Page Name] - Completed [Date]
- **File:** app/path/to/page.tsx
- **Implemented by:** [Name]
- **Reviewed by:** [Name]
- **Testing completed:** ✅
- **Accessibility verified:** ✅
- **Mobile tested:** ✅
- **Build passed:** ✅
- **Notes:** [Any special notes or deviations from design system]
```

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-09
**Next Review:** After Phase 1 completion

