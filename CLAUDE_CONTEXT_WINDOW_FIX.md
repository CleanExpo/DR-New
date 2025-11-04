# Claude Context Window Fix - Solution Guide

## Problem Analysis
You received this error:
```
Failed to create stream: inference request failed: failed to invoke model 'anthropic/claude-sonnet-4' with streaming from OpenRouter: request failed with status 400: {"error":{"message":"Provider returned error","code":400,"metadata":{"raw":"{\"message\":\"Input is too long for requested model.\"}","provider_name":"Amazon Bedrock"}}}
```

## Root Causes
1. **Model Limitation**: Claude Sonnet 4 through OpenRouter/Bedrock has a smaller context window than needed
2. **Extensive Custom Instructions**: Your .clinerules contain very detailed instructions consuming significant tokens
3. **Multiple MCP Servers**: Adding to the context window usage
4. **Project Complexity**: Large project with many files increases initial context

## Solution Options

### Option 1: Switch to Claude 3.5 Sonnet (RECOMMENDED)
**Why this works**: Claude 3.5 Sonnet has a 200K token context window which should handle your setup.

**Configuration Changes Needed**:
1. In your Claude Desktop app settings, change the model from:
   - `anthropic/claude-sonnet-4` (through OpenRouter)
   - To: `claude-3-5-sonnet-20241022` (direct Anthropic API)

2. If using OpenRouter, change to:
   - `anthropic/claude-3.5-sonnet`

### Option 2: Use Direct Anthropic API
**Configuration**: 
```json
{
  "apiUrl": "https://api.anthropic.com/v1/messages",
  "model": "claude-3-5-sonnet-20241022",
  "apiKey": "your-anthropic-api-key"
}
```

### Option 3: Optimize Custom Instructions (If needed)
If you still hit limits, streamline your .clinerules:

**Current Structure Analysis**:
- Plan Mode Instructions: ~2000 tokens
- Act Mode Instructions: ~2500 tokens  
- Implementation Sequence: ~1500 tokens
- Redundant sections: ~500 tokens

**Optimization Strategy**:
- Remove redundant CRITICAL NOTE repetitions
- Consolidate similar instructions
- Focus on essential functionality

## MCP Server Status
Your current MCP configuration is well-structured:

**claude_desktop_config.json**:
- filesystem server ✓
- playwright server ✓  
- context7 server ✓
- sequential-thinking server ✓

**Recommendation**: Keep current MCP setup - it's optimized.

## Implementation Steps

### Immediate Fix (Choose One):

**For Direct Anthropic API**:
1. Get Anthropic API key from console.anthropic.com
2. Update Claude Desktop settings
3. Change model to `claude-3-5-sonnet-20241022`
4. Test with a simple prompt

**For OpenRouter Fix**:
1. Keep OpenRouter setup
2. Change model to `anthropic/claude-3.5-sonnet`
3. Verify OpenRouter credit balance
4. Test the connection

### Verification Steps:
1. Restart Claude Desktop application
2. Test with a simple prompt first
3. Verify MCP servers are still working
4. Test your custom instructions functionality

## Expected Results
- ✅ Context window error resolved
- ✅ Full access to your custom .clinerules
- ✅ All MCP servers functional
- ✅ 200K token context window available
- ✅ Better performance overall

## Fallback Plan
If issues persist:
1. Temporarily simplify .clinerules
2. Test with minimal MCP servers
3. Gradually add back functionality
4. Monitor token usage

## Long-term Recommendations
1. **Monitor Context Usage**: Keep track of token consumption
2. **Regular Cleanup**: Remove outdated custom instructions
3. **MCP Optimization**: Only load needed MCP servers per session
4. **Model Updates**: Stay updated with new model releases

## Support Resources
- Anthropic API Documentation: https://docs.anthropic.com
- Claude Desktop Configuration: Check app settings
- MCP Server Documentation: https://modelcontextprotocol.io

---
**Next Action**: Choose your preferred solution option and update your Claude Desktop configuration accordingly.
