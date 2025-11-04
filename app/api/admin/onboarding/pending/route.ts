import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth } from '@/lib/middleware/auth';

export async function GET(request: NextRequest) {
  try {
    // Check authentication and require ADMIN role
    const authResult = await withAuth(request, 'ADMIN');
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const admin = authResult;

    // Get filter parameters from query
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'UNDER_REVIEW';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get contractors based on status filter
    const whereClause = status === 'ALL'
      ? {}
      : { status: status as any };

    const [contractors, totalCount] = await Promise.all([
      prisma.contractor.findMany({
        where: whereClause,
        include: {
          companyProfile: {
            select: {
              companyName: true,
              abn: true,
              registeredCity: true,
              registeredState: true
            }
          },
          certifications: {
            select: {
              id: true,
              certificationType: true,
              status: true,
              verified: true
            }
          },
          insurance: {
            select: {
              id: true,
              insuranceType: true,
              coverageAmount: true,
              status: true,
              verified: true,
              expiryDate: true
            }
          },
          subscription: {
            select: {
              tier: true,
              amount: true,
              status: true
            }
          },
          territories: {
            where: { active: true },
            select: {
              radiusKm: true,
              centerLat: true,
              centerLng: true
            }
          }
        },
        orderBy: [
          { status: 'asc' },
          { createdAt: 'asc' }
        ],
        skip: offset,
        take: limit
      }),
      prisma.contractor.count({ where: whereClause })
    ]);

    // Format the response data
    const formattedContractors = contractors.map(contractor => {
      const hasPublicLiability = contractor.insurance.some(i => i.insuranceType === 'PUBLIC_LIABILITY');
      const hasWorkersComp = contractor.insurance.some(i => i.insuranceType === 'WORKERS_COMPENSATION');

      return {
        id: contractor.id,
        email: contractor.email,
        status: contractor.status,
        createdAt: contractor.createdAt,

        business: {
          name: contractor.companyProfile?.companyName || 'Not provided',
          abn: contractor.companyProfile?.abn || 'Not provided',
          location: contractor.companyProfile
            ? `${contractor.companyProfile.registeredCity}, ${contractor.companyProfile.registeredState}`
            : 'Not provided'
        },

        verification: {
          emailVerified: contractor.emailVerified,
          mobileVerified: contractor.mobileVerified,
          onboardingCompleted: contractor.onboardingCompleted,
          onboardingStep: contractor.onboardingStep
        },

        qualifications: {
          total: contractor.certifications.length,
          verified: contractor.certifications.filter(c => c.verified).length,
          pending: contractor.certifications.filter(c => c.status === 'PENDING').length,
          types: [...new Set(contractor.certifications.map(c => c.certificationType))]
        },

        insurance: {
          hasPublicLiability,
          hasWorkersComp,
          totalPolicies: contractor.insurance.length,
          verified: contractor.insurance.filter(i => i.verified).length,
          totalCoverage: contractor.insurance
            .filter(i => i.insuranceType === 'PUBLIC_LIABILITY')
            .reduce((sum, i) => sum + (i.coverageAmount || 0), 0)
        },

        subscription: contractor.subscription ? {
          tier: contractor.subscription.tier,
          amount: contractor.subscription.amount,
          status: contractor.subscription.status
        } : null,

        coverage: contractor.territories[0] ? {
          radius: contractor.territories[0].radiusKm,
          lat: contractor.territories[0].centerLat,
          lng: contractor.territories[0].centerLng
        } : null,

        readyForApproval: (
          hasPublicLiability &&
          hasWorkersComp &&
          contractor.certifications.length > 0 &&
          contractor.companyProfile?.abn
        )
      };
    });

    // Get summary statistics
    const stats = {
      total: totalCount,
      pending: await prisma.contractor.count({ where: { status: 'PENDING' } }),
      underReview: await prisma.contractor.count({ where: { status: 'UNDER_REVIEW' } }),
      approved: await prisma.contractor.count({ where: { status: 'APPROVED' } }),
      rejected: await prisma.contractor.count({ where: { status: 'REJECTED' } }),
      suspended: await prisma.contractor.count({ where: { status: 'SUSPENDED' } })
    };

    return NextResponse.json({
      success: true,
      data: {
        contractors: formattedContractors,
        pagination: {
          total: totalCount,
          limit,
          offset,
          hasMore: offset + limit < totalCount
        },
        stats
      }
    });

  } catch (error) {
    console.error('Get pending contractors error:', error);

    await prisma.errorLog.create({
      data: {
        level: 'error',
        message: 'Failed to retrieve pending contractors',
        stack: error instanceof Error ? error.stack : undefined,
        metadata: JSON.stringify({
          error: error instanceof Error ? error.message : 'Unknown error'
        }),
        source: 'GET /api/admin/onboarding/pending',
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '',
        userAgent: request.headers.get('user-agent') || ''
      }
    }).catch(console.error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve pending contractors'
      },
      { status: 500 }
    );
  }
}