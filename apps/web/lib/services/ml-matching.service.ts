/**
 * ML-Enhanced Contractor Matching Service
 *
 * Phase C.2: Enhances rule-based contractor matching with ML factors:
 * - Historical performance analysis (completion rate, satisfaction, disputes)
 * - Contextual factors (workload, availability patterns, weather impact)
 * - Similarity matching (similar job success, client profile compatibility)
 * - LLM-powered scoring with explainability
 */

import { prisma } from '@/lib/prisma';
import { getDefaultProvider } from '@/lib/agents/providers';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

// ============================================================================
// Types and Interfaces
// ============================================================================

export interface MLMatchingFactors {
  // Historical performance (from completed jobs)
  completionRate: number; // 0-1, jobs completed vs started
  clientSatisfaction: number; // Average rating 0-5
  disputeRate: number; // 0-1, disputes per completed job
  responseTimeConsistency: number; // 0-1, how consistent are response times
  averageJobDuration: number; // Days to complete similar jobs
  repeatClientRate: number; // 0-1, clients who book again

  // Contextual factors
  currentWorkload: number; // 0-1, active jobs / max capacity
  availabilityScore: number; // 0-1, based on calendar
  timeOfDayMatch: number; // 0-1, contractor's preferred hours
  distanceToJob: number; // km from contractor base
  weatherImpact: number; // 0-1, weather suitability for job type

  // Similarity matching
  similarJobSuccessRate: number; // 0-1, success on similar jobs
  damageTypeExperience: number; // 0-1, experience with this damage type
  clientProfileMatch: number; // 0-1, match to client type
  insuranceProviderExperience: number; // 0-1, experience with insurer
  locationExperience: number; // 0-1, experience in this area
}

export interface MLMatchResult {
  contractorId: string;
  businessName: string;
  mlScore: number; // 0-100 overall ML score
  confidence: number; // 0-1 how confident in this score
  factors: MLMatchingFactors;
  reasoning: string; // LLM-generated explanation
  eligibleForInsuranceWork: boolean;
  riskFactors: string[]; // Potential issues to be aware of
  strengths: string[]; // Key advantages
  recommendations: string[]; // Specific recommendations for this match
  processingTimeMs: number;
}

export interface MLBatchMatchResult {
  bookingId: string;
  matches: MLMatchResult[];
  topRecommendation: MLMatchResult | null;
  processingTimeMs: number;
  factorsAnalysed: number;
}

export interface MatchingContext {
  bookingId?: string;
  serviceType: string;
  damageType: string;
  urgency: 'STANDARD' | 'HIGH' | 'URGENT' | 'EMERGENCY';
  location: {
    suburb: string;
    state: string;
    postcode: string;
    coordinates?: { lat: number; lng: number };
  };
  estimatedBudget?: number;
  insuranceProvider?: string;
  clientId?: string;
  isInsuranceWork: boolean;
  preferredSchedule?: {
    date?: Date;
    timeOfDay?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'ANY';
  };
  weatherConditions?: string;
}

// ============================================================================
// Constants
// ============================================================================

// ML Factor weights for scoring (total = 100)
const ML_WEIGHTS = {
  // Historical (40 points)
  completionRate: 10,
  clientSatisfaction: 12,
  disputeRate: 8,
  responseTimeConsistency: 5,
  repeatClientRate: 5,

  // Contextual (25 points)
  currentWorkload: 8,
  availabilityScore: 7,
  distanceToJob: 5,
  timeOfDayMatch: 3,
  weatherImpact: 2,

  // Similarity (35 points)
  similarJobSuccessRate: 12,
  damageTypeExperience: 10,
  insuranceProviderExperience: 5,
  locationExperience: 5,
  clientProfileMatch: 3,
};

// Minimum thresholds for insurance work
const INSURANCE_WORK_THRESHOLDS = {
  minCompletionRate: 0.85,
  minSatisfaction: 3.5,
  maxDisputeRate: 0.1,
  minSimilarJobSuccess: 0.7,
};

