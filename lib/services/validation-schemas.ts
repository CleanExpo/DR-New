// Validation schemas for API endpoints
import { z } from 'zod';

// Common schemas
export const dateRangeSchema = z.object({
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional()
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

// Analytics schemas
export const dashboardQuerySchema = z.object({
  tenantId: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  refreshInterval: z.coerce.number().int().positive().optional()
});

export const revenueQuerySchema = z.object({
  tenantId: z.string().optional(),
  period: z.enum(['day', 'week', 'month', 'quarter', 'year']).default('month'),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  groupBy: z.enum(['service', 'insurer', 'location']).optional(),
  includeForecasts: z.coerce.boolean().default(false)
});

export const contractorQuerySchema = z.object({
  tenantId: z.string().optional(),
  sortBy: z.enum(['rating', 'completionRate', 'responseTime', 'revenue', 'performance']).default('rating'),
  filterBySpecialization: z.string().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  active: z.coerce.boolean().optional()
});

export const jobMetricsQuerySchema = z.object({
  tenantId: z.string().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  serviceTypes: z.array(z.string()).optional(),
  priorities: z.array(z.enum(['EMERGENCY', 'HIGH', 'MEDIUM', 'LOW'])).optional(),
  insurers: z.array(z.string()).optional(),
  includeDelayed: z.coerce.boolean().default(true)
});

export const exportReportSchema = z.object({
  type: z.enum(['financial', 'operational', 'performance', 'insurance', 'compliance']),
  format: z.enum(['json', 'csv', 'pdf', 'xlsx']).default('json'),
  dateRange: z.object({
    from: z.string().datetime(),
    to: z.string().datetime()
  }),
  filters: z.object({
    serviceTypes: z.array(z.string()).optional(),
    locations: z.array(z.string()).optional(),
    insurers: z.array(z.string()).optional(),
    contractors: z.array(z.string()).optional(),
    priority: z.array(z.string()).optional(),
    status: z.array(z.string()).optional()
  }).optional(),
  includeCharts: z.boolean().default(false),
  includeRawData: z.boolean().default(true)
});

// Authentication & Authorization schemas
export const authHeaderSchema = z.object({
  authorization: z.string().regex(/^Bearer .+$/, 'Invalid authorization header')
});

export const userRoleSchema = z.enum(['ADMIN', 'MANAGER', 'OPERATOR', 'CONTRACTOR', 'VIEWER']);

// Response schemas for type safety
export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) => z.object({
  success: z.boolean(),
  data: dataSchema.optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.any().optional()
  }).optional(),
  meta: z.object({
    timestamp: z.string().datetime(),
    requestId: z.string(),
    version: z.string()
  }).optional()
});

// Error response schema
export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.any()).optional(),
    stack: z.string().optional()
  }),
  meta: z.object({
    timestamp: z.string().datetime(),
    requestId: z.string()
  })
});

// Webhook payload schemas
export const webhookEventSchema = z.object({
  id: z.string(),
  type: z.enum([
    'job.created',
    'job.updated',
    'job.completed',
    'payment.received',
    'insurance.approved',
    'insurance.rejected'
  ]),
  timestamp: z.string().datetime(),
  data: z.record(z.any()),
  signature: z.string()
});

// Real-time update schemas
export const realtimeUpdateSchema = z.object({
  type: z.enum(['metric', 'alert', 'notification', 'system']),
  channel: z.string(),
  data: z.record(z.any()),
  timestamp: z.string().datetime()
});

// Helper function to validate request body
export function validateRequestBody<T>(schema: z.ZodType<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid request body', error.errors);
    }
    throw error;
  }
}

// Helper function to validate query parameters
export function validateQueryParams<T>(schema: z.ZodType<T>, params: unknown): T {
  try {
    return schema.parse(params);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid query parameters', error.errors);
    }
    throw error;
  }
}

// Custom error class for validation errors
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodError['errors']
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Export all schemas as a namespace for easier import
export const schemas = {
  // Common
  dateRange: dateRangeSchema,
  pagination: paginationSchema,

  // Analytics
  dashboardQuery: dashboardQuerySchema,
  revenueQuery: revenueQuerySchema,
  contractorQuery: contractorQuerySchema,
  jobMetricsQuery: jobMetricsQuerySchema,
  exportReport: exportReportSchema,

  // Auth
  authHeader: authHeaderSchema,
  userRole: userRoleSchema,

  // Response
  apiResponse: apiResponseSchema,
  errorResponse: errorResponseSchema,

  // Events
  webhookEvent: webhookEventSchema,
  realtimeUpdate: realtimeUpdateSchema
};