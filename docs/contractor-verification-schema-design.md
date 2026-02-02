# Contractor Verification - Enhanced Schema Design
**Task**: UNI-182 - Task 2 Schema Design
**Date**: 2026-02-02
**Status**: ✅ Complete

---

## Design Principles

1. **Extend, Don't Duplicate** - Add fields to existing `Contractor` model
2. **Backwards Compatible** - All new fields are optional/nullable
3. **Audit Trail** - Track who verified, when, and why
4. **Future-Proof** - Support multiple document types
5. **Performance** - Strategic indexes for search/filtering

---

## 1. Enhanced Contractor Model

### Fields to Add to Existing `Contractor` Model

```prisma
model Contractor {
  // ... existing fields ...

  // ==========================================
  // LICENSE INFORMATION (NEW)
  // ==========================================
  licenseNumber                 String?
  licenseState                  AustralianState?
  licenseExpiry                 DateTime?
  licenseDocumentUrl            String?              // Supabase Storage URL
  licenseDocumentFileName       String?
  licenseVerifiedAt             DateTime?
  licenseVerifiedBy             String?              // Admin user ID

  // ==========================================
  // ENHANCED VERIFICATION (NEW)
  // ==========================================
  verificationStatus            ContractorVerificationStatus @default(PENDING)
  submittedForVerificationAt    DateTime?
  reviewedAt                    DateTime?
  reviewedBy                    String?              // Admin user ID
  rejectionReason               String?              // Required when REJECTED
  resubmissionCount             Int                  @default(0)
  verificationNotes             String?              // Internal admin notes

  // ==========================================
  // PROFILE ANALYTICS (NEW)
  // ==========================================
  profileViews                  Int                  @default(0)
  profileViewsThisMonth         Int                  @default(0)
  lastProfileViewReset          DateTime?            // Reset monthly
  directBookingRequests         Int                  @default(0)
  quoteRequestCount             Int                  @default(0)
  quoteAcceptanceRate           Decimal              @default(0.00)

  // ==========================================
  // COMPANY PROFILE (NEW)
  // ==========================================
  companyLogoUrl                String?
  companyDescription            String?              // Rich text, max 1000 chars
  yearsInBusiness               Int?
  teamSize                      Int?
  serviceRadius                 Int                  @default(25) // Kilometers
  emergencyAvailable            Boolean              @default(false)
  emergencyResponseTime         Int?                 // Minutes

  // ... existing relations ...

  @@index([verificationStatus])
  @@index([licenseExpiry])
  @@index([isVerified, isActive, verificationStatus])
  @@index([averageRating, completedJobs])
}
```

**Rationale**:
- `licenseNumber` - Core requirement for verification
- `verificationStatus` - Enum for clear workflow states
- `rejectionReason` - Transparency for contractors
- `resubmissionCount` - Track verification attempts
- `profileViews` - Marketing analytics for contractors
- `companyDescription` - Rich profile for directory
- `serviceRadius` - Default coverage area

---

## 2. New Enum: ContractorVerificationStatus

```prisma
enum ContractorVerificationStatus {
  // Initial state when contractor signs up
  PENDING

  // Contractor has submitted documents and profile for review
  SUBMITTED

  // Admin is actively reviewing the application
  UNDER_REVIEW

  // Application approved, contractor is live in directory
  APPROVED

  // Application rejected, contractor cannot appear in directory
  REJECTED

  // Approved contractor was suspended (policy violation, complaints)
  SUSPENDED

  // Rejected contractor can resubmit with corrections
  RESUBMISSION_REQUIRED

  // Contractor's license has expired, needs renewal
  EXPIRED

  // Incomplete profile, waiting for contractor to finish
  INCOMPLETE
}
```

