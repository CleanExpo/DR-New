# UI Patterns - Disaster Recovery Brisbane

## Overview
Common UI patterns and interaction patterns for consistent user experience across the application.

---

## Micro-Interactions

### Button Hover
```tsx
className="transform hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"
```
**Effect:** Subtle lift on hover with enhanced shadow

### Card Hover
```tsx
className="hover:-translate-y-1 hover:shadow-xl hover:border-primary-500 transition-all duration-300"
```
**Effect:** Larger lift with border color change

### Emergency Pulse
```tsx
className="animate-pulse-glow"
```
**CSS:**
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
    opacity: 0.9;
  }
  50% {
    box-shadow: 0 0 40px rgba(220, 38, 38, 0.6);
    opacity: 1;
  }
}
```

### Shimmer Effect
```tsx
<div className="shimmer">
  <div className="shimmer-content">Loading...</div>
</div>
```
**Usage:** Loading states, skeleton screens

### Focus Ring
```tsx
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2"
```
**WCAG:** Ensures 3px minimum visible focus indicator

---

## Loading Patterns

### Page Load
```tsx
<LoadingOverlay isLoading={isLoading} message="Loading services..." />
```

### Content Load
```tsx
{isLoading ? (
  <SkeletonGrid count={6} columns={3} />
) : (
  <ServiceGrid services={services} />
)}
```

### Inline Load
```tsx
{isLoading ? (
  <DotsLoader />
) : (
  <Content />
)}
```

### Button Load
```tsx
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="w-5 h-5 animate-spin" />
      <span>Submitting...</span>
    </>
  ) : (
    'Submit'
  )}
</Button>
```

### Progressive Load
```tsx
<ProgressBar
  value={uploadProgress}
  max={100}
  variant="success"
  showLabel
/>
```

---

## Error Patterns

### Form Field Error
```tsx
<FormField name="email" label="Email" required>
  <FormInput type="email" />
</FormField>
{/* Error automatically shown when touched and invalid */}
```

### Page Error
```tsx
<ErrorState
  title="Failed to load services"
  message="We're having trouble loading this page. Please try again."
  onRetry={() => window.location.reload()}
/>
```

### Toast Error
```tsx
addToast({
  title: 'Submission failed',
  description: 'Please check your connection and try again',
  variant: 'error',
  action: {
    label: 'Retry',
    onClick: handleRetry,
  },
});
```

### Inline Error
```tsx
<div className="flex items-start gap-2 text-emergency-700 bg-emergency-50 border-2 border-emergency-600 rounded-lg p-4">
  <AlertCircle className="w-5 h-5 mt-0.5" />
  <div>
    <p className="font-semibold">Error occurred</p>
    <p className="text-sm">Please try again</p>
  </div>
</div>
```

---

## Success Patterns

### Form Success
```tsx
<FormSuccess>
  Your request has been submitted successfully. We will contact you within 15 minutes.
</FormSuccess>
```

### Toast Success
```tsx
addToast({
  title: 'Quote sent',
  description: 'Check your email for details',
  variant: 'success',
  duration: 5000,
});
```

### Inline Success
```tsx
<div className="flex items-start gap-2 text-success-700 bg-success-50 border-2 border-success-600 rounded-lg p-4">
  <CheckCircle2 className="w-5 h-5 mt-0.5" />
  <div>
    <p className="font-semibold">Success!</p>
    <p className="text-sm">Your changes have been saved</p>
  </div>
</div>
```

---

## Confirmation Patterns

### Destructive Action
```tsx
<ConfirmationModal
  open={open}
  onOpenChange={setOpen}
  title="Delete service record?"
  description="This action cannot be undone. All data will be permanently deleted."
  confirmText="Delete"
  cancelText="Cancel"
  variant="emergency"
  onConfirm={handleDelete}
/>
```

### Important Action
```tsx
<ConfirmationModal
  open={open}
  onOpenChange={setOpen}
  title="Submit emergency request?"
  description="This will notify our 24/7 response team immediately."
  confirmText="Submit Request"
  cancelText="Review"
  variant="warning"
  onConfirm={handleSubmit}
