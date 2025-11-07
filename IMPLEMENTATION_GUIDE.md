# Site Structure Optimization - Implementation Guide

**Quick Start for Developers**

---

## Overview

Complete site structure optimization has been configured. This guide shows how to implement it into your existing pages.

---

## Configuration Files Location

All files are located in: **`/lib/seo/`** and **`/components/seo/`**

```
lib/seo/
├── site-structure.ts              # Header hierarchies & silos
├── breadcrumb-schema.ts           # Breadcrumb configuration
├── internal-linking.ts            # Internal linking strategy
├── footer-structure.ts            # Footer organization
├── sitemap-config.ts              # Sitemap priorities
└── url-structure-optimization.ts  # URL structure rules

components/seo/
└── NavigationOptimization.tsx     # Navigation components
```

---

## Phase 1: Update Page Headers

### Step 1: Import site structure
```typescript
import { PAGE_HIERARCHIES } from '@/lib/seo/site-structure';

// Get header hierarchy for current page
const hierarchy = PAGE_HIERARCHIES['/services/water-damage'];
```

### Step 2: Update H1 tags
```tsx
// Find existing H1 and replace with:
<h1 className="page-title">
  {hierarchy.h1}
</h1>
```

### Step 3: Update H2 tags
```tsx
// Replace section headings with:
{hierarchy.h2.map((heading, index) => (
  <h2 key={index} className="section-title">
    {heading}
  </h2>
))}
```

### Step 4: Add H3 tags
```tsx
// Add subsection headings:
{hierarchy.h3?.[heading]?.map((subheading, index) => (
  <h3 key={index} className="subsection-title">
    {subheading}
  </h3>
))}
```

**Files to update:**
- `/app/services/water-damage/page.tsx`
- `/app/services/fire-damage/page.tsx`
- `/app/services/mould-remediation/page.tsx`
- `/app/services/storm-damage/page.tsx`
- `/app/services/commercial/page.tsx`
- `/app/about-phil-mcgurk/page.tsx`
- `/app/service-areas/page.tsx`
- `/app/insurance-claims/page.tsx`
- All service sub-pages

---

## Phase 2: Implement Breadcrumbs

### Step 1: Import breadcrumb configuration
```typescript
import { getBreadcrumbSchemaForPath } from '@/lib/seo/breadcrumb-schema';
import { BreadcrumbNavigation } from '@/components/seo/NavigationOptimization';
```

### Step 2: Add breadcrumb component
```tsx
// Add to page, right after header or in layout
<BreadcrumbNavigation
  items={[
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Water Damage Restoration' }  // Current page
  ]}
/>
```

### Step 3: Add JSON-LD schema
```tsx
import Script from 'next/script';

const schema = getBreadcrumbSchemaForPath(pathname);

// In component:
{schema && (
  <Script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    strategy="afterInteractive"
  />
)}
```

**Implementation:** Add breadcrumbs to all pages except homepage

---

## Phase 3: Add Internal Links

### Step 1: Import linking strategy
```typescript
import { getPageLinks, getRelatedSpokes } from '@/lib/seo/internal-linking';
```

### Step 2: Get page-specific links
```typescript
const pageLinks = getPageLinks('/services/water-damage');

// pageLinks.primaryLinks = main navigation links
// pageLinks.secondaryLinks = supporting links
// pageLinks.relatedContent = related services
```

### Step 3: Implement "Related Services" section
```tsx
import { RelatedLinks } from '@/components/seo/NavigationOptimization';

<RelatedLinks
  title="Related Water Damage Services"
  links={[
    { href: '/services/water-damage/burst-pipes', label: 'Burst Pipes Repair' },
    { href: '/services/water-damage/ceiling-water-damage', label: 'Ceiling Water Damage' },
    { href: '/services/water-damage/roof-leak-damage', label: 'Roof Leak Repair' }
  ]}
/>
```

### Step 4: Add contextual inline links
```tsx
// In body text, add links to related content:
// First mention of related service → link to that page
// Links should use descriptive anchor text

"If you're dealing with <Link href="/services/water-damage/burst-pipes">
burst pipes water damage</Link>, our team can help..."
```

**Key Pages to Update:**
- `/services/water-damage` → link to 8 sub-pages
- `/services/fire-damage` → link to 6 sub-pages
- `/services/mould-remediation` → link to 4 sub-pages
- `/services/storm-damage` → link to 5 sub-pages
- `/services/commercial` → link to 8 sub-pages

---

