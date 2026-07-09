-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('CLIENT', 'CONTRACTOR', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "AustralianState" AS ENUM ('NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT');

-- CreateEnum
CREATE TYPE "IICRCCertificationLevel" AS ENUM ('TECHNICIAN', 'SUPERVISOR', 'INSPECTOR', 'MASTER');

-- CreateEnum
CREATE TYPE "AustralianServiceType" AS ENUM ('WATER_DAMAGE', 'FIRE_DAMAGE', 'SMOKE_DAMAGE', 'MOULD_REMEDIATION', 'ODOUR_REMEDIATION', 'CARPET_CLEANING', 'COMMERCIAL_WATER_DAMAGE', 'COMMERCIAL_FIRE_DAMAGE', 'COMMERCIAL_MOULD', 'COMMERCIAL_ODOUR', 'CRIME_SCENE_CLEANING', 'BIOHAZARD_REMEDIATION', 'HOARDING_CLEANUP', 'VANDALISM_CLEANUP', 'GENERAL_RESTORATION');

-- CreateEnum
CREATE TYPE "EmergencyResponseLevel" AS ENUM ('URGENT', 'HIGH', 'STANDARD', 'SCHEDULED');

-- CreateEnum
CREATE TYPE "InsuranceProviderType" AS ENUM ('NRMA', 'SUNCORP', 'ALLIANZ', 'QBE', 'IAG', 'CGU', 'MEDIBANK', 'OTHER');

-- CreateEnum
CREATE TYPE "InsuranceClaimStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PARTIALLY_APPROVED', 'DENIED', 'PAYMENT_PROCESSED', 'CLOSED');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('PENDING', 'MATCHED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AvailabilityStatus" AS ENUM ('AVAILABLE', 'BUSY', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "MatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('GENERAL', 'MATCH_NOTIFICATION', 'PROJECT_UPDATE', 'PAYMENT_REMINDER', 'SYSTEM_NOTIFICATION', 'INITIATE_CHAT', 'BID_ACCEPTED', 'BID_REJECTED');

-- CreateEnum
CREATE TYPE "CalloutPaymentStatus" AS ENUM ('CREATED', 'CHECKOUT_CREATED', 'PAID', 'RELEASED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SubscriptionTier" AS ENUM ('BASIC', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'TRIAL', 'PAST_DUE', 'SUSPENDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkspaceMemberRole" AS ENUM ('OWNER', 'MANAGER', 'TECHNICIAN', 'ADMIN_STAFF');

-- CreateEnum
CREATE TYPE "OnboardingStatus" AS ENUM ('PENDING_START', 'IN_PROGRESS', 'PAUSED', 'COMPLETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ModuleStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "CertificationLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');

-- CreateEnum
CREATE TYPE "NRPGPartnershipLevel" AS ENUM ('CANDIDATE', 'ASSOCIATE', 'PROFESSIONAL', 'EXCELLENCE');

-- CreateEnum
CREATE TYPE "NRPGPhaseStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "BackgroundCheckStatus" AS ENUM ('NOT_INITIATED', 'PENDING', 'IN_PROGRESS', 'PASS', 'FAIL', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CompetitorCategory" AS ENUM ('RESTORATION_COMPANY', 'INSURANCE_NETWORK', 'CONTRACTOR_MARKETPLACE', 'INDUSTRY_ASSOCIATION');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('EMERGENCY_GUIDE', 'INSURANCE_CLAIM', 'PREVENTION', 'INDUSTRY_INSIGHT', 'CASE_STUDY', 'RESOURCE');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FAQCategory" AS ENUM ('EMERGENCY_RESPONSE', 'PRICING_QUOTES', 'INSURANCE_CLAIMS', 'SERVICE_SPECIFIC', 'CONTRACTOR_NETWORK', 'PLATFORM_USAGE', 'PREVENTION_TIPS', 'SAFETY_HEALTH');

-- CreateEnum
CREATE TYPE "CustomerLifecycleStage" AS ENUM ('LEAD', 'QUALIFIED_LEAD', 'OPPORTUNITY', 'CUSTOMER', 'AT_RISK', 'CHURNED', 'ADVOCATE');

-- CreateEnum
CREATE TYPE "OpportunityStage" AS ENUM ('DISCOVERY', 'ASSESSMENT', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('EMAIL', 'CALL', 'MEETING', 'NOTE', 'INSPECTION', 'QUOTE_SENT', 'CONTRACT_SIGNED', 'BOOKING_CREATED', 'PAYMENT_RECEIVED', 'CLAIM_SUBMITTED', 'CLAIM_APPROVED', 'FOLLOW_UP', 'COMPLAINT', 'REVIEW_RECEIVED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'WAITING', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('CONVERSION_RATE', 'RESPONSE_TIME', 'CUSTOMER_SATISFACTION', 'REVENUE_TARGET', 'CHURN_RATE');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('INFO', 'WARNING', 'CRITICAL');

-- CreateEnum
CREATE TYPE "InspectionStatus" AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'DATA_COLLECTION_COMPLETE', 'DRAFT_GENERATED', 'TECHNICAL_REVIEW', 'MANAGER_REVIEW', 'APPROVED', 'SENT_TO_CLIENT', 'SENT_TO_INSURER', 'REVISED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DamageCategory" AS ENUM ('CATEGORY_1', 'CATEGORY_2', 'CATEGORY_3', 'CATEGORY_4');

-- CreateEnum
CREATE TYPE "IICRCStandard" AS ENUM ('S500_WATER_DAMAGE', 'S520_MOLD_REMEDIATION', 'S800_BIOHAZARD', 'WRT_WATER_RESTORATION', 'AMRT_APPLIED_MICROBIAL', 'FSRT_FIRE_SMOKE');

-- CreateEnum
CREATE TYPE "ReportApprovalStatus" AS ENUM ('PENDING_REVIEW', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'REVISION_REQUESTED');

-- CreateEnum
CREATE TYPE "RealtimeTier" AS ENUM ('BASIC', 'PRO', 'ENTERPRISE');

-- CreateEnum
CREATE TYPE "RealtimeSubscriptionStatus" AS ENUM ('ACTIVE', 'TRIAL', 'CANCELLED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "BetaEnrollmentStatus" AS ENUM ('INVITED', 'ACTIVE', 'COMPLETED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "BetaFeedbackCategory" AS ENUM ('BUG_REPORT', 'FEATURE_REQUEST', 'USABILITY_ISSUE', 'GENERAL_FEEDBACK');

-- CreateEnum
CREATE TYPE "ContractorVerificationStatus" AS ENUM ('PENDING', 'INCOMPLETE', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'RESUBMISSION_REQUIRED', 'SUSPENDED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ServiceCoverageLevel" AS ENUM ('STANDARD', 'PRIORITY', 'EMERGENCY_ONLY', 'LIMITED');

-- CreateEnum
CREATE TYPE "ContractorDocumentType" AS ENUM ('BUSINESS_LICENSE', 'IICRC_CERTIFICATE', 'PUBLIC_LIABILITY_INSURANCE', 'WORKERS_COMPENSATION', 'PROFESSIONAL_INDEMNITY', 'ABN_REGISTRATION', 'POLICE_CHECK', 'TRADE_LICENSE', 'COMPANY_LOGO', 'INSURANCE_CLAIM_EXAMPLE', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'EXPIRED', 'REQUIRES_RENEWAL');

-- CreateEnum
CREATE TYPE "VerificationAction" AS ENUM ('PROFILE_CREATED', 'SUBMITTED', 'REVIEW_STARTED', 'DOCUMENT_UPLOADED', 'DOCUMENT_VERIFIED', 'DOCUMENT_REJECTED', 'APPROVED', 'REJECTED', 'SUSPENDED', 'UNSUSPENDED', 'RESUBMISSION_REQUEST', 'LICENSE_EXPIRED', 'LICENSE_RENEWED', 'STATUS_CHANGED');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID');

-- CreateEnum
CREATE TYPE "JobOutcome" AS ENUM ('COMPLETED', 'CANCELLED', 'REJECTED_BY_CLIENT', 'REJECTED_BY_CONTRACTOR', 'TIMED_OUT');

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "subdomain" TEXT,
    "logo" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "customCss" TEXT,
    "industry" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3),
    "currentPeriodStart" TIMESTAMP(3),
    "monthlyRequestLimit" INTEGER NOT NULL DEFAULT 50,
    "seatLimit" INTEGER NOT NULL DEFAULT 5,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'BASIC',
    "trialEndsAt" TIMESTAMP(3),

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenant_configurations" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenant_configurations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "twoFactorBackupCodes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "twoFactorSecret" TEXT,
    "twoFactorSetupAt" TIMESTAMP(3),
    "lockedUntil" TIMESTAMP(3),
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
    "lastFailedLoginAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT,
    "userType" "UserType" NOT NULL DEFAULT 'CLIENT',
    "googleId" TEXT,
    "avatar" TEXT,
    "australianPhoneNumber" TEXT,
    "australianPostcode" TEXT,
    "australianState" "AustralianState",
    "suburb" TEXT,
    "streetAddress" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "emailVerificationToken" TEXT,
    "emailVerificationTokenExpiry" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "consentAcceptedAt" TIMESTAMP(3),
    "consentVersion" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interests" TEXT[],
    "serviceTypes" TEXT[],
    "budgetRange" TEXT,
    "urgencyLevel" TEXT,
    "communicationStyle" TEXT,
    "notificationSettings" JSONB,
    "dashboardLayout" JSONB,
    "themePreferences" JSONB,
    "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "brandingColor" TEXT,
    "selectedTheme" TEXT,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginAttempt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "LoginAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "performedBy" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "userId" TEXT,
    "userEmail" TEXT,
    "resourceType" TEXT,
    "resourceId" TEXT,
    "status" TEXT,
    "details" TEXT,
    "errorMessage" TEXT,
    "severity" TEXT,
    "workspaceId" TEXT,
    "metadata" JSONB,
    "changes" JSONB,
    "timestamp" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractor" (
    "licenseStatus" TEXT NOT NULL DEFAULT 'unverified',
    "licenseType" TEXT,
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abnNumber" TEXT,
    "acnNumber" TEXT,
    "businessRegistrationDate" TIMESTAMP(3),
    "primaryPostcode" TEXT,
    "primaryState" "AustralianState",
    "operatingStates" "AustralianState"[],
    "nrpgMemberId" TEXT,
    "nrpgVerifiedAt" TIMESTAMP(3),
    "nrpgVerificationLevel" TEXT,
    "australianSpecialties" "AustralianServiceType"[],
    "supportedEmergencyLevels" "EmergencyResponseLevel"[],
    "publicLiabilityPolicyNumber" TEXT,
    "publicLiabilityExpiryDate" TIMESTAMP(3),
    "publicLiabilityCertificateUrl" TEXT,
    "workCoverNumber" TEXT,
    "workCoverExpiryDate" TIMESTAMP(3),
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "averageResponseTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationDate" TIMESTAMP(3),
    "lastBackgroundCheckDate" TIMESTAMP(3),
    "backgroundCheckStatus" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isSuspended" BOOLEAN NOT NULL DEFAULT false,
    "suspensionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,
    "companyDescription" TEXT,
    "companyLogoUrl" TEXT,
    "directBookingRequests" INTEGER NOT NULL DEFAULT 0,
    "emergencyAvailable" BOOLEAN NOT NULL DEFAULT false,
    "emergencyResponseTime" INTEGER,
    "lastProfileViewReset" TIMESTAMP(3),
    "licenseDocumentFileName" TEXT,
    "licenseDocumentUrl" TEXT,
    "licenseExpiry" TIMESTAMP(3),
    "licenseNumber" TEXT,
    "licenseState" "AustralianState",
    "licenseVerifiedAt" TIMESTAMP(3),
    "licenseVerifiedBy" TEXT,
    "profileViews" INTEGER NOT NULL DEFAULT 0,
    "profileViewsThisMonth" INTEGER NOT NULL DEFAULT 0,
    "quoteAcceptanceRate" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "quoteRequestCount" INTEGER NOT NULL DEFAULT 0,
    "rejectionReason" TEXT,
    "resubmissionCount" INTEGER NOT NULL DEFAULT 0,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "serviceRadius" INTEGER NOT NULL DEFAULT 25,
    "submittedForVerificationAt" TIMESTAMP(3),
    "teamSize" INTEGER,
    "verificationNotes" TEXT,
    "verificationStatus" "ContractorVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "yearsInBusiness" INTEGER,
    "unavailableUntil" TIMESTAMP(3),

    CONSTRAINT "Contractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IICRCCertification" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "certificationLevel" "IICRCCertificationLevel" NOT NULL,
    "certificationCode" TEXT NOT NULL,
    "certificationDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "verificationDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "verifiedBy" TEXT,
    "certificatePdfUrl" TEXT,
    "certificateFileName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IICRCCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorServiceArea" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "state" "AustralianState" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "responseTimeMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "city" TEXT,
    "coverageLevel" "ServiceCoverageLevel" NOT NULL DEFAULT 'STANDARD',
    "isPrimaryArea" BOOLEAN NOT NULL DEFAULT true,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "priorityLevel" INTEGER NOT NULL DEFAULT 1,
    "radiusKm" INTEGER NOT NULL DEFAULT 25,
    "suburb" TEXT,

    CONSTRAINT "ContractorServiceArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_service_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "theme" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_service_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_services" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "theme" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_themes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "secondaryColor" TEXT NOT NULL,
    "accentColor" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "textColor" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_themes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceCategory" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "serviceTitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "budget" TEXT,
    "phone" TEXT,
    "preferredTime" TEXT,
    "insurance" BOOLEAN NOT NULL DEFAULT false,
    "urgentResponse" BOOLEAN NOT NULL DEFAULT false,
    "status" "ServiceStatus" NOT NULL DEFAULT 'PENDING',
    "leadScore" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "service_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_request_callout_payments" (
    "id" TEXT NOT NULL,
    "serviceRequestId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractorProfileId" TEXT,
    "totalAUD" DECIMAL(65,30) NOT NULL,
    "totalExGstAUD" DECIMAL(65,30) NOT NULL,
    "gstAUD" DECIMAL(65,30) NOT NULL,
    "platformFeeAUD" DECIMAL(65,30) NOT NULL,
    "platformFeeExGstAUD" DECIMAL(65,30) NOT NULL,
    "platformFeeGstAUD" DECIMAL(65,30) NOT NULL,
    "contractorEntitlementAUD" DECIMAL(65,30) NOT NULL,
    "contractorEntitlementExGstAUD" DECIMAL(65,30) NOT NULL,
    "contractorEntitlementGstAUD" DECIMAL(65,30) NOT NULL,
    "gstInclusive" BOOLEAN NOT NULL DEFAULT true,
    "status" "CalloutPaymentStatus" NOT NULL DEFAULT 'CREATED',
    "stripeCheckoutSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "stripeTransferId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_request_callout_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_profiles" (
    "stripeConnectAccountId" TEXT,
    "stripePayoutsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "stripeChargesEnabled" BOOLEAN NOT NULL DEFAULT false,
    "stripeRequirementsDue" JSONB,
    "stripeCapabilitiesSyncedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "businessName" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "licenseNumber" TEXT,
    "insuranceProvider" TEXT,
    "insuranceExpiry" TIMESTAMP(3),
    "services" TEXT[],
    "serviceAreas" TEXT[],
    "hourlyRate" DOUBLE PRECISION,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "bio" TEXT,
    "availability" "AvailabilityStatus" NOT NULL DEFAULT 'AVAILABLE',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "contractor_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_matches" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "status" "MatchStatus" NOT NULL DEFAULT 'PENDING',
    "contractorMessage" TEXT,
    "clientMessage" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "startDate" TEXT,
    "estimatedHours" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,
    "claimId" TEXT,
    "contractorRespondedAt" TIMESTAMP(3),
    "contractorResponse" TEXT,
    "isBackup" BOOLEAN NOT NULL DEFAULT false,
    "matchReason" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "notificationSentAt" TIMESTAMP(3),
    "notificationStatus" TEXT,
    "responseDeadline" TIMESTAMP(3),

    CONSTRAINT "contractor_matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_preferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceCategories" TEXT[],
    "locations" TEXT[],
    "experience" TEXT,
    "expertise" TEXT[],
    "background" TEXT,
    "hourlyRate" TEXT,
    "availability" TEXT,
    "maxDistance" TEXT,
    "selectedTheme" TEXT,
    "brandingColor" TEXT,
    "isOnboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "displayName" TEXT,
    "phoneNumber" TEXT,
    "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT false,
    "preferredContactMethod" TEXT NOT NULL DEFAULT 'email',
    "timezone" TEXT NOT NULL DEFAULT 'Australia/Sydney',
    "language" TEXT NOT NULL DEFAULT 'en-AU',
    "propertyOwnershipStatus" TEXT,
    "propertyCount" INTEGER NOT NULL DEFAULT 1,
    "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
    "tier" TEXT NOT NULL DEFAULT 'standard',
    "vipAssignedManagerId" TEXT,
    "riskZone" TEXT,
    "riskAssessmentOffered" BOOLEAN NOT NULL DEFAULT false,
    "riskAssessmentCompleted" BOOLEAN NOT NULL DEFAULT false,
    "flaggedForReview" BOOLEAN NOT NULL DEFAULT false,
    "flagReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "client_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_properties" (
    "id" TEXT NOT NULL,
    "clientProfileId" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "state" "AustralianState" NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'AU',
    "propertyType" TEXT NOT NULL,
    "propertySize" TEXT,
    "buildingAge" TEXT,
    "accessInstructions" TEXT,
    "accessKeyId" TEXT,
    "accessDecryptedAt" TIMESTAMP(3),
    "accessDecryptedBy" TEXT,
    "parkingAvailable" BOOLEAN NOT NULL DEFAULT true,
    "securityAccess" BOOLEAN NOT NULL DEFAULT false,
    "petOnPremises" BOOLEAN NOT NULL DEFAULT false,
    "petDetails" TEXT,
    "recommendedServices" TEXT[],
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "client_properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_insurance" (
    "id" TEXT NOT NULL,
    "clientProfileId" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL DEFAULT false,
    "insuranceProvider" TEXT,
    "policyNumber" TEXT,
    "policyExpiryDate" TIMESTAMP(3),
    "policyDocumentUrls" TEXT[],
    "policyVerified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "hasPreviousClaims" BOOLEAN NOT NULL DEFAULT false,
    "claimCount" INTEGER NOT NULL DEFAULT 0,
    "lastClaimDate" TIMESTAMP(3),
    "preferredContractors" TEXT[],
    "restrictedContractors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "client_insurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_payments" (
    "id" TEXT NOT NULL,
    "clientProfileId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripePaymentMethodId" TEXT,
    "cardBrand" TEXT,
    "cardLast4" TEXT,
    "cardExpiryMonth" INTEGER,
    "cardExpiryYear" INTEGER,
    "billingAddressSameAs" BOOLEAN NOT NULL DEFAULT true,
    "billingStreet" TEXT,
    "billingSuburb" TEXT,
    "billingPostcode" TEXT,
    "billingState" "AustralianState",
    "autoPayEnabled" BOOLEAN NOT NULL DEFAULT false,
    "invoiceDeliveryMethod" TEXT NOT NULL DEFAULT 'email',
    "taxInvoiceRecipient" TEXT,
    "abnNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "client_payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_emergency_contacts" (
    "id" TEXT NOT NULL,
    "clientProfileId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "relationship" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "allowContractorContact" BOOLEAN NOT NULL DEFAULT false,
    "isPrimary" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_emergency_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_onboarding" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "targetCompletionDate" TIMESTAMP(3),
    "actualCompletionDate" TIMESTAMP(3),
    "status" "OnboardingStatus" NOT NULL DEFAULT 'PENDING_START',
    "currentPhase" TEXT,
    "completedPhases" TEXT[],
    "flowVariant" TEXT,
    "experimentId" TEXT,
    "certificateIssued" BOOLEAN NOT NULL DEFAULT false,
    "certificateUrl" TEXT,
    "tourCompleted" BOOLEAN NOT NULL DEFAULT false,
    "firstRequestCreated" BOOLEAN NOT NULL DEFAULT false,
    "badgeAwarded" BOOLEAN NOT NULL DEFAULT false,
    "totalTimeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "deviceType" TEXT,
    "browserLanguage" TEXT,
    "lastActivityAt" TIMESTAMP(3),
    "abandonedAt" TIMESTAMP(3),
    "abandonedPhase" TEXT,
    "reminderSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "client_onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_module_progress" (
    "id" TEXT NOT NULL,
    "onboardingId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "moduleName" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModuleStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "quizScore" INTEGER,
    "quizAttempts" INTEGER NOT NULL DEFAULT 0,
    "quizPassed" BOOLEAN NOT NULL DEFAULT false,
    "timeSpentSeconds" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abnNumber" TEXT,
    "acnNumber" TEXT,
    "subscriptionTier" "SubscriptionTier" NOT NULL DEFAULT 'BASIC',
    "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "seatLimit" INTEGER NOT NULL DEFAULT 1,
    "monthlyJobLimit" INTEGER NOT NULL DEFAULT 10,
    "serviceRadiusKm" INTEGER NOT NULL DEFAULT 25,
    "currentMonthJobs" INTEGER NOT NULL DEFAULT 0,
    "totalJobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "totalOverageFees" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "crmType" TEXT,
    "crmApiKey" TEXT,
    "crmWebhookSecret" TEXT,
    "completionRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "averageResponseTime" INTEGER NOT NULL DEFAULT 0,
    "totalDeclines" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "suspendedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_members" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "WorkspaceMemberRole" NOT NULL DEFAULT 'TECHNICIAN',
    "invitedBy" TEXT,
    "invitedAt" TIMESTAMP(3),
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workspace_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_rotation" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "lastJobReceivedAt" TIMESTAMP(3),
    "totalJobsReceived" INTEGER NOT NULL DEFAULT 0,
    "totalJobsDeclined" INTEGER NOT NULL DEFAULT 0,
    "declineRate" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "availabilityStatus" TEXT NOT NULL DEFAULT 'available',
    "serviceRadiusKm" INTEGER NOT NULL DEFAULT 25,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalJobsOffered" INTEGER NOT NULL DEFAULT 0,
    "unavailableUntil" TIMESTAMP(3),

    CONSTRAINT "contractor_rotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspace_audit_logs" (
    "id" TEXT NOT NULL,
    "workspaceId" TEXT,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workspace_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractorId" TEXT,
    "australianServiceType" "AustralianServiceType" NOT NULL,
    "description" TEXT NOT NULL,
    "estimatedDamagePhotosCount" INTEGER NOT NULL DEFAULT 0,
    "servicePostcode" TEXT NOT NULL,
    "serviceState" "AustralianState" NOT NULL,
    "serviceSuburb" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "emergencyResponseLevel" "EmergencyResponseLevel" NOT NULL DEFAULT 'STANDARD',
    "scheduledDate" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedCostAUD" DECIMAL(65,30) NOT NULL,
    "finalCostAUD" DECIMAL(65,30),
    "notes" TEXT,
    "internalNotes" TEXT,
    "clientNotes" TEXT,
    "damagePhotos" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "contractorId" TEXT,
    "amountAUD" DECIMAL(65,30) NOT NULL,
    "platformFeeAUD" DECIMAL(65,30) NOT NULL,
    "platformFeePercentage" DECIMAL(65,30) NOT NULL DEFAULT 15.00,
    "gstAUD" DECIMAL(65,30) NOT NULL,
    "netAmountAUD" DECIMAL(65,30) NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "transactionId" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "receiptUrl" TEXT,
    "invoiceNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,
    "refundAmountAUD" DOUBLE PRECISION,
    "refundReason" TEXT,
    "refundedAt" TIMESTAMP(3),
    "description" TEXT,
    "metadata" JSONB,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceAU" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "dateIssued" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateDue" TIMESTAMP(3) NOT NULL,
    "subtotalAUD" DECIMAL(65,30) NOT NULL,
    "gstAUD" DECIMAL(65,30) NOT NULL,
    "totalAUD" DECIMAL(65,30) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "InvoiceAU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "providerType" "InsuranceProviderType" NOT NULL,
    "code" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "apiEndpoint" TEXT,
    "apiKey" TEXT,
    "webhookUrl" TEXT,
    "supportedStates" "AustralianState"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "InsuranceProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsuranceClaimAU" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "insuranceProviderId" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "claimNumber" TEXT,
    "totalClaimAmountAUD" DECIMAL(65,30) NOT NULL,
    "approvedAmountAUD" DECIMAL(65,30),
    "paymentAmountAUD" DECIMAL(65,30),
    "status" "InsuranceClaimStatus" NOT NULL DEFAULT 'DRAFT',
    "damageDescription" TEXT NOT NULL,
    "damagePhotos" TEXT[],
    "invoiceUrl" TEXT,
    "estimateUrl" TEXT,
    "additionalDocuments" TEXT[],
    "submittedAt" TIMESTAMP(3),
    "reviewedAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "denialReason" TEXT,
    "deniedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "InsuranceClaimAU_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "wouldRecommend" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,
    "communication" INTEGER,
    "contractorReply" TEXT,
    "editedAt" TIMESTAMP(3),
    "flagReason" TEXT,
    "flaggedAt" TIMESTAMP(3),
    "flaggedBy" TEXT,
    "helpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "isEdited" BOOLEAN NOT NULL DEFAULT false,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT true,
    "moderatedAt" TIMESTAMP(3),
    "moderatedBy" TEXT,
    "photoUrls" TEXT[],
    "professionalism" INTEGER,
    "qualityOfWork" INTEGER,
    "repliedAt" TIMESTAMP(3),
    "replyEditedAt" TIMESTAMP(3),
    "timeliness" INTEGER,
    "title" TEXT,
    "unhelpfulVotes" INTEGER NOT NULL DEFAULT 0,
    "valueForMoney" INTEGER,
    "videoUrl" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "requestId" TEXT,
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "messageType" "MessageType" NOT NULL DEFAULT 'GENERAL',
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskAssessment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "riskScore" DECIMAL(65,30) NOT NULL,
    "riskFactors" TEXT[],
    "recommendation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiskAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DisasterAlert" (
    "id" TEXT NOT NULL,
    "disasterType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "affectedPostcodes" TEXT[],
    "affectedStates" "AustralianState"[],
    "description" TEXT NOT NULL,
    "alertUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DisasterAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_onboarding" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "specialization" VARCHAR(50) NOT NULL,
    "assessmentScore" INTEGER,
    "recommendedModules" JSONB,
    "startDate" TIMESTAMP(3),
    "targetCompletionDate" TIMESTAMP(3),
    "actualCompletionDate" TIMESTAMP(3),
    "status" "OnboardingStatus" NOT NULL DEFAULT 'PENDING_START',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "contractor_onboarding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_module_progress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onboardingId" UUID NOT NULL,
    "moduleId" VARCHAR(100) NOT NULL,
    "courseName" VARCHAR(255),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "status" "ModuleStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "contractor_module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_assessments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "onboardingId" UUID NOT NULL,
    "moduleId" VARCHAR(100) NOT NULL,
    "assessmentType" VARCHAR(50),
    "score" INTEGER,
    "maxScore" INTEGER NOT NULL DEFAULT 100,
    "completedAt" TIMESTAMP(3),
    "feedback" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "contractor_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_certifications" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "certificationName" VARCHAR(255) NOT NULL,
    "certificationLevel" INTEGER,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "specializations" TEXT[],
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "contractor_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nrpg_certification_points" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "govCert4Points" INTEGER NOT NULL DEFAULT 0,
    "govCert4Status" VARCHAR(50),
    "govCert4EnrolledAt" TIMESTAMP(3),
    "govCert4CompletedAt" TIMESTAMP(3),
    "iicrcCorePoints" INTEGER NOT NULL DEFAULT 0,
    "iicrcAdvancedPoints" INTEGER NOT NULL DEFAULT 0,
    "iicrcMasterBonus" INTEGER NOT NULL DEFAULT 0,
    "carsiMembershipPoints" INTEGER NOT NULL DEFAULT 0,
    "carsiCoursePoints" INTEGER NOT NULL DEFAULT 0,
    "carsiCECPoints" INTEGER NOT NULL DEFAULT 0,
    "annualCECCredits" INTEGER NOT NULL DEFAULT 0,
    "carsiMemberId" VARCHAR(50),
    "primaryAssocPoints" INTEGER NOT NULL DEFAULT 0,
    "secondaryAssocPoints" INTEGER NOT NULL DEFAULT 0,
    "primaryAssociation" VARCHAR(100),
    "secondaryAssociations" TEXT[],
    "totalPoints" INTEGER NOT NULL DEFAULT 0,
    "partnershipLevel" "NRPGPartnershipLevel" NOT NULL DEFAULT 'CANDIDATE',
    "lastCalculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nrpg_certification_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nrpg_onboarding_phases" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "phase1Status" "NRPGPhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "phase1StartDate" TIMESTAMP(3),
    "phase1CompleteDate" TIMESTAMP(3),
    "applicationSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "eligibilityReviewed" BOOLEAN NOT NULL DEFAULT false,
    "backgroundCheckInitiated" BOOLEAN NOT NULL DEFAULT false,
    "phase2Status" "NRPGPhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "phase2StartDate" TIMESTAMP(3),
    "phase2CompleteDate" TIMESTAMP(3),
    "carsiOnboarded" BOOLEAN NOT NULL DEFAULT false,
    "associationIntegrated" BOOLEAN NOT NULL DEFAULT false,
    "competencyVerified" BOOLEAN NOT NULL DEFAULT false,
    "phase3Status" "NRPGPhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "phase3StartDate" TIMESTAMP(3),
    "phase3CompleteDate" TIMESTAMP(3),
    "standardsTrainingComplete" BOOLEAN NOT NULL DEFAULT false,
    "commitmentSigned" BOOLEAN NOT NULL DEFAULT false,
    "commitmentSignedAt" TIMESTAMP(3),
    "platformActivated" BOOLEAN NOT NULL DEFAULT false,
    "phase4Status" "NRPGPhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "phase4StartDate" TIMESTAMP(3),
    "phase4CompleteDate" TIMESTAMP(3),
    "probationEndDate" TIMESTAMP(3),
    "performanceReviewScore" DOUBLE PRECISION,
    "fullCertificationGranted" BOOLEAN NOT NULL DEFAULT false,
    "criminalCheckStatus" "BackgroundCheckStatus" NOT NULL DEFAULT 'NOT_INITIATED',
    "criminalCheckDate" TIMESTAMP(3),
    "criminalCheckRef" VARCHAR(100),
    "financialCheckStatus" "BackgroundCheckStatus" NOT NULL DEFAULT 'NOT_INITIATED',
    "financialCheckDate" TIMESTAMP(3),
    "financialCheckRef" VARCHAR(100),
    "professionalCheckStatus" "BackgroundCheckStatus" NOT NULL DEFAULT 'NOT_INITIATED',
    "professionalCheckDate" TIMESTAMP(3),
    "professionalCheckRef" VARCHAR(100),
    "insuranceCheckStatus" "BackgroundCheckStatus" NOT NULL DEFAULT 'NOT_INITIATED',
    "insuranceCheckDate" TIMESTAMP(3),
    "insuranceCheckRef" VARCHAR(100),
    "allChecksPass" BOOLEAN NOT NULL DEFAULT false,
    "overallStatus" "NRPGPhaseStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nrpg_onboarding_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nrpg_training_progress" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "courseId" VARCHAR(20) NOT NULL,
    "moduleId" VARCHAR(50) NOT NULL,
    "moduleName" VARCHAR(255) NOT NULL,
    "moduleOrder" INTEGER NOT NULL DEFAULT 0,
    "status" "ModuleStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "estimatedMinutes" INTEGER NOT NULL DEFAULT 0,
    "actualMinutes" INTEGER NOT NULL DEFAULT 0,
    "quizAttempts" INTEGER NOT NULL DEFAULT 0,
    "bestQuizScore" INTEGER,
    "lastQuizScore" INTEGER,
    "lastQuizAt" TIMESTAMP(3),
    "quizPassed" BOOLEAN NOT NULL DEFAULT false,
    "contentViewedAt" TIMESTAMP(3),
    "exercisesComplete" BOOLEAN NOT NULL DEFAULT false,
    "resourcesViewed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nrpg_training_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nrpg_commitments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contractorId" TEXT NOT NULL,
    "professionalStandards" BOOLEAN NOT NULL DEFAULT false,
    "codeOfConduct" BOOLEAN NOT NULL DEFAULT false,
    "qualityAssurance" BOOLEAN NOT NULL DEFAULT false,
    "continuingEducation" BOOLEAN NOT NULL DEFAULT false,
    "clientProtection" BOOLEAN NOT NULL DEFAULT false,
    "industryContribution" BOOLEAN NOT NULL DEFAULT false,
    "signatureData" TEXT,
    "signatureType" VARCHAR(20),
    "signedName" VARCHAR(255),
    "version" VARCHAR(50),
    "documentHash" TEXT,
    "signedAt" TIMESTAMP(3),
    "signedIpAddress" VARCHAR(45),
    "witnessName" VARCHAR(255),
    "witnessEmail" VARCHAR(255),
    "commitmentPdfUrl" VARCHAR(500),
    "pdfGeneratedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nrpg_commitments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_agreement_acceptances" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "documentHash" TEXT NOT NULL,
    "signedName" VARCHAR(255) NOT NULL,
    "signatureType" VARCHAR(20) NOT NULL DEFAULT 'typed',
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" VARCHAR(45),
    "userAgent" TEXT,
    "signedPdfUrl" VARCHAR(500),
    "signedPdfHash" TEXT,
    "pdfGeneratedAt" TIMESTAMP(3),
    "supersededAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_agreement_acceptances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_payouts" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT,
    "bookingId" TEXT,
    "paymentId" TEXT,
    "connectedAccount" TEXT,
    "idempotencyKey" TEXT NOT NULL,
    "stripeTransferId" TEXT,
    "amountAUD" DECIMAL(10,2) NOT NULL,
    "platformFeeAUD" DECIMAL(10,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contractor_payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitors" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "CompetitorCategory" NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 5,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "businessModel" TEXT,
    "targetMarket" TEXT,
    "geographicFocus" TEXT[],
    "contactInfo" JSONB,
    "socialProfiles" JSONB,
    "notes" TEXT,
    "discoveredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastAnalyzedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor_analyses" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "organicTraffic" INTEGER,
    "paidTraffic" INTEGER,
    "totalKeywords" INTEGER,
    "organicKeywords" INTEGER,
    "paidKeywords" INTEGER,
    "domainRating" DOUBLE PRECISION,
    "trustFlow" DOUBLE PRECISION,
    "citationFlow" DOUBLE PRECISION,
    "totalBacklinks" INTEGER,
    "referringDomains" INTEGER,
    "pageSpeed" DOUBLE PRECISION,
    "mobileScore" DOUBLE PRECISION,
    "coreWebVitals" JSONB,
    "totalPages" INTEGER,
    "blogPosts" INTEGER,
    "servicePages" INTEGER,
    "analysisDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataSource" TEXT NOT NULL,
    "rawData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competitor_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competitor_keywords" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "searchVolume" INTEGER,
    "difficulty" DOUBLE PRECISION,
    "cpc" DOUBLE PRECISION,
    "position" INTEGER,
    "previousPosition" INTEGER,
    "url" TEXT,
    "intent" TEXT,
    "category" TEXT,
    "opportunityScore" DOUBLE PRECISION,
    "difficultyTier" TEXT,
    "lastChecked" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competitor_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "backlinks" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "targetUrl" TEXT NOT NULL,
    "sourceDomain" TEXT NOT NULL,
    "anchorText" TEXT,
    "linkType" TEXT,
    "domainRating" DOUBLE PRECISION,
    "traffic" INTEGER,
    "firstSeen" TIMESTAMP(3),
    "lastSeen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "backlinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "swot_analyses" (
    "id" TEXT NOT NULL,
    "competitorId" TEXT NOT NULL,
    "strengths" JSONB NOT NULL,
    "weaknesses" JSONB NOT NULL,
    "opportunities" JSONB NOT NULL,
    "threats" JSONB NOT NULL,
    "summary" TEXT,
    "recommendations" JSONB,
    "competitiveAdvantages" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "generatedBy" TEXT,

    CONSTRAINT "swot_analyses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keyword_opportunities" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "searchVolume" INTEGER NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "cpc" DOUBLE PRECISION,
    "competitorCount" INTEGER NOT NULL,
    "averagePosition" DOUBLE PRECISION NOT NULL,
    "gapScore" DOUBLE PRECISION NOT NULL,
    "difficultyTier" TEXT NOT NULL,
    "category" TEXT,
    "intent" TEXT,
    "competitors" JSONB NOT NULL,
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keyword_opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL,
    "tags" TEXT[],
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "keywords" TEXT[],
    "authorId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorBio" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "scheduledFor" TIMESTAMP(3),
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "shareCount" INTEGER NOT NULL DEFAULT 0,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "featuredImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_faqs" (
    "id" TEXT NOT NULL,
    "blogPostId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "blog_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category" "FAQCategory" NOT NULL,
    "tags" TEXT[],
    "serviceType" TEXT,
    "location" TEXT,
    "keywords" TEXT[],
    "searchVolume" INTEGER,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "helpful" INTEGER NOT NULL DEFAULT 0,
    "notHelpful" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerType" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" TEXT NOT NULL,
    "testimonial" TEXT,
    "beforeImages" TEXT[],
    "afterImages" TEXT[],
    "videoUrl" TEXT,
    "projectCost" DOUBLE PRECISION,
    "responseTime" INTEGER,
    "completionTime" INTEGER,
    "customerRating" DOUBLE PRECISION,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_lifecycle" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "currentStage" "CustomerLifecycleStage" NOT NULL DEFAULT 'LEAD',
    "previousStage" "CustomerLifecycleStage",
    "stageChangedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalInteractions" INTEGER NOT NULL DEFAULT 0,
    "lastInteractionDate" TIMESTAMP(3),
    "daysSinceLastContact" INTEGER NOT NULL DEFAULT 0,
    "lifetimeValueAUD" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "averageJobValueAUD" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalJobsCompleted" INTEGER NOT NULL DEFAULT 0,
    "healthScore" INTEGER NOT NULL DEFAULT 50,
    "healthScoreReason" TEXT,
    "churnRiskScore" INTEGER NOT NULL DEFAULT 0,
    "isAtRisk" BOOLEAN NOT NULL DEFAULT false,
    "atRiskReasons" TEXT[],
    "assignedCSMId" TEXT,
    "nextTouchpointDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "customer_lifecycle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opportunities" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT NOT NULL,
    "serviceRequestId" TEXT,
    "bookingId" TEXT,
    "name" TEXT NOT NULL,
    "stage" "OpportunityStage" NOT NULL DEFAULT 'DISCOVERY',
    "estimatedValueAUD" DECIMAL(10,2) NOT NULL,
    "probabilityPercent" INTEGER NOT NULL DEFAULT 50,
    "australianServiceType" "AustralianServiceType" NOT NULL,
    "urgencyLevel" "EmergencyResponseLevel" NOT NULL,
    "serviceState" "AustralianState" NOT NULL,
    "servicePostcode" TEXT NOT NULL,
    "expectedCloseDate" TIMESTAMP(3),
    "actualCloseDate" TIMESTAMP(3),
    "assignedContractorId" TEXT,
    "closeReason" TEXT,
    "competitorChosen" TEXT,
    "forecastCategory" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "opportunities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT,
    "opportunityId" TEXT,
    "bookingId" TEXT,
    "claimId" TEXT,
    "type" "ActivityType" NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT,
    "outcome" TEXT,
    "performedById" TEXT NOT NULL,
    "customerId" TEXT,
    "contractorId" TEXT,
    "activityDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "durationMinutes" INTEGER,
    "attachments" TEXT[],
    "sentiment" TEXT,
    "sentimentScore" DOUBLE PRECISION,
    "requiresFollowUp" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "followUpTaskId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "customerLifecycleId" TEXT,
    "opportunityId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "assignedToId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "reminderDate" TIMESTAMP(3),
    "isOverdue" BOOLEAN NOT NULL DEFAULT false,
    "relatedEntityType" TEXT,
    "relatedEntityId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ruleType" TEXT NOT NULL,
    "metric" "MetricType" NOT NULL,
    "threshold" DECIMAL(10,2) NOT NULL,
    "comparison" TEXT NOT NULL,
    "actionOnViolation" TEXT[],
    "ownerId" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_rule_violations" (
    "id" TEXT NOT NULL,
    "businessRuleId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "actualValue" DECIMAL(10,2) NOT NULL,
    "expectedValue" DECIMAL(10,2) NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedAt" TIMESTAMP(3),
    "resolvedById" TEXT,
    "resolutionNote" TEXT,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_rule_violations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_reports" (
    "id" TEXT NOT NULL,
    "reportNumber" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "insuranceClaimId" TEXT,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "inspectorId" TEXT NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "applicableCodes" TEXT[],
    "iicrcStandards" "IICRCStandard"[],
    "status" "InspectionStatus" NOT NULL DEFAULT 'SCHEDULED',
    "version" INTEGER NOT NULL DEFAULT 1,
    "isDraft" BOOLEAN NOT NULL DEFAULT true,
    "technicalReviewerId" TEXT,
    "technicalReviewDate" TIMESTAMP(3),
    "technicalReviewNotes" TEXT,
    "managerReviewerId" TEXT,
    "managerReviewDate" TIMESTAMP(3),
    "managerReviewNotes" TEXT,
    "finalApproverId" TEXT,
    "finalApprovalDate" TIMESTAMP(3),
    "executiveSummary" TEXT,
    "scopeOfWork" TEXT NOT NULL,
    "findings" TEXT NOT NULL,
    "recommendations" TEXT NOT NULL,
    "limitations" TEXT,
    "pdfUrl" TEXT,
    "pdfGeneratedAt" TIMESTAMP(3),
    "pdfVersion" INTEGER NOT NULL DEFAULT 0,
    "complianceStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "inspection_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "damage_areas" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "areaName" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "damageCategory" "DamageCategory" NOT NULL,
    "affectedArea" DOUBLE PRECISION NOT NULL,
    "affectedMaterials" TEXT[],
    "initialMoistureLevel" DOUBLE PRECISION,
    "targetMoistureLevel" DOUBLE PRECISION,
    "description" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "requiredActions" TEXT[],
    "equipmentNeeded" TEXT[],
    "estimatedDryingTime" INTEGER,
    "estimatedCost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "damage_areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moisture_readings" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "readingDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "moistureContent" DOUBLE PRECISION NOT NULL,
    "ambientTemperature" DOUBLE PRECISION,
    "ambientHumidity" DOUBLE PRECISION,
    "meterType" TEXT NOT NULL,
    "readingDepth" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "moisture_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inspection_photos" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "damageAreaId" TEXT,
    "photoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "filename" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "photoType" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "gpsLatitude" DOUBLE PRECISION,
    "gpsLongitude" DOUBLE PRECISION,
    "deviceModel" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,
    "aiEnhanced" BOOLEAN NOT NULL DEFAULT false,
    "aiEnhancedAt" TIMESTAMP(3),
    "aiModel" TEXT,

    CONSTRAINT "inspection_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cost_estimates" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "totalLaborHours" DOUBLE PRECISION NOT NULL,
    "totalLaborCost" DOUBLE PRECISION NOT NULL,
    "totalMaterialCost" DOUBLE PRECISION NOT NULL,
    "totalEquipmentCost" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "gst" DOUBLE PRECISION NOT NULL,
    "totalCost" DOUBLE PRECISION NOT NULL,
    "pricingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jurisdiction" "AustralianState" NOT NULL,
    "pricingSource" TEXT NOT NULL,
    "contingencyPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "contingencyAmount" DOUBLE PRECISION NOT NULL,
    "assumptions" TEXT,
    "exclusions" TEXT,
    "validityPeriod" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "cost_estimates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "labor_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "taskCode" TEXT NOT NULL,
    "iicrcLevel" TEXT NOT NULL,
    "hours" DOUBLE PRECISION NOT NULL,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "rateEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "labor_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "materialCode" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "supplierName" TEXT,
    "supplierSKU" TEXT,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "priceEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "material_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_line_items" (
    "id" TEXT NOT NULL,
    "costEstimateId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "equipmentCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "rentalDays" INTEGER NOT NULL,
    "dailyRate" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "rateEffectiveDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "equipment_line_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_checks" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "checkName" TEXT NOT NULL,
    "checkCode" TEXT NOT NULL,
    "jurisdiction" "AustralianState" NOT NULL,
    "status" TEXT NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT true,
    "evidence" TEXT,
    "referenceSection" TEXT,
    "validatedBy" TEXT,
    "validatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "compliance_checks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_revisions" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "revisionReason" TEXT NOT NULL,
    "changedBy" TEXT NOT NULL,
    "snapshotData" JSONB NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "report_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "realtime_subscriptions" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "tier" "RealtimeTier" NOT NULL,
    "status" "RealtimeSubscriptionStatus" NOT NULL DEFAULT 'TRIAL',
    "pricePerMonth" DOUBLE PRECISION NOT NULL,
    "trialEndsAt" TIMESTAMP(3),
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "stripeSubscriptionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "realtime_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_preferences" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "soundEnabled" BOOLEAN NOT NULL DEFAULT true,
    "soundType" TEXT NOT NULL DEFAULT 'subtle_chime',
    "smsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "smsPhone" TEXT,
    "smsOfflineDelay" INTEGER NOT NULL DEFAULT 120,
    "newJobEnabled" BOOLEAN NOT NULL DEFAULT true,
    "statusUpdateEnabled" BOOLEAN NOT NULL DEFAULT true,
    "urgentJobAlarm" BOOLEAN NOT NULL DEFAULT true,
    "quietHoursEnabled" BOOLEAN NOT NULL DEFAULT false,
    "quietHoursStart" TEXT,
    "quietHoursEnd" TEXT,
    "quietHoursTimezone" TEXT NOT NULL DEFAULT 'Australia/Sydney',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notification_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connection_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userType" "UserType" NOT NULL,
    "channelName" TEXT NOT NULL,
    "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disconnectedAt" TIMESTAMP(3),
    "lastHeartbeat" TIMESTAMP(3) NOT NULL,
    "reconnects" INTEGER NOT NULL DEFAULT 0,
    "deviceType" TEXT,
    "browser" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connection_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_location_history" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "accuracy" DOUBLE PRECISION,
    "heading" DOUBLE PRECISION,
    "speed" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceType" TEXT,
    "batteryLevel" INTEGER,

    CONSTRAINT "contractor_location_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_messages" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverType" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "featureArea" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxParticipants" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "beta_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_enrollments" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "status" "BetaEnrollmentStatus" NOT NULL DEFAULT 'INVITED',
    "invitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invitedBy" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "tierOverride" "RealtimeTier",
    "completedAt" TIMESTAMP(3),
    "withdrawnAt" TIMESTAMP(3),
    "withdrawReason" TEXT,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "beta_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_feedback" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "category" "BetaFeedbackCategory" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "screenshotUrl" TEXT,
    "screenshotKey" TEXT,
    "pageUrl" TEXT,
    "userAgent" TEXT,
    "deviceType" TEXT,
    "isReviewed" BOOLEAN NOT NULL DEFAULT false,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "adminResponse" TEXT,
    "priority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tenantId" TEXT,

    CONSTRAINT "beta_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beta_nps_surveys" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "followUpAnswer" TEXT,
    "surveyTrigger" TEXT,
    "featureContext" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,

    CONSTRAINT "beta_nps_surveys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public_claims" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "disasterType" TEXT NOT NULL,
    "incidentDate" TIMESTAMP(3) NOT NULL,
    "isOngoing" BOOLEAN NOT NULL DEFAULT false,
    "isEmergency" BOOLEAN NOT NULL DEFAULT false,
    "damageDescription" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL DEFAULT false,
    "insuranceProvider" TEXT,
    "policyNumber" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "requiredIICRCCerts" "IICRCCertificationLevel"[],

    CONSTRAINT "public_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "triage_assessments" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "urgencyScore" INTEGER NOT NULL,
    "urgencyLevel" TEXT NOT NULL,
    "estimatedCost" INTEGER NOT NULL DEFAULT 0,
    "recommendations" TEXT[],
    "requiredServices" TEXT[],
    "triageSessionId" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "triage_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorDocument" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "documentType" "ContractorDocumentType" NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "rejectionReason" TEXT,
    "expiryDate" TIMESTAMP(3),
    "issuedDate" TIMESTAMP(3),
    "documentNumber" TEXT,
    "issuingAuthority" TEXT,
    "stateIssued" "AustralianState",
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "lastViewedAt" TIMESTAMP(3),
    "lastViewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorVerificationHistory" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "action" "VerificationAction" NOT NULL,
    "previousStatus" "ContractorVerificationStatus",
    "newStatus" "ContractorVerificationStatus" NOT NULL,
    "reason" TEXT,
    "notes" TEXT,
    "performedBy" TEXT NOT NULL,
    "performedByName" TEXT,
    "isSystemAction" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractorVerificationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_image_enhancement_logs" (
    "id" TEXT NOT NULL,
    "photoId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "originalDesc" TEXT,
    "enhancedDesc" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL,
    "costUSD" DECIMAL(10,4) NOT NULL,
    "processingMs" INTEGER NOT NULL,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "error" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_image_enhancement_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_batch_processing_jobs" (
    "id" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "totalImages" INTEGER NOT NULL,
    "processedImages" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "totalCostUSD" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "initiatedBy" TEXT NOT NULL,
    "tenantId" TEXT,
    "metadata" JSONB,

    CONSTRAINT "ai_batch_processing_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "background_jobs" (
    "id" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "priority" INTEGER NOT NULL DEFAULT 5,
    "input" JSONB NOT NULL,
    "output" JSONB,
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "lastError" TEXT,
    "errorStack" TEXT,
    "scheduledFor" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "nextRetryAt" TIMESTAMP(3),
    "claimId" TEXT,
    "tenantId" TEXT,
    "initiatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "background_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waitlist_submissions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "consentEmail" BOOLEAN NOT NULL DEFAULT false,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "notifiedLaunch" BOOLEAN NOT NULL DEFAULT false,
    "convertedUser" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "waitlist_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "xero_tokens" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "scopes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "xero_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_applications" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "certifications" TEXT[],
    "serviceAreas" TEXT[],
    "yearsInBusiness" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "notes" TEXT,
    "source" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmContent" TEXT,
    "utmTerm" TEXT,
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "contacted" BOOLEAN NOT NULL DEFAULT false,
    "contactedAt" TIMESTAMP(3),
    "convertedContractor" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "insuranceData" JSONB,
    "experienceData" JSONB,
    "equipmentData" JSONB,
    "healthSafetyData" JSONB,
    "bankingData" JSONB,

    CONSTRAINT "contractor_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_captures" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL DEFAULT false,
    "insuranceProvider" TEXT,
    "claimNumber" TEXT,
    "urgency" TEXT NOT NULL DEFAULT 'STANDARD',
    "preferredContactMethod" TEXT DEFAULT 'EMAIL',
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "source" TEXT,
    "referrer" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "contactedAt" TIMESTAMP(3),
    "convertedToClientAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_captures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletter_subscriptions" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "interests" TEXT[],
    "state" TEXT,
    "postcode" TEXT,
    "marketingConsent" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "resubscribedAt" TIMESTAMP(3),
    "unsubscribeToken" TEXT,
    "source" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "emailsOpened" INTEGER NOT NULL DEFAULT 0,
    "emailsClicked" INTEGER NOT NULL DEFAULT 0,
    "lastEmailSentAt" TIMESTAMP(3),
    "lastEmailOpenedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "confirmedAt" TIMESTAMP(3),
    "confirmationToken" TEXT,

    CONSTRAINT "newsletter_subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_inquiries" (
    "approvalReason" TEXT,
    "ipAddress" TEXT,
    "referrer" TEXT,
    "reviewNotes" TEXT,
    "source" TEXT,
    "userAgent" TEXT,
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "contactFirstName" TEXT NOT NULL,
    "contactLastName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "servicesOffered" TEXT[],
    "serviceAreas" TEXT[],
    "certifications" JSONB,
    "yearsInBusiness" INTEGER NOT NULL DEFAULT 0,
    "numberOfEmployees" INTEGER NOT NULL DEFAULT 0,
    "hasPublicLiability" BOOLEAN NOT NULL DEFAULT false,
    "publicLiabilityAmount" DECIMAL(12,2),
    "hasWorkersCompensation" BOOLEAN NOT NULL DEFAULT false,
    "additionalInfo" TEXT,
    "website" TEXT,
    "availability24x7" BOOLEAN NOT NULL DEFAULT false,
    "emergencyResponseTime" TEXT,
    "termsAccepted" BOOLEAN NOT NULL DEFAULT false,
    "backgroundCheckConsent" BOOLEAN NOT NULL DEFAULT false,
    "applicationScore" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "notes" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contractor_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "jobNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "propertyId" TEXT NOT NULL,
    "contractorId" TEXT,
    "clientId" TEXT,
    "estimatedCost" DECIMAL(12,2),
    "actualCost" DECIMAL(12,2),
    "scheduledDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "notes" TEXT,
    "insuranceClaimId" TEXT,
    "hoursWorked" DECIMAL(8,2),
    "materialsUsed" TEXT,
    "tenantId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_documents" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "size" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_photos" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_outcome_logs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "outcome" "JobOutcome" NOT NULL,
    "jobType" TEXT NOT NULL,
    "contractorId" TEXT,
    "clientId" TEXT,
    "insuranceClaimId" TEXT,
    "actualCost" DECIMAL(10,2),
    "hoursWorked" DECIMAL(6,2),
    "loggedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loggedByUserId" TEXT NOT NULL,
    "tenantId" TEXT,
    "metadata" JSONB,
    "state" TEXT,
    "suburb" TEXT,
    "postcode" TEXT,
    "urgency" TEXT,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insurerName" TEXT,
    "responseMinutes" INTEGER,
    "durationMinutes" INTEGER,
    "totalMinutes" INTEGER,

    CONSTRAINT "job_outcome_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_logs" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "recipientId" TEXT,
    "recipient" TEXT NOT NULL,
    "jobId" TEXT,
    "jobNumber" TEXT,
    "subject" TEXT,
    "status" TEXT NOT NULL DEFAULT 'sent',
    "errorMessage" TEXT,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_enquiries" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT NOT NULL DEFAULT 'General Inquiry',
    "message" TEXT NOT NULL,
    "source" TEXT,
    "referrer" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT,
    "respondedAt" TIMESTAMP(3),
    "consentGivenAt" TIMESTAMP(3),
    "consentVersion" TEXT,
    "piiPurgedAt" TIMESTAMP(3),

    CONSTRAINT "contact_enquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "performedBy" TEXT,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tenantId" TEXT,
    "changes" JSONB,
    "details" TEXT,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "resourceId" TEXT,
    "resourceType" TEXT,
    "severity" TEXT,
    "status" TEXT,
    "timestamp" TIMESTAMP(3),
    "userEmail" TEXT,
    "userId" TEXT,
    "workspaceId" TEXT,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotConversation" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "jobId" TEXT,
    "contractorId" TEXT,
    "messages" JSONB[],
    "context" JSONB,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BotConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallTranscript" (
    "id" TEXT NOT NULL,
    "voiceCallId" TEXT NOT NULL,
    "redactedText" TEXT NOT NULL,
    "language" TEXT,
    "wordCount" INTEGER,
    "redactionApplied" BOOLEAN NOT NULL DEFAULT true,
    "retentionExpiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CallTranscript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimNotification" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClaimPhotoAttachment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "claimId" TEXT NOT NULL,
    "objectKey" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "capturedAt" TIMESTAMP(3) NOT NULL,
    "geoLat" DOUBLE PRECISION,
    "geoLng" DOUBLE PRECISION,
    "geoAccuracyM" DOUBLE PRECISION,
    "sizeBytes" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClaimPhotoAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetencyTestResult" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "score" INTEGER NOT NULL,
    "totalPossible" INTEGER NOT NULL,
    "percentage" DOUBLE PRECISION NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "timeTakenSeconds" INTEGER,
    "certificateNumber" TEXT,
    "certificateExpiry" TIMESTAMP(3),
    "reassessmentDueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetencyTestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorAuditLog" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "details" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "performedBy" TEXT NOT NULL,
    "performedByType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractorAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorCompany" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "tradingName" TEXT,
    "abn" TEXT NOT NULL,
    "acn" TEXT,
    "companyStructure" TEXT NOT NULL,
    "registeredAddress" TEXT NOT NULL,
    "registeredCity" TEXT NOT NULL,
    "registeredState" TEXT NOT NULL,
    "registeredPostcode" TEXT NOT NULL,
    "mailingAddress" TEXT,
    "mailingCity" TEXT,
    "mailingState" TEXT,
    "mailingPostcode" TEXT,
    "officePhone" TEXT,
    "officeFax" TEXT,
    "website" TEXT,
    "companyEmail" TEXT,
    "directors" TEXT NOT NULL,
    "companyLogo" TEXT,
    "brandColors" TEXT,
    "abnVerified" BOOLEAN NOT NULL DEFAULT false,
    "abnVerifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorInsurance" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "insuranceType" TEXT NOT NULL,
    "insurer" TEXT NOT NULL,
    "policyNumber" TEXT NOT NULL,
    "coverageAmount" DOUBLE PRECISION NOT NULL,
    "excess" DOUBLE PRECISION,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "certificateUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verifiedAt" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorInsurance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorKPI" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "periodType" TEXT NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "totalJobs" INTEGER NOT NULL DEFAULT 0,
    "completedJobs" INTEGER NOT NULL DEFAULT 0,
    "averageResponseTime" DOUBLE PRECISION,
    "averageCompletionTime" DOUBLE PRECISION,
    "customerSatisfaction" DOUBLE PRECISION,
    "qualityScore" DOUBLE PRECISION,
    "complianceScore" DOUBLE PRECISION,
    "cleanClaimsScore" DOUBLE PRECISION,
    "carsiCompliance" DOUBLE PRECISION,
    "totalRevenue" DOUBLE PRECISION,
    "averageJobValue" DOUBLE PRECISION,
    "complaints" INTEGER NOT NULL DEFAULT 0,
    "violations" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractorKPI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorNotification" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "actionRequired" BOOLEAN NOT NULL DEFAULT false,
    "actionUrl" TEXT,
    "actionDeadline" TIMESTAMP(3),
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "dismissedAt" TIMESTAMP(3),
    "emailSent" BOOLEAN NOT NULL DEFAULT false,
    "smsSent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContractorNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorPayment" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT NOT NULL,
    "transactionId" TEXT,
    "failureReason" TEXT,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorSubscription" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePriceId" TEXT,
    "tier" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'INACTIVE',
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'aud',
    "billingCycle" TEXT NOT NULL DEFAULT 'monthly',
    "currentPeriodStart" TIMESTAMP(3),
    "currentPeriodEnd" TIMESTAMP(3),
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "trialEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastPaymentAt" TIMESTAMP(3),
    "lastPaymentStatus" TEXT,

    CONSTRAINT "ContractorSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractorTerritory" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "centerLat" DOUBLE PRECISION,
    "centerLng" DOUBLE PRECISION,
    "radiusKm" DOUBLE PRECISION,
    "postcodes" TEXT,
    "suburbs" TEXT,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT true,
    "afterHours" BOOLEAN NOT NULL DEFAULT false,
    "weekendService" BOOLEAN NOT NULL DEFAULT true,
    "maxJobsPerDay" INTEGER NOT NULL DEFAULT 5,
    "currentActiveJobs" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContractorTerritory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT,
    "clientId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ErrorLog" (
    "id" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "metadata" TEXT,
    "source" TEXT,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ErrorLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceReferral" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,
    "customerType" TEXT NOT NULL,
    "fundingBand" TEXT NOT NULL,
    "disasterCategory" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "disclosureVersion" TEXT NOT NULL,
    "privacyNoticeVersion" TEXT NOT NULL,
    "consentShareEquipped" BOOLEAN NOT NULL,
    "consentReferralDisclosure" BOOLEAN NOT NULL,
    "consentMarketing" BOOLEAN NOT NULL DEFAULT false,
    "payloadHash" TEXT NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,
    "receiver" TEXT NOT NULL,
    "handoffAck" BOOLEAN NOT NULL DEFAULT false,
    "statusWebhookLastStatus" TEXT,
    "statusWebhookLastAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equippedReferralId" TEXT,
    "entityIdentifierHash" TEXT,
    "stage" TEXT,
    "lastStatus" TEXT,
    "consentVersion" TEXT,
    "smsSent" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,

    CONSTRAINT "FinanceReferral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinanceReferralEvent" (
    "id" TEXT NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "referralId" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,
    "webhookTimestamp" TEXT NOT NULL,
    "stage" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "unknownStage" BOOLEAN NOT NULL DEFAULT false,
    "payload" JSONB,

    CONSTRAINT "FinanceReferralEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobOffer" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "offeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "requiresLiabilityAck" BOOLEAN NOT NULL DEFAULT false,
    "liabilityAcknowledgedAt" TIMESTAMP(3),
    "pool" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnboardingPayment" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "stripeSessionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'aud',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingPayment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "abn" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postcode" TEXT,
    "type" TEXT NOT NULL,
    "tier" TEXT NOT NULL DEFAULT 'STANDARD',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "commissionRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "creditLimit" DOUBLE PRECISION NOT NULL DEFAULT 5000,
    "paymentTerms" INTEGER NOT NULL DEFAULT 7,
    "totalReferrals" INTEGER NOT NULL DEFAULT 0,
    "totalRevenue" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastReferralAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerBilling" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMP(3) NOT NULL,
    "paidAt" TIMESTAMP(3),
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "invoiceNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerBilling_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProofOfWork" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "workType" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientContact" TEXT NOT NULL,
    "projectAddress" TEXT,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "projectValue" DOUBLE PRECISION NOT NULL,
    "projectDescription" TEXT,
    "damageType" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "propertyType" TEXT NOT NULL,
    "emergencyResponse" BOOLEAN NOT NULL DEFAULT false,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insuranceCompany" TEXT,
    "evidence" TEXT NOT NULL DEFAULT '[]',
    "verificationStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProofOfWork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PushToken" (
    "id" TEXT NOT NULL,
    "claimId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "platform" TEXT NOT NULL DEFAULT 'web',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PushToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditContentPillar" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categories" TEXT[],
    "lastUsedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedditContentPillar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditOrchestratorRun" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "triggerType" TEXT NOT NULL,
    "command" TEXT,
    "status" TEXT NOT NULL DEFAULT 'RUNNING',
    "postsGenerated" INTEGER NOT NULL DEFAULT 0,
    "postsValidated" INTEGER NOT NULL DEFAULT 0,
    "postsPosted" INTEGER NOT NULL DEFAULT 0,
    "postsFailed" INTEGER NOT NULL DEFAULT 0,
    "totalTokensUsed" INTEGER NOT NULL DEFAULT 0,
    "totalDurationMs" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "RedditOrchestratorRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditPerformanceLog" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "upvotes" INTEGER NOT NULL,
    "downvotes" INTEGER NOT NULL,
    "commentCount" INTEGER NOT NULL,
    "upvoteRatio" DOUBLE PRECISION NOT NULL,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "sampledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,

    CONSTRAINT "RedditPerformanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditPost" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tldr" TEXT,
    "category" TEXT NOT NULL,
    "brands" TEXT NOT NULL,
    "geoSignals" TEXT NOT NULL,
    "subreddit" TEXT NOT NULL DEFAULT 'Disaster_Recovery_Qld',
    "aiModel" TEXT,
    "aiPromptVersion" TEXT,
    "generationTokens" INTEGER,
    "safetyStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "safetyGateResults" TEXT,
    "geoCompliant" BOOLEAN NOT NULL DEFAULT false,
    "geoIssues" TEXT,
    "imageGenerated" BOOLEAN NOT NULL DEFAULT false,
    "imageUrl" TEXT,
    "imagePrompt" TEXT,
    "imageFormat" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "scheduledFor" TIMESTAMP(3),
    "generatedAt" TIMESTAMP(3),
    "validatedAt" TIMESTAMP(3),
    "postedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "redditId" TEXT,
    "redditUrl" TEXT,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "commentCount" INTEGER NOT NULL DEFAULT 0,
    "upvoteRatio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isRemoved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentPillarId" TEXT,
    "orchestratorRunId" TEXT,

    CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditSafetyAudit" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "gateName" TEXT NOT NULL,
    "gateModel" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL,
    "findings" TEXT NOT NULL,
    "tokensUsed" INTEGER,
    "durationMs" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" TEXT NOT NULL,

    CONSTRAINT "RedditSafetyAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedditSystemPrompt" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "version" TEXT NOT NULL,
    "promptText" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RedditSystemPrompt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubContractor" (
    "id" TEXT NOT NULL,
    "abn" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "tradingName" TEXT,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "licenceNumber" TEXT NOT NULL,
    "licenceState" TEXT NOT NULL,
    "licenceExpiry" TIMESTAMP(3) NOT NULL,
    "publicLiabilityCoverage" DOUBLE PRECISION NOT NULL,
    "publicLiabilityInsurer" TEXT NOT NULL,
    "publicLiabilityExpiry" TIMESTAMP(3) NOT NULL,
    "onboardingStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "agreementSignedAt" TIMESTAMP(3),
    "agreementSignedBy" TEXT,
    "registeredByContractorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubContractor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubContractorEngagement" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "subContractorId" TEXT NOT NULL,
    "primaryContractorId" TEXT NOT NULL,
    "tradeType" TEXT NOT NULL,
    "workScope" TEXT NOT NULL,
    "subInvoiceAmount" DOUBLE PRECISION NOT NULL,
    "markupPercent" DOUBLE PRECISION NOT NULL,
    "customerChargeAmount" DOUBLE PRECISION NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,
    "customerChargeTotalIncGst" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'QUOTED',
    "authorisedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "invoicedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubContractorEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoiceCall" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "agentRole" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "channel" TEXT NOT NULL,
    "surface" TEXT NOT NULL DEFAULT 'web_widget',
    "consentGivenAt" TIMESTAMP(3),
    "consentVersion" TEXT,
    "consentMethod" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "endedAt" TIMESTAMP(3),
    "durationSeconds" INTEGER,
    "outcome" TEXT,
    "redactedSummary" TEXT,
    "correlationClaimId" TEXT,
    "correlationApplicantId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoiceCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'stripe',
    "livemode" BOOLEAN,
    "payloadHash" TEXT,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_training_modules" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "moduleName" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "contractor_training_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contractor_training_progress" (
    "id" TEXT NOT NULL,
    "contractorId" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "totalSteps" INTEGER NOT NULL DEFAULT 14,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "metadata" TEXT,

    CONSTRAINT "contractor_training_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_service_jobs" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "contractorId" TEXT,
    "serviceType" TEXT NOT NULL,
    "urgency" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "coordinates" JSONB,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT,
    "insuranceClaim" BOOLEAN NOT NULL DEFAULT false,
    "insurerName" TEXT,
    "claimNumber" TEXT,
    "policyNumber" TEXT,
    "assignedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_service_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_notes" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_tracking" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lead_tracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "propertyAddress" TEXT NOT NULL,
    "suburb" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "damageType" TEXT NOT NULL,
    "damageDate" TIMESTAMP(3) NOT NULL,
    "damageDescription" TEXT NOT NULL,
    "estimatedAreaAffected" TEXT NOT NULL,
    "hasInsurance" BOOLEAN NOT NULL,
    "insuranceCompany" TEXT,
    "claimNumber" TEXT,
    "excessAmount" TEXT,
    "urgencyLevel" TEXT NOT NULL,
    "propertyValue" TEXT NOT NULL,
    "isBusinessProperty" BOOLEAN NOT NULL,
    "requiresAccommodation" BOOLEAN NOT NULL,
    "leadScore" INTEGER NOT NULL,
    "leadValue" DOUBLE PRECISION NOT NULL,
    "hasPhotos" BOOLEAN NOT NULL,
    "readyToStart" TEXT NOT NULL,
    "budget" TEXT,
    "decisionMaker" BOOLEAN NOT NULL,
    "qualityStatus" TEXT NOT NULL,
    "source" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "partnerId" TEXT,
    "assignedAt" TIMESTAMP(3),
    "acceptedAt" TIMESTAMP(3),
    "rejectedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_domain_key" ON "tenants"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_subdomain_key" ON "tenants"("subdomain");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_stripeCustomerId_key" ON "tenants"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_stripeSubscriptionId_key" ON "tenants"("stripeSubscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "tenant_configurations_tenantId_key_key" ON "tenant_configurations"("tenantId", "key");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_googleId_key" ON "users"("googleId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_userType_idx" ON "users"("userType");

-- CreateIndex
CREATE INDEX "users_australianState_idx" ON "users"("australianState");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "user_preferences_userId_key" ON "user_preferences"("userId");

-- CreateIndex
CREATE INDEX "LoginAttempt_userId_idx" ON "LoginAttempt"("userId");

-- CreateIndex
CREATE INDEX "LoginAttempt_ipAddress_idx" ON "LoginAttempt"("ipAddress");

-- CreateIndex
CREATE INDEX "LoginAttempt_attemptedAt_idx" ON "LoginAttempt"("attemptedAt");

-- CreateIndex
CREATE INDEX "LoginAttempt_tenantId_idx" ON "LoginAttempt"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_userId_idx" ON "VerificationToken"("userId");

-- CreateIndex
CREATE INDEX "VerificationToken_token_idx" ON "VerificationToken"("token");

-- CreateIndex
CREATE INDEX "VerificationToken_expiresAt_idx" ON "VerificationToken"("expiresAt");

-- CreateIndex
CREATE INDEX "VerificationToken_tenantId_idx" ON "VerificationToken"("tenantId");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_entityId_idx" ON "audit_logs"("entityId");

-- CreateIndex
CREATE INDEX "audit_logs_entityType_idx" ON "audit_logs"("entityType");

-- CreateIndex
CREATE INDEX "audit_logs_performedBy_idx" ON "audit_logs"("performedBy");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_workspaceId_idx" ON "audit_logs"("workspaceId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- CreateIndex
CREATE INDEX "audit_logs_tenantId_idx" ON "audit_logs"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_userId_key" ON "Contractor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_abnNumber_key" ON "Contractor"("abnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_acnNumber_key" ON "Contractor"("acnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_nrpgMemberId_key" ON "Contractor"("nrpgMemberId");

-- CreateIndex
CREATE INDEX "Contractor_businessName_idx" ON "Contractor"("businessName");

-- CreateIndex
CREATE INDEX "Contractor_primaryState_idx" ON "Contractor"("primaryState");

-- CreateIndex
CREATE INDEX "Contractor_nrpgMemberId_idx" ON "Contractor"("nrpgMemberId");

-- CreateIndex
CREATE INDEX "Contractor_isVerified_idx" ON "Contractor"("isVerified");

-- CreateIndex
CREATE INDEX "Contractor_isActive_idx" ON "Contractor"("isActive");

-- CreateIndex
CREATE INDEX "Contractor_abnNumber_idx" ON "Contractor"("abnNumber");

-- CreateIndex
CREATE INDEX "Contractor_tenantId_idx" ON "Contractor"("tenantId");

-- CreateIndex
CREATE INDEX "Contractor_verificationStatus_idx" ON "Contractor"("verificationStatus");

-- CreateIndex
CREATE INDEX "Contractor_licenseExpiry_idx" ON "Contractor"("licenseExpiry");

-- CreateIndex
CREATE INDEX "Contractor_isVerified_isActive_verificationStatus_idx" ON "Contractor"("isVerified", "isActive", "verificationStatus");

-- CreateIndex
CREATE UNIQUE INDEX "IICRCCertification_certificationCode_key" ON "IICRCCertification"("certificationCode");

-- CreateIndex
CREATE INDEX "IICRCCertification_contractorId_idx" ON "IICRCCertification"("contractorId");

-- CreateIndex
CREATE INDEX "IICRCCertification_certificationCode_idx" ON "IICRCCertification"("certificationCode");

-- CreateIndex
CREATE INDEX "IICRCCertification_expiryDate_idx" ON "IICRCCertification"("expiryDate");

-- CreateIndex
CREATE INDEX "IICRCCertification_isActive_idx" ON "IICRCCertification"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "IICRCCertification_contractorId_certificationLevel_certific_key" ON "IICRCCertification"("contractorId", "certificationLevel", "certificationCode");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_postcode_idx" ON "ContractorServiceArea"("postcode");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_state_idx" ON "ContractorServiceArea"("state");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_contractorId_idx" ON "ContractorServiceArea"("contractorId");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_suburb_idx" ON "ContractorServiceArea"("suburb");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_latitude_longitude_idx" ON "ContractorServiceArea"("latitude", "longitude");

-- CreateIndex
CREATE INDEX "ContractorServiceArea_isPrimaryArea_isActive_idx" ON "ContractorServiceArea"("isPrimaryArea", "isActive");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorServiceArea_contractorId_postcode_key" ON "ContractorServiceArea"("contractorId", "postcode");

-- CreateIndex
CREATE UNIQUE INDEX "admin_service_categories_name_key" ON "admin_service_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_services_categoryId_name_key" ON "admin_services"("categoryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "admin_themes_identifier_key" ON "admin_themes"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "service_request_callout_payments_serviceRequestId_key" ON "service_request_callout_payments"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "service_request_callout_payments_stripeCheckoutSessionId_key" ON "service_request_callout_payments"("stripeCheckoutSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "service_request_callout_payments_stripePaymentIntentId_key" ON "service_request_callout_payments"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "service_request_callout_payments_clientId_idx" ON "service_request_callout_payments"("clientId");

-- CreateIndex
CREATE INDEX "service_request_callout_payments_contractorProfileId_idx" ON "service_request_callout_payments"("contractorProfileId");

-- CreateIndex
CREATE INDEX "service_request_callout_payments_status_idx" ON "service_request_callout_payments"("status");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_profiles_userId_key" ON "contractor_profiles"("userId");

-- CreateIndex
CREATE INDEX "contractor_matches_tenantId_idx" ON "contractor_matches"("tenantId");

-- CreateIndex
CREATE INDEX "contractor_matches_claimId_notificationStatus_idx" ON "contractor_matches"("claimId", "notificationStatus");

-- CreateIndex
CREATE INDEX "contractor_matches_contractorId_createdAt_idx" ON "contractor_matches"("contractorId", "createdAt");

-- CreateIndex
CREATE INDEX "contractor_matches_responseDeadline_idx" ON "contractor_matches"("responseDeadline");

-- CreateIndex
CREATE INDEX "contractor_matches_serviceRequestId_idx" ON "contractor_matches"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_preferences_userId_key" ON "contractor_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "client_profiles_userId_key" ON "client_profiles"("userId");

-- CreateIndex
CREATE INDEX "client_profiles_tier_idx" ON "client_profiles"("tier");

-- CreateIndex
CREATE INDEX "client_profiles_riskZone_idx" ON "client_profiles"("riskZone");

-- CreateIndex
CREATE INDEX "client_profiles_flaggedForReview_idx" ON "client_profiles"("flaggedForReview");

-- CreateIndex
CREATE INDEX "client_profiles_tenantId_idx" ON "client_profiles"("tenantId");

-- CreateIndex
CREATE INDEX "client_properties_clientProfileId_idx" ON "client_properties"("clientProfileId");

-- CreateIndex
CREATE INDEX "client_properties_postcode_idx" ON "client_properties"("postcode");

-- CreateIndex
CREATE INDEX "client_properties_state_idx" ON "client_properties"("state");

-- CreateIndex
CREATE INDEX "client_properties_tenantId_idx" ON "client_properties"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "client_insurance_clientProfileId_key" ON "client_insurance"("clientProfileId");

-- CreateIndex
CREATE INDEX "client_insurance_policyExpiryDate_idx" ON "client_insurance"("policyExpiryDate");

-- CreateIndex
CREATE INDEX "client_insurance_policyVerified_idx" ON "client_insurance"("policyVerified");

-- CreateIndex
CREATE INDEX "client_insurance_tenantId_idx" ON "client_insurance"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "client_payments_clientProfileId_key" ON "client_payments"("clientProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "client_payments_stripeCustomerId_key" ON "client_payments"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "client_payments_stripeCustomerId_idx" ON "client_payments"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "client_payments_cardExpiryMonth_cardExpiryYear_idx" ON "client_payments"("cardExpiryMonth", "cardExpiryYear");

-- CreateIndex
CREATE INDEX "client_payments_tenantId_idx" ON "client_payments"("tenantId");

-- CreateIndex
CREATE INDEX "client_emergency_contacts_clientProfileId_idx" ON "client_emergency_contacts"("clientProfileId");

-- CreateIndex
CREATE INDEX "client_emergency_contacts_isPrimary_idx" ON "client_emergency_contacts"("isPrimary");

-- CreateIndex
CREATE UNIQUE INDEX "client_onboarding_clientId_key" ON "client_onboarding"("clientId");

-- CreateIndex
CREATE INDEX "client_onboarding_status_idx" ON "client_onboarding"("status");

-- CreateIndex
CREATE INDEX "client_onboarding_currentPhase_idx" ON "client_onboarding"("currentPhase");

-- CreateIndex
CREATE INDEX "client_onboarding_flowVariant_idx" ON "client_onboarding"("flowVariant");

-- CreateIndex
CREATE INDEX "client_onboarding_lastActivityAt_idx" ON "client_onboarding"("lastActivityAt");

-- CreateIndex
CREATE INDEX "client_onboarding_tenantId_idx" ON "client_onboarding"("tenantId");

-- CreateIndex
CREATE INDEX "client_module_progress_onboardingId_idx" ON "client_module_progress"("onboardingId");

-- CreateIndex
CREATE INDEX "client_module_progress_status_idx" ON "client_module_progress"("status");

-- CreateIndex
CREATE INDEX "client_module_progress_completed_idx" ON "client_module_progress"("completed");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_abnNumber_key" ON "workspaces"("abnNumber");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_stripeCustomerId_key" ON "workspaces"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "workspaces_stripeSubscriptionId_key" ON "workspaces"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "workspaces_subscriptionStatus_idx" ON "workspaces"("subscriptionStatus");

-- CreateIndex
CREATE INDEX "workspaces_subscriptionTier_idx" ON "workspaces"("subscriptionTier");

-- CreateIndex
CREATE INDEX "workspaces_abnNumber_idx" ON "workspaces"("abnNumber");

-- CreateIndex
CREATE INDEX "workspace_members_userId_idx" ON "workspace_members"("userId");

-- CreateIndex
CREATE INDEX "workspace_members_workspaceId_idx" ON "workspace_members"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "workspace_members_workspaceId_userId_key" ON "workspace_members"("workspaceId", "userId");

-- CreateIndex
CREATE INDEX "contractor_rotation_postcode_idx" ON "contractor_rotation"("postcode");

-- CreateIndex
CREATE INDEX "contractor_rotation_lastJobReceivedAt_idx" ON "contractor_rotation"("lastJobReceivedAt");

-- CreateIndex
CREATE INDEX "contractor_rotation_availabilityStatus_idx" ON "contractor_rotation"("availabilityStatus");

-- CreateIndex
CREATE INDEX "contractor_rotation_unavailableUntil_idx" ON "contractor_rotation"("unavailableUntil");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_rotation_workspaceId_postcode_key" ON "contractor_rotation"("workspaceId", "postcode");

-- CreateIndex
CREATE INDEX "workspace_audit_logs_userId_createdAt_idx" ON "workspace_audit_logs"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "workspace_audit_logs_workspaceId_createdAt_idx" ON "workspace_audit_logs"("workspaceId", "createdAt");

-- CreateIndex
CREATE INDEX "workspace_audit_logs_action_createdAt_idx" ON "workspace_audit_logs"("action", "createdAt");

-- CreateIndex
CREATE INDEX "workspace_audit_logs_createdAt_idx" ON "workspace_audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "Booking_clientId_idx" ON "Booking"("clientId");

-- CreateIndex
CREATE INDEX "Booking_contractorId_idx" ON "Booking"("contractorId");

-- CreateIndex
CREATE INDEX "Booking_servicePostcode_idx" ON "Booking"("servicePostcode");

-- CreateIndex
CREATE INDEX "Booking_serviceState_idx" ON "Booking"("serviceState");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_emergencyResponseLevel_idx" ON "Booking"("emergencyResponseLevel");

-- CreateIndex
CREATE INDEX "Booking_tenantId_idx" ON "Booking"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transactionId_key" ON "Payment"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_invoiceNumber_key" ON "Payment"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Payment_bookingId_idx" ON "Payment"("bookingId");

-- CreateIndex
CREATE INDEX "Payment_clientId_idx" ON "Payment"("clientId");

-- CreateIndex
CREATE INDEX "Payment_contractorId_idx" ON "Payment"("contractorId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_invoiceNumber_idx" ON "Payment"("invoiceNumber");

-- CreateIndex
CREATE INDEX "Payment_tenantId_idx" ON "Payment"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceAU_paymentId_key" ON "InvoiceAU"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceAU_invoiceNumber_key" ON "InvoiceAU"("invoiceNumber");

-- CreateIndex
CREATE INDEX "InvoiceAU_invoiceNumber_idx" ON "InvoiceAU"("invoiceNumber");

-- CreateIndex
CREATE INDEX "InvoiceAU_tenantId_idx" ON "InvoiceAU"("tenantId");

-- CreateIndex
CREATE INDEX "InvoiceAU_contractorId_idx" ON "InvoiceAU"("contractorId");

-- CreateIndex
CREATE INDEX "InvoiceAU_clientId_idx" ON "InvoiceAU"("clientId");

-- CreateIndex
CREATE INDEX "InvoiceAU_isPaid_idx" ON "InvoiceAU"("isPaid");

-- CreateIndex
CREATE UNIQUE INDEX "InsuranceProvider_code_key" ON "InsuranceProvider"("code");

-- CreateIndex
CREATE INDEX "InsuranceProvider_code_idx" ON "InsuranceProvider"("code");

-- CreateIndex
CREATE INDEX "InsuranceProvider_isActive_idx" ON "InsuranceProvider"("isActive");

-- CreateIndex
CREATE INDEX "InsuranceProvider_providerType_idx" ON "InsuranceProvider"("providerType");

-- CreateIndex
CREATE INDEX "InsuranceProvider_tenantId_idx" ON "InsuranceProvider"("tenantId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_bookingId_idx" ON "InsuranceClaimAU"("bookingId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_clientId_idx" ON "InsuranceClaimAU"("clientId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_insuranceProviderId_idx" ON "InsuranceClaimAU"("insuranceProviderId");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_policyNumber_idx" ON "InsuranceClaimAU"("policyNumber");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_claimNumber_idx" ON "InsuranceClaimAU"("claimNumber");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_status_idx" ON "InsuranceClaimAU"("status");

-- CreateIndex
CREATE INDEX "InsuranceClaimAU_tenantId_idx" ON "InsuranceClaimAU"("tenantId");

-- CreateIndex
CREATE INDEX "Rating_contractorId_idx" ON "Rating"("contractorId");

-- CreateIndex
CREATE INDEX "Rating_clientId_idx" ON "Rating"("clientId");

-- CreateIndex
CREATE INDEX "Rating_rating_idx" ON "Rating"("rating");

-- CreateIndex
CREATE INDEX "Rating_tenantId_idx" ON "Rating"("tenantId");

-- CreateIndex
CREATE INDEX "Rating_contractorId_isPublished_idx" ON "Rating"("contractorId", "isPublished");

-- CreateIndex
CREATE INDEX "Rating_isPinned_isPublished_idx" ON "Rating"("isPinned", "isPublished");

-- CreateIndex
CREATE INDEX "Rating_helpfulVotes_idx" ON "Rating"("helpfulVotes");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_contractorId_key" ON "Rating"("bookingId", "contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "RiskAssessment_bookingId_key" ON "RiskAssessment"("bookingId");

-- CreateIndex
CREATE INDEX "RiskAssessment_bookingId_idx" ON "RiskAssessment"("bookingId");

-- CreateIndex
CREATE INDEX "RiskAssessment_riskScore_idx" ON "RiskAssessment"("riskScore");

-- CreateIndex
CREATE INDEX "DisasterAlert_disasterType_idx" ON "DisasterAlert"("disasterType");

-- CreateIndex
CREATE INDEX "DisasterAlert_severity_idx" ON "DisasterAlert"("severity");

-- CreateIndex
CREATE INDEX "DisasterAlert_isActive_idx" ON "DisasterAlert"("isActive");

-- CreateIndex
CREATE INDEX "DisasterAlert_startDate_idx" ON "DisasterAlert"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_onboarding_contractorId_key" ON "contractor_onboarding"("contractorId");

-- CreateIndex
CREATE INDEX "idx_contractor_status" ON "contractor_onboarding"("status");

-- CreateIndex
CREATE INDEX "idx_contractor_specialization" ON "contractor_onboarding"("specialization");

-- CreateIndex
CREATE INDEX "idx_contractor_id_onboarding" ON "contractor_onboarding"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_onboarding_tenantId_idx" ON "contractor_onboarding"("tenantId");

-- CreateIndex
CREATE INDEX "idx_module_progress" ON "contractor_module_progress"("onboardingId", "status");

-- CreateIndex
CREATE INDEX "contractor_module_progress_tenantId_idx" ON "contractor_module_progress"("tenantId");

-- CreateIndex
CREATE INDEX "contractor_assessments_tenantId_idx" ON "contractor_assessments"("tenantId");

-- CreateIndex
CREATE INDEX "idx_contractor_id_cert" ON "contractor_certifications"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_certifications_tenantId_idx" ON "contractor_certifications"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "nrpg_certification_points_contractorId_key" ON "nrpg_certification_points"("contractorId");

-- CreateIndex
CREATE INDEX "idx_nrpg_partnership_level" ON "nrpg_certification_points"("partnershipLevel");

-- CreateIndex
CREATE INDEX "idx_nrpg_total_points" ON "nrpg_certification_points"("totalPoints");

-- CreateIndex
CREATE UNIQUE INDEX "nrpg_onboarding_phases_contractorId_key" ON "nrpg_onboarding_phases"("contractorId");

-- CreateIndex
CREATE INDEX "idx_nrpg_overall_status" ON "nrpg_onboarding_phases"("overallStatus");

-- CreateIndex
CREATE INDEX "idx_nrpg_training_course" ON "nrpg_training_progress"("contractorId", "courseId");

-- CreateIndex
CREATE INDEX "idx_nrpg_training_status" ON "nrpg_training_progress"("status");

-- CreateIndex
CREATE UNIQUE INDEX "nrpg_training_progress_contractorId_moduleId_key" ON "nrpg_training_progress"("contractorId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "nrpg_commitments_contractorId_key" ON "nrpg_commitments"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_agreement_acceptances_contractorId_idx" ON "contractor_agreement_acceptances"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_agreement_acceptances_contractorId_version_key" ON "contractor_agreement_acceptances"("contractorId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_payouts_idempotencyKey_key" ON "contractor_payouts"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_payouts_stripeTransferId_key" ON "contractor_payouts"("stripeTransferId");

-- CreateIndex
CREATE INDEX "contractor_payouts_contractorId_idx" ON "contractor_payouts"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_payouts_paymentId_idx" ON "contractor_payouts"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "competitors_domain_key" ON "competitors"("domain");

-- CreateIndex
CREATE INDEX "competitors_category_idx" ON "competitors"("category");

-- CreateIndex
CREATE INDEX "competitors_isActive_idx" ON "competitors"("isActive");

-- CreateIndex
CREATE INDEX "competitors_lastAnalyzedAt_idx" ON "competitors"("lastAnalyzedAt");

-- CreateIndex
CREATE INDEX "competitor_analyses_competitorId_idx" ON "competitor_analyses"("competitorId");

-- CreateIndex
CREATE INDEX "competitor_analyses_analysisDate_idx" ON "competitor_analyses"("analysisDate");

-- CreateIndex
CREATE INDEX "competitor_keywords_competitorId_idx" ON "competitor_keywords"("competitorId");

-- CreateIndex
CREATE INDEX "competitor_keywords_difficultyTier_idx" ON "competitor_keywords"("difficultyTier");

-- CreateIndex
CREATE INDEX "competitor_keywords_opportunityScore_idx" ON "competitor_keywords"("opportunityScore");

-- CreateIndex
CREATE UNIQUE INDEX "competitor_keywords_competitorId_keyword_key" ON "competitor_keywords"("competitorId", "keyword");

-- CreateIndex
CREATE INDEX "backlinks_competitorId_idx" ON "backlinks"("competitorId");

-- CreateIndex
CREATE INDEX "backlinks_sourceDomain_idx" ON "backlinks"("sourceDomain");

-- CreateIndex
CREATE INDEX "backlinks_isActive_idx" ON "backlinks"("isActive");

-- CreateIndex
CREATE INDEX "swot_analyses_competitorId_idx" ON "swot_analyses"("competitorId");

-- CreateIndex
CREATE INDEX "swot_analyses_generatedAt_idx" ON "swot_analyses"("generatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "keyword_opportunities_keyword_key" ON "keyword_opportunities"("keyword");

-- CreateIndex
CREATE INDEX "keyword_opportunities_difficultyTier_idx" ON "keyword_opportunities"("difficultyTier");

-- CreateIndex
CREATE INDEX "keyword_opportunities_gapScore_idx" ON "keyword_opportunities"("gapScore");

-- CreateIndex
CREATE INDEX "keyword_opportunities_category_idx" ON "keyword_opportunities"("category");

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE INDEX "blog_posts_status_idx" ON "blog_posts"("status");

-- CreateIndex
CREATE INDEX "blog_posts_publishedAt_idx" ON "blog_posts"("publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_tenantId_idx" ON "blog_posts"("tenantId");

-- CreateIndex
CREATE INDEX "blog_faqs_blogPostId_idx" ON "blog_faqs"("blogPostId");

-- CreateIndex
CREATE INDEX "faqs_category_idx" ON "faqs"("category");

-- CreateIndex
CREATE INDEX "faqs_serviceType_idx" ON "faqs"("serviceType");

-- CreateIndex
CREATE INDEX "faqs_location_idx" ON "faqs"("location");

-- CreateIndex
CREATE INDEX "faqs_tenantId_idx" ON "faqs"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_slug_key" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_slug_idx" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_serviceType_idx" ON "case_studies"("serviceType");

-- CreateIndex
CREATE INDEX "case_studies_location_idx" ON "case_studies"("location");

-- CreateIndex
CREATE INDEX "case_studies_tenantId_idx" ON "case_studies"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "customer_lifecycle_userId_key" ON "customer_lifecycle"("userId");

-- CreateIndex
CREATE INDEX "customer_lifecycle_currentStage_idx" ON "customer_lifecycle"("currentStage");

-- CreateIndex
CREATE INDEX "customer_lifecycle_healthScore_idx" ON "customer_lifecycle"("healthScore");

-- CreateIndex
CREATE INDEX "customer_lifecycle_churnRiskScore_idx" ON "customer_lifecycle"("churnRiskScore");

-- CreateIndex
CREATE INDEX "customer_lifecycle_isAtRisk_idx" ON "customer_lifecycle"("isAtRisk");

-- CreateIndex
CREATE INDEX "customer_lifecycle_lastInteractionDate_idx" ON "customer_lifecycle"("lastInteractionDate");

-- CreateIndex
CREATE INDEX "customer_lifecycle_tenantId_idx" ON "customer_lifecycle"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_serviceRequestId_key" ON "opportunities"("serviceRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "opportunities_bookingId_key" ON "opportunities"("bookingId");

-- CreateIndex
CREATE INDEX "opportunities_stage_idx" ON "opportunities"("stage");

-- CreateIndex
CREATE INDEX "opportunities_expectedCloseDate_idx" ON "opportunities"("expectedCloseDate");

-- CreateIndex
CREATE INDEX "opportunities_australianServiceType_idx" ON "opportunities"("australianServiceType");

-- CreateIndex
CREATE INDEX "opportunities_serviceState_idx" ON "opportunities"("serviceState");

-- CreateIndex
CREATE INDEX "opportunities_assignedContractorId_idx" ON "opportunities"("assignedContractorId");

-- CreateIndex
CREATE INDEX "opportunities_tenantId_idx" ON "opportunities"("tenantId");

-- CreateIndex
CREATE INDEX "activities_customerLifecycleId_idx" ON "activities"("customerLifecycleId");

-- CreateIndex
CREATE INDEX "activities_opportunityId_idx" ON "activities"("opportunityId");

-- CreateIndex
CREATE INDEX "activities_type_idx" ON "activities"("type");

-- CreateIndex
CREATE INDEX "activities_activityDate_idx" ON "activities"("activityDate");

-- CreateIndex
CREATE INDEX "activities_performedById_idx" ON "activities"("performedById");

-- CreateIndex
CREATE INDEX "activities_requiresFollowUp_idx" ON "activities"("requiresFollowUp");

-- CreateIndex
CREATE INDEX "activities_tenantId_idx" ON "activities"("tenantId");

-- CreateIndex
CREATE INDEX "tasks_assignedToId_idx" ON "tasks"("assignedToId");

-- CreateIndex
CREATE INDEX "tasks_status_idx" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "tasks_priority_idx" ON "tasks"("priority");

-- CreateIndex
CREATE INDEX "tasks_dueDate_idx" ON "tasks"("dueDate");

-- CreateIndex
CREATE INDEX "tasks_isOverdue_idx" ON "tasks"("isOverdue");

-- CreateIndex
CREATE INDEX "tasks_tenantId_idx" ON "tasks"("tenantId");

-- CreateIndex
CREATE INDEX "business_rules_ruleType_idx" ON "business_rules"("ruleType");

-- CreateIndex
CREATE INDEX "business_rules_isActive_idx" ON "business_rules"("isActive");

-- CreateIndex
CREATE INDEX "business_rule_violations_businessRuleId_idx" ON "business_rule_violations"("businessRuleId");

-- CreateIndex
CREATE INDEX "business_rule_violations_isResolved_idx" ON "business_rule_violations"("isResolved");

-- CreateIndex
CREATE INDEX "business_rule_violations_severity_idx" ON "business_rule_violations"("severity");

-- CreateIndex
CREATE UNIQUE INDEX "inspection_reports_reportNumber_key" ON "inspection_reports"("reportNumber");

-- CreateIndex
CREATE INDEX "inspection_reports_bookingId_idx" ON "inspection_reports"("bookingId");

-- CreateIndex
CREATE INDEX "inspection_reports_status_idx" ON "inspection_reports"("status");

-- CreateIndex
CREATE INDEX "inspection_reports_jurisdiction_idx" ON "inspection_reports"("jurisdiction");

-- CreateIndex
CREATE INDEX "inspection_reports_reportNumber_idx" ON "inspection_reports"("reportNumber");

-- CreateIndex
CREATE INDEX "inspection_reports_inspectorId_idx" ON "inspection_reports"("inspectorId");

-- CreateIndex
CREATE INDEX "inspection_reports_tenantId_idx" ON "inspection_reports"("tenantId");

-- CreateIndex
CREATE INDEX "damage_areas_reportId_idx" ON "damage_areas"("reportId");

-- CreateIndex
CREATE INDEX "damage_areas_tenantId_idx" ON "damage_areas"("tenantId");

-- CreateIndex
CREATE INDEX "moisture_readings_reportId_idx" ON "moisture_readings"("reportId");

-- CreateIndex
CREATE INDEX "moisture_readings_readingDate_idx" ON "moisture_readings"("readingDate");

-- CreateIndex
CREATE INDEX "moisture_readings_tenantId_idx" ON "moisture_readings"("tenantId");

-- CreateIndex
CREATE INDEX "inspection_photos_reportId_idx" ON "inspection_photos"("reportId");

-- CreateIndex
CREATE INDEX "inspection_photos_damageAreaId_idx" ON "inspection_photos"("damageAreaId");

-- CreateIndex
CREATE INDEX "inspection_photos_photoType_idx" ON "inspection_photos"("photoType");

-- CreateIndex
CREATE INDEX "inspection_photos_tenantId_idx" ON "inspection_photos"("tenantId");

-- CreateIndex
CREATE INDEX "inspection_photos_aiEnhanced_idx" ON "inspection_photos"("aiEnhanced");

-- CreateIndex
CREATE UNIQUE INDEX "cost_estimates_reportId_key" ON "cost_estimates"("reportId");

-- CreateIndex
CREATE INDEX "cost_estimates_reportId_idx" ON "cost_estimates"("reportId");

-- CreateIndex
CREATE INDEX "cost_estimates_tenantId_idx" ON "cost_estimates"("tenantId");

-- CreateIndex
CREATE INDEX "labor_line_items_costEstimateId_idx" ON "labor_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "labor_line_items_tenantId_idx" ON "labor_line_items"("tenantId");

-- CreateIndex
CREATE INDEX "material_line_items_costEstimateId_idx" ON "material_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "material_line_items_tenantId_idx" ON "material_line_items"("tenantId");

-- CreateIndex
CREATE INDEX "equipment_line_items_costEstimateId_idx" ON "equipment_line_items"("costEstimateId");

-- CreateIndex
CREATE INDEX "equipment_line_items_tenantId_idx" ON "equipment_line_items"("tenantId");

-- CreateIndex
CREATE INDEX "compliance_checks_reportId_idx" ON "compliance_checks"("reportId");

-- CreateIndex
CREATE INDEX "compliance_checks_status_idx" ON "compliance_checks"("status");

-- CreateIndex
CREATE INDEX "compliance_checks_tenantId_idx" ON "compliance_checks"("tenantId");

-- CreateIndex
CREATE INDEX "report_revisions_reportId_idx" ON "report_revisions"("reportId");

-- CreateIndex
CREATE INDEX "report_revisions_version_idx" ON "report_revisions"("version");

-- CreateIndex
CREATE INDEX "report_revisions_tenantId_idx" ON "report_revisions"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "realtime_subscriptions_contractorId_key" ON "realtime_subscriptions"("contractorId");

-- CreateIndex
CREATE INDEX "realtime_subscriptions_status_idx" ON "realtime_subscriptions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "notification_preferences_contractorId_key" ON "notification_preferences"("contractorId");

-- CreateIndex
CREATE INDEX "connection_logs_userId_idx" ON "connection_logs"("userId");

-- CreateIndex
CREATE INDEX "connection_logs_connectedAt_idx" ON "connection_logs"("connectedAt");

-- CreateIndex
CREATE INDEX "connection_logs_userType_idx" ON "connection_logs"("userType");

-- CreateIndex
CREATE INDEX "contractor_location_history_jobId_timestamp_idx" ON "contractor_location_history"("jobId", "timestamp");

-- CreateIndex
CREATE INDEX "contractor_location_history_contractorId_timestamp_idx" ON "contractor_location_history"("contractorId", "timestamp");

-- CreateIndex
CREATE INDEX "job_messages_jobId_createdAt_idx" ON "job_messages"("jobId", "createdAt");

-- CreateIndex
CREATE INDEX "job_messages_receiverId_isRead_idx" ON "job_messages"("receiverId", "isRead");

-- CreateIndex
CREATE INDEX "beta_programs_isActive_idx" ON "beta_programs"("isActive");

-- CreateIndex
CREATE INDEX "beta_programs_featureArea_idx" ON "beta_programs"("featureArea");

-- CreateIndex
CREATE INDEX "beta_programs_tenantId_idx" ON "beta_programs"("tenantId");

-- CreateIndex
CREATE INDEX "beta_enrollments_status_idx" ON "beta_enrollments"("status");

-- CreateIndex
CREATE INDEX "beta_enrollments_contractorId_idx" ON "beta_enrollments"("contractorId");

-- CreateIndex
CREATE INDEX "beta_enrollments_tenantId_idx" ON "beta_enrollments"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "beta_enrollments_programId_contractorId_key" ON "beta_enrollments"("programId", "contractorId");

-- CreateIndex
CREATE INDEX "beta_feedback_programId_idx" ON "beta_feedback"("programId");

-- CreateIndex
CREATE INDEX "beta_feedback_contractorId_idx" ON "beta_feedback"("contractorId");

-- CreateIndex
CREATE INDEX "beta_feedback_category_idx" ON "beta_feedback"("category");

-- CreateIndex
CREATE INDEX "beta_feedback_status_idx" ON "beta_feedback"("status");

-- CreateIndex
CREATE INDEX "beta_feedback_tenantId_idx" ON "beta_feedback"("tenantId");

-- CreateIndex
CREATE INDEX "beta_nps_surveys_programId_idx" ON "beta_nps_surveys"("programId");

-- CreateIndex
CREATE INDEX "beta_nps_surveys_contractorId_idx" ON "beta_nps_surveys"("contractorId");

-- CreateIndex
CREATE INDEX "beta_nps_surveys_score_idx" ON "beta_nps_surveys"("score");

-- CreateIndex
CREATE INDEX "beta_nps_surveys_tenantId_idx" ON "beta_nps_surveys"("tenantId");

-- CreateIndex
CREATE INDEX "public_claims_status_idx" ON "public_claims"("status");

-- CreateIndex
CREATE INDEX "public_claims_postcode_idx" ON "public_claims"("postcode");

-- CreateIndex
CREATE INDEX "public_claims_disasterType_idx" ON "public_claims"("disasterType");

-- CreateIndex
CREATE INDEX "public_claims_isEmergency_idx" ON "public_claims"("isEmergency");

-- CreateIndex
CREATE INDEX "public_claims_createdAt_idx" ON "public_claims"("createdAt");

-- CreateIndex
CREATE INDEX "public_claims_tenantId_idx" ON "public_claims"("tenantId");

-- CreateIndex
CREATE UNIQUE INDEX "triage_assessments_triageSessionId_key" ON "triage_assessments"("triageSessionId");

-- CreateIndex
CREATE INDEX "triage_assessments_urgencyLevel_idx" ON "triage_assessments"("urgencyLevel");

-- CreateIndex
CREATE INDEX "triage_assessments_postcode_idx" ON "triage_assessments"("postcode");

-- CreateIndex
CREATE INDEX "triage_assessments_triageSessionId_idx" ON "triage_assessments"("triageSessionId");

-- CreateIndex
CREATE INDEX "triage_assessments_createdAt_idx" ON "triage_assessments"("createdAt");

-- CreateIndex
CREATE INDEX "triage_assessments_tenantId_idx" ON "triage_assessments"("tenantId");

-- CreateIndex
CREATE INDEX "ContractorDocument_contractorId_documentType_idx" ON "ContractorDocument"("contractorId", "documentType");

-- CreateIndex
CREATE INDEX "ContractorDocument_status_idx" ON "ContractorDocument"("status");

-- CreateIndex
CREATE INDEX "ContractorDocument_expiryDate_idx" ON "ContractorDocument"("expiryDate");

-- CreateIndex
CREATE INDEX "ContractorDocument_documentType_status_idx" ON "ContractorDocument"("documentType", "status");

-- CreateIndex
CREATE INDEX "ContractorVerificationHistory_contractorId_createdAt_idx" ON "ContractorVerificationHistory"("contractorId", "createdAt");

-- CreateIndex
CREATE INDEX "ContractorVerificationHistory_action_idx" ON "ContractorVerificationHistory"("action");

-- CreateIndex
CREATE INDEX "ContractorVerificationHistory_createdAt_idx" ON "ContractorVerificationHistory"("createdAt");

-- CreateIndex
CREATE INDEX "ai_image_enhancement_logs_photoId_idx" ON "ai_image_enhancement_logs"("photoId");

-- CreateIndex
CREATE INDEX "ai_image_enhancement_logs_reportId_idx" ON "ai_image_enhancement_logs"("reportId");

-- CreateIndex
CREATE INDEX "ai_image_enhancement_logs_createdAt_idx" ON "ai_image_enhancement_logs"("createdAt");

-- CreateIndex
CREATE INDEX "ai_image_enhancement_logs_tenantId_idx" ON "ai_image_enhancement_logs"("tenantId");

-- CreateIndex
CREATE INDEX "ai_batch_processing_jobs_status_idx" ON "ai_batch_processing_jobs"("status");

-- CreateIndex
CREATE INDEX "ai_batch_processing_jobs_jobType_idx" ON "ai_batch_processing_jobs"("jobType");

-- CreateIndex
CREATE INDEX "ai_batch_processing_jobs_createdAt_idx" ON "ai_batch_processing_jobs"("createdAt");

-- CreateIndex
CREATE INDEX "ai_batch_processing_jobs_tenantId_idx" ON "ai_batch_processing_jobs"("tenantId");

-- CreateIndex
CREATE INDEX "background_jobs_status_scheduledFor_idx" ON "background_jobs"("status", "scheduledFor");

-- CreateIndex
CREATE INDEX "background_jobs_jobType_status_idx" ON "background_jobs"("jobType", "status");

-- CreateIndex
CREATE INDEX "background_jobs_claimId_idx" ON "background_jobs"("claimId");

-- CreateIndex
CREATE INDEX "background_jobs_priority_scheduledFor_idx" ON "background_jobs"("priority", "scheduledFor");

-- CreateIndex
CREATE INDEX "background_jobs_tenantId_idx" ON "background_jobs"("tenantId");

-- CreateIndex
CREATE INDEX "background_jobs_createdAt_idx" ON "background_jobs"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_submissions_email_key" ON "waitlist_submissions"("email");

-- CreateIndex
CREATE INDEX "waitlist_submissions_email_idx" ON "waitlist_submissions"("email");

-- CreateIndex
CREATE INDEX "waitlist_submissions_userType_idx" ON "waitlist_submissions"("userType");

-- CreateIndex
CREATE INDEX "waitlist_submissions_createdAt_idx" ON "waitlist_submissions"("createdAt");

-- CreateIndex
CREATE INDEX "waitlist_submissions_source_idx" ON "waitlist_submissions"("source");

-- CreateIndex
CREATE INDEX "waitlist_submissions_utmSource_idx" ON "waitlist_submissions"("utmSource");

-- CreateIndex
CREATE INDEX "waitlist_submissions_utmCampaign_idx" ON "waitlist_submissions"("utmCampaign");

-- CreateIndex
CREATE UNIQUE INDEX "xero_tokens_tenantId_key" ON "xero_tokens"("tenantId");

-- CreateIndex
CREATE INDEX "contractor_applications_email_idx" ON "contractor_applications"("email");

-- CreateIndex
CREATE INDEX "contractor_applications_status_idx" ON "contractor_applications"("status");

-- CreateIndex
CREATE INDEX "contractor_applications_createdAt_idx" ON "contractor_applications"("createdAt");

-- CreateIndex
CREATE INDEX "contractor_applications_source_idx" ON "contractor_applications"("source");

-- CreateIndex
CREATE INDEX "contractor_applications_utmCampaign_idx" ON "contractor_applications"("utmCampaign");

-- CreateIndex
CREATE INDEX "contractor_applications_abn_idx" ON "contractor_applications"("abn");

-- CreateIndex
CREATE INDEX "lead_captures_email_idx" ON "lead_captures"("email");

-- CreateIndex
CREATE INDEX "lead_captures_status_idx" ON "lead_captures"("status");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_email_key" ON "newsletter_subscriptions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "newsletter_subscriptions_confirmationToken_key" ON "newsletter_subscriptions"("confirmationToken");

-- CreateIndex
CREATE INDEX "contractor_inquiries_status_idx" ON "contractor_inquiries"("status");

-- CreateIndex
CREATE INDEX "contractor_inquiries_contactEmail_idx" ON "contractor_inquiries"("contactEmail");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_jobNumber_key" ON "jobs"("jobNumber");

-- CreateIndex
CREATE INDEX "jobs_status_idx" ON "jobs"("status");

-- CreateIndex
CREATE INDEX "jobs_contractorId_idx" ON "jobs"("contractorId");

-- CreateIndex
CREATE INDEX "jobs_propertyId_idx" ON "jobs"("propertyId");

-- CreateIndex
CREATE INDEX "jobs_tenantId_idx" ON "jobs"("tenantId");

-- CreateIndex
CREATE INDEX "job_documents_jobId_idx" ON "job_documents"("jobId");

-- CreateIndex
CREATE INDEX "job_photos_jobId_idx" ON "job_photos"("jobId");

-- CreateIndex
CREATE INDEX "job_outcome_logs_jobId_idx" ON "job_outcome_logs"("jobId");

-- CreateIndex
CREATE INDEX "job_outcome_logs_outcome_idx" ON "job_outcome_logs"("outcome");

-- CreateIndex
CREATE INDEX "job_outcome_logs_jobType_idx" ON "job_outcome_logs"("jobType");

-- CreateIndex
CREATE INDEX "job_outcome_logs_loggedAt_idx" ON "job_outcome_logs"("loggedAt");

-- CreateIndex
CREATE INDEX "job_outcome_logs_tenantId_idx" ON "job_outcome_logs"("tenantId");

-- CreateIndex
CREATE INDEX "job_outcome_logs_contractorId_idx" ON "job_outcome_logs"("contractorId");

-- CreateIndex
CREATE INDEX "job_outcome_logs_state_jobType_loggedAt_idx" ON "job_outcome_logs"("state", "jobType", "loggedAt");

-- CreateIndex
CREATE INDEX "notification_logs_jobId_idx" ON "notification_logs"("jobId");

-- CreateIndex
CREATE INDEX "notification_logs_recipientId_idx" ON "notification_logs"("recipientId");

-- CreateIndex
CREATE INDEX "notification_logs_channel_idx" ON "notification_logs"("channel");

-- CreateIndex
CREATE INDEX "notification_logs_sentAt_idx" ON "notification_logs"("sentAt");

-- CreateIndex
CREATE INDEX "contact_enquiries_status_idx" ON "contact_enquiries"("status");

-- CreateIndex
CREATE INDEX "contact_enquiries_submittedAt_idx" ON "contact_enquiries"("submittedAt");

-- CreateIndex
CREATE INDEX "contact_enquiries_piiPurgedAt_idx" ON "contact_enquiries"("piiPurgedAt");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityId_idx" ON "AuditLog"("entityId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_idx" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "AuditLog_performedBy_idx" ON "AuditLog"("performedBy");

-- CreateIndex
CREATE INDEX "AuditLog_tenantId_idx" ON "AuditLog"("tenantId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_workspaceId_idx" ON "AuditLog"("workspaceId");

-- CreateIndex
CREATE UNIQUE INDEX "BotConversation_sessionId_key" ON "BotConversation"("sessionId");

-- CreateIndex
CREATE INDEX "BotConversation_status_userType_idx" ON "BotConversation"("status", "userType");

-- CreateIndex
CREATE INDEX "CallTranscript_retentionExpiresAt_idx" ON "CallTranscript"("retentionExpiresAt");

-- CreateIndex
CREATE INDEX "CallTranscript_voiceCallId_idx" ON "CallTranscript"("voiceCallId");

-- CreateIndex
CREATE INDEX "ClaimNotification_claimId_createdAt_idx" ON "ClaimNotification"("claimId", "createdAt");

-- CreateIndex
CREATE INDEX "ClaimNotification_claimId_read_idx" ON "ClaimNotification"("claimId", "read");

-- CreateIndex
CREATE INDEX "ClaimPhotoAttachment_claimId_idx" ON "ClaimPhotoAttachment"("claimId");

-- CreateIndex
CREATE INDEX "ClaimPhotoAttachment_createdAt_idx" ON "ClaimPhotoAttachment"("createdAt");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_category_idx" ON "CompetencyTestResult"("category");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_contractorId_idx" ON "CompetencyTestResult"("contractorId");

-- CreateIndex
CREATE INDEX "CompetencyTestResult_passed_idx" ON "CompetencyTestResult"("passed");

-- CreateIndex
CREATE INDEX "ContractorAuditLog_action_createdAt_idx" ON "ContractorAuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "ContractorAuditLog_category_createdAt_idx" ON "ContractorAuditLog"("category", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorCompany_contractorId_key" ON "ContractorCompany"("contractorId");

-- CreateIndex
CREATE INDEX "ContractorInsurance_contractorId_idx" ON "ContractorInsurance"("contractorId");

-- CreateIndex
CREATE INDEX "ContractorInsurance_expiryDate_idx" ON "ContractorInsurance"("expiryDate");

-- CreateIndex
CREATE INDEX "ContractorKPI_periodType_periodStart_idx" ON "ContractorKPI"("periodType", "periodStart");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorKPI_contractorId_periodType_periodStart_key" ON "ContractorKPI"("contractorId", "periodType", "periodStart");

-- CreateIndex
CREATE INDEX "ContractorNotification_type_read_priority_idx" ON "ContractorNotification"("type", "read", "priority");

-- CreateIndex
CREATE INDEX "ContractorPayment_status_dueDate_idx" ON "ContractorPayment"("status", "dueDate");

-- CreateIndex
CREATE INDEX "ContractorPayment_subscriptionId_idx" ON "ContractorPayment"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "ContractorSubscription_contractorId_key" ON "ContractorSubscription"("contractorId");

-- CreateIndex
CREATE INDEX "ContractorTerritory_type_active_idx" ON "ContractorTerritory"("type", "active");

-- CreateIndex
CREATE INDEX "ErrorLog_createdAt_idx" ON "ErrorLog"("createdAt");

-- CreateIndex
CREATE INDEX "ErrorLog_level_idx" ON "ErrorLog"("level");

-- CreateIndex
CREATE INDEX "ErrorLog_userId_idx" ON "ErrorLog"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceReferral_equippedReferralId_key" ON "FinanceReferral"("equippedReferralId");

-- CreateIndex
CREATE INDEX "FinanceReferral_country_customerType_idx" ON "FinanceReferral"("country", "customerType");

-- CreateIndex
CREATE INDEX "FinanceReferral_createdAt_idx" ON "FinanceReferral"("createdAt");

-- CreateIndex
CREATE INDEX "FinanceReferral_receiver_createdAt_idx" ON "FinanceReferral"("receiver", "createdAt");

-- CreateIndex
CREATE INDEX "FinanceReferral_stage_updatedAt_idx" ON "FinanceReferral"("stage", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinanceReferralEvent_eventKey_key" ON "FinanceReferralEvent"("eventKey");

-- CreateIndex
CREATE INDEX "FinanceReferralEvent_receivedAt_idx" ON "FinanceReferralEvent"("receivedAt");

-- CreateIndex
CREATE INDEX "FinanceReferralEvent_referralId_receivedAt_idx" ON "FinanceReferralEvent"("referralId", "receivedAt");

-- CreateIndex
CREATE INDEX "JobOffer_contractorId_status_idx" ON "JobOffer"("contractorId", "status");

-- CreateIndex
CREATE INDEX "JobOffer_expiresAt_idx" ON "JobOffer"("expiresAt");

-- CreateIndex
CREATE INDEX "JobOffer_jobId_status_idx" ON "JobOffer"("jobId", "status");

-- CreateIndex
CREATE INDEX "OnboardingPayment_contractorId_idx" ON "OnboardingPayment"("contractorId");

-- CreateIndex
CREATE INDEX "OnboardingPayment_status_idx" ON "OnboardingPayment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Partner_email_key" ON "Partner"("email");

-- CreateIndex
CREATE INDEX "ProofOfWork_contractorId_idx" ON "ProofOfWork"("contractorId");

-- CreateIndex
CREATE INDEX "ProofOfWork_verificationStatus_idx" ON "ProofOfWork"("verificationStatus");

-- CreateIndex
CREATE INDEX "ProofOfWork_workType_idx" ON "ProofOfWork"("workType");

-- CreateIndex
CREATE INDEX "PushToken_claimId_idx" ON "PushToken"("claimId");

-- CreateIndex
CREATE UNIQUE INDEX "RedditContentPillar_code_key" ON "RedditContentPillar"("code");

-- CreateIndex
CREATE UNIQUE INDEX "RedditSystemPrompt_version_key" ON "RedditSystemPrompt"("version");

-- CreateIndex
CREATE UNIQUE INDEX "SubContractor_abn_key" ON "SubContractor"("abn");

-- CreateIndex
CREATE INDEX "SubContractor_registeredByContractorId_idx" ON "SubContractor"("registeredByContractorId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_jobId_idx" ON "SubContractorEngagement"("jobId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_primaryContractorId_idx" ON "SubContractorEngagement"("primaryContractorId");

-- CreateIndex
CREATE INDEX "SubContractorEngagement_subContractorId_idx" ON "SubContractorEngagement"("subContractorId");

-- CreateIndex
CREATE UNIQUE INDEX "VoiceCall_conversationId_key" ON "VoiceCall"("conversationId");

-- CreateIndex
CREATE INDEX "VoiceCall_agentId_startedAt_idx" ON "VoiceCall"("agentId", "startedAt");

-- CreateIndex
CREATE INDEX "VoiceCall_conversationId_idx" ON "VoiceCall"("conversationId");

-- CreateIndex
CREATE INDEX "VoiceCall_correlationClaimId_idx" ON "VoiceCall"("correlationClaimId");

-- CreateIndex
CREATE UNIQUE INDEX "WebhookDelivery_eventId_key" ON "WebhookDelivery"("eventId");

-- CreateIndex
CREATE INDEX "WebhookDelivery_eventType_processedAt_idx" ON "WebhookDelivery"("eventType", "processedAt");

-- CreateIndex
CREATE INDEX "WebhookDelivery_provider_processedAt_idx" ON "WebhookDelivery"("provider", "processedAt");

-- CreateIndex
CREATE INDEX "contractor_training_modules_contractorId_idx" ON "contractor_training_modules"("contractorId");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_training_modules_contractorId_moduleName_key" ON "contractor_training_modules"("contractorId", "moduleName");

-- CreateIndex
CREATE UNIQUE INDEX "contractor_training_progress_contractorId_key" ON "contractor_training_progress"("contractorId");

-- CreateIndex
CREATE INDEX "contractor_training_progress_contractorId_idx" ON "contractor_training_progress"("contractorId");

-- CreateIndex
CREATE INDEX "field_service_jobs_contractorId_status_idx" ON "field_service_jobs"("contractorId", "status");

-- CreateIndex
CREATE INDEX "field_service_jobs_status_urgency_idx" ON "field_service_jobs"("status", "urgency");

-- CreateIndex
CREATE INDEX "field_service_jobs_suburb_state_idx" ON "field_service_jobs"("suburb", "state");

-- AddForeignKey
ALTER TABLE "tenant_configurations" ADD CONSTRAINT "tenant_configurations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginAttempt" ADD CONSTRAINT "LoginAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationToken" ADD CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contractor" ADD CONSTRAINT "Contractor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IICRCCertification" ADD CONSTRAINT "IICRCCertification_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorServiceArea" ADD CONSTRAINT "ContractorServiceArea_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_services" ADD CONSTRAINT "admin_services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "admin_service_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_callout_payments" ADD CONSTRAINT "service_request_callout_payments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_callout_payments" ADD CONSTRAINT "service_request_callout_payments_contractorProfileId_fkey" FOREIGN KEY ("contractorProfileId") REFERENCES "contractor_profiles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_request_callout_payments" ADD CONSTRAINT "service_request_callout_payments_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_profiles" ADD CONSTRAINT "contractor_profiles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_profiles" ADD CONSTRAINT "contractor_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "public_claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_matches" ADD CONSTRAINT "contractor_matches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_preferences" ADD CONSTRAINT "contractor_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_profiles" ADD CONSTRAINT "client_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_properties" ADD CONSTRAINT "client_properties_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_properties" ADD CONSTRAINT "client_properties_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_insurance" ADD CONSTRAINT "client_insurance_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_insurance" ADD CONSTRAINT "client_insurance_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_payments" ADD CONSTRAINT "client_payments_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_payments" ADD CONSTRAINT "client_payments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_emergency_contacts" ADD CONSTRAINT "client_emergency_contacts_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "client_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_onboarding" ADD CONSTRAINT "client_onboarding_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client_profiles"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_onboarding" ADD CONSTRAINT "client_onboarding_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_module_progress" ADD CONSTRAINT "client_module_progress_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "client_onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_invitedBy_fkey" FOREIGN KEY ("invitedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_members" ADD CONSTRAINT "workspace_members_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_rotation" ADD CONSTRAINT "contractor_rotation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_audit_logs" ADD CONSTRAINT "workspace_audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workspace_audit_logs" ADD CONSTRAINT "workspace_audit_logs_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceAU" ADD CONSTRAINT "InvoiceAU_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceProvider" ADD CONSTRAINT "InsuranceProvider_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_insuranceProviderId_fkey" FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsuranceClaimAU" ADD CONSTRAINT "InsuranceClaimAU_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_onboarding" ADD CONSTRAINT "contractor_onboarding_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_module_progress" ADD CONSTRAINT "contractor_module_progress_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "contractor_onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_module_progress" ADD CONSTRAINT "contractor_module_progress_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_assessments" ADD CONSTRAINT "contractor_assessments_onboardingId_fkey" FOREIGN KEY ("onboardingId") REFERENCES "contractor_onboarding"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_assessments" ADD CONSTRAINT "contractor_assessments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contractor_certifications" ADD CONSTRAINT "contractor_certifications_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor_analyses" ADD CONSTRAINT "competitor_analyses_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competitor_keywords" ADD CONSTRAINT "competitor_keywords_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "backlinks" ADD CONSTRAINT "backlinks_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "swot_analyses" ADD CONSTRAINT "swot_analyses_competitorId_fkey" FOREIGN KEY ("competitorId") REFERENCES "competitors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_faqs" ADD CONSTRAINT "blog_faqs_blogPostId_fkey" FOREIGN KEY ("blogPostId") REFERENCES "blog_posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_lifecycle" ADD CONSTRAINT "customer_lifecycle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_assignedContractorId_fkey" FOREIGN KEY ("assignedContractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_serviceRequestId_fkey" FOREIGN KEY ("serviceRequestId") REFERENCES "service_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opportunities" ADD CONSTRAINT "opportunities_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "InsuranceClaimAU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_performedById_fkey" FOREIGN KEY ("performedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_customerLifecycleId_fkey" FOREIGN KEY ("customerLifecycleId") REFERENCES "customer_lifecycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_rules" ADD CONSTRAINT "business_rules_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_rule_violations" ADD CONSTRAINT "business_rule_violations_businessRuleId_fkey" FOREIGN KEY ("businessRuleId") REFERENCES "business_rules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_finalApproverId_fkey" FOREIGN KEY ("finalApproverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_insuranceClaimId_fkey" FOREIGN KEY ("insuranceClaimId") REFERENCES "InsuranceClaimAU"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_managerReviewerId_fkey" FOREIGN KEY ("managerReviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_technicalReviewerId_fkey" FOREIGN KEY ("technicalReviewerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_reports" ADD CONSTRAINT "inspection_reports_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "damage_areas" ADD CONSTRAINT "damage_areas_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "damage_areas" ADD CONSTRAINT "damage_areas_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "moisture_readings" ADD CONSTRAINT "moisture_readings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_damageAreaId_fkey" FOREIGN KEY ("damageAreaId") REFERENCES "damage_areas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inspection_photos" ADD CONSTRAINT "inspection_photos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_estimates" ADD CONSTRAINT "cost_estimates_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cost_estimates" ADD CONSTRAINT "cost_estimates_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labor_line_items" ADD CONSTRAINT "labor_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "labor_line_items" ADD CONSTRAINT "labor_line_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_line_items" ADD CONSTRAINT "material_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_line_items" ADD CONSTRAINT "material_line_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_line_items" ADD CONSTRAINT "equipment_line_items_costEstimateId_fkey" FOREIGN KEY ("costEstimateId") REFERENCES "cost_estimates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_line_items" ADD CONSTRAINT "equipment_line_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_checks" ADD CONSTRAINT "compliance_checks_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_checks" ADD CONSTRAINT "compliance_checks_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_revisions" ADD CONSTRAINT "report_revisions_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_revisions" ADD CONSTRAINT "report_revisions_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_revisions" ADD CONSTRAINT "report_revisions_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "realtime_subscriptions" ADD CONSTRAINT "realtime_subscriptions_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_preferences" ADD CONSTRAINT "notification_preferences_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connection_logs" ADD CONSTRAINT "connection_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_programs" ADD CONSTRAINT "beta_programs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_enrollments" ADD CONSTRAINT "beta_enrollments_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_enrollments" ADD CONSTRAINT "beta_enrollments_programId_fkey" FOREIGN KEY ("programId") REFERENCES "beta_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_enrollments" ADD CONSTRAINT "beta_enrollments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_feedback" ADD CONSTRAINT "beta_feedback_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_feedback" ADD CONSTRAINT "beta_feedback_programId_fkey" FOREIGN KEY ("programId") REFERENCES "beta_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_feedback" ADD CONSTRAINT "beta_feedback_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_nps_surveys" ADD CONSTRAINT "beta_nps_surveys_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_nps_surveys" ADD CONSTRAINT "beta_nps_surveys_programId_fkey" FOREIGN KEY ("programId") REFERENCES "beta_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beta_nps_surveys" ADD CONSTRAINT "beta_nps_surveys_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public_claims" ADD CONSTRAINT "public_claims_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "triage_assessments" ADD CONSTRAINT "triage_assessments_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorDocument" ADD CONSTRAINT "ContractorDocument_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorVerificationHistory" ADD CONSTRAINT "ContractorVerificationHistory_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_image_enhancement_logs" ADD CONSTRAINT "ai_image_enhancement_logs_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "inspection_photos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_image_enhancement_logs" ADD CONSTRAINT "ai_image_enhancement_logs_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "inspection_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_image_enhancement_logs" ADD CONSTRAINT "ai_image_enhancement_logs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_batch_processing_jobs" ADD CONSTRAINT "ai_batch_processing_jobs_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_batch_processing_jobs" ADD CONSTRAINT "ai_batch_processing_jobs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "background_jobs" ADD CONSTRAINT "background_jobs_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "public_claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "background_jobs" ADD CONSTRAINT "background_jobs_initiatedBy_fkey" FOREIGN KEY ("initiatedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "background_jobs" ADD CONSTRAINT "background_jobs_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_documents" ADD CONSTRAINT "job_documents_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_photos" ADD CONSTRAINT "job_photos_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_outcome_logs" ADD CONSTRAINT "job_outcome_logs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BotConversation" ADD CONSTRAINT "BotConversation_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "field_service_jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallTranscript" ADD CONSTRAINT "CallTranscript_voiceCallId_fkey" FOREIGN KEY ("voiceCallId") REFERENCES "VoiceCall"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetencyTestResult" ADD CONSTRAINT "CompetencyTestResult_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorAuditLog" ADD CONSTRAINT "ContractorAuditLog_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorCompany" ADD CONSTRAINT "ContractorCompany_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorInsurance" ADD CONSTRAINT "ContractorInsurance_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorKPI" ADD CONSTRAINT "ContractorKPI_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorNotification" ADD CONSTRAINT "ContractorNotification_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorPayment" ADD CONSTRAINT "ContractorPayment_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "ContractorSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorSubscription" ADD CONSTRAINT "ContractorSubscription_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractorTerritory" ADD CONSTRAINT "ContractorTerritory_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "contractor_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinanceReferralEvent" ADD CONSTRAINT "FinanceReferralEvent_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "FinanceReferral"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobOffer" ADD CONSTRAINT "JobOffer_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "field_service_jobs"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerBilling" ADD CONSTRAINT "PartnerBilling_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerBilling" ADD CONSTRAINT "PartnerBilling_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProofOfWork" ADD CONSTRAINT "ProofOfWork_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedditPerformanceLog" ADD CONSTRAINT "RedditPerformanceLog_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_contentPillarId_fkey" FOREIGN KEY ("contentPillarId") REFERENCES "RedditContentPillar"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_orchestratorRunId_fkey" FOREIGN KEY ("orchestratorRunId") REFERENCES "RedditOrchestratorRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedditSafetyAudit" ADD CONSTRAINT "RedditSafetyAudit_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContractor" ADD CONSTRAINT "SubContractor_registeredByContractorId_fkey" FOREIGN KEY ("registeredByContractorId") REFERENCES "contractor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContractorEngagement" ADD CONSTRAINT "SubContractorEngagement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "field_service_jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContractorEngagement" ADD CONSTRAINT "SubContractorEngagement_primaryContractorId_fkey" FOREIGN KEY ("primaryContractorId") REFERENCES "contractor_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubContractorEngagement" ADD CONSTRAINT "SubContractorEngagement_subContractorId_fkey" FOREIGN KEY ("subContractorId") REFERENCES "SubContractor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_service_jobs" ADD CONSTRAINT "field_service_jobs_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_notes" ADD CONSTRAINT "lead_notes_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_tracking" ADD CONSTRAINT "lead_tracking_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

