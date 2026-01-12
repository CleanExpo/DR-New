/**
 * Authorization Service
 * Enforces resource-level access control throughout the application
 *
 * Prevents users from accessing resources they don't own or have permission for
 */

import { Session } from 'next-auth';
import { prisma } from '@/lib/prisma';

export type UserRole = 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN';

/**
 * Check if user is authorized to access/modify a specific resource
 *
 * @param session - NextAuth session
 * @param resourceType - Type of resource (payment, booking, profile, etc.)
 * @param resourceId - ID of the resource to check
 * @returns true if authorized, false otherwise
 */
export async function checkResourceAccess(
  session: Session | null,
  resourceType: string,
  resourceId: string
): Promise<boolean> {
  // No session = no access
  if (!session || !session.user) {
    return false;
  }

  const userId = session.user.id;
  const userRole = (session.user as any).role;

  // SUPER_ADMIN and ADMIN have access to everything
  if (userRole === 'SUPER_ADMIN' || userRole === 'ADMIN') {
    return true;
  }

  // Check specific resource types
  switch (resourceType) {
    case 'payment':
      return await checkPaymentAccess(userId, resourceId, userRole);

    case 'booking':
      return await checkBookingAccess(userId, resourceId, userRole);

    case 'contractor-profile':
      return await checkContractorProfileAccess(userId, resourceId, userRole);

    case 'client-profile':
      return await checkClientProfileAccess(userId, resourceId, userRole);

    case 'invoice':
      return await checkInvoiceAccess(userId, resourceId, userRole);

    case 'claim':
      return await checkClaimAccess(userId, resourceId, userRole);

    default:
      console.warn(`Unknown resource type: ${resourceType}`);
      return false;
  }
}

/**
 * Check if user can access a payment record
 */
async function checkPaymentAccess(
  userId: string,
  paymentId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        clientId: true,
        booking: {
          select: {
            contractorId: true,
          },
        },
      },
    });

    if (!payment) return false;

    // Client can access their own payments
    if (userRole === 'CLIENT' && payment.clientId === userId) {
      return true;
    }

    // Contractor can access payments for their bookings
    if (userRole === 'CONTRACTOR' && payment.booking?.contractorId === userId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking payment access:', error);
    return false;
  }
}

/**
 * Check if user can access a booking record
 */
async function checkBookingAccess(
  userId: string,
  bookingId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        clientId: true,
        contractorId: true,
      },
    });

    if (!booking) return false;

    // Client can access their own bookings
    if (userRole === 'CLIENT' && booking.clientId === userId) {
      return true;
    }

    // Contractor can access bookings assigned to them
    if (userRole === 'CONTRACTOR' && booking.contractorId === userId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking booking access:', error);
    return false;
  }
}

/**
 * Check if user can access a contractor profile
 */
async function checkContractorProfileAccess(
  userId: string,
  contractorId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    // Contractors can only access their own profile
    if (userRole === 'CONTRACTOR') {
      return contractorId === userId;
    }

    // Clients can view public contractor profiles (but not edit)
    if (userRole === 'CLIENT') {
      return true; // Allow viewing public info
    }

    return false;
  } catch (error) {
    console.error('Error checking contractor profile access:', error);
    return false;
  }
}

/**
 * Check if user can access a client profile
 */
async function checkClientProfileAccess(
  userId: string,
  clientId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    // Clients can only access their own profile
    if (userRole === 'CLIENT') {
      return clientId === userId;
    }

    // Contractors can view limited client info for bookings
    if (userRole === 'CONTRACTOR') {
      // Check if contractor has a booking with this client
      const booking = await prisma.booking.findFirst({
        where: {
          contractorId: userId,
          clientId,
        },
      });
      return !!booking;
    }

    return false;
  } catch (error) {
    console.error('Error checking client profile access:', error);
    return false;
  }
}

/**
 * Check if user can access an invoice
 */
async function checkInvoiceAccess(
  userId: string,
  invoiceId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      select: {
        clientId: true,
        contractorId: true,
      },
    });

    if (!invoice) return false;

    // Client can access invoices issued to them
    if (userRole === 'CLIENT' && invoice.clientId === userId) {
      return true;
    }

    // Contractor can access invoices they issued
    if (userRole === 'CONTRACTOR' && invoice.contractorId === userId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking invoice access:', error);
    return false;
  }
}

/**
 * Check if user can access a claim
 */
async function checkClaimAccess(
  userId: string,
  claimId: string,
  userRole: UserRole
): Promise<boolean> {
  try {
    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
      select: {
        clientId: true,
        contractorId: true,
      },
    });

    if (!claim) return false;

    // Client can access their own claims
    if (userRole === 'CLIENT' && claim.clientId === userId) {
      return true;
    }

    // Contractor can access claims assigned to them
    if (userRole === 'CONTRACTOR' && claim.contractorId === userId) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking claim access:', error);
    return false;
  }
}

/**
 * Throw error if user is not authorized for resource
 * Useful for API endpoint guards
 */
export async function requireResourceAccess(
  session: Session | null,
  resourceType: string,
  resourceId: string
): Promise<void> {
  const hasAccess = await checkResourceAccess(session, resourceType, resourceId);

  if (!hasAccess) {
    throw new Error(
      `Unauthorized access to ${resourceType} ${resourceId}`
    );
  }
}
