/**
 * Xero Disconnect
 *
 * POST /api/xero/disconnect
 * Revokes the Xero OAuth2 connection and removes stored tokens.
 *
 * Required: ADMIN role
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getXeroClient, loadXeroTokens } from '@/lib/xero/client';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Attempt to revoke the token with Xero
    const tenantId = await loadXeroTokens();
    if (tenantId) {
      try {
        const xero = getXeroClient();
        await xero.revokeToken();
      } catch (revokeErr) {
        // Log but don't fail — we still want to clear local tokens
        console.warn('Failed to revoke Xero token (may already be expired):', revokeErr);
      }
    }

    // Remove all stored tokens
    await prisma.xeroToken.deleteMany({});

    return NextResponse.json({
      success: true,
      message: 'Xero connection disconnected successfully',
    });
  } catch (error) {
    console.error('Xero disconnect error:', error);

    return NextResponse.json(
      { error: 'Failed to disconnect Xero' },
      { status: 500 }
    );
  }
}
