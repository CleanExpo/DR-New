# Suburb Template System - Quick Reference Card

**Copy This. Use This. Scale Your Pages.**

---

## 30-Second Overview

```
Input: Suburb data (name, demographics, risks)
       ↓
Process: Content generation + SEO optimization
       ↓
Output: 750+ word, fully optimized location page
```

**Time:** < 5 minutes per suburb
**Quality:** Production-ready, SEO-optimized
**Uniqueness:** Completely unique per suburb

---

## Core Functions

### Content Generation

```typescript
import {
  generateIntro,           // 100-word intro
  generateDisasterTypesSection,    // 4 disaster sections
  generateWhyChooseUs,     // 8 Why Choose Us points
  generateFAQs,            // 5 FAQ questions
  generateEmergencyResponse, // 6-step response process
  generateServicesSection,  // 5 service cards
} from '@/lib/suburb-template/content-generator';

// Usage
const intro = generateIntro(suburb);
const disasters = generateDisasterTypesSection(suburb);
const faqs = generateFAQs(suburb);
// ... etc
```

### SEO Generation

```typescript
import {
  generateSEOConfig,          // Keywords + metadata
  generateInternalLinkingMap, // Nearby suburbs + services
  generateAllSchemas,         // 7 schema types
  generateSuburbMetadata,     // Next.js metadata
} from '@/lib/suburb-template';

// Usage
const seoConfig = generateSEOConfig(suburb);
const metadata = generateSuburbMetadata(suburb);
const schemas = generateAllSchemas(suburb, faqs);
```

### Data Access

```typescript
import {
  getSuburbData,           // Get suburb by slug
  getAllSuburbSlugs,       // All suburb slugs
  getSuburbsByRegion,      // Suburbs by region
  getNearbySuburbNames,    // Nearby suburbs
} from '@/lib/suburb-template';

// Usage
const suburb = getSuburbData('hamilton');
const nearby = getNearbySuburbNames('hamilton');
const allBrisbane = getSuburbsByRegion('inner-brisbane');
```

---

## Create a Page in 5 Minutes

### Step 1: Create Directory

```bash
mkdir -p app/brisbane/[suburb-slug]
```

### Step 2: Create page.tsx

```typescript
import { Metadata } from 'next';
import {
  getSuburbData,
  generateSuburbMetadata,
  SuburbPageTemplate
} from '@/lib/suburb-template';
import {
  generateIntro,
  generateDisasterTypesSection,
  generateWhyChooseUs,
  generateFAQs,
  generateEmergencyResponse,
  generateServicesSection,
} from '@/lib/suburb-template/content-generator';

const suburb = getSuburbData('[slug]')!;

export const metadata: Metadata = generateSuburbMetadata(suburb);

export default function Page() {
  const intro = generateIntro(suburb);
  const disasterTypes = generateDisasterTypesSection(suburb);
  const whyChooseUs = generateWhyChooseUs(suburb);
  const faqItems = generateFAQs(suburb);
  const emergencyResponse = generateEmergencyResponse(suburb);
  const servicesAvailable = generateServicesSection(suburb);

  const whyChooseUsPoints = whyChooseUs.content.split('\n').filter(Boolean);

  const emergencySteps = [
    { title: 'Call 1300 309 361', description: 'Emergency dispatch' },
    { title: 'Rapid Response', description: '25-35 min arrival' },
    { title: 'Assessment', description: 'Evaluate damage' },
    { title: 'Mitigation', description: 'Protect property' },
    { title: 'Restoration', description: 'Full repair' },
    { title: 'Follow-up', description: 'Quality check' },
  ];

  const services = servicesAvailable.map(s => ({
    type: s.heading,
    description: s.content,
  }));

  const nearbySuburbs = suburb.nearbySuburbs.map(slug => ({
    name: getSuburbData(slug)?.name || slug,
    slug,
  }));

  return (
    <SuburbPageTemplate
      suburb={suburb}
      intro={intro}
      heroIntro={intro.substring(0, 200)}
      disasterTypes={disasterTypes}
      whyChooseUs={whyChooseUsPoints}
      emergencyResponse={{ steps: emergencySteps }}
      servicesAvailable={services}
      faqItems={faqItems}
      nearbySuburbs={nearbySuburbs}
    />
  );
}
```

