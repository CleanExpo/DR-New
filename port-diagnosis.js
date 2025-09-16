const { chromium } = require('playwright');
const http = require('http');

async function diagnosePorts() {
    console.log('🔍 Diagnosing localhost ports and services...\n');

    const portsToCheck = [3000, 3001, 3002, 3003, 3004, 3005, 3006, 3007];

    for (const port of portsToCheck) {
        console.log(`\n🌐 Checking port ${port}:`);
        console.log('─'.repeat(30));

        // Try HTTP request
        try {
            const result = await checkHttpEndpoint(port);
            console.log(`✅ HTTP Status: ${result.status}`);
            console.log(`📝 Content Type: ${result.contentType || 'Unknown'}`);
            if (result.title) {
                console.log(`📄 Page Title: ${result.title}`);
            }
            if (result.error) {
                console.log(`⚠️  Error: ${result.error}`);
            }

            // If it's responding, try to load with Playwright for deeper inspection
            if (result.status === 200) {
                await inspectWithPlaywright(port);
            }
        } catch (error) {
            console.log(`❌ Connection failed: ${error.message}`);
        }
    }
}

function checkHttpEndpoint(port) {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}`, { timeout: 5000 }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const titleMatch = data.match(/<title>(.*?)<\/title>/i);
                resolve({
                    status: res.statusCode,
                    contentType: res.headers['content-type'],
                    title: titleMatch ? titleMatch[1] : null,
                    error: res.statusCode >= 400 ? `HTTP ${res.statusCode}` : null
                });
            });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ status: 'TIMEOUT', error: 'Request timed out' });
        });

        req.on('error', (error) => {
            resolve({ status: 'ERROR', error: error.message });
        });
    });
}

async function inspectWithPlaywright(port) {
    try {
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            viewport: { width: 1280, height: 720 }
        });
        const page = await context.newPage();

        // Capture console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Capture network errors
        const networkErrors = [];
        page.on('response', response => {
            if (!response.ok()) {
                networkErrors.push(`${response.status()} - ${response.url()}`);
            }
        });

        // Try to load the page
        try {
            await page.goto(`http://localhost:${port}`, {
                waitUntil: 'domcontentloaded',
                timeout: 10000
            });

            // Check basic elements
            const hasHeader = await page.locator('header').count() > 0;
            const hasMain = await page.locator('main').count() > 0;
            const hasFooter = await page.locator('footer').count() > 0;

            console.log(`🏗️  Structure: Header(${hasHeader}), Main(${hasMain}), Footer(${hasFooter})`);

            // Check for emergency contact
            const hasEmergencyContact = await page.locator('text=/1300.*309.*361/, a[href*="1300309361"]').count() > 0;
            console.log(`📞 Emergency Contact: ${hasEmergencyContact ? '✅' : '❌'}`);

            // Count images
            const images = await page.locator('img').count();
            console.log(`🖼️  Images: ${images} found`);

            if (consoleErrors.length > 0) {
                console.log(`❌ Console Errors: ${consoleErrors.length}`);
                consoleErrors.slice(0, 3).forEach((error, i) => {
                    console.log(`   ${i + 1}. ${error.substring(0, 100)}...`);
                });
            }

            if (networkErrors.length > 0) {
                console.log(`❌ Network Errors: ${networkErrors.length}`);
                networkErrors.slice(0, 3).forEach((error, i) => {
                    console.log(`   ${i + 1}. ${error}`);
                });
            }

        } catch (error) {
            console.log(`❌ Page load error: ${error.message}`);
        }

        await browser.close();

    } catch (error) {
        console.log(`❌ Playwright inspection failed: ${error.message}`);
    }
}

diagnosePorts().catch(console.error);