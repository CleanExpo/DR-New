# Comprehensive Test Suite - Disaster Recovery Website

This comprehensive test suite ensures the quality, performance, accessibility, and security of the Disaster Recovery local service website.

## Test Coverage

### 1. Unit Tests (`__tests__/unit/`)
Tests individual components and functions in isolation.

**Coverage:**
- React components (Header, Footer, EmergencyCTA, etc.)
- Utility functions (validation, SEO schema generation)
- Business logic functions

**Run:**
```bash
npm test
npm run test:watch
npm run test:coverage
```

**Target:** 80%+ code coverage

### 2. Integration Tests (`__tests__/integration/`)
Tests API routes and backend integration.

**Coverage:**
- Search API
- Claims submission API
- Analytics endpoints
- SEO monitoring
- All API routes

**Run:**
```bash
npm test -- __tests__/integration
```

### 3. E2E Tests (`__tests__/e2e/`)
Tests complete user flows and critical paths.

**Coverage:**
- Emergency contact flow
- Service booking journey
- Navigation and site structure
- SEO critical paths

**Run:**
```bash
npm run test:e2e
npm run test:e2e:ui  # Interactive UI mode
npm run test:e2e:debug  # Debug mode
```

### 4. Visual Regression Tests (`__tests__/visual/`)
Ensures UI consistency across changes.

**Coverage:**
- Homepage rendering
- Component visual stability
- Responsive breakpoints
- Cross-browser rendering

**Run:**
```bash
npx playwright test __tests__/visual
```

**Note:** First run creates baseline screenshots. Subsequent runs compare against baseline.

### 5. Performance Tests (`__tests__/performance/`)
Validates page load times and Core Web Vitals.

**Coverage:**
- Page load performance
- Core Web Vitals (LCP, CLS, FID)
- Resource optimization
- JavaScript execution time

**Run:**
```bash
npx playwright test __tests__/performance
```

**Thresholds:**
- LCP < 2.5s
- CLS < 0.1
- Page load < 2s

### 6. Accessibility Tests (`__tests__/accessibility/`)
Ensures WCAG 2.1 AA compliance.

**Coverage:**
- WCAG 2.1 Level A & AA
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- ARIA attributes

**Run:**
```bash
npx playwright test __tests__/accessibility
```

**Standards:** WCAG 2.1 AA

### 7. SEO Tests (`__tests__/seo/`)
Validates search engine optimization.

**Coverage:**
- Meta tags optimization
- Structured data (Schema.org)
- Local SEO signals
- Mobile-friendliness
- Internal linking

**Run:**
```bash
npx playwright test __tests__/seo
```

### 8. Security Tests (`__tests__/security/`)
Checks for security vulnerabilities.

**Coverage:**
- Security headers (CSP, HSTS, X-Frame-Options)
- XSS prevention
- SQL injection protection
- CSRF protection
- Input sanitization

**Run:**
```bash
npx playwright test __tests__/security
```

### 9. Load Tests (`__tests__/load/`)
Tests system behavior under load.

**Coverage:**
- Concurrent user handling
- API rate limiting
- Resource exhaustion
- Stress testing

**Run:**
```bash
# Playwright stress tests
npx playwright test __tests__/load/stress-test.spec.ts

# K6 load tests (requires K6 installation)
k6 run __tests__/load/load-testing.k6.js
```

**Install K6:**
```bash
# Windows (via chocolatey)
choco install k6

# macOS
brew install k6

# Linux
sudo apt-get install k6
```

### 10. Mobile Responsiveness Tests (`__tests__/mobile/`)
Validates mobile and tablet experiences.

**Coverage:**
- Mobile rendering
- Tablet rendering
- Touch interactions
- Tap target sizes
- Viewport handling

**Run:**
```bash
npx playwright test __tests__/mobile
```

**Devices tested:**
- iPhone 12
- Pixel 5
- iPad Pro

