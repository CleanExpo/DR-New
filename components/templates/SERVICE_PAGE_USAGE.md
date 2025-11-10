# Service Page Template - Usage Guide

## Overview

The `ServicePageTemplate` component provides a complete, pre-designed service page following Disaster Recovery Brisbane's design system with:

- Dramatic hero sections with emergency CTAs
- Service overview with icon badges
- Benefits grid with icons
- Process steps visualization
- Optional before/after gallery
- FAQ section with schema markup
- Related services
- Emergency CTA section
- Floating CTA
- Full SEO and schema.org support

## Import

```tsx
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';
import { Icon1, Icon2, Icon3 } from 'lucide-react';
```

## Basic Usage

```tsx
'use client';

import { Droplets, Shield, Clock, Award, Phone, Wind } from 'lucide-react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';

export default function WaterDamageRestorationPage() {
  return (
    <ServicePageTemplate
      // Hero Section
      heroTitle="Water Damage Restoration Brisbane"
      heroSubtitle="60-Minute Response • IICRC Master Restorer • Insurance Approved"
      heroDescription="Phill McGurk - Master Restorer and team provide rapid water extraction, structural drying, and mould prevention across Brisbane, Ipswich, and Logan. Available 24/7/365."
      heroImage="/images/hero/water-damage-hero.webp"
      heroImageAlt="Emergency water damage restoration by IICRC Master Restorer"

      // Service Overview
      serviceIcon={Droplets}
      serviceOverview="Complete water damage restoration from emergency extraction through final restoration. IICRC certified processes for all water categories..."

      // Key Benefits (3-6 items recommended)
      benefits={[
        {
          icon: Droplets,
          title: "Emergency Water Extraction",
          description: "Industrial truck-mounted extractors remove standing water within minutes. Prevents secondary damage and mould growth."
        },
        {
          icon: Clock,
          title: "60-Minute Response",
          description: "Rapid response to Brisbane CBD and inner suburbs. Every minute counts when water damage occurs."
        },
        {
          icon: Shield,
          title: "Insurance Approved",
          description: "Work directly with all major insurers. Direct billing available - no upfront costs for insurance work."
        },
        // Add 3-6 benefits total
      ]}

      // Process Steps (4-8 steps recommended)
      processSteps={[
        {
          step: "1",
          title: "Emergency Call",
          description: "Call 1300 309 361 for immediate dispatch...",
          icon: Phone
        },
        {
          step: "2",
          title: "Water Extraction",
          description: "Industrial pumps remove standing water...",
          icon: Droplets
        },
        // Add 4-8 steps total
      ]}

      // FAQs (3-8 questions recommended)
      faqs={[
        {
          question: "How quickly can you respond to water damage?",
          answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs..."
        },
        // Add 3-8 FAQs
      ]}

      // SEO & Schema
      serviceName="Water Damage Restoration Brisbane"
      serviceDescription="24/7 emergency water damage restoration. IICRC Master Restorer certified. 60-minute response. Insurance approved."
      serviceUrl="https://disasterrecovery.com.au/services/water-damage-restoration"
      breadcrumbs={[
        { name: "Home", url: "https://disasterrecovery.com.au" },
        { name: "Services", url: "https://disasterrecovery.com.au/services" },
        { name: "Water Damage Restoration", url: "https://disasterrecovery.com.au/services/water-damage-restoration" }
      ]}

      // Optional: Related Services
      relatedServices={[
        {
          title: "Mould Remediation",
          href: "/services/mould-remediation",
          description: "Professional mould removal and prevention"
        },
        {
          title: "Flood Recovery",
          href: "/services/flood-damage-restoration",
          description: "Complete flood cleanup and restoration"
        },
        {
          title: "Storm Damage",
          href: "/services/storm-damage-restoration",
          description: "Emergency storm damage repairs"
        }
      ]}

      // Optional: Before/After Images
      beforeAfterImages={[
        {
          before: "/images/before/water-damage-1.webp",
          after: "/images/after/water-damage-1-restored.webp",
          description: "Living room water damage from burst pipe - fully restored"
        }
      ]}

      // Optional: Custom Emergency Message
      emergencyMessage="24/7 Water Damage Emergency - 60-Min Response Brisbane"
    />
  );
}
```

## Props Reference

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `heroTitle` | string | Main H1 heading (e.g., "Fire Damage Restoration Brisbane") |
| `heroSubtitle` | string | Subtitle under title (e.g., "60-Minute Response • IICRC Certified") |
| `heroDescription` | string | Hero description paragraph |
| `heroImage` | string | Hero background image path |
| `heroImageAlt` | string | Alt text for hero image (SEO critical) |
| `serviceOverview` | string | Service overview paragraph |
| `benefits` | Benefit[] | Array of benefit objects (3-6 recommended) |
| `processSteps` | ProcessStep[] | Array of process steps (4-8 recommended) |
| `faqs` | FAQ[] | Array of FAQ objects (3-8 recommended) |
| `serviceName` | string | Service name for SEO |
| `serviceDescription` | string | Meta description for SEO |
| `serviceUrl` | string | Canonical URL |
| `breadcrumbs` | Breadcrumb[] | Breadcrumb navigation for schema |

