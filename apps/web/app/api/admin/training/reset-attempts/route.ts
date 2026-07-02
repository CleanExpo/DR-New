import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import {
  NRPG_ATTEMPT_VOID_PREFIX,
  NRPG_QUIZ_PASSING_SCORE,
  isVoidedNrpgAttempt,
} from '@/lib/training/training-policy';

export const dynamic = 'force-dynamic';

/**
 * DR-894 — Admin reset of a contractor's quiz attempt state for one module.
 *
 * ContractorAssessment has no status column and DR-894 makes no schema
 * changes, so "reset" = void the counted (failed, non-voided) attempt rows by
 * prefixing their `feedback` with NRPG_ATTEMPT_VOID_PREFIX. The retake policy
 * (`evaluateNrpgRetakePolicy`) excludes voided rows, so this both clears the
 * attempt cap AND ends any active cooldown. The rows themselves are preserved
 * (audit history), and an AuditLog row records who reset what and why.
 */
const resetSchema = z.object({
  contractorId: z.string().min(1),
  moduleId: z.string().min(1),
  reason: z.string().max(500).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const validation = resetSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { contractorId, moduleId, reason } = validation.data;
    const db = getTenantDb(authResult.context);

    const onboarding = await db.contractorOnboarding.findUnique({
      where: { contractorId },
      include: { moduleProgress: true },
    });
    if (!onboarding) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Onboarding not found for contractor', 404);
    }

    const attempts = await db.contractorAssessment.findMany({
      where: { onboardingId: onboarding.id, moduleId },
      select: { id: true, score: true, feedback: true },
    });

    // Void only the rows the retake policy counts: failed, not already voided.
    const toVoid = attempts.filter(
      (a: { id: string; score: number | null; feedback: string | null }) =>
        !isVoidedNrpgAttempt(a) && !(typeof a.score === 'number' && a.score >= NRPG_QUIZ_PASSING_SCORE)
    );
    const voidMarker = `${NRPG_ATTEMPT_VOID_PREFIX}ADMIN_RESET:${user.id}:${new Date().toISOString()}`;
    const moduleProgress = onboarding.moduleProgress.find(
      (m: { moduleId: string }) => m.moduleId === moduleId
    );

    await db.$transaction(async (tx) => {
      if (toVoid.length > 0) {
        await tx.contractorAssessment.updateMany({
          where: { id: { in: toVoid.map((a: { id: string }) => a.id) } },
          data: { feedback: voidMarker },
        });
      }

      // Reopen a FAILED module so the contractor sees a Retry state again.
      if (moduleProgress && moduleProgress.status === 'FAILED') {
        await tx.contractorModuleProgress.update({
          where: { id: moduleProgress.id },
          data: { status: 'IN_PROGRESS', completed: false, completedAt: null },
        });
      }

      // Spec (DR-894): admin reset must leave an audit row.
      await tx.auditLog.create({
        data: {
          action: 'TRAINING_ATTEMPTS_RESET',
          entityType: 'ContractorAssessment',
          entityId: onboarding.id,
          performedBy: user.id,
          newValues: {
            contractorId,
            moduleId,
            voidedAttemptIds: toVoid.map((a: { id: string }) => a.id),
            reason: reason ?? null,
          },
        },
      });
    });

    return NextResponse.json({
      success: true,
      contractorId,
      moduleId,
      voidedAttempts: toVoid.length,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
