# MCP COMPLETE REMOVAL & FRESH INSTALLATION GUIDE

## 🚨 CRITICAL ISSUE IDENTIFIED

### Root Cause: Context7 Server Connection Failures
The `context7` MCP server (@upstash/context7-mcp) is causing persistent "Failed to reconnect to context7" errors and preventing stable MCP operations.

### Official Solution: Complete Fresh Installation
Based on official Anthropic MCP documentation, this guide provides a complete removal and fresh installation process.

---

## IMMEDIATE SOLUTIONS

### ⚡ Option 1: Automated Script (RECOMMENDED)
```powershell
# Right-click PowerShell, "Run as Administrator"
.\fix-mcp-config.ps1 -Force -Verbose
```

### ⚡ Option 2: Quick Manual Fix (30 seconds)
```powershell
# Kill all processes
Get-Process Claude*, node*, npx* -ErrorAction SilentlyContinue | Stop-Process -Force

# Remove old config
Remove-Item "$env:APPDATA\Claude\claude_desktop_config.json" -Force

# Clear npm cache
npm cache clean --force

# Create fresh config (see Configuration section below)
```

---

## COMPLETE MANUAL REMOVAL STEPS

### Step 1: Terminate All MCP Processes
```powershell
# Kill Claude Desktop
Get-Process Claude* -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill Node.js processes
Get-Process node* -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill NPX processes
Get-Process npx* -ErrorAction SilentlyContinue | Stop-Process -Force

# Wait for cleanup
Start-Sleep -Seconds 5
```

### Step 2: Backup Current Configuration (Optional)
```powershell
# Create backup directory
New-Item -ItemType Directory -Path ".\mcp-backups" -Force

# Backup current config
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
Copy-Item "$env:APPDATA\Claude\claude_desktop_config.json" ".\mcp-backups\claude_config_$timestamp.json" -ErrorAction SilentlyContinue

# Backup logs
Copy-Item "$env:APPDATA\Claude\logs" ".\mcp-backups\logs_$timestamp" -Recurse -ErrorAction SilentlyContinue
```

### Step 3: Remove ALL Claude Desktop Configurations
```powershell
# Remove main config file
Remove-Item "$env:APPDATA\Claude\claude_desktop_config.json" -Force -ErrorAction SilentlyContinue

# Remove log files
Remove-Item "$env:APPDATA\Claude\logs" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\Claude\*.log" -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\Claude\mcp*.log" -Force -ErrorAction SilentlyContinue

# Remove cache and storage
Remove-Item "$env:APPDATA\Claude\storage" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\Claude\cache" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 4: Clear ALL Node.js and NPM Caches
```powershell
# Clear npm cache
npm cache clean --force

# Remove NPM cache directories
Remove-Item "$env:LOCALAPPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item "$env:APPDATA\npm-cache" -Recurse -Force -ErrorAction SilentlyContinue

# Remove NPX cache
Remove-Item "$env:LOCALAPPDATA\npm-cache\_npx" -Recurse -Force -ErrorAction SilentlyContinue

# Remove user npm directory
Remove-Item "$env:USERPROFILE\.npm" -Recurse -Force -ErrorAction SilentlyContinue

# Clear temporary npm files
Get-ChildItem "$env:TEMP" -Filter "*npm*" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem "$env:TEMP" -Filter "*node*" -Recurse -ErrorAction SilentlyContinue | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 5: Remove Installed MCP Packages
```powershell
# Uninstall problematic packages
npm uninstall -g @upstash/context7-mcp
npm uninstall -g @modelcontextprotocol/server-filesystem
npm uninstall -g @modelcontextprotocol/server-playwright
npm uninstall -g @modelcontextprotocol/server-sequential-thinking
```

### Step 6: Verify Node.js Installation
```powershell
# Check Node.js versions
node --version
npm --version
npx --version
```

**If any command fails:**
1. Download Node.js LTS from: https://nodejs.org/
2. Install and restart computer
3. Verify versions again

### Step 7: Create Fresh MCP Configuration

**CRITICAL: Must use UTF-8 encoding WITHOUT BOM**

```powershell
# Ensure Claude directory exists
New-Item -ItemType Directory -Path "$env:APPDATA\Claude" -Force

# Create PowerShell object for config
$config = @{
    mcpServers = @{
        filesystem = @{
            command = "npx"
            args = @(
                "-y",
                "@modelcontextprotocol/server-filesystem",
                "D:\Disaster Recovery\Disaster-Recovery"
            )
            env = @{}
        }
        playwright = @{
            command = "npx"
            args = @(
                "-y",
                "@modelcontextprotocol/server-playwright"
            )
            env = @{}
        }
        "sequential-thinking" = @{
            command = "npx"
            args = @(
                "-y",
                "@modelcontextprotocol/server-sequential-thinking"
            )
            env = @{}
        }
    }
}

# Convert to JSON and write WITHOUT BOM (critical!)
$jsonContent = $config | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText("$env:APPDATA\Claude\claude_desktop_config.json", $jsonContent, [System.Text.UTF8Encoding]::new($false))
```