### Optional Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `serviceIcon` | LucideIcon | undefined | Icon for service overview section |
| `beforeAfterImages` | BeforeAfter[] | undefined | Before/after comparison images |
| `relatedServices` | RelatedService[] | undefined | Related services to show |
| `emergencyMessage` | string | "24/7 Emergency..." | Custom emergency banner message |

## Type Definitions

```typescript
import { LucideIcon } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProcessStep {
  step: string;        // e.g., "1", "2", "3"
  title: string;
  description: string;
  icon: LucideIcon;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Breadcrumb {
  name: string;
  url: string;
}

interface BeforeAfter {
  before: string;      // Image path
  after: string;       // Image path
  description: string;
}

interface RelatedService {
  title: string;
  href: string;
  description: string;
}
```

## Icon Recommendations (Lucide React)

Common icons for disaster recovery services:

```tsx
import {
  // Water Damage
  Droplets, Waves, Wind, Thermometer,

  // Fire Damage
  Flame, Wind, Home,

  // General
  Phone, Clock, Shield, Award, CheckCircle,
  AlertTriangle, ArrowRight, MapPin, Zap,

  // Process Icons
  Phone, Search, Wrench, CheckCircle, FileText,
  Camera, Hammer, Award
} from 'lucide-react';
```

## Best Practices

### Content Guidelines

1. **Hero Title**: Include service + location (e.g., "Fire Damage Restoration Brisbane")
2. **Hero Subtitle**: Include key differentiators (60-Min Response, IICRC, Insurance)
3. **Service Overview**: 2-3 sentences explaining the service comprehensively
4. **Benefits**: 3-6 benefits focusing on WHY CHOOSE US
5. **Process Steps**: 4-8 clear, actionable steps in chronological order
6. **FAQs**: Answer real customer questions with Brisbane-specific details

### SEO Guidelines

1. **Service Name**: Match the page's primary keyword
2. **Service Description**: 150-160 characters, include primary keyword
3. **Hero Image Alt**: Descriptive, keyword-rich (but natural)
4. **Breadcrumbs**: Always include Home → Services → Current Page

### Image Guidelines

1. **Hero Image**:
   - Format: WebP
   - Dimensions: 1920x1080px minimum
   - File size: <500KB
   - Dark enough for white text overlay

2. **Before/After Images**:
   - Format: WebP
   - Dimensions: 800x600px
   - File size: <200KB each

## Example: Fire Damage Restoration

