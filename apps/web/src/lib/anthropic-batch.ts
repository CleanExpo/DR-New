/**
 * Anthropic Message Batches — DR-256
 *
 * Wraps the Anthropic Message Batches API for bulk content generation.
 * ~50% cost saving vs real-time API calls. Results within 24 hours.
 *
 * Three operation types:
 *   suburb-pages       — SEO content for suburb landing pages
 *   contractor-progress — Bulk progress summaries for contractors
 *   blog               — Blog post drafts
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY
 */

import Anthropic from '@anthropic-ai/sdk';

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------

let _client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set');
    _client = new Anthropic({ apiKey });
  }
  return _client;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type BatchJobType = 'suburb-pages' | 'contractor-progress' | 'blog';

export interface SuburbPageItem {
  suburb: string;
  state: string;
  serviceType: string;   // e.g. "water damage restoration"
  population?: number;
}

export interface ContractorProgressItem {
  contractorId: string;
  contractorName: string;
  completedModules: string[];
  certificationPoints: number;
  certificationLevel: string;
}

export interface BlogItem {
  slug: string;
  title: string;
  category: string;
  keywords: string[];
  targetWordCount?: number;
}

export type BatchItem = SuburbPageItem | ContractorProgressItem | BlogItem;

export interface AnthropicBatchResult {
  customId: string;
  type: 'succeeded' | 'errored' | 'canceled' | 'expired';
  content?: string;
  error?: string;
}

export interface BatchStatusResponse {
  anthropicBatchId: string;
  processingStatus: 'in_progress' | 'ended';
  requestCounts: {
    processing: number;
    succeeded: number;
    errored: number;
    canceled: number;
    expired: number;
  };
  endedAt: string | null;
  resultsUrl: string | null;
}

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

function buildSuburbPagePrompt(item: SuburbPageItem): string {
  return `You are writing SEO-optimised content for an Australian disaster recovery company (NRPG) serving ${item.suburb}, ${item.state}.

Write a complete service page content block for "${item.serviceType}" in ${item.suburb}, ${item.state}.

Requirements:
- Australian English (colour, mould, organisation, etc.)
- 400–600 words
- H2 headings only (no H1 — that's the page title)
- Include local context (region, proximity to major city if relevant)
- No phone numbers, email addresses, or street addresses
- End with a clear call-to-action directing to the online contact form
- Cite IICRC S500 or relevant standard where appropriate

Output as JSON: { "heading": "...", "body": "...", "metaDescription": "...", "faqItems": [{"question":"...","answer":"..."}] }`;
}

function buildContractorProgressPrompt(item: ContractorProgressItem): string {
  return `You are generating a professional progress summary for an NRPG contractor.

Contractor: ${item.contractorName}
Certification Level: ${item.certificationLevel} (${item.certificationPoints} points)
Completed modules: ${item.completedModules.join(', ') || 'None yet'}

Write a concise progress summary (2–3 sentences) that:
- Acknowledges current achievements
- Identifies the next recommended action to advance their certification
- Is encouraging and professional in tone

Output as JSON: { "summary": "...", "nextAction": "...", "encouragementLevel": "low|medium|high" }`;
}

function buildBlogPrompt(item: BlogItem): string {
  const wordCount = item.targetWordCount ?? 800;
  return `You are writing a blog post for disasterrecovery.com.au — an Australian property restoration platform.

Title: ${item.title}
Category: ${item.category}
Target keywords: ${item.keywords.join(', ')}
Target word count: ~${wordCount} words

Requirements:
- Australian English
- Authoritative, helpful, and clear
- Include practical advice property owners can act on
- Reference IICRC standards where relevant (e.g. S500 for water, S520 for mould)
- No phone numbers, email addresses, or street addresses
- Structure: intro → 3–4 H2 sections → conclusion with CTA to contact form

Output as JSON: { "intro": "...", "sections": [{"heading":"...","content":"..."}], "conclusion": "...", "metaDescription": "..." }`;
}

// ---------------------------------------------------------------------------
// Batch submission
// ---------------------------------------------------------------------------

function buildRequest(
  item: BatchItem,
  jobType: BatchJobType,
  index: number,
): Anthropic.Messages.MessageCreateParamsNonStreaming & { custom_id: string } {
  let prompt: string;
  let customId: string;

  if (jobType === 'suburb-pages') {
    const i = item as SuburbPageItem;
    prompt = buildSuburbPagePrompt(i);
    customId = `suburb-${i.suburb.toLowerCase().replace(/\s+/g, '-')}-${index}`;
  } else if (jobType === 'contractor-progress') {
    const i = item as ContractorProgressItem;
    prompt = buildContractorProgressPrompt(i);
    customId = `contractor-${i.contractorId}-${index}`;
  } else {
    const i = item as BlogItem;
    prompt = buildBlogPrompt(i);
    customId = `blog-${i.slug}-${index}`;
  }

  return {
    custom_id: customId,
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    messages: [{ role: 'user', content: prompt }],
  };
}

export async function submitBatch(
  jobType: BatchJobType,
  items: BatchItem[],
): Promise<{ batchId: string; requestCount: number }> {
  if (items.length === 0) throw new Error('Batch must contain at least one item');
  if (items.length > 10000) throw new Error('Batch cannot exceed 10,000 requests');

  const client = getClient();

  const requests = items.map((item, i) => {
    const { custom_id, ...params } = buildRequest(item, jobType, i);
    return { custom_id, params };
  });

  const batch = await client.messages.batches.create({ requests });

  return {
    batchId: batch.id,
    requestCount: requests.length,
  };
}

// ---------------------------------------------------------------------------
// Status polling
// ---------------------------------------------------------------------------

export async function getBatchStatus(anthropicBatchId: string): Promise<BatchStatusResponse> {
  const client = getClient();
  const batch = await client.messages.batches.retrieve(anthropicBatchId);

  return {
    anthropicBatchId: batch.id,
    processingStatus: batch.processing_status,
    requestCounts: {
      processing: batch.request_counts.processing,
      succeeded: batch.request_counts.succeeded,
      errored: batch.request_counts.errored,
      canceled: batch.request_counts.canceled,
      expired: batch.request_counts.expired,
    },
    endedAt: batch.ended_at ?? null,
    resultsUrl: batch.results_url ?? null,
  };
}

// ---------------------------------------------------------------------------
// Results retrieval
// ---------------------------------------------------------------------------

export async function collectBatchResults(
  anthropicBatchId: string,
): Promise<AnthropicBatchResult[]> {
  const client = getClient();
  const results: AnthropicBatchResult[] = [];

  for await (const result of await client.messages.batches.results(anthropicBatchId)) {
    if (result.result.type === 'succeeded') {
      const text = result.result.message.content
        .filter((c): c is Anthropic.TextBlock => c.type === 'text')
        .map((c) => c.text)
        .join('');
      results.push({ customId: result.custom_id, type: 'succeeded', content: text });
    } else if (result.result.type === 'errored') {
      results.push({
        customId: result.custom_id,
        type: 'errored',
        error: result.result.error.type,
      });
    } else {
      results.push({ customId: result.custom_id, type: result.result.type });
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// Cancellation
// ---------------------------------------------------------------------------

export async function cancelBatch(anthropicBatchId: string): Promise<void> {
  const client = getClient();
  await client.messages.batches.cancel(anthropicBatchId);
}
