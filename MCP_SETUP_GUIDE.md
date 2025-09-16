# MCP Setup Guide for DR-New Project

## Overview
This project has two MCP (Model Context Protocol) servers configured:
1. **Context7** - Provides up-to-date documentation for libraries
2. **Sequential Thinking** - Structured problem-solving tool

## Installed MCP Servers

### Context7 MCP
- **Package**: `@upstash/context7-mcp`
- **Purpose**: Fetches current documentation and code examples
- **Usage**: Add "use context7" to prompts

### Sequential Thinking MCP
- **Package**: `@modelcontextprotocol/server-sequential-thinking`
- **Purpose**: Break down complex problems into steps
- **Usage**: For architecture planning, debugging, and complex tasks

### Playwright MCP
- **Package**: `@playwright/mcp`
- **Purpose**: Browser automation using accessibility trees
- **Features**: Fast, lightweight, no screenshots needed
- **Usage**: Web testing, scraping, automation tasks

## Configuration for Different Anthropic Products

### 1. Claude Desktop Configuration

Add to your `claude_desktop_config.json` (typically in `%APPDATA%\Claude\` on Windows):

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp"],
      "env": {
        "CONTEXT7_API_KEY": ""
      }
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {
        "DISABLE_THOUGHT_LOGGING": "false"
      }
    }
  }
}
```

### 2. Claude Code Configuration

For Claude Code, create or update `.claude/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["@upstash/context7-mcp", "--transport", "stdio"],
      "env": {
        "CONTEXT7_API_KEY": ""
      }
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "env": {
        "DISABLE_THOUGHT_LOGGING": "false"
      }
    }
  }
}
```

### 3. VS Code with Continue/Cline Configuration

Add to your `.vscode/mcp.json`:

```json
{
  "servers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```

## Quick Start Scripts

### Run All Servers
```batch
start-all-mcp-servers.bat
```

### Run Individual Servers
- Context7: `context7-start.bat`
- Sequential Thinking: `sequential-thinking-start.bat`
- Playwright (headless): `playwright-start.bat`
- Playwright (headed): `playwright-headed.bat`
- Playwright (custom config): `playwright-with-config.bat`
- Context7 HTTP mode: `context7-http.bat`

## Testing Your Setup

### Test Context7
1. Start the server: `npx @upstash/context7-mcp --transport http --port 3010`
2. Server runs at: `http://localhost:3010/mcp`
3. In your prompts: "Create a Next.js app with TypeScript. use context7"

### Test Sequential Thinking
1. Start the server: `npx @modelcontextprotocol/server-sequential-thinking`
2. Use for complex tasks: "Plan the disaster recovery booking system architecture"

### Test Playwright
1. Start the server: `npx @playwright/mcp@latest --headless`
2. Use for browser tasks: "Navigate to disasterrecovery.com.au and check if the contact form works"

## Environment Variables

### Context7
- `CONTEXT7_API_KEY`: Optional API key for higher rate limits
  - Get from: https://context7.com/dashboard
  - Provides access to more requests per minute

### Sequential Thinking
- `DISABLE_THOUGHT_LOGGING`: Set to "true" to disable logging (default: "false")

## Troubleshooting

### Common Issues

#### 1. "Module not found" error
```batch
npm install --save-dev @upstash/context7-mcp @modelcontextprotocol/server-sequential-thinking
```

#### 2. Server won't start
- Check Node.js version: `node --version` (needs v18.0.0+)
- Reinstall packages: `npm ci`

#### 3. Context7 rate limiting
- Add API key to configuration
- Sign up at https://context7.com/dashboard

#### 4. Windows path issues
- Use forward slashes in paths
- Run as administrator if permission errors

### Verify Installation
```batch
npm list @upstash/context7-mcp
npm list @modelcontextprotocol/server-sequential-thinking
```

## Usage Examples

### Context7 Examples
```
"Create a React component with Tailwind CSS. use context7"
"Set up Prisma with PostgreSQL. use context7"
"Implement NextAuth.js authentication. use library /nextauthjs/next-auth"
```

### Sequential Thinking Examples
```
"Design the database schema for customer management using sequential thinking"
"Debug the payment processing issue step by step"
"Plan the migration from Express to Next.js"
```

## Project Integration

This project's `CLAUDE.md` file includes rules for automatic MCP usage:
- Context7 auto-invokes for code generation and documentation
- Sequential Thinking suggested for complex problem-solving

## Resources

- [MCP Protocol Documentation](https://modelcontextprotocol.io)
- [Context7 Documentation](https://context7.com)
- [Anthropic MCP Guide](https://docs.anthropic.com/en/docs/model-context-protocol)
- [Claude Desktop Setup](https://modelcontextprotocol.io/quickstart/user)

## Support

- Context7 Issues: https://github.com/upstash/context7/issues
- MCP Protocol: https://github.com/modelcontextprotocol/servers
- Project Issues: Create in this repository

---

Last Updated: September 2025
MCP Version: Latest
Node.js Required: v18.0.0+