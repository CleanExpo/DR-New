const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://disasterrecovery.com.au';
const AUDIT_DIR = path.join(__dirname, 'audit-results');

// Ensure audit directory exists
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
  globalIssues: [],
  prioritizedRecommendations: {
    critical: [],
    high: [],
    medium: [],
    low: []
  }
};

async function checkAccessibility(page, pageName) {
  const issues = [];

  // Check color contrast
  const contrastIssues = await page.evaluate(() => {
    const issues = [];
    const elements = document.querySelectorAll('*');

    function getContrast(rgb1, rgb2) {
      function getLuminance(rgb) {
        const [r, g, b] = rgb.map(val => {
          val = val / 255;
          return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
      }

      const l1 = getLuminance(rgb1);
      const l2 = getLuminance(rgb2);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    function parseRgb(color) {
      const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
    }

    // Sample text elements for contrast checking
    const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, li'))
      .slice(0, 50); // Limit to first 50 for performance

    textElements.forEach(el => {
      const style = window.getComputedStyle(el);
      const color = parseRgb(style.color);
      const bgColor = parseRgb(style.backgroundColor);

      if (color && bgColor && bgColor[0] !== 0 && bgColor[1] !== 0 && bgColor[2] !== 0) {
        const contrast = getContrast(color, bgColor);
        const fontSize = parseFloat(style.fontSize);
        const required = fontSize >= 18 ? 3 : 4.5;

        if (contrast < required) {
          issues.push({
            element: el.tagName,
            text: el.textContent.substring(0, 50),
            contrast: contrast.toFixed(2),
            required: required
          });
        }
      }
    });

    return issues;
  });

  if (contrastIssues.length > 0) {
    issues.push({
      type: 'Color Contrast',
      severity: 'HIGH',
      count: contrastIssues.length,
      examples: contrastIssues.slice(0, 3)
    });
  }

  // Check for images without alt text
  const missingAlt = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => !img.alt || img.alt.trim() === '').map(img => ({
      src: img.src,
      location: img.closest('section')?.id || 'unknown'
    }));
  });

  if (missingAlt.length > 0) {
    issues.push({
      type: 'Missing Alt Text',
      severity: 'HIGH',
      count: missingAlt.length,
      examples: missingAlt.slice(0, 5)
    });
  }

  // Check for proper heading hierarchy
  const headingIssues = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const issues = [];
    let lastLevel = 0;

    headings.forEach(heading => {
      const level = parseInt(heading.tagName[1]);
      if (lastLevel > 0 && level - lastLevel > 1) {
        issues.push({
          tag: heading.tagName,
          text: heading.textContent.substring(0, 50),
          previousLevel: lastLevel
        });
      }
      lastLevel = level;
    });

    return issues;
  });

  if (headingIssues.length > 0) {
    issues.push({
      type: 'Heading Hierarchy',
      severity: 'MEDIUM',
      count: headingIssues.length,
      examples: headingIssues
    });
  }

  // Check for keyboard focusable elements
  const focusIssues = await page.evaluate(() => {
    const interactive = Array.from(document.querySelectorAll('a, button, input, select, textarea, [onclick]'));
    return interactive.filter(el => {
      const style = window.getComputedStyle(el);
      return style.outline === 'none' && !el.hasAttribute('tabindex');
    }).map(el => ({
      tag: el.tagName,
      text: el.textContent?.substring(0, 30) || el.value || 'no text'
    }));
  });

  if (focusIssues.length > 0) {
    issues.push({
      type: 'Focus Indicators',
      severity: 'MEDIUM',
      count: focusIssues.length,
      note: 'Elements may lack visible focus indicators'
    });
  }

  return issues;
}

