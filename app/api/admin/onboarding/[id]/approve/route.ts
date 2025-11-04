import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/approve
 * Approve a contractor application
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
    const { approvalNotes } = body;

    // Verify all requirements are met
    const contractor = await prisma.contractor.findUnique({
      where: { id: params.id },
      include: {
        certifications: true,
        insurance: true,
        companyProfile: true
      }
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Check if all qualifications are verified
    const allQualificationsVerified = contractor.certifications.every(
      (cert) => cert.verified
    );

    // Check if all insurance is verified
    const allInsuranceVerified = contractor.insurance.every(
      (ins) => ins.verified
    );

    // Check if ABN is verified
    const abnVerified = contractor.companyProfile?.abnVerified || false;

    if (!allQualificationsVerified || !allInsuranceVerified || !abnVerified) {
      return NextResponse.json(
        {
          error: 'Cannot approve: Not all requirements verified',
          details: {
            qualificationsVerified: allQualificationsVerified,
            insuranceVerified: allInsuranceVerified,
            abnVerified
          }
        },
        { status: 400 }
      );
    }

    // Update contractor status
    const updatedContractor = await prisma.contractor.update({
      where: { id: params.id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
        rejectionReason: null,
        rejectedAt: null
      }
    });

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'APPLICATION_APPROVED',
        category: 'COMPLIANCE',
        details: JSON.stringify({
          approvedBy: session.user?.email,
          approvalNotes,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    // TODO: Send approval email to contractor
    // TODO: Activate subscription
    // TODO: Add to job rotation system

    return NextResponse.json({
      success: true,
      contractor: updatedContractor,
      message: 'Contractor approved successfully'
    });

  } catch (error) {
    console.error('Error approving contractor:', error);
    return NextResponse.json(
      { error: 'Failed to approve contractor' },
      { status: 500 }
    );
  }
}
