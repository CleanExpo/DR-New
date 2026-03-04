/**
 * Competitor Management API Routes
 *
 * GET /api/competitor-analysis/competitors - List competitors with filters
 * POST /api/competitor-analysis/competitors - Add new competitor
 * PUT /api/competitor-analysis/competitors - Update competitor
 * DELETE /api/competitor-analysis/competitors - Remove competitor
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { z } from 'zod';

// Validation schemas
const createCompetitorSchema = z.object({
  domain: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(['RESTORATION_COMPANY', 'INSURANCE_NETWORK', 'CONTRACTOR_MARKETPLACE', 'INDUSTRY_ASSOCIATION']),
  priority: z.number().min(1).max(10).default(5),
  businessModel: z.string().optional(),
  targetMarket: z.string().optional(),
  geographicFocus: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const updateCompetitorSchema = z.object({
  id: z.string(),
  domain: z.string().optional(),
  name: z.string().optional(),
  priority: z.number().min(1).max(10).optional(),
  isActive: z.boolean().optional(),
  businessModel: z.string().optional(),
  targetMarket: z.string().optional(),
  geographicFocus: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

/**
 * GET - List competitors with filters (for dashboard)
 */
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    const priority = searchParams.get('priority');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};

    if (category) {
      where.category = category;
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    } else {
      where.isActive = true; // Default to active only
    }

    if (priority) {
      where.priority = { gte: parseInt(priority) };
    }

    // Get all competitors with their latest analysis
    const competitors = await db.competitor.findMany({
      where,
      include: {
        analyses: {
          orderBy: { analysisDate: 'desc' },
          take: 1,
        },
        _count: {
          select: { keywords: true },
        },
      },
      orderBy: { priority: 'desc' },
      take: limit,
      skip: offset,
    });

    // Transform to table row format
    const tableRows = competitors.map((competitor) => {
      const latestAnalysis = competitor.analyses[0];

      return {
        id: competitor.id,
        name: competitor.name,
        domain: competitor.domain,
        category: competitor.category,
        priority: competitor.priority,
        lastAnalyzed: competitor.lastAnalyzedAt,
        traffic: latestAnalysis?.organicTraffic || 0,
        keywords: competitor._count.keywords,
        domainRating: latestAnalysis?.domainRating || 0,
        isActive: competitor.isActive,
      };
    });

    return NextResponse.json(tableRows);
  } catch (error: any) {
    console.error('[API] Error fetching competitors:', error);

    return NextResponse.json(
      {
        success: false,
        error: { code: 'FETCH_ERROR', message: 'Failed to fetch competitors' },
      },
      { status: 500 }
    );
  }
}

/**
 * POST - Add new competitor
 */
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const body = await request.json();

    // Validate input
    const validatedData = createCompetitorSchema.parse(body);

    // Check if competitor already exists
    const existing = await db.competitor.findUnique({
      where: { domain: validatedData.domain },
    });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'DUPLICATE_COMPETITOR',
            message: `Competitor with domain ${validatedData.domain} already exists`,
          },
        },
        { status: 409 }
      );
    }

    // Create competitor
    const competitor = await db.competitor.create({
      data: validatedData,
    });

    return NextResponse.json({
      success: true,
      data: competitor,
    }, { status: 201 });
  } catch (error: any) {
    console.error('[API] Error creating competitor:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: 'CREATE_ERROR', message: 'Failed to create competitor' },
      },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update competitor
 */
export async function PUT(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const body = await request.json();

    // Validate input
    const validatedData = updateCompetitorSchema.parse(body);

    const { id, ...updateData } = validatedData;

    // Update competitor
    const competitor = await db.competitor.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: competitor,
    });
  } catch (error: any) {
    console.error('[API] Error updating competitor:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid input data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Competitor not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: 'UPDATE_ERROR', message: 'Failed to update competitor' },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove competitor
 */
export async function DELETE(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'MISSING_ID',
            message: 'Competitor ID is required',
          },
        },
        { status: 400 }
      );
    }

    // Delete competitor
    await db.competitor.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Competitor deleted successfully',
    });
  } catch (error: any) {
    console.error('[API] Error deleting competitor:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'NOT_FOUND',
            message: 'Competitor not found',
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: { code: 'DELETE_ERROR', message: 'Failed to delete competitor' },
      },
      { status: 500 }
    );
  }
}
