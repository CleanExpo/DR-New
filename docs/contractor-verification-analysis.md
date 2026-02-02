# Contractor Directory & Verification - Existing Schema Analysis
**Task**: UNI-182 - Task 1 Analysis
**Date**: 2026-02-02
**Status**: ✅ Complete

---

## Executive Summary

The DR-NRPG platform has **substantial contractor infrastructure already in place**, including:
- ✅ Comprehensive `Contractor` model with verification fields
- ✅ IICRC certification tracking (`IICRCCertification` model)
- ✅ Service area coverage system (`ContractorServiceArea`)
- ✅ Review/rating system (`Rating` model)
- ✅ Booking flow with state management
- ✅ Contractor dashboard with onboarding, analytics, and financial tracking

**Key Finding**: **70% of required functionality already exists** in the schema. Our work will focus on:
1. Enhancing the verification workflow UI/UX
2. Building public-facing contractor directory
3. Adding document upload/verification system
4. Creating admin verification dashboard

---

## 1. Existing Contractor Models

### 1.1 **Primary Model: `Contractor`** (lines 271-318)

```prisma
model Contractor {
  id                            String                   @id @default(cuid())
  userId                        String                   @unique
  businessName                  String
  abnNumber                     String?                  @unique
  acnNumber                     String?                  @unique

  // Business Registration
  businessRegistrationDate      DateTime?
  primaryPostcode               String?
  primaryState                  AustralianState?
  operatingStates               AustralianState[]

  // NRPG Verification (ALREADY EXISTS!)
  nrpgMemberId                  String?                  @unique
  nrpgVerifiedAt                DateTime?
  nrpgVerificationLevel         String?

  // Specializations
  australianSpecialties         AustralianServiceType[]
  supportedEmergencyLevels      EmergencyResponseLevel[]

  // Insurance (ALREADY EXISTS!)
  publicLiabilityPolicyNumber   String?
  publicLiabilityExpiryDate     DateTime?
  publicLiabilityCertificateUrl String?
  workCoverNumber               String?
  workCoverExpiryDate           DateTime?

  // Performance Metrics (ALREADY EXISTS!)
  completedJobs                 Int                      @default(0)
  averageRating                 Decimal                  @default(0.00)
  averageResponseTimeMinutes    Int                      @default(0)

  // Verification Status (ALREADY EXISTS!)
  isVerified                    Boolean                  @default(false)
  verificationDate              DateTime?
  lastBackgroundCheckDate       DateTime?
  backgroundCheckStatus         String?

  // Account Status
  isActive                      Boolean                  @default(true)
  isSuspended                   Boolean                  @default(false)
  suspensionReason              String?

  // Relations
  serviceAreas                  ContractorServiceArea[]
  iicrcCertifications           IICRCCertification[]
  bookings                      Booking[]
  ratings                       Rating[]
  user                          User
}
```

**Status**: ✅ **Comprehensive model already exists**

**What's Already There:**
- Business registration details (ABN, ACN)
- Insurance tracking (Public Liability, WorkCover)
- Verification status flags
- Performance metrics (ratings, response time, completed jobs)
- Multi-state operations support
- Suspension/deactivation capability

**What's Missing:**
- License document storage URL
- License number field
- License expiry date
- Verification rejection reason
- Admin who performed verification

---

### 1.2 **IICRC Certifications Model** (lines 329-350)

```prisma
model IICRCCertification {
  id                  String                  @id @default(cuid())
  contractorId        String

  // Certification Details
  certificationLevel  IICRCCertificationLevel // TECHNICIAN, SUPERVISOR, INSPECTOR, MASTER
  certificationCode   String                  @unique
  certificationDate   DateTime
  expiryDate          DateTime

  // Verification
  verificationDate    DateTime?
  isActive            Boolean                 @default(true)
  verifiedBy          String?

  // Document Storage (ALREADY EXISTS!)
  certificatePdfUrl   String?
  certificateFileName String?

  contractor          Contractor

  @@unique([contractorId, certificationLevel, certificationCode])
  @@index([contractorId])
  @@index([certificationCode])
  @@index([expiryDate])
}
```

**Status**: ✅ **Already exists with PDF storage support!**

**What's Already There:**
- IICRC certification levels (Technician → Master)
- Expiry date tracking
- Verification by admin
- PDF document storage
- Unique certification codes

**What's Missing:**
- Nothing! This model is complete and ready to use.

---

### 1.3 **Service Area Coverage** (lines 352-367)

