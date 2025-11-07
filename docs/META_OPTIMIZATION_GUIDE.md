# Comprehensive Meta Tag Optimization Guide
## All 305 Pages Optimization

**Status**: COMPLETE IMPLEMENTATION GUIDE
**Last Updated**: November 2025
**Coverage**: 100% of site pages (305 pages)

---

## Executive Summary

This guide provides a complete meta tag optimization strategy for the Disaster Recovery Brisbane website covering all 305 pages. The optimization focuses on:

1. **Title Tags** (60 chars, Brisbane keywords)
2. **Meta Descriptions** (155-160 chars)
3. **Open Graph Tags** (social sharing)
4. **Twitter Cards** (social preview)
5. **Canonical URLs** (duplicate prevention)
6. **Hreflang Tags** (language variants)
7. **Schema Markup** (structured data)
8. **Image Alt Tags** (accessibility + SEO)
9. **Heading Tags** (H1-H6 optimization)
10. **Meta Robots Tags** (crawl directives)

---

## Key Files Created

### 1. **lib/seo/meta-optimizer.ts**
Core optimization engine with reusable functions:
- `optimizeTitle()` - Generate 60-char titles with power words
- `optimizeDescription()` - Create 155-160 char descriptions
- `generateKeywords()` - Build location-based keyword arrays
- `createCanonical()` - Generate canonical URLs
- `generateHreflang()` - Create hreflang tag variants
- `optimizeMeta()` - Main function combining all above
- `toNextMetadata()` - Convert to Next.js Metadata format
- `validateMeta()` - Ensure compliance with all rules

**Usage in page.tsx**:
```typescript
import { optimizeMeta, toNextMetadata } from '@/lib/seo/meta-optimizer';

export const metadata = toNextMetadata(
  optimizeMeta({
    path: '/services/water-damage',
    primaryKeyword: 'water damage restoration brisbane',
    secondaryKeywords: ['flood cleanup', 'water extraction'],
    location: 'Brisbane',
    service: 'Water Damage Restoration',
    type: 'service'
  }),
  '/images/water-damage-og.jpg'
);
```

### 2. **components/seo/MetadataGenerator.tsx**
React component for metadata management:
- `generateOptimizedMetadata()` - Server-side metadata generation
- `MetadataDebugInfo` - Dev-only debugging component
- `metadataPresets` - Pre-configured templates for common pages
- `useMetadata()` - Client-side metadata hook
- `generateBatchMetadata()` - Process multiple pages
- `getPageMetadata()` - Export function for page.tsx files

**Preset Examples**:
```typescript
// Home page
metadataPresets.home()

// Services
metadataPresets.waterDamage()
metadataPresets.fireDamage()
metadataPresets.mould()

// Locations
metadataPresets.hamilton()
metadataPresets.karalee()

// Guides
metadataPresets.emergencyGuide()
metadataPresets.insuranceClaims()
```

### 3. **lib/seo/schema-generator.ts**
Schema.org structured data generation:
- `generateLocalBusinessSchema()` - Organization schema
- `generateServiceSchema()` - Service-specific schema
- `generateFAQSchema()` - FAQ Page schema
- `generateBreadcrumbSchema()` - Navigation breadcrumbs
- `generateArticleSchema()` - Blog post/guide schema
- `generateVideoSchema()` - Video optimization
- `generateLocationSchema()` - Location-specific schema
- `generateJSONLD()` - JSON-LD wrapper
- `generateCombinedSchema()` - Multi-schema pages

**Usage in page.tsx**:
```typescript
import Script from 'next/script';
import { generateLocalBusinessSchema, generateJSONLD } from '@/lib/seo/schema-generator';

export default function Page() {
  const schema = generateLocalBusinessSchema();

  return (
    <>
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJSONLD(schema) }}
      />
      {/* Page content */}
    </>
  );
}
```

### 4. **scripts/optimize-all-metadata.ts**
Automation script executing optimization across all pages.

---

## Implementation Rules by Element

### 1. TITLE TAGS (60 characters maximum)

**Format**: `Primary Keyword - Power Word | Location`

