# E-E-A-T Quick Reference Guide
## Fast Implementation for Disaster Recovery Pages

---

## 🚀 Quick Start

### Adding E-E-A-T to ANY Page (3 steps)

1. **Add Author Schema** (for SEO)
```tsx
import AuthorSchema from '@/components/seo/AuthorSchema';

// Add at top of page component
<AuthorSchema author="phill" />  // or "bronwyn" or "team"
```

2. **Add Publication Date** (for freshness)
```tsx
import { PublicationMeta } from '@/components/content/AuthorBio';

// Add near article title
<PublicationMeta
  author="team"
  datePublished="2025-01-21"
  readTime="5 min"
/>
```

3. **Add Trust Badges** (for credibility)
```tsx
import TrustBadges from '@/components/brand/TrustBadges';

// Add in footer or sidebar
<TrustBadges variant="compact" />
```

---

## 📋 Component Cheat Sheet

### AuthorSchema (SEO - Invisible)
```tsx
// Basic
<AuthorSchema author="phill" />

// With article info
<AuthorSchema
  author="phill"
  articleTitle="Water Damage Guide"
  articleUrl="https://disasterrecovery.com.au/services/water-damage"
  datePublished="2025-01-21"
  dateModified="2025-01-21"
/>
```

**When to use**: Every page with content (articles, guides, service pages)

---

### TrustBadges (Visual - Visible)

```tsx
// Full display (service pages, landing pages)
<TrustBadges variant="horizontal" showAll={true} />

// Compact (headers, CTAs)
<TrustBadges variant="compact" showAll={false} />

// Footer
<TrustBadges variant="footer" />

// Sidebar
<TrustBadges variant="vertical" />
```

**When to use**: Every page for credibility

---

### AuthorBio (Profile - Visible)

```tsx
// Full bio (About page, author pages)
<AuthorBio author="phill" variant="full" showContact={true} />

// Compact (article footers)
<AuthorBio author="bronwyn" variant="compact" />

// Inline (quick attribution)
<AuthorBio author="team" variant="inline" />
```

**When to use**: Service pages, guides, blog posts

---

### PublicationMeta (Dates - Visible)

```tsx
<PublicationMeta
  author="phill"
  datePublished="2025-01-21"
  dateModified="2025-01-21"  // optional
  readTime="8 min"             // optional
/>
```

**When to use**: All content pages (articles, guides, resources)

---

### CertificationLogos (Badges - Visible)

```tsx
import { CertificationLogos } from '@/components/brand/TrustBadges';

<CertificationLogos />
```

**When to use**: Certifications page, About page, major landing pages

---

### InsurancePartnerLogos (Logos - Visible)

```tsx
import { InsurancePartnerLogos } from '@/components/brand/TrustBadges';

<InsurancePartnerLogos />
```

**When to use**: Insurance pages, partner pages, commercial pages

---

## 📄 Page Templates

### Service Page Template
```tsx
import AuthorSchema from '@/components/seo/AuthorSchema';
import AuthorBio from '@/components/content/AuthorBio';
import TrustBadges from '@/components/brand/TrustBadges';

export default function ServicePage() {
  return (
    <>
      {/* SEO Schema */}
      <AuthorSchema
        author="phill"
        articleTitle="Water Damage Restoration Brisbane"
        articleUrl="https://disasterrecovery.com.au/services/water-damage"
        datePublished="2025-01-21"
      />

      <main>
        {/* Hero section */}
        <section>...</section>

        {/* Trust badges */}
        <section>
          <TrustBadges variant="horizontal" />
        </section>

        {/* Main content */}
        <section>...</section>

        {/* Author bio */}
        <section>
          <AuthorBio author="phill" variant="compact" />
        </section>
      </main>
    </>
  );
}
```

---

### Guide/Article Template
```tsx
import AuthorSchema from '@/components/seo/AuthorSchema';
import { PublicationMeta } from '@/components/content/AuthorBio';
import TrustBadges from '@/components/brand/TrustBadges';

export default function GuidePage() {
  return (
    <>
      <AuthorSchema
        author="team"
        articleTitle="Insurance Claims Guide"
        articleUrl="https://disasterrecovery.com.au/insurance-guide"
        datePublished="2025-01-15"
        dateModified="2025-01-21"
      />

      <article>
        <header>
          <h1>Insurance Claims Guide</h1>
          <PublicationMeta
            author="team"
            datePublished="2025-01-15"
            dateModified="2025-01-21"
            readTime="10 min"
          />
        </header>

        {/* Article content */}

        <footer>
          <TrustBadges variant="compact" />
        </footer>
      </article>
    </>
  );
}
```

---

