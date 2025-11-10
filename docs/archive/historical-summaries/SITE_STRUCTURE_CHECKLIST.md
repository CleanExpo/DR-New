# Site Structure Optimization - Quick Reference Checklist

---

## Header Hierarchy Quick Check

### Every Page Must Have:
- [ ] Exactly 1 H1 tag
- [ ] 2-3 H2 tags
- [ ] 3-6 H3 tags (where applicable)
- [ ] No skipped heading levels
- [ ] Primary keyword in H1

### Header Tag Template
```
H1: Primary keyword + main benefit
├── H2: Major topic 1
│   ├── H3: Subtopic A
│   └── H3: Subtopic B
└── H2: Major topic 2
```

---

## Content Silos Reference

### 9 Primary Silos

| Silo | Hub URL | Primary Keywords | Spoke Count |
|------|---------|------------------|-------------|
| Emergency | `/emergency` | 24/7 emergency, disaster response | 6+ |
| Water Damage | `/services/water-damage` | water damage, water restoration | 8 |
| Fire Damage | `/services/fire-damage` | fire damage, smoke damage | 7 |
| Mould | `/services/mould-remediation` | mould, black mould, mould removal | 4 |
| Storm Damage | `/services/storm-damage` | storm damage, cyclone, hail | 5 |
| Commercial | `/services/commercial` | commercial restoration | 8 |
| Insurance | `/insurance-claims` | insurance claims | N/A |
| Service Areas | `/service-areas` | Brisbane, Ipswich, Logan | 3 |
| Expertise | `/about-phil-mcgurk` | Master Restorer, credentials | N/A |

---

## Breadcrumb Checklist

### For Each Breadcrumb:
- [ ] Shows current page location
- [ ] Links to parent pages
- [ ] Uses forward slashes as separators
- [ ] Displays correctly on mobile
- [ ] Schema markup is valid
- [ ] Last item is NOT a link (current page)

