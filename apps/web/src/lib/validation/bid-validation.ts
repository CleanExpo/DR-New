/**
 * Bid Validation Utilities
 *
 * Validates bid submission data including budget, timeline, and estimated hours.
 * Ensures bids meet business requirements and data integrity standards.
 */

import { z } from 'zod';

/**
 * Validate budget format
 * Accepts: "$5000", "5000", "5,000", "$5,000 AUD"
 *
 * @param budget - Budget string
 * @returns true if valid budget format
 */
export function isValidBudget(budget: string): boolean {
  if (!budget || typeof budget !== 'string') {
    return false;
  }

  // Remove currency symbols and commas
  const cleaned = budget.replace(/[$,AUD\s]/gi, '').trim();

  // Check if it's a valid number
  const amount = parseFloat(cleaned);

  if (isNaN(amount) || !isFinite(amount)) {
    return false;
  }

  // Budget should be positive and within reasonable range
  // Minimum: $100 (administrative minimum)
  // Maximum: $1,000,000 (prevent extreme values)
  return amount >= 100 && amount <= 1000000;
}

/**
 * Extract numeric budget value from string
 * Converts "$5,000" → 5000
 *
 * @param budget - Budget string
 * @returns Numeric budget value or null if invalid
 */
export function parseBudget(budget: string): number | null {
  if (!isValidBudget(budget)) {
    return null;
  }

  const cleaned = budget.replace(/[$,AUD\s]/gi, '').trim();
  return parseFloat(cleaned);
}

/**
 * Validate timeline format
 * Accepts: "ASAP", "2 weeks", "14 days", "2025-02-15", "URGENT"
 *
 * @param timeline - Timeline string
 * @returns true if valid timeline format
 */
export function isValidTimeline(timeline: string): boolean {
  if (!timeline || typeof timeline !== 'string') {
    return false;
  }

  const cleaned = timeline.trim().toLowerCase();

  // Check for common time expressions
  const validPatterns = [
    /^asap$/i, // ASAP
    /^urgent$/i, // URGENT
    /^immediate$/i, // IMMEDIATE
    /^\d+\s*(day|week|month)s?$/i, // "2 weeks", "14 days"
    /^\d{4}-\d{2}-\d{2}$/, // ISO date format "2025-02-15"
    /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i, // Day of week
    /^(next\s)?(week|month)$/i, // "next week", "next month"
    /^\d+\s*hours?$/i, // "24 hours"
  ];

  return validPatterns.some((pattern) => pattern.test(cleaned));
}

/**
 * Validate estimated hours
 * Accepts: "8", "8.5", "16 hours", "0.5 hours"
 *
 * @param estimatedHours - Estimated hours string
 * @returns true if valid estimated hours format
 */
export function isValidEstimatedHours(estimatedHours: string | undefined): boolean {
  if (!estimatedHours || typeof estimatedHours !== 'string') {
    return true; // Optional field
  }

  // Remove "hours" suffix if present
  const cleaned = estimatedHours.replace(/\s*hours?$/i, '').trim();

  // Check if it's a valid number
  const hours = parseFloat(cleaned);

  if (isNaN(hours) || !isFinite(hours)) {
    return false;
  }

  // Hours should be positive and within reasonable range
  // Minimum: 0.25 hours (15 minutes)
  // Maximum: 8760 hours (1 year of continuous work)
  return hours > 0 && hours <= 8760;
}

/**
 * Extract numeric hours from string
 * Converts "8.5 hours" → 8.5
 *
 * @param estimatedHours - Estimated hours string
 * @returns Numeric hours value or null if invalid
 */
export function parseEstimatedHours(estimatedHours: string | undefined): number | null {
  if (!estimatedHours || !isValidEstimatedHours(estimatedHours)) {
    return null;
  }

  const cleaned = estimatedHours.replace(/\s*hours?$/i, '').trim();
  return parseFloat(cleaned);
}

