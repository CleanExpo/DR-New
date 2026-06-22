
/**
 * Agent Orchestrator - Main coordination layer for LangGraph workflows
 * Routes requests to appropriate workflows and manages execution lifecycle
 */

import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';
import { BaseAIProvider } from '../providers/base-provider';
import { getDefaultProvider, getFirstAvailableProvider } from '../providers';
import { IntelligentRouter, getRouter } from './router';
import { ContextManager, createContextManager } from './context-manager';
import { PrismaCheckpointer, createPrismaCheckpointer } from '../checkpointers/prisma-checkpointer';
import {
  WorkflowType,
  AgentJobStatus,
  AgentJobInput,
  AgentJobResult,
  OrchestratorConfig,
  StreamEvent,
  StreamConfig,
  AgentError,
  AgentState,
} from '../types';

// Workflow registry - maps workflow types to their implementations
type WorkflowExecutor = (
  input: Record<string, unknown>,
  config: WorkflowExecutionConfig
) => Promise<Record<string, unknown>>;

interface WorkflowExecutionConfig {
  jobId: string;
  userId: string;
  tenantId?: string;
  threadId: string;
  provider: BaseAIProvider;
  checkpointer: PrismaCheckpointer;
  contextManager: ContextManager;
  maxIterations: number;
  timeoutMs: number;
}

const workflowRegistry: Map<WorkflowType, WorkflowExecutor> = new Map();

/**
 * Register a workflow executor
 */
export function registerWorkflow(
  type: WorkflowType,
  executor: WorkflowExecutor
): void {
  workflowRegistry.set(type, executor);
}

/**
 * Main Agent Orchestrator class
 */
export class AgentOrchestrator {
  private config: OrchestratorConfig;
  private router: IntelligentRouter;
  private provider: BaseAIProvider;

  constructor(config?: Partial<OrchestratorConfig>) {
    this.config = {
      defaultProvider: 'anthropic',
      providers: {},
      maxIterations: parseInt(process.env.AGENT_MAX_ITERATIONS || '10', 10),
      timeoutMs: parseInt(process.env.AGENT_TIMEOUT_MS || '55000', 10),
      enableStreaming: process.env.AGENT_ENABLE_STREAMING !== 'false',
      checkpointerType: 'prisma',
      ...config,
    };

    this.router = getRouter();
    this.provider = getDefaultProvider();
  }

  /**
   * Execute a workflow with automatic routing
   */
  async execute(input: AgentJobInput): Promise<AgentJobResult> {
    const startTime = Date.now();

    // Create the job record
    const job = await this.createJob(input);

    try {
      // Update job to routing status
      await this.updateJobStatus(job.id, 'ROUTING');

      // Route to appropriate workflow if not specified
      let workflowType = input.workflowType;
      if (workflowType === 'CUSTOM' && typeof input.input.query === 'string') {
        const routingDecision = await this.router.route(
          input.input.query as string,
          input.input
        );
        workflowType = routingDecision.targetWorkflow;

        // Record routing decision
        await this.recordStep(job.id, {
          nodeName: 'router',
          input: { query: input.input.query },
          output: routingDecision,
        });
      }

      // Get workflow executor
      const executor = workflowRegistry.get(workflowType);
      if (!executor) {
        throw new AgentError(
          `No executor registered for workflow: ${workflowType}`,
          'WORKFLOW_NOT_FOUND',
          false,
          { workflowType }
        );
      }

      // Update job to processing status
      await this.updateJobStatus(job.id, 'PROCESSING', { currentNode: 'start' });

      // Set up execution context
      const threadId = uuidv4();
      const checkpointer = createPrismaCheckpointer({ jobId: job.id });
      const contextManager = createContextManager();

      // Get provider with fallback
      let provider: BaseAIProvider;
      try {
        provider = await getFirstAvailableProvider(['anthropic', 'ollama']);
      } catch {
        provider = this.provider;
      }

      // Execute the workflow
      const result = await executor(input.input, {
        jobId: job.id,
        userId: input.userId,
        tenantId: input.tenantId,
        threadId,
        provider,
        checkpointer,
        contextManager,
        maxIterations: this.config.maxIterations,
        timeoutMs: this.config.timeoutMs,
      });

      // Mark job as completed
      const durationMs = Date.now() - startTime;
      await this.completeJob(job.id, result, durationMs);

      return {
        jobId: job.id,
        status: 'COMPLETED',
        output: result,
        metrics: {
          totalTokens: 0, // TODO: Track from provider
          totalCost: 0,
          iterations: 0,
          durationMs,
        },
      };
    } catch (error) {
      // Mark job as failed
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      await this.failJob(job.id, errorMessage, errorStack);

      return {
        jobId: job.id,
        status: 'FAILED',
        error: errorMessage,
        metrics: {
          totalTokens: 0,
          totalCost: 0,
          iterations: 0,
          durationMs: Date.now() - startTime,
        },
      };
    }
  }