// Australian state capitals for distance approximation
const STATE_REFERENCE_POINTS: Record<string, { lat: number; lng: number }> = {
  NSW: { lat: -33.8688, lng: 151.2093 }, // Sydney
  VIC: { lat: -37.8136, lng: 144.9631 }, // Melbourne
  QLD: { lat: -27.4698, lng: 153.0251 }, // Brisbane
  WA: { lat: -31.9505, lng: 115.8605 }, // Perth
  SA: { lat: -34.9285, lng: 138.6007 }, // Adelaide
  TAS: { lat: -42.8821, lng: 147.3272 }, // Hobart
  NT: { lat: -12.4634, lng: 130.8456 }, // Darwin
  ACT: { lat: -35.2809, lng: 149.13 }, // Canberra
};

// ============================================================================
// Core ML Matching Functions
// ============================================================================

/**
 * Calculate ML-enhanced match score for a single contractor
 */
export async function calculateMLMatchScore(
  contractorId: string,
  context: MatchingContext
): Promise<MLMatchResult> {
  const startTime = Date.now();

  try {
    // Fetch contractor with all related data
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        contractorProfile: true,
        iicrcCertifications: true,
        serviceAreas: true,
        insuranceDocuments: {
          orderBy: { uploadedAt: 'desc' },
          take: 1,
        },
        user: {
          select: { email: true, name: true },
        },
      },
    });

    if (!contractor) {
      throw new Error(`Contractor not found: ${contractorId}`);
    }

    // Calculate all ML factors
    const factors = await calculateMLFactors(contractor, context);

    // Calculate weighted score
    const mlScore = calculateWeightedScore(factors);

    // Determine insurance eligibility
    const eligibleForInsuranceWork = checkInsuranceEligibility(contractor, factors);

    // Identify risk factors and strengths
    const { riskFactors, strengths } = analyseMatchQuality(factors, context, contractor);

    // Generate LLM reasoning
    const { reasoning, recommendations } = await generateMLReasoning(
      contractor,
      factors,
      context,
      mlScore
    );

    // Calculate confidence based on data availability
    const confidence = calculateConfidence(factors, contractor);

    return {
      contractorId,
      businessName: contractor.businessName,
      mlScore,
      confidence,
      factors,
      reasoning,
      eligibleForInsuranceWork,
      riskFactors,
      strengths,
      recommendations,
      processingTimeMs: Date.now() - startTime,
    };
  } catch (error) {
    console.error(`ML matching error for contractor ${contractorId}:`, error);

    // Return a low-confidence fallback result
    return {
      contractorId,
      businessName: 'Unknown',
      mlScore: 0,
      confidence: 0,
      factors: createEmptyFactors(),
      reasoning: `Unable to calculate ML score: ${error instanceof Error ? error.message : 'Unknown error'}`,
      eligibleForInsuranceWork: false,
      riskFactors: ['ML scoring unavailable'],
      strengths: [],
      recommendations: ['Manual review required'],
      processingTimeMs: Date.now() - startTime,
    };
  }
}

/**
 * Calculate ML match scores for multiple contractors
 */
export async function calculateMLMatchScoresBatch(
  contractorIds: string[],
  context: MatchingContext,
  options: { concurrency?: number } = {}
): Promise<MLBatchMatchResult> {
  const startTime = Date.now();
  const concurrency = options.concurrency || 5;

  // Process in batches with concurrency control
  const results: MLMatchResult[] = [];
  for (let i = 0; i < contractorIds.length; i += concurrency) {
    const batch = contractorIds.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((id) => calculateMLMatchScore(id, context))
    );
    results.push(...batchResults);
  }

  // Sort by score descending
  results.sort((a, b) => b.mlScore - a.mlScore);

  // Filter for insurance eligibility if required
  const eligibleResults = context.isInsuranceWork
    ? results.filter((r) => r.eligibleForInsuranceWork)
    : results;

  return {
    bookingId: context.bookingId || '',
    matches: results,
    topRecommendation: eligibleResults[0] || null,
    processingTimeMs: Date.now() - startTime,
    factorsAnalysed: Object.keys(ML_WEIGHTS).length,
  };
}

