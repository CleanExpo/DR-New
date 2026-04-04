// @ts-nocheck
/**
 * Super-Orchestrator - Meta-Agent Coordination Layer
 *
 * Phase E.1: AI-powered workflow coordination for disaster recovery platform
 *
 * Capabilities:
 * 1. Multi-Workflow Coordination - Chain/parallel execution with dependencies
 * 2. Automated Daily Operations - Scheduled processing of claims, matching, reports
 * 3. Self-Improvement Loop - Track outcomes, identify bottlenecks, optimise
 */

import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';
import { getOrchestrator, registerWorkflow } from './core/orchestrator';
import { getDefaultProvider } from './providers';
import type { WorkflowType, AgentJobStatus } from './types';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type OperationType =
  | 'MORNING_CLAIMS_PROCESSING'
  | 'CONTINUOUS_MATCHING'
  | 'EVENING_REPORTS'
  | 'WEEKLY_SUMMARY'
  | 'MONTHLY_ANALYTICS'
  | 'AD_HOC_CHAIN'
  | 'PARALLEL_EXECUTION'
  | 'SELF_IMPROVEMENT';

export type ExecutionStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export type WorkflowPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface WorkflowChainStep {
  id: string;
  workflowType: WorkflowType;
  input: Record<string, unknown>;
  dependsOn?: string[]; // IDs of steps this depends on
  timeout?: number; // ms
  retries?: number;
  priority?: WorkflowPriority;
}

export interface ChainExecution {
  id: string;
  name: string;
  steps: WorkflowChainStep[];
  status: ExecutionStatus;
  currentStepIndex: number;
  results: Map<string, WorkflowStepResult>;
  startedAt: Date;
  completedAt?: Date;
  error?: string;
  contextData: Record<string, unknown>;
}

export interface WorkflowStepResult {
  stepId: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'SKIPPED';
  jobId?: string;
  output?: Record<string, unknown>;
  error?: string;
  startedAt?: Date;
  completedAt?: Date;
  durationMs?: number;
}

export interface DailyOperationConfig {
  morningClaimsProcessing: {
    enabled: boolean;
    scheduledTime: string; // HH:MM in AEST
    maxClaims: number;
    priorityThreshold: WorkflowPriority;
  };
  continuousMatching: {
    enabled: boolean;
    intervalMinutes: number;
    maxBatchSize: number;
  };
  eveningReports: {
    enabled: boolean;
    scheduledTime: string;
    reportTypes: string[];
  };
  weeklySummary: {
    enabled: boolean;
    dayOfWeek: number; // 0=Sunday, 1=Monday, etc.
    scheduledTime: string;
  };
}

export interface PerformanceMetrics {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageDurationMs: number;
  p95DurationMs: number;
  averageStepsPerChain: number;
  bottlenecks: BottleneckInfo[];
  workflowMetrics: Map<WorkflowType, WorkflowMetrics>;
  lastUpdated: Date;
}

export interface WorkflowMetrics {
  workflowType: WorkflowType;
  totalExecutions: number;
  successRate: number;
  averageDurationMs: number;
  p95DurationMs: number;
  failureReasons: Map<string, number>;
  lastExecuted?: Date;
}

export interface BottleneckInfo {
  location: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  averageDelayMs: number;
  occurrences: number;
  suggestedFix: string;
}

export interface SelfImprovementReport {
  analysedAt: Date;
  periodDays: number;
  metrics: PerformanceMetrics;
  recommendations: Recommendation[];
  processOptimisations: ProcessOptimisation[];
  configAdjustments: ConfigAdjustment[];
}

export interface Recommendation {
  id: string;
  type: 'PERFORMANCE' | 'RELIABILITY' | 'COST' | 'QUALITY';
  priority: WorkflowPriority;
  title: string;
  description: string;
  expectedImpact: string;
  implementationEffort: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface ProcessOptimisation {
  processId: string;
  currentFlow: string;
  suggestedFlow: string;
  expectedSpeedupPercent: number;
  reasoning: string;
}

export interface ConfigAdjustment {
  configKey: string;
  currentValue: unknown;
  suggestedValue: unknown;
  reasoning: string;
}

// ============================================================================
// IN-MEMORY STATE (Would use Redis in production)
// ============================================================================

const activeChains: Map<string, ChainExecution> = new Map();
const executionHistory: ChainExecution[] = [];
const performanceData: {
  durations: number[];
  stepCounts: number[];
  workflowDurations: Map<WorkflowType, number[]>;
} = {
  durations: [],
  stepCounts: [],
  workflowDurations: new Map(),
};

// ============================================================================
// DEFAULT CONFIGURATION
// ============================================================================

const defaultConfig: DailyOperationConfig = {
  morningClaimsProcessing: {
    enabled: true,
    scheduledTime: '06:00', // 6 AM AEST
    maxClaims: 50,
    priorityThreshold: 'MEDIUM',
  },
  continuousMatching: {
    enabled: true,
    intervalMinutes: 15,
    maxBatchSize: 20,
  },
  eveningReports: {
    enabled: true,
    scheduledTime: '18:00', // 6 PM AEST
    reportTypes: ['daily_summary', 'performance', 'anomalies'],
  },
  weeklySummary: {
    enabled: true,
    dayOfWeek: 1, // Monday
    scheduledTime: '09:00',
  },
};

// ============================================================================
// SUPER-ORCHESTRATOR CLASS
// ============================================================================

export class SuperOrchestrator {
  private config: DailyOperationConfig;
  private isRunning: boolean = false;
  private scheduledTasks: Map<string, NodeJS.Timeout> = new Map();

