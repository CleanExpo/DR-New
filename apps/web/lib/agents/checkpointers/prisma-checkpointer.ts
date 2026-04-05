// @ts-nocheck
/**
 * Prisma Checkpointer - Persist LangGraph state to PostgreSQL via Prisma
 */

import {
  BaseCheckpointSaver,
  Checkpoint,
  CheckpointMetadata,
  CheckpointTuple,
} from '@langchain/langgraph-checkpoint';
import { RunnableConfig } from '@langchain/core/runnables';
import { prisma } from '@/lib/prisma';
import { CheckpointError } from '../types';

interface PrismaCheckpointerConfig {
  jobId?: string;
}

export class PrismaCheckpointer extends BaseCheckpointSaver {
  private jobId?: string;

  constructor(config?: PrismaCheckpointerConfig) {
    super();
    this.jobId = config?.jobId;
  }

  /**
   * Get a checkpoint tuple by config
   */
  async getTuple(config: RunnableConfig): Promise<CheckpointTuple | undefined> {
    const threadId = config.configurable?.thread_id as string;
    const checkpointId = config.configurable?.checkpoint_id as string;

    if (!threadId) {
      return undefined;
    }

    try {
      let checkpoint;

      if (checkpointId) {
        // Get specific checkpoint
        checkpoint = await prisma.agentCheckpoint.findFirst({
          where: {
            threadId,
            id: checkpointId,
          },
          orderBy: { createdAt: 'desc' },
        });
      } else {
        // Get latest checkpoint for thread
        checkpoint = await prisma.agentCheckpoint.findFirst({
          where: { threadId },
          orderBy: { createdAt: 'desc' },
        });
      }

      if (!checkpoint) {
        return undefined;
      }

      const checkpointData = checkpoint.checkpointData as Record<string, unknown>;

      return {
        config: {
          configurable: {
            thread_id: checkpoint.threadId,
            checkpoint_id: checkpoint.id,
          },
        },
        checkpoint: checkpointData as unknown as Checkpoint,
        metadata: {
          source: 'input',
          step: 0,
          writes: {},
        } as CheckpointMetadata,
        parentConfig: checkpoint.parentCheckpointId
          ? {
              configurable: {
                thread_id: checkpoint.threadId,
                checkpoint_id: checkpoint.parentCheckpointId,
              },
            }
          : undefined,
      };
    } catch (error) {
      throw new CheckpointError(
        `Failed to get checkpoint: ${error instanceof Error ? error.message : 'Unknown error'}`,
        threadId
      );
    }
  }

  /**
   * List checkpoints for a thread
   */
  async *list(
    config: RunnableConfig,
    options?: { limit?: number; before?: RunnableConfig }
  ): AsyncGenerator<CheckpointTuple> {
    const threadId = config.configurable?.thread_id as string;
    const limit = options?.limit || 100;
    const beforeId = options?.before?.configurable?.checkpoint_id as string;

    if (!threadId) {
      return;
    }

    try {
      const checkpoints = await prisma.agentCheckpoint.findMany({
        where: {
          threadId,
          ...(beforeId && { id: { lt: beforeId } }),
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      for (const checkpoint of checkpoints) {
        const checkpointData = checkpoint.checkpointData as Record<string, unknown>;

        yield {
          config: {
            configurable: {
              thread_id: checkpoint.threadId,
              checkpoint_id: checkpoint.id,
            },
          },
          checkpoint: checkpointData as unknown as Checkpoint,
          metadata: {
            source: 'input',
            step: 0,
            writes: {},
          } as CheckpointMetadata,
          parentConfig: checkpoint.parentCheckpointId
            ? {
                configurable: {
                  thread_id: checkpoint.threadId,
                  checkpoint_id: checkpoint.parentCheckpointId,
                },
              }
            : undefined,
        };
      }
    } catch (error) {
      throw new CheckpointError(
        `Failed to list checkpoints: ${error instanceof Error ? error.message : 'Unknown error'}`,
        threadId
      );
    }
  }

  /**
   * Save a checkpoint
   */
  async put(
    config: RunnableConfig,
    checkpoint: Checkpoint,
    metadata: CheckpointMetadata
  ): Promise<RunnableConfig> {
    const threadId = config.configurable?.thread_id as string;
    const parentCheckpointId = config.configurable?.checkpoint_id as string;

    if (!threadId) {
      throw new CheckpointError('thread_id is required to save checkpoint', '');
    }

    try {
      // Determine the jobId - use from config, instance, or find from thread
      let jobId = this.jobId || (config.configurable?.job_id as string);

      if (!jobId) {
        // Try to find job by thread (for resuming workflows)
        const existingCheckpoint = await prisma.agentCheckpoint.findFirst({
          where: { threadId },
          select: { jobId: true },
        });
        jobId = existingCheckpoint?.jobId;
      }

      if (!jobId) {
        throw new CheckpointError(
          'job_id is required to save checkpoint. Provide it in config or checkpointer constructor.',
          threadId
        );
      }

      // Create the checkpoint
      const newCheckpoint = await prisma.agentCheckpoint.create({
        data: {
          jobId,
          threadId,
          checkpointData: checkpoint as unknown as Record<string, unknown>,
          parentCheckpointId: parentCheckpointId || null,
          nodeCompleted: (metadata as Record<string, unknown>)?.node as string || 'unknown',
        },
      });

      // Update job with latest checkpoint
      await prisma.agentJob.update({
        where: { id: jobId },
        data: {
          checkpointId: newCheckpoint.id,
          currentNode: (metadata as Record<string, unknown>)?.node as string || undefined,
        },
      });

      return {
        configurable: {
          thread_id: threadId,
          checkpoint_id: newCheckpoint.id,
          job_id: jobId,
        },
      };
    } catch (error) {
      if (error instanceof CheckpointError) {
        throw error;
      }
      throw new CheckpointError(
        `Failed to save checkpoint: ${error instanceof Error ? error.message : 'Unknown error'}`,
        threadId
      );
    }
  }

  /**
   * Write pending writes (for interrupted workflows)
   */
  async putWrites(
    config: RunnableConfig,
    writes: Array<[string, unknown]>,
    taskId: string
  ): Promise<void> {
    // For now, we don't support pending writes - they're stored in the checkpoint itself
    // This could be extended to store writes separately for more granular recovery
    console.log(
      `PrismaCheckpointer.putWrites called with ${writes.length} writes for task ${taskId}`
    );
  }

  /**
   * Delete checkpoints for a thread
   */
  async deleteThread(threadId: string): Promise<void> {
    try {
      await prisma.agentCheckpoint.deleteMany({
        where: { threadId },
      });
    } catch (error) {
      throw new CheckpointError(
        `Failed to delete thread checkpoints: ${error instanceof Error ? error.message : 'Unknown error'}`,
        threadId
      );
    }
  }

  /**
   * Get all checkpoints for a job
   */
  async getJobCheckpoints(jobId: string): Promise<
    Array<{
      id: string;
      threadId: string;
      nodeCompleted: string;
      createdAt: Date;
    }>
  > {
    return prisma.agentCheckpoint.findMany({
      where: { jobId },
      select: {
        id: true,
        threadId: true,
        nodeCompleted: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}

/**
 * Create a checkpointer for a specific job
 */
export function createPrismaCheckpointer(
  config?: PrismaCheckpointerConfig
): PrismaCheckpointer {
  return new PrismaCheckpointer(config);
}
