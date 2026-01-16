/**
 * Shared agent types between Next.js and Python backend
 */

/**
 * Available workflow types for AI agent orchestration
 */
export type WorkflowType =
  | 'DISASTER_ANALYSIS'
  | 'CLAIM_PROCESSING'
  | 'CONTRACTOR_MATCHING'
  | 'INSPECTION_REPORT'
  | 'CUSTOMER_SUPPORT'
  | 'CUSTOM';

/**
 * Status of an agent job
 */
export type AgentJobStatus =
  | 'PENDING'
  | 'ROUTING'
  | 'PROCESSING'
  | 'AWAITING_HUMAN'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

/**
 * Status for Supabase Realtime (lowercase for DB conventions)
 */
export type AgentRunStatus =
  | 'pending'
  | 'routing'
  | 'processing'
  | 'awaiting_human'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * Input for creating a new agent job
 */
export interface AgentJobInput {
  workflowType: WorkflowType;
  userId: string;
  tenantId?: string;
  input: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

/**
 * Result of an agent job execution
 */
export interface AgentJobResult {
  jobId: string;
  status: AgentJobStatus;
  result?: Record<string, unknown>;
  error?: string;
  executionTimeMs?: number;
  totalTokens?: number;
  totalCost?: number;
}

/**
 * Agent run record for Supabase Realtime
 */
export interface AgentRun {
  id: string;
  job_id: string;
  user_id: string;
  workflow_type: string;
  status: AgentRunStatus;
  current_node: string | null;
  progress: number;
  output: Record<string, unknown> | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Realtime event payloads for Supabase subscriptions
 */
export interface AgentRunInsertPayload {
  new: AgentRun;
  old: null;
}

export interface AgentRunUpdatePayload {
  new: AgentRun;
  old: AgentRun;
}

export interface AgentRunDeletePayload {
  new: null;
  old: AgentRun;
}

/**
 * Execution metrics for an agent job
 */
export interface AgentExecutionMetrics {
  startTime: Date;
  endTime?: Date;
  totalTokens: number;
  promptTokens: number;
  completionTokens: number;
  totalCost: number;
  iterations: number;
  retryCount: number;
}

/**
 * Checkpoint for resumable agent workflows
 */
export interface AgentCheckpoint {
  id: string;
  jobId: string;
  nodeId: string;
  state: Record<string, unknown>;
  createdAt: Date;
}
