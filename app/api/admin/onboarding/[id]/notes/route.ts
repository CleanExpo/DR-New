import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * POST /api/admin/onboarding/[id]/notes
 * Save admin notes for contractor application
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
    const { notes } = body;

    // Create audit log entry with notes
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: params.id,
        action: 'ADMIN_NOTES_UPDATED',
        category: 'PROFILE',
        details: JSON.stringify({
          notes,
          updatedBy: session.user?.email,
          timestamp: new Date().toISOString()
        }),
        performedBy: session.user?.id || 'system',
        performedByType: 'ADMIN'
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Notes saved successfully'
    });

  } catch (error) {
    console.error('Error saving notes:', error);
    return NextResponse.json(
      { error: 'Failed to save notes' },
      { status: 500 }
    );
  }
}
