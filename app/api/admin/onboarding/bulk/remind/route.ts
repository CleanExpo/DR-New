import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/bulk/remind
 * Send reminder emails to contractors
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

    let sent = 0;
    let failed = 0;

    for (const contractorId of contractorIds) {
      try {
        const contractor = await prisma.contractor.findUnique({
          where: { id: contractorId },
          include: {
            companyProfile: true
          }
        });

        if (!contractor) {
          failed++;
          continue;
        }

        // TODO: Send reminder email via email service
        // For now, just create audit log
        await prisma.contractorAuditLog.create({
          data: {
            contractorId,
            action: 'REMINDER_SENT',
            category: 'PROFILE',
            details: JSON.stringify({
              sentBy: session.user?.email,
              timestamp: new Date().toISOString()
            }),
            performedBy: session.user?.id || 'system',
            performedByType: 'ADMIN'
          }
        });

        sent++;

      } catch (error) {
        console.error(`Error sending reminder to contractor ${contractorId}:`, error);
        failed++;
      }
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: contractorIds.length
    });

  } catch (error) {
    console.error('Error sending reminders:', error);
    return NextResponse.json(
      { error: 'Failed to send reminders' },
      { status: 500 }
    );
  }
}
