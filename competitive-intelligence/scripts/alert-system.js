// Alert System for Competitive Intelligence
// Monitors for significant changes and triggers notifications

const fs = require('fs').promises;
const path = require('path');
const EventEmitter = require('events');

class AlertSystem extends EventEmitter {
  constructor() {
    super();
    this.alertsDir = path.join(__dirname, '../reports/alerts');
    this.configPath = path.join(__dirname, '../config/alert-rules.json');
    this.alertRules = {};
    this.alertHistory = [];
    this.notificationChannels = [];
  }

  async initialize() {
    try {
      // Ensure directories exist
      await fs.mkdir(this.alertsDir, { recursive: true });

      // Load alert rules
      await this.loadAlertRules();

      console.log('Alert system initialized');
    } catch (error) {
      console.error('Error initializing alert system:', error);
    }
  }

  async loadAlertRules() {
    const defaultRules = {
      websiteChanges: {
        enabled: true,
        priority: 'medium',
        conditions: {
          contentChange: { threshold: 500, unit: 'characters' },
          titleChange: { enabled: true },
          metaDescriptionChange: { enabled: true }
        }
      },
      promotions: {
        enabled: true,
        priority: 'high',
        keywords: ['discount', 'off', 'free', 'special', 'limited', 'save'],
        competitors: ['all']
      },
      rankingChanges: {
        enabled: true,
        conditions: {
          positionDrop: { threshold: 5, priority: 'high' },
          positionGain: { threshold: 5, priority: 'medium' },
          newCompetitor: { priority: 'high' },
          lostRanking: { priority: 'high' }
        }
      },
      responseTimeClaims: {
        enabled: true,
        priority: 'high',
        triggers: ['1 hour', '30 minute', 'immediate', 'rapid']
      },
      newServices: {
        enabled: true,
        priority: 'medium',
        serviceKeywords: [
          'water damage', 'fire damage', 'mould', 'storm',
          'biohazard', 'trauma', 'sewage', 'flood'
        ]
      },
      technicalIssues: {
        enabled: true,
        priority: 'low',
        conditions: {
          websiteDown: { enabled: true },
          slowResponse: { threshold: 5000, unit: 'ms' }
        }
      },
      reviewActivity: {
        enabled: true,
        conditions: {
          negativeReviewSpike: { threshold: 3, period: '7days', priority: 'high' },
          positiveReviewSpike: { threshold: 5, period: '7days', priority: 'medium' },
          reviewResponseTime: { threshold: 24, unit: 'hours', priority: 'low' }
        }
      }
    };

    try {
      const rulesData = await fs.readFile(this.configPath, 'utf8');
      this.alertRules = JSON.parse(rulesData);
    } catch (error) {
      // Use default rules if config doesn't exist
      this.alertRules = defaultRules;
      await fs.writeFile(this.configPath, JSON.stringify(defaultRules, null, 2));
    }
  }

  // Process monitoring data for alerts
  async processMonitoringData(monitoringData) {
    const alerts = [];

    // Check website changes
    if (this.alertRules.websiteChanges?.enabled) {
      const websiteAlerts = this.checkWebsiteChanges(monitoringData);
      alerts.push(...websiteAlerts);
    }

    // Check for promotions
    if (this.alertRules.promotions?.enabled) {
      const promoAlerts = this.checkPromotions(monitoringData);
      alerts.push(...promoAlerts);
    }

    // Check response time claims
    if (this.alertRules.responseTimeClaims?.enabled) {
      const responseAlerts = this.checkResponseTimeClaims(monitoringData);
      alerts.push(...responseAlerts);
    }

    // Process all alerts
    for (const alert of alerts) {
      await this.triggerAlert(alert);
    }

    return alerts;
  }

