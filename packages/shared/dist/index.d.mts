/**
 * Shared authentication types between Next.js and Python backend
 */
type UserType = 'CLIENT' | 'CONTRACTOR' | 'ADMIN' | 'SUPER_ADMIN';
interface JWTPayload {
    /** User ID (CUID) */
    id: string;
    /** Also stored as sub for JWT compliance */
    sub?: string;
    /** User email */
    email?: string;
    /** User display name */
    name?: string;
    /** User type/role */
    userType?: UserType;
    /** Legacy role field */
    role?: string;
    /** Profile image URL */
    image?: string;
    /** Tenant ID for multi-tenancy */
    tenantId?: string;
    /** Issued at timestamp */
    iat?: number;
    /** Expiration timestamp */
    exp?: number;
    /** JWT ID */
    jti?: string;
}
interface AuthUser {
    id: string;
    email: string;
    name?: string | null;
    userType: UserType;
    image?: string | null;
    tenantId?: string | null;
}
interface SessionUser extends AuthUser {
    role: string;
}
/**
 * Token types for different authentication flows
 */
type TokenType = 'auth' | 'password-reset' | 'email-verification' | '2fa';
/**
 * API Key validation result
 */
interface ApiKeyValidation {
    valid: boolean;
    userId?: string;
    scopes?: string[];
    expiresAt?: Date;
}

/**
 * Shared agent types between Next.js and Python backend
 */
/**
 * Available workflow types for AI agent orchestration
 */
type WorkflowType = 'DISASTER_ANALYSIS' | 'CLAIM_PROCESSING' | 'CONTRACTOR_MATCHING' | 'INSPECTION_REPORT' | 'CUSTOMER_SUPPORT' | 'CUSTOM';
/**
 * Status of an agent job
 */
type AgentJobStatus = 'PENDING' | 'ROUTING' | 'PROCESSING' | 'AWAITING_HUMAN' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
/**
 * Status for Supabase Realtime (lowercase for DB conventions)
 */
type AgentRunStatus = 'pending' | 'routing' | 'processing' | 'awaiting_human' | 'completed' | 'failed' | 'cancelled';
/**
 * Input for creating a new agent job
 */
interface AgentJobInput {
    workflowType: WorkflowType;
    userId: string;
    tenantId?: string;
    input: Record<string, unknown>;
    metadata?: Record<string, unknown>;
}
/**
 * Result of an agent job execution
 */
interface AgentJobResult {
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
interface AgentRun {
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
interface AgentRunInsertPayload {
    new: AgentRun;
    old: null;
}
interface AgentRunUpdatePayload {
    new: AgentRun;
    old: AgentRun;
}
interface AgentRunDeletePayload {
    new: null;
    old: AgentRun;
}
/**
 * Execution metrics for an agent job
 */
interface AgentExecutionMetrics {
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
interface AgentCheckpoint {
    id: string;
    jobId: string;
    nodeId: string;
    state: Record<string, unknown>;
    createdAt: Date;
}

export type { AgentCheckpoint, AgentExecutionMetrics, AgentJobInput, AgentJobResult, AgentJobStatus, AgentRun, AgentRunDeletePayload, AgentRunInsertPayload, AgentRunStatus, AgentRunUpdatePayload, ApiKeyValidation, AuthUser, JWTPayload, SessionUser, TokenType, UserType, WorkflowType };