// ============================================================================
// Factor Calculation Functions
// ============================================================================

/**
 * Calculate all ML matching factors for a contractor
 */
async function calculateMLFactors(
  contractor: any, // Prisma contractor with includes
  context: MatchingContext
): Promise<MLMatchingFactors> {
  // Fetch historical job data
  const jobHistory = await getContractorJobHistory(contractor.id);

  // Calculate historical performance factors
  const historicalFactors = calculateHistoricalFactors(jobHistory);

  // Calculate contextual factors
  const contextualFactors = calculateContextualFactors(contractor, context);

  // Calculate similarity factors
  const similarityFactors = await calculateSimilarityFactors(
    contractor,
    context,
    jobHistory
  );

  return {
    ...historicalFactors,
    ...contextualFactors,
    ...similarityFactors,
  };
}

/**
 * Get contractor job history for analysis
 */
async function getContractorJobHistory(contractorId: string) {
  // Fetch bookings with status and reviews
  const bookings = await prisma.booking.findMany({
    where: {
      contractorId,
      status: { in: ['COMPLETED', 'CANCELLED', 'IN_DISPUTE'] },
    },
    include: {
      reviews: true,
      dispute: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 100, // Last 100 jobs for analysis
  });

  // Aggregate statistics
  const completed = bookings.filter((b) => b.status === 'COMPLETED').length;
  const total = bookings.length;
  const disputes = bookings.filter(
    (b) => b.status === 'IN_DISPUTE' || b.dispute
  ).length;
  const ratings = bookings
    .flatMap((b) => b.reviews.map((r) => r.overallRating))
    .filter((r): r is number => r !== null);

  // Calculate repeat clients
  const clientIds = bookings.map((b) => b.clientId);
  const uniqueClients = new Set(clientIds);
  const repeatClients = clientIds.length - uniqueClients.size;

  return {
    bookings,
    completed,
    total,
    disputes,
    ratings,
    repeatClients,
    uniqueClientCount: uniqueClients.size,
  };
}

/**
 * Calculate historical performance factors
 */
function calculateHistoricalFactors(jobHistory: any): {
  completionRate: number;
  clientSatisfaction: number;
  disputeRate: number;
  responseTimeConsistency: number;
  averageJobDuration: number;
  repeatClientRate: number;
} {
  const { completed, total, disputes, ratings, repeatClients, uniqueClientCount } =
    jobHistory;

  // Completion rate with minimum threshold for new contractors
  const completionRate = total > 0 ? completed / total : 0.5;

  // Client satisfaction (average rating)
  const clientSatisfaction =
    ratings.length > 0
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : 3.0; // Default for new contractors

  // Dispute rate (lower is better)
  const disputeRate = total > 0 ? disputes / total : 0;

  // Response time consistency (placeholder - would need more detailed data)
  const responseTimeConsistency = 0.7; // Default moderate consistency

  // Average job duration (placeholder)
  const averageJobDuration = 5; // Default 5 days

  // Repeat client rate
  const repeatClientRate =
    uniqueClientCount > 0 ? repeatClients / uniqueClientCount : 0;

  return {
    completionRate: Math.min(1, completionRate),
    clientSatisfaction: Math.min(5, clientSatisfaction),
    disputeRate: Math.min(1, disputeRate),
    responseTimeConsistency,
    averageJobDuration,
    repeatClientRate: Math.min(1, repeatClientRate),
  };
}

/**
 * Calculate contextual factors
 */
function calculateContextualFactors(
  contractor: any,
  context: MatchingContext
): {
  currentWorkload: number;
  availabilityScore: number;
  timeOfDayMatch: number;
  distanceToJob: number;
  weatherImpact: number;
} {
  // Current workload (would need active jobs count)
  // For now, use profile data if available
  const maxCapacity = 10; // Assumed max concurrent jobs
  const activeJobs = 2; // Placeholder
  const currentWorkload = activeJobs / maxCapacity;

  // Availability score based on emergency response level
  const emergencyLevel =
    contractor.contractorProfile?.emergencyResponseLevel || 'STANDARD';
  const availabilityByLevel: Record<string, number> = {
    EMERGENCY_24_7: 1.0,
    SAME_DAY: 0.9,
    NEXT_DAY: 0.7,
    STANDARD: 0.5,
  };
  const availabilityScore = availabilityByLevel[emergencyLevel] || 0.5;

  // Time of day match (simplified)
  const timeOfDayMatch = context.preferredSchedule?.timeOfDay === 'ANY' ? 1.0 : 0.8;

  // Distance calculation
  const distanceToJob = calculateDistance(contractor, context);

  // Weather impact (simplified - would need real weather API)
  const weatherImpact = getWeatherImpact(context.weatherConditions, context.serviceType);

  return {
    currentWorkload: 1 - currentWorkload, // Invert so lower workload = higher score
    availabilityScore,
    timeOfDayMatch,
    distanceToJob,
    weatherImpact,
  };
}

/**
 * Calculate distance score between contractor and job location
 */
function calculateDistance(contractor: any, context: MatchingContext): number {
  // Check if contractor services this postcode
  const servicesPostcode = contractor.serviceAreas?.some(
    (sa: any) => sa.postcode === context.location.postcode
  );

  if (servicesPostcode) {
    return 1.0; // Exact postcode match
  }

  // Check if contractor services this state
  const servicesState = contractor.serviceAreas?.some(
    (sa: any) => sa.state === context.location.state
  );

  if (servicesState) {
    return 0.7; // Same state but different postcode
  }

  // Check neighbouring states (simplified)
  const neighbouringStates: Record<string, string[]> = {
    NSW: ['VIC', 'QLD', 'SA', 'ACT'],
    VIC: ['NSW', 'SA', 'TAS'],
    QLD: ['NSW', 'NT'],
    WA: ['SA', 'NT'],
    SA: ['NSW', 'VIC', 'WA', 'NT', 'QLD'],
    TAS: ['VIC'],
    NT: ['WA', 'SA', 'QLD'],
    ACT: ['NSW'],
  };

  const jobState = context.location.state;
  const contractorStates = contractor.serviceAreas?.map((sa: any) => sa.state) || [];

  const servicesNeighbour = contractorStates.some((cs: string) =>
    neighbouringStates[jobState]?.includes(cs)
  );

  if (servicesNeighbour) {
    return 0.4; // Neighbouring state
  }

  return 0.1; // Far away
}

/**
 * Get weather impact on job type
 */
function getWeatherImpact(
  weatherConditions: string | undefined,
  serviceType: string
): number {
  if (!weatherConditions) {
    return 0.8; // Default moderate impact
  }

  const weather = weatherConditions.toLowerCase();

  // Outdoor work affected by rain
  const outdoorServices = ['FIRE_DAMAGE', 'STORM_DAMAGE', 'FLOOD_DAMAGE'];
  if (
    outdoorServices.includes(serviceType) &&
    (weather.includes('rain') || weather.includes('storm'))
  ) {
    return 0.5;
  }

  // Indoor work less affected
  const indoorServices = ['WATER_DAMAGE', 'MOULD_REMEDIATION'];
  if (indoorServices.includes(serviceType)) {
    return 0.9;
  }

  return 0.7;
}

/**
 * Calculate similarity factors
 */
async function calculateSimilarityFactors(
  contractor: any,
  context: MatchingContext,
  jobHistory: any
): Promise<{
  similarJobSuccessRate: number;
  damageTypeExperience: number;
  clientProfileMatch: number;
  insuranceProviderExperience: number;
  locationExperience: number;
}> {
  const { bookings } = jobHistory;

  // Similar job success rate
  const similarJobs = bookings.filter(
    (b: any) =>
      b.australianServiceType === context.serviceType ||
      b.disasterType === context.damageType
  );
  const successfulSimilar = similarJobs.filter(
    (b: any) => b.status === 'COMPLETED'
  ).length;
  const similarJobSuccessRate =
    similarJobs.length > 0 ? successfulSimilar / similarJobs.length : 0.5;

  // Damage type experience
  const damageTypeCount = bookings.filter(
    (b: any) => b.disasterType === context.damageType
  ).length;
  const damageTypeExperience = Math.min(1, damageTypeCount / 10); // Cap at 10+ jobs

  // Insurance provider experience
  let insuranceProviderExperience = 0.5;
  if (context.insuranceProvider) {
    const insurerJobs = bookings.filter(
      (b: any) => b.insuranceProvider === context.insuranceProvider
    ).length;
    insuranceProviderExperience = Math.min(1, insurerJobs / 5); // Cap at 5+ jobs
  }

  // Location experience
  const locationJobs = bookings.filter(
    (b: any) =>
      b.clientPostcode === context.location.postcode ||
      b.clientState === context.location.state
  ).length;
  const locationExperience = Math.min(1, locationJobs / 10);

  // Client profile match (simplified - would need client data)
  const clientProfileMatch = 0.6; // Default moderate match

  return {
    similarJobSuccessRate,
    damageTypeExperience,
    clientProfileMatch,
    insuranceProviderExperience,
    locationExperience,
  };
}

// ============================================================================
// Scoring and Analysis Functions
// ============================================================================

/**
 * Calculate weighted score from all factors
 */
function calculateWeightedScore(factors: MLMatchingFactors): number {
  let score = 0;

  // Historical factors
  score += factors.completionRate * ML_WEIGHTS.completionRate;
  score +=
    (factors.clientSatisfaction / 5) * ML_WEIGHTS.clientSatisfaction; // Normalise to 0-1
  score += (1 - factors.disputeRate) * ML_WEIGHTS.disputeRate; // Invert (lower is better)
  score += factors.responseTimeConsistency * ML_WEIGHTS.responseTimeConsistency;
  score += factors.repeatClientRate * ML_WEIGHTS.repeatClientRate;

  // Contextual factors
  score += factors.currentWorkload * ML_WEIGHTS.currentWorkload;
  score += factors.availabilityScore * ML_WEIGHTS.availabilityScore;
  score += factors.distanceToJob * ML_WEIGHTS.distanceToJob;
  score += factors.timeOfDayMatch * ML_WEIGHTS.timeOfDayMatch;
  score += factors.weatherImpact * ML_WEIGHTS.weatherImpact;

  // Similarity factors
  score += factors.similarJobSuccessRate * ML_WEIGHTS.similarJobSuccessRate;
  score += factors.damageTypeExperience * ML_WEIGHTS.damageTypeExperience;
  score +=
    factors.insuranceProviderExperience * ML_WEIGHTS.insuranceProviderExperience;
  score += factors.locationExperience * ML_WEIGHTS.locationExperience;
  score += factors.clientProfileMatch * ML_WEIGHTS.clientProfileMatch;

  return Math.round(score * 10) / 10; // Round to 1 decimal place
}

/**
 * Check if contractor is eligible for insurance work
 */
function checkInsuranceEligibility(
  contractor: any,
  factors: MLMatchingFactors
): boolean {
  // Check required thresholds
  if (factors.completionRate < INSURANCE_WORK_THRESHOLDS.minCompletionRate) {
    return false;
  }
  if (factors.clientSatisfaction < INSURANCE_WORK_THRESHOLDS.minSatisfaction) {
    return false;
  }
  if (factors.disputeRate > INSURANCE_WORK_THRESHOLDS.maxDisputeRate) {
    return false;
  }
  if (
    factors.similarJobSuccessRate < INSURANCE_WORK_THRESHOLDS.minSimilarJobSuccess
  ) {
    return false;
  }

  // Check insurance documentation
  const hasValidInsurance = contractor.insuranceDocuments?.some(
    (doc: any) =>
      doc.documentType === 'PUBLIC_LIABILITY' &&
      doc.verificationStatus === 'VERIFIED' &&
      new Date(doc.expiryDate) > new Date()
  );

  // Check training completion
  const hasTrainingCompleted =
    contractor.contractorProfile?.insuranceTrainingCompleted === true;

  return hasValidInsurance && hasTrainingCompleted;
}

/**
 * Analyse match quality and identify risks/strengths
 */
function analyseMatchQuality(
  factors: MLMatchingFactors,
  context: MatchingContext,
  contractor: any
): { riskFactors: string[]; strengths: string[] } {
  const riskFactors: string[] = [];
  const strengths: string[] = [];

  // Analyse completion rate
  if (factors.completionRate < 0.8) {
    riskFactors.push(
      `Lower completion rate (${(factors.completionRate * 100).toFixed(0)}%)`
    );
  } else if (factors.completionRate >= 0.95) {
    strengths.push(
      `Excellent completion rate (${(factors.completionRate * 100).toFixed(0)}%)`
    );
  }

  // Analyse satisfaction
  if (factors.clientSatisfaction < 3.5) {
    riskFactors.push(
      `Below average satisfaction (${factors.clientSatisfaction.toFixed(1)}/5)`
    );
  } else if (factors.clientSatisfaction >= 4.5) {
    strengths.push(
      `Outstanding client satisfaction (${factors.clientSatisfaction.toFixed(1)}/5)`
    );
  }

  // Analyse disputes
  if (factors.disputeRate > 0.1) {
    riskFactors.push(
      `Higher dispute rate (${(factors.disputeRate * 100).toFixed(0)}%)`
    );
  } else if (factors.disputeRate === 0) {
    strengths.push('No dispute history');
  }

  // Analyse workload
  if (factors.currentWorkload < 0.5) {
    riskFactors.push('High current workload may delay response');
  } else if (factors.currentWorkload > 0.8) {
    strengths.push('Good availability for new jobs');
  }

  // Analyse experience
  if (factors.similarJobSuccessRate >= 0.9) {
    strengths.push('Proven track record with similar jobs');
  } else if (factors.similarJobSuccessRate < 0.5) {
    riskFactors.push('Limited experience with this type of work');
  }

  // Analyse distance
  if (factors.distanceToJob >= 0.9) {
    strengths.push('Local contractor with fast response capability');
  } else if (factors.distanceToJob < 0.5) {
    riskFactors.push('May have longer travel time to job site');
  }

  // Emergency response for urgent jobs
  if (
    context.urgency === 'EMERGENCY' &&
    contractor.contractorProfile?.emergencyResponseLevel === 'EMERGENCY_24_7'
  ) {
    strengths.push('24/7 emergency response capability');
  }

  return { riskFactors, strengths };
}

/**
 * Calculate confidence level based on data availability
 */
function calculateConfidence(factors: MLMatchingFactors, contractor: any): number {
  let confidencePoints = 0;
  const maxPoints = 10;

  // Points for historical data
  if (factors.completionRate !== 0.5) confidencePoints += 2; // Not default
  if (factors.clientSatisfaction !== 3.0) confidencePoints += 2; // Not default

  // Points for contractor data
  if (contractor.contractorProfile) confidencePoints += 1;
  if (contractor.iicrcCertifications?.length > 0) confidencePoints += 1;
  if (contractor.insuranceDocuments?.length > 0) confidencePoints += 1;
  if (contractor.serviceAreas?.length > 0) confidencePoints += 1;

  // Points for experience data
  if (factors.damageTypeExperience > 0) confidencePoints += 1;
  if (factors.locationExperience > 0) confidencePoints += 1;

  return Math.round((confidencePoints / maxPoints) * 100) / 100;
}

/**
 * Generate LLM-powered reasoning for the match
 */
async function generateMLReasoning(
  contractor: any,
  factors: MLMatchingFactors,
  context: MatchingContext,
  mlScore: number
): Promise<{ reasoning: string; recommendations: string[] }> {
  try {
    const provider = await getDefaultProvider();
    const model = provider.getModel();

    const prompt = `You are an expert contractor matching analyst for Australian disaster recovery.
Analyse this match and provide a concise explanation and recommendations.

CONTRACTOR: ${contractor.businessName}
ML SCORE: ${mlScore}/100

MATCHING FACTORS:
- Historical Performance:
  * Completion Rate: ${(factors.completionRate * 100).toFixed(0)}%
  * Client Satisfaction: ${factors.clientSatisfaction.toFixed(1)}/5
  * Dispute Rate: ${(factors.disputeRate * 100).toFixed(1)}%
  * Response Consistency: ${(factors.responseTimeConsistency * 100).toFixed(0)}%
  * Repeat Client Rate: ${(factors.repeatClientRate * 100).toFixed(0)}%

- Contextual Factors:
  * Current Availability: ${(factors.currentWorkload * 100).toFixed(0)}%
  * Distance Score: ${(factors.distanceToJob * 100).toFixed(0)}%
  * Weather Suitability: ${(factors.weatherImpact * 100).toFixed(0)}%

- Experience Factors:
  * Similar Job Success: ${(factors.similarJobSuccessRate * 100).toFixed(0)}%
  * Damage Type Experience: ${(factors.damageTypeExperience * 100).toFixed(0)}%
  * Location Experience: ${(factors.locationExperience * 100).toFixed(0)}%

JOB REQUIREMENTS:
- Service Type: ${context.serviceType}
- Damage Type: ${context.damageType}
- Urgency: ${context.urgency}
- Location: ${context.location.suburb}, ${context.location.state} ${context.location.postcode}
- Insurance Work: ${context.isInsuranceWork ? 'Yes' : 'No'}
${context.insuranceProvider ? `- Insurance Provider: ${context.insuranceProvider}` : ''}

Provide a JSON response with:
{
  "reasoning": "2-3 sentence explanation of why this contractor is/isn't a good match",
  "recommendations": ["up to 3 specific recommendations for this engagement"]
}

Return ONLY valid JSON.`;

    const response = await model.invoke([
      new SystemMessage(
        'You are an expert contractor matching analyst. Provide concise, actionable insights. Use Australian English.'
      ),
      new HumanMessage(prompt),
    ]);

    const content =
      typeof response.content === 'string' ? response.content : '';
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        reasoning: parsed.reasoning || generateFallbackReasoning(factors, mlScore),
        recommendations: parsed.recommendations || [],
      };
    }

    return {
      reasoning: generateFallbackReasoning(factors, mlScore),
      recommendations: [],
    };
  } catch (error) {
    console.error('Error generating ML reasoning:', error);
    return {
      reasoning: generateFallbackReasoning(factors, mlScore),
      recommendations: [],
    };
  }
}

