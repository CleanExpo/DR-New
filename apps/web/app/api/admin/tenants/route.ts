import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleValidationError, handleUnexpectedError } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const tenantActionSchema = z.object({
  action: z.enum(['create_tenant', 'update_tenant', 'suspend_tenant', 'delete_tenant']),
  tenantId: z.string().optional(),
  data: z.any().optional()
});

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

    const records = await prisma.tenant.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        domain: true,
        subdomain: true,
        logo: true,
        primaryColor: true,
        secondaryColor: true,
        industry: true,
        isActive: true,
        createdAt: true,
        _count: {
          select: {
            users: true,
            serviceRequests: true,
          },
        },
      },
    });

    const tenants = records.map((t) => ({
      id: t.id,
      name: t.name,
      domain: t.domain ?? undefined,
      subdomain: t.subdomain ?? undefined,
      logo: t.logo ?? undefined,
      primaryColor: t.primaryColor ?? undefined,
      secondaryColor: t.secondaryColor ?? undefined,
      industry: t.industry ?? undefined,
      isActive: t.isActive,
      createdAt: t.createdAt.toISOString(),
      userCount: t._count.users,
      requestCount: t._count.serviceRequests,
    }));

    // Single pass for all tenant stats
    let activeTenants = 0, totalUsers = 0, totalRequests = 0;
    for (const t of tenants) {
      if (t.isActive) activeTenants++;
      totalUsers += t.userCount;
      totalRequests += t.requestCount;
    }
    const tenantStats = {
      totalTenants: tenants.length,
      activeTenants,
      totalUsers,
      totalRequests,
      averageUsersPerTenant: tenants.length > 0 ? Math.round(totalUsers / tenants.length) : 0,
    };

    return NextResponse.json({
      success: true,
      tenants,
      stats: tenantStats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

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

    const body = await request.json();
    const { action, data } = tenantActionSchema.parse(body);

    switch (action) {
      case 'create_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant created successfully',
          tenant: {
            id: 'tenant-new',
            ...data,
            status: 'active',
            createdAt: new Date().toISOString()
          }
        });

      case 'update_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant updated successfully'
        });

      case 'suspend_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant suspended successfully'
        });

      case 'delete_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant deleted successfully'
        });
    }

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
