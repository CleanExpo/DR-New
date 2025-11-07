#!/usr/bin/env node

/**
 * Deployment Health Check Script
 * Verifies deployment status and performs health checks
 */

const https = require('https');
const http = require('http');

const CONFIG = {
  production: {
    url: 'https://disasterrecovery.com.au',
    healthEndpoints: [
      '/',
      '/api/public',
      '/services',
      '/about-phil-mcgurk'
    ]
  },
  staging: {
    url: 'https://dr-new-ten.vercel.app',
    healthEndpoints: [
      '/',
      '/api/public',
      '/services'
    ]
  }
};

const TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;

class HealthChecker {
  constructor(environment = 'production') {
    this.config = CONFIG[environment];
    this.results = [];
  }

  async checkEndpoint(endpoint, retry = 0) {
    const url = `${this.config.url}${endpoint}`;

    return new Promise((resolve) => {
      const startTime = Date.now();
      const protocol = this.config.url.startsWith('https') ? https : http;

      const req = protocol.get(url, (res) => {
        const duration = Date.now() - startTime;
        const success = res.statusCode >= 200 && res.statusCode < 400;

        resolve({
          endpoint,
          url,
          status: res.statusCode,
          duration,
          success,
          retry
        });
      });

      req.on('error', async (error) => {
        if (retry < MAX_RETRIES) {
          console.log(`⚠️  Retry ${retry + 1}/${MAX_RETRIES} for ${endpoint}`);
          await new Promise(r => setTimeout(r, 1000 * (retry + 1)));
          const result = await this.checkEndpoint(endpoint, retry + 1);
          resolve(result);
        } else {
          resolve({
            endpoint,
            url,
            status: 0,
            duration: Date.now() - startTime,
            success: false,
            error: error.message,
            retry
          });
        }
      });

      req.setTimeout(TIMEOUT, () => {
        req.destroy();
        resolve({
          endpoint,
          url,
          status: 0,
          duration: TIMEOUT,
          success: false,
          error: 'Timeout',
          retry
        });
      });
    });
  }

  async runHealthChecks() {
    console.log('\n🏥 Running Health Checks...\n');
    console.log(`Environment: ${this.config.url}\n`);

    for (const endpoint of this.config.healthEndpoints) {
      const result = await this.checkEndpoint(endpoint);
      this.results.push(result);

      const icon = result.success ? '✅' : '❌';
      const status = result.status || 'ERROR';
      console.log(`${icon} ${endpoint} - ${status} (${result.duration}ms)`);

      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    }

    return this.generateReport();
  }

  generateReport() {
    const totalChecks = this.results.length;
    const successfulChecks = this.results.filter(r => r.success).length;
    const failedChecks = totalChecks - successfulChecks;
    const avgDuration = this.results.reduce((sum, r) => sum + r.duration, 0) / totalChecks;

    const report = {
      timestamp: new Date().toISOString(),
      environment: this.config.url,
      total: totalChecks,
      successful: successfulChecks,
      failed: failedChecks,
      averageDuration: Math.round(avgDuration),
      healthy: failedChecks === 0,
      results: this.results
    };

    console.log('\n📊 Health Check Summary:');
    console.log(`   Total Checks: ${totalChecks}`);
    console.log(`   Successful: ${successfulChecks}`);
    console.log(`   Failed: ${failedChecks}`);
    console.log(`   Average Response Time: ${Math.round(avgDuration)}ms`);
    console.log(`   Status: ${report.healthy ? '✅ HEALTHY' : '❌ UNHEALTHY'}\n`);

    return report;
  }
}

// Main execution
async function main() {
  const environment = process.argv[2] || 'production';

  if (!CONFIG[environment]) {
    console.error(`❌ Invalid environment: ${environment}`);
    console.error(`Available: ${Object.keys(CONFIG).join(', ')}`);
    process.exit(1);
  }

  const checker = new HealthChecker(environment);
  const report = await checker.runHealthChecks();

  // Exit with error code if unhealthy
  process.exit(report.healthy ? 0 : 1);
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Health check failed:', error);
    process.exit(1);
  });
}

module.exports = { HealthChecker };
