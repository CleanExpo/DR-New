# Quick Testing Guide

## Run Tests

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm run test:ci             # CI mode
```

## Write a Test

```typescript
import { createMockJob } from '__tests__/factories/job.factory';

describe('Feature Name', () => {
  it('should do something', () => {
    // Arrange
    const job = createMockJob({ suburb: 'Hamilton' });
    
    // Act
    const result = processJob(job);
    
    // Assert
    expect(result.status).toBe('COMPLETED');
  });
});
```

## Factories

```typescript
createMockJob()              // Single job
createMockJobList(10)        // 10 jobs
createMockContractor()       // Single contractor
createMockContractorList(5)  // 5 contractors
createMockInvoice()          // Invoice with GST
```

## Coverage Report

```bash
npm run test:coverage
# View: coverage/lcov-report/index.html
```

## Documentation

- Full Guide: `TESTING.md`
- Summary: `TEST_FRAMEWORK_SUMMARY.md`
- Test Files: `__tests__/`
