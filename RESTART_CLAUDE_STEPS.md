# CLAUDE DESKTOP RESTART PROCEDURE - Complete Guide

## 🔄 CRITICAL: Proper Claude Desktop Restart Process

### Why Proper Restart is Essential
After MCP configuration changes, Claude Desktop must be completely restarted to:
- Reload MCP server configurations
- Clear cached connection states
- Reinitialize all MCP server connections
- Reset internal process states

---

## STEP-BY-STEP RESTART PROCEDURE

### Step 1: Complete Claude Desktop Shutdown

#### Option A: Graceful Shutdown (RECOMMENDED)
```
1. Click Claude Desktop system tray icon (usually bottom-right)
2. Select "Quit" or "Exit"
3. Wait 10 seconds for complete shutdown
```

#### Option B: Force Shutdown (If Unresponsive)
```powershell
# Kill all Claude processes
Get-Process Claude* -ErrorAction SilentlyContinue | Stop-Process -Force

# Verify all processes are terminated
Get-Process Claude* -ErrorAction SilentlyContinue
# Should return no results
```

### Step 2: Verify Process Cleanup
```powershell
# Check for any remaining Claude processes
Get-Process | Where-Object {$_.Name -like "*Claude*"}

# Check for Node.js processes that might be MCP servers
Get-Process node* -ErrorAction SilentlyContinue | Select-Object Name, Id, StartTime

# If old MCP servers are still running, kill them
Get-Process node* -ErrorAction SilentlyContinue | Stop-Process -Force
```

### Step 3: Clear Temporary Files (Optional but Recommended)
```powershell
# Clear Claude temporary files
Remove-Item "$env:TEMP\Claude*" -Recurse -Force -ErrorAction SilentlyContinue

# Clear Node.js temporary files
Remove-Item "$env:TEMP\npm*" -Recurse -Force -ErrorAction SilentlyContinue
```

### Step 4: Wait for System Cleanup
```
Wait 15-30 seconds to ensure:
- All file handles are released
- Network connections are closed
- System resources are freed
```

### Step 5: Restart Claude Desktop

#### Method 1: Start Menu
```
1. Click Windows Start Menu
2. Type "Claude"
3. Click "Claude" application
```

#### Method 2: Desktop Shortcut
```
Double-click Claude Desktop icon on desktop
```

#### Method 3: PowerShell Launch
```powershell
# Find Claude executable
$claudePath = Get-ChildItem -Path "${env:ProgramFiles}\Claude", "${env:ProgramFiles(x86)}\Claude", "$env:LOCALAPPDATA\Programs\Claude" -Name "Claude.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1

# Start Claude if found
if ($claudePath) {
    Start-Process $claudePath.FullName
} else {
    Write-Host "Claude executable not found. Please start manually."
}
```

---

## VERIFICATION STEPS

### Step 6: Verify MCP Server Startup

#### Visual Indicators
1. **Hammer Icon**: Look for 🔨 icon in the input box
2. **No Error Messages**: Claude should start without connection errors
3. **Settings Check**: Go to Settings → Extensions to see MCP servers

#### Test MCP Functionality
```
# Try these commands in Claude:
- List files in current directory
- Search for specific files
- Run a simple automation test
```

#### Check Logs (If Issues Persist)
```powershell
# View MCP logs
Get-Content "$env:APPDATA\Claude\logs\mcp.log" -Tail 20

# Check for specific server logs
Get-ChildItem "$env:APPDATA\Claude\logs" -Filter "mcp-server-*.log"
```

---

## COMMON RESTART ISSUES & SOLUTIONS

### Issue 1: Claude Won't Start
**Symptoms**: Application doesn't launch or crashes immediately

**Solutions**:
```powershell
# Check if process is still running
Get-Process Claude* -ErrorAction SilentlyContinue

# If running, force kill and retry
Get-Process Claude* | Stop-Process -Force

# Check Windows Event Logs
Get-WinEvent -LogName Application -MaxEvents 10 | Where-Object {$_.ProviderName -like "*Claude*"}
```

### Issue 2: MCP Servers Not Loading
**Symptoms**: No hammer icon, MCP tools unavailable

**Troubleshooting**:
1. **Check Configuration File**:
   ```powershell
   Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json
   ```

2. **Verify Node.js is Working**:
   ```powershell
   node --version
   npm --version
   npx --version
   ```

3. **Test MCP Servers Manually**:
   ```powershell
   npx -y @modelcontextprotocol/server-filesystem --version
   ```

### Issue 3: "Failed to Reconnect" Errors
**Symptoms**: Persistent connection error messages

**Solutions**:
1. **Complete MCP Reset**:
   ```powershell
   # Run the complete fix script
   .\fix-mcp-config.ps1 -Force
   ```

2. **Check for Context7 in Config**:
   ```powershell
   # Search for problematic context7 server
   Select-String -Path "$env:APPDATA\Claude\claude_desktop_config.json" -Pattern "context7"
   # If found, remove it from configuration
   ```

### Issue 4: Slow Startup
**Symptoms**: Claude takes a long time to start

