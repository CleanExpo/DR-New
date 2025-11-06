const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const AUDIT_DIR = path.join(__dirname, 'audit-results');

if (!fs.existsSync(AUDIT_DIR)) {
  fs.mkdirSync(AUDIT_DIR, { recursive: true });
}

const PAGES_TO_TEST = [
  { path: '/', name: 'homepage' },
  { path: '/services', name: 'services' },
  { path: '/services/water-damage', name: 'water-damage' },
  { path: '/locations/brisbane', name: 'brisbane' },
  { path: '/contact', name: 'contact' },
  { path: '/insurance-claims', name: 'insurance-claims' },
  { path: '/residential', name: 'residential' },
  { path: '/services/commercial', name: 'commercial' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 375, height: 812 },
];

const auditResults = {
  timestamp: new Date().toISOString(),
  baseUrl: BASE_URL,
  pages: {},
  summary: {
    critical: [],
    high: [],
    medium: [],
    low: []
  }
};

async function auditPage(browser, pageConfig, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  const url = `${BASE_URL}${pageConfig.path}`;
  console.log(`\nAuditing: ${pageConfig.name} (${viewport.name})`);

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    if (!response || !response.ok()) {
      return {
        url,
        viewport: viewport.name,
        error: `HTTP ${response?.status() || 'unknown'} - Page failed to load`,
        issues: []
      };
    }

    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);

    // Take screenshot
    const screenshotPath = path.join(AUDIT_DIR, `${pageConfig.name}-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot saved: ${screenshotPath}`);

    const issues = [];

    // 1. VISUAL DESIGN & LAYOUT
    console.log('  Checking layout...');
    const layoutCheck = await page.evaluate(() => {
      const results = [];

      // Check for horizontal overflow
      if (document.body.scrollWidth > window.innerWidth) {
        results.push({
          category: 'Layout',
          severity: 'CRITICAL',
          issue: 'Horizontal Overflow',
          details: `Page width (${document.body.scrollWidth}px) exceeds viewport (${window.innerWidth}px)`
        });
      }

      // Check for broken images
      const images = Array.from(document.querySelectorAll('img'));
      const brokenImages = images.filter(img => !img.complete || img.naturalHeight === 0);
      if (brokenImages.length > 0) {
        results.push({
          category: 'Visual',
          severity: 'HIGH',
          issue: 'Broken Images',
          count: brokenImages.length,
          examples: brokenImages.slice(0, 3).map(img => img.src)
        });
      }

      // Check typography
      const paragraphs = Array.from(document.querySelectorAll('p'));
      const smallText = paragraphs.filter(p => {
        const fontSize = parseFloat(window.getComputedStyle(p).fontSize);
        return fontSize < 14;
      });
      if (smallText.length > 0) {
        results.push({
          category: 'Typography',
          severity: 'MEDIUM',
          issue: 'Small Font Size',
          count: smallText.length,
          note: 'Text smaller than 14px detected'
        });
      }

      // Check for very long paragraphs
      const longParagraphs = paragraphs.filter(p => p.textContent.trim().length > 500);
      if (longParagraphs.length > 2) {
        results.push({
          category: 'Content',
          severity: 'MEDIUM',
          issue: 'Long Paragraphs',
          count: longParagraphs.length,
          note: 'Consider breaking into smaller chunks or bullet points'
        });
      }

      return results;
    });
    issues.push(...layoutCheck);

    // 2. NAVIGATION & USER FLOW
    console.log('  Checking navigation...');
    const navCheck = await page.evaluate(() => {
      const results = [];

      // Check for header
      const header = document.querySelector('header') || document.querySelector('nav');
      if (!header) {
        results.push({
          category: 'Navigation',
          severity: 'CRITICAL',
          issue: 'Missing Header Navigation',
          details: 'No header or nav element found'
        });
      } else {
        const navLinks = header.querySelectorAll('a');
        if (navLinks.length < 3) {
          results.push({
            category: 'Navigation',
            severity: 'HIGH',
            issue: 'Limited Navigation Links',
            count: navLinks.length,
            note: 'Header should have more navigation options'
          });
        }
      }

      // Check for footer
      const footer = document.querySelector('footer');
      if (!footer) {
        results.push({
          category: 'Navigation',
          severity: 'MEDIUM',
          issue: 'Missing Footer',
          details: 'No footer element found'
        });
      }

      // Check for emergency contact prominence
      const phoneRegex = /(\+?61\s?)?(\(0\d\))?\s?\d{4}\s?\d{4}|1300\s?\d{3}\s?\d{3}/;
      const headerPhone = header ? phoneRegex.test(header.textContent) : false;

      if (!headerPhone) {
        results.push({
          category: 'Emergency Contact',
          severity: 'CRITICAL',
          issue: 'Phone Number Not in Header',
          details: 'For 24/7 emergency service, phone should be prominently displayed in header'
        });
      }

      // Check for 24/7 or emergency language
      const body = document.body.textContent.toLowerCase();
      const hasEmergencyLanguage = body.includes('24/7') || body.includes('emergency') || body.includes('urgent');

      if (!hasEmergencyLanguage) {
        results.push({
          category: 'Emergency Service',
          severity: 'HIGH',
          issue: 'Missing Emergency Language',
          details: 'Should prominently display 24/7 emergency service availability'
        });
      }

      // Check for prominent CTAs
      const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"], a.button'));
      const emergencyCTAs = buttons.filter(btn => {
        const text = btn.textContent.toLowerCase();
        return text.includes('contact') || text.includes('call') ||
               text.includes('emergency') || text.includes('help') || text.includes('quote');
      });

      if (emergencyCTAs.length === 0) {
        results.push({
          category: 'Call-to-Action',
          severity: 'HIGH',
          issue: 'No Emergency CTAs',
          details: 'Should have prominent "Get Emergency Help" or similar buttons'
        });
      }

      return results;
    });
    issues.push(...navCheck);

    // 3. CONTENT STRUCTURE
    console.log('  Checking content structure...');
    const contentCheck = await page.evaluate(() => {
      const results = [];

      // Check H1
      const h1s = Array.from(document.querySelectorAll('h1'));
      if (h1s.length === 0) {
        results.push({
          category: 'SEO/Content',
          severity: 'HIGH',
          issue: 'Missing H1',
          details: 'Every page must have exactly one H1 heading'
        });
      } else if (h1s.length > 1) {
        results.push({
          category: 'SEO/Content',
          severity: 'MEDIUM',
          issue: 'Multiple H1s',
          count: h1s.length,
          h1s: h1s.map(h => h.textContent.trim()).slice(0, 3)
        });
      }

      // Check heading hierarchy
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      let lastLevel = 0;
      const hierarchyIssues = [];

      headings.forEach(heading => {
        const level = parseInt(heading.tagName[1]);
        if (lastLevel > 0 && level - lastLevel > 1) {
          hierarchyIssues.push({
            from: `H${lastLevel}`,
            to: `H${level}`,
            text: heading.textContent.substring(0, 40)
          });
        }
        lastLevel = level;
      });

      if (hierarchyIssues.length > 0) {
        results.push({
          category: 'Content Structure',
          severity: 'MEDIUM',
          issue: 'Broken Heading Hierarchy',
          count: hierarchyIssues.length,
          examples: hierarchyIssues.slice(0, 3)
        });
      }

      // Check for trust signals (important for homepage/services)
      const body = document.body.textContent.toLowerCase();
      const trustSignals = {
        masterRestorer: body.includes('master restorer'),
        iicrc: body.includes('iicrc'),
        certified: body.includes('certified') || body.includes('certification'),
        insurance: body.includes('insurance')
      };

      const missingSignals = Object.entries(trustSignals)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingSignals.length > 2) {
        results.push({
          category: 'Trust Signals',
          severity: 'MEDIUM',
          issue: 'Missing Trust Signals',
          missing: missingSignals,
          note: 'Should display certifications and credentials prominently'
        });
      }

      return results;
    });
    issues.push(...contentCheck);

    // 4. INTERACTIVE ELEMENTS
    console.log('  Checking interactive elements...');
    const interactivityCheck = await page.evaluate(() => {
      const results = [];

      // Check for clickable phone numbers
      const body = document.body.innerHTML;
      const phoneRegex = /(\+?61\s?)?(\(0\d\))?\s?\d{4}\s?\d{4}|1300\s?\d{3}\s?\d{3}/g;
      const phoneMatches = body.match(phoneRegex) || [];
      const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

      if (phoneMatches.length > 0 && phoneLinks.length === 0) {
        results.push({
          category: 'Mobile UX',
          severity: 'HIGH',
          issue: 'Phone Numbers Not Clickable',
          details: `Found ${phoneMatches.length} phone numbers but none are clickable tel: links`,
          note: 'Critical for mobile emergency contacts'
        });
      }

      // Check forms
      const forms = Array.from(document.querySelectorAll('form'));
      forms.forEach((form, idx) => {
        const inputs = form.querySelectorAll('input, textarea, select');
        const labels = form.querySelectorAll('label');

        if (inputs.length > labels.length) {
          results.push({
            category: 'Forms',
            severity: 'HIGH',
            issue: 'Missing Form Labels',
            formIndex: idx,
            inputs: inputs.length,
            labels: labels.length,
            note: 'All form inputs should have associated labels'
          });
        }
      });

      // Check button cursor
      const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"]')).slice(0, 10);
      const noCursor = buttons.filter(btn => {
        const style = window.getComputedStyle(btn);
        return style.cursor !== 'pointer' && !btn.disabled;
      });

      if (noCursor.length > 0) {
        results.push({
          category: 'Interactivity',
          severity: 'LOW',
          issue: 'Buttons Missing Pointer Cursor',
          count: noCursor.length
        });
      }

      return results;
    });
    issues.push(...interactivityCheck);

    // 5. ACCESSIBILITY
    console.log('  Checking accessibility...');
    const a11yCheck = await page.evaluate(() => {
      const results = [];

      // Check for images without alt text
      const images = Array.from(document.querySelectorAll('img'));
      const missingAlt = images.filter(img => !img.alt || img.alt.trim() === '');

      if (missingAlt.length > 0) {
        results.push({
          category: 'Accessibility',
          severity: 'HIGH',
          issue: 'Images Missing Alt Text',
          count: missingAlt.length,
          examples: missingAlt.slice(0, 3).map(img => img.src)
        });
      }

      // Check for contrast issues (simplified)
      const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"]'));
      const links = Array.from(document.querySelectorAll('a'));

      const checkContrast = (element) => {
        const style = window.getComputedStyle(element);
        const color = style.color;
        const bgColor = style.backgroundColor;

        // Simple check: if both are undefined or same, likely an issue
        if (!color || !bgColor || color === bgColor) {
          return false;
        }
        return true;
      };

      const contrastIssues = [...buttons, ...links].filter(el => !checkContrast(el)).length;

      if (contrastIssues > 5) {
        results.push({
          category: 'Accessibility',
          severity: 'HIGH',
          issue: 'Potential Color Contrast Issues',
          count: contrastIssues,
          note: 'Manual WCAG contrast check recommended'
        });
      }

      // Check for focus indicators
      const interactive = Array.from(document.querySelectorAll('a, button, input, select, textarea'));
      const noFocus = interactive.filter(el => {
        const style = window.getComputedStyle(el);
        return style.outline === 'none' && !el.hasAttribute('tabindex');
      });

      if (noFocus.length > 5) {
        results.push({
          category: 'Accessibility',
          severity: 'MEDIUM',
          issue: 'Missing Focus Indicators',
          count: noFocus.length,
          note: 'Elements may lack visible focus indicators for keyboard navigation'
        });
      }

      return results;
    });
    issues.push(...a11yCheck);

    await page.close();

    return {
      url,
      viewport: viewport.name,
      screenshot: screenshotPath,
      issueCount: issues.length,
      issues
    };

  } catch (error) {
    await page.close();
    return {
      url,
      viewport: viewport.name,
      error: error.message,
      issues: []
    };
  }
}

