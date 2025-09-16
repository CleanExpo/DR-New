# MCP (Model Context Protocol) Setup for DR-New

## 🚀 Complete MCP Configuration - All Missing MCPs Found & Added!

### 📋 All Available MCP Servers Now Configured:

✅ **Context7** - Up-to-date library documentation  
✅ **Sequential Thinking** - Complex problem-solving framework  
✅ **Memory MCP** - Knowledge management across sessions  
✅ **Stripe Agent Toolkit** - Payment processing integration  
✅ **Fetch MCP** - Web content retrieval and processing  
✅ **TaskMaster AI** - Project management and task organization  
✅ **GitHub MCP** - Repository management and version control  
✅ **21st Magic** - UI component generation and refinement  
✅ **Playwright** - Browser automation and testing  

### 🔧 Quick Setup (3 Steps):

#### Step 1: Configuration Complete ✅
Your `claude_desktop_config.json` has been updated with all 9 MCP servers.

#### Step 2: Set Up API Keys (Optional but Recommended)
See `MCP_ENVIRONMENT_SETUP.md` for detailed instructions on:
- Context7 API key (higher rate limits)
- Stripe API key (payment features) 
- GitHub token (repository access)
- TaskMaster AI keys (project management)

#### Step 3: Test Everything
1. **Restart Claude Desktop completely** 
2. Run `test-all-mcps.bat` to verify connections
3. Try the example commands in `MCP_USAGE_EXAMPLES.md`

## Available Scripts

| Script | Purpose |
|--------|---------|
| `start-all-mcp-servers.bat` | Start all MCP servers |
| `context7-start.bat` | Start Context7 only |
| `sequential-thinking-start.bat` | Start Sequential Thinking only |
| `playwright-start.bat` | Start Playwright (headless) |
| `playwright-headed.bat` | Start Playwright (visible browser) |
| `playwright-with-config.bat` | Start Playwright with Brisbane config |
| `setup-claude-desktop.bat` | Configure Claude Desktop |
| `mcp-troubleshoot.bat` | Diagnose installation issues |

## Using MCPs in Your Prompts

### Context7 Examples:
```
"Create a Next.js app with authentication. use context7"
"Set up Tailwind CSS with custom colors. use context7"
"Implement Prisma with PostgreSQL. use context7"
```

### Sequential Thinking Examples:
```
"Plan the architecture for our booking system"
"Debug this performance issue step by step"
"Design the database schema for customer management"
```

### Playwright Examples:
```
"Test the contact form on our website"
"Check if all service pages load correctly"
"Automate filling out a disaster recovery request form"
"Verify mobile responsiveness of the hero section"
```

## Project Structure

```
DR-New/
├── mcp.json                      # General MCP configuration
├── claude_desktop_config.json    # Claude Desktop template
├── .claude/
│   └── mcp.json                 # Claude Code configuration
├── .vscode/
│   └── mcp.json                 # VS Code extensions config
├── MCP_SETUP_GUIDE.md           # Detailed documentation
├── MCP_README.md                # This file
└── [scripts]                    # Batch files for Windows
```

## Troubleshooting

Run `mcp-troubleshoot.bat` to diagnose common issues:
- Node.js version check
- Package installation verification
- Configuration file detection
- Server functionality test

## Requirements

- Node.js v18.0.0 or higher
- npm (comes with Node.js)
- An Anthropic product (Claude Desktop, Claude Code, etc.)

## Optional: Get API Keys

### Context7 API Key (for higher rate limits):
1. Visit https://context7.com/dashboard
2. Create a free account
3. Copy your API key
4. Add to configuration files

## Need Help?

1. Run `mcp-troubleshoot.bat` first
2. Check `MCP_SETUP_GUIDE.md` for detailed info
3. Visit https://modelcontextprotocol.io for protocol docs

## What's Next?

Your MCPs are ready! Start using them in your prompts:
- Add "use context7" for current library docs
- Use sequential thinking for complex problems
- Both tools work together to enhance your AI assistant

---

**Installed MCPs**: Context7, Sequential Thinking & Playwright
**Status**: Ready to Use
**Support**: See MCP_SETUP_GUIDE.md
