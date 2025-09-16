@echo off
echo Starting Playwright MCP Server with Custom Configuration...
echo ===========================================================
echo.
echo Using configuration from playwright-config.json:
echo - Browser: Chrome
echo - Mode: Headed (visible)
echo - Viewport: 1280x720
echo - Location: Brisbane, Australia
echo - Timezone: Australia/Brisbane
echo.
npx @playwright/mcp@latest --config playwright-config.json
pause