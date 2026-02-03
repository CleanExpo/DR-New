import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; // Force Node.js runtime for filesystem access

const paramsSchema = z.object({
  moduleId: z.string().regex(/^(NRP-\d{3}|CSE-M\d{2}|WRT-M\d{2})$/i),
});

export async function GET(request: NextRequest, context: { params: { moduleId: string } }) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const validation = paramsSchema.safeParse(context.params);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const moduleId = validation.data.moduleId.toUpperCase();

    // Serve pre-generated static JSON file
    const staticFilePath = path.join(process.cwd(), 'public', 'training-modules', `${moduleId}.json`);

    try {
      const staticData = await fs.readFile(staticFilePath, 'utf8');
      const moduleData = JSON.parse(staticData);
      return NextResponse.json(moduleData);
    } catch (error) {
      // If static file doesn't exist, return 404
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
