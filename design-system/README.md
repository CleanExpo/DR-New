# DR-New Design System

A comprehensive design system for disaster recovery services, ensuring brand consistency, accessibility, and emergency response capability across all digital touchpoints.

## Quick Start

### Installation

The design system is already integrated into the DR-New project. To use it in your components:

```tsx
import { colors, spacing, buttonClass, cardClass } from '@/design-system';
```

### Basic Usage

```tsx
// Using design tokens
const styles = {
  backgroundColor: colors.primary[600],
  padding: spacing[4],
};

// Using utility classes
<button className={buttonClass('emergency', 'lg')}>
  Emergency Call
</button>

// Using component patterns
<div className={cardClass('service')}>
  Service content
</div>
```

## Design System Structure

```
design-system/
├── design-tokens.ts         # Core design values (colors, typography, spacing)
├── component-patterns.tsx   # Reusable component patterns
├── usage-guidelines.md      # Comprehensive usage documentation
├── implementation-example.tsx # Real-world implementation examples
├── index.ts                 # Main export file with utilities
└── README.md               # This file
```

## Core Design Principles

### 1. Emergency-First Design
- Clear visual hierarchy for urgent information
- One-click emergency contact from any page
- High contrast for critical CTAs

### 2. Trust & Authority
- Professional imagery and typography
- Prominent display of certifications
- Consistent brand expression

### 3. Accessibility
- WCAG 2.1 AA compliance minimum
- 44px minimum touch targets
- High contrast ratios (4.5:1+ for text)

### 4. Performance
- Mobile-first responsive design
- Optimized for fast load times
- Progressive enhancement

## Color System

### Primary Colors

- **Emergency Red** (`#dc2626`): Urgent CTAs, alerts
- **Primary Blue** (`#2563eb`): Main brand, trust elements
- **Success Green** (`#16a34a`): Positive actions, confirmations

### Usage Examples

```tsx
// Emergency button
<button className="bg-emergency-600 hover:bg-emergency-700">
  Call Now
</button>

// Primary action
<button className="bg-primary-600 hover:bg-primary-700">
  Get Quote
</button>

// Success message
<div className="bg-success-50 text-success-700">
  Request submitted successfully
</div>
```

## Typography

### Font Scale

| Element | Mobile | Desktop | Usage |
|---------|--------|---------|--------|
| Hero | 36px | 60px | Main headlines |
| H1 | 32px | 48px | Page titles |
| H2 | 28px | 36px | Section headers |
| H3 | 24px | 30px | Subsections |
| Body | 16px | 18px | Main content |

### Implementation

```tsx
// Using responsive typography
<h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
  Emergency Services
</h1>

// Using design tokens
import { typography } from '@/design-system';

const styles = {
  fontSize: typography.responsive.h1.desktop,
  fontWeight: typography.fontWeight.bold,
};
```

## Component Patterns

### Buttons

```tsx
import { buttonClass } from '@/design-system';

// Emergency button (highest priority)
<button className={buttonClass('emergency', 'lg')}>
  Call 1300 309 361
</button>

// Primary button
<button className={buttonClass('primary', 'md')}>
  Get Free Quote
</button>

// Secondary button
<button className={buttonClass('secondary', 'md')}>
  Learn More
</button>
```

### Cards

```tsx
import { cardClass } from '@/design-system';

// Service card
<div className={cardClass('service')}>
  <img src="/service.jpg" alt="Service" />
  <div className="p-6">
    <h3>Water Damage Restoration</h3>
    <p>24/7 emergency response</p>
  </div>
</div>

// Emergency card
<div className={cardClass('emergency')}>
  <h3>Urgent: Flooding Emergency</h3>
  <button>Get Immediate Help</button>
</div>
```

### Forms

```tsx
// Emergency contact form
<form className="space-y-4">
  <input
    type="tel"
    className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-primary-600"
    placeholder="Phone number"
    inputMode="tel"
    autoComplete="tel"
  />
  <button className={buttonClass('emergency', 'lg', 'w-full')}>
    Get Emergency Help
  </button>
</form>
```

## Accessibility Guidelines

### Color Contrast

| Element Type | Minimum Ratio | Recommended |
|--------------|---------------|-------------|
| Normal text | 4.5:1 | 7:1 |
| Large text | 3:1 | 4.5:1 |
| Emergency | 7:1 | 7:1+ |

