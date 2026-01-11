# Routing Architecture: Public Site vs NRPG Contractor Portal

## Critical Separation

This platform has **TWO DISTINCT APPLICATIONS** serving different audiences. They must remain completely separate.

### 1. **Public Disaster Recovery Website** (for CLIENTS)
- **Primary Domain**: `/` (root)
- **Branding**: "Disaster Recovery Australia"
- **Audience**: Clients who need disaster recovery services
- **Key Pages**:
  - `/` - Home page with emergency CTA, triage tool, services grid
  - `/claim/*` - Claim wizard (step-1, step-2, step-3) for public submissions
  - `/service/[slug]` - Service pages
  - `/resources` - Educational content
  - `/about` - Company information
  - `/find-contractor` - Contractor search (public view)

**Has emergency elements:**
- ✅ Emergency CTA button (report claims)
- ✅ 24/7 contact messaging
- ✅ Phone number display (when applicable)
- ✅ Crisis urgency messaging

---

### 2. **NRPG Contractor Portal** (for CONTRACTORS ONLY)
- **Primary Routes**: `/contractor/*`, `/dashboard/contractor/*`
- **Branding**: "NRPG - National Restoration Professionals Group"
- **Audience**: Verified restoration contractors joining the network
- **Key Pages**:
  - `/contractor/portal` - Contractor login/authentication
  - `/contractor/join` - Contractor onboarding/registration
  - `/contractor/[id]` - Individual contractor profile (public view)
  - `/dashboard/contractor` - Main contractor dashboard (authenticated)
  - `/dashboard/contractor/onboarding/*` - Onboarding checklist & training
  - `/dashboard/contractor/preferences` - Work preferences
  - `/dashboard/contractor/analytics` - Performance analytics

**NO emergency elements:**
- ❌ No emergency CTA buttons
- ❌ No phone number displays
- ❌ No "24/7 crisis" messaging
- ❌ No public claim submission forms

---

## Layout Hierarchy

### Public Site Layout
```
app/layout.tsx (shared root metadata)
├── app/page.tsx (Public Home - Disaster Recovery Australia branding)
├── app/claim/layout.tsx
│   ├── app/claim/step-1/page.tsx
│   ├── app/claim/step-2/page.tsx
│   └── app/claim/step-3/page.tsx
└── app/[public-routes]/page.tsx
```

**Metadata in `app/layout.tsx` - PUBLIC BRANDING:**
```typescript
title: {
  default: "Disaster Recovery Australia | 24/7 Emergency Restoration",
  template: "%s | Disaster Recovery Australia",
},
description: "24/7 emergency disaster recovery in major Australian cities..."
```

### Contractor Portal Layout
```
app/contractor/[id]/layout.tsx (Public contractor profile)
app/contractor/layout.tsx
├── app/contractor/portal/page.tsx (Contractor login - NO auth required yet)
└── app/contractor/join/page.tsx (Contractor registration)

app/dashboard/contractor/layout.tsx (Auth required)
├── app/dashboard/contractor/page.tsx (Dashboard - auth required)
├── app/dashboard/contractor/onboarding/layout.tsx
│   ├── app/dashboard/contractor/onboarding/page.tsx
│   ├── app/dashboard/contractor/onboarding/profile-setup/page.tsx
│   └── app/dashboard/contractor/onboarding/[step]/page.tsx
└── app/dashboard/contractor/[feature]/page.tsx
```

**Metadata for Contractor Pages:**
```typescript
// app/contractor/portal/page.tsx
title: "NRPG Contractor Portal - National Restoration Professionals Group"

// app/dashboard/contractor/page.tsx
title: "Contractor Dashboard | NRPG"
```

---

## Component Usage Guide

### PUBLIC SITE ONLY - Use these components:
- ✅ `EmergencyButton` - Emergency CTA with red styling
- ✅ `EmergencyCTA` - Dual-path crisis call-to-action
- ✅ Phone number displays from `EMERGENCY_CONTACT` design token
- ✅ Pricing CTA components

**Example - Public Home Page:**
```typescript
import { EmergencyCTA } from '@/src/design-system/components/EmergencyCTA/EmergencyCTA'

export default function HomePage() {
  return (
    <>
      <EmergencyCTA />
      {/* Rest of public page... */}
    </>
  )
}
```

