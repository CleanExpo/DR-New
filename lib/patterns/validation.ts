/**
 * Type-safe Form Validation with Zod Integration
 *
 * Provides runtime validation with automatic TypeScript type inference
 */

import { z, ZodSchema, ZodError } from 'zod';
import type { FormErrors, ValidationResult } from '@/lib/types';

/**
 * Extract type from Zod schema
 */
export type InferSchema<T extends ZodSchema> = z.infer<T>;

/**
 * Validation Service
 */
export class ValidationService {
  /**
   * Validate data against schema
   */
  static validate<T extends ZodSchema>(
    schema: T,
    data: unknown
  ): ValidationResult<z.infer<T>> {
    try {
      const validated = schema.parse(data);
      return {
        valid: true,
        data: validated,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          valid: false,
          errors: error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
        };
      }
      return {
        valid: false,
        errors: ['Validation failed'],
      };
    }
  }

  /**
   * Validate and throw on error
   */
  static validateOrThrow<T extends ZodSchema>(
    schema: T,
    data: unknown
  ): z.infer<T> {
    return schema.parse(data);
  }

  /**
   * Safe validation (returns null on error)
   */
  static safeParse<T extends ZodSchema>(
    schema: T,
    data: unknown
  ): z.infer<T> | null {
    const result = schema.safeParse(data);
    return result.success ? result.data : null;
  }

  /**
   * Convert Zod errors to form errors
   */
  static zodToFormErrors<T>(error: ZodError): FormErrors<T> {
    const errors: any = {};

    error.errors.forEach((err) => {
      const path = err.path.join('.');
      if (!errors[path]) {
        errors[path] = [];
      }
      errors[path].push(err.message);
    });

    return errors;
  }
}

/**
 * Common validation schemas
 */
export const CommonSchemas = {
  // Contact schemas
  phoneNumber: z
    .string()
    .regex(/^1300\d{6}$|^\+?\d{10,12}$/, 'Invalid phone number format'),

  email: z.string().email('Invalid email address'),

  postcode: z
    .string()
    .regex(/^4\d{3}$/, 'Invalid Queensland postcode'),

  abn: z
    .string()
    .regex(/^\d{11}$/, 'ABN must be 11 digits')
    .transform((val) => val.replace(/\s+/g, '')),

  // Address schemas
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    suburb: z.string().min(1, 'Suburb is required'),
    state: z.enum(['QLD', 'NSW', 'VIC', 'SA', 'WA', 'TAS', 'NT', 'ACT']),
    postcode: z.string().regex(/^\d{4}$/, 'Invalid postcode'),
  }),

  // Emergency request
  emergencyRequest: z.object({
    type: z.enum(['water', 'fire', 'storm', 'mould', 'biohazard']),
    severity: z.enum(['low', 'medium', 'high', 'critical']),
    location: z.object({
      address: z.string().min(1, 'Address is required'),
      suburb: z.string().min(1, 'Suburb is required'),
      postcode: z.string().regex(/^4\d{3}$/, 'Invalid Queensland postcode'),
    }),
    contact: z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      phone: z.string().regex(/^1300\d{6}$|^\+?\d{10,12}$/, 'Invalid phone number'),
      email: z.string().email('Invalid email address').optional(),
    }),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    images: z.array(z.string().url()).optional(),
    insuranceDetails: z
      .object({
        provider: z.string(),
        policyNumber: z.string(),
        claimNumber: z.string().optional(),
      })
      .optional(),
  }),

  // Quote request
  quoteRequest: z.object({
    serviceId: z.string().min(1, 'Service is required'),
    locationId: z.string().min(1, 'Location is required'),
    propertyType: z.enum(['residential', 'commercial', 'industrial']),
    urgency: z.enum(['standard', 'urgent', 'emergency']),
    description: z.string().min(20, 'Please provide more details (min 20 characters)'),
    affectedArea: z.number().positive().optional(),
    images: z.array(z.string().url()).max(10, 'Maximum 10 images allowed').optional(),
    contact: z.object({
      name: z.string().min(2, 'Name is required'),
      phone: z.string().regex(/^1300\d{6}$|^\+?\d{10,12}$/, 'Invalid phone number'),
      email: z.string().email('Invalid email address'),
    }),
    preferredContactMethod: z.enum(['phone', 'email', 'sms']),
    insuranceClaim: z.boolean(),
  }),

  // Service data
  serviceData: z.object({
    id: z.string(),
    name: z.string().min(1, 'Service name is required'),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
    category: z.string().min(1, 'Category is required'),
    description: z.string().min(20, 'Description must be at least 20 characters'),
    keywords: z.array(z.string()).min(1, 'At least one keyword is required'),
  }),

  // Location data
  locationData: z.object({
    id: z.string(),
    name: z.string().min(1, 'Location name is required'),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'Invalid slug format'),
    state: z.string().length(3, 'State must be 3 characters'),
    postcode: z.string().regex(/^4\d{3}$/, 'Invalid Queensland postcode'),
    coordinates: z
      .object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
      })
      .optional(),
  }),
};

