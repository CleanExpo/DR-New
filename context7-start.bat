@echo off
echo Starting Context7 MCP Server...
echo.
echo Context7 MCP Server provides up-to-date documentation and code examples
echo for various libraries directly in your AI coding assistant.
echo.
echo To use Context7 in your prompts, add "use context7" to your query.
echo Example: "Create a Next.js middleware with JWT authentication. use context7"
echo.
echo Starting server with stdio transport...
npx @upstash/context7-mcp --transport stdio
pause