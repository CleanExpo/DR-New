// Report Export API Route
import { NextRequest, NextResponse } from 'next/server';
import { analyticsService } from '@/lib/services/analytics-service';
import { schemas, validateRequestBody } from '@/lib/services/validation-schemas';
import { requireAuth, PERMISSIONS } from '@/lib/middleware/auth';
import type { ExportReport } from '@/lib/services/analytics-service';

// POST /api/analytics/reports/export - Export analytics report
export const POST = requireAuth(
  async (req: NextRequest, user) => {
    try {
      // Parse and validate request body
      const body = await req.json();
      const reportConfig = validateRequestBody(schemas.exportReport, body);

      // Check tenant access
      const tenantId = user.tenantId;

      // Validate date range
      const dateFrom = new Date(reportConfig.dateRange.from);
      const dateTo = new Date(reportConfig.dateRange.to);

      if (dateFrom > dateTo) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Invalid date range: from date must be before to date'
            }
          },
          { status: 400 }
        );
      }

      // Check date range is not too large (max 1 year)
      const daysDiff = (dateTo.getTime() - dateFrom.getTime()) / (1000 * 60 * 60 * 24);
      if (daysDiff > 365) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: 'Date range cannot exceed 365 days'
            }
          },
          { status: 400 }
        );
      }

      // Create export report configuration
      const exportConfig: ExportReport = {
        type: reportConfig.type,
        format: reportConfig.format,
        dateRange: {
          from: dateFrom,
          to: dateTo
        },
        filters: reportConfig.filters
      };

      // Log report generation for audit trail
      console.log(`Report export requested by ${user.email}:`, {
        type: reportConfig.type,
        format: reportConfig.format,
        dateRange: reportConfig.dateRange,
        tenantId
      });

      // Generate the report
      const reportData = await analyticsService.exportReport(exportConfig);

      // Set appropriate headers based on format
      const headers = new Headers();
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `disaster-recovery-${reportConfig.type}-report-${timestamp}`;

      switch(reportConfig.format) {
        case 'csv':
          headers.set('Content-Type', 'text/csv');
          headers.set('Content-Disposition', `attachment; filename="${filename}.csv"`);
          break;

        case 'pdf':
          headers.set('Content-Type', 'application/pdf');
          headers.set('Content-Disposition', `attachment; filename="${filename}.pdf"`);
          break;

        case 'xlsx':
          headers.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          headers.set('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
          break;

        case 'json':
        default:
          headers.set('Content-Type', 'application/json');
          headers.set('Content-Disposition', `attachment; filename="${filename}.json"`);
          break;
      }

      // For JSON format, wrap in standard response
      if (reportConfig.format === 'json') {
        return NextResponse.json(
          {
            success: true,
            data: typeof reportData === 'string' ? JSON.parse(reportData) : reportData,
            meta: {
              timestamp: new Date().toISOString(),
              requestId: generateRequestId(),
              version: '1.0.0',
              report: {
                type: reportConfig.type,
                format: reportConfig.format,
                dateRange: reportConfig.dateRange,
                generatedBy: {
                  userId: user.id,
                  email: user.email,
                  role: user.role
                }
              }
            }
          },
          { headers }
        );
      }

      // For other formats, return raw data
      return new NextResponse(reportData, { headers });

    } catch (error) {
      console.error('Report export error:', error);

      if (error instanceof Error && error.message.includes('validation')) {
        return NextResponse.json(
          {
            success: false,
            error: {
              code: 'VALIDATION_ERROR',
              message: error.message,
              details: error
            }
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Failed to export report'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'MANAGER', // Minimum role for exporting reports
    permissions: [PERMISSIONS.EXPORT_REPORTS]
  }
);

// GET /api/analytics/reports/export - Get available report types and formats
export const GET = requireAuth(
  async (req: NextRequest, user) => {
    try {
      const reportTypes = [
        {
          type: 'financial',
          name: 'Financial Report',
          description: 'Revenue, costs, and financial metrics',
          availableFormats: ['json', 'csv', 'pdf', 'xlsx'],
          requiredRole: 'MANAGER'
        },
        {
          type: 'operational',
          name: 'Operational Report',
          description: 'Job completion, service metrics, and operational KPIs',
          availableFormats: ['json', 'csv', 'pdf', 'xlsx'],
          requiredRole: 'VIEWER'
        },
        {
          type: 'performance',
          name: 'Performance Report',
          description: 'Contractor performance, ratings, and efficiency metrics',
          availableFormats: ['json', 'csv', 'pdf', 'xlsx'],
          requiredRole: 'MANAGER'
        },
        {
          type: 'insurance',
          name: 'Insurance Report',
          description: 'Insurance claims, approvals, and insurer metrics',
          availableFormats: ['json', 'csv', 'pdf', 'xlsx'],
          requiredRole: 'MANAGER'
        },
        {
          type: 'compliance',
          name: 'Compliance Report',
          description: 'Regulatory compliance, certifications, and audit data',
          availableFormats: ['json', 'csv', 'pdf'],
          requiredRole: 'ADMIN'
        }
      ];

      // Filter reports based on user's role
      const availableReports = reportTypes.filter(report => {
        const roleHierarchy = ['VIEWER', 'CONTRACTOR', 'OPERATOR', 'MANAGER', 'ADMIN'];
        const userLevel = roleHierarchy.indexOf(user.role);
        const requiredLevel = roleHierarchy.indexOf(report.requiredRole);
        return userLevel >= requiredLevel;
      });

      return NextResponse.json(
        {
          success: true,
          data: {
            availableReports,
            maxDateRange: 365, // days
            supportedFilters: [
              'serviceTypes',
              'locations',
              'insurers',
              'contractors',
              'priority',
              'status'
            ]
          },
          meta: {
            timestamp: new Date().toISOString(),
            requestId: generateRequestId(),
            version: '1.0.0'
          }
        }
      );
    } catch (error) {
      console.error('Report types error:', error);

      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'Failed to fetch report types'
          }
        },
        { status: 500 }
      );
    }
  },
  {
    role: 'VIEWER',
    permissions: [PERMISSIONS.VIEW_ANALYTICS]
  }
);

// OPTIONS /api/analytics/reports/export - Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}