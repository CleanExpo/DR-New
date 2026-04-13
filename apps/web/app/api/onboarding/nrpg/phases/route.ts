/**
 * NRPG Onboarding Phases API
 * GET: Retrieve contractor's phase progress
 * PATCH: Update phase checklist items
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import type { PrismaClient, NRPGOnboardingPhase } from '@prisma/client';

import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const patchSchema = z.object({
  // Phase 1
  applicationSubmitted: z.boolean().optional(),
  eligibilityReviewed: z.boolean().optional(),
  backgroundCheckInitiated: z.boolean().optional(),
  // Phase 2
  carsiOnboarded: z.boolean().optional(),
  associationIntegrated: z.boolean().optional(),
  competencyVerified: z.boolean().optional(),
  // Phase 3
  standardsTrainingComplete: z.boolean().optional(),
  commitmentSigned: z.boolean().optional(),
  platformActivated: z.boolean().optional(),
  // Phase 4
  performanceReviewScore: z.number().int().min(0).max(100).optional(),
  fullCertificationGranted: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

function getCurrentPhase(phases: NRPGOnboardingPhase): number {
  if (phases.phase4Status === 'IN_PROGRESS') return 4;
  if (phases.phase3Status === 'IN_PROGRESS' || phases.phase3Status === 'NOT_STARTED') return 3;
  if (phases.phase2Status === 'IN_PROGRESS' || phases.phase2Status === 'NOT_STARTED') return 2;
  return 1;
}

function calculateOverallProgress(phases: NRPGOnboardingPhase): number {
  let completed = 0;
  const total = 12; // 3 items per phase × 4 phases

  if (phases.applicationSubmitted) completed++;
  if (phases.eligibilityReviewed) completed++;
  if (phases.backgroundCheckInitiated) completed++;
  if (phases.carsiOnboarded) completed++;
  if (phases.associationIntegrated) completed++;
  if (phases.competencyVerified) completed++;
  if (phases.standardsTrainingComplete) completed++;
  if (phases.commitmentSigned) completed++;
  if (phases.platformActivated) completed++;
  if (phases.fullCertificationGranted) completed += 3;
  else if (phases.phase4Status === 'IN_PROGRESS') completed += 1;

  return Math.round((completed / total) * 100);
}

/**
 * Auto-update phase transition statuses after a checklist item changes.
 * db must be passed explicitly — it is NOT available at module scope.
 */
async function updatePhaseStatuses(
  contractorId: string,
  db: PrismaClient
): Promise<void> {
  const phases = await db.nRPGOnboardingPhase.findUnique({
    where: { contractorId },
  });

  if (!phases) return;

  const updates: Partial<NRPGOnboardingPhase> = {};
  const now = new Date();

  // Phase 1 → Phase 2 transition
  const phase1Complete =
    phases.applicationSubmitted &&
    phases.eligibilityReviewed &&
    phases.backgroundCheckInitiated;

  if (phase1Complete && phases.phase1Status !== 'COMPLETED') {
    updates.phase1Status = 'COMPLETED';
    updates.phase1CompleteDate = now;
    updates.phase2Status = 'IN_PROGRESS';
    updates.phase2StartDate = now;
  } else if (
    !phase1Complete &&
    (phases.applicationSubmitted || phases.eligibilityReviewed || phases.backgroundCheckInitiated) &&
    phases.phase1Status === 'NOT_STARTED'
  ) {
    updates.phase1Status = 'IN_PROGRESS';
    updates.phase1StartDate = now;
  }

  // Phase 2 → Phase 3 transition
  const phase2Complete =
    phases.carsiOnboarded && phases.associationIntegrated && phases.competencyVerified;

  if (phase2Complete && phases.phase2Status !== 'COMPLETED') {
    updates.phase2Status = 'COMPLETED';
    updates.phase2CompleteDate = now;
    updates.phase3Status = 'IN_PROGRESS';
    updates.phase3StartDate = now;
  }

  // Phase 3 → Phase 4 transition
  const phase3Complete =
    phases.standardsTrainingComplete && phases.commitmentSigned && phases.platformActivated;

  if (phase3Complete && phases.phase3Status !== 'COMPLETED') {
    updates.phase3Status = 'COMPLETED';
    updates.phase3CompleteDate = now;
    updates.phase4Status = 'IN_PROGRESS';
    updates.phase4StartDate = now;
    // 90-day probation window
    updates.probationEndDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
  }

  // Phase 4 completion
  if (phases.fullCertificationGranted && phases.phase4Status !== 'COMPLETED') {
    updates.phase4Status = 'COMPLETED';
    updates.phase4CompleteDate = now;
    updates.overallStatus = 'COMPLETED';
  }

  // Overall status
  if (phase1Complete || phase2Complete || phase3Complete) {
    if (updates.overallStatus !== 'COMPLETED') {
      updates.overallStatus = 'IN_PROGRESS';
    }
  }

  if (Object.keys(updates).length > 0) {
    await db.nRPGOnboardingPhase.update({
      where: { contractorId },
      data: updates,
    });
  }
}