### Focus Management

```tsx
// Proper focus indicators
<button className="focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2">
  Click Me
</button>

// Skip navigation link
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### ARIA Labels

```tsx
// Emergency button with context
<button
  aria-label="Call emergency hotline 1300 309 361"
  aria-describedby="emergency-desc"
>
  Emergency Call
</button>
<span id="emergency-desc" className="sr-only">
  24/7 emergency response, calls answered immediately
</span>
```

## Mobile Optimization

### Touch Targets

- Minimum: 44x44px (iOS standard)
- Recommended: 48x48px (Material Design)
- Emergency buttons: 48x48px minimum

### Responsive Utilities

```tsx
// Mobile-first responsive design
<div className="px-4 md:px-6 lg:px-8">
  <h2 className="text-2xl md:text-3xl lg:text-4xl">
    Responsive Heading
  </h2>
</div>

// Touch-optimized buttons
<button className="min-h-[44px] md:min-h-[48px] px-4 py-3">
  Touch Friendly
</button>
```

## Performance Best Practices

### Image Optimization

```tsx
import Image from 'next/image';

// Optimized hero image
<Image
  src="/hero.jpg"
  alt="Disaster recovery"
  width={1920}
  height={1080}
  priority // Above-fold images
  quality={85}
  placeholder="blur"
/>
```

### Code Splitting

```tsx
import dynamic from 'next/dynamic';

// Lazy load non-critical components
const Gallery = dynamic(() => import('./Gallery'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});
```

## Emergency Design Patterns

### Emergency Contact Bar

```tsx
<div className="fixed top-0 w-full bg-emergency-600 text-white p-3 z-50">
  <div className="container mx-auto flex items-center justify-between">
    <span className="animate-pulse">24/7 Emergency</span>
    <a href="tel:1300309361" className="font-bold">
      1300 309 361
    </a>
  </div>
</div>
```

### Crisis Response Card

```tsx
<div className={cardClass('emergency', 'shadow-emergency')}>
  <div className="flex items-start gap-3">
    <span className="text-2xl animate-pulse">🚨</span>
    <div>
      <h3 className="font-bold text-emergency-700">
        Water Damage Emergency?
      </h3>
      <p className="text-sm text-neutral-600 mb-3">
        Act fast to prevent further damage
      </p>
      <button className={buttonClass('emergency', 'md')}>
        Get Immediate Help
      </button>
    </div>
  </div>
</div>
```

## Utility Functions

### Button Class Helper

```tsx
import { buttonClass } from '@/design-system';

// Generate button classes
const emergencyBtn = buttonClass('emergency', 'lg');
const primaryBtn = buttonClass('primary', 'md', 'custom-class');
```

### Container Class Helper

```tsx
import { containerClass } from '@/design-system';

// Generate container classes
<div className={containerClass('xl')}>
  {/* Max-width: 1280px with responsive padding */}
</div>
```

### Section Class Helper

```tsx
import { sectionClass } from '@/design-system';

// Generate section spacing
<section className={sectionClass('lg')}>
  {/* Responsive vertical padding */}
</section>
```

## Testing Checklist

### Visual Testing
- [ ] Colors meet contrast requirements
- [ ] Typography is readable at all sizes
- [ ] Touch targets meet minimum sizes
- [ ] Focus indicators are visible

### Functional Testing
- [ ] Emergency CTAs are always accessible
- [ ] Forms validate properly
- [ ] Keyboard navigation works
- [ ] Screen readers announce correctly

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Images are optimized
- [ ] Code is properly split
- [ ] Animations respect prefers-reduced-motion

## Resources

- **Documentation**: `/design-system/usage-guidelines.md`
- **Examples**: `/design-system/implementation-example.tsx`
- **Tokens**: `/design-system/design-tokens.ts`
- **Patterns**: `/design-system/component-patterns.tsx`

## Support

For design system updates or questions:
1. Check the usage guidelines
2. Review implementation examples
3. Test accessibility compliance
4. Ensure performance standards

## Version History

- **v1.0.0** - Initial design system release
  - Core design tokens
  - Component patterns
  - Emergency response patterns
  - Accessibility standards
  - Performance guidelines