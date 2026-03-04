/**
 * Xero OAuth2 Callback Handler
 *
 * GET /api/xero/callback
 * Handles the OAuth2 callback from Xero, exchanges code for tokens,
 * and stores them in the database.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getXeroClient, saveXeroTokens } from '@/lib/xero/client';

export async function GET(request: NextRequest) {
  try {
    const xero = getXeroClient();
    await xero.initialize();

    // Exchange the temporary code for a token set
    const tokenSet = await xero.apiCallback(request.url);

    // Get the connected tenants (organisations)
    await xero.updateTenants();

    if (!xero.tenants || xero.tenants.length === 0) {
      return NextResponse.redirect(
        new URL('/dashboard/admin/financials?xero=error&reason=no_organisation', request.url)
      );
    }

    // Use the first connected tenant (DR Licence Xero account)
    const xeroTenantId = xero.tenants[0].tenantId;

    // Store tokens in the database
    await saveXeroTokens(xeroTenantId, {
      access_token: tokenSet.access_token,
      refresh_token: tokenSet.refresh_token,
      expires_at: tokenSet.expires_at,
      scope: tokenSet.scope,
    });

    return NextResponse.redirect(
      new URL('/dashboard/admin/financials?xero=connected', request.url)
    );
  } catch (error) {
    console.error('Xero callback error:', error);

    return NextResponse.redirect(
      new URL('/dashboard/admin/financials?xero=error&reason=callback_failed', request.url)
    );
  }
}
