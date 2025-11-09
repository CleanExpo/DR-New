# Implementation Guide - Disaster Recovery Brisbane Design System

## Getting Started

This guide shows how to implement the design system components in your application.

---

## Setup

### 1. Import Global Styles

The design system is automatically loaded through `globals.css`:

```tsx
// app/layout.tsx or _app.tsx
import '@/src/styles/globals.css'
```

### 2. Add Toast Provider

Wrap your application with ToastProvider for notifications:

```tsx
// app/layout.tsx
import { ToastProvider } from '@/components/ui'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

---

## Complete Examples

### Emergency Contact Form

```tsx
'use client'

import { useState } from 'react'
import {
  Form,
  FormField,
  FormInput,
  FormTextarea,
  FormSelect,
  FormSubmit,
  FormSuccess,
  FormError,
  useToast,
} from '@/components/ui'

export function EmergencyContactForm() {
  const { addToast } = useToast()
  const [submitted, setSubmitted] = useState(false)

  const validate = (values: any) => {
    const errors: any = {}

    if (!values.name) {
      errors.name = 'Name is required'
    }

    if (!values.phone) {
      errors.phone = 'Phone is required'
    } else if (!/^\d{10}$/.test(values.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number'
    }

    if (!values.address) {
      errors.address = 'Address is required'
    }

    if (!values.emergency) {
      errors.emergency = 'Please describe your emergency'
    }

    return errors
  }

  const handleSubmit = async (values: any) => {
    try {
      // Send to API
      const response = await fetch('/api/emergency-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitted(true)

      addToast({
        title: 'Request submitted',
        description: 'We will contact you within 15 minutes',
        variant: 'success',
        duration: 10000,
      })
    } catch (error) {
      addToast({
        title: 'Submission failed',
        description: 'Please try again or call us directly',
        variant: 'error',
        action: {
          label: 'Call Now',
          onClick: () => window.location.href = 'tel:1300000000',
        },
      })
    }
  }

  if (submitted) {
    return (
      <FormSuccess>
        Your emergency request has been submitted. Our team will contact you within 15 minutes.
        For immediate assistance, call 1300 XXX XXX.
      </FormSuccess>
    )
  }

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      initialValues={{
        name: '',
        phone: '',
        address: '',
        serviceType: '',
        emergency: '',
      }}
    >
      <FormField
        name="name"
        label="Full Name"
        required
      >
        <FormInput placeholder="John Smith" />
      </FormField>

      <FormField
        name="phone"
        label="Phone Number"
        description="We'll call you within 15 minutes"
        required
      >
        <FormInput type="tel" placeholder="0400 000 000" />
      </FormField>

      <FormField
        name="address"
        label="Property Address"
        description="Include suburb and postcode"
        required
      >
        <FormInput placeholder="123 Main St, Brisbane QLD 4000" />
      </FormField>

      <FormField
        name="serviceType"
        label="Type of Emergency"
        required
      >
        <FormSelect
          options={[
            { label: 'Select service type...', value: '' },
            { label: 'Water Damage', value: 'water' },
            { label: 'Fire Damage', value: 'fire' },
            { label: 'Storm Damage', value: 'storm' },
            { label: 'Mould Emergency', value: 'mould' },
          ]}
        />
      </FormField>

      <FormField
        name="emergency"
        label="Describe the Emergency"
        description="Help us prepare for your specific situation"
        required
      >
        <FormTextarea
          placeholder="Describe what happened and the current situation..."
          rows={4}
        />
      </FormField>

      <FormSubmit loadingText="Submitting your request...">
        Submit Emergency Request
      </FormSubmit>
    </Form>
  )
}
```

### Service Grid with Loading

```tsx
'use client'

import { useEffect, useState } from 'react'
import { ServiceCard, SkeletonGrid, ErrorState } from '@/components/ui'
import { Droplet, Flame, Wind, Shield } from 'lucide-react'

const serviceIcons = {
  water: <Droplet />,
  fire: <Flame />,
  storm: <Wind />,
  mould: <Shield />,
}

export function ServiceGrid() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/services')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setServices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <SkeletonGrid count={4} columns={2} />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load services"
        message="We're having trouble loading our services. Please try again."
        onRetry={fetchServices}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          icon={serviceIcons[service.type]}
          title={service.name}
          description={service.description}
          features={service.features}
          action={{
            label: 'Learn More',
            onClick: () => window.location.href = `/services/${service.slug}`,
          }}
        />
      ))}
    </div>
  )
}
```

### Confirmation Modal

```tsx
'use client'

import { useState } from 'react'
import { Button, ConfirmationModal, useToast } from '@/components/ui'

export function DeleteServiceButton({ serviceId }: { serviceId: string }) {
  const [open, setOpen] = useState(false)
  const { addToast } = useToast()

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/services/${serviceId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      addToast({
        title: 'Service deleted',
        description: 'The service has been permanently deleted',
        variant: 'success',
      })
    } catch (error) {
      addToast({
        title: 'Delete failed',
        description: 'Unable to delete service. Please try again.',
        variant: 'error',
      })
    }
  }

  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setOpen(true)}
      >
        Delete Service
      </Button>

      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title="Delete service?"
        description="This action cannot be undone. All service data will be permanently deleted."
        confirmText="Delete Service"
        cancelText="Cancel"
        variant="emergency"
        onConfirm={handleDelete}
      />
    </>
  )
}
```

### Stats Dashboard

```tsx
'use client'

