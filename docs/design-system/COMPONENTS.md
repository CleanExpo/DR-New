# Component Library - Disaster Recovery Brisbane

## Overview
Comprehensive component library built with accessibility, consistency, and professional design principles.

---

## Buttons

### Variants

#### Default (Primary)
```tsx
<Button variant="default">Get Quote</Button>
```
**Usage:** Primary CTAs, main actions
**Style:** Blue gradient, shadow, hover lift

#### Emergency
```tsx
<Button variant="emergency">24/7 Emergency</Button>
```
**Usage:** Emergency contact buttons, urgent actions
**Style:** Red gradient, pulse animation, high prominence

#### Success
```tsx
<Button variant="success">Submit</Button>
```
**Usage:** Confirmations, positive actions
**Style:** Green gradient, shadow

#### Secondary
```tsx
<Button variant="secondary">Learn More</Button>
```
**Usage:** Secondary actions, outlines
**Style:** Outlined primary color

#### Outline
```tsx
<Button variant="outline">Cancel</Button>
```
**Usage:** Tertiary actions, neutral options
**Style:** Neutral outline

#### Ghost
```tsx
<Button variant="ghost">Skip</Button>
```
**Usage:** Minimal actions, navigation
**Style:** Transparent, hover background

#### Link
```tsx
<Button variant="link">View Details</Button>
```
**Usage:** Text-only actions
**Style:** Underlined text

#### Premium
```tsx
<Button variant="premium">Premium Service</Button>
```
**Usage:** High-end service CTAs
**Style:** Gold gradient, special emphasis

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
<Button size="icon"><Icon /></Button>
```

### Accessibility
- Minimum touch target: 44x44px
- Clear focus indicators
- Disabled state with `aria-disabled`
- Loading state with spinner
- Icon-only buttons require `aria-label`

---

## Cards

### Basic Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Water Damage Restoration</CardTitle>
    <CardDescription>24/7 emergency response</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Fast response times...</p>
  </CardContent>
  <CardFooter>
    <Button>Learn More</Button>
  </CardFooter>
</Card>
```

### Features
- Hover lift animation
- Border color transition
- Rounded corners (12px)
- Consistent padding
- Shadow on hover

### Accessibility
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support

---

## Forms

### Complete Form Example
```tsx
<Form
  onSubmit={handleSubmit}
  initialValues={{ name: '', email: '' }}
  validate={validateForm}
>
  <FormField
    name="name"
    label="Full Name"
    description="Enter your full name"
    required
  >
    <FormInput placeholder="John Smith" />
  </FormField>

  <FormField
    name="email"
    label="Email Address"
    required
  >
    <FormInput type="email" placeholder="john@example.com" />
  </FormField>

  <FormField
    name="message"
    label="Message"
    required
  >
    <FormTextarea placeholder="Describe your emergency..." />
  </FormField>

  <FormField
    name="service"
    label="Service Type"
    required
  >
    <FormSelect
      options={[
        { label: 'Water Damage', value: 'water' },
        { label: 'Fire Damage', value: 'fire' },
        { label: 'Mould Remediation', value: 'mould' },
      ]}
    />
  </FormField>

  <FormCheckbox
    name="terms"
    label="I agree to the terms and conditions"
  />

  <FormSubmit loadingText="Submitting...">
    Submit Request
  </FormSubmit>
</Form>
```

### Components
- `Form` - Root form with validation
- `FormField` - Field wrapper with label and error
- `FormInput` - Text input
- `FormTextarea` - Multi-line input
- `FormSelect` - Dropdown select
- `FormCheckbox` - Checkbox with label
- `FormSubmit` - Submit button with loading state
- `FormSuccess` - Success message
- `FormError` - Error message

### Features
- Real-time validation
- Error display
- Loading states
- Accessible error messages
- Touch-friendly (44px minimum)

### Accessibility
- Proper label associations
- `aria-invalid` on errors
- `aria-describedby` for descriptions
- `aria-required` for required fields
- Error announcements with `aria-live`

---

## Modals

### Basic Modal
```tsx
<Modal open={open} onOpenChange={setOpen}>
  <ModalContent size="md">
    <ModalHeader>
      <ModalTitle>Emergency Contact</ModalTitle>
      <ModalDescription>
        Fill out this form for immediate assistance
      </ModalDescription>
    </ModalHeader>
    <ModalBody>
      {/* Modal content */}
    </ModalBody>
    <ModalFooter>
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="emergency">Contact Now</Button>
    </ModalFooter>
  </ModalContent>
</Modal>
```

### Confirmation Modal
```tsx
<ConfirmationModal
  open={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  confirmText="Yes, proceed"
  cancelText="Cancel"
  variant="emergency"
  onConfirm={handleConfirm}
/>
```

