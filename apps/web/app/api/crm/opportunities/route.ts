/**
 * Opportunities API
 *
 * POST /api/crm/opportunities - Create opportunity
 * GET /api/crm/opportunities - List opportunities
 *
 * @route /api/crm/opportunities
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { OpportunityService } from '@/lib/crm/opportunity.service';
import { AdvancedLogger } from '@/lib/logger/advanced-logging';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);
    const opportunityService = new OpportunityService(db);

    const body = await request.json();

    // Validate required fields
    if (!body.serviceRequestId) {
      return NextResponse.json(
        {
          success: false,
          error: 'serviceRequestId is required',
        },
        { status: 400 }
      );
    }

    // Create opportunity from service request
    const opportunity = await opportunityService.createFromServiceRequest(
      body.serviceRequestId
    );

    AdvancedLogger.info('Opportunity created via API', {
      opportunityId: opportunity.id,
    });

    return NextResponse.json({
      success: true,
      data: opportunity,
    }, { status: 201 });
  } catch (error: any) {
    AdvancedLogger.error('Opportunity creation failed', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const customerLifecycleId = searchParams.get('customerLifecycleId');
    const stage = searchParams.get('stage');

    const where: any = {};
    if (customerLifecycleId) where.customerLifecycleId = customerLifecycleId;
    if (stage) where.stage = stage;

    const opportunities = await db.opportunity.findMany({
      where,
      include: {
        customerLifecycle: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        assignedContractor: {
          select: {
            businessName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: opportunities,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
