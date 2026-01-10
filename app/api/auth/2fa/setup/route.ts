/**
 * Two-Factor Authentication (2FA) Setup Endpoint
 *
 * POST /api/auth/2fa/setup
 * Enable 2FA for the authenticated user
 *
 * Request:
 * ```json
 * {
 *   "email": "user@example.com"
 * }
 * ```
 *
 * Response on success:
 * ```json
 * {
 *   "success": true,
 *   "secret": "JBSWY3DPEBLW64TMMQQ",
 *   "qrCode": "data:image/png;base64,...",
 *   "backupCodes": ["XXXX-XXXX-XXXX", ...],
 *   "manualEntryKey": "JBSWY3DPEBLW64TMMQQ"
 * }
 * ```
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { twoFactorService } from '@/lib/auth/two-factor';
import { prisma } from '@/lib/db';
import { logInfo, logError } from '@/lib/logger/helpers';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email } = await request.json();

    // Verify email matches authenticated user
    if (email !== session.user.email) {
      return NextResponse.json(
        { error: 'Email mismatch' },
        { status: 403 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if 2FA is already enabled
    if (user.twoFactorEnabled) {
      logInfo('2FA setup attempted for user with 2FA already enabled', {
        userId: user.id,
        email: user.email,
      });

      return NextResponse.json(
        { error: '2FA is already enabled for this account' },
        { status: 400 }
      );
    }

    // Generate 2FA secret and QR code
    const setup = await twoFactorService.generateSecret(
      user.id,
      user.email,
      'Disaster Recovery NRPG'
    );

    logInfo('2FA secret generated', {
      userId: user.id,
      email: user.email,
      backupCodesCount: setup.backupCodes.length,
    });

    return NextResponse.json({
      success: true,
      secret: setup.secret,
      qrCode: setup.qrCode,
      backupCodes: setup.backupCodes,
      manualEntryKey: setup.manualEntryKey,
    });
  } catch (error) {
    logError(error, { context: '2fa_setup_endpoint' });
    return NextResponse.json(
      { error: 'Failed to setup 2FA' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/2fa/setup
 * Check if user has 2FA enabled
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        twoFactorEnabled: true,
        twoFactorSetupAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      twoFactorEnabled: user.twoFactorEnabled,
      twoFactorSetupAt: user.twoFactorSetupAt,
    });
  } catch (error) {
    logError(error, { context: '2fa_get_status_endpoint' });
    return NextResponse.json(
      { error: 'Failed to get 2FA status' },
      { status: 500 }
    );
  }
}
