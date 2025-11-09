# Component Library Documentation

## Overview

Production-ready, reusable components for Disaster Recovery Brisbane website. All components follow:

- **Performance**: Lazy-loaded motion components
- **Accessibility**: WCAG 2.1 AA compliance
- **Responsiveness**: Mobile-first design
- **SEO**: Semantic HTML with proper headings
- **TypeScript**: Full type safety

## Service Page Components

Located in: `components/services/`

### ServiceHero

Hero section for service pages with emergency badge, trust indicators, and CTAs.

**Props:**
```tsx
interface ServiceHeroProps {
  title: string;                    // Main heading
  subtitle: string;                 // Subheading/description
  backgroundImage: string;          // Hero background image path
  backgroundImageAlt: string;       // Alt text for accessibility
  emergencyBadge?: string;          // Optional emergency text
  trustIndicators?: Array<{         // Trust badges
    icon: 'award' | 'shield' | 'alert';
    label: string;
  }>;
  children?: ReactNode;             // CTA buttons
  gradientColor?: 'blue' | 'red' | 'green' | 'gray';
}
```

**Example:**
```tsx
import { ServiceHero } from '@/components/services';
import { FluidCTA, FluidCTAGroup } from '@/components/fluid-cta';

<ServiceHero
  title="Water Damage Restoration Brisbane"
  subtitle="24/7 Emergency Response • IICRC Master Restorer"
  backgroundImage="/images/water-damage-hero.webp"
  backgroundImageAlt="Professional water damage restoration"
  emergencyBadge="Emergency? Call Now - 60 Min Response"
  trustIndicators={[
    { icon: 'award', label: 'IICRC Master Certified' },
    { icon: 'shield', label: 'Insurance Approved' }
  ]}
  gradientColor="blue"
>
  <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
    <FluidCTA
      text="Call 1300 309 361"
      href="tel:1300309361"
      variant="emergency"
      size="xl"
      icon="phone"
      magnetic
      ripple
      pulse
    />
  </FluidCTAGroup>
</ServiceHero>
```

---

### ServiceFeatures

Features grid or list with icons and descriptions.

**Props:**
```tsx
interface ServiceFeaturesProps {
  title: string;
  description?: string;
  features: Array<{
    icon: LucideIcon;
    title: string;
    description: string;
    color?: 'blue' | 'red' | 'green' | 'yellow';
  }>;
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}
```

**Example:**
```tsx
import { ServiceFeatures } from '@/components/services';
import { Clock, Shield, Award } from 'lucide-react';

<ServiceFeatures
  title="Why Choose Our Water Damage Services"
  description="Professional restoration with certified expertise"
  features={[
    {
      icon: Clock,
      title: '24/7 Emergency Response',
      description: 'Available around the clock for immediate assistance',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Insurance Approved',
      description: 'Direct billing with all major insurers',
      color: 'blue'
    },
    {
      icon: Award,
      title: 'Master Restorer Certified',
      description: 'Highest professional credentials in Brisbane',
      color: 'yellow'
    }
  ]}
  columns={3}
/>
```

---

### ProcessSteps

Step-by-step process visualization with numbered steps.

**Props:**
```tsx
interface ProcessStepsProps {
  title: string;
  description?: string;
  steps: Array<{
    step: number;
    title: string;
    description: string;
    icon: LucideIcon;
    details?: string[];
  }>;
  orientation?: 'vertical' | 'horizontal';
}
```

**Example:**
```tsx
import { ProcessSteps } from '@/components/services';
import { Phone, Search, Droplets, Wind, Sparkles, Home } from 'lucide-react';

<ProcessSteps
  title="Our IICRC Water Damage Restoration Process"
  description="Professional 6-step restoration following industry standards"
  steps={[
    {
      step: 1,
      title: 'Emergency Contact',
      description: '24/7 hotline connects you with certified specialists',
      icon: Phone,
      details: [
        'Average response: 47 minutes',
        'Dispatch within minutes of call'
      ]
    },
    {
      step: 2,
      title: 'Inspection & Assessment',
      description: 'Thermal imaging and moisture detection',
      icon: Search,
      details: [
        'Moisture mapping',
        'Damage category determination'
      ]
    },
    {
      step: 3,
      title: 'Water Extraction',
      description: 'Truck-mounted extraction units remove standing water',
      icon: Droplets
    },
    {
      step: 4,
      title: 'Drying & Dehumidification',
      description: 'Industrial equipment creates optimal drying conditions',
      icon: Wind
    },
    {
      step: 5,
      title: 'Cleaning & Sanitization',
      description: 'Antimicrobial treatment prevents mould growth',
      icon: Sparkles
    },
    {
      step: 6,
      title: 'Restoration',
      description: 'Return property to pre-loss condition',
      icon: Home
    }
  ]}
/>
```

