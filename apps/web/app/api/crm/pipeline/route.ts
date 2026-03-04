/**
 * Sales Pipeline API
 *
 * GET /api/crm/pipeline - List all opportunities with filtering
 *
 * @route GET /api/crm/pipeline
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { OpportunityStage } from '@prisma/client';
import { OpportunityService } from '@/lib/crm/opportunity.service';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const opportunityService = new OpportunityService(db);

    const { searchParams } = new URL(request.url);

    const stage = searchParams.get('stage') as OpportunityStage | null;
    const state = searchParams.get('state');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (stage) where.stage = stage;
    if (state) where.serviceState = state;

    // Fetch pipeline metrics and opportunities in parallel
    const [metrics, opportunities, total] = await Promise.all([
      opportunityService.getPipelineMetrics(),
      db.opportunity.findMany({
        where,
        include: {
          customerLifecycle: {
            include: {
              user: {
                select: {
                  name: true,
                  email: true,
                  australianState: true,
                },
              },
            },
          },
          assignedContractor: {
            select: {
              businessName: true,
              averageRating: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      db.opportunity.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        opportunities,
        metrics,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pipeline data' },
      { status: 500 }
    );
  }
}
