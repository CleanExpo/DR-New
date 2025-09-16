@echo off
echo Starting ALL MCP Servers for DR-New Project...
echo ===============================================
echo.
echo This will start all three MCP servers in separate windows
echo for your development environment.
echo.

echo Starting Context7 MCP Server...
start "Context7 MCP" cmd /k "npx @upstash/context7-mcp --transport stdio"

echo Starting Sequential Thinking MCP Server...
start "Sequential Thinking MCP" cmd /k "npx -y @modelcontextprotocol/server-sequential-thinking"

echo Starting Playwright MCP Server (Headless)...
start "Playwright MCP" cmd /k "npx @playwright/mcp@latest --headless --browser chrome"

echo.
echo ===============================================
echo All MCP servers have been started in separate windows!
echo.
echo Available MCP Servers:
echo - Context7: Up-to-date documentation for libraries
echo - Sequential Thinking: Complex problem-solving
echo - Playwright: Browser automation and web testing
echo.
echo You can now use these tools in your AI assistant prompts:
echo - Add "use context7" for library documentation
echo - Use sequential thinking for step-by-step problem solving
echo - Use Playwright for browser automation tasks
echo.
echo Close this window when you're done.
pause