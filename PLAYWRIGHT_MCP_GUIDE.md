# Playwright MCP Integration Guide

## Overview
Playwright MCP provides browser automation capabilities for Claude Desktop, enabling web interaction through structured accessibility snapshots without requiring vision models.

## Installation Status
✅ **Configured** in both:
- `claude_desktop_config.json` - 3 configurations (default, headed, isolated)
- `.claude/mcp.json` - Project-specific configuration

## Key Features
- **Fast & Lightweight**: Uses accessibility tree, not pixel-based input
- **LLM-Friendly**: No vision models needed, operates on structured data
- **Deterministic**: Avoids ambiguity common with screenshots
- **Persistent Sessions**: Maintains login state across sessions

## Configuration Options

### 1. Default Configuration (`playwright`)
```json
{
  "command": "cmd",
  "args": ["/c", "npx", "-y", "@playwright/mcp@latest"],
  "env": { "PLAYWRIGHT_HEADLESS": "false" }
}
```
- Visible browser window
- Standard Chrome browser
- Persistent profile

### 2. Headed Configuration (`playwright-headed`)
```json
{
  "command": "cmd",
  "args": [
    "/c", "npx", "-y", "@playwright/mcp@latest",
    "--browser", "chrome",
    "--viewport-size", "1280,720",
    "--user-data-dir", "%USERPROFILE%\\AppData\\Local\\ms-playwright\\mcp-chrome-profile"
  ]
}
```
- Custom profile location
- Specified viewport size
- Debugging-friendly

### 3. Isolated Configuration (`playwright-isolated`)
```json
{
  "command": "cmd",
  "args": [
    "/c", "npx", "-y", "@playwright/mcp@latest",
    "--isolated",
    "--headless",
    "--browser", "chrome"
  ]
}
```
- Clean session each time
- Headless operation
- Best for testing

## Available Tools

### Core Automation
- `navigate_browser` - Navigate to URLs
- `click` - Click elements
- `fill` - Fill form fields
- `select_option` - Select dropdown values
- `type` - Type text
- `press` - Press keyboard keys
- `wait_for_element` - Wait for elements
- `take_screenshot` - Capture screenshots

### Tab Management
- `get_browser_tabs` - List open tabs
- `switch_browser_tab` - Switch between tabs
- `close_browser_tab` - Close tabs

### Advanced Features (Opt-in)
Enable with `--caps` flag:
- `vision` - Coordinate-based interactions
- `pdf` - PDF generation
- `verify` - Verification tools
- `tracing` - Session tracing

## Command-Line Options

```bash
npx @playwright/mcp@latest [options]
```

Key options:
- `--browser <browser>` - chrome, firefox, webkit, msedge
- `--headless` - Run in headless mode
- `--viewport-size <size>` - e.g., "1280,720"
- `--user-data-dir <path>` - Profile directory
- `--isolated` - Clean session mode
- `--device <device>` - e.g., "iPhone 15"
- `--timeout-action <ms>` - Action timeout (default: 5000)
- `--timeout-navigation <ms>` - Navigation timeout (default: 60000)
- `--save-trace` - Save session trace
- `--output-dir <path>` - Output directory

## Use Cases for Disaster Recovery Website

### 1. Emergency Response Testing
```
"Navigate to localhost:3000 and click the emergency hotline button"
"Test the emergency contact form submission"
"Verify all emergency service links are working"
```

### 2. Form Automation Testing
```
"Fill out the contact form with test data for water damage service"
"Test the booking system for fire damage restoration"
"Submit a quote request for mould remediation"
```

### 3. Navigation Testing
```
"Navigate through all service pages and check for broken links"
"Test the mobile menu navigation"
"Verify the service area map interactions"
```

### 4. Visual Regression Testing
```
"Take screenshots of all main pages for visual comparison"
"Capture the hero section animations"
"Screenshot the testimonials carousel at different states"
```

### 5. Performance Testing
```
"Measure page load times for the homepage"
"Test the chatbot response time"
"Check form submission speeds"
```

## Integration with Your Project

### Testing Emergency Features
```javascript
// Test emergency hotline visibility
await page.waitForSelector('[href="tel:1300309361"]');
await page.click('[href="tel:1300309361"]');
```

