import { NextResponse } from 'next/server';
import { seoIntelligenceService, generateQuickMarketReport } from '../../../../src/lib/seo-intelligence-service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const quick = searchParams.get('quick') === 'true';

    // Check if both APIs are configured
    const apiStatus = await seoIntelligenceService.isFullyConfigured();

    if (!apiStatus.semrush && !apiStatus.perplexity) {
      return NextResponse.json({
        success: false,
        message: 'Neither SEMRush nor Perplexity API keys are configured. Please add API keys to your .env file',
        apiStatus
      }, { status: 400 });
    }

    if (quick) {
      // Quick report with limited data
      const [marketInsights, keywordOpportunities] = await Promise.all([
        apiStatus.perplexity ? seoIntelligenceService.generateMarketReport() : null,
        apiStatus.semrush ? seoIntelligenceService.analyzeKeywords(['disaster recovery brisbane', 'water damage restoration brisbane']) : null
      ]);

      return NextResponse.json({
        success: true,
        message: 'Quick SEO intelligence report generated',
        apiStatus,
        report: {
          marketInsights: marketInsights ? {
            summary: marketInsights.marketInsights.localMarketConditions.substring(0, 300),
            keywordCount: marketInsights.keywordOpportunities.trending.length,
            competitorCount: marketInsights.competitorAnalysis.length
          } : null,
          keywordAnalysis: keywordOpportunities?.slice(0, 2) || null,
          generatedAt: Date.now()
        }
      });
    }

    // Full comprehensive report
    if (!apiStatus.semrush || !apiStatus.perplexity) {
      return NextResponse.json({
        success: false,
        message: 'Full report requires both SEMRush and Perplexity API keys to be configured',
        apiStatus
      }, { status: 400 });
    }

    const fullReport = await seoIntelligenceService.generateMarketReport();

    return NextResponse.json({
      success: true,
      message: 'Full SEO intelligence report generated successfully',
      apiStatus,
      report: fullReport
    });

  } catch (error) {
    console.error('SEO Intelligence report error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error generating SEO intelligence report',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keywords, competitors } = body;

    const apiStatus = await seoIntelligenceService.isFullyConfigured();

    if (!apiStatus.semrush && !apiStatus.perplexity) {
      return NextResponse.json({
        success: false,
        message: 'API keys not configured'
      }, { status: 400 });
    }

    const results: any = {};

    // Analyze custom keywords if provided
    if (keywords && Array.isArray(keywords)) {
      if (apiStatus.semrush || apiStatus.perplexity) {
        results.keywordAnalysis = await seoIntelligenceService.analyzeKeywords(keywords.slice(0, 10)); // Limit to 10 keywords
      }
    }

    // Analyze custom competitors if provided
    if (competitors && Array.isArray(competitors)) {
      if (apiStatus.semrush || apiStatus.perplexity) {
        results.competitorAnalysis = await Promise.all(
          competitors.slice(0, 5).map(domain => seoIntelligenceService.analyzeCompetitor(domain))
        );
      }
    }

    // Keyword gap analysis if competitors provided
    if (competitors && apiStatus.semrush) {
      results.keywordGaps = await seoIntelligenceService.getKeywordGapAnalysis(competitors.slice(0, 3));
    }

    return NextResponse.json({
      success: true,
      message: 'Custom SEO analysis completed',
      apiStatus,
      results
    });

  } catch (error) {
    console.error('Custom SEO analysis error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error performing custom SEO analysis',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}