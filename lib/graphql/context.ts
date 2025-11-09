import { createDataLoaders, type DataLoaders } from './dataloaders';
import type { NextRequest } from 'next/server';

/**
 * User from JWT token
 */
export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'TECHNICIAN' | 'CUSTOMER';
  name?: string;
}

/**
 * GraphQL context
 */
export interface GraphQLContext {
  dataloaders: DataLoaders;
  user?: User;
  req?: NextRequest;
}

/**
 * Extract user from JWT token
 */
async function getUserFromToken(token?: string): Promise<User | undefined> {
  if (!token) return undefined;

  try {
    // TODO: Implement actual JWT verification
    // This is a placeholder - integrate with NextAuth.js or your auth system

    // Example with NextAuth.js:
    // import { getToken } from 'next-auth/jwt';
    // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // For now, return undefined (no auth)
    return undefined;
  } catch (error) {
    console.error('[Auth Error]', error);
    return undefined;
  }
}

/**
 * Create GraphQL context for each request
 */
export async function createContext(req?: NextRequest): Promise<GraphQLContext> {
  // Extract authorization header
  const authHeader = req?.headers.get('authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : undefined;

  // Get user from token
  const user = await getUserFromToken(token);

  // Create fresh DataLoaders for this request (prevents caching across requests)
  const dataloaders = createDataLoaders();

  return {
    dataloaders,
    user,
    req,
  };
}
