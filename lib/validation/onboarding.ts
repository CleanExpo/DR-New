import { z } from 'zod';

// Step 1: Account Creation
export const accountSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[!@#$%^&*]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
  acceptNRPGAgreement: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the NRPG membership agreement' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Step 2: Business Details
export const businessSchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  abn: z
    .string()
    .regex(/^\d{2} \d{3} \d{3} \d{3}$/, 'ABN must be in format: XX XXX XXX XXX')
    .refine((abn) => {
      // Basic ABN validation (simplified)
      const digits = abn.replace(/\s/g, '');
      return digits.length === 11;
    }, 'Invalid ABN'),
  businessPhone: z
    .string()
    .regex(/^04\d{8}$/, 'Phone must be a valid Australian mobile number (04XX XXX XXX)'),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    suburb: z.string().min(1, 'Suburb is required'),
    state: z.enum(['NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT'], {
      errorMap: () => ({ message: 'Please select a state' }),
    }),
    postcode: z.string().regex(/^\d{4}$/, 'Postcode must be 4 digits'),
  }),
  yearsInBusiness: z.number().min(0, 'Years in business must be 0 or greater'),
  employeeCount: z.enum(['1-5', '6-10', '11-20', '21-50', '50+'], {
    errorMap: () => ({ message: 'Please select employee count' }),
  }),
});

// Step 3: Service Selection
export const serviceSchema = z.object({
  services: z
    .array(z.string())
    .min(1, 'You must select at least one service'),
});

// Step 4: IICRC Qualifications
export const qualificationSchema = z.object({
  qualifications: z
    .array(
      z.object({
        type: z.enum([
          'WRT',
          'FSRT',
          'AMRT',
          'AHST',
          'OCT',
          'OSHA',
          'CMRT',
          'FSDT',
          'ASD',
          'IICRCT',
          'OTHER',
        ]),
        certificateNumber: z.string().min(1, 'Certificate number is required'),
        issueDate: z.date({
          required_error: 'Issue date is required',
        }),
        expiryDate: z.date({
          required_error: 'Expiry date is required',
        }),
        certificateUrl: z.string().url('Please upload a valid certificate'),
        serviceTypes: z.array(z.string()).min(1, 'Select at least one service type'),
      })
    )
    .min(1, 'You must provide at least one IICRC qualification'),
});

// Step 5: Insurance & Compliance
export const insuranceSchema = z.object({
  publicLiability: z.object({
    policyNumber: z.string().min(1, 'Policy number is required'),
    provider: z.string().min(1, 'Provider is required'),
    coverageAmount: z
      .number()
      .min(10000000, 'Minimum coverage of $10 million required'),
    expiryDate: z.date({
      required_error: 'Expiry date is required',
    }),
    certificateUrl: z.string().url('Please upload a valid certificate'),
  }),
  workersCompensation: z.object({
    policyNumber: z.string().min(1, 'Policy number is required'),
    provider: z.string().min(1, 'Provider is required'),
    expiryDate: z.date({
      required_error: 'Expiry date is required',
    }),
    certificateUrl: z.string().url('Please upload a valid certificate'),
  }),
  businessDocuments: z.object({
    abnCertificateUrl: z.string().url('Please upload ABN certificate'),
    businessLicenseUrl: z.string().url().optional(),
  }),
});

// Step 6: Coverage Area & Subscription
export const coverageSchema = z.object({
  baseLocation: z.object({
    address: z.string().min(1, 'Base location is required'),
    lat: z.number(),
    lng: z.number(),
  }),
  coverageRadius: z.enum(['25', '50', '100', '200'], {
    errorMap: () => ({ message: 'Please select a coverage radius' }),
  }),
  tier: z.enum(['BASIC', 'STANDARD', 'PREMIUM', 'RURAL'], {
    errorMap: () => ({ message: 'Please select a subscription tier' }),
  }),
  paymentMethodId: z.string().optional(), // Stripe payment method ID
});

// Step 7: Review & Submit (no additional validation needed)
export const reviewSchema = z.object({
  finalTermsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the final terms to submit' }),
  }),
});

// Combined onboarding data schema
export const onboardingDataSchema = z.object({
  account: accountSchema,
  business: businessSchema,
  services: serviceSchema,
  qualifications: qualificationSchema,
  insurance: insuranceSchema,
  coverage: coverageSchema,
  review: reviewSchema,
});

export type AccountData = z.infer<typeof accountSchema>;
export type BusinessData = z.infer<typeof businessSchema>;
export type ServiceData = z.infer<typeof serviceSchema>;
export type QualificationData = z.infer<typeof qualificationSchema>;
export type InsuranceData = z.infer<typeof insuranceSchema>;
export type CoverageData = z.infer<typeof coverageSchema>;
export type ReviewData = z.infer<typeof reviewSchema>;
export type OnboardingData = z.infer<typeof onboardingDataSchema>;

