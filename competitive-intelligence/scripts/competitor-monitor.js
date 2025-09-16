// Competitive Intelligence Monitoring System for DR-New
// Tracks competitors in Brisbane, Ipswich, Logan disaster recovery market

const https = require('https');
const fs = require('fs').promises;
const path = require('path');
const { JSDOM } = require('jsdom');

class CompetitorMonitor {
  constructor(configPath) {
    this.configPath = configPath;
    this.dataDir = path.join(__dirname, '../data');
    this.reportsDir = path.join(__dirname, '../reports');
    this.competitors = [];
    this.alerts = [];
  }

  async initialize() {
    try {
      const configData = await fs.readFile(this.configPath, 'utf8');
      const config = JSON.parse(configData);
      this.competitors = config.competitors;
      this.targetKeywords = config.targetKeywords;
      console.log(`Loaded ${this.competitors.length} competitors for monitoring`);
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  // Core monitoring function
  async monitorCompetitor(competitor) {
    const timestamp = new Date().toISOString();
    const monitoringData = {
      competitor: competitor.name,
      timestamp,
      website: competitor.website,
      changes: [],
      metrics: {},
      alerts: []
    };

    try {
      // Check website availability and response time
      const startTime = Date.now();
      const isAvailable = await this.checkWebsiteAvailability(competitor.website);
      const responseTime = Date.now() - startTime;

      monitoringData.metrics.websiteAvailable = isAvailable;
      monitoringData.metrics.responseTime = responseTime;

      if (isAvailable) {
        // Fetch and analyze website content
        const websiteData = await this.fetchWebsiteContent(competitor.website);

        // Check for content changes
        const contentChanges = await this.detectContentChanges(
          competitor.name,
          websiteData
        );

        if (contentChanges.length > 0) {
          monitoringData.changes = contentChanges;
          monitoringData.alerts.push({
            type: 'content_change',
            severity: 'medium',
            message: `${contentChanges.length} content changes detected on ${competitor.name}`
          });
        }

        // Extract key information
        monitoringData.metrics.pageTitle = websiteData.title;
        monitoringData.metrics.metaDescription = websiteData.metaDescription;
        monitoringData.metrics.servicesFound = this.extractServices(websiteData.content);
        monitoringData.metrics.contactInfo = this.extractContactInfo(websiteData.content);
        monitoringData.metrics.responseTimeClaim = this.extractResponseTime(websiteData.content);

        // Check for promotions or special offers
        const promotions = this.detectPromotions(websiteData.content);
        if (promotions.length > 0) {
          monitoringData.metrics.promotions = promotions;
          monitoringData.alerts.push({
            type: 'promotion_detected',
            severity: 'high',
            message: `New promotion detected on ${competitor.name}: ${promotions[0]}`
          });
        }

        // Check for new certifications or awards
        const certifications = this.detectCertifications(websiteData.content);
        if (certifications.length > 0) {
          monitoringData.metrics.certifications = certifications;
        }
      } else {
        monitoringData.alerts.push({
          type: 'website_down',
          severity: 'low',
          message: `${competitor.name} website appears to be down`
        });
      }

      // Save monitoring data
      await this.saveMonitoringData(monitoringData);

      // Process alerts if any
      if (monitoringData.alerts.length > 0) {
        await this.processAlerts(monitoringData.alerts);
      }

      return monitoringData;
    } catch (error) {
      console.error(`Error monitoring ${competitor.name}:`, error);
      monitoringData.error = error.message;
      return monitoringData;
    }
  }

  // Check website availability
  async checkWebsiteAvailability(url) {
    return new Promise((resolve) => {
      https.get(url, (res) => {
        resolve(res.statusCode === 200);
      }).on('error', () => {
        resolve(false);
      });
    });
  }

  // Fetch website content
  async fetchWebsiteContent(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const dom = new JSDOM(data);
            const document = dom.window.document;

            resolve({
              title: document.querySelector('title')?.textContent || '',
              metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
              content: document.body?.textContent || '',
              html: data
            });
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', reject);
    });
  }