### 11. Browser Compatibility Tests (`__tests__/contract/`)
Ensures cross-browser functionality.

**Coverage:**
- Chrome/Chromium
- Firefox
- Safari/WebKit
- Edge (via Chromium)

**Run:**
```bash
npx playwright test __tests__/contract/browser-compatibility.spec.ts
```

### 12. Error Handling Tests (`__tests__/contract/`)
Validates error scenarios.

**Coverage:**
- 404 pages
- API errors
- Form validation errors
- Network failures
- JavaScript errors

**Run:**
```bash
npx playwright test __tests__/contract/error-handling.spec.ts
```

### 13. Form Validation Tests (`__tests__/contract/`)
Tests form input validation.

**Coverage:**
- Required fields
- Email validation
- Phone number validation (Australian)
- Input sanitization
- XSS prevention

**Run:**
```bash
npx playwright test __tests__/contract/form-validation.spec.ts
```

### 14. API Contract Tests (`__tests__/contract/`)
Validates API contracts and data structures.

**Coverage:**
- Response schemas
- Error formats
- Input validation
- Rate limiting
- Authentication

**Run:**
```bash
npm test -- __tests__/contract/api-contracts.test.ts
```

## Quick Start

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Run All Tests
```bash
# Jest unit and integration tests
npm test

# Playwright E2E tests
npm run test:e2e

# All tests with coverage
npm run test:coverage
npm run test:e2e
```

### CI/CD Integration
```bash
# Run tests in CI mode
npm run test:ci
npx playwright test --reporter=junit
```

## Test Configuration

### Jest Configuration
Located in `jest.config.js` and `jest.setup.js`

**Coverage thresholds:**
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

### Playwright Configuration
Located in `playwright.config.ts` and `playwright.config.comprehensive.ts`

**Features:**
- Parallel execution
- Automatic retries
- Screenshot on failure
- Video recording
- Multiple browsers/devices

## Continuous Integration

Tests are designed to run in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run unit tests
  run: npm run test:ci

- name: Run E2E tests
  run: npx playwright test --reporter=junit

- name: Upload coverage
  run: npx codecov
```

## Best Practices

1. **Write tests first (TDD)** - Follow red-green-refactor cycle
2. **Keep tests isolated** - Each test should be independent
3. **Use descriptive names** - Test names should describe what they test
4. **Mock external dependencies** - Don't rely on external services
5. **Test user behavior** - Focus on what users do, not implementation
6. **Maintain test data** - Keep test data realistic and up-to-date
7. **Review coverage reports** - Aim for 80%+ coverage
8. **Run tests locally** - Before pushing to CI/CD

## Reporting

### Coverage Reports
```bash
npm run test:coverage
# Open coverage/index.html in browser
```

### Playwright Reports
```bash
npx playwright show-report
# Opens interactive HTML report
```

### Visual Regression Reports
Screenshot comparisons are stored in `test-results/`

## Troubleshooting

### Tests failing locally but passing in CI
- Check environment variables
- Verify Node.js version matches CI
- Clear node_modules and reinstall

### Playwright browser issues
```bash
npx playwright install --force
```

### Jest timeout errors
Increase timeout in test file:
```typescript
test('slow test', async () => {
  // test code
}, 30000); // 30 second timeout
```

### Flaky tests
- Add explicit waits
- Use `waitForLoadState('networkidle')`
- Increase timeouts for slow environments

## Maintenance

- Update snapshots: `npx playwright test --update-snapshots`
- Update baselines: Run visual tests and approve new screenshots
- Review and update coverage thresholds quarterly
- Update test data to reflect current business requirements

## Local SEO Testing Focus

Tests specifically validate:
- Brisbane, Ipswich, Logan service areas
- Master Restorer credentials
- Emergency 24/7 messaging
- Local schema markup
- Australian phone number formats
- Queensland postcodes

## Support

For test-related questions or issues:
1. Review this README
2. Check test output and error messages
3. Consult Playwright documentation
4. Review Jest documentation
