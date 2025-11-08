# Award-Level Testing & Validation Suite

Comprehensive testing suite for disaster recovery website production validation.

## Overview

This testing suite provides complete validation across 10 critical categories:

1. **Page Load Testing** - All pages load successfully (no 404s)
2. **Image Testing** - All images display correctly
3. **Mobile Responsiveness** - Cross-device validation
4. **Cross-Browser Testing** - Chrome, Firefox, Safari compatibility
5. **Navigation Testing** - All links and menus work
6. **Contact Form Testing** - Forms function correctly
7. **SEO Validation** - Meta tags, schema markup, sitemap
8. **Performance Testing** - Core Web Vitals measurement
9. **Accessibility Testing** - WCAG 2.1 AAA compliance
10. **Production Verification** - HTTPS, security headers, CDN

## Quick Start

### Run All Tests (Recommended)

```bash
npm run test:award-level
```

This runs the complete test suite and generates a comprehensive report.

### Run Specific Test Categories

```bash
# Quick smoke test (fastest)
npm run test:quick

# Comprehensive validation only
npm run test:production:comprehensive

# All production tests
npm run test:production
```

### Run Tests by Browser

```bash
# Chrome/Chromium
npx playwright test --config=playwright.config.production.ts --project=chromium-desktop

# Firefox
npx playwright test --config=playwright.config.production.ts --project=firefox-desktop

# Safari/WebKit
npx playwright test --config=playwright.config.production.ts --project=webkit-desktop

# Mobile Chrome
npx playwright test --config=playwright.config.production.ts --project=mobile-chrome

# Mobile Safari
npx playwright test --config=playwright.config.production.ts --project=mobile-safari
```

## Test Reports

After running tests, reports are generated in:

- **HTML Report**: `playwright-report-production/index.html`
- **JSON Results**: `test-results/production-results.json`
- **Markdown Report**: `test-results/award-level-report-[timestamp].md`

### View HTML Report

```bash
npx playwright show-report playwright-report-production
```

## Test Coverage Details

### 1. Page Load Testing

Tests all critical pages including:
- Homepage
- All service pages (water damage, fire damage, mould, storm)
- All location pages (Brisbane, Ipswich, Logan, suburbs)
- About pages
- Contact and emergency pages
- Blog

**Validates:**
- HTTP status codes (not 404)
- Page content loads
- No error messages

### 2. Image Testing

**Validates:**
- Hero images display correctly
- Service page images load
- No broken images (naturalWidth > 0)
- All images have alt text
- Images are visible

### 3. Mobile Responsiveness

**Tests on:**
- iPhone SE (375x667)
- Pixel 5
- iPad Pro

**Validates:**
- Mobile menu visible
- No horizontal overflow
- Content is readable
- Forms are accessible

### 4. Cross-Browser Testing

**Browsers:**
- Chromium (Chrome/Edge)
- Firefox
- WebKit (Safari)

**Validates:**
- Pages render correctly
- JavaScript works
- CSS is applied properly

### 5. Navigation Testing

**Validates:**
- Main navigation menu
- Emergency phone links (tel: protocol)
- Footer navigation
- Breadcrumb navigation
- Internal links work

### 6. Contact Form Testing

**Validates:**
- Form fields present (name, email, message)
- Submit button visible
- HTML5 validation works
- Required fields enforced
- Emergency contact accessible 24/7

### 7. SEO Validation

**Validates:**
- Title tags (10-70 characters)
- Meta descriptions (50-160 characters)
- H1 tags present and unique
- Canonical URLs
- JSON-LD schema markup
- Open Graph tags (og:title, og:description, og:image)
- Sitemap.xml accessible
- Robots.txt accessible

### 8. Performance Testing

**Measures:**
- Page load time (target: < 5 seconds)
- Largest Contentful Paint (LCP < 2.5s)
- Console errors
- Network idle state

### 9. Accessibility Testing (WCAG 2.1 AAA)

**Validates:**
- axe-core accessibility audit passes
- Keyboard navigation works
- Images have alt text
- Form labels associated with inputs
- Color contrast sufficient
- ARIA attributes correct

### 10. Production Verification

**Validates:**
- HTTPS enabled
- Security headers present
  - X-Frame-Options
  - X-Content-Type-Options: nosniff
- Favicon accessible
- CDN working for images
- No environment variables exposed

## CI/CD Integration

### GitHub Actions

```yaml
name: Production Tests

on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *' # Every 6 hours

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:award-level
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-reports
          path: |
            playwright-report-production/
            test-results/
```

## Troubleshooting

### Tests Failing

1. **Check production is accessible**:
   ```bash
   curl -I https://dr-new-ten.vercel.app
   ```

2. **Update Playwright browsers**:
   ```bash
   npx playwright install
   ```

3. **Run with debug mode**:
   ```bash
   npx playwright test --config=playwright.config.production.ts --debug
   ```

4. **View trace files** (on failure):
   ```bash
   npx playwright show-trace test-results/[test-name]/trace.zip
   ```

### Common Issues

**Issue: Timeouts**
- Solution: Increase timeout in `playwright.config.production.ts`

**Issue: Image tests failing**
- Check CDN is working
- Verify image optimization is enabled

**Issue: Accessibility violations**
- Review axe-core report
- Check color contrast
- Verify ARIA labels

## Best Practices

1. **Run tests before deployment**
   ```bash
   npm run test:quick
   ```

2. **Run full suite after deployment**
   ```bash
   npm run test:award-level
   ```

3. **Monitor production regularly**
   - Set up cron job or CI schedule
   - Get alerts on failures

4. **Keep baseline screenshots updated**
   ```bash
   npx playwright test --update-snapshots
   ```

## Test Development

### Adding New Tests

1. Create test file in appropriate category:
   ```
   __tests__/
     ├── e2e/           # End-to-end user flows
     ├── performance/   # Performance metrics
     ├── accessibility/ # WCAG compliance
     ├── seo/           # SEO validation
     └── comprehensive/ # Full validation
   ```

2. Use test template:
   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('My Test Suite', () => {
     test.use({ baseURL: 'https://dr-new-ten.vercel.app' });

     test('should validate something', async ({ page }) => {
       await page.goto('/');
       // Your test logic
     });
   });
   ```

3. Run new test:
   ```bash
   npx playwright test path/to/test.spec.ts --config=playwright.config.production.ts
   ```

## Performance Metrics

### Target Metrics

- **Page Load**: < 5 seconds
- **LCP (Largest Contentful Paint)**: < 2.5s (good), < 4.0s (needs improvement)
- **FID (First Input Delay)**: < 100ms (good), < 300ms (needs improvement)
- **CLS (Cumulative Layout Shift)**: < 0.1 (good), < 0.25 (needs improvement)

### Measuring Performance

```bash
npm run test:production -- __tests__/performance/
```

## Accessibility Standards

Tests validate against **WCAG 2.1 Level AAA**:

- **Perceivable**: Content is available to all users
- **Operable**: Interface can be operated by all users
- **Understandable**: Content and interface are clear
- **Robust**: Compatible with assistive technologies

## Support

For issues or questions:
1. Check test report for specific failures
2. Review HTML report for screenshots/videos
3. Check trace files for detailed execution flow
4. Consult Playwright documentation: https://playwright.dev

## License

Internal testing suite for disaster recovery website.
