import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/insurance/[insuranceId]/reject
 * Reject a contractor insurance policy
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; insuranceId: string } }
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

    // Update insurance
    const insurance = await prisma.contractorInsurance.update({
      where: { id: params.insuranceId },
      data: {
        verified: false,
        verifiedAt: null,
        verifiedBy: session.user?.email || session.user?.name || 'Admin',
        status: 'REJECTED'
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'INSURANCE_REJECTED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          insuranceId: params.insuranceId,
          insuranceType: insurance.insuranceType,
          rejectedBy: session.user?.email,
          reason,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    // TODO: Send notification to contractor about rejected insurance

    return NextResponse.json({
      success: true,
      insurance,
      message: 'Insurance rejected'
    });

  } catch (error) {
    console.error('Error rejecting insurance:', error);
    return NextResponse.json(
      { error: 'Failed to reject insurance' },
      { status: 500 }
    );
  }
}