// Service types with IICRC requirements
export const SERVICE_TYPES = [
  {
    id: 'water-damage',
    name: 'Water Damage Restoration',
    icon: '💧',
    requiredCert: 'WRT (Water Restoration Technician)',
    avgJobValue: '$3,500 - $15,000',
  },
  {
    id: 'fire-smoke',
    name: 'Fire & Smoke Damage',
    icon: '🔥',
    requiredCert: 'FSRT (Fire & Smoke Restoration Technician)',
    avgJobValue: '$8,000 - $50,000',
  },
  {
    id: 'mould-remediation',
    name: 'Mould Remediation',
    icon: '🦠',
    requiredCert: 'AMRT (Applied Microbial Remediation Technician)',
    avgJobValue: '$2,500 - $12,000',
  },
  {
    id: 'storm-damage',
    name: 'Storm Damage',
    icon: '⛈️',
    requiredCert: 'WRT or FSRT',
    avgJobValue: '$5,000 - $30,000',
  },
  {
    id: 'biohazard',
    name: 'Biohazard Cleanup',
    icon: '☣️',
    requiredCert: 'AHST (Applied Hazardous Substances Technician)',
    avgJobValue: '$4,000 - $20,000',
  },
  {
    id: 'sewage',
    name: 'Sewage Cleanup',
    icon: '🚽',
    requiredCert: 'WRT + AHST',
    avgJobValue: '$3,000 - $10,000',
  },
  {
    id: 'contents-restoration',
    name: 'Contents Restoration',
    icon: '📦',
    requiredCert: 'OCT (Odor Control Technician)',
    avgJobValue: '$2,000 - $8,000',
  },
  {
    id: 'structural-drying',
    name: 'Structural Drying',
    icon: '🏗️',
    requiredCert: 'WRT',
    avgJobValue: '$1,500 - $6,000',
  },
] as const;

// IICRC Qualification types
export const IICRC_QUALIFICATIONS = [
  { value: 'WRT', label: 'WRT - Water Restoration Technician', services: ['water-damage', 'storm-damage', 'sewage', 'structural-drying'] },
  { value: 'FSRT', label: 'FSRT - Fire & Smoke Restoration Technician', services: ['fire-smoke', 'storm-damage'] },
  { value: 'AMRT', label: 'AMRT - Applied Microbial Remediation Technician', services: ['mould-remediation'] },
  { value: 'AHST', label: 'AHST - Applied Hazardous Substances Technician', services: ['biohazard', 'sewage'] },
  { value: 'OCT', label: 'OCT - Odor Control Technician', services: ['contents-restoration'] },
  { value: 'OSHA', label: 'OSHA - Occupational Safety & Health', services: [] },
  { value: 'CMRT', label: 'CMRT - Carpet Maintenance & Restoration Technician', services: ['contents-restoration'] },
  { value: 'FSDT', label: 'FSDT - Fire & Smoke Damage Technician', services: ['fire-smoke'] },
  { value: 'ASD', label: 'ASD - Applied Structural Drying', services: ['water-damage', 'structural-drying'] },
  { value: 'IICRCT', label: 'IICRCT - Certified Restorer', services: [] },
  { value: 'OTHER', label: 'Other IICRC Certification', services: [] },
] as const;

// Coverage tiers
export const COVERAGE_TIERS = [
  {
    id: 'BASIC',
    name: 'Basic',
    radius: 25,
    price: 99,
    estimatedJobs: '5-10 jobs/month',
    features: [
      '25km coverage radius',
      'Basic job alerts',
      'Standard response time',
      'Email support',
    ],
  },
  {
    id: 'STANDARD',
    name: 'Standard',
    radius: 50,
    price: 199,
    estimatedJobs: '15-25 jobs/month',
    features: [
      '50km coverage radius',
      'Priority job alerts',
      'Fast response time',
      'Phone & email support',
      'Featured contractor badge',
    ],
  },
  {
    id: 'PREMIUM',
    name: 'Premium',
    radius: 100,
    price: 349,
    estimatedJobs: '30-50 jobs/month',
    features: [
      '100km coverage radius',
      'Instant job alerts',
      'Fastest response time',
      '24/7 priority support',
      'Featured contractor badge',
      'Marketing materials',
    ],
  },
  {
    id: 'RURAL',
    name: 'Rural',
    radius: 200,
    price: 499,
    estimatedJobs: '10-20 jobs/month',
    features: [
      '200km coverage radius',
      'Priority rural job alerts',
      'Fast response time',
      '24/7 priority support',
      'Featured contractor badge',
      'Travel compensation priority',
    ],
  },
] as const;

// Australian states
export const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'SA', label: 'South Australia' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'NT', label: 'Northern Territory' },
  { value: 'ACT', label: 'Australian Capital Territory' },
] as const;