## Phase 4: Update Navigation

### Step 1: Update Header Navigation
```tsx
import { MainNavigation } from '@/components/seo/NavigationOptimization';

const navItems = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Water Damage', href: '/services/water-damage' },
      { label: 'Fire Damage', href: '/services/fire-damage' },
      { label: 'Mould Remediation', href: '/services/mould-remediation' },
      { label: 'Storm Damage', href: '/services/storm-damage' },
      { label: 'Commercial', href: '/services/commercial' }
    ]
  },
  // ... other nav items
];

<MainNavigation items={navItems} />
```

### Step 2: Update Footer Navigation
```tsx
import { FooterNavigation } from '@/components/seo/NavigationOptimization';

<FooterNavigation />
```

**File:** `/components/Footer.tsx`

---

## Phase 5: Implement Footer Structure

### Step 1: Import footer structure
```typescript
import { getFooterSections, generateFooterSchema } from '@/lib/seo/footer-structure';
```

### Step 2: Restructure footer sections
```tsx
const sections = getFooterSections();

{sections.map((section) => (
  <div key={section.title} className="footer-section">
    <h3>{section.title}</h3>
    <ul>
      {section.links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} title={link.title}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
```

### Step 3: Add footer schema
```tsx
const footerSchema = generateFooterSchema();

<Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(footerSchema) }}
/>
```

**Expected footer sections (in order):**
1. Services
2. Expertise & Credentials
3. Service Areas
4. Resources & Guides
5. Insurance Support
6. Company

---

## Phase 6: Update Sitemap

### Step 1: Generate new sitemap configuration
```typescript
import { generateSitemapXML } from '@/lib/seo/sitemap-config';

// Generate the XML
const sitemapXML = generateSitemapXML();

// Write to /public/sitemap.xml
```

### Step 2: Create sitemap route (Next.js 13+)
```typescript
// app/sitemap.xml/route.ts
import { generateSitemapXML } from '@/lib/seo/sitemap-config';

export async function GET() {
  const xml = generateSitemapXML();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}
```

### Step 3: Update robots.txt
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://disasterrecovery.com.au/sitemap.xml
```

---

## Phase 7: Canonicalization

### Step 1: Import URL optimization
```typescript
import { getCanonicalURL } from '@/lib/seo/url-structure-optimization';
```

### Step 2: Add canonical to layout
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  // ... other metadata

  // Next.js automatically handles canonical URLs
  // But ensure alternates are set correctly
};

// Or manually in component:
<link rel="canonical" href={getCanonicalURL(pathname)} />
```

### Step 3: Handle redirects in next.config.js
```javascript
// next.config.js already has redirect example
async redirects() {
  return [
    {
      source: '/services/water-damage-restoration',
      destination: '/services/water-damage',
      permanent: true,
    },
    // Add more as needed
  ];
}
```

---

## Phase 8: Schema Markup

### Add to every service page:
```tsx
import Script from 'next/script';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  'name': 'Water Damage Restoration',
  'provider': {
    '@type': 'LocalBusiness',
    'name': 'Disaster Recovery Australia',
    'phone': '1300309361'
  },
  'areaServed': ['Brisbane', 'Ipswich', 'Logan']
};

<Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
/>
```

---

## Phase 9: Testing Checklist

### For Each Page Updated:

- [ ] Only 1 H1 tag present
- [ ] H1 contains primary keyword
- [ ] No skipped heading levels (h1 → h2 → h3)
- [ ] Breadcrumb displays correctly
- [ ] Breadcrumb schema validates (Google Rich Results)
- [ ] Internal links have descriptive anchor text
- [ ] Related services section includes 3-4 links
- [ ] No broken internal links
- [ ] Mobile menu displays correctly
- [ ] Footer links organized by section
- [ ] Canonical URL set correctly
- [ ] Schema markup validates

### Tools:
- Chrome DevTools Lighthouse
- Google Rich Results Test
- SEMrush Site Audit
- Screaming Frog crawl

---

## Priority Order

Implement in this order for maximum impact:

### Week 1-2: Critical Pages
1. Homepage (/)
2. Services hub (/services)
3. Water damage hub (/services/water-damage)
4. Fire damage hub (/services/fire-damage)
5. Mould remediation hub (/services/mould-remediation)

### Week 3-4: Primary Services
6. Storm damage (/services/storm-damage)
7. Commercial services (/services/commercial)
8. About page (/about-phil-mcgurk)
9. Service areas (/service-areas)
10. Insurance claims (/insurance-claims)

