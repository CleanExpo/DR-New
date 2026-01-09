/**
 * Context Manager - Manages agent state and context across workflow execution
 */

import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { AgentState, AgentMetadata, WorkflowType } from '../types';

export interface ContextUpdate {
  key: string;
  value: unknown;
  source: string;
  timestamp: Date;
}

export interface ConversationTurn {
  role: 'human' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export class ContextManager {
  private context: Map<string, unknown> = new Map();
  private history: ContextUpdate[] = [];
  private conversationHistory: ConversationTurn[] = [];
  private maxHistorySize: number;
  private maxConversationTurns: number;

  constructor(options?: { maxHistorySize?: number; maxConversationTurns?: number }) {
    this.maxHistorySize = options?.maxHistorySize || 100;
    this.maxConversationTurns = options?.maxConversationTurns || 50;
  }

  /**
   * Set a context value
   */
  set(key: string, value: unknown, source: string = 'system'): void {
    this.context.set(key, value);
    this.history.push({
      key,
      value,
      source,
      timestamp: new Date(),
    });

    // Trim history if needed
    if (this.history.length > this.maxHistorySize) {
      this.history = this.history.slice(-this.maxHistorySize);
    }
  }

  /**
   * Get a context value
   */
  get<T>(key: string): T | undefined {
    return this.context.get(key) as T | undefined;
  }

  /**
   * Check if a key exists in context
   */
  has(key: string): boolean {
    return this.context.has(key);
  }

  /**
   * Delete a context value
   */
  delete(key: string): boolean {
    return this.context.delete(key);
  }

  /**
   * Get all context as a plain object
   */
  getAll(): Record<string, unknown> {
    const obj: Record<string, unknown> = {};
    this.context.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   * Merge context from another source
   */
  merge(newContext: Record<string, unknown>, source: string = 'merge'): void {
    Object.entries(newContext).forEach(([key, value]) => {
      this.set(key, value, source);
    });
  }

  /**
   * Clear all context
   */
  clear(): void {
    this.context.clear();
    this.history = [];
  }

  /**
   * Add a conversation turn
   */
  addConversationTurn(
    role: 'human' | 'ai' | 'system',
    content: string,
    metadata?: Record<string, unknown>
  ): void {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date(),
      metadata,
    });

    // Trim conversation history if needed
    if (this.conversationHistory.length > this.maxConversationTurns) {
      this.conversationHistory = this.conversationHistory.slice(
        -this.maxConversationTurns
      );
    }
  }

  /**
   * Convert conversation history to LangChain messages
   */
  getMessagesFromHistory(): BaseMessage[] {
    return this.conversationHistory.map((turn) => {
      switch (turn.role) {
        case 'human':
          return new HumanMessage(turn.content);
        case 'ai':
          return new AIMessage(turn.content);
        case 'system':
          return new SystemMessage(turn.content);
        default:
          return new HumanMessage(turn.content);
      }
    });
  }

  /**
   * Get conversation history
   */
  getConversationHistory(): ConversationTurn[] {
    return [...this.conversationHistory];
  }

  /**
   * Get context update history
   */
  getHistory(): ContextUpdate[] {
    return [...this.history];
  }

  /**
   * Create initial agent state
   */
  createInitialState(
    userId: string,
    workflow: WorkflowType,
    input: Record<string, unknown>,
    tenantId?: string
  ): AgentState {
    const metadata: AgentMetadata = {
      startedAt: new Date(),
      iterations: 0,
      tokensUsed: 0,
      toolsCalled: [],
      currentNode: 'start',
      errors: [],
    };

    return {
      messages: this.getMessagesFromHistory(),
      context: {
        ...this.getAll(),
        ...input,
      },
      currentAgent: '',
      workflow,
      userId,
      tenantId,
      metadata,
      isComplete: false,
      requiresHumanInput: false,
    };
  }

  /**
   * Update state from workflow result
   */
  updateFromState(state: AgentState): void {
    // Update context from state
    if (state.context) {
      Object.entries(state.context).forEach(([key, value]) => {
        this.set(key, value, 'workflow');
      });
    }

    // Update conversation history from messages
    state.messages.forEach((msg) => {
      if (msg instanceof HumanMessage) {
        this.addConversationTurn('human', msg.content as string);
      } else if (msg instanceof AIMessage) {
        this.addConversationTurn('ai', msg.content as string);
      } else if (msg instanceof SystemMessage) {
        this.addConversationTurn('system', msg.content as string);
      }
    });
  }

  /**
   * Export context for persistence
   */
  export(): {
    context: Record<string, unknown>;
    conversation: ConversationTurn[];
    history: ContextUpdate[];
  } {
    return {
      context: this.getAll(),
      conversation: this.getConversationHistory(),
      history: this.getHistory(),
    };
  }

  /**
   * Import context from persistence
   */
  import(data: {
    context?: Record<string, unknown>;
    conversation?: ConversationTurn[];
    history?: ContextUpdate[];
  }): void {
    if (data.context) {
      this.merge(data.context, 'import');
    }
    if (data.conversation) {
      this.conversationHistory = data.conversation;
    }
    if (data.history) {
      this.history = data.history;
    }
  }

  /**
   * Create a snapshot of current state for checkpointing
   */
  createSnapshot(): string {
    return JSON.stringify(this.export());
  }

  /**
   * Restore from a snapshot
   */
  restoreFromSnapshot(snapshot: string): void {
    const data = JSON.parse(snapshot);
    this.import(data);
  }
}

// Singleton instance for global context management
let globalContextManager: ContextManager | null = null;

export function getContextManager(
  options?: { maxHistorySize?: number; maxConversationTurns?: number }
): ContextManager {
  if (!globalContextManager) {
    globalContextManager = new ContextManager(options);
  }
  return globalContextManager;
}

export function createContextManager(
  options?: { maxHistorySize?: number; maxConversationTurns?: number }
): ContextManager {
  return new ContextManager(options);
}