async function analyzeLayout(page, pageName, viewport) {
  const layoutIssues = [];

  // Check for horizontal overflow
  const overflow = await page.evaluate(() => {
    const body = document.body;
    const html = document.documentElement;
    return {
      hasOverflow: body.scrollWidth > window.innerWidth || html.scrollWidth > window.innerWidth,
      bodyWidth: body.scrollWidth,
      windowWidth: window.innerWidth
    };
  });

  if (overflow.hasOverflow) {
    layoutIssues.push({
      type: 'Horizontal Overflow',
      severity: 'CRITICAL',
      viewport: viewport.name,
      details: `Page width (${overflow.bodyWidth}px) exceeds viewport (${overflow.windowWidth}px)`
    });
  }

  // Check for broken images
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('img'));
    return images.filter(img => !img.complete || img.naturalHeight === 0).map(img => ({
      src: img.src,
      alt: img.alt
    }));
  });

  if (brokenImages.length > 0) {
    layoutIssues.push({
      type: 'Broken Images',
      severity: 'HIGH',
      count: brokenImages.length,
      examples: brokenImages.slice(0, 3)
    });
  }

  // Check typography
  const typographyIssues = await page.evaluate(() => {
    const issues = [];
    const paragraphs = Array.from(document.querySelectorAll('p'));

    paragraphs.forEach(p => {
      const style = window.getComputedStyle(p);
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight);
      const textLength = p.textContent.trim().length;

      if (fontSize < 14) {
        issues.push({
          type: 'Small Font Size',
          size: fontSize,
          text: p.textContent.substring(0, 50)
        });
      }

      if (lineHeight / fontSize < 1.4) {
        issues.push({
          type: 'Tight Line Height',
          ratio: (lineHeight / fontSize).toFixed(2),
          text: p.textContent.substring(0, 50)
        });
      }

      if (textLength > 500) {
        issues.push({
          type: 'Long Paragraph',
          length: textLength,
          text: p.textContent.substring(0, 50)
        });
      }
    });

    return issues.slice(0, 5);
  });

  if (typographyIssues.length > 0) {
    layoutIssues.push({
      type: 'Typography Issues',
      severity: 'MEDIUM',
      count: typographyIssues.length,
      examples: typographyIssues
    });
  }

  return layoutIssues;
}

async function analyzeNavigation(page, pageName) {
  const navIssues = [];

  // Check for header navigation
  const headerNav = await page.evaluate(() => {
    const header = document.querySelector('header') || document.querySelector('nav');
    if (!header) return { exists: false };

    const links = Array.from(header.querySelectorAll('a'));
    return {
      exists: true,
      linkCount: links.length,
      links: links.map(a => ({ text: a.textContent.trim(), href: a.href })),
      isSticky: window.getComputedStyle(header).position === 'sticky' ||
                window.getComputedStyle(header).position === 'fixed'
    };
  });

  if (!headerNav.exists) {
    navIssues.push({
      type: 'Missing Header Navigation',
      severity: 'CRITICAL'
    });
  } else if (headerNav.linkCount < 3) {
    navIssues.push({
      type: 'Limited Navigation',
      severity: 'HIGH',
      linkCount: headerNav.linkCount
    });
  }

  // Check for emergency contact visibility
  const emergencyContact = await page.evaluate(() => {
    const patterns = ['24/7', 'emergency', 'urgent', 'call now', 'phone'];
    const body = document.body.textContent.toLowerCase();
    const visible = patterns.some(p => body.includes(p));

    // Look for phone numbers
    const phoneRegex = /(\+?61\s?)?(\(0\d\))?\s?\d{4}\s?\d{4}|1300\s?\d{3}\s?\d{3}/g;
    const phones = body.match(phoneRegex);

    // Check if phone is in header
    const header = document.querySelector('header');
    const phoneInHeader = header ? phoneRegex.test(header.textContent) : false;

    return {
      hasEmergencyLanguage: visible,
      phoneNumbers: phones?.slice(0, 3) || [],
      phoneInHeader
    };
  });

  if (!emergencyContact.phoneInHeader) {
    navIssues.push({
      type: 'Emergency Contact Not Prominent',
      severity: 'CRITICAL',
      note: 'Phone number should be in header for 24/7 emergency service'
    });
  }

  // Check for CTAs
  const ctas = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"], a.button'));
    const ctaKeywords = ['contact', 'call', 'emergency', 'help', 'quote', 'claim'];

    const emergencyCTAs = buttons.filter(btn => {
      const text = btn.textContent.toLowerCase();
      return ctaKeywords.some(kw => text.includes(kw));
    });

    return {
      totalButtons: buttons.length,
      emergencyCTAs: emergencyCTAs.length,
      examples: emergencyCTAs.slice(0, 3).map(btn => btn.textContent.trim())
    };
  });

  if (ctas.emergencyCTAs === 0) {
    navIssues.push({
      type: 'No Emergency CTAs',
      severity: 'HIGH',
      note: 'Should have prominent "Get Emergency Help" or similar buttons'
    });
  }

  // Check footer navigation
  const footerNav = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { exists: false };

    const links = Array.from(footer.querySelectorAll('a'));
    return {
      exists: true,
      linkCount: links.length,
      hasServiceLinks: links.some(a => a.textContent.toLowerCase().includes('service')),
      hasLocationLinks: links.some(a => a.textContent.toLowerCase().includes('location') ||
                                        a.textContent.toLowerCase().includes('brisbane') ||
                                        a.textContent.toLowerCase().includes('ipswich'))
    };
  });

  if (!footerNav.exists) {
    navIssues.push({
      type: 'Missing Footer',
      severity: 'MEDIUM'
    });
  }

  return navIssues;
}

