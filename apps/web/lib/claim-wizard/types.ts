/**
 * Claim Wizard Types & Validation Schemas
 *
 * Complete type definitions for the multi-step claim reporting wizard
 * with Zod validation schemas for strict type safety and runtime validation
 *
 * Updated: 2026-02-06 - Integrated Australian disaster types and regional risk assessment
 */

import { z } from 'zod';
import {
  getAustralianDisasterTypeOptions,
  australianDisasterTypeSchema,
  AUSTRALIAN_DISASTER_TYPES,
} from '@/lib/disaster-types/australian-disasters';
import { getStateFromPostcode } from '@/src/lib/validation/australia';

// ============================================================================
// Step 1: Triage (Emergency Assessment)
// ============================================================================

// Use Australian disaster types for claim intake
export const disasterTypes = getAustralianDisasterTypeOptions();

// Enhanced triage schema with Australian disaster types
export const triageSchema = z.object({
  disasterType: australianDisasterTypeSchema,
  incidentDate: z.string().min(1, 'Please select when this happened'),
  isOngoing: z.enum(['yes', 'no'], { required_error: 'Please indicate if this is still happening' }),
  isEmergency: z.enum(['yes', 'no'], { required_error: 'Please indicate if anyone is in danger' }),

  // Optional: Regional risk questions (conditionally shown based on disaster type and location)
  inBushfireZone: z.enum(['yes', 'no', 'unsure']).optional(),
  propertyBALRating: z.enum(['BAL-LOW', 'BAL-12.5', 'BAL-19', 'BAL-29', 'BAL-40', 'BAL-FZ', 'not-sure']).optional(),
  propertyCycloneRating: z.enum(['C1', 'C2', 'C3', 'C4', 'not-sure']).optional(),
  inFloodZone: z.enum(['yes', 'no', 'unsure']).optional(),
});

export type TriageData = z.infer<typeof triageSchema>;

// ============================================================================
// Step 2: Location & Contact
// ============================================================================

export const locationContactSchema = z.object({
  propertyAddress: z.string().min(5, 'Please enter your property address'),
  suburb: z.string().min(2, 'Suburb is required'),
  postcode: z.string()
    .regex(/^\d{4}$/, 'Postcode must be 4 digits')
    .length(4, 'Postcode must be 4 digits'),
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string()
    .regex(/^(?:\+61|0)[2-8](?:[ -]?[0-9]){8}$/, 'Please enter a valid Australian phone number')
    .transform((val) => val.replace(/\s|-/g, '')), // Normalize phone format
  email: z.string().email('Please enter a valid email address'),
});

export type LocationContactData = z.infer<typeof locationContactSchema>;

// ============================================================================
// Step 3: Details & Insurance
// ============================================================================

export const detailsInsuranceSchema = z.object({
  damageDescription: z.string()
    .min(20, 'Please provide at least 20 characters describing the damage')
    .max(1000, 'Description must be less than 1000 characters'),
  hasInsurance: z.enum(['yes', 'no'], { required_error: 'Please indicate if you have insurance' }),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
  photoUrls: z.array(z.string()).optional().default([]),
}).refine(
  (data) => {
    // If has insurance, provider is required
    if (data.hasInsurance === 'yes' && !data.insuranceProvider) {
      return false;
    }
    return true;
  },
  {
    message: 'Insurance provider is required when you have insurance',
    path: ['insuranceProvider'],
  }
);

export type DetailsInsuranceData = z.infer<typeof detailsInsuranceSchema>;

// ============================================================================
// Complete Claim Data
// ============================================================================

export const completeClaimSchema = z.object({
  step1: triageSchema,
  step2: locationContactSchema,
  step3: detailsInsuranceSchema,
  captchaToken: z.string().min(1, 'CAPTCHA verification required'),
});

export type CompleteClaimData = z.infer<typeof completeClaimSchema>;

// ============================================================================
// Form State & Storage
// ============================================================================

export interface ClaimFormState {
  step1?: TriageData;
  step2?: LocationContactData;
  step3?: DetailsInsuranceData;
  currentStep: number;
  completedSteps: number[];
  startedAt: string;
  lastUpdatedAt: string;
}

export const STORAGE_KEY = 'nrpg-claim-wizard-state';
export const STORAGE_VERSION = '1.0.0';

// ============================================================================
// API Response Types
// ============================================================================

export interface ClaimSubmissionResponse {
  success: boolean;
  claimId?: string;
  message: string;
  estimatedContractorCalls?: number;
  estimatedResponseTime?: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

// ============================================================================
// Priority Calculation
// ============================================================================

export type ClaimPriority = 'critical' | 'urgent' | 'high' | 'medium';

export function calculatePriority(data: Partial<ClaimFormState>): ClaimPriority {
  // Critical: Anyone in danger
  if (data.step1?.isEmergency === 'yes') return 'critical';

  // Critical: Life-threatening disasters
  const criticalDisasters = ['bushfire', 'cyclone', 'flood'];
  if (data.step1?.disasterType && criticalDisasters.includes(data.step1.disasterType)) {
    return 'critical';
  }

  // Urgent: Ongoing damage
  if (data.step1?.isOngoing === 'yes') return 'urgent';

  // High priority: Severe disaster types
  const severeDamageTypes = ['house-fire', 'smoke-damage', 'sewage-backup', 'biohazard', 'structural-damage'];
  if (data.step1?.disasterType && severeDamageTypes.includes(data.step1.disasterType)) {
    return 'high';
  }

  // High priority: In high-risk zones
  if (data.step1?.inBushfireZone === 'yes' || data.step1?.inFloodZone === 'yes') {
    return 'high';
  }

  return 'medium';
}

/**
 * Get disaster type details for enhanced processing
 */
export function getDisasterTypeDetails(disasterType: string) {
  return AUSTRALIAN_DISASTER_TYPES[disasterType] || null;
}
