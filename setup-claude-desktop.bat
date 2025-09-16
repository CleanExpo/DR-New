@echo off
echo ========================================
echo Claude Desktop MCP Configuration Setup
echo ========================================
echo.

:: Get the Claude Desktop config directory
set CLAUDE_CONFIG_DIR=%APPDATA%\Claude

:: Check if directory exists
if not exist "%CLAUDE_CONFIG_DIR%" (
    echo Creating Claude configuration directory...
    mkdir "%CLAUDE_CONFIG_DIR%"
)

:: Copy the configuration file
echo Copying MCP configuration to Claude Desktop...
copy /Y "claude_desktop_config.json" "%CLAUDE_CONFIG_DIR%\claude_desktop_config.json"

if %ERRORLEVEL% == 0 (
    echo.
    echo SUCCESS! MCP servers configured for Claude Desktop.
    echo.
    echo Configuration file location:
    echo %CLAUDE_CONFIG_DIR%\claude_desktop_config.json
    echo.
    echo The following MCP servers are now available in Claude Desktop:
    echo - Context7: For up-to-date library documentation
    echo - Sequential Thinking: For complex problem-solving
    echo.
    echo IMPORTANT: Restart Claude Desktop for changes to take effect.
) else (
    echo.
    echo ERROR: Failed to copy configuration file.
    echo Please manually copy claude_desktop_config.json to:
    echo %CLAUDE_CONFIG_DIR%\
)

echo.
pause