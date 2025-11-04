import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/reject
 * Reject a contractor application
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reason, feedback, internalNotes } = body;

    if (!reason || !feedback) {
      return NextResponse.json(
        { error: 'Reason and feedback are required' },
        { status: 400 }
      );
    }

    // Update contractor status
    const updatedContractor = await prisma.contractor.update({
      where: { id: params.id },
      data: {
        status: 'REJECTED',
        rejectedAt: new Date(),
        rejectionReason: reason,
        approvedAt: null
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'APPLICATION_REJECTED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          rejectedBy: session.user?.email,
          reason,
          feedback,
          internalNotes,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    // TODO: Send rejection email to contractor with feedback

    return NextResponse.json({
      success: true,
      contractor: updatedContractor,
      message: 'Contractor rejected successfully'
    });

  } catch (error) {
    console.error('Error rejecting contractor:', error);
    return NextResponse.json(
      { error: 'Failed to reject contractor' },
      { status: 500 }
    );
  }
}
