import { NextResponse } from 'next/server';
import { checkSEMrushConnection } from '../../../../src/lib/semrush-api';
import { checkPerplexityConnection } from '../../../../src/lib/perplexity-api';
import { seoIntelligenceService } from '../../../../src/lib/seo-intelligence-service';

export async function GET() {
  try {
    // Check configuration status
    const apiStatus = await seoIntelligenceService.isFullyConfigured();

    // Test actual connections if configured
    const connectionTests: any = {
      semrush: {
        configured: apiStatus.semrush,
        connected: false,
        error: null
      },
      perplexity: {
        configured: apiStatus.perplexity,
        connected: false,
        error: null
      }
    };

    // Test SEMRush connection
    if (apiStatus.semrush) {
      try {
        connectionTests.semrush.connected = await checkSEMrushConnection();
      } catch (error) {
        connectionTests.semrush.error = error instanceof Error ? error.message : 'Connection failed';
      }
    }

    // Test Perplexity connection
    if (apiStatus.perplexity) {
      try {
        connectionTests.perplexity.connected = await checkPerplexityConnection();
      } catch (error) {
        connectionTests.perplexity.error = error instanceof Error ? error.message : 'Connection failed';
      }
    }

    // Determine overall status
    const overallStatus = {
      ready: connectionTests.semrush.connected || connectionTests.perplexity.connected,
      fullyReady: connectionTests.semrush.connected && connectionTests.perplexity.connected,
      capabilities: {
        quantitativeData: connectionTests.semrush.connected,
        qualitativeInsights: connectionTests.perplexity.connected,
        competitorAnalysis: connectionTests.semrush.connected,
        marketIntelligence: connectionTests.perplexity.connected,
        keywordGapAnalysis: connectionTests.semrush.connected,
        trendAnalysis: connectionTests.perplexity.connected
      }
    };

    const message = overallStatus.fullyReady
      ? 'Both SEMRush and Perplexity APIs are connected and ready'
      : overallStatus.ready
      ? 'Partial functionality available - some APIs connected'
      : 'No APIs connected - please configure API keys';

    return NextResponse.json({
      success: overallStatus.ready,
      message,
      status: overallStatus,
      connections: connectionTests,
      recommendations: generateSetupRecommendations(connectionTests),
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('API status check error:', error);
    return NextResponse.json({
      success: false,
      message: 'Error checking API status',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

function generateSetupRecommendations(connections: any): string[] {
  const recommendations: string[] = [];

  if (!connections.semrush.configured) {
    recommendations.push('Add SEMRUSH_API_KEY to your .env file for quantitative SEO data');
  } else if (!connections.semrush.connected) {
    recommendations.push('SEMRush API key configured but connection failed - check key validity');
  }

  if (!connections.perplexity.configured) {
    recommendations.push('Add PERPLEXITY_API_KEY to your .env file for real-time market insights');
  } else if (!connections.perplexity.connected) {
    recommendations.push('Perplexity API key configured but connection failed - check key validity');
  }

  if (connections.semrush.connected && connections.perplexity.connected) {
    recommendations.push('All APIs connected - ready for comprehensive market intelligence');
  }

  if (!connections.semrush.connected && !connections.perplexity.connected) {
    recommendations.push('Configure at least one API to begin using SEO intelligence features');
  }

  return recommendations;
}