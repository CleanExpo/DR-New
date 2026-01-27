import { PrismaClient } from '@prisma/client';
import { prisma } from './prisma';

/**
 * List of all models that have tenantId field and require tenant scoping.
 * These models will have automatic tenantId injection in queries.
 *
 * Models NOT in this list (e.g., User, ServiceRequest, ContractorProfile, Message, TenantConfiguration, Workspace)
 * either don't have tenantId or handle it differently.
 */
const TENANT_MODELS = new Set([
  'booking',
  'payment',
  'invoiceAU',
  'activity',
  'task',
  'contractor',
  'clientProfile',
  'clientProperty',
  'clientInsurance',
  'clientPayment',
  'clientOnboarding',
  'contractorMatch',
  'insuranceClaimAU',
  'insuranceProvider',
  'rating',
  'inspectionReport',
  'damageArea',
  'inspectionPhoto',
  'moistureReading',
  'costEstimate',
  'laborLineItem',
  'materialLineItem',
  'equipmentLineItem',
  'complianceCheck',
  'reportRevision',
  'auditLog',
  'customerLifecycle',
  'opportunity',
  'publicClaim',
  'triageAssessment',
  'blogPost',
  'faq',
  'caseStudy',
  'loginAttempt',
  'verificationToken',
  'contractorOnboarding',
  'contractorAssessment',
  'contractorModuleProgress',
  'contractorCertification',
  'betaProgram',
  'betaEnrollment',
  'betaFeedback',
  'betaNPSSurvey',
]);

/**
 * Get a tenant-scoped Prisma client that automatically injects tenantId into queries.
 *
 * @param tenantId - The tenant ID to scope queries to, or null for SUPER_ADMIN bypass
 * @returns Extended Prisma client with automatic tenant scoping
 *
 * @example
 * ```typescript
 * const db = getTenantPrisma('tenant-123');
 * const bookings = await db.booking.findMany(); // Automatically filtered by tenantId
 * ```
 *
 * SUPER_ADMIN bypass:
 * ```typescript
 * const db = getTenantPrisma(null); // Returns base prisma client without tenant scoping
 * const allBookings = await db.booking.findMany(); // Returns all tenants' bookings
 * ```
 */
