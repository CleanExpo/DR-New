# NRPG Contractor Onboarding UI Guide

## Overview

This is a complete multi-step contractor onboarding wizard for the NRPG Platform CRM. It allows Australian restoration contractors to register, verify their business, upload qualifications, and subscribe to coverage areas.

## Features

- **7-Step Registration Process**: Account creation, business details, service selection, qualifications, insurance, coverage, and review
- **Form Validation**: Real-time validation using Zod schemas and React Hook Form
- **Document Uploads**: Drag & drop file uploads for certificates and insurance documents
- **Auto-save**: Progress automatically saved to localStorage every 500ms
- **Resume Functionality**: Users can resume incomplete applications
- **Interactive Map**: Coverage area selection with Google Maps integration
- **Responsive Design**: Mobile-first, works on all devices
- **Australian Compliance**: ABN validation, Australian phone numbers, state selection

## File Structure

```
app/
├── onboarding/
│   ├── layout.tsx              # Onboarding layout with header/footer
│   ├── page.tsx                # Main wizard page
│   └── success/
│       └── page.tsx            # Success confirmation page
└── api/
    ├── upload/
    │   └── onboarding/
    │       └── route.ts        # File upload API endpoint
    └── contractor/
        └── onboarding/
            └── route.ts        # Application submission endpoint

components/
└── onboarding/
    ├── ProgressBar.tsx         # Visual progress indicator
    ├── StepNavigation.tsx      # Next/Back navigation buttons
    ├── DocumentUpload.tsx      # File upload component
    ├── CoverageMap.tsx         # Google Maps integration
    └── steps/
        ├── AccountCreation.tsx         # Step 1
        ├── BusinessDetails.tsx         # Step 2
        ├── ServiceSelection.tsx        # Step 3
        ├── QualificationUpload.tsx     # Step 4
        ├── InsuranceCompliance.tsx     # Step 5
        ├── CoverageSelection.tsx       # Step 6
        └── ReviewSubmit.tsx            # Step 7

lib/
├── contexts/
│   └── OnboardingContext.tsx   # Global state management
└── validation/
    └── onboarding.ts           # Zod schemas and constants
```

## Step-by-Step Breakdown

### Step 1: Account Creation
**Component**: `AccountCreation.tsx`

- Email address with validation
- Password with strength indicator (min 8 chars, uppercase, number, special char)
- Confirm password
- Full name
- Terms and conditions checkbox
- NRPG membership agreement checkbox

**Validation**: `accountSchema`

### Step 2: Business Details
**Component**: `BusinessDetails.tsx`

- Business name
- ABN (formatted as XX XXX XXX XXX)
- Business phone (Australian mobile format)
- Business address (street, suburb, state, postcode)
- Years in business
- Employee count (dropdown: 1-5, 6-10, 11-20, 21-50, 50+)

**Validation**: `businessSchema`

### Step 3: Service Selection
**Component**: `ServiceSelection.tsx`

Services offered (multiple selection):
- Water Damage Restoration (WRT required)
- Fire & Smoke Damage (FSRT required)
- Mould Remediation (AMRT required)
- Storm Damage (WRT or FSRT required)
- Biohazard Cleanup (AHST required)
- Sewage Cleanup (WRT + AHST required)
- Contents Restoration (OCT required)
- Structural Drying (WRT required)

Each service card displays:
- Service icon
- Required IICRC certification
- Average job value

**Validation**: `serviceSchema`

### Step 4: IICRC Qualifications
**Component**: `QualificationUpload.tsx`

For each qualification:
- Qualification type (dropdown)
  - WRT - Water Restoration Technician
  - FSRT - Fire & Smoke Restoration Technician
  - AMRT - Applied Microbial Remediation Technician
  - AHST - Applied Hazardous Substances Technician
  - OCT - Odor Control Technician
  - OSHA - Occupational Safety & Health
  - CMRT - Carpet Maintenance & Restoration Technician
  - FSDT - Fire & Smoke Damage Technician
  - ASD - Applied Structural Drying
  - IICRCT - Certified Restorer
  - OTHER - Other IICRC Certification

- Certificate number
- Issue date
- Expiry date
- Certificate upload (PDF, JPG, PNG)
- Service types covered (auto-populated)

Users can add multiple qualifications. At least one is required.

**Validation**: `qualificationSchema`

### Step 5: Insurance & Compliance
**Component**: `InsuranceCompliance.tsx`

**Public Liability Insurance**:
- Policy number
- Provider
- Coverage amount (minimum $10 million)
- Expiry date
- Certificate upload

**Workers Compensation Insurance**:
- Policy number
- Provider
- Expiry date
- Certificate upload

**Business Documents**:
- ABN certificate upload (required)
- Business license upload (optional)

**Validation**: `insuranceSchema`

### Step 6: Coverage Area & Subscription
**Component**: `CoverageSelection.tsx`

**Base Location**:
- Address autocomplete
- GPS coordinates
- Interactive map showing coverage area

**Coverage Tiers**:

1. **Basic** - $99/month
   - 25km coverage radius
   - 5-10 jobs/month estimated
   - Basic job alerts
   - Email support

2. **Standard** - $199/month (POPULAR)
   - 50km coverage radius
   - 15-25 jobs/month estimated
   - Priority job alerts
   - Phone & email support
   - Featured contractor badge

