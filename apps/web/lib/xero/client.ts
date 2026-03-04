/**
 * Xero API Client Singleton
 *
 * Provides a configured XeroClient instance for the DR-NRPG platform.
 * Handles OAuth2 token management and automatic refresh.
 */

import { XeroClient } from 'xero-node';
import { prisma } from '@/lib/prisma';

const XERO_SCOPES = [
  'openid',
  'profile',
  'email',
  'accounting.transactions',
  'accounting.transactions.read',
  'accounting.contacts',
  'accounting.contacts.read',
  'accounting.reports.read',
  'accounting.settings.read',
  'offline_access',
];

let xeroClient: XeroClient | null = null;

/**
 * Get or create the singleton XeroClient instance.
 */
export function getXeroClient(): XeroClient {
  if (!xeroClient) {
    const clientId = process.env.XERO_CLIENT_ID;
    const clientSecret = process.env.XERO_CLIENT_SECRET;
    const redirectUri = process.env.XERO_REDIRECT_URI;

    if (!clientId || !clientSecret) {
      throw new Error('XERO_CLIENT_ID and XERO_CLIENT_SECRET must be set');
    }

    xeroClient = new XeroClient({
      clientId,
      clientSecret,
      redirectUris: [redirectUri || 'http://localhost:3000/api/xero/callback'],
      scopes: XERO_SCOPES,
      httpTimeout: 10000,
    });
  }

  return xeroClient;
}

/**
 * Load stored tokens from the database and set them on the client.
 * Automatically refreshes if expired.
 *
 * Returns the Xero tenant ID or null if no tokens are stored.
 */
export async function loadXeroTokens(): Promise<string | null> {
  const stored = await prisma.xeroToken.findFirst({
    orderBy: { updatedAt: 'desc' },
  });

  if (!stored) {
    return null;
  }

  const client = getXeroClient();
  await client.initialize();

  const tokenSet = {
    access_token: stored.accessToken,
    refresh_token: stored.refreshToken,
    expires_at: Math.floor(stored.expiresAt.getTime() / 1000),
    token_type: 'Bearer',
    scope: stored.scopes.join(' '),
  };

  await client.setTokenSet(tokenSet);

  // Refresh if token is expired or about to expire (within 5 minutes)
  const now = new Date();
  const fiveMinutesFromNow = new Date(now.getTime() + 5 * 60 * 1000);

  if (stored.expiresAt <= fiveMinutesFromNow) {
    try {
      const refreshedTokenSet = await client.refreshToken();

      await prisma.xeroToken.update({
        where: { id: stored.id },
        data: {
          accessToken: refreshedTokenSet.access_token!,
          refreshToken: refreshedTokenSet.refresh_token!,
          expiresAt: new Date(refreshedTokenSet.expires_at! * 1000),
          scopes: refreshedTokenSet.scope
            ? (typeof refreshedTokenSet.scope === 'string'
                ? refreshedTokenSet.scope.split(' ')
                : refreshedTokenSet.scope)
            : stored.scopes,
        },
      });
    } catch (err) {
      console.error('Failed to refresh Xero token:', err);
      // Delete invalid token so user can re-authenticate
      await prisma.xeroToken.delete({ where: { id: stored.id } });
      return null;
    }
  }

  return stored.tenantId;
}

/**
 * Save a new token set to the database.
 * Replaces any existing tokens (single-org connection).
 */
export async function saveXeroTokens(
  tenantId: string,
  tokenSet: {
    access_token?: string;
    refresh_token?: string;
    expires_at?: number;
    scope?: string | string[];
  }
): Promise<void> {
  if (!tokenSet.access_token || !tokenSet.refresh_token || !tokenSet.expires_at) {
    throw new Error('Invalid token set: missing required fields');
  }

  const scopes = tokenSet.scope
    ? (typeof tokenSet.scope === 'string' ? tokenSet.scope.split(' ') : tokenSet.scope)
    : XERO_SCOPES;

  // Upsert: delete existing tokens and create new one
  await prisma.xeroToken.deleteMany({});
  await prisma.xeroToken.create({
    data: {
      tenantId,
      accessToken: tokenSet.access_token,
      refreshToken: tokenSet.refresh_token,
      expiresAt: new Date(tokenSet.expires_at * 1000),
      scopes,
    },
  });
}

/**
 * Check if Xero is connected (has stored tokens).
 */
export async function isXeroConnected(): Promise<boolean> {
  const count = await prisma.xeroToken.count();
  return count > 0;
}

/**
 * Format a number as AUD currency string.
 */
export function formatAUD(amount: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount);
}
