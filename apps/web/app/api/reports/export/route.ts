/**
 * POST /api/reports/export
 * Generate a PDF management report
 * Requires ADMIN or SUPER_ADMIN role
 *
 * Returns the report data as JSON — PDF generation happens client-side
 * using jspdf to avoid server-side canvas dependencies in Edge/Node.
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const { user } = authResult.context;
    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    // Fetch report data from our own GET endpoint
    const reportUrl = new URL('/api/reports', request.url);
    const reportResponse = await fetch(reportUrl.toString(), {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!reportResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch report data' },
        { status: 500 }
      );
    }

    const reportData = await reportResponse.json();

    return NextResponse.json({
      success: true,
      exportData: reportData.data,
      generatedAt: new Date().toISOString(),
      generatedBy: user.email,
    });
  } catch (error) {
    console.error('[Reports] Error exporting report:', error);
    return NextResponse.json(
      { error: 'Failed to export report' },
      { status: 500 }
    );
  }
}