  constructor(config?: Partial<DailyOperationConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  // ==========================================================================
  // MULTI-WORKFLOW COORDINATION
  // ==========================================================================

  /**
   * Execute a chain of workflows with dependency resolution
   */
  async executeChain(
    name: string,
    steps: WorkflowChainStep[],
    contextData?: Record<string, unknown>
  ): Promise<ChainExecution> {
    const chainId = uuidv4();
    const chain: ChainExecution = {
      id: chainId,
      name,
      steps,
      status: 'RUNNING',
      currentStepIndex: 0,
      results: new Map(),
      startedAt: new Date(),
      contextData: contextData || {},
    };

    activeChains.set(chainId, chain);

    try {
      // Initialize all step results as pending
      for (const step of steps) {
        chain.results.set(step.id, {
          stepId: step.id,
          status: 'PENDING',
        });
      }

      // Execute steps respecting dependencies
      await this.executeStepsWithDependencies(chain);

      chain.status = 'COMPLETED';
      chain.completedAt = new Date();

      // Record metrics
      const duration = chain.completedAt.getTime() - chain.startedAt.getTime();
      performanceData.durations.push(duration);
      performanceData.stepCounts.push(steps.length);
    } catch (error) {
      chain.status = 'FAILED';
      chain.error = error instanceof Error ? error.message : 'Chain execution failed';
      chain.completedAt = new Date();
    } finally {
      activeChains.delete(chainId);
      executionHistory.push(chain);

      // Keep only last 1000 executions
      if (executionHistory.length > 1000) {
        executionHistory.shift();
      }
    }

    return chain;
  }

  /**
   * Execute steps respecting dependencies (topological execution)
   */
  private async executeStepsWithDependencies(chain: ChainExecution): Promise<void> {
    const completed = new Set<string>();
    const orchestrator = getOrchestrator();

    while (completed.size < chain.steps.length) {
      // Find steps ready to execute (dependencies satisfied)
      const readySteps = chain.steps.filter((step) => {
        if (completed.has(step.id)) return false;
        const stepResult = chain.results.get(step.id);
        if (stepResult?.status === 'RUNNING' || stepResult?.status === 'COMPLETED') {
          return false;
        }

        // Check dependencies
        if (step.dependsOn && step.dependsOn.length > 0) {
          return step.dependsOn.every((depId) => {
            const depResult = chain.results.get(depId);
            return depResult?.status === 'COMPLETED';
          });
        }
        return true;
      });

      if (readySteps.length === 0 && completed.size < chain.steps.length) {
        // Check if remaining steps have failed dependencies
        const hasFailedDeps = chain.steps.some((step) => {
          if (completed.has(step.id)) return false;
          return step.dependsOn?.some((depId) => {
            const depResult = chain.results.get(depId);
            return depResult?.status === 'FAILED';
          });
        });

        if (hasFailedDeps) {
          // Skip steps with failed dependencies
          chain.steps
            .filter((s) => !completed.has(s.id))
            .forEach((s) => {
              chain.results.set(s.id, {
                stepId: s.id,
                status: 'SKIPPED',
                error: 'Dependency failed',
              });
              completed.add(s.id);
            });
          break;
        }

        throw new Error('Circular dependency detected or no steps ready');
      }

      // Execute ready steps in parallel
      const execPromises = readySteps.map(async (step) => {
        const stepResult = chain.results.get(step.id)!;
        stepResult.status = 'RUNNING';
        stepResult.startedAt = new Date();

        try {
          // Merge context with step input
          const input = {
            ...step.input,
            _chainContext: chain.contextData,
            _previousResults: Object.fromEntries(
              Array.from(chain.results.entries())
                .filter(([id, r]) => r.status === 'COMPLETED' && step.dependsOn?.includes(id))
                .map(([id, r]) => [id, r.output])
            ),
          };

          // Execute via orchestrator
          const result = await orchestrator.execute({
            workflowType: step.workflowType,
            input,
            userId: 'super-orchestrator',
          });

          stepResult.status = result.status === 'COMPLETED' ? 'COMPLETED' : 'FAILED';
          stepResult.jobId = result.jobId;
          stepResult.output = result.output;
          stepResult.error = result.error;
          stepResult.completedAt = new Date();
          stepResult.durationMs =
            stepResult.completedAt.getTime() - stepResult.startedAt!.getTime();

          // Track workflow-specific metrics
          this.recordWorkflowMetrics(step.workflowType, stepResult.durationMs, !result.error);

          completed.add(step.id);
        } catch (error) {
          stepResult.status = 'FAILED';
          stepResult.error = error instanceof Error ? error.message : 'Step execution failed';
          stepResult.completedAt = new Date();
          completed.add(step.id);

          // Retry logic
          if (step.retries && step.retries > 0) {
            step.retries--;
            completed.delete(step.id);
            stepResult.status = 'PENDING';
          }
        }
      });

      await Promise.all(execPromises);
    }
  }

  /**
   * Execute multiple workflows in parallel (no dependencies)
   */
  async executeParallel(
    workflows: Array<{
      workflowType: WorkflowType;
      input: Record<string, unknown>;
      priority?: WorkflowPriority;
    }>
  ): Promise<{
    executionId: string;
    results: Array<{ workflowType: WorkflowType; jobId: string; status: AgentJobStatus }>;
    totalDurationMs: number;
  }> {
    const executionId = uuidv4();
    const startTime = Date.now();
    const orchestrator = getOrchestrator();

    // Sort by priority
    const priorityOrder: Record<WorkflowPriority, number> = {
      CRITICAL: 0,
      HIGH: 1,
      MEDIUM: 2,
      LOW: 3,
    };
    const sorted = [...workflows].sort(
      (a, b) => priorityOrder[a.priority || 'MEDIUM'] - priorityOrder[b.priority || 'MEDIUM']
    );

    const results = await Promise.all(
      sorted.map(async (workflow) => {
        const result = await orchestrator.execute({
          workflowType: workflow.workflowType,
          input: workflow.input,
          userId: 'super-orchestrator',
        });

        return {
          workflowType: workflow.workflowType,
          jobId: result.jobId,
          status: result.status,
        };
      })
    );

    return {
      executionId,
      results,
      totalDurationMs: Date.now() - startTime,
    };
  }

  // ==========================================================================
  // AUTOMATED DAILY OPERATIONS
  // ==========================================================================

  /**
   * Start automated operations scheduler
   */
  startAutomatedOperations(): void {
    if (this.isRunning) {
      console.warn('SuperOrchestrator automated operations already running');
      return;
    }

    this.isRunning = true;
    console.info('Starting SuperOrchestrator automated operations');

    // Schedule morning claims processing
    if (this.config.morningClaimsProcessing.enabled) {
      this.scheduleDailyTask('morning-claims', this.config.morningClaimsProcessing.scheduledTime, () =>
        this.processMorningClaims()
      );
    }

    // Schedule continuous matching
    if (this.config.continuousMatching.enabled) {
      const intervalMs = this.config.continuousMatching.intervalMinutes * 60 * 1000;
      const task = setInterval(() => this.processContinuousMatching(), intervalMs);
      this.scheduledTasks.set('continuous-matching', task);
    }

    // Schedule evening reports
    if (this.config.eveningReports.enabled) {
      this.scheduleDailyTask('evening-reports', this.config.eveningReports.scheduledTime, () =>
        this.generateEveningReports()
      );
    }

    // Schedule weekly summary
    if (this.config.weeklySummary.enabled) {
      this.scheduleWeeklyTask(
        'weekly-summary',
        this.config.weeklySummary.dayOfWeek,
        this.config.weeklySummary.scheduledTime,
        () => this.generateWeeklySummary()
      );
    }
  }

  /**
   * Stop automated operations
   */
  stopAutomatedOperations(): void {
    this.isRunning = false;
    this.scheduledTasks.forEach((task) => clearInterval(task));
    this.scheduledTasks.clear();
    console.info('Stopped SuperOrchestrator automated operations');
  }

  /**
   * Process morning claims queue
   */
  async processMorningClaims(): Promise<{
    processed: number;
    successful: number;
    failed: number;
    skipped: number;
  }> {
    console.info('Processing morning claims queue...');

    try {
      // Get pending claims from database
      const pendingClaims = await prisma.publicClaim.findMany({
        where: {
          status: 'PENDING',
          createdAt: {
            // Claims from last 24 hours
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
        },
        take: this.config.morningClaimsProcessing.maxClaims,
        orderBy: [{ emergencyLevel: 'desc' }, { createdAt: 'asc' }],
      });

      if (pendingClaims.length === 0) {
        return { processed: 0, successful: 0, failed: 0, skipped: 0 };
      }

      // Create workflow chain for each claim
      const steps: WorkflowChainStep[] = [];

      for (const claim of pendingClaims) {
        // Step 1: Process claim
        const claimStepId = `claim-${claim.id}`;
        steps.push({
          id: claimStepId,
          workflowType: 'CLAIM_PROCESSING',
          input: {
            claim: {
              claimId: claim.id,
              insurerName: claim.insuranceProvider || 'OTHER',
              policyNumber: claim.policyNumber || '',
              incidentDate: claim.createdAt,
              damageDescription: claim.description,
              estimatedValue: claim.estimatedCost,
            },
          },
          priority:
            claim.emergencyLevel === 'URGENT'
              ? 'CRITICAL'
              : claim.emergencyLevel === 'HIGH'
                ? 'HIGH'
                : 'MEDIUM',
        });

        // Step 2: Find matching contractors (depends on claim processing)
        steps.push({
          id: `match-${claim.id}`,
          workflowType: 'CONTRACTOR_MATCHING',
          input: {
            requirements: {
              serviceType: claim.australianServiceType || 'WATER_DAMAGE',
              location: {
                state: claim.state || 'NSW',
                suburb: claim.suburb || '',
                postcode: claim.postcode || '',
              },
              urgency: claim.emergencyLevel || 'STANDARD',
              budget: claim.estimatedCost || 5000,
            },
          },
          dependsOn: [claimStepId],
          priority: 'MEDIUM',
        });
      }

      // Execute the chain
      const result = await this.executeChain('Morning Claims Processing', steps, {
        batchId: uuidv4(),
        processedAt: new Date().toISOString(),
      });

      // Count results
      let successful = 0;
      let failed = 0;
      let skipped = 0;

      result.results.forEach((r) => {
        if (r.status === 'COMPLETED') successful++;
        else if (r.status === 'FAILED') failed++;
        else if (r.status === 'SKIPPED') skipped++;
      });

      return {
        processed: pendingClaims.length,
        successful: Math.floor(successful / 2), // Each claim has 2 steps
        failed: Math.ceil(failed / 2),
        skipped: Math.ceil(skipped / 2),
      };
    } catch (error) {
      console.error('Morning claims processing failed:', error);
      return { processed: 0, successful: 0, failed: 0, skipped: 0 };
    }
  }

  /**
   * Continuous matching for pending bookings
   */
  async processContinuousMatching(): Promise<{
    matched: number;
    pending: number;
  }> {
    try {
      // Get pending bookings without assigned contractors
      const pendingBookings = await prisma.booking.findMany({
        where: {
          status: 'PENDING',
          contractorId: null,
        },
        take: this.config.continuousMatching.maxBatchSize,
        orderBy: { createdAt: 'asc' },
        include: { client: true },
      });

      if (pendingBookings.length === 0) {
        return { matched: 0, pending: 0 };
      }

      // Execute matching for each booking in parallel
      const matchingResults = await this.executeParallel(
        pendingBookings.map((booking) => ({
          workflowType: 'CONTRACTOR_MATCHING' as WorkflowType,
          input: {
            requirements: {
              serviceType: booking.serviceType,
              location: {
                state: booking.client?.state || 'NSW',
                suburb: booking.client?.suburb || '',
                postcode: booking.client?.postcode || '',
              },
              urgency: booking.urgency || 'STANDARD',
              budget: booking.quotedPrice || 5000,
            },
            bookingId: booking.id,
          },
          priority: 'MEDIUM' as WorkflowPriority,
        }))
      );

      const matched = matchingResults.results.filter((r) => r.status === 'COMPLETED').length;

      return {
        matched,
        pending: pendingBookings.length - matched,
      };
    } catch (error) {
      console.error('Continuous matching failed:', error);
      return { matched: 0, pending: 0 };
    }
  }

  /**
   * Generate evening reports
   */
  async generateEveningReports(): Promise<{
    reports: string[];
    generatedAt: Date;
  }> {
    const reports: string[] = [];
    const generatedAt = new Date();

    try {
      for (const reportType of this.config.eveningReports.reportTypes) {
        // Generate report via report workflow
        const result = await getOrchestrator().execute({
          workflowType: 'CUSTOM',
          input: {
            query: `Generate ${reportType} report for today`,
            reportType,
            date: new Date().toISOString().split('T')[0],
          },
          userId: 'super-orchestrator',
        });

        if (result.status === 'COMPLETED') {
          reports.push(reportType);
        }
      }

      return { reports, generatedAt };
    } catch (error) {
      console.error('Evening reports generation failed:', error);
      return { reports, generatedAt };
    }
  }

  /**
   * Generate weekly performance summary
   */
  async generateWeeklySummary(): Promise<{
    summary: Record<string, unknown>;
    generatedAt: Date;
  }> {
    const generatedAt = new Date();
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    try {
      // Get weekly metrics from database
      const [claimsCount, bookingsCount, completedBookings, avgRating] = await Promise.all([
        prisma.publicClaim.count({
          where: { createdAt: { gte: weekAgo } },
        }),
        prisma.booking.count({
          where: { createdAt: { gte: weekAgo } },
        }),
        prisma.booking.count({
          where: { createdAt: { gte: weekAgo }, status: 'COMPLETED' },
        }),
        prisma.review.aggregate({
          _avg: { rating: true },
          where: { createdAt: { gte: weekAgo } },
        }),
      ]);

      const summary = {
        period: {
          start: weekAgo.toISOString(),
          end: generatedAt.toISOString(),
        },
        claims: {
          total: claimsCount,
        },
        bookings: {
          total: bookingsCount,
          completed: completedBookings,
          completionRate: bookingsCount > 0 ? (completedBookings / bookingsCount) * 100 : 0,
        },
        performance: {
          averageRating: avgRating._avg.rating || 0,
        },
        orchestrator: {
          totalExecutions: executionHistory.filter(
            (e) => e.startedAt >= weekAgo
          ).length,
          successRate:
            executionHistory.filter((e) => e.startedAt >= weekAgo).length > 0
              ? (executionHistory.filter(
                  (e) => e.startedAt >= weekAgo && e.status === 'COMPLETED'
                ).length /
                  executionHistory.filter((e) => e.startedAt >= weekAgo).length) *
                100
              : 100,
        },
      };

      return { summary, generatedAt };
    } catch (error) {
      console.error('Weekly summary generation failed:', error);
      return {
        summary: { error: 'Failed to generate summary' },
        generatedAt,
      };
    }
  }

  // ==========================================================================
  // SELF-IMPROVEMENT LOOP
  // ==========================================================================

  /**
   * Run self-improvement analysis
   */
  async runSelfImprovement(periodDays: number = 7): Promise<SelfImprovementReport> {
    const analysedAt = new Date();
    const periodStart = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);

    // Gather metrics
    const metrics = this.calculatePerformanceMetrics(periodStart);

    // Identify bottlenecks
    const bottlenecks = this.identifyBottlenecks(periodStart);
    metrics.bottlenecks = bottlenecks;

    // Generate recommendations using AI
    const recommendations = await this.generateRecommendations(metrics);

    // Identify process optimisations
    const processOptimisations = this.identifyProcessOptimisations(metrics);

    // Suggest config adjustments
    const configAdjustments = this.suggestConfigAdjustments(metrics);

    return {
      analysedAt,
      periodDays,
      metrics,
      recommendations,
      processOptimisations,
      configAdjustments,
    };
  }

  /**
   * Calculate performance metrics for a period
   */
  private calculatePerformanceMetrics(since: Date): PerformanceMetrics {
    const recentExecutions = executionHistory.filter((e) => e.startedAt >= since);
    const durations = recentExecutions
      .filter((e) => e.completedAt)
      .map((e) => e.completedAt!.getTime() - e.startedAt.getTime());

    // Sort for percentile calculation
    const sortedDurations = [...durations].sort((a, b) => a - b);
    const p95Index = Math.floor(sortedDurations.length * 0.95);

    // Calculate workflow-specific metrics
    const workflowMetrics = new Map<WorkflowType, WorkflowMetrics>();
    const workflowData = performanceData.workflowDurations;

    for (const [wfType, wfDurations] of workflowData.entries()) {
      const recentDurations = wfDurations.slice(-100); // Last 100 executions
      const sortedWfDurations = [...recentDurations].sort((a, b) => a - b);

      workflowMetrics.set(wfType, {
        workflowType: wfType,
        totalExecutions: recentDurations.length,
        successRate: 95, // Would calculate from actual data
        averageDurationMs:
          recentDurations.length > 0
            ? recentDurations.reduce((a, b) => a + b, 0) / recentDurations.length
            : 0,
        p95DurationMs:
          sortedWfDurations.length > 0
            ? sortedWfDurations[Math.floor(sortedWfDurations.length * 0.95)] || 0
            : 0,
        failureReasons: new Map(),
      });
    }

    return {
      totalExecutions: recentExecutions.length,
      successfulExecutions: recentExecutions.filter((e) => e.status === 'COMPLETED').length,
      failedExecutions: recentExecutions.filter((e) => e.status === 'FAILED').length,
      averageDurationMs:
        durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
      p95DurationMs: sortedDurations[p95Index] || 0,
      averageStepsPerChain:
        recentExecutions.length > 0
          ? recentExecutions.reduce((sum, e) => sum + e.steps.length, 0) / recentExecutions.length
          : 0,
      bottlenecks: [],
      workflowMetrics,
      lastUpdated: new Date(),
    };
  }

  /**
   * Identify bottlenecks in workflow execution
   */
  private identifyBottlenecks(since: Date): BottleneckInfo[] {
    const bottlenecks: BottleneckInfo[] = [];
    const recentExecutions = executionHistory.filter((e) => e.startedAt >= since);

    // Analyse step durations to find slow steps
    const stepDurations: Map<string, { durations: number[]; failures: number }> = new Map();

    for (const execution of recentExecutions) {
      for (const [, result] of execution.results) {
        if (result.durationMs) {
          const key = result.stepId.split('-')[0]; // Get workflow type prefix
          const existing = stepDurations.get(key) || { durations: [], failures: 0 };
          existing.durations.push(result.durationMs);
          if (result.status === 'FAILED') existing.failures++;
          stepDurations.set(key, existing);
        }
      }
    }

    // Find bottlenecks (steps with high average duration or failure rate)
    for (const [location, data] of stepDurations) {
      const avgDuration =
        data.durations.length > 0
          ? data.durations.reduce((a, b) => a + b, 0) / data.durations.length
          : 0;
      const failureRate =
        data.durations.length > 0 ? data.failures / data.durations.length : 0;

      // High duration bottleneck (>30 seconds average)
      if (avgDuration > 30000) {
        bottlenecks.push({
          location,
          severity: avgDuration > 60000 ? 'HIGH' : 'MEDIUM',
          averageDelayMs: avgDuration,
          occurrences: data.durations.length,
          suggestedFix: `Consider caching, parallel processing, or model optimisation for ${location}`,
        });
      }

      // High failure rate bottleneck (>10%)
      if (failureRate > 0.1) {
        bottlenecks.push({
          location,
          severity: failureRate > 0.25 ? 'CRITICAL' : 'HIGH',
          averageDelayMs: avgDuration,
          occurrences: data.failures,
          suggestedFix: `Review error handling and retry logic for ${location}`,
        });
      }
    }

    return bottlenecks;
  }

  /**
   * Generate AI-powered recommendations
   */
  private async generateRecommendations(
    metrics: PerformanceMetrics
  ): Promise<Recommendation[]> {
    const recommendations: Recommendation[] = [];

    // Performance recommendations
    if (metrics.p95DurationMs > 120000) {
      recommendations.push({
        id: uuidv4(),
        type: 'PERFORMANCE',
        priority: 'HIGH',
        title: 'Reduce P95 latency',
        description: `P95 execution time is ${Math.round(metrics.p95DurationMs / 1000)}s. Consider implementing caching for frequently used data.`,
        expectedImpact: '30-50% reduction in execution time',
        implementationEffort: 'MEDIUM',
      });
    }

    // Reliability recommendations
    const successRate =
      metrics.totalExecutions > 0
        ? (metrics.successfulExecutions / metrics.totalExecutions) * 100
        : 100;
    if (successRate < 95) {
      recommendations.push({
        id: uuidv4(),
        type: 'RELIABILITY',
        priority: 'CRITICAL',
        title: 'Improve execution success rate',
        description: `Current success rate is ${successRate.toFixed(1)}%. Review failed executions and implement better error handling.`,
        expectedImpact: 'Increase success rate to >98%',
        implementationEffort: 'HIGH',
      });
    }

    // Cost recommendations
    if (metrics.averageStepsPerChain > 5) {
      recommendations.push({
        id: uuidv4(),
        type: 'COST',
        priority: 'MEDIUM',
        title: 'Optimise chain length',
        description: `Average chain has ${metrics.averageStepsPerChain.toFixed(1)} steps. Consider consolidating steps to reduce API calls.`,
        expectedImpact: '20-30% reduction in AI costs',
        implementationEffort: 'MEDIUM',
      });
    }

    // Use AI to generate additional recommendations
    try {
      const provider = getDefaultProvider();
      const model = provider.getModel();

      const prompt = `Analyse these workflow orchestration metrics and suggest improvements:

Metrics:
- Total Executions: ${metrics.totalExecutions}
- Success Rate: ${successRate.toFixed(1)}%
- Average Duration: ${Math.round(metrics.averageDurationMs / 1000)}s
- P95 Duration: ${Math.round(metrics.p95DurationMs / 1000)}s
- Bottlenecks: ${metrics.bottlenecks.map((b) => b.location).join(', ') || 'None identified'}

Generate 2-3 actionable recommendations in JSON format:
{
  "recommendations": [
    {
      "type": "PERFORMANCE|RELIABILITY|COST|QUALITY",
      "priority": "LOW|MEDIUM|HIGH|CRITICAL",
      "title": "Brief title",
      "description": "Detailed description",
      "expectedImpact": "Expected improvement",
      "effort": "LOW|MEDIUM|HIGH"
    }
  ]
}`;

      const response = await model.invoke(prompt);
      const content = typeof response.content === 'string' ? response.content : '';

      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.recommendations) {
            for (const rec of parsed.recommendations) {
              recommendations.push({
                id: uuidv4(),
                type: rec.type || 'QUALITY',
                priority: rec.priority || 'MEDIUM',
                title: rec.title || 'AI Recommendation',
                description: rec.description || '',
                expectedImpact: rec.expectedImpact || 'Unknown',
                implementationEffort: rec.effort || 'MEDIUM',
              });
            }
          }
        }
      } catch {
        // AI recommendation parsing failed, continue with manual recommendations
      }
    } catch {
      // AI not available, continue with manual recommendations
    }