/**
 * Schema composer for complex validations
 */
export class SchemaComposer {
  /**
   * Merge multiple schemas
   */
  static merge<T extends ZodSchema, U extends ZodSchema>(
    schema1: T,
    schema2: U
  ): z.ZodIntersection<T, U> {
    return z.intersection(schema1, schema2);
  }

  /**
   * Create union schema
   */
  static union<T extends [ZodSchema, ZodSchema, ...ZodSchema[]]>(
    ...schemas: T
  ): z.ZodUnion<T> {
    return z.union(schemas);
  }

  /**
   * Create discriminated union
   */
  static discriminatedUnion<
    K extends string,
    T extends [z.ZodDiscriminatedUnionOption<K>, ...z.ZodDiscriminatedUnionOption<K>[]]
  >(discriminator: K, options: T): z.ZodDiscriminatedUnion<K, T> {
    return z.discriminatedUnion(discriminator, options);
  }

  /**
   * Make all fields optional
   */
  static partial<T extends ZodSchema>(schema: T): z.ZodOptional<T> {
    return schema.optional();
  }

  /**
   * Make all fields required
   */
  static required<T extends z.ZodObject<any>>(
    schema: T
  ): any {
    return schema.required();
  }

  /**
   * Pick specific fields
   */
  static pick<T extends z.ZodObject<any>, K extends keyof T['shape']>(
    schema: T,
    keys: K[]
  ): any {
    return schema.pick(Object.fromEntries(keys.map((k) => [k, true])) as any);
  }

  /**
   * Omit specific fields
   */
  static omit<T extends z.ZodObject<any>, K extends keyof T['shape']>(
    schema: T,
    keys: K[]
  ): any {
    return schema.omit(Object.fromEntries(keys.map((k) => [k, true])) as any);
  }
}

/**
 * Custom validators
 */
export const CustomValidators = {
  /**
   * Validate Australian phone number
   */
  australianPhone: (value: string): boolean => {
    const cleaned = value.replace(/\s+/g, '');
    return /^1300\d{6}$|^\+?61\d{9}$|^0[2-8]\d{8}$/.test(cleaned);
  },

  /**
   * Validate Queensland postcode
   */
  qldPostcode: (value: string): boolean => {
    return /^4\d{3}$/.test(value);
  },

  /**
   * Validate ABN
   */
  abn: (value: string): boolean => {
    const cleaned = value.replace(/\s+/g, '');
    if (!/^\d{11}$/.test(cleaned)) return false;

    // ABN checksum validation
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      const digit = parseInt(cleaned[i]!);
      const weight = weights[i]!;
      sum += (i === 0 ? digit - 1 : digit) * weight;
    }
    return sum % 89 === 0;
  },

  /**
   * Validate URL
   */
  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate date range
   */
  dateRange: (start: Date, end: Date): boolean => {
    return start < end;
  },

  /**
   * Validate minimum age
   */
  minimumAge: (birthDate: Date, minAge: number): boolean => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= minAge;
  },
};

/**
 * Form validator hook utility
 */
export function createFormValidator<T extends ZodSchema>(schema: T) {
  return {
    validate: (data: unknown) => ValidationService.validate(schema, data),
    safeParse: (data: unknown) => ValidationService.safeParse(schema, data),
    validateOrThrow: (data: unknown) => ValidationService.validateOrThrow(schema, data),
  };
}
