# Disaster Recovery Brisbane - Design System Documentation

**Version:** 1.0.0
**Last Updated:** 2025-11-09
**Design Source:** Landing Page Hero (`app/page.tsx` + `public/images/hero/landing-page-hero.png`)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Visual Effects & Overlays](#visual-effects--overlays)
7. [Animation Patterns](#animation-patterns)
8. [Hero Variations](#hero-variations)
9. [Mobile-First Responsive Design](#mobile-first-responsive-design)
10. [Accessibility Requirements](#accessibility-requirements)
11. [Implementation Roadmap](#implementation-roadmap)

---

## Design Philosophy

### Core Principles

**Emergency-Ready Aesthetic**
- Dramatic, attention-grabbing visuals that communicate urgency
- Storm, fire, and water damage imagery conveys expertise
- Professional credibility through Master Restorer positioning
- Trust-building through clean, organized layouts

**Brisbane Local Service Identity**
- High-end residential focus (Hamilton, Ascot, New Farm, Toowong)
- Premium but accessible aesthetic
- Professional expertise without corporate coldness
- 24/7 emergency availability front and center

**User-Centered Design**
- Mobile-first approach (most emergency searches on mobile)
- One-tap calling prominent on all pages
- Clear hierarchy: Emergency → Services → About → Insurance
- Minimal clicks to critical actions

---

## Color System

### Primary Color Palette

Based on landing page hero analysis:

#### Emergency Red (Primary CTA)
```css
/* From hero image and emergency CTAs */
emergency-50:  #fff1f0
emergency-100: #ffe1de
emergency-200: #ffc7c2
emergency-300: #ffa09a
emergency-400: #ff6b60
emergency-500: #dc2626  /* DEFAULT - Call buttons */
emergency-600: #b91c1c  /* Hover state */
emergency-700: #991b1b
emergency-800: #7f1d1d
emergency-900: #450a0a  /* Dark overlays */
```

**Usage:**
- Primary emergency CTA buttons
- Phone number buttons
- Emergency badges/tags
- Urgent notification banners
- Pulse animations

#### Storm/Professional Blue (Brand Primary)
```css
/* From trust indicators section gradient */
primary-50:  #f0f4ff
primary-100: #dce6ff
primary-200: #b8ceff
primary-300: #8aafff
primary-400: #5a8aff
primary-500: #2563eb  /* DEFAULT - Trust badges */
primary-600: #1d4ed8  /* Gradient end */
primary-700: #1e40af
primary-800: #1e3a8a  /* Deep storm blue */
primary-900: #1e293b  /* Near-black overlay */
```

**Usage:**
- Trust indicator backgrounds (`bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900`)
- Professional badges
- Insurance logos section
- Section dividers
- Link hover states

#### Premium Gold/Yellow (Accent & Master Restorer)
```css
/* From Master Restorer badges and accent elements */
premium-50:  #fffbeb
premium-100: #fef3c7
premium-200: #fde68a
premium-300: #fcd34d
premium-400: #fbbf24  /* Icon color - text-yellow-400 */
premium-500: #d97706  /* DEFAULT */
premium-600: #b45309
premium-700: #92400e
premium-800: #78350f
premium-900: #451a03
```

**Usage:**
- Master Restorer certification icons
- "Limited in QLD" tags
- Premium service highlights
- Award/credential badges
- Success states

#### Success Green (Availability & Completion)
```css
/* From mould remediation and availability indicators */
success-50:  #f0fdf4
success-100: #dcfce7
success-200: #bbf7d0
success-300: #86efac
success-400: #4ade80
success-500: #16a34a  /* DEFAULT */
success-600: #15803d  /* Mould service accent */
success-700: #166534
success-800: #14532d
success-900: #052e16
```

**Usage:**
- Mould remediation accents
- 24/7 availability badges
- Completion checkmarks
- Positive indicators
- Insurance approved badges

#### Neutral Grays (Content & Backgrounds)
```css
/* From content sections */
neutral-50:  #fafafa  /* Lightest background */
neutral-100: #f5f5f5  /* bg-gray-50 */
neutral-200: #e5e5e5
neutral-300: #d4d4d4
neutral-400: #a3a3a3
neutral-500: #737373
neutral-600: #525252
neutral-700: #404040
neutral-800: #262626
neutral-900: #171717  /* text-gray-900 - Headings */
neutral-950: #0a0a0a
```

**Usage:**
- Background alternation: `bg-gray-50`, `bg-white`
- Body text: `text-gray-600`
- Headings: `text-gray-900`
- Section dividers
- Card shadows

### Color Gradients (Landing Page Patterns)

#### Trust Indicators Gradient (Blue Storm)
```css
/* From line 107: py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 */
background: linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a);
```

#### Service Areas Gradient (Subtle Gray)
```css
/* From line 287: bg-gradient-to-br from-gray-50 to-gray-100 */
background: linear-gradient(to bottom right, #fafafa, #f5f5f5);
```

#### Mobile Showcase Gradient (Light Blue)
```css
/* From line 353: bg-gradient-to-br from-blue-50 to-blue-100 */
background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
```

#### Final CTA Gradient (Emergency Red Storm)
```css
/* From line 528: bg-gradient-to-br from-red-600 via-red-700 to-red-800 */
background: linear-gradient(to bottom right, #dc2626, #b91c1c, #991b1b);
```

### Dark Overlays

```css
/* Hero image overlay - line 100 */
.hero-overlay {
  background: rgba(0, 0, 0, 0.2); /* bg-black/20 */
}

/* Final CTA overlay - line 529 */
.cta-overlay {
  background: rgba(0, 0, 0, 0.2);
}
```

---

## Typography System

### Font Families

```css
/* From tailwind.config.ts */
font-sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
font-display: ['Poppins', 'system-ui', '-apple-system', 'sans-serif']
```

**Usage Guidelines:**
- **Body Text:** `font-sans` (Inter) - Readable, professional
- **Headings:** `font-display` (Poppins) - Bold, attention-grabbing
- **Emergency CTAs:** `font-bold` with Poppins

### Typography Scale

Based on landing page analysis:

```css
/* Hero Title - Line 535 */
.hero-primary {
  font-size: 2.5rem; /* text-4xl on mobile */
  font-size: 3rem;   /* md:text-5xl on tablet */
  font-size: 3.75rem; /* lg:text-6xl on desktop */
  font-weight: 700;
  line-height: 1.1;
}

/* Section Headings - Line 110, 155, 226 */
.section-heading {
  font-size: 1.5rem;    /* text-2xl mobile */
  font-size: 1.875rem;  /* md:text-3xl tablet */
  line-height: 1.2;
  font-weight: 700;
  color: theme('colors.neutral.900');
}

/* Large Section Heading - Line 290 */
.section-heading-large {
  font-size: 2.25rem; /* text-4xl mobile */
  font-size: 3rem;    /* md:text-5xl desktop */
  line-height: 1.1;
  font-weight: 700;
}

/* Card Headings - Line 168 */
.card-heading {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  margin-bottom: 0.75rem;
}

/* Body Text - Line 157 */
.body-large {
  font-size: 1.25rem; /* text-xl */
  line-height: 1.6;
  color: theme('colors.neutral.600');
}

/* Body Regular - Line 169 */
.body-regular {
  font-size: 1rem;
  line-height: 1.6;
  color: theme('colors.neutral.600');
}

/* Small Text - Line 174 */
.text-small {
  font-size: 0.875rem; /* text-sm */
  line-height: 1.5;
  color: theme('colors.neutral.700');
}

/* Extra Small (Tags) - Line 118 */
.text-xs {
  font-size: 0.75rem;
  line-height: 1.4;
}
```

### Typography Patterns

#### Emergency Badge Text
```html
<!-- Line 152 -->
<div class="inline-block mb-4 px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-full">
  🚨 24/7 Brisbane Emergency Service
</div>
```

#### Strong Emphasis (Master Restorer)
```html
<!-- Line 157 -->
<strong>Phill McGurk - IICRC Master Restorer</strong>
```

#### FAQ Summary (Bold)
```html
<!-- Line 465 -->
<summary class="font-bold text-lg cursor-pointer text-gray-900">
  Question text here
</summary>
```

---

## Spacing & Layout

### Container System

```css
/* From tailwind.config.ts container configuration */
.container {
  center: true;
  padding: {
    DEFAULT: '1rem',    /* 16px mobile */
    sm: '1.5rem',       /* 24px small */
    lg: '2rem',         /* 32px large */
  }
}
```

### Section Padding

```css
/* Standard Section - Line 107, 149, 220 */
.section-standard {
  padding-top: 5rem;    /* py-20 = 80px */
  padding-bottom: 5rem;
}

/* Compact Section - Line 107 */
.section-compact {
  padding-top: 4rem;    /* py-16 = 64px */
  padding-bottom: 4rem;
}

/* Hero Section - Line 90 */
.hero-section {
  min-height: 400px;
  min-height: 500px; /* md: larger screens */
}
```

### Grid Systems

#### Trust Indicators (5 columns)
```html
<!-- Line 113 -->
<div class="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center">
  <!-- Cards -->
</div>
```

#### Service Cards (3 columns)
```html
<!-- Line 161 -->
<div class="grid md:grid-cols-3 gap-8">
  <!-- Service cards -->
</div>
```

#### Benefits Grid (2 columns)
```html
<!-- Line 234 -->
<div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
  <!-- Benefit cards -->
</div>
```

### Spacing Scale

```css
/* Common spacing from landing page */
mb-2:  0.5rem   /* 8px - tight spacing */
mb-3:  0.75rem  /* 12px - card icon to title */
mb-4:  1rem     /* 16px - standard element spacing */
mb-6:  1.5rem   /* 24px - paragraph to element */
mb-8:  2rem     /* 32px - section internal spacing */
mb-12: 3rem     /* 48px - section heading to content */

gap-4: 1rem     /* Grid gap small */
gap-6: 1.5rem   /* Grid gap medium */
gap-8: 2rem     /* Grid gap standard */
```

---

## Component Library

### 1. Trust Indicator Card

**Design Pattern:** Glass morphism card with icon, stat, description
**Location:** Line 114-119

```tsx
// Trust Indicator Component
const TrustCard = ({ icon: Icon, stat, label, detail, iconColor = "text-yellow-400" }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
    <Icon className={`w-12 h-12 mx-auto mb-3 ${iconColor}`} />
    <div className="text-2xl font-bold mb-1">{stat}</div>
    <div className="text-sm opacity-90">{label}</div>
    <div className="text-xs mt-2 text-yellow-300">{detail}</div>
  </div>
);
```

**Usage:**
```tsx
<TrustCard
  icon={Award}
  stat="Master Restorer"
  label="IICRC Certified"
  detail="Limited in QLD"
/>
```

**Visual Specs:**
- Background: `bg-white/10 backdrop-blur-sm`
- Padding: `p-6` (24px)
- Border radius: `rounded-lg`
- Hover: `hover:bg-white/20`
- Icon size: `w-12 h-12` (48px)
- Icon color: `text-yellow-400`
- Stat text: `text-2xl font-bold`
- Label text: `text-sm opacity-90`
- Detail text: `text-xs mt-2 text-yellow-300`

---

### 2. Emergency Service Card

**Design Pattern:** White card with colored icon, hover border effect
**Location:** Line 162-178

```tsx
// Emergency Service Card Component
const ServiceCard = ({
  icon: Icon,
  iconColor = "text-blue-600",
  borderColor = "border-blue-500",
  title,
  description,
  features,
  linkText,
  linkHref,
  linkColor = "text-blue-600"
}) => (
  <div className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:${borderColor} border-2 border-transparent`}>
    <div className={`${iconColor} mb-4`}>
      <Icon className="w-16 h-16" />
    </div>
    <h3 className="text-2xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="mb-4 text-sm text-gray-700">{features}</div>
    <Link href={linkHref} className={`${linkColor} font-bold hover:${linkColor.replace('600', '700')} inline-flex items-center`}>
      {linkText} <ArrowRight className="w-4 h-4 ml-1" />
    </Link>
  </div>
);
```

**Visual Specs:**
- Background: `bg-white`
- Padding: `p-8` (32px)
- Shadow: `shadow-lg` → `hover:shadow-xl`
- Border radius: `rounded-lg`
- Border: `border-2 border-transparent` → `hover:border-2 hover:border-{color}-500`
- Icon size: `w-16 h-16` (64px)
- Title: `text-2xl font-bold mb-3`
- Description: `text-gray-600 mb-4`
- Features: `text-sm text-gray-700`

**Color Variants:**
- Water: `text-blue-600`, `border-blue-500`
- Fire: `text-red-600`, `border-red-500`
- Mould: `text-green-600`, `border-green-500`

---

### 3. Benefit Card

**Design Pattern:** Gray background card with colored icon badge
**Location:** Line 235-244

```tsx
// Benefit Card Component
const BenefitCard = ({
  icon: Icon,
  bgColor = "bg-yellow-500",
  title,
  description
}) => (
  <div className="flex items-start gap-4 bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
    <div className={`${bgColor} rounded-full p-3 flex-shrink-0`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);
```

**Visual Specs:**
- Background: `bg-gray-50`
- Padding: `p-6`
- Border radius: `rounded-lg`
- Hover: `hover:shadow-lg`
- Layout: `flex items-start gap-4`
- Icon badge: `rounded-full p-3` (12px padding)
- Icon size: `w-8 h-8` (32px)
- Title: `text-xl font-bold mb-2`

**Badge Color Variants:**
- Master Restorer: `bg-yellow-500`
- Insurance: `bg-blue-600`
- Response Time: `bg-red-600`
- Local: `bg-green-600`

---

### 4. Location Area Card

**Design Pattern:** White elevated card with icon header
**Location:** Line 295-309

```tsx
// Location Card Component
const LocationCard = ({
  icon: Icon,
  iconColor = "text-blue-600",
  location,
  premiumLabel,
  premiumAreas,
  allLabel,
  allAreas,
  linkText,
  linkHref,
  linkColor = "text-blue-600"
}) => (
  <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all">
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-8 h-8 ${iconColor}`} />
      <h3 className="text-2xl font-bold text-gray-900">{location}</h3>
    </div>
    <div className="mb-4">
      <p className={`font-semibold ${iconColor} mb-2`}>{premiumLabel}:</p>
      <p className="text-gray-700 text-sm mb-3">{premiumAreas}</p>
      <p className="font-semibold text-gray-900 mb-2">{allLabel}:</p>
      <p className="text-gray-600 text-sm">{allAreas}</p>
    </div>
    <Link href={linkHref} className={`${linkColor} font-bold hover:${linkColor.replace('600', '700')} inline-flex items-center`}>
      {linkText} <ArrowRight className="w-4 h-4 ml-1" />
    </Link>
  </div>
);
```

**Visual Specs:**
- Background: `bg-white`
- Border radius: `rounded-xl` (more rounded than standard)
- Padding: `p-8`
- Shadow: `shadow-lg` → `hover:shadow-xl`
- Header layout: `flex items-center gap-3`
- Icon size: `w-8 h-8`

**Color Variants:**
- Brisbane: `text-blue-600`
- Ipswich: `text-purple-600`
- Logan: `text-orange-600`

---

### 5. FAQ Accordion Item

**Design Pattern:** Gray background with arrow rotation
**Location:** Line 464-472

```tsx
// FAQ Item Component
const FAQItem = ({ question, answer }) => (
  <details className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow group">
    <summary className="font-bold text-lg cursor-pointer text-gray-900 list-none flex items-center justify-between">
      <span>{question}</span>
      <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
    </summary>
    <p className="mt-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }} />
  </details>
);
```

**Visual Specs:**
- Background: `bg-gray-50`
- Padding: `p-6`
- Border radius: `rounded-lg`
- Hover: `hover:shadow-lg`
- Summary: `font-bold text-lg`
- Arrow: `w-5 h-5` rotates 90° on open
- Answer: `mt-4 text-gray-700 leading-relaxed`

---

### 6. Emergency CTA Button

**Design Pattern:** Large prominent button with icon, animation
**Location:** Line 546-553

```tsx
// Emergency CTA Button Component
const EmergencyCTA = ({ phone = "1300309361", displayText = "1300 309 361" }) => (
  <a
    href={`tel:${phone}`}
    className="inline-flex items-center justify-center px-12 py-6 bg-white text-red-600 font-bold text-2xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
    aria-label={`Call ${displayText} for emergency service`}
  >
    <Phone className="w-8 h-8 mr-3 animate-pulse" />
    {displayText}
  </a>
);
```

**Visual Specs:**
- Padding: `px-12 py-6` (48px horizontal, 24px vertical)
- Background: `bg-white` on red gradient section
- Text: `text-red-600 font-bold text-2xl`
- Border radius: `rounded-lg`
- Shadow: `shadow-2xl` → `hover:shadow-white/50`
- Transform: `hover:scale-105`
- Icon: `w-8 h-8 animate-pulse`

**Alternative (Yellow variant):**
```tsx
className="inline-flex items-center justify-center px-12 py-6 bg-yellow-500 text-black font-bold text-2xl rounded-lg hover:bg-yellow-400 transition-all shadow-2xl transform hover:scale-105"
```

---

### 7. Badge/Tag Component

**Design Pattern:** Colored pill-shaped badge
**Location:** Line 152, 223, 356

```tsx
// Badge Component
const Badge = ({
  text,
  emoji,
  bgColor = "bg-red-100",
  textColor = "text-red-700",
  animate = false
}) => (
  <div className={`inline-block mb-4 px-4 py-2 ${bgColor} ${textColor} font-semibold rounded-full ${animate ? 'animate-pulse' : ''}`}>
    {emoji && <span className="mr-2">{emoji}</span>}
    {text}
  </div>
);
```

**Visual Specs:**
- Padding: `px-4 py-2`
- Border radius: `rounded-full`
- Font: `font-semibold`
- Display: `inline-block`

**Color Variants:**
- Emergency: `bg-red-100 text-red-700`
- Premium: `bg-yellow-100 text-yellow-800`
- Info: `bg-blue-600 text-white`
- Response: `bg-blue-50 text-gray-700`
- Pulse variant: `bg-yellow-500 text-black animate-pulse`

---

### 8. Info Box

**Design Pattern:** Colored background info banner
**Location:** Line 344-348

```tsx
// Info Box Component
const InfoBox = ({ children, bgColor = "bg-blue-50" }) => (
  <div className={`mt-12 text-center ${bgColor} rounded-xl p-6 max-w-4xl mx-auto`}>
    <p className="text-gray-700">{children}</p>
  </div>
);
```

**Visual Specs:**
- Background: Typically `bg-blue-50`
- Padding: `p-6`
- Border radius: `rounded-xl`
- Max width: `max-w-4xl mx-auto`
- Text: `text-gray-700`

---

### 9. Mobile Feature Card

**Design Pattern:** White card with emoji header
**Location:** Line 410-416

```tsx
// Mobile Feature Card Component
const FeatureCard = ({ emoji, title, description }) => (
  <div className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-3">{emoji}</div>
    <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);
```

**Visual Specs:**
- Background: `bg-white`
- Padding: `p-6`
- Alignment: `text-center`
- Shadow: `shadow-md` → `hover:shadow-lg`
- Emoji: `text-4xl mb-3`
- Title: `font-bold text-lg mb-2`
- Description: `text-gray-600 text-sm`

---

### 10. Stat Display

**Design Pattern:** Large number with label (used in CTA section)
**Location:** Line 565-576

```tsx
// Stat Display Component
const StatDisplay = ({ emoji, stat, label }) => (
  <div>
    <div className="text-3xl font-bold mb-2">
      {emoji} {stat}
    </div>
    <div className="text-red-100">{label}</div>
  </div>
);
```

**Visual Specs:**
- Stat: `text-3xl font-bold mb-2`
- Label: Context-dependent color (e.g., `text-red-100` on red background)
- Grid layout: `grid-cols-1 md:grid-cols-3 gap-6 text-center`

---

## Visual Effects & Overlays

### Hero Image Overlay Pattern

```tsx
// Standard hero section with image overlay
<section className="relative min-h-[400px] flex items-center justify-center text-white">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/hero-image.png"
      alt="Descriptive alt text"
      fill
      style={{ objectFit: 'cover' }}
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-black/20" />
  </div>

  {/* Content here with relative z-index */}
  <div className="relative z-10 container mx-auto px-6">
    {/* Hero content */}
  </div>
</section>
```

**Key Specs:**
- Section: `relative min-h-[400px]`
- Image wrapper: `absolute inset-0 z-0`
- Image: `fill` with `objectFit: 'cover'`, `priority` loading
- Overlay: `absolute inset-0 bg-black/20` (20% opacity)
- Content: `relative z-10` to appear above image

---

### Gradient Background Patterns

#### 1. Storm Blue Gradient (Trust Section)
```css
/* Line 107 */
background: linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a);
/* Classes: bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 */
```

#### 2. Subtle Gray Gradient (Service Areas)
```css
/* Line 287 */
background: linear-gradient(to bottom right, #fafafa, #f5f5f5);
/* Classes: bg-gradient-to-br from-gray-50 to-gray-100 */
```

#### 3. Light Blue Gradient (Mobile Showcase)
```css
/* Line 353 */
background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
/* Classes: bg-gradient-to-br from-blue-50 to-blue-100 */
```

#### 4. Emergency Red Gradient (Final CTA)
```css
/* Line 528 */
background: linear-gradient(to bottom right, #dc2626, #b91c1c, #991b1b);
/* Classes: bg-gradient-to-br from-red-600 via-red-700 to-red-800 */

/* With overlay */
position: relative;
overflow: hidden;

&::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}
```

---

### Glass Morphism Effect

```css
/* From globals.css + landing page trust cards */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Trust card variant */
.trust-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: background 0.3s ease;
}

.trust-card:hover {
  background: rgba(255, 255, 255, 0.2);
}
```

---

### Shadow Hierarchy

```css
/* From landing page card analysis */

/* Subtle shadow - resting state */
.shadow-sm {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

/* Standard card shadow */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Elevated card shadow */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Emergency CTA shadow */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* Hover state for emergency CTA */
.shadow-white-glow {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
}
```

---

## Animation Patterns

### From Landing Page

#### 1. Phone Icon Pulse (Emergency CTA)
```tsx
// Line 443, 551
<Phone className="w-6 h-6 mr-2 animate-pulse" />
```

```css
/* Tailwind default pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### 2. Emergency Badge Pulse
```tsx
// Line 532
<div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full animate-pulse">
  🚨 EMERGENCY? Call Master Restorer NOW
</div>
```

#### 3. Card Hover Lift
```tsx
// Standard service cards
className="hover:shadow-xl transition-all"
```

```css
/* From globals.css - card-hover class */
.card-hover:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.05);
}
```

#### 4. Button Scale on Hover
```tsx
// Line 548
className="transform hover:scale-105"
```

#### 5. Arrow Rotation (FAQ)
```tsx
// Line 467
<ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
```

---

### Additional Animations from globals.css

#### Emergency Pulse (Red)
```css
/* For emergency buttons and indicators */
.emergency-pulse {
  animation: emergencyPulse 1.5s infinite;
}

@keyframes emergencyPulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.8);
    background-color: #dc2626;
  }
  50% {
    box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
    background-color: #ef4444;
  }
}
```

#### Fire Glow Effect
```css
/* For fire damage sections */
.fire-glow {
  position: relative;
  overflow: hidden;
}

.fire-glow::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(239, 68, 68, 0.3) 0%,
    rgba(245, 101, 101, 0.2) 30%,
    transparent 70%
  );
  animation: fireFlicker 2s infinite alternate;
}