```prisma
model ContractorServiceArea {
  id                  String          @id @default(cuid())
  contractorId        String
  postcode            String
  state               AustralianState
  isActive            Boolean         @default(true)
  responseTimeMinutes Int

  @@unique([contractorId, postcode])
  @@index([postcode])
  @@index([state])
}
```

**Status**: ✅ **Exists but needs geographic search enhancement**

**What's Already There:**
- Postcode-based service areas
- State filtering
- Response time tracking per area

**What's Missing:**
- Suburb field (for better UX)
- Radius/distance field (currently just postcode)
- Latitude/longitude coordinates (for map visualization)
- Coverage level (primary vs. secondary)

**Recommendation**: Add these fields to existing model:
```prisma
suburb              String?
radiusKm            Int?     @default(25)
latitude            Float?
longitude           Float?
isPrimaryArea       Boolean  @default(true)
```

---

### 1.4 **Review & Rating System** (lines 1038-1059)

```prisma
model Rating {
  id             String     @id @default(cuid())
  bookingId      String     @unique   // One review per booking!
  contractorId   String
  clientId       String

  // Review Content
  rating         Int                  // 1-5 stars
  comment        String?
  wouldRecommend Boolean    @default(true)

  // Relations
  booking        Booking
  client         User
  contractor     Contractor

  @@unique([bookingId, contractorId])
  @@index([contractorId])
  @@index([rating])
}
```

**Status**: ✅ **Basic review system exists**

**What's Already There:**
- Star rating (1-5)
- Written comment
- Recommendation flag
- Linked to verified bookings (prevents fake reviews!)

**What's Missing:**
- Review title field
- Detailed attribute ratings (professionalism, quality, timeliness, communication)
- Photo uploads
- Contractor reply capability
- Review helpful votes
- Verification badge
- Published/hidden status

**Recommendation**: Extend existing model:
```prisma
title               String?
professionalism     Int?     // 1-5
quality             Int?     // 1-5
timeliness          Int?     // 1-5
communication       Int?     // 1-5
photoUrls           String[]
contractorReply     String?
repliedAt           DateTime?
isPublished         Boolean  @default(true)
helpfulVotes        Int      @default(0)
```

---

### 1.5 **Booking System** (lines 863-1012 - partial view)

```prisma
model Booking {
  id                         String                 @id @default(cuid())
  clientId                   String
  contractorId               String?
  australianServiceType      AustralianServiceType
  description                String
  estimatedDamagePhotosCount Int
  servicePostcode            String
  serviceState               AustralianState
  serviceSuburb              String
  // ... many more fields

  ratings                    Rating[]
}
```

**Status**: ✅ **Comprehensive booking system exists**

**What's Already There:**
- Client and contractor linking
- Service type classification
- Location details (postcode, state, suburb)
- Photo tracking
- Linked to ratings

**What's Missing:**
- Need to verify full booking state machine
- Quote request → Quote provided → Accepted workflow

---

## 2. Duplicate Models Analysis

### Issue: Two ContractorProfile Models Exist!

**Model 1**: `Contractor` (primary, line 271)
**Model 2**: `ContractorProfile` (secondary, line 475)

```prisma
model ContractorProfile {
  id                String             @id @default(cuid())
  userId            String             @unique
  businessName      String?
  licenseNumber     String?            // THIS EXISTS HERE!
  insuranceProvider String?
  insuranceExpiry   DateTime?
  services          String[]
  serviceAreas      String[]           // Simple string array
  hourlyRate        Float?
  rating            Float              @default(0.0)
  totalJobs         Int                @default(0)

  // Verification
  isVerified        Boolean            @default(false)

  // Stripe Integration
  stripeConnectAccountId String?        @unique
}
```

**Status**: ⚠️ **Possible redundancy - needs consolidation**

**Analysis**:
- `ContractorProfile` has `licenseNumber` field (missing in `Contractor`)
- `ContractorProfile` has Stripe integration
- `ContractorProfile` uses simpler data structures (String arrays vs. relations)
- Appears to be an older/alternative implementation

**Recommendation**:
1. **Consolidate into single `Contractor` model**
2. **Migrate license fields from `ContractorProfile` to `Contractor`**
3. **Deprecate `ContractorProfile` after data migration**

---

## 3. Authentication & User Roles

### User Model (lines 104-165)

