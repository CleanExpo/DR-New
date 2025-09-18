# Semrush MCP Setup Guide

## Installation Complete ✅

The Semrush MCP server has been added to your `.claude/mcp.json` configuration.

## Setup Steps

### 1. Get Your Semrush API Key

**Note:** The Semrush API key is already configured in your Vercel environment variables and the `/api/semrush` endpoint is working.

To use it locally with the MCP:
1. The API key is stored in Vercel's environment variables (for security)
2. For local development, you can:
   - Get the key from your Vercel dashboard: Project Settings → Environment Variables → `SEMRUSH_API_KEY`
   - Or contact your administrator for the API key

### 2. Update Configuration
Replace `YOUR_SEMRUSH_API_KEY_HERE` in `.claude/mcp.json` with your actual API key:

```json
"SEMRUSH_API_KEY": "your-actual-api-key-here"
```

**Security Note:** Never commit the actual API key to Git. The `.claude/mcp.json` file is already in `.gitignore`.

### 3. Restart Claude
After updating the API key, restart Claude Desktop for the changes to take effect.

## Available SEO Tools

### Domain Analysis
- `semrush_domain_overview` - Get comprehensive domain metrics
- `semrush_domain_organic_keywords` - Analyze organic keywords
- `semrush_domain_paid_keywords` - Analyze paid keywords
- `semrush_competitors` - Identify competitor domains
- `semrush_backlinks` - Get backlink data
- `semrush_backlinks_domains` - Get referring domains

### Keyword Research
- `semrush_keyword_overview` - Get keyword metrics
- `semrush_related_keywords` - Find related keywords
- `semrush_batch_keyword_overview` - Analyze up to 100 keywords
- `semrush_keyword_organic_results` - Get ranking domains
- `semrush_keyword_difficulty` - Check ranking difficulty
- `semrush_phrase_questions` - Find question-based keywords

### Traffic Analytics
- `semrush_traffic_summary` - Get traffic overview
- `semrush_traffic_sources` - Analyze traffic sources
- `semrush_api_units_balance` - Check API units remaining

## Usage for Disaster Recovery Website

### Priority SEO Analysis Tasks

1. **Domain Authority Check**
   ```
   semrush_domain_overview for disasterrecovery.com.au
   ```

2. **Competitor Analysis**
   ```
   semrush_competitors for disasterrecovery.com.au
   Analyze top competitors in Brisbane disaster recovery
   ```

3. **Keyword Research**
   ```
   Analyze these priority keywords:
   - "water damage restoration brisbane"
   - "flood restoration queensland"
   - "mould removal brisbane"
   - "fire damage restoration brisbane"
   - "emergency restoration services"
   ```

4. **Backlink Audit**
   ```
   semrush_backlinks for disasterrecovery.com.au
   Identify link-building opportunities
   ```

5. **Local SEO Keywords**
   ```
   Research location-specific keywords:
   - "[service] + brisbane"
   - "[service] + ipswich"
   - "[service] + logan"
   ```

## API Units Management

Different API calls consume different units:
- Domain Overview: 10 units
- Keyword Overview: 10 units per keyword
- Backlinks: Variable based on limit
- Traffic Analytics: Requires .Trends subscription

Monitor your balance with `semrush_api_units_balance`

## Security Notes

⚠️ **IMPORTANT**:
- Never commit the API key to Git
- Add `.claude/mcp.json` to `.gitignore` if not already there
- Keep your API key secure and private

## Troubleshooting

If the MCP server doesn't connect:
1. Verify API key is correct
2. Check internet connection
3. Restart Claude Desktop
4. Check API units balance (might be depleted)

## Next Steps

Once configured, we can:
1. Analyze competitor keywords
2. Find content gaps
3. Identify high-value keywords with low competition
4. Track ranking opportunities
5. Build a comprehensive SEO strategy

---
*Last Updated: January 2025*