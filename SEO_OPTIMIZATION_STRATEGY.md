# SEO Optimization Strategy for disasterrecovery.com.au

## Executive Summary

Based on BrightLocal audit findings, this document outlines comprehensive improvements to fix metadata duplications and enhance schema markup across 315 pages.

### Current Issues:
- **Open Graph Tags**: 27 pages (35%) have duplicates - CRITICAL
- **Twitter Cards**: 66 pages (85.71%) have duplicates - CRITICAL
- **Content Structure**: 46 pages (<500 words) - MODERATE
- **Schema Markup**: Present on all pages but inconsistent implementation

---

## 1. METADATA DEDUPLICATION STRATEGY

### Problem Analysis:
- Generic meta tags used across multiple page types
- Twitter card descriptions identical to Open Graph descriptions
- Title tags lack differentiation per page type
- No page-type-specific variations

### Solution Implemented:

Enhanced `lib/seo.ts` with specialized SEO generators:

1. **generateSEO()** - Base function with page-type awareness
2. **generateServiceSEO()** - Service-specific metadata
3. **generateLocationSEO()** - Location landing pages
4. **generateInsuranceSEO()** - Insurance partner pages
5. **generateGuideSEO()** - FAQ/Guide articles

**Key Improvements:**
- Unique OG titles per page type
- Custom Twitter descriptions (shorter, action-oriented)
- Page-type-specific keywords
- Dynamic image alt text

### Implementation Template:

```typescript
// Example: Location Page
export const metadata: Metadata = {
  ...generateLocationSEO({
    suburb: 'Hamilton',
    region: 'Brisbane, QLD',
    services: ['Water Damage Restoration', 'Fire Damage Restoration'],
    title: 'Hamilton Disaster Recovery | Water Damage Restoration Brisbane',
    description: 'Emergency disaster recovery services in Hamilton, Brisbane. 24/7 response, IICRC certified. Direct insurance billing available. Call 1300 309 361.',
    url: 'https://disasterrecovery.com.au/locations/hamilton-disaster-recovery',
    image: '/images/locations/hamilton.jpg',
    responseTime: '< 1 hour',
  })
};
```

---

## 2. SCHEMA MARKUP ENHANCEMENT

### New Schema Types Added:

#### A. AggregateRating (49 reviews, 4.7 stars)
```json
{
  "@type": "AggregateRating",
  "ratingValue": 4.7,
  "reviewCount": 49,
  "bestRating": 5,
  "worstRating": 1
}
```

#### B. HowTo Schema (Featured Snippets)
Used on: FAQ pages, Emergency guides, Service process pages

```json
{
  "@type": "HowTo",
  "name": "Water Damage Restoration Process",
  "step": [
    {
      "@type": "HowToStep",
      "position": "1",
      "name": "Call for Emergency Response",
      "text": "Ring 1300 309 361 immediately for 24/7 emergency assistance"
    },
    // ... additional steps
  ],
  "tool": ["Industrial dehumidifiers", "HEPA air scrubbers"],
  "supply": ["Antimicrobial treatments", "Protective equipment"]
}
```

#### C. LocalBusiness with Services Catalog
Enhanced LocalBusiness schema includes:
- AggregateRating from Google Reviews (4.7/5)
- Service catalog with OfferCatalog
- Area served with GeoCoordinates
- Emergency service hours (24/7)

#### D. BreadcrumbList Schema
Implemented on all location pages to improve SERP visibility:
```
Home > Services > Water Damage Restoration > Hamilton
```

#### E. Article/BlogPost Schema
Applied to: FAQ pages, Insurance guides, Emergency guides
- datePublished timestamps
- author attribution
- keywords metadata

#### F. Organization Schema (Enhanced)
Central organization schema with:
- All service types listed
- Multiple area served entries
- ContactPoint with 24/7 availability
- Social media links (sameAs)
- Aggregate rating from 49 reviews

---

## 3. PAGE-TYPE-SPECIFIC CONTENT STRUCTURE

### Addressing <500 word pages (46 pages):

#### Service Pages (8 pages)
**Current Issues:**
- Minimal descriptions of service process
- Limited certifications/credentials
- No FAQ section
- Missing before/after value prop

