/**
 * Payment Reconciliation API
 *
 * GET /api/admin/payments/reconcile
 * Generate and retrieve payment reconciliation report
 *
 * Query params:
 * - startDate: ISO date string (default: 30 days ago)
 * - endDate: ISO date string (default: today)
 * - severity: LOW | MEDIUM | HIGH (optional - filter issues)
 *
 * Required: ADMIN
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  reconcilePayments,
  getReconciliationIssues,
} from '@/lib/payments/reconciliation';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    // Parse date parameters
    const endDateParam = searchParams.get('endDate');
    const startDateParam = searchParams.get('startDate');
    const severity = searchParams.get('severity') as 'LOW' | 'MEDIUM' | 'HIGH' | null;

    const endDate = endDateParam ? new Date(endDateParam) : new Date();
    const startDate = startDateParam
      ? new Date(startDateParam)
      : new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    // Validate dates
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format. Use ISO format (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    if (startDate > endDate) {
      return NextResponse.json(
        { error: 'startDate must be before endDate' },
        { status: 400 }
      );
    }

    // Generate reconciliation report
    const report = await reconcilePayments(startDate, endDate);

    // Filter by severity if requested
    let filteredIssues = report.issues;
    if (severity) {
      filteredIssues = filteredIssues.filter((i) => i.severity === severity);
    }

    return NextResponse.json({
      success: true,
      report: {
        generatedAt: report.generatedAt,
        period: report.period,
        statistics: report.statistics,
        summary: report.summary,
        issues: filteredIssues,
        issueCount: {
          total: report.issues.length,
          critical: report.issues.filter((i) => i.severity === 'HIGH').length,
          warning: report.issues.filter((i) => i.severity === 'MEDIUM').length,
          info: report.issues.filter((i) => i.severity === 'LOW').length,
        },
      },
    });
  } catch (error) {
    console.error('Reconciliation error:', error);

    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('not configured')) {
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: 'Failed to generate reconciliation report',
        details: message,
      },
      { status: 500 }
    );
  }
}
