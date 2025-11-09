# Design System - Disaster Recovery Brisbane

## Introduction

Welcome to the Disaster Recovery Brisbane design system. This comprehensive design system ensures consistency, accessibility, and professional quality across all digital touchpoints.

**Built for:**
- Local emergency disaster recovery services
- 24/7 customer trust and urgency
- WCAG 2.1 AA accessibility compliance
- Professional high-net-worth residential market
- Insurance company partnerships

---

## Quick Start

### Installation

The design system is already integrated into the project. To use components:

```tsx
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Form, FormField, FormInput, FormSubmit } from '@/components/ui/Form'

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Contact</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="emergency" size="lg">
          Call 24/7
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Using Design Tokens

Design tokens are available as CSS custom properties:

```css
.my-component {
  color: var(--color-primary-600);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  box-shadow: var(--shadow-lg);
}
```

---

## Core Principles

### 1. Accessibility First
Every component meets WCAG 2.1 AA standards minimum:
- 4.5:1 contrast for normal text
- 3:1 contrast for large text and UI components
- Keyboard navigable
- Screen reader compatible
- Focus indicators always visible

### 2. Emergency-Ready Design
Design communicates urgency and trust:
- Emergency red for 24/7 CTAs
- Clear visual hierarchy
- Fast visual processing
- Mobile-first responsive
- Touch-friendly (44px minimum)

### 3. Professional Trust
High-end residential and commercial focus:
- Premium gold accents for luxury services
- Professional blue primary color
- Clean, modern aesthetics
- Master Restorer credibility emphasis

### 4. Performance Optimized
Fast loading for emergency situations:
- Minimal animation payload
- Lazy-loaded components
- Optimized images
- Reduced motion support
- Critical CSS inlined

---

## Design System Structure

```
design-system/
├── COLORS.md           # Color palette & usage
├── TYPOGRAPHY.md       # Type scale & hierarchy
├── COMPONENTS.md       # Component library
├── PATTERNS.md         # UI patterns & interactions
└── README.md          # This file
```

---

## Components Overview

### Layout
- **Container** - Responsive page container
- **Grid** - Flexible grid system
- **Section** - Semantic page sections

### Navigation
- **Header** - Site header with navigation
- **Footer** - Site footer
- **Breadcrumb** - Navigation breadcrumbs
- **Tabs** - Tabbed interfaces

### Content
- **Card** - Content containers (4 variants)
- **Typography** - Text styles
- **Image** - Optimized images
- **Video** - Video players

### Forms
- **Form** - Form wrapper with validation
- **FormField** - Field with label and error
- **FormInput** - Text inputs
- **FormTextarea** - Multi-line inputs
- **FormSelect** - Dropdowns
- **FormCheckbox** - Checkboxes
- **FormSubmit** - Submit buttons

### Feedback
- **Toast** - Notifications (5 variants)
- **Modal** - Dialogs (5 sizes)
- **Alert** - Inline alerts
- **Progress** - Progress indicators
- **Skeleton** - Loading placeholders

### Actions
- **Button** - All button variants (10 types)
- **Link** - Text links
- **Icon Button** - Icon-only buttons

### Data Display
- **Table** - Data tables
- **List** - Ordered/unordered lists
- **Stats** - Statistics cards
- **Badge** - Status badges

---

## Component Variants

### Buttons
```tsx
<Button variant="default">Default</Button>
<Button variant="emergency">24/7 Emergency</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="premium">Premium Service</Button>
<Button variant="destructive">Delete</Button>
```

### Cards
```tsx
<Card variant="default">Default card</Card>
<Card variant="elevated">Elevated card</Card>
<Card variant="outlined">Outlined card</Card>
<Card variant="ghost">Ghost card</Card>
```

### Toasts
```tsx
toast.success('Success message')
toast.error('Error message')
toast.warning('Warning message')
toast.info('Info message')
```

---

## Usage Guidelines

### Emergency CTAs
Use emergency variant for all 24/7 contact buttons:

```tsx
<Button variant="emergency" size="xl">
  <Phone className="w-6 h-6" />
  24/7 Emergency: 1300 XXX XXX
</Button>
```

### Service Cards
Standard pattern for service offerings:

```tsx
<ServiceCard
  icon={<Droplet />}
  title="Water Damage Restoration"
  description="24/7 emergency response"
  features={[
    "Immediate response",
    "Insurance approved",
    "Master Restorer certified"
  ]}
  action={{
    label: "Learn More",
    onClick: handleClick
  }}
