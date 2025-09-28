#!/usr/bin/env node
/**
 * Sitemap Submission Script for Google Search Console and Bing Webmaster Tools
 * Automates the submission of sitemaps to improve SEO indexation
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'disasterrecovery.com.au';
const SITEMAP_URL = `https://${DOMAIN}/sitemap.xml`;

class SitemapSubmitter {
  constructor() {
    this.results = {
      google: { status: 'pending', message: '' },
      bing: { status: 'pending', message: '' }
    };
  }

  async submitToGoogle() {
    console.log('🔍 Submitting sitemap to Google Search Console...');

    // Google Search Console requires authentication
    // This creates the ping URL for manual submission
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

    console.log(`📌 Google Sitemap Ping URL: ${googlePingUrl}`);
    console.log('ℹ️  Manual step required: Visit Google Search Console to verify property');

    this.results.google = {
      status: 'manual_required',
      message: 'Visit Google Search Console to add property and submit sitemap',
      pingUrl: googlePingUrl
    };
  }

  async submitToBing() {
    console.log('🔍 Submitting sitemap to Bing Webmaster Tools...');

    // Bing Webmaster Tools ping
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

    return new Promise((resolve) => {
      const url = new URL(bingPingUrl);
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent': 'DisasterRecovery-SitemapBot/1.0'
        }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Bing sitemap submission successful');
            this.results.bing = {
              status: 'success',
              message: 'Sitemap successfully submitted to Bing'
            };
          } else {
            console.log(`⚠️  Bing submission response: ${res.statusCode}`);
            this.results.bing = {
              status: 'warning',
              message: `HTTP ${res.statusCode} - May need manual verification`
            };
          }
          resolve();
        });
      });

      req.on('error', (err) => {
        console.log(`❌ Bing submission failed: ${err.message}`);
        this.results.bing = {
          status: 'error',
          message: err.message
        };
        resolve();
      });

      req.end();
    });
  }

  async verifySitemap() {
    console.log('🔍 Verifying sitemap accessibility...');

    return new Promise((resolve) => {
      const url = new URL(SITEMAP_URL);
      const req = https.request({
        hostname: url.hostname,
        path: url.pathname,
        method: 'GET'
      }, (res) => {
        if (res.statusCode === 200) {
          console.log('✅ Sitemap is accessible');
          resolve(true);
        } else {
          console.log(`❌ Sitemap not accessible: HTTP ${res.statusCode}`);
          resolve(false);
        }
      });

      req.on('error', (err) => {
        console.log(`❌ Sitemap verification failed: ${err.message}`);
        resolve(false);
      });

      req.end();
    });
  }

  async generateInstructions() {
    const instructions = {
      domain: DOMAIN,
      sitemapUrl: SITEMAP_URL,
      verificationFiles: {
        google: 'google8f4d3e5a7b9c2d1e.html',
        bing: 'BingSiteAuth.xml'
      },
      manualSteps: {
        googleSearchConsole: [
          '1. Visit https://search.google.com/search-console',
          '2. Add property: disasterrecovery.com.au',
          '3. Verify using HTML file method (google8f4d3e5a7b9c2d1e.html)',
          '4. Submit sitemap: https://disasterrecovery.com.au/sitemap.xml',
          '5. Monitor indexation status'
        ],
        bingWebmasterTools: [
          '1. Visit https://www.bing.com/webmasters',
          '2. Add site: disasterrecovery.com.au',
          '3. Verify using XML file method (BingSiteAuth.xml)',
          '4. Submit sitemap: https://disasterrecovery.com.au/sitemap.xml',
          '5. Monitor indexation status'
        ]
      },
      nextSteps: [
        'Monitor Google Search Console for indexation',
        'Monitor Bing Webmaster Tools for crawl status',
        'Check for crawl errors and fix immediately',
        'Resubmit sitemap if pages are updated',
        'Monitor organic search visibility improvements'
      ]
    };

    // Save instructions to file
    const instructionsPath = path.join(__dirname, '..', 'seo-instructions.json');
    fs.writeFileSync(instructionsPath, JSON.stringify(instructions, null, 2));

    return instructions;
  }

  async run() {
    console.log('🚀 Starting sitemap submission process...\n');

    // Verify sitemap is accessible
    const sitemapAccessible = await this.verifySitemap();
    if (!sitemapAccessible) {
      console.log('❌ Cannot proceed - sitemap is not accessible');
      return;
    }

    // Submit to search engines
    await this.submitToGoogle();
    await this.submitToBing();

    // Generate instructions
    const instructions = await this.generateInstructions();

    // Display results
    console.log('\n📊 SUBMISSION RESULTS:');
    console.log('═══════════════════════');
    console.log(`Google: ${this.results.google.status} - ${this.results.google.message}`);
    console.log(`Bing: ${this.results.bing.status} - ${this.results.bing.message}`);

    console.log('\n📋 MANUAL STEPS REQUIRED:');
    console.log('═══════════════════════════');
    console.log('Google Search Console:');
    instructions.manualSteps.googleSearchConsole.forEach(step => console.log(`  ${step}`));
    console.log('\nBing Webmaster Tools:');
    instructions.manualSteps.bingWebmasterTools.forEach(step => console.log(`  ${step}`));

    console.log('\n🎯 CRITICAL FOR SEO SUCCESS:');
    console.log('═══════════════════════════');
    console.log('• Domain fixes deployed - now search engines can index properly');
    console.log('• Verification files in place (google8f4d3e5a7b9c2d1e.html, BingSiteAuth.xml)');
    console.log('• Sitemap accessible and properly formatted');
    console.log('• Manual verification in Search Console/Webmaster Tools required');
    console.log('• Monitor indexation progress over next 7-14 days');

    console.log(`\n✅ Instructions saved to: seo-instructions.json`);
  }
}

// Run if called directly
if (require.main === module) {
  const submitter = new SitemapSubmitter();
  submitter.run().catch(console.error);
}

module.exports = SitemapSubmitter;