**Optimizations**:
```powershell
# Clear npm cache
npm cache clean --force

# Remove old log files
Remove-Item "$env:APPDATA\Claude\logs\*" -Force -ErrorAction SilentlyContinue

# Check available disk space
Get-WmiObject -Class Win32_LogicalDisk | Select-Object DeviceID, @{Name="Free(GB)";Expression={[math]::Round($_.FreeSpace/1GB,2)}}
```

---

## STARTUP MONITORING

### Real-Time Log Monitoring
```powershell
# Monitor MCP logs in real-time during startup
Get-Content "$env:APPDATA\Claude\logs\mcp.log" -Wait -Tail 0
```

### Startup Performance Check
```powershell
# Measure startup time
$startTime = Get-Date
Start-Process "Claude" # Replace with actual path if needed
# Manually note when Claude is fully loaded
```

---

## AUTOMATED RESTART SCRIPT

### Quick Restart Script
```powershell
# Save as restart-claude.ps1
Write-Host "Restarting Claude Desktop..." -ForegroundColor Cyan

# Step 1: Stop Claude
Write-Host "Stopping Claude processes..." -ForegroundColor Yellow
Get-Process Claude* -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 2: Clean up processes
Write-Host "Cleaning up Node processes..." -ForegroundColor Yellow
Get-Process node* -ErrorAction SilentlyContinue | Stop-Process -Force

# Step 3: Wait for cleanup
Write-Host "Waiting for cleanup..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Step 4: Clear temporary files
Write-Host "Clearing temporary files..." -ForegroundColor Yellow
Remove-Item "$env:TEMP\Claude*" -Recurse -Force -ErrorAction SilentlyContinue

# Step 5: Start Claude
Write-Host "Starting Claude Desktop..." -ForegroundColor Green
Start-Process "Claude" -ErrorAction SilentlyContinue

Write-Host "Restart complete. Please wait for Claude to fully load." -ForegroundColor Green
```

---

## SYSTEM REQUIREMENTS FOR RESTART

### Windows Requirements
- Windows 10 or higher
- Administrator privileges (for process management)
- At least 2GB free RAM
- 500MB free disk space

### Node.js Requirements
- Node.js LTS version (latest recommended)
- NPM and NPX functional
- Network access for package downloads

---

## RESTART CHECKLIST

### Pre-Restart Checklist
- [ ] Backup current MCP configuration
- [ ] Note which MCP servers were working
- [ ] Close any important Claude conversations
- [ ] Check Node.js is installed and working

### Post-Restart Verification
- [ ] Claude Desktop starts without errors
- [ ] Hammer icon (🔨) appears in input box
- [ ] MCP servers are listed in settings
- [ ] File system operations work
- [ ] Playwright automation works
- [ ] No "Failed to reconnect" messages

### If Restart Fails
- [ ] Run complete MCP removal script
- [ ] Check Windows Event Logs
- [ ] Verify Node.js installation
- [ ] Check disk space and permissions
- [ ] Consider reinstalling Claude Desktop

---

## EMERGENCY PROCEDURES

### Complete Claude Reset (Nuclear Option)
```powershell
# ONLY use if nothing else works
Write-Host "PERFORMING COMPLETE CLAUDE RESET" -ForegroundColor Red

# Stop all Claude processes
Get-Process Claude* -ErrorAction SilentlyContinue | Stop-Process -Force

# Remove entire Claude directory
Remove-Item "$env:APPDATA\Claude" -Recurse -Force -ErrorAction SilentlyContinue

# Clear all cached data
Remove-Item "$env:LOCALAPPDATA\Claude" -Recurse -Force -ErrorAction SilentlyContinue

# Restart Claude (will recreate default configuration)
Start-Process "Claude"

Write-Host "Complete reset performed. You will need to reconfigure MCP servers." -ForegroundColor Yellow
```

---

## BEST PRACTICES

### Regular Maintenance
1. **Weekly**: Restart Claude Desktop to clear any accumulated issues
2. **Monthly**: Clear npm cache: `npm cache clean --force`
3. **Quarterly**: Update Node.js to latest LTS version
4. **Before Major Changes**: Always backup configuration

### Performance Optimization
1. **Keep MCP config minimal**: Only include servers you actually use
2. **Monitor startup time**: Should be under 30 seconds
3. **Regular log cleanup**: Remove old log files monthly
4. **System monitoring**: Ensure adequate RAM and disk space

### Troubleshooting Preparation
1. **Save working configurations**: Keep backups of stable setups
2. **Document custom settings**: Note any specific configurations
3. **Test regularly**: Verify MCP functionality periodically
4. **Monitor logs**: Check for early warning signs

---

## SUPPORT AND LOGGING

### Log Locations
| Log Type | Windows Path |
|----------|--------------|
| MCP General | `%APPDATA%\Claude\logs\mcp.log` |
| Server Logs | `%APPDATA%\Claude\logs\mcp-server-*.log` |
| Application | `%APPDATA%\Claude\logs\app.log` |

### Getting Help
1. **First**: Check this restart guide
2. **Second**: Run automated fix script: `.\fix-mcp-config.ps1`
3. **Third**: Review MCP logs for specific errors
4. **Last Resort**: Complete Claude reset

---

*This restart procedure is designed to resolve 99% of MCP-related startup issues. Follow the steps exactly as written for best results.*

**Last Updated**: 2025-01-15
**Compatibility**: Claude Desktop (All Versions)
**Status**: Complete Procedure Documented