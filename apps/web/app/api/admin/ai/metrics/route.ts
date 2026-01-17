/**
 * AI Metrics API Endpoint
 *
 * Provides aggregated metrics for AI usage monitoring dashboard
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  authenticateRequest,
  requireRole,
  unauthorizedRoleResponse,
} from '@/lib/auth-middleware';
import { checkAllProvidersHealth } from '@/lib/agents/providers';
import { getT5GemmaService } from '@/lib/services/t5gemma.service';

export const dynamic = 'force-dynamic';

interface AIMetrics {
  providers: {
    name: string;
    type: string;
    available: boolean;
    latencyMs?: number;
    lastChecked: string;
    error?: string;
  }[];
  usage: {
    period: string;
    totalRequests: number;
    totalTokens: number;
    estimatedCost: number;
    byProvider: Record<string, { requests: number; tokens: number; cost: number }>;
    byWorkflow: Record<string, { requests: number; tokens: number; avgDuration: number }>;
  };
  recentJobs: {
    id: string;
    type: string;
    status: string;
    provider: string;
    tokens: number;
    durationMs: number;
    createdAt: string;
  }[];
  performance: {
    avgLatencyMs: number;
    successRate: number;
    errorRate: number;
    p95LatencyMs: number;
  };
  t5gemma: {
    available: boolean;
    transformersInstalled: boolean;
    modelLoaded: boolean;
    config: Record<string, unknown>;
  };
}

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'day';

    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    switch (period) {
      case 'hour':
        startDate = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case 'day':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }

    // Fetch provider health status
    const providerHealth = await checkAllProvidersHealth();
    const providers = Object.entries(providerHealth).map(([type, health]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      type,
      available: health.available,
      latencyMs: health.latencyMs,
      lastChecked: health.lastChecked.toISOString(),
      error: health.error,
    }));

    // Fetch T5Gemma status
    const t5gemmaService = getT5GemmaService();
    const t5gemmaHealth = await t5gemmaService.healthCheck();

    // Fetch AI job metrics from database
    const [aiJobs, jobStats, workflowStats] = await Promise.all([
      // Recent jobs
      prisma.agentJob.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: {
          id: true,
          workflowType: true,
          status: true,
          durationMs: true,
          totalTokens: true,
          totalCost: true,
          createdAt: true,
        },
      }),
      // Aggregate stats
      prisma.agentJob.aggregate({
        where: {
          createdAt: { gte: startDate },
        },
        _count: { id: true },
        _sum: {
          totalTokens: true,
          totalCost: true,
          durationMs: true,
        },
        _avg: {
          durationMs: true,
        },
      }),
      // Stats by workflow type
      prisma.agentJob.groupBy({
        by: ['workflowType'],
        where: {
          createdAt: { gte: startDate },
        },
        _count: { id: true },
        _sum: {
          totalTokens: true,
          durationMs: true,
        },
        _avg: {
          durationMs: true,
        },
      }),
    ]);

    // Calculate success/error rates
    const successfulJobs = aiJobs.filter((j) => j.status === 'COMPLETED').length;
    const failedJobs = aiJobs.filter((j) => j.status === 'FAILED').length;
    const totalJobs = aiJobs.length;

    // Build workflow breakdown
    const byWorkflow: Record<string, { requests: number; tokens: number; avgDuration: number }> = {};
    for (const stat of workflowStats) {
      byWorkflow[stat.workflowType] = {
        requests: stat._count.id,
        tokens: stat._sum.totalTokens || 0,
        avgDuration: Math.round(stat._avg.durationMs || 0),
      };
    }

    // Calculate P95 latency (simplified - use actual percentile in production)
    const sortedDurations = aiJobs
      .map((j) => j.durationMs || 0)
      .filter((d) => d > 0)
      .sort((a, b) => a - b);
    const p95Index = Math.floor(sortedDurations.length * 0.95);
    const p95Latency = sortedDurations[p95Index] || 0;

    const metrics: AIMetrics = {
      providers,
      usage: {
        period,
        totalRequests: jobStats._count.id || 0,
        totalTokens: jobStats._sum.totalTokens || 0,
        estimatedCost: Number(jobStats._sum.totalCost || 0),
        byProvider: {
          anthropic: { requests: 0, tokens: 0, cost: 0 },
          openai: { requests: 0, tokens: 0, cost: 0 },
          ollama: { requests: 0, tokens: 0, cost: 0 },
        },
        byWorkflow,
      },
      recentJobs: aiJobs.map((job) => ({
        id: job.id,
        type: job.workflowType,
        status: job.status,
        provider: 'anthropic', // Default - enhance with actual provider tracking
        tokens: job.totalTokens || 0,
        durationMs: job.durationMs || 0,
        createdAt: job.createdAt.toISOString(),
      })),
      performance: {
        avgLatencyMs: Math.round(jobStats._avg.durationMs || 0),
        successRate: totalJobs > 0 ? (successfulJobs / totalJobs) * 100 : 100,
        errorRate: totalJobs > 0 ? (failedJobs / totalJobs) * 100 : 0,
        p95LatencyMs: p95Latency,
      },
      t5gemma: {
        available: t5gemmaHealth.available,
        transformersInstalled: t5gemmaHealth.transformersInstalled,
        modelLoaded: t5gemmaHealth.modelLoaded,
        config: t5gemmaHealth.config as Record<string, unknown>,
      },
    };

    return NextResponse.json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    console.error('AI metrics endpoint error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch AI metrics',
      },
      { status: 500 }
    );
  }
}