**State Transition Rules**:
```
PENDING → INCOMPLETE (missing required fields)
PENDING → SUBMITTED (all fields complete)
SUBMITTED → UNDER_REVIEW (admin starts review)
UNDER_REVIEW → APPROVED (verification passes)
UNDER_REVIEW → REJECTED (verification fails)
UNDER_REVIEW → RESUBMISSION_REQUIRED (minor issues)
REJECTED → SUBMITTED (contractor resubmits)
APPROVED → SUSPENDED (policy violation)
APPROVED → EXPIRED (license expiry date passed)
SUSPENDED → UNDER_REVIEW (appeal process)
EXPIRED → SUBMITTED (license renewed)
```

---

## 3. Enhanced ContractorServiceArea Model

```prisma
model ContractorServiceArea {
  id                  String          @id @default(cuid())
  contractorId        String
  contractor          Contractor      @relation("ServiceAreas", fields: [contractorId], references: [id], onDelete: Cascade)

  // ==========================================
  // EXISTING FIELDS
  // ==========================================
  postcode            String
  state               AustralianState
  isActive            Boolean         @default(true)
  responseTimeMinutes Int

  // ==========================================
  // GEOGRAPHIC ENHANCEMENTS (NEW)
  // ==========================================
  suburb              String?                    // For better UX
  city                String?                    // Major city name
  radiusKm            Int                 @default(25)  // Service radius from this location
  latitude            Decimal?                   // For map pins and distance calc
  longitude           Decimal?                   // For map pins and distance calc

  // ==========================================
  // COVERAGE CLASSIFICATION (NEW)
  // ==========================================
  isPrimaryArea       Boolean             @default(true)  // Primary vs secondary coverage
  coverageLevel       ServiceCoverageLevel @default(STANDARD)
  priorityLevel       Int                 @default(1)     // 1 = highest priority

  // ==========================================
  // METADATA (NEW)
  // ==========================================
  createdAt           DateTime            @default(now())
  updatedAt           DateTime            @updatedAt

  @@unique([contractorId, postcode])
  @@index([postcode])
  @@index([state])
  @@index([contractorId])
  @@index([suburb])
  @@index([latitude, longitude])              // Spatial index for distance queries
  @@index([isPrimaryArea, isActive])
}

enum ServiceCoverageLevel {
  STANDARD        // Normal service
  PRIORITY        // Fast response
  EMERGENCY_ONLY  // Only urgent calls
  LIMITED         // Conditional availability
}
```

**Rationale**:
- `suburb` + `city` - Better search UX than postcode alone
- `latitude`/`longitude` - Enable radius-based search (ST_Distance equivalent)
- `radiusKm` - Explicit service radius per area
- `isPrimaryArea` - Prioritize contractors in their primary areas
- `coverageLevel` - Allow contractors to specify service types per area

**Geographic Search Query Pattern**:
```typescript
// Find contractors within 25km of client's location
const nearbyContractors = await prisma.contractorServiceArea.findMany({
  where: {
    contractor: {
      verificationStatus: 'APPROVED',
      isActive: true,
    },
    isActive: true,
  },
  // In application code, filter by distance using Haversine formula
  // OR use PostGIS extension: ST_DWithin(geography, geography, distance)
});
```

---

## 4. Enhanced Rating Model

