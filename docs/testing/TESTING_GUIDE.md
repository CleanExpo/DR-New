# Testing Guide: Contractor Verification System

## Quick Start

This guide provides instructions for running tests for the contractor verification and booking system (UNI-182).

## Test Types

### 1. Unit Tests
Located in: `apps/web/src/__tests__/unit/`

**Run unit tests:**
```bash
cd apps/web
npm run test:unit
```

### 2. Integration Tests
Located in: `apps/web/src/__tests__/integration/`

**Run integration tests:**
```bash
cd apps/web
npm run test:integration
```

**Specific test:**
```bash
npm test -- contractor-verification.test.ts
```

### 3. End-to-End Tests (Playwright)
Located in: `apps/web/e2e/`

**Install Playwright (first time only):**
```bash
npx playwright install
```

**Run E2E tests:**
```bash
npm run test:e2e
```

**Run E2E tests with UI:**
```bash
npm run test:e2e:ui
```

**Run specific test:**
```bash
npx playwright test contractor-flow.spec.ts
```

**Run in headed mode (see browser):**
```bash
npx playwright test --headed
```

**Run specific browser:**
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### 4. Manual Testing
See: `docs/testing/manual-testing-checklist.md`

Print the checklist and use it during manual testing sessions.

---

## Test Environment Setup

### Prerequisites

1. **Database**:
   ```bash
   # Ensure database is running
   npm run db:push  # Push schema to database
   npm run db:seed  # Seed with test data (if available)
   ```

2. **Environment Variables**:
   Create `.env.test` with:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/test_db"
   NEXTAUTH_SECRET="test-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   RESEND_API_KEY="test-key"  # or enable mock
   ```

3. **Development Server** (for E2E tests):
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

### Test Users

Create these users in your test database:

**Admin:**
- Email: `admin@disasterrecovery.com`
- Password: `Admin123!`
- Role: `ADMIN`

**Test Contractor:**
- Email: `test-contractor@example.com`
- Password: `Test123!`
- Role: `CONTRACTOR`

**Test Client:**
- Email: `test-client@example.com`
- Password: `Test123!`
- Role: `CLIENT`

---

## Running All Tests

**Full test suite:**
```bash
npm run test         # Unit tests
npm run test:integration  # Integration tests
npm run test:e2e     # E2E tests
```

**With coverage:**
```bash
npm run test:coverage
```

**CI mode:**
```bash
npm run test:ci
```

---

## Test Documentation

### Comprehensive E2E Test Plan
📄 `docs/testing/e2e-contractor-flow.md`

Contains:
- 8 detailed test scenarios
- Test steps and expected outcomes
- Test data requirements
- Automated test scripts
- Success criteria

### Manual Testing Checklist
📄 `docs/testing/manual-testing-checklist.md`

Contains:
- 10 major test sections
- 200+ individual checks
- Pass/fail tracking
- Issue reporting template

### Integration Test Scenarios
📄 `apps/web/src/__tests__/integration/contractor-verification.test.ts`

Tests:
- Contractor profile management
- Document management
- Service area management
- Admin verification actions
- Status transitions
- Email notifications (mocked)

### Playwright E2E Tests
📄 `apps/web/e2e/contractor-flow.spec.ts`

Tests:
- Complete contractor onboarding
- Admin verification process
- Client booking flow
- Analytics tracking
- Error handling
- Mobile responsiveness

---

## Test Scenarios

### Scenario 1: Happy Path (Full Flow)

1. Contractor registers ✓
2. Completes profile ✓
3. Uploads documents ✓
4. Adds service areas ✓
5. Submits for verification ✓
6. Admin marks under review ✓
7. Admin approves ✓
8. Client views profile ✓
9. Client creates booking ✓
10. Contractor accepts booking ✓
11. Booking completed ✓
12. Client leaves 5-star rating ✓
13. Analytics updated ✓

**Run this scenario:**
```bash
npx playwright test contractor-flow.spec.ts --grep "complete contractor registration"
```

### Scenario 2: Rejection Flow

1. Contractor submits incomplete profile
2. Admin reviews and requests changes
3. Contractor updates profile
4. Admin rejects (for testing)
5. Email notifications sent

### Scenario 3: Profile View Tracking

1. Anonymous user views contractor profile
2. Waits 3 seconds
3. View tracked
4. Monthly views incremented
5. Analytics updated

### Scenario 4: Multiple Bookings & Ratings

1. Client creates 5 bookings
2. Contractor completes all
3. Client rates: 5, 4, 5, 4, 5 stars
4. Average rating calculated: 4.6
5. Rating distribution updated
6. Analytics show correct metrics

---

## Debugging Tests

### View Test Results

**Playwright HTML Report:**
```bash
npx playwright show-report
```

**Jest Coverage Report:**
```bash
npm run test:coverage
# Opens: coverage/lcov-report/index.html
```

### Debug Specific Test

**Playwright Debug Mode:**
```bash
npx playwright test --debug
```

**Jest Debug:**
```bash
node --inspect-brk node_modules/.bin/jest contractor-verification.test.ts
```

### Screenshots & Videos

Playwright automatically captures:
- Screenshots on failure
- Videos on failure
- Traces on retry

Located in: `test-results/`

---

## Common Issues

### Issue: Prisma Client Not Generated

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
npx prisma generate
```