---

### BeforeAfter

Before/after image gallery with hover effects.

**Props:**
```tsx
interface BeforeAfterProps {
  title: string;
  description?: string;
  images: Array<{
    before: string;
    after: string;
    beforeAlt: string;
    afterAlt: string;
    caption: string;
    details?: string[];
  }>;
  columns?: 2 | 3;
}
```

**Example:**
```tsx
import { BeforeAfter } from '@/components/services';

<BeforeAfter
  title="Recent Restoration Projects - Brisbane"
  description="See the quality of our IICRC certified work"
  images={[
    {
      before: '/images/before-water-damage.webp',
      after: '/images/after-water-damage.webp',
      beforeAlt: 'Flooded basement before restoration',
      afterAlt: 'Restored basement after professional drying',
      caption: 'Hamilton Basement Flood Recovery',
      details: [
        '3 days structural drying',
        'Full antimicrobial treatment',
        'IICRC certified completion'
      ]
    }
  ]}
  columns={2}
/>
```

---

### ServiceFAQ

Accessible accordion-style FAQ component.

**Props:**
```tsx
interface ServiceFAQProps {
  title: string;
  description?: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  defaultOpen?: number[];
}
```

**Example:**
```tsx
import { ServiceFAQ } from '@/components/services';

<ServiceFAQ
  title="Frequently Asked Questions"
  description="Common questions about water damage restoration"
  faqs={[
    {
      question: "How quickly can you respond to emergencies?",
      answer: "We respond within 60 minutes for emergency calls in Brisbane metro areas. Our team is available 24/7/365."
    },
    {
      question: "Will insurance cover water damage restoration?",
      answer: "Most homeowner's insurance policies cover sudden and accidental water damage. We work directly with all major insurance companies and provide detailed documentation to support your claim."
    },
    {
      question: "How long does water damage restoration take?",
      answer: "Initial extraction takes 1-2 days, structural drying requires 3-5 days, and full restoration including repairs can take 1-3 weeks depending on severity."
    }
  ]}
  defaultOpen={[0]}
/>
```

---

### ServiceCTA

Call-to-action section with emergency styling and stats.

**Props:**
```tsx
interface ServiceCTAProps {
  title: string;
  description: string;
  phone?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  variant?: 'red' | 'blue' | 'green' | 'gray';
  stats?: Array<{
    label: string;
    value: string;
  }>;
  children?: ReactNode;
}
```

**Example:**
```tsx
import { ServiceCTA } from '@/components/services';

<ServiceCTA
  title="Emergency Water Damage? Call Master Restorer Now"
  description="Available 24/7 for immediate assistance across Brisbane, Ipswich, and Logan"
  phone="1300 309 361"
  variant="red"
  stats={[
    { label: 'Response Time', value: '<60 Min' },
    { label: 'Availability', value: '24/7/365' },
    { label: 'Master Certified', value: 'IICRC' }
  ]}
/>
```

---

## Location Page Components

Located in: `components/location/`

### LocationHero

Hero section optimized for location-specific pages.

**Props:**
```tsx
interface LocationHeroProps {
  location: string;
  title?: string;
  subtitle: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  emergencyBadge?: string;
  stats?: Array<{
    icon: 'clock' | 'award' | 'shield' | 'star';
    label: string;
    value: string;
  }>;
  children?: ReactNode;
}
```

