import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/bulk/approve
 * Bulk approve contractor applications
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { contractorIds } = body;

    if (!Array.isArray(contractorIds) || contractorIds.length === 0) {
      return NextResponse.json(
        { error: 'No contractor IDs provided' },
        { status: 400 }
      );
    }

    let approved = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const contractorId of contractorIds) {
      try {
        // Verify all requirements are met
        const contractor = await prisma.contractor.findUnique({
          where: { id: contractorId },
          include: {
            certifications: true,
            insurance: true,
            companyProfile: true
          }
        });

        if (!contractor) {
          errors.push(`Contractor ${contractorId} not found`);
          failed++;
          continue;
        }

        // Check if all requirements are verified
        const allQualificationsVerified = contractor.certifications.every(
          (cert) => cert.verified
        );
        const allInsuranceVerified = contractor.insurance.every(
          (ins) => ins.verified
        );
        const abnVerified = contractor.companyProfile?.abnVerified || false;

        if (!allQualificationsVerified || !allInsuranceVerified || !abnVerified) {
          errors.push(
            `Contractor ${contractor.companyProfile?.companyName || contractor.username} - Requirements not met`
          );
          failed++;
          continue;
        }

        // Approve contractor
        await prisma.contractor.update({
          where: { id: contractorId },
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
            contractorId,
            action: 'BULK_APPROVAL',
            category: 'COMPLIANCE',
            details: JSON.stringify({
              approvedBy: session.user?.email,
              bulkAction: true,
              timestamp: new Date().toISOString()
            }),
            performedBy: session.user?.id || 'system',
            performedByType: 'ADMIN'
          }
        });

        approved++;

      } catch (error) {
        console.error(`Error approving contractor ${contractorId}:`, error);
        errors.push(`Error approving contractor ${contractorId}`);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      approved,
      failed,
      total: contractorIds.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error in bulk approval:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk approval' },
      { status: 500 }
    );
  }
}