### Landing Page Template
```tsx
import AuthorSchema from '@/components/seo/AuthorSchema';
import TrustBadges, { CertificationLogos, InsurancePartnerLogos } from '@/components/brand/TrustBadges';

export default function LandingPage() {
  return (
    <>
      <AuthorSchema author="team" />

      <main>
        {/* Hero */}
        <section>...</section>

        {/* Trust indicators */}
        <section>
          <TrustBadges variant="horizontal" showAll={true} />
        </section>

        {/* Certification proof */}
        <section>
          <CertificationLogos />
        </section>

        {/* Insurance partners */}
        <section>
          <InsurancePartnerLogos />
        </section>
      </main>
    </>
  );
}
```

---

## 🎨 Styling Variants

### TrustBadges Variants Compared

| Variant | Use Case | Shows |
|---------|----------|-------|
| `horizontal` | Main content areas | Full cards with icons, titles, descriptions |
| `compact` | Headers, CTAs | Small badges with icons and titles only |
| `vertical` | Sidebars, narrow spaces | Stacked cards with borders |
| `footer` | Footer sections | Grid of icons with titles |

---

## ⚡ Common Patterns

### Pattern 1: Service Page E-E-A-T
```tsx
// Top of page
<AuthorSchema author="phill" articleTitle="..." articleUrl="..." datePublished="..." />

// After hero
<TrustBadges variant="horizontal" showAll={true} />

// Before footer
<AuthorBio author="phill" variant="compact" />
```

---

### Pattern 2: Guide/Resource E-E-A-T
```tsx
// Top of page
<AuthorSchema author="team" articleTitle="..." />

// Article header
<PublicationMeta author="team" datePublished="..." dateModified="..." readTime="..." />

// Article footer
<TrustBadges variant="compact" />
```

---

### Pattern 3: Location Page E-E-A-T
```tsx
// Top
<AuthorSchema author="team" />

// Trust section
<TrustBadges variant="horizontal" showAll={false} />

// Social proof section
<InsurancePartnerLogos />
```

---

## 🎯 Author Selection Guide

| Content Type | Author | Why |
|--------------|--------|-----|
| Technical restoration guides | `phill` | Master Restorer expertise |
| Customer service, claims | `bronwyn` | Operations & customer focus |
| General company content | `team` | Collective credentials |
| Emergency response | `team` | 24/7 team availability |
| Certification/education | `phill` | IICRC instructor |

---

## 📊 Priority Implementation

### High Priority (Do First)
1. ✅ Add `AuthorSchema` to all service pages
2. ✅ Add `TrustBadges` to homepage
3. ✅ Add `PublicationMeta` to all guides

### Medium Priority
4. Add `AuthorBio` to service pages
5. Add `CertificationLogos` to About page
6. Add `InsurancePartnerLogos` to insurance pages

### Low Priority (Nice to Have)
7. Add inline author attribution to blog posts
8. Add trust badges to all landing pages
9. Update all content with modification dates

---

## 🔗 Internal Linking Strategy

Always link to E-E-A-T pages:

```tsx
// Link to Certifications
<Link href="/certifications">View Our Certifications →</Link>

// Link to Case Studies
<Link href="/case-studies">See Real Results →</Link>

// Link to Media
<Link href="/media">Industry Recognition →</Link>

// Link to About
<Link href="/about">Meet Our Team →</Link>
```

---

## 📝 Copy-Paste Examples

### Quick Service Page Addition
```tsx
{/* Add this before your closing </main> tag */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
    <TrustBadges variant="horizontal" />
    <div className="mt-8">
      <AuthorBio author="phill" variant="compact" />
    </div>
  </div>
</section>
```

---

### Quick Guide Page Addition
```tsx
{/* Add after your <h1> title */}
<div className="mb-6">
  <PublicationMeta
    author="team"
    datePublished="2025-01-21"
    readTime="5 min"
  />
</div>
```

---

### Quick Footer Addition
```tsx
{/* Add to your footer component */}
<div className="border-t border-gray-200 pt-8">
  <TrustBadges variant="footer" />
</div>
```

---

## 🚨 Common Mistakes to Avoid

❌ **Don't**: Use wrong author for content type
✅ **Do**: Match author to expertise (Phill = technical, Bronwyn = operations, Team = general)

❌ **Don't**: Forget to add schema markup
✅ **Do**: Always include `<AuthorSchema>` for SEO benefits

❌ **Don't**: Use outdated publication dates
✅ **Do**: Use current dates and update `dateModified` when editing

❌ **Don't**: Overload pages with all variants
✅ **Do**: Choose appropriate variant for page section

❌ **Don't**: Hide trust signals at bottom only
✅ **Do**: Place prominently above the fold where possible

---

## 📞 Need Help?

Refer to:
- **Full Documentation**: `docs/E-E-A-T-IMPLEMENTATION.md`
- **Component Files**: `components/seo/`, `components/brand/`, `components/content/`
- **Example Pages**: `/certifications`, `/case-studies`, `/media`

---

**Quick Reference v1.0** | Last Updated: 21 January 2025
