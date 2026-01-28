import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { z } from 'zod';
import { validateRequest, formatZodErrors } from '@/lib/validation';
import { logUserManagement } from '@/lib/services/audit.service';

interface RouteParams {
  params: { id: string };
}

const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  role: z.enum(['USER', 'ADMIN', 'CONTRACTOR', 'SUPER_ADMIN']).optional(),
  isActive: z.boolean().optional(),
  phone: z.string().optional(),
});

// Get single user
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user: currentUser } = authResult.context;

    if (!requireRole(currentUser, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { id } = params;

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        phone: true,
        isActive: true,
        emailVerified: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
        lastLoginAt: true,
        contractor: true,
        bookings: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        payments: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        loginAttempts: {
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update user
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user: currentUser } = authResult.context;

    if (!requireRole(currentUser, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { id } = params;
    const body = await request.json();

    const validation = validateRequest(updateUserSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const targetUser = await db.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Only super admins can change roles to ADMIN or SUPER_ADMIN
    if (
      validation.data.role &&
      (validation.data.role === 'ADMIN' || validation.data.role === 'SUPER_ADMIN') &&
      !isSuperAdmin(currentUser.role)
    ) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Can't demote yourself
    if (id === currentUser.id && validation.data.role && validation.data.role !== currentUser.role) {
      return NextResponse.json(
        { success: false, error: 'Cannot change your own role' },
        { status: 400 }
      );
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: validation.data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        updatedAt: true,
      },
    });

    // Audit log the update
    const auditAction = validation.data.role && validation.data.role !== targetUser.role
      ? 'USER_ROLE_CHANGED'
      : validation.data.isActive === false
        ? 'USER_DEACTIVATED'
        : validation.data.isActive === true && targetUser.isActive === false
          ? 'USER_REACTIVATED'
          : 'RESOURCE_UPDATED';

    await logUserManagement(request, currentUser.id, id, auditAction, {
      changes: validation.data,
      previousRole: targetUser.role,
      previousActive: targetUser.isActive,
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete user (soft delete)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user: currentUser } = authResult.context;

    if (!requireRole(currentUser, ['SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['SUPER_ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { id } = params;

    // Can't delete yourself
    if (id === currentUser.id) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const targetUser = await db.user.findUnique({
      where: { id },
    });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Soft delete - just deactivate
    await db.user.update({
      where: { id },
      data: {
        isActive: false,
        email: `deleted_${Date.now()}_${targetUser.email}`,
      },
    });

    // Audit log the deletion
    await logUserManagement(request, currentUser.id, id, 'USER_DELETED', {
      deletedUserEmail: targetUser.email,
      deletedUserRole: targetUser.role,
    });

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
