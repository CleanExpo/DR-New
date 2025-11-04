import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

/**
 * POST /api/admin/onboarding/bulk/export
 * Export contractor applications to CSV
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

    // Fetch contractors
    const contractors = await prisma.contractor.findMany({
      where: {
        id: { in: contractorIds }
      },
      include: {
        companyProfile: true,
        certifications: true,
        insurance: true,
        subscription: true
      }
    });

    // Generate CSV
    const headers = [
      'Company Name',
      'ABN',
      'Contact Name',
      'Email',
      'Phone',
      'Status',
      'Qualifications Count',
      'Insurance Count',
      'Subscription Tier',
      'Submitted Date',
      'Approved Date'
    ];

    const rows = contractors.map(c => [
      c.companyProfile?.companyName || c.username,
      c.companyProfile?.abn || '',
      c.username,
      c.email,
      c.mobileNumber,
      c.status,
      c.certifications.length.toString(),
      c.insurance.length.toString(),
      c.subscription?.tier || 'None',
      format(new Date(c.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      c.approvedAt ? format(new Date(c.approvedAt), 'yyyy-MM-dd HH:mm:ss') : ''
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Return CSV as response
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="contractor-applications-${format(new Date(), 'yyyy-MM-dd')}.csv"`
      }
    });

  } catch (error) {
    console.error('Error exporting applications:', error);
    return NextResponse.json(
      { error: 'Failed to export applications' },
      { status: 500 }
    );
  }
}
