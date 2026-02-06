/**
 * AI Metrics API Endpoint
 *
 * Provides aggregated metrics for AI usage monitoring dashboard
 * Note: AgentJob model not yet implemented - returns placeholder data
 */

import { NextRequest, NextResponse } from 'next/server';
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

    // Note: AgentJob model not yet implemented in Prisma schema
    // Return placeholder metrics until model is added
    const metrics: AIMetrics = {
      providers,
      usage: {
        period,
        totalRequests: 0,
        totalTokens: 0,
        estimatedCost: 0,
        byProvider: {
          anthropic: { requests: 0, tokens: 0, cost: 0 },
          openai: { requests: 0, tokens: 0, cost: 0 },
          ollama: { requests: 0, tokens: 0, cost: 0 },
        },
        byWorkflow: {},
      },
      recentJobs: [],
      performance: {
        avgLatencyMs: 0,
        successRate: 100,
        errorRate: 0,
        p95LatencyMs: 0,
      },
      t5gemma: {
        available: t5gemmaHealth.available,
        transformersInstalled: t5gemmaHealth.transformersInstalled,
        modelLoaded: t5gemmaHealth.modelLoaded,
        config: t5gemmaHealth.config as unknown as Record<string, unknown>,
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
