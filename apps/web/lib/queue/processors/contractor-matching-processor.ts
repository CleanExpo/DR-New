/**
 * Contractor Matching Background Job Processor
 *
 * Executes AI-powered contractor matching workflow for submitted claims.
 * Integrates with LangGraph workflow and creates ContractorMatch records.
 */

import { basePrisma } from '@/lib/prisma';
import { getOrchestrator } from '@/lib/agents/core/orchestrator';
import { createJob } from '../background-jobs';

// ============================================================================
// Types
// ============================================================================

interface ContractorMatchingInput {
  claimId: string;
  criteria: {
    serviceType: string;
    location: {
      state: string;
      suburb: string;
      postcode: string;
    };
    urgency: 'emergency' | 'urgent' | 'standard' | 'flexible';
    budget?: number;
    preferredAvailability?: string;
    specialRequirements?: string[];
  };
}

interface WorkflowResult {
  recommendedMatch: string;
  matchingRationale: string;
  eligibleContractorCount: number;
  searchRadius: number;
  contractorDetails: {
    contractorId: string;
    businessName: string;
    userEmail: string;
    specialties: string[];
    certifications: string[];
    rating: number;
    completedJobs: number;
    responseTimeMinutes: number;
    isNrpgVerified: boolean;
    publicLiability: number;
  } | null;
  alternativeMatches: Array<{
    contractorId: string;
    businessName: string;
    score: number;
    reason: string;
  }>;
  noMatchReason: string;
  scoredMatches: Array<{
    contractorId: string;
    score: number;
    reasons: string[];
  }>;
  searchCriteria: {
    serviceType: string;
    location: string;
    urgency: string;
    budget?: number;
  };
}

interface ProcessorOutput {
  claimId: string;
  matchingCompleted: boolean;
  matchedContractorCount: number;
  recommendedContractorId: string | null;
  notificationJobsQueued: number;
  searchRadius: number;
  noMatchReason?: string;
}

// ============================================================================
// Main Processor
// ============================================================================

/**
 * Process contractor matching job
 */