### Testing Service Forms
```javascript
// Fill service request form
await page.fill('#name', 'Test User');
await page.fill('#email', 'test@example.com');
await page.selectOption('#service', 'water-damage');
await page.click('button[type="submit"]');
```

### Testing Chatbot Integration
```javascript
// Open and interact with chatbot
await page.click('#chatbot-trigger');
await page.waitForSelector('.chat-window');
await page.fill('.chat-input', 'I need emergency help');
await page.press('.chat-input', 'Enter');
```

## Setup Instructions

### Quick Setup
```bash
# Run setup script
setup-playwright-mcp.bat

# Or manually install
npm install -g @playwright/mcp@latest
npx playwright install chromium
```

### Testing Installation
```bash
# Test Playwright MCP
npx @playwright/mcp@latest --help

# Run test script
node test-playwright-dr.js
```

## Profile Locations

### Windows
- Default: `%USERPROFILE%\AppData\Local\ms-playwright\mcp-chrome-profile`
- Temp: `%TEMP%\playwright-mcp-*`

### macOS
- Default: `~/Library/Caches/ms-playwright/mcp-chrome-profile`

### Linux
- Default: `~/.cache/ms-playwright/mcp-chrome-profile`

## Troubleshooting

### Browser Not Launching
1. Install browsers: `npx playwright install chromium`
2. Install dependencies: `npx playwright install-deps`
3. Check firewall settings

### MCP Not Available
1. Restart Claude Desktop
2. Check configuration in `claude_desktop_config.json`
3. Verify Node.js 18+ is installed

### Session Issues
1. Clear profile: Delete profile directory
2. Use isolated mode for clean sessions
3. Check storage state configuration

### Timeout Errors
1. Increase timeouts: `--timeout-action 10000`
2. Add explicit waits: `wait_for_element`
3. Check network connectivity

## Best Practices

### 1. Use Appropriate Mode
- **Headed**: For debugging and visual verification
- **Headless**: For automated testing
- **Isolated**: For clean, reproducible tests

### 2. Handle Dynamic Content
- Use `wait_for_element` before interactions
- Add appropriate timeouts
- Handle loading states

### 3. Maintain Sessions
- Use persistent profiles for logged-in testing
- Save storage state for session reuse
- Clear profiles periodically

### 4. Error Handling
- Implement try-catch blocks
- Add screenshot on failure
- Log detailed error messages

## Example Commands for Claude

### Basic Navigation
```
"Open the disaster recovery website and navigate to the water damage service page"
```

### Form Testing
```
"Fill out the emergency contact form with test data and submit it"
```

### Visual Testing
```
"Take screenshots of the homepage hero section and all service cards"
```

### Interactive Testing
```
"Click through the testimonials carousel and capture each testimonial"
```

### Comprehensive Test
```
"Run a full test of the emergency response flow: navigate to site, click emergency button, fill contact form, and verify submission"
```

## Integration with Other MCPs

### With Sequential Thinking
```
"Use sequential thinking to plan comprehensive browser testing for the disaster recovery website, then execute with Playwright"
```

### With Context7
```
"Use Context7 to understand Playwright's API documentation, then test the disaster recovery forms"
```

## Security Considerations

1. **Isolated Sessions**: Use for sensitive testing
2. **Clear Profiles**: Regularly clear stored data
3. **Avoid Credentials**: Don't store passwords in configs
4. **Use Secrets File**: Store sensitive data separately

## Performance Tips

1. **Reuse Sessions**: Keep browser open for multiple tests
2. **Parallel Testing**: Use multiple browser contexts
3. **Optimize Selectors**: Use efficient CSS/XPath selectors
4. **Minimize Screenshots**: Only capture when needed

## Next Steps

1. ✅ Configuration complete
2. 🔄 Restart Claude Desktop
3. 🎯 Test with simple commands first
4. 📝 Document test scenarios
5. 🚀 Integrate into development workflow

---

**Last Updated**: December 2024
**Version**: @playwright/mcp@latest
**Documentation**: https://github.com/microsoft/playwright-mcp