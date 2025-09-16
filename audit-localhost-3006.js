const { chromium } = require('playwright');

async function auditSite() {
    console.log('🔍 Starting comprehensive audit of localhost:3006...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 },
        locale: 'en-AU',
        timezoneId: 'Australia/Brisbane'
    });

    const page = await context.newPage();

    // Arrays to track issues
    const consoleErrors = [];
    const networkErrors = [];
    const pageErrors = [];

    // Listen for console messages
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleErrors.push({
                text: msg.text(),
                location: msg.location()
            });
        }
    });

    // Listen for page errors
    page.on('pageerror', error => {
        pageErrors.push(error.message);
    });

    // Listen for network responses
    page.on('response', response => {
        if (!response.ok()) {
            networkErrors.push({
                url: response.url(),
                status: response.status(),
                statusText: response.statusText()
            });
        }
    });

    const pagesToTest = [
        { name: 'Homepage', url: 'http://localhost:3006' },
        { name: 'Analytics Dashboard', url: 'http://localhost:3006/analytics' },
        { name: 'Water Damage Services', url: 'http://localhost:3006/services/water-damage-restoration' },
        { name: 'Fire Damage Services', url: 'http://localhost:3006/services/fire-damage-restoration' },
        { name: 'Brisbane Location', url: 'http://localhost:3006/locations/brisbane' },
        { name: 'Ipswich Location', url: 'http://localhost:3006/locations/ipswich' },
        { name: 'Logan Location', url: 'http://localhost:3006/locations/logan' },
        { name: 'FAQ Page', url: 'http://localhost:3006/faq' },
        { name: 'Emergency Services', url: 'http://localhost:3006/emergency-services' },
        { name: 'Accessibility Page', url: 'http://localhost:3006/accessibility' }
    ];

    for (const pageTest of pagesToTest) {
        console.log(`\n📄 Testing: ${pageTest.name}`);
        console.log(`🔗 URL: ${pageTest.url}`);

        try {
            const response = await page.goto(pageTest.url, {
                waitUntil: 'networkidle',
                timeout: 30000
            });

            if (!response) {
                console.log(`❌ Failed to load page`);
                continue;
            }

            console.log(`✅ Status: ${response.status()}`);

            // Wait for page to fully load
            await page.waitForTimeout(2000);

            // Check for specific elements
            const title = await page.title();
            console.log(`📝 Title: ${title}`);

            // Check for common elements
            const headerExists = await page.locator('header').count() > 0;
            const footerExists = await page.locator('footer').count() > 0;
            const mainExists = await page.locator('main').count() > 0;

            console.log(`🏗️  Structure: Header(${headerExists}), Main(${mainExists}), Footer(${footerExists})`);

            // Check for images and their loading status
            const images = await page.locator('img').all();
            let brokenImages = 0;
            for (const img of images) {
                const src = await img.getAttribute('src');
                if (src && !src.startsWith('data:')) {
                    const naturalWidth = await img.evaluate(el => el.naturalWidth);
                    if (naturalWidth === 0) {
                        brokenImages++;
                        console.log(`🖼️  Broken image: ${src}`);
                    }
                }
            }

            if (brokenImages === 0 && images.length > 0) {
                console.log(`🖼️  Images: ${images.length} loaded successfully`);
            } else if (images.length === 0) {
                console.log(`🖼️  Images: No images found`);
            }

            // Check for specific DR New components
            const heroSection = await page.locator('[data-testid="hero"], .hero, section:has-text("Emergency")').count();
            const servicesSection = await page.locator('[data-testid="services"], .services, section:has-text("Services")').count();
            const contactInfo = await page.locator('a[href*="tel:"], text=/1300.*309.*361/').count();

            console.log(`🏠 Hero Section: ${heroSection > 0 ? '✅' : '❌'}`);
            console.log(`🔧 Services Section: ${servicesSection > 0 ? '✅' : '❌'}`);
            console.log(`📞 Contact Info: ${contactInfo > 0 ? '✅' : '❌'}`);

        } catch (error) {
            console.log(`❌ Error loading page: ${error.message}`);
        }

        console.log('─'.repeat(50));
    }

    // Summary report
    console.log('\n📊 AUDIT SUMMARY');
    console.log('='.repeat(50));

    if (consoleErrors.length > 0) {
        console.log(`\n❌ Console Errors (${consoleErrors.length}):`);
        consoleErrors.forEach((error, i) => {
            console.log(`${i + 1}. ${error.text}`);
            if (error.location) {
                console.log(`   Location: ${error.location.url}:${error.location.lineNumber}`);
            }
        });
    } else {
        console.log('\n✅ No console errors detected');
    }

    if (networkErrors.length > 0) {
        console.log(`\n❌ Network Errors (${networkErrors.length}):`);
        networkErrors.forEach((error, i) => {
            console.log(`${i + 1}. ${error.status} ${error.statusText} - ${error.url}`);
        });
    } else {
        console.log('\n✅ No network errors detected');
    }

    if (pageErrors.length > 0) {
        console.log(`\n❌ JavaScript Errors (${pageErrors.length}):`);
        pageErrors.forEach((error, i) => {
            console.log(`${i + 1}. ${error}`);
        });
    } else {
        console.log('\n✅ No JavaScript errors detected');
    }

    await browser.close();
    console.log('\n🏁 Audit completed!');
}

auditSite().catch(console.error);