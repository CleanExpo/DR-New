# Disaster Recovery Brisbane - Premium Design System Implementation Guide

## Overview

This premium design system is specifically crafted for Disaster Recovery Brisbane's website, focusing on emergency-first design, trust signals, and conversion optimization for high net worth Brisbane residents and insurance partnerships.

## Quick Start

```tsx
// Import the design system
import {
  EmergencyBar,
  ServiceHero,
  TrustIndicators,
  MobileStickyCTA,
  designTokens,
  theme
} from '@/lib/design-system'

// Use components in your pages
export default function HomePage() {
  return (
    <>
      <EmergencyBar />
      <ServiceHero
        title="Water Damage Restoration Brisbane"
        urgencyLevel="critical"
        localArea="Brisbane CBD"
      />
      <TrustIndicators variant="hero" />
      <MobileStickyCTA />
    </>
  )
}
```

## Core Design Principles

### 1. Emergency-First Design
- **Immediate Visual Hierarchy**: Critical CTAs always visible
- **Response Time Guarantees**: Prominently displayed
- **24/7 Availability**: Consistent messaging across all components

### 2. Trust Building
- **IICRC Certifications**: Displayed prominently
- **Insurance Partnerships**: QBE, IAG, RACQ, Allianz logos
- **Local Testimonials**: From premium Brisbane suburbs
- **$20M Insurance**: Public liability coverage highlighted

### 3. Brisbane Localization
- **Suburb-Specific Content**: Tailored for Ascot, New Farm, Hamilton
- **Local Imagery**: Brisbane floods, storms, property types
- **Response Time Maps**: Visual coverage of service areas

### 4. Mobile Optimization
- **Sticky CTAs**: Always accessible emergency contact
- **Touch Targets**: Minimum 44px for accessibility
- **Performance**: Sub-2 second load times

## Component Usage

### Emergency Bar

```tsx
import { EmergencyBar } from '@/lib/design-system'

// Basic usage
<EmergencyBar />

// Custom alerts
<EmergencyBar
  alerts={[
    {
      id: '1',
      type: 'flood',
      title: 'Brisbane Flood Warning',
      message: 'Emergency crews on standby',
      suburb: 'New Farm',
      urgent: true
    }
  ]}
  phoneNumber="1300 309 361"
  autoRotate={true}
/>
```

### Service Hero

```tsx
import { ServiceHero } from '@/lib/design-system'

<ServiceHero
  title="Water Damage Restoration"
  subtitle="IICRC Certified Emergency Response"
  description="24/7 emergency water extraction and restoration services"
  imagePath="/images/water-damage-brisbane.jpg"
  imageAlt="Water damage restoration in Brisbane home"
  urgencyLevel="critical"
  localArea="Brisbane CBD"
  responseTime="30 mins"
  certifications={['IICRC', 'CARSI']}
  benefits={[
    'Insurance approved processes',
    '1-hour response guarantee',
    'Advanced drying equipment'
  ]}
/>
```

### Trust Indicators

```tsx
import { TrustIndicators } from '@/lib/design-system'

// Hero variant for landing pages
<TrustIndicators
  variant="hero"
  showRatings={true}
  showInsurance={true}
/>

// Compact for headers
<TrustIndicators variant="compact" />

// Detailed for service pages
<TrustIndicators variant="detailed" />
```

### Mobile Sticky CTA

```tsx
import { MobileStickyCTA } from '@/lib/design-system'

<MobileStickyCTA
  phoneNumber="1300 309 361"
  position="bottom"  // or "right" for desktop
  expandable={true}
  showOnScroll={true}
  scrollThreshold={100}
/>
```

### Suburb-Specific Trust

```tsx
import { SuburbTrust, brisbaneSuburbs } from '@/lib/design-system'

// For specific suburb
<SuburbTrust
  suburb={brisbaneSuburbs[0]}  // Ascot data
  variant="hero"
  showMap={true}
/>

// Dynamic based on user location
<SuburbTrust
  suburb={{
    name: userSuburb,
    region: 'Inner North',
    responseTime: '25 mins',
    jobsCompleted: 342,
    avgRating: 4.9,
    topServices: ['Water Damage', 'Mould Removal']
  }}
/>
```

### Before/After Gallery

```tsx
import { BeforeAfterGallery } from '@/lib/design-system'

<BeforeAfterGallery
  images={[
    {
      id: '1',
      before: '/images/before/flood-damage.jpg',
      after: '/images/after/flood-restored.jpg',
      title: 'Brisbane Flood Recovery',
      location: 'New Farm',
      serviceType: 'Water Damage Restoration',
      duration: '5 days'
    }
  ]}
  variant="comparison"  // or "grid", "slider"
  showTestimonials={true}
/>
```

### Voice Search FAQ

```tsx
import { VoiceSearchFAQ } from '@/lib/design-system'

<VoiceSearchFAQ
  showVoiceSearch={true}
  showEmergencyPrompt={true}
  categories={['Emergency', 'Insurance', 'Services']}
/>
```

### Insurance Process

```tsx
import { InsuranceProcess } from '@/lib/design-system'

<InsuranceProcess
  variant="interactive"  // or "timeline", "cards"
  currentStep={2}
  showTips={true}
  showDocuments={true}
/>
```

### Response Time Map

```tsx
import { ResponseTimeMap } from '@/lib/design-system'

<ResponseTimeMap
  currentLocation={{
    suburb: 'Ascot',
    postcode: '4007'
  }}
  showLegend={true}
  showStats={true}
  interactive={true}
/>
```

### Testimonial Carousel

