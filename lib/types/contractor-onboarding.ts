// Contractor Onboarding & Admin Verification Types

export type OnboardingStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED';
export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
export type InsuranceType = 'PUBLIC_LIABILITY' | 'PROFESSIONAL_INDEMNITY' | 'WORKERS_COMP';
export type CertificationType = 'IICRC_WRT' | 'IICRC_FSRT' | 'IICRC_AMRT' | 'IICRC_ASD' | 'IICRC_OCT' | 'CPP40421' | 'OTHER';
export type SubscriptionTier = 'TIER_25KM' | 'TIER_50KM' | 'TIER_75KM' | 'TIER_100KM' | 'RURAL';
export type RejectionReason =
  | 'INSUFFICIENT_QUALIFICATIONS'
  | 'INSURANCE_INADEQUATE'
  | 'BUSINESS_VERIFICATION_FAILED'
  | 'SERVICE_AREA_CONFLICT'
  | 'INCOMPLETE_APPLICATION'
  | 'OTHER';

export interface ContractorApplication {
  id: string;

  // Personal Details
  username: string;
  email: string;
  mobileNumber: string;

  // Status
  status: OnboardingStatus;
  onboardingStep: number;
  onboardingCompleted: boolean;

  // Approval Details
  approvedAt?: Date | null;
  rejectedAt?: Date | null;
  rejectionReason?: string | null;

  // Company Profile
  companyProfile?: ContractorCompanyProfile | null;

  // Certifications
  certifications: IICRCQualification[];

  // Insurance
  insurance: ContractorInsurancePolicy[];

  // References
  references: ContractorReferenceInfo[];

  // Subscription
  subscription?: ContractorSubscriptionInfo | null;

