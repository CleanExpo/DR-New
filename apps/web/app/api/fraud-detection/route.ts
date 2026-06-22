// @ts-nocheck

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { fraudReviewSchema, validateRequest, formatZodErrors } from '@/lib/validation';

export interface FraudRiskAssessment {
  riskScore: number;
  flags: string[];
  recommendation: 'APPROVE' | 'REVIEW' | 'REJECT';
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
}

// Get flagged transactions
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const minRiskScore = parseFloat(searchParams.get('minRiskScore') || '0');

    const skip = (page - 1) * limit;

    const where: any = {};

    if (status !== 'all') {
      where.reviewStatus = status.toUpperCase();
    }

    if (minRiskScore > 0) {
      where.riskScore = { gte: minRiskScore };
    }

    const [flaggedTransactions, total] = await Promise.all([
      db.fraudAlert.findMany({
        where,
        include: {
          payment: {
            include: {
              client: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              booking: {
                select: {
                  id: true,
                  serviceType: true,
                },
              },
            },
          },
          reviewedBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: [
          { riskScore: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
      }),
      db.fraudAlert.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: flaggedTransactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + flaggedTransactions.length < total,
      },
    });
  } catch (error) {
    console.error('Get fraud alerts error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Review a flagged transaction
export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const db = getTenantDb(authResult.context);

    const body = await request.json();

    const validation = validateRequest(fraudReviewSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { transactionId, action, reason, notes } = validation.data;

    // Get the fraud alert
    const fraudAlert = await db.fraudAlert.findFirst({
      where: { paymentId: transactionId },
    });

    if (!fraudAlert) {
      return NextResponse.json(
        { success: false, error: 'Fraud alert not found' },
        { status: 404 }
      );
    }

    // Update fraud alert
    const updatedAlert = await db.fraudAlert.update({
      where: { id: fraudAlert.id },
      data: {
        reviewStatus: action,
        reviewedById: user.id,
        reviewedAt: new Date(),
        reviewNotes: notes,
        reviewReason: reason,
      },
    });

    // Update payment status based on action
    if (action === 'APPROVE') {
      await db.payment.update({
        where: { id: transactionId },
        data: { status: 'COMPLETED' },
      });
    } else if (action === 'REJECT') {
      await db.payment.update({
        where: { id: transactionId },
        data: { status: 'FAILED', failureReason: reason || 'Rejected due to fraud concerns' },
      });
    }

    return NextResponse.json({
      success: true,
      data: updatedAlert,
      message: `Transaction ${action.toLowerCase()}ed successfully`,
    });
  } catch (error) {
    console.error('Review fraud alert error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
