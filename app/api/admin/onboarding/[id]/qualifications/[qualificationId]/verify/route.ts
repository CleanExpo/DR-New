import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/qualifications/[qualificationId]/verify
 * Verify a contractor qualification
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
    const { notes } = body;

    // Update qualification
    const qualification = await prisma.contractorCertification.update({
      where: { id: params.qualificationId },
      data: {
        verified: true,
        verifiedAt: new Date(),
        verifiedBy: session.user?.email || session.user?.name || 'Admin',
        verificationNotes: notes,
        status: 'VERIFIED'
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'QUALIFICATION_VERIFIED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          qualificationId: params.qualificationId,
          certificationType: qualification.certificationType,
          verifiedBy: session.user?.email,
          notes,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    return NextResponse.json({
      success: true,
      qualification,
      message: 'Qualification verified successfully'
    });

  } catch (error) {
    console.error('Error verifying qualification:', error);
    return NextResponse.json(
      { error: 'Failed to verify qualification' },
      { status: 500 }
    );
  }
}