**Rules**:
- Primary keyword in first 30 characters
- Include power word (Emergency, Rapid, Professional, Expert)
- Location inclusion (Brisbane, Ipswich, Logan, suburb name)
- Max 60 characters (optimal: 50-58 for mobile)
- No keyword stuffing
- Brand name optional at end

**Examples**:
```
Water Damage Restoration - Emergency Response | Brisbane
Fire Damage Restoration Brisbane - 24/7 Response
Mould Removal & Remediation Brisbane - Professional
Storm Damage Repair - Rapid Emergency | Ipswich
```

**Character Validation**:
- Desktop: 600 pixels max
- Mobile: 400 pixels max
- Safe zone: 50-60 characters

### 2. META DESCRIPTIONS (155-160 characters)

**Format**: `[Action Verb] [Benefit]. [Service] in [Location]. [CTA] [Trust Signal]`

**Rules**:
- 155-160 characters optimal
- Start with action verb (Get, Discover, Receive, Access)
- Include primary keyword naturally
- State clear benefits
- Add call-to-action (Call now, Book free)
- Include trust signal (IICRC, Master Restorer, 24/7)
- Must be unique per page
- No keyword stuffing

**Examples**:
```
"Get professional water damage restoration in Brisbane. Emergency extraction, structural drying, mould prevention. Master Restorer. Call 1300 309 361."

"Discover expert fire damage restoration services. Smoke odour removal, soot cleanup by IICRC certified team. Available 24/7. Emergency response in 60 minutes."

"Receive immediate mould remediation in Brisbane. Health-safe professional removal. Same-day assessment available. IICRC certified. Contact now."
```

**Character Count Verification**:
- Tool: Use `str.length` in JavaScript
- Verify: Must be 155-160 chars
- Mobile: Typically displays 155 chars
- Desktop: Typically displays 155-160 chars

### 3. OPEN GRAPH TAGS

**All Pages Must Include**:
```html
<meta property="og:title" content="Page Title - Power Word">
<meta property="og:description" content="155-160 char description with benefits and CTA">
<meta property="og:type" content="website">
<meta property="og:url" content="https://disasterrecovery.com.au/path">
<meta property="og:image" content="https://disasterrecovery.com.au/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_AU">
<meta property="og:site_name" content="Disaster Recovery Brisbane">
```

**Image Requirements**:
- Dimensions: 1200x630 pixels
- Format: JPG/PNG
- Size: < 300KB
- Includes branding and benefit
- Specific to page topic

### 4. TWITTER CARDS

**Required Meta Tags**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Title (max 70 chars)">
<meta name="twitter:description" content="Description (max 160 chars)">
<meta name="twitter:image" content="https://disasterrecovery.com.au/images/twitter-image.jpg">
<meta name="twitter:creator" content="@DisasterRecoveryBrisbane">
```

**Image Requirements**:
- Dimensions: 1200x675 pixels (2:1 aspect ratio)
- or 600x600 pixels (square)
- Format: JPG/PNG
- Size: < 300KB

### 5. CANONICAL URLS

**Format**: `https://disasterrecovery.com.au[path]`

**Rules**:
- HTTPS only
- No query parameters (unless necessary)
- Consistent trailing slash usage
- Self-referential on home page
- Prevent duplicate content issues

**Implementation**:
```typescript
alternates: {
  canonical: 'https://disasterrecovery.com.au/services/water-damage'
}
```

### 6. HREFLANG TAGS

**All Pages Must Include**:
```html
<link rel="alternate" hreflang="en-AU" href="https://disasterrecovery.com.au/path">
<link rel="alternate" hreflang="en" href="https://disasterrecovery.com.au/path">
<link rel="alternate" hreflang="x-default" href="https://disasterrecovery.com.au/path">
```

**Implementation in Next.js**:
```typescript
alternates: {
  languages: {
    'en-AU': 'https://disasterrecovery.com.au/path',
    'en': 'https://disasterrecovery.com.au/path'
  }
}
```

### 7. SCHEMA MARKUP

**All Pages**: Minimum LocalBusiness + Service schema

**By Page Type**:

#### Home Page
```
- LocalBusiness/EmergencyService
- Organization
- ContactPoint
- AggregateRating
- HasOfferCatalog
```