```tsx
'use client';

import { Flame, Shield, Clock, Award, Phone, Wind, Home, Droplets, Thermometer } from 'lucide-react';
import { ServicePageTemplate } from '@/components/templates/ServicePageTemplate';

export default function FireDamageRestorationPage() {
  return (
    <ServicePageTemplate
      heroTitle="Fire Damage Restoration Brisbane"
      heroSubtitle="60-Minute Response • IICRC Master Restorer • Insurance Approved"
      heroDescription="Phill McGurk - Master Restorer and team provide rapid fire damage restoration, smoke odour removal, and soot cleanup across Brisbane, Ipswich, and Logan. Available 24/7/365."
      heroImage="/images/optimized/damage/3d-image-of-a-house-fire.webp"
      heroImageAlt="Emergency fire damage restoration Brisbane by IICRC Master Restorer"

      serviceIcon={Flame}
      serviceOverview="Fire damage extends far beyond visible flames. Smoke permeates walls, ceilings, and contents. Soot contamination spreads throughout the property. Our IICRC Master Restorer certified team provides comprehensive fire damage restoration - emergency board-up, smoke odour elimination, soot removal, structural cleaning, and complete reconstruction."

      benefits={[
        {
          icon: Flame,
          title: "Complete Fire Restoration",
          description: "From emergency response through final reconstruction - structural cleaning, smoke odour removal, soot cleanup, content restoration."
        },
        {
          icon: Clock,
          title: "60-Minute Emergency Response",
          description: "Rapid response prevents secondary damage from smoke and soot. Emergency board-up and tarping secures your property immediately."
        },
        {
          icon: Shield,
          title: "Insurance Direct Billing",
          description: "Approved by all major insurers. We manage your entire claim process - documentation, assessor meetings, direct billing."
        },
        {
          icon: Wind,
          title: "Smoke Odour Elimination",
          description: "Advanced hydroxyl generators and ozone treatment completely eliminate smoke odours. HEPA air scrubbers ensure air quality."
        },
        {
          icon: Award,
          title: "IICRC Master Restorer",
          description: "Phill McGurk holds Master Restorer certification - the highest credential in fire damage restoration."
        },
        {
          icon: Home,
          title: "Brisbane Fire Specialists",
          description: "Expert knowledge of Brisbane building codes, Queenslander homes, and local insurance requirements."
        }
      ]}

      processSteps={[
        {
          step: "1",
          title: "Emergency Call",
          description: "Call 1300 309 361 for immediate dispatch. We arrive within 60 minutes with emergency equipment.",
          icon: Phone
        },
        {
          step: "2",
          title: "Board-Up & Secure",
          description: "Emergency board-up of windows, doors, roof damage. Tarping prevents weather damage.",
          icon: Shield
        },
        {
          step: "3",
          title: "Damage Assessment",
          description: "Complete fire, smoke, and soot damage assessment using thermal imaging.",
          icon: Thermometer
        },
        {
          step: "4",
          title: "Soot & Smoke Removal",
          description: "Specialized cleaning removes soot from all surfaces. HEPA air scrubbers eliminate airborne particles.",
          icon: Wind
        },
        {
          step: "5",
          title: "Water Extraction",
          description: "Fire suppression water removal. Industrial extraction and structural drying.",
          icon: Droplets
        },
        {
          step: "6",
          title: "Odour Elimination",
          description: "Hydroxyl generators and ozone treatment eliminate smoke odours at molecular level.",
          icon: Wind
        },
        {
          step: "7",
          title: "Content Restoration",
          description: "Specialized cleaning and restoration of salvageable contents and electronics.",
          icon: Home
        },
        {
          step: "8",
          title: "Reconstruction",
          description: "Complete rebuild to pre-loss condition. Licensed builders. All work guaranteed.",
          icon: Award
        }
      ]}

      faqs={[
        {
          question: "How quickly can you respond to fire damage in Brisbane?",
          answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, Toowong, and Paddington. 90-minute response to greater Brisbane, Ipswich, and Logan. Our Master Restorer team is available 24/7/365."
        },
        {
          question: "What does fire damage restoration include?",
          answer: "Complete restoration from emergency through reconstruction - emergency board-up, smoke damage assessment, soot removal, smoke odour elimination, water extraction, structural cleaning, content restoration, HVAC cleaning, complete rebuilding, and final Master Restorer inspection."
        },
        {
          question: "Will insurance cover fire damage restoration?",
          answer: "Most insurance policies cover fire damage restoration. We work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, NRMA, AAMI, and Budget Direct. We handle complete claim documentation and direct billing is available."
        }
      ]}

      serviceName="Fire Damage Restoration Brisbane"
      serviceDescription="24/7 emergency fire damage restoration. IICRC Master Restorer certified. House fires, smoke damage, soot removal. 60-minute response. Insurance approved."
      serviceUrl="https://disasterrecovery.com.au/services/fire-damage-restoration"
      breadcrumbs={[
        { name: "Home", url: "https://disasterrecovery.com.au" },
        { name: "Services", url: "https://disasterrecovery.com.au/services" },
        { name: "Fire Damage Restoration", url: "https://disasterrecovery.com.au/services/fire-damage-restoration" }
      ]}

      relatedServices={[
        {
          title: "Smoke Odour Removal",
          href: "/services/fire-damage/smoke-odour-removal",
          description: "Advanced hydroxyl and ozone treatment for permanent smoke smell elimination."
        },
        {
          title: "Soot Damage Cleanup",
          href: "/services/fire-damage/soot-damage-cleanup",
          description: "Specialized cleaning removes acidic soot before it causes permanent staining."
        },
        {
          title: "Water Damage Restoration",
          href: "/services/water-damage-restoration",
          description: "Fire suppression water damage extraction and structural drying."
        }
      ]}

      emergencyMessage="24/7 Fire Damage Emergency - 60-Min Response Brisbane"
    />
  );
}
```

## Customization

The template automatically handles:
- ✅ Dark hero with gradient overlay
- ✅ Emergency pulsing badge
- ✅ Animated sections with scroll triggers
- ✅ Schema.org markup (Service, HowTo, FAQPage, Breadcrumbs)
- ✅ Emergency banner (sticky)
- ✅ Floating CTA button
- ✅ Mobile responsive design
- ✅ Accessibility (ARIA labels, semantic HTML)

## Questions?

See existing implementations:
- `app/services/water-damage-restoration/page.tsx`
- `app/services/fire-damage-restoration/page.tsx`
- `app/services/mould-remediation/page.tsx`
- `app/services/storm-damage-restoration/page.tsx`
