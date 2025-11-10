# Design System Guide - Disaster Recovery Brisbane

## Overview

Design system and UI component guide for maintaining consistent, professional branding across the Disaster Recovery Brisbane website.

## Table of Contents

- [Brand Identity](#brand-identity)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Accessibility](#accessibility)
- [Usage Guidelines](#usage-guidelines)

## Brand Identity

### Core Values

- **Professional**: Emergency service expertise
- **Trustworthy**: IICRC Master Restorer certified
- **Responsive**: 24/7 emergency availability
- **Local**: Brisbane, Ipswich, Logan focus

### Visual Tone

- Clean and modern
- High-contrast for emergency readability
- Professional photography
- Clear call-to-actions

## Color System

### Primary Colors

```css
/* Emergency Red - Primary CTA */
--emergency-red: #DC2626;
--emergency-red-hover: #B91C1C;

/* Professional Blue - Trust & Authority */
--professional-blue: #1E40AF;
--professional-blue-hover: #1E3A8A;

/* Success Green - Confirmation */
--success-green: #059669;
--success-green-hover: #047857;
```

### Neutral Colors

```css
/* Text */
--text-primary: #111827;
--text-secondary: #6B7280;
--text-tertiary: #9CA3AF;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F9FAFB;
--bg-tertiary: #F3F4F6;

/* Borders */
--border-light: #E5E7EB;
--border-medium: #D1D5DB;
--border-dark: #9CA3AF;
```

### Accent Colors

```css
/* Water Damage */
--water-blue: #3B82F6;

/* Fire Damage */
--fire-orange: #F97316;

/* Mould */
--mould-purple: #8B5CF6;

/* Storm */
--storm-gray: #6B7280;
```

### Usage Guidelines

```tsx
// Emergency buttons
<Button className="bg-emergency-red hover:bg-emergency-red-hover">
  Call Now: 1300 309 361
</Button>

// Professional content
<div className="bg-professional-blue text-white">
  Master Restorer Certified
</div>

// Service cards - use accent colors
<ServiceCard icon={waterIcon} accentColor="water-blue" />
```

## Typography

### Font Families

```css
/* Primary - Headings */
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Secondary - Body Text */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - Code */
--font-mono: 'Fira Code', 'Courier New', monospace;
```

### Type Scale

```css
/* Headings */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
```

### Font Weights

```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Components

```tsx
// Hero Heading
<h1 className="text-5xl md:text-6xl font-bold text-text-primary">
  24/7 Emergency Restoration
</h1>

// Section Heading
<h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-6">
  Our Services
</h2>

// Body Text
<p className="text-base text-text-secondary leading-relaxed">
  IICRC Master Restorer certified professionals...
</p>

// Small Print
<p className="text-sm text-text-tertiary">
  Available 24/7 across Brisbane, Ipswich & Logan
</p>
```

## Spacing & Layout

### Spacing Scale (Tailwind)

```
0   = 0
1   = 0.25rem  (4px)
2   = 0.5rem   (8px)
3   = 0.75rem  (12px)
4   = 1rem     (16px)
6   = 1.5rem   (24px)
8   = 2rem     (32px)
12  = 3rem     (48px)
16  = 4rem     (64px)
24  = 6rem     (96px)
```

### Container Widths

```tsx
// Full width
<div className="container mx-auto px-6">

// Content width
<div className="max-w-7xl mx-auto px-6">

// Reading width
<div className="max-w-4xl mx-auto px-6">

// Narrow width
<div className="max-w-2xl mx-auto px-6">
```

### Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Components

### Button Variants

```tsx
// Primary (Emergency)
<Button variant="emergency" size="lg">
  Call Now: 1300 309 361
</Button>

// Secondary
<Button variant="outline" size="md">
  Learn More
</Button>

// Ghost
<Button variant="ghost" size="sm">
  View Details
</Button>
```

### Service Cards

```tsx
<ServiceCard
  title="Water Damage Restoration"
  description="24/7 emergency response for flooding and water damage"
  icon={<WaterDropIcon />}
  accentColor="water-blue"
  href="/services/water-damage-restoration"
/>
```

### Emergency Banner

```tsx
<EmergencyBanner>
  Emergency? Call Now: 1300 309 361 - 24/7 Response
</EmergencyBanner>
```

### Location Cards

```tsx
<LocationCard
  suburb="Hamilton"
  postcode="4007"
  phone="1300 309 361"
  services={['Water', 'Fire', 'Mould']}
/>
```

## Accessibility

### Color Contrast

- **WCAG AA Minimum**: 4.5:1 for normal text
- **WCAG AAA Enhanced**: 7:1 for normal text
- **Large Text**: 3:1 minimum

```tsx
// Good contrast
<div className="bg-professional-blue text-white">

// Check contrast
<div className="bg-bg-secondary text-text-primary">
```

### Focus States

```tsx
// Keyboard navigation
<button className="focus:ring-2 focus:ring-professional-blue focus:ring-offset-2">
  Click Me
</button>
```

### ARIA Labels

```tsx
// Icon buttons
<button aria-label="Call emergency hotline">
  <PhoneIcon />
</button>

// Links
<a href="/emergency" aria-label="24/7 Emergency Services">
  Emergency
</a>
```

### Semantic HTML

```tsx
// Use proper heading hierarchy
<h1>Main Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>

// Use semantic elements
<nav>Navigation</nav>
<main>Main Content</main>
<aside>Sidebar</aside>
<footer>Footer</footer>
```

## Usage Guidelines

### Do's

✅ Use emergency red for urgent CTAs
✅ Maintain consistent spacing
✅ Use professional photography
✅ Follow accessibility guidelines
✅ Test on mobile devices
✅ Use semantic HTML

### Don'ts

❌ Don't use colors that fail contrast checks
❌ Don't use emergency red for non-urgent items
❌ Don't skip heading levels
❌ Don't use images without alt text
❌ Don't hardcode spacing values
❌ Don't use inline styles

## Component Library

### Available Components

Located in `components/ui/`:
- Button
- Card
- Input
- Select
- Textarea
- Badge
- Alert
- Modal
- Accordion
- Tabs

### Usage

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';

<Card>
  <Alert variant="info">Emergency services available 24/7</Alert>
  <Button>Contact Us</Button>
</Card>
```

## Animation Guidelines

### Transitions

```tsx
// Hover effects
<div className="transition-colors duration-200 hover:bg-bg-secondary">

// Transform effects
<div className="transition-transform duration-300 hover:scale-105">

// Opacity effects
<div className="transition-opacity duration-200 hover:opacity-80">
```

### Framer Motion

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Image Guidelines

### Format Priority

1. WebP (primary)
2. AVIF (progressive enhancement)
3. PNG (fallback)
4. JPG (photos)

### Optimization

```tsx
import Image from 'next/image';

<Image
  src="/images/service.webp"
  alt="Water damage restoration in Brisbane"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

## Resources

- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com/
- Framer Motion: https://www.framer.com/motion/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/

## Archived Documentation

For historical design documentation, see:
- `docs/archive/design-docs/` - Previous design implementations
- `docs/archive/2024-implementations/` - UI/UX implementations

---

**Last Updated**: 2025-11-10
**Design System**: Tailwind CSS + Radix UI
**Accessibility**: WCAG 2.1 AA Compliant