**Example:**
```tsx
import { LocationHero } from '@/components/location';
import { FluidCTAGroup, FluidCTA } from '@/components/fluid-cta';

<LocationHero
  location="Hamilton"
  subtitle="60-Minute Response • IICRC Master Restorer • Luxury Property Specialists"
  backgroundImage="/images/suburbs/hamilton-hero.webp"
  backgroundImageAlt="Hamilton Brisbane luxury riverside properties disaster restoration"
  emergencyBadge="Serving Hamilton's Prestige Riverside Properties"
  stats={[
    { icon: 'clock', label: 'Response Time', value: '<60 Min' },
    { icon: 'award', label: 'Master Restorer', value: 'IICRC Certified' },
    { icon: 'shield', label: 'Insurance', value: 'All Major Insurers' },
    { icon: 'star', label: 'Service', value: 'Premium Properties' }
  ]}
>
  <FluidCTAGroup layout="horizontal" spacing="lg" align="center">
    <FluidCTA
      text="Call 1300 309 361 Now"
      href="tel:1300309361"
      variant="emergency"
      size="xl"
      icon="phone"
      magnetic
      ripple
      pulse
    />
    <FluidCTA
      text="Get Emergency Help"
      href="/claim"
      variant="secondary"
      size="xl"
      icon="arrow"
      magnetic
      ripple
    />
  </FluidCTAGroup>
</LocationHero>
```

---

### ServiceAreas

Service area map/list with color-coded regions.

**Props:**
```tsx
interface ServiceAreasProps {
  title: string;
  description?: string;
  areas: Array<{
    name: string;
    color: string;
    prioritySuburbs: string;
    allAreas: string;
  }>;
}
```

**Example:**
```tsx
import { ServiceAreas } from '@/components/location';

<ServiceAreas
  title="Mould Remediation Service Areas - Brisbane, Ipswich, Logan"
  description="Professional mould removal across all metro areas"
  areas={[
    {
      name: 'Brisbane',
      color: '#0ea5e9',
      prioritySuburbs: 'Hamilton • Ascot • New Farm • Toowong • Paddington',
      allAreas: 'Brisbane CBD, West End, Fortitude Valley, Milton, South Bank, Kangaroo Point, Chermside, Carindale, Mt Gravatt, Indooroopilly'
    },
    {
      name: 'Ipswich',
      color: '#9333ea',
      prioritySuburbs: 'Karalee • Brookwater • Springfield Lakes',
      allAreas: 'Ipswich CBD, Springfield Central, Redbank Plains, Yamanto, Goodna, Booval, Bundamba, Leichhardt'
    },
    {
      name: 'Logan',
      color: '#ea580c',
      prioritySuburbs: 'Logan Central • Industrial Areas',
      allAreas: 'Springwood, Shailer Park, Browns Plains, Woodridge, Loganholme, Beenleigh, Eagleby'
    }
  ]}
/>
```

---

## Design Tokens

All components use the centralized design system:

```tsx
import {
  colors,
  typography,
  spacing,
  fadeInUp,
  staggerContainer,
  emergencyPulse
} from '@/lib/design-system';
```

## Motion Components

All motion components are lazy-loaded for performance:

```tsx
import {
  MotionDiv,
  MotionH1,
  MotionP,
  MotionSection
} from '@/lib/motion/components';
```

## Accessibility

All components follow WCAG 2.1 AA:

- Semantic HTML (h1-h6, nav, main, section, article)
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast ratios
- Screen reader friendly

## Performance

- Lazy-loaded Framer Motion (code-split)
- Optimized Next.js Image component
- Mobile-first responsive design
- Minimal layout shift (CLS optimization)

## Usage Pattern

Typical service page structure:

```tsx
import {
  ServiceHero,
  ServiceFeatures,
  ProcessSteps,
  BeforeAfter,
  ServiceFAQ,
  ServiceCTA
} from '@/components/services';

export default function WaterDamagePage() {
  return (
    <>
      <ServiceHero ... />
      <ServiceFeatures ... />
      <ProcessSteps ... />
      <BeforeAfter ... />
      <ServiceFAQ ... />
      <ServiceCTA ... />
    </>
  );
}
```

Typical location page structure:

```tsx
import { LocationHero, ServiceAreas } from '@/components/location';
import { ServiceFeatures, ServiceCTA } from '@/components/services';

export default function HamiltonPage() {
  return (
    <>
      <LocationHero ... />
      <ServiceFeatures ... />
      <ServiceAreas ... />
      <ServiceCTA ... />
    </>
  );
}
```

## Testing

All components include:

- TypeScript type safety
- Proper prop validation
- Accessibility testing ready
- Mobile responsive

## Future Enhancements

Planned additions:

- Storybook stories for all components
- Unit tests with Jest/React Testing Library
- Visual regression tests
- Component playground
