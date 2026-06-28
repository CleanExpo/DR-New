import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { verifyToken, JWTPayload } from '@/lib/auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';
import { ErrorCode } from '@/lib/api-errors';
import { resolveTenant } from '@/lib/tenant-resolver';

export interface AuthContext {
  user: User;
  decoded: JWTPayload;
  tenantId: string | null;
}

export interface AuthenticateRequestOptions {
  /**
   * Accept `Authorization: Bearer <token>` in addition to NextAuth cookie sessions.
   *
   * Default: `true` — enables React Native / mobile clients to authenticate with
   * the JWT issued by POST /api/auth/mobile without requiring cookies.
   * Cookie-based NextAuth sessions are always tried first.
   */
  allowBearerToken?: boolean;
}

/**
 * Account status is re-evaluated from the freshly-read DB user on every request,
 * so block/suspend/deactivate take effect within a single request — not only at
 * next login or session expiry.
 */
function isAccountDisabled(user: User): boolean {
  return user.isActive === false || user.isBlocked === true;
}

function accountDisabledResponse(): NextResponse {
  return NextResponse.json(
    { error: ErrorCode.FORBIDDEN, message: 'Account is suspended or inactive' },
    { status: 403 }
  );
}

/**
 * Centralized authentication middleware following Anthropic best practices
 * Extracts and verifies JWT token, fetches user from database
 */
export async function authenticateRequest(
  request: NextRequest,
  options: AuthenticateRequestOptions = { allowBearerToken: true }
): Promise<{ success: true; context: AuthContext } | { success: false; response: NextResponse }> {
  // Prefer NextAuth cookie-based sessions when available.
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as unknown as { id?: string; email?: string | null } | undefined;

    const sessionUserId = sessionUser?.id;
    const sessionUserEmail = sessionUser?.email?.toLowerCase().trim();

    if (sessionUserId || sessionUserEmail) {
      const user = await prisma.user.findUnique({
        where: sessionUserId ? { id: sessionUserId } : { email: sessionUserEmail! },
      });

      if (user) {
        if (isAccountDisabled(user)) {
          return { success: false, response: accountDisabledResponse() };
        }

        // Resolve tenantId from hostname if user doesn't have one assigned
        let resolvedTenantId = user.tenantId;
        if (!resolvedTenantId) {
          const hostname = request.headers.get('x-tenant-hostname');
          const tenantIdHeader = request.headers.get('x-tenant-id');
          const resolution = await resolveTenant(hostname, tenantIdHeader);
          resolvedTenantId = resolution?.tenantId ?? null;
        }

        return {
          success: true,
          context: {
            user,
            decoded: {
              userId: user.id,
              email: user.email,
              userType: user.userType,
              tenantId: resolvedTenantId,
              type: 'auth',
            },
            tenantId: resolvedTenantId,
          },
        };
      }
    }
  } catch {
    // Ignore session errors and fall back to Bearer token auth when enabled.
  }

  if (!options.allowBearerToken) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.UNAUTHORIZED,
          message: 'Authentication required',
        },
        { status: 401 }
      ),
    };
  }

  // Extract token
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.UNAUTHORIZED,
          message: 'Missing or invalid authorization header'
        },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.substring(7);

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.INVALID_TOKEN,
          message: 'Invalid or expired token'
        },
        { status: 401 }
      ),
    };
  }

  // Fetch user
  try {
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: ErrorCode.USER_NOT_FOUND,
            message: 'User not found'
          },
          { status: 404 }
        ),
      };
    }

    if (isAccountDisabled(user)) {
      return { success: false, response: accountDisabledResponse() };
    }

    // Resolve tenantId with fallback chain: user.tenantId > decoded.tenantId > hostname resolution
    let resolvedTenantId = user.tenantId ?? decoded.tenantId ?? null;
    if (!resolvedTenantId) {
      const hostname = request.headers.get('x-tenant-hostname');
      const tenantIdHeader = request.headers.get('x-tenant-id');
      const resolution = await resolveTenant(hostname, tenantIdHeader);
      resolvedTenantId = resolution?.tenantId ?? null;
    }

    return {
      success: true,
      context: {
        user,
        decoded,
        tenantId: resolvedTenantId,
      },
    };
  } catch (error) {
    console.error('[AUTH_MIDDLEWARE] Database error:', error);
    return {
      success: false,
      response: NextResponse.json(
        {
          error: ErrorCode.DATABASE_ERROR,
          message: 'Database connection failed'
        },
        { status: 500 }
      ),
    };
  }
}

/**
 * Role-based authorization check
 */
export function requireRole(
  user: User,
  allowedRoles: Array<'ADMIN' | 'CONTRACTOR' | 'CLIENT' | 'SUPER_ADMIN'>
): boolean {
  return allowedRoles.includes(user.userType);
}

/**
 * Creates unauthorized response for role mismatch
 */
export function unauthorizedRoleResponse(requiredRoles: string[]): NextResponse {
  return NextResponse.json(
    {
      error: ErrorCode.FORBIDDEN,
      message: `Access denied. Required roles: ${requiredRoles.join(', ')}`,
    },
    { status: 403 }
  );
}