```tsx
import { TestimonialCarousel } from '@/lib/design-system'

<TestimonialCarousel
  variant="featured"  // or "carousel", "grid"
  filterBySuburb="Ascot"
  autoPlay={true}
  showSuburb={true}
/>
```

## Page Templates

### Emergency Landing Page

```tsx
import {
  EmergencyBar,
  ServiceHero,
  TrustIndicators,
  InsuranceProcess,
  BeforeAfterGallery,
  MobileStickyCTA
} from '@/lib/design-system'

export default function EmergencyLanding() {
  return (
    <>
      <EmergencyBar />

      <ServiceHero
        title="Emergency Water Damage Response"
        urgencyLevel="critical"
        localArea="Brisbane"
      />

      <TrustIndicators variant="hero" />

      <InsuranceProcess
        variant="interactive"
        currentStep={1}
      />

      <BeforeAfterGallery
        variant="comparison"
        images={floodRestorationImages}
      />

      <TestimonialCarousel
        variant="featured"
        filterBySuburb="Ascot"
      />

      <MobileStickyCTA position="bottom" />
    </>
  )
}
```

### Service Page Template

```tsx
export default function WaterDamageService() {
  return (
    <>
      <ServiceHero
        title="Water Damage Restoration"
        imagePath="/images/services/water-damage.jpg"
        urgencyLevel="high"
      />

      <section className="py-16">
        <TrustIndicators variant="detailed" />
      </section>

      <section className="py-16 bg-gray-50">
        <InsuranceProcess variant="timeline" />
      </section>

      <section className="py-16">
        <BeforeAfterGallery variant="grid" />
      </section>

      <section className="py-16 bg-blue-50">
        <VoiceSearchFAQ />
      </section>

      <section className="py-16">
        <TeamCredentials variant="grid" />
      </section>

      <MobileStickyCTA />
    </>
  )
}
```

### Location Page Template

```tsx
export default function AscotServiceArea() {
  const ascotData = brisbaneSuburbs.find(s => s.name === 'Ascot')

  return (
    <>
      <ServiceHero
        title="Water Damage Restoration Ascot"
        localArea="Ascot"
        imagePath="/images/suburbs/ascot.jpg"
      />

      <SuburbTrust
        suburb={ascotData}
        variant="hero"
        showMap={true}
      />

      <ResponseTimeMap
        currentLocation={{
          suburb: 'Ascot',
          postcode: '4007'
        }}
      />

      <TestimonialCarousel
        filterBySuburb="Ascot"
        variant="grid"
      />

      <TrustIndicators variant="detailed" />

      <MobileStickyCTA />
    </>
  )
}
```

## Performance Optimization

### 1. Critical CSS
```tsx
// In _app.tsx or layout.tsx
import { CriticalCSS } from '@/lib/design-system/performance'

<Head>
  <CriticalCSS components={['EmergencyBar', 'ServiceHero', 'MobileStickyCTA']} />
</Head>
```

### 2. Lazy Loading
```tsx
import dynamic from 'next/dynamic'

const BeforeAfterGallery = dynamic(
  () => import('@/lib/design-system').then(mod => mod.BeforeAfterGallery),
  {
    loading: () => <GalleryLoader />,
    ssr: false
  }
)
```

### 3. Image Optimization
```tsx
// All images automatically optimized with Next.js Image
import { ServiceHero } from '@/lib/design-system'

<ServiceHero
  imagePath="/images/hero/water-damage.jpg"
  // Automatically generates srcset and sizes
/>
```

## Accessibility Compliance

### WCAG 2.1 AA Standards
- **Color Contrast**: All text meets 4.5:1 ratio
- **Touch Targets**: Minimum 44px for mobile
- **Keyboard Navigation**: Full support
- **Screen Readers**: Proper ARIA labels
- **Focus Indicators**: High contrast focus rings

### Testing Checklist
```bash
# Run accessibility audit
npm run audit:a11y

# Test keyboard navigation
npm run test:keyboard

# Check color contrast
npm run test:contrast
```

## SEO Optimization

### Schema Markup
All components include appropriate schema markup:

```tsx
// Automatically included in components
<VoiceSearchFAQ />  // FAQPage schema
<TestimonialCarousel />  // Review schema
<TeamCredentials />  // Person/Organization schema
```

### Meta Tags
```tsx
import { seo } from '@/lib/design-system'

<Head>
  <title>{seo.defaultMeta.title}</title>
  <meta name="description" content={seo.defaultMeta.description} />
  <meta property="og:image" content={seo.openGraph.image} />
</Head>
```

## Customization

### Theme Override
```tsx
import { theme } from '@/lib/design-system'

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: {
      ...theme.colors.primary,
      500: '#custom-color'
    }
  }
}
```

### Component Extension
```tsx
import { ServiceHero } from '@/lib/design-system'

const CustomServiceHero = (props) => (
  <ServiceHero
    {...props}
    className="custom-class"
    // Add custom props
  />
)
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari 14+
- Chrome Mobile 90+

## Performance Targets

- **First Contentful Paint**: < 1.2s
- **Time to Interactive**: < 2.0s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Lighthouse Score**: 95+

## Support & Documentation

For questions or issues with the design system:
- Review this implementation guide
- Check component PropTypes in source files
- Test in Storybook (if available)
- Contact development team

## Version History

- **v1.0.0** (2025-01-17): Initial release with all core components
  - Emergency-first design patterns
  - Brisbane localization
  - Full accessibility compliance
  - Mobile optimization
  - Insurance process flows

---

© 2025 Disaster Recovery Brisbane. All rights reserved.