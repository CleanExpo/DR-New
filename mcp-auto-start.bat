@echo off
:: MCP Auto-Start Script with Health Check
:: Run this before starting Claude CLI

echo ========================================
echo MCP Auto-Start with Health Check
echo ========================================
echo.

:: First run health check
echo Running health check...
call mcp-health-check.bat

:: Start Claude CLI
echo.
echo Starting Claude CLI...
npx -y @anthropic/claude-cli

:: If Claude CLI exits, show status
echo.
echo Claude CLI has exited.
echo Running final health check...
call mcp-health-check.bat