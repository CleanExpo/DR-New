// Combined SEMRush + Perplexity SEO Intelligence Service
// Provides comprehensive market data combining quantitative SEO data with latest insights

import { semrushAPI, type KeywordMetrics, type DomainMetrics } from './semrush-api';
import { perplexityAPI, type MarketInsight, type TrendAnalysis } from './perplexity-api';

interface ComprehensiveKeywordAnalysis {
  keyword: string;
  // SEMRush quantitative data
  semrushData: {
    volume: number;
    cpc: number;
    competition: number;
    difficulty: number;
    trend: number[];
  } | null;
  // Perplexity qualitative insights
  marketContext: {
    trendAnalysis: string;
    recentDevelopments: string;
    opportunities: string[];
  } | null;
  // Combined score and recommendations
  opportunityScore: number;
  recommendations: string[];
  lastUpdated: number;
}

interface CompetitorIntelligence {
  competitor: string;
  domain: string;
  // SEMRush competitive data
  semrushMetrics: {
    organicKeywords: number;
    organicTraffic: number;
    competitionLevel: number;
    commonKeywords: number;
  } | null;
  // Perplexity real-time insights
  marketIntelligence: {
    recentNews: string[];
    marketPosition: string;
    strengths: string[];
    weaknesses: string[];
  } | null;
  // Combined analysis
  threatLevel: 'low' | 'medium' | 'high';
  actionableInsights: string[];
}

interface MarketOpportunityReport {
  reportId: string;
  domain: string;
  generatedAt: number;

  // Keyword opportunities
  keywordOpportunities: {
    highPotential: ComprehensiveKeywordAnalysis[];
    trending: string[];
    seasonal: string[];
    emerging: string[];
  };

  // Competitive landscape
  competitorAnalysis: CompetitorIntelligence[];

  // Market insights
  marketInsights: {
    industryTrends: TrendAnalysis[];
    regulatoryChanges: string;
    insuranceUpdates: string;
    localMarketConditions: string;
  };

  // Actionable recommendations
  recommendations: {
    contentStrategy: string[];
    seoTactics: string[];
    competitiveActions: string[];
    marketingFocus: string[];
  };
}

class SEOIntelligenceService {
  private domain: string;
  private location: string;
  private industry: string;

  constructor(domain: string = 'disasterrecovery.com.au', location: string = 'Brisbane', industry: string = 'disaster recovery') {
    this.domain = domain;
    this.location = location;
    this.industry = industry;
  }

  // Check if both APIs are configured
  async isFullyConfigured(): Promise<{ semrush: boolean; perplexity: boolean; }> {
    return {
      semrush: semrushAPI.isConfigured(),
      perplexity: perplexityAPI.isConfigured()
    };
  }

  // Comprehensive keyword analysis combining both data sources
  async analyzeKeyword(keyword: string): Promise<ComprehensiveKeywordAnalysis> {
    const [semrushData, marketContext] = await Promise.all([
      this.getSEMRushKeywordData(keyword),
      this.getPerplexityMarketContext(keyword)
    ]);

    const opportunityScore = this.calculateOpportunityScore(semrushData, marketContext);
    const recommendations = this.generateKeywordRecommendations(keyword, semrushData, marketContext, opportunityScore);

    return {
      keyword,
      semrushData,
      marketContext,
      opportunityScore,
      recommendations,
      lastUpdated: Date.now()
    };
  }

  // Batch analyze multiple keywords
  async analyzeKeywords(keywords: string[]): Promise<ComprehensiveKeywordAnalysis[]> {
    const analyses: ComprehensiveKeywordAnalysis[] = [];

    // Process in batches to respect API rate limits
    const batchSize = 5;
    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);
      const batchPromises = batch.map(keyword => this.analyzeKeyword(keyword));
      const batchResults = await Promise.all(batchPromises);
      analyses.push(...batchResults);

