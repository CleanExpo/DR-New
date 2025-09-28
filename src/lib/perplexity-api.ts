// Perplexity API Integration for Latest Data & Insights
// Works alongside SEMRush to provide real-time market intelligence

interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: Array<{
    index: number;
    finish_reason: string;
    message: {
      role: string;
      content: string;
    };
    delta?: {
      role?: string;
      content?: string;
    };
  }>;
}

interface MarketInsight {
  query: string;
  insights: string;
  sources: string[];
  timestamp: number;
  confidence: number;
}

interface CompetitorIntelligence {
  competitor: string;
  recentNews: string[];
  marketPosition: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
}

interface TrendAnalysis {
  topic: string;
  trend: 'rising' | 'stable' | 'declining';
  momentum: number;
  timeframe: string;
  implications: string[];
  recommendations: string[];
}

class PerplexityAPI {
  private apiKey: string;
  private baseUrl: string = 'https://api.perplexity.ai';
  private model: string;

  constructor() {
    this.apiKey = process.env.PERPLEXITY_API_KEY || '';
    this.model = 'llama-3.1-sonar-large-128k-online'; // Latest model with web access
  }

  // Check if API is configured
  isConfigured(): boolean {
    return this.apiKey !== '' && this.apiKey !== 'your_perplexity_api_key_here';
  }

