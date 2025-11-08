# Test Suite Quick Start Guide

## 🚀 Quick Start - Run Tests in 5 Minutes

### Prerequisites
```bash
# Install dependencies (if not already done)
npm install

# Install Playwright browsers (first time only)
npx playwright install
```

### Run Your First Test

```bash
# Run smoke tests (fastest - 2 minutes)
npx playwright test __tests__/smoke/comprehensive-smoke-test.spec.ts --project=chromium

# Run with UI for visual feedback
npx playwright test __tests__/smoke/quick-smoke-test.spec.ts --ui
```

---

## 📋 Common Test Commands

### Daily Development

```bash
# Run smoke tests before committing
npx playwright test __tests__/smoke/quick-smoke-test.spec.ts

# Run tests for specific feature
npx playwright test __tests__/e2e/phone-clicks-tracking.spec.ts

# Run unit tests
npm test

# Run with coverage
npm run test:coverage
```

### Before Deploying

```bash
# Comprehensive smoke test (2 min)
npx playwright test __tests__/smoke/comprehensive-smoke-test.spec.ts --project=chromium

# Critical E2E flows (5 min)
npx playwright test __tests__/e2e --project=chromium

# Full test suite (15 min)
npm run test:all
```

### Debugging Failed Tests

```bash
# Run in debug mode
npx playwright test --debug

# Run specific test with headed browser
npx playwright test __tests__/e2e/contact-form-flow.spec.ts --headed

# View last test report
npx playwright show-report
```

---

## 🧪 Test Categories Explained

### 1. Smoke Tests ⚡ (Fastest)
**Run these first!**
```bash
npx playwright test __tests__/smoke/
```
- Execute in < 2 minutes
- Validate critical paths
- Perfect for pre-deployment checks
- **Use case**: Before every git push

### 2. E2E Tests 🎯 (Critical Flows)
```bash
npx playwright test __tests__/e2e/
```
- Test complete user journeys
- Phone clicks, quotes, navigation
- Execute in ~10-15 minutes
- **Use case**: Before deploying to production

### 3. Visual Tests 👁️ (UI Consistency)
```bash
npx playwright test __tests__/visual/
```
- Screenshot comparisons
- Detect UI regressions
- Execute in ~10 minutes
- **Use case**: After UI changes

### 4. Accessibility Tests ♿ (WCAG 2.1 AA)
```bash
npx playwright test __tests__/accessibility/
```
- WCAG compliance checks
- Keyboard navigation
- Execute in ~10 minutes
- **Use case**: Weekly validation

### 5. Performance Tests 🚀 (Core Web Vitals)
```bash
npx playwright test __tests__/performance/
```
- LCP, FID, CLS metrics
- Load time validation
- Execute in ~10 minutes
- **Use case**: Before major releases

### 6. Unit Tests 🔬 (Component Logic)
```bash
npm test
npm run test:coverage
```
- Component testing
- Business logic validation
- Execute in ~2 minutes
- **Use case**: During development

---

## 🎯 Test by Feature

### Testing Phone/Contact Features
```bash
# All phone click tests
npx playwright test __tests__/e2e/phone-clicks-tracking.spec.ts

# Contact form tests
npx playwright test __tests__/e2e/contact-form-flow.spec.ts
```

### Testing Quote/Booking Flow
```bash
npx playwright test __tests__/e2e/quote-request-flow.spec.ts
```

### Testing Navigation
```bash
npx playwright test __tests__/e2e/navigation-comprehensive.spec.ts
```

### Testing Homepage
```bash
npx playwright test __tests__/e2e/homepage-critical.spec.ts
```

---

## 🌐 Browser-Specific Testing

```bash
# Chrome/Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# Safari/WebKit only
npx playwright test --project=webkit

# Mobile Chrome
npx playwright test --project=mobile-chrome

# Mobile Safari
npx playwright test --project=mobile-safari

# All browsers
npx playwright test
```

---

## 📱 Mobile Testing

```bash
# All mobile tests
npx playwright test __tests__/mobile/

# Mobile responsiveness
npx playwright test __tests__/mobile/mobile-responsiveness.spec.ts

# Mobile-specific smoke tests
npx playwright test __tests__/smoke/ --project=mobile-chrome
```

---

## 🔍 Filtering Tests

```bash
# Run tests matching pattern
npx playwright test -g "emergency"

# Run tests in specific file
npx playwright test __tests__/e2e/phone-clicks-tracking.spec.ts

# Run single test
npx playwright test -g "emergency phone number is visible above the fold"

# Skip tests matching pattern
npx playwright test --grep-invert "visual"
```

---

## 📊 Viewing Test Results

