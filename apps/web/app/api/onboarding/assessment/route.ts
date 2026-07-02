import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import {
  getNrpgQuizModule,
  parseNrpgModuleNumber,
  gradeNrpgQuizSubmission,
} from '@/lib/training/nrp-training';
import {
  NRPG_CERTIFICATION_NAME,
  getNrpgCertificationExpiryDate,
  isNrpgTrainingSetComplete,
} from '@/lib/training/training-policy';

export const dynamic = 'force-dynamic';

/**
 * DR-892: the client submits ANSWERS, never a score. Any extra fields (e.g. a
 * forged `score`/`passed`) are dropped by the schema and never read — the
 * stored score is always recomputed server-side from the sealed answer key.
 */
const assessmentSchema = z.object({
  contractorId: z.string().min(1),
  moduleId: z.string().min(1),
  // Map of questionId -> selected option index.
  answers: z.record(z.string(), z.number().int().min(0)),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    const db = getTenantDb(authResult.context);

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const validation = assessmentSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { contractorId, moduleId, answers } = validation.data;
    const effectiveContractorId = user.userType === 'CONTRACTOR' ? user.id : contractorId;

    if (user.userType === 'CONTRACTOR' && contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized assessment submission', 403);
    }

    // Server-side grading against the sealed answer key (DR-892).
    const moduleNumber = parseNrpgModuleNumber(moduleId);
    if (!moduleNumber) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'Unsupported moduleId for assessment', 400, { moduleId });
    }

    const quizModule = await getNrpgQuizModule(moduleNumber);
    if (!quizModule) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Quiz module not found', 404, { moduleId });
    }

    const grade = gradeNrpgQuizSubmission(quizModule, answers);

    const onboarding = await db.contractorOnboarding.findUnique({
      where: { contractorId: effectiveContractorId },
      include: { moduleProgress: true },
    });

    if (!onboarding) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Onboarding not found', 404);
    }

    const moduleProgress = onboarding.moduleProgress.find(m => m.moduleId === moduleId);
    if (!moduleProgress) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'Module not found for contractor onboarding', 400);
    }

    const ordered = [...onboarding.moduleProgress].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const current = ordered.find((m) => m.status !== 'COMPLETED') ?? null;
    const isAllowed =
      (current && current.moduleId === moduleId) ||
      moduleProgress.status === 'IN_PROGRESS' ||
      moduleProgress.status === 'FAILED';

    if (!isAllowed) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Module assessment is locked until previous modules are completed',
        400,
        { currentModuleId: current?.moduleId ?? null }
      );
    }

    const { score, passingScore, passed } = grade;

    await db.$transaction(async (tx) => {
      await tx.contractorAssessment.create({
        data: {
          onboardingId: onboarding.id,
          moduleId,
          assessmentType: 'QUIZ',
          score,
          maxScore: 100,
          completedAt: new Date(),
          feedback: passed ? 'Passed' : 'Needs review',
        },
      });

      await tx.contractorModuleProgress.update({
        where: { id: moduleProgress.id },
        data: {
          startedAt: moduleProgress.startedAt ?? new Date(),
          completedAt: passed ? new Date() : null,
          completed: passed,
          status: passed ? 'COMPLETED' : 'FAILED',
          progress: passed ? 100 : Math.max(moduleProgress.progress, 25),
        },
      });

      const refreshed = await tx.contractorModuleProgress.findMany({
        where: { onboardingId: onboarding.id },
        select: { moduleId: true, status: true },
      });

      // DR-893: completion is SET-EQUALITY against the canonical NRP-001..024
      // module set — a count-based check is forgeable with duplicate rows and
      // passes short-seeded onboardings (e.g. 5/5).
      const passedModuleIds = refreshed
        .filter((m) => m.status === 'COMPLETED')
        .map((m) => m.moduleId);
      const allComplete = isNrpgTrainingSetComplete(passedModuleIds);

      await tx.contractorOnboarding.update({
        where: { id: onboarding.id },
        data: allComplete
          ? { status: 'COMPLETED', actualCompletionDate: new Date() }
          : { status: 'IN_PROGRESS' },
      });

      if (allComplete) {
        // DR-893: auto-issue the certification on genuine completion. Idempotent —
        // scoped to a LIVE cert so re-completion never duplicates a row, while a
        // renewal after expiry issues a fresh row (audit history preserved).
        const issueDate = new Date();
        const existingCert = await tx.contractorCertification.findFirst({
          where: {
            contractorId: effectiveContractorId,
            certificationName: NRPG_CERTIFICATION_NAME,
            expiryDate: { gt: issueDate },
          },
          select: { id: true },
        });

        if (!existingCert) {
          await tx.contractorCertification.create({
            data: {
              contractorId: effectiveContractorId,
              certificationName: NRPG_CERTIFICATION_NAME,
              certificationLevel: 1,
              issueDate,
              // Validity comes from the single policy source.
              expiryDate: getNrpgCertificationExpiryDate(issueDate),
              specializations: onboarding.specialization ? [onboarding.specialization] : [],
              // Server-side grading of all 24 modules IS the verification.
              verified: true,
            },
          });
        }
      }
    });

    return NextResponse.json({
      success: true,
      passed,
      score,
      passingScore,
      result: {
        total: grade.total,
        correctCount: grade.correctCount,
        // Per-question key material is revealed only AFTER a graded submission.
        results: grade.results,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
