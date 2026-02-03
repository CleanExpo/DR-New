import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { z } from 'zod';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { promises as fs } from 'fs';
import path from 'path';
import { MODULE_FILENAMES } from '@/lib/training/module-filenames';

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

    // Get the filename from the mapping
    const fileName = MODULE_FILENAMES[moduleId];

    if (!fileName) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        `Training module not found: ${moduleId}`,
        404
      );
    }

    // Read module HTML directly from lib/training/sources
    const htmlFilePath = path.join(process.cwd(), 'lib', 'training', 'sources', 'NRP Folder', fileName);

    try {
      const htmlContent = await fs.readFile(htmlFilePath, 'utf8');

      // Create response matching expected format
      return NextResponse.json({
        success: true,
        module: {
          moduleId,
          title: `${moduleId} Training Module`,
          sourcePath: `lib/training/sources/NRP Folder/${fileName}`,
          sha256: 'runtime',
          html: htmlContent,
        },
      });
    } catch (error) {
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