/>
```

---

## Navigation Patterns

### Breadcrumbs
```tsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-2 text-sm">
    <li>
      <Link href="/" className="text-neutral-600 hover:text-neutral-900">
        Home
      </Link>
    </li>
    <li aria-hidden="true" className="text-neutral-400">/</li>
    <li>
      <Link href="/services" className="text-neutral-600 hover:text-neutral-900">
        Services
      </Link>
    </li>
    <li aria-hidden="true" className="text-neutral-400">/</li>
    <li className="text-neutral-900 font-semibold" aria-current="page">
      Water Damage
    </li>
  </ol>
</nav>
```

### Tab Navigation
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="process">Process</TabsTrigger>
    <TabsTrigger value="pricing">Pricing</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
  <TabsContent value="process">...</TabsContent>
  <TabsContent value="pricing">...</TabsContent>
</Tabs>
```

### Pagination
```tsx
<nav aria-label="Pagination" className="flex items-center justify-center gap-2">
  <Button
    variant="outline"
    size="icon"
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    aria-label="Previous page"
  >
    <ChevronLeft className="w-5 h-5" />
  </Button>

  <span className="text-sm text-neutral-600">
    Page {page} of {totalPages}
  </span>

  <Button
    variant="outline"
    size="icon"
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
    aria-label="Next page"
  >
    <ChevronRight className="w-5 h-5" />
  </Button>
</nav>
```

---

## Search Patterns

### Search with Results
```tsx
<div className="space-y-4">
  <div className="relative">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
    <input
      type="search"
      placeholder="Search services..."
      className="w-full pl-10 pr-4 h-12 rounded-lg border-2 border-neutral-300"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>

  {isLoading ? (
    <SkeletonGrid count={3} columns={1} />
  ) : results.length === 0 ? (
    <NoResults query={query} onReset={() => setQuery('')} />
  ) : (
    <ResultsList results={results} />
  )}
</div>
```

### Instant Search
```tsx
<Combobox value={selected} onChange={setSelected}>
  <ComboboxInput
    placeholder="Search locations..."
    onChange={(e) => setQuery(e.target.value)}
  />
  <ComboboxOptions>
    {filteredOptions.map((option) => (
      <ComboboxOption key={option.id} value={option}>
        {option.name}
      </ComboboxOption>
    ))}
  </ComboboxOptions>
</Combobox>
```

---

## Form Patterns

### Multi-Step Form
```tsx
<div className="space-y-6">
  {/* Progress indicator */}
  <div className="flex items-center justify-between">
    {steps.map((step, index) => (
      <div key={step} className="flex items-center">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center',
          index <= currentStep
            ? 'bg-primary-600 text-white'
            : 'bg-neutral-200 text-neutral-600'
        )}>
          {index < currentStep ? (
            <Check className="w-5 h-5" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
        {index < steps.length - 1 && (
          <div className={cn(
            'w-24 h-1',
            index < currentStep ? 'bg-primary-600' : 'bg-neutral-200'
          )} />
        )}
      </div>
    ))}
  </div>

  {/* Step content */}
  <StepContent step={currentStep} />

  {/* Navigation */}
  <div className="flex justify-between">
    <Button
      variant="outline"
      onClick={() => setCurrentStep(prev => prev - 1)}
      disabled={currentStep === 0}
    >
      Back
    </Button>
    <Button
      onClick={() => setCurrentStep(prev => prev + 1)}
      disabled={currentStep === steps.length - 1}
    >
      {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
    </Button>
  </div>
</div>
```

### Conditional Fields
```tsx
<Form onSubmit={handleSubmit}>
  <FormField name="serviceType" label="Service Type" required>
    <FormSelect options={serviceOptions} />
  </FormField>

  {values.serviceType === 'water' && (
    <FormField name="waterSource" label="Water Source" required>
      <FormSelect options={waterSourceOptions} />
    </FormField>
  )}

  <FormSubmit>Submit</FormSubmit>
</Form>
```

---

## Card Patterns

