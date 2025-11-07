@echo off
REM Comprehensive test runner for Disaster Recovery website (Windows)

echo Starting comprehensive test suite...
echo.

REM 1. Unit Tests
echo 1. Running unit tests...
call npm run test:coverage
echo.

REM 2. Integration Tests
echo 2. Running integration tests...
call npm test -- __tests__/integration --silent
echo.

REM 3. E2E Tests
echo 3. Running E2E tests...
call npx playwright test __tests__/e2e --reporter=list
echo.

REM 4. Accessibility Tests
echo 4. Running accessibility tests...
call npx playwright test __tests__/accessibility --reporter=list
echo.

REM 5. SEO Tests
echo 5. Running SEO tests...
call npx playwright test __tests__/seo --reporter=list
echo.

REM 6. Performance Tests
echo 6. Running performance tests...
call npx playwright test __tests__/performance --reporter=list
echo.

REM 7. Security Tests
echo 7. Running security tests...
call npx playwright test __tests__/security --reporter=list
echo.

REM 8. Mobile Responsiveness Tests
echo 8. Running mobile responsiveness tests...
call npx playwright test __tests__/mobile --reporter=list
echo.

REM 9. Browser Compatibility Tests
echo 9. Running browser compatibility tests...
call npx playwright test __tests__/contract/browser-compatibility.spec.ts --reporter=list
echo.

REM 10. Form Validation Tests
echo 10. Running form validation tests...
call npx playwright test __tests__/contract/form-validation.spec.ts --reporter=list
echo.

echo All test suites completed!
echo.
echo Test Reports:
echo   - Jest coverage: coverage\index.html
echo   - Playwright report: npx playwright show-report
echo.

pause