  // Check for website changes
  checkWebsiteChanges(data) {
    const alerts = [];

    if (data.changes && data.changes.length > 0) {
      for (const change of data.changes) {
        if (change.type === 'title_change') {
          alerts.push({
            type: 'website_change',
            subtype: 'title_change',
            competitor: data.competitor,
            priority: 'medium',
            title: `Title Change Detected - ${data.competitor}`,
            message: `Changed from "${change.old}" to "${change.new}"`,
            timestamp: new Date().toISOString(),
            data: change
          });
        }

        if (change.type === 'significant_content_change') {
          const threshold = this.alertRules.websiteChanges.conditions.contentChange.threshold;
          if (change.difference > threshold) {
            alerts.push({
              type: 'website_change',
              subtype: 'content_change',
              competitor: data.competitor,
              priority: 'medium',
              title: `Significant Content Update - ${data.competitor}`,
              message: change.message,
              timestamp: new Date().toISOString(),
              data: change
            });
          }
        }
      }
    }

    return alerts;
  }

  // Check for promotions
  checkPromotions(data) {
    const alerts = [];

    if (data.metrics?.promotions && data.metrics.promotions.length > 0) {
      for (const promotion of data.metrics.promotions) {
        alerts.push({
          type: 'promotion',
          competitor: data.competitor,
          priority: 'high',
          title: `New Promotion Detected - ${data.competitor}`,
          message: `Promotion found: "${promotion}"`,
          timestamp: new Date().toISOString(),
          data: { promotion },
          actionRequired: true,
          suggestedActions: [
            'Review competitor promotion terms',
            'Consider matching or counter-offer',
            'Update pricing strategy if needed',
            'Monitor customer response'
          ]
        });
      }
    }

    return alerts;
  }

  // Check response time claims
  checkResponseTimeClaims(data) {
    const alerts = [];

    if (data.metrics?.responseTimeClaim && data.metrics.responseTimeClaim.length > 0) {
      const claims = data.metrics.responseTimeClaim;
      const triggers = this.alertRules.responseTimeClaims.triggers;

      for (const claim of claims) {
        const claimLower = claim.toLowerCase();
        for (const trigger of triggers) {
          if (claimLower.includes(trigger)) {
            alerts.push({
              type: 'response_time_claim',
              competitor: data.competitor,
              priority: 'high',
              title: `Response Time Claim - ${data.competitor}`,
              message: `Competitor claims: "${claim}"`,
              timestamp: new Date().toISOString(),
              data: { claim },
              actionRequired: true,
              suggestedActions: [
                'Verify if claim is new or updated',
                'Compare with our response time',
                'Update our messaging if we can match/beat',
                'Monitor if claim affects their rankings'
              ]
            });
            break;
          }
        }
      }
    }

    return alerts;
  }

  // Process SEO ranking changes
  async processSEORankingChanges(currentRankings, historicalRankings) {
    const alerts = [];

    if (!this.alertRules.rankingChanges?.enabled) {
      return alerts;
    }

    const conditions = this.alertRules.rankingChanges.conditions;

    // Compare rankings for each keyword
    for (const current of currentRankings.keywords) {
      const historical = historicalRankings?.keywords?.find(
        h => h.keyword === current.keyword
      );

      if (historical) {
        const currentOur = current.topResults.find(
          r => r.competitor === 'DR-New (Our Site)'
        );
        const historicalOur = historical.topResults.find(
          r => r.competitor === 'DR-New (Our Site)'
        );

        // Check position drops
        if (currentOur && historicalOur) {
          const drop = currentOur.position - historicalOur.position;
          if (drop >= conditions.positionDrop.threshold) {
            alerts.push({
              type: 'ranking_drop',
              priority: conditions.positionDrop.priority,
              title: `Ranking Drop Alert`,
              message: `Dropped ${drop} positions for "${current.keyword}" (now #${currentOur.position})`,
              keyword: current.keyword,
              previousPosition: historicalOur.position,
              currentPosition: currentOur.position,
              timestamp: new Date().toISOString(),
              actionRequired: true,
              suggestedActions: [
                'Analyze competitor content that outranks us',
                'Check for technical SEO issues',
                'Review recent content changes',
                'Consider content refresh or expansion'
              ]
            });
          }

          // Check position gains
          const gain = historicalOur.position - currentOur.position;
          if (gain >= conditions.positionGain.threshold) {
            alerts.push({
              type: 'ranking_gain',
              priority: conditions.positionGain.priority,
              title: `Ranking Improvement`,
              message: `Gained ${gain} positions for "${current.keyword}" (now #${currentOur.position})`,
              keyword: current.keyword,
              previousPosition: historicalOur.position,
              currentPosition: currentOur.position,
              timestamp: new Date().toISOString()
            });
          }
        }

        // Check for lost rankings
        if (historicalOur && !currentOur) {
          alerts.push({
            type: 'ranking_lost',
            priority: conditions.lostRanking.priority,
            title: `Lost Ranking`,
            message: `No longer ranking for "${current.keyword}" (was #${historicalOur.position})`,
            keyword: current.keyword,
            previousPosition: historicalOur.position,
            timestamp: new Date().toISOString(),
            actionRequired: true,
            suggestedActions: [
              'Check if page was deindexed',
              'Review for potential penalties',
              'Analyze competitor strategies',
              'Create new optimized content'
            ]
          });
        }

        // Check for new competitors
        const newCompetitors = current.topResults
          .filter(c => c.competitor !== 'DR-New (Our Site)')
          .filter(c => !historical.topResults.some(h => h.competitor === c.competitor))
          .map(c => c.competitor);

        if (newCompetitors.length > 0) {
          alerts.push({
            type: 'new_competitor',
            priority: conditions.newCompetitor.priority,
            title: `New Competitor in SERPs`,
            message: `New competitors ranking for "${current.keyword}": ${newCompetitors.join(', ')}`,
            keyword: current.keyword,
            competitors: newCompetitors,
            timestamp: new Date().toISOString(),
            actionRequired: true,
            suggestedActions: [
              'Analyze new competitor content',
              'Review their backlink profile',
              'Assess their service offerings',
              'Update competitive strategy'
            ]
          });
        }
      }
    }

    return alerts;
  }