/>
```

### Forms
Always use FormField wrapper for proper validation:

```tsx
<Form onSubmit={handleSubmit} validate={validateForm}>
  <FormField name="name" label="Name" required>
    <FormInput placeholder="Your name" />
  </FormField>
  <FormSubmit>Submit</FormSubmit>
</Form>
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
- Normal text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements focusable
- Logical tab order
- Visible focus indicators (3px minimum)
- Escape to close modals

**Screen Readers:**
- Semantic HTML
- ARIA labels where needed
- Live regions for dynamic content
- Alt text for all images

**Touch Targets:**
- Minimum 44x44px
- Adequate spacing between targets
- No overlapping interactive elements

---

## Responsive Design

### Breakpoints
```css
--breakpoint-sm: 640px   /* Mobile landscape */
--breakpoint-md: 768px   /* Tablet portrait */
--breakpoint-lg: 1024px  /* Tablet landscape */
--breakpoint-xl: 1280px  /* Desktop */
--breakpoint-2xl: 1536px /* Large desktop */
```

### Mobile-First Approach
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Stacks on mobile, 2 cols on tablet, 3 on desktop */}
</div>
```

---

## Testing Checklist

### Visual
- [ ] Design matches mockups
- [ ] Colors from approved palette
- [ ] Typography scales properly
- [ ] Spacing consistent
- [ ] Responsive on all breakpoints

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader tested
- [ ] Touch targets minimum 44px
- [ ] Form errors announced
- [ ] Reduced motion respected

### Functionality
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Empty states designed
- [ ] Success feedback provided
- [ ] Validation works correctly

### Performance
- [ ] Images optimized
- [ ] Lazy loading implemented
- [ ] Critical CSS inlined
- [ ] No layout shift (CLS)
- [ ] Fast interaction (FID)

---

## Common Patterns

### Loading Pattern
```tsx
{isLoading ? (
  <SkeletonCard />
) : error ? (
  <ErrorState onRetry={refetch} />
) : data.length === 0 ? (
  <EmptyState />
) : (
  <DataDisplay data={data} />
)}
```

### Form Pattern
```tsx
<Form onSubmit={handleSubmit}>
  {/* Fields */}
  {error && <FormError>{error}</FormError>}
  {success && <FormSuccess>{success}</FormSuccess>}
  <FormSubmit loadingText="Submitting...">Submit</FormSubmit>
</Form>
```

### Modal Pattern
```tsx
const [open, setOpen] = useState(false)

<Button onClick={() => setOpen(true)}>Open</Button>

<Modal open={open} onOpenChange={setOpen}>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Title</ModalTitle>
    </ModalHeader>
    <ModalBody>{/* Content */}</ModalBody>
    <ModalFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleAction}>Confirm</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

---

## Best Practices

### DO
- Use design tokens for all styling
- Follow component patterns
- Test accessibility
- Provide loading states
- Handle errors gracefully
- Use semantic HTML
- Test on real devices
- Optimize images

### DON'T
- Hard-code colors or spacing
- Create one-off components
- Ignore accessibility
- Skip loading states
- Hide errors from users
- Use divs for buttons
- Test only on desktop
- Use unoptimized images

---

## Support & Resources

### Documentation
- [Colors](./COLORS.md) - Complete color palette
- [Typography](./TYPOGRAPHY.md) - Type system
- [Components](./COMPONENTS.md) - Component library
- [Patterns](./PATTERNS.md) - UI patterns

### Tools
- **Figma** - Design mockups (if available)
- **Storybook** - Component explorer (if implemented)
- **Chrome DevTools** - Accessibility testing
- **axe DevTools** - Automated accessibility testing

### External Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [React Documentation](https://react.dev/)

---

## Version History

### v1.0.0 (Current)
- Initial design system release
- Complete component library
- WCAG 2.1 AA compliance
- Design tokens system
- Comprehensive documentation
- Disaster recovery focus
- Emergency service optimization

---

## Contributing

When adding new components or patterns:

1. **Follow existing patterns** - Maintain consistency
2. **Document thoroughly** - Update relevant .md files
3. **Test accessibility** - WCAG 2.1 AA minimum
4. **Provide examples** - Show usage in docs
5. **Consider mobile** - Mobile-first approach
6. **Add to Storybook** - If available
7. **Test performance** - No performance regressions

---

## License

This design system is proprietary to Disaster Recovery Brisbane.

---

**Questions?** Contact the development team for design system support.
