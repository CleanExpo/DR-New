# MCP Server Restart & Test Instructions

## 🔄 **IMMEDIATE ACTIONS REQUIRED**

### Step 1: Exit Current Claude CLI Session
```bash
exit
```

### Step 2: Restart Claude CLI
```bash
claude
```

### Step 3: Navigate to Project Directory
```bash
cd "D:\DR New"
```

### Step 4: Test MCP Server Availability
```bash
/mcp
```

**Expected Result:** You should see these MCP servers listed:
- `context7`
- `sequential-thinking` 
- `playwright`

## 🧪 **Test Commands (once /mcp shows servers)**

### Test Sequential Thinking:
```
Use sequential thinking to analyze how to optimize the disaster recovery website's user experience
```

### Test Context7 (basic functionality):
```
Use Context7 to get Next.js App Router documentation
```

### Test Playwright:
```
Navigate to localhost:3000 and take a screenshot
```

## 📋 **If MCP servers are working, next priorities:**

### 1. Set Critical API Keys (Optional but Recommended):

**GitHub Access** (for repository management):
```
GITHUB_PERSONAL_ACCESS_TOKEN=your_token_here
```
Get from: https://github.com/settings/tokens

**Context7** (for higher rate limits):
```
CONTEXT7_API_KEY=your_key_here  
```
Get from: https://context7.com/dashboard

### 2. Add API Keys to Environment:
- Windows: System Properties → Advanced → Environment Variables
- Or edit `claude_desktop_config.json` directly (less secure)

### 3. Restart Claude CLI again after adding keys

## ✅ **Success Indicators:**
- `/mcp` command shows configured servers
- Test commands work without errors
- MCP servers respond to requests

## 🛠️ **If Still Having Issues:**
1. Run `.\mcp-troubleshoot.bat`
2. Check Node.js installation: `node --version`
3. Verify config file exists: `dir .claude\mcp.json`

---
**Status**: Ready to test MCP functionality in Claude CLI
