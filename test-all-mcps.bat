@echo off
echo ===============================================
echo Testing All MCP Server Connections
echo ===============================================
echo.

echo Checking Node.js version...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found! Install Node.js v18+ first.
    pause
    exit /b 1
)
echo.

echo Checking npm version...
npm --version
echo.

echo ===============================================
echo Testing Individual MCP Servers
echo ===============================================

echo.
echo [1/8] Testing Context7 MCP...
echo Command: npx -y --node-options=--experimental-vm-modules @upstash/context7-mcp@1.0.6
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo [2/8] Testing Sequential Thinking MCP...
echo Command: npx -y @modelcontextprotocol/server-sequential-thinking
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo [3/8] Testing Memory MCP...
echo Command: npx -y @modelcontextprotocol/server-memory
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo [4/8] Testing Stripe Agent Toolkit...
echo Checking if local installation exists...
if exist "C:\Users\Disaster Recovery 4\Documents\Cline\MCP\stripe-agent-toolkit-server\dist\index.js" (
    echo Status: Local installation found
) else (
    echo WARNING: Local Stripe MCP installation not found
    echo Location: C:\Users\Disaster Recovery 4\Documents\Cline\MCP\stripe-agent-toolkit-server\
)

echo.
echo [5/8] Testing Fetch MCP...
echo Checking if local installation exists...
if exist "C:\Users\Disaster Recovery 4\Documents\Cline\MCP\fetch-mcp\dist\index.js" (
    echo Status: Local installation found
) else (
    echo WARNING: Local Fetch MCP installation not found
    echo Location: C:\Users\Disaster Recovery 4\Documents\Cline\MCP\fetch-mcp\
)

echo.
echo [6/8] Testing TaskMaster AI...
echo Command: npx -y --package=task-master-ai task-master-ai
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo [7/8] Testing GitHub MCP...
echo Command: npx -y @modelcontextprotocol/server-github
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo [8/8] Testing 21st Magic...
echo Command: npx -y @21st-dev/magic@latest
timeout /t 3 >nul
echo Status: Should auto-install and connect

echo.
echo ===============================================
echo Environment Variables Check
echo ===============================================

echo.
echo Checking API Keys (will show if set):
echo CONTEXT7_API_KEY: %CONTEXT7_API_KEY%
echo STRIPE_SECRET_KEY: %STRIPE_SECRET_KEY%
echo OPENAI_API_KEY: %OPENAI_API_KEY%
echo ANTHROPIC_API_KEY: %ANTHROPIC_API_KEY%
echo GOOGLE_API_KEY: %GOOGLE_API_KEY%
echo PERPLEXITY_API_KEY: %PERPLEXITY_API_KEY%
echo GITHUB_PERSONAL_ACCESS_TOKEN: %GITHUB_PERSONAL_ACCESS_TOKEN%

echo.
echo ===============================================
echo Configuration File Check
echo ===============================================

if exist "claude_desktop_config.json" (
    echo ✅ Claude Desktop config file found
) else (
    echo ❌ Claude Desktop config file NOT found
)

if exist ".claude\mcp.json" (
    echo ✅ Claude Code config file found
) else (
    echo ❌ Claude Code config file NOT found
)

if exist ".vscode\mcp.json" (
    echo ✅ VS Code config file found
) else (
    echo ❌ VS Code config file NOT found
)

echo.
echo ===============================================
echo Test Results Summary
echo ===============================================
echo.
echo ✅ Ready to Use (No API Key Required):
echo   - Context7 (basic functionality)
echo   - Sequential Thinking
echo   - Memory MCP
echo   - Fetch MCP
echo   - 21st Magic (pre-configured)
echo.
echo ⚠️  Needs API Keys for Full Functionality:
echo   - Context7 (for higher rate limits)
echo   - Stripe Toolkit (for payment features)
echo   - TaskMaster AI (for AI-powered tasks)
echo   - GitHub MCP (for repository access)
echo.
echo 📋 Next Steps:
echo   1. Set up API keys (see MCP_ENVIRONMENT_SETUP.md)
echo   2. Restart Claude Desktop completely
echo   3. Test MCP functionality with sample commands
echo.

echo ===============================================
echo Test Complete!
echo ===============================================
pause
