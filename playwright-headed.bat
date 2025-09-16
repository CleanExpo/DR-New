@echo off
echo Starting Playwright MCP Server (Headed Mode)...
echo ===============================================
echo.
echo This will start Playwright in headed mode so you can
echo see the browser actions being performed.
echo.
echo Browser: Chrome
echo Mode: Headed (visible browser window)
echo Viewport: 1280x720
echo.
npx @playwright/mcp@latest --browser chrome --viewport-size "1280,720"
pause