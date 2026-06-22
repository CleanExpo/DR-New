/**
 * Super-Orchestrator API
 *
 * Phase E.1: Meta-agent coordination API
 * - POST: Execute workflow chains, parallel workflows, or operations
 * - GET: Get status, metrics, history, or configuration
 */

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import {
  getSuperOrchestrator,
  WorkflowChains,
  type WorkflowChainStep,
  type DailyOperationConfig,
} from '@/lib/agents/super-orchestrator';
import type { WorkflowType } from '@/lib/agents/types';

export const dynamic = 'force-dynamic';

// Request types
interface ChainExecutionRequest {
  action: 'execute-chain';
  name: string;
  steps: WorkflowChainStep[];
  contextData?: Record<string, unknown>;
}

interface ParallelExecutionRequest {
  action: 'execute-parallel';
  workflows: Array<{
    workflowType: WorkflowType;
    input: Record<string, unknown>;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  }>;
}

interface PrebuiltChainRequest {
  action: 'prebuilt-chain';
  chainType: 'claim-to-contractor' | 'disaster-response' | 'support-escalation';
  data: Record<string, unknown>;
}

interface OperationRequest {
  action: 'run-operation';
  operation:
    | 'morning-claims'
    | 'continuous-matching'
    | 'evening-reports'
    | 'weekly-summary'
    | 'self-improvement';
  options?: Record<string, unknown>;
}

interface SchedulerRequest {
  action: 'scheduler';
  command: 'start' | 'stop' | 'status';
}

interface ConfigRequest {
  action: 'update-config';
  config: Partial<DailyOperationConfig>;
}

interface CancelRequest {
  action: 'cancel-chain';
  chainId: string;
}

type SuperOrchestratorRequest =
  | ChainExecutionRequest
  | ParallelExecutionRequest
  | PrebuiltChainRequest
  | OperationRequest
  | SchedulerRequest
  | ConfigRequest
  | CancelRequest;

