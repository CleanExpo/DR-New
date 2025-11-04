// Authentication middleware for API routes
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

// Types
export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'OPERATOR' | 'CONTRACTOR' | 'VIEWER';
  tenantId?: string;
  permissions: string[];
}

export interface JWTPayload {
  sub: string; // user id
  email: string;
  role: string;
  tenantId?: string;
  permissions: string[];
  iat: number;
  exp: number;
}

// Mock JWT secret - In production, use environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'disaster-recovery-secret-key-2024';

// Permission definitions
export const PERMISSIONS = {
  // Analytics
  VIEW_ANALYTICS: 'analytics.view',
  EXPORT_REPORTS: 'analytics.export',

  // Jobs
  VIEW_JOBS: 'jobs.view',
  CREATE_JOBS: 'jobs.create',
  UPDATE_JOBS: 'jobs.update',
  DELETE_JOBS: 'jobs.delete',

  // Contractors
  VIEW_CONTRACTORS: 'contractors.view',
  MANAGE_CONTRACTORS: 'contractors.manage',

  // Finance
  VIEW_FINANCE: 'finance.view',
  MANAGE_BILLING: 'finance.billing',

  // System
  MANAGE_SYSTEM: 'system.manage',
  VIEW_AUDIT_LOGS: 'system.audit'
};

// Role-based permission mappings
const ROLE_PERMISSIONS: Record<string, string[]> = {
  ADMIN: Object.values(PERMISSIONS), // All permissions
  MANAGER: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.UPDATE_JOBS,
    PERMISSIONS.VIEW_CONTRACTORS,
    PERMISSIONS.VIEW_FINANCE,
    PERMISSIONS.VIEW_AUDIT_LOGS
  ],
  OPERATOR: [
    PERMISSIONS.VIEW_JOBS,
    PERMISSIONS.CREATE_JOBS,
    PERMISSIONS.UPDATE_JOBS,
    PERMISSIONS.VIEW_CONTRACTORS
  ],
  CONTRACTOR: [
    PERMISSIONS.VIEW_JOBS // Only their assigned jobs
  ],
  VIEWER: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.VIEW_JOBS
  ]
};

// Authentication middleware
export async function withAuth(
  request: NextRequest,
  requiredRole?: string,
  requiredPermissions?: string[]
): Promise<User | NextResponse> {
  try {
    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createUnauthorizedResponse('Missing or invalid authorization header');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify and decode JWT token
    let payload: JWTPayload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return createUnauthorizedResponse('Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        return createUnauthorizedResponse('Invalid token');
      }
      throw error;
    }

    // Create user object from payload
    const user: User = {
      id: payload.sub,
      email: payload.email,
      role: payload.role as User['role'],
      tenantId: payload.tenantId,
      permissions: payload.permissions || ROLE_PERMISSIONS[payload.role] || []
    };

    // Check role requirement
    if (requiredRole && !hasRequiredRole(user.role, requiredRole)) {
      return createForbiddenResponse('Insufficient role privileges');
    }

    // Check permission requirements
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission =>
        user.permissions.includes(permission)
      );

      if (!hasAllPermissions) {
        return createForbiddenResponse('Insufficient permissions');
      }
    }

    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return createErrorResponse('Authentication failed', 500);
  }
}

// Role hierarchy checker
function hasRequiredRole(userRole: string, requiredRole: string): boolean {
  const roleHierarchy = ['VIEWER', 'CONTRACTOR', 'OPERATOR', 'MANAGER', 'ADMIN'];
  const userLevel = roleHierarchy.indexOf(userRole);
  const requiredLevel = roleHierarchy.indexOf(requiredRole);

  return userLevel >= requiredLevel;
}

// Helper function to create user context for testing
export function createMockUser(overrides?: Partial<User>): User {
  return {
    id: 'user-123',
    email: 'admin@disasterrecovery.com.au',
    role: 'ADMIN',
    tenantId: 'tenant-001',
    permissions: ROLE_PERMISSIONS.ADMIN,
    ...overrides
  };
}

// Helper function to generate JWT token (for testing)
export function generateToken(user: User, expiresIn: string = '24h'): string {
  const payload: Partial<JWTPayload> = {
    sub: user.id,
    email: user.email,
    role: user.role,
    tenantId: user.tenantId,
    permissions: user.permissions
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

// Response helpers
function createUnauthorizedResponse(message: string): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    },
    { status: 401 }
  );
}

function createForbiddenResponse(message: string): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'FORBIDDEN',
        message
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    },
    { status: 403 }
  );
}

function createErrorResponse(message: string, status: number = 500): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message
      },
      meta: {
        timestamp: new Date().toISOString(),
        requestId: generateRequestId()
      }
    },
    { status }
  );
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

// Middleware wrapper for easy use in API routes
export function requireAuth(
  handler: (req: NextRequest, user: User) => Promise<NextResponse>,
  options?: {
    role?: string;
    permissions?: string[];
  }
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authResult = await withAuth(req, options?.role, options?.permissions);

    if (authResult instanceof NextResponse) {
      return authResult;
    }

    return handler(req, authResult);
  };
}

// Export permission checker utility
export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes(permission);
}

// Export role checker utility
export function hasRole(user: User, role: string): boolean {
  return hasRequiredRole(user.role, role);
}