### Service Card
```tsx
<Card className="group cursor-pointer">
  <CardHeader>
    <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-600 transition-colors">
      <Droplet className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
    </div>
    <CardTitle>Water Damage Restoration</CardTitle>
    <CardDescription>
      24/7 emergency response for water damage
    </CardDescription>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2">
      <li className="flex items-center gap-2 text-sm text-neutral-700">
        <Check className="w-4 h-4 text-success-600" />
        <span>Immediate response</span>
      </li>
      <li className="flex items-center gap-2 text-sm text-neutral-700">
        <Check className="w-4 h-4 text-success-600" />
        <span>Insurance approved</span>
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button variant="outline" className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600">
      Learn More
    </Button>
  </CardFooter>
</Card>
```

### Stats Card
```tsx
<Card>
  <CardContent className="pt-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-neutral-600">Response Time</p>
        <p className="text-4xl font-bold text-neutral-900 mt-2">< 15min</p>
        <p className="text-sm text-success-600 mt-1 flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>Guaranteed</span>
        </p>
      </div>
      <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center">
        <Clock className="w-6 h-6 text-primary-600" />
      </div>
    </div>
  </CardContent>
</Card>
```

---

## Glassmorphism Patterns

### Glass Card
```tsx
<div className="glass rounded-2xl p-6 backdrop-blur-xl">
  <h3 className="text-2xl font-bold text-white mb-4">24/7 Emergency</h3>
  <p className="text-white/90">Always here when you need us</p>
</div>
```

**CSS:**
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}
```

---

## Responsive Patterns

### Mobile-First Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {services.map(service => (
    <ServiceCard key={service.id} service={service} />
  ))}
</div>
```

### Responsive Container
```tsx
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  <Content />
</div>
```

### Mobile Menu
```tsx
{/* Mobile */}
<div className="md:hidden">
  <Button variant="ghost" onClick={() => setMobileMenuOpen(true)}>
    <Menu className="w-6 h-6" />
  </Button>
</div>

{/* Desktop */}
<nav className="hidden md:flex items-center gap-6">
  <NavLinks />
</nav>
```

---

## Accessibility Patterns

### Skip Link
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
>
  Skip to main content
</a>
```

### Live Region
```tsx
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {statusMessage}
</div>
```

### Focus Trap
```tsx
<div
  ref={modalRef}
  onKeyDown={(e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(e);
  }}
>
  <Modal />
</div>
```

---

## Performance Patterns

### Lazy Load Images
```tsx
<img
  src={imageSrc}
  alt={imageAlt}
  loading="lazy"
  className="w-full h-auto"
/>
```

### Optimistic UI
```tsx
const handleLike = async () => {
  // Update UI immediately
  setLiked(true);
  setLikeCount(prev => prev + 1);

  try {
    // Then sync with server
    await api.like(itemId);
  } catch (error) {
    // Revert on error
    setLiked(false);
    setLikeCount(prev => prev - 1);
    addToast({
      title: 'Failed to like',
      variant: 'error',
    });
  }
};
```

### Debounced Search
```tsx
const debouncedSearch = useMemo(
  () => debounce((query) => performSearch(query), 300),
  []
);

<input
  type="search"
  onChange={(e) => debouncedSearch(e.target.value)}
/>
```

---

## Animation Patterns

### Stagger Children
```tsx
<div className="space-y-4">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="animate-in slide-in-from-left duration-500"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <Item data={item} />
    </div>
  ))}
</div>
```

### Page Transitions
```tsx
<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  <PageContent />
</div>
```

### Hover Tilt
```tsx
<div className="group perspective-1000">
  <div className="transform group-hover:rotate-y-6 transition-transform duration-300">
    <Card />
  </div>
</div>
```

---

## Best Practices

### DO
- Use consistent patterns across similar features
- Provide immediate feedback for user actions
- Show loading states for async operations
- Handle errors gracefully with recovery options
- Use animations purposefully
- Test patterns with keyboard and screen readers
- Optimize for performance
- Follow accessibility guidelines

### DON'T
- Don't create patterns in isolation
- Don't ignore loading states
- Don't hide errors from users
- Don't overuse animations
- Don't forget reduced motion preferences
- Don't skip error handling
- Don't ignore mobile users
- Don't sacrifice accessibility for aesthetics
