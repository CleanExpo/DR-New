import { PrismaClient } from '@prisma/client';
import { getTenantPrisma } from './prisma-tenant';
import { AuthContext } from './auth-middleware';

/**
 * Get a tenant-scoped Prisma client from AuthContext.
 *
 * This is a convenience wrapper around getTenantPrisma() that extracts
 * the tenantId from the authentication context.
 *
 * @param context - The AuthContext from authenticateRequest()
 * @returns Prisma client automatically scoped to the user's tenant
 *
 * @example
 * ```typescript
 * // In API route
 * const authResult = await authenticateRequest(request);
 * if (!authResult.success) {
 *   return authResult.response;
 * }
 *
 * const db = getTenantDb(authResult.context);
 * const bookings = await db.booking.findMany({
 *   where: { clientId: authResult.context.user.id }
 * });
 * // tenantId is automatically injected into the where clause
 * ```
 *
 * SUPER_ADMIN bypass:
 * ```typescript
 * // SUPER_ADMIN users with null tenantId get unscoped access
 * const db = getTenantDb(authResult.context); // tenantId = null
 * const allBookings = await db.booking.findMany(); // Returns all tenants' bookings
 * ```
 */
export function getTenantDb(context: AuthContext): PrismaClient {
  return getTenantPrisma(context.tenantId);
}