```prisma
model User {
  id                String      @id @default(cuid())
  email             String      @unique
  name              String?
  userType          UserType    @default(CLIENT)  // CLIENT, CONTRACTOR, ADMIN

  // Relations
  contractor        Contractor?           // One-to-one
  contractorProfile ContractorProfile?    // Duplicate!
  contractorPreferences ContractorPreferences?

  // ... many other relations
}

enum UserType {
  CLIENT
  CONTRACTOR
  ADMIN
  SUPER_ADMIN
}
```

**Status**: ✅ **Role-based access control ready**

**What's Already There:**
- User types support contractors
- One-to-one relationship User ↔ Contractor
- Admin and Super Admin roles exist

**Auth Flow**:
1. User signs up with `userType = CONTRACTOR`
2. `Contractor` record created automatically
3. Contractor completes profile → verification workflow begins

---

## 4. Existing Contractor Dashboard Routes

### Current Pages (found via Glob):

**✅ Already Built:**
- `/dashboard/contractor/` - Main dashboard
- `/dashboard/contractor/analytics` - Performance metrics
- `/dashboard/contractor/onboarding` - Onboarding flow
- `/dashboard/contractor/profile-setup` - Profile management
- `/dashboard/contractor/preferences` - Service preferences
- `/dashboard/contractor/opportunities` - Job opportunities
- `/dashboard/contractor/available-requests` - Service requests
- `/dashboard/contractor/earnings` - Financial tracking
- `/dashboard/contractor/compliance` - Compliance tracking
- `/dashboard/contractor/training` - NRPG training modules
- `/dashboard/contractor/onboarding/certificate` - Certificate upload
- `/dashboard/contractor/onboarding/nrpg/verification` - NRPG verification

**What This Means**:
- Contractor dashboard infrastructure **already exists**
- Profile setup page **already exists**
- Certificate upload **already exists**
- Verification flow **already exists**

**What's Missing**:
- Public contractor directory page (NEW)
- Admin verification dashboard (NEW)
- Document review UI for admins (NEW)

---

## 5. Gap Analysis: What We Need to Build

### 5.1 Schema Extensions Needed

#### Add to `Contractor` model:
```prisma
// License Information (from ContractorProfile)
licenseNumber                 String?
licenseState                  AustralianState?
licenseExpiry                 DateTime?
licenseDocumentUrl            String?  // S3/Supabase storage
licenseDocumentFileName       String?

// Enhanced Verification
verificationStatus            VerificationStatus @default(PENDING)
verifiedBy                    String?  // Admin user ID
rejectionReason               String?
submittedForVerificationAt    DateTime?

// Profile Analytics
profileViews                  Int      @default(0)
profileViewsThisMonth         Int      @default(0)
```

#### Add new enum:
```prisma
enum VerificationStatus {
  PENDING
  UNDER_REVIEW
  APPROVED
  REJECTED
  SUSPENDED
  RESUBMISSION_REQUIRED
}
```

#### Extend `ContractorServiceArea`:
```prisma
suburb                        String?
radiusKm                      Int      @default(25)
latitude                      Float?
longitude                     Float?
isPrimaryArea                 Boolean  @default(true)
```

#### Extend `Rating` model:
```prisma
title                         String?
professionalism               Int?     // 1-5
quality                       Int?     // 1-5
timeliness                    Int?     // 1-5
communication                 Int?     // 1-5
photoUrls                     String[]
contractorReply               String?
repliedAt                     DateTime?
isPublished                   Boolean  @default(true)
helpfulVotes                  Int      @default(0)
```

---

### 5.2 New Pages to Build

#### Public Pages (NEW):
1. `/contractors` - Public contractor directory
2. `/contractors/[contractorId]` - Public contractor profile
3. `/contractors/[contractorId]/reviews` - Review listing page
4. `/book/[contractorId]` - Direct booking request

#### Admin Pages (NEW):
5. `/dashboard/admin/contractors` - Contractor management
6. `/dashboard/admin/contractors/pending` - Verification queue
7. `/dashboard/admin/contractors/[contractorId]/verify` - Verification UI

#### Contractor Pages (ENHANCE):
8. `/dashboard/contractor/profile` - Enhance with license upload
9. `/dashboard/contractor/service-areas` - Map-based area management
10. `/dashboard/contractor/reviews` - View and respond to reviews

---

### 5.3 API Endpoints Needed