### Step 8: Test MCP Server Availability
```powershell
# Test each server (they will download on first use)
npx -y @modelcontextprotocol/server-filesystem --version
npx -y @modelcontextprotocol/server-playwright --version
npx -y @modelcontextprotocol/server-sequential-thinking --version
```

---

## FRESH INSTALLATION CONFIGURATION

### Official MCP Configuration (Without Context7)
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:\\Disaster Recovery\\Disaster-Recovery"
      ],
      "env": {}
    },
    "playwright": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-playwright"
      ],
      "env": {}
    },
    "sequential-thinking": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sequential-thinking"
      ],
      "env": {}
    }
  }
}
```

### ⚠️ IMPORTANT EXCLUSIONS

**DO NOT INCLUDE:**
- ❌ `context7` server (causes connection failures)
- ❌ Any servers with known stability issues
- ❌ Experimental or beta MCP servers

---

## VERIFICATION STEPS

### 1. Check Configuration File
```powershell
# Verify config exists and is valid JSON
Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json
```

### 2. Start Claude Desktop
1. Launch Claude Desktop application
2. Look for hammer icon (🔨) in the input box
3. MCP servers should be listed in settings

### 3. Test MCP Functionality
1. Try using file system commands
2. Test Playwright automation
3. Verify sequential thinking tools

### 4. Monitor Logs (If Issues Persist)
- Windows: `%APPDATA%\Claude\logs\mcp.log`
- Check for connection errors or failures

---

## SYSTEM REQUIREMENTS

### Required Software
- ✅ **Node.js LTS** (Latest from nodejs.org)
- ✅ **NPM** (Included with Node.js)
- ✅ **NPX** (Included with Node.js)
- ✅ **Claude Desktop** (Latest version)

### Windows Paths Reference
| Component | Path |
|-----------|------|
| Claude Config | `%APPDATA%\Claude\claude_desktop_config.json` |
| Claude Logs | `%APPDATA%\Claude\logs\` |
| NPM Cache | `%LOCALAPPDATA%\npm-cache` |
| NPX Cache | `%LOCALAPPDATA%\npm-cache\_npx` |

---

## TROUBLESHOOTING

### If MCP Servers Still Fail to Connect

1. **Check Node.js Installation**
   ```powershell
   where node
   where npm
   where npx
   ```

2. **Manually Test MCP Servers**
   ```powershell
   npx -y @modelcontextprotocol/server-filesystem --help
   ```

3. **Check Firewall/Antivirus**
   - Allow Node.js through Windows Firewall
   - Whitelist npm and npx processes

4. **Verify Network Access**
   ```powershell
   # Test npm registry access
   npm ping
   ```

### If Context7 Errors Persist

**NUCLEAR OPTION - Complete Claude Reset:**
```powershell
# Stop Claude completely
Get-Process Claude* | Stop-Process -Force

# Remove entire Claude directory
Remove-Item "$env:APPDATA\Claude" -Recurse -Force

# Restart Claude Desktop (will recreate directory)
```

### Common Error Solutions

| Error | Solution |
|-------|----------|
| "Failed to reconnect to context7" | Remove context7 from config |
| "NPX not found" | Reinstall Node.js LTS |
| "Permission denied" | Run PowerShell as Administrator |
| "JSON parse error" | Recreate config without BOM |
| "Module not found" | Clear npm cache completely |

---

## PREVENTION MEASURES

### DO NOT:
- ❌ Add context7 server back to configuration
- ❌ Edit config with editors that add BOM (like Notepad)
- ❌ Install untested MCP servers
- ❌ Let zombie Node.js processes accumulate

### DO:
- ✅ Use only stable, official MCP servers
- ✅ Regular npm cache cleaning: `npm cache clean --force`
- ✅ Keep Node.js updated to LTS version
- ✅ Monitor Claude logs for early warning signs
- ✅ Backup working configurations

---

## SUCCESS INDICATORS

After successful installation, you should see:
- ✅ Claude Desktop starts without errors
- ✅ Hammer icon (🔨) appears in input box
- ✅ MCP servers listed in Claude settings
- ✅ No "Failed to reconnect" messages
- ✅ File system and Playwright tools work
- ✅ No zombie Node.js processes

---

## ADDITIONAL RESOURCES

### Official Documentation
- MCP Protocol: https://modelcontextprotocol.io
- Claude Desktop MCP: https://docs.anthropic.com/en/docs/mcp
- Node.js LTS: https://nodejs.org/

### Support Files in This Directory
- `fix-mcp-config.ps1` - Automated removal and installation script
- `RESTART_CLAUDE_STEPS.md` - Detailed Claude restart procedure
- Backup directory: `.\mcp-config-backups\`

---

*This guide is based on official Anthropic MCP documentation and addresses the persistent context7 connection failure issues.*

**Last Updated:** 2025-01-15
**MCP Version:** Latest Stable Servers Only
**Status:** Complete Solution Provided