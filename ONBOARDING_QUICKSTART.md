# NRPG Contractor Onboarding - Quick Start Guide

## Installation & Setup

### 1. Verify Dependencies

All required dependencies are already in `package.json`:

```bash
# Core dependencies
- next (14.2.32)
- react (18.3.1)
- react-hook-form (7.52.2)
- zod (3.25.76)
- @hookform/resolvers (5.2.1)
- react-dropzone (14.3.8)
- react-hot-toast (2.6.0)
- @react-google-maps/api (2.20.7)

# UI components (shadcn/ui)
- @radix-ui/* (various)
- lucide-react (0.424.0)
```

### 2. Environment Variables

Create or update `.env.local`:

```env
# Google Maps API (required for coverage map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Database
DATABASE_URL=your_postgresql_connection_string

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Schema

The onboarding system requires these Prisma models (add to `prisma/schema.prisma` if not present):

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(CONTRACTOR)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  contractor Contractor?
}

model Contractor {
  id                      String   @id @default(cuid())
  userId                  String   @unique
  user                    User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  businessName            String
  abn                     String   @unique
  phone                   String
  address                 String
  yearsInBusiness         Int
  employeeCount           String

  services                Json     // Array of service IDs
  qualifications          Json     // Array of qualification objects
  publicLiabilityInsurance Json    // Insurance details
  workersCompensation     Json     // Insurance details
  businessDocuments       Json     // Document URLs

  baseLocation            Json     // { lat, lng, address }
  coverageRadius          Int      // in km
  subscriptionTier        String   // BASIC, STANDARD, PREMIUM, RURAL

  status                  String   @default("PENDING_VERIFICATION")
  verificationStatus      String   @default("PENDING")

  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}

enum Role {
  ADMIN
  CONTRACTOR
  CLIENT
}
```

Run migrations:
```bash
npx prisma migrate dev --name add_contractor_onboarding
npx prisma generate
```

### 4. Create Upload Directory

```bash
mkdir -p public/uploads/onboarding
```

Ensure this directory is writable by the application.

### 5. Start Development Server

```bash
npm run dev
```

Navigate to: `http://localhost:3000/onboarding`

## File Structure Created

```
✅ app/onboarding/layout.tsx
✅ app/onboarding/page.tsx
✅ app/onboarding/success/page.tsx
✅ app/api/upload/onboarding/route.ts
✅ app/api/contractor/onboarding/route.ts

✅ components/onboarding/ProgressBar.tsx
✅ components/onboarding/StepNavigation.tsx
✅ components/onboarding/DocumentUpload.tsx
✅ components/onboarding/CoverageMap.tsx

✅ components/onboarding/steps/AccountCreation.tsx
✅ components/onboarding/steps/BusinessDetails.tsx
✅ components/onboarding/steps/ServiceSelection.tsx
✅ components/onboarding/steps/QualificationUpload.tsx
✅ components/onboarding/steps/InsuranceCompliance.tsx
✅ components/onboarding/steps/CoverageSelection.tsx
✅ components/onboarding/steps/ReviewSubmit.tsx

✅ lib/contexts/OnboardingContext.tsx
✅ lib/validation/onboarding.ts

✅ ONBOARDING_UI_GUIDE.md (full documentation)
✅ ONBOARDING_QUICKSTART.md (this file)
```

## Testing the Flow

### Step-by-Step Test

1. **Navigate to** `/onboarding`
2. **Step 1 - Account Creation**
   - Enter email: `test@example.com`
   - Create password: `Test123!@#`
   - Full name: `John Smith`
   - Accept both checkboxes
   - Click Continue

3. **Step 2 - Business Details**
   - Business name: `Smith Restoration`
   - ABN: `12 345 678 901`
   - Phone: `0412345678`
   - Address: Complete all fields
   - Years in business: `5`
   - Employees: `6-10`
   - Click Continue

4. **Step 3 - Service Selection**
   - Select at least one service (e.g., Water Damage Restoration)
   - Click Continue

5. **Step 4 - IICRC Qualifications**
   - Click "Add Another Qualification"
   - Select qualification type: `WRT`
   - Certificate number: `WRT-12345`
   - Set issue and expiry dates
   - Upload a test PDF/image
   - Click Continue

6. **Step 5 - Insurance & Compliance**
   - Fill in public liability details
   - Coverage amount: `10000000` (minimum)
   - Upload certificate
   - Fill in workers compensation
   - Upload certificate
   - Upload ABN certificate
   - Click Continue

7. **Step 6 - Coverage Selection**
   - Enter base address
   - Select a coverage tier (e.g., Standard)
   - Map should display coverage radius
   - Click Continue

8. **Step 7 - Review & Submit**
   - Review all sections
   - Use Edit buttons to make changes if needed
   - Accept final terms checkbox
   - Click Submit Application