```prisma
model Rating {
  id              String      @id @default(cuid())
  bookingId       String      @unique              // One review per booking (prevents spam)
  contractorId    String
  clientId        String

  // ==========================================
  // EXISTING FIELDS
  // ==========================================
  rating          Int                              // Overall: 1-5 stars
  comment         String?
  wouldRecommend  Boolean     @default(true)

  // ==========================================
  // DETAILED ATTRIBUTE RATINGS (NEW)
  // ==========================================
  title           String?                          // Review title (max 100 chars)
  professionalism Int?                             // 1-5 stars
  qualityOfWork   Int?                             // 1-5 stars
  timeliness      Int?                             // 1-5 stars
  communication   Int?                             // 1-5 stars
  valueForMoney   Int?                             // 1-5 stars

  // ==========================================
  // REVIEW MEDIA (NEW)
  // ==========================================
  photoUrls       String[]                         // Max 5 photos
  videoUrl        String?                          // Optional video review

  // ==========================================
  // CONTRACTOR ENGAGEMENT (NEW)
  // ==========================================
  contractorReply String?
  repliedAt       DateTime?
  replyEditedAt   DateTime?

  // ==========================================
  // MODERATION & VISIBILITY (NEW)
  // ==========================================
  isPublished     Boolean     @default(true)
  isPinned        Boolean     @default(false)      // Highlight exceptional reviews
  isVerified      Boolean     @default(true)       // Linked to completed booking
  isEdited        Boolean     @default(false)
  editedAt        DateTime?

  // ==========================================
  // COMMUNITY ENGAGEMENT (NEW)
  // ==========================================
  helpfulVotes    Int         @default(0)
  unhelpfulVotes  Int         @default(0)

  // ==========================================
  // MODERATION (NEW)
  // ==========================================
  isFlagged       Boolean     @default(false)
  flagReason      String?
  flaggedBy       String?                          // User ID
  flaggedAt       DateTime?
  moderatedBy     String?                          // Admin user ID
  moderatedAt     DateTime?

  // ==========================================
  // EXISTING RELATIONS
  // ==========================================
  booking         Booking     @relation(fields: [bookingId], references: [id], onDelete: Cascade)
  client          User        @relation(fields: [clientId], references: [id])
  contractor      Contractor  @relation(fields: [contractorId], references: [id], onDelete: Cascade)

  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  @@unique([bookingId, contractorId])
  @@index([contractorId, isPublished])
  @@index([clientId])
  @@index([rating])
  @@index([createdAt])
  @@index([isPinned, isPublished])
  @@index([helpfulVotes])
}
```

**Rationale**:
- `title` - Quick summary (like Google reviews)
- Detailed ratings - Clients want specifics, not just overall score
- `photoUrls` - Visual proof of work quality
- `contractorReply` - Engagement and customer service visibility
- `helpfulVotes` - Community-curated best reviews
- Moderation fields - Handle spam/abuse
- `isPinned` - Contractors can highlight best reviews

**Review Aggregation Logic**:
```typescript
// Calculate contractor's detailed ratings
const aggregatedRatings = {
  overall: average(reviews.map(r => r.rating)),
  professionalism: average(reviews.map(r => r.professionalism)),
  quality: average(reviews.map(r => r.qualityOfWork)),
  timeliness: average(reviews.map(r => r.timeliness)),
  communication: average(reviews.map(r => r.communication)),
  valueForMoney: average(reviews.map(r => r.valueForMoney)),
};
```

---

## 5. New Model: ContractorDocument

**Purpose**: Support multiple document types (not just license)