### Breadcrumb Schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"position": 1, "name": "Home", "item": "https://disasterrecovery.com.au"},
    {"position": 2, "name": "Services", "item": "https://disasterrecovery.com.au/services"},
    {"position": 3, "name": "Water Damage"}
  ]
}
```

---

## Internal Linking Checklist

### For Hub Pages (Main Service Pages):
- [ ] Link to all spoke pages (3-8 links)
- [ ] Link to relevant guides (1-2 links)
- [ ] Link to FAQ section (1 link)
- [ ] Link to insurance claims (if applicable)

### For Spoke Pages (Specific Services):
- [ ] Link back to hub page
- [ ] Link to 2-3 related spokes
- [ ] Link to 1-2 relevant guides
- [ ] Link to related FAQ
- [ ] Don't exceed 7 internal links

### For Guide Pages:
- [ ] Link to relevant service
- [ ] Link to related guides (same category)
- [ ] Link to FAQ for more info
- [ ] 3-5 internal links minimum

### Anchor Text Quality:
- [ ] Descriptive (not "click here")
- [ ] Includes keyword where natural
- [ ] Matches target page H1 (ideally)
- [ ] Not over-optimized

---

## Navigation Optimization

### Header Navigation:
- [ ] Main nav visible on desktop
- [ ] Mobile menu (hamburger) on small screens
- [ ] Services expandable in menu
- [ ] Emergency number prominent
- [ ] Contact link always accessible

### Footer Navigation:
- [ ] Organized in 6 sections (max)
- [ ] Max 6 links per section
- [ ] H3 heading for each section
- [ ] Sections in priority order
- [ ] No external footer links

### Navigation Accessibility:
- [ ] Semantic HTML (nav, ul, li)
- [ ] ARIA labels on nav elements
- [ ] Keyboard navigation works (Tab, Enter)
- [ ] Focus indicators visible
- [ ] Skip link at page top

---

## Footer Structure

### Required Sections (in order):
1. **Services** (6 links)
   - Water Damage Restoration
   - Fire Damage Restoration
   - Mould Remediation
   - Storm Damage Restoration
   - Commercial Restoration
   - 24/7 Emergency Response

2. **Expertise & Credentials** (3 links)
   - Phill McGurk - Master Restorer
   - IICRC Certification
   - RAI Certification

3. **Service Areas** (3 links)
   - Brisbane Service Area
   - Ipswich Service Area
   - Logan Service Area

4. **Resources & Guides** (6 links)
   - Emergency Guide
   - Water Damage Guides
   - Fire Damage Guides
   - Mould Prevention Guides
   - Storm Damage Guides
   - FAQ

5. **Insurance Support** (3 links)
   - Insurance Claims Assistance
   - Insurance Partners
   - Is It Covered

6. **Company** (5 links)
   - About Us
   - Contact Us
   - Privacy Policy
   - Terms of Service
   - Cookie Policy

---

## Sitemap Optimization

### Priority Guidelines:
- Homepage: 1.0
- Primary services: 0.95
- Secondary services: 0.85
- Guides: 0.75
- FAQ: 0.70
- Legal pages: 0.50

### Change Frequency:
- Homepage: daily
- Service pages: weekly
- Guides: monthly
- FAQ: monthly
- Legal: yearly

### Sitemap Checklist:
- [ ] XML sitemap generated
- [ ] All important pages included
- [ ] Priorities assigned correctly
- [ ] Change frequencies set
- [ ] No duplicate entries
- [ ] URLs are canonical
- [ ] Sitemap submitted to Search Console
- [ ] robots.txt points to sitemap

---

## URL Structure Checklist

### General Rules:
- [ ] Max 75 characters
- [ ] Uses hyphens (not underscores)
- [ ] Lowercase only
- [ ] Meaningful segments
- [ ] No tracking parameters
- [ ] No dynamic query strings
- [ ] Consistent structure

### URL Patterns:
```
/                                          Homepage
/services                                  Hub
/services/water-damage                     Primary category
/services/water-damage/burst-pipes         Secondary (specific)
/guides/water-damage                       Guide hub
/guides/water-damage/specific-guide        Specific guide
/faq/water-damage                          FAQ category
```

### Canonicalization:
- [ ] Canonical URL set on each page
- [ ] Removes parameters (utm_*, sort, etc.)
- [ ] Uses HTTPS
- [ ] Non-www preferred
- [ ] Redirects duplicates to canonical

---

## Page Checklist Template

Use this for each page you update:

```
Page: [URL]
Date: [Date]

HEADERS:
- [ ] 1 H1 tag present
- [ ] H1 matches primary keyword
- [ ] 2-3 H2 tags present
- [ ] 3-6 H3 tags present
- [ ] No skipped heading levels
- [ ] Hierarchy follows site structure

BREADCRUMBS:
- [ ] Breadcrumb navigation present (if not homepage)
- [ ] Breadcrumb schema markup added
- [ ] Validated with Rich Results Test

INTERNAL LINKS:
- [ ] Minimum 3-5 internal links
- [ ] Hub page linked (if spoke page)
- [ ] Related services linked
- [ ] Anchor text is descriptive
- [ ] No excessive linking (max 7)

NAVIGATION:
- [ ] Primary nav works
- [ ] Mobile menu works
- [ ] Footer links organized

URL & CANONICALS:
- [ ] URL follows pattern
- [ ] Canonical URL set
- [ ] No duplicate URLs

SCHEMA & SEO:
- [ ] Meta title set (60 chars max)
- [ ] Meta description (155 chars max)
- [ ] Schema markup added
- [ ] Validated with Google tools

TESTING:
- [ ] Desktop view correct
- [ ] Mobile view correct
- [ ] All links working
- [ ] No console errors
- [ ] Passes Lighthouse audit
```

---

## Content Type Templates

### Service Page Template
```
/services/[category]

H1: [Service] Restoration [Location] - [Key Benefit]

H2 Sections:
- What is [Service]?
- Why Choose Our [Service]?
- How We Handle [Service]
- [Service] Process Steps
- Common [Service] Issues
- FAQ About [Service]

Links Required:
- 3-5 spoke pages
- 1-2 guides
- 1 FAQ section
- Insurance claims (if applicable)

Schema: Service schema with areaServed
```

### Guide Page Template
```
/guides/[category]/[specific-guide]

