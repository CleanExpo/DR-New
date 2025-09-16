@echo off
echo Starting Context7 MCP Server with HTTP transport...
echo.
echo Server will run on http://localhost:3000
echo.
echo You can test the server by making requests to:
echo - http://localhost:3000
echo.
echo To stop the server, press Ctrl+C
echo.
npx @upstash/context7-mcp --transport http --port 3000
pause