/**
 * Generate fallback reasoning without LLM
 */
function generateFallbackReasoning(factors: MLMatchingFactors, mlScore: number): string {
  const parts: string[] = [];

  if (mlScore >= 80) {
    parts.push('This contractor is a strong match for your requirements.');
  } else if (mlScore >= 60) {
    parts.push('This contractor is a reasonable match with some considerations.');
  } else if (mlScore >= 40) {
    parts.push('This contractor may be suitable but has notable limitations.');
  } else {
    parts.push('This contractor has significant gaps in matching criteria.');
  }

  if (factors.clientSatisfaction >= 4.5) {
    parts.push('They have excellent client satisfaction ratings.');
  }

  if (factors.similarJobSuccessRate >= 0.8) {
    parts.push('They have a strong track record with similar jobs.');
  }

  if (factors.currentWorkload > 0.7) {
    parts.push('They have good current availability.');
  }

  return parts.join(' ');
}

/**
 * Create empty factors for error cases
 */
function createEmptyFactors(): MLMatchingFactors {
  return {
    completionRate: 0,
    clientSatisfaction: 0,
    disputeRate: 0,
    responseTimeConsistency: 0,
    averageJobDuration: 0,
    repeatClientRate: 0,
    currentWorkload: 0,
    availabilityScore: 0,
    timeOfDayMatch: 0,
    distanceToJob: 0,
    weatherImpact: 0,
    similarJobSuccessRate: 0,
    damageTypeExperience: 0,
    clientProfileMatch: 0,
    insuranceProviderExperience: 0,
    locationExperience: 0,
  };
}

