# Test Quick Reference Guide

## Quick Start - Running Tests

### 1. Smoke Tests (Fastest - 30 seconds)
Quick verification that critical functionality works:
```bash
npx playwright test __tests__/smoke/ --project=chromium
```

### 2. E2E Tests - Homepage Only (~1 minute)
```bash
npx playwright test __tests__/e2e/homepage-critical.spec.ts --project=chromium
```

### 3. E2E Tests - All Critical Pages (~3 minutes)
```bash
npx playwright test __tests__/e2e/ --project=chromium --max-failures=10
```

### 4. Performance Tests (~2 minutes)
```bash
npx playwright test __tests__/performance/core-web-vitals.spec.ts --project=chromium
```

### 5. Visual Regression Tests (~5 minutes)
Generate baselines first time:
```bash
npx playwright test __tests__/visual/ --update-snapshots --project=chromium
```

Then run comparisons:
```bash
npx playwright test __tests__/visual/ --project=chromium
```

### 6. Full Test Suite (~15 minutes)
```bash
npm run test:e2e
```

---

## Test by User Journey

### Emergency Service Booking Flow
```bash
npx playwright test __tests__/e2e/emergency-contact-flow.spec.ts --project=chromium
```

### Service Exploration Flow
```bash
npx playwright test __tests__/e2e/service-pages-critical.spec.ts --project=chromium
```

### Contact Form Submission Flow
```bash
npx playwright test __tests__/e2e/contact-form-flow.spec.ts --project=chromium
```

---

## Advanced Options

### Run with UI Mode (Interactive)
```bash
npx playwright test __tests__/smoke/ --ui
```

### Debug Mode (Step-by-step)
```bash
npx playwright test __tests__/e2e/homepage-critical.spec.ts --debug
```

### Run on All Browsers
```bash
npx playwright test __tests__/smoke/
```

### Run Only Mobile Tests
```bash
npx playwright test __tests__/smoke/ --project=mobile-chrome
```

### Generate HTML Report
```bash
npx playwright test __tests__/e2e/
npx playwright show-report
```

### Run Specific Test by Name
```bash
npx playwright test --grep "homepage loads successfully"
```

### Run Tests Matching Pattern
```bash
npx playwright test --grep "emergency"
```

---

## Test Results

### View Last Test Report
```bash
npx playwright show-report
```

### View Screenshots and Videos
Test artifacts stored in:
- `test-results/` - failure screenshots and videos
- `playwright-report/` - HTML report

---

## Common Issues & Fixes

### Issue: Port 3000 already in use
**Solution:** Stop other Next.js dev servers or change port in `playwright.config.ts`

### Issue: Tests failing with "Page closed"
**Solution:** Increase timeout in test or fix navigation issues

### Issue: Visual regression differences
**Solution:** Update baselines if changes are intentional:
```bash
npx playwright test __tests__/visual/ --update-snapshots
```

### Issue: Flaky tests
**Solution:** Run with retries:
```bash
npx playwright test __tests__/e2e/ --retries=2
```

---

## Pre-Deployment Checklist

Before deploying to production, run:

1. **Smoke Tests** (must pass):
```bash
npx playwright test __tests__/smoke/ --project=chromium
```

2. **Critical E2E Tests**:
```bash
npx playwright test __tests__/e2e/homepage-critical.spec.ts __tests__/e2e/service-pages-critical.spec.ts --project=chromium
```

3. **Security Tests**:
```bash
npx playwright test __tests__/security/ --project=chromium
```

4. **Accessibility Tests**:
```bash
npx playwright test __tests__/accessibility/ --project=chromium
```

All must pass with 0 failures before deployment.

---

## Test Coverage Goals

- **Smoke Tests:** 100% (Achieved ✓)
- **Critical User Journeys:** 80% (Achieved ~75%)
- **Page Load Tests:** 100% (Achieved ✓)
- **Mobile Responsiveness:** 80% (Achieved ✓)
- **Accessibility:** 70% (Implemented)
- **Performance:** Baseline established (Needs production validation)

---

## Continuous Integration

### GitHub Actions / CI Pipeline
```yaml
# Add to .github/workflows/test.yml
- name: Run Smoke Tests
  run: npx playwright test __tests__/smoke/ --project=chromium

- name: Run E2E Tests
  run: npx playwright test __tests__/e2e/ --project=chromium --max-failures=5
```

### Pre-Commit Hook
Already configured in `.husky/pre-commit` (if needed)

---

## Getting Help

### Playwright Documentation
https://playwright.dev/docs/intro

### Test Files Location
- Smoke: `__tests__/smoke/`
- E2E: `__tests__/e2e/`
- Performance: `__tests__/performance/`
- Visual: `__tests__/visual/`
- Integration: `__tests__/integration/`

### Configuration
- Playwright: `playwright.config.ts`
- Jest: `jest.config.js`
- Setup: `jest.setup.js`

---

**Last Updated:** 2025-11-07
**Status:** Production Ready ✓