H1: [Topic] - Complete Guide

H2 Sections:
- Introduction
- How to [Task]
- Common Mistakes
- When to Call Professionals
- Tips and Prevention

Links Required:
- Back to service page
- 2 related guides
- Related FAQ
- Insurance info (if applicable)

Schema: HowTo or FAQPage schema
```

### Hub Page Template
```
/services/[category]

H1: [Service] Restoration [Location] - [Unique Value Prop]

H2 Sections:
- Introduction to [Service]
- Our [Service] Process
- Common [Service] Scenarios
- Why Choose Us
- Service Areas

Links Required:
- All spoke pages (3-8)
- Relevant guides (1-2)
- FAQ section (1)
- Insurance support

Related Content Section with 4-6 links
```

---

## Keyword Integration Checklist

### For Each Page:
- [ ] Primary keyword in H1
- [ ] Primary keyword in first 100 words
- [ ] Secondary keywords in H2 tags
- [ ] LSI keywords in H3 tags
- [ ] Keyword in meta title
- [ ] Keyword in meta description
- [ ] Related keywords in body text (natural)
- [ ] No keyword stuffing
- [ ] Keyword variations used

---

## Mobile Optimization

### Mobile Checklist:
- [ ] Breadcrumbs readable
- [ ] Navigation hamburger menu works
- [ ] Internal links easy to tap (44x44px)
- [ ] Font sizes readable (16px+)
- [ ] No horizontal scrolling
- [ ] CTA buttons visible
- [ ] Footer links accessible
- [ ] Touch-friendly spacing

---

## Schema Markup Checklist

### Required on All Pages:
- [ ] Breadcrumb schema (non-homepage)
- [ ] Organization schema (in footer)
- [ ] LocalBusiness schema (in footer)

### Page-Specific:
- [ ] Service pages: Service schema
- [ ] Guide pages: HowTo or FAQPage schema
- [ ] FAQ pages: FAQPage schema
- [ ] Location pages: LocalBusiness schema

### Validation:
- [ ] Google Rich Results Test passes
- [ ] Schema.org validation passes
- [ ] No "not eligible" items

---

## Monthly Audit Checklist

- [ ] Check Google Search Console for crawl errors
- [ ] Verify header hierarchy on 10 random pages
- [ ] Test breadcrumbs on 5 pages
- [ ] Check for broken internal links
- [ ] Review page load times
- [ ] Check mobile usability
- [ ] Validate schema markup on sample pages
- [ ] Review click-through rates in GSC
- [ ] Check keyword rankings
- [ ] Review log files for crawl issues

---

## Common Mistakes to Avoid

- ❌ Multiple H1 tags on same page
- ❌ Skipping heading levels (H1 → H3)
- ❌ Breadcrumbs on homepage
- ❌ No links between related content
- ❌ Footer with 100+ links
- ❌ Links with "click here" anchor text
- ❌ Duplicate meta titles/descriptions
- ❌ Missing schema markup
- ❌ URLs with special characters
- ❌ No mobile navigation
- ❌ Breadcrumbs not in schema format
- ❌ Sitemap with low-priority pages

---

## Quick Links to Config Files

| Config File | Purpose | Location |
|------------|---------|----------|
| site-structure.ts | Header hierarchies | `/lib/seo/` |
| breadcrumb-schema.ts | Breadcrumb paths | `/lib/seo/` |
| internal-linking.ts | Link clusters | `/lib/seo/` |
| footer-structure.ts | Footer org | `/lib/seo/` |
| sitemap-config.ts | Sitemap priorities | `/lib/seo/` |
| url-structure-optimization.ts | URL patterns | `/lib/seo/` |
| NavigationOptimization.tsx | React components | `/components/seo/` |

---

## Emergency Contact Info Reference

**Phone:** 1300 309 361
**Address:** 4/17 Tile St, Wacol QLD 4076
**Email:** info@disasterrecovery.com.au

**Service Areas:**
- Brisbane (Hamilton, Ascot, New Farm, Toowong)
- Ipswich (Karalee, Brookwater, Springfield Lakes)
- Logan

---

**Print this checklist and keep it handy while implementing changes!**