async function runAudit() {
  console.log('='.repeat(80));
  console.log('DISASTER RECOVERY WEBSITE - UI/UX AUDIT');
  console.log('='.repeat(80));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Pages: ${PAGES_TO_TEST.length}`);
  console.log(`Viewports: ${VIEWPORTS.map(v => v.name).join(', ')}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    for (const pageConfig of PAGES_TO_TEST) {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`PAGE: ${pageConfig.name.toUpperCase()}`);
      console.log('='.repeat(60));

      auditResults.pages[pageConfig.name] = {};

      for (const viewport of VIEWPORTS) {
        const result = await auditPage(browser, pageConfig, viewport);
        auditResults.pages[pageConfig.name][viewport.name] = result;

        // Categorize issues
        if (result.issues && result.issues.length > 0) {
          result.issues.forEach(issue => {
            const severity = issue.severity.toLowerCase();
            auditResults.summary[severity].push({
              page: pageConfig.name,
              viewport: viewport.name,
              ...issue
            });
          });
        }

        console.log(`  Issues found: ${result.issueCount || 0}`);
      }
    }

    // Save results
    const resultsPath = path.join(AUDIT_DIR, 'audit-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(auditResults, null, 2));

    // Generate summary
    generateSummary();

  } finally {
    await browser.close();
  }
}

