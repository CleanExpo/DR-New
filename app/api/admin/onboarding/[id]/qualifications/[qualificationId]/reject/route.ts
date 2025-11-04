import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/qualifications/[qualificationId]/reject
 * Reject a contractor qualification
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; qualificationId: string } }
) {
  try {
    const session = await getServerSession();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }

    // Update qualification
    const qualification = await prisma.contractorCertification.update({
      where: { id: params.qualificationId },
      data: {
        verified: false,
        verifiedAt: null,
        verifiedBy: session.user?.email || session.user?.name || 'Admin',
        verificationNotes: reason,
        status: 'REJECTED'
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'QUALIFICATION_REJECTED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          qualificationId: params.qualificationId,
          certificationType: qualification.certificationType,
          rejectedBy: session.user?.email,
          reason,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    // TODO: Send notification to contractor about rejected qualification

    return NextResponse.json({
      success: true,
      qualification,
      message: 'Qualification rejected'
    });

  } catch (error) {
    console.error('Error rejecting qualification:', error);
    return NextResponse.json(
      { error: 'Failed to reject qualification' },
      { status: 500 }
    );
  }
}
