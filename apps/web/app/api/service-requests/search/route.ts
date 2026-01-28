/**
 * Service Request Search API Route
 * Handles searching and filtering service requests
 * GET /api/service-requests/search - Search for service requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole } from '@/lib/auth-middleware';
import { ZodError } from 'zod';
import { getTenantDb } from '@/lib/get-tenant-db';
import { serviceRequestSearchSchema } from '@/lib/validation-schemas';
import {
  handleValidationError,
  handleUnexpectedError,
} from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET /api/service-requests/search - Search for service requests
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;
    const db = getTenantDb(authResult.context);

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      query: searchParams.get('q') ?? searchParams.get('query') ?? undefined,
      serviceCategory: searchParams.get('category') ?? searchParams.get('serviceCategory') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      offset: searchParams.get('offset') ?? undefined,
      createdAfter: searchParams.get('createdAfter') ?? undefined,
      createdBefore: searchParams.get('createdBefore') ?? undefined,
    };

    // Remove undefined values for cleaner validation
    const cleanParams = Object.fromEntries(
      Object.entries(rawParams).filter(([, value]) => value !== undefined)
    );

    // Validate parameters using Zod schema
    const validatedParams = serviceRequestSearchSchema.parse(cleanParams);

    // Build search where clause
    const whereClause: any = {};

    // Text search across multiple fields using OR
    if (validatedParams.query && validatedParams.query.trim().length > 0) {
      const searchTerm = validatedParams.query.trim();
      whereClause.OR = [
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { serviceTitle: { contains: searchTerm, mode: 'insensitive' } },
        { location: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    // Exact match filters
    if (validatedParams.serviceCategory) {
      whereClause.serviceCategory = validatedParams.serviceCategory;
    }

    if (validatedParams.status) {
      whereClause.status = validatedParams.status;
    }

    // Location text match
    if (validatedParams.location && !validatedParams.query) {
      whereClause.location = { contains: validatedParams.location, mode: 'insensitive' };
    }

    // Date range filters
    if (validatedParams.createdAfter || validatedParams.createdBefore) {
      whereClause.createdAt = {};
      if (validatedParams.createdAfter) {
        whereClause.createdAt.gte = validatedParams.createdAfter;
      }
      if (validatedParams.createdBefore) {
        whereClause.createdAt.lte = validatedParams.createdBefore;
      }
    }

    // Determine user scope
    const isUserAdmin = requireRole(user, ['ADMIN', 'SUPER_ADMIN']);

    // Clients see only their own requests
    if (!isUserAdmin) {
      whereClause.userId = user.id;
    }

    // Execute count and findMany queries in parallel
    const [total, data] = await Promise.all([
      db.serviceRequest.count({ where: whereClause }),
      db.serviceRequest.findMany({
        where: whereClause,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          matches: {
            select: {
              id: true,
              matchScore: true,
              status: true,
            },
          },
        },
        orderBy: [{ createdAt: 'desc' }],
        take: validatedParams.limit,
        skip: validatedParams.offset,
      }),
    ]);

    const hasMore = validatedParams.offset + data.length < total;

    return NextResponse.json({
      success: true,
      data,
      total,
      count: data.length,
      pagination: {
        limit: validatedParams.limit,
        offset: validatedParams.offset,
        hasMore,
      },
      searchCriteria: {
        query: validatedParams.query || null,
        serviceCategory: validatedParams.serviceCategory || null,
        status: validatedParams.status || null,
        location: validatedParams.location || null,
        createdAfter: validatedParams.createdAfter?.toISOString() || null,
        createdBefore: validatedParams.createdBefore?.toISOString() || null,
      },
      userScope: isUserAdmin ? 'all' : 'own',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