  // Generic search with real-time data
  async search(query: string, systemPrompt?: string): Promise<string | null> {
    if (!this.isConfigured()) {
      console.warn('Perplexity API key not configured');
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            ...(systemPrompt ? [{
              role: 'system',
              content: systemPrompt
            }] : []),
            {
              role: 'user',
              content: query
            }
          ],
          max_tokens: 2000,
          temperature: 0.2,
          top_p: 0.9,
          return_citations: true,
          search_domain_filter: ["news", "academic", "business"]
        }),
      });

      if (!response.ok) {
        throw new Error(`Perplexity API error: ${response.status}`);
      }

      const data: PerplexityResponse = await response.json();
      return data.choices[0]?.message?.content || null;
    } catch (error) {
      console.error('Perplexity API error:', error);
      return null;
    }
  }

  // Get latest market insights for disaster recovery industry
  async getMarketInsights(location: string = 'Australia'): Promise<MarketInsight | null> {
    const query = `What are the latest trends, news, and market developments in the disaster recovery and restoration services industry in ${location}? Include information about regulatory changes, insurance industry updates, climate events, and business opportunities in 2024-2025.`;

    const systemPrompt = `You are a business intelligence analyst focused on the disaster recovery and restoration services industry. Provide factual, recent information with specific examples and data points. Focus on actionable insights for a local disaster recovery business.`;

    const result = await this.search(query, systemPrompt);

    if (result) {
      return {
        query,
        insights: result,
        sources: this.extractSources(result),
        timestamp: Date.now(),
        confidence: 0.85
      };
    }

    return null;
  }

  // Competitor intelligence gathering
  async getCompetitorIntelligence(competitor: string, location: string = 'Brisbane'): Promise<CompetitorIntelligence | null> {
    const query = `Analyze the latest information about ${competitor} disaster recovery services in ${location}. What are their recent news, business developments, strengths, weaknesses, and market position? Include any recent customer reviews, service expansions, or competitive advantages.`;

    const systemPrompt = `You are a competitive intelligence analyst. Provide objective analysis based on publicly available information. Focus on factual business intelligence that can inform strategic decisions.`;

    const result = await this.search(query, systemPrompt);

    if (result) {
      // Parse the response to extract structured data
      const lines = result.split('\n').filter(line => line.trim());

      return {
        competitor,
        recentNews: this.extractListItems(result, ['news', 'recent', 'update']),
        marketPosition: this.extractSection(result, ['position', 'standing', 'market share']),
        strengths: this.extractListItems(result, ['strength', 'advantage', 'positive']),
        weaknesses: this.extractListItems(result, ['weakness', 'challenge', 'limitation']),
        opportunities: this.extractListItems(result, ['opportunity', 'potential', 'growth'])
      };
    }

    return null;
  }

  // Industry trend analysis
  async getTrendAnalysis(topic: string): Promise<TrendAnalysis | null> {
    const query = `What are the current trends and future predictions for ${topic} in the disaster recovery industry? Include market momentum, growth patterns, and implications for businesses. Focus on 2024-2025 data and forecasts.`;

    const systemPrompt = `You are a market research analyst specializing in industry trends. Provide data-driven insights with specific trend indicators, growth rates, and future implications. Be specific about timeframes and market dynamics.`;

    const result = await this.search(query, systemPrompt);

    if (result) {
      const momentum = this.calculateMomentum(result);
      const trend = this.determineTrend(result);

      return {
        topic,
        trend,
        momentum,
        timeframe: '2024-2025',
        implications: this.extractListItems(result, ['implication', 'impact', 'effect']),
        recommendations: this.extractListItems(result, ['recommend', 'suggest', 'should'])
      };
    }

    return null;
  }

  // Get latest SEO keyword opportunities (complement to SEMRush)
  async getKeywordOpportunities(industry: string, location: string): Promise<string[]> {
    const query = `What are the latest search terms, trending keywords, and emerging phrases people are using when searching for ${industry} services in ${location}? Include seasonal terms, new technology-related searches, and current events affecting search behavior.`;

    const systemPrompt = `You are an SEO specialist focused on identifying trending and emerging search terms. Provide specific keyword phrases that people are actually searching for, based on recent search behavior and market developments.`;

    const result = await this.search(query, systemPrompt);

    if (result) {
      return this.extractKeywords(result);
    }

    return [];
  }

  // Get latest regulatory and compliance updates
  async getRegulatoryUpdates(industry: string = 'disaster recovery', location: string = 'Australia'): Promise<string | null> {
    const query = `What are the latest regulatory changes, compliance requirements, and legal updates affecting the ${industry} industry in ${location}? Include building codes, insurance regulations, environmental requirements, and licensing changes in 2024-2025.`;

    const systemPrompt = `You are a regulatory compliance expert. Provide accurate, up-to-date information about legal and regulatory requirements. Focus on actionable compliance information that businesses need to know.`;

    return await this.search(query, systemPrompt);
  }

  // Get latest insurance industry insights
  async getInsuranceIndustryInsights(): Promise<string | null> {
    const query = `What are the latest developments in the Australian insurance industry affecting property damage claims, disaster recovery services, and restoration contractors? Include claim processing changes, policy updates, and industry partnerships in 2024-2025.`;

    const systemPrompt = `You are an insurance industry analyst. Provide insights about how insurance industry changes affect disaster recovery and restoration service providers. Focus on practical business implications.`;

    return await this.search(query, systemPrompt);
  }

  // Helper methods for data extraction
  private extractSources(content: string): string[] {
    const sourceRegex = /\[(\d+)\]\s*([^\n]+)/g;
    const sources: string[] = [];
    let match;

    while ((match = sourceRegex.exec(content)) !== null) {
      sources.push(match[2].trim());
    }

    return sources.slice(0, 5); // Return top 5 sources
  }

  private extractListItems(content: string, keywords: string[]): string[] {
    const lines = content.split('\n');
    const items: string[] = [];

    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (keywords.some(keyword => lowerLine.includes(keyword))) {
        // Extract bullet points or numbered items
        const cleaned = line.replace(/^[\s\-\*\d\.]+/, '').trim();
        if (cleaned.length > 10) {
          items.push(cleaned);
        }
      }
    });

    return items.slice(0, 5);
  }

  private extractSection(content: string, keywords: string[]): string {
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const lowerLine = lines[i].toLowerCase();
      if (keywords.some(keyword => lowerLine.includes(keyword))) {
        // Return this line and next few lines as context
        return lines.slice(i, i + 3).join(' ').trim();
      }
    }

    return '';
  }

  private extractKeywords(content: string): string[] {
    // Extract quoted phrases and common keyword patterns
    const quotedRegex = /"([^"]+)"/g;
    const keywords: string[] = [];
    let match;

    while ((match = quotedRegex.exec(content)) !== null) {
      keywords.push(match[1]);
    }

    // Extract bullet point items that look like keywords
    const bulletRegex = /[•\-\*]\s*([^\n]+)/g;
    while ((match = bulletRegex.exec(content)) !== null) {
      const keyword = match[1].trim();
      if (keyword.length > 3 && keyword.length < 50) {
        keywords.push(keyword);
      }
    }

    return keywords.slice(0, 20);
  }

  private calculateMomentum(content: string): number {
    const positiveWords = ['growing', 'increasing', 'rising', 'expanding', 'strong', 'surge'];
    const negativeWords = ['declining', 'decreasing', 'falling', 'weak', 'drop'];

    const lowerContent = content.toLowerCase();
    const positiveCount = positiveWords.reduce((count, word) =>
      count + (lowerContent.match(new RegExp(word, 'g')) || []).length, 0);
    const negativeCount = negativeWords.reduce((count, word) =>
      count + (lowerContent.match(new RegExp(word, 'g')) || []).length, 0);

    return Math.max(0, Math.min(1, (positiveCount - negativeCount) / 10 + 0.5));
  }

  private determineTrend(content: string): 'rising' | 'stable' | 'declining' {
    const momentum = this.calculateMomentum(content);

    if (momentum > 0.6) return 'rising';
    if (momentum < 0.4) return 'declining';
    return 'stable';
  }
}

// Export singleton instance
export const perplexityAPI = new PerplexityAPI();

// Export types
export type {
  MarketInsight,
  CompetitorIntelligence,
  TrendAnalysis
};

// Helper functions for integration with SEMRush
export async function checkPerplexityConnection(): Promise<boolean> {
  if (!perplexityAPI.isConfigured()) {
    return false;
  }

  // Test with a simple query
  const result = await perplexityAPI.search('What is disaster recovery?');
  return result !== null;
}

export async function getLatestMarketData(domain: string = 'disasterrecovery.com.au') {
  const [marketInsights, regulatoryUpdates, insuranceInsights] = await Promise.all([
    perplexityAPI.getMarketInsights('Australia'),
    perplexityAPI.getRegulatoryUpdates('disaster recovery', 'Australia'),
    perplexityAPI.getInsuranceIndustryInsights()
  ]);

  return {
    marketInsights,
    regulatoryUpdates,
    insuranceInsights,
    timestamp: Date.now()
  };
}