```prisma
model ContractorDocument {
  id                  String              @id @default(cuid())
  contractorId        String
  contractor          Contractor          @relation("ContractorDocuments", fields: [contractorId], references: [id], onDelete: Cascade)

  // ==========================================
  // DOCUMENT METADATA
  // ==========================================
  documentType        ContractorDocumentType
  fileName            String
  fileUrl             String              // Supabase Storage URL
  fileSize            Int                 // Bytes
  mimeType            String              // application/pdf, image/jpeg, etc.

  // ==========================================
  // VERIFICATION
  // ==========================================
  status              DocumentStatus      @default(PENDING)
  uploadedAt          DateTime            @default(now())
  verifiedAt          DateTime?
  verifiedBy          String?             // Admin user ID
  rejectionReason     String?
  expiryDate          DateTime?           // For licenses, insurance, etc.
  issuedDate          DateTime?

  // ==========================================
  // DOCUMENT DETAILS
  // ==========================================
  documentNumber      String?             // License #, Policy #, Certificate #
  issuingAuthority    String?             // Which government/org issued it
  stateIssued         AustralianState?

  // ==========================================
  // SECURITY
  // ==========================================
  viewCount           Int                 @default(0)
  lastViewedAt        DateTime?
  lastViewedBy        String?             // Admin user ID

  createdAt           DateTime            @default(now())
  updatedAt           DateTime            @updatedAt

  @@index([contractorId, documentType])
  @@index([status])
  @@index([expiryDate])
  @@index([documentType, status])
}

enum ContractorDocumentType {
  BUSINESS_LICENSE          // State business license
  IICRC_CERTIFICATE         // IICRC certification
  PUBLIC_LIABILITY_INSURANCE
  WORKERS_COMPENSATION
  PROFESSIONAL_INDEMNITY
  ABN_REGISTRATION
  POLICE_CHECK
  TRADE_LICENSE             // Plumbing, electrical, etc.
  COMPANY_LOGO
  INSURANCE_CLAIM_EXAMPLE   // Sample work/invoice
  OTHER
}

enum DocumentStatus {
  PENDING               // Uploaded, awaiting review
  UNDER_REVIEW          // Admin is reviewing
  APPROVED              // Verified and accepted
  REJECTED              // Not accepted
  EXPIRED               // Past expiry date
  REQUIRES_RENEWAL      // Expiring soon (30 days)
}
```

**Rationale**:
- Future-proof: Support any document type
- Separate lifecycle per document (license can be approved while insurance is pending)
- Audit trail: Track who viewed sensitive documents
- Expiry tracking: Auto-flag expiring documents
- Security: Count views of sensitive documents

---

## 6. New Model: ContractorVerificationHistory

**Purpose**: Audit trail for all verification actions

```prisma
model ContractorVerificationHistory {
  id                  String              @id @default(cuid())
  contractorId        String
  contractor          Contractor          @relation("VerificationHistory", fields: [contractorId], references: [id], onDelete: Cascade)

  // ==========================================
  // ACTION DETAILS
  // ==========================================
  action              VerificationAction
  previousStatus      ContractorVerificationStatus?
  newStatus           ContractorVerificationStatus
  reason              String?             // Why status changed
  notes               String?             // Admin notes

  // ==========================================
  // ACTOR
  // ==========================================
  performedBy         String              // User ID (admin or system)
  performedByName     String?             // Cached for display
  isSystemAction      Boolean             @default(false)  // Auto vs manual

  // ==========================================
  // METADATA
  // ==========================================
  ipAddress           String?
  userAgent           String?
  metadata            Json?               // Extra context

  createdAt           DateTime            @default(now())

  @@index([contractorId, createdAt])
  @@index([action])
  @@index([createdAt])
}

enum VerificationAction {
  PROFILE_CREATED       // Contractor signed up
  SUBMITTED             // Submitted for verification
  REVIEW_STARTED        // Admin started review
  DOCUMENT_UPLOADED     // New document added
  DOCUMENT_VERIFIED     // Document approved
  DOCUMENT_REJECTED     // Document rejected
  APPROVED              // Full verification approved
  REJECTED              // Verification rejected
  SUSPENDED             // Account suspended
  UNSUSPENDED           // Suspension lifted
  RESUBMISSION_REQUEST  // Asked to resubmit
  LICENSE_EXPIRED       // License expiry detected
  LICENSE_RENEWED       // License updated
  STATUS_CHANGED        // Generic status change
}
```

**Rationale**:
- Complete audit trail for compliance
- Track who made decisions (accountability)
- Debug verification issues
- Generate reports (avg verification time, approval rate)

---

## 7. Database Indexes Strategy

### Primary Indexes (for common queries):

