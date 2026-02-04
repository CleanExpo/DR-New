import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getTrainingModuleHtmlById } from '@/lib/training/nrp-training';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const paramsSchema = z.object({
  moduleId: z.string().regex(/^(NRP-\d{3}|CSE-M\d{2}|WRT-M\d{2})$/i),
});

// TEMPORARY TEST ENDPOINT - NO AUTH
export async function GET(request: NextRequest, context: { params: { moduleId: string } }) {
  try {
    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const moduleId = validation.data.moduleId.toUpperCase();

    try {
      const trainingModule = await getTrainingModuleHtmlById(moduleId);

      return NextResponse.json({
        success: true,
        module: {
          moduleId,
          sourcePath: trainingModule.sourcePath,
          sha256: trainingModule.sha256,
          htmlLength: trainingModule.html.length,
          htmlPreview: trainingModule.html.substring(0, 200),
        },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load training module';
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        `Training module not found: ${moduleId}`,
        404
      );
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load training module';
    if (message.includes('not found')) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, message, 404);
    }
    return handleUnexpectedError(error);
  }
}
