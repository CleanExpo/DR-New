// Content Gap Analyzer for Competitive Intelligence
// Identifies content opportunities by analyzing competitor content strategies

const fs = require('fs').promises;
const path = require('path');
const https = require('https');
const { JSDOM } = require('jsdom');

class ContentGapAnalyzer {
  constructor(configPath) {
    this.configPath = configPath;
    this.dataDir = path.join(__dirname, '../data/content-gaps');
    this.reportsDir = path.join(__dirname, '../reports/content-gaps');
    this.competitors = [];
    this.contentTopics = [];
  }

  async initialize() {
    try {
      // Ensure directories exist
      await fs.mkdir(this.dataDir, { recursive: true });
      await fs.mkdir(this.reportsDir, { recursive: true });

      const configData = await fs.readFile(this.configPath, 'utf8');
      const config = JSON.parse(configData);
      this.competitors = config.competitors;

      // Define content topics to analyze
      this.contentTopics = [
        // Service-specific content
        {
          category: 'Water Damage',
          topics: [
            'burst pipe emergency response',
            'flood damage assessment',
            'water extraction process',
            'structural drying techniques',
            'moisture detection',
            'category 1 2 3 water damage',
            'insurance claim assistance',
            'preventive maintenance tips'
          ]
        },
        {
          category: 'Fire Damage',
          topics: [
            'smoke damage restoration',
            'soot removal techniques',
            'odor elimination process',
            'structural fire damage',
            'content restoration',
            'fire damage inspection',
            'insurance documentation',
            'fire prevention tips'
          ]
        },
        {
          category: 'Mould Remediation',
          topics: [
            'black mould removal',
            'mould inspection process',
            'air quality testing',
            'humidity control',
            'mould prevention strategies',
            'health effects of mould',
            'DIY vs professional removal',
            'post-remediation verification'
          ]
        },
        {
          category: 'Emergency Response',
          topics: [
            '24 hour emergency service',
            'rapid response team',
            'emergency contact procedures',
            'disaster preparedness',
            'emergency equipment',
            'response time guarantees',
            'after-hours service',
            'emergency tarping'
          ]
        },
        {
          category: 'Location-Specific',
          topics: [
            'Brisbane flooding history',
            'Ipswich storm damage',
            'Logan water damage',
            'Queensland weather patterns',
            'local building codes',
            'regional service coverage',
            'suburb-specific services',
            'local case studies'
          ]
        },
        {
          category: 'Educational Content',
          topics: [
            'restoration process timeline',
            'cost estimation guides',
            'DIY damage assessment',
            'when to call professionals',
            'seasonal maintenance',
            'property protection tips',
            'understanding restoration equipment',
            'choosing a restoration company'
          ]
        },
        {
          category: 'Industry Expertise',
          topics: [
            'IICRC certification',
            'restoration industry standards',
            'advanced drying technology',
            'thermal imaging inspection',
            'antimicrobial treatments',
            'restoration vs replacement',
            'commercial restoration',
            'residential restoration'
          ]
        }
      ];

      console.log(`Loaded ${this.competitors.length} competitors for content gap analysis`);
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  // Analyze competitor content
  async analyzeCompetitorContent(competitor) {
    const analysis = {
      competitor: competitor.name,
      website: competitor.website,
      timestamp: new Date().toISOString(),
      contentFound: {},
      contentDepth: {},
      uniqueContent: [],
      contentGaps: []
    };

    try {
      // Fetch main pages to analyze
      const pagesToAnalyze = [
        { url: competitor.website, type: 'homepage' },
        { url: `${competitor.website}/services`, type: 'services' },
        { url: `${competitor.website}/water-damage`, type: 'water-damage' },
        { url: `${competitor.website}/fire-damage`, type: 'fire-damage' },
        { url: `${competitor.website}/mould-remediation`, type: 'mould' },
        { url: `${competitor.website}/blog`, type: 'blog' },
        { url: `${competitor.website}/resources`, type: 'resources' }
      ];

      for (const page of pagesToAnalyze) {
        const content = await this.fetchPageContent(page.url);
        if (content) {
          const pageAnalysis = this.analyzePageContent(content, page.type);
          this.mergeAnalysis(analysis, pageAnalysis);
        }
      }

      // Analyze content coverage
      analysis.contentCoverage = this.calculateContentCoverage(analysis.contentFound);

      // Identify unique content themes
      analysis.uniqueContent = this.identifyUniqueContent(analysis.contentFound);

      // Calculate content depth scores
      analysis.contentDepth = this.calculateContentDepth(analysis.contentFound);

    } catch (error) {
      console.error(`Error analyzing ${competitor.name}:`, error);
      analysis.error = error.message;
    }

    return analysis;
  }

  // Fetch page content
  async fetchPageContent(url) {
    return new Promise((resolve) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          resolve(null);
          return;
        }

        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const dom = new JSDOM(data);
            const document = dom.window.document;

            // Extract relevant content
            const content = {
              title: document.querySelector('title')?.textContent || '',
              headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
                tag: h.tagName.toLowerCase(),
                text: h.textContent.trim()
              })),
              paragraphs: Array.from(document.querySelectorAll('p')).map(p =>
                p.textContent.trim()
              ).filter(p => p.length > 50),
              lists: Array.from(document.querySelectorAll('ul li, ol li')).map(li =>
                li.textContent.trim()
              ),
              meta: {
                description: document.querySelector('meta[name="description"]')?.content || '',
                keywords: document.querySelector('meta[name="keywords"]')?.content || ''
              },
              url
            };

