import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { verifyNRPGContractor } from '@/lib/services/nrpg.service';

const verifyContractorSchema = z.object({
  verificationLevel: z.enum(['VERIFIED', 'SUSPENDED', 'REJECTED']),
  notes: z.string().optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const body: unknown = await request.json();
    const parsed = verifyContractorSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await verifyNRPGContractor(
      params.id,
      parsed.data.verificationLevel,
      parsed.data.notes
    );

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: result.message });
  } catch (error) {
    console.error('Error verifying contractor:', error);
    return NextResponse.json({ error: 'Error verifying contractor' }, { status: 500 });
  }
}