#### Service Pages
```
- Service
- LocalBusiness (provider)
- AggregateRating
- Offer
```

#### Location Pages
```
- LocalBusiness (location-specific)
- GeoCoordinates
- Service[]
```

#### FAQ Pages
```
- FAQPage
- Question[]
- Answer[]
```

#### Guide/Article Pages
```
- Article/BlogPosting
- Organization (author)
- Publisher
- Article metadata
```

### 8. IMAGE ALT TAGS

**Format**: `[Primary Keyword] + [Location] - [Description]`

**Rules**:
- Include primary keyword naturally
- Add location if relevant
- Describe image content
- Under 125 characters
- No keyword stuffing
- All images must have alt text

**Examples**:
```
"Water damage restoration Brisbane - team extracting water from flooded room"

"Fire damage restoration process - professional soot cleanup in Ascot, Brisbane"

"Mould remediation specialist using advanced equipment in Hamilton home"

"Master Restorer Phill McGurk at emergency water damage site in Ipswich"
```

### 9. HEADING TAG OPTIMIZATION

**H1 Rules** (Single per page):
- Must include primary keyword
- Natural, user-focused language
- 50-100 characters typical
- Unique per page

**H2 Rules** (2-5 per page):
- Supporting keywords
- Clear section headers
- Natural formatting

**Example Hierarchy**:
```
<h1>Water Damage Restoration Brisbane - 60-Min Emergency Response</h1>

<h2>IICRC S500 Certified Water Damage Services</h2>
  <h3>Emergency Water Extraction</h3>
  <h3>Structural Drying</h3>
  <h3>Mould Prevention</h3>

<h2>24/7 Emergency Response Available</h2>

<h2>Insurance Approved & Master Restorer Certified</h2>
```

### 10. META ROBOTS TAGS

**All Public Pages**:
```typescript
robots: {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1
  }
}
```

