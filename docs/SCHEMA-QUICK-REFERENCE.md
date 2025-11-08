# Schema Markup Quick Reference Guide

**Disaster Recovery Brisbane - Schema Implementation**

## Quick Commands

### Generate Sitemap
```bash
npx tsx scripts/generate-sitemap.ts
```

### Validate All Schemas
```bash
npx tsx scripts/validate-schemas.ts
```

---

## Common Schema Implementations

### 1. Add Schema to Service Page

```tsx
import { SERVICE_SCHEMAS } from '@/lib/seo/comprehensive-schema';

export default function WaterDamagePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(SERVICE_SCHEMAS.waterDamage())
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

**Available Service Schemas:**
- `SERVICE_SCHEMAS.waterDamage()`
- `SERVICE_SCHEMAS.fireDamage()`
- `SERVICE_SCHEMAS.mouldRemediation()`
- `SERVICE_SCHEMAS.stormDamage()`
- `SERVICE_SCHEMAS.floodRecovery()`
- `SERVICE_SCHEMAS.commercialServices()`
- `SERVICE_SCHEMAS.biohazardCleanup()`

---

### 2. Add Schema to Location Page

```tsx
import { LOCATION_SCHEMAS } from '@/lib/seo/comprehensive-schema';

export default function HamiltonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCATION_SCHEMAS.hamilton())
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

**Available Location Schemas:**
- `LOCATION_SCHEMAS.hamilton()`
- `LOCATION_SCHEMAS.ascot()`
- `LOCATION_SCHEMAS.newFarm()`
- `LOCATION_SCHEMAS.toowong()`
- `LOCATION_SCHEMAS.karalee()`
- `LOCATION_SCHEMAS.brookwater()`
- `LOCATION_SCHEMAS.springfieldLakes()`

---

### 3. Add FAQ Schema

```tsx
import { generateFAQPageSchema } from '@/lib/seo/comprehensive-schema';

const faqs = [
  {
    question: "How quickly can you respond to emergencies?",
    answer: "We respond within 60 minutes to Brisbane CBD and inner suburbs."
  },
  {
    question: "Do you work with insurance companies?",
    answer: "Yes, we work with all major Australian insurance companies."
  }
];

export default function FAQPage() {
  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

---

### 4. Add Person Schema (Phill McGurk)

```tsx
import { generatePersonSchema } from '@/lib/seo/comprehensive-schema';

export default function AboutPage() {
  const personSchema = generatePersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

---

### 5. Custom Service Schema

```tsx
import { generateServiceSchema } from '@/lib/seo/comprehensive-schema';

const customService = generateServiceSchema({
  name: 'Ceiling Water Damage Repair Brisbane',
  description: 'Emergency ceiling water damage restoration and repair services...',
  url: 'https://disasterrecovery.com.au/services/ceiling-repair',
  serviceType: 'Ceiling Damage Repair',
  areaServed: ['Brisbane', 'Ipswich', 'Logan']
});

export default function CeilingRepairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(customService) }}
      />
      {/* Your page content */}
    </>
  );
}
```

---

### 6. Custom Location Schema

```tsx
import { generateLocationSchema } from '@/lib/seo/comprehensive-schema';

const paddingtonSchema = generateLocationSchema({
  locationName: 'Paddington',
  suburb: 'Paddington',
  latitude: -27.4600,
  longitude: 152.9950,
  description: 'Emergency disaster restoration for Paddington heritage properties.'
});

export default function PaddingtonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(paddingtonSchema) }}
      />
      {/* Your page content */}
    </>
  );
}
```

---

### 7. Breadcrumb Schema

```tsx
import { generateBreadcrumbSchema } from '@/lib/seo/comprehensive-schema';

const breadcrumbs = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Water Damage', url: 'https://disasterrecovery.com.au/services/water-damage' }
]);

// Already implemented in components/ui/breadcrumbs.tsx
// Auto-generates for all pages
```

---

## Contact Information

**IMPORTANT:** All schema uses these verified contact details:

- **Phone:** +61-1300-309-361 (1300 309 361)
- **Email:** admin@disasterrecovery.com.au
- **Address:** 4/17 Tile St, Wacol, QLD 4076
- **Coordinates:** -27.5969, 152.9294

**DO NOT** change these without updating the base configuration.

---

## Service Areas

**Brisbane:**
- Hamilton (lat: -27.4380, lng: 153.0650)
- Ascot (lat: -27.4320, lng: 153.0580)
- New Farm (lat: -27.4650, lng: 153.0500)
- Toowong (lat: -27.4850, lng: 152.9900)

**Ipswich:**
- Karalee (lat: -27.5700, lng: 152.7800)
- Brookwater (lat: -27.6700, lng: 152.9100)
- Springfield Lakes (lat: -27.6700, lng: 152.9200)

---

## Testing Your Schema

### Google Rich Results Test
1. Go to: https://search.google.com/test/rich-results
2. Enter your page URL
3. Check for errors/warnings

### Schema.org Validator
1. Go to: https://validator.schema.org/
2. Paste your schema JSON
3. Verify structure

### Local Validation
```bash
npx tsx scripts/validate-schemas.ts
```

---

## File Locations

**Core Libraries:**
- Schema generators: `lib/seo/comprehensive-schema.ts`
- Sitemap generator: `lib/seo/sitemap-generator.ts`
- Schema validator: `lib/seo/schema-validator.ts`

**Scripts:**
- Generate sitemap: `scripts/generate-sitemap.ts`
- Validate schemas: `scripts/validate-schemas.ts`

**Generated:**
- Sitemap: `public/sitemap.xml`

**Documentation:**
- Full report: `SCHEMA-IMPLEMENTATION-REPORT.md`
- Quick reference: `docs/SCHEMA-QUICK-REFERENCE.md` (this file)

---

## Adding New Pages to Sitemap

1. Edit `lib/seo/sitemap-generator.ts`
2. Add your page path to `SITE_PAGES` object
3. Run: `npx tsx scripts/generate-sitemap.ts`

Example:
```typescript
export const SITE_PAGES = {
  // ... existing pages
  newCategory: {
    newPage: '/new-category/new-page'
  }
};
```

---

## Common Issues

### Schema Not Showing in Rich Results Test
- Ensure JSON-LD is properly formatted
- Check for missing required fields
- Verify @context and @type are correct

### Validation Errors
- Run: `npx tsx scripts/validate-schemas.ts`
- Check error messages for specific issues
- Ensure all required fields are present

### Sitemap Not Updating
- Regenerate: `npx tsx scripts/generate-sitemap.ts`
- Check `public/sitemap.xml` was created
- Submit to Google Search Console

---

## Support

For detailed documentation, see:
- `SCHEMA-IMPLEMENTATION-REPORT.md` - Complete implementation guide
- `lib/seo/comprehensive-schema.ts` - Schema source code
- Schema.org documentation: https://schema.org/

---

**Last Updated:** 2025-11-09
**Version:** 1.0