9. **Success Page**
   - Should redirect to `/onboarding/success`
   - Shows confirmation and next steps

## Features to Test

### Auto-save
- Fill out Step 1
- Close browser tab
- Reopen `/onboarding`
- Should see "Resume Your Application?" prompt

### Validation
- Try submitting each step without required fields
- Verify error messages appear
- Check ABN format validation (XX XXX XXX XXX)
- Check phone validation (10 digits starting with 04)
- Check password strength requirements

### File Uploads
- Try uploading non-PDF/JPG/PNG file (should fail)
- Try uploading file > 5MB (should fail)
- Upload valid file (should succeed)
- Remove uploaded file (should work)

### Navigation
- Use Back button to go to previous steps
- Edit from Review step (should return to specific step)
- Verify data persists across navigation

### Responsive Design
- Test on mobile device or browser devtools
- Verify all steps work on small screens
- Check touch interactions work

## Common Issues & Solutions

### Issue: Map not displaying
**Solution**:
1. Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
2. Enable Maps JavaScript API in Google Cloud Console
3. Check browser console for API errors

### Issue: File upload fails
**Solution**:
1. Check `public/uploads/onboarding` directory exists
2. Verify file size < 5MB
3. Check file type is JPG, PNG, or PDF
4. Check browser console for errors

### Issue: Form validation not working
**Solution**:
1. Check all required fields are filled
2. Verify data types match Zod schemas
3. Check browser console for validation errors

### Issue: Auto-save not working
**Solution**:
1. Check localStorage is enabled in browser
2. Not using private/incognito mode
3. Check browser storage quota

### Issue: API submission fails
**Solution**:
1. Verify database connection
2. Check Prisma schema matches models
3. Run `npx prisma generate`
4. Check API endpoint logs

## Customization

### Change Coverage Tiers

Edit `lib/validation/onboarding.ts`:

```typescript
export const COVERAGE_TIERS = [
  {
    id: 'BASIC',
    name: 'Basic',
    radius: 25,
    price: 99, // Change price
    // ... other properties
  },
  // ... other tiers
];
```

### Add/Remove Services

Edit `lib/validation/onboarding.ts`:

```typescript
export const SERVICE_TYPES = [
  {
    id: 'new-service',
    name: 'New Service Type',
    icon: '🔧',
    requiredCert: 'REQUIRED_CERT',
    avgJobValue: '$X,XXX - $XX,XXX',
  },
  // ... other services
];
```

### Change Validation Rules

Edit schemas in `lib/validation/onboarding.ts`:

```typescript
export const businessSchema = z.object({
  businessName: z.string().min(2), // Change minimum length
  // ... other fields
});
```

### Customize Styling

All components use Tailwind CSS classes. Edit component files to change:
- Colors: `bg-blue-500` → `bg-green-500`
- Spacing: `p-6` → `p-8`
- Typography: `text-lg` → `text-xl`

### Add Email Notifications

Edit `app/api/contractor/onboarding/route.ts`:

```typescript
// After successful creation
await sendEmail({
  to: data.account.email,
  subject: 'Application Received',
  template: 'onboarding-confirmation',
  data: { name: data.account.fullName }
});
```

## Production Deployment

### Checklist

- [ ] Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in production
- [ ] Configure database with production credentials
- [ ] Set up file storage (AWS S3, Cloudinary, etc.) instead of local uploads
- [ ] Implement email service for notifications
- [ ] Add Stripe integration for payment processing
- [ ] Set up monitoring and error tracking
- [ ] Configure rate limiting on API endpoints
- [ ] Add CAPTCHA to prevent spam submissions
- [ ] Implement proper logging
- [ ] Set up backup for uploaded documents

### Environment Variables (Production)

```env
# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=prod_api_key

# Database
DATABASE_URL=prod_postgresql_url

# App
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXTAUTH_URL=https://yourdomain.com

# Email
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Stripe (for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# File Storage
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_S3_BUCKET=your-bucket
AWS_REGION=ap-southeast-2
```

## Support

For detailed documentation, see: `ONBOARDING_UI_GUIDE.md`

For technical issues:
- Check browser console for errors
- Review server logs
- Check database connections
- Verify environment variables

## Next Steps

1. ✅ Test complete onboarding flow
2. ✅ Verify auto-save functionality
3. ✅ Test file uploads
4. ✅ Check responsive design
5. ⏳ Integrate Stripe for payments
6. ⏳ Set up email notifications
7. ⏳ Add admin verification dashboard
8. ⏳ Implement contractor dashboard

---

**Quick Links**:
- Onboarding Flow: `/onboarding`
- Success Page: `/onboarding/success`
- API Upload: `/api/upload/onboarding`
- API Submit: `/api/contractor/onboarding`

**Status**: ✅ Complete and ready for testing
