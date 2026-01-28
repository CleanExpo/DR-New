/**
 * AI Report Generation API
 *
 * Phase E.3: Intelligent reporting system
 * - POST: Generate AI-powered reports
 * - GET: Get available report types or retrieve generated reports
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { getOrchestrator } from '@/lib/agents/core/orchestrator';
import type {
  ReportType,
  ReportFormat,
  GeneratedReport,
} from '@/lib/agents/workflows/report-generation';

export const dynamic = 'force-dynamic';

// In-memory cache for generated reports (would use Redis in production)
const reportCache: Map<string, GeneratedReport> = new Map();

interface GenerateReportRequest {
  reportType: ReportType;
  format?: ReportFormat;
  dateRange?: {
    start: string;
    end: string;
  };
  filters?: {
    state?: string;
    serviceType?: string;
    contractorId?: string;
    clientId?: string;
  };
  customQuery?: string;
  includeCharts?: boolean;
  includeRecommendations?: boolean;
}

interface NaturalLanguageRequest {
  query: string;
}

const REPORT_TYPE_INFO: Record<
  ReportType,
  { name: string; description: string; defaultPeriod: string }
> = {
  DAILY_SUMMARY: {
    name: 'Daily Summary',
    description: 'Overview of daily operations including claims, bookings, and key metrics',
    defaultPeriod: '1 day',
  },
  WEEKLY_PERFORMANCE: {
    name: 'Weekly Performance',
    description: 'Week-over-week performance analysis with trends and insights',
    defaultPeriod: '7 days',
  },
  MONTHLY_ANALYTICS: {
    name: 'Monthly Analytics',
    description: 'Comprehensive monthly analysis with detailed breakdowns',
    defaultPeriod: '30 days',
  },
  CONTRACTOR_PERFORMANCE: {
    name: 'Contractor Performance',
    description: 'Analysis of contractor metrics, ratings, and completion rates',
    defaultPeriod: '30 days',
  },
  CLAIMS_ANALYSIS: {
    name: 'Claims Analysis',
    description: 'Detailed analysis of claims by type, status, and trends',
    defaultPeriod: '30 days',
  },
  FINANCIAL_OVERVIEW: {
    name: 'Financial Overview',
    description: 'Revenue, costs, and financial metrics summary',
    defaultPeriod: '30 days',
  },
  CUSTOM: {
    name: 'Custom Report',
    description: 'Custom report based on natural language query',
    defaultPeriod: 'As specified',
  },
};

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const body = await request.json();

    // Check if this is a natural language query
    if (body.query && !body.reportType) {
      return handleNaturalLanguageQuery(body as NaturalLanguageRequest, user.id);
    }

    // Standard report generation
    const reportRequest = body as GenerateReportRequest;

    // Validate report type
    if (!reportRequest.reportType) {
      return NextResponse.json(
        { success: false, error: 'reportType is required' },
        { status: 400 }
      );
    }

    const validTypes: ReportType[] = [
      'DAILY_SUMMARY',
      'WEEKLY_PERFORMANCE',
      'MONTHLY_ANALYTICS',
      'CONTRACTOR_PERFORMANCE',
      'CLAIMS_ANALYSIS',
      'FINANCIAL_OVERVIEW',
      'CUSTOM',
    ];

    if (!validTypes.includes(reportRequest.reportType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid reportType. Must be one of: ${validTypes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Set default date range based on report type
    let dateRange = reportRequest.dateRange;
    if (!dateRange) {
      const now = new Date();
      const periodDays =
        reportRequest.reportType === 'DAILY_SUMMARY'
          ? 1
          : reportRequest.reportType === 'WEEKLY_PERFORMANCE'
            ? 7
            : 30;

      dateRange = {
        start: new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000).toISOString(),
        end: now.toISOString(),
      };
    }

    // Execute report generation workflow
    const orchestrator = getOrchestrator();
    const result = await orchestrator.execute({
      workflowType: 'REPORT_GENERATION' as any,
      input: {
        reportType: reportRequest.reportType,
        format: reportRequest.format || 'SUMMARY',
        dateRange,
        filters: reportRequest.filters,
        customQuery: reportRequest.customQuery,
        includeCharts: reportRequest.includeCharts ?? true,
        includeRecommendations: reportRequest.includeRecommendations ?? true,
      },
      userId: session.user.id,
    });

    if (result.status === 'FAILED') {
      return NextResponse.json(
        { success: false, error: result.error || 'Report generation failed' },
        { status: 500 }
      );
    }

    const output = result.output as { report: GeneratedReport; summary: Record<string, unknown> };

    // Cache the generated report
    if (output.report?.id) {
      reportCache.set(output.report.id, output.report);

      // Clean old cache entries (keep last 100)
      if (reportCache.size > 100) {
        const oldestKey = reportCache.keys().next().value;
        if (oldestKey) reportCache.delete(oldestKey);
      }
    }

    return NextResponse.json({
      success: true,
      jobId: result.jobId,
      report: {
        id: output.report?.id,
        type: output.report?.type,
        format: output.report?.format,
        title: output.report?.title,
        summary: output.report?.summary,
        sections: output.report?.sections,
        period: {
          start: output.report?.periodStart,
          end: output.report?.periodEnd,
        },
        generatedAt: output.report?.generatedAt,
      },
      metrics: {
        dataPoints: output.summary?.dataPointsCount || 0,
        insights: output.summary?.insightsCount || 0,
        anomalies: output.summary?.anomaliesCount || 0,
        recommendations: output.summary?.recommendationsCount || 0,
      },
      dataPoints: output.report?.dataPoints || [],
      insights: output.report?.insights || [],
      anomalies: output.report?.anomalies || [],
      recommendations: output.report?.recommendations || [],
    });
  } catch (error) {
    console.error('Report generation API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Report generation failed',
      },
      { status: 500 }
    );
  }
}

async function handleNaturalLanguageQuery(
  request: NaturalLanguageRequest,
  userId: string
): Promise<NextResponse> {
  const { query } = request;

  // Parse natural language query to determine report type and parameters
  const lowerQuery = query.toLowerCase();

  let reportType: ReportType = 'CUSTOM';
  let format: ReportFormat = 'SUMMARY';
  let periodDays = 7;

  // Detect report type from query
  if (lowerQuery.includes('daily') || lowerQuery.includes('today')) {
    reportType = 'DAILY_SUMMARY';
    periodDays = 1;
  } else if (lowerQuery.includes('weekly') || lowerQuery.includes('week')) {
    reportType = 'WEEKLY_PERFORMANCE';
    periodDays = 7;
  } else if (lowerQuery.includes('monthly') || lowerQuery.includes('month')) {
    reportType = 'MONTHLY_ANALYTICS';
    periodDays = 30;
  } else if (lowerQuery.includes('contractor') || lowerQuery.includes('performance')) {
    reportType = 'CONTRACTOR_PERFORMANCE';
  } else if (lowerQuery.includes('claim') || lowerQuery.includes('insurance')) {
    reportType = 'CLAIMS_ANALYSIS';
  } else if (
    lowerQuery.includes('financial') ||
    lowerQuery.includes('revenue') ||
    lowerQuery.includes('money')
  ) {
    reportType = 'FINANCIAL_OVERVIEW';
  }

  // Detect format from query
  if (lowerQuery.includes('detailed') || lowerQuery.includes('comprehensive')) {
    format = 'DETAILED';
  } else if (lowerQuery.includes('executive') || lowerQuery.includes('summary for')) {
    format = 'EXECUTIVE';
  } else if (lowerQuery.includes('technical') || lowerQuery.includes('data')) {
    format = 'TECHNICAL';
  }

  // Detect time period
  if (lowerQuery.includes('q1') || lowerQuery.includes('quarter 1')) {
    periodDays = 90;
  } else if (lowerQuery.includes('q2') || lowerQuery.includes('quarter 2')) {
    periodDays = 90;
  } else if (lowerQuery.includes('year') || lowerQuery.includes('annual')) {
    periodDays = 365;
  }

  // Detect filters
  const filters: Record<string, string> = {};

  // State detection
  const stateMatches = lowerQuery.match(/\b(nsw|vic|qld|wa|sa|tas|nt|act)\b/i);
  if (stateMatches) {
    filters.state = stateMatches[1].toUpperCase();
  }

  // Service type detection
  if (lowerQuery.includes('water')) {
    filters.serviceType = 'WATER_DAMAGE';
  } else if (lowerQuery.includes('fire')) {
    filters.serviceType = 'FIRE_RESTORATION';
  } else if (lowerQuery.includes('mould') || lowerQuery.includes('mold')) {
    filters.serviceType = 'MOULD_REMEDIATION';
  } else if (lowerQuery.includes('storm')) {
    filters.serviceType = 'STORM_DAMAGE';
  }

  const now = new Date();
  const dateRange = {
    start: new Date(now.getTime() - periodDays * 24 * 60 * 60 * 1000).toISOString(),
    end: now.toISOString(),
  };

  // Execute report generation
  const orchestrator = getOrchestrator();
  const result = await orchestrator.execute({
    workflowType: 'REPORT_GENERATION' as any,
    input: {
      reportType,
      format,
      dateRange,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      customQuery: query,
      includeCharts: true,
      includeRecommendations: true,
    },
    userId,
  });

  if (result.status === 'FAILED') {
    return NextResponse.json(
      { success: false, error: result.error || 'Report generation failed' },
      { status: 500 }
    );
  }

  const output = result.output as { report: GeneratedReport; summary: Record<string, unknown> };

  return NextResponse.json({
    success: true,
    jobId: result.jobId,
    parsedQuery: {
      originalQuery: query,
      detectedReportType: reportType,
      detectedFormat: format,
      detectedPeriod: `${periodDays} days`,
      detectedFilters: filters,
    },
    report: {
      id: output.report?.id,
      type: output.report?.type,
      format: output.report?.format,
      title: output.report?.title,
      summary: output.report?.summary,
      sections: output.report?.sections,
      period: {
        start: output.report?.periodStart,
        end: output.report?.periodEnd,
      },
      generatedAt: output.report?.generatedAt,
    },
    metrics: {
      dataPoints: output.summary?.dataPointsCount || 0,
      insights: output.summary?.insightsCount || 0,
      anomalies: output.summary?.anomaliesCount || 0,
      recommendations: output.summary?.recommendationsCount || 0,
    },
    dataPoints: output.report?.dataPoints || [],
    insights: output.report?.insights || [],
    recommendations: output.report?.recommendations || [],
  });
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Get tenant-scoped database client
    const db = getTenantDb(authResult.context);

    const { searchParams } = new URL(request.url);
    if (false) {
      return NextResponse.json(
        { success: false, error: 'Unauthorised - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'types';
    const reportId = searchParams.get('reportId');

    // Get specific report from cache
    if (reportId) {
      const report = reportCache.get(reportId);

      if (!report) {
        return NextResponse.json({
          success: true,
          reportId,
          found: false,
          message: 'Report not found or expired',
        });
      }

      return NextResponse.json({
        success: true,
        reportId,
        found: true,
        report: {
          id: report.id,
          type: report.type,
          format: report.format,
          title: report.title,
          summary: report.summary,
          sections: report.sections,
          dataPoints: report.dataPoints,
          insights: report.insights,
          anomalies: report.anomalies,
          recommendations: report.recommendations,
          period: {
            start: report.periodStart,
            end: report.periodEnd,
          },
          generatedAt: report.generatedAt,
        },
      });
    }

    switch (mode) {
      case 'types':
        return NextResponse.json({
          success: true,
          mode: 'types',
          reportTypes: Object.entries(REPORT_TYPE_INFO).map(([type, info]) => ({
            type,
            name: info.name,
            description: info.description,
            defaultPeriod: info.defaultPeriod,
          })),
          formats: [
            { format: 'SUMMARY', description: 'Brief overview with key metrics' },
            { format: 'DETAILED', description: 'Comprehensive analysis with all data' },
            { format: 'EXECUTIVE', description: 'High-level strategic summary' },
            { format: 'TECHNICAL', description: 'Data-focused with methodology notes' },
          ],
        });

      case 'cached':
        const cachedReports = Array.from(reportCache.values())
          .sort(
            (a, b) =>
              new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
          )
          .slice(0, 20);

        return NextResponse.json({
          success: true,
          mode: 'cached',
          reports: cachedReports.map((r) => ({
            id: r.id,
            type: r.type,
            format: r.format,
            title: r.title,
            generatedAt: r.generatedAt,
            period: {
              start: r.periodStart,
              end: r.periodEnd,
            },
          })),
          total: reportCache.size,
        });

      case 'examples':
        return NextResponse.json({
          success: true,
          mode: 'examples',
          examples: [
            {
              query: 'Generate weekly contractor performance report for NSW',
              description: 'Natural language query for contractor report',
            },
            {
              query: 'Show me daily claims summary',
              description: 'Simple daily summary request',
            },
            {
              query: 'Create detailed monthly financial overview',
              description: 'Detailed financial report',
            },
            {
              query: 'Compare water damage claims in VIC vs QLD',
              description: 'Comparative analysis query',
            },
          ],
        });

      default:
        return NextResponse.json(
          { success: false, error: `Unknown mode: ${mode}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Report generation GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get report data',
      },
      { status: 500 }
    );
  }
}
