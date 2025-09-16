@echo off
echo ========================================
echo MCP Installation Troubleshooting
echo ========================================
echo.

echo Checking Node.js version...
node --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js v18.0.0 or higher from https://nodejs.org
    goto :end
)
echo OK - Node.js is installed
echo.

echo Checking npm version...
npm --version
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm is not available
    goto :end
)
echo OK - npm is available
echo.

echo Checking Context7 MCP installation...
npm list @upstash/context7-mcp 2>nul | findstr "@upstash/context7-mcp" >nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Context7 MCP not found in local packages
    echo Installing Context7 MCP...
    npm install --save-dev @upstash/context7-mcp
) else (
    echo OK - Context7 MCP is installed
)
echo.

echo Checking Sequential Thinking MCP installation...
npm list @modelcontextprotocol/server-sequential-thinking 2>nul | findstr "@modelcontextprotocol/server-sequential-thinking" >nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Sequential Thinking MCP not found in local packages
    echo Installing Sequential Thinking MCP...
    npm install --save-dev @modelcontextprotocol/server-sequential-thinking
) else (
    echo OK - Sequential Thinking MCP is installed
)
echo.

echo Checking Playwright MCP installation...
npm list @playwright/mcp 2>nul | findstr "@playwright/mcp" >nul
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Playwright MCP not found in local packages
    echo Installing Playwright MCP...
    npm install --save-dev @playwright/mcp
) else (
    echo OK - Playwright MCP is installed
)
echo.

echo Checking configuration files...
if exist "mcp.json" (
    echo OK - mcp.json found
) else (
    echo WARNING: mcp.json not found
)

if exist ".claude\mcp.json" (
    echo OK - .claude\mcp.json found (Claude Code config)
) else (
    echo INFO: .claude\mcp.json not found (optional)
)

if exist ".vscode\mcp.json" (
    echo OK - .vscode\mcp.json found (VS Code config)
) else (
    echo INFO: .vscode\mcp.json not found (optional)
)

if exist "%APPDATA%\Claude\claude_desktop_config.json" (
    echo OK - Claude Desktop config found
) else (
    echo INFO: Claude Desktop config not found
    echo Run setup-claude-desktop.bat to configure Claude Desktop
)
echo.

echo Testing Context7 MCP server...
echo Starting test (press Ctrl+C after a few seconds)...
timeout /t 2 >nul
call npx @upstash/context7-mcp --help >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo OK - Context7 MCP server responds to commands
) else (
    echo WARNING: Context7 MCP server may have issues
)
echo.

echo Testing Playwright MCP server...
call npx @playwright/mcp@latest --help >nul 2>&1
if %ERRORLEVEL% == 0 (
    echo OK - Playwright MCP server responds to commands
) else (
    echo WARNING: Playwright MCP server may have issues
)
echo.

echo ========================================
echo Troubleshooting Complete
echo ========================================
echo.
echo If you see any errors above:
echo 1. Fix the issues mentioned
echo 2. Run 'npm install' to reinstall packages
echo 3. Restart your Anthropic application
echo.

:end
pause