export async function POST(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const body: SuperOrchestratorRequest = await request.json();
    const orchestrator = getSuperOrchestrator();

    switch (body.action) {
      case 'execute-chain': {
        const { name, steps, contextData } = body;

        if (!name || !steps || steps.length === 0) {
          return NextResponse.json(
            { success: false, error: 'name and steps are required' },
            { status: 400 }
          );
        }

        const chain = await orchestrator.executeChain(name, steps, contextData);

        return NextResponse.json({
          success: true,
          action: 'execute-chain',
          chain: {
            id: chain.id,
            name: chain.name,
            status: chain.status,
            stepsTotal: chain.steps.length,
            stepsCompleted: Array.from(chain.results.values()).filter(
              (r) => r.status === 'COMPLETED'
            ).length,
            startedAt: chain.startedAt,
            completedAt: chain.completedAt,
            results: Object.fromEntries(
              Array.from(chain.results.entries()).map(([id, result]) => [
                id,
                {
                  status: result.status,
                  jobId: result.jobId,
                  durationMs: result.durationMs,
                  error: result.error,
                },
              ])
            ),
          },
        });
      }

      case 'execute-parallel': {
        const { workflows } = body;

        if (!workflows || workflows.length === 0) {
          return NextResponse.json(
            { success: false, error: 'workflows array is required' },
            { status: 400 }
          );
        }

        const result = await orchestrator.executeParallel(workflows);

        return NextResponse.json({
          success: true,
          action: 'execute-parallel',
          execution: {
            id: result.executionId,
            totalWorkflows: workflows.length,
            completed: result.results.filter((r) => r.status === 'COMPLETED').length,
            failed: result.results.filter((r) => r.status === 'FAILED').length,
            durationMs: result.totalDurationMs,
            results: result.results,
          },
        });
      }

      case 'prebuilt-chain': {
        const { chainType, data } = body;

        let steps: WorkflowChainStep[];
        let chainName: string;

        switch (chainType) {
          case 'claim-to-contractor':
            chainName = 'Claim to Contractor Assignment';
            steps = WorkflowChains.createClaimToContractorChain(
              data.claim as Record<string, unknown>,
              data.matchingRequirements as Record<string, unknown>
            );
            break;

          case 'disaster-response':
            chainName = 'Disaster Response Chain';
            steps = WorkflowChains.createDisasterResponseChain(
              data.disaster as Record<string, unknown>,
              data.inspection as Record<string, unknown> | undefined
            );
            break;

          case 'support-escalation':
            chainName = 'Support Escalation';
            steps = WorkflowChains.createSupportEscalationChain(
              data.query as Record<string, unknown>
            );
            break;

          default:
            return NextResponse.json(
              { success: false, error: `Unknown chain type: ${chainType}` },
              { status: 400 }
            );
        }

        const chain = await orchestrator.executeChain(chainName, steps, data);

        return NextResponse.json({
          success: true,
          action: 'prebuilt-chain',
          chainType,
          chain: {
            id: chain.id,
            name: chain.name,
            status: chain.status,
            stepsTotal: chain.steps.length,
            stepsCompleted: Array.from(chain.results.values()).filter(
              (r) => r.status === 'COMPLETED'
            ).length,
            completedAt: chain.completedAt,
          },
        });
      }

      case 'run-operation': {
        const { operation, options } = body;

        let result: Record<string, unknown>;

        switch (operation) {
          case 'morning-claims':
            result = await orchestrator.processMorningClaims();
            break;

          case 'continuous-matching':
            result = await orchestrator.processContinuousMatching();
            break;

          case 'evening-reports':
            result = await orchestrator.generateEveningReports();
            break;

          case 'weekly-summary':
            result = await orchestrator.generateWeeklySummary();
            break;

          case 'self-improvement':
            const periodDays = (options?.periodDays as number) || 7;
            result = await orchestrator.runSelfImprovement(periodDays) as unknown as Record<string, unknown>;
            break;

          default:
            return NextResponse.json(
              { success: false, error: `Unknown operation: ${operation}` },
              { status: 400 }
            );
        }

        return NextResponse.json({
          success: true,
          action: 'run-operation',
          operation,
          result,
        });
      }

      case 'scheduler': {
        const { command } = body;

        switch (command) {
          case 'start':
            orchestrator.startAutomatedOperations();
            return NextResponse.json({
              success: true,
              action: 'scheduler',
              command: 'start',
              message: 'Automated operations started',
              isRunning: orchestrator.isOperationsRunning(),
            });

          case 'stop':
            orchestrator.stopAutomatedOperations();
            return NextResponse.json({
              success: true,
              action: 'scheduler',
              command: 'stop',
              message: 'Automated operations stopped',
              isRunning: orchestrator.isOperationsRunning(),
            });

          case 'status':
            return NextResponse.json({
              success: true,
              action: 'scheduler',
              command: 'status',
              isRunning: orchestrator.isOperationsRunning(),
              config: orchestrator.getConfig(),
            });

          default:
            return NextResponse.json(
              { success: false, error: `Unknown scheduler command: ${command}` },
              { status: 400 }
            );
        }
      }

      case 'update-config': {
        const { config } = body;

        orchestrator.updateConfig(config);

        return NextResponse.json({
          success: true,
          action: 'update-config',
          message: 'Configuration updated',
          newConfig: orchestrator.getConfig(),
        });
      }

      case 'cancel-chain': {
        const { chainId } = body;

        if (!chainId) {
          return NextResponse.json(
            { success: false, error: 'chainId is required' },
            { status: 400 }
          );
        }

        const cancelled = await orchestrator.cancelChain(chainId);

        return NextResponse.json({
          success: true,
          action: 'cancel-chain',
          chainId,
          cancelled,
          message: cancelled ? 'Chain cancelled' : 'Chain not found or already completed',
        });
      }

      default:
        return NextResponse.json(
          { success: false, error: 'Unknown action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Super-orchestrator API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Operation failed',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('mode') || 'status';
    const chainId = searchParams.get('chainId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const periodDays = parseInt(searchParams.get('periodDays') || '7', 10);

    const orchestrator = getSuperOrchestrator();

    // Get specific chain status
    if (chainId) {
      const chain = orchestrator.getChainStatus(chainId);

      if (!chain) {
        return NextResponse.json({
          success: true,
          chainId,
          found: false,
          message: 'Chain not found',
        });
      }

      return NextResponse.json({
        success: true,
        chainId,
        found: true,
        chain: {
          id: chain.id,
          name: chain.name,
          status: chain.status,
          stepsTotal: chain.steps.length,
          currentStepIndex: chain.currentStepIndex,
          startedAt: chain.startedAt,
          completedAt: chain.completedAt,
          error: chain.error,
          steps: chain.steps.map((step) => {
            const result = chain.results.get(step.id);
            return {
              id: step.id,
              workflowType: step.workflowType,
              dependsOn: step.dependsOn,
              priority: step.priority,
              status: result?.status || 'PENDING',
              jobId: result?.jobId,
              durationMs: result?.durationMs,
              error: result?.error,
            };
          }),
        },
      });
    }

    switch (mode) {
      case 'status':
        return NextResponse.json({
          success: true,
          mode: 'status',
          status: {
            isRunning: orchestrator.isOperationsRunning(),
            activeChains: orchestrator.getActiveChains().length,
            config: orchestrator.getConfig(),
          },
        });

      case 'active':
        const activeChains = orchestrator.getActiveChains();
        return NextResponse.json({
          success: true,
          mode: 'active',
          activeChains: activeChains.map((chain) => ({
            id: chain.id,
            name: chain.name,
            status: chain.status,
            stepsTotal: chain.steps.length,
            stepsCompleted: Array.from(chain.results.values()).filter(
              (r) => r.status === 'COMPLETED'
            ).length,
            startedAt: chain.startedAt,
          })),
          total: activeChains.length,
        });

      case 'history':
        const history = orchestrator.getExecutionHistory(limit);
        return NextResponse.json({
          success: true,
          mode: 'history',
          history: history.map((chain) => ({
            id: chain.id,
            name: chain.name,
            status: chain.status,
            stepsTotal: chain.steps.length,
            stepsCompleted: Array.from(chain.results.values()).filter(
              (r) => r.status === 'COMPLETED'
            ).length,
            stepsFailed: Array.from(chain.results.values()).filter(
              (r) => r.status === 'FAILED'
            ).length,
            startedAt: chain.startedAt,
            completedAt: chain.completedAt,
            error: chain.error,
          })),
          total: history.length,
          limit,
        });

      case 'metrics':
        const metrics = orchestrator.getPerformanceMetrics(periodDays);
        return NextResponse.json({
          success: true,
          mode: 'metrics',
          periodDays,
          metrics: {
            totalExecutions: metrics.totalExecutions,
            successfulExecutions: metrics.successfulExecutions,
            failedExecutions: metrics.failedExecutions,
            successRate:
              metrics.totalExecutions > 0
                ? Math.round(
                    (metrics.successfulExecutions / metrics.totalExecutions) * 100
                  )
                : 100,
            averageDurationMs: Math.round(metrics.averageDurationMs),
            p95DurationMs: Math.round(metrics.p95DurationMs),
            averageStepsPerChain: Math.round(metrics.averageStepsPerChain * 10) / 10,
            bottlenecks: metrics.bottlenecks.map((b) => ({
              location: b.location,
              severity: b.severity,
              averageDelayMs: Math.round(b.averageDelayMs),
              occurrences: b.occurrences,
              suggestedFix: b.suggestedFix,
            })),
            workflowMetrics: Object.fromEntries(
              Array.from(metrics.workflowMetrics.entries()).map(([type, wm]) => [
                type,
                {
                  totalExecutions: wm.totalExecutions,
                  successRate: Math.round(wm.successRate),
                  averageDurationMs: Math.round(wm.averageDurationMs),
                  p95DurationMs: Math.round(wm.p95DurationMs),
                },
              ])
            ),
            lastUpdated: metrics.lastUpdated,
          },
        });

      case 'config':
        return NextResponse.json({
          success: true,
          mode: 'config',
          config: orchestrator.getConfig(),
        });

      default:
        return NextResponse.json(
          { success: false, error: `Unknown mode: ${mode}` },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Super-orchestrator GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get orchestrator data',
      },
      { status: 500 }
    );
  }
}