      // Rate limiting between batches
      if (i + batchSize < keywords.length) {
        await this.delay(2000); // 2 second delay between batches
      }
    }

    return analyses.sort((a, b) => b.opportunityScore - a.opportunityScore);
  }

  // Comprehensive competitor analysis
  async analyzeCompetitor(competitorDomain: string): Promise<CompetitorIntelligence> {
    const [semrushMetrics, marketIntelligence] = await Promise.all([
      this.getSEMRushCompetitorData(competitorDomain),
      this.getPerplexityCompetitorIntel(competitorDomain)
    ]);

    const threatLevel = this.assessThreatLevel(semrushMetrics, marketIntelligence);
    const actionableInsights = this.generateCompetitorInsights(competitorDomain, semrushMetrics, marketIntelligence);

    return {
      competitor: competitorDomain,
      domain: competitorDomain,
      semrushMetrics,
      marketIntelligence,
      threatLevel,
      actionableInsights
    };
  }

  // Generate comprehensive market opportunity report
  async generateMarketReport(): Promise<MarketOpportunityReport> {
    const reportId = `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Core disaster recovery keywords to analyze
    const coreKeywords = [
      'water damage restoration brisbane',
      'fire damage restoration brisbane',
      'flood restoration brisbane',
      'mould remediation brisbane',
      'emergency restoration brisbane',
      'storm damage repair brisbane',
      'disaster recovery services brisbane',
      'biohazard cleanup brisbane',
      'sewage cleanup brisbane',
      'smoke damage restoration brisbane'
    ];

    // Competitor domains to analyze
    const competitorDomains = [
      'allstaterestoration.com.au',
      'advancedrestoration.com.au',
      'restoremasters.com.au'
    ];

    // Gather all data in parallel where possible
    const [
      keywordAnalyses,
      competitorAnalyses,
      trendingKeywords,
      industryTrends,
      regulatoryUpdates,
      insuranceUpdates,
      localMarketData
    ] = await Promise.all([
      this.analyzeKeywords(coreKeywords),
      Promise.all(competitorDomains.map(domain => this.analyzeCompetitor(domain))),
      perplexityAPI.getKeywordOpportunities(this.industry, this.location),
      this.getIndustryTrends(),
      perplexityAPI.getRegulatoryUpdates(this.industry, 'Australia'),
      perplexityAPI.getInsuranceIndustryInsights(),
      perplexityAPI.getMarketInsights(this.location)
    ]);

    // Process and categorize keyword opportunities
    const highPotential = keywordAnalyses.filter(k => k.opportunityScore > 0.7);
    const seasonal = await this.identifySeasonalKeywords(trendingKeywords);
    const emerging = await this.identifyEmergingKeywords(trendingKeywords);

    // Generate recommendations
    const recommendations = this.generateActionableRecommendations(
      keywordAnalyses,
      competitorAnalyses,
      industryTrends
    );

    return {
      reportId,
      domain: this.domain,
      generatedAt: Date.now(),
      keywordOpportunities: {
        highPotential,
        trending: trendingKeywords,
        seasonal,
        emerging
      },
      competitorAnalysis: competitorAnalyses,
      marketInsights: {
        industryTrends,
        regulatoryChanges: regulatoryUpdates || '',
        insuranceUpdates: insuranceUpdates || '',
        localMarketConditions: localMarketData?.insights || ''
      },
      recommendations
    };
  }

  // Get keyword gap analysis between us and competitors
  async getKeywordGapAnalysis(competitorDomains: string[]): Promise<any> {
    if (!semrushAPI.isConfigured()) {
      return null;
    }

    // Get our organic keywords
    const ourKeywords = await semrushAPI.getOrganicResults(this.domain, 100);

    // Get competitor keywords and find gaps
    const gaps = [];
    for (const competitor of competitorDomains) {
      const competitorKeywords = await semrushAPI.getOrganicResults(competitor, 100);

      // Find keywords competitor ranks for that we don't
      const ourKeywordSet = new Set(ourKeywords.map(k => k.keyword));
      const competitorGaps = competitorKeywords.filter(k =>
        !ourKeywordSet.has(k.keyword) &&
        k.volume > 50 &&
        k.position <= 20
      );

      gaps.push({
        competitor,
        opportunities: competitorGaps.slice(0, 20)
      });

      await this.delay(1000); // Rate limiting
    }

    return gaps;
  }

  // Private helper methods
  private async getSEMRushKeywordData(keyword: string): Promise<ComprehensiveKeywordAnalysis['semrushData']> {
    if (!semrushAPI.isConfigured()) {
      return null;
    }

    try {
      const data = await semrushAPI.getKeywordOverview(keyword);
      if (data) {
        return {
          volume: data.volume,
          cpc: data.cpc,
          competition: data.competition,
          difficulty: data.difficulty,
          trend: data.trend
        };
      }
    } catch (error) {
      console.error('SEMRush keyword error:', error);
    }

    return null;
  }

  private async getPerplexityMarketContext(keyword: string): Promise<ComprehensiveKeywordAnalysis['marketContext']> {
    if (!perplexityAPI.isConfigured()) {
      return null;
    }

    try {
      const query = `What are the latest trends and market developments related to "${keyword}" in the disaster recovery industry in Australia? Include recent news, seasonal patterns, and business opportunities.`;
      const result = await perplexityAPI.search(query);

      if (result) {
        return {
          trendAnalysis: result.substring(0, 500),
          recentDevelopments: this.extractDevelopments(result),
          opportunities: this.extractOpportunities(result)
        };
      }
    } catch (error) {
      console.error('Perplexity context error:', error);
    }

    return null;
  }

  private async getSEMRushCompetitorData(domain: string): Promise<CompetitorIntelligence['semrushMetrics']> {
    if (!semrushAPI.isConfigured()) {
      return null;
    }

    try {
      const [overview, competitors] = await Promise.all([
        semrushAPI.getDomainOverview(domain),
        semrushAPI.getOrganicCompetitors(this.domain, 20)
      ]);

      const competitorInfo = competitors.find(c => c.domain === domain);

      return {
        organicKeywords: overview?.organic_keywords || 0,
        organicTraffic: overview?.organic_traffic || 0,
        competitionLevel: competitorInfo?.competition_level || 0,
        commonKeywords: competitorInfo?.common_keywords || 0
      };
    } catch (error) {
      console.error('SEMRush competitor error:', error);
    }

    return null;
  }

  private async getPerplexityCompetitorIntel(domain: string): Promise<CompetitorIntelligence['marketIntelligence']> {
    if (!perplexityAPI.isConfigured()) {
      return null;
    }

    try {
      const intelligence = await perplexityAPI.getCompetitorIntelligence(domain, this.location);
      return intelligence ? {
        recentNews: intelligence.recentNews,
        marketPosition: intelligence.marketPosition,
        strengths: intelligence.strengths,
        weaknesses: intelligence.weaknesses
      } : null;
    } catch (error) {
      console.error('Perplexity competitor error:', error);
    }

    return null;
  }

  private calculateOpportunityScore(
    semrushData: ComprehensiveKeywordAnalysis['semrushData'],
    marketContext: ComprehensiveKeywordAnalysis['marketContext']
  ): number {
    let score = 0.5; // Base score

    if (semrushData) {
      // High volume, low competition is good
      if (semrushData.volume > 1000) score += 0.2;
      if (semrushData.volume > 100) score += 0.1;
      if (semrushData.competition < 0.5) score += 0.1;
      if (semrushData.difficulty < 50) score += 0.1;
    }

    if (marketContext) {
      // Recent market activity increases opportunity
      if (marketContext.opportunities.length > 2) score += 0.1;
      if (marketContext.recentDevelopments.length > 100) score += 0.05;
    }

    return Math.min(1, Math.max(0, score));
  }

  private generateKeywordRecommendations(
    keyword: string,
    semrushData: ComprehensiveKeywordAnalysis['semrushData'],
    marketContext: ComprehensiveKeywordAnalysis['marketContext'],
    score: number
  ): string[] {
    const recommendations: string[] = [];

    if (score > 0.7) {
      recommendations.push(`HIGH PRIORITY: Target "${keyword}" for immediate content creation`);
    }

    if (semrushData) {
      if (semrushData.volume > 500 && semrushData.competition < 0.6) {
        recommendations.push(`Create comprehensive landing page for "${keyword}"`);
      }
      if (semrushData.trend.length > 0 && semrushData.trend[semrushData.trend.length - 1] > semrushData.trend[0]) {
        recommendations.push(`"${keyword}" shows rising trend - invest in long-term content strategy`);
      }
    }

    if (marketContext && marketContext.opportunities.length > 0) {
      recommendations.push(`Leverage current market opportunities: ${marketContext.opportunities[0]}`);
    }

    return recommendations;
  }

  private assessThreatLevel(
    semrushMetrics: CompetitorIntelligence['semrushMetrics'],
    marketIntelligence: CompetitorIntelligence['marketIntelligence']
  ): 'low' | 'medium' | 'high' {
    let threatScore = 0;

    if (semrushMetrics) {
      if (semrushMetrics.organicTraffic > 10000) threatScore += 2;
      if (semrushMetrics.competitionLevel > 0.8) threatScore += 2;
      if (semrushMetrics.commonKeywords > 50) threatScore += 1;
    }

    if (marketIntelligence) {
      if (marketIntelligence.strengths.length > 3) threatScore += 1;
      if (marketIntelligence.recentNews.length > 2) threatScore += 1;
    }

    if (threatScore >= 4) return 'high';
    if (threatScore >= 2) return 'medium';
    return 'low';
  }

  private generateCompetitorInsights(
    domain: string,
    semrushMetrics: CompetitorIntelligence['semrushMetrics'],
    marketIntelligence: CompetitorIntelligence['marketIntelligence']
  ): string[] {
    const insights: string[] = [];

    if (semrushMetrics && semrushMetrics.organicTraffic > 5000) {
      insights.push(`${domain} receives significant organic traffic (${semrushMetrics.organicTraffic}+) - analyze their top-performing content`);
    }

    if (marketIntelligence) {
      if (marketIntelligence.weaknesses.length > 0) {
        insights.push(`Opportunity: ${domain} shows weakness in ${marketIntelligence.weaknesses[0]}`);
      }
      if (marketIntelligence.strengths.length > 0) {
        insights.push(`Monitor: ${domain} is strong in ${marketIntelligence.strengths[0]}`);
      }
    }

    return insights;
  }

  private async getIndustryTrends(): Promise<TrendAnalysis[]> {
    const trends: TrendAnalysis[] = [];
    const topics = ['climate change disasters', 'insurance claim processing', 'emergency response technology'];

    for (const topic of topics) {
      const analysis = await perplexityAPI.getTrendAnalysis(topic);
      if (analysis) {
        trends.push(analysis);
      }
      await this.delay(1000);
    }

    return trends;
  }

  private async identifySeasonalKeywords(keywords: string[]): Promise<string[]> {
    const seasonalTerms = ['storm', 'flood', 'cyclone', 'bushfire', 'summer', 'winter'];
    return keywords.filter(keyword =>
      seasonalTerms.some(term => keyword.toLowerCase().includes(term))
    );
  }

  private async identifyEmergingKeywords(keywords: string[]): Promise<string[]> {
    const emergingTerms = ['covid', 'climate', 'smart', 'digital', 'ai', 'drone', 'thermal'];
    return keywords.filter(keyword =>
      emergingTerms.some(term => keyword.toLowerCase().includes(term))
    );
  }

  private generateActionableRecommendations(
    keywordAnalyses: ComprehensiveKeywordAnalysis[],
    competitorAnalyses: CompetitorIntelligence[],
    industryTrends: TrendAnalysis[]
  ): MarketOpportunityReport['recommendations'] {
    const contentStrategy: string[] = [];
    const seoTactics: string[] = [];
    const competitiveActions: string[] = [];
    const marketingFocus: string[] = [];

    // Content strategy recommendations
    const highValueKeywords = keywordAnalyses.filter(k => k.opportunityScore > 0.7);
    if (highValueKeywords.length > 0) {
      contentStrategy.push(`Create targeted content for ${highValueKeywords.length} high-opportunity keywords`);
      contentStrategy.push(`Priority keywords: ${highValueKeywords.slice(0, 3).map(k => k.keyword).join(', ')}`);
    }

    // SEO tactics
    const lowCompetitionKeywords = keywordAnalyses.filter(k =>
      k.semrushData && k.semrushData.competition < 0.5 && k.semrushData.volume > 100
    );
    if (lowCompetitionKeywords.length > 0) {
      seoTactics.push(`Target ${lowCompetitionKeywords.length} low-competition, high-volume keywords`);
    }

    // Competitive actions
    const highThreatCompetitors = competitorAnalyses.filter(c => c.threatLevel === 'high');
    if (highThreatCompetitors.length > 0) {
      competitiveActions.push(`Monitor ${highThreatCompetitors.length} high-threat competitors closely`);
    }

    // Marketing focus based on trends
    const risingTrends = industryTrends.filter(t => t.trend === 'rising');
    if (risingTrends.length > 0) {
      marketingFocus.push(`Capitalize on rising trend: ${risingTrends[0].topic}`);
    }

    return {
      contentStrategy,
      seoTactics,
      competitiveActions,
      marketingFocus
    };
  }

  private extractDevelopments(content: string): string {
    const sentences = content.split('.').filter(s => s.trim().length > 20);
    return sentences.slice(0, 3).join('. ') + '.';
  }

  private extractOpportunities(content: string): string[] {
    const opportunities: string[] = [];
    const lines = content.split('\n');

    lines.forEach(line => {
      if (line.toLowerCase().includes('opportunity') ||
          line.toLowerCase().includes('potential') ||
          line.toLowerCase().includes('growth')) {
        const cleaned = line.replace(/^[\s\-\*\d\.]+/, '').trim();
        if (cleaned.length > 10) {
          opportunities.push(cleaned);
        }
      }
    });

    return opportunities.slice(0, 3);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const seoIntelligenceService = new SEOIntelligenceService();

// Export types
export type {
  ComprehensiveKeywordAnalysis,
  CompetitorIntelligence,
  MarketOpportunityReport
};

// Quick access functions
export async function generateQuickMarketReport(): Promise<MarketOpportunityReport> {
  return await seoIntelligenceService.generateMarketReport();
}

export async function analyzeKeywordOpportunity(keyword: string): Promise<ComprehensiveKeywordAnalysis> {
  return await seoIntelligenceService.analyzeKeyword(keyword);
}

export async function getCompetitorGaps(): Promise<any> {
  const competitors = ['allstaterestoration.com.au', 'advancedrestoration.com.au'];
  return await seoIntelligenceService.getKeywordGapAnalysis(competitors);
}