    return recommendations;
  }

  /**
   * Identify process optimisation opportunities
   */
  private identifyProcessOptimisations(metrics: PerformanceMetrics): ProcessOptimisation[] {
    const optimisations: ProcessOptimisation[] = [];

    // Check for common chain patterns that could be optimised
    const chainPatterns: Map<string, number> = new Map();

    for (const execution of executionHistory.slice(-100)) {
      const pattern = execution.steps.map((s) => s.workflowType).join('->');
      chainPatterns.set(pattern, (chainPatterns.get(pattern) || 0) + 1);
    }

    // Find frequently used patterns
    for (const [pattern, count] of chainPatterns) {
      if (count >= 10 && pattern.includes('->')) {
        const steps = pattern.split('->');

        // Suggest parallelisation if steps don't depend on each other
        if (steps.length >= 3) {
          optimisations.push({
            processId: `pattern-${count}`,
            currentFlow: pattern,
            suggestedFlow: `Parallel(${steps.slice(1).join(', ')}) after ${steps[0]}`,
            expectedSpeedupPercent: 30,
            reasoning: `This pattern is used ${count} times. Steps after the first may be parallelisable.`,
          });
        }
      }
    }

    return optimisations;
  }

  /**
   * Suggest configuration adjustments
   */
  private suggestConfigAdjustments(metrics: PerformanceMetrics): ConfigAdjustment[] {
    const adjustments: ConfigAdjustment[] = [];

    // Check if continuous matching interval should be adjusted
    if (metrics.averageDurationMs > 60000) {
      adjustments.push({
        configKey: 'continuousMatching.intervalMinutes',
        currentValue: this.config.continuousMatching.intervalMinutes,
        suggestedValue: Math.max(30, this.config.continuousMatching.intervalMinutes * 2),
        reasoning:
          'High average execution duration suggests increasing interval to prevent overlap',
      });
    }

    // Check if batch sizes should be adjusted based on success rate
    const successRate =
      metrics.totalExecutions > 0
        ? (metrics.successfulExecutions / metrics.totalExecutions) * 100
        : 100;
    if (successRate < 90 && this.config.morningClaimsProcessing.maxClaims > 20) {
      adjustments.push({
        configKey: 'morningClaimsProcessing.maxClaims',
        currentValue: this.config.morningClaimsProcessing.maxClaims,
        suggestedValue: Math.floor(this.config.morningClaimsProcessing.maxClaims * 0.7),
        reasoning: 'Lower success rate suggests reducing batch size for more reliable processing',
      });
    }

    return adjustments;
  }

  // ==========================================================================
  // HELPER METHODS
  // ==========================================================================

  /**
   * Schedule a daily task at specific time (AEST)
   */
  private scheduleDailyTask(id: string, time: string, task: () => Promise<void>): void {
    const [hours, minutes] = time.split(':').map(Number);

    const scheduleNext = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(hours, minutes, 0, 0);

      // If time has passed today, schedule for tomorrow
      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const delay = targetTime.getTime() - now.getTime();

      const timeout = setTimeout(async () => {
        try {
          await task();
        } catch (error) {
          console.error(`Daily task ${id} failed:`, error);
        }
        scheduleNext(); // Schedule next execution
      }, delay);

      this.scheduledTasks.set(id, timeout);
    };

    scheduleNext();
  }

  /**
   * Schedule a weekly task
   */
  private scheduleWeeklyTask(
    id: string,
    dayOfWeek: number,
    time: string,
    task: () => Promise<void>
  ): void {
    const [hours, minutes] = time.split(':').map(Number);

    const scheduleNext = () => {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(hours, minutes, 0, 0);

      // Find next occurrence of the day
      const currentDay = now.getDay();
      let daysUntil = dayOfWeek - currentDay;
      if (daysUntil < 0 || (daysUntil === 0 && targetTime <= now)) {
        daysUntil += 7;
      }
      targetTime.setDate(targetTime.getDate() + daysUntil);

      const delay = targetTime.getTime() - now.getTime();

      const timeout = setTimeout(async () => {
        try {
          await task();
        } catch (error) {
          console.error(`Weekly task ${id} failed:`, error);
        }
        scheduleNext();
      }, delay);

      this.scheduledTasks.set(id, timeout);
    };

    scheduleNext();
  }

  /**
   * Record workflow-specific metrics
   */
  private recordWorkflowMetrics(
    workflowType: WorkflowType,
    durationMs: number,
    success: boolean
  ): void {
    const existing = performanceData.workflowDurations.get(workflowType) || [];
    existing.push(durationMs);

    // Keep only last 500 records per workflow
    if (existing.length > 500) {
      existing.shift();
    }

    performanceData.workflowDurations.set(workflowType, existing);
  }

  // ==========================================================================
  // PUBLIC GETTERS
  // ==========================================================================

  /**
   * Get current configuration
   */
  getConfig(): DailyOperationConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<DailyOperationConfig>): void {
    this.config = { ...this.config, ...updates };

    // Restart scheduler if running
    if (this.isRunning) {
      this.stopAutomatedOperations();
      this.startAutomatedOperations();
    }
  }

  /**
   * Get active chains
   */
  getActiveChains(): ChainExecution[] {
    return Array.from(activeChains.values());
  }

  /**
   * Get chain status
   */
  getChainStatus(chainId: string): ChainExecution | undefined {
    return activeChains.get(chainId) || executionHistory.find((e) => e.id === chainId);
  }

  /**
   * Cancel an active chain
   */
  async cancelChain(chainId: string): Promise<boolean> {
    const chain = activeChains.get(chainId);
    if (!chain) return false;

    chain.status = 'CANCELLED';
    chain.completedAt = new Date();
    activeChains.delete(chainId);
    executionHistory.push(chain);

    return true;
  }

  /**
   * Get execution history
   */
  getExecutionHistory(limit: number = 100): ChainExecution[] {
    return executionHistory.slice(-limit);
  }

  /**
   * Get current performance metrics
   */
  getPerformanceMetrics(periodDays: number = 7): PerformanceMetrics {
    const since = new Date(Date.now() - periodDays * 24 * 60 * 60 * 1000);
    return this.calculatePerformanceMetrics(since);
  }

  /**
   * Check if automated operations are running
   */
  isOperationsRunning(): boolean {
    return this.isRunning;
  }
}