// ---------------------------------------------------------------------------
// Route handlers
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const contractor = await db.contractor.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Get or create phase record
    let phases = await db.nRPGOnboardingPhase.findUnique({
      where: { contractorId: contractor.id },
    });

    if (!phases) {
      phases = await db.nRPGOnboardingPhase.create({
        data: {
          contractorId: contractor.id,
          phase1Status: 'NOT_STARTED',
          phase2Status: 'NOT_STARTED',
          phase3Status: 'NOT_STARTED',
          phase4Status: 'NOT_STARTED',
          overallStatus: 'NOT_STARTED',
        },
      });
    }

    const phaseSummary = {
      phase1: {
        status: phases.phase1Status,
        startDate: phases.phase1StartDate,
        completeDate: phases.phase1CompleteDate,
        checklist: [
          { key: 'applicationSubmitted', label: 'Application Submitted', complete: phases.applicationSubmitted },
          { key: 'eligibilityReviewed', label: 'Eligibility Reviewed', complete: phases.eligibilityReviewed },
          { key: 'backgroundCheckInitiated', label: 'Background Check Initiated', complete: phases.backgroundCheckInitiated },
        ],
        completedItems: [phases.applicationSubmitted, phases.eligibilityReviewed, phases.backgroundCheckInitiated].filter(Boolean).length,
        totalItems: 3,
      },
      phase2: {
        status: phases.phase2Status,
        startDate: phases.phase2StartDate,
        completeDate: phases.phase2CompleteDate,
        checklist: [
          { key: 'carsiOnboarded', label: 'CARSI Platform Onboarded', complete: phases.carsiOnboarded },
          { key: 'associationIntegrated', label: 'Association Integrated', complete: phases.associationIntegrated },
          { key: 'competencyVerified', label: 'Competency Verified', complete: phases.competencyVerified },
        ],
        completedItems: [phases.carsiOnboarded, phases.associationIntegrated, phases.competencyVerified].filter(Boolean).length,
        totalItems: 3,
      },
      phase3: {
        status: phases.phase3Status,
        startDate: phases.phase3StartDate,
        completeDate: phases.phase3CompleteDate,
        checklist: [
          { key: 'standardsTrainingComplete', label: 'Standards Training Complete', complete: phases.standardsTrainingComplete },
          { key: 'commitmentSigned', label: 'Commitment Framework Signed', complete: phases.commitmentSigned },
          { key: 'platformActivated', label: 'Platform Activated', complete: phases.platformActivated },
        ],
        completedItems: [phases.standardsTrainingComplete, phases.commitmentSigned, phases.platformActivated].filter(Boolean).length,
        totalItems: 3,
      },
      phase4: {
        status: phases.phase4Status,
        startDate: phases.phase4StartDate,
        completeDate: phases.phase4CompleteDate,
        probationEndDate: phases.probationEndDate,
        performanceReviewScore: phases.performanceReviewScore,
        fullCertificationGranted: phases.fullCertificationGranted,
        daysRemaining: phases.probationEndDate
          ? Math.max(0, Math.ceil((new Date(phases.probationEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
          : null,
      },
      backgroundChecks: {
        criminal: { status: phases.criminalCheckStatus, date: phases.criminalCheckDate, ref: phases.criminalCheckRef },
        financial: { status: phases.financialCheckStatus, date: phases.financialCheckDate, ref: phases.financialCheckRef },
        professional: { status: phases.professionalCheckStatus, date: phases.professionalCheckDate, ref: phases.professionalCheckRef },
        insurance: { status: phases.insuranceCheckStatus, date: phases.insuranceCheckDate, ref: phases.insuranceCheckRef },
        allPass: phases.allChecksPass,
      },
      overall: {
        status: phases.overallStatus,
        currentPhase: getCurrentPhase(phases),
        percentComplete: calculateOverallProgress(phases),
      },
    };

    return NextResponse.json({
      success: true,
      data: {
        phases,
        summary: phaseSummary,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const validation = patchSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const input = validation.data;

    const contractor = await db.contractor.findFirst({
      where: { userId: user.id },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Build update data from validated input
    const updateData: Partial<NRPGOnboardingPhase> = {};

    if (input.applicationSubmitted !== undefined) updateData.applicationSubmitted = input.applicationSubmitted;
    if (input.eligibilityReviewed !== undefined) updateData.eligibilityReviewed = input.eligibilityReviewed;
    if (input.backgroundCheckInitiated !== undefined) updateData.backgroundCheckInitiated = input.backgroundCheckInitiated;
    if (input.carsiOnboarded !== undefined) updateData.carsiOnboarded = input.carsiOnboarded;
    if (input.associationIntegrated !== undefined) updateData.associationIntegrated = input.associationIntegrated;
    if (input.competencyVerified !== undefined) updateData.competencyVerified = input.competencyVerified;
    if (input.standardsTrainingComplete !== undefined) updateData.standardsTrainingComplete = input.standardsTrainingComplete;
    if (input.commitmentSigned !== undefined) {
      updateData.commitmentSigned = input.commitmentSigned;
      if (input.commitmentSigned) updateData.commitmentSignedAt = new Date();
    }
    if (input.platformActivated !== undefined) updateData.platformActivated = input.platformActivated;
    if (input.performanceReviewScore !== undefined) updateData.performanceReviewScore = input.performanceReviewScore;
    if (input.fullCertificationGranted !== undefined) updateData.fullCertificationGranted = input.fullCertificationGranted;

    await db.nRPGOnboardingPhase.update({
      where: { contractorId: contractor.id },
      data: updateData,
    });

    // Auto-update phase transition statuses — pass db explicitly
    await updatePhaseStatuses(contractor.id, db);

    const updatedPhases = await db.nRPGOnboardingPhase.findUnique({
      where: { contractorId: contractor.id },
    });

    return NextResponse.json({
      success: true,
      data: updatedPhases,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
