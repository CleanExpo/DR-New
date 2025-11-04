# NRPG Platform CRM - Testing Framework

## Overview

Comprehensive testing suite for the NRPG Platform CRM built with Next.js 14, TypeScript, Prisma ORM, and Stripe integration.

## Test Stack

- **Test Runner**: Jest 30.2.0
- **Component Testing**: React Testing Library 16.3.0
- **E2E Testing**: Playwright 1.56.1
- **API Testing**: Supertest 7.1.4
- **Mocking**: MSW (Mock Service Worker) 2.11.6

## Test Coverage Goals

- **Unit Tests**: 80%+ line coverage
- **Integration Tests**: Critical user workflows
- **E2E Tests**: Core business processes
- **API Tests**: All 39 endpoints

## Directory Structure

```
__tests__/
├── factories/              # Test data factories
│   ├── job.factory.ts
│   ├── contractor.factory.ts
│   └── invoice.factory.ts
├── lib/                    # Service layer tests
│   ├── contractor-matching-service.test.ts
│   ├── job-management-service.test.ts
│   └── scheduling-service.test.ts
├── api/                    # API endpoint tests
│   ├── jobs/
│   └── contractors/
├── components/             # React component tests
│   ├── jobs/
│   └── invoices/
└── integration/            # End-to-end workflow tests
    ├── job-lifecycle.test.ts
    └── contractor-rotation.test.ts
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI/CD Pipeline
```bash
npm run test:ci
```

### E2E Tests
```bash
npm run test:e2e
npm run test:e2e:ui       # Interactive UI mode
npm run test:e2e:debug    # Debug mode
```

## Test Factories

Test factories generate realistic mock data for testing.

### Job Factory

```typescript
import { createMockJob, createMockJobList } from '__tests__/factories/job.factory';

// Single job
const job = createMockJob({
  type: 'WATER_DAMAGE',
  priority: 'URGENT',
  suburb: 'Hamilton',
});

// Multiple jobs
const jobs = createMockJobList(10);
```

### Contractor Factory

```typescript
import { createMockContractor, createMockContractorList } from '__tests__/factories/contractor.factory';

// Single contractor
const contractor = createMockContractor({
  tier: 'PREMIUM',
  serviceRadiusKm: 50,
});

// Multiple contractors
const contractors = createMockContractorList(5);
```

### Invoice Factory

```typescript
import { createMockInvoice, calculateInvoiceTotals } from '__tests__/factories/invoice.factory';

// Single invoice
const invoice = createMockInvoice({
  status: 'PAID',
  total: 1875.50,
});

// Calculate GST (Australian 10%)
const totals = calculateInvoiceTotals(lineItems);
// Returns: { subtotal, gstAmount, total }
```

## Writing Tests

### AAA Pattern (Arrange, Act, Assert)

All tests follow the AAA pattern for clarity:

```typescript
it('should create a new job with valid data', async () => {
  // Arrange: Set up test data
  const jobData = {
    type: 'WATER_DAMAGE',
    priority: 'URGENT',
    suburb: 'Hamilton',
  };

  // Act: Perform the action
  const result = await createJob(jobData);

  // Assert: Verify the outcome
  expect(result.status).toBe('PENDING');
  expect(result.jobNumber).toMatch(/^JOB-\d{4}-\d{3}$/);
});
```

## Key Test Suites

### 1. Contractor Matching Service

Tests the Haversine formula-based distance calculation and fair rotation algorithm.

**Location**: `__tests__/lib/contractor-matching-service.test.ts`

**Key Tests**:
- Haversine distance calculation (kilometres)
- Contractor filtering by service radius
- Specialisation matching
- Fair rotation algorithm
- Tier and rating prioritisation

### 2. Job Management Service

Tests job creation, status transitions, and business logic.

**Location**: `__tests__/lib/job-management-service.test.ts`

**Key Tests**:
- Job creation with validation
- Unique job number generation
- Status transitions (PENDING → ASSIGNED → IN_PROGRESS → COMPLETED)
- Job queries and filtering
- Cost variance calculation

### 3. Scheduling Service

Tests conflict detection and time slot management.

**Location**: `__tests__/lib/scheduling-service.test.ts`

**Key Tests**:
- Schedule conflict detection
- Contractor availability checking
- Time slot generation
- Job prioritisation by urgency
- Travel route optimisation

## Best Practices

### 1. Test Isolation

Each test should be completely independent.

```typescript
beforeEach(() => {
  jest.clearAllMocks();
});
```

### 2. Descriptive Test Names

Use "should" statements that describe expected behaviour.

### 3. Use Australian English

Maintain consistency with codebase:
- kilometres (not kilometers)
- optimise (not optimize)
- centre (not center)

### 4. Mock External Services

Always mock Stripe, email, SMS, and third-party APIs.

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
