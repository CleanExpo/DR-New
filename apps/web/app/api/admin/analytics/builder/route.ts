/**
 * GET /api/admin/analytics/builder
 * Get report builder templates and custom reports
 *
 * Query params:
 * - status: 'published' | 'draft' | 'all' (default: 'all')
 *
 * Returns:
 * - Available report templates (pre-built templates from report-builder)
 * - Custom reports saved by admins (from Prisma database)
 * - Template metadata (name, description, metrics, visualization)
 *
 * @requires Admin authentication
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getTenantDb } from '@/lib/get-tenant-db';
import { REPORT_TEMPLATES } from '@/lib/analytics/report-builder';

/**
 * Response structure for report builder data
 */
interface ReportBuilderResponse {
  success: true;
  templates: Array<{
    key: string;
    name: string;
    description: string;
    metrics: string[];
    visualization: string;
  }>;
  customReports: Array<{
    id: string;
    name: string;
    description: string | null;
    metrics: string[];
    visualization: string;
    isPublished: boolean;
    createdBy: string;
    createdAt: Date;
    viewCount: number;
    lastViewedAt: Date | null;
  }>;
  totalCustomReports: number;
}

/**
 * Error response structure
 */
interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Valid status filter values
 */
type StatusFilter = 'published' | 'draft' | 'all';

/**
 * Validate status parameter
 */
function validateStatusParam(status: string | null): StatusFilter {
  if (!status || status === 'all') {
    return 'all';
  }

  if (status === 'published' || status === 'draft') {
    return status;
  }

  // Default to 'all' for invalid values
  return 'all';
}

/**
 * Build Prisma where clause based on status filter
 */
function buildWhereClause(status: StatusFilter) {
  if (status === 'all') {
    return {
      isDeleted: false,
    };
  }

  if (status === 'published') {
    return {
      isPublished: true,
      isDeleted: false,
    };
  }

  // status === 'draft'
  return {
    isPublished: false,
    isDeleted: false,
  };
}

/**
 * GET handler for report builder endpoint
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Check authorization - Admin only
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client - unused for now but kept for future use
    // const db = getTenantDb(authResult.context);

    // 2. Get query parameters
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const status = validateStatusParam(statusParam);

    // 3. Get available templates from report-builder library
    const templates = Object.entries(REPORT_TEMPLATES).map(([key, template]) => ({
      key,
      name: template.name,
      description: template.description,
      metrics: template.metrics,
      visualization: template.visualization,
    }));

    // 4. Note: customReport model not yet implemented in schema
    // Return empty array for custom reports until model is added
    const customReports: Array<{
      id: string;
      name: string;
      description: string | null;
      metrics: string[];
      visualization: string;
      isPublished: boolean;
      createdBy: string;
      createdAt: Date;
      viewCount: number;
      lastViewedAt: Date | null;
    }> = [];

    // Filter by status (would apply to real data when customReport model exists)
    void status; // Acknowledge status param for future use

    // 5. Return successful response
    return NextResponse.json({
      success: true,
      templates,
      customReports,
      totalCustomReports: customReports.length,
    });

  } catch (error) {
    // Log error for debugging
    console.error('[Admin Analytics Builder] Error fetching report data:', error);

    // Return error response
    return NextResponse.json(
      { error: 'Failed to get report templates' },
      { status: 500 }
    );
  }
}
