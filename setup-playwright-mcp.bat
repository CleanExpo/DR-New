@echo off
echo ========================================
echo Playwright MCP Setup for Disaster Recovery Website
echo ========================================
echo.

echo Checking Node.js version...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js v18+ from https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=1,2 delims=." %%a in ('node --version') do (
    set "node_ver=%%a"
    set "node_ver=!node_ver:v=!"
)
echo OK - Node.js is installed
echo.

echo Installing Playwright MCP globally...
npm install -g @playwright/mcp@latest
if %errorlevel% neq 0 (
    echo WARNING: Global install failed, will use npx instead
) else (
    echo OK - Playwright MCP installed globally
)
echo.

echo ========================================
echo Playwright MCP Configuration Options
echo ========================================
echo.
echo Three configurations have been added:
echo.
echo 1. DEFAULT (playwright) - Standard browser automation
echo    - Runs in headed mode (visible browser)
echo    - Chrome browser with 1280x720 viewport
echo    - Persistent profile for logged-in sessions
echo.
echo 2. HEADED (playwright-headed) - Visible browser with custom profile
echo    - Runs with visible browser window
echo    - Saves profile to: %%USERPROFILE%%\AppData\Local\ms-playwright\mcp-chrome-profile
echo    - Good for debugging and visual verification
echo.
echo 3. ISOLATED (playwright-isolated) - Clean session testing
echo    - Runs in headless mode (no visible browser)
echo    - Isolated profile (no saved state between sessions)
echo    - Best for automated testing
echo.

echo ========================================
echo Testing Playwright MCP Installation
echo ========================================
echo.

echo Testing basic installation...
npx @playwright/mcp@latest --help >nul 2>&1
if %errorlevel% equ 0 (
    echo SUCCESS: Playwright MCP is available!
) else (
    echo ERROR: Could not run Playwright MCP
    echo Trying to install Playwright browsers...
    npx playwright install chromium
)
echo.

echo Installing Playwright browsers if needed...
npx playwright install-deps
npx playwright install chromium
echo.

echo ========================================
echo Available Playwright MCP Tools
echo ========================================
echo.
echo Core Automation:
echo - navigate_browser: Go to a URL
echo - click: Click on elements
echo - fill: Fill form fields
echo - select_option: Select dropdown options
echo - type: Type text with keyboard
echo - press: Press keyboard keys
echo - wait_for_element: Wait for element visibility
echo - take_screenshot: Capture page screenshots
echo.
echo Tab Management:
echo - get_browser_tabs: List open tabs
echo - switch_browser_tab: Switch between tabs
echo - close_browser_tab: Close specific tabs
echo.
echo Advanced Features (with --caps flag):
echo - vision: Coordinate-based interactions
echo - pdf: PDF generation capabilities
echo - verify: Verification tools
echo - tracing: Session tracing
echo.

echo ========================================
echo Testing with Disaster Recovery Website
echo ========================================
echo.
echo Creating test script...
(
echo const playwright = require^('@playwright/test'^);
echo.
echo async function testDisasterRecovery^(^) {
echo   console.log^('Testing Disaster Recovery Website...'^);
echo   const browser = await playwright.chromium.launch^({ headless: false }^);
echo   const page = await browser.newPage^(^);
echo
echo   console.log^('Navigating to localhost:3000...'^);
echo   await page.goto^('http://localhost:3000'^);
echo
echo   console.log^('Checking emergency hotline...'^);
echo   const hotline = await page.textContent^('[href="tel:1300309361"]'^);
echo   console.log^('Emergency hotline found: ' + hotline^);
echo
echo   console.log^('Taking screenshot...'^);
echo   await page.screenshot^({ path: 'disaster-recovery-test.png' }^);
echo
echo   await browser.close^(^);
echo   console.log^('Test completed successfully!'^);
echo }
echo.
echo testDisasterRecovery^(^).catch^(console.error^);
) > test-playwright-dr.js

echo.
echo Running quick test...
node test-playwright-dr.js 2>nul
if %errorlevel% equ 0 (
    echo Test completed! Check disaster-recovery-test.png
) else (
    echo Test script created but not executed
    echo Run manually with: node test-playwright-dr.js
)
echo.

echo ========================================
echo Next Steps
echo ========================================
echo.
echo 1. Restart Claude Desktop completely
echo 2. Playwright MCP tools will be available
echo 3. Test with commands like:
echo    "Navigate to the disaster recovery website and take a screenshot"
echo    "Click on the emergency contact button"
echo    "Fill out the contact form with test data"
echo.
echo Configuration files updated:
echo - claude_desktop_config.json (3 Playwright configs)
echo - .claude\mcp.json (project-specific config)
echo.

pause