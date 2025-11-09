/**
 * Emergency Dispatcher Service
 *
 * Handles emergency job assignment logic with intelligent routing based on:
 * - Geographic proximity
 * - Contractor availability
 * - Service specialization
 * - Response time requirements
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface EmergencyJobRequest {
  serviceType: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard';
  location: {
    address: string;
    suburb: string;
    postcode: string;
    lat?: number;
    lng?: number;
  };
  urgencyLevel: 'critical' | 'urgent' | 'standard';
  propertyType: 'residential' | 'commercial';
  damageDescription: string;
  estimatedArea?: number;
  hasInsurance: boolean;
  insuranceCompany?: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  preferredResponseTime?: string;
}

export interface DispatchResult {
  success: boolean;
  jobId?: string;
  assignedContractor?: {
    id: string;
    name: string;
    phone: string;
    estimatedArrival: string;
  };
  fallbackContractors?: Array<{
    id: string;
    name: string;
    phone: string;
  }>;
  error?: string;
}

/**
 * Calculate lead score based on job characteristics
 */
export function calculateLeadScore(request: EmergencyJobRequest): number {
  let score = 50; // Base score

  // Urgency scoring
  if (request.urgencyLevel === 'critical') score += 25;
  else if (request.urgencyLevel === 'urgent') score += 15;

  // Property type scoring
  if (request.propertyType === 'commercial') score += 15;

  // Insurance scoring
  if (request.hasInsurance) score += 10;

  // Area size scoring
  if (request.estimatedArea) {
    if (request.estimatedArea > 200) score += 15;
    else if (request.estimatedArea > 100) score += 10;
    else if (request.estimatedArea > 50) score += 5;
  }

  // Service type scoring (complexity)
  const serviceTypeScores = {
    fire: 20,
    water: 15,
    mould: 10,
    storm: 15,
    biohazard: 25,
  };
  score += serviceTypeScores[request.serviceType] || 0;

  return Math.min(100, Math.max(0, score));
}

/**
 * Calculate lead value estimate in AUD
 */
export function calculateLeadValue(request: EmergencyJobRequest): number {
  let baseValue = 2500; // Minimum job value

  // Urgency multiplier
  const urgencyMultipliers = {
    critical: 2.0,
    urgent: 1.5,
    standard: 1.0,
  };
  baseValue *= urgencyMultipliers[request.urgencyLevel];

  // Property type multiplier
  if (request.propertyType === 'commercial') {
    baseValue *= 2.5;
  }

  // Area-based value
  if (request.estimatedArea) {
    baseValue += request.estimatedArea * 50; // $50 per sqm
  } else {
    // Default area estimates
    const defaultAreas = {
      water: 75,
      fire: 100,
      mould: 50,
      storm: 80,
      biohazard: 40,
    };
    baseValue += defaultAreas[request.serviceType] * 50;
  }

  // Service type base cost
  const serviceTypeBaseCosts = {
    fire: 5000,
    water: 3000,
    mould: 2500,
    storm: 3500,
    biohazard: 6000,
  };
  baseValue += serviceTypeBaseCosts[request.serviceType] || 0;

  return Math.round(baseValue);
}

/**
 * Find available contractors for the job
 */
async function findAvailableContractors(request: EmergencyJobRequest) {
  // Map service type to specializations
  const serviceTypeMap: Record<string, string> = {
    water: 'IICRC_WRT',
    fire: 'IICRC_FST',
    mould: 'IICRC_AMRT',
    storm: 'IICRC_WRT',
    biohazard: 'IICRC_BIO',
  };

  // Find contractors with matching service area and certifications
  const contractors = await prisma.contractor.findMany({
    where: {
      status: 'APPROVED',
      subscription: {
        status: 'ACTIVE',
      },
      territories: {
        some: {
          active: true,
          OR: [
            { suburbs: { contains: request.location.suburb } },
            { postcodes: { contains: request.location.postcode } },
          ],
        },
      },
      certifications: {
        some: {
          certificationType: serviceTypeMap[request.serviceType],
          status: 'VERIFIED',
          OR: [
            { expiryDate: null },
            { expiryDate: { gte: new Date() } },
          ],
        },
      },
    },
    include: {
      companyProfile: true,
      territories: {
        where: { active: true },
      },
      subscription: true,
    },
    take: 5,
  });

  return contractors;
}

/**
 * Dispatch emergency job to available contractor
 */