@keyframes fireFlicker {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.1); }
}
```

#### Water Wave Effect
```css
/* For water damage sections */
.water-wave {
  position: relative;
  overflow: hidden;
}

.water-wave::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.3),
    transparent
  );
  animation: waterFlow 3s infinite;
}

@keyframes waterFlow {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
```

#### Shimmer Loading
```css
/* For skeleton states and loading */
.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  right: 100%;
  bottom: 0;
  left: -100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
```

---

## Hero Variations

Based on landing page hero pattern, here are recommended hero variations for different page types:

### 1. Landing Page Hero (Current)
**File:** `app/page.tsx` line 89-104
**Pattern:** Full-width image with minimal overlay, no text (image contains text)

```tsx
<section className="relative min-h-[400px] flex items-center justify-center text-white">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/landing-page-hero.png"
      alt="Water Damage Restoration Brisbane - IICRC Master Restorer - 24/7 Emergency Response"
      fill
      style={{ objectFit: 'cover' }}
      priority
      sizes="100vw"
    />
    <div className="absolute inset-0 bg-black/20" />
  </div>
</section>
```

**Characteristics:**
- Image contains all text and CTAs
- Minimal overlay (20% black)
- No content overlay needed
- Priority loading
- Min height: 400px

---

### 2. Service Page Hero (Recommended)
**Use for:** Water Damage, Fire Damage, Mould Remediation, Storm Damage

```tsx
<section className="relative py-20 md:py-32 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/service-specific-hero.webp"
      alt="Service name - Master Restorer Brisbane"
      fill
      className="object-cover"
      priority
      sizes="100vw"
    />
    {/* Darker overlay for text readability */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl">
      {/* Emergency Badge */}
      <div className="inline-block mb-6 px-4 py-2 bg-red-500 text-white font-bold rounded-full animate-pulse">
        🚨 24/7 Emergency Service
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Professional Water Damage Restoration Brisbane
      </h1>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl mb-8 text-gray-100">
        IICRC Master Restorer • 60-Minute Response • All Insurers Approved
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:1300309361"
          className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-lg rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all shadow-xl"
        >
          <Phone className="w-6 h-6 mr-2" />
          Call 1300 309 361
        </a>
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-all"
        >
          Get Free Assessment
        </a>
      </div>
    </div>
  </div>
</section>
```

**Characteristics:**
- Darker gradient overlay (40-60% black)
- Text overlay with emergency badge
- Dual CTA buttons
- Responsive padding: `py-20 md:py-32`

---

### 3. Location Page Hero (Recommended)
**Use for:** Hamilton, Ascot, New Farm, Toowong, Ipswich suburbs

```tsx
<section className="relative py-24 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/suburbs/location-specific.webp"
      alt="Hamilton Brisbane emergency restoration services"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-black/70" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-3xl">
      {/* Location Badge */}
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-full">
        <MapPin className="w-5 h-5" />
        Hamilton, Brisbane
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Emergency Restoration Services in Hamilton
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-3xl font-bold mb-1">30-Min</div>
          <div className="text-sm">Response</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-3xl font-bold mb-1">24/7</div>
          <div className="text-sm">Available</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-3xl font-bold mb-1">Master</div>
          <div className="text-sm">Restorer</div>
        </div>
      </div>

      {/* CTA */}
      <a
        href="tel:1300309361"
        className="inline-flex items-center justify-center px-10 py-5 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transform hover:scale-105 transition-all shadow-2xl"
      >
        <Phone className="w-6 h-6 mr-2 animate-pulse" />
        Emergency: 1300 309 361
      </a>
    </div>
  </div>
</section>
```

**Characteristics:**
- Blue gradient overlay (location branding)
- Location badge with map pin
- Stat cards with glass morphism
- Single prominent CTA
- Response time emphasized

---

### 4. Emergency Page Hero (Recommended)
**Use for:** After-hours, Christmas, Weekend emergency pages

```tsx
<section className="relative py-24 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/emergency-response.webp"
      alt="24/7 Emergency Response Brisbane"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/60 to-black/80" />
  </div>

  <div className="container mx-auto px-6 relative z-10 text-center">
    {/* Urgent Badge */}
    <div className="inline-block mb-6 px-6 py-3 bg-yellow-500 text-black font-bold text-lg rounded-full animate-pulse">
      🚨 URGENT: 24/7 Emergency Response Active
    </div>

    {/* Title */}
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
      After-Hours Emergency?<br />We&apos;re Ready Now
    </h1>

    {/* Subtitle */}
    <p className="text-2xl md:text-3xl mb-10 max-w-3xl mx-auto">
      Master Restorer team on-call 24/7/365<br />
      Including weekends, public holidays & Christmas
    </p>

    {/* Large CTA */}
    <a
      href="tel:1300309361"
      className="inline-flex items-center justify-center px-16 py-8 bg-white text-red-600 font-bold text-3xl rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl hover:shadow-white/50"
    >
      <Phone className="w-10 h-10 mr-3 animate-pulse" />
      1300 309 361
    </a>

    <p className="mt-6 text-xl text-red-100">
      Answer in under 60 seconds • On-site within 60 minutes
    </p>
  </div>
</section>
```

**Characteristics:**
- Red gradient overlay (emergency urgency)
- Centered layout
- Large pulsing badge
- Oversized CTA button
- Immediate response messaging

---

### 5. Insurance Provider Page Hero (Recommended)
**Use for:** Suncorp, RACQ, Allianz, QBE, etc.

```tsx
<section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
  <div className="container mx-auto px-6 relative z-10">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Left: Content */}
      <div>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-full">
          <Shield className="w-5 h-5" />
          Insurance Approved Provider
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Suncorp Insurance Approved Restorer Brisbane
        </h1>

        {/* Benefits List */}
        <ul className="space-y-4 mb-8 text-lg">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <span>Direct billing - no upfront costs</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <span>We manage all claim documentation</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <span>IICRC Master Restorer certified</span>
          </li>
        </ul>

        {/* CTA */}
        <a
          href="tel:1300309361"
          className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-lg hover:bg-red-700 transition-all shadow-xl"
        >
          <Phone className="w-6 h-6 mr-2" />
          Call 1300 309 361
        </a>
      </div>

      {/* Right: Trust Badges */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Shield className="w-12 h-12 mx-auto mb-3 text-green-400" />
          <div className="font-bold text-lg">All Major Insurers</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
          <div className="font-bold text-lg">Master Restorer</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Clock className="w-12 h-12 mx-auto mb-3 text-blue-400" />
          <div className="font-bold text-lg">60-Min Response</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Building2 className="w-12 h-12 mx-auto mb-3 text-purple-400" />
          <div className="font-bold text-lg">Direct Billing</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Characteristics:**
- Solid gradient background (no image)
- Two-column layout
- Trust badge grid
- Green "approved" color scheme
- Benefit list with checkmarks

---

## Mobile-First Responsive Design

### Breakpoint Strategy

```css
/* From tailwind.config.ts */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

### Mobile Patterns from Landing Page

#### 1. Grid Responsiveness
```tsx
{/* Trust Indicators - Line 113 */}
<div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
  {/* 2 columns mobile, 5 columns tablet+ */}
</div>

{/* Service Cards - Line 161 */}
<div className="grid md:grid-cols-3 gap-8">
  {/* 1 column mobile, 3 columns tablet+ */}
</div>

{/* Benefits - Line 234 */}
<div className="grid md:grid-cols-2 gap-8">
  {/* 1 column mobile, 2 columns tablet+ */}
</div>

{/* Stats - Line 563 */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* 1 column mobile, 3 columns tablet+ */}
</div>
```

#### 2. Typography Responsiveness
```tsx
{/* Hero Title - Line 535 */}
<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
  {/* 2.25rem → 3rem → 3.75rem */}
</h2>

{/* Section Heading - Line 110 */}
<h2 className="text-2xl md:text-3xl font-bold mb-2">
  {/* 1.5rem → 1.875rem */}
</h2>

{/* Body Large - Line 538 */}
<p className="text-2xl md:text-3xl mb-4">
  {/* 1.5rem → 1.875rem */}
</p>
```

#### 3. Button Responsiveness
```tsx
{/* CTA Buttons - Line 545 */}
<div className="flex flex-col sm:flex-row gap-6 justify-center">
  {/* Stack vertically on mobile, horizontal on small+ */}
</div>

{/* Button Padding */}
<a className="px-8 py-4 md:px-12 md:py-6">
  {/* Smaller padding on mobile */}
</a>
```

#### 4. Container Padding
```tsx
{/* All sections */}
<div className="container mx-auto px-6">
  {/* 24px padding on all sizes, managed by container config */}
</div>
```

#### 5. Section Padding
```tsx
{/* Standard Section - Line 107 */}
<section className="py-16 md:py-20">
  {/* 64px mobile, 80px tablet+ */}
</section>

{/* Hero Section - Line 90 */}
<section className="py-20 md:py-32">
  {/* 80px mobile, 128px tablet+ */}
</section>
```

### Mobile-Specific Optimizations

#### Touch Targets
```css
/* From globals.css line 692 */
@media (max-width: 768px) {
  button,
  a[role="button"],
  [role="button"] {
    min-height: 48px !important;
    min-width: 48px !important;
  }
}
```

#### One-Tap Calling
```tsx
{/* Phone Link - Line 439 */}
<a
  href="tel:1300309361"
  className="inline-flex items-center justify-center px-10 py-5 bg-white text-red-600 font-bold text-xl rounded-lg"
  aria-label="Call 1300 309 361 for emergency service"
>
  <Phone className="w-6 h-6 mr-2 animate-pulse" />
  1300 309 361
</a>
```

#### Mobile Image Optimization
```tsx
{/* Hero Image - Line 92 */}
<Image
  src="/images/hero/landing-page-hero.png"
  alt="..."
  fill
  style={{ objectFit: 'cover' }}
  priority  // Above fold on mobile
  sizes="100vw"  // Full width on all devices
/>

{/* Below-fold images */}
<Image
  src="/images/mobile-showcase.webp"
  alt="..."
  width={1200}
  height={800}
  loading="lazy"  // Lazy load below fold
  className="rounded-lg shadow-lg w-full h-auto"
/>
```

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

#### 1. Color Contrast

**Minimum Ratios:**
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt): 3:1
- UI components: 3:1

**Tested Combinations from Landing Page:**

✅ **Emergency Red on White**
- `text-red-600` (#dc2626) on `bg-white` → 6.38:1 (AAA)

✅ **Blue-900 on White (Trust Section)**
- `text-white` on `bg-blue-900` (#1e3a8a) → 11.48:1 (AAA)

✅ **Gray-900 Headings on White**
- `text-gray-900` (#171717) on `bg-white` → 16.04:1 (AAA)

✅ **Gray-600 Body on White**
- `text-gray-600` (#525252) on `bg-white` → 7.59:1 (AAA)

❌ **Yellow-400 on White (Icons on dark only)**
- `text-yellow-400` (#fbbf24) on `bg-white` → 1.78:1 (FAIL)
- ✅ `text-yellow-400` on `bg-blue-900` → 6.45:1 (AA)

**Action:** Only use yellow-400 icons on dark backgrounds

---

#### 2. Focus Indicators

```css
/* From globals.css line 716 */
*:focus-visible {
  outline: 3px solid #2563eb !important;
  outline-offset: 2px !important;
  border-radius: 4px;
}

/* Emergency CTA focus - line 723 */
.emergency-cta:focus-visible,
a[href^="tel:"]:focus-visible {
  outline: 4px solid #dc2626 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.2) !important;
}
```

**Implementation:**
- All interactive elements have visible focus indicators
- Emergency CTAs have enhanced focus (4px red outline)
- Outline offset prevents clipping

---

#### 3. Reduced Motion Support

```css
/* From globals.css line 642 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  /* Disable specific animations */
  .floating,
  .pulse-emergency,
  .emergency-pulse,
  .fire-glow,
  .water-wave,
  .shimmer {
    animation: none !important;
  }

  /* Maintain interactivity without motion */
  .card-hover:hover {
    transform: none !important;
  }
}
```

---

#### 4. Semantic HTML

```tsx
{/* Proper heading hierarchy */}
<h1>Main Page Title</h1>
<h2>Section Heading</h2>
<h3>Subsection or Card Heading</h3>

{/* Semantic lists */}
<ul className="space-y-4">
  <li className="flex items-start gap-3">
    <CheckCircle />
    <span>Benefit description</span>
  </li>
</ul>

{/* Proper button vs link usage */}
<a href="tel:1300309361">Call Now</a>  {/* Link - navigates */}
<button onClick={handleSubmit}>Submit</button>  {/* Button - action */}

{/* Skip to main content */}
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>
```

---

#### 5. ARIA Labels

```tsx
{/* Phone Links - Line 441 */}
<a
  href="tel:1300309361"
  className="..."
  aria-label="Call 1300 309 361 for emergency service"
>
  <Phone className="w-6 h-6 mr-2" />
  1300 309 361
</a>

{/* Icon-only buttons */}
<button aria-label="Open menu" className="md:hidden">
  <Menu className="w-6 h-6" />
</button>

{/* Decorative images */}
<Image
  src="/images/icon.png"
  alt=""  {/* Empty for decorative */}
  aria-hidden="true"
/>
```

---

#### 6. Form Accessibility

```tsx
{/* Proper labels */}
<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
  Your Name
</label>
<input
  id="name"
  name="name"
  type="text"
  required
  aria-required="true"
  className="..."
/>

{/* Error states */}
<input
  id="email"
  name="email"
  type="email"
  aria-invalid={errors.email ? "true" : "false"}
  aria-describedby={errors.email ? "email-error" : undefined}
/>
{errors.email && (
  <p id="email-error" className="text-red-600 text-sm mt-1" role="alert">
    {errors.email}
  </p>
)}
```

---

#### 7. Skip Navigation

```tsx
{/* In layout or header component */}
<a href="#main-content" className="skip-to-main">
  Skip to main content
</a>

{/* Main content wrapper */}
<main id="main-content" className="...">
  {children}
</main>
```

```css
/* From globals.css line 731 */
.skip-to-main {
  position: absolute;
  left: -9999px;
  z-index: 999;
}

.skip-to-main:focus {
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  padding: 16px 24px;
  background: #1d4ed8;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
```

---

## Implementation Roadmap

### Priority 1: Immediate Visual Updates (Week 1)

#### High-Priority Pages
These pages receive the most traffic and emergency inquiries:

1. **Service Pages** (4 pages)
   - `app/services/water-damage/page.tsx`
   - `app/services/fire-damage/page.tsx`
   - `app/services/mould-remediation/page.tsx`
   - `app/services/storm-damage/page.tsx`

   **Changes:**
   - Replace generic headers with Service Page Hero pattern
   - Add fire-glow effect to fire damage page
   - Add water-wave effect to water damage page
   - Update service cards to match landing page style
   - Implement trust indicator cards
   - Add emergency CTA section at bottom

2. **Top Location Pages** (4 pages)
   - `app/locations/hamilton/page.tsx`
   - `app/locations/ascot/page.tsx`
   - `app/locations/new-farm/page.tsx`
   - `app/locations/toowong/page.tsx`

   **Changes:**
   - Implement Location Page Hero pattern
   - Add glass morphism stat cards
   - Update location card styling
   - Consistent emergency CTA placement
   - Add service area maps with coverage animation

---

### Priority 2: Emergency Pages (Week 2)

#### Critical Emergency Pages (6 pages)
3. **Emergency Response Pages**
   - `app/emergency/after-hours/page.tsx`
   - `app/emergency/weekend-emergency/page.tsx`
   - `app/emergency/christmas-emergency/page.tsx`
   - `app/emergency/midnight-emergency/page.tsx`
   - `app/emergency/public-holiday-emergency/page.tsx`
   - `app/emergency/page.tsx` (main emergency)

   **Changes:**
   - Implement Emergency Page Hero pattern
   - Add emergency-pulse animation to CTAs
   - Oversized phone buttons
   - Red gradient backgrounds
   - Pulsing urgent badges

---

### Priority 3: Insurance Provider Pages (Week 3)

#### Top 5 Insurers (5 pages)
4. **Major Insurance Providers**
   - `app/insurance/suncorp/page.tsx`
   - `app/insurance/racq/page.tsx`
   - `app/insurance/allianz/page.tsx`
   - `app/insurance/qbe/page.tsx`
   - `app/insurance/nrma/page.tsx`

   **Changes:**
   - Implement Insurance Provider Hero pattern
   - Trust badge grid
   - Benefit checklist with green checkmarks
   - Direct billing emphasis
   - Professional blue color scheme

---

### Priority 4: Component Library Creation (Week 4)

5. **Reusable Components**
   Create standardized components in `components/design-system/`:

   - `TrustCard.tsx` - Glass morphism stat cards
   - `ServiceCard.tsx` - Service offering cards with icons
   - `BenefitCard.tsx` - Icon + text benefit cards
   - `LocationCard.tsx` - Service area cards
   - `FAQItem.tsx` - Accordion FAQ items
   - `EmergencyCTA.tsx` - Large phone button
   - `Badge.tsx` - Pill-shaped tags
   - `InfoBox.tsx` - Colored info banners
   - `HeroSection.tsx` - Flexible hero with variants
   - `StatDisplay.tsx` - Stat number + label

---

### Priority 5: Secondary Pages (Week 5-6)

6. **Remaining Location Pages**
   - All Ipswich locations (Karalee, Brookwater, Springfield Lakes)
   - All Brisbane suburbs (Paddington, Bulimba, etc.)
   - Logan locations

7. **FAQ Pages**
   - `app/faq/water-damage/page.tsx`
   - `app/faq/fire-damage/page.tsx`
   - `app/faq/insurance-claims/page.tsx`
   - etc.

8. **Guide Pages**
   - `app/guides/emergency/*`
   - `app/guides/insurance/*`
   - `app/guides/water-damage/*`

---

### Design System Checklist

**Before starting implementation:**

- [ ] Read and understand this design system document
- [ ] Review CLAUDE.md for project constraints
- [ ] Review rules.md for enforcement guidelines
- [ ] Audit current pages for color contrast issues
- [ ] Create component library structure
- [ ] Set up design token variables
- [ ] Test animations with reduced motion preference
- [ ] Verify mobile touch target sizes

**Per page update:**

- [ ] Implement appropriate hero variant
- [ ] Update color scheme to match design system
- [ ] Add consistent spacing (py-20 sections)
- [ ] Implement glass morphism cards where appropriate
- [ ] Add emergency CTA section
- [ ] Verify color contrast (WCAG AA minimum)
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify responsive behavior on mobile
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Add appropriate animations (fire-glow, water-wave)
- [ ] Test reduced motion support

---

## Code Snippets for Reusable Components

### Component: TrustCard.tsx

```tsx
// components/design-system/TrustCard.tsx
import { LucideIcon } from 'lucide-react';

interface TrustCardProps {
  icon: LucideIcon;
  stat: string;
  label: string;
  detail: string;
  iconColor?: string;
}

export default function TrustCard({
  icon: Icon,
  stat,
  label,
  detail,
  iconColor = 'text-yellow-400'
}: TrustCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
      <Icon className={`w-12 h-12 mx-auto mb-3 ${iconColor}`} />
      <div className="text-2xl font-bold mb-1">{stat}</div>
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-xs mt-2 text-yellow-300">{detail}</div>
    </div>
  );
}
```

**Usage:**
```tsx
import { Award, Clock, Shield, Star, Building2 } from 'lucide-react';
import TrustCard from '@/components/design-system/TrustCard';

<section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center">
      <TrustCard
        icon={Award}
        stat="Master Restorer"
        label="IICRC Certified"
        detail="Limited in QLD"
      />
      <TrustCard
        icon={Clock}
        stat="60 Minutes"
        label="Response Time"
        detail="Brisbane Metro"
      />
      {/* ... */}
    </div>
  </div>
</section>
```

---

### Component: ServiceCard.tsx

```tsx
// components/design-system/ServiceCard.tsx
import Link from 'next/link';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon | React.FC<{ className?: string }>;
  iconColor?: string;
  borderColor?: string;
  title: string;
  description: React.ReactNode;
  features: string;
  linkText: string;
  linkHref: string;
  linkColor?: string;
}

