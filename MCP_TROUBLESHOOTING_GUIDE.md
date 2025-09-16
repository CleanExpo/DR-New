# MCP Troubleshooting & Prevention Guide

## Root Cause Analysis

### Why MCP Servers Stopped Working
The MCP servers failed because of a **command path mismatch** in the configuration:
- **Issue**: Config used `npx` instead of `npx.cmd` on Windows
- **Impact**: Claude CLI couldn't execute the MCP server commands
- **Root Cause**: Configuration was likely copied from a Unix/Mac environment or auto-generated without Windows path considerations

### Key Findings
1. **Windows requires `.cmd` extension** for npm executables when called from certain contexts
2. **Multiple npx locations** exist on the system (npm global, nodejs, nvm)
3. **No automatic validation** was in place to detect configuration issues

## Prevention Solution

### Automated Health Check System
We've implemented a three-tier prevention system:

#### 1. **Health Check Script** (`mcp-health-check.bat`)
- Automatically detects correct npx command (`npx` vs `npx.cmd`)
- Updates configuration files with the correct command
- Tests each MCP server individually
- Creates timestamped backups
- Logs all operations for debugging

#### 2. **Auto-Start Script** (`mcp-auto-start.bat`)
- Runs health check before starting Claude CLI
- Ensures configuration is always valid
- Provides post-exit health status

#### 3. **Configuration Fix**
- Updated `.claude/mcp.json` to use `npx.cmd`
- Maintains compatibility with Windows environment

## Quick Recovery Steps

### If MCP Servers Stop Working Again:

1. **Run Health Check**
   ```cmd
   mcp-health-check.bat
   ```

2. **Check Logs**
   ```cmd
   type mcp-health.log
   ```

3. **Use Auto-Start**
   ```cmd
   mcp-auto-start.bat
   ```

## Preventive Maintenance

### Daily Use
- Always start Claude CLI using `mcp-auto-start.bat`
- This ensures configuration validation before each session

### Weekly Check
- Review `mcp-health.log` for any recurring issues
- Clean old backups from `.claude/backups/`

### After System Updates
- Run `mcp-health-check.bat` after:
  - Node.js updates
  - npm updates
  - Windows updates
  - Claude CLI updates

## Configuration Reference

### Correct Windows Configuration
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx.cmd",  // ← Must use .cmd on Windows
      "args": ["-y", "@playwright/mcp@latest"]
    },
    "sequential-thinking": {
      "command": "npx.cmd",  // ← Must use .cmd on Windows
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "context7": {
      "command": "npx.cmd",  // ← Must use .cmd on Windows
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Troubleshooting Commands

### Test Individual MCP Servers
```cmd
:: Test Context7
npx.cmd -y @upstash/context7-mcp --version

:: Test Sequential Thinking
npx.cmd -y @modelcontextprotocol/server-sequential-thinking --version

:: Test Playwright
npx.cmd -y @playwright/mcp --version
```

### Check System Path
```cmd
:: Find all npx locations
where npx
where npx.cmd

:: Check Node/npm versions
node --version
npm --version
```

## Emergency Recovery

If all else fails:

1. **Restore from Backup**
   ```cmd
   copy .claude\backups\[latest-backup] .claude\mcp.json
   ```

2. **Manual Fix**
   - Open `.claude/mcp.json`
   - Change all `"command": "npx"` to `"command": "npx.cmd"`
   - Save and restart Claude CLI

3. **Complete Reset**
   ```cmd
   :: Backup current config
   copy .claude\mcp.json .claude\mcp.json.broken

   :: Use known working config
   copy .claude\mcp.json.backup .claude\mcp.json
   ```

## Prevention Checklist

✅ **Always use** `mcp-auto-start.bat` to start Claude CLI
✅ **Run** `mcp-health-check.bat` after system changes
✅ **Keep** backups in `.claude/backups/`
✅ **Monitor** `mcp-health.log` for issues
✅ **Test** MCP servers individually if problems persist
✅ **Document** any new issues in this guide

## Support Scripts Created

1. **`mcp-health-check.bat`** - Validates and fixes MCP configuration
2. **`mcp-auto-start.bat`** - Starts Claude with automatic health check
3. **`.claude/mcp.json.backup`** - Known working configuration backup

## Long-term Recommendations

1. **Version Control**: Keep MCP configs in git for easy rollback
2. **Monitoring**: Set up scheduled task to run health check daily
3. **Documentation**: Update this guide with any new issues/solutions
4. **Testing**: Always test MCP changes in a separate terminal first

---

**Last Updated**: December 2024
**Issue Fixed**: MCP servers not responding due to npx path issue
**Solution**: Implemented automated health check and configuration management