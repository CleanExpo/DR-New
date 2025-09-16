@echo off
:: MCP Health Check and Auto-Repair Script
:: This script ensures MCP servers are always configured correctly

echo ========================================
echo MCP Health Check and Auto-Repair
echo ========================================
echo.

:: Set variables
set CLAUDE_CONFIG=.claude\mcp.json
set VSCODE_CONFIG=.vscode\mcp.json
set BACKUP_DIR=.claude\backups
set LOG_FILE=mcp-health.log

:: Create backup directory if not exists
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

:: Log start time
echo [%date% %time%] Starting MCP health check >> "%LOG_FILE%"

:: Function to check command availability
echo Checking system commands...
where npx.cmd >nul 2>&1
if %errorlevel%==0 (
    set NPX_CMD=npx.cmd
    echo Found: npx.cmd
) else (
    where npx >nul 2>&1
    if %errorlevel%==0 (
        set NPX_CMD=npx
        echo Found: npx
    ) else (
        echo ERROR: Neither npx nor npx.cmd found in PATH!
        echo Please ensure Node.js and npm are installed.
        echo [%date% %time%] ERROR: npx not found >> "%LOG_FILE%"
        pause
        exit /b 1
    )
)

:: Backup current configs
echo.
echo Backing up current configurations...
copy "%CLAUDE_CONFIG%" "%BACKUP_DIR%\mcp-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%.json.backup" >nul 2>&1
copy "%VSCODE_CONFIG%" "%BACKUP_DIR%\vscode-mcp-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%.json.backup" >nul 2>&1

:: Update Claude config with correct command
echo.
echo Updating Claude MCP configuration...
(
echo {
echo   "mcpServers": {
echo     "playwright": {
echo       "command": "%NPX_CMD%",
echo       "args": [
echo         "-y",
echo         "@playwright/mcp@latest"
echo       ]
echo     },
echo     "sequential-thinking": {
echo       "command": "%NPX_CMD%",
echo       "args": [
echo         "-y",
echo         "@modelcontextprotocol/server-sequential-thinking"
echo       ]
echo     },
echo     "context7": {
echo       "command": "%NPX_CMD%",
echo       "args": [
echo         "-y",
echo         "@upstash/context7-mcp"
echo       ]
echo     }
echo   }
echo }
) > "%CLAUDE_CONFIG%"

:: Test MCP servers
echo.
echo Testing MCP servers...
echo.

:: Test Context7
echo Testing Context7...
call %NPX_CMD% -y @upstash/context7-mcp --version >nul 2>&1
if %errorlevel%==0 (
    echo [PASS] Context7 is working
    echo [%date% %time%] Context7: PASS >> "%LOG_FILE%"
) else (
    echo [FAIL] Context7 failed
    echo [%date% %time%] Context7: FAIL >> "%LOG_FILE%"
)

:: Test Sequential Thinking
echo Testing Sequential Thinking...
call %NPX_CMD% -y @modelcontextprotocol/server-sequential-thinking --version >nul 2>&1
if %errorlevel%==0 (
    echo [PASS] Sequential Thinking is working
    echo [%date% %time%] Sequential Thinking: PASS >> "%LOG_FILE%"
) else (
    echo [FAIL] Sequential Thinking failed
    echo [%date% %time%] Sequential Thinking: FAIL >> "%LOG_FILE%"
)

:: Test Playwright
echo Testing Playwright MCP...
call %NPX_CMD% -y @playwright/mcp --version >nul 2>&1
if %errorlevel%==0 (
    echo [PASS] Playwright MCP is working
    echo [%date% %time%] Playwright: PASS >> "%LOG_FILE%"
) else (
    echo [FAIL] Playwright MCP failed
    echo [%date% %time%] Playwright: FAIL >> "%LOG_FILE%"
)

echo.
echo ========================================
echo Health check complete!
echo Configuration has been updated.
echo Please restart Claude CLI if running.
echo ========================================
echo.
echo Log saved to: %LOG_FILE%
echo Backups saved to: %BACKUP_DIR%
echo.
pause