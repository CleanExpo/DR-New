const { chromium } = require('playwright');

async function generateFinalAuditReport() {
    console.log('📋 DR New - Final Comprehensive Audit Report');
    console.log('='.repeat(60));

    const portsToAudit = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007, 3008];
    const results = {
        workingPorts: [],
        errorPorts: [],
        timeoutPorts: [],
        issues: [],
        recommendations: []
    };

    // Test all ports
    for (const port of portsToAudit) {
        console.log(`\n🔍 Testing Port ${port}:`);
        const portResult = await testPort(port);

        if (portResult.status === 'working') {
            results.workingPorts.push({ port, ...portResult });
            console.log(`✅ Port ${port}: Working`);
        } else if (portResult.status === 'error') {
            results.errorPorts.push({ port, ...portResult });
            console.log(`❌ Port ${port}: ${portResult.error}`);
        } else {
            results.timeoutPorts.push({ port, ...portResult });
            console.log(`⏱️  Port ${port}: Timeout`);
        }
    }

    // Detailed analysis of working ports
    if (results.workingPorts.length > 0) {
        console.log(`\n🎯 Detailed Analysis of Working Ports:`);
        for (const workingPort of results.workingPorts) {
            await performDetailedAnalysis(workingPort.port, results);
        }
    }

    // Generate final report
    generateSummaryReport(results);
}

async function testPort(port) {
    try {
        const response = await fetch(`http://localhost:${port}`, {
            signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
            const text = await response.text();
            return {
                status: 'working',
                httpStatus: response.status,
                contentType: response.headers.get('content-type'),
                hasContent: text.length > 0,
                title: extractTitle(text)
            };
        } else {
            const text = await response.text();
            return {
                status: 'error',
                httpStatus: response.status,
                error: `HTTP ${response.status}`,
                errorDetails: extractErrorMessage(text)
            };
        }
    } catch (error) {
        if (error.name === 'TimeoutError') {
            return { status: 'timeout', error: 'Connection timeout' };
        } else {
            return { status: 'error', error: error.message };
        }
    }
}

function extractTitle(html) {
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    return titleMatch ? titleMatch[1] : 'No title';
}

function extractErrorMessage(html) {
    const errorMatch = html.match(/"message":"([^"]*)/);
    return errorMatch ? errorMatch[1] : 'Unknown error';
}

async function performDetailedAnalysis(port, results) {
    console.log(`\n🔬 Deep Analysis - Port ${port}:`);

    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    const networkErrors = [];
    const pageErrors = [];

    // Listen for errors
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push(msg.text());
        }
    });

    page.on('response', response => {
        if (!response.ok()) {
            networkErrors.push({
                url: response.url(),
                status: response.status()
            });
        }
    });

    page.on('pageerror', error => {
        pageErrors.push(error.message);
    });

    try {
        await page.goto(`http://localhost:${port}`, {
            waitUntil: 'domcontentloaded',
            timeout: 10000
        });

        // Check DR New specific elements
        const drElements = await checkDRElements(page);
        console.log(`📱 DR New Elements:`, drElements);

        // Check for broken images
        const brokenImages = await checkImages(page);
        console.log(`🖼️  Broken Images: ${brokenImages.length}`);

        // Check navigation
        const navigation = await checkNavigation(page);
        console.log(`🧭 Navigation: ${navigation.working ? '✅' : '❌'}`);

        // Record issues
        if (consoleErrors.length > 0) {
            results.issues.push({
                port,
                type: 'console_errors',
                count: consoleErrors.length,
                examples: consoleErrors.slice(0, 3)
            });
        }

        if (networkErrors.length > 0) {
            results.issues.push({
                port,
                type: 'network_errors',
                count: networkErrors.length,
                examples: networkErrors.slice(0, 3)
            });
        }

        if (brokenImages.length > 0) {
            results.issues.push({
                port,
                type: 'broken_images',
                count: brokenImages.length,
                images: brokenImages
            });
        }

    } catch (error) {
        console.log(`❌ Analysis failed: ${error.message}`);
        results.issues.push({
            port,
            type: 'analysis_error',
            error: error.message
        });
    }

    await browser.close();
}

