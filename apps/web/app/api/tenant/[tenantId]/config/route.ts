import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

const configSchema = z.object({
  key: z.string().min(1).max(100).regex(/^[A-Z_]+$/, 'Key must be uppercase letters and underscores only'),
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.unknown())]),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for tenant config updates
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { tenantId } = params;
    const body = await request.json();
    const result = configSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { key, value } = result.data;
    await TenantService.updateTenantConfig(tenantId, key, value);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
