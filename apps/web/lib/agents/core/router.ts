/**
 * Intelligent Router - Routes tasks to appropriate workflows and agents
 */

import { HumanMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { getDefaultProvider } from '../providers';
import {
  WorkflowType,
  RoutingDecision,
  RouterConfig,
  AgentError,
} from '../types';

// Keywords and patterns for each workflow type
const WORKFLOW_PATTERNS: Record<WorkflowType, RegExp[]> = {
  DISASTER_ANALYSIS: [
    /disaster|flood|fire|storm|cyclone|earthquake|damage assessment/i,
    /emergency response|immediate action|recovery plan/i,
    /severity|impact|affected area/i,
  ],
  CLAIM_PROCESSING: [
    /insurance|claim|policy|coverage/i,
    /submit claim|lodge claim|claim status/i,
    /insurer|nrma|suncorp|allianz|qbe|iag|cgu/i,
  ],
  CONTRACTOR_MATCHING: [
    /find contractor|match contractor|available contractor/i,
    /restoration service|water damage repair|mould remediation/i,
    /quote|estimate|booking|availability/i,
  ],
  INSPECTION_REPORT: [
    /inspection|report|assessment|survey/i,
    /moisture reading|damage report|site inspection/i,
    /compliance|certification|iicrc/i,
  ],
  CUSTOMER_SUPPORT: [
    /help|support|question|how do i/i,
    /contact|inquiry|feedback|complaint/i,
    /account|login|password|profile/i,
  ],
  CUSTOM: [
    // Fallback - matches anything not caught by other patterns
  ],
};

// Workflow descriptions for LLM routing
const WORKFLOW_DESCRIPTIONS: Record<WorkflowType, string> = {
  DISASTER_ANALYSIS:
    'Analyse disaster scenarios, assess severity, generate recovery plans, and identify resource needs for flood, fire, storm, or other damage situations.',
  CLAIM_PROCESSING:
    'Process insurance claims, validate claim information, extract relevant details, and guide users through the claim submission process.',
  CONTRACTOR_MATCHING:
    'Match clients with appropriate restoration contractors based on service type, location, availability, and requirements.',
  INSPECTION_REPORT:
    'Generate and manage inspection reports, damage assessments, moisture readings, and compliance documentation.',
  CUSTOMER_SUPPORT:
    'Handle general customer inquiries, provide platform guidance, and resolve account-related issues.',
  CUSTOM: 'Handle custom or unclassified tasks that do not fit other workflows.',
};

export class IntelligentRouter {
  private model: BaseChatModel;
  private config: RouterConfig;

  constructor(config?: Partial<RouterConfig>) {
    this.config = {
      defaultWorkflow: 'CUSTOMER_SUPPORT',
      enableAutoRouting: true,
      routingModel: undefined,
      ...config,
    };

    const provider = getDefaultProvider();
    this.model = provider.getModel();
  }

  /**
   * Route a user request to the appropriate workflow
   */
  async route(
    userRequest: string,
    context?: Record<string, unknown>
  ): Promise<RoutingDecision> {
    // First, try pattern-based routing (fast)
    const patternMatch = this.routeByPattern(userRequest);
    if (patternMatch && patternMatch.confidence >= 0.8) {
      return patternMatch;
    }

    // If auto-routing is enabled and pattern matching is uncertain, use LLM
    if (this.config.enableAutoRouting) {
      try {
        const llmDecision = await this.routeByLLM(userRequest, context);
        return llmDecision;
      } catch (error) {
        // Fall back to pattern match or default
        console.error('LLM routing failed, using pattern match:', error);
      }
    }

    // Return pattern match if available, otherwise default
    return (
      patternMatch || {
        targetWorkflow: this.config.defaultWorkflow,
        targetNode: 'start',
        confidence: 0.5,
        reasoning: 'No clear pattern match, using default workflow',
      }
    );
  }

  /**
   * Route based on keyword patterns (fast, no API call)
   */
  routeByPattern(userRequest: string): RoutingDecision | null {
    const scores: Record<WorkflowType, number> = {
      DISASTER_ANALYSIS: 0,
      CLAIM_PROCESSING: 0,
      CONTRACTOR_MATCHING: 0,
      INSPECTION_REPORT: 0,
      CUSTOMER_SUPPORT: 0,
      CUSTOM: 0,
    };

    // Score each workflow based on pattern matches
    for (const [workflow, patterns] of Object.entries(WORKFLOW_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(userRequest)) {
          scores[workflow as WorkflowType] += 1;
        }
      }
    }

    // Find the workflow with the highest score
    let maxScore = 0;
    let bestWorkflow: WorkflowType = this.config.defaultWorkflow;

    for (const [workflow, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        bestWorkflow = workflow as WorkflowType;
      }
    }

    // Calculate confidence based on score
    const totalPatterns = Object.values(WORKFLOW_PATTERNS).flat().length;
    const confidence = maxScore > 0 ? Math.min(maxScore / 3, 1) : 0;

    if (maxScore === 0) {
      return null;
    }

    return {
      targetWorkflow: bestWorkflow,
      targetNode: 'start',
      confidence,
      reasoning: `Matched ${maxScore} keyword pattern(s) for ${bestWorkflow}`,
    };
  }

  /**
   * Route using LLM for complex or ambiguous requests
   */
  async routeByLLM(
    userRequest: string,
    context?: Record<string, unknown>
  ): Promise<RoutingDecision> {
    const workflowOptions = Object.entries(WORKFLOW_DESCRIPTIONS)
      .filter(([key]) => key !== 'CUSTOM')
      .map(([key, desc]) => `- ${key}: ${desc}`)
      .join('\n');

    const prompt = `You are a routing assistant for a disaster recovery platform. Analyse the user's request and determine which workflow should handle it.

Available workflows:
${workflowOptions}

User request: "${userRequest}"
${context ? `Additional context: ${JSON.stringify(context)}` : ''}

Respond with ONLY a JSON object in this exact format (no markdown, no explanation):
{"workflow": "WORKFLOW_NAME", "confidence": 0.0-1.0, "reasoning": "brief explanation"}`;

    try {
      const response = await this.model.invoke([new HumanMessage(prompt)]);
      const content =
        typeof response.content === 'string'
          ? response.content
          : JSON.stringify(response.content);

      // Parse JSON response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in LLM response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate workflow type
      const workflow = parsed.workflow as WorkflowType;
      if (!WORKFLOW_DESCRIPTIONS[workflow]) {
        throw new Error(`Invalid workflow: ${workflow}`);
      }

      return {
        targetWorkflow: workflow,
        targetNode: 'start',
        confidence: Math.min(Math.max(parsed.confidence || 0.7, 0), 1),
        reasoning: parsed.reasoning || 'LLM routing decision',
      };
    } catch (error) {
      throw new AgentError(
        `LLM routing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'ROUTING_ERROR',
        true,
        { userRequest }
      );
    }
  }

  /**
   * Get workflow descriptions
   */
  getWorkflowDescriptions(): Record<WorkflowType, string> {
    return { ...WORKFLOW_DESCRIPTIONS };
  }

  /**
   * Update router configuration
   */
  updateConfig(newConfig: Partial<RouterConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Set a custom model for routing
   */
  setModel(model: BaseChatModel): void {
    this.model = model;
  }
}

// Singleton instance
let routerInstance: IntelligentRouter | null = null;

export function getRouter(config?: Partial<RouterConfig>): IntelligentRouter {
  if (!routerInstance) {
    routerInstance = new IntelligentRouter(config);
  }
  return routerInstance;
}

export function createRouter(config?: Partial<RouterConfig>): IntelligentRouter {
  return new IntelligentRouter(config);
}
