@echo off
setlocal enabledelayedexpansion

echo ========================================
echo MCP Server Setup and Configuration Fix
echo ========================================
echo.

echo IMPORTANT: MCP servers currently only work with Claude Desktop app,
echo not Claude Code (web version). This script will set up everything
echo for when you use Claude Desktop.
echo.

REM Step 1: Check if we're in Claude Code or Desktop
echo Step 1: Detecting Claude environment...
if exist ".claude\mcp.json" (
    echo [OK] Project-level .claude\mcp.json found
) else (
    echo [WARNING] No .claude\mcp.json found
)

REM Step 2: Create Claude Desktop directory if needed
echo.
echo Step 2: Setting up Claude Desktop configuration...
set "CLAUDE_CONFIG_DIR=%APPDATA%\Claude"
if not exist "%CLAUDE_CONFIG_DIR%" (
    echo Creating Claude Desktop config directory...
    mkdir "%CLAUDE_CONFIG_DIR%" 2>nul
    if !errorlevel! == 0 (
        echo [OK] Created %CLAUDE_CONFIG_DIR%
    ) else (
        echo [WARNING] Could not create %CLAUDE_CONFIG_DIR%
        echo You may need to install Claude Desktop first
    )
) else (
    echo [OK] Claude Desktop config directory exists
)

REM Step 3: Copy configuration to Claude Desktop location
echo.
echo Step 3: Installing MCP configuration...
if exist "%CLAUDE_CONFIG_DIR%" (
    if exist "claude_desktop_config.json" (
        copy /Y "claude_desktop_config.json" "%CLAUDE_CONFIG_DIR%\claude_desktop_config.json" >nul 2>&1
        if !errorlevel! == 0 (
            echo [OK] Copied configuration to Claude Desktop
        ) else (
            echo [WARNING] Could not copy config - may need admin rights
        )
    )
)

REM Step 4: Test Node.js and npm
echo.
echo Step 4: Checking Node.js environment...
node --version >nul 2>&1
if !errorlevel! == 0 (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VER=%%i
    echo [OK] Node.js !NODE_VER! installed
) else (
    echo [ERROR] Node.js not found - required for MCP servers
    echo Please install Node.js 18+ from https://nodejs.org
)

npm --version >nul 2>&1
if !errorlevel! == 0 (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VER=%%i
    echo [OK] npm !NPM_VER! installed
) else (
    echo [ERROR] npm not found
)

REM Step 5: Install MCP server packages globally
echo.
echo Step 5: Installing MCP server packages...
echo This may take a few minutes...

echo Installing Playwright MCP...
npm install -g @playwright/mcp@latest >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Playwright MCP installed
) else (
    echo [WARNING] Could not install Playwright MCP globally
)

echo Installing Context7 MCP...
npm install -g @upstash/context7-mcp >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Context7 MCP installed
) else (
    echo [WARNING] Could not install Context7 MCP globally
)

echo Installing Sequential Thinking MCP...
npm install -g @modelcontextprotocol/server-sequential-thinking >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Sequential Thinking MCP installed
) else (
    echo [WARNING] Could not install Sequential Thinking MCP globally
)

REM Step 6: Test MCP servers
echo.
echo Step 6: Testing MCP servers...

npx @playwright/mcp@latest --help >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Playwright MCP responds to commands
) else (
    echo [WARNING] Playwright MCP not responding
)

npx @upstash/context7-mcp --help >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Context7 MCP responds to commands
) else (
    echo [WARNING] Context7 MCP not responding
)

npx @modelcontextprotocol/server-sequential-thinking --help >nul 2>&1
if !errorlevel! == 0 (
    echo [OK] Sequential Thinking MCP responds to commands
) else (
    echo [WARNING] Sequential Thinking MCP not responding
)

REM Step 7: Create test script
echo.
echo Step 7: Creating MCP test script...
(
echo // MCP Server Test Script
echo // This tests if MCP servers can be launched
echo.
echo const { spawn } = require^('child_process'^);
echo.
echo console.log^('Testing MCP Servers...'^);
echo.
echo // Test Playwright MCP
echo const playwright = spawn^('npx', ['@playwright/mcp@latest', '--help'], { shell: true }^);
echo playwright.on^('close', ^(code^) =^> {
echo   console.log^(`Playwright MCP: ${code === 0 ? 'OK' : 'FAILED'}`^);
echo }^);
echo.
echo // Test Context7 MCP
echo const context7 = spawn^('npx', ['@upstash/context7-mcp', '--help'], { shell: true }^);
echo context7.on^('close', ^(code^) =^> {
echo   console.log^(`Context7 MCP: ${code === 0 ? 'OK' : 'FAILED'}`^);
echo }^);
echo.
echo // Test Sequential Thinking
echo const sequential = spawn^('npx', ['@modelcontextprotocol/server-sequential-thinking', '--help'], { shell: true }^);
echo sequential.on^('close', ^(code^) =^> {
echo   console.log^(`Sequential Thinking MCP: ${code === 0 ? 'OK' : 'FAILED'}`^);
echo }^);
) > test-mcp-servers.js

REM Step 8: Display configuration status
echo.
echo ========================================
echo MCP Configuration Status
echo ========================================
echo.
echo Configuration Files:
if exist ".claude\mcp.json" (
    echo [✓] .claude\mcp.json - Project configuration
) else (
    echo [✗] .claude\mcp.json - Not found
)

if exist "claude_desktop_config.json" (
    echo [✓] claude_desktop_config.json - Desktop configuration
) else (
    echo [✗] claude_desktop_config.json - Not found
)

if exist "%CLAUDE_CONFIG_DIR%\claude_desktop_config.json" (
    echo [✓] %CLAUDE_CONFIG_DIR%\claude_desktop_config.json - Installed
) else (
    echo [✗] %CLAUDE_CONFIG_DIR%\claude_desktop_config.json - Not installed
)

echo.
echo MCP Servers Configured:
echo - Playwright MCP (browser automation)
echo - Context7 MCP (documentation lookup)
echo - Sequential Thinking MCP (structured problem solving)
echo.

REM Step 9: Solution summary
echo ========================================
echo SOLUTION TO ENABLE MCP SERVERS
echo ========================================
echo.
echo The issue: You're using Claude Code (web version), which doesn't
echo          support MCP servers yet. MCP only works with Claude Desktop.
echo.
echo TO FIX THIS:
echo.
echo 1. INSTALL CLAUDE DESKTOP:
echo    - Download from: https://claude.ai/desktop
echo    - Install and sign in with your account
echo.
echo 2. CONFIGURATION IS READY:
echo    - Config file prepared: claude_desktop_config.json
echo    - Will be copied to: %CLAUDE_CONFIG_DIR%
echo.
echo 3. RESTART CLAUDE DESKTOP:
echo    - Close Claude Desktop completely
echo    - Reopen Claude Desktop
echo    - Open this project folder
echo    - MCP servers should be available
echo.
echo 4. VERIFY MCP IS WORKING:
echo    - In Claude Desktop, type: /mcp
echo    - You should see available MCP servers
echo.
echo 5. IF STILL NOT WORKING:
echo    - Ensure Node.js 18+ is installed
echo    - Run this script again after installing Claude Desktop
echo    - Check Windows Defender/Firewall isn't blocking
echo.

pause