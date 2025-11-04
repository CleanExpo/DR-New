import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/insurance/[insuranceId]/verify
 * Verify a contractor insurance policy
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
    const { notes } = body;

    // Update insurance
    const insurance = await prisma.contractorInsurance.update({
      where: { id: params.insuranceId },
      data: {
        verified: true,
        verifiedAt: new Date(),
        verifiedBy: session.user?.email || session.user?.name || 'Admin',
        status: 'ACTIVE'
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'INSURANCE_VERIFIED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          insuranceId: params.insuranceId,
          insuranceType: insurance.insuranceType,
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
      insurance,
      message: 'Insurance verified successfully'
    });

  } catch (error) {
    console.error('Error verifying insurance:', error);
    return NextResponse.json(
      { error: 'Failed to verify insurance' },
      { status: 500 }
    );
  }
}