### HTML Report (Recommended)
```bash
# Generate and open report
npx playwright show-report

# Report location: playwright-report/index.html
```

### Console Output
```bash
# List format (default)
npx playwright test --reporter=list

# Detailed format
npx playwright test --reporter=line

# JSON format
npx playwright test --reporter=json
```

### Screenshots and Videos
Failed tests automatically capture:
- Screenshots: `test-results/**/test-failed-*.png`
- Videos: `test-results/**/video.webm`
- Traces: Use `--trace on` flag

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Tests Timing Out
```bash
# Increase timeout
npx playwright test --timeout=60000

# Or set in test:
test.setTimeout(60000);
```

### Browser Not Installed
```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chromium
```

### Visual Test Failures
```bash
# Update baselines (after intentional UI changes)
npx playwright test __tests__/visual --update-snapshots

# View visual diff
npx playwright show-report
```

---

## ⚙️ Configuration

### Playwright Config
Location: `playwright.config.ts`

Key settings:
- Base URL: `http://localhost:3000`
- Timeout: 30s per test
- Retries: 2 in CI, 0 locally
- Screenshots: On failure
- Video: On failure

### Jest Config
Location: `jest.config.js`

Key settings:
- Test environment: jsdom
- Coverage threshold: 70%
- Setup file: `jest.setup.js`

---

## 🔄 CI/CD Integration

### GitHub Actions
Workflow: `.github/workflows/comprehensive-testing.yml`

Triggered on:
- Push to `main` or `develop`
- Pull requests
- Manual dispatch

### Running Locally Like CI
```bash
# Set CI environment variable
CI=true npx playwright test

# Run with CI settings
npx playwright test --workers=1 --retries=2
```

---

## 📝 Writing New Tests

### E2E Test Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Arrange
    const element = page.locator('selector');

    // Act
    await element.click();

    // Assert
    await expect(element).toBeVisible();
  });
});
```

### Unit Test Template
```typescript
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

---

## 🎓 Learning Resources

### Playwright
- Docs: https://playwright.dev
- Selectors: https://playwright.dev/docs/selectors
- Best Practices: https://playwright.dev/docs/best-practices

### Jest
- Docs: https://jestjs.io
- Matchers: https://jestjs.io/docs/expect
- React Testing: https://testing-library.com/react

### Accessibility
- WCAG 2.1: https://www.w3.org/WAI/WCAG21/quickref/
- Axe Core: https://www.deque.com/axe/

---

## 📞 Need Help?

### Common Issues

**Q: Tests fail locally but pass in CI**
A: Check Node version, clear cache, reinstall dependencies

**Q: Visual tests always fail**
A: Different OS/browser versions. Update snapshots or use same environment

**Q: Tests are slow**
A: Run fewer browsers locally, use `--project=chromium`

**Q: Can't debug failing test**
A: Use `--debug` flag or `page.pause()` in code

### Debug Commands
```bash
# Step through test
npx playwright test --debug

# Pause at specific point (add to test)
await page.pause();

# View trace
npx playwright show-trace trace.zip

# Verbose logging
DEBUG=pw:api npx playwright test
```

---

## ✅ Best Practices

### DO
✅ Run smoke tests before every commit
✅ Run full suite before deploying
✅ Update visual baselines after intentional UI changes
✅ Use meaningful test descriptions
✅ Keep tests independent and isolated
✅ Use page objects for complex flows

### DON'T
❌ Skip accessibility tests
❌ Commit with failing tests
❌ Disable tests instead of fixing them
❌ Use arbitrary waits (use built-in waits)
❌ Test implementation details (test behavior)

---

## 🚦 Test Status Dashboard

### Quick Health Check
```bash
# Run comprehensive smoke test
npx playwright test __tests__/smoke/comprehensive-smoke-test.spec.ts

# Check coverage
npm run test:coverage
```

### Expected Results
- ✅ Smoke tests: All passing (< 2 min)
- ✅ E2E tests: All passing (< 15 min)
- ⚠️ Unit tests: 43/58 passing (fixing in progress)
- ✅ Visual tests: Baseline established
- ✅ Accessibility: WCAG 2.1 AA compliant
- ✅ Performance: Core Web Vitals passing

---

**Quick Reference Card**

```bash
# Essential Commands
npx playwright test __tests__/smoke/              # Smoke tests
npx playwright test __tests__/e2e/                # E2E tests
npm test                                          # Unit tests
npx playwright test --ui                          # Interactive mode
npx playwright show-report                        # View results
npx playwright test --debug                       # Debug mode
npx playwright test --project=chromium            # Single browser
npx playwright test -g "emergency"                # Filter tests
```

---

**Last Updated**: 2025-01-08
**Version**: 1.0.0