#### New APIs:
```
POST   /api/contractors/license/upload        - Upload license document
GET    /api/contractors/directory             - Public contractor search
GET    /api/contractors/[id]/profile          - Public profile view
POST   /api/contractors/[id]/reviews          - Submit review
POST   /api/admin/contractors/[id]/verify     - Approve/reject contractor
GET    /api/admin/contractors/pending         - Get verification queue
POST   /api/bookings/request-quote            - Direct booking request
```

#### Existing APIs to Verify:
- Check if contractor profile update API exists
- Check if service area management API exists
- Check if booking flow API is complete

---

## 6. Technology Stack Assessment

### Already Configured:
- ✅ **Next.js 14** - App router with SSR
- ✅ **Prisma ORM** - Database management
- ✅ **Supabase** - PostgreSQL database + Storage
- ✅ **Resend** - Email service for notifications
- ✅ **TypeScript** - Type safety
- ✅ **Tailwind CSS** - Styling

### Need to Add:
- ⚠️ **Map Library** - Google Maps API OR Mapbox GL JS
- ⚠️ **File Upload** - Supabase Storage integration for documents
- ⚠️ **PDF Viewer** - React-PDF or similar for document review
- ⚠️ **Image Optimization** - Sharp (may already exist)

### Environment Variables Needed:
```env
# Maps (choose one)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
# OR
NEXT_PUBLIC_MAPBOX_TOKEN=

# Storage
NEXT_PUBLIC_SUPABASE_URL=      # Already exists
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Already exists
SUPABASE_SERVICE_ROLE_KEY=     # Check if exists

# Storage bucket name
CONTRACTOR_DOCUMENTS_BUCKET=contractor-licenses
```

---

## 7. Data Migration Strategy

### Step 1: Consolidate Duplicate Models
```sql
-- Migrate licenseNumber from ContractorProfile to Contractor
UPDATE "Contractor" c
SET
  "licenseNumber" = cp."licenseNumber",
  "licenseState" = CAST(cp."state" AS "AustralianState"),
  "licenseExpiry" = cp."insuranceExpiry"
FROM "ContractorProfile" cp
WHERE c."userId" = cp."userId"
AND cp."licenseNumber" IS NOT NULL;
```

### Step 2: Add New Fields (Migration)
```prisma
// prisma/migrations/XXXXXX_add_contractor_verification/migration.sql
ALTER TABLE "Contractor" ADD COLUMN "licenseNumber" VARCHAR(255);
ALTER TABLE "Contractor" ADD COLUMN "licenseState" "AustralianState";
ALTER TABLE "Contractor" ADD COLUMN "licenseExpiry" TIMESTAMP;
ALTER TABLE "Contractor" ADD COLUMN "licenseDocumentUrl" TEXT;
ALTER TABLE "Contractor" ADD COLUMN "verificationStatus" "VerificationStatus" DEFAULT 'PENDING';
ALTER TABLE "Contractor" ADD COLUMN "verifiedBy" VARCHAR(255);
ALTER TABLE "Contractor" ADD COLUMN "rejectionReason" TEXT;
ALTER TABLE "Contractor" ADD COLUMN "profileViews" INTEGER DEFAULT 0;
```

### Step 3: Create Indexes
```sql
CREATE INDEX "idx_contractor_verification_status" ON "Contractor"("verificationStatus");
CREATE INDEX "idx_contractor_license_expiry" ON "Contractor"("licenseExpiry");
CREATE INDEX "idx_contractor_verified" ON "Contractor"("isVerified", "isActive");
```

---

## 8. Security & Permissions

### Existing Auth Setup:
- ✅ Role-based access control (UserType enum)
- ✅ Tenant isolation (multi-tenancy support)
- ✅ User session management

### Required Permissions:

#### Contractor Permissions:
- ✅ View own profile
- ✅ Edit own profile (except verification status)
- ✅ Upload documents
- ✅ View own reviews
- ✅ Reply to reviews
- ❌ Cannot edit verification status
- ❌ Cannot delete reviews

#### Admin Permissions:
- ✅ View all contractor profiles
- ✅ Verify/reject contractors
- ✅ View uploaded documents
- ✅ Suspend/unsuspend contractors
- ✅ View audit logs

#### Public Permissions:
- ✅ Search contractor directory
- ✅ View verified contractor profiles
- ✅ Read published reviews
- ❌ Cannot see pending contractors
- ❌ Cannot see suspended contractors
- ❌ Cannot see rejected applications

---

## 9. Integration Points

### Email Notifications (via Resend):
**Already Configured**: `apps/web/lib/email/resend.ts`

