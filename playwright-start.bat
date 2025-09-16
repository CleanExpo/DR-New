@echo off
echo Starting Playwright MCP Server...
echo ===============================================
echo.
echo Playwright MCP enables browser automation through structured
echo accessibility snapshots without needing screenshots.
echo.
echo Features:
echo - Fast and lightweight browser automation
echo - LLM-friendly (no vision models needed)
echo - Works with Chrome, Firefox, and WebKit
echo - Deterministic tool application
echo.
echo Starting in headless mode...
npx @playwright/mcp@latest --headless --browser chrome
pause