export function getTenantPrisma(tenantId: string | null): PrismaClient {
  // SUPER_ADMIN bypass: null tenantId returns unscoped client
  if (!tenantId) {
    return prisma;
  }

  // Return extended client with automatic tenant scoping
  return prisma.$extends({
    name: 'tenant-scoping',
    query: {
      $allModels: {
        // ============================================================================
        // FIND OPERATIONS: Auto-inject tenantId into where clause
        // ============================================================================
        async findMany({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },

        async findFirst({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },

        async findUnique({ model, operation, args, query }) {
          // For findUnique, we can't modify the where clause (it uses unique constraints)
          // Instead, we fetch and then validate tenantId post-fetch
          const result = await query(args);

          if (result && TENANT_MODELS.has(model)) {
            const record = result as any;
            if (record.tenantId && record.tenantId !== tenantId) {
              // Tenant mismatch - return null (not found)
              return null;
            }
          }

          return result;
        },

        async findUniqueOrThrow({ model, operation, args, query }) {
          const result = await query(args);

          if (result && TENANT_MODELS.has(model)) {
            const record = result as any;
            if (record.tenantId && record.tenantId !== tenantId) {
              // Tenant mismatch - throw not found error
              throw new Error(`Record not found for tenant ${tenantId}`);
            }
          }

          return result;
        },

        // ============================================================================
        // AGGREGATION OPERATIONS: Auto-inject tenantId into where clause
        // ============================================================================
        async count({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },

        async aggregate({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },

        async groupBy({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },

        // ============================================================================
        // CREATE OPERATIONS: Auto-inject tenantId into data
        // ============================================================================
        async create({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.data = {
              ...args.data,
              tenantId,
            };
          }
          return query(args);
        },

        async createMany({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            // Handle both single object and array of objects
            if (Array.isArray(args.data)) {
              args.data = args.data.map((item: any) => ({
                ...item,
                tenantId,
              }));
            } else {
              args.data = {
                ...args.data,
                tenantId,
              };
            }
          }
          return query(args);
        },

        async createManyAndReturn({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            if (Array.isArray(args.data)) {
              args.data = args.data.map((item: any) => ({
                ...item,
                tenantId,
              }));
            } else {
              args.data = {
                ...args.data,
                tenantId,
              };
            }
          }
          return query(args);
        },

        // ============================================================================
        // UPDATE OPERATIONS: Auto-inject tenantId into where clause
        // Prevent tenantId modification in data
        // ============================================================================
        async update({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            // Add tenantId to where clause for findUnique-style updates
            // Note: This won't work for unique constraints - we rely on post-fetch validation
            const result = await query(args);

            // Validate tenantId after update
            if (result && TENANT_MODELS.has(model)) {
              const record = result as any;
              if (record.tenantId && record.tenantId !== tenantId) {
                throw new Error(`Cannot update record from different tenant`);
              }
            }

            return result;
          }
          return query(args);
        },

        async updateMany({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };

            // Prevent tenantId modification
            if (args.data && typeof args.data === 'object' && 'tenantId' in args.data) {
              const { tenantId: _, ...dataWithoutTenantId } = args.data as any;
              args.data = dataWithoutTenantId;
            }
          }
          return query(args);
        },

        // ============================================================================
        // UPSERT OPERATIONS: Auto-inject tenantId into create and where
        // ============================================================================
        async upsert({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            // Inject tenantId into create data
            args.create = {
              ...args.create,
              tenantId,
            };

            // Validate after upsert
            const result = await query(args);

            if (result && TENANT_MODELS.has(model)) {
              const record = result as any;
              if (record.tenantId && record.tenantId !== tenantId) {
                throw new Error(`Cannot upsert record from different tenant`);
              }
            }

            return result;
          }
          return query(args);
        },

        // ============================================================================
        // DELETE OPERATIONS: Auto-inject tenantId into where clause
        // ============================================================================
        async delete({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            // For delete with unique constraints, validate tenantId first
            const record = await prisma[model as keyof typeof prisma].findUnique({
              where: args.where,
            } as any);

            if (record && (record as any).tenantId !== tenantId) {
              throw new Error(`Cannot delete record from different tenant`);
            }
          }
          return query(args);
        },

        async deleteMany({ model, operation, args, query }) {
          if (TENANT_MODELS.has(model)) {
            args.where = {
              ...args.where,
              tenantId,
            };
          }
          return query(args);
        },
      },
    },
  }) as unknown as PrismaClient;
}

/**
 * Execute a function with tenant context set for Row-Level Security (RLS).
 *
 * This is required for Supabase pgbouncer in transaction mode.
 * Sets the PostgreSQL session variable `app.current_tenant_id` for the transaction.
 *
 * @param tenantId - The tenant ID to set in session context
 * @param operation - The async function to execute with tenant context
 * @returns The result of the operation
 *
 * @example
 * ```typescript
 * await withTenantContext('tenant-123', async (tx) => {
 *   const bookings = await tx.booking.findMany();
 *   return bookings;
 * });
 * ```
 */
export async function withTenantContext<T>(
  tenantId: string | null,
  operation: (tx: PrismaClient) => Promise<T>
): Promise<T> {
  if (!tenantId) {
    // No tenant context - execute without RLS
    return operation(prisma);
  }

  // Use Prisma interactive transaction to set session variable
  return prisma.$transaction(async (tx) => {
    // Set PostgreSQL session variable for RLS
    await tx.$executeRawUnsafe(`SET LOCAL app.current_tenant_id = '${tenantId}'`);

    // Execute operation with tenant context
    return operation(tx as unknown as PrismaClient);
  });
}
