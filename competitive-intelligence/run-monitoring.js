#!/usr/bin/env node

// Main Orchestrator for DR-New Competitive Intelligence System
// Runs all monitoring components and generates comprehensive reports

const path = require('path');
const fs = require('fs').promises;

// Import all monitoring modules
const CompetitorMonitor = require('./scripts/competitor-monitor');
const SEORankingTracker = require('./scripts/seo-ranking-tracker');
const ContentGapAnalyzer = require('./scripts/content-gap-analyzer');
const AlertSystem = require('./scripts/alert-system');
const ReportGenerator = require('./scripts/report-generator');

class CompetitiveIntelligenceSystem {
  constructor() {
    this.configPath = path.join(__dirname, 'config/competitors.json');
    this.logPath = path.join(__dirname, 'logs');
    this.components = {};
    this.startTime = null;
  }

  async initialize() {
    console.log('🚀 DR-New Competitive Intelligence System Starting...');
    console.log('═══════════════════════════════════════════════════\n');

    // Ensure logs directory exists
    await fs.mkdir(this.logPath, { recursive: true });

    // Initialize all components
    try {
      console.log('📦 Initializing components...');

      this.components.monitor = new CompetitorMonitor(this.configPath);
      await this.components.monitor.initialize();
      console.log('  ✅ Competitor Monitor ready');

      this.components.seoTracker = new SEORankingTracker(this.configPath);
      await this.components.seoTracker.initialize();
      console.log('  ✅ SEO Ranking Tracker ready');

      this.components.contentAnalyzer = new ContentGapAnalyzer(this.configPath);
      await this.components.contentAnalyzer.initialize();
      console.log('  ✅ Content Gap Analyzer ready');

      this.components.alertSystem = new AlertSystem();
      await this.components.alertSystem.initialize();
      console.log('  ✅ Alert System ready');

      this.components.reportGenerator = new ReportGenerator();
      await this.components.reportGenerator.initialize();
      console.log('  ✅ Report Generator ready');

      console.log('\n✨ All components initialized successfully!\n');
    } catch (error) {
      console.error('❌ Error initializing components:', error);
      process.exit(1);
    }
  }

  async runDailyMonitoring() {
    console.log('📊 Running Daily Monitoring Sweep');
    console.log('───────────────────────────────────');
    this.startTime = Date.now();

    const results = {
      timestamp: new Date().toISOString(),
      monitoringType: 'daily',
      results: {}
    };

    try {
      // 1. Monitor competitor websites
      console.log('\n1️⃣  Monitoring Competitor Websites...');
      const monitoringResults = await this.components.monitor.runFullMonitoring();
      results.results.websiteMonitoring = {
        competitorsChecked: monitoringResults.length,
        changesDetected: monitoringResults.reduce((sum, r) => sum + r.changes.length, 0),
        alertsGenerated: monitoringResults.reduce((sum, r) => sum + r.alerts.length, 0)
      };

      // Process alerts for each monitoring result
      for (const result of monitoringResults) {
        if (result.alerts && result.alerts.length > 0) {
          await this.components.alertSystem.processMonitoringData(result);
        }
      }

      // 2. Track SEO rankings
      console.log('\n2️⃣  Tracking SEO Rankings...');
      const rankingResults = await this.components.seoTracker.trackAllRankings();
      results.results.seoTracking = {
        keywordsTracked: rankingResults.keywords.length,
        opportunities: rankingResults.opportunities.length,
        threats: rankingResults.threats.length
      };

      // Process SEO ranking changes for alerts
      const historicalComparison = await this.components.seoTracker.compareWithHistorical(1);
      if (historicalComparison) {
        const seoAlerts = await this.components.alertSystem.processSEORankingChanges(
          rankingResults,
          historicalComparison
        );
        results.results.seoTracking.alerts = seoAlerts.length;
      }

      // 3. Content gap analysis (weekly)
      const dayOfWeek = new Date().getDay();
      if (dayOfWeek === 1) { // Monday
        console.log('\n3️⃣  Performing Weekly Content Gap Analysis...');
        const contentResults = await this.components.contentAnalyzer.performGapAnalysis();
        results.results.contentAnalysis = {
          competitorsAnalyzed: contentResults.competitorsAnalyzed.length,
          gaps: contentResults.gaps.length,
          opportunities: contentResults.opportunities.length
        };
      }

      // 4. Generate daily summary
      console.log('\n4️⃣  Generating Daily Summary...');
      const alertSummary = await this.components.alertSystem.getAlertSummary(1);
      results.results.alertSummary = alertSummary;

      // Save daily results
      await this.saveDailyResults(results);

      // 5. Generate weekly report (on Fridays)
      if (dayOfWeek === 5) { // Friday
        console.log('\n5️⃣  Generating Weekly Report...');
        const weeklyReport = await this.components.reportGenerator.generateWeeklyReport();
        console.log('  ✅ Weekly report generated successfully');
      }

      // Print summary
      this.printDailySummary(results);

    } catch (error) {
      console.error('\n❌ Error during monitoring:', error);
      results.error = error.message;
    }

    const duration = ((Date.now() - this.startTime) / 1000).toFixed(1);
    console.log(`\n⏱️  Total execution time: ${duration} seconds`);

    return results;
  }