### CONTRACTOR PORTAL ONLY - Use these components:
- ✅ `ContractorPortalLayout` - Contractor-specific navigation
- ✅ `ContractorDashboard` - Job and bid management
- ✅ `EligibilityBanner` - Onboarding status
- ✅ Support chat (non-emergency)

**Example - Contractor Dashboard:**
```typescript
export default function ContractorDashboard() {
  return (
    <>
      {/* Dashboard content - NO emergency CTAs */}
      <AvailableRequests />
      <MyBidsSection />
    </>
  )
}
```

---

## Design Tokens Reference

Located in `lib/design-tokens.ts`:

```typescript
// PUBLIC SITE - Has emergency contact
EMERGENCY_CONTACT = {
  email: 'support@disasterrecovery.com.au',
  href: 'mailto:support@disasterrecovery.com.au',
  display: 'Email Support',
}

// PUBLIC SITE - Emergency pricing
EMERGENCY_PRICING = {
  total: 2750,
  display: '$2,750 AUD',
  description: 'Emergency Callout & Make-Safe',
}

// CONTRACTOR PORTAL - Branding only
NRPG_BRAND = {
  name: 'National Restoration Professionals Group',
  shortName: 'NRPG',
  tagline: 'Australia\'s Verified Restoration Contractors Network',
}
```

---

## Security & Access Control

### Public Routes (No Authentication)
- Anyone can view `/` (home)
- Anyone can access `/claim/*` (form submission)
- Public contractor profiles viewable without login

### Contractor Routes
- **`/contractor/portal`** - No auth (login page)
- **`/contractor/join`** - No auth (registration page)
- **`/contractor/[id]`** - No auth (public profile view, read-only)
- **`/dashboard/contractor/*`** - **REQUIRES AUTH** - Protected by NextAuth
  - Session check in layout.tsx
  - Redirects to login if not authenticated
  - Role verification: must be CONTRACTOR, ADMIN, or SUPER_ADMIN

### Admin Routes
- **`/dashboard/admin/*`** - **REQUIRES AUTH**
  - Role verification: must be ADMIN or SUPER_ADMIN
  - No public access

---

## Routing Validation Checklist

### When Creating New Public Pages:
- [ ] Route starts with `/` (not `/contractor`, not `/dashboard`)
- [ ] Uses "Disaster Recovery Australia" branding
- [ ] Can include emergency CTAs and phone numbers
- [ ] No authentication required
- [ ] Metadata uses public site title template

### When Creating New Contractor Pages:
- [ ] Route starts with `/contractor/*` OR `/dashboard/contractor/*`
- [ ] Uses "NRPG" branding
- [ ] NO emergency buttons or phone numbers
- [ ] Authentication required (in layout.tsx or page level)
- [ ] Role verification implemented
- [ ] Metadata uses contractor-specific title

---

## Common Mistakes to Avoid

❌ **WRONG**: Adding emergency buttons to contractor dashboard
```typescript
// BAD - Don't do this in contractor pages
import { EmergencyButton } from '@/components/nrpg/emergency-button'

export default function ContractorDashboard() {
  return (
    <>
      <EmergencyButton /> {/* ❌ WRONG AUDIENCE */}
    </>
  )
}
```

✅ **RIGHT**: Keep contractor dashboard focused on contractor features
```typescript
// GOOD - Use contractor-specific components only
export default function ContractorDashboard() {
  return (
    <>
      <AvailableJobs />
      <MyBidsSection />
    </>
  )
}
```

---

## Future Extensions

### Planned Separation Strategy (If Needed)
- Consider separate `public/` and `contractor/` app directories
- Use Next.js route groups: `(public)/*` and `(contractor)/*`
- Separate layout.tsx files for each brand
- Dedicated styling themes per section

Current approach (single app directory with clear separation comments) works well for platform size. Migrate to app directory groups only if complexity grows significantly.

---

## Questions?

If a page or component seems to exist in the wrong section, reference this document and the code comments in:
- `app/page.tsx` - Public home branding
- `app/contractor/portal/page.tsx` - Contractor portal identity
- `app/contractor/join/page.tsx` - Contractor onboarding identity
