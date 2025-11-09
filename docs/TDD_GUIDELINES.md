# TDD Guidelines for Disaster Recovery Brisbane

## Overview

This project follows Test-Driven Development (TDD) principles with a comprehensive testing strategy including unit tests, integration tests, contract tests, mutation tests, and performance tests.

## The Red-Green-Refactor Cycle

### 1. RED - Write a Failing Test

```typescript
// __tests__/unit/services/emergencyService.test.ts
import { emergencyContactFactory } from '@/__tests__/factories';
import { EmergencyService } from '@/services/emergency';

describe('EmergencyService', () => {
  it('should dispatch emergency team within 30 minutes for water damage in Hamilton', () => {
    // Arrange
    const contact = emergencyContactFactory.createWaterDamage();
    const service = new EmergencyService();

    // Act
    const dispatch = service.dispatch(contact);

    // Assert
    expect(dispatch.eta).toBeLessThanOrEqual(30);
    expect(dispatch.suburb).toBe('Hamilton');
  });
});
```

**Run the test - it should FAIL:**
```bash
npm test -- emergencyService.test.ts
```

### 2. GREEN - Write Minimum Code to Pass

```typescript
// src/services/emergency.ts
export class EmergencyService {
  dispatch(contact: EmergencyContact) {
    return {
      eta: 30,
      suburb: contact.address.split(',')[1].trim()
    };
  }
}
```

**Run the test - it should PASS:**
```bash
npm test -- emergencyService.test.ts
```

### 3. REFACTOR - Improve Code Quality

```typescript
// src/services/emergency.ts
export class EmergencyService {
  private readonly HIGH_PRIORITY_SUBURBS = ['Hamilton', 'Ascot', 'New Farm'];
  private readonly STANDARD_ETA = 45;
  private readonly PRIORITY_ETA = 30;

  dispatch(contact: EmergencyContact) {
    const suburb = this.extractSuburb(contact.address);
    const eta = this.calculateETA(suburb, contact.serviceType);

    return { eta, suburb };
  }

  private extractSuburb(address: string): string {
    return address.split(',')[1].trim();
  }

  private calculateETA(suburb: string, serviceType: string): number {
    const isHighPriority = this.HIGH_PRIORITY_SUBURBS.includes(suburb);
    const isEmergency = ['water-damage-restoration', 'fire-damage-restoration'].includes(serviceType);

    return (isHighPriority && isEmergency) ? this.PRIORITY_ETA : this.STANDARD_ETA;
  }
}
```

**Run tests again - should still PASS:**
```bash
npm test -- emergencyService.test.ts
```

## Test Structure

### Test Organization

```
__tests__/
├── unit/                    # Unit tests (isolated)
│   ├── components/          # React component tests
│   ├── lib/                 # Utility function tests
│   └── services/            # Business logic tests
├── integration/             # Integration tests
│   ├── api/                 # API endpoint tests
│   └── workflows/           # Multi-service tests
├── contract/                # Contract tests (Pact)
│   ├── pact-config.ts       # Contract definitions
│   └── providers/           # Provider contract tests
├── e2e/                     # End-to-end tests (Playwright)
│   ├── critical-paths/      # Critical user journeys
│   └── smoke/               # Quick smoke tests
├── factories/               # Test data factories
├── helpers/                 # Test helper functions
└── matchers/                # Custom Jest matchers
```

### Naming Conventions

**Test Files:**
- Unit tests: `ComponentName.test.tsx` or `functionName.test.ts`
- Integration tests: `api-endpoint.test.ts`
- E2E tests: `user-flow.spec.ts`
- Contract tests: `provider-contract.test.ts`

**Test Cases:**
```typescript
describe('ServiceName', () => {
  describe('methodName', () => {
    it('should do X when Y', () => {
      // Test implementation
    });

    it('should throw error when invalid input', () => {
      // Test implementation
    });
  });
});
```

## Test Coverage Requirements

### Coverage Thresholds

```json
{
  "coverageThreshold": {
    "global": {
      "statements": 90,
      "branches": 85,
      "functions": 90,
      "lines": 90
    }
  }
}
```

### Critical Path Coverage

**100% coverage required for:**
- Emergency contact submission
- Quote request workflows
- Insurance claim validation
- Service booking flows
- Critical SEO pages (homepage, service pages)