3. **Premium** - $349/month
   - 100km coverage radius
   - 30-50 jobs/month estimated
   - Instant job alerts
   - 24/7 priority support
   - Featured contractor badge
   - Marketing materials

4. **Rural** - $499/month
   - 200km coverage radius
   - 10-20 jobs/month estimated
   - Priority rural job alerts
   - 24/7 priority support
   - Travel compensation priority

**Validation**: `coverageSchema`

### Step 7: Review & Submit
**Component**: `ReviewSubmit.tsx`

- Collapsible sections showing all entered data
- Edit button for each section (returns to that step)
- Final terms acceptance checkbox
- Submit button
- Explanation of verification process (24-48 hours)

**Validation**: `reviewSchema`

## State Management

### OnboardingContext

Located in `lib/contexts/OnboardingContext.tsx`

**State**:
```typescript
interface OnboardingContextData {
  account: Partial<AccountData>;
  business: Partial<BusinessData>;
  services: Partial<ServiceData>;
  qualifications: Partial<QualificationData>;
  insurance: Partial<InsuranceData>;
  coverage: Partial<CoverageData>;
  review: Partial<ReviewData>;
}
```

**Methods**:
- `updateData(step, data)` - Update specific step data
- `goToStep(step)` - Navigate to specific step
- `nextStep()` - Go to next step
- `prevStep()` - Go to previous step
- `resetOnboarding()` - Clear all data
- `saveProgress()` - Manually save to localStorage

**Auto-save**:
Data is automatically saved to localStorage with 500ms debounce on any change.

## Validation Schemas

Located in `lib/validation/onboarding.ts`

All schemas use Zod for runtime validation:

- `accountSchema` - Account creation
- `businessSchema` - Business details
- `serviceSchema` - Service selection
- `qualificationSchema` - IICRC qualifications
- `insuranceSchema` - Insurance and compliance
- `coverageSchema` - Coverage area and subscription
- `reviewSchema` - Final review
- `onboardingDataSchema` - Combined schema

## API Endpoints

### POST `/api/upload/onboarding`

Upload documents during onboarding.

**Request**: FormData with `file` field

**Response**:
```json
{
  "url": "/uploads/onboarding/1234567890-abc123.pdf",
  "filename": "1234567890-abc123.pdf"
}
```

**Validation**:
- Max file size: 5MB
- Allowed types: JPG, PNG, PDF

### POST `/api/contractor/onboarding`

Submit complete onboarding application.

**Request**:
```json
{
  "account": { ... },
  "business": { ... },
  "services": { ... },
  "qualifications": { ... },
  "insurance": { ... },
  "coverage": { ... },
  "review": { ... }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "contractorId": "abc123"
}
```

**Process**:
1. Validate all data
2. Check email doesn't exist
3. Hash password
4. Create User record
5. Create Contractor profile
6. Set status to PENDING_VERIFICATION
7. Send verification email (TODO)

## Environment Variables

```env
# Google Maps (for coverage map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here

# Database (Prisma)
DATABASE_URL=your_database_url
```

## Usage

### Start the onboarding flow

Navigate to `/onboarding`

### Resume incomplete application

If localStorage contains saved data, user will be prompted to resume or start fresh.

### Complete all steps

Fill out all 7 steps. Progress is auto-saved.

### Submit application

Review all details in Step 7 and submit. Application status will be PENDING_VERIFICATION.

### Success page

After submission, user is redirected to `/onboarding/success` showing:
- Confirmation message
- Next steps timeline
- Contact support options

## Styling

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui (Button, Input, Select, Checkbox, Label, etc.)
- **Colors**: Blue/Indigo gradient theme
- **Animations**: Smooth transitions, hover effects
- **Responsive**: Mobile-first design

## Accessibility

- ARIA labels on all form inputs
- Keyboard navigation support
- Focus management
- Error messages announced
- Color contrast WCAG AA compliant

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing Checklist

- [ ] All form validations working
- [ ] File uploads succeed
- [ ] Auto-save to localStorage
- [ ] Resume functionality
- [ ] Navigation between steps
- [ ] Edit from review step
- [ ] Final submission to API
- [ ] Success page displays
- [ ] Mobile responsive
- [ ] Accessibility checks

## Future Enhancements

1. **Payment Integration**: Stripe checkout for subscription
2. **Email Verification**: Send confirmation emails
3. **ABN Lookup**: Real-time ABN validation via API
4. **Google Places Autocomplete**: Better address search
5. **Document Preview**: Preview uploaded PDFs/images
6. **Progress Persistence**: Save to database for logged-in users
7. **Multi-language Support**: i18n for different languages
8. **SMS Notifications**: Send SMS for application updates

## Troubleshooting

### Files not uploading
- Check file size (max 5MB)
- Verify file type (JPG, PNG, PDF only)
- Ensure `/public/uploads/onboarding` directory exists and is writable

### Validation errors
- Check Zod schema definitions
- Ensure all required fields are filled
- Verify data types match schema

### localStorage not saving
- Check browser supports localStorage
- Verify no private/incognito mode
- Check browser storage limits

### Map not displaying
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
- Check Google Maps API is enabled
- Ensure billing is configured for Google Cloud project

## Support

For issues or questions:
- Email: support@nrpg.com.au
- Phone: 1300 000 000
- Documentation: [Internal Wiki Link]

---

**Version**: 1.0.0
**Last Updated**: 2025-11-04
**Author**: NRPG Development Team
