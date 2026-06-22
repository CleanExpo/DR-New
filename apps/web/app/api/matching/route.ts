import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';

export const dynamic = 'force-dynamic';

const matchingSchema = z.object({
  serviceRequestId: z.string().min(1, 'serviceRequestId is required'),
});

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const body = await request.json();
    const result = matchingSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { serviceRequestId } = result.data;
    const db = getTenantDb(authResult.context);

    // Load the service request to build a validated MatchCriteria — never pass raw body
    const serviceRequest = await db.serviceRequest.findUnique({
      where: { id: serviceRequestId },
      select: {
        serviceCategory: true,
        location: true,
        urgency: true,
        budget: true,
        leadScore: true,
        tenantId: true,
      },
    });

    if (!serviceRequest) {
      return NextResponse.json({ error: 'Service request not found' }, { status: 404 });
    }

    const criteria = {
      serviceCategory: serviceRequest.serviceCategory,
      location: serviceRequest.location,
      urgency: serviceRequest.urgency,
      budget: serviceRequest.budget ? parseFloat(serviceRequest.budget) : undefined,
      leadScore: serviceRequest.leadScore ?? undefined,
      tenantId: serviceRequest.tenantId ?? undefined,
    };

    const matches = await EnhancedMatchingServiceV2.findMatchingContractorsForClient(
      serviceRequestId,
      criteria
    );

    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