  // Detect content changes
  async detectContentChanges(competitorName, currentData) {
    const changes = [];
    const previousDataPath = path.join(
      this.dataDir,
      `${competitorName.replace(/\s+/g, '_').toLowerCase()}_latest.json`
    );

    try {
      const previousData = await fs.readFile(previousDataPath, 'utf8');
      const previous = JSON.parse(previousData);

      // Compare titles
      if (previous.title !== currentData.title) {
        changes.push({
          type: 'title_change',
          old: previous.title,
          new: currentData.title
        });
      }

      // Compare meta descriptions
      if (previous.metaDescription !== currentData.metaDescription) {
        changes.push({
          type: 'meta_description_change',
          old: previous.metaDescription,
          new: currentData.metaDescription
        });
      }

      // Compare content length (significant changes)
      const contentLengthDiff = Math.abs(
        currentData.content.length - previous.content.length
      );
      if (contentLengthDiff > 500) {
        changes.push({
          type: 'significant_content_change',
          difference: contentLengthDiff,
          message: `Content ${currentData.content.length > previous.content.length ? 'increased' : 'decreased'} by ${contentLengthDiff} characters`
        });
      }
    } catch (error) {
      // No previous data exists
      console.log(`No previous data for ${competitorName}, creating baseline`);
    }

    // Save current data as latest
    await fs.writeFile(
      previousDataPath,
      JSON.stringify(currentData, null, 2)
    );

    return changes;
  }

  // Extract services mentioned on the page
  extractServices(content) {
    const services = [];
    const serviceKeywords = [
      'water damage',
      'fire damage',
      'mould remediation',
      'mold remediation',
      'storm damage',
      'flood damage',
      'sewage cleanup',
      'biohazard',
      'trauma cleaning',
      'smoke damage',
      'structural drying',
      'emergency restoration'
    ];

    serviceKeywords.forEach(keyword => {
      if (content.toLowerCase().includes(keyword)) {
        services.push(keyword);
      }
    });

    return services;
  }

  // Extract contact information
  extractContactInfo(content) {
    const contactInfo = {};

    // Phone number patterns
    const phonePattern = /1[38]00\s?\d{3}\s?\d{3}/g;
    const phones = content.match(phonePattern);
    if (phones) {
      contactInfo.phones = [...new Set(phones)];
    }

    // Email patterns
    const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = content.match(emailPattern);
    if (emails) {
      contactInfo.emails = [...new Set(emails)].filter(e =>
        !e.includes('example') && !e.includes('test')
      );
    }

    return contactInfo;
  }

