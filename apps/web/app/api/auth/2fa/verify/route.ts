/**
 * Two-Factor Authentication (2FA) Verification Endpoint
 *
 * POST /api/auth/2fa/verify
 * Verify TOTP code and enable 2FA for the authenticated user
 *
 * Request:
 * ```json
 * {
 *   "email": "user@example.com",
 *   "secret": "JBSWY3DPEBLW64TMMQQ",
 *   "code": "123456",
 *   "backupCodes": ["XXXX-XXXX-XXXX", ...]
 * }
 * ```
 *
 * Response on success:
 * ```json
 * {
 *   "success": true,
 *   "message": "2FA enabled successfully"
 * }
 * ```
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { basePrisma } from '@/lib/prisma';
import { twoFactorService } from '@/lib/auth/two-factor';
import { logInfo, logError, logWarn } from '@/lib/logger/helpers';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';

interface VerifyRequest {
  email: string;
  secret: string;
  code: string;
  backupCodes: string[];
}

/**
 * Hash backup codes for secure storage
 */
function hashBackupCodes(codes: string[]): string[] {
  return codes.map((code) => twoFactorService.hashBackupCode(code));
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const { email, secret, code, backupCodes }: VerifyRequest = await request.json();

    // Verify email matches authenticated user
    if (email !== user.email) {
      return NextResponse.json(
        { error: 'Email mismatch' },
        { status: 403 }
      );
    }

    // Validate inputs
    if (!secret || !code || !backupCodes || backupCodes.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify TOTP code
    const isCodeValid = twoFactorService.verifyTOTP(secret, code);
    if (!isCodeValid) {
      logWarn('Invalid TOTP code provided during 2FA verification', {
        email,
        code: code.substring(0, 3) + '***', // Log partial code for debugging
      });

      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

    // Get user
    const dbUser = await db.user.findUnique({
      where: { email },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Hash backup codes
    const hashedBackupCodes = hashBackupCodes(backupCodes);

    // Save 2FA settings to database
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        twoFactorSecret: secret,
        twoFactorEnabled: true,
        twoFactorSetupAt: new Date(),
        twoFactorBackupCodes: hashedBackupCodes,
      },
    });

    logInfo('2FA enabled for user', {
      userId: dbUser.id,
      email: dbUser.email,
    });

    return NextResponse.json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    logError(error, { context: '2fa_verify_endpoint' });
    return NextResponse.json(
      { error: 'Failed to verify 2FA setup' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/auth/2fa/verify
 * Disable 2FA for the authenticated user (requires current password confirmation)
 */
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const dbUser = await db.user.findUnique({
      where: { email: user.email },
    });

    if (!dbUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Disable 2FA
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        twoFactorSecret: null,
        twoFactorEnabled: false,
        twoFactorBackupCodes: [],
        twoFactorSetupAt: null,
      },
    });

    logInfo('2FA disabled for user', {
      userId: dbUser.id,
      email: dbUser.email,
    });

    return NextResponse.json({
      success: true,
      message: '2FA disabled successfully',
    });
  } catch (error) {
    logError(error, { context: '2fa_disable_endpoint' });
    return NextResponse.json(
      { error: 'Failed to disable 2FA' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/auth/2fa/verify-login
 * Verify TOTP code during login
 *
 * Used as part of the login flow to verify the TOTP code
 */
export async function PUT(request: NextRequest) {
  try {
    const { email, code, useBackupCode } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Missing email or code' },
        { status: 400 }
      );
    }

    // Get user (using basePrisma since this is pre-auth)
    const user = await basePrisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        twoFactorSecret: true,
        twoFactorBackupCodes: true,
        twoFactorEnabled: true,
      },
    });

    if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
      return NextResponse.json(
        { error: 'User does not have 2FA enabled' },
        { status: 400 }
      );
    }

    let isValid = false;

    if (useBackupCode) {
      // Verify backup code
      if (user.twoFactorBackupCodes && user.twoFactorBackupCodes.length > 0) {
        // Check if backup code matches any hashed code
        for (const hashedCode of user.twoFactorBackupCodes) {
          if (twoFactorService.verifyBackupCode(code, hashedCode)) {
            isValid = true;

            // Remove used backup code
            const updatedCodes = user.twoFactorBackupCodes.filter(
              (hc) => !twoFactorService.verifyBackupCode(code, hc)
            );

            await basePrisma.user.update({
              where: { id: user.id },
              data: { twoFactorBackupCodes: updatedCodes },
            });

            logInfo('Backup code used for 2FA verification', {
              userId: user.id,
              email: user.email,
              remainingCodes: updatedCodes.length,
            });

            break;
          }
        }
      }
    } else {
      // Verify TOTP code
      isValid = twoFactorService.verifyTOTP(user.twoFactorSecret, code);
    }

    if (!isValid) {
      logWarn('Invalid 2FA code during login', {
        email,
        method: useBackupCode ? 'backup_code' : 'totp',
      });

      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 401 }
      );
    }

    logInfo('2FA verification successful during login', {
      userId: user.id,
      email: user.email,
      method: useBackupCode ? 'backup_code' : 'totp',
    });

    return NextResponse.json({
      success: true,
      message: '2FA verification successful',
      verified: true,
    });
  } catch (error) {
    logError(error, { context: '2fa_login_verification' });
    return NextResponse.json(
      { error: 'Failed to verify 2FA code' },
      { status: 500 }
    );
  }
}
