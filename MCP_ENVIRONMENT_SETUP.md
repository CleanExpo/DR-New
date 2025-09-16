# MCP Environment Variables Setup Guide

## Required API Keys and Environment Variables

### 1. Context7 (Optional - for higher rate limits)
```
CONTEXT7_API_KEY=""
```
- **Get from**: https://context7.com/dashboard
- **Purpose**: Higher rate limits for documentation queries
- **Free tier**: Available without API key

### 2. Stripe Agent Toolkit (Required for payment features)
```
STRIPE_SECRET_KEY=""
```
- **Get from**: https://dashboard.stripe.com/apikeys
- **Purpose**: Payment processing, product creation
- **Test key format**: `sk_test_...`
- **Live key format**: `sk_live_...`

### 3. TaskMaster AI (Optional - choose one or more)
```
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
GOOGLE_API_KEY=""
PERPLEXITY_API_KEY=""
```
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/
- **Google**: https://makersuite.google.com/app/apikey
- **Perplexity**: https://www.perplexity.ai/settings/api

### 4. GitHub MCP (Required for GitHub integration)
```
GITHUB_PERSONAL_ACCESS_TOKEN=""
```
- **Get from**: https://github.com/settings/tokens
- **Permissions needed**: 
  - `repo` (for repository access)
  - `read:org` (for organization access)
  - `workflow` (for GitHub Actions)

### 5. 21st Magic (Pre-configured)
```
API_KEY="cb36fba51af6068f87ca48aa2a514ca1efeb400fd98e9789c5f8b29a1777de7b"
```
- **Status**: Already configured
- **Purpose**: UI component generation and refinement

## How to Add API Keys

### Method 1: Environment Variables (Recommended)
1. Open System Properties → Advanced → Environment Variables
2. Add each variable under "User variables"
3. Restart Claude Desktop

### Method 2: Direct Configuration (Quick but less secure)
1. Edit `claude_desktop_config.json`
2. Replace empty strings with your API keys
3. Save and restart Claude Desktop

**Example:**
```json
"env": {
  "CONTEXT7_API_KEY": "your-actual-api-key-here"
}
```

## MCP Server Status

| MCP Server | Status | API Key Required | Purpose |
|------------|---------|------------------|---------|
| Context7 | ✅ Ready | Optional | Documentation & library info |
| Sequential Thinking | ✅ Ready | None | Problem-solving framework |
| Memory | ✅ Ready | None | Context retention |
| Stripe Toolkit | ⚠️ Needs API Key | Required | Payment processing |
| Fetch MCP | ✅ Ready | None | Web content fetching |
| TaskMaster AI | ⚠️ Needs API Key | Optional | Project management |
| GitHub MCP | ⚠️ Needs API Key | Required | Repository management |
| 21st Magic | ✅ Ready | Pre-configured | UI component building |

## Testing Your Setup

After configuring API keys:

1. **Restart Claude Desktop completely**
2. **Test each MCP with simple commands:**

```
Test Context7: "Get React documentation using context7"
Test Memory: "Create a knowledge entity for our disaster recovery project"
Test Stripe: "Create a test product called 'Emergency Response Service'"
Test GitHub: "List repositories in my GitHub account"
Test TaskMaster: "Initialize a new project structure"
Test 21st Magic: "Create a simple contact form component"
```

## Security Best Practices

1. **Never commit API keys to version control**
2. **Use test keys during development**
3. **Rotate keys regularly**
4. **Use environment variables instead of hardcoding**
5. **Keep production and test keys separate**

## Troubleshooting

### Common Issues:

**"MCP server not found"**
- Ensure Node.js v18+ is installed
- Run `npm install -g` for global packages

**"Authentication failed"**
- Check API key format and permissions
- Verify environment variables are set correctly

**"Server timeout"**
- Check internet connection
- Verify API service status

### Diagnostic Commands:
```batch
node --version
npm --version
echo %CONTEXT7_API_KEY%
echo %STRIPE_SECRET_KEY%
```

## Need Help?

1. Run `mcp-troubleshoot.bat` for automated diagnostics
2. Check individual MCP documentation
3. Verify API key permissions on respective platforms

---

**Next Steps:**
1. Set up your required API keys
2. Restart Claude Desktop
3. Test MCP functionality
4. Start using enhanced features!