            resolve(content);
          } catch (error) {
            resolve(null);
          }
        });
      }).on('error', () => {
        resolve(null);
      });
    });
  }

  // Analyze page content for topics
  analyzePageContent(content, pageType) {
    const analysis = {
      pageType,
      topicsFound: {},
      contentQuality: {}
    };

    const allText = [
      content.title,
      ...content.headings.map(h => h.text),
      ...content.paragraphs,
      ...content.lists,
      content.meta.description,
      content.meta.keywords
    ].join(' ').toLowerCase();

    // Check for each content topic
    for (const category of this.contentTopics) {
      analysis.topicsFound[category.category] = [];

      for (const topic of category.topics) {
        const topicWords = topic.toLowerCase().split(' ');
        const topicFound = topicWords.every(word => allText.includes(word));

        if (topicFound) {
          // Calculate content depth for this topic
          const mentions = (allText.match(new RegExp(topic, 'gi')) || []).length;
          const hasHeading = content.headings.some(h =>
            h.text.toLowerCase().includes(topic.toLowerCase())
          );
          const hasParagraph = content.paragraphs.some(p =>
            p.toLowerCase().includes(topic.toLowerCase())
          );

          analysis.topicsFound[category.category].push({
            topic,
            mentions,
            hasHeading,
            hasDedicatedContent: hasParagraph,
            depth: this.calculateTopicDepth(mentions, hasHeading, hasParagraph)
          });
        }
      }
    }

    // Assess content quality indicators
    analysis.contentQuality = {
      averageParagraphLength: content.paragraphs.length > 0 ?
        content.paragraphs.reduce((sum, p) => sum + p.length, 0) / content.paragraphs.length : 0,
      totalWordCount: allText.split(' ').length,
      hasStructuredData: content.headings.length > 3,
      hasLists: content.lists.length > 0,
      hasMetaDescription: content.meta.description.length > 100
    };

    return analysis;
  }

  // Calculate topic depth score
  calculateTopicDepth(mentions, hasHeading, hasParagraph) {
    let score = 0;

    // Base score from mentions
    if (mentions === 1) score += 1;
    else if (mentions === 2) score += 2;
    else if (mentions >= 3) score += 3;

    // Bonus for heading
    if (hasHeading) score += 2;

    // Bonus for dedicated paragraph
    if (hasParagraph) score += 2;

    // Max score is 7 (3 mentions + 2 heading + 2 paragraph)
    return Math.min(score, 7);
  }

  // Merge page analysis into overall analysis
  mergeAnalysis(overall, pageAnalysis) {
    for (const category in pageAnalysis.topicsFound) {
      if (!overall.contentFound[category]) {
        overall.contentFound[category] = [];
      }

      for (const topic of pageAnalysis.topicsFound[category]) {
        const existing = overall.contentFound[category].find(t => t.topic === topic.topic);
        if (existing) {
          existing.mentions += topic.mentions;
          existing.depth = Math.max(existing.depth, topic.depth);
          existing.hasHeading = existing.hasHeading || topic.hasHeading;
          existing.hasDedicatedContent = existing.hasDedicatedContent || topic.hasDedicatedContent;
        } else {
          overall.contentFound[category].push(topic);
        }
      }
    }
  }

  // Calculate content coverage percentage
  calculateContentCoverage(contentFound) {
    let totalTopics = 0;
    let coveredTopics = 0;

    for (const category of this.contentTopics) {
      totalTopics += category.topics.length;
      if (contentFound[category.category]) {
        coveredTopics += contentFound[category.category].length;
      }
    }

    return {
      totalPossibleTopics: totalTopics,
      topicsCovered: coveredTopics,
      coveragePercentage: ((coveredTopics / totalTopics) * 100).toFixed(1)
    };
  }

  // Identify unique content themes
  identifyUniqueContent(contentFound) {
    const uniqueThemes = [];

    for (const category in contentFound) {
      for (const topic of contentFound[category]) {
        if (topic.depth >= 5) {
          uniqueThemes.push({
            category,
            topic: topic.topic,
            strength: topic.depth
          });
        }
      }
    }

    return uniqueThemes.sort((a, b) => b.strength - a.strength);
  }

  // Calculate content depth for each category
  calculateContentDepth(contentFound) {
    const depth = {};

    for (const category in contentFound) {
      const topics = contentFound[category];
      if (topics.length > 0) {
        const avgDepth = topics.reduce((sum, t) => sum + t.depth, 0) / topics.length;
        depth[category] = {
          topicCount: topics.length,
          averageDepth: avgDepth.toFixed(1),
          rating: avgDepth >= 5 ? 'Excellent' :
                  avgDepth >= 3 ? 'Good' :
                  avgDepth >= 1 ? 'Basic' : 'Minimal'
        };
      }
    }

    return depth;
  }

  // Compare all competitors and identify gaps
  async performGapAnalysis() {
    console.log('Starting comprehensive content gap analysis...');

    const allAnalyses = [];
    const gapReport = {
      timestamp: new Date().toISOString(),
      competitorsAnalyzed: [],
      ourContent: null, // Would analyze our own content
      gaps: [],
      opportunities: [],
      competitorStrengths: [],
      recommendations: []
    };

    // Analyze each competitor
    for (const competitor of this.competitors) {
      console.log(`Analyzing content for ${competitor.name}...`);
      const analysis = await this.analyzeCompetitorContent(competitor);
      allAnalyses.push(analysis);
      gapReport.competitorsAnalyzed.push({
        name: competitor.name,
        coverage: analysis.contentCoverage,
        uniqueContent: analysis.uniqueContent.length
      });

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Identify content all competitors have but we might not
    const commonCompetitorContent = this.findCommonContent(allAnalyses);

    // Identify unique content opportunities
    const contentOpportunities = this.identifyOpportunities(allAnalyses);

    // Generate gap analysis
    gapReport.gaps = this.identifyContentGaps(allAnalyses);
    gapReport.opportunities = contentOpportunities;
    gapReport.competitorStrengths = this.identifyCompetitorStrengths(allAnalyses);

    // Generate recommendations
    gapReport.recommendations = this.generateRecommendations(
      gapReport.gaps,
      gapReport.opportunities,
      gapReport.competitorStrengths
    );

    // Save report
    await this.saveGapAnalysisReport(gapReport);

    return gapReport;
  }

  // Find content common across competitors
  findCommonContent(analyses) {
    const contentFrequency = {};

    for (const analysis of analyses) {
      for (const category in analysis.contentFound) {
        for (const topic of analysis.contentFound[category]) {
          const key = `${category}:${topic.topic}`;
          contentFrequency[key] = (contentFrequency[key] || 0) + 1;
        }
      }
    }

    // Find content that appears in at least 50% of competitors
    const threshold = Math.ceil(analyses.length * 0.5);
    const commonContent = [];

    for (const [key, frequency] of Object.entries(contentFrequency)) {
      if (frequency >= threshold) {
        const [category, topic] = key.split(':');
        commonContent.push({
          category,
          topic,
          frequency,
          percentage: ((frequency / analyses.length) * 100).toFixed(0)
        });
      }
    }

    return commonContent.sort((a, b) => b.frequency - a.frequency);
  }

  // Identify content opportunities
  identifyOpportunities(analyses) {
    const opportunities = [];

    // Find underserved topics (covered by few competitors)
    const topicCoverage = {};

    for (const category of this.contentTopics) {
      for (const topic of category.topics) {
        let coverage = 0;
        let avgDepth = 0;

        for (const analysis of analyses) {
          const found = analysis.contentFound[category.category]?.find(t =>
            t.topic === topic
          );
          if (found) {
            coverage++;
            avgDepth += found.depth;
          }
        }

        if (coverage > 0) {
          avgDepth = avgDepth / coverage;
        }

        // Opportunity if covered by less than 30% of competitors or with low depth
        if (coverage <= Math.ceil(analyses.length * 0.3) || avgDepth < 3) {
          opportunities.push({
            category: category.category,
            topic,
            competitorsCovering: coverage,
            averageDepth: avgDepth.toFixed(1),
            opportunityScore: ((10 - coverage) * (7 - avgDepth)).toFixed(1),
            recommendation: coverage === 0 ?
              'Untapped topic - be first to cover comprehensively' :
              'Low competition - opportunity to dominate with quality content'
          });
        }
      }
    }

    return opportunities.sort((a, b) => b.opportunityScore - a.opportunityScore);
  }

  // Identify content gaps
  identifyContentGaps(analyses) {
    const gaps = [];

    // Topics with high coverage but varying quality
    for (const category of this.contentTopics) {
      for (const topic of category.topics) {
        const coverage = analyses.filter(a =>
          a.contentFound[category.category]?.some(t => t.topic === topic)
        );

        if (coverage.length >= analyses.length * 0.7) {
          // Most competitors cover this - it's likely important
          gaps.push({
            category: category.category,
            topic,
            importance: 'high',
            competitorsCovering: coverage.length,
            reason: 'Widely covered by competitors - essential content'
          });
        }
      }
    }

    return gaps;
  }

  // Identify competitor strengths
  identifyCompetitorStrengths(analyses) {
    const strengths = [];

    for (const analysis of analyses) {
      const competitorStrengths = {
        competitor: analysis.competitor,
        strengths: [],
        coverage: analysis.contentCoverage?.coveragePercentage || 0
      };

      // Find categories where they excel
      for (const category in analysis.contentDepth) {
        const depth = analysis.contentDepth[category];
        if (depth.rating === 'Excellent' || depth.rating === 'Good') {
          competitorStrengths.strengths.push({
            category,
            rating: depth.rating,
            topicCount: depth.topicCount
          });
        }
      }

      if (competitorStrengths.strengths.length > 0) {
        strengths.push(competitorStrengths);
      }
    }

    return strengths.sort((a, b) => b.coverage - a.coverage);
  }

  // Generate recommendations
  generateRecommendations(gaps, opportunities, competitorStrengths) {
    const recommendations = [];

    // High priority: Content gaps
    if (gaps.length > 0) {
      recommendations.push({
        priority: 'high',
        type: 'content_gap',
        title: 'Fill Critical Content Gaps',
        description: `Create comprehensive content for ${gaps.slice(0, 5).map(g => g.topic).join(', ')}`,
        impact: 'Achieve content parity with competitors',
        effort: 'medium',
        timeline: '2-4 weeks'
      });
    }

    // High value opportunities
    const highValueOpps = opportunities.filter(o => o.opportunityScore > 30);
    if (highValueOpps.length > 0) {
      recommendations.push({
        priority: 'high',
        type: 'opportunity',
        title: 'Capture Low-Competition Keywords',
        description: `Target underserved topics: ${highValueOpps.slice(0, 3).map(o => o.topic).join(', ')}`,
        impact: 'Potential to rank #1 with minimal competition',
        effort: 'low',
        timeline: '1-2 weeks'
      });
    }

    // Counter competitor strengths
    const topCompetitor = competitorStrengths[0];
    if (topCompetitor) {
      recommendations.push({
        priority: 'medium',
        type: 'competitive',
        title: 'Match Leader Content Depth',
        description: `${topCompetitor.competitor} excels in ${topCompetitor.strengths[0]?.category}. Create superior content in this area.`,
        impact: 'Neutralize competitor advantage',
        effort: 'high',
        timeline: '3-4 weeks'
      });
    }

    // Content format recommendations
    recommendations.push({
      priority: 'medium',
      type: 'format',
      title: 'Diversify Content Formats',
      description: 'Create guides, calculators, checklists, and video content',
      impact: 'Improve engagement and time on site',
      effort: 'medium',
      timeline: 'Ongoing'
    });

    // Local content recommendation
    recommendations.push({
      priority: 'medium',
      type: 'local',
      title: 'Strengthen Local Content',
      description: 'Create suburb-specific pages for Brisbane, Ipswich, and Logan areas',
      impact: 'Improve local SEO and relevance',
      effort: 'medium',
      timeline: '2-3 weeks'
    });

    return recommendations;
  }

  // Save gap analysis report
  async saveGapAnalysisReport(report) {
    const fileName = `gap_analysis_${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(this.reportsDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(report, null, 2));
    console.log(`Gap analysis report saved to ${fileName}`);

    // Also create a summary report
    const summary = {
      date: new Date().toLocaleDateString(),
      totalGaps: report.gaps.length,
      totalOpportunities: report.opportunities.length,
      topOpportunities: report.opportunities.slice(0, 5).map(o => ({
        topic: o.topic,
        score: o.opportunityScore
      })),
      topRecommendations: report.recommendations.filter(r => r.priority === 'high'),
      competitorCoverage: report.competitorsAnalyzed.map(c => ({
        name: c.name,
        coverage: c.coverage.coveragePercentage
      }))
    };

    const summaryPath = path.join(
      this.reportsDir,
      `gap_summary_${new Date().toISOString().split('T')[0]}.json`
    );
    await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));

    return summary;
  }
}

// Export for use in other modules
module.exports = ContentGapAnalyzer;

// Run if executed directly
if (require.main === module) {
  const analyzer = new ContentGapAnalyzer(
    path.join(__dirname, '../config/competitors.json')
  );

  analyzer.initialize().then(() => {
    analyzer.performGapAnalysis().then(report => {
      console.log('\n📊 Content Gap Analysis Complete!');
      console.log(`Analyzed ${report.competitorsAnalyzed.length} competitors`);
      console.log(`Found ${report.gaps.length} content gaps`);
      console.log(`Identified ${report.opportunities.length} opportunities`);
      console.log(`Generated ${report.recommendations.length} recommendations`);

      console.log('\n🎯 Top Opportunities:');
      report.opportunities.slice(0, 5).forEach((opp, index) => {
        console.log(`${index + 1}. ${opp.topic} (Score: ${opp.opportunityScore})`);
        console.log(`   ${opp.recommendation}`);
      });

      console.log('\n📝 Priority Recommendations:');
      report.recommendations
        .filter(r => r.priority === 'high')
        .forEach((rec, index) => {
          console.log(`${index + 1}. ${rec.title}`);
          console.log(`   ${rec.description}`);
          console.log(`   Impact: ${rec.impact}`);
        });
    });
  });
}