### Step 3: Test & Deploy

```bash
npm run dev                    # Test locally
npm run build                  # Build for production
vercel deploy --prod           # Deploy
```

**✅ Done! New location page deployed.**

---

## Add New Suburb Data

Edit `lib/suburb-template/suburb-data.ts`:

```typescript
export const innerBrisbane = {
  'new-suburb': {
    name: 'New Suburb',
    slug: 'new-suburb-disaster-recovery',
    postcode: '4XXX',
    region: 'inner-brisbane',
    coordinates: { latitude: -27.XXXX, longitude: 153.XXXX },
    distanceFromHQ: 25,
    responseTime: '30-40 minutes',
    responseTimeMinutes: 35,
    demographics: {
      medianPrice: '$X million',
      population: 'X,XXX',
      primaryPropertyTypes: ['Type 1', 'Type 2'],
      householdComposition: 'Demographics',
    },
    disasterRisks: [
      {
        type: 'water-damage',
        severity: 'high',
        affectedProperties: ['Property types'],
        likelihood: 'frequent',
      },
    ],
    keySpecialties: ['Specialty 1', 'Specialty 2'],
    uniqueCharacteristics: ['Characteristic 1'],
    landmarks: ['Landmark 1', 'Landmark 2'],
    nearbySuburbs: ['nearby-1', 'nearby-2'],
    regionParent: 'brisbane',
  },
};
```

---

## Content Output Overview

### Input
```typescript
{
  name: 'Hamilton',
  region: 'inner-brisbane',
  demographics: { medianPrice: '$2.8M', primaryPropertyTypes: ['Riverfront mansions'] },
  disasterRisks: [{ type: 'water-damage', severity: 'critical' }],
  keySpecialties: ['Luxury restoration', 'Waterfront expertise'],
}
```

### Output (Auto-Generated)

**Intro (100 words)**
```
Professional water damage restoration in Hamilton. Luxury mansion
specialists with 25-35 minutes emergency response to inner Brisbane.
Master Restorer certified for riverfront mansions, luxury apartments,
and executive estates...
```

**Disasters (4 sections, auto-selected by risk severity)**
- Water Damage (Critical) - Riverside focus
- Flood (High) - Brisbane River expertise
- Storm Damage (High) - High-rise exposure
- Fire (Medium) - Content protection

**Why Us (8 points)**
- Master Restorer certification
- 25-35 minute response
- Waterfront expertise
- High-rise coordination
- Marina facility knowledge
- Executive service
- Insurance billing
- Custom restoration

**FAQs (5 questions)**
- What services?
- Insurance coverage?
- Service areas?
- Property experience?
- Risk factors?

**Services (5 cards)**
- Water Damage Restoration
- Flood Recovery
- High-Rise Coordination
- Fire & Smoke Restoration
- Mould Remediation

**Total: 750+ words, completely unique**

---

## SEO Output

### Keywords (Auto-Generated)

**Primary:**
```
water damage restoration Hamilton
```

**Secondary (5-8):**
```
emergency water damage Hamilton
24/7 emergency response Hamilton
Master Restorer Hamilton
waterfront property restoration
luxury mansion flooding
executive emergency response
insurance approved disaster recovery
```

**LSI (20+):**
```
emergency restoration
professional restoration
flood damage recovery
property protection
disaster mitigation
certified restoration
rapid response
Brisbane River expertise
... (14+ more)
```

### Schema Markup (7 Types)

1. **LocalBusiness** - Company info, services, hours
2. **FAQPage** - FAQ structured data
3. **BreadcrumbList** - Navigation
4. **Organization** - Company-wide info
5. **Service** - Service descriptions
6. **HowTo** - Response steps
7. **WebPage** - Page metadata

### Meta Tags

```html
<!-- Title -->
<title>Hamilton Disaster Recovery | Emergency Restoration Services | 24/7</title>

<!-- Meta Description -->
<meta name="description" content="Professional disaster recovery in Hamilton. Water damage, fire restoration, mould remediation. Master Restorer certified. Available 24/7. Call 1300 309 361.">

<!-- OG Tags -->
<meta property="og:title" content="Hamilton Disaster Recovery | Emergency Restoration">
<meta property="og:description" content="...">
<meta property="og:url" content="https://dr-new-ten.vercel.app/brisbane/hamilton">

<!-- Canonical -->
<link rel="canonical" href="https://dr-new-ten.vercel.app/brisbane/hamilton">
```

