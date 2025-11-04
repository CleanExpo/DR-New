import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/admin/onboarding
 * Fetch contractor applications with filtering and sorting
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin role
    const session = await getServerSession();
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};
    if (status && status !== 'all') {
      if (status.includes(',')) {
        // Multiple statuses
        where.status = { in: status.split(',') };
      } else {
        where.status = status;
      }
    }

    // Fetch applications with related data
    const applications = await prisma.contractor.findMany({
      where,
      include: {
        companyProfile: true,
        certifications: {
          orderBy: { createdAt: 'desc' }
        },
        insurance: {
          orderBy: { createdAt: 'desc' }
        },
        references: {
          orderBy: { createdAt: 'desc' }
        },
        subscription: true,
        territories: {
          where: { active: true },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: {
        [sortBy]: sortOrder
      }
    });

    return NextResponse.json({
      success: true,
      applications,
      count: applications.length
    });

  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