  async runQuickCheck() {
    console.log('⚡ Running Quick Competitive Check');
    console.log('───────────────────────────────────');

    const quickResults = {
      timestamp: new Date().toISOString(),
      monitoringType: 'quick',
      results: {}
    };

    try {
      // Quick check on high-priority competitors only
      const config = JSON.parse(await fs.readFile(this.configPath, 'utf8'));
      const highPriorityCompetitors = config.competitors.filter(c =>
        c.monitoring.priority === 'high'
      );

      console.log(`\n🎯 Checking ${highPriorityCompetitors.length} high-priority competitors...`);

      for (const competitor of highPriorityCompetitors) {
        console.log(`  • ${competitor.name}...`);
        const result = await this.components.monitor.monitorCompetitor(competitor);

        if (result.alerts && result.alerts.length > 0) {
          console.log(`    ⚠️  ${result.alerts.length} alerts detected`);
          await this.components.alertSystem.processMonitoringData(result);
        } else {
          console.log(`    ✅ No changes detected`);
        }
      }

      // Get recent alerts
      const alertSummary = await this.components.alertSystem.getAlertSummary(1);
      quickResults.results.alertSummary = alertSummary;

      if (alertSummary.totalAlerts > 0) {
        console.log(`\n🔔 ${alertSummary.totalAlerts} total alerts in last 24 hours`);
        console.log(`   High: ${alertSummary.byPriority.high || 0}`);
        console.log(`   Medium: ${alertSummary.byPriority.medium || 0}`);
        console.log(`   Low: ${alertSummary.byPriority.low || 0}`);
      }

    } catch (error) {
      console.error('\n❌ Error during quick check:', error);
      quickResults.error = error.message;
    }

    return quickResults;
  }

  async saveDailyResults(results) {
    const fileName = `daily_${new Date().toISOString().split('T')[0]}.json`;
    const filePath = path.join(this.logPath, fileName);
    await fs.writeFile(filePath, JSON.stringify(results, null, 2));
    console.log(`\n💾 Daily results saved to logs/${fileName}`);
  }