### Check Coverage

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## Test Data Management

### Use Factories for Realistic Data

```typescript
import { emergencyContactFactory, quoteRequestFactory } from '@/__tests__/factories';

// Create single instance
const contact = emergencyContactFactory.create();

// Create with overrides
const hamiltonContact = emergencyContactFactory.create({
  suburb: 'Hamilton',
  serviceType: 'water-damage-restoration'
});

// Create batch
const contacts = emergencyContactFactory.createBatch(10);

// Use specialized factories
const waterDamage = emergencyContactFactory.createWaterDamage();
const fireDamage = emergencyContactFactory.createFireDamage();
```

### Custom Matchers

```typescript
import '@/__tests__/matchers/custom-matchers';

describe('Contact form validation', () => {
  it('should validate phone number', () => {
    expect('1300 309 361').toBeValidPhoneNumber();
    expect('0412 345 678').toBeValidPhoneNumber();
  });

  it('should validate Brisbane address', () => {
    const address = '123 Main St, Hamilton, QLD 4007';
    expect(address).toBeValidBrisbaneAddress();
  });

  it('should validate service type', () => {
    expect('water-damage-restoration').toBeValidServiceType();
  });
});
```

## Testing Strategies

### Unit Testing

**Test in isolation:**
```typescript
// Mock external dependencies
jest.mock('@/lib/api-client');

describe('QuoteService', () => {
  it('should calculate quote for water damage', () => {
    const service = new QuoteService();
    const quote = service.calculate({
      serviceType: 'water-damage-restoration',
      affectedArea: 50,
      severity: 'moderate'
    });

    expect(quote.estimate).toBeGreaterThan(0);
    expect(quote.urgency).toBe('same-day');
  });
});
```

### Integration Testing

**Test multiple components together:**
```typescript
describe('Quote Request API', () => {
  it('should create quote, send email, and notify team', async () => {
    const quote = quoteRequestFactory.create();

    const response = await fetch('/api/quotes', {
      method: 'POST',
      body: JSON.stringify(quote)
    });

    expect(response.status).toBe(201);

    // Verify email sent
    expect(emailService.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: quote.email,
        subject: expect.stringContaining('Quote Request')
      })
    );
  });
});
```

### Contract Testing

**Define provider contracts:**
```typescript
import { pactProvider, googleMapsContract } from '@/__tests__/contract/pact-config';

describe('Google Maps API Contract', () => {
  beforeAll(() => pactProvider.setup());
  afterAll(() => pactProvider.finalize());

  it('should geocode Brisbane addresses', async () => {
    await pactProvider.addInteraction(googleMapsContract);

    const result = await geocodeAddress('123 Main St, Hamilton, Brisbane');

    expect(result.lat).toBeCloseTo(-27.4381);
    expect(result.lng).toBeCloseTo(153.0528);
  });
});
```

### Mutation Testing

**Verify test quality:**
```bash
# Run mutation tests
npm run test:mutation

# View mutation report
open reports/mutation/mutation-report.html
```

**Mutation testing checks:**
- Are tests actually validating behavior?
- Can code be changed without tests failing?
- What's the real quality of test suite?

## Performance Testing

### Load Testing with k6

```bash
# Run basic load test
npm run test:load

# Run spike test (sudden traffic surge)
npm run test:load:spike

# Run stress test (extreme load)
npm run test:load:stress

# Run soak test (long duration)
npm run test:load:soak
```

### Performance Benchmarks

```typescript
describe('Homepage Performance', () => {
  it('should load in under 2 seconds', async () => {
    const start = Date.now();
    await fetch('http://localhost:3000');
    const duration = Date.now() - start;

    expect(duration).toHaveFastLoadTime(2000);
  });
});
```

## CI/CD Integration

### Pre-commit Hooks

**Runs automatically before each commit:**
- Type checking
- Linting
- Fast unit tests (changed files only)
- Security scan

```bash
# Skip pre-commit hooks (use sparingly)
git commit --no-verify
```

### Pre-push Hooks

**Runs automatically before each push:**
- Full type checking
- Full linting
- Complete unit test suite with coverage
- Integration tests
- Coverage threshold validation

### CI Pipeline

