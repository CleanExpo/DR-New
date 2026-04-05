// @ts-nocheck
/**
 * Base Agent - Abstract class for all agent implementations
 */

import { StateGraph, CompiledStateGraph, Annotation } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { BaseAIProvider } from '../providers/base-provider';
import { getDefaultProvider } from '../providers';
import {
  AgentState,
  AgentMetadata,
  WorkflowType,
  AgentError,
  StreamEvent,
  StreamConfig,
} from '../types';

// Base state annotation for all agents
export const BaseStateAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (curr, update) => [...curr, ...update],
    default: () => [],
  }),
  context: Annotation<Record<string, unknown>>({
    reducer: (curr, update) => ({ ...curr, ...update }),
    default: () => ({}),
  }),
  currentAgent: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  workflow: Annotation<WorkflowType>({
    reducer: (_curr, update) => update,
    default: () => 'CUSTOM' as WorkflowType,
  }),
  userId: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  tenantId: Annotation<string | undefined>({
    reducer: (_curr, update) => update,
    default: () => undefined,
  }),
  metadata: Annotation<AgentMetadata>({
    reducer: (curr, update) => ({ ...curr, ...update }),
    default: () => ({
      startedAt: new Date(),
      iterations: 0,
      tokensUsed: 0,
      toolsCalled: [],
      currentNode: '',
      errors: [],
    }),
  }),
  output: Annotation<Record<string, unknown> | undefined>({
    reducer: (_curr, update) => update,
    default: () => undefined,
  }),
  isComplete: Annotation<boolean>({
    reducer: (_curr, update) => update,
    default: () => false,
  }),
  requiresHumanInput: Annotation<boolean>({
    reducer: (_curr, update) => update,
    default: () => false,
  }),
});

export type BaseStateType = typeof BaseStateAnnotation.State;

export abstract class BaseAgent<TState extends BaseStateType = BaseStateType> {
  protected provider: BaseAIProvider;
  protected model: BaseChatModel;
  protected graph: CompiledStateGraph<TState> | null = null;
  protected systemPrompt: string = '';

  constructor(provider?: BaseAIProvider) {
    this.provider = provider || getDefaultProvider();
    this.model = this.provider.getModel();
  }

  /**
   * Get the unique name for this agent
   */
  abstract getName(): string;

  /**
   * Get the workflow type this agent handles
   */
  abstract getWorkflowType(): WorkflowType;

  /**
   * Build the LangGraph StateGraph for this agent
   */
  abstract buildGraph(): StateGraph<TState>;

  /**
   * Get the system prompt for this agent
   */
  abstract getSystemPrompt(): string;

  /**
   * Get the compiled graph, building it if necessary
   */
  getCompiledGraph(): CompiledStateGraph<TState> {
    if (!this.graph) {
      this.graph = this.buildGraph().compile() as CompiledStateGraph<TState>;
    }
    return this.graph;
  }

  /**
   * Invoke the agent with the given state
   */
  async invoke(
    initialState: Partial<TState>,
    config?: { threadId?: string; maxIterations?: number }
  ): Promise<TState> {
    const graph = this.getCompiledGraph();

    const state: Partial<TState> = {
      ...initialState,
      currentAgent: this.getName(),
      workflow: this.getWorkflowType(),
      metadata: {
        startedAt: new Date(),
        iterations: 0,
        tokensUsed: 0,
        toolsCalled: [],
        currentNode: '',
        errors: [],
        ...(initialState.metadata || {}),
      },
    };

    try {
      const result = await graph.invoke(state as TState, {
        configurable: config?.threadId ? { thread_id: config.threadId } : undefined,
        recursionLimit: config?.maxIterations || 10,
      });

      return result as TState;
    } catch (error) {
      throw new AgentError(
        error instanceof Error ? error.message : 'Agent invocation failed',
        'INVOKE_ERROR',
        false,
        { agent: this.getName(), workflow: this.getWorkflowType() }
      );
    }
  }

  /**
   * Stream the agent execution
   */
  async *stream(
    initialState: Partial<TState>,
    config?: StreamConfig & { threadId?: string; maxIterations?: number }
  ): AsyncGenerator<StreamEvent> {
    const graph = this.getCompiledGraph();

    const state: Partial<TState> = {
      ...initialState,
      currentAgent: this.getName(),
      workflow: this.getWorkflowType(),
      metadata: {
        startedAt: new Date(),
        iterations: 0,
        tokensUsed: 0,
        toolsCalled: [],
        currentNode: '',
        errors: [],
        ...(initialState.metadata || {}),
      },
    };

    try {
      const stream = await graph.stream(state as TState, {
        configurable: config?.threadId ? { thread_id: config.threadId } : undefined,
        recursionLimit: config?.maxIterations || 10,
        streamMode: 'values',
      });

      for await (const chunk of stream) {
        const event: StreamEvent = {
          type: 'node_end',
          node: this.getName(),
          data: chunk,
          timestamp: new Date(),
        };

        // Call optional callbacks
        if (config?.onNodeEnd) {
          config.onNodeEnd(this.getName(), chunk);
        }

        yield event;
      }

      yield {
        type: 'complete',
        data: { agent: this.getName() },
        timestamp: new Date(),
      };
    } catch (error) {
      const errorEvent: StreamEvent = {
        type: 'error',
        node: this.getName(),
        data: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date(),
      };

      if (config?.onError) {
        config.onError(error instanceof Error ? error : new Error('Unknown error'));
      }

      yield errorEvent;
      throw error;
    }
  }

  /**
   * Create a human message
   */
  protected createHumanMessage(content: string): HumanMessage {
    return new HumanMessage(content);
  }

  /**
   * Create an AI message
   */
  protected createAIMessage(content: string): AIMessage {
    return new AIMessage(content);
  }

  /**
   * Get the model instance
   */
  protected getModel(): BaseChatModel {
    return this.model;
  }

  /**
   * Update the provider and model
   */
  setProvider(provider: BaseAIProvider): void {
    this.provider = provider;
    this.model = provider.getModel();
    this.graph = null; // Force graph rebuild with new model
  }
}