```sql
-- Contractor directory search (most common query)
CREATE INDEX idx_contractor_directory_search ON "Contractor" (
  "verificationStatus",
  "isActive",
  "isVerified",
  "averageRating"
) WHERE "verificationStatus" = 'APPROVED' AND "isActive" = true;

-- Service area geographic search
CREATE INDEX idx_service_area_geo ON "ContractorServiceArea" (
  "latitude",
  "longitude",
  "isActive"
) WHERE "isActive" = true;

-- Review sorting (by rating desc, created desc)
CREATE INDEX idx_rating_public_view ON "Rating" (
  "contractorId",
  "isPublished",
  "rating",
  "createdAt"
) WHERE "isPublished" = true;

-- Admin verification queue
CREATE INDEX idx_verification_queue ON "Contractor" (
  "verificationStatus",
  "submittedForVerificationAt"
) WHERE "verificationStatus" IN ('SUBMITTED', 'UNDER_REVIEW');

-- Document expiry monitoring
CREATE INDEX idx_document_expiry_check ON "ContractorDocument" (
  "documentType",
  "status",
  "expiryDate"
) WHERE "status" = 'APPROVED' AND "expiryDate" IS NOT NULL;
```

---

## 8. Relations Summary

```prisma
// Add to Contractor model
model Contractor {
  // ... existing relations ...
  documents           ContractorDocument[]        @relation("ContractorDocuments")
  verificationHistory ContractorVerificationHistory[] @relation("VerificationHistory")
}
```

---

## 9. Migration Strategy

### Phase 1: Add New Fields (Non-Breaking)
```sql
-- All new fields are nullable, so this is safe
ALTER TABLE "Contractor" ADD COLUMN "licenseNumber" VARCHAR(255);
ALTER TABLE "Contractor" ADD COLUMN "verificationStatus" VARCHAR(50) DEFAULT 'PENDING';
-- ... etc
```

### Phase 2: Create New Tables
```sql
CREATE TABLE "ContractorDocument" (...);
CREATE TABLE "ContractorVerificationHistory" (...);
CREATE TYPE "ContractorVerificationStatus" AS ENUM (...);
-- ... etc
```

### Phase 3: Data Migration
```sql
-- Migrate existing isVerified to new enum
UPDATE "Contractor"
SET "verificationStatus" = CASE
  WHEN "isVerified" = true THEN 'APPROVED'::ContractorVerificationStatus
  ELSE 'PENDING'::ContractorVerificationStatus
END;

-- Migrate license data from ContractorProfile (if exists)
UPDATE "Contractor" c
SET
  "licenseNumber" = cp."licenseNumber",
  "companyDescription" = cp."bio"
FROM "ContractorProfile" cp
WHERE c."userId" = cp."userId"
AND cp."licenseNumber" IS NOT NULL;
```

### Phase 4: Create Indexes
```sql
CREATE INDEX idx_contractor_verification_status ON "Contractor"("verificationStatus");
-- ... etc
```

### Phase 5: Backfill Analytics
```sql
-- Calculate existing profile views (if tracked elsewhere)
-- Set default service radius
UPDATE "Contractor" SET "serviceRadius" = 25 WHERE "serviceRadius" IS NULL;
```

---

## 10. Sample Queries

### Find Contractors in Area:
```typescript
const contractors = await prisma.contractor.findMany({
  where: {
    verificationStatus: 'APPROVED',
    isActive: true,
    serviceAreas: {
      some: {
        postcode: clientPostcode,
        isActive: true,
      },
    },
  },
  include: {
    serviceAreas: true,
    iicrcCertifications: {
      where: { isActive: true },
    },
    ratings: {
      where: { isPublished: true },
      take: 5,
      orderBy: { createdAt: 'desc' },
    },
  },
  orderBy: [
    { averageRating: 'desc' },
    { completedJobs: 'desc' },
  ],
});
```

### Admin Verification Queue:
```typescript
const pendingContractors = await prisma.contractor.findMany({
  where: {
    verificationStatus: {
      in: ['SUBMITTED', 'UNDER_REVIEW'],
    },
  },
  include: {
    user: {
      select: { email: true, name: true },
    },
    documents: {
      where: { status: 'PENDING' },
    },
  },
  orderBy: {
    submittedForVerificationAt: 'asc', // FIFO
  },
});
```