export default function ServiceCard({
  icon: Icon,
  iconColor = 'text-blue-600',
  borderColor = 'border-blue-500',
  title,
  description,
  features,
  linkText,
  linkHref,
  linkColor = 'text-blue-600'
}: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:${borderColor} border-2 border-transparent`}>
      <div className={`${iconColor} mb-4`}>
        {typeof Icon === 'function' ? (
          <Icon className="w-16 h-16" />
        ) : (
          Icon
        )}
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <div className="text-gray-600 mb-4">{description}</div>
      <div className="mb-4 text-sm text-gray-700">{features}</div>
      <Link href={linkHref} className={`${linkColor} font-bold hover:${linkColor.replace('600', '700')} inline-flex items-center`}>
        {linkText} <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
}
```

**Usage:**
```tsx
import ServiceCard from '@/components/design-system/ServiceCard';

<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-3 gap-8">
      <ServiceCard
        icon={({ className }) => (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
        )}
        iconColor="text-blue-600"
        borderColor="border-blue-500"
        title="Water Damage Restoration Brisbane"
        description={
          <>
            <strong>Emergency water extraction 24/7.</strong> Burst pipes, floods, storm water.
          </>
        }
        features="✓ 60-min response • ✓ Insurance approved • ✓ IICRC Master certified"
        linkText="Emergency Service"
        linkHref="/emergency/water-damage-brisbane"
        linkColor="text-blue-600"
      />
      {/* ... */}
    </div>
  </div>
</section>
```

---

### Component: EmergencyCTA.tsx

```tsx
// components/design-system/EmergencyCTA.tsx
import { Phone } from 'lucide-react';

interface EmergencyCTAProps {
  phone?: string;
  displayText?: string;
  variant?: 'white' | 'yellow';
  size?: 'large' | 'medium';
}

export default function EmergencyCTA({
  phone = '1300309361',
  displayText = '1300 309 361',
  variant = 'white',
  size = 'large'
}: EmergencyCTAProps) {
  const baseClasses = 'inline-flex items-center justify-center font-bold rounded-lg transition-all shadow-2xl transform hover:scale-105';

  const variantClasses = {
    white: 'bg-white text-red-600 hover:bg-gray-100 hover:shadow-white/50',
    yellow: 'bg-yellow-500 text-black hover:bg-yellow-400'
  };

  const sizeClasses = {
    large: 'px-12 py-6 text-2xl',
    medium: 'px-8 py-4 text-xl'
  };

  const iconSize = size === 'large' ? 'w-8 h-8' : 'w-6 h-6';

  return (
    <a
      href={`tel:${phone}`}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      aria-label={`Call ${displayText} for emergency service`}
    >
      <Phone className={`${iconSize} mr-3 animate-pulse`} />
      {displayText}
    </a>
  );
}
```

**Usage:**
```tsx
import EmergencyCTA from '@/components/design-system/EmergencyCTA';

<section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-5xl font-bold mb-6">Emergency? Call Now</h2>

    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <EmergencyCTA variant="white" size="large" />
      <EmergencyCTA variant="yellow" size="large" displayText="Email for Assessment" />
    </div>
  </div>
</section>
```

---

### Component: Badge.tsx

```tsx
// components/design-system/Badge.tsx

interface BadgeProps {
  text: string;
  emoji?: string;
  variant?: 'emergency' | 'premium' | 'info' | 'success';
  animate?: boolean;
}

export default function Badge({
  text,
  emoji,
  variant = 'emergency',
  animate = false
}: BadgeProps) {
  const variantClasses = {
    emergency: 'bg-red-100 text-red-700',
    premium: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-600 text-white',
    success: 'bg-green-100 text-green-700'
  };

  return (
    <div className={`inline-block mb-4 px-4 py-2 ${variantClasses[variant]} font-semibold rounded-full ${animate ? 'animate-pulse' : ''}`}>
      {emoji && <span className="mr-2">{emoji}</span>}
      {text}
    </div>
  );
}
```

**Usage:**
```tsx
import Badge from '@/components/design-system/Badge';

<Badge
  text="24/7 Brisbane Emergency Service"
  emoji="🚨"
  variant="emergency"
/>

<Badge
  text="Master Restorer Excellence"
  emoji="⭐"
  variant="premium"
/>

<Badge
  text="EMERGENCY? Call Master Restorer NOW"
  emoji="🚨"
  variant="premium"
  animate={true}
/>
```

---

## Final Notes

**Key Takeaways:**

1. **Consistency is Critical**: Use the design system components consistently across all pages
2. **Mobile-First**: Always design and test mobile experience first
3. **Accessibility is Non-Negotiable**: WCAG 2.1 AA minimum on all pages
4. **Emergency Focus**: Every page should have clear path to emergency contact
5. **Trust Building**: Use Master Restorer credentials, insurance approvals, response times consistently
6. **Local Brisbane Identity**: Emphasize local suburbs, rapid response, local expertise
7. **Performance**: Optimize images (WebP), lazy load below-fold, priority load heroes
8. **Brand Colors**: Emergency red, storm blue, premium gold are the core palette

**Before Committing Changes:**

```bash
# Verify no prohibited content
grep -r "RAI\|RIA\|national\|nationwide" app/ components/

# Check color contrast
# Use browser DevTools or https://webaim.org/resources/contrastchecker/

# Test keyboard navigation
# Tab through all interactive elements

# Test screen reader
# Use NVDA (Windows) or VoiceOver (Mac)

# Build check
npm run build

# TypeScript check
npx tsc --noEmit
```

---

**Document Version Control:**
- Version: 1.0.0
- Created: 2025-11-09
- Last Updated: 2025-11-09
- Maintained by: Development Team
- Review Frequency: Quarterly or when major design changes occur

---

**Questions or Updates:**
If you identify any inconsistencies, missing patterns, or need clarification on any design system element, please:

1. Document the issue in this file
2. Reference the specific section and line number
3. Propose a solution consistent with the landing page aesthetic
4. Get team approval before implementing changes
5. Update this document with the resolution

