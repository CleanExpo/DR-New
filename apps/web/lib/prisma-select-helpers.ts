
/**
 * Prisma Select Type Helpers
 *
 * Provides type-safe select objects for common database queries
 * Eliminates the need for `as any` casts when accessing relations
 */

import { Prisma } from '@prisma/client';

// ============================================================================
// User Select Types
// ============================================================================

/**
 * Basic user fields commonly needed across the app
 */
export const userBasicSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
  avatar: true,
  userType: true,
  tenantId: true,
});

export type UserBasic = Prisma.UserGetPayload<{
  select: typeof userBasicSelect;
}>;

/**
 * User with profile information
 */
export const userWithProfileSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
  avatar: true,
  userType: true,
  tenantId: true,
  isActive: true,
  createdAt: true,
  clientProfile: {
    select: {
      id: true,
      businessName: true,
      phone: true,
    },
  },
  contractorProfile: {
    select: {
      id: true,
      businessName: true,
      abn: true,
    },
  },
});

export type UserWithProfile = Prisma.UserGetPayload<{
  select: typeof userWithProfileSelect;
}>;

// ============================================================================
// Contractor Select Types
// ============================================================================

/**
 * Contractor profile with user and rating info
 */
export const contractorWithUserSelect = Prisma.validator<Prisma.ContractorProfileSelect>()({
  id: true,
  businessName: true,
  abn: true,
  insuranceExpiry: true,
  hourlyRate: true,
  iicrcCertifications: true,
  user: {
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  },
});

export type ContractorWithUser = Prisma.ContractorProfileGetPayload<{
  select: typeof contractorWithUserSelect;
}>;

// ============================================================================
// Booking Select Types
// ============================================================================

/**
 * Booking with related client, contractor, and status
 */
export const bookingWithRelationsSelect = Prisma.validator<Prisma.BookingSelect>()({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
  scheduledDate: true,
  completedAt: true,
  totalPrice: true,
  client: {
    select: {
      id: true,
      businessName: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
  contractor: {
    select: {
      id: true,
      businessName: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  },
  ratings: {
    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,
    },
  },
});

export type BookingWithRelations = Prisma.BookingGetPayload<{
  select: typeof bookingWithRelationsSelect;
}>;

/**
 * Basic booking info for lists
 */
export const bookingBasicSelect = Prisma.validator<Prisma.BookingSelect>()({
  id: true,
  status: true,
  createdAt: true,
  scheduledDate: true,
  totalPrice: true,
});

export type BookingBasic = Prisma.BookingGetPayload<{
  select: typeof bookingBasicSelect;
}>;

// ============================================================================
// Client Select Types
// ============================================================================

/**
 * Client profile with user
 */
export const clientWithUserSelect = Prisma.validator<Prisma.ClientProfileSelect>()({
  id: true,
  businessName: true,
  phone: true,
  addressStreet: true,
  addressSuburb: true,
  addressState: true,
  addressPostcode: true,
  user: {
    select: {
      id: true,
      email: true,
      name: true,
      avatar: true,
    },
  },
});

export type ClientWithUser = Prisma.ClientProfileGetPayload<{
  select: typeof clientWithUserSelect;
}>;

// ============================================================================
// Match Select Types
// ============================================================================

/**
 * Match with contractor and booking info
 */
export const matchWithDetailsSelect = Prisma.validator<Prisma.ContractorMatchSelect>()({
  id: true,
  status: true,
  matchScore: true,
  proposedBudget: true,
  message: true,
  createdAt: true,
  contractor: {
    select: {
      id: true,
      businessName: true,
      hourlyRate: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  },
  booking: {
    select: {
      id: true,
      status: true,
    },
  },
});

export type MatchWithDetails = Prisma.ContractorMatchGetPayload<{
  select: typeof matchWithDetailsSelect;
}>;

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Helper to convert Prisma null to undefined for cleaner type handling
 */
export function nullToUndefined<T>(value: T | null): T | undefined {
  return value === null ? undefined : value;
}

/**
 * Helper to ensure a value exists (throws if null/undefined)
 */
export function ensureExists<T>(value: T | null | undefined, message = 'Value is required'): T {
  if (value === null || value === undefined) {
    throw new Error(message);
  }
  return value;
}

/**
 * Type guard to check if a value is not null/undefined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