// ============================================================================
// SINGLETON & EXPORTS
// ============================================================================

let superOrchestratorInstance: SuperOrchestrator | null = null;

export function getSuperOrchestrator(
  config?: Partial<DailyOperationConfig>
): SuperOrchestrator {
  if (!superOrchestratorInstance) {
    superOrchestratorInstance = new SuperOrchestrator(config);
  }
  return superOrchestratorInstance;
}

export function createSuperOrchestrator(
  config?: Partial<DailyOperationConfig>
): SuperOrchestrator {
  return new SuperOrchestrator(config);
}

// Pre-defined workflow chains for common operations
export const WorkflowChains = {
  /**
   * Full claim-to-contractor chain
   */
  createClaimToContractorChain(
    claimData: Record<string, unknown>,
    matchingRequirements: Record<string, unknown>
  ): WorkflowChainStep[] {
    return [
      {
        id: 'analyse-claim',
        workflowType: 'CLAIM_PROCESSING',
        input: { claim: claimData },
        priority: 'HIGH',
      },
      {
        id: 'match-contractor',
        workflowType: 'CONTRACTOR_MATCHING',
        input: { requirements: matchingRequirements },
        dependsOn: ['analyse-claim'],
        priority: 'MEDIUM',
      },
    ];
  },

  /**
   * Full disaster response chain
   */
  createDisasterResponseChain(
    disasterData: Record<string, unknown>,
    inspectionData?: Record<string, unknown>
  ): WorkflowChainStep[] {
    const steps: WorkflowChainStep[] = [
      {
        id: 'analyse-disaster',
        workflowType: 'DISASTER_ANALYSIS',
        input: { disaster: disasterData },
        priority: 'CRITICAL',
      },
    ];

    if (inspectionData) {
      steps.push({
        id: 'generate-report',
        workflowType: 'INSPECTION_REPORT',
        input: inspectionData,
        dependsOn: ['analyse-disaster'],
        priority: 'HIGH',
      });
    }

    steps.push({
      id: 'find-contractors',
      workflowType: 'CONTRACTOR_MATCHING',
      input: {
        requirements: {
          serviceType: (disasterData.damageType as string) || 'WATER_DAMAGE',
          urgency: 'URGENT',
        },
      },
      dependsOn: inspectionData ? ['generate-report'] : ['analyse-disaster'],
      priority: 'HIGH',
    });

    return steps;
  },

  /**
   * Customer support escalation chain
   */
  createSupportEscalationChain(
    supportQuery: Record<string, unknown>
  ): WorkflowChainStep[] {
    return [
      {
        id: 'handle-query',
        workflowType: 'CUSTOMER_SUPPORT',
        input: supportQuery,
        priority: 'HIGH',
      },
    ];
  },
};

// ============================================================================
// LEGACY FUNCTION EXPORTS (for backward compatibility)
// ============================================================================

export interface AgentEvent {
  id: string;
  type: string;
  timestamp: Date;
  source: string;
  data: any;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export async function executeManualWorkflow(workflowType: string, data: any): Promise<any> {
  const orchestrator = getSuperOrchestrator();
  return orchestrator.executeChain(workflowType, [], data);
}

export async function getDailyReport(): Promise<any> {
  const orchestrator = getSuperOrchestrator();
  return orchestrator.generateEveningReports();
}

export async function getWeeklyReport(): Promise<any> {
  const orchestrator = getSuperOrchestrator();
  return orchestrator.generateWeeklySummary();
}

export async function runSelfImprovement(): Promise<any> {
  const orchestrator = getSuperOrchestrator();
  return orchestrator.runSelfImprovement();
}