**Recommended Structure (800+ words):**
```
H1: Primary Service Keyword (e.g., "Water Damage Restoration Brisbane")
├── H2: Emergency Response & Availability
│   ├── H3: 24/7 Response Guarantee
│   ├── H3: Response Time by Suburb
│   └── H3: Emergency Contact
├── H2: What [Service] Includes
│   ├── H3: Assessment & Inspection
│   ├── H3: Extraction & Drying
│   ├── H3: Restoration & Finishing
│   └── H3: Monitoring & Completion
├── H2: Why Choose Disaster Recovery
│   ├── H3: IICRC Certifications
│   ├── H3: Insurance Approved
│   ├── H3: Warranty Guarantee
│   └── H3: Local Expertise
├── H2: Cost & Insurance Coverage
├── H2: Service Areas in Brisbane
├── H2: Frequently Asked Questions
│   └── [FAQ Schema included]
└── H2: Ready to Get Started?
```

**Word Count Target:** 1,200-1,500 words
**Estimated Reading Time:** 4-5 minutes

#### Location Pages (40+ pages)
**Current Issues:**
- Generic suburb descriptions
- Missing local authority references
- No weather/climate context
- Limited service differentiation per suburb

**Recommended Structure (600-800 words):**
```
H1: [Suburb] Disaster Recovery Services
├── H2: Emergency Services in [Suburb]
│   ├── H3: Response Time Guarantee
│   └── H3: Local Service Area Map
├── H2: Why [Suburb] Specific Expertise
│   ├── H3: Property Types Common in [Suburb]
│   ├── H3: Climate & Flood Risk Zones
│   ├── H3: Local Council Regulations
│   └── H3: Premium Property Considerations
├── H2: Services Available in [Suburb]
│   ├── Water Damage Restoration
│   ├── Fire Damage Restoration
│   ├── Mould Remediation
│   └── Storm Damage Repair
├── H2: Insurance Partners We Support
├── H2: [Suburb] Disaster Recovery FAQs
└── H2: Call for 24/7 Emergency Response
```

**Word Count Target:** 700-900 words
**Key LSI Terms:** [Suburb] + [nearby landmarks] + [postcode]

#### Insurance Partner Pages (12+ pages)
**Current Issues:**
- Minimal differentiation between insurers
- No specific claim process info
- Missing badge/approval verification

**Recommended Structure (600 words):**
```
H1: [Insurer Name] Approved Restoration Provider
├── H2: Direct Claims Assistance
│   ├── H3: Streamlined Claim Process
│   ├── H3: No Upfront Costs
│   └── H3: Real-time Claim Updates
├── H2: [Insurer] Approved Status
│   ├── Certification year
│   ├── Coverage areas
│   └── Preferred provider badge
├── H2: Services Covered
│   ├── Water damage
│   ├── Fire damage
│   └── Mould remediation
├── H2: [Insurer] Customer Testimonials
├── H2: How the Claims Process Works
│   └── Step 1-4 with HowTo schema
└── H2: Contact [Insurer] Claim Support
```

#### FAQ Pages (15+ pages)
**Structure (800+ words):**
- Each FAQ as H2
- Answers include LSI keyword variations
- HowTo schema for procedural FAQs
- Internal links to related services
- CTA to phone line

**Example FAQ Headers:**
- "How quickly can you respond to [service] in Brisbane?"
- "Is [service] covered by my insurance policy?"
- "What certifications do your technicians hold?"
- "How long does [service] take to complete?"
- "What's the cost of [service] for my property?"

---

## 4. INTERNAL LINKING STRATEGY

### Silo Structure:

#### Service Silo
```
/services (hub page - links to 8 service pages)
  ├── /water-damage-restoration
  ├── /fire-damage-restoration
  ├── /mould-remediation
  ├── /storm-damage-repair
  ├── /sewage-cleanup
  ├── /biohazard-cleanup
  ├── /emergency-response
  └── /commercial-restoration
```

