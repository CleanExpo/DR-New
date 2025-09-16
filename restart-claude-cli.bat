@echo off
echo ========================================
echo Restarting Claude Code CLI with MCP
echo ========================================
echo.

echo Killing existing Claude CLI processes...
taskkill /F /IM "claude.exe" 2>nul
taskkill /F /IM "node.exe" /FI "WINDOWTITLE eq claude*" 2>nul

echo.
echo MCP Configuration Status:
echo.

if exist ".claude\mcp.json" (
    echo [✓] .claude\mcp.json found
    echo.
    echo Current MCP servers configured:
    type .claude\mcp.json | findstr "\"command\":" | findstr /V "^$"
) else (
    echo [✗] .claude\mcp.json NOT FOUND
)

echo.
echo ========================================
echo To restart Claude CLI with MCP support:
echo ========================================
echo.
echo 1. Close this VS Code terminal
echo 2. Open a new terminal in VS Code
echo 3. Run: claude
echo 4. Check MCP with: /mcp
echo.
echo If MCP still doesn't work, try:
echo - Exit VS Code completely
echo - Reopen VS Code
echo - Open terminal and run: claude
echo.
pause