  // Trigger an alert
  async triggerAlert(alert) {
    // Add to history
    this.alertHistory.push(alert);

    // Emit event for real-time notifications
    this.emit('alert', alert);

    // Save to file
    await this.saveAlert(alert);

    // Send notifications based on priority
    if (alert.priority === 'high') {
      await this.sendHighPriorityNotification(alert);
    } else if (alert.priority === 'medium') {
      await this.sendMediumPriorityNotification(alert);
    }

    // Log to console
    this.logAlert(alert);
  }

  // Save alert to file
  async saveAlert(alert) {
    const date = new Date().toISOString().split('T')[0];
    const fileName = `alerts_${date}.json`;
    const filePath = path.join(this.alertsDir, fileName);

    let alerts = [];
    try {
      const existing = await fs.readFile(filePath, 'utf8');
      alerts = JSON.parse(existing);
    } catch (error) {
      // File doesn't exist yet
    }

    alerts.push(alert);
    await fs.writeFile(filePath, JSON.stringify(alerts, null, 2));
  }

  // Send high priority notification
  async sendHighPriorityNotification(alert) {
    // In production, this would send email/SMS/Slack notifications
    console.log('🚨 HIGH PRIORITY ALERT 🚨');
    console.log(`Title: ${alert.title}`);
    console.log(`Message: ${alert.message}`);

    if (alert.actionRequired && alert.suggestedActions) {
      console.log('Suggested Actions:');
      alert.suggestedActions.forEach((action, index) => {
        console.log(`  ${index + 1}. ${action}`);
      });
    }
  }

  // Send medium priority notification
  async sendMediumPriorityNotification(alert) {
    // In production, this would send email notifications
    console.log('⚠️  MEDIUM PRIORITY ALERT');
    console.log(`Title: ${alert.title}`);
    console.log(`Message: ${alert.message}`);
  }

  // Log alert to console
  logAlert(alert) {
    const emoji = {
      high: '🔴',
      medium: '🟡',
      low: '🔵'
    };

    console.log(`\n${emoji[alert.priority] || '⚪'} ${alert.title}`);
    console.log(`   ${alert.message}`);
    console.log(`   Time: ${new Date(alert.timestamp).toLocaleString()}`);
  }

