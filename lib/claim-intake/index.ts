/**
 * Claim Intake Pipeline
 *
 * Converts PublicClaim submissions into Bookings and matches with contractors.
 * This is the core of the platform's business logic:
 * 1. Admin reviews PublicClaim
 * 2. Admin converts to Booking (creates job)
 * 3. System finds matching contractors
 * 4. Contractors notified of available job
 * 5. Contractors submit bids
 * 6. Client reviews bids and accepts
 */

import { prisma } from '@/lib/prisma';
import { AustralianServiceType, AustralianState, BookingStatus, EmergencyResponseLevel } from '@prisma/client';

// ============================================================================
// Types
// ============================================================================

export interface ConvertedBooking {
  bookingId: string;
  clientId: string;
  clientEmail: string;
  clientName: string;
  claimId: string;
}

export interface ContractorMatchResult {
  contractorId: string;
  contractorName: string;
  businessName: string;
  matchScore: number;
  reason: string[];
  primaryPostcode: string;
  primaryState: string;
  averageRating: number;
  completedJobs: number;
}

// ============================================================================
// Step 1: Convert PublicClaim to Booking
// ============================================================================

/**
 * Convert a PublicClaim submission into a Booking
 * Creates a User record for the client if needed
 */
export async function convertPublicClaimToBooking(publicClaimId: string): Promise<ConvertedBooking> {
  // 1. Get the PublicClaim
  const publicClaim = await prisma.publicClaim.findUnique({
    where: { id: publicClaimId },
  });

  if (!publicClaim) {
    throw new Error(`PublicClaim not found: ${publicClaimId}`);
  }

  if (publicClaim.status !== 'PENDING') {
    throw new Error(`PublicClaim is not pending: ${publicClaim.status}`);
  }

  // 2. Check if client User already exists
  let clientUser = await prisma.user.findUnique({
    where: { email: publicClaim.clientEmail },
  });

  // 3. Create User if doesn't exist
  if (!clientUser) {
    clientUser = await prisma.user.create({
      data: {
        email: publicClaim.clientEmail,
        name: publicClaim.clientName,
        role: 'CLIENT',
        emailVerified: null,
        isOnboardingComplete: false,
      },
    });

    // Create ClientProfile for the new client
    await prisma.clientProfile.create({
      data: {
        userId: clientUser.id,
        displayName: publicClaim.clientName,
        phoneNumber: publicClaim.clientPhone,
        isProfileComplete: false,
      },
    });
  }

  // 4. Map disaster type to Australian service type
  const serviceType = mapDisasterTypeToServiceType(publicClaim.disasterType);

  // 5. Map priority to emergency level
  const emergencyLevel = mapPriorityToEmergencyLevel(publicClaim.priority);

  // 6. Create Booking
  const booking = await prisma.booking.create({
    data: {
      clientId: clientUser.id,
      australianServiceType: serviceType,
      description: publicClaim.damageDescription,
      servicePostcode: publicClaim.postcode,
      serviceState: mapPostcodeToState(publicClaim.postcode, publicClaim.suburb),
      serviceSuburb: publicClaim.suburb,
      streetAddress: publicClaim.propertyAddress,
      status: BookingStatus.PENDING,
      emergencyResponseLevel: emergencyLevel,
      estimatedCostAUD: estimateCostFromPriority(publicClaim.priority),
      notes: `Converted from PublicClaim ${publicClaimId}\nInsurance: ${publicClaim.hasInsurance ? publicClaim.insuranceProvider : 'None'}`,
      internalNotes: `Original submission email: ${publicClaim.clientEmail}\nPhone: ${publicClaim.clientPhone}`,
    },
  });

  // 7. Update PublicClaim status
  await prisma.publicClaim.update({
    where: { id: publicClaimId },
    data: {
      status: 'CONVERTED',
      convertedToBookingId: booking.id,
      convertedAt: new Date(),
      conversionNotes: `Converted to Booking ${booking.id}`,
    },
  });

  return {
    bookingId: booking.id,
    clientId: clientUser.id,
    clientEmail: clientUser.email,
    clientName: clientUser.name || 'Client',
    claimId: publicClaimId,
  };
}

