// @ts-nocheck
/**
 * Signed URL Generation API
 *
 * POST /api/storage/signed-url - Generate a presigned URL for secure file access
 *
 * This endpoint generates temporary signed URLs for downloading files from cloud storage.
 * The URLs expire after a specified time, providing secure time-limited access.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { z } from 'zod';
import { storageManager } from '@/src/lib/storage/storage-manager';

// Validation schema
const signedUrlSchema = z.object({
  fileId: z.string().min(1, 'File ID is required'),
  expiresIn: z.number().min(60).max(86400).default(3600), // 1 minute to 24 hours, default 1 hour
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const body = await request.json();

    // Validate input
    const validatedData = signedUrlSchema.parse(body);

    // Check if file exists and user has access
    const metadata = await storageManager.getFileMetadata(validatedData.fileId);
    if (!metadata) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FILE_NOT_FOUND',
            message: 'File not found',
          },
        },
        { status: 404 }
      );
    }

    // Check if user owns the file (unless it's public or user is admin)
    const { user, role } = authResult.context;
    const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';
    const ownsFile = metadata.uploadedBy === user.id;
    const isPublic = metadata.isPublic;

    if (!isAdmin && !ownsFile && !isPublic) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'FORBIDDEN',
            message: 'You do not have permission to access this file',
          },
        },
        { status: 403 }
      );
    }

    // Generate signed URL
    const signedUrl = await storageManager.getFileUrl(validatedData.fileId, validatedData.expiresIn);

    return NextResponse.json({
      success: true,
      data: {
        signedUrl,
        expiresIn: validatedData.expiresIn,
        expiresAt: new Date(Date.now() + validatedData.expiresIn * 1000).toISOString(),
        metadata: {
          filename: metadata.filename,
          originalName: metadata.originalName,
          mimeType: metadata.mimeType,
          size: metadata.size,
          category: metadata.category,
        },
      },
    });
  } catch (error: any) {
    console.error('[Signed URL] Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SIGNED_URL_ERROR',
          message: error.message || 'Failed to generate signed URL',
        },
      },
      { status: 500 }
    );
  }
}
