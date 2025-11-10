# Service Page Migration Guide

## Overview

This guide shows how to migrate existing service pages to use the new **ServicePageTemplate** for consistency, better SEO, and modern design.

## Why Migrate?

### Current Issues
- ❌ Inconsistent designs across pages
- ❌ Duplicate code for similar functionality
- ❌ Manual schema markup (prone to errors)
- ❌ Hard to maintain animations
- ❌ No standardized structure

### After Migration
- ✅ Consistent design across all pages
- ✅ Single source of truth (template)
- ✅ Automatic schema markup
- ✅ Built-in animations
- ✅ Type-safe props

## Migration Process

### Step 1: Identify Page Content

Extract the following from your current page:
1. Hero title, subtitle, description
2. Hero background image
3. Service overview paragraph
4. Benefits/features list
5. Process steps
6. FAQs
7. Related services

### Step 2: Map to Template Props

#### Example: Current Water Damage Page

**Current Code (Simplified):**
```tsx
export default function WaterDamagePage() {
  return (
    <div>
      <HeroSection title="Water Damage Restoration" />
      <Overview text="We provide..." />
      <Features items={[...]} />
      <Process steps={[...]} />
      <FAQ faqs={[...]} />
      <RelatedServices services={[...]} />
    </div>
  );
}
```

**New Code (Template):**
```tsx
'use client';

import { Droplets, Clock, Shield, Award, Phone, Wind } from 'lucide-react';
import { ServicePageTemplate } from '@/components/templates';

export default function WaterDamagePage() {
  return (
    <ServicePageTemplate
      // Hero Section
      heroTitle="Water Damage Restoration Brisbane"
      heroSubtitle="60-Minute Response • IICRC Master Restorer • Insurance Approved"
      heroDescription="Phill McGurk - Master Restorer and team provide rapid water extraction, structural drying, and mould prevention across Brisbane, Ipswich, and Logan. Available 24/7/365."
      heroImage="/images/optimized/damage/3d-water-damage.webp"
      heroImageAlt="Emergency water damage restoration Brisbane by IICRC Master Restorer"

      // Service Overview
      serviceIcon={Droplets}
      serviceOverview="Complete water damage restoration from emergency extraction through final restoration. IICRC certified processes for all water categories. Truck-mounted extraction, industrial dehumidification, thermal imaging, and structural drying. Direct insurance billing with all major insurers including Suncorp, RACQ, and Allianz."

      // Benefits (3-6 items)
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
        {
          icon: Wind,
          title: "Structural Drying",
          description: "Industrial air movers and LGR dehumidifiers. Daily moisture monitoring ensures complete drying."
        },
        {
          icon: Award,
          title: "IICRC Master Restorer",
          description: "Phill McGurk holds Master Restorer certification - the highest credential in water damage restoration."
        }
      ]}

      // Process Steps (4-8 steps)
      processSteps={[
        {
          step: "1",
          title: "Emergency Call",
          description: "Call 1300 309 361 for immediate dispatch. We arrive within 60 minutes with industrial equipment.",
          icon: Phone
        },
        {
          step: "2",
          title: "Water Extraction",
          description: "Truck-mounted pumps and portable extractors remove standing water immediately.",
          icon: Droplets
        },
        {
          step: "3",
          title: "Moisture Detection",
          description: "Thermal imaging and moisture meters map all affected areas including hidden moisture.",
          icon: Wind
        },
        {
          step: "4",
          title: "Structural Drying",
          description: "Industrial dehumidifiers and air movers create optimal drying conditions. Daily monitoring.",
          icon: Wind
        },
        {
          step: "5",
          title: "Sanitization",
          description: "Antimicrobial treatment prevents mould and bacteria growth. HEPA filtration for air quality.",
          icon: Shield
        },
        {
          step: "6",
          title: "Final Inspection",
          description: "Master Restorer verification. All areas returned to pre-loss moisture levels.",
          icon: Award
        }
      ]}

      // FAQs (3-8 questions)
      faqs={[
        {
          question: "How quickly can you respond to water damage emergencies in Brisbane?",
          answer: "We provide 60-minute emergency response to Brisbane CBD and inner suburbs including Hamilton, Ascot, New Farm, and Toowong. Our IICRC Master Restorer team is available 24/7/365 with industrial water extraction equipment ready to deploy immediately."
        },
        {
          question: "What types of water damage do you restore?",
          answer: "We restore all types of water damage including burst pipes, flooding, storm damage, roof leaks, appliance failures, sewage backups, and more. Our certified team handles clean water, grey water, and black water contamination using IICRC-approved methods."
        },
        {
          question: "Will insurance cover water damage restoration costs?",
          answer: "Most insurance policies cover sudden and accidental water damage. We work directly with all major insurers including Suncorp, RACQ, Allianz, QBE, and NRMA. We handle direct billing and manage your entire claim process - no upfront costs for approved insurance work."
        }
      ]}

      // SEO & Schema
      serviceName="Water Damage Restoration Brisbane"
      serviceDescription="24/7 emergency water damage restoration in Brisbane. IICRC Master Restorer certified. Burst pipes, flooding, storm damage. 60-minute response. Insurance approved."
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
          description: "Professional mould removal and prevention from water-damaged properties."
        },
        {
          title: "Flood Damage Restoration",
          href: "/services/flood-damage-restoration",
          description: "Complete flood cleanup, extraction, and restoration across Brisbane."
        },
        {
          title: "Storm Damage Repair",
          href: "/services/storm-damage-restoration",
          description: "Emergency storm damage repairs including roof leaks and water intrusion."
        }
      ]}
    />
  );
}
```

