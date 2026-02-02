import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';

/**
 * GET /api/admin/contractors/directory
 * Internal NRPG management endpoint to search and filter contractors
 * ADMIN and SUPER_ADMIN only
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is admin
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { searchParams } = new URL(request.url);

    // Extract query parameters
    const search = searchParams.get('search') || '';
    const postcode = searchParams.get('postcode') || '';
    const state = searchParams.get('state') || '';
    const verificationStatus = searchParams.get('status') || '';
    const serviceType = searchParams.get('serviceType') || '';
    const verifiedOnly = searchParams.get('verified') === 'true';
    const emergencyAvailable = searchParams.get('emergency') === 'true';
    const minRating = parseFloat(searchParams.get('minRating') || '0');
    const sortBy = searchParams.get('sortBy') || 'rating'; // rating, newest, name
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
    const offset = parseInt(searchParams.get('offset') || '0');

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    // Build where clause
    const whereClause: any = {
      isActive: true,
    };

    // Filter by verification status
    if (verificationStatus) {
      whereClause.verificationStatus = verificationStatus;
    }

    // Apply filters
    if (verifiedOnly) {
      whereClause.isVerified = true;
    }

    if (emergencyAvailable) {
      whereClause.emergencyAvailable = true;
    }

    if (state) {
      whereClause.primaryState = state;
    }

    if (search) {
      whereClause.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { companyDescription: { contains: search, mode: 'insensitive' } },
        { abnNumber: { contains: search, mode: 'insensitive' } },
        { licenseNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (serviceType) {
      whereClause.australianSpecialties = {
        has: serviceType,
      };
    }

    if (minRating > 0) {
      whereClause.averageRating = {
        gte: minRating,
      };
    }

    // Postcode filtering via service areas
    if (postcode) {
      const serviceAreas = await db.contractorServiceArea.findMany({
        where: {
          postcode: postcode,
          isActive: true,
        },
        select: {
          contractorId: true,
        },
      });
      const postcodeContractorIds = serviceAreas.map(sa => sa.contractorId);

      if (postcodeContractorIds.length > 0) {
        whereClause.id = { in: postcodeContractorIds };
      } else {
        // No contractors service this postcode
        return NextResponse.json({
          success: true,
          contractors: [],
          total: 0,
          limit,
          offset,
        });
      }
    }

    // Build orderBy
    let orderBy: any = {};
    switch (sortBy) {
      case 'rating':
        orderBy = [
          { averageRating: 'desc' },
          { completedJobs: 'desc' },
        ];
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'name':
        orderBy = { businessName: 'asc' };
        break;
      case 'status':
        orderBy = [
          { verificationStatus: 'asc' },
          { businessName: 'asc' },
        ];
        break;
      default:
        orderBy = { averageRating: 'desc' };
    }

    // Fetch contractors with full details
    const [contractors, total] = await Promise.all([
      db.contractor.findMany({
        where: whereClause,
        include: {
          serviceAreas: {
            where: { isActive: true },
            select: {
              id: true,
              postcode: true,
              state: true,
              suburb: true,
              city: true,
              radiusKm: true,
              coverageLevel: true,
              isPrimaryArea: true,
              responseTimeMinutes: true,
            },
            orderBy: { isPrimaryArea: 'desc' },
          },
          iicrcCertifications: {
            where: {
              isActive: true,
            },
            select: {
              id: true,
              certificationLevel: true,
              certificationCode: true,
              expiryDate: true,
              isActive: true,
            },
            orderBy: { expiryDate: 'asc' },
          },
          documents: {
            select: {
              id: true,
              documentType: true,
              status: true,
              expiryDate: true,
              uploadedAt: true,
            },
            orderBy: { uploadedAt: 'desc' },
            take: 10,
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              createdAt: true,
            },
          },
        },
        orderBy,
        take: limit,
        skip: offset,
      }),
      db.contractor.count({ where: whereClause }),
    ]);

    // Add computed fields
    const enrichedContractors = contractors.map(contractor => {
      const pendingDocs = contractor.documents.filter(d => d.status === 'PENDING').length;
      const approvedDocs = contractor.documents.filter(d => d.status === 'APPROVED').length;
      const expiredCerts = contractor.iicrcCertifications.filter(
        c => c.expiryDate < new Date()
      ).length;

      return {
        ...contractor,
        stats: {
          pendingDocuments: pendingDocs,
          approvedDocuments: approvedDocs,
          totalDocuments: contractor.documents.length,
          activeCertifications: contractor.iicrcCertifications.length,
          expiredCertifications: expiredCerts,
          serviceAreasCount: contractor.serviceAreas.length,
          profileCompleteness: calculateProfileCompleteness(contractor),
        },
      };
    });

    return NextResponse.json({
      success: true,
      contractors: enrichedContractors,
      total,
      limit,
      offset,
      filters: {
        search,
        postcode,
        state,
        verificationStatus,
        serviceType,
        verifiedOnly,
        emergencyAvailable,
        minRating,
        sortBy,
      },
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * Helper function to calculate profile completeness percentage
 */
function calculateProfileCompleteness(contractor: any): number {
  const fields = [
    contractor.businessName,
    contractor.abnNumber,
    contractor.companyDescription,
    contractor.licenseNumber,
    contractor.licenseState,
    contractor.licenseExpiry,
    contractor.yearsInBusiness,
    contractor.teamSize,
    contractor.serviceRadius,
    contractor.primaryState,
    contractor.serviceAreas?.length > 0,
    contractor.documents?.length > 0,
  ];

  const completedFields = fields.filter(field =>
    field !== null && field !== undefined && field !== ''
  ).length;

  return Math.round((completedFields / fields.length) * 100);
}
