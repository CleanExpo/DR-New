# DR-New Design System - Usage Guidelines

## Table of Contents
1. [Core Principles](#core-principles)
2. [Visual Identity](#visual-identity)
3. [Emergency Response Design Language](#emergency-response-design-language)
4. [Component Usage](#component-usage)
5. [Accessibility Standards](#accessibility-standards)
6. [Performance Guidelines](#performance-guidelines)
7. [Mobile-First Approach](#mobile-first-approach)
8. [Brand Voice & Tone](#brand-voice--tone)
9. [Implementation Checklist](#implementation-checklist)

---

## Core Principles

### 1. Trust Through Clarity
- **Clear Information Hierarchy**: Emergency information must be immediately visible
- **Transparent Pricing**: Display service costs and estimates clearly
- **Professional Imagery**: Use high-quality, authentic photos of actual work
- **Credentials Display**: Show certifications, insurance, and accreditations prominently

### 2. Speed & Accessibility
- **Fast Load Times**: Critical information loads under 2 seconds
- **One-Click Actions**: Emergency contact within one tap/click from any page
- **Progressive Disclosure**: Show essential info first, details on demand
- **Universal Access**: WCAG 2.1 AA compliance minimum

### 3. Crisis-Appropriate Design
- **Calm Confidence**: Avoid panic-inducing elements while maintaining urgency
- **Empathetic Language**: Acknowledge the stress of disaster situations
- **Clear Next Steps**: Always provide obvious action paths
- **24/7 Availability**: Emphasize round-the-clock service visually

---

## Visual Identity

### Color Usage Hierarchy

```
EMERGENCY SITUATIONS (Highest Priority)
├── Emergency Red (#dc2626) - Immediate action CTAs
├── Primary Blue (#2563eb) - Trust and main navigation
└── Success Green (#16a34a) - Positive outcomes, testimonials

INFORMATION HIERARCHY
├── Neutral 900 (#171717) - Critical headings
├── Neutral 800 (#262626) - Important headings
├── Neutral 700 (#404040) - Body text
├── Neutral 600 (#525252) - Secondary text
└── Neutral 500 (#737373) - Tertiary text
└── Neutral 400 (#a3a3a3) - Placeholder text
```

### Typography Scale

#### Desktop Typography
```
Hero Headlines: 60px (3.75rem) - Bold
H1: 48px (3rem) - Bold
H2: 36px (2.25rem) - Semibold
H3: 30px (1.875rem) - Semibold
H4: 24px (1.5rem) - Medium
Body: 18px (1.125rem) - Regular
Small: 14px (0.875rem) - Regular
```

#### Mobile Typography
```
Hero Headlines: 36px (2.25rem) - Bold
H1: 32px (2rem) - Bold
H2: 28px (1.75rem) - Semibold
H3: 24px (1.5rem) - Semibold
H4: 20px (1.25rem) - Medium
Body: 16px (1rem) - Regular
Small: 14px (0.875rem) - Regular
```

### Spacing System

Use consistent spacing based on 4px grid:
```
xs: 4px   - Tight grouping
sm: 8px   - Related elements
md: 16px  - Default spacing
lg: 24px  - Section spacing
xl: 32px  - Major sections
2xl: 48px - Page sections
3xl: 64px - Hero spacing
```

---

## Emergency Response Design Language

### Visual Urgency Levels

#### Level 1: Immediate Emergency
- **Color**: Emergency Red (#dc2626)
- **Animation**: Pulse effect on CTAs
- **Position**: Fixed/sticky positioning
- **Size**: Minimum 48px touch targets
- **Example**: "Call Now - 24/7 Emergency Response"

#### Level 2: Urgent Action
- **Color**: Primary Blue (#2563eb)
- **Animation**: Subtle hover effects
- **Position**: Prominent placement
- **Size**: Standard 44px touch targets
- **Example**: "Get Free Quote", "Book Assessment"

#### Level 3: Information
- **Color**: Neutral tones
- **Animation**: None
- **Position**: Standard flow
- **Size**: Standard sizing
- **Example**: Service descriptions, process steps

### Emergency Component Patterns

#### Emergency Contact Bar
```jsx
<div className="emergency-bar">
  <PhoneIcon className="pulse" />
  <span className="emergency-text">24/7 Emergency</span>
  <a href="tel:1300309361" className="emergency-number">
    1300 309 361
  </a>
</div>
```

#### Crisis Response Card
```jsx
<Card variant="emergency" className="shadow-emergency">
  <Badge variant="emergencyPulse">URGENT</Badge>
  <h3>Water Damage Emergency?</h3>
  <p>Act fast to prevent further damage</p>
  <Button variant="emergency" size="lg">
    Get Immediate Help
  </Button>
</Card>
```

---

## Component Usage

### Button Hierarchy

1. **Emergency Button** - One per viewport
   - Use for: Primary emergency CTAs
   - Color: Emergency Red (#dc2626)
   - Minimum size: 48px height
   - Include pulse animation for critical actions

2. **Primary Button** - 1-2 per section
   - Use for: Main actions (quotes, bookings)
   - Color: Primary Blue (#2563eb)
   - Minimum size: 44px height

3. **Secondary Button** - As needed
   - Use for: Alternative actions
   - Style: Outlined
   - Minimum size: 44px height

4. **Ghost Button** - Supporting actions
   - Use for: Less important actions
   - Style: Transparent background
   - Minimum size: 44px height

### Card Patterns

#### Service Card
```jsx
<Card variant="service">
  <Image src="/service-image.jpg" alt="Service description" />
  <CardContent>
    <Badge>24/7 Available</Badge>
    <h3>Water Damage Restoration</h3>
    <p>Professional water extraction and drying services</p>
    <Button variant="primary">Learn More</Button>
  </CardContent>
</Card>
```

#### Testimonial Card
```jsx
<Card variant="testimonial">
  <Quote>"Saved our home after flooding..."</Quote>
  <Author>
    <Avatar src="/customer.jpg" />
    <div>
      <Name>John Smith</Name>
      <Location>Brisbane</Location>
    </div>
  </Author>
</Card>
```

### Form Patterns

#### Emergency Contact Form
```jsx
<Form className="emergency-form">
  <Input
    type="tel"
    label="Phone Number"
    required
    autoComplete="tel"
    inputMode="tel"
  />
  <Select label="Emergency Type" required>
    <option>Water Damage</option>
    <option>Fire Damage</option>
    <option>Storm Damage</option>
  </Select>
  <Textarea
    label="Describe Your Emergency"
    rows={3}
  />
  <Button variant="emergency" size="lg" fullWidth>
    Get Immediate Help
  </Button>
</Form>
```

---

## Accessibility Standards

### WCAG 2.1 AA Requirements

#### Color Contrast
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- Emergency elements: 7:1 recommended
- Interactive elements: 3:1 minimum

#### Keyboard Navigation
- All interactive elements keyboard accessible
- Visible focus indicators (2px minimum)
- Logical tab order
- Skip navigation links

#### Touch Targets
- Minimum size: 44x44px (iOS standard)
- Recommended: 48x48px (Material Design)
- Spacing: 8px minimum between targets
- Emergency buttons: 48x48px minimum

#### Screen Reader Support
```html
<!-- Emergency button example -->
<button
  aria-label="Call emergency hotline 1300 309 361"
  aria-describedby="emergency-description"
>
  <span aria-hidden="true">📞</span>
  Emergency Call
</button>
<span id="emergency-description" className="sr-only">
  24/7 emergency response available. Calls answered immediately.
</span>
```

### Mobile Accessibility

#### Viewport Settings
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5">
```

#### Input Optimization
```html
<!-- Phone input -->
<input type="tel" inputMode="tel" autoComplete="tel" />

<!-- Email input -->
<input type="email" inputMode="email" autoComplete="email" />

<!-- Numeric input -->
<input type="text" inputMode="numeric" pattern="[0-9]*" />
```

---

## Performance Guidelines

### Critical Rendering Path

#### Above-the-fold priorities
1. Emergency contact information
2. Hero image (optimized, lazy-load rest)
3. Primary headline and CTA
4. Trust indicators (certifications)

#### Performance Budgets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Total page weight: < 2MB

### Image Optimization

#### Format Guidelines
```jsx
// Use Next.js Image component
<Image
  src="/hero-image.jpg"
  alt="Disaster recovery services"
  width={1920}
  height={1080}
  priority // For above-fold images
  quality={85}
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

#### Size Guidelines
- Hero images: 1920x1080 max, < 200KB
- Service images: 800x600 max, < 100KB
- Thumbnails: 400x300 max, < 50KB
- Icons: SVG format preferred

### Code Splitting

```jsx
// Lazy load non-critical components
const Gallery = dynamic(() => import('./Gallery'), {
  loading: () => <Skeleton />,
  ssr: false
});

const Testimonials = dynamic(() => import('./Testimonials'), {
  loading: () => <Skeleton />,
  ssr: true
});
```

---

## Mobile-First Approach

### Breakpoint Strategy

```css
/* Mobile First Breakpoints */
/* Default: 320px - 639px (Mobile) */
@media (min-width: 640px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Large Desktop */ }
```

### Mobile Optimization

#### Navigation
- Hamburger menu for mobile
- Fixed emergency contact bar
- Sticky header with reduced height
- Touch-friendly menu items (48px min)

#### Content Priority
1. Emergency contact (fixed)
2. Service type selector
3. Location confirmation
4. Trust indicators
5. Service details (collapsible)

#### Interaction Patterns
- Swipeable image galleries
- Collapsible FAQ sections
- Bottom sheet modals
- Touch-optimized forms

---

## Brand Voice & Tone

### During Crisis (Emergency Pages)

**Tone**: Calm, professional, reassuring
```
DO: "We're here to help. Our team is on the way."
DON'T: "EMERGENCY! DISASTER! ACT NOW!"
```

**Language**: Clear, simple, action-oriented
```
DO: "Call us now for immediate assistance"
DON'T: "Utilize our emergency hotline for expeditious remediation"
```

### Service Pages

**Tone**: Professional, knowledgeable, trustworthy
```
"Our IICRC-certified technicians use advanced moisture detection
equipment to ensure complete water extraction and prevent mould growth."
```

### Testimonials

**Tone**: Authentic, grateful, specific
```
"The team arrived within 45 minutes of our call at 2 AM.
They saved our hardwood floors and prevented mould damage."
```

---

## Implementation Checklist

### Page Requirements

#### Every Page Must Have:
- [ ] Emergency contact in header
- [ ] Clear navigation structure
- [ ] Trust indicators (certifications, insurance)
- [ ] Mobile-optimized layout
- [ ] Accessibility compliance
- [ ] Performance optimization
- [ ] SEO meta tags
- [ ] Schema markup

#### Emergency/Service Pages:
- [ ] Response time guarantee
- [ ] Service area confirmation
- [ ] Process explanation
- [ ] Before/after gallery
- [ ] Testimonials
- [ ] FAQ section
- [ ] Insurance information
- [ ] Contact form

### Component Checklist

#### Buttons
- [ ] Touch target minimum 44px
- [ ] Contrast ratio 4.5:1+
- [ ] Focus indicators
- [ ] Hover states
- [ ] Loading states
- [ ] Disabled states

#### Forms
- [ ] Label all inputs
- [ ] Error messages
- [ ] Success feedback
- [ ] Validation on blur
- [ ] Autocomplete attributes
- [ ] InputMode attributes

#### Images
- [ ] Alt text
- [ ] Lazy loading (except hero)
- [ ] Responsive sizes
- [ ] WebP format
- [ ] Blur placeholder

### Testing Requirements

#### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader testing
- [ ] Color contrast check
- [ ] Focus management
- [ ] ARIA labels

#### Performance Testing
- [ ] Lighthouse score 90+
- [ ] Mobile PageSpeed 90+
- [ ] Load test critical path
- [ ] Image optimization
- [ ] Bundle size check

#### Cross-browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Chrome Mobile

---

## Quick Reference

### Emergency Design Pattern
```jsx
// Emergency section pattern
<section className="emergency-section">
  <div className="emergency-header">
    <Badge variant="emergencyPulse">24/7 EMERGENCY</Badge>
    <h2>Immediate Disaster Response</h2>
  </div>

  <Card variant="emergency">
    <p className="emergency-message">
      Experiencing water damage? Act fast to prevent further damage.
    </p>
    <div className="emergency-actions">
      <Button variant="emergency" size="lg">
        <PhoneIcon /> Call 1300 309 361
      </Button>
      <Button variant="secondary" size="lg">
        Request Callback
      </Button>
    </div>
  </Card>

  <div className="trust-indicators">
    <TrustBadge>1 Hour Response</TrustBadge>
    <TrustBadge>Insurance Approved</TrustBadge>
    <TrustBadge>IICRC Certified</TrustBadge>
  </div>
</section>
```

### Service Card Pattern
```jsx
// Service showcase pattern
<div className="services-grid">
  {services.map(service => (
    <Card key={service.id} variant="service" className="card-hover">
      <Image
        src={service.image}
        alt={service.title}
        priority={service.priority}
      />
      <CardContent>
        <div className="service-meta">
          <Badge>24/7</Badge>
          {service.urgent && <Badge variant="emergency">Urgent</Badge>}
        </div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-features">
          {service.features.map(feature => (
            <Feature key={feature}>
              <CheckIcon /> {feature}
            </Feature>
          ))}
        </div>
        <Button variant="primary" fullWidth>
          Get Help Now
        </Button>
      </CardContent>
    </Card>
  ))}
</div>
```

---

## Resources

### Design Tokens
- Location: `/design-system/design-tokens.ts`
- Usage: Import and use constants for consistency

### Component Patterns
- Location: `/design-system/component-patterns.tsx`
- Usage: Reference for component implementation

### Tailwind Config
- Location: `/tailwind.config.ts`
- Usage: Extend with design tokens

### Support
- Design System Updates: Review quarterly
- Component Library: Storybook documentation
- Questions: Contact design team lead