  // Extract response time claims
  extractResponseTime(content) {
    const responsePatterns = [
      /(\d+)\s*hour\s*(?:emergency\s*)?response/gi,
      /response\s*(?:time|within)?\s*(\d+)\s*hour/gi,
      /24\/7\s*(?:emergency\s*)?(?:response|service)/gi,
      /rapid\s*response/gi,
      /immediate\s*response/gi
    ];

    const claims = [];
    responsePatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        claims.push(...matches);
      }
    });

    return [...new Set(claims)];
  }

  // Detect promotions and special offers
  detectPromotions(content) {
    const promotions = [];
    const promoKeywords = [
      /\d+%\s*off/gi,
      /free\s*(?:quote|assessment|inspection|consultation)/gi,
      /special\s*offer/gi,
      /limited\s*time/gi,
      /discount/gi,
      /save\s*\$/gi,
      /no\s*call\s*out\s*fee/gi,
      /pensioner\s*discount/gi
    ];

    promoKeywords.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        promotions.push(...matches);
      }
    });

    return [...new Set(promotions)];
  }

  // Detect certifications and awards
  detectCertifications(content) {
    const certifications = [];
    const certKeywords = [
      'IICRC',
      'RIA',
      'Restoration Industry Association',
      'ISO',
      'Australian Standard',
      'certified',
      'accredited',
      'award',
      'member',
      'affiliated'
    ];

    certKeywords.forEach(keyword => {
      if (content.includes(keyword)) {
        // Extract context around the keyword
        const index = content.indexOf(keyword);
        const context = content.substring(
          Math.max(0, index - 50),
          Math.min(content.length, index + 50)
        );
        certifications.push({
          keyword,
          context: context.trim()
        });
      }
    });

    return certifications;
  }

  // Save monitoring data
  async saveMonitoringData(data) {
    const date = new Date().toISOString().split('T')[0];
    const fileName = `${data.competitor.replace(/\s+/g, '_').toLowerCase()}_${date}.json`;
    const filePath = path.join(this.dataDir, fileName);

    // Append to daily log
    let existingData = [];
    try {
      const existing = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(existing);
    } catch (error) {
      // File doesn't exist yet
    }

    existingData.push(data);
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
  }

  // Process and send alerts
  async processAlerts(alerts) {
    const highPriorityAlerts = alerts.filter(a => a.severity === 'high');
    const mediumPriorityAlerts = alerts.filter(a => a.severity === 'medium');

    if (highPriorityAlerts.length > 0) {
      console.log('🚨 HIGH PRIORITY ALERTS:');
      highPriorityAlerts.forEach(alert => {
        console.log(`  - ${alert.message}`);
      });
    }

    if (mediumPriorityAlerts.length > 0) {
      console.log('⚠️  MEDIUM PRIORITY ALERTS:');
      mediumPriorityAlerts.forEach(alert => {
        console.log(`  - ${alert.message}`);
      });
    }

    // Save alerts to file
    const alertsPath = path.join(this.reportsDir, 'alerts.json');
    let allAlerts = [];
    try {
      const existing = await fs.readFile(alertsPath, 'utf8');
      allAlerts = JSON.parse(existing);
    } catch (error) {
      // No existing alerts
    }

    alerts.forEach(alert => {
      alert.timestamp = new Date().toISOString();
      allAlerts.push(alert);
    });

    await fs.writeFile(alertsPath, JSON.stringify(allAlerts, null, 2));
  }

  // Run monitoring for all competitors
  async runFullMonitoring() {
    console.log('Starting full competitor monitoring sweep...');
    const results = [];

    for (const competitor of this.competitors) {
      if (competitor.monitoring.priority === 'high' ||
          competitor.monitoring.checkFrequency === 'daily') {
        console.log(`Monitoring ${competitor.name}...`);
        const result = await this.monitorCompetitor(competitor);
        results.push(result);

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Generate summary report
    await this.generateSummaryReport(results);

    console.log('Monitoring complete!');
    return results;
  }

  // Generate summary report
  async generateSummaryReport(results) {
    const report = {
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      totalCompetitorsChecked: results.length,
      totalAlerts: results.reduce((sum, r) => sum + r.alerts.length, 0),
      totalChanges: results.reduce((sum, r) => sum + r.changes.length, 0),
      competitors: results.map(r => ({
        name: r.competitor,
        available: r.metrics.websiteAvailable,
        responseTime: r.metrics.responseTime,
        alertCount: r.alerts.length,
        changeCount: r.changes.length,
        promotions: r.metrics.promotions || [],
        responseTimeClaim: r.metrics.responseTimeClaim || []
      })),
      highPriorityAlerts: results
        .flatMap(r => r.alerts)
        .filter(a => a.severity === 'high')
    };

    const reportPath = path.join(
      this.reportsDir,
      `summary_${new Date().toISOString().split('T')[0]}.json`
    );
    await fs.writeFile(reportPath, JSON.stringify(report, null, 2));

    return report;
  }
}

// Run monitoring if executed directly
if (require.main === module) {
  const monitor = new CompetitorMonitor(
    path.join(__dirname, '../config/competitors.json')
  );

  monitor.initialize().then(() => {
    monitor.runFullMonitoring();
  });
}

module.exports = CompetitorMonitor;