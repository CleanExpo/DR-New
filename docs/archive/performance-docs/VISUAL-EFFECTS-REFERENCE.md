# Visual Effects Reference Guide

**Project:** Disaster Recovery Brisbane
**Purpose:** Quick reference for implementing visual effects from the landing page design system
**Source:** `app/page.tsx` + `app/globals.css`

---

## Table of Contents

1. [Hero Image Overlays](#hero-image-overlays)
2. [Gradient Backgrounds](#gradient-backgrounds)
3. [Glass Morphism Cards](#glass-morphism-cards)
4. [Hover Effects](#hover-effects)
5. [Animations](#animations)
6. [Emergency Visual Effects](#emergency-visual-effects)
7. [Shadow Patterns](#shadow-patterns)
8. [Service-Specific Effects](#service-specific-effects)

---

## Hero Image Overlays

### Standard Hero Overlay
**Use Case:** Service pages, location pages, most hero sections
**Opacity:** 20% black overlay for image clarity with text overlay

```tsx
<section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center text-white">
  {/* Image Layer */}
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/your-hero-image.webp"
      alt="Descriptive alt text"
      fill
      style={{ objectFit: 'cover' }}
      priority
      sizes="100vw"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/20" />
  </div>

  {/* Content Layer */}
  <div className="container mx-auto px-6 relative z-10">
    <h1 className="text-4xl md:text-6xl font-bold">Your Title</h1>
  </div>
</section>
```

**Key Points:**
- `absolute inset-0 z-0` - Image fills entire section
- `bg-black/20` - 20% opacity black overlay
- `relative z-10` - Content layer above image
- `priority` - Above-fold image loads first

---

### Dark Gradient Overlay (High Contrast)
**Use Case:** Service pages where text overlay needs high readability

```tsx
<section className="relative py-20 md:py-32 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/service-hero.webp"
      alt="Service description"
      fill
      className="object-cover"
      priority
    />
    {/* Dark gradient overlay - darker at edges */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    {/* High contrast content */}
  </div>
</section>
```

**Gradient Breakdown:**
- `from-black/60` - 60% opacity on left edge
- `via-black/40` - 40% opacity in center
- `to-black/60` - 60% opacity on right edge

---

### Emergency Red Gradient Overlay
**Use Case:** Emergency pages, urgent CTAs

```tsx
<section className="relative py-24 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/hero/emergency.webp"
      alt="Emergency response"
      fill
      className="object-cover"
      priority
    />
    {/* Red gradient for urgency */}
    <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/60 to-black/80" />
  </div>

  <div className="container mx-auto px-6 relative z-10 text-center">
    {/* Emergency content */}
  </div>
</section>
```

**Effect:** Creates dramatic red storm effect with black corners

---

### Blue Location Gradient
**Use Case:** Location pages (Brisbane suburbs)

```tsx
<section className="relative py-24 text-white overflow-hidden">
  <div className="absolute inset-0 z-0">
    <Image
      src="/images/suburbs/location.webp"
      alt="Location name"
      fill
      className="object-cover"
      priority
    />
    {/* Blue gradient for Brisbane branding */}
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-900/50 to-black/70" />
  </div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Location content */}
  </div>
</section>
```

**Effect:** Professional blue overlay with darker bottom

---

## Gradient Backgrounds

### Trust Indicator Section (Storm Blue)
**From:** Landing page line 107
**Use Case:** Trust badges, credentials section

```tsx
<section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
  <div className="container mx-auto px-6">
    {/* Trust indicator content */}
  </div>
</section>
```

**CSS Equivalent:**
```css
background: linear-gradient(to right, #1e3a8a, #1e40af, #1e3a8a);
```

**Visual Effect:** Deep storm blue with lighter center, creates depth

---

### Service Areas Section (Subtle Gray)
**From:** Landing page line 287
**Use Case:** Location listings, secondary sections

```tsx
<section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="container mx-auto px-6">
    {/* Service area content */}
  </div>
</section>
```

**CSS Equivalent:**
```css
background: linear-gradient(to bottom right, #fafafa, #f5f5f5);
```

**Visual Effect:** Subtle gray gradient for depth without distraction

---

### Mobile Showcase Section (Light Blue)
**From:** Landing page line 353
**Use Case:** Feature highlights, mobile-specific sections

```tsx
<section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
  <div className="container mx-auto px-6">
    {/* Feature content */}
  </div>
</section>
```

**CSS Equivalent:**
```css
background: linear-gradient(to bottom right, #eff6ff, #dbeafe);
```

**Visual Effect:** Light, approachable blue for informational sections

---

### Emergency CTA Section (Red Storm)
**From:** Landing page line 528
**Use Case:** Final CTA, emergency contact sections

```tsx
<section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
  {/* Optional additional overlay */}
  <div className="absolute inset-0 bg-black/20"></div>

  <div className="container mx-auto px-6 relative z-10">
    {/* Emergency CTA content */}
  </div>
</section>
```

**CSS Equivalent:**
```css
background: linear-gradient(to bottom right, #dc2626, #b91c1c, #991b1b);
```

**Visual Effect:** Dramatic red gradient with darker bottom-right corner

---

## Glass Morphism Cards

### Trust Indicator Card
**From:** Landing page line 114
**Use Case:** Stat cards on dark backgrounds

```tsx
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
  <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
  <div className="text-2xl font-bold mb-1">Master Restorer</div>
  <div className="text-sm opacity-90">IICRC Certified</div>
  <div className="text-xs mt-2 text-yellow-300">Limited in QLD</div>
</div>
```

**CSS Breakdown:**
```css
/* Resting state */
background: rgba(255, 255, 255, 0.1);  /* 10% white */
backdrop-filter: blur(4px);
border-radius: 0.5rem;
padding: 1.5rem;

/* Hover state */
background: rgba(255, 255, 255, 0.2);  /* 20% white */
```

**Effect:** Frosted glass effect that brightens on hover

---

### Full Glass Morphism Effect
**From:** globals.css line 170
**Use Case:** Overlays, modals, floating elements

```tsx
<div className="glass rounded-xl p-8">
  {/* Content */}
</div>
```

```css
/* Add to globals.css or Tailwind config */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

**Effect:** Strong frosted glass with visible border

---

## Hover Effects

### Card Lift on Hover
**From:** Landing page service cards line 162

```tsx
<div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all hover:border-2 hover:border-blue-500 border-2 border-transparent">
  {/* Card content */}
</div>
```

**Effect Breakdown:**
- Shadow increases: `shadow-lg` → `shadow-xl`
- Border appears: `transparent` → `border-blue-500`
- `transition-all` - Smooth animation

**Enhanced Version with Transform:**
```tsx
<div className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:border-2 hover:border-blue-500 border-2 border-transparent transition-all hover:-translate-y-2">
  {/* Card content - lifts up on hover */}
</div>
```

---

### Button Scale on Hover
**From:** Landing page CTA buttons line 548

```tsx
<a
  href="tel:1300309361"
  className="inline-flex items-center justify-center px-12 py-6 bg-white text-red-600 font-bold text-2xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
>
  <Phone className="w-8 h-8 mr-3 animate-pulse" />
  1300 309 361
</a>
```

**Effect:**
- `transform hover:scale-105` - Grows to 105% size
- `shadow-2xl hover:shadow-white/50` - Shadow changes color
- `hover:bg-gray-100` - Background lightens

---

### Advanced Card Hover (3D Lift)
**From:** globals.css line 82

```tsx
<div className="card-hover bg-white rounded-lg p-6">
  {/* Card content */}
</div>
```

```css
/* Add to globals.css */
.card-hover {
  transition: all 0.3s ease-in-out;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.card-hover:hover {
  transform: translateY(-8px) rotateX(-2deg);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 10px 10px rgba(0, 0, 0, 0.05);
}
```

**Effect:** Card lifts and tilts slightly on hover (3D effect)

---

## Animations

### Phone Icon Pulse (Emergency)
**From:** Landing page line 443, 551

```tsx
<Phone className="w-6 h-6 mr-2 animate-pulse" />
```

**Built-in Tailwind Animation:**
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Apply with animate-pulse class */
```

**Effect:** Icon fades in and out continuously

---

### Badge Pulse
**From:** Landing page line 532

```tsx
<div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full animate-pulse">
  🚨 EMERGENCY? Call Master Restorer NOW
</div>
```

**Effect:** Entire badge pulses to grab attention

---

### Arrow Rotation (FAQ Accordion)
**From:** Landing page line 467

```tsx
<details className="group">
  <summary className="flex items-center justify-between">
    <span>FAQ Question</span>
    <ArrowRight className="w-5 h-5 group-open:rotate-90 transition-transform" />
  </summary>
  <p className="mt-4">FAQ Answer</p>
</details>
```

**Effect:** Arrow rotates 90° when accordion opens
**Key:** `group` class on parent, `group-open:rotate-90` on icon

---

### Stagger Animation (List Items)
**From:** globals.css line 270

```tsx
<div>
  {items.map((item, index) => (
    <div key={index} className="stagger-item" style={{ animationDelay: `${index * 0.1}s` }}>
      {item}
    </div>
  ))}
</div>
```

```css
/* Add to globals.css */
.stagger-item {
  opacity: 0;
  transform: translateX(-20px);
  animation: staggerIn 0.4s forwards;
}

@keyframes staggerIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

**Effect:** Items slide in from left one after another

---

## Emergency Visual Effects

### Emergency Pulse (Red Glow)
**From:** globals.css line 404

```tsx
<button className="emergency-pulse px-8 py-4 rounded-lg text-white font-bold">
  Call Now
</button>
```

```css
/* Add to globals.css */
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

**Effect:** Red button with pulsing ring shadow

---

### Emergency Response Animation
**From:** globals.css line 464

```tsx
<div className="emergency-response bg-red-600 text-white px-6 py-4 rounded-lg inline-block">
  24/7 Emergency Available
</div>
```

```css
/* Add to globals.css */
.emergency-response {
  animation: emergencyResponse 2s infinite;
}

@keyframes emergencyResponse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7);
  }
  25% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0.3);
  }
  50% {
    transform: scale(1.1);
    box-shadow: 0 0 0 20px rgba(220, 38, 38, 0.1);
  }
  75% {
    transform: scale(1.05);
    box-shadow: 0 0 0 10px rgba(220, 38, 38, 0.3);
  }
}
```

**Effect:** Element scales up and down with expanding shadow ring

---

### 24/7 Availability Glow
**From:** globals.css line 488

```tsx
<span className="available-247 font-bold text-lg">
  24/7 Available
</span>
```

```css
/* Add to globals.css */
.available-247 {
  animation: available247 3s infinite;
}

@keyframes available247 {
  0%, 100% {
    color: #10b981;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
  50% {
    color: #059669;
    text-shadow: 0 0 20px rgba(16, 185, 129, 0.8);
  }
}
```

**Effect:** Green text with pulsing glow (always-available indicator)

---

## Service-Specific Effects

### Water Wave Effect
**From:** globals.css line 420
**Use Case:** Water damage pages, flood restoration sections

```tsx
<div className="water-wave relative overflow-hidden rounded-lg p-8 bg-blue-600 text-white">
  <h3>Water Damage Restoration</h3>
  <p>Emergency water extraction services...</p>
</div>
```

```css
/* Add to globals.css */
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

**Effect:** Animated wave of light flowing across element (like water moving)

---

### Fire Glow Effect
**From:** globals.css line 442
**Use Case:** Fire damage pages, smoke restoration sections

```tsx
<div className="fire-glow relative overflow-hidden rounded-lg p-8 bg-red-600 text-white">
  <h3>Fire Damage Restoration</h3>
  <p>Complete fire and smoke damage restoration...</p>
</div>
```

```css
/* Add to globals.css */
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

**Effect:** Pulsing radial glow that flickers like fire

---

### Shimmer Effect (Loading/Premium)
**From:** globals.css line 139
**Use Case:** Premium services, loading states

```tsx
<div className="shimmer relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-8">
  <h3>Premium Master Restorer Service</h3>
</div>
```

```css
/* Add to globals.css */
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

**Effect:** Light sheen moves across element (premium/highlight effect)

---

## Shadow Patterns

### Shadow Hierarchy
**From:** Design system analysis

```tsx
{/* Subtle - Resting state for small cards */}
<div className="shadow-sm">...</div>

{/* Standard - Default card shadow */}
<div className="shadow-lg">...</div>

{/* Elevated - Hover state for cards */}
<div className="shadow-xl">...</div>

{/* Dramatic - Emergency CTAs */}
<div className="shadow-2xl">...</div>
```

**CSS Values:**
```css
.shadow-sm {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

---

### Colored Shadows (Emergency CTA)
**From:** Landing page line 548

```tsx
<a
  href="tel:1300309361"
  className="... shadow-2xl hover:shadow-white/50"
>
  Call Now
</a>
```

**Effect on red background:**
```css
/* Resting */
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

/* Hover */
box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
```

**Result:** Shadow changes from dark to white glow on hover

---

### Glow Shadow (Focus State)
**From:** globals.css line 322

```tsx
<input
  type="text"
  className="focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
```

**Or custom:**
```css
input:focus {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(37, 99, 235, 0.1),
    0 0 20px rgba(37, 99, 235, 0.2);
}
```

**Effect:** Blue glow around focused input

---

## Complete Example: Service Card with All Effects

```tsx
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function WaterDamageServiceCard() {
  return (
    <div className="water-wave bg-white rounded-lg p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 hover:border-2 hover:border-blue-500 border-2 border-transparent transition-all">
      {/* Icon */}
      <div className="text-blue-600 mb-4">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold mb-3">Water Damage Restoration Brisbane</h3>

      {/* Description */}
      <p className="text-gray-600 mb-4">
        <strong>Emergency water extraction 24/7.</strong> Burst pipes, floods, storm water in Hamilton, Ascot, New Farm, Toowong.
      </p>

      {/* Features */}
      <div className="mb-4 text-sm text-gray-700">
        ✓ 60-min response • ✓ Insurance approved • ✓ IICRC Master certified
      </div>

      {/* Link */}
      <Link
        href="/emergency/water-damage-brisbane"
        className="text-blue-600 font-bold hover:text-blue-700 inline-flex items-center"
      >
        Emergency Service <ArrowRight className="w-4 h-4 ml-1" />
      </Link>
    </div>
  );
}
```

**Effects Used:**
1. `water-wave` - Animated water flow effect
2. `hover:-translate-y-2` - Lifts on hover
3. `hover:shadow-xl` - Shadow increases
4. `hover:border-blue-500` - Border appears
5. `transition-all` - Smooth animations

---

## Accessibility Considerations

### Reduced Motion Support
**Critical:** All animations must respect user preferences

```css
/* Add to globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Disable specific effects */
  .water-wave::before,
  .fire-glow::before,
  .shimmer::after,
  .emergency-pulse {
    animation: none !important;
  }

  /* Keep interactivity, remove motion */
  .card-hover:hover {
    transform: none !important;
  }
}
```

---

### Focus Visible Indicators
**Required:** All interactive elements need visible focus

```css
/* Add to globals.css */
*:focus-visible {
  outline: 3px solid #2563eb !important;
  outline-offset: 2px !important;
  border-radius: 4px;
}

/* Emergency CTAs get enhanced focus */
a[href^="tel:"]:focus-visible {
  outline: 4px solid #dc2626 !important;
  outline-offset: 3px !important;
  box-shadow: 0 0 0 6px rgba(220, 38, 38, 0.2) !important;
}
```

---

## Quick Copy-Paste Snippets

### Emergency CTA Section (Complete)
```tsx
<section className="py-20 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
  <div className="absolute inset-0 bg-black/20"></div>
  <div className="container mx-auto px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <div className="inline-block mb-4 px-6 py-2 bg-yellow-500 text-black font-bold rounded-full animate-pulse">
        🚨 EMERGENCY? Call Master Restorer NOW
      </div>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
        Brisbane Water or Fire Damage Emergency?
      </h2>
      <p className="text-2xl md:text-3xl mb-4 text-red-100 font-semibold">
        Every Minute Counts - Don't Wait
      </p>

      <a
        href="tel:1300309361"
        className="inline-flex items-center justify-center px-12 py-6 bg-white text-red-600 font-bold text-2xl rounded-lg hover:bg-gray-100 transition-all shadow-2xl hover:shadow-white/50 transform hover:scale-105"
      >
        <Phone className="w-8 h-8 mr-3 animate-pulse" />
        1300 309 361
      </a>
    </div>
  </div>
</section>
```

---

### Trust Indicators Section (Complete)
```tsx
<section className="py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
  <div className="container mx-auto px-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Why Brisbane Trusts Phill McGurk</h2>
      <p className="text-blue-200">Master Restorer Credentials • Proven Track Record • 24/7 Availability</p>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 text-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all">
        <Award className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
        <div className="text-2xl font-bold mb-1">Master Restorer</div>
        <div className="text-sm opacity-90">IICRC Certified</div>
        <div className="text-xs mt-2 text-yellow-300">Limited in QLD</div>
      </div>
      {/* Repeat for other trust indicators */}
    </div>
  </div>
</section>
```

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-09
**Reference:** See `DESIGN-SYSTEM.md` for complete specifications

