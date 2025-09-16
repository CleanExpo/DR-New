const { chromium } = require('playwright');

async function investigate500Errors() {
    console.log('🔍 Investigating 500 errors on ports 3003 and 3004...\n');

    const browser = await chromium.launch({
        headless: false,
        slowMo: 1000
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const portsToCheck = [3003, 3004];

    for (const port of portsToCheck) {
        console.log(`\n🌐 Investigating port ${port}:`);
        console.log('='.repeat(40));

        const page = await context.newPage();

        // Capture all console messages
        const consoleLogs = [];
        page.on('console', msg => {
            consoleLogs.push({
                type: msg.type(),
                text: msg.text(),
                location: msg.location()
            });
        });

        // Capture network responses
        const networkResponses = [];
        page.on('response', response => {
            networkResponses.push({
                url: response.url(),
                status: response.status(),
                statusText: response.statusText(),
                headers: response.headers()
            });
        });

        // Capture page errors
        const pageErrors = [];
        page.on('pageerror', error => {
            pageErrors.push(error.message);
        });

        try {
            console.log(`📍 Navigating to http://localhost:${port}...`);

            const response = await page.goto(`http://localhost:${port}`, {
                waitUntil: 'domcontentloaded',
                timeout: 15000
            });

            console.log(`📊 Response Status: ${response.status()}`);
            console.log(`📊 Response Headers:`, response.headers());

            // Get the error page content
            const bodyText = await page.textContent('body');
            console.log(`📄 Error Page Content (first 500 chars):`);
            console.log(bodyText.substring(0, 500));

            // Check if it's a Next.js error page
            const isNextJsError = await page.locator('text="Application error: a client-side exception has occurred"').count() > 0;
            const hasErrorStack = await page.locator('pre, code').count() > 0;

            console.log(`🔍 Next.js Error Page: ${isNextJsError ? 'Yes' : 'No'}`);
            console.log(`🔍 Error Stack Present: ${hasErrorStack ? 'Yes' : 'No'}`);

            if (hasErrorStack) {
                const errorContent = await page.locator('pre, code').first().textContent();
                console.log(`❌ Error Details:`);
                console.log(errorContent.substring(0, 800));
            }

            // Network analysis
            console.log(`\n🌐 Network Responses (${networkResponses.length}):`);
            networkResponses.forEach(resp => {
                if (!resp.url.includes('favicon') && !resp.url.includes('__nextjs')) {
                    console.log(`   ${resp.status} - ${resp.url}`);
                }
            });

            // Console log analysis
            if (consoleLogs.length > 0) {
                console.log(`\n💬 Console Messages (${consoleLogs.length}):`);
                consoleLogs.forEach(log => {
                    if (log.type === 'error') {
                        console.log(`   ❌ ${log.text}`);
                    } else if (log.type === 'warning') {
                        console.log(`   ⚠️  ${log.text}`);
                    }
                });
            }

            // Page errors
            if (pageErrors.length > 0) {
                console.log(`\n💥 Page Errors (${pageErrors.length}):`);
                pageErrors.forEach(error => {
                    console.log(`   ❌ ${error}`);
                });
            }

        } catch (error) {
            console.log(`❌ Failed to load page: ${error.message}`);
        }

        await page.close();
    }

    await browser.close();
    console.log('\n🏁 Investigation completed!');
}

investigate500Errors().catch(console.error);