export async function processContractorMatchingJob(
  input: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const { claimId, criteria } = input as ContractorMatchingInput;

  console.log(`[Contractor Matching] Starting for claim ${claimId}`);

  // 1. Validate claim exists
  const claim = await basePrisma.publicClaim.findUnique({
    where: { id: claimId },
    select: {
      id: true,
      status: true,
      priority: true,
      tenantId: true,
      clientName: true,
    },
  });

  if (!claim) {
    throw new Error(`Claim ${claimId} not found`);
  }

  // 2. Execute contractor matching workflow via Agent Orchestrator
  console.log(`[Contractor Matching] Executing AI workflow for claim ${claimId}`);

  const orchestrator = getOrchestrator();

  const workflowResult = await orchestrator.execute({
    workflowType: 'CONTRACTOR_MATCHING',
    input: {
      criteria,
      clientId: claim.id, // Using claimId as clientId for workflow context
    },
    userId: 'system', // System-initiated job
    tenantId: claim.tenantId,
  });

  if (workflowResult.status !== 'COMPLETED') {
    throw new Error(
      `Contractor matching workflow failed: ${workflowResult.error || 'Unknown error'}`
    );
  }

  const result = workflowResult.output as WorkflowResult;

  console.log(
    `[Contractor Matching] Workflow completed: ${result.scoredMatches.length} matches found`
  );

  // 3. Handle no-match scenario
  if (result.scoredMatches.length === 0 || !result.recommendedMatch) {
    console.warn(`[Contractor Matching] No contractors found for claim ${claimId}`);

    await basePrisma.publicClaim.update({
      where: { id: claimId },
      data: {
        status: 'NO_CONTRACTORS_AVAILABLE',
        notes: result.noMatchReason || 'No contractors available matching criteria',
      },
    });

    // TODO: Send Slack alert to admin
    console.error(
      `[Contractor Matching] ALERT: No contractors available for claim ${claimId} - ${result.noMatchReason}`
    );

    return {
      claimId,
      matchingCompleted: true,
      matchedContractorCount: 0,
      recommendedContractorId: null,
      notificationJobsQueued: 0,
      searchRadius: result.searchRadius,
      noMatchReason: result.noMatchReason,
    } as ProcessorOutput;
  }

  // 4. Create ContractorMatch records for top 5 matches
  console.log(`[Contractor Matching] Creating match records for claim ${claimId}`);

  const matchRecords = await Promise.all(
    result.scoredMatches.map(async (match, index) => {
      const isPrimary = match.contractorId === result.recommendedMatch;
      const isBackup = !isPrimary && index < 5; // Top 5 non-primary are backups

      // Calculate response deadline based on urgency
      const responseDeadline = calculateResponseDeadline(
        criteria.urgency,
        isPrimary
      );

      return basePrisma.contractorMatch.create({
        data: {
          claimId,
          contractorId: match.contractorId,
          matchScore: match.score,
          matchReason: match.reasons,
          notificationStatus: 'PENDING',
          responseDeadline,
          isBackup,
        },
      });
    })
  );

  console.log(
    `[Contractor Matching] Created ${matchRecords.length} ContractorMatch records`
  );

  // 5. Update rotation tracking for all matched contractors
  const contractorIds = result.scoredMatches.map((m) => m.contractorId);

  if (contractorIds.length > 0) {
    // Update lastJobReceivedAt to move contractors to back of rotation queue
    // This ensures fair distribution even when using AI scoring
    const now = new Date();

    await basePrisma.contractorRotation.updateMany({
      where: {
        // Match contractors in this workspace and postcode
        workspace: {
          contractors: {
            some: {
              id: { in: contractorIds },
            },
          },
        },
        postcode: criteria.location.postcode,
      },
      data: {
        lastJobReceivedAt: now,
        totalJobsOffered: { increment: 1 },
      },
    });

    console.log(
      `[Contractor Matching] Updated rotation tracking for ${contractorIds.length} contractors`
    );
  }

  // 6. Update claim status
  await basePrisma.publicClaim.update({
    where: { id: claimId },
    data: {
      status: 'CONTRACTORS_MATCHED',
      notes: result.matchingRationale,
    },
  });

  // 7. Queue contractor notification jobs (only for primary match initially)
  const primaryMatch = matchRecords.find(
    (m) => m.contractorId === result.recommendedMatch
  );

  if (primaryMatch) {
    await createJob(
      'CONTRACTOR_NOTIFICATION',
      {
        matchId: primaryMatch.id,
        claimId,
        contractorId: primaryMatch.contractorId,
        urgency: criteria.urgency,
        isPrimary: true,
      },
      {
        priority: criteria.urgency === 'emergency' ? 1 : criteria.urgency === 'urgent' ? 2 : 5,
        claimId,
        tenantId: claim.tenantId,
      }
    );

    console.log(
      `[Contractor Matching] Queued notification job for primary contractor ${primaryMatch.contractorId}`
    );
  }

  // 8. Return processor output
  const output: ProcessorOutput = {
    claimId,
    matchingCompleted: true,
    matchedContractorCount: matchRecords.length,
    recommendedContractorId: result.recommendedMatch,
    notificationJobsQueued: primaryMatch ? 1 : 0,
    searchRadius: result.searchRadius,
  };

  console.log(`[Contractor Matching] Completed for claim ${claimId}:`, output);

  return output;
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Calculate response deadline based on urgency and priority
 */
function calculateResponseDeadline(
  urgency: 'emergency' | 'urgent' | 'standard' | 'flexible',
  isPrimary: boolean
): Date {
  const now = new Date();
  let minutesToAdd = 0;

  if (urgency === 'emergency') {
    minutesToAdd = isPrimary ? 15 : 5; // 15 min primary, 5 min backup
  } else if (urgency === 'urgent') {
    minutesToAdd = isPrimary ? 30 : 10; // 30 min primary, 10 min backup
  } else if (urgency === 'standard') {
    minutesToAdd = isPrimary ? 120 : 30; // 2 hours primary, 30 min backup
  } else {
    // flexible
    minutesToAdd = isPrimary ? 240 : 60; // 4 hours primary, 1 hour backup
  }

  return new Date(now.getTime() + minutesToAdd * 60000);
}