---

## File Structure

```
Project Root
├── lib/suburb-template/
│   ├── index.ts                   [Main exports]
│   ├── types.ts                   [Type definitions]
│   ├── suburb-data.ts             [Suburb configurations]
│   ├── content-generator.ts       [Content creation]
│   ├── schema-generator.ts        [Schema markup]
│   ├── seo-generator.ts           [SEO optimization]
│   └── SuburbPageTemplate.tsx     [Page component]
│
├── app/brisbane/
│   ├── hamilton/page.tsx
│   ├── new-farm/page.tsx
│   ├── ascot/page.tsx
│   ├── toowong/page.tsx
│   └── [more suburbs...]
│
├── app/ipswich/
│   ├── springfield-lakes/page.tsx
│   ├── karalee/page.tsx
│   └── [more suburbs...]
│
└── Documentation
    ├── SUBURB_TEMPLATE_README.md
    ├── SUBURB_TEMPLATE_IMPLEMENTATION_GUIDE.md
    ├── SUBURB_TEMPLATE_USAGE_EXAMPLES.md
    ├── SUBURB_TEMPLATE_DEPLOYMENT_GUIDE.md
    └── SUBURB_TEMPLATE_SYSTEM_SUMMARY.md
```

---

## Configuration Checklist

For each new suburb:

- [ ] Name and slug correct
- [ ] Postcode accurate
- [ ] Coordinates correct
- [ ] Response time realistic
- [ ] Demographics accurate
- [ ] Disaster risks relevant
- [ ] Specialties listed
- [ ] Nearby suburbs exist
- [ ] Region parent correct
- [ ] No missing fields

---

## Deployment Checklist

Before deploying:

- [ ] Page builds without errors
- [ ] No TypeScript errors
- [ ] Meta tags generated correctly
- [ ] Schema markup validates
- [ ] Internal links functional
- [ ] Mobile responsive
- [ ] Page load < 3 seconds
- [ ] No console errors
- [ ] Images optimized
- [ ] Accessibility passing

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Page Load | < 2 seconds |
| Lighthouse | 90+ |
| Mobile | Excellent |
| Accessibility | AA compliant |
| Words | 700-800 |
| Bounce Rate | < 40% |
| Avg Session | 2.5+ min |

---

## Quick Links

### Documentation
- **Start Here:** `SUBURB_TEMPLATE_README.md`
- **Full Guide:** `SUBURB_TEMPLATE_IMPLEMENTATION_GUIDE.md`
- **Examples:** `SUBURB_TEMPLATE_USAGE_EXAMPLES.md`
- **Deployment:** `SUBURB_TEMPLATE_DEPLOYMENT_GUIDE.md`

### Code Files
- **Types:** `lib/suburb-template/types.ts`
- **Data:** `lib/suburb-template/suburb-data.ts`
- **Content:** `lib/suburb-template/content-generator.ts`
- **SEO:** `lib/suburb-template/seo-generator.ts`
- **Component:** `lib/suburb-template/SuburbPageTemplate.tsx`

---

## Common Tasks

### Create a New Suburb Page

1. Add data to `suburb-data.ts`
2. Create page file at `app/region/suburb-slug/page.tsx`
3. Copy template code
4. Run `npm run dev`
5. Test locally
6. Deploy

### Update Suburb Data

Edit `suburb-data.ts` and change:
- Demographics
- Disaster risks
- Specialties
- Nearby suburbs
- Landmarks

### Add New Content Variation

Edit `content-generator.ts`:
1. Add template to relevant array
2. Add selection logic
3. Test with multiple suburbs
4. Document in guide

### Check SEO Configuration

```typescript
import { generateSEOConfig } from '@/lib/suburb-template';

const config = generateSEOConfig(suburb);
console.log(config.primaryKeyword);
console.log(config.secondaryKeywords);
console.log(config.lsiKeywords);
```

### Validate Schema Markup

```bash
# Use schema.org validator
# https://schema.org/

# Or use Google's Rich Results Test
# https://search.google.com/test/rich-results
```

