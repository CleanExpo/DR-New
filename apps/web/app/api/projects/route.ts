import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError } from '@/lib/api-errors';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Get service requests as projects
    const serviceRequests = await db.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        matches: {
          include: {
            contractor: {
              include: {
                user: true
              }
            }
          }
        }
      }
    });

    // Transform service requests into project format
    const projects = serviceRequests.map(request => ({
      id: request.id,
      title: request.serviceTitle,
      description: request.description,
      category: request.serviceCategory,
      urgency: request.urgency,
      location: request.location,
      budget: request.budget,
      status: request.status,
      leadScore: request.leadScore,
      progress: request.status === 'COMPLETED' ? 100 :
                request.status === 'IN_PROGRESS' ? 75 :
                request.status === 'MATCHED' ? 50 : 25,
      contractor: request.matches[0]?.contractor || null,
      matchScore: request.matches[0]?.matchScore || null,
      nextSteps: request.status === 'PENDING' ? ['Waiting for contractor matches'] :
                 request.status === 'MATCHED' ? ['Review contractor proposals', 'Schedule consultation'] :
                 request.status === 'IN_PROGRESS' ? ['Monitor progress', 'Communicate with contractor'] :
                 request.status === 'COMPLETED' ? ['Leave review', 'Request invoice'] : []
    }));

    return NextResponse.json({
      success: true,
      projects,
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
