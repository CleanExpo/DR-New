# SEO Optimization Guide - Disaster Recovery Brisbane

## Overview

Complete SEO strategy and implementation guide for dominating local search results in Brisbane, Ipswich, and Logan areas.

## Table of Contents

- [SEO Strategy](#seo-strategy)
- [On-Page SEO](#on-page-seo)
- [Technical SEO](#technical-seo)
- [Local SEO](#local-seo)
- [Content Strategy](#content-strategy)
- [Schema Markup](#schema-markup)
- [Performance](#performance)

## SEO Strategy

### Target Keywords

**Primary Keywords:**
- "water damage restoration Brisbane"
- "fire damage restoration Brisbane"
- "emergency restoration Brisbane"
- "IICRC master restorer Brisbane"
- "mould remediation Brisbane"

**Location-Specific:**
- "water damage Hamilton"
- "emergency restoration Ascot"
- "fire damage New Farm"
- "water damage Ipswich"
- "emergency restoration Logan"

**Service + Location:**
- "24/7 water damage Brisbane"
- "emergency flood restoration Ipswich"
- "commercial property restoration Brisbane"

### Competitive Advantages

1. **IICRC Master Restorer**: One of few in Queensland
2. **24/7 Emergency Response**: Always available
3. **Local Focus**: Brisbane, Ipswich, Logan
4. **High-End Service**: Premium residential + commercial
5. **Insurance Partnerships**: Direct insurance work

## On-Page SEO

### Title Tags

```tsx
// Homepage
<title>
  Water & Fire Damage Restoration Brisbane | IICRC Master Restorer | 24/7 Emergency
</title>

// Service pages
<title>
  Water Damage Restoration Brisbane | 24/7 Emergency Response | 1300 309 361
</title>

// Location pages
<title>
  Water Damage Restoration Hamilton QLD | Emergency Service 24/7
</title>
```

**Rules:**
- Keep under 60 characters
- Include primary keyword
- Include location
- Include unique value prop (Master Restorer, 24/7)
- Include phone number on key pages

### Meta Descriptions

```tsx
<meta
  name="description"
  content="IICRC Master Restorer certified water & fire damage restoration in Brisbane. 24/7 emergency response across Hamilton, Ascot, New Farm, Ipswich & Logan. Call 1300 309 361"
/>
```

**Rules:**
- 150-160 characters
- Include primary keyword
- Include call-to-action
- Include phone number
- Mention service areas
- Highlight Master Restorer certification

### Heading Structure

```tsx
// Proper hierarchy
<h1>Water Damage Restoration Brisbane - 24/7 Emergency Response</h1>
<h2>IICRC Master Restorer Certified Services</h2>
<h3>Why Choose Our Water Damage Restoration</h3>
<h4>Servicing Brisbane, Ipswich & Logan</h4>

// Include keywords naturally
<h2>Emergency Water Damage Restoration in Brisbane</h2>
<h2>Our Water Damage Restoration Process</h2>
<h2>Service Areas: Hamilton, Ascot, New Farm & More</h2>
```

### Content Optimization

**Keyword Density:**
- Primary keyword: 1-2% of content
- Secondary keywords: Natural placement
- Location keywords: Multiple mentions
- LSI keywords: Related terms throughout

**Content Length:**
- Homepage: 1500+ words
- Service pages: 2000+ words
- Location pages: 1000+ words
- Blog posts: 1500+ words

## Technical SEO

### Sitemap

```xml
<!-- Generated at /sitemap.xml -->
- All service pages
- All location pages
- All blog posts
- Emergency pages
- Insurance pages
```

### Robots.txt

```txt
# /public/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: https://disasterrecovery.com.au/sitemap.xml
```

### Canonical URLs

```tsx
<link rel="canonical" href="https://disasterrecovery.com.au/services/water-damage-restoration" />
```

### Mobile Optimization

- Responsive design (all devices)
- Mobile-first indexing ready
- Fast mobile load times (< 3s)
- Touch-friendly buttons (min 44x44px)

### Page Speed

**Targets:**
- Lighthouse Performance: > 90
- Largest Contentful Paint: < 2.5s
- First Input Delay: < 100ms
- Cumulative Layout Shift: < 0.1

**Optimization:**
```bash
# Image optimization
npm run web-optimise

# Check performance
npm run lighthouse
```

### HTTPS & Security

- SSL certificate active
- HSTS enabled
- Secure headers configured
- Mixed content prevented

## Local SEO

### Google Business Profile

**Optimization:**
1. Complete business information
2. Service area: Brisbane, Ipswich, Logan
3. Categories: Water Damage Restoration, Fire Restoration
4. Regular posts (weekly)
5. Respond to reviews (within 24h)
6. Add photos (weekly)

**NAP Consistency:**
- Name: Disaster Recovery Brisbane
- Address: Brisbane, QLD (service area business)
- Phone: 1300 309 361

### Local Citations

**Priority Directories:**
1. Google Business Profile
2. Bing Places
3. True Local
4. Yellow Pages Australia
5. Australian Business Directory
6. Local Chamber of Commerce

### Location Pages

```tsx
// Create pages for each service area
/locations/hamilton
/locations/ascot
/locations/new-farm
/locations/toowong
/locations/ipswich
/locations/logan

// Each page includes:
- Suburb-specific content
- Local landmarks
- Service area map
- Local testimonials
- Suburb-specific emergency response
```

### Local Schema Markup

```json
{
  "@type": "LocalBusiness",
  "name": "Disaster Recovery Brisbane",
  "telephone": "1300309361",
  "areaServed": [
    {
      "@type": "City",
      "name": "Brisbane"
    },
    {
      "@type": "City",
      "name": "Ipswich"
    },
    {
      "@type": "City",
      "name": "Logan"
    }
  ]
}
```

## Content Strategy

### Content Pillars

1. **Service Education**
   - What is water damage restoration?
   - Fire damage restoration process
   - Mould remediation guide

2. **Emergency Response**
   - What to do immediately after flooding
   - Fire damage emergency checklist
   - Storm damage first steps

3. **Insurance Information**
   - Working with insurance companies
   - Claims process guide
   - Insurance coverage for restoration

4. **Local Focus**
   - Brisbane disaster statistics
   - Ipswich flood history
   - Logan area emergency resources

### Blog Topics

- "Complete Guide to Water Damage Restoration in Brisbane"
- "IICRC Master Restorer: What It Means for Your Property"
- "24/7 Emergency Response: Why Timing Matters"
- "Hamilton Water Damage: Local Service Advantages"
- "Insurance Claims for Water Damage in Brisbane"

## Schema Markup

### LocalBusiness Schema

```tsx
import { LocalBusinessSchema } from '@/components/schema/LocalBusinessSchema';

<LocalBusinessSchema />
```

### Service Schema

```tsx
import { ServiceSchema } from '@/components/schema/ServiceSchema';

<ServiceSchema
  name="Water Damage Restoration"
  description="24/7 emergency water damage restoration"
  serviceType="Water Damage Restoration"
  areaServed={["Brisbane", "Ipswich", "Logan"]}
/>
```

### BreadcrumbList Schema

```tsx
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema';

<BreadcrumbSchema
  items={[
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: "Water Damage", url: "/services/water-damage-restoration" }
  ]}
/>
```

### FAQPage Schema

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Do you offer 24/7 emergency service?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, we provide 24/7 emergency restoration services..."
    }
  }]
}
</script>
```

## Link Building

### Internal Linking

```tsx
// Service to location
Water Damage Brisbane → Hamilton Water Damage

// Location to service
Hamilton → Water Damage Service

// Related services
Water Damage → Mould Remediation

// Emergency to service
Emergency Page → Service Pages
```

### External Links

**Target:**
- Local Brisbane websites
- Industry associations (IICRC)
- Insurance company partnerships
- Local news mentions
- Chamber of Commerce

## Performance

### Core Web Vitals

Monitor at: `/api/web-vitals`

**Targets:**
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- INP: < 200ms

### Image Optimization

```bash
# Optimize all images
npm run web-optimise

# Convert to WebP
npm run images:convert

# Check sizes
npm run optimise:check
```

## Monitoring & Analytics

### Google Search Console

**Monitor:**
- Search queries ranking
- Click-through rates
- Crawl errors
- Mobile usability
- Core Web Vitals

### Google Analytics 4

**Track:**
- Organic traffic
- Conversion rates
- Emergency form submissions
- Phone number clicks
- Service page views

### Rank Tracking

**Keywords to Track:**
- "water damage restoration brisbane"
- "emergency restoration brisbane"
- "iicrc master restorer brisbane"
- Location + service combinations

## Quick SEO Checklist

### Every Page

- [ ] Unique title tag with keyword
- [ ] Meta description under 160 characters
- [ ] H1 tag with primary keyword
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Internal links to related content
- [ ] Images with alt text
- [ ] Mobile responsive
- [ ] Fast load time (< 3s)
- [ ] Schema markup
- [ ] Canonical URL

### Service Pages

- [ ] 2000+ words of content
- [ ] Local keywords included
- [ ] Service area mentioned
- [ ] Phone number visible
- [ ] Emergency CTA prominent
- [ ] Related services linked
- [ ] FAQs included
- [ ] Service schema markup

### Location Pages

- [ ] Suburb-specific content
- [ ] Local landmarks mentioned
- [ ] Service area map
- [ ] Local testimonials
- [ ] Suburb keywords naturally placed
- [ ] Link to related services

## Tools & Resources

- **Google Search Console**: Search performance
- **Google Analytics**: Traffic analysis
- **Lighthouse**: Performance auditing
- **Screaming Frog**: Site crawling
- **Ahrefs/Semrush**: Keyword research
- **PageSpeed Insights**: Performance testing

## Archived SEO Documentation

For historical SEO work, see:
- `docs/archive/seo-docs/` - Previous SEO implementations
- `docs/archive/historical-summaries/` - GMB and ranking strategies

---

**Last Updated**: 2025-11-10
**Focus**: Local SEO for Brisbane, Ipswich, Logan
**Target**: Page 1 rankings for all primary keywords
