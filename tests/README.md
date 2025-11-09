# Test Suite Documentation

## Quick Start

### Run All Tests

```bash
# Full test suite (unit, integration, e2e, accessibility, performance)
npm run test:full

# Quick test (unit tests only)
npm test

# E2E tests only
npm run test:e2e

# Generate test report
npm run test:report
```

### Run Specific Test Types

```bash
# Accessibility tests
npm run test:accessibility

# Performance tests
npm run test:performance

# Visual regression tests
npm run test:visual

# Security tests
npm run test:security

# Mobile responsiveness tests
npm run test:mobile

# SEO validation tests
npm run test:seo

# Lighthouse CI
npm run test:lighthouse
```

## Test Structure

```
tests/
├── e2e/                          # End-to-end tests
│   ├── emergency-booking.spec.ts
│   ├── service-pages.spec.ts
│   ├── visual-regression.spec.ts
│   ├── seo-validation.spec.ts
│   ├── security.spec.ts
│   └── mobile-responsiveness.spec.ts
├── integration/                  # Integration tests
│   └── api/
│       ├── contact-submit.test.ts
│       ├── analytics.test.ts
│       ├── deployment-health.test.ts
│       └── seo-monitor.test.ts
├── components/                   # Component tests
│   ├── emergency-section.test.tsx
│   ├── service-card.test.tsx
│   └── contact-form.test.tsx
├── accessibility/                # Accessibility tests
│   └── wcag-compliance.test.ts
├── performance/                  # Performance tests
│   └── lighthouse.test.ts
├── unit/                         # Unit tests
│   ├── utils.test.ts
│   └── validation.test.ts
├── helpers/                      # Test utilities
│   └── test-utils.tsx
└── setup/                        # Test setup/teardown
    ├── global-setup.ts
    └── global-teardown.ts
```

## Writing Tests

### Unit Test Example

```typescript
import { validateEmail } from '@/lib/validation'

describe('Email Validation', () => {
  it('should accept valid emails', () => {
    expect(validateEmail('test@example.com')).toBe(true)
  })

  it('should reject invalid emails', () => {
    expect(validateEmail('invalid')).toBe(false)
  })
})
```

### Component Test Example

```typescript
import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/ServiceCard'

describe('ServiceCard', () => {
  it('should render service title', () => {
    render(<ServiceCard title="Water Damage" />)
    expect(screen.getByText('Water Damage')).toBeInTheDocument()
  })
})
```

### E2E Test Example

```typescript
import { test, expect } from '@playwright/test'

test('emergency page loads correctly', async ({ page }) => {
  await page.goto('/emergency/water-damage-brisbane')
  await expect(page).toHaveTitle(/water damage/i)
})
```

## Test Coverage

Current coverage threshold: **80%**

View coverage report:

```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

## Continuous Integration

Tests run automatically on:

- Push to `main` or `develop` branches
- Pull requests

See `.github/workflows/tests.yml` for CI configuration.

## Best Practices

1. **Descriptive Test Names:** Use clear, descriptive names
2. **Single Responsibility:** Each test should test one thing
3. **Independent Tests:** Tests should not depend on each other
4. **Fast Execution:** Keep tests quick for fast feedback
5. **Mock External Dependencies:** Don't rely on external services
6. **Arrange-Act-Assert:** Follow AAA pattern consistently
7. **Clean Up:** Clean up test data after tests
8. **Accessibility First:** Include a11y tests for all UI

## Debugging Tests

### Debug Jest Tests

```bash
# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- utils.test.ts

# Run tests with verbose output
npm test -- --verbose
```

### Debug Playwright Tests

```bash
# Open Playwright UI
npm run test:e2e:ui

# Debug mode with inspector
npm run test:e2e:debug

# Run with visible browser
npm run test:e2e:headed

# Run specific test file
npx playwright test tests/e2e/emergency-booking.spec.ts
```

## Common Issues

### Issue: Tests timeout

**Solution:** Increase timeout in test or config

```typescript
test('slow test', async ({ page }) => {
  test.setTimeout(60000) // 60 seconds
  // test code
})
```

### Issue: Flaky tests

**Solution:** Add proper waits

```typescript
// Wait for network idle
await page.waitForLoadState('networkidle')

// Wait for specific element
await page.waitForSelector('[data-testid="element"]')
```

### Issue: Coverage not meeting threshold

**Solution:** Add tests for uncovered code

```bash
# View coverage report to identify gaps
npm run test:coverage
```

## Test Data

Use helpers from `tests/helpers/test-utils.tsx`:

```typescript
import { mockEmergencyRequest, EmergencyRequestBuilder } from '@/tests/helpers/test-utils'

// Use mock data
const data = mockEmergencyRequest

// Or build custom data
const customData = new EmergencyRequestBuilder()
  .withName('Custom Name')
  .withEmail('custom@example.com')
  .asEmergency(true)
  .build()
```

## Visual Regression

### Update Baselines

```bash
# Update all snapshots
npm run test:visual -- --update-snapshots

# Update specific test
npx playwright test tests/e2e/visual-regression.spec.ts --update-snapshots
```

### Review Differences

Failed visual tests create diff images in `test-results/`.

## Performance Budgets

Lighthouse CI enforces these budgets:

- **Performance:** 80+
- **Accessibility:** 90+
- **Best Practices:** 90+
- **SEO:** 90+
- **LCP:** < 2.5s
- **FCP:** < 1.8s
- **CLS:** < 0.1

## Accessibility Standards

All tests enforce WCAG 2.1 AA compliance:

- Color contrast ratios
- Keyboard navigation
- Screen reader support
- ARIA labels and landmarks
- Form accessibility
- Image alt text

## Resources

- [Jest Docs](https://jestjs.io/)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library](https://testing-library.com/)
- [axe-core](https://github.com/dequelabs/axe-core)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Support

For issues or questions:

1. Check this README
2. Review test examples in the codebase
3. Check CI logs for detailed error messages
4. Review `TESTING_COMPLETE.md` for comprehensive documentation
