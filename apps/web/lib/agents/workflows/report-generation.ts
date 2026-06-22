// @ts-nocheck

/**
 * Report Generation Workflow - LangGraph implementation
 *
 * Phase E.3: Intelligent reporting system
 *
 * Features:
 * 1. Natural language report generation
 * 2. Insight extraction and anomaly highlighting
 * 3. Actionable recommendations
 * 4. Multiple report types (daily, weekly, monthly, custom)
 */

import { StateGraph, Annotation, END, START } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { registerWorkflow, WorkflowExecutionConfig } from '../core/orchestrator';
import { WorkflowError } from '../types';
import { prisma } from '@/lib/prisma';

// ============================================================================
// TYPES
// ============================================================================

export type ReportType =
  | 'DAILY_SUMMARY'
  | 'WEEKLY_PERFORMANCE'
  | 'MONTHLY_ANALYTICS'
  | 'CONTRACTOR_PERFORMANCE'
  | 'CLAIMS_ANALYSIS'
  | 'FINANCIAL_OVERVIEW'
  | 'CUSTOM';

export type ReportFormat = 'SUMMARY' | 'DETAILED' | 'EXECUTIVE' | 'TECHNICAL';

export interface ReportRequest {
  reportType: ReportType;
  format: ReportFormat;
  dateRange: {
    start: Date;
    end: Date;
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

export interface DataPoint {
  metric: string;
  value: number | string;
  previousValue?: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'stable';
  unit?: string;
}

export interface Insight {
  id: string;
  type: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | 'ALERT';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  title: string;
  description: string;
  metric?: string;
  recommendation?: string;
}

export interface Anomaly {
  id: string;
  metric: string;
  expectedValue: number;
  actualValue: number;
  deviation: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  possibleCause: string;
  suggestedAction: string;
}

export interface Recommendation {
  id: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  category: string;
  title: string;
  description: string;
  expectedImpact: string;
  effort: 'LOW' | 'MEDIUM' | 'HIGH';
  metrics?: string[];
}

export interface GeneratedReport {
  id: string;
  type: ReportType;
  format: ReportFormat;
  title: string;
  summary: string;
  sections: ReportSection[];
  dataPoints: DataPoint[];
  insights: Insight[];
  anomalies: Anomaly[];
  recommendations: Recommendation[];
  generatedAt: Date;
  periodStart: Date;
  periodEnd: Date;
  metadata: Record<string, unknown>;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
  dataPoints?: DataPoint[];
  chartConfig?: Record<string, unknown>;
}

// ============================================================================
// STATE ANNOTATION
// ============================================================================

const ReportGenerationAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (curr, update) => [...curr, ...update],
    default: () => [],
  }),
  request: Annotation<ReportRequest | null>({
    reducer: (_curr, update) => update,
    default: () => null,
  }),
  rawData: Annotation<Record<string, unknown>>({
    reducer: (_curr, update) => ({ ...(_curr || {}), ...update }),
    default: () => ({}),
  }),
  dataPoints: Annotation<DataPoint[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  insights: Annotation<Insight[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  anomalies: Annotation<Anomaly[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  recommendations: Annotation<Recommendation[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  sections: Annotation<ReportSection[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  report: Annotation<GeneratedReport | null>({
    reducer: (_curr, update) => update,
    default: () => null,
  }),
  isComplete: Annotation<boolean>({
    reducer: (_curr, update) => update,
    default: () => false,
  }),
});

type ReportState = typeof ReportGenerationAnnotation.State;

// ============================================================================
// PROMPTS
// ============================================================================

const SYSTEM_PROMPT = `You are an expert business intelligence analyst for an Australian disaster recovery platform.
Your role is to generate insightful reports from operational data.

Key metrics to track:
1. Claims: Volume, processing time, approval rate, average value
2. Bookings: Volume, completion rate, cancellation rate, revenue
3. Contractors: Active count, performance ratings, response times
4. Financial: Revenue, costs, margins, outstanding payments

Australian business context:
- Currency: AUD (Australian Dollars)
- States: NSW, VIC, QLD, WA, SA, TAS, NT, ACT
- Seasons: Bushfire (Oct-Mar), Storm (Nov-Feb), Flood (Jan-Mar)
- Business hours: Consider AEST/AEDT timezone

Use Australian English. Return structured JSON responses only.`;

// ============================================================================
// WORKFLOW NODES
// ============================================================================

function createReportGenerationGraph(model: BaseChatModel) {
  // Node: Gather data
  async function gatherData(state: ReportState): Promise<Partial<ReportState>> {
    const request = state.request;
    if (!request) {
      throw new WorkflowError('No report request', 'REPORT_GENERATION', 'gather_data');
    }

    const { dateRange, filters } = request;
    const rawData: Record<string, unknown> = {};

    try {
      // Gather claims data
      const claimsWhere: Record<string, unknown> = {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      };
      if (filters?.state) claimsWhere.state = filters.state;
      if (filters?.serviceType) claimsWhere.australianServiceType = filters.serviceType;

      const [claimsCount, claimsData] = await Promise.all([
        prisma.publicClaim.count({ where: claimsWhere }),
        prisma.publicClaim.groupBy({
          by: ['status'],
          _count: true,
          where: claimsWhere,
        }),
      ]);

      rawData.claims = {
        total: claimsCount,
        byStatus: claimsData.reduce(
          (acc, item) => ({ ...acc, [item.status]: item._count }),
          {}
        ),
      };

      // Gather bookings data
      const bookingsWhere: Record<string, unknown> = {
        createdAt: {
          gte: dateRange.start,
          lte: dateRange.end,
        },
      };
      if (filters?.contractorId) bookingsWhere.contractorId = filters.contractorId;
      if (filters?.serviceType) bookingsWhere.serviceType = filters.serviceType;

      const [bookingsCount, bookingsData, bookingsRevenue] = await Promise.all([
        prisma.booking.count({ where: bookingsWhere }),
        prisma.booking.groupBy({
          by: ['status'],
          _count: true,
          where: bookingsWhere,
        }),
        prisma.booking.aggregate({
          _sum: { quotedPrice: true, finalPrice: true },
          _avg: { quotedPrice: true, finalPrice: true },
          where: { ...bookingsWhere, status: 'COMPLETED' },
        }),
      ]);

      rawData.bookings = {
        total: bookingsCount,
        byStatus: bookingsData.reduce(
          (acc, item) => ({ ...acc, [item.status]: item._count }),
          {}
        ),
        revenue: {
          totalQuoted: bookingsRevenue._sum.quotedPrice || 0,
          totalFinal: bookingsRevenue._sum.finalPrice || 0,
          avgQuoted: bookingsRevenue._avg.quotedPrice || 0,
          avgFinal: bookingsRevenue._avg.finalPrice || 0,
        },
      };

      // Gather contractor data
      const contractorsData = await prisma.contractor.aggregate({
        _count: true,
        _avg: { rating: true },
        where: {
          status: 'ACTIVE',
          ...(filters?.state ? { state: filters.state } : {}),
        },
      });

      rawData.contractors = {
        activeCount: contractorsData._count,
        averageRating: contractorsData._avg.rating || 0,
      };

      // Gather reviews data
      const reviewsData = await prisma.review.aggregate({
        _count: true,
        _avg: { rating: true },
        where: {
          createdAt: {
            gte: dateRange.start,
            lte: dateRange.end,
          },
        },
      });

      rawData.reviews = {
        total: reviewsData._count,
        averageRating: reviewsData._avg.rating || 0,
      };

      // Get previous period for comparison
      const periodLength = dateRange.end.getTime() - dateRange.start.getTime();
      const previousStart = new Date(dateRange.start.getTime() - periodLength);
      const previousEnd = new Date(dateRange.start.getTime() - 1);

      const [prevClaimsCount, prevBookingsCount] = await Promise.all([
        prisma.publicClaim.count({
          where: {
            createdAt: { gte: previousStart, lte: previousEnd },
            ...(filters?.state ? { state: filters.state } : {}),
          },
        }),
        prisma.booking.count({
          where: {
            createdAt: { gte: previousStart, lte: previousEnd },
            ...(filters?.contractorId ? { contractorId: filters.contractorId } : {}),
          },
        }),
      ]);

      rawData.previousPeriod = {
        claims: prevClaimsCount,
        bookings: prevBookingsCount,
      };

      rawData.period = {
        start: dateRange.start.toISOString(),
        end: dateRange.end.toISOString(),
        days: Math.ceil(periodLength / (1000 * 60 * 60 * 24)),
      };
    } catch (error) {
      console.error('Error gathering report data:', error);
      rawData.error = 'Some data could not be gathered';
    }

    return {
      messages: [new AIMessage(`Data gathered for ${request.reportType} report`)],
      rawData,
    };
  }

  // Node: Analyse data
  async function analyseData(state: ReportState): Promise<Partial<ReportState>> {
    const request = state.request;
    const rawData = state.rawData;

    if (!request || !rawData) {
      throw new WorkflowError('Missing data for analysis', 'REPORT_GENERATION', 'analyse_data');
    }

    const prompt = `Analyse the following business data and extract key metrics with changes:

Report Type: ${request.reportType}
Period: ${(rawData.period as Record<string, unknown>)?.days || 0} days

Raw Data:
${JSON.stringify(rawData, null, 2)}

Task:
1. Calculate key data points with period-over-period changes
2. Identify significant trends (>10% change)
3. Flag any concerning metrics

Respond with ONLY a JSON object:
{
  "dataPoints": [
    {
      "metric": "Total Claims",
      "value": number,
      "previousValue": number,
      "change": percentage,
      "changeType": "increase|decrease|stable",
      "unit": "count|currency|percentage"
    }
  ],
  "trends": [
    {
      "metric": "string",
      "direction": "up|down|stable",
      "magnitude": "slight|moderate|significant",
      "description": "string"
    }
  ],
  "concerningMetrics": ["metric1", "metric2"],
  "positiveMetrics": ["metric1", "metric2"]
}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      const dataPoints: DataPoint[] = parsed.dataPoints || [];

      // Add calculated data points if AI didn't provide them
      if (dataPoints.length === 0) {
        const claims = rawData.claims as Record<string, unknown>;
        const bookings = rawData.bookings as Record<string, unknown>;
        const prev = rawData.previousPeriod as Record<string, unknown>;

        if (claims) {
          const claimsTotal = claims.total as number || 0;
          const prevClaims = (prev?.claims as number) || 0;
          dataPoints.push({
            metric: 'Total Claims',
            value: claimsTotal,
            previousValue: prevClaims,
            change: prevClaims > 0 ? ((claimsTotal - prevClaims) / prevClaims) * 100 : 0,
            changeType: claimsTotal > prevClaims ? 'increase' : claimsTotal < prevClaims ? 'decrease' : 'stable',
            unit: 'count',
          });
        }

        if (bookings) {
          const bookingsTotal = bookings.total as number || 0;
          const prevBookings = (prev?.bookings as number) || 0;
          const revenue = bookings.revenue as Record<string, number>;

          dataPoints.push({
            metric: 'Total Bookings',
            value: bookingsTotal,
            previousValue: prevBookings,
            change: prevBookings > 0 ? ((bookingsTotal - prevBookings) / prevBookings) * 100 : 0,
            changeType: bookingsTotal > prevBookings ? 'increase' : bookingsTotal < prevBookings ? 'decrease' : 'stable',
            unit: 'count',
          });

          if (revenue) {
            dataPoints.push({
              metric: 'Total Revenue',
              value: revenue.totalFinal || 0,
              unit: 'AUD',
            });

            dataPoints.push({
              metric: 'Average Booking Value',
              value: Math.round(revenue.avgFinal || 0),
              unit: 'AUD',
            });
          }
        }
      }

      return {
        messages: [new AIMessage(content)],
        dataPoints,
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        dataPoints: [],
      };
    }
  }

  // Node: Extract insights
  async function extractInsights(state: ReportState): Promise<Partial<ReportState>> {
    const request = state.request;
    const rawData = state.rawData;
    const dataPoints = state.dataPoints;

    const prompt = `Extract business insights from the following data:

Report Type: ${request?.reportType}
Format: ${request?.format}

Data Points:
${JSON.stringify(dataPoints, null, 2)}

Raw Data Context:
${JSON.stringify(rawData, null, 2)}

Extract:
1. Key insights (positive and negative findings)
2. Anomalies (values significantly different from expected)
3. Patterns and correlations

Consider Australian disaster recovery context:
- Seasonal patterns (storm season Nov-Feb, bushfire Oct-Mar)
- State-specific trends
- Industry benchmarks (completion rate >85%, rating >4.0)

Respond with ONLY a JSON object:
{
  "insights": [
    {
      "id": "insight-1",
      "type": "POSITIVE|NEGATIVE|NEUTRAL|ALERT",
      "severity": "LOW|MEDIUM|HIGH|CRITICAL",
      "title": "Brief title",
      "description": "Detailed description",
      "metric": "related metric if applicable",
      "recommendation": "what to do about it"
    }
  ],
  "anomalies": [
    {
      "id": "anomaly-1",
      "metric": "metric name",
      "expectedValue": number,
      "actualValue": number,
      "deviation": percentage,
      "severity": "LOW|MEDIUM|HIGH|CRITICAL",
      "possibleCause": "explanation",
      "suggestedAction": "what to do"
    }
  ]
}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        messages: [new AIMessage(content)],
        insights: parsed.insights || [],
        anomalies: parsed.anomalies || [],
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        insights: [],
        anomalies: [],
      };
    }
  }

  // Node: Generate recommendations
  async function generateRecommendations(state: ReportState): Promise<Partial<ReportState>> {
    const request = state.request;
    const insights = state.insights;
    const anomalies = state.anomalies;
    const dataPoints = state.dataPoints;

    const prompt = `Generate actionable recommendations based on the analysis:

Report Type: ${request?.reportType}

Insights:
${JSON.stringify(insights, null, 2)}

Anomalies:
${JSON.stringify(anomalies, null, 2)}

Key Metrics:
${JSON.stringify(dataPoints.slice(0, 10), null, 2)}

Generate recommendations that are:
1. Specific and actionable
2. Prioritised by impact
3. Realistic to implement
4. Measurable

Categories to consider:
- Operations: Process improvements
- Growth: Revenue and client acquisition
- Quality: Service and satisfaction
- Risk: Compliance and fraud prevention
- Cost: Efficiency and savings

Respond with ONLY a JSON object:
{
  "recommendations": [
    {
      "id": "rec-1",
      "priority": "LOW|MEDIUM|HIGH|CRITICAL",
      "category": "Operations|Growth|Quality|Risk|Cost",
      "title": "Brief actionable title",
      "description": "Detailed description of the recommendation",
      "expectedImpact": "What improvement to expect",
      "effort": "LOW|MEDIUM|HIGH",
      "metrics": ["metrics this will improve"]
    }
  ]
}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        messages: [new AIMessage(content)],
        recommendations: parsed.recommendations || [],
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        recommendations: [],
      };
    }
  }

  // Node: Compose report
  async function composeReport(state: ReportState): Promise<Partial<ReportState>> {
    const request = state.request;
    if (!request) {
      throw new WorkflowError('No report request', 'REPORT_GENERATION', 'compose_report');
    }

    const dataPoints = state.dataPoints;
    const insights = state.insights;
    const anomalies = state.anomalies;
    const recommendations = state.recommendations;

    const prompt = `Compose a ${request.format} format report for ${request.reportType}:

Data Points: ${dataPoints.length} metrics
Insights: ${insights.length} findings
Anomalies: ${anomalies.length} detected
Recommendations: ${recommendations.length} actions

Format requirements:
${request.format === 'EXECUTIVE' ? '- High-level summary, key metrics only, strategic focus' : ''}
${request.format === 'DETAILED' ? '- Comprehensive coverage, all metrics, technical details' : ''}
${request.format === 'SUMMARY' ? '- Brief overview, top 5 metrics, key takeaways' : ''}
${request.format === 'TECHNICAL' ? '- Data-focused, methodology notes, statistical context' : ''}

Generate:
1. Report title
2. Executive summary (2-3 sentences)
3. Report sections with content

Respond with ONLY a JSON object:
{
  "title": "Report Title",
  "summary": "Executive summary paragraph",
  "sections": [
    {
      "id": "section-1",
      "title": "Section Title",
      "content": "Section content in markdown",
      "order": 1
    }
  ]
}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      const reportId = `report-${Date.now()}`;

      const report: GeneratedReport = {
        id: reportId,
        type: request.reportType,
        format: request.format,
        title: parsed.title || `${request.reportType} Report`,
        summary: parsed.summary || 'Report generated successfully.',
        sections: parsed.sections || [],
        dataPoints,
        insights,
        anomalies,
        recommendations,
        generatedAt: new Date(),
        periodStart: request.dateRange.start,
        periodEnd: request.dateRange.end,
        metadata: {
          filters: request.filters,
          customQuery: request.customQuery,
        },
      };

      return {
        messages: [new AIMessage(content)],
        sections: parsed.sections || [],
        report,
        isComplete: true,
      };
    } catch {
      const reportId = `report-${Date.now()}`;

      return {
        messages: [new AIMessage(content)],
        sections: [],
        report: {
          id: reportId,
          type: request.reportType,
          format: request.format,
          title: `${request.reportType} Report`,
          summary: 'Report generation completed with limited formatting.',
          sections: [],
          dataPoints,
          insights,
          anomalies,
          recommendations,
          generatedAt: new Date(),
          periodStart: request.dateRange.start,
          periodEnd: request.dateRange.end,
          metadata: {},
        },
        isComplete: true,
      };
    }
  }

  // Build the graph
  const workflow = new StateGraph(ReportGenerationAnnotation)
    .addNode('gatherData', gatherData)
    .addNode('analyseData', analyseData)
    .addNode('extractInsights', extractInsights)
    .addNode('generateRecommendations', generateRecommendations)
    .addNode('composeReport', composeReport)
    .addEdge(START, 'gatherData')
    .addEdge('gatherData', 'analyseData')
    .addEdge('analyseData', 'extractInsights')
    .addEdge('extractInsights', 'generateRecommendations')
    .addEdge('generateRecommendations', 'composeReport')
    .addEdge('composeReport', END);

  return workflow;
}