function generateSummary() {
  const { critical, high, medium, low } = auditResults.summary;

  console.log('\n\n' + '='.repeat(80));
  console.log('AUDIT SUMMARY');
  console.log('='.repeat(80));
  console.log(`\nTotal Issues Found:`);
  console.log(`  CRITICAL: ${critical.length}`);
  console.log(`  HIGH:     ${high.length}`);
  console.log(`  MEDIUM:   ${medium.length}`);
  console.log(`  LOW:      ${low.length}`);
  console.log(`  TOTAL:    ${critical.length + high.length + medium.length + low.length}`);

  if (critical.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('CRITICAL ISSUES (Fix Immediately):');
    console.log('-'.repeat(80));
    critical.forEach((issue, idx) => {
      console.log(`\n${idx + 1}. ${issue.issue}`);
      console.log(`   Page: ${issue.page} | Viewport: ${issue.viewport} | Category: ${issue.category}`);
      if (issue.details) console.log(`   Details: ${issue.details}`);
      if (issue.note) console.log(`   Note: ${issue.note}`);
    });
  }

  if (high.length > 0) {
    console.log('\n' + '-'.repeat(80));
    console.log('HIGH PRIORITY ISSUES:');
    console.log('-'.repeat(80));
    const topHigh = high.slice(0, 10);
    topHigh.forEach((issue, idx) => {
      console.log(`\n${idx + 1}. ${issue.issue}`);
      console.log(`   Page: ${issue.page} | Viewport: ${issue.viewport} | Category: ${issue.category}`);
      if (issue.details) console.log(`   Details: ${issue.details}`);
      if (issue.note) console.log(`   Note: ${issue.note}`);
    });
    if (high.length > 10) {
      console.log(`\n   ... and ${high.length - 10} more high priority issues`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Full report: ${path.join(AUDIT_DIR, 'audit-results.json')}`);
  console.log(`Screenshots: ${AUDIT_DIR}`);
  console.log('='.repeat(80) + '\n');
}

runAudit().catch(console.error);