async function checkDRElements(page) {
    return {
        hasEmergencyPhone: await page.locator('text=/1300.*309.*361/, a[href*="1300309361"]').count() > 0,
        hasHeroSection: await page.locator('.hero, [data-testid="hero"]').count() > 0,
        hasServicesSection: await page.locator('text=/Services/, .services').count() > 0,
        hasLocationInfo: await page.locator('text=/Brisbane/, text=/Ipswich/, text=/Logan/').count() > 0,
        hasHeader: await page.locator('header').count() > 0,
        hasFooter: await page.locator('footer').count() > 0
    };
}

async function checkImages(page) {
    const images = await page.locator('img').all();
    const brokenImages = [];

    for (const img of images) {
        const src = await img.getAttribute('src');
        if (src && !src.startsWith('data:')) {
            const naturalWidth = await img.evaluate(el => el.naturalWidth);
            if (naturalWidth === 0) {
                brokenImages.push(src);
            }
        }
    }

    return brokenImages;
}

async function checkNavigation(page) {
    const navLinks = await page.locator('nav a, header a').count();
    const hasWorkingLinks = navLinks > 0;

    return {
        working: hasWorkingLinks,
        linkCount: navLinks
    };
}

function generateSummaryReport(results) {
    console.log('\n📊 FINAL AUDIT SUMMARY');
    console.log('='.repeat(60));

    console.log(`\n✅ Working Ports (${results.workingPorts.length}):`);
    results.workingPorts.forEach(port => {
        console.log(`   • Port ${port.port}: ${port.title} (${port.httpStatus})`);
    });

    console.log(`\n❌ Error Ports (${results.errorPorts.length}):`);
    results.errorPorts.forEach(port => {
        console.log(`   • Port ${port.port}: ${port.error}`);
        if (port.errorDetails) {
            console.log(`     Details: ${port.errorDetails.substring(0, 100)}...`);
        }
    });

    console.log(`\n⏱️  Timeout Ports (${results.timeoutPorts.length}):`);
    results.timeoutPorts.forEach(port => {
        console.log(`   • Port ${port.port}: ${port.error}`);
    });

    console.log(`\n🚨 Issues Found (${results.issues.length}):`);
    results.issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. Port ${issue.port} - ${issue.type}: ${issue.count || 1}`);
        if (issue.examples) {
            issue.examples.forEach(example => {
                console.log(`      - ${example.substring(0, 80)}...`);
            });
        }
    });

    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);

    if (results.workingPorts.length === 0) {
        console.log('   🚨 CRITICAL: No working ports found!');
        console.log('   1. Fix all import errors in components and libraries');
        console.log('   2. Ensure all UI components are properly created');
        console.log('   3. Check middleware.ts configuration');
        console.log('   4. Rebuild Next.js development server');
    }

    if (results.errorPorts.length > 0) {
        console.log(`   ⚠️  ${results.errorPorts.length} ports have errors - investigate import issues`);
    }

    if (results.timeoutPorts.length > 0) {
        console.log(`   ⏱️  ${results.timeoutPorts.length} ports timeout - check server startup issues`);
    }

    const totalIssues = results.issues.length;
    if (totalIssues > 0) {
        console.log(`   🔧 ${totalIssues} issues need attention`);
    }

    console.log('\n🎯 NEXT STEPS:');
    console.log('   1. Fix missing UI components and library imports');
    console.log('   2. Check middleware configuration');
    console.log('   3. Verify all image paths are correct');
    console.log('   4. Test emergency phone number functionality');
    console.log('   5. Validate all navigation links');

    console.log(`\n🏁 Audit Complete - ${new Date().toISOString()}`);
}

// Run the audit
generateFinalAuditReport().catch(console.error);