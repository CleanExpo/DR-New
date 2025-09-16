// SEO Ranking Tracker for Competitive Intelligence
// Monitors search engine rankings for target keywords and competitors

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

class SEORankingTracker {
  constructor(configPath) {
    this.configPath = configPath;
    this.dataDir = path.join(__dirname, '../data/seo');
    this.reportsDir = path.join(__dirname, '../reports/seo');
    this.competitors = [];
    this.targetKeywords = [];
  }

  async initialize() {
    try {
      // Ensure directories exist
      await fs.mkdir(this.dataDir, { recursive: true });
      await fs.mkdir(this.reportsDir, { recursive: true });

      const configData = await fs.readFile(this.configPath, 'utf8');
      const config = JSON.parse(configData);
      this.competitors = config.competitors;
      this.targetKeywords = config.targetKeywords;
      console.log(`Loaded ${this.targetKeywords.length} keywords for tracking`);
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  // Simulate SERP data (in production, would use SEO API like Semrush or Ahrefs)
  async getSearchResults(keyword, location = 'Brisbane') {
    // This would normally call an SEO API
    // For demonstration, we'll create realistic mock data
    const mockResults = {
      keyword,
      location,
      searchVolume: Math.floor(Math.random() * 5000) + 100,
      difficulty: Math.floor(Math.random() * 100),
      cpc: (Math.random() * 10).toFixed(2),
      timestamp: new Date().toISOString(),
      topResults: this.generateMockSERPResults(keyword)
    };

    return mockResults;
  }

  generateMockSERPResults(keyword) {
    const results = [];
    const competitorUrls = this.competitors.map(c => ({
      domain: new URL(c.website).hostname,
      name: c.name
    }));

    // Add our site
    competitorUrls.push({
      domain: 'disasterrecovery.com.au',
      name: 'DR-New (Our Site)'
    });

    // Shuffle and create ranking
    const shuffled = competitorUrls.sort(() => Math.random() - 0.5);

    for (let i = 0; i < Math.min(10, shuffled.length); i++) {
      results.push({
        position: i + 1,
        url: `https://${shuffled[i].domain}/${keyword.replace(/\s+/g, '-')}`,
        title: `${keyword} | ${shuffled[i].name}`,
        domain: shuffled[i].domain,
        competitor: shuffled[i].name
      });
    }

    return results;
  }

  // Track rankings for all keywords
  async trackAllRankings() {
    const trackingResults = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      keywords: [],
      competitorRankings: {},
      opportunities: [],
      threats: []
    };

    // Initialize competitor rankings
    this.competitors.forEach(comp => {
      trackingResults.competitorRankings[comp.name] = {
        totalKeywords: 0,
        top3: 0,
        top10: 0,
        avgPosition: 0,
        positions: []
      };
    });

    // Add our site
    trackingResults.competitorRankings['DR-New (Our Site)'] = {
      totalKeywords: 0,
      top3: 0,
      top10: 0,
      avgPosition: 0,
      positions: []
    };

    // Track each keyword
    for (const keyword of this.targetKeywords) {
      console.log(`Tracking: ${keyword}`);
      const results = await this.getSearchResults(keyword);
      trackingResults.keywords.push(results);

      // Analyze rankings
      results.topResults.forEach(result => {
        if (trackingResults.competitorRankings[result.competitor]) {
          const compData = trackingResults.competitorRankings[result.competitor];
          compData.totalKeywords++;
          compData.positions.push(result.position);

          if (result.position <= 3) compData.top3++;
          if (result.position <= 10) compData.top10++;
        }
      });

      // Identify opportunities
      if (!results.topResults.some(r => r.competitor === 'DR-New (Our Site)')) {
        if (results.difficulty < 50) {
          trackingResults.opportunities.push({
            keyword,
            difficulty: results.difficulty,
            searchVolume: results.searchVolume,
            message: `Opportunity: Not ranking for "${keyword}" with low difficulty (${results.difficulty})`
          });
        }
      }

      // Identify threats
      const ourPosition = results.topResults.find(r =>
        r.competitor === 'DR-New (Our Site)'
      )?.position;

      if (ourPosition && ourPosition > 3) {
        const competitorsAbove = results.topResults
          .filter(r => r.position < ourPosition && r.competitor !== 'DR-New (Our Site)')
          .map(r => r.competitor);

        if (competitorsAbove.length > 0) {
          trackingResults.threats.push({
            keyword,
            ourPosition,
            competitorsAbove,
            message: `Threat: Ranking #${ourPosition} for "${keyword}", behind ${competitorsAbove.join(', ')}`
          });
        }
      }

      // Add delay to simulate API rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Calculate average positions
    Object.keys(trackingResults.competitorRankings).forEach(comp => {
      const data = trackingResults.competitorRankings[comp];
      if (data.positions.length > 0) {
        data.avgPosition = (
          data.positions.reduce((a, b) => a + b, 0) / data.positions.length
        ).toFixed(1);
      }
    });

    // Save tracking results
    await this.saveTrackingResults(trackingResults);

    // Generate insights
    const insights = this.generateSEOInsights(trackingResults);
    await this.saveSEOInsights(insights);

    return trackingResults;
  }

  // Generate SEO insights from tracking data
  generateSEOInsights(trackingData) {
    const insights = {
      timestamp: trackingData.timestamp,
      date: trackingData.date,
      summary: {},
      competitive: {},
      actionItems: []
    };

    // Overall summary
    const ourData = trackingData.competitorRankings['DR-New (Our Site)'];
    insights.summary = {
      totalKeywordsTracked: trackingData.keywords.length,
      ourTop3Rankings: ourData.top3,
      ourTop10Rankings: ourData.top10,
      ourAveragePosition: ourData.avgPosition,
      totalOpportunities: trackingData.opportunities.length,
      totalThreats: trackingData.threats.length
    };

    // Competitive analysis
    const competitors = Object.entries(trackingData.competitorRankings)
      .filter(([name]) => name !== 'DR-New (Our Site)')
      .sort((a, b) => parseFloat(a[1].avgPosition) - parseFloat(b[1].avgPosition));

    insights.competitive = {
      strongestCompetitor: competitors[0] ? {
        name: competitors[0][0],
        avgPosition: competitors[0][1].avgPosition,
        top3Count: competitors[0][1].top3
      } : null,
      weakestCompetitor: competitors[competitors.length - 1] ? {
        name: competitors[competitors.length - 1][0],
        avgPosition: competitors[competitors.length - 1][1].avgPosition,
        top3Count: competitors[competitors.length - 1][1].top3
      } : null,
      competitorComparison: competitors.map(([name, data]) => ({
        name,
        avgPosition: data.avgPosition,
        top3: data.top3,
        top10: data.top10,
        visibility: ((data.top3 * 3) + (data.top10 * 1)).toFixed(0)
      }))
    };

    // Generate action items
    if (trackingData.opportunities.length > 0) {
      insights.actionItems.push({
        priority: 'high',
        type: 'opportunity',
        action: 'Target low-difficulty keywords',
        details: `Focus on ${trackingData.opportunities.slice(0, 5).map(o => o.keyword).join(', ')}`
      });
    }

    if (trackingData.threats.length > 0) {
      insights.actionItems.push({
        priority: 'high',
        type: 'threat',
        action: 'Improve rankings for competitive keywords',
        details: `Optimize for: ${trackingData.threats.slice(0, 3).map(t => t.keyword).join(', ')}`
      });
    }

    if (ourData.avgPosition > 5) {
      insights.actionItems.push({
        priority: 'medium',
        type: 'improvement',
        action: 'Overall SEO optimization needed',
        details: `Average position is ${ourData.avgPosition}, aim for top 3`
      });
    }

    // Content gap analysis
    const keywordsWithoutRanking = trackingData.keywords
      .filter(k => !k.topResults.some(r => r.competitor === 'DR-New (Our Site)'))
      .map(k => k.keyword);

    if (keywordsWithoutRanking.length > 0) {
      insights.actionItems.push({
        priority: 'medium',
        type: 'content_gap',
        action: 'Create content for missing keywords',
        details: `Not ranking for: ${keywordsWithoutRanking.slice(0, 5).join(', ')}`
      });
    }

    return insights;
  }

  // Save tracking results
  async saveTrackingResults(results) {
    const fileName = `rankings_${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(this.dataDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(results, null, 2));
    console.log(`Saved tracking results to ${fileName}`);
  }

  // Save SEO insights
  async saveSEOInsights(insights) {
    const fileName = `insights_${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(this.reportsDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(insights, null, 2));
    console.log(`Saved SEO insights to ${fileName}`);
  }

  // Compare with historical data
  async compareWithHistorical(daysBack = 7) {
    const comparison = {
      timestamp: new Date().toISOString(),
      period: `${daysBack} days`,
      changes: [],
      improvements: [],
      declines: []
    };

    try {
      // Get current and historical data
      const currentDate = new Date().toISOString().split('T')[0];
      const historicalDate = new Date(Date.now() - daysBack * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0];

      const currentFile = path.join(this.dataDir, `rankings_${currentDate}.json`);
      const historicalFile = path.join(this.dataDir, `rankings_${historicalDate}.json`);

      const current = JSON.parse(await fs.readFile(currentFile, 'utf8'));
      const historical = JSON.parse(await fs.readFile(historicalFile, 'utf8'));

      // Compare rankings
      current.keywords.forEach(currentKeyword => {
        const historicalKeyword = historical.keywords.find(
          h => h.keyword === currentKeyword.keyword
        );

        if (historicalKeyword) {
          const currentOurRanking = currentKeyword.topResults.find(
            r => r.competitor === 'DR-New (Our Site)'
          );
          const historicalOurRanking = historicalKeyword.topResults.find(
            r => r.competitor === 'DR-New (Our Site)'
          );

          if (currentOurRanking && historicalOurRanking) {
            const change = historicalOurRanking.position - currentOurRanking.position;

            if (change > 0) {
              comparison.improvements.push({
                keyword: currentKeyword.keyword,
                previousPosition: historicalOurRanking.position,
                currentPosition: currentOurRanking.position,
                improvement: change
              });
            } else if (change < 0) {
              comparison.declines.push({
                keyword: currentKeyword.keyword,
                previousPosition: historicalOurRanking.position,
                currentPosition: currentOurRanking.position,
                decline: Math.abs(change)
              });
            }
          }
        }
      });

      // Save comparison
      const comparisonFile = path.join(
        this.reportsDir,
        `comparison_${currentDate}.json`
      );
      await fs.writeFile(comparisonFile, JSON.stringify(comparison, null, 2));

    } catch (error) {
      console.error('Error comparing historical data:', error);
    }

    return comparison;
  }
}

// Run if executed directly
if (require.main === module) {
  const tracker = new SEORankingTracker(
    path.join(__dirname, '../config/competitors.json')
  );

  tracker.initialize().then(() => {
    tracker.trackAllRankings().then(results => {
      console.log('\n📊 SEO Tracking Complete!');
      console.log(`Tracked ${results.keywords.length} keywords`);
      console.log(`Found ${results.opportunities.length} opportunities`);
      console.log(`Identified ${results.threats.length} threats`);
    });
  });
}

module.exports = SEORankingTracker;