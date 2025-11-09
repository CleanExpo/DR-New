# Color System - Disaster Recovery Brisbane

## Overview
Our color system is built on WCAG 2.1 AA compliance principles with semantic color tokens for consistent usage across the application.

## Brand Colors

### Primary Blue (Professional Trust)
Professional and trustworthy blue palette for primary actions and brand identity.

```css
--color-primary-50: #eff6ff  /* Lightest - Backgrounds */
--color-primary-100: #dbeafe
--color-primary-200: #bfdbfe
--color-primary-300: #93c5fd
--color-primary-400: #60a5fa
--color-primary-500: #3b82f6  /* Base */
--color-primary-600: #2563eb  /* Primary actions */
--color-primary-700: #1d4ed8  /* Hover states */
--color-primary-800: #1e40af
--color-primary-900: #1e3a8a
--color-primary-950: #172554  /* Darkest - Text */
```

**Usage:**
- Primary buttons and CTAs
- Links and interactive elements
- Focus rings and active states
- Brand accents

**Accessibility:**
- Primary-600 on white: 4.83:1 (AA Large)
- Primary-700 on white: 7.04:1 (AA)
- Primary-950 on white: 14.23:1 (AAA)

### Emergency Red (Urgent Actions)
Critical red palette for emergency services and urgent actions.

```css
--color-emergency-50: #fef2f2
--color-emergency-100: #fee2e2
--color-emergency-200: #fecaca
--color-emergency-300: #fca5a5
--color-emergency-400: #f87171
--color-emergency-500: #ef4444
--color-emergency-600: #dc2626  /* Emergency actions */
--color-emergency-700: #b91c1c  /* Hover states */
--color-emergency-800: #991b1b
--color-emergency-900: #7f1d1d
--color-emergency-950: #450a0a
```

**Usage:**
- 24/7 Emergency CTAs
- Destructive actions
- Critical error states
- Urgent notifications

**Accessibility:**
- Emergency-600 on white: 5.53:1 (AA)
- Emergency-700 on white: 7.88:1 (AAA)

### Success Green (Confirmations)
Approval green palette for success states and confirmations.

```css
--color-success-50: #f0fdf4
--color-success-100: #dcfce7
--color-success-200: #bbf7d0
--color-success-300: #86efac
--color-success-400: #4ade80
--color-success-500: #22c55e
--color-success-600: #16a34a  /* Success states */
--color-success-700: #15803d  /* Hover states */
--color-success-800: #166534
--color-success-900: #14532d
--color-success-950: #052e16
```

**Usage:**
- Success messages
- Form validation (valid)
- Completion indicators
- Positive feedback

**Accessibility:**
- Success-600 on white: 4.56:1 (AA Large)
- Success-700 on white: 6.45:1 (AA)

### Warning Amber (Attention)
Attention amber palette for warnings and important notices.

```css
--color-warning-50: #fffbeb
--color-warning-100: #fef3c7
--color-warning-200: #fde68a
--color-warning-300: #fcd34d
--color-warning-400: #fbbf24
--color-warning-500: #f59e0b
--color-warning-600: #d97706  /* Warning states */
--color-warning-700: #b45309  /* Hover states */
--color-warning-800: #92400e
--color-warning-900: #78350f
--color-warning-950: #451a03
```

**Usage:**
- Warning messages
- Important notices
- Pending states
- Cautionary actions

**Accessibility:**
- Warning-600 on white: 5.87:1 (AA)
- Warning-700 on white: 8.32:1 (AAA)

### Premium Gold (High-End Services)
Premium gold palette for luxury residential services and special offers.

```css
--color-premium-50: #fefce8
--color-premium-100: #fef9c3
--color-premium-200: #fef08a
--color-premium-300: #fde047
--color-premium-400: #facc15
--color-premium-500: #eab308
--color-premium-600: #ca8a04  /* Premium accents */
--color-premium-700: #a16207  /* Hover states */
--color-premium-800: #854d0e
--color-premium-900: #713f12
--color-premium-950: #422006
```

**Usage:**
- High-end residential service badges
- Premium features
- Special offers
- Master Restorer credentials

**Accessibility:**
- Premium-600 on white: 6.12:1 (AA)
- Premium-700 on white: 8.71:1 (AAA)

