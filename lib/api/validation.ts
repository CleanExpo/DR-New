/**
 * API Validation Utilities
 * Input validation and sanitization functions
 */

import { z } from 'zod';
import { VALIDATION_RULES } from './config';
import type { ValidationError } from './types';

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Sanitize email
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Sanitize phone number (Australian format)
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\s+/g, '').replace(/-/g, '');
}

/**
 * Validate and sanitize all string fields in an object
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj };

  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeString(sanitized[key]) as any;
    }
  }

  return sanitized;
}

/**
 * Common validation schemas
 */
export const commonSchemas = {
  name: z.string()
    .min(VALIDATION_RULES.name.minLength, `Name must be at least ${VALIDATION_RULES.name.minLength} characters`)
    .max(VALIDATION_RULES.name.maxLength, `Name must be less than ${VALIDATION_RULES.name.maxLength} characters`)
    .regex(VALIDATION_RULES.name.pattern, 'Name contains invalid characters'),

  email: z.string()
    .email('Invalid email address')
    .max(VALIDATION_RULES.email.maxLength, `Email must be less than ${VALIDATION_RULES.email.maxLength} characters`),

  phone: z.string()
    .min(VALIDATION_RULES.phone.minLength, 'Phone number is too short')
    .max(VALIDATION_RULES.phone.maxLength, 'Phone number is too long')
    .regex(VALIDATION_RULES.phone.pattern, 'Invalid Australian phone number'),

  message: z.string()
    .min(VALIDATION_RULES.message.minLength, `Message must be at least ${VALIDATION_RULES.message.minLength} characters`)
    .max(VALIDATION_RULES.message.maxLength, `Message must be less than ${VALIDATION_RULES.message.maxLength} characters`),

  postcode: z.string()
    .regex(VALIDATION_RULES.postcode.pattern, 'Invalid postcode'),

  suburb: z.string()
    .min(2, 'Suburb must be at least 2 characters')
    .max(100, 'Suburb is too long'),

  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address is too long'),
};

/**
 * Emergency request validation schema
 */
export const emergencyRequestSchema = z.object({
  name: commonSchemas.name,
  phone: commonSchemas.phone,
  email: commonSchemas.email,
  address: commonSchemas.address,
  suburb: commonSchemas.suburb,
  emergencyType: z.enum(['water', 'fire', 'storm', 'mould', 'biohazard'], {
    errorMap: () => ({ message: 'Invalid emergency type' })
  }),
  description: commonSchemas.message,
  severity: z.enum(['critical', 'urgent', 'moderate'], {
    errorMap: () => ({ message: 'Invalid severity level' })
  }),
  hasInsurance: z.boolean(),
  insuranceCompany: z.string().optional(),
  preferredCallback: z.string().optional(),
});

/**
 * Quote request validation schema
 */
export const quoteRequestSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  phone: commonSchemas.phone,
  serviceType: z.array(z.string()).min(1, 'At least one service type is required'),
  propertyType: z.enum(['residential', 'commercial', 'industrial'], {
    errorMap: () => ({ message: 'Invalid property type' })
  }),
  address: commonSchemas.address.optional(),
  suburb: commonSchemas.suburb,
  description: commonSchemas.message,
  preferredContactTime: z.string().optional(),
  urgency: z.enum(['emergency', 'urgent', 'standard', 'routine'], {
    errorMap: () => ({ message: 'Invalid urgency level' })
  }),
});

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  name: commonSchemas.name,
  email: commonSchemas.email,
  phone: commonSchemas.phone,
  service: z.string().min(1, 'Service is required'),
  urgency: z.enum(['emergency', 'urgent', 'standard', 'quote', 'routine'], {
    errorMap: () => ({ message: 'Invalid urgency level' })
  }),
  message: commonSchemas.message,
  propertyType: z.string().optional(),
  hasInsurance: z.boolean().optional(),
  preferredContact: z.enum(['phone', 'email', 'sms']).optional(),
});

/**
 * Service filters validation schema
 */
export const serviceFiltersSchema = z.object({
  category: z.string().optional(),
  availability: z.enum(['24x7', 'business-hours']).optional(),
  location: z.string().optional(),
  emergency: z.boolean().optional(),
  search: z.string().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

/**
 * Validate request body against schema
 */
export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ValidationError[] = result.error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    value: err.path.length > 0 ? (data as any)?.[err.path[0]] : undefined,
  }));

  return { success: false, errors };
}

/**
 * Check if string contains potentially harmful content
 */
export function containsHarmfulContent(input: string): boolean {
  const harmfulPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi,
  ];

  return harmfulPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate Australian postcode
 */
export function isValidAustralianPostcode(postcode: string): boolean {
  const code = parseInt(postcode, 10);

  // Queensland: 4000-4999, 9000-9999
  // NSW: 1000-2999
  // VIC: 3000-3999, 8000-8999
  // All states: 200-9999

  return code >= 200 && code <= 9999;
}

/**
 * Validate suburb is in service area
 */
export function isInServiceArea(suburb: string): boolean {
  const serviceSuburbs = [
    // Brisbane high-value suburbs
    'hamilton', 'ascot', 'new farm', 'toowong', 'paddington', 'milton',
    'fortitude valley', 'brisbane cbd', 'south brisbane', 'west end',
    'kangaroo point', 'teneriffe', 'newstead', 'hawthorne', 'bulimba',

    // Ipswich areas
    'ipswich', 'karalee', 'brookwater', 'springfield', 'springfield lakes',
    'augustine heights', 'bellbird park', 'redbank', 'redbank plains',

    // Logan areas
    'logan', 'logan central', 'springwood', 'loganlea', 'woodridge',
    'underwood', 'slacks creek', 'browns plains',
  ];

  return serviceSuburbs.includes(suburb.toLowerCase().trim());
}

/**
 * Extract IP address from request headers
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') || // Cloudflare
    headers.get('x-client-ip') ||
    'unknown'
  );
}

/**
 * Get user agent from headers
 */
export function getUserAgent(headers: Headers): string {
  return headers.get('user-agent') || 'unknown';
}