  // Get alert summary
  async getAlertSummary(days = 7) {
    const summary = {
      period: `${days} days`,
      totalAlerts: 0,
      byPriority: {
        high: 0,
        medium: 0,
        low: 0
      },
      byType: {},
      byCompetitor: {},
      recentAlerts: []
    };

    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    // Read alert files for the period
    const files = await fs.readdir(this.alertsDir);
    for (const file of files) {
      if (file.startsWith('alerts_') && file.endsWith('.json')) {
        const filePath = path.join(this.alertsDir, file);
        const data = await fs.readFile(filePath, 'utf8');
        const alerts = JSON.parse(data);

        for (const alert of alerts) {
          const alertDate = new Date(alert.timestamp);
          if (alertDate >= cutoffDate) {
            summary.totalAlerts++;

            // By priority
            summary.byPriority[alert.priority] =
              (summary.byPriority[alert.priority] || 0) + 1;

            // By type
            summary.byType[alert.type] =
              (summary.byType[alert.type] || 0) + 1;

            // By competitor
            if (alert.competitor) {
              summary.byCompetitor[alert.competitor] =
                (summary.byCompetitor[alert.competitor] || 0) + 1;
            }

            // Add to recent alerts
            summary.recentAlerts.push(alert);
          }
        }
      }
    }

    // Sort recent alerts by timestamp
    summary.recentAlerts.sort((a, b) =>
      new Date(b.timestamp) - new Date(a.timestamp)
    );

    // Keep only top 10 recent alerts
    summary.recentAlerts = summary.recentAlerts.slice(0, 10);

    return summary;
  }

  // Generate alert report
  async generateAlertReport() {
    const summary = await this.getAlertSummary();

    const report = {
      generatedAt: new Date().toISOString(),
      summary,
      analysis: {
        mostActiveCompetitor: Object.entries(summary.byCompetitor)
          .sort((a, b) => b[1] - a[1])[0],
        mostCommonAlertType: Object.entries(summary.byType)
          .sort((a, b) => b[1] - a[1])[0],
        urgentActions: summary.recentAlerts
          .filter(a => a.actionRequired && a.priority === 'high')
          .map(a => ({
            alert: a.title,
            actions: a.suggestedActions
          }))
      },
      recommendations: []
    };

    // Generate recommendations based on alerts
    if (summary.byType.promotion > 3) {
      report.recommendations.push({
        priority: 'high',
        recommendation: 'Multiple competitor promotions detected',
        action: 'Consider launching competitive pricing or value-add campaign'
      });
    }

    if (summary.byType.ranking_drop > 2) {
      report.recommendations.push({
        priority: 'high',
        recommendation: 'Multiple ranking drops detected',
        action: 'Conduct comprehensive SEO audit and content refresh'
      });
    }

    if (summary.byType.new_competitor > 0) {
      report.recommendations.push({
        priority: 'medium',
        recommendation: 'New competitors entering market',
        action: 'Update competitive analysis and differentiation strategy'
      });
    }

    // Save report
    const reportPath = path.join(
      this.alertsDir,
      `alert_report_${new Date().toISOString().split('T')[0]}.json`
    );
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    return report;
  }
}

// Export for use in other modules
module.exports = AlertSystem;

// Run if executed directly
if (require.main === module) {
  const alertSystem = new AlertSystem();

  alertSystem.initialize().then(async () => {
    console.log('Alert System Active');
    console.log('Monitoring for competitive intelligence alerts...\n');

    // Generate sample alerts for testing
    const sampleData = {
      competitor: 'Steamatic Brisbane',
      changes: [
        {
          type: 'title_change',
          old: 'Water Damage Restoration Brisbane',
          new: '24/7 Emergency Water Damage Brisbane - Fast Response'
        }
      ],
      metrics: {
        promotions: ['20% off water damage restoration this month'],
        responseTimeClaim: ['30 minute emergency response guaranteed']
      }
    };

    // Process sample data
    const alerts = await alertSystem.processMonitoringData(sampleData);
    console.log(`\nGenerated ${alerts.length} alerts from sample data`);

    // Generate alert report
    const report = await alertSystem.generateAlertReport();
    console.log('\n📊 Alert Report Generated');
    console.log(`Total alerts (7 days): ${report.summary.totalAlerts}`);
    console.log(`High priority: ${report.summary.byPriority.high}`);
    console.log(`Recommendations: ${report.recommendations.length}`);
  });
}