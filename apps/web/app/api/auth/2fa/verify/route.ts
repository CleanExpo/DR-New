/**
 * Two-Factor Authentication (2FA) Verification Endpoint
 *
 * NOTE: 2FA feature is not yet implemented in the Prisma schema.
 * The User model needs the following fields:
 * - twoFactorEnabled: Boolean
 * - twoFactorSecret: String?
 * - twoFactorSetupAt: DateTime?
 * - twoFactorBackupCodes: String[]
 *
 * This endpoint returns a "feature not available" response until
 * the schema is updated and migrations are run.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // 2FA feature not yet implemented
    return NextResponse.json(
      {
        success: false,
        error: 'Two-factor authentication is not yet available. This feature will be enabled in a future update.',
        code: 'FEATURE_NOT_AVAILABLE',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('2FA verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA setup' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // 2FA feature not yet implemented
    return NextResponse.json(
      {
        success: false,
        error: 'Two-factor authentication is not yet available. This feature will be enabled in a future update.',
        code: 'FEATURE_NOT_AVAILABLE',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('2FA disable error:', error);
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // 2FA feature not yet implemented
    return NextResponse.json(
      {
        success: false,
        error: 'Two-factor authentication is not yet available. This feature will be enabled in a future update.',
        code: 'FEATURE_NOT_AVAILABLE',
      },
      { status: 501 }
    );
  } catch (error) {
    console.error('2FA login verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify 2FA code' },
      { status: 500 }
    );
  }
}