export async function dispatchEmergencyJob(
  request: EmergencyJobRequest
): Promise<DispatchResult> {
  try {
    // Calculate lead scoring
    const leadScore = calculateLeadScore(request);
    const leadValue = calculateLeadValue(request);

    // Determine quality status
    let qualityStatus = 'STANDARD';
    if (leadScore >= 80) qualityStatus = 'HIGH_VALUE';
    else if (leadScore >= 60) qualityStatus = 'QUALIFIED';

    // Find available contractors
    const availableContractors = await findAvailableContractors(request);

    if (availableContractors.length === 0) {
      // No contractors available - create lead but don't assign
      const lead = await prisma.lead.create({
        data: {
          fullName: request.contactName,
          phone: request.contactPhone,
          email: request.contactEmail,
          propertyType: request.propertyType,
          propertyAddress: request.location.address,
          suburb: request.location.suburb,
          state: 'QLD',
          postcode: request.location.postcode,
          damageType: JSON.stringify([request.serviceType]),
          damageDate: new Date(),
          damageDescription: request.damageDescription,
          estimatedAreaAffected: request.estimatedArea?.toString() || 'Unknown',
          hasInsurance: request.hasInsurance,
          insuranceCompany: request.insuranceCompany,
          urgencyLevel: request.urgencyLevel.toUpperCase(),
          propertyValue: 'Unknown',
          isBusinessProperty: request.propertyType === 'commercial',
          requiresAccommodation: false,
          leadScore,
          leadValue,
          hasPhotos: false,
          readyToStart: 'Immediately',
          decisionMaker: true,
          qualityStatus,
          status: 'NEW',
        },
      });

      return {
        success: false,
        jobId: lead.id,
        error: 'NO_CONTRACTORS_AVAILABLE',
      };
    }

    // Auto-assign to first available contractor
    const assignedContractor = availableContractors[0];

    const lead = await prisma.lead.create({
      data: {
        fullName: request.contactName,
        phone: request.contactPhone,
        email: request.contactEmail,
        propertyType: request.propertyType,
        propertyAddress: request.location.address,
        suburb: request.location.suburb,
        state: 'QLD',
        postcode: request.location.postcode,
        damageType: JSON.stringify([request.serviceType]),
        damageDate: new Date(),
        damageDescription: request.damageDescription,
        estimatedAreaAffected: request.estimatedArea?.toString() || 'Unknown',
        hasInsurance: request.hasInsurance,
        insuranceCompany: request.insuranceCompany,
        urgencyLevel: request.urgencyLevel.toUpperCase(),
        propertyValue: 'Unknown',
        isBusinessProperty: request.propertyType === 'commercial',
        requiresAccommodation: false,
        leadScore,
        leadValue,
        hasPhotos: false,
        readyToStart: 'Immediately',
        decisionMaker: true,
        qualityStatus,
        status: 'ASSIGNED',
        partnerId: assignedContractor.id,
        assignedAt: new Date(),
      },
    });

    // Create tracking event
    await prisma.leadTracking.create({
      data: {
        leadId: lead.id,
        event: 'ASSIGNED',
        metadata: JSON.stringify({
          contractorId: assignedContractor.id,
          urgency: request.urgencyLevel,
          autoAssigned: true,
        }),
      },
    });

    // Calculate estimated arrival time
    const estimatedArrival = calculateEstimatedArrival(request.urgencyLevel);

    return {
      success: true,
      jobId: lead.id,
      assignedContractor: {
        id: assignedContractor.id,
        name: assignedContractor.companyProfile?.companyName || 'Unknown',
        phone: assignedContractor.mobileNumber,
        estimatedArrival,
      },
      fallbackContractors: availableContractors.slice(1, 3).map((c) => ({
        id: c.id,
        name: c.companyProfile?.companyName || 'Unknown',
        phone: c.mobileNumber,
      })),
    };
  } catch (error) {
    console.error('Emergency dispatch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'DISPATCH_FAILED',
    };
  }
}

/**
 * Calculate estimated arrival time based on urgency
 */
function calculateEstimatedArrival(urgencyLevel: string): string {
  const now = new Date();
  let minutesToAdd = 60; // Default: 60 minutes

  if (urgencyLevel === 'critical') {
    minutesToAdd = 30; // 30 minutes for critical
  } else if (urgencyLevel === 'urgent') {
    minutesToAdd = 60; // 60 minutes for urgent
  } else {
    minutesToAdd = 120; // 120 minutes for standard
  }

  const estimatedTime = new Date(now.getTime() + minutesToAdd * 60000);
  return estimatedTime.toISOString();
}

/**
 * Update job status
 */
export async function updateJobStatus(
  jobId: string,
  status: 'ASSIGNED' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED',
  metadata?: Record<string, unknown>
) {
  const lead = await prisma.lead.update({
    where: { id: jobId },
    data: {
      status,
      ...(status === 'ACCEPTED' && { acceptedAt: new Date() }),
      ...(status === 'REJECTED' && { rejectedAt: new Date() }),
      ...(status === 'COMPLETED' && { completedAt: new Date() }),
    },
  });

  await prisma.leadTracking.create({
    data: {
      leadId: jobId,
      event: status,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  });

  return lead;
}
