@echo off
echo ========================================
echo Testing MCP Servers on Windows
echo ========================================
echo.

echo [1] Testing Context7 MCP Server...
echo ------------------------------------
call npx -y @upstash/context7-mcp@1.0.17 --help
if %errorlevel% equ 0 (
    echo ✓ Context7 MCP Server is working!
) else (
    echo ✗ Context7 MCP Server failed!
)
echo.

echo [2] Testing Sequential Thinking MCP Server...
echo ------------------------------------
call npx -y @modelcontextprotocol/server-sequential-thinking@latest --help
if %errorlevel% equ 0 (
    echo ✓ Sequential Thinking MCP Server is working!
) else (
    echo ✗ Sequential Thinking MCP Server failed!
)
echo.

echo [3] Testing Playwright MCP Server...
echo ------------------------------------
call npx -y @playwright/mcp@latest --help
if %errorlevel% equ 0 (
    echo ✓ Playwright MCP Server is working!
) else (
    echo ✗ Playwright MCP Server failed!
)
echo.

echo ========================================
echo Testing Complete!
echo ========================================
echo.
echo To use these servers in Claude Desktop:
echo 1. Restart Claude Desktop completely
echo 2. The servers will be available automatically
echo.
echo To use in VS Code terminal with Claude CLI:
echo 1. Exit current claude session (type 'exit')
echo 2. Restart with: claude
echo 3. Navigate back to: cd "D:\DR New"
echo.
pause