/**
 * Validate start date format
 * Accepts: "2025-02-15", "02/15/2025", "15-Feb-2025"
 *
 * @param startDate - Start date string
 * @returns true if valid date format and date is in future
 */
export function isValidStartDate(startDate: string | undefined): boolean {
  if (!startDate || typeof startDate !== 'string') {
    return true; // Optional field
  }

  const cleaned = startDate.trim();

  // Try to parse various date formats
  let date: Date | null = null;

  // ISO format: 2025-02-15
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    date = new Date(cleaned + 'T00:00:00Z');
  }
  // US format: 02/15/2025
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(cleaned)) {
    const [month, day, year] = cleaned.split('/');
    date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  }
  // EU format: 15-02-2025
  else if (/^\d{2}-\d{2}-\d{4}$/.test(cleaned)) {
    const [day, month, year] = cleaned.split('-');
    date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  }

  if (!date || isNaN(date.getTime())) {
    return false;
  }

  // Start date should be today or in the future
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return date >= today;
}

/**
 * Parse start date to ISO format
 * Converts various formats to ISO date string
 *
 * @param startDate - Start date string
 * @returns ISO format date string or null if invalid
 */
export function parseStartDate(startDate: string | undefined): string | null {
  if (!startDate || !isValidStartDate(startDate)) {
    return null;
  }

  const cleaned = startDate.trim();
  let date: Date | null = null;

  // ISO format
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    date = new Date(cleaned + 'T00:00:00Z');
  }
  // US format
  else if (/^\d{2}\/\d{2}\/\d{4}$/.test(cleaned)) {
    const [month, day, year] = cleaned.split('/');
    date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  }
  // EU format
  else if (/^\d{2}-\d{2}-\d{4}$/.test(cleaned)) {
    const [day, month, year] = cleaned.split('-');
    date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  }

  if (!date || isNaN(date.getTime())) {
    return null;
  }

  // Return as ISO date string (YYYY-MM-DD)
  return date.toISOString().split('T')[0];
}

/**
 * Comprehensive bid validation schema using Zod
 */
export const bidValidationSchema = z.object({
  budget: z
    .string()
    .min(1, 'Budget is required')
    .max(50, 'Budget must be 50 characters or less')
    .refine(isValidBudget, {
      message: 'Budget must be a valid amount between $100 and $1,000,000',
    }),

  timeline: z
    .string()
    .min(1, 'Timeline is required')
    .max(100, 'Timeline must be 100 characters or less')
    .refine(isValidTimeline, {
      message: 'Timeline must be a valid format (e.g., "ASAP", "2 weeks", or "2025-02-15")',
    }),

  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(5000, 'Message must be 5000 characters or less')
    .refine((msg) => msg.trim().length >= 10, {
      message: 'Message must contain at least 10 characters (excluding whitespace)',
    }),

  startDate: z
    .string()
    .max(50, 'Start date must be 50 characters or less')
    .optional()
    .refine((date) => isValidStartDate(date), {
      message: 'Start date must be today or in the future (format: YYYY-MM-DD)',
    })
    .nullable(),

  estimatedHours: z
    .string()
    .max(50, 'Estimated hours must be 50 characters or less')
    .optional()
    .refine((hours) => isValidEstimatedHours(hours), {
      message: 'Estimated hours must be a valid number between 0.25 and 8760 hours',
    })
    .nullable(),
});

/**
 * Type definition for validated bid data
 */
export type ValidatedBid = z.infer<typeof bidValidationSchema>;

/**
 * Validate and parse bid submission
 *
 * @param data - Raw bid data from request
 * @returns Validated and parsed bid data or validation errors
 */
export async function validateAndParseBid(data: unknown) {
  const validated = await bidValidationSchema.parseAsync(data);

  return {
    ...validated,
    budget: parseBudget(validated.budget ?? undefined),
    estimatedHours: parseEstimatedHours(validated.estimatedHours ?? undefined),
    startDate: parseStartDate(validated.startDate ?? undefined),
  };
}