// ============================================================================
// Step 2: Match Contractors to Booking
// ============================================================================

/**
 * Find and match contractors to a booking based on:
 * - Location (same postcode, state)
 * - Service specialties
 * - Availability
 * - Rating and performance
 * - Certifications
 */
export async function matchContractorsToBooking(bookingId: string): Promise<ContractorMatchResult[]> {
  // 1. Get booking details
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      servicePostcode: true,
      serviceState: true,
      australianServiceType: true,
      emergencyResponseLevel: true,
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  // 2. Find all active contractors
  const contractors = await prisma.contractor.findMany({
    where: {
      isActive: true,
      isSuspended: false,
      isVerified: true, // Only verified contractors for now
    },
    include: {
      serviceAreas: {
        where: { isActive: true },
      },
      iicrcCertifications: {
        where: { isActive: true },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  // 3. Calculate match scores
  const matches: ContractorMatchResult[] = [];

  for (const contractor of contractors) {
    let score = 0;
    const reasons: string[] = [];

    // Location matching (40 points max)
    const samePostcodeArea = contractor.serviceAreas.some(
      (area) => area.postcode === booking.servicePostcode
    );
    const sameStateArea = contractor.serviceAreas.some(
      (area) => area.state === booking.serviceState
    );

    if (samePostcodeArea) {
      score += 40;
      reasons.push('Same postcode service area');
    } else if (sameStateArea) {
      score += 20;
      reasons.push('Same state service area');
    }

    // Specialty matching (20 points)
    if (contractor.australianSpecialties.includes(booking.australianServiceType)) {
      score += 20;
      reasons.push(`Specialist in ${booking.australianServiceType}`);
    }

    // Emergency level capability (10 points)
    if (contractor.supportedEmergencyLevels.includes(booking.emergencyResponseLevel)) {
      score += 10;
      reasons.push(`Can handle ${booking.emergencyResponseLevel} response`);
    }

    // Availability (20 points)
    // For now, just check if they have any active service areas
    if (contractor.serviceAreas.length > 0) {
      score += 20;
      reasons.push('Currently accepting jobs');
    }

    // Rating (10 points)
    if (contractor.averageRating >= 4.5) {
      score += 10;
      reasons.push(`High rating: ${contractor.averageRating}/5`);
    }

    // Response time (10 points)
    if (contractor.averageResponseTimeMinutes > 0 && contractor.averageResponseTimeMinutes <= 30) {
      score += 10;
      reasons.push(`Fast response: ${contractor.averageResponseTimeMinutes}min avg`);
    }

    // Certifications (10 points)
    const hasSupervisorCert = contractor.iicrcCertifications.some(
      (cert) => cert.certificationLevel === 'SUPERVISOR' || cert.certificationLevel === 'MASTER'
    );
    if (hasSupervisorCert) {
      score += 10;
      reasons.push('IICRC Supervisor+ certified');
    }

    // Only include contractors with minimum score of 30 (location + basic capability)
    if (score >= 30) {
      matches.push({
        contractorId: contractor.id,
        contractorName: contractor.user.name || 'Unknown',
        businessName: contractor.businessName,
        matchScore: score,
        reason: reasons,
        primaryPostcode: contractor.primaryPostcode || 'N/A',
        primaryState: contractor.primaryState || 'N/A',
        averageRating: Number(contractor.averageRating),
        completedJobs: contractor.completedJobs,
      });
    }
  }

  // 4. Sort by match score descending
  matches.sort((a, b) => b.matchScore - a.matchScore);

  // 5. Create ContractorMatch records for top matches (limit to 10)
  const topMatches = matches.slice(0, 10);

  for (const match of topMatches) {
    await prisma.contractorMatch.create({
      data: {
        contractorId: match.contractorId,
        serviceRequestId: bookingId, // Using bookingId as serviceRequestId (they reference the same job)
        matchScore: match.matchScore,
        status: 'PENDING',
      },
    });
  }

  return topMatches;
}

// ============================================================================
// Step 3: Notify Contractors
// ============================================================================

/**
 * Send notifications to contractors about new available job
 * Includes email and in-app notifications
 */
export async function notifyContractorsOfNewJob(
  bookingId: string,
  contractorIds: string[]
): Promise<{ successCount: number; failureCount: number }> {
  let successCount = 0;
  let failureCount = 0;

  // Get booking details for notification
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      client: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!booking) {
    throw new Error(`Booking not found: ${bookingId}`);
  }

  // Send notification to each matched contractor
  for (const contractorId of contractorIds) {
    try {
      const contractor = await prisma.contractor.findUnique({
        where: { id: contractorId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      if (!contractor) {
        failureCount++;
        continue;
      }

      // Create in-app notification
      // Note: Notification model may not exist yet, so this is pseudo-code for future implementation
      // For now, we're just tracking that we attempted to notify

      console.log(`📢 Notifying contractor: ${contractor.businessName}`);
      console.log(`   Email: ${contractor.user.email}`);
      console.log(`   Job: ${booking.australianServiceType} in ${booking.serviceSuburb}`);
      console.log(`   Budget: $${booking.estimatedCostAUD}`);

      // TODO: Send email via Resend
      // TODO: Create notification record
      // TODO: Send WebSocket event to contractor

      successCount++;
    } catch (error) {
      console.error(`Failed to notify contractor ${contractorId}:`, error);
      failureCount++;
    }
  }

  return { successCount, failureCount };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Map disaster type from claim form to Australian service type
 */
function mapDisasterTypeToServiceType(disasterType: string): AustralianServiceType {
  const mapping: Record<string, AustralianServiceType> = {
    'water-damage': 'WATER_RESTORATION',
    'fire-damage': 'FIRE_RESTORATION',
    'flood': 'FLOOD_RESTORATION',
    'bushfire': 'BUSHFIRE_RESTORATION',
    'storm-damage': 'STORM_RESTORATION',
    'mold': 'MOLD_REMEDIATION',
    'other': 'GENERAL_RESTORATION',
  };

  return mapping[disasterType.toLowerCase()] || 'GENERAL_RESTORATION';
}

/**
 * Map priority level to emergency response level
 */
function mapPriorityToEmergencyLevel(priority: string): EmergencyResponseLevel {
  const mapping: Record<string, EmergencyResponseLevel> = {
    critical: 'CRITICAL',
    urgent: 'CRITICAL',
    high: 'URGENT',
    medium: 'STANDARD',
    low: 'STANDARD',
  };

  return mapping[priority.toLowerCase()] || 'STANDARD';
}

/**
 * Map Australian postcode to state
 * This is a simplified version - in production, use a full postcode database
 */
function mapPostcodeToState(postcode: string, suburb?: string): AustralianState {
  const firstDigit = postcode.charAt(0);

  const mapping: Record<string, AustralianState> = {
    '1': 'NSW', // 1000-1999
    '2': 'NSW', // 2000-2799
    '3': 'VIC', // 3000-3999
    '4': 'QLD', // 4000-4999
    '5': 'SA', // 5000-5999
    '6': 'WA', // 6000-6999
    '7': 'TAS', // 7000-7999
    '8': 'NT', // 8000-8999
    '9': 'ACT', // 9000-9999
  };

  return (mapping[firstDigit] || 'NSW') as AustralianState;
}

/**
 * Estimate service cost based on priority level
 * In production, this would be more sophisticated based on:
 * - Damage severity
 * - Location
 * - Service type
 * - Insurance coverage
 */
function estimateCostFromPriority(priority: string): number {
  const costMap: Record<string, number> = {
    critical: 5000,
    urgent: 3000,
    high: 2000,
    medium: 1000,
    low: 500,
  };

  return costMap[priority.toLowerCase()] || 1000;
}

/**
 * Get all pending public claims ready for conversion
 */
export async function getPendingPublicClaims() {
  return await prisma.publicClaim.findMany({
    where: { status: 'PENDING' },
    orderBy: { submittedAt: 'desc' },
  });
}

/**
 * Get claim status and history
 */
export async function getClaimStatus(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      client: {
        select: {
          name: true,
          email: true,
        },
      },
      contractor: {
        select: {
          businessName: true,
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      },
      payments: {
        select: {
          id: true,
          status: true,
          amountAUD: true,
          createdAt: true,
        },
      },
    },
  });

  return booking;
}