  // Territory
  territories: ContractorTerritoryInfo[];

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorCompanyProfile {
  id: string;
  contractorId: string;

  // Company Details
  companyName: string;
  tradingName?: string | null;
  abn: string;
  acn?: string | null;
  companyStructure: string;

  // Addresses
  registeredAddress: string;
  registeredCity: string;
  registeredState: string;
  registeredPostcode: string;

  mailingAddress?: string | null;
  mailingCity?: string | null;
  mailingState?: string | null;
  mailingPostcode?: string | null;

  // Contact
  officePhone?: string | null;
  website?: string | null;
  companyEmail?: string | null;

  // Directors (JSON string)
  directors: string;

  // Branding
  companyLogo?: string | null;

  // Verification
  abnVerified: boolean;
  abnVerifiedAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface IICRCQualification {
  id: string;
  contractorId: string;

  certificationType: string;
  certificationName: string;
  certificationNumber: string;
  issuingOrganization: string;
  issueDate: Date;
  expiryDate?: Date | null;

  // Document
  documentUrl: string;

  // Verification
  verified: boolean;
  verifiedAt?: Date | null;
  verifiedBy?: string | null;
  verificationNotes?: string | null;
  status: VerificationStatus;

  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorInsurancePolicy {
  id: string;
  contractorId: string;

  insuranceType: InsuranceType;
  insurer: string;
  policyNumber: string;
  coverageAmount: number;
  excess?: number | null;

  effectiveDate: Date;
  expiryDate: Date;

  // Certificate
  certificateUrl: string;

  // Verification
  verified: boolean;
  verifiedAt?: Date | null;
  verifiedBy?: string | null;
  status: VerificationStatus;

  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorReferenceInfo {
  id: string;
  contractorId: string;

  referenceName: string;
  companyName: string;
  position: string;
  email: string;
  phone: string;
  relationship: string;
  projectDescription?: string | null;

  // Verification
  contacted: boolean;
  contactedAt?: Date | null;
  rating?: number | null;
  feedback?: string | null;
  verified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorSubscriptionInfo {
  id: string;
  contractorId: string;

  tier: SubscriptionTier;
  status: string;
  baseRadius: number;
  additionalTerritories?: string | null;

  billingFrequency: string;
  amount: number;
  nextBillingDate?: Date | null;

  bondAmount: number;
  bondStatus: string;
  bondSecuredDate?: Date | null;

  startDate?: Date | null;
  endDate?: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface ContractorTerritoryInfo {
  id: string;
  contractorId: string;

  type: string;
  name: string;

  // Radius-based
  centerLat?: number | null;
  centerLng?: number | null;
  radiusKm?: number | null;

  // Area-based
  postcodes?: string | null;
  suburbs?: string | null;

  // Service Preferences
  emergencyResponse: boolean;
  afterHours: boolean;
  weekendService: boolean;

  // Capacity
  maxJobsPerDay: number;
  currentActiveJobs: number;

  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationListFilters {
  search?: string;
  status?: OnboardingStatus;
  serviceType?: string;
  state?: string;
  submittedFrom?: Date;
  submittedTo?: Date;
  sortBy?: 'createdAt' | 'companyName' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface ApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  approved: number;
  rejected: number;
  averageApprovalTime: number; // in days
  approvalRate: number; // percentage
}

export interface ActivityLog {
  id: string;
  contractorId: string;
  action: string;
  category: string;
  details?: string | null;
  performedBy: string;
  performedByType: string;
  createdAt: Date;
}

export interface VerificationChecklist {
  businessDetailsComplete: boolean;
  qualificationsVerified: boolean;
  insuranceVerified: boolean;
  referencesVerified: boolean;
  abnVerified: boolean;
  allDocumentsUploaded: boolean;
}

export interface ApprovalRequest {
  contractorId: string;
  approvalNotes?: string;
}

export interface RejectionRequest {
  contractorId: string;
  reason: RejectionReason;
  feedback: string;
  internalNotes?: string;
}

export interface DocumentVerification {
  documentId: string;
  verified: boolean;
  verificationNotes?: string;
}

export interface CoverageArea {
  lat: number;
  lng: number;
  radius: number;
  nearbyContractors?: NearbyContractor[];
}

export interface NearbyContractor {
  id: string;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  distance: number; // km from subject contractor
}

export interface BulkActionRequest {
  contractorIds: string[];
  action: 'approve' | 'remind' | 'export';
}

export interface OnboardingAnalytics {
  applicationsThisMonth: number;
  applicationsLastMonth: number;
  monthlyGrowth: number; // percentage

  averageApprovalTime: number; // days
  averageApprovalTimeChange: number; // percentage vs last period

  approvalRate: number; // percentage
  approvalRateChange: number; // percentage vs last period

  topRejectionReasons: {
    reason: string;
    count: number;
    percentage: number;
  }[];

  applicationsByServiceType: {
    serviceType: string;
    count: number;
  }[];

  applicationsByState: {
    state: string;
    count: number;
  }[];

  recentApprovals: ContractorApplication[];
  recentRejections: ContractorApplication[];

  applicationsOverTime: {
    date: string;
    count: number;
  }[];
}

export interface TierPricing {
  tier: SubscriptionTier;
  name: string;
  radius: number;
  monthlyFee: number;
  estimatedJobVolume: string;
  features: string[];
}

export const TIER_PRICING: TierPricing[] = [
  {
    tier: 'TIER_25KM',
    name: '25km Radius',
    radius: 25,
    monthlyFee: 499,
    estimatedJobVolume: '5-10 jobs/month',
    features: ['24/7 Emergency dispatch', 'Lead notifications', 'Basic reporting']
  },
  {
    tier: 'TIER_50KM',
    name: '50km Radius',
    radius: 50,
    monthlyFee: 799,
    estimatedJobVolume: '10-20 jobs/month',
    features: ['24/7 Emergency dispatch', 'Priority lead routing', 'Advanced reporting', 'Marketing support']
  },
  {
    tier: 'TIER_75KM',
    name: '75km Radius',
    radius: 75,
    monthlyFee: 1099,
    estimatedJobVolume: '15-30 jobs/month',
    features: ['24/7 Emergency dispatch', 'Priority lead routing', 'Advanced reporting', 'Marketing support', 'Dedicated account manager']
  },
  {
    tier: 'TIER_100KM',
    name: '100km Radius',
    radius: 100,
    monthlyFee: 1399,
    estimatedJobVolume: '20-40 jobs/month',
    features: ['24/7 Emergency dispatch', 'Exclusive territory rights', 'Premium reporting', 'Full marketing suite', 'Dedicated account manager']
  },
  {
    tier: 'RURAL',
    name: 'Rural Coverage',
    radius: 200,
    monthlyFee: 899,
    estimatedJobVolume: '5-15 jobs/month',
    features: ['24/7 Emergency dispatch', 'Wide territory coverage', 'Standard reporting', 'Marketing support']
  }
];

export const SERVICE_TYPES = [
  { value: 'WATER_DAMAGE', label: 'Water Damage Restoration' },
  { value: 'FIRE_DAMAGE', label: 'Fire & Smoke Damage' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation' },
  { value: 'STORM_DAMAGE', label: 'Storm Damage' },
  { value: 'BIOHAZARD', label: 'Biohazard Cleanup' },
  { value: 'SEWAGE', label: 'Sewage Cleanup' },
  { value: 'COMMERCIAL', label: 'Commercial Restoration' },
  { value: 'CONTENTS_RESTORATION', label: 'Contents Restoration' },
];

export const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'ACT', label: 'Australian Capital Territory' },
];

export const REJECTION_REASONS: { value: RejectionReason; label: string }[] = [
  { value: 'INSUFFICIENT_QUALIFICATIONS', label: 'Insufficient or expired qualifications' },
  { value: 'INSURANCE_INADEQUATE', label: 'Insurance coverage inadequate or expired' },
  { value: 'BUSINESS_VERIFICATION_FAILED', label: 'Business verification failed (ABN, etc.)' },
  { value: 'SERVICE_AREA_CONFLICT', label: 'Service area conflict with existing contractor' },
  { value: 'INCOMPLETE_APPLICATION', label: 'Incomplete application or missing documents' },
  { value: 'OTHER', label: 'Other (specify in feedback)' },
];