async function analyzeContent(page, pageName) {
  const contentIssues = [];

  // Check heading structure
  const headings = await page.evaluate(() => {
    const h1s = Array.from(document.querySelectorAll('h1'));
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h3s = Array.from(document.querySelectorAll('h3'));

    return {
      h1Count: h1s.length,
      h1Text: h1s.map(h => h.textContent.trim()),
      h2Count: h2s.length,
      h3Count: h3s.length,
      hasHeadings: h1s.length > 0 || h2s.length > 0
    };
  });

  if (headings.h1Count === 0) {
    contentIssues.push({
      type: 'Missing H1',
      severity: 'HIGH',
      note: 'Every page should have exactly one H1'
    });
  } else if (headings.h1Count > 1) {
    contentIssues.push({
      type: 'Multiple H1s',
      severity: 'MEDIUM',
      count: headings.h1Count,
      h1s: headings.h1Text
    });
  }

  // Check for trust signals
  const trustSignals = await page.evaluate(() => {
    const body = document.body.textContent.toLowerCase();
    return {
      hasMasterRestorer: body.includes('master restorer'),
      hasIICRC: body.includes('iicrc'),
      hasCertification: body.includes('certified') || body.includes('certification'),
      hasInsurance: body.includes('insurance'),
      hasTestimonial: body.includes('testimonial') || body.includes('review'),
      hasGuarantee: body.includes('guarantee') || body.includes('warranty')
    };
  });

  const missingTrustSignals = Object.entries(trustSignals)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingTrustSignals.length > 3 && pageName === 'homepage') {
    contentIssues.push({
      type: 'Missing Trust Signals',
      severity: 'HIGH',
      missing: missingTrustSignals,
      note: 'Homepage should prominently display certifications and credentials'
    });
  }

  // Check content scannability
  const readability = await page.evaluate(() => {
    const paragraphs = Array.from(document.querySelectorAll('p'));
    const lists = document.querySelectorAll('ul, ol');
    const totalText = document.body.textContent.trim().length;

    const longParagraphs = paragraphs.filter(p => p.textContent.trim().length > 400);

    return {
      paragraphCount: paragraphs.length,
      listCount: lists.length,
      longParagraphs: longParagraphs.length,
      totalTextLength: totalText,
      hasLists: lists.length > 0
    };
  });

  if (readability.longParagraphs > 3) {
    contentIssues.push({
      type: 'Long Paragraphs',
      severity: 'MEDIUM',
      count: readability.longParagraphs,
      note: 'Consider breaking into smaller chunks or bullet points'
    });
  }

  return contentIssues;
}

async function analyzeInteractivity(page, pageName) {
  const interactivityIssues = [];

  // Check button states
  const buttonStates = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button, .btn, [role="button"]'));
    const issues = [];

    buttons.slice(0, 10).forEach(btn => {
      const style = window.getComputedStyle(btn);
      const hasHover = style.cursor === 'pointer';
      const hasTransition = style.transition !== 'all 0s ease 0s';

      if (!hasHover && !btn.disabled) {
        issues.push({
          type: 'No pointer cursor',
          text: btn.textContent.trim().substring(0, 30)
        });
      }
    });

    return issues;
  });

  if (buttonStates.length > 0) {
    interactivityIssues.push({
      type: 'Button State Issues',
      severity: 'LOW',
      examples: buttonStates
    });
  }

  // Check for clickable phone numbers
  const phoneLinks = await page.evaluate(() => {
    const body = document.body.innerHTML;
    const phoneRegex = /(\+?61\s?)?(\(0\d\))?\s?\d{4}\s?\d{4}|1300\s?\d{3}\s?\d{3}/g;
    const phones = body.match(phoneRegex) || [];
    const phoneLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));

    return {
      phoneNumbersFound: phones.length,
      clickablePhones: phoneLinks.length,
      ratio: phoneLinks.length / Math.max(phones.length, 1)
    };
  });

  if (phoneLinks.phoneNumbersFound > 0 && phoneLinks.ratio < 0.5) {
    interactivityIssues.push({
      type: 'Non-Clickable Phone Numbers',
      severity: 'HIGH',
      note: 'Phone numbers should be clickable tel: links for mobile users',
      found: phoneLinks.phoneNumbersFound,
      clickable: phoneLinks.clickablePhones
    });
  }

  // Check for forms
  const forms = await page.evaluate(() => {
    const forms = Array.from(document.querySelectorAll('form'));
    return forms.map(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      const labels = form.querySelectorAll('label');
      const submit = form.querySelector('[type="submit"], button[type="submit"]');

      return {
        inputCount: inputs.length,
        labelCount: labels.length,
        hasSubmit: !!submit,
        hasRequiredFields: Array.from(inputs).some(i => i.required)
      };
    });
  });

  forms.forEach((form, idx) => {
    if (form.inputCount > form.labelCount) {
      interactivityIssues.push({
        type: 'Missing Form Labels',
        severity: 'HIGH',
        formIndex: idx,
        inputs: form.inputCount,
        labels: form.labelCount
      });
    }
  });

  return interactivityIssues;
}

async function auditPage(browser, pageConfig, viewport) {
  const page = await browser.newPage();
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  const url = `${BASE_URL}${pageConfig.path}`;
  console.log(`Auditing ${url} on ${viewport.name}...`);

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Take screenshots
    const screenshotPath = path.join(AUDIT_DIR, `${pageConfig.name}-${viewport.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    const pageResults = {
      url,
      viewport: viewport.name,
      timestamp: new Date().toISOString(),
      screenshot: screenshotPath,
      issues: {
        accessibility: await checkAccessibility(page, pageConfig.name),
        layout: await analyzeLayout(page, pageConfig.name, viewport),
        navigation: await analyzeNavigation(page, pageConfig.name),
        content: await analyzeContent(page, pageConfig.name),
        interactivity: await analyzeInteractivity(page, pageConfig.name)
      }
    };

    await page.close();
    return pageResults;

  } catch (error) {
    console.error(`Error auditing ${url}:`, error.message);
    await page.close();
    return {
      url,
      viewport: viewport.name,
      error: error.message,
      issues: {}
    };
  }
}

async function categorizeIssues(results) {
  const priorities = {
    critical: [],
    high: [],
    medium: [],
    low: []
  };

  Object.entries(results.pages).forEach(([pageKey, pageData]) => {
    Object.values(pageData).forEach(viewportData => {
      if (viewportData.issues) {
        Object.entries(viewportData.issues).forEach(([category, issues]) => {
          issues.forEach(issue => {
            const priority = {
              'CRITICAL': 'critical',
              'HIGH': 'high',
              'MEDIUM': 'medium',
              'LOW': 'low'
            }[issue.severity] || 'medium';

            priorities[priority].push({
              page: pageKey,
              viewport: viewportData.viewport,
              category,
              ...issue
            });
          });
        });
      }
    });
  });

  return priorities;
}

async function runAudit() {
  console.log('Starting UX/UI Audit...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Pages to test: ${PAGES_TO_TEST.length}`);
  console.log(`Viewports: ${VIEWPORTS.map(v => v.name).join(', ')}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    for (const pageConfig of PAGES_TO_TEST) {
      auditResults.pages[pageConfig.name] = {};

      for (const viewport of VIEWPORTS) {
        const result = await auditPage(browser, pageConfig, viewport);
        auditResults.pages[pageConfig.name][viewport.name] = result;
      }
    }

    // Categorize all issues by priority
    auditResults.prioritizedRecommendations = await categorizeIssues(auditResults);

    // Save results
    const resultsPath = path.join(AUDIT_DIR, 'audit-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(auditResults, null, 2));
    console.log(`\nAudit complete! Results saved to ${resultsPath}`);

    // Generate summary report
    generateSummaryReport();

  } finally {
    await browser.close();
  }
}

function generateSummaryReport() {
  console.log('\n' + '='.repeat(80));
  console.log('AUDIT SUMMARY REPORT');
  console.log('='.repeat(80) + '\n');

  const { critical, high, medium, low } = auditResults.prioritizedRecommendations;

  console.log(`CRITICAL Issues: ${critical.length}`);
  console.log(`HIGH Priority Issues: ${high.length}`);
  console.log(`MEDIUM Priority Issues: ${medium.length}`);
  console.log(`LOW Priority Issues: ${low.length}\n`);

  if (critical.length > 0) {
    console.log('CRITICAL ISSUES (Fix Immediately):');
    console.log('-'.repeat(80));
    critical.forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.page}/${issue.viewport}] ${issue.type}`);
      console.log(`   Category: ${issue.category}`);
      if (issue.note) console.log(`   Note: ${issue.note}`);
      if (issue.details) console.log(`   Details: ${issue.details}`);
      console.log('');
    });
  }

  if (high.length > 0) {
    console.log('\nHIGH PRIORITY ISSUES:');
    console.log('-'.repeat(80));
    high.slice(0, 10).forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.page}/${issue.viewport}] ${issue.type}`);
      if (issue.note) console.log(`   Note: ${issue.note}`);
      console.log('');
    });
    if (high.length > 10) {
      console.log(`   ... and ${high.length - 10} more high priority issues\n`);
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log(`Full report saved to: ${path.join(AUDIT_DIR, 'audit-results.json')}`);
  console.log(`Screenshots saved to: ${AUDIT_DIR}`);
  console.log('='.repeat(80) + '\n');
}

runAudit().catch(console.error);
