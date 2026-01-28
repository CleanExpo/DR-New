import { NextRequest, NextResponse } from 'next/server';
import { getTenantDb } from '@/lib/get-tenant-db';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, ErrorCode, createErrorResponse } from '@/lib/api-errors';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    
    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    // Get the project/match
    const project = await db.contractorMatch.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          include: {
            user: true,
          },
        },
        serviceRequest: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!project) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Project not found',
        404
      );
    }

    // Check if the client owns this service request (unless ADMIN)
    if (user.userType !== 'ADMIN' && project.serviceRequest.userId !== user.id) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        'Unauthorized to complete this project',
        403
      );
    }

    // Update the project status to ACCEPTED (MatchStatus enum doesn't have COMPLETED)
    await db.contractorMatch.update({
      where: { id: params.id },
      data: { status: 'ACCEPTED' },
    });

    // Update the service request status to COMPLETED
    await db.serviceRequest.update({
      where: { id: project.serviceRequestId },
      data: { status: 'COMPLETED' },
    });

    // Send notification message to contractor
    await db.message.create({
      data: {
        senderId: user.id,
        receiverId: project.contractor.userId,
        content: `Great news! The project "${project.serviceRequest.serviceTitle}" has been marked as completed. Thank you for your excellent work!`,
        messageType: 'PROJECT_UPDATE',
        requestId: project.serviceRequestId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Project completed successfully',
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
