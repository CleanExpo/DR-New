/**
 * Semantic Search Engine
 * AI-powered search using vector embeddings
 */

import { getActiveProvider, getAIProviderConfig } from './config';
import { aiMonitor, calculateOpenAICost } from './monitoring';
import { rateLimiter } from './rate-limiter';

export interface SearchDocument {
  id: string;
  title: string;
  content: string;
  url: string;
  category: 'service' | 'location' | 'faq' | 'blog' | 'page';
  keywords: string[];
  metadata?: Record<string, any>;
}

export interface SearchResult {
  document: SearchDocument;
  score: number; // 0-1 similarity score
  highlights: string[];
  relevanceReason: string;
}

export interface SemanticSearchIndex {
  documents: Array<SearchDocument & { embedding?: number[] }>;
  lastUpdated: Date;
}

/**
 * Generate embedding for text using AI provider
 */
export async function generateEmbedding(
  text: string,
  provider: 'openai' | 'fallback' = 'openai'
): Promise<number[]> {
  if (provider === 'fallback') {
    return generateFallbackEmbedding(text);
  }

  const startTime = Date.now();

  try {
    const config = getAIProviderConfig();

    if (!config.openai.apiKey) {
      return generateFallbackEmbedding(text);
    }

    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.openai.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const embedding = data.data[0].embedding;

    // Record metrics
    const cost = calculateOpenAICost(
      'text-embedding-3-small',
      data.usage.total_tokens,
      0
    );

    aiMonitor.record({
      provider: 'openai',
      model: 'text-embedding-3-small',
      operation: 'generate-embedding',
      latency: Date.now() - startTime,
      success: true,
      tokens: {
        prompt: data.usage.total_tokens,
        completion: 0,
        total: data.usage.total_tokens,
      },
      cost,
    });

    return embedding;
  } catch (error) {
    console.error('[Semantic Search] Embedding error:', error);

    aiMonitor.record({
      provider: 'openai',
      model: 'text-embedding-3-small',
      operation: 'generate-embedding',
      latency: Date.now() - startTime,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return generateFallbackEmbedding(text);
  }
}

/**
 * Fallback embedding using simple text features
 */
function generateFallbackEmbedding(text: string): number[] {
  // Simple TF-IDF-like embedding (384 dimensions to match text-embedding-3-small)
  const embedding = new Array(384).fill(0);
  const words = text.toLowerCase().split(/\s+/);

  // Disaster recovery keywords
  const keywords = [
    'water',
    'damage',
    'fire',
    'mould',
    'storm',
    'emergency',
    'restoration',
    'brisbane',
    'ipswich',
    'insurance',
    'flood',
    'leak',
    'smoke',
    'certified',
    'iicrc',
  ];

  // Create basic feature vector
  keywords.forEach((keyword, idx) => {
    const count = words.filter((w) => w.includes(keyword)).length;
    if (idx < embedding.length) {
      embedding[idx] = count / words.length;
    }
  });

  // Add word length features
  embedding[100] = words.length / 1000;
  embedding[101] = text.length / 10000;

  // Normalize
  const magnitude = Math.sqrt(
    embedding.reduce((sum, val) => sum + val * val, 0)
  );
  if (magnitude > 0) {
    return embedding.map((val) => val / magnitude);
  }

  return embedding;
}

/**
 * Calculate cosine similarity between two embeddings
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  if (magnitudeA === 0 || magnitudeB === 0) return 0;

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Search documents using semantic similarity
 */
export async function semanticSearch(
  query: string,
  index: SemanticSearchIndex,
  options?: {
    limit?: number;
    threshold?: number; // Minimum similarity score
    category?: string;
  }
): Promise<SearchResult[]> {
  const limit = options?.limit || 10;
  const threshold = options?.threshold || 0.5;

  // Generate query embedding
  const provider = getActiveProvider();
  const queryEmbedding = await generateEmbedding(
    query,
    provider === 'openai' ? 'openai' : 'fallback'
  );

  // Calculate similarity scores
  const results: SearchResult[] = [];

  for (const doc of index.documents) {
    // Skip if category filter doesn't match
    if (options?.category && doc.category !== options.category) {
      continue;
    }

    // Generate embedding if not cached
    if (!doc.embedding) {
      doc.embedding = await generateEmbedding(
        `${doc.title} ${doc.content}`,
        provider === 'openai' ? 'openai' : 'fallback'
      );
    }

    // Calculate similarity
    const score = cosineSimilarity(queryEmbedding, doc.embedding);

    if (score >= threshold) {
      // Extract highlights
      const highlights = extractHighlights(query, doc.content);

      // Generate relevance reason
      const relevanceReason = generateRelevanceReason(query, doc, score);

      results.push({
        document: doc,
        score,
        highlights,
        relevanceReason,
      });
    }
  }

  // Sort by score and limit
  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Extract highlights from content
 */
function extractHighlights(query: string, content: string): string[] {
  const highlights: string[] = [];
  const queryWords = query.toLowerCase().split(/\s+/);

  // Split content into sentences
  const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  for (const sentence of sentences) {
    const lowerSentence = sentence.toLowerCase();

    // Count matching words
    const matches = queryWords.filter((word) =>
      lowerSentence.includes(word)
    ).length;

    if (matches > 0) {
      highlights.push(sentence.trim());
      if (highlights.length >= 3) break;
    }
  }

  return highlights;
}

/**
 * Generate relevance explanation
 */
function generateRelevanceReason(
  query: string,
  doc: SearchDocument,
  score: number
): string {
  const queryWords = query.toLowerCase().split(/\s+/);
  const matchingKeywords = doc.keywords.filter((keyword) =>
    queryWords.some((word) => keyword.toLowerCase().includes(word))
  );

  if (score > 0.8) {
    return `Highly relevant: Matches "${matchingKeywords.join(', ')}" and similar context`;
  } else if (score > 0.6) {
    return `Relevant: Related to ${doc.category} and contains "${matchingKeywords.join(', ')}"`;
  } else {
    return `Somewhat relevant: Similar topic in ${doc.category}`;
  }
}

/**
 * Build search index from documents
 */
export async function buildSearchIndex(
  documents: SearchDocument[]
): Promise<SemanticSearchIndex> {
  const provider = getActiveProvider();
  const indexedDocuments = [];

  for (const doc of documents) {
    const embedding = await generateEmbedding(
      `${doc.title} ${doc.content}`,
      provider === 'openai' ? 'openai' : 'fallback'
    );

    indexedDocuments.push({
      ...doc,
      embedding,
    });
  }

  return {
    documents: indexedDocuments,
    lastUpdated: new Date(),
  };
}

/**
 * Hybrid search combining semantic and keyword search
 */
export async function hybridSearch(
  query: string,
  index: SemanticSearchIndex,
  options?: {
    limit?: number;
    semanticWeight?: number; // 0-1, how much to weight semantic vs keyword
  }
): Promise<SearchResult[]> {
  const limit = options?.limit || 10;
  const semanticWeight = options?.semanticWeight || 0.7;
  const keywordWeight = 1 - semanticWeight;

  // Get semantic results
  const semanticResults = await semanticSearch(query, index, {
    limit: limit * 2,
    threshold: 0.3,
  });

  // Get keyword results
  const keywordResults = keywordSearch(query, index, {
    limit: limit * 2,
  });

  // Combine scores
  const combinedScores = new Map<string, SearchResult>();

  semanticResults.forEach((result) => {
    combinedScores.set(result.document.id, {
      ...result,
      score: result.score * semanticWeight,
    });
  });

  keywordResults.forEach((result) => {
    const existing = combinedScores.get(result.document.id);
    if (existing) {
      existing.score += result.score * keywordWeight;
      existing.highlights = [
        ...new Set([...existing.highlights, ...result.highlights]),
      ];
    } else {
      combinedScores.set(result.document.id, {
        ...result,
        score: result.score * keywordWeight,
      });
    }
  });

  // Sort and limit
  return Array.from(combinedScores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/**
 * Simple keyword search (BM25-like)
 */
function keywordSearch(
  query: string,
  index: SemanticSearchIndex,
  options?: { limit?: number }
): SearchResult[] {
  const limit = options?.limit || 10;
  const queryWords = query.toLowerCase().split(/\s+/);

  const results: SearchResult[] = [];

  for (const doc of index.documents) {
    const titleWords = doc.title.toLowerCase().split(/\s+/);
    const contentWords = doc.content.toLowerCase().split(/\s+/);
    const keywordWords = doc.keywords.map((k) => k.toLowerCase());

    let score = 0;

    // Title matches (highest weight)
    queryWords.forEach((word) => {
      if (titleWords.includes(word)) score += 0.3;
    });

    // Keyword matches
    queryWords.forEach((word) => {
      if (keywordWords.some((k) => k.includes(word))) score += 0.2;
    });

    // Content matches
    queryWords.forEach((word) => {
      const count = contentWords.filter((w) => w.includes(word)).length;
      score += Math.min(count * 0.05, 0.3);
    });

    if (score > 0) {
      const highlights = extractHighlights(query, doc.content);
      results.push({
        document: doc,
        score: Math.min(1, score),
        highlights,
        relevanceReason: `Keyword match in ${doc.category}`,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

/**
 * Search with query expansion
 */
export async function expandedSearch(
  query: string,
  index: SemanticSearchIndex,
  options?: { limit?: number }
): Promise<SearchResult[]> {
  // Expand query with synonyms
  const expandedQueries = expandQuery(query);

  // Search with all expanded queries
  const allResults = await Promise.all(
    expandedQueries.map((q) =>
      semanticSearch(q, index, { limit: options?.limit || 10, threshold: 0.4 })
    )
  );

  // Merge and deduplicate results
  const mergedResults = new Map<string, SearchResult>();

  allResults.flat().forEach((result) => {
    const existing = mergedResults.get(result.document.id);
    if (!existing || result.score > existing.score) {
      mergedResults.set(result.document.id, result);
    }
  });

  return Array.from(mergedResults.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, options?.limit || 10);
}

/**
 * Expand query with synonyms
 */
function expandQuery(query: string): string[] {
  const synonyms: Record<string, string[]> = {
    water: ['flood', 'moisture', 'leak', 'wet'],
    fire: ['smoke', 'burn', 'flame'],
    mould: ['mold', 'fungus', 'mildew'],
    damage: ['harm', 'destruction', 'loss'],
    emergency: ['urgent', 'immediate', 'crisis'],
    fix: ['repair', 'restore', 'remediate'],
  };

  const queries = [query];
  const words = query.toLowerCase().split(/\s+/);

  words.forEach((word) => {
    if (synonyms[word]) {
      synonyms[word].forEach((synonym) => {
        queries.push(query.replace(new RegExp(word, 'gi'), synonym));
      });
    }
  });

  return queries;
}