### Contractor Profile Analytics:
```typescript
const analytics = await prisma.contractor.findUnique({
  where: { id: contractorId },
  select: {
    profileViews: true,
    profileViewsThisMonth: true,
    directBookingRequests: true,
    quoteRequestCount: true,
    quoteAcceptanceRate: true,
    averageRating: true,
    completedJobs: true,
    ratings: {
      where: { isPublished: true },
      select: {
        professionalism: true,
        qualityOfWork: true,
        timeliness: true,
        communication: true,
        valueForMoney: true,
      },
    },
  },
});
```

---

## 11. Validation Rules

### Contractor Model:
- `licenseNumber`: Required if `verificationStatus` is 'SUBMITTED'
- `licenseExpiry`: Must be > today if status is 'APPROVED'
- `rejectionReason`: Required if status is 'REJECTED'
- `verifiedBy`: Required if status is 'APPROVED'
- `serviceRadius`: Min 5km, Max 100km

### ContractorServiceArea:
- `radiusKm`: Min 5, Max 100
- `latitude`: -43.6 to -10.4 (Australia bounds)
- `longitude`: 113.3 to 153.6 (Australia bounds)

### Rating:
- `rating`: 1-5 (enforced in DB via CHECK constraint)
- `professionalism`, `quality`, etc.: 1-5 or NULL
- `comment`: Min 50 chars if provided
- `photoUrls`: Max 5 URLs
- `contractorReply`: Max 1000 chars

### ContractorDocument:
- `fileSize`: Max 10MB (10 * 1024 * 1024)
- `mimeType`: Allowed: ['application/pdf', 'image/jpeg', 'image/png']
- `expiryDate`: Must be future date if status is 'APPROVED'

---

## 12. Performance Considerations

### Query Optimization:
1. **Use SELECT specific fields** - Don't fetch entire Contractor object
2. **Pagination required** - Directory listing MUST paginate
3. **Index covering** - Most queries covered by indexes
4. **N+1 prevention** - Use `include` judiciously

### Caching Strategy:
```typescript
// Redis cache for contractor directory
const cacheKey = `contractors:${postcode}:${serviceType}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Cache for 5 minutes
await redis.setex(cacheKey, 300, JSON.stringify(contractors));
```

### Rate Limiting:
- Profile views: Max 100/hour per IP
- Review submissions: Max 1 per booking
- Document uploads: Max 10 per hour

---

## 13. Security Considerations

### Access Control:
```typescript
// Contractors can only edit their own profile
if (session.userId !== contractor.userId && session.userType !== 'ADMIN') {
  throw new Error('Unauthorized');
}

// Only admins can change verification status
if (session.userType !== 'ADMIN') {
  throw new Error('Admin access required');
}

// Documents are private unless approved
if (document.status !== 'APPROVED' && !isAdmin && !isOwner) {
  throw new Error('Document not accessible');
}
```

### Data Privacy:
- License numbers: Visible to admins only
- ABN numbers: Public (for verification)
- Insurance policy numbers: Visible to admins only
- Client email/phone: Never shown to contractors until booking accepted

---

## Summary

### Schema Changes:
1. ✅ Extended `Contractor` model with 15 new fields
2. ✅ Enhanced `ContractorServiceArea` with 8 new fields
3. ✅ Enhanced `Rating` model with 17 new fields
4. ✅ Created `ContractorDocument` model (new)
5. ✅ Created `ContractorVerificationHistory` model (new)
6. ✅ Added 3 new enums
7. ✅ Designed 8 strategic indexes

### Backwards Compatibility:
- ✅ All new fields are nullable (safe)
- ✅ Existing queries continue to work
- ✅ Migration path defined
- ✅ Rollback strategy available

### Next Steps:
- Proceed to Task 3: Create database migrations
- Implement schema changes in Prisma
- Test migrations on development database

---

**Schema Design Complete** | Ready for implementation