**GitHub Actions workflow:**
1. Quick checks (type check, lint)
2. Unit tests with coverage
3. Integration tests
4. Contract tests
5. E2E tests
6. Mutation tests (PR only)
7. Performance tests (PR only)
8. Security scanning

## Best Practices

### 1. Write Tests First (TDD)

```typescript
// ❌ DON'T - Write code then test
function calculateETA() { /* implementation */ }
test('should calculate ETA', () => { /* test */ });

// ✅ DO - Write test first
test('should calculate ETA of 30 min for Hamilton water damage', () => {
  expect(calculateETA('Hamilton', 'water-damage')).toBe(30);
});
function calculateETA() { /* now implement */ }
```

### 2. Test Behavior, Not Implementation

```typescript
// ❌ DON'T - Test internal implementation
it('should call calculateDiscount method', () => {
  const spy = jest.spyOn(service, 'calculateDiscount');
  service.processQuote(quote);
  expect(spy).toHaveBeenCalled();
});

// ✅ DO - Test external behavior
it('should apply 10% discount for repeat customers', () => {
  const quote = service.processQuote({
    ...quoteData,
    isRepeatCustomer: true
  });
  expect(quote.discount).toBe(0.10);
});
```

### 3. Keep Tests Fast

```typescript
// ❌ DON'T - Use real timers
it('should retry after 5 seconds', (done) => {
  setTimeout(() => {
    expect(retryCount).toBe(1);
    done();
  }, 5000);
});

// ✅ DO - Use fake timers
it('should retry after 5 seconds', () => {
  jest.useFakeTimers();
  service.startRetry();
  jest.advanceTimersByTime(5000);
  expect(retryCount).toBe(1);
});
```

### 4. Use Descriptive Test Names

```typescript
// ❌ DON'T - Vague test names
it('works', () => { /* test */ });
it('test quote', () => { /* test */ });

// ✅ DO - Clear, descriptive names
it('should send emergency notification to team when water damage request received', () => {
  /* test */
});
it('should return 400 error when phone number is invalid', () => {
  /* test */
});
```

### 5. One Assertion Per Test (Guideline)

```typescript
// ❌ DON'T - Multiple unrelated assertions
it('should process quote', () => {
  expect(quote.id).toBeDefined();
  expect(quote.status).toBe('pending');
  expect(emailService.send).toHaveBeenCalled();
  expect(logger.info).toHaveBeenCalled();
});

// ✅ DO - Focused assertions
it('should generate quote ID', () => {
  expect(quote.id).toBeDefined();
});

it('should set initial status to pending', () => {
  expect(quote.status).toBe('pending');
});

it('should send confirmation email', () => {
  expect(emailService.send).toHaveBeenCalledWith(
    expect.objectContaining({ to: quote.email })
  );
});
```

## Debugging Tests

### Run specific tests

```bash
# Run single file
npm test -- emergencyService.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should calculate ETA"

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage
```

### Debug in VS Code

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

## Common Pitfalls

### 1. Testing Implementation Details

**Problem:** Tests break when refactoring, even though behavior is unchanged.

**Solution:** Focus on public API and user-observable behavior.

### 2. Flaky Tests

**Problem:** Tests pass/fail randomly.

**Solutions:**
- Avoid relying on timing (use fake timers)
- Clean up after each test (reset state)
- Mock external dependencies
- Use deterministic test data

### 3. Slow Tests

**Problem:** Test suite takes too long to run.

**Solutions:**
- Mock heavy dependencies (database, external APIs)
- Use test doubles (stubs, spies)
- Parallelize test execution
- Run only affected tests during development

### 4. Low Test Coverage

**Problem:** Not enough code is tested.

**Solutions:**
- Write tests before code (TDD)
- Set coverage thresholds in CI
- Review coverage reports regularly
- Focus on critical paths first

## Resources

### Internal Documentation
- `/docs/TDD_GUIDELINES.md` - This file
- `/__tests__/factories/index.ts` - Test data factories
- `/__tests__/helpers/test-helpers.ts` - Test utilities
- `/__tests__/matchers/custom-matchers.ts` - Custom assertions

### External Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Stryker Mutator](https://stryker-mutator.io/docs/)
- [Pact Contract Testing](https://docs.pact.io/)
- [k6 Load Testing](https://k6.io/docs/)

---

**Last Updated:** 2025-11-09
**Maintained by:** Disaster Recovery Brisbane Development Team