---

## Troubleshooting

### Problem: Content Not Unique

**Solution:** Check suburb data is different from others
```typescript
// Good: Different disasters, demographics, specialties
'hamilton': { disasterRisks: [water, flood], demographics: { medianPrice: '$2.8M' } }
'wynnum': { disasterRisks: [storm-surge, mould], demographics: { medianPrice: '$890K' } }

// Bad: Same config for different suburbs
'suburb1': { ... }
'suburb2': { ... } // Copy of suburb1
```

### Problem: Missing Nearby Suburbs

**Solution:** Ensure suburbs exist in data
```typescript
nearbySuburbs: ['ascot', 'bulimba', 'hawthorne'] // All must exist in allSuburbData
```

### Problem: SEO Keywords Not Showing

**Solution:** Verify keywords appear naturally in content
- Check primary keyword in H1
- Check secondary keywords in body
- Ensure LSI keywords scattered
- Verify meta description includes primary keyword

### Problem: Page Load Slow

**Solution:**
- Optimize images
- Check no render-blocking resources
- Use dynamic imports for heavy components
- Enable caching
- Check database queries

---

## Performance Benchmarks

### Generated Pages Should Have

```
Metric                Target
─────────────────────────────
Load Time             < 2s
Lighthouse            90+
FCP (First Content)   < 1.5s
LCP (Largest Content) < 2.5s
CLS (Layout Shift)    < 0.1
Mobile Score          90+
Accessibility         95+
SEO Score             95+
Best Practices        90+
```

---

## Monitoring

After deployment, check:

```
Day 1:
✓ Page loads
✓ No errors in console
✓ Links functional
✓ Mobile responsive

Week 1:
✓ Indexed in Google
✓ Appears in local search
✓ Tracking working
✓ Analytics data flowing

Month 1:
✓ Keyword impressions
✓ Click data in Search Console
✓ Traffic from local searches
✓ Conversion tracking

Month 3-6:
✓ Keyword rankings improving
✓ Organic traffic growing
✓ Conversion rate stable
✓ ROI positive
```

---

## Success Indicators

### Page Level
- ✅ 750+ words unique content
- ✅ Lighthouse 90+
- ✅ Mobile responsive
- ✅ Schema validates
- ✅ Internal links functional

### SEO Level
- ✅ Primary keyword in top 10
- ✅ Secondary keywords ranking
- ✅ Organic impressions growing
- ✅ Click-through rate 3-5%

### Business Level
- ✅ Emergency calls increasing
- ✅ Geographic diversity in contacts
- ✅ Conversion rate 2-3%
- ✅ Positive ROI per suburb

---

## Time Estimates

| Task | Time |
|------|------|
| Create new suburb page | 5 min |
| Add suburb data | 10 min |
| Test locally | 5 min |
| Deploy | 5 min |
| Validate SEO | 10 min |
| Monitor initial traffic | 5 min |
| **Total per suburb** | **40 min** |

**For 40 suburbs:**
- **System setup:** 1-2 hours
- **Implementation:** 6-8 hours
- **Testing:** 2-3 hours
- **Deployment:** < 1 hour
- **Total:** 10-15 hours (not 40 hours + manual content)

**Time Savings:** 300-400 hours vs. manual creation

---

## Key Formulas

### Word Count Per Page
```
Intro (100) + Disasters (200) + Why Us (150) + FAQ (150)
+ Services (100) + Nearby (50) = 750-800 words
```

### SEO Keywords Per Page
```
Primary (1) + Secondary (5-8) + LSI (20) = 26-29 keywords
```

### Internal Links Per Page
```
Parent region (1) + Nearby suburbs (6) + Services (6) = 13 links
```

### Schema Markup Types
```
LocalBusiness + FAQ + Breadcrumb + Organization
+ Service + HowTo + WebPage = 7 schemas
```

---

## Next Steps

1. **Read** `SUBURB_TEMPLATE_README.md` (5 min)
2. **Review** a code example (10 min)
3. **Create** first suburb page (5 min)
4. **Test** locally (5 min)
5. **Deploy** (5 min)

**Total: 30 minutes to first page**

---

**Print this. Bookmark it. Reference it.**

**Everything you need in one page. Suburbs scale from here. 🚀**
