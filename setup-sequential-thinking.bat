@echo off
echo ========================================
echo Sequential Thinking MCP Setup
echo ========================================
echo.

echo Checking Python installation...
python --version 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.10+ from https://python.org
    pause
    exit /b 1
)
echo OK - Python is installed
echo.

echo Checking UV package manager...
uv --version 2>nul
if %errorlevel% neq 0 (
    echo UV not found. Installing UV...
    pip install uv
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install UV
        echo Try: pip install --upgrade pip && pip install uv
        pause
        exit /b 1
    )
)
echo OK - UV is available
echo.

echo ========================================
echo Option 1: Use Enhanced Sequential Thinking (Recommended)
echo ========================================
echo.
echo This version includes:
echo - Structured thinking framework with stages
echo - Thought tracking and metadata
echo - Related thought analysis
echo - Progress monitoring
echo - Summary generation
echo - Persistent storage
echo - Data import/export
echo.
echo Configuration already added to claude_desktop_config.json
echo.

echo ========================================
echo Option 2: Install Locally (Advanced)
echo ========================================
echo.
echo To install locally, run these commands:
echo.
echo   git clone https://github.com/arben-adm/mcp-sequential-thinking.git
echo   cd mcp-sequential-thinking
echo   uv venv
echo   .venv\Scripts\activate
echo   uv pip install -e .
echo.

echo ========================================
echo Testing Sequential Thinking Connection
echo ========================================
echo.
echo Testing with UVX (no installation needed)...
uvx --from git+https://github.com/arben-adm/mcp-sequential-thinking --with portalocker mcp-sequential-thinking --help 2>nul
if %errorlevel% equ 0 (
    echo SUCCESS: Sequential Thinking MCP can be loaded!
) else (
    echo WARNING: Could not test Sequential Thinking MCP
    echo This may be normal - the server will be loaded by Claude Desktop
)
echo.

echo ========================================
echo Next Steps
echo ========================================
echo.
echo 1. Restart Claude Desktop completely
echo 2. The Sequential Thinking MCP should appear in available tools
echo 3. Use these tools in Claude:
echo    - process_thought: Record and analyze thoughts
echo    - generate_summary: Create overview of thinking process
echo    - clear_history: Reset thinking session
echo.
echo Example usage:
echo   "Process my first thought about climate change using sequential thinking"
echo   "Generate a summary of my thinking process"
echo.

pause