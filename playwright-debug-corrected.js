const { chromium } = require('playwright');

async function debugDRWebsite() {
  console.log('Starting Playwright debugging session for DR-New website...');
  console.log('Testing the correct port: localhost:3000');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Array to collect all errors and issues
  const issues = [];
  const networkFailures = [];
  const consoleErrors = [];
  const networkRequests = [];

  // Listen for console messages
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();

    console.log(`Console ${type}: ${text}`);

    if (type === 'error' || type === 'warning') {
      consoleErrors.push({
        type: type,
        message: text,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Listen for page errors
  page.on('pageerror', (error) => {
    console.log(`Page Error: ${error.message}`);
    issues.push({
      type: 'Page Error',
      message: error.message,
      stack: error.stack
    });
  });

  // Track all network requests
  page.on('request', (request) => {
    networkRequests.push({
      url: request.url(),
      method: request.method(),
      resourceType: request.resourceType()
    });
  });

  // Listen for failed network requests
  page.on('response', (response) => {
    if (!response.ok()) {
      console.log(`Failed Request: ${response.status()} - ${response.url()}`);
      networkFailures.push({
        status: response.status(),
        statusText: response.statusText(),
        url: response.url(),
        method: response.request().method()
      });
    }
  });

  // Listen for request failures
  page.on('requestfailed', (request) => {
    console.log(`Request Failed: ${request.url()} - ${request.failure().errorText}`);
    networkFailures.push({
      type: 'Request Failed',
      url: request.url(),
      error: request.failure().errorText,
      method: request.method()
    });
  });

  try {
    console.log('Navigating to http://localhost:3000...');

    // Navigate with extended timeout
    await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
      timeout: 30000
    });

    // Wait a bit for any async loading
    await page.waitForTimeout(3000);

    // Take initial screenshot
    console.log('Taking screenshot...');
    await page.screenshot({
      path: 'D:/Disaster Recovery/Disaster-Recovery/debug-screenshot-3000.png',
      fullPage: true
    });

    // Check page title
    const title = await page.title();
    console.log(`Page title: "${title}"`);

    // Check if page is completely blank/white
    const bodyText = await page.textContent('body');
    console.log(`Body text length: ${bodyText ? bodyText.length : 0}`);

    if (!bodyText || bodyText.trim().length === 0) {
      issues.push({
        type: 'Empty Page',
        message: 'Page body appears to be completely empty'
      });
    }

    // Check for specific elements that should be present
    const elementsToCheck = [
      'header',
      'main',
      'nav',
      '.header',
      '#root',
      '#__next',
      'h1',
      'h2'
    ];

    console.log('\n=== CHECKING PAGE ELEMENTS ===');
    for (const selector of elementsToCheck) {
      const element = await page.$(selector);
      if (element) {
        const text = await element.textContent();
        console.log(`✅ Found ${selector}: "${text?.substring(0, 100)}..."`);
      } else {
        console.log(`❌ Missing element: ${selector}`);
      }
    }

    // Check for React/Next.js specific indicators
    const reactRoot = await page.$('#__next');
    const reactApp = await page.$('#root');

    if (!reactRoot && !reactApp) {
      issues.push({
        type: 'Missing React Root',
        message: 'Neither #__next nor #root elements found - React/Next.js may not be loading'
      });
    }

    // Check for loading indicators or error messages
    const loadingIndicators = await page.$$('[data-loading], .loading, .spinner');
    if (loadingIndicators.length > 0) {
      console.log(`Found ${loadingIndicators.length} loading indicators - page may still be loading`);
    }

    // Check for error boundaries or error messages
    const errorElements = await page.$$('.error, [data-error], .error-boundary');
    for (const errorEl of errorElements) {
      const errorText = await errorEl.textContent();
      issues.push({
        type: 'Error Element',
        message: `Found error element with text: ${errorText}`
      });
    }

    // Check for Next.js development error indicators
    const nextErrorElements = await page.$$('[data-nextjs-container], .nextjs-container, .nextjs__container');
    if (nextErrorElements.length > 0) {
      console.log('⚠️  Found Next.js error container - checking for development errors');
      for (const errorEl of nextErrorElements) {
        const errorText = await errorEl.textContent();
        if (errorText && errorText.includes('Error')) {
          issues.push({
            type: 'Next.js Development Error',
            message: `Next.js error: ${errorText.substring(0, 200)}`
          });
        }
      }
    }

    // Check for development server specific content
    const isDevelopmentServer = title.includes('Error') ||
                               bodyText?.includes('Module not found') ||
                               bodyText?.includes('webpack') ||
                               bodyText?.includes('Failed to compile');

    // Additional diagnostic checks
    console.log('\n=== DIAGNOSTIC INFORMATION ===');
    console.log(`   - Page URL: ${page.url()}`);
    console.log(`   - Page Title: "${title}"`);
    console.log(`   - Body Content Length: ${bodyText ? bodyText.length : 0} characters`);

    if (isDevelopmentServer) {
      console.log('   ⚠️  This appears to be a development server error page');

      // Look for specific error content
      if (bodyText?.includes('Module not found')) {
        issues.push({
          type: 'Module Error',
          message: 'Module not found error detected - possibly missing dependencies'
        });
      }

      if (bodyText?.includes('Failed to compile')) {
        issues.push({
          type: 'Compilation Error',
          message: 'Compilation error detected - check console for details'
        });
      }
    }

    // Check for common Next.js error patterns
    if (bodyText?.includes('404') || title.includes('404')) {
      console.log('   ⚠️  This appears to be a 404 error page');
    }

    if (bodyText?.includes('500') || title.includes('500')) {
      console.log('   ⚠️  This appears to be a 500 server error page');
    }

    // Get page HTML for analysis
    const htmlContent = await page.content();
    const htmlLength = htmlContent.length;
    console.log(`   - HTML Content Length: ${htmlLength} characters`);

    if (htmlLength < 1000) {
      console.log('   ⚠️  HTML content is very small - possible server error');
    }

    // Check for critical resources in failed requests
    console.log('\n=== NETWORK ANALYSIS ===');

    const criticalFailures = networkFailures.filter(failure =>
      failure.url.includes('_next/static/') ||
      failure.url.includes('.js') ||
      failure.url.includes('.css') ||
      failure.url.endsWith('/favicon.ico')
    );

    if (criticalFailures.length > 0) {
      console.log('⚠️  Critical resource failures detected:');
      criticalFailures.forEach(failure => {
        console.log(`   - ${failure.status || 'FAILED'}: ${failure.url}`);
      });
    }

    // Look for Next.js specific requests
    const nextJSRequests = networkRequests.filter(req =>
      req.url.includes('_next/') ||
      req.url.includes('webpack')
    );

    if (nextJSRequests.length > 0) {
      console.log(`✅ Found ${nextJSRequests.length} Next.js related requests`);
    } else {
      console.log('⚠️  No Next.js related requests found - server may not be Next.js');
    }

  } catch (error) {
    console.error(`\nCRITICAL ERROR during page load:`);
    console.error(`Error: ${error.message}`);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('   ❌ CONNECTION REFUSED - Server is not running on localhost:3000');
      console.error('   💡 SOLUTION: Start the development server with "npm run dev"');
    } else if (error.message.includes('Timeout')) {
      console.error('   ❌ TIMEOUT - Page took too long to load');
      console.error('   💡 SOLUTION: Check if the server is responding slowly or has crashed');
    }
  }

  console.log('\n=== DETAILED ANALYSIS REPORT ===');

  console.log('\n1. CONSOLE ERRORS:');
  if (consoleErrors.length === 0) {
    console.log('   ✅ No console errors detected');
  } else {
    consoleErrors.forEach((error, index) => {
      console.log(`   ❌ ${index + 1}. [${error.type.toUpperCase()}] ${error.message}`);
    });
  }

  console.log('\n2. NETWORK FAILURES:');
  if (networkFailures.length === 0) {
    console.log('   ✅ No network failures detected');
  } else {
    networkFailures.forEach((failure, index) => {
      console.log(`   ❌ ${index + 1}. ${failure.status || 'FAILED'} - ${failure.url}`);
      if (failure.error) {
        console.log(`       Error: ${failure.error}`);
      }
    });
  }

  console.log('\n3. PAGE STRUCTURE ISSUES:');
  if (issues.length === 0) {
    console.log('   ✅ No structural issues detected');
  } else {
    issues.forEach((issue, index) => {
      console.log(`   ❌ ${index + 1}. [${issue.type}] ${issue.message}`);
    });
  }

  console.log('\n=== SUMMARY AND RECOMMENDATIONS ===');

  const totalIssues = consoleErrors.length + networkFailures.length + issues.length;

  if (totalIssues === 0) {
    console.log('✅ No issues detected - the page appears to be loading correctly');
  } else {
    console.log(`❌ Found ${totalIssues} total issues that need attention:`);
    console.log('\nNEXT STEPS:');
    console.log('1. Check the development server logs for build errors');
    console.log('2. Verify all dependencies are installed: npm install');
    console.log('3. Check for TypeScript or compilation errors');
    console.log('4. Look for any environment variable issues');
    console.log('5. Check the browser network tab for failed requests');
  }

  await browser.close();
  console.log('\nPlaywright debugging session complete.');
}

// Run the debug function
debugDRWebsite().catch(console.error);