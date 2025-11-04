# NRPG Platform CRM - Testing Framework Documentation Index

## Quick Links

### 🚀 Getting Started
- **[QUICK_TEST_GUIDE.md](QUICK_TEST_GUIDE.md)** - Start here! Quick reference for running tests

### 📚 Comprehensive Documentation
- **[TESTING.md](TESTING.md)** - Complete testing guide with examples and best practices
- **[TEST_FRAMEWORK_SUMMARY.md](TEST_FRAMEWORK_SUMMARY.md)** - Detailed summary of all components
- **[TESTING_SETUP_COMPLETE.md](TESTING_SETUP_COMPLETE.md)** - Final setup completion report

### 🧪 Test Suite
- **[__tests__/README.md](__tests__/README.md)** - Test suite overview and structure

## File Locations

### Configuration
```
jest.config.js          # Jest configuration
jest.setup.js          # Test environment setup
```

### Test Factories
```
__tests__/factories/
  ├── job.factory.ts              # Mock job data
  ├── contractor.factory.ts       # Mock contractor data
  └── invoice.factory.ts          # Mock invoice data with GST
```

### Service Tests
```
__tests__/lib/
  ├── contractor-matching-service.test.ts    # 410 lines
  ├── job-management-service.test.ts         # 68 lines
  └── scheduling-service.test.ts             # 25 lines
```

### API Tests
```
__tests__/api/
  ├── jobs/create-job.test.ts
  └── contractors/match.test.ts
```

### Component Tests
```
__tests__/components/
  ├── jobs/JobCard.test.tsx
  └── invoices/InvoiceBuilder.test.tsx
```

### Integration Tests
```
__tests__/integration/
  ├── job-lifecycle.test.ts
  └── contractor-rotation.test.ts
```

## Commands

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # Coverage report
npm run test:ci             # CI mode
npm run test:e2e            # E2E tests
```

## Test Statistics

- Total Test Files: 13
- Test Factories: 3
- Service Tests: 3
- API Tests: 2
- Component Tests: 2
- Integration Tests: 2
- Documentation Files: 4

## Framework Status

✅ Complete and Production Ready

Last Updated: 2025-11-04