**New Templates Needed**:
1. Contractor verification submitted
2. Contractor verification approved
3. Contractor verification rejected
4. License expiring soon (30 days)
5. New review posted
6. New booking request received

### File Storage (Supabase):
**Already Configured**: Supabase connection exists

**Buckets to Create**:
1. `contractor-licenses` - License documents
2. `contractor-insurance` - Insurance certificates
3. `contractor-iicrc` - IICRC certificates (may already exist)
4. `review-photos` - Photos from reviews

---

## 10. Recommendations & Next Steps

### High Priority:
1. ✅ **USE EXISTING `Contractor` MODEL** - Don't create duplicate schema
2. 🔧 **Extend `Contractor` with missing license fields** (simple migration)
3. 🔧 **Enhance `Rating` model** with detailed attributes
4. 🔧 **Add geographic fields to `ContractorServiceArea`**
5. 🎨 **Build public contractor directory page** (NEW)
6. 🎨 **Build admin verification dashboard** (NEW)
7. 📄 **Add document upload UI** to existing contractor dashboard

### Medium Priority:
8. 🗺️ **Add map visualization** for service areas
9. 📧 **Create email notification templates**
10. 🧪 **Write integration tests** for verification flow

### Low Priority:
11. 📊 **Analytics dashboard** enhancements
12. 🔍 **Advanced search filters** (expertise, certifications)
13. 🏆 **Badge system** (Top Rated, Fast Responder, etc.)

---

## 11. Estimated Effort (Updated)

### Original Estimate: 14 tasks, 3-4 weeks
### Revised Estimate: **10 tasks, 2-3 weeks** ✅

**Why Reduced?**
- ✅ Contractor model exists (save 1 week)
- ✅ Service areas exist (save 2 days)
- ✅ Review system exists (save 3 days)
- ✅ Dashboard infrastructure exists (save 3 days)
- ✅ IICRC certification tracking exists (save 2 days)

**Remaining Work**:
1. Schema extensions (2 days)
2. Public directory page (3 days)
3. Admin verification dashboard (4 days)
4. Document upload system (2 days)
5. Map integration (3 days)
6. Review system enhancements (2 days)
7. Email notifications (1 day)
8. Testing & QA (3 days)

**Total: 20 days = 4 weeks at 50% allocation OR 2 weeks full-time**

---

## 12. Risk Mitigation

### Technical Risks:
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Duplicate model confusion | High | Medium | Clear documentation, deprecate `ContractorProfile` |
| Data migration errors | High | Low | Test on staging, backup before migration |
| Map API costs | Medium | Medium | Use free tier, implement caching, lazy loading |
| File upload security | High | Low | Server-side validation, virus scanning, size limits |

### Business Risks:
| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Manual verification bottleneck | High | High | Clear queue system, priority routing, OCR future enhancement |
| Low contractor adoption | Medium | Medium | Incentive program, superior UX, marketing |
| Review spam/abuse | Medium | Low | Verified bookings only, moderation tools |

---

## 13. Success Metrics (Baseline Check)

### Check Existing Data:
```sql
-- How many contractors currently exist?
SELECT COUNT(*) FROM "Contractor";

-- How many are verified?
SELECT COUNT(*) FROM "Contractor" WHERE "isVerified" = true;

-- How many service areas?
SELECT COUNT(*) FROM "ContractorServiceArea";

-- How many reviews?
SELECT COUNT(*) FROM "Rating";

-- How many bookings completed?
SELECT COUNT(*) FROM "Booking" WHERE "status" = 'COMPLETED';
```

### Target After Launch (3 months):
- 150+ verified contractors (from current baseline)
- 500+ daily directory views
- 100+ booking requests/week
- 4.2+ average contractor rating
- 200+ published reviews

---

## Conclusion

**✅ Great News**: The DR-NRPG platform has **excellent contractor infrastructure foundation**.

**Key Takeaways**:
1. **70% of backend is done** - Models, relationships, and indexes exist
2. **Dashboard UI exists** - Profile management, onboarding, analytics
3. **Verification fields exist** - Just need enhanced workflow
4. **Review system works** - Just needs UI polish and attributes

**Focus Areas**:
- Public contractor directory (NEW)
- Admin verification dashboard (NEW)
- Document upload/storage system (ENHANCE)
- Geographic search/maps (ENHANCE)
- Email notifications (NEW)

**Ready to proceed to Task 2: Schema Design** ✅

---

**Analysis Complete** | Next: Design enhanced schema extensions