### Issue: Database Connection Failed

**Error**: `Can't reach database server`

**Solution**:
1. Check PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Test connection: `npx prisma db pull`

### Issue: Port 3000 Already in Use

**Error**: `Port 3000 is already in use`

**Solution**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port
PORT=3001 npm run dev
```

### Issue: Tests Timing Out

**Error**: `Timeout of 30000ms exceeded`

**Solution**:
```bash
# Increase timeout
npx playwright test --timeout=60000
```

### Issue: Email Tests Failing

**Cause**: Email service not configured

**Solution**:
1. Set `RESEND_API_KEY` in `.env`
2. Or enable email mocking in test config
3. Or skip email verification tests

---

## Performance Benchmarks

### Target Metrics

- **Unit Tests**: < 10 seconds total
- **Integration Tests**: < 60 seconds total
- **E2E Tests**: < 5 minutes total
- **Page Load**: < 2 seconds
- **API Response**: < 500ms

### Measure Performance

```bash
# Jest with timing
npm test -- --verbose

# Playwright with trace
npx playwright test --trace on
```

---

## Continuous Integration

### GitHub Actions Workflow

The E2E tests run automatically on:
- Push to `main` branch
- Pull requests to `main`
- Manual workflow dispatch

**View results**:
- GitHub Actions tab
- Test artifacts (screenshots, videos)
- Coverage reports

### Running Tests Locally Like CI

```bash
# Simulate CI environment
CI=true npm run test:ci
CI=true npm run test:e2e
```

---

## Test Coverage Goals

### Current Coverage (Example)

- **Unit Tests**: 85%
- **Integration Tests**: 75%
- **E2E Tests**: 90% of critical paths

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View in browser
open coverage/lcov-report/index.html
```

### Priority for Coverage

1. **Critical**: Authentication, authorization, payments
2. **High**: Verification workflow, booking flow
3. **Medium**: Analytics, notifications
4. **Low**: UI components, styling

---

## Best Practices

### Writing Tests

1. **Descriptive Names**: Use clear, specific test names
2. **Arrange-Act-Assert**: Structure tests clearly
3. **Independent Tests**: Each test should run independently
4. **Clean Up**: Always clean up test data
5. **Mock External Services**: Don't call real APIs in tests

### Test Data

1. **Unique Identifiers**: Use timestamps or UUIDs
2. **Realistic Data**: Use real-looking names, addresses
3. **Edge Cases**: Test boundary conditions
4. **Invalid Data**: Test validation errors

### Maintenance

1. **Review Monthly**: Check for flaky tests
2. **Update Docs**: Keep documentation current
3. **Monitor CI**: Watch for failing tests
4. **Refactor**: Remove duplicate test code

---

## Quick Reference Commands

```bash
# Unit tests
npm test

# Watch mode (re-run on changes)
npm run test:watch

# Integration tests
npm run test:integration

# E2E tests (all browsers)
npm run test:e2e

# E2E tests (UI mode - interactive)
npm run test:e2e:ui

# E2E tests (single browser)
npx playwright test --project=chromium

# E2E tests (headed mode - see browser)
npx playwright test --headed

# E2E tests (debug mode)
npx playwright test --debug

# E2E tests (specific file)
npx playwright test contractor-flow.spec.ts

# View test report
npx playwright show-report

# Coverage report
npm run test:coverage

# Database setup
npm run db:push
npm run db:seed
npm run db:studio

# Clean and restart
npm run clean
npm install
npm run dev
```

---

## Support & Resources

### Documentation
- `docs/testing/e2e-contractor-flow.md` - Detailed E2E test plan
- `docs/testing/manual-testing-checklist.md` - Manual testing checklist
- `docs/contractor-analytics.md` - Analytics system documentation

### Tools
- [Playwright Docs](https://playwright.dev)
- [Jest Docs](https://jestjs.io)
- [Testing Library](https://testing-library.com)

### Getting Help
- Check existing test files for examples
- Review documentation in `docs/testing/`
- Check GitHub Issues
- Contact development team

---

## Test Execution Report Template

```markdown
# Test Execution Report

**Date**: [Date]
**Tester**: [Name]
**Environment**: [Dev/Staging/Prod]
**Version/Branch**: [Branch name]

## Summary
- Total Tests: ___
- Passed: ___
- Failed: ___
- Skipped: ___
- Duration: ___ minutes

## Results by Type
- Unit Tests: ☐ Pass ☐ Fail
- Integration Tests: ☐ Pass ☐ Fail
- E2E Tests: ☐ Pass ☐ Fail
- Manual Tests: ☐ Pass ☐ Fail

## Issues Found
1. [Issue description]
2. [Issue description]

## Test Coverage
- Statements: ___%
- Branches: ___%
- Functions: ___%
- Lines: ___%

## Recommendations
- [Recommendation 1]
- [Recommendation 2]

## Sign-off
☐ Approved for deployment
☐ Requires fixes

**Tester**: _________________ **Date**: _________
```

---

**Last Updated**: 2025-01-28
**Version**: 1.0
**Maintained By**: DR-NRPG Development Team