### Step 3: Choose Icons

Use Lucide React icons that match your service:

```tsx
// Water Damage
import { Droplets, Waves, Wind, Thermometer } from 'lucide-react';

// Fire Damage
import { Flame, Wind, Home } from 'lucide-react';

// Mould
import { Droplets, Wind, Shield, AlertTriangle } from 'lucide-react';

// Storm Damage
import { Cloud, Wind, Zap } from 'lucide-react';

// General/Process Icons
import { Phone, Clock, Shield, Award, CheckCircle, Search, Wrench, FileText, Camera, Hammer } from 'lucide-react';
```

### Step 4: Metadata (Separate File)

Since the template is a client component, create metadata in a separate file:

**`app/services/water-damage-restoration/metadata.ts`:**
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Brisbane | 60-Min Response | IICRC Master Restorer',
  description: '24/7 emergency water damage restoration in Brisbane. IICRC Master Restorer certified. Burst pipes, flooding, storm damage. 60-minute response. Insurance approved. Call 1300 309 361',
  keywords: 'water damage restoration brisbane, emergency water extraction brisbane, flood damage repair brisbane, burst pipe repair brisbane, structural drying brisbane, IICRC water damage brisbane',
  openGraph: {
    title: 'Water Damage Restoration Brisbane | IICRC Master Restorer',
    description: '60-minute emergency response. Master Restorer certified. Insurance approved. Call 1300 309 361',
    images: ['/images/optimized/damage/3d-water-damage.webp'],
    type: 'website'
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage-restoration'
  }
};
```

**Import in page:**
```tsx
export { metadata } from './metadata';
```

## Service-Specific Examples

### Fire Damage Restoration

```tsx
import { Flame, Shield, Clock, Award, Phone, Wind, Home, Droplets, Thermometer } from 'lucide-react';

export default function FireDamagePage() {
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
    />
  );
}
```

## Migration Checklist

For each service page:

- [ ] Extract content from existing page
- [ ] Choose appropriate icons (3-6 for benefits, 4-8 for process)
- [ ] Map content to template props
- [ ] Add related services (3-4 recommended)
- [ ] Write Brisbane-specific FAQs (3-8 questions)
- [ ] Set up metadata in separate file
- [ ] Add hero image (WebP, 1920x1080, <500KB)
- [ ] Test on mobile and desktop
- [ ] Verify schema markup in Google Rich Results Test
- [ ] Check accessibility with screen reader
- [ ] Deploy and test live

## Pages to Migrate

### Priority 1 (Main Services)
- [ ] Water Damage Restoration
- [ ] Fire Damage Restoration
- [ ] Mould Remediation
- [ ] Storm Damage Restoration

### Priority 2 (Sub-Services)
- [ ] Flood Damage Restoration
- [ ] Sewage Cleanup
- [ ] Biohazard Cleaning
- [ ] Trauma Cleanup

### Priority 3 (Specialized Services)
- [ ] All sub-service pages under water-damage/
- [ ] All sub-service pages under fire-damage/
- [ ] All sub-service pages under mould-remediation/
- [ ] All sub-service pages under storm-damage/

## Testing After Migration

1. **Visual Testing**
   - Check hero image displays correctly
   - Verify all icons render
   - Test responsive design on mobile
   - Check animations work smoothly

2. **SEO Testing**
   - Validate schema markup: https://validator.schema.org/
   - Check Rich Results: https://search.google.com/test/rich-results
   - Verify breadcrumbs display
   - Check meta tags

3. **Accessibility Testing**
   - Test with screen reader (NVDA/JAWS)
   - Check keyboard navigation
   - Verify color contrast
   - Test focus indicators

4. **Performance Testing**
   - Run Lighthouse audit (aim for 90+)
   - Check LCP < 2.5s
   - Verify CLS < 0.1
   - Test load time on 3G

## Support

Need help migrating? Check:
1. `SERVICE_PAGE_USAGE.md` - Complete API documentation
2. `components/templates/README.md` - Quick reference
3. Existing implementations in `app/services/`

---

**Migration Time:** ~15-30 minutes per page
**Difficulty:** Easy (just map content to props)
**Benefits:** Huge (consistency, SEO, maintenance)
