/**
 * Storage Cleanup API
 *
 * DELETE /api/admin/storage/cleanup - Clean up expired files from storage
 *
 * This endpoint should be called by a cron job (e.g., daily) to remove
 * files that have passed their expiration date.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole } from '@/lib/auth-middleware';
import { storageManager } from '@/src/lib/storage/storage-manager';

export async function DELETE(request: NextRequest) {
  try {
    // Authenticate and require ADMIN role
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const roleCheck = requireRole(authResult.context, ['ADMIN', 'SUPER_ADMIN']);
    if (!roleCheck.authorized) {
      return roleCheck.response;
    }

    // Clean up expired files
    const deletedCount = await storageManager.cleanupExpiredFiles();

    // Get current storage stats
    const stats = await storageManager.getStorageStats();

    return NextResponse.json({
      success: true,
      data: {
        deletedCount,
        stats,
        provider: storageManager.getProvider(),
        cleanedAt: new Date().toISOString(),
      },
      message: `Successfully deleted ${deletedCount} expired file(s)`,
    });
  } catch (error) {
    console.error('[Storage Cleanup] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CLEANUP_ERROR',
          message: error instanceof Error ? error.message : 'Failed to clean up storage',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/storage/cleanup - Get cleanup preview (what would be deleted)
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate and require ADMIN role
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const roleCheck = requireRole(authResult.context, ['ADMIN', 'SUPER_ADMIN']);
    if (!roleCheck.authorized) {
      return roleCheck.response;
    }

    // Get current storage stats
    const stats = await storageManager.getStorageStats();

    return NextResponse.json({
      success: true,
      data: {
        stats,
        provider: storageManager.getProvider(),
        message: 'Use DELETE method to perform cleanup',
      },
    });
  } catch (error) {
    console.error('[Storage Cleanup] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'STATS_ERROR',
          message: error instanceof Error ? error.message : 'Failed to get storage stats',
        },
      },
      { status: 500 }
    );
  }
}