### Week 5-6: Secondary Services
11. All sub-service pages (water damage specifics, etc.)
12. Emergency services pages
13. All guide pages

### Week 7-8: Completion
14. FAQ pages
15. Insurance partner pages
16. Remaining support pages
17. Legal pages (lower priority)

---

## Common Implementation Patterns

### Pattern 1: Service Category Page
```tsx
import { PAGE_HIERARCHIES } from '@/lib/seo/site-structure';
import { getPageLinks } from '@/lib/seo/internal-linking';
import { BreadcrumbNavigation, RelatedLinks } from '@/components/seo/NavigationOptimization';

const hierarchy = PAGE_HIERARCHIES['/services/water-damage'];
const pageLinks = getPageLinks('/services/water-damage');

export default function WaterDamagePage() {
  return (
    <div>
      <BreadcrumbNavigation items={[/* ... */]} />

      <h1>{hierarchy.h1}</h1>

      {hierarchy.h2.map((heading, index) => (
        <section key={index}>
          <h2>{heading}</h2>
          {/* Section content */}
        </section>
      ))}

      <RelatedLinks title="Related Services" links={pageLinks.relatedContent} />
    </div>
  );
}
```

### Pattern 2: Sub-Service Page
```tsx
import { getRelatedSpokes, getClusterHub } from '@/lib/seo/internal-linking';

const hub = getClusterHub('/services/water-damage/burst-pipes');
const related = getRelatedSpokes('/services/water-damage/burst-pipes');

export default function BurstPipesPage() {
  return (
    <div>
      {/* Breadcrumb */}
      {/* Header */}

      <p>
        Part of our <Link href={hub}>water damage restoration</Link> services.
      </p>

      {/* Content sections */}

      <RelatedLinks
        title="Other Water Damage Services"
        links={related.map(url => ({ href: url, label: /* ... */ }))}
      />
    </div>
  );
}
```

---

## Troubleshooting

### Issue: "PAGE_HIERARCHIES doesn't have my page"

**Solution:**
1. Check if page needs to be added to PAGE_HIERARCHIES in `site-structure.ts`
2. If it's a new custom page, add the hierarchy following the existing pattern
3. Update your page to use that hierarchy

### Issue: "Getting too many links error"

**Solution:**
1. Check `getRelatedSpokes()` - default limit is 3
2. Change limit parameter: `getRelatedSpokes(path, 2)`
3. Don't add more than 5-7 internal links per page

### Issue: "Breadcrumb schema not validating"

**Solution:**
1. Ensure all breadcrumb items have position numbers
2. Verify schema is valid JSON
3. Check that item URLs are absolute (full domain)
4. Test with Google Rich Results Test

### Issue: "Footer is too cluttered"

**Solution:**
1. Maximum 6 sections, 6 links each
2. Remove low-priority links
3. Combine related sections if needed
4. Use columns/grid layout for desktop

---

## Files to Create/Update Summary

### New Files Created (Do Not Delete)
- `/lib/seo/site-structure.ts` ✓
- `/lib/seo/breadcrumb-schema.ts` ✓
- `/lib/seo/internal-linking.ts` ✓
- `/lib/seo/footer-structure.ts` ✓
- `/lib/seo/sitemap-config.ts` ✓
- `/lib/seo/url-structure-optimization.ts` ✓
- `/components/seo/NavigationOptimization.tsx` ✓
- `/SEO_SITE_STRUCTURE_OPTIMIZATION.md` ✓ (Reference)
- `/IMPLEMENTATION_GUIDE.md` ✓ (This file)

### Files to Update
- `/app/page.tsx` (Homepage)
- `/app/services/page.tsx`
- `/app/services/water-damage/page.tsx`
- `/app/services/fire-damage/page.tsx`
- `/app/services/mould-remediation/page.tsx`
- `/app/services/storm-damage/page.tsx`
- `/app/services/commercial/page.tsx`
- `/app/about-phil-mcgurk/page.tsx`
- `/app/service-areas/page.tsx`
- `/components/Header.tsx`
- `/components/Footer.tsx`
- `/app/layout.tsx`
- All service sub-pages
- All guide pages
- All FAQ pages

---

## Support & Questions

For specific questions:
1. Check the configuration file comments
2. Reference `/SEO_SITE_STRUCTURE_OPTIMIZATION.md`
3. Review implemented examples
4. Test with Google's SEO tools

---

**Ready to implement? Start with Phase 1 and work through each phase in order.**