### Sizes
- `sm` - 448px max
- `md` - 512px max (default)
- `lg` - 672px max
- `xl` - 896px max
- `full` - 95vw x 95vh

### Features
- Backdrop blur
- Smooth animations
- Auto-close button
- Keyboard support (Esc to close)
- Focus trap
- Scroll lock

### Accessibility
- `role="dialog"`
- `aria-modal="true"`
- Focus management
- Close on Escape
- Backdrop click to close

---

## Toasts

### Usage
```tsx
// In your component
const { addToast } = useToast();

// Success toast
addToast({
  title: 'Request submitted',
  description: 'We will contact you shortly',
  variant: 'success',
  duration: 5000,
});

// Error toast
addToast({
  title: 'Error occurred',
  description: 'Please try again',
  variant: 'error',
});

// Toast with action
addToast({
  title: 'Update available',
  description: 'A new version is ready',
  variant: 'info',
  action: {
    label: 'Reload',
    onClick: () => window.location.reload(),
  },
});
```

### Variants
- `default` - Neutral gray
- `success` - Green with checkmark
- `error` - Red with alert icon
- `warning` - Amber with warning icon
- `info` - Blue with info icon

### Features
- Auto-dismiss after duration
- Manual dismiss
- Stacking (bottom-right)
- Slide-in animation
- Progress bar
- Action buttons

### Accessibility
- `role="alert"` for errors
- `aria-live="polite"` for others
- Keyboard dismissible
- Screen reader announcements

---

## Loading States

### Spinner
```tsx
<Spinner size="md" />
```
**Sizes:** sm, md, lg, xl

### Loading Overlay
```tsx
<LoadingOverlay isLoading={isLoading} message="Loading data..." />
```

### Skeleton
```tsx
<Skeleton variant="rectangular" className="h-32 w-full" />
<Skeleton variant="circular" className="w-12 h-12" />
<Skeleton variant="text" />
```

### Skeleton Components
```tsx
<SkeletonText lines={3} />
<SkeletonCard />
<SkeletonGrid count={6} columns={3} />
```

### Progress Bar
```tsx
<ProgressBar value={65} max={100} variant="success" showLabel />
```

### Circular Progress
```tsx
<CircularProgress value={75} size={120} variant="primary" />
```

### Loaders
```tsx
<DotsLoader />
<PulseLoader />
```

---

## Empty States

### No Results
```tsx
<NoResults query="search term" onReset={handleReset} />
```

### Error State
```tsx
<ErrorState
  title="Failed to load"
  message="Something went wrong"
  onRetry={handleRetry}
/>
```

### Not Found (404)
```tsx
<NotFound onGoHome={() => router.push('/')} />
```

### No Connection
```tsx
<NoConnection onRetry={handleRetry} />
```

### Custom Empty State
```tsx
<EmptyState
  icon={Icon}
  title="No messages"
  description="You don't have any messages yet"
  action={{
    label: 'Send message',
    onClick: handleAction,
    variant: 'primary',
  }}
/>
```

### Inline Empty State
```tsx
<InlineEmptyState icon={Search} message="No results found" />
```

---

## Component Patterns

### Emergency CTA Pattern
```tsx
<Button variant="emergency" size="xl" className="w-full">
  <Phone className="w-6 h-6" />
  <span>Call 24/7 Emergency: 1300 XXX XXX</span>
</Button>
```

### Service Card Pattern
```tsx
<Card>
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-primary-600" />
    </div>
    <CardTitle>Service Name</CardTitle>
    <CardDescription>Service description</CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li className="flex items-center gap-2">
        <Check className="w-5 h-5 text-success-600" />
        <span>Feature 1</span>
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button variant="primary" className="w-full">
      Learn More
    </Button>
  </CardFooter>
</Card>
```

### Trust Badge Pattern
```tsx
<div className="flex items-center gap-3 p-4 rounded-lg bg-premium-50 border-2 border-premium-600">
  <Shield className="w-8 h-8 text-premium-600" />
  <div>
    <p className="font-semibold text-neutral-900">Master Restorer</p>
    <p className="text-sm text-neutral-600">Certified Professional</p>
  </div>
</div>
```

---

## Best Practices

### DO
- Use semantic HTML
- Provide proper labels
- Include loading states
- Show error messages
- Implement keyboard navigation
- Test with screen readers
- Use consistent spacing
- Follow color system

### DON'T
- Don't use icon-only buttons without labels
- Don't forget loading states
- Don't hide errors
- Don't rely on color alone
- Don't break keyboard flow
- Don't ignore focus states
- Don't use generic error messages
- Don't skip accessibility testing

---

## Testing Components

### Checklist
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets minimum 44x44px
- [ ] Loading states implemented
- [ ] Error states handled
- [ ] Responsive on all devices
- [ ] Works with reduced motion
- [ ] Works in dark mode
