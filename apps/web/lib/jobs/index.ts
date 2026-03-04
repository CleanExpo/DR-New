/**
 * Job Management Service
 *
 * Core utilities for the NRPG Job Management Module (DR-98/DR-166).
 * Handles job number generation, validation schemas, and type constants.
 */

import { z } from 'zod';
import { basePrisma } from '@/lib/prisma';

// ============================================================================
// Job Types
// ============================================================================

export const JOB_TYPES = [
  { value: 'water', label: 'Water Damage' },
  { value: 'fire', label: 'Fire Damage' },
  { value: 'mould', label: 'Mould Remediation' },
  { value: 'storm', label: 'Storm Damage' },
  { value: 'asbestos', label: 'Asbestos Removal' },
] as const;

export type JobType = (typeof JOB_TYPES)[number]['value'];

export const JOB_STATUS_CONFIG = {
  PENDING: { label: 'Pending', colour: '#FFB800', bgColour: 'rgba(255, 184, 0, 0.15)' },
  ASSIGNED: { label: 'Assigned', colour: '#00F5FF', bgColour: 'rgba(0, 245, 255, 0.15)' },
  IN_PROGRESS: { label: 'In Progress', colour: '#0d9488', bgColour: 'rgba(13, 148, 136, 0.15)' },
  COMPLETED: { label: 'Completed', colour: '#00FF88', bgColour: 'rgba(0, 255, 136, 0.15)' },
  INVOICED: { label: 'Invoiced', colour: '#a78bfa', bgColour: 'rgba(167, 139, 250, 0.15)' },
  PAID: { label: 'Paid', colour: '#34d399', bgColour: 'rgba(52, 211, 153, 0.15)' },
} as const;

export type JobStatusKey = keyof typeof JOB_STATUS_CONFIG;

// ============================================================================
// Job Number Generation
// ============================================================================

/**
 * Generate a unique job number in NRP-YYYY-XXXXX format.
 * Checks the database to ensure uniqueness.
 */
export async function generateJobNumber(): Promise<string> {
  const year = new Date().getFullYear();
  let jobNumber: string;
  let exists = true;

  // Retry until we get a unique number
  while (exists) {
    const random = Math.floor(Math.random() * 90000) + 10000;
    jobNumber = `NRP-${year}-${random}`;
    const existing = await basePrisma.job.findUnique({
      where: { jobNumber },
      select: { id: true },
    });
    exists = !!existing;
  }

  return jobNumber!;
}

// ============================================================================
// Validation Schemas
// ============================================================================

export const createJobSchema = z.object({
  type: z.enum(['water', 'fire', 'mould', 'storm', 'asbestos']),
  propertyId: z.string().min(1, 'Property is required'),
  estimatedCost: z.number().positive().optional(),
  scheduledDate: z.string().datetime().optional(),
  notes: z.string().max(2000).optional(),
  insuranceClaimId: z.string().optional(),
});

export const updateJobSchema = z.object({
  status: z.enum(['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'INVOICED', 'PAID']).optional(),
  notes: z.string().max(2000).optional(),
  estimatedCost: z.number().positive().optional(),
  actualCost: z.number().positive().optional(),
  scheduledDate: z.string().datetime().optional(),
});

export const assignContractorSchema = z.object({
  contractorId: z.string().min(1, 'Contractor ID is required'),
});

export const completeJobSchema = z.object({
  hoursWorked: z.number().positive('Hours must be positive'),
  materialsUsed: z.string().max(2000).optional(),
  actualCost: z.number().positive('Cost must be positive'),
  completedDate: z.string().datetime().optional(),
});

export const uploadDocumentSchema = z.object({
  name: z.string().min(1, 'Document name is required'),
  url: z.string().url('Valid URL is required'),
  type: z.string().min(1, 'Document type is required'),
  size: z.number().int().positive('File size must be positive'),
});
