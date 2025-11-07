#!/bin/bash

# Comprehensive test runner for Disaster Recovery website
# Runs all test suites and generates reports

set -e

echo "🧪 Starting comprehensive test suite..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Unit Tests
echo -e "${YELLOW}1. Running unit tests...${NC}"
npm run test:coverage || echo -e "${RED}Unit tests failed${NC}"
echo ""

# 2. Integration Tests
echo -e "${YELLOW}2. Running integration tests...${NC}"
npm test -- __tests__/integration --silent || echo -e "${RED}Integration tests failed${NC}"
echo ""

# 3. E2E Tests
echo -e "${YELLOW}3. Running E2E tests...${NC}"
npx playwright test __tests__/e2e --reporter=list || echo -e "${RED}E2E tests failed${NC}"
echo ""

# 4. Accessibility Tests
echo -e "${YELLOW}4. Running accessibility tests...${NC}"
npx playwright test __tests__/accessibility --reporter=list || echo -e "${RED}Accessibility tests failed${NC}"
echo ""

# 5. SEO Tests
echo -e "${YELLOW}5. Running SEO tests...${NC}"
npx playwright test __tests__/seo --reporter=list || echo -e "${RED}SEO tests failed${NC}"
echo ""

# 6. Performance Tests
echo -e "${YELLOW}6. Running performance tests...${NC}"
npx playwright test __tests__/performance --reporter=list || echo -e "${RED}Performance tests failed${NC}"
echo ""

# 7. Security Tests
echo -e "${YELLOW}7. Running security tests...${NC}"
npx playwright test __tests__/security --reporter=list || echo -e "${RED}Security tests failed${NC}"
echo ""

# 8. Mobile Responsiveness Tests
echo -e "${YELLOW}8. Running mobile responsiveness tests...${NC}"
npx playwright test __tests__/mobile --reporter=list || echo -e "${RED}Mobile tests failed${NC}"
echo ""

# 9. Browser Compatibility Tests
echo -e "${YELLOW}9. Running browser compatibility tests...${NC}"
npx playwright test __tests__/contract/browser-compatibility.spec.ts --reporter=list || echo -e "${RED}Browser tests failed${NC}"
echo ""

# 10. Form Validation Tests
echo -e "${YELLOW}10. Running form validation tests...${NC}"
npx playwright test __tests__/contract/form-validation.spec.ts --reporter=list || echo -e "${RED}Form validation tests failed${NC}"
echo ""

echo -e "${GREEN}✅ All test suites completed!${NC}"
echo ""
echo "📊 Test Reports:"
echo "  - Jest coverage: coverage/index.html"
echo "  - Playwright report: npx playwright show-report"
echo ""