  printDailySummary(results) {
    console.log('\n═══════════════════════════════════════════════════');
    console.log('📈 DAILY MONITORING SUMMARY');
    console.log('═══════════════════════════════════════════════════');

    if (results.results.websiteMonitoring) {
      console.log('\n🌐 Website Monitoring:');
      console.log(`   • Competitors checked: ${results.results.websiteMonitoring.competitorsChecked}`);
      console.log(`   • Changes detected: ${results.results.websiteMonitoring.changesDetected}`);
      console.log(`   • Alerts generated: ${results.results.websiteMonitoring.alertsGenerated}`);
    }

    if (results.results.seoTracking) {
      console.log('\n🔍 SEO Tracking:');
      console.log(`   • Keywords tracked: ${results.results.seoTracking.keywordsTracked}`);
      console.log(`   • Opportunities found: ${results.results.seoTracking.opportunities}`);
      console.log(`   • Threats identified: ${results.results.seoTracking.threats}`);
    }

    if (results.results.alertSummary) {
      const summary = results.results.alertSummary;
      console.log('\n🚨 Alert Summary:');
      console.log(`   • Total alerts: ${summary.totalAlerts}`);
      if (summary.byPriority.high > 0) {
        console.log(`   • ⚠️  HIGH PRIORITY: ${summary.byPriority.high}`);
      }
      if (summary.byPriority.medium > 0) {
        console.log(`   • 🔶 Medium priority: ${summary.byPriority.medium}`);
      }
    }

    console.log('\n═══════════════════════════════════════════════════');
  }

  async runContinuousMonitoring(intervalMinutes = 60) {
    console.log(`🔄 Starting continuous monitoring (every ${intervalMinutes} minutes)`);
    console.log('Press Ctrl+C to stop\n');

    // Run initial check
    await this.runQuickCheck();

    // Set up interval
    const interval = setInterval(async () => {
      console.log(`\n\n🔄 Running scheduled check at ${new Date().toLocaleTimeString()}`);
      await this.runQuickCheck();
    }, intervalMinutes * 60 * 1000);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n\n👋 Stopping continuous monitoring...');
      clearInterval(interval);
      process.exit(0);
    });
  }

  async generateOnDemandReport(reportType = 'comprehensive') {
    console.log(`📄 Generating ${reportType} report...`);

    try {
      switch (reportType) {
        case 'weekly':
          const weeklyReport = await this.components.reportGenerator.generateWeeklyReport();
          console.log('✅ Weekly report generated');
          return weeklyReport;

        case 'alerts':
          const alertReport = await this.components.alertSystem.generateAlertReport();
          console.log('✅ Alert report generated');
          return alertReport;

        case 'seo':
          const seoResults = await this.components.seoTracker.trackAllRankings();
          console.log('✅ SEO report generated');
          return seoResults;

        case 'content':
          const contentReport = await this.components.contentAnalyzer.performGapAnalysis();
          console.log('✅ Content gap report generated');
          return contentReport;

        case 'comprehensive':
        default:
          // Run everything and generate comprehensive report
          await this.runDailyMonitoring();
          const comprehensiveReport = await this.components.reportGenerator.generateWeeklyReport();
          console.log('✅ Comprehensive report generated');
          return comprehensiveReport;
      }
    } catch (error) {
      console.error('❌ Error generating report:', error);
      throw error;
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'daily';

  const system = new CompetitiveIntelligenceSystem();
  await system.initialize();

  switch (command) {
    case 'daily':
      await system.runDailyMonitoring();
      break;

    case 'quick':
      await system.runQuickCheck();
      break;

    case 'continuous':
      const interval = parseInt(args[1]) || 60;
      await system.runContinuousMonitoring(interval);
      break;

    case 'report':
      const reportType = args[1] || 'comprehensive';
      await system.generateOnDemandReport(reportType);
      break;

    case 'help':
    default:
      console.log(`
📚 DR-New Competitive Intelligence System

Usage: node run-monitoring.js [command] [options]

Commands:
  daily       Run complete daily monitoring sweep (default)
  quick       Quick check of high-priority competitors
  continuous  Run continuous monitoring (optional: interval in minutes)
  report      Generate report (optional: weekly|alerts|seo|content|comprehensive)
  help        Show this help message

Examples:
  node run-monitoring.js daily
  node run-monitoring.js quick
  node run-monitoring.js continuous 30
  node run-monitoring.js report weekly
  node run-monitoring.js report seo

Configuration:
  Edit config/competitors.json to modify monitored competitors
  Edit config/alert-rules.json to modify alert thresholds

Output:
  Reports are saved in: reports/
  Monitoring data is saved in: data/
  Logs are saved in: logs/
      `);
      break;
  }
}

// Run the system
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = CompetitiveIntelligenceSystem;