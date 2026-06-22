/**
 * Two-Factor Authentication (2FA) Setup Endpoint
 *
 * GET  /api/auth/2fa/setup — Get current 2FA status
 * POST /api/auth/2fa/setup — Initiate 2FA setup (generate secret + QR code)
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { twoFactorService } from '@/lib/auth/two-factor';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: {
        twoFactorEnabled: true,
        twoFactorSetupAt: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      twoFactorEnabled: userData.twoFactorEnabled,
      twoFactorSetupAt: userData.twoFactorSetupAt,
    });
  } catch (error) {
    console.error('2FA status error:', error);
    return NextResponse.json({ error: 'Failed to get 2FA status' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Check if already enabled
    const userData = await db.user.findUnique({
      where: { id: user.id },
      select: { twoFactorEnabled: true, email: true },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (userData.twoFactorEnabled) {
      return NextResponse.json(
        { success: false, error: '2FA is already enabled for this account' },
        { status: 400 }
      );
    }

    // Generate secret + QR code + backup codes
    const setup = await twoFactorService.generateSecret(user.id, userData.email, 'NRPG');

    // Hash backup codes for storage
    const hashedBackupCodes = setup.backupCodes.map((code) =>
      twoFactorService.hashBackupCode(code)
    );

    // Store the secret and hashed backup codes (not yet enabled — user must verify first)
    await db.user.update({
      where: { id: user.id },
      data: {
        twoFactorSecret: setup.secret,
        twoFactorBackupCodes: hashedBackupCodes,
      },
    });

    return NextResponse.json({
      success: true,
      qrCode: setup.qrCode,
      manualEntryKey: setup.manualEntryKey,
      backupCodes: setup.backupCodes, // Shown once — user must save these
    });
  } catch (error) {
    console.error('2FA setup error:', error);
    return NextResponse.json({ error: 'Failed to setup 2FA' }, { status: 500 });
  }
}
