/**
 * Customer Support Workflow - LangGraph implementation
 * Handles customer queries with intent detection, sentiment analysis, and knowledge-based responses
 * Using Snake Build Pattern with progressive disclosure via skills
 */

import { StateGraph, Annotation, END, START } from '@langchain/langgraph';
import { BaseMessage, HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { registerWorkflow, WorkflowExecutionConfig } from '../core/orchestrator';
import { SupportQuery, WorkflowError } from '../types';

// State annotation for the customer support workflow
const CustomerSupportAnnotation = Annotation.Root({
  messages: Annotation<BaseMessage[]>({
    reducer: (curr, update) => [...curr, ...update],
    default: () => [],
  }),
  queryData: Annotation<SupportQuery | null>({
    reducer: (_curr, update) => update,
    default: () => null,
  }),
  customerId: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  intent: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  sentiment: Annotation<'positive' | 'neutral' | 'negative' | 'urgent'>({
    reducer: (_curr, update) => update,
    default: () => 'neutral',
  }),
  category: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  suggestedResponse: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  escalationRequired: Annotation<boolean>({
    reducer: (_curr, update) => update,
    default: () => false,
  }),
  escalationReason: Annotation<string>({
    reducer: (_curr, update) => update,
    default: () => '',
  }),
  relatedArticles: Annotation<string[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  actionsTaken: Annotation<string[]>({
    reducer: (_curr, update) => update,
    default: () => [],
  }),
  isComplete: Annotation<boolean>({
    reducer: (_curr, update) => update,
    default: () => false,
  }),
});

type CustomerSupportState = typeof CustomerSupportAnnotation.State;

// Minimal system prompt - knowledge loaded via skills
const SYSTEM_PROMPT = `You are a customer support specialist for an Australian disaster recovery platform.
Use Australian English and professional, empathetic tone.
Consult /disaster-recovery-domain skill for technical knowledge.
Consult /fact-checker skill to verify information accuracy.
Consult /australian-business-validator for business hours and compliance.
Return structured JSON responses.`;

/**
 * Create the customer support workflow graph
 */
function createCustomerSupportGraph(model: BaseChatModel) {
  // Node 1: Analyze query intent and sentiment
  async function analyzeQuery(state: CustomerSupportState): Promise<Partial<CustomerSupportState>> {
    const query = state.queryData;
    if (!query) {
      throw new WorkflowError('No support query provided', 'CUSTOMER_SUPPORT', 'analyze');
    }

    const historyContext =
      query.previousInteractions && query.previousInteractions.length > 0
        ? `Previous Interactions: ${query.previousInteractions.length} exchanges\nRecent: ${query.previousInteractions.slice(-2).map((i) => `"${i.query.substring(0, 50)}..."`).join('; ')}`
        : 'No previous interactions';

    const prompt = `Analyze this customer support query:

Query: "${query.query}"
Category: ${query.category || 'general'}
${historyContext}

Detect the query intent (claim_status, contractor_issue, billing, technical, complaint, feature_request, account, general).
Detect sentiment (positive, neutral, negative, urgent).

Consult /disaster-recovery-domain for platform context and common issues.
Return JSON: {intent: "string", sentiment: "positive|neutral|negative|urgent", category: "string", confidence: 0-100}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        messages: [new AIMessage(content)],
        intent: parsed.intent || 'general_inquiry',
        sentiment: parsed.sentiment || 'neutral',
        category: parsed.category || query.category || 'general',
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        intent: 'general_inquiry',
        sentiment: 'neutral',
        category: query.category || 'general',
      };
    }
  }

  // Node 2: Search knowledge base for relevant articles
  async function searchKnowledge(state: CustomerSupportState): Promise<Partial<CustomerSupportState>> {
    const query = state.queryData;
    if (!query) {
      throw new WorkflowError('No query data for knowledge search', 'CUSTOMER_SUPPORT', 'search');
    }

    const prompt = `Search knowledge base for relevant articles:

Query Intent: ${state.intent}
Query Category: ${state.category}
Query Text: "${query.query.substring(0, 100)}..."

Consult /disaster-recovery-domain for knowledge articles related to: ${state.intent}, ${state.category}.
Return JSON: {articles: ["article1", "article2", "article3"], relevance: "high|medium|low", keywords: ["key1", "key2"]}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      const articles = Array.isArray(parsed.articles) ? parsed.articles : [];

      return {
        messages: [new AIMessage(content)],
        relatedArticles: articles,
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        relatedArticles: [],
      };
    }
  }

  // Node 3: Generate helpful response
  async function generateResponse(state: CustomerSupportState): Promise<Partial<CustomerSupportState>> {
    const query = state.queryData;
    if (!query) {
      throw new WorkflowError('No query for response generation', 'CUSTOMER_SUPPORT', 'respond');
    }

    const articlesText =
      state.relatedArticles.length > 0
        ? `\nRelevant knowledge articles: ${state.relatedArticles.join(', ')}`
        : '';

    const prompt = `Generate a helpful customer support response:

Query: "${query.query}"
Intent: ${state.intent}
Sentiment: ${state.sentiment}
Category: ${state.category}
${articlesText}

Use /disaster-recovery-domain for platform knowledge.
Use /fact-checker to verify accuracy before responding.
Tone: Professional, empathetic, Australian English.
If query is about claim status, direct to dashboard. If about contractors, reference matching process.
Return JSON: {response: "helpful response text", confidence: 0-100, needs_escalation_hint: boolean}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      return {
        messages: [new AIMessage(content)],
        suggestedResponse:
          parsed.response ||
          'Thank you for contacting us. We are reviewing your query and will provide a response shortly.',
      };
    } catch {
      return {
        messages: [new AIMessage(content)],
        suggestedResponse:
          'Thank you for contacting us. We are reviewing your query and will provide a response shortly.',
      };
    }
  }

  // Node 4: Determine if escalation to human required
  async function determineEscalation(state: CustomerSupportState): Promise<Partial<CustomerSupportState>> {
    const query = state.queryData;
    if (!query) {
      throw new WorkflowError('No query for escalation determination', 'CUSTOMER_SUPPORT', 'escalate');
    }

    const prompt = `Assess if this query requires escalation to a human specialist:

Query: "${query.query}"
Intent: ${state.intent}
Sentiment: ${state.sentiment}
Category: ${state.category}

Escalation triggers:
- Sentiment is "urgent" → escalate
- Sentiment is "negative" + complaint → escalate
- Complex technical issues (beyond FAQ level) → escalate
- Billing disputes → escalate
- Legal/compliance matters → escalate
- Contractor safety concerns → escalate immediately

Consult /disaster-recovery-domain for escalation policies.
Return JSON: {escalate: boolean, reason: "brief reason if true", urgency: "low|medium|high|critical"}`;

    const response = await model.invoke([
      new SystemMessage(SYSTEM_PROMPT),
      ...state.messages,
      new HumanMessage(prompt),
    ]);

    const content = typeof response.content === 'string' ? response.content : '';

    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

      const escalate = parsed.escalate === true;
      const reason = escalate ? parsed.reason || 'Requires human review' : '';

      return {
        messages: [new AIMessage(content)],
        escalationRequired: escalate,
        escalationReason: reason,
      };
    } catch {
      // If sentiment is urgent or negative, escalate by default
      const shouldEscalate = state.sentiment === 'urgent' || state.sentiment === 'negative';

      return {
        messages: [new AIMessage(content)],
        escalationRequired: shouldEscalate,
        escalationReason: shouldEscalate ? 'Query requires human review' : '',
      };
    }
  }

  // Node 5: Track actions and finalize
  async function trackActions(state: CustomerSupportState): Promise<Partial<CustomerSupportState>> {
    const query = state.queryData;
    if (!query) {
      throw new WorkflowError('No query for action tracking', 'CUSTOMER_SUPPORT', 'track');
    }

    const actions: string[] = [];
    actions.push(`Analyzed intent: ${state.intent}`);
    actions.push(`Detected sentiment: ${state.sentiment}`);

    if (state.relatedArticles.length > 0) {
      actions.push(`Found ${state.relatedArticles.length} relevant knowledge articles`);
    }

    if (state.suggestedResponse) {
      actions.push('Generated helpful response');
    }

    if (state.escalationRequired) {
      actions.push(`Escalation flagged: ${state.escalationReason}`);
    } else {
      actions.push('Response provided without escalation');
    }

    return {
      actionsTaken: actions,
      isComplete: true,
    };
  }

  // Build the linear workflow graph
  const workflow = new StateGraph(CustomerSupportAnnotation)
    .addNode('analyzeQuery', analyzeQuery)
    .addNode('searchKnowledge', searchKnowledge)
    .addNode('generateResponse', generateResponse)
    .addNode('determineEscalation', determineEscalation)
    .addNode('trackActions', trackActions)
    .addEdge(START, 'analyzeQuery')
    .addEdge('analyzeQuery', 'searchKnowledge')
    .addEdge('searchKnowledge', 'generateResponse')
    .addEdge('generateResponse', 'determineEscalation')
    .addEdge('determineEscalation', 'trackActions')
    .addEdge('trackActions', END);

  return workflow;
}

/**
 * Execute the customer support workflow
 */
async function executeCustomerSupport(
  input: Record<string, unknown>,
  config: WorkflowExecutionConfig
): Promise<Record<string, unknown>> {
  const model = config.provider.getModel();
  const workflow = createCustomerSupportGraph(model);

  // Compile the graph with checkpointer
  const compiledWorkflow = workflow.compile({
    checkpointer: config.checkpointer,
  });

  // Extract support query from input
  const queryInput = input.query as Record<string, unknown> || {};
  const supportQuery: SupportQuery = {
    query: (queryInput.query as string) || '',
    category: (queryInput.category as string) || undefined,
    previousInteractions: (queryInput.previousInteractions as any[]) || undefined,
  };

  const customerId = (input.customerId as string) || 'CUST-AUTO';

  // Validate query
  if (!supportQuery.query || supportQuery.query.trim().length === 0) {
    throw new WorkflowError('Support query cannot be empty', 'CUSTOMER_SUPPORT', 'execute');
  }

  // Initial state
  const initialState: Partial<CustomerSupportState> = {
    queryData: supportQuery,
    customerId,
    messages: [],
  };

  // Execute the workflow
  const result = await compiledWorkflow.invoke(initialState, {
    configurable: {
      thread_id: config.threadId,
      job_id: config.jobId,
    },
    recursionLimit: config.maxIterations,
  });

  // Return the support workflow results
  return {
    customerId: result.customerId,
    queryText: supportQuery.query,
    intent: result.intent,
    sentiment: result.sentiment,
    category: result.category,
    suggestedResponse: result.suggestedResponse,
    escalationRequired: result.escalationRequired,
    escalationReason: result.escalationReason,
    relatedArticles: result.relatedArticles,
    actionsTaken: result.actionsTaken,
    previousInteractionsCount: supportQuery.previousInteractions?.length || 0,
    workflowStatus: 'COMPLETED',
  };
}

// Register the workflow
registerWorkflow('CUSTOMER_SUPPORT', executeCustomerSupport);

// Export for direct use
export { createCustomerSupportGraph, executeCustomerSupport };
