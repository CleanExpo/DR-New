# Testing Guide - Disaster Recovery Brisbane

## Overview

Comprehensive testing guide for unit tests, E2E tests, and quality assurance for the Disaster Recovery Brisbane website.

## Table of Contents

- [Quick Start](#quick-start)
- [Unit Testing](#unit-testing)
- [E2E Testing](#e2e-testing)
- [Test Coverage](#test-coverage)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Generate coverage report
npm run test:coverage
```

## Unit Testing

### Framework

- **Jest**: JavaScript testing framework
- **React Testing Library**: React component testing
- **TypeScript**: Full type safety

### Writing Unit Tests

```typescript
// Example: Component test
import { render, screen } from '@testing-library/react';
import { ServiceCard } from '@/components/services/ServiceCard';

describe('ServiceCard', () => {
  it('renders service information correctly', () => {
    render(
      <ServiceCard
        title="Water Damage Restoration"
        description="24/7 emergency response"
        icon="water-drop"
      />
    );

    expect(screen.getByText('Water Damage Restoration')).toBeInTheDocument();
    expect(screen.getByText('24/7 emergency response')).toBeInTheDocument();
  });
});
```

### Running Unit Tests

```bash
# Run all unit tests
npm test

# Run specific test file
npm test ServiceCard.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="ServiceCard"

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## E2E Testing

### Framework

- **Playwright**: End-to-end testing framework
- **Multi-browser**: Chrome, Firefox, Safari
- **Visual regression**: Screenshot comparison

### Writing E2E Tests

```typescript
// Example: Homepage E2E test
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');

  // Check hero section
  await expect(page.locator('h1')).toContainText('Disaster Recovery');

  // Check emergency contact
  await expect(page.locator('a[href*="1300309361"]')).toBeVisible();

  // Check service links
  await expect(page.locator('a[href*="/services"]')).toBeVisible();
});

test('emergency form submission', async ({ page }) => {
  await page.goto('/emergency');

  // Fill form
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="phone"]', '0400000000');
  await page.fill('textarea[name="message"]', 'Emergency test');

  // Submit
  await page.click('button[type="submit"]');

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible();
});
```

### Running E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run specific test file
npx playwright test homepage.spec.ts

# Debug specific test
npm run test:e2e:debug

# Run on specific browser
npx playwright test --project=chromium
```

### Visual Regression Testing

```typescript
// Example: Visual regression test
test('homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

## Test Organization

### Directory Structure

```
__tests__/
├── unit/
│   ├── components/
│   │   ├── ServiceCard.test.tsx
│   │   └── HeroSection.test.tsx
│   ├── lib/
│   │   └── utils.test.ts
│   └── hooks/
│       └── useEmergency.test.ts
├── e2e/
│   ├── homepage.spec.ts
│   ├── services.spec.ts
│   ├── emergency.spec.ts
│   └── locations.spec.ts
└── fixtures/
    └── test-data.ts
```

## Best Practices

### Unit Testing

1. **Test behavior, not implementation**
   - Focus on what the component does
   - Avoid testing internal state
   - Test from user's perspective

2. **Use descriptive test names**
   ```typescript
   // Good
   it('displays error message when form submission fails')

   // Bad
   it('test error')
   ```

3. **Keep tests isolated**
   - Each test should be independent
   - Use beforeEach/afterEach for setup/cleanup
   - Avoid shared state between tests

4. **Mock external dependencies**
   ```typescript
   jest.mock('@/lib/api', () => ({
     fetchServices: jest.fn(() => Promise.resolve(mockData))
   }));
   ```

### E2E Testing

1. **Use data-testid for stable selectors**
   ```tsx
   <button data-testid="submit-button">Submit</button>

   // Test
   await page.click('[data-testid="submit-button"]');
   ```

2. **Wait for elements properly**
   ```typescript
   // Good
   await page.waitForSelector('[data-testid="success"]');

   // Better
   await expect(page.locator('[data-testid="success"]')).toBeVisible();
   ```

3. **Test critical user journeys**
   - Homepage → Service page → Contact form
   - Emergency form submission
   - Location-specific content
   - Mobile responsiveness

4. **Handle asynchronous operations**
   ```typescript
   // Wait for API calls
   await page.waitForResponse(resp =>
     resp.url().includes('/api/contact') && resp.status() === 200
   );
   ```

## Test Data

### Fixtures

```typescript
// test-data.ts
export const mockServiceData = {
  id: '1',
  title: 'Water Damage Restoration',
  description: '24/7 emergency response',
  slug: 'water-damage-restoration'
};

export const mockLocationData = {
  name: 'Hamilton',
  suburb: 'Hamilton',
  postcode: '4007',
  phone: '1300 309 361'
};
```

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Pull requests
- Pushes to main branch
- Manual workflow dispatch

```yaml
# .github/workflows/ci.yml
- name: Run unit tests
  run: npm run test:ci

- name: Run E2E tests
  run: npm run test:e2e
```

## Test Coverage

### Viewing Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# Open HTML report
open coverage/lcov-report/index.html
```

### Coverage Requirements

- Components: > 80%
- Utilities: > 90%
- API routes: > 75%
- Critical paths: 100%

## Troubleshooting

### Common Issues

**Issue**: Tests timing out
```bash
# Solution: Increase timeout
jest.setTimeout(30000);

# Or in test
test('slow test', async () => {
  // test code
}, 30000);
```

**Issue**: Playwright browser not found
```bash
# Solution: Install browsers
npx playwright install
```

**Issue**: Snapshot mismatch
```bash
# Solution: Update snapshots
npm test -- -u
```

**Issue**: Flaky E2E tests
- Add explicit waits
- Use waitForLoadState
- Avoid hardcoded delays
- Check network stability

### Debug Mode

```bash
# Debug Jest tests
node --inspect-brk node_modules/.bin/jest --runInBand

# Debug Playwright tests
npm run test:e2e:debug
```

## Performance Testing

### Lighthouse CI

```bash
# Run Lighthouse tests
npm run test:lighthouse

# Generate report
npm run lighthouse:report
```

### Load Testing

```bash
# Basic load test (if configured)
npm run test:load
```

## Accessibility Testing

### Automated Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('homepage has no accessibility violations', async () => {
  const { container } = render(<HomePage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Archived Documentation

For historical testing documentation, see:
- `docs/archive/testing-docs/` - Previous testing implementations
- `docs/archive/2024-implementations/` - Implementation summaries

---

**Last Updated**: 2025-11-10
**Framework**: Jest + Playwright
**Coverage Target**: 80%