Linking Pattern:
- Service page → Top 5 location pages (high search volume)
- Service page → Related insurance guides
- Service page → FAQ page for that service
- Service page → Back to /services hub

#### Location Silo
```
/locations (hub page - links to 40+ suburb pages)
  ├── /hamilton-disaster-recovery
  ├── /ascot-disaster-recovery
  └── /[suburb]-disaster-recovery
```

Linking Pattern:
- Location page → Service pages (4-6 main services)
- Location page → Insurance partner pages (5-8 partners)
- Location page → Service-specific FAQ pages
- Location page → Back to /locations hub

#### Insurance Silo
```
/insurance (hub page - links to 12+ insurer pages)
  ├── /racq
  ├── /allianz
  ├── /suncorp
  └── /[insurer]
```

Linking Pattern:
- Insurance page → Service pages (what's covered)
- Insurance page → Location pages (where we service)
- Insurance page → Claim process guides
- Insurance page → Back to /insurance hub

### Cross-Silo Links (High-Value):
- Service page → All location pages mentioning that service
- Service page → All insurance pages covering that service
- Location page → Service pages (not all, only top 3-4)
- Insurance page → Service pages (only relevant ones)

**Anchor Text Recommendations:**
- Primary keyword: "Water damage restoration Brisbane"
- LSI variant: "Emergency water damage repair"
- Brand + location: "Disaster Recovery Hamilton"
- Long-tail: "IICRC certified water damage specialist in Hamilton"

---

## 5. HEADER TAG HIERARCHY BLUEPRINT

### Template Implementation:

#### Service Page H-Tag Structure
```
H1: [Service Name] in [Location] | Emergency Response | IICRC Certified
├── H2: 24/7 Emergency Response to [Service]
│   ├── H3: Response Time Guarantee
│   └── H3: Available in [Suburbs]
├── H2: What Does Our [Service] Process Include?
│   ├── H3: Step 1: Emergency Assessment
│   ├── H3: Step 2: Water/Damage Extraction
│   ├── H3: Step 3: Structural Drying
│   └── H3: Step 4: Final Restoration
├── H2: Why Disaster Recovery for [Service]?
│   ├── H3: IICRC S500/S520 Certified
│   ├── H3: 49 Google Reviews (4.7 Stars)
│   ├── H3: Insurance Approved Specialist
│   └── H3: $20M Public Liability Insurance
├── H2: [Service] Costs in Brisbane
│   ├── H3: Factors Affecting Price
│   └── H3: Insurance Direct Billing
├── H2: Service Areas - Brisbane, Ipswich, Logan
│   ├── H3: Premium Inner Suburbs
│   ├── H3: Western Brisbane
│   └── H3: Ipswich & Surrounding
├── H2: Frequently Asked Questions About [Service]
│   ├── H3: How fast can you arrive?
│   ├── H3: Is this covered by insurance?
│   ├── H3: How long does restoration take?
│   └── H3: What certifications do you hold?
└── H2: Emergency [Service] - Call Now 24/7
```

#### Location Page H-Tag Structure
```
H1: [Suburb] Disaster Recovery | Water Damage & Fire Restoration
├── H2: 24/7 Emergency Disaster Recovery in [Suburb]
│   ├── H3: 1-Hour Emergency Response
│   └── H3: Available 24 Hours, 7 Days a Week
├── H2: Why [Suburb] Needs Local Disaster Recovery Expertise
│   ├── H3: [Suburb] Property & Development Profile
│   ├── H3: Flood Risk & Weather Vulnerability
│   └── H3: Building Age & Heritage Considerations
├── H2: Disaster Recovery Services Available in [Suburb]
│   ├── H3: Water Damage Restoration
│   ├── H3: Fire & Smoke Damage Restoration
│   ├── H3: Mould Remediation Services
│   └── H3: Storm Damage Repair
├── H2: IICRC Certified Specialists in [Suburb]
│   ├── H3: Certifications & Credentials
│   ├── H3: Experience in [Suburb]
│   └── H3: Insurance Approval
├── H2: Insurance Partners in [Suburb]
│   ├── Top 5-8 major insurers with brief mention
├── H2: [Suburb] Disaster Recovery FAQs
│   └── 3-4 location-specific questions
└── H2: Emergency Response in [Suburb] - Call 1300 309 361
```

#### Insurance Partner H-Tag Structure
```
H1: [Insurer Name] Approved Restoration | Direct Billing | No Upfront Costs
├── H2: Preferred [Insurer] Restoration Provider
│   ├── H3: Direct Billing - No Upfront Costs
│   ├── H3: Real-Time Claim Status
│   └── H3: Approved Coverage Areas
├── H2: How Direct Billing Works with [Insurer]
│   ├── H3: Step 1: Report Your Claim
│   ├── H3: Step 2: We Assess & Document
│   ├── H3: Step 3: Restoration Begins
│   └── H3: Step 4: Insurance Approves & Completes
├── H2: Services Covered by [Insurer] Policies
│   ├── H3: Water Damage Covered
│   ├── H3: Fire Damage Covered
│   └── H3: Mould Remediation Covered
├── H2: [Insurer] Customer Testimonials
│   └── 2-3 location-specific testimonials
├── H2: [Insurer] Service Areas
│   └── List top 10-15 suburbs covered
└── H2: [Insurer] Claims Support | 1300 309 361
```

---

## 6. TABLE OF CONTENTS (TOC) IMPLEMENTATION

### Recommended for Pages:
- All service pages
- Location pages
- Guide/FAQ pages
- Any page with 5+ H2 headers

### Component Structure:
```typescript
// Generates from H2/H3 headers automatically
<TableOfContents
  headings={pageHeadings}
  stickyScroll={true}
  highlightCurrent={true}
/>
```

### SEO Benefits:
- Improves time on page (users navigate within page)
- Reduces bounce rate
- Enables featured snippet opportunities
- Satisfies "People also ask" queries
- Mobile users benefit from navigation

---

## 7. FEATURED SNIPPET OPTIMIZATION

### High-Priority Pages for Snippets:

#### List Snippets (40% of snippets)
**Best for:**
- Service features/steps
- Insurance requirements
- Certification types

**Format Example:**
```
How to prepare for water damage restoration:
1. Turn off electricity at main switch
2. Stop water source (close water main)
3. Remove furniture above water line
4. Call 1300 309 361 immediately
5. Avoid walking through contaminated water
```

#### Table Snippets (15% of snippets)
**Best for:**
- Service comparison
- Cost ranges
- Timeline estimates

**Format Example:**
```
Water Damage Restoration Timeline:
| Damage Type    | Duration   | Cost Range |
|----------------|-----------|-----------|
| Minor (1 room) | 24-48hrs  | $800-2K   |
| Moderate (3rms)| 3-5 days   | $3-7K     |
| Severe (whole) | 7-14 days  | $8-15K    |
```

#### Definition Boxes (30% of snippets)
**Best for:**
- Technical terms
- Process explanations
- Service definitions

**Format Example:**
```
IICRC Certification: Institute of Inspection, Cleaning and
Restoration Certification - the global standard for disaster
restoration professionals, requiring ongoing education in
water damage (S500), fire damage (S520), and mould (CMRT).
```

#### Paragraph Snippets (15% of snippets)
**Best for:**
- Explanatory content
- Benefits statements
- Process overview

---

## 8. BREADCRUMB IMPLEMENTATION

### Where to Add:
- All service pages
- All location pages
- All insurance pages
- All FAQ/guide pages

### Template:
```html
Home > Services > Water Damage Restoration > Brisbane > Hamilton
```

### Schema:
Already implemented in `generateBreadcrumbSchema()` - add to pages using:

```typescript
import { generateBreadcrumbSchema } from '@/lib/seo';

const breadcrumbs = [
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Water Damage', url: 'https://disasterrecovery.com.au/services/water-damage' },
  { name: 'Hamilton', url: 'https://disasterrecovery.com.au/locations/hamilton' },
];

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
```

---

## 9. IMPLEMENTATION ROADMAP

### Phase 1: Foundation (Week 1-2)
- [x] Enhanced SEO utility functions (lib/seo.ts)
- [ ] Update main layout.tsx with new metadata
- [ ] Implement breadcrumb component
- [ ] Create TOC component

### Phase 2: Service Pages (Week 2-3)
- [ ] Expand 8 service pages to 1,200+ words
- [ ] Add HowTo schema to each
- [ ] Implement unique OG/Twitter metadata per service
- [ ] Add FAQ sections with schema

### Phase 3: Location Pages (Week 3-4)
- [ ] Expand 40+ location pages to 700-900 words
- [ ] Add suburb-specific context (demographics, flood risk)
- [ ] Update LocalBusiness schema with coordinates
- [ ] Add breadcrumb navigation

### Phase 4: Insurance Pages (Week 4-5)
- [ ] Expand 12+ insurance pages to 600 words
- [ ] Add claim process HowTo schema
- [ ] Implement unique metadata per insurer
- [ ] Add testimonial schema

### Phase 5: FAQ Pages (Week 5-6)
- [ ] Enhance all FAQ pages (800+ words)
- [ ] Add FAQPage schema
- [ ] Implement TOC for navigation
- [ ] Add internal links to service pages

### Phase 6: Testing & Validation (Week 6-7)
- [ ] Schema markup validation (Schema.org validator)
- [ ] Metadata testing (Google Search Console preview)
- [ ] Mobile rendering check
- [ ] Performance audit (Core Web Vitals)

---

## 10. SPECIFIC PAGE RECOMMENDATIONS

### Top Priority (Largest Traffic Potential):

1. **Homepage** - Add Organization schema with AggregateRating
2. **Water Damage Restoration** - 1,500 words + HowTo schema
3. **Fire Damage Restoration** - 1,500 words + HowTo schema
4. **Hamilton** - 800 words (premium suburb focus)
5. **Ascot** - 800 words (racing industry angle)
6. **New Farm** - 800 words (heritage property angle)
7. **RACQ Insurance** - 700 words (largest insurer in QLD)

### Content Expansion Requirements:

**Services (8 pages)** - Average 350 words → 1,200 words (+250%)
- Add process steps (HowTo)
- Add credibility/certification details
- Add cost/insurance info
- Add location service areas
- Add FAQ section

**Locations (40+ pages)** - Average 200 words → 700 words (+250%)
- Add suburb demographics
- Add local risks/climate context
- Add property types served
- Add insurance partners operating there
- Add local contact/hours

**Insurance (12 pages)** - Average 150 words → 600 words (+300%)
- Add claim process (HowTo)
- Add coverage details
- Add approval verification
- Add testimonials
- Add service availability

**FAQs (15+ pages)** - Varies → 800-1,000 words
- Standardize to 8-10 questions per page
- Add HowTo schema where applicable
- Add internal links to relevant services
- Add CTA to phone line

---

## 11. METADATA FIXES BY PAGE TYPE

### Service Pages - Duplicate Fixes:

**Before (Generic):**
```
og:title: "Water Damage Restoration Services"
og:description: "Professional water damage restoration services"
twitter:title: "Water Damage Restoration Services"
twitter:description: "Professional water damage restoration services"
```

**After (Unique):**
```
og:title: "Water Damage Restoration in Brisbane | 1-Hour Emergency Response"
og:description: "IICRC certified water damage experts. 24/7 emergency response. Free assessment. Insurance direct billing. Call 1300 309 361."
twitter:title: "Emergency Water Damage Restoration Brisbane"
twitter:description: "Water damage? 1-hour emergency response. IICRC certified. Call 1300 309 361 now."
```

### Location Pages - Duplicate Fixes:

**Before (Generic):**
```
og:title: "Disaster Recovery Services"
og:description: "We provide disaster recovery services"
twitter:title: "Disaster Recovery Services"
twitter:description: "We provide disaster recovery services"
```

**After (Suburb-Specific):**
```
og:title: "Hamilton Disaster Recovery | Water Damage & Fire Restoration"
og:description: "24/7 emergency restoration in Hamilton. Water, fire, mould damage. IICRC certified. 1-hour response guarantee. Insurance approved. Call 1300 309 361."
twitter:title: "Hamilton Emergency Restoration (1-Hour Response)"
twitter:description: "Water/fire/mould damage in Hamilton? 24/7 emergency help. IICRC certified. Direct billing. Call 1300 309 361."
```

### Insurance Pages - Duplicate Fixes:

**Before (Generic):**
```
og:title: "Insurance Claims Support"
og:description: "We support insurance claims"
twitter:title: "Insurance Claims Support"
twitter:description: "We support insurance claims"
```

**After (Insurer-Specific):**
```
og:title: "RACQ Approved Restoration | Direct Billing Provider"
og:description: "RACQ preferred restoration provider. Direct billing, no upfront costs. Water, fire, mould damage covered. 1-hour emergency response. Call 1300 309 361."
twitter:title: "RACQ Direct Billing Claims Partner"
twitter:description: "RACQ claim? No upfront costs. We handle direct billing. Emergency response available 24/7. Call 1300 309 361."
```

---

## 12. SCHEMA MARKUP VALIDATION

### Validation Tools:
- Google Search Console > Enhancement reports
- Schema.org Validator
- Google Rich Results Test
- Yandex Structured Data Validator

### Expected Results After Implementation:
- 100% of pages have valid LocalBusiness/Service schema
- 100% of location pages have valid BreadcrumbList schema
- 100% of service pages have HowTo schema (featured snippets)
- 100% of FAQ pages have FAQPage schema (voice search)
- 40+ location pages show AggregateRating in search results

---

## 13. PERFORMANCE MONITORING

### Key Metrics to Track:
1. **Click-through Rate (CTR)** - Target: +15-25% (better snippets)
2. **Average Position** - Target: Move to position 1-3 (better OG/schema)
3. **Featured Snippet Captures** - Target: 8-12 snippets (HowTo schema)
4. **Rich Result Appearances** - Target: 60+ locations with ratings display
5. **Organic Traffic Growth** - Target: +20-30% YoY

### Monthly Reporting:
- Track keyword rankings (top 20 keywords per page type)
- Monitor featured snippet changes
- Check rich result displays (GSC enhancement reports)
- Analyze organic traffic by page type
- Review user engagement (time on page, bounce rate)

---

## 14. QUICK IMPLEMENTATION CHECKLIST

### lib/seo.ts Updates
- [x] Enhanced generateSEO() with page-type awareness
- [x] Added generateServiceSEO()
- [x] Added generateLocationSEO()
- [x] Added generateInsuranceSEO()
- [x] Added generateGuideSEO()
- [x] Added generateAggregateRatingSchema()
- [x] Added generateHowToSchema()
- [x] Added generateBreadcrumbSchema()
- [x] Added generateArticleSchema()
- [x] Added generateOrganizationSchema()
- [x] Added generateLocalBusinessWithServices()

### Next Steps:
1. Create reusable template files for each page type
2. Update 77 pages with new metadata generators
3. Add schema markup components to layouts
4. Implement breadcrumb navigation
5. Expand content per word count targets
6. Test with validators
7. Monitor GSC for improvements

---

## 15. FILE REFERENCES

### Updated Files:
- `/lib/seo.ts` - Enhanced schema markup generators and metadata utilities

### Files to Create/Update:
- Service page templates - 8 files
- Location page templates - 40+ files
- Insurance page templates - 12 files
- FAQ page templates - 15+ files
- Breadcrumb component - new
- Table of Contents component - new

### Configuration:
- NEXT_PUBLIC_APP_URL: https://disasterrecovery.com.au
- Site Language: en_AU
- Country: Australia (AU)
- Contact: 1300 309 361
- Address: Unit 4/17 Tile St, Wacol QLD 4076

---

## Summary

This optimization strategy addresses:
1. Duplicate metadata (100% of 27 OG duplicates + 66 Twitter duplicates)
2. Content depth (46 pages under 500 words)
3. Schema markup consistency (HowTo, FAQ, AggregateRating missing)
4. Internal linking structure (siloed approach)
5. Featured snippet potential (list, table, definition formats)

**Expected Outcome:** 30-40% improvement in organic visibility, 15-25% CTR increase, and 8-12 featured snippet captures within 3-4 months.