// ============================================================================
// WORKFLOW EXECUTOR
// ============================================================================

async function executeReportGeneration(
  input: Record<string, unknown>,
  config: WorkflowExecutionConfig
): Promise<Record<string, unknown>> {
  const model = config.provider.getModel();
  const workflow = createReportGenerationGraph(model);

  const compiledWorkflow = workflow.compile({
    checkpointer: config.checkpointer,
  });

  // Build report request from input
  const reportType = (input.reportType as ReportType) || 'DAILY_SUMMARY';
  const format = (input.format as ReportFormat) || 'SUMMARY';

  // Default to last 7 days if no date range specified
  const now = new Date();
  const defaultStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const dateRange = input.dateRange as Record<string, unknown> | undefined;
  const request: ReportRequest = {
    reportType,
    format,
    dateRange: {
      start: dateRange?.start ? new Date(dateRange.start as string) : defaultStart,
      end: dateRange?.end ? new Date(dateRange.end as string) : now,
    },
    filters: input.filters as ReportRequest['filters'],
    customQuery: input.customQuery as string | undefined,
    includeCharts: (input.includeCharts as boolean) ?? true,
    includeRecommendations: (input.includeRecommendations as boolean) ?? true,
  };

  const initialState: Partial<ReportState> = {
    request,
    messages: [],
  };

  const result = await compiledWorkflow.invoke(initialState, {
    configurable: {
      thread_id: config.threadId,
      job_id: config.jobId,
    },
    recursionLimit: config.maxIterations,
  });

  return {
    report: result.report,
    summary: {
      reportId: result.report?.id,
      title: result.report?.title,
      type: result.report?.type,
      format: result.report?.format,
      dataPointsCount: result.dataPoints?.length || 0,
      insightsCount: result.insights?.length || 0,
      anomaliesCount: result.anomalies?.length || 0,
      recommendationsCount: result.recommendations?.length || 0,
      generatedAt: result.report?.generatedAt,
    },
  };
}

// Register the workflow
registerWorkflow('REPORT_GENERATION' as any, executeReportGeneration);

// Export for direct use
export { createReportGenerationGraph, executeReportGeneration };
export type { ReportRequest, GeneratedReport, ReportSection, DataPoint, Insight, Anomaly, Recommendation };
