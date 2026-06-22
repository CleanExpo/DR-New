/**
 * Two-Factor Authentication (2FA) Verify/Manage Endpoint
 *
 * POST   /api/auth/2fa/verify — Verify TOTP code and activate 2FA
 * PUT    /api/auth/2fa/verify — Verify TOTP at login (check-only, no state change)
 * DELETE /api/auth/2fa/verify — Disable 2FA (requires TOTP confirmation)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { twoFactorService } from '@/lib/auth/two-factor';

export const dynamic = 'force-dynamic';

// POST: verify TOTP to activate 2FA after setup
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { token } = body as { token?: string };

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'TOTP token is required' },
        { status: 400 }
      );
    }

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        twoFactorEnabled: true,
        twoFactorSecret: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (userData.twoFactorEnabled) {
      return NextResponse.json(
        { success: false, error: '2FA is already active' },
        { status: 400 }
      );
    }

    if (!userData.twoFactorSecret) {
      return NextResponse.json(
        { success: false, error: '2FA setup not initiated. Call POST /api/auth/2fa/setup first.' },
        { status: 400 }
      );
    }

    const isValid = twoFactorService.verifyTOTP(userData.twoFactorSecret, token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired TOTP code' },
        { status: 400 }
      );
    }

    // Activate 2FA
    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: true,
        twoFactorSetupAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: '2FA has been successfully enabled',
    });
  } catch (error) {
    console.error('2FA verify error:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA setup' }, { status: 500 });
  }
}

// PUT: verify TOTP at login (read-only, returns valid/invalid)
export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { token, backupCode } = body as { token?: string; backupCode?: string };

    if (!token && !backupCode) {
      return NextResponse.json(
        { success: false, error: 'Either a TOTP token or backup code is required' },
        { status: 400 }
      );
    }

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        twoFactorEnabled: true,
        twoFactorSecret: true,
        twoFactorBackupCodes: true,
      },
    });

    if (!userData || !userData.twoFactorEnabled || !userData.twoFactorSecret) {
      return NextResponse.json(
        { success: false, error: '2FA is not enabled for this account' },
        { status: 400 }
      );
    }

    // Try TOTP first
    if (token) {
      const isValid = twoFactorService.verifyTOTP(userData.twoFactorSecret, token);
      if (isValid) {
        return NextResponse.json({ success: true, method: 'totp' });
      }
    }

    // Try backup code
    if (backupCode) {
      const matchIndex = userData.twoFactorBackupCodes.findIndex((hashed) =>
        twoFactorService.verifyBackupCode(backupCode, hashed)
      );

      if (matchIndex !== -1) {
        // Consume the backup code (remove it from the array)
        const updatedCodes = [...userData.twoFactorBackupCodes];
        updatedCodes.splice(matchIndex, 1);

        await db.user.update({
          where: { id: user.id },
          data: { twoFactorBackupCodes: updatedCodes },
        });

        return NextResponse.json({
          success: true,
          method: 'backup_code',
          remainingBackupCodes: updatedCodes.length,
        });
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid 2FA code' },
      { status: 401 }
    );
  } catch (error) {
    console.error('2FA login verify error:', error);
    return NextResponse.json({ error: 'Failed to verify 2FA code' }, { status: 500 });
  }
}

// DELETE: disable 2FA (requires valid TOTP confirmation)
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const body = await request.json();
    const { token } = body as { token?: string };

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'TOTP token is required to disable 2FA' },
        { status: 400 }
      );
    }

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        twoFactorEnabled: true,
        twoFactorSecret: true,
      },
    });

    if (!userData || !userData.twoFactorEnabled || !userData.twoFactorSecret) {
      return NextResponse.json(
        { success: false, error: '2FA is not enabled for this account' },
        { status: 400 }
      );
    }

    const isValid = twoFactorService.verifyTOTP(userData.twoFactorSecret, token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid TOTP code' },
        { status: 401 }
      );
    }

    // Disable and clear all 2FA data
    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
        twoFactorSetupAt: null,
        twoFactorBackupCodes: [],
      },
    });

    return NextResponse.json({
      success: true,
      message: '2FA has been disabled',
    });
  } catch (error) {
    console.error('2FA disable error:', error);
    return NextResponse.json({ error: 'Failed to disable 2FA' }, { status: 500 });
  }
}
