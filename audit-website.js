const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });

  console.log('🔍 COMPREHENSIVE UI/UX AUDIT - DR-New Website\n');
  console.log('=' .repeat(60) + '\n');

  const devices = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Desktop (Small)', width: 1366, height: 768 },
    { name: 'iPad Pro', width: 1024, height: 1366 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPhone 14 Pro', width: 393, height: 852 },
    { name: 'iPhone SE', width: 375, height: 667 }
  ];

  const issues = [];

  for (const device of devices) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: device.width, height: device.height });

    console.log(`\n📱 Testing ${device.name} (${device.width}x${device.height})`);
    console.log('-'.repeat(50));

    try {
      await page.goto('http://localhost:3005', { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);

      // Check for overlapping elements
      const overlaps = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const overlapping = [];

        for (let i = 0; i < elements.length; i++) {
          const rect1 = elements[i].getBoundingClientRect();
          if (rect1.width === 0 || rect1.height === 0) continue;

          for (let j = i + 1; j < elements.length; j++) {
            const rect2 = elements[j].getBoundingClientRect();
            if (rect2.width === 0 || rect2.height === 0) continue;

            // Skip parent-child relationships
            if (elements[i].contains(elements[j]) || elements[j].contains(elements[i])) continue;

            // Check for overlap
            if (!(rect1.right < rect2.left ||
                  rect1.left > rect2.right ||
                  rect1.bottom < rect2.top ||
                  rect1.top > rect2.bottom)) {

              const el1Class = elements[i].className || '';
              const el2Class = elements[j].className || '';
              const el1Tag = elements[i].tagName;
              const el2Tag = elements[j].tagName;

              // Convert to string and check
              const class1Str = typeof el1Class === 'string' ? el1Class : el1Class.toString();
              const class2Str = typeof el2Class === 'string' ? el2Class : el2Class.toString();

              // Only report significant overlaps
              if (class1Str.includes('button') || class1Str.includes('text') ||
                  class2Str.includes('button') || class2Str.includes('text') ||
                  el1Tag === 'BUTTON' || el2Tag === 'BUTTON') {
                overlapping.push({
                  element1: (class1Str || el1Tag).substring(0, 50),
                  element2: (class2Str || el2Tag).substring(0, 50)
                });
              }
            }
          }
        }
        return overlapping.slice(0, 5); // Return top 5 overlaps
      });

      if (overlaps.length > 0) {
        console.log('  ⚠️ Overlapping elements found:');
        overlaps.forEach(o => {
          console.log(`    - ${o.element1} overlaps ${o.element2}`);
          issues.push(`${device.name}: Overlap - ${o.element1} / ${o.element2}`);
        });
      } else {
        console.log('  ✅ No significant overlapping elements');
      }

      // Check text readability
      const unreadableText = await page.evaluate(() => {
        const texts = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button');
        const unreadable = [];

        texts.forEach(el => {
          const styles = window.getComputedStyle(el);
          const fontSize = parseFloat(styles.fontSize);
          const color = styles.color;
          const bgColor = styles.backgroundColor;

          // Check for too small text
          if (fontSize < 12 && el.textContent && el.textContent.trim()) {
            unreadable.push({
              text: el.textContent.substring(0, 30),
              fontSize: fontSize,
              issue: 'Text too small'
            });
          }

          // Check for low contrast (simplified check)
          if (color === bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
            unreadable.push({
              text: el.textContent ? el.textContent.substring(0, 30) : '',
              issue: 'Low contrast'
            });
          }
        });

        return unreadable.slice(0, 3);
      });

      if (unreadableText.length > 0) {
        console.log('  ⚠️ Text readability issues:');
        unreadableText.forEach(t => {
          if (t.fontSize) {
            console.log(`    - ${t.issue}: "${t.text}..." (${t.fontSize}px)`);
          } else {
            console.log(`    - ${t.issue}: "${t.text}..."`);
          }
          issues.push(`${device.name}: ${t.issue} - ${t.text}`);
        });
      } else {
        console.log('  ✅ Text readability good');
      }

      // Check for viewport overflow
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      if (hasHorizontalScroll) {
        console.log('  ⚠️ Horizontal scroll detected (content overflow)');
        issues.push(`${device.name}: Horizontal scroll present`);
      } else {
        console.log('  ✅ No horizontal scroll');
      }

      // Check button/link accessibility
      const inaccessible = await page.evaluate(() => {
        const clickables = document.querySelectorAll('button, a, [onclick]');
        const problems = [];

        clickables.forEach(el => {
          const rect = el.getBoundingClientRect();

          // Check if element is too small for touch (44x44 minimum)
          if (rect.width > 0 && rect.height > 0 && (rect.width < 44 || rect.height < 44)) {
            problems.push({
              element: el.textContent || el.className || el.tagName,
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        });

        return problems.slice(0, 3);
      });

      if (inaccessible.length > 0) {
        console.log('  ⚠️ Touch target issues:');
        inaccessible.forEach(p => {
          console.log(`    - "${p.element.substring(0, 20)}..." (${p.width}x${p.height}px)`);
          issues.push(`${device.name}: Small touch target - ${p.element.substring(0, 20)}`);
        });
      } else {
        console.log('  ✅ Touch targets adequate');
      }

      // Check images
      const brokenImages = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const broken = [];

        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            broken.push(img.src || img.getAttribute('src') || 'unknown');
          }
        });

        return broken;
      });

      if (brokenImages.length > 0) {
        console.log(`  ⚠️ ${brokenImages.length} broken images`);
        issues.push(`${device.name}: ${brokenImages.length} broken images`);
      } else {
        console.log('  ✅ All images loading');
      }

      // Take screenshot for review
      const screenshotName = `audit-${device.name.toLowerCase().replace(/\s/g, '-')}.png`;
      await page.screenshot({
        path: screenshotName,
        fullPage: false
      });
      console.log(`  📸 Screenshot saved: ${screenshotName}`);

    } catch (error) {
      console.log(`  ❌ Error testing ${device.name}: ${error.message}`);
      issues.push(`${device.name}: Error - ${error.message}`);
    }

    await page.close();
  }

  console.log('\n' + '=' .repeat(60));
  console.log('📊 AUDIT SUMMARY\n');

  if (issues.length === 0) {
    console.log('✅ No significant UI issues found across all devices!');
  } else {
    console.log(`⚠️ Found ${issues.length} issues:\n`);
    issues.forEach((issue, i) => {
      console.log(`${i + 1}. ${issue}`);
    });

    console.log('\n🔧 RECOMMENDATIONS:');
    console.log('1. Fix overlapping elements with proper z-index and positioning');
    console.log('2. Increase font sizes for mobile devices (min 14px)');
    console.log('3. Ensure touch targets are at least 44x44px');
    console.log('4. Test horizontal scroll issues with overflow-x: hidden');
    console.log('5. Verify all image paths are correct');
  }

  await browser.close();
})();