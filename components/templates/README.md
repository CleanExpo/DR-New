# Page Templates

Enterprise-grade page templates for Disaster Recovery Brisbane with built-in SEO, accessibility, and design system compliance.

## Available Templates

### ServicePageTemplate

Complete service page layout with:
- Dramatic hero sections with emergency CTAs
- Service overview with icon badges
- Benefits grid (3-6 items)
- Process steps visualization (4-8 steps)
- Optional before/after gallery
- FAQ section with schema markup
- Related services grid
- Emergency CTA section
- Floating CTA button
- Full schema.org structured data

**Usage:** See `SERVICE_PAGE_USAGE.md` for complete documentation.

**Example:**
```tsx
import { ServicePageTemplate } from '@/components/templates';
import { Droplets, Clock, Shield } from 'lucide-react';

export default function Page() {
  return (
    <ServicePageTemplate
      heroTitle="Water Damage Restoration Brisbane"
      heroSubtitle="60-Min Response • IICRC Master Restorer"
      heroDescription="Professional water damage restoration..."
      heroImage="/images/hero/water-damage.webp"
      heroImageAlt="Emergency water damage restoration"
      serviceOverview="Complete water damage restoration..."
      benefits={[...]}
      processSteps={[...]}
      faqs={[...]}
      serviceName="Water Damage Restoration Brisbane"
      serviceDescription="24/7 emergency water damage restoration..."
      serviceUrl="https://disasterrecovery.com.au/services/water-damage"
      breadcrumbs={[...]}
    />
  );
}
```

### LocationPageTemplate

Location-specific service page layout with:
- Local area hero
- Service areas covered
- Local testimonials
- Location-specific FAQs
- Nearby suburbs
- Emergency response times

**Usage:** See `components/templates/LocationPageTemplate.tsx` for implementation.

## Design System Integration

All templates use:
- ✅ Design tokens from `@/lib/design-system`
- ✅ Fluid CTA components
- ✅ Framer Motion animations
- ✅ Responsive grid layouts
- ✅ WCAG AA accessibility
- ✅ Schema.org structured data

## Features

### Built-in Animations
- Scroll-triggered fade-ins
- Stagger animations for lists
- Hover effects on cards
- Emergency pulse animations
- Magnetic button effects

### SEO Optimized
- Structured data (JSON-LD)
- Semantic HTML
- Proper heading hierarchy
- Meta tag integration
- Breadcrumb navigation
- FAQ schema
- HowTo schema
- Service schema

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast compliance
- Alt text on all images

### Performance
- Lazy loading images
- Code splitting
- Optimized animations
- Minimal re-renders
- Client-side only where needed

## File Structure

```
components/templates/
├── ServicePageTemplate.tsx      # Main service page template
├── LocationPageTemplate.tsx     # Location-specific template
├── index.ts                     # Exports
├── README.md                    # This file
└── SERVICE_PAGE_USAGE.md        # Detailed usage guide
```

## Quick Reference

### Service Page Props (Required)

- `heroTitle` - Main H1 heading
- `heroSubtitle` - Subtitle with key differentiators
- `heroDescription` - Hero description paragraph
- `heroImage` - Background image path
- `heroImageAlt` - Alt text for SEO
- `serviceOverview` - Service overview paragraph
- `benefits` - Array of 3-6 benefit objects
- `processSteps` - Array of 4-8 process steps
- `faqs` - Array of 3-8 FAQ objects
- `serviceName` - Service name for SEO
- `serviceDescription` - Meta description
- `serviceUrl` - Canonical URL
- `breadcrumbs` - Breadcrumb navigation

### Service Page Props (Optional)

- `serviceIcon` - Icon for overview section
- `beforeAfterImages` - Before/after comparisons
- `relatedServices` - Related services grid
- `emergencyMessage` - Custom emergency banner text

## Best Practices

### Content Length
- Hero title: 40-60 characters
- Hero subtitle: 60-80 characters
- Hero description: 120-160 characters
- Service overview: 200-300 words
- Benefit descriptions: 80-120 characters
- Process descriptions: 100-150 characters
- FAQ answers: 150-300 words

### Image Specifications
- Hero images: 1920x1080px WebP, <500KB
- Before/after: 800x600px WebP, <200KB
- Dark enough for white text overlay
- Descriptive, keyword-rich alt text

### SEO Guidelines
- Include location in title (e.g., "Brisbane")
- Use IICRC certification in subtitle
- Mention "60-minute response" prominently
- Include emergency/24/7 messaging
- Use insurance-related keywords
- Include suburb names in content

## Migration from Old Pattern

If migrating from the old `ServicePageLayout`:

```tsx
// OLD
import ServicePageLayout from '@/components/services/ServicePageLayout';

export default function Page() {
  return (
    <ServicePageLayout title="..." description="...">
      {/* Custom content */}
    </ServicePageLayout>
  );
}

// NEW
import { ServicePageTemplate } from '@/components/templates';

export default function Page() {
  return (
    <ServicePageTemplate
      heroTitle="..."
      heroSubtitle="..."
      // ... all other props
    />
  );
}
```

Benefits of new template:
- ✅ Consistent design across all pages
- ✅ Built-in SEO and schema markup
- ✅ Animations and interactions
- ✅ No custom content needed
- ✅ Type-safe with TypeScript
- ✅ Mobile responsive
- ✅ Accessibility compliant

## Support

For questions or issues:
1. Check `SERVICE_PAGE_USAGE.md` for detailed examples
2. Review existing implementations in `app/services/`
3. Consult design system docs at `lib/design-system/`

## Version History

- **v1.0.0** - Initial release with ServicePageTemplate
- Production-ready for all service pages
- Full design system integration
- Complete SEO and accessibility support