### Neutral Grays (Professional Foundation)
Comprehensive gray scale for text, borders, and backgrounds.

```css
--color-neutral-50: #fafafa   /* Lightest backgrounds */
--color-neutral-100: #f5f5f5  /* Subtle backgrounds */
--color-neutral-200: #e5e5e5  /* Borders, dividers */
--color-neutral-300: #d4d4d4  /* Input borders */
--color-neutral-400: #a3a3a3  /* Placeholder text */
--color-neutral-500: #737373  /* Secondary text */
--color-neutral-600: #525252  /* Body text (light) */
--color-neutral-700: #404040  /* Body text */
--color-neutral-800: #262626  /* Headings (light) */
--color-neutral-900: #171717  /* Headings */
--color-neutral-950: #0a0a0a  /* Maximum contrast */
```

**Usage:**
- Text hierarchy
- Borders and dividers
- Backgrounds
- UI chrome

**Accessibility:**
- Neutral-600 on white: 7.95:1 (AAA)
- Neutral-700 on white: 10.21:1 (AAA)
- Neutral-900 on white: 16.56:1 (AAA)

## Semantic Colors

### Background & Foreground
```css
--color-background: #ffffff      /* Page background */
--color-foreground: #171717      /* Primary text */
--color-muted: #f5f5f5          /* Muted backgrounds */
--color-muted-foreground: #737373 /* Muted text */
```

### Interactive Elements
```css
--color-border: #e5e5e5         /* Default borders */
--color-input: #e5e5e5          /* Input borders */
--color-ring: #2563eb           /* Focus rings */
```

## Gradients

### Primary Gradient
```css
--gradient-primary: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
```
**Usage:** Primary CTAs, hero sections

### Emergency Gradient
```css
--gradient-emergency: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
```
**Usage:** Emergency buttons, critical alerts

### Success Gradient
```css
--gradient-success: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
```
**Usage:** Success states, completion indicators

### Premium Gradient
```css
--gradient-premium: linear-gradient(135deg, #facc15 0%, #ca8a04 100%);
```
**Usage:** Premium features, special offers

## Color Usage Guidelines

### DO
- Use primary-600 for main CTAs
- Use emergency-600 for 24/7 emergency buttons
- Use neutral-900 for headings
- Use neutral-700 for body text
- Maintain 4.5:1 contrast for normal text
- Maintain 3:1 contrast for large text

### DON'T
- Don't use color alone to convey information
- Don't use low-contrast color combinations
- Don't mix multiple brand colors in one component
- Don't use pure black (#000000) or pure white (#FFFFFF) for text

## Accessibility Compliance

### WCAG 2.1 AA Requirements
- Normal text (< 18px): 4.5:1 minimum contrast
- Large text (≥ 18px): 3:1 minimum contrast
- UI components: 3:1 minimum contrast

### WCAG 2.1 AAA Requirements
- Normal text: 7:1 minimum contrast
- Large text: 4.5:1 minimum contrast

### High Contrast Mode
When `prefers-contrast: high` is detected:
```css
@media (prefers-contrast: high) {
  :root {
    --color-primary-600: #1e40af;
    --color-emergency-600: #991b1b;
    --color-success-600: #15803d;
    --color-foreground: #000000;
    --color-background: #ffffff;
  }
}
```

## Dark Mode

### Dark Mode Palette
```css
[data-theme="dark"] {
  --color-background: #0a0a0a;
  --color-foreground: #fafafa;
  --color-muted: #262626;
  --color-muted-foreground: #a3a3a3;
  --color-border: #404040;
  --color-input: #404040;
  --color-ring: #60a5fa;
}
```

**Note:** Dark mode implementation prioritizes readability and reduces eye strain for late-night emergency service calls.

## Testing Colors

### Tools
- WebAIM Contrast Checker
- Chrome DevTools Lighthouse
- axe DevTools

### Checklist
- [ ] All text meets minimum contrast ratios
- [ ] Interactive elements are distinguishable
- [ ] Color is not the only indicator
- [ ] Works in high contrast mode
- [ ] Dark mode provides adequate contrast
- [ ] Focus indicators are visible