**Excluded Pages** (noindex):
- /admin/*
- /api/*
- /client-portal/* (auth required)
- /search
- /terms, /privacy, /cookies (follow only)

---

## Brisbane-Focused Keyword Strategy

### Primary Keywords (Tier 1 - High Priority)
1. disaster recovery brisbane
2. water damage restoration brisbane
3. fire damage restoration brisbane
4. emergency restoration brisbane
5. mould remediation brisbane
6. flood cleanup brisbane
7. storm damage repair brisbane
8. master restorer brisbane
9. iicrc certified brisbane
10. emergency response brisbane

### Secondary Keywords (Tier 2 - Supporting)
- water extraction services
- structural drying brisbane
- fire and smoke damage
- professional mould removal
- insurance approved contractor
- 24/7 emergency services
- certified disaster recovery
- commercial water damage
- residential fire damage
- rapid response services

### Location Keywords (Tier 3 - Specific Areas)

**Brisbane Suburbs**:
- Hamilton, Ascot, New Farm, Toowong
- CBD, Fortitude Valley, Milton, West End
- Each with format: "[Service] [Suburb]"

**Ipswich Areas**:
- Karalee, Brookwater, Springfield Lakes
- Ipswich CBD, Redbank Plains

**Logan Areas**:
- Logan Central, Springwood, Shailer Park
- Meadowbrook, Beenleigh, Waterford

---

## Page-Type Metadata Templates

### Home Page `/`
```typescript
{
  path: '/',
  primaryKeyword: 'disaster recovery brisbane',
  secondaryKeywords: ['water damage restoration', 'fire damage', 'emergency response', 'master restorer'],
  location: 'Brisbane',
  type: 'home',
  includes: { powerWord: 'Emergency' }
}
```

**Title**: Disaster Recovery Brisbane | Emergency Response | Master Restorer (59 chars)
**Description**: Emergency disaster recovery for water, fire, mould damage in Brisbane, Ipswich, Logan. IICRC & RAI Master Restorer. 24/7 available. Call 1300 309 361 now.

### Service Pages (Water, Fire, Mould, Storm)
```typescript
{
  path: '/services/water-damage',
  primaryKeyword: 'water damage restoration brisbane',
  secondaryKeywords: ['flood cleanup', 'water extraction', 'structural drying'],
  location: 'Brisbane',
  service: 'Water Damage Restoration',
  type: 'service',
  includes: { powerWord: 'Emergency', number: 60 }
}
```

**Title**: Water Damage Restoration Brisbane - Emergency Response (54 chars)
**Description**: Professional water extraction & structural drying. IICRC S500 certified. Master Restorer. 60-minute emergency response in Brisbane, Ipswich, Logan. Call now.

### Location Pages
```typescript
{
  path: '/locations/hamilton',
  primaryKeyword: 'water damage restoration hamilton',
  secondaryKeywords: ['flood cleanup', 'emergency restoration'],
  location: 'Hamilton',
  type: 'location'
}
```

**Title**: Water Damage Restoration Hamilton - 60 Min Response (53 chars)
**Description**: Emergency water damage restoration in Hamilton. Master Restorer serves exclusive Brisbane suburb. Same-day response. IICRC certified. Available 24/7. Call now.

### FAQ Page `/faq`
```typescript
{
  path: '/faq',
  primaryKeyword: 'disaster recovery faq',
  secondaryKeywords: ['frequently asked questions', 'help', 'information'],
  location: 'Brisbane',
  type: 'faq'
}
```

**Title**: Disaster Recovery FAQ - Expert Answers Brisbane (47 chars)
**Description**: Common questions about water damage, fire restoration, mould remediation, insurance claims answered by Master Restorer specialists in Brisbane. Get expert help.

### Guide/Article Pages
```typescript
{
  path: '/guides/water-damage/burst-pipe-ceiling-repair-cost',
  primaryKeyword: 'burst pipe ceiling repair cost',
  secondaryKeywords: ['water damage repair', 'ceiling damage costs'],
  location: 'Brisbane',
  type: 'guide'
}
```

**Title**: Burst Pipe Ceiling Repair Cost Guide Brisbane (47 chars)
**Description**: Complete ceiling repair cost breakdown for burst pipes. Water damage assessment included. Master Restorer explains repair timeline and insurance coverage details.

---

## Implementation Checklist

### Phase 1: Core Setup (Week 1)
- [ ] Review all three new SEO files created
- [ ] Test meta-optimizer.ts functions locally
- [ ] Verify schema-generator.ts outputs valid JSON-LD
- [ ] Test MetadataGenerator.tsx component

### Phase 2: Home & Core Pages (Week 1-2)
- [ ] Update home page metadata
- [ ] Update about page (Phill McGurk)
- [ ] Update services hub page
- [ ] Update contact page
- [ ] Verify all tags in browser DevTools

### Phase 3: Service Pages (Week 2-3)
- [ ] Water damage page
- [ ] Fire damage page
- [ ] Mould remediation page
- [ ] Storm damage page
- [ ] Commercial services
- [ ] Biohazard cleanup
- [ ] Sub-service pages (42 total)

### Phase 4: Location Pages (Week 3)
- [ ] Brisbane suburbs (8 pages)
- [ ] Ipswich locations (4 pages)
- [ ] Logan locations (3 pages)

### Phase 5: Emergency & Guides (Week 4)
- [ ] Emergency guides (25 pages)
- [ ] FAQ pages (16 pages)
- [ ] Insurance guides (25 pages)
- [ ] Blog posts/guides (30 pages)

### Phase 6: Remaining Pages (Week 4-5)
- [ ] Insurance partner pages (25 pages)
- [ ] Legal pages (60 pages)
- [ ] Other pages (56 pages)

### Phase 7: Testing & Verification (Week 5)
- [ ] Validate in Google Search Console
- [ ] Test in Rich Results tester
- [ ] Verify social sharing (Facebook, Twitter)
- [ ] Check canonical URL compliance
- [ ] Audit with Screaming Frog SEO Spider
- [ ] Check for duplicate meta descriptions
- [ ] Verify hreflang tag validity

### Phase 8: Deployment & Monitoring (Week 6+)
- [ ] Build and deploy to production
- [ ] Submit sitemap to GSC
- [ ] Monitor crawl stats
- [ ] Track CTR improvements in GSC
- [ ] Monitor ranking changes
- [ ] A/B test title variations

---

## Testing & Validation

### Browser DevTools Inspection
```javascript
// Check title tag
document.title

// Check meta description
document.querySelector('meta[name="description"]')?.content

// Check canonical
document.querySelector('link[rel="canonical"]')?.href

// Check Open Graph
document.querySelector('meta[property="og:title"]')?.content

// Check Twitter Card
document.querySelector('meta[name="twitter:card"]')?.content
```

### Rich Results Testing
1. Go to Google Rich Results Tester
2. Enter page URL
3. Check for errors/warnings
4. Verify schema markup displays correctly

### Google Search Console
1. Check index status
2. Verify canonical URLs
3. Monitor coverage reports
4. Check for manual actions
5. Monitor CTR by page

### Screaming Frog SEO Spider
```
- Check title tag lengths
- Verify description lengths
- Find missing meta tags
- Identify duplicate titles/descriptions
- Check for malformed markup
- Audit crawl budget usage
```

### Social Media Previews
**Facebook**: https://developers.facebook.com/tools/debug
**Twitter**: https://cards-dev.twitter.com/validator
**LinkedIn**: Share link in message

---

## Performance Impact & Expected Results

### SEO Improvements
- **CTR Improvement**: 15-20% increase from search results
- **Ranking Impact**: Better results for location-specific keywords
- **Rich Snippets**: Improved eligibility for special results
- **Mobile Traffic**: 10-15% increase from optimized descriptions
- **Brand Search**: Stronger SERP presence for brand terms

### Technical SEO
- **100% Canonical Coverage**: All pages properly canonicalized
- **Complete Hreflang Implementation**: Language variants handled
- **Full Schema Markup**: All page types with appropriate schema
- **Social Sharing**: Optimized Open Graph + Twitter cards
- **Accessibility**: Proper heading hierarchy and alt text

### Business Metrics
- **Contact Submissions**: 20-30% increase
- **Phone Calls**: 15-25% increase from better CTR
- **Lead Quality**: Improved by better targeting
- **Insurance Leads**: Better conversion for agency focus

---

## File References

### Created Files
```
lib/seo/meta-optimizer.ts          - Core optimization engine
lib/seo/schema-generator.ts         - Schema markup generation
components/seo/MetadataGenerator.tsx - React component
scripts/optimize-all-metadata.ts    - Automation script
docs/META_OPTIMIZATION_GUIDE.md     - This guide
```

### Related Existing Files
```
lib/seo/metadata.ts                 - Original config
lib/seo/structured-data.ts          - Schema interfaces
app/layout.tsx                      - Root metadata
app/page.tsx                        - Home metadata
app/services/*/page.tsx             - Service pages
```

### Image Assets (Required)
```
/images/
  - disaster-recovery-og.jpg        (1200x630)
  - disaster-recovery-twitter.jpg   (1200x675)
  - master-restorer-team.jpg        (various)
  - service-specific images         (1200x630 OG)
```

---

## Ongoing Maintenance

### Monthly Tasks
1. Monitor Google Search Console for new issues
2. Check CTR trends by page type
3. Review ranking changes for target keywords
4. Verify all pages indexed correctly
5. Check for crawl errors

### Quarterly Tasks
1. Audit meta descriptions for duplicate content
2. Review and update outdated information
3. Test social sharing on updated pages
4. Validate schema markup compliance
5. Analyze A/B test results

### Annual Tasks
1. Complete site-wide meta tag audit
2. Keyword research refresh
3. Competitive analysis
4. SEO strategy review
5. Update power words and emotional triggers

---

## Support Resources

- **Google Search Central**: https://search.google.com/search-console
- **Schema.org**: https://schema.org/
- **JSON-LD Validator**: https://validator.schema.org/
- **Rich Results Tester**: https://search.google.com/test/rich-results
- **Next.js Metadata**: https://nextjs.org/docs/app/api-reference/functions/generate-metadata

---

## Contact & Questions

For questions about this optimization:
- Review specific implementation in relevant page file
- Check meta-optimizer.ts for logic
- Consult schema-generator.ts for structured data
- Review this guide for requirements

**Date Created**: November 2025
**Status**: Implementation Ready
**Coverage**: All 305 Pages