// ============================================================================
// Integration with Existing Matching Workflow
// ============================================================================

/**
 * Enhance existing scored matches with ML factors
 * Call this after the rule-based scoring in contractor-matching workflow
 */
export async function enhanceWithMLScores(
  scoredMatches: Array<{ contractorId: string; score: number; reasons: string[] }>,
  context: MatchingContext,
  options: { mlWeight?: number; concurrency?: number } = {}
): Promise<
  Array<{
    contractorId: string;
    combinedScore: number;
    ruleScore: number;
    mlScore: number;
    mlResult: MLMatchResult;
    reasons: string[];
  }>
> {
  const mlWeight = options.mlWeight ?? 0.4; // 40% ML, 60% rule-based by default
  const ruleWeight = 1 - mlWeight;

  // Calculate ML scores for all contractors
  const contractorIds = scoredMatches.map((m) => m.contractorId);
  const mlResults = await calculateMLMatchScoresBatch(contractorIds, context, options);

  // Combine scores
  const enhanced = scoredMatches.map((match) => {
    const mlResult = mlResults.matches.find(
      (m) => m.contractorId === match.contractorId
    );

    if (!mlResult) {
      return {
        contractorId: match.contractorId,
        combinedScore: match.score,
        ruleScore: match.score,
        mlScore: 0,
        mlResult: {
          contractorId: match.contractorId,
          businessName: 'Unknown',
          mlScore: 0,
          confidence: 0,
          factors: createEmptyFactors(),
          reasoning: 'ML scoring unavailable',
          eligibleForInsuranceWork: false,
          riskFactors: [],
          strengths: [],
          recommendations: [],
          processingTimeMs: 0,
        },
        reasons: [...match.reasons, 'ML scoring unavailable'],
      };
    }

    const combinedScore =
      match.score * ruleWeight + mlResult.mlScore * mlWeight;

    const enhancedReasons = [
      ...match.reasons,
      ...mlResult.strengths.map((s) => `[ML] ${s}`),
      ...mlResult.riskFactors.map((r) => `[ML Risk] ${r}`),
    ];

    return {
      contractorId: match.contractorId,
      combinedScore: Math.round(combinedScore * 10) / 10,
      ruleScore: match.score,
      mlScore: mlResult.mlScore,
      mlResult,
      reasons: enhancedReasons,
    };
  });

  // Re-sort by combined score
  enhanced.sort((a, b) => b.combinedScore - a.combinedScore);

  return enhanced;
}

/**
 * Get ML match summary for admin dashboard
 */
export async function getMLMatchSummary(
  bookingId: string
): Promise<{
  bookingId: string;
  matchCount: number;
  topScore: number;
  averageScore: number;
  averageConfidence: number;
  commonRisks: string[];
  commonStrengths: string[];
} | null> {
  // This would query stored ML match results
  // For now, return null as we need to store results first
  return null;
}