  /**
   * Stream workflow execution
   */
  async *stream(
    input: AgentJobInput,
    config?: StreamConfig
  ): AsyncGenerator<StreamEvent> {
    const startTime = Date.now();

    // Create the job record
    const job = await this.createJob(input);

    try {
      yield {
        type: 'node_start',
        node: 'orchestrator',
        data: { jobId: job.id, workflow: input.workflowType },
        timestamp: new Date(),
      };

      // Update job to processing status
      await this.updateJobStatus(job.id, 'PROCESSING');

      // Get workflow executor
      const executor = workflowRegistry.get(input.workflowType);
      if (!executor) {
        throw new AgentError(
          `No executor registered for workflow: ${input.workflowType}`,
          'WORKFLOW_NOT_FOUND',
          false
        );
      }

      // Set up execution context
      const threadId = uuidv4();
      const checkpointer = createPrismaCheckpointer({ jobId: job.id });
      const contextManager = createContextManager();

      const provider = await getFirstAvailableProvider(['anthropic', 'ollama']);

      // Execute and yield progress events
      // Note: Full streaming requires workflow-specific implementation
      const result = await executor(input.input, {
        jobId: job.id,
        userId: input.userId,
        tenantId: input.tenantId,
        threadId,
        provider,
        checkpointer,
        contextManager,
        maxIterations: this.config.maxIterations,
        timeoutMs: this.config.timeoutMs,
      });

      // Mark job as completed
      const durationMs = Date.now() - startTime;
      await this.completeJob(job.id, result, durationMs);

      yield {
        type: 'complete',
        data: {
          jobId: job.id,
          output: result,
          durationMs,
        },
        timestamp: new Date(),
      };

      if (config?.onComplete) {
        config.onComplete({
          jobId: job.id,
          status: 'COMPLETED',
          output: result,
          metrics: {
            totalTokens: 0,
            totalCost: 0,
            iterations: 0,
            durationMs,
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      await this.failJob(job.id, errorMessage);

      yield {
        type: 'error',
        data: { jobId: job.id, error: errorMessage },
        timestamp: new Date(),
      };

      if (config?.onError) {
        config.onError(error instanceof Error ? error : new Error(errorMessage));
      }
    }
  }

  /**
   * Get job status
   */
  async getJobStatus(jobId: string): Promise<{
    status: AgentJobStatus;
    currentNode?: string;
    output?: Record<string, unknown>;
    error?: string;
  }> {
    const job = await prisma.agentJob.findUnique({
      where: { id: jobId },
      select: {
        status: true,
        currentNode: true,
        output: true,
        errorMessage: true,
      },
    });

    if (!job) {
      throw new AgentError(`Job not found: ${jobId}`, 'JOB_NOT_FOUND', false);
    }

    return {
      status: job.status as AgentJobStatus,
      currentNode: job.currentNode || undefined,
      output: job.output as Record<string, unknown> | undefined,
      error: job.errorMessage || undefined,
    };
  }

  /**
   * Cancel a running job
   */
  async cancelJob(jobId: string): Promise<void> {
    await prisma.agentJob.update({
      where: { id: jobId },
      data: {
        status: 'CANCELLED',
        completedAt: new Date(),
      },
    });
  }

  /**
   * Resume a paused or failed job
   */
  async resumeJob(jobId: string): Promise<AgentJobResult> {
    const job = await prisma.agentJob.findUnique({
      where: { id: jobId },
      include: { checkpoints: { orderBy: { createdAt: 'desc' }, take: 1 } },
    });

    if (!job) {
      throw new AgentError(`Job not found: ${jobId}`, 'JOB_NOT_FOUND', false);
    }

    if (job.status === 'COMPLETED' || job.status === 'CANCELLED') {
      throw new AgentError(
        `Cannot resume job with status: ${job.status}`,
        'INVALID_STATE',
        false
      );
    }

    // Re-execute with the same input
    return this.execute({
      workflowType: job.workflowType as WorkflowType,
      input: job.input as Record<string, unknown>,
      userId: job.userId,
      tenantId: job.tenantId || undefined,
    });
  }

  // Private helper methods

  private async createJob(input: AgentJobInput): Promise<{ id: string }> {
    return prisma.agentJob.create({
      data: {
        userId: input.userId,
        tenantId: input.tenantId,
        workflowType: input.workflowType,
        input: input.input,
        status: 'PENDING',
      },
      select: { id: true },
    });
  }

  private async updateJobStatus(
    jobId: string,
    status: AgentJobStatus,
    extra?: { currentNode?: string }
  ): Promise<void> {
    await prisma.agentJob.update({
      where: { id: jobId },
      data: {
        status,
        ...(status === 'PROCESSING' && { startedAt: new Date() }),
        ...extra,
      },
    });
  }

  private async completeJob(
    jobId: string,
    output: Record<string, unknown>,
    _durationMs: number
  ): Promise<void> {
    await prisma.agentJob.update({
      where: { id: jobId },
      data: {
        status: 'COMPLETED',
        output,
        completedAt: new Date(),
      },
    });
  }

  private async failJob(
    jobId: string,
    errorMessage: string,
    errorStack?: string
  ): Promise<void> {
    await prisma.agentJob.update({
      where: { id: jobId },
      data: {
        status: 'FAILED',
        errorMessage,
        errorStack,
        completedAt: new Date(),
      },
    });
  }

  private async recordStep(
    jobId: string,
    step: {
      nodeName: string;
      agentName?: string;
      toolName?: string;
      input?: Record<string, unknown>;
      output?: Record<string, unknown>;
    }
  ): Promise<void> {
    await prisma.agentJobStep.create({
      data: {
        jobId,
        nodeName: step.nodeName,
        agentName: step.agentName,
        toolName: step.toolName,
        input: step.input,
        output: step.output,
      },
    });
  }
}

// Singleton instance
let orchestratorInstance: AgentOrchestrator | null = null;

export function getOrchestrator(
  config?: Partial<OrchestratorConfig>
): AgentOrchestrator {
  if (!orchestratorInstance) {
    orchestratorInstance = new AgentOrchestrator(config);
  }
  return orchestratorInstance;
}

export function createOrchestrator(
  config?: Partial<OrchestratorConfig>
): AgentOrchestrator {
  return new AgentOrchestrator(config);
}

// Export the WorkflowExecutionConfig type for workflow implementations
export type { WorkflowExecutionConfig };
