/**
 * Signed Upload URL API
 *
 * Generates signed parameters for client-side Cloudinary uploads
 * This allows direct browser-to-Cloudinary uploads without exposing API secrets
 *
 * Used by: Public claim form photo uploads
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  generateSignedUploadParams,
  getUploadUrl,
} from '@/lib/cloudinary/upload';
import { isCloudinaryConfigured } from '@/lib/cloudinary/config';

export const dynamic = 'force-dynamic';

/**
 * GET /api/upload/signed-url
 *
 * Returns signed parameters for client-side upload
 * Query params:
 *   - folder: (optional) subfolder for organization (default: 'claims')
 */
export async function GET(request: NextRequest) {
  try {
    // Check if Cloudinary is configured
    if (!isCloudinaryConfigured()) {
      // Return mock response for development
      const isDev = process.env.NODE_ENV === 'development';
      if (isDev) {
        return NextResponse.json({
          success: true,
          mock: true,
          message: 'Cloudinary not configured. Using mock upload in development.',
          uploadUrl: '/api/upload/mock',
          params: {
            timestamp: Math.floor(Date.now() / 1000),
            signature: 'mock_signature',
            apiKey: 'mock_api_key',
            cloudName: 'mock_cloud',
            folder: 'disaster_recovery/claims',
          },
        });
      }

      return NextResponse.json(
        {
          success: false,
          error: 'Upload service not configured',
        },
        { status: 503 }
      );
    }

    // Get folder from query params
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'claims';

    // Validate folder name (prevent directory traversal)
    const safeFolderPattern = /^[a-zA-Z0-9_-]+$/;
    if (!safeFolderPattern.test(folder)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid folder name',
        },
        { status: 400 }
      );
    }

    // Generate signed parameters
    const params = generateSignedUploadParams(folder);
    const uploadUrl = getUploadUrl();

    return NextResponse.json({
      success: true,
      uploadUrl,
      params,
    });
  } catch (error) {
    console.error('Error generating signed upload URL:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate upload URL',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/upload/signed-url
 *
 * Alternative endpoint for generating signed URL with more options
 */
export async function POST(request: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Upload service not configured',
        },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { folder = 'claims', count = 1 } = body;

    // Validate count (max 5 for claims)
    if (count > 5) {
      return NextResponse.json(
        {
          success: false,
          error: 'Maximum 5 uploads allowed per request',
        },
        { status: 400 }
      );
    }

    // Generate params (same signature works for multiple uploads)
    const params = generateSignedUploadParams(folder);
    const uploadUrl = getUploadUrl();

    return NextResponse.json({
      success: true,
      uploadUrl,
      params,
      maxUploads: count,
    });
  } catch (error) {
    console.error('Error generating signed upload URL:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate upload URL',
      },
      { status: 500 }
    );
  }
}
