# NRPG Platform CRM - Test Suite

## Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## Test Structure

```
__tests__/
├── factories/       Test data generators
├── lib/             Service layer unit tests  
├── api/             API endpoint tests
├── components/      React component tests
└── integration/     End-to-end workflow tests
```

## Test Factories

Pre-built test data factories for consistent mocking:

- `createMockJob()` - Generate realistic job data
- `createMockContractor()` - Generate contractor data
- `createMockInvoice()` - Generate invoice with GST calculations

## Coverage Goals

- Unit Tests: 80%+ line coverage
- Integration Tests: Critical workflows
- API Tests: All 39 endpoints

## Documentation

See `/TESTING.md` for comprehensive testing guide.
