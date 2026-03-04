/**
 * Xero OAuth2 Authorization Redirect
 *
 * GET /api/xero/auth
 * Redirects the admin user to Xero's OAuth2 consent screen.
 *
 * Required: ADMIN role
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getXeroClient } from '@/lib/xero/client';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const xero = getXeroClient();
    await xero.initialize();

    const consentUrl = await xero.buildConsentUrl();

    return NextResponse.redirect(consentUrl);
  } catch (error) {
    console.error('Xero auth redirect error:', error);

    return NextResponse.json(
      { error: 'Failed to initiate Xero authorisation' },
      { status: 500 }
    );
  }
}