import { StatsCard } from '@/components/ui'
import { Clock, Users, CheckCircle, TrendingUp } from 'lucide-react'

export function StatsDashboard({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        icon={<Clock />}
        label="Response Time"
        value="< 15min"
        change={{
          value: 'Guaranteed',
          trend: 'up',
        }}
      />

      <StatsCard
        icon={<Users />}
        label="Active Jobs"
        value={stats.activeJobs.toString()}
        change={{
          value: `+${stats.newToday}% today`,
          trend: 'up',
        }}
      />

      <StatsCard
        icon={<CheckCircle />}
        label="Completed This Month"
        value={stats.completedMonth.toString()}
        change={{
          value: `+${stats.monthGrowth}% vs last month`,
          trend: 'up',
        }}
      />

      <StatsCard
        icon={<TrendingUp />}
        label="Client Satisfaction"
        value="98%"
        change={{
          value: '5-star average',
          trend: 'neutral',
        }}
      />
    </div>
  )
}
```

### Loading Overlay

```tsx
'use client'

import { useState } from 'react'
import { Button, LoadingOverlay } from '@/components/ui'

export function ProcessingButton() {
  const [processing, setProcessing] = useState(false)

  const handleProcess = async () => {
    setProcessing(true)
    try {
      // Simulate long process
      await new Promise(resolve => setTimeout(resolve, 3000))
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <Button onClick={handleProcess} disabled={processing}>
        Process Request
      </Button>

      <LoadingOverlay
        isLoading={processing}
        message="Processing your request..."
      />
    </>
  )
}
```

---

## Component Patterns

### Search with Results

```tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { NoResults, SkeletonGrid } from '@/components/ui'

export function ServiceSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setQuery(value)

    if (!value) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${value}`)
      const data = await response.json()
      setResults(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
        <input
          type="search"
          placeholder="Search services..."
          className="w-full pl-10 pr-4 h-12 rounded-lg border-2 border-neutral-300 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <SkeletonGrid count={3} columns={1} />
      ) : results.length === 0 && query ? (
        <NoResults query={query} onReset={() => setQuery('')} />
      ) : (
        <ResultsList results={results} />
      )}
    </div>
  )
}
```

---

## Using Design Tokens

### In CSS/Tailwind

```tsx
// Using design tokens in className
<div className="p-6 rounded-lg bg-primary-600 text-white shadow-lg">
  Content
</div>

// Custom CSS with tokens
<style jsx>{`
  .custom-component {
    color: var(--color-primary-600);
    padding: var(--space-6);
    border-radius: var(--radius-lg);
    font-size: var(--text-lg);
    box-shadow: var(--shadow-lg);
  }
`}</style>
```

---

## Accessibility Implementation

### Skip Link

```tsx
// Add to layout.tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
>
  Skip to main content
</a>

<main id="main-content">
  {children}
</main>
```

### Live Regions

```tsx
'use client'

import { useState } from 'react'

export function LiveStatusUpdates() {
  const [status, setStatus] = useState('')

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {status}
      </div>

      <button onClick={() => setStatus('Request submitted successfully')}>
        Submit
      </button>
    </>
  )
}
```

---

## Testing Examples

### Component Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { EmergencyContactForm } from './EmergencyContactForm'

describe('EmergencyContactForm', () => {
  it('shows validation errors', async () => {
    render(<EmergencyContactForm />)

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
  })

  it('submits form successfully', async () => {
    render(<EmergencyContactForm />)

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Smith' }
    })
    // ... fill other fields

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText(/submitted/i)).toBeInTheDocument()
  })
})
```

---

## Performance Optimization

### Lazy Loading Components

```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <SkeletonCard />,
  ssr: false,
})

export function Page() {
  return (
    <div>
      <HeavyComponent />
    </div>
  )
}
```

### Image Optimization

```tsx
import Image from 'next/image'

<Image
  src="/images/service.jpg"
  alt="Water damage restoration"
  width={600}
  height={400}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

## Common Mistakes to Avoid

### DON'T
```tsx
// Don't hard-code colors
<div style={{ color: '#2563eb' }}>Text</div>

// Don't skip validation
<Form onSubmit={handleSubmit}>
  <input type="email" />
</Form>

// Don't forget loading states
<div>{data.map(item => <Card />)}</div>

// Don't ignore errors
fetch('/api/data').then(r => r.json())
```

### DO
```tsx
// Use design tokens
<div className="text-primary-600">Text</div>

// Include validation
<Form onSubmit={handleSubmit} validate={validateForm}>
  <FormField name="email" required>
    <FormInput type="email" />
  </FormField>
</Form>

// Show loading states
{loading ? <SkeletonGrid /> : data.map(item => <Card />)}

// Handle errors
try {
  const data = await fetch('/api/data').then(r => r.json())
} catch (error) {
  addToast({ title: 'Error', variant: 'error' })
}
```

---

## Questions & Support

For implementation help:
1. Check this documentation
2. Review component examples
3. Test with accessibility tools
4. Contact development team

**Remember:** Always test with keyboard navigation and screen readers!
