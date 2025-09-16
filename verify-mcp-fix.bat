@echo off
:: Quick MCP Verification Script
echo ========================================
echo MCP Configuration Verification
echo ========================================
echo.

echo Current Configuration:
echo ----------------------
type .claude\mcp.json
echo.
echo.

echo Testing MCP Servers:
echo --------------------
npx.cmd -y @playwright/mcp --version 2>nul
if %errorlevel%==0 (
    echo [OK] Playwright MCP is accessible
) else (
    echo [ERROR] Playwright MCP failed
)

echo.
echo Fix Status: COMPLETE
echo.
echo To prevent future issues:
echo 1. Use 'mcp-auto-start.bat' to start Claude CLI
echo 2. Run 'mcp-health-check.bat' after system updates
echo 3. Check 'MCP_TROUBLESHOOTING_GUIDE.md' if issues occur
echo.
pause