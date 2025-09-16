# MCP Usage Examples and Commands

## Quick Reference for Each MCP Server

### 1. Context7 MCP
**Purpose**: Get up-to-date library documentation and code examples

**Basic Usage:**
```
"Create a React component with TypeScript using context7"
"Set up Next.js with Tailwind CSS using context7"
"Show me Prisma setup with PostgreSQL using context7"
```

**Advanced Usage:**
```
"Use context7 to get the latest React Router documentation"
"Get Stripe payment integration examples using context7"
"Show shadcn/ui button component documentation using context7"
```

### 2. Sequential Thinking MCP
**Purpose**: Break down complex problems into structured steps

**Basic Usage:**
```
"Plan the architecture for a disaster recovery booking system"
"Debug this performance issue step by step"
"Design a database schema for customer management"
```

**Advanced Usage:**
```
"Use sequential thinking to analyze our conversion optimization strategy"
"Think through the pros and cons of microservices vs monolith architecture"
"Plan the migration from our current system to a new tech stack"
```

### 3. Memory MCP
**Purpose**: Create and manage knowledge entities across sessions

**Basic Usage:**
```
"Create a knowledge entity for our disaster recovery business model"
"Remember that we use Next.js, Tailwind, and Supabase in our stack"
"Store information about our Brisbane service area"
```

**Advanced Usage:**
```
"Create entities for our customers: residential and commercial segments"
"Remember the relationship between our services and pricing tiers"
"Update the entity about our competitor analysis findings"
```

### 4. Stripe Agent Toolkit
**Purpose**: Manage payments, products, and subscriptions
*Requires: STRIPE_SECRET_KEY*

**Basic Usage:**
```
"Create a test product called 'Emergency Water Damage Service' for $299"
"Create a payment link for our flood damage assessment service"
"Set up a subscription product for our maintenance plans"
```

**Advanced Usage:**
```
"Create a tiered pricing structure with three service levels"
"Generate payment links for all our emergency services"
"Set up recurring billing for our monthly inspection service"
```

### 5. Fetch MCP
**Purpose**: Retrieve and process web content

**Basic Usage:**
```
"Fetch the content from our competitor's pricing page"
"Get the HTML content from disasterrecovery.com.au"
"Retrieve the JSON data from our API endpoint"
```

**Advanced Usage:**
```
"Fetch and analyze the content structure of the top 5 disaster recovery websites"
"Get the markdown content from our documentation site for analysis"
"Retrieve and compare pricing structures from competitor websites"
```

### 6. TaskMaster AI
**Purpose**: Project management and task organization
*Requires: One AI API key (OpenAI, Anthropic, Google, or Perplexity)*

**Basic Usage:**
```
"Initialize a new project structure for our booking system"
"Create tasks for implementing the customer portal"
"Generate a PRD (Product Requirements Document) for our mobile app"
```

**Advanced Usage:**
```
"Parse this PRD and generate implementation tasks with dependencies"
"Analyze task complexity and suggest expansion for complex features"
"Create a project timeline with milestones for our Q4 launch"
```

### 7. GitHub MCP
**Purpose**: Repository management and version control
*Requires: GITHUB_PERSONAL_ACCESS_TOKEN*

**Basic Usage:**
```
"List all repositories in my GitHub account"
"Create a new issue in the DR-New repository"
"Show me the latest commits in the main branch"
```

**Advanced Usage:**
```
"Create a pull request with the latest UI improvements"
"Fork the shadcn/ui repository to our organization"
"Set up automated issue creation for bug reports"
```

### 8. 21st Magic
**Purpose**: UI component generation and refinement
*Pre-configured and ready to use*

**Basic Usage:**
```
"Create a contact form component using /ui"
"Generate a pricing table component"
"Build a service card component for our offerings"
```

**Advanced Usage:**
```
"Refine our hero section component for better conversion /ui"
"Create a responsive navigation component with mobile menu /ui"
"Generate a dashboard layout with sidebar navigation /ui"
```

## Combining MCPs for Powerful Workflows

### Workflow 1: Complete Feature Development
```
1. "Use sequential thinking to plan a customer booking system"
2. "Use context7 to get Next.js and Supabase integration examples"
3. "Create a knowledge entity about our booking system requirements"
4. "Use taskmaster to create implementation tasks"
5. "Generate UI components for the booking form using /ui"
6. "Create a GitHub issue to track this feature development"
```

### Workflow 2: Competitor Analysis and Strategy
```
1. "Fetch content from top 3 competitor websites"
2. "Use sequential thinking to analyze their pricing strategies"
3. "Create memory entities for each competitor's strengths/weaknesses"
4. "Use taskmaster to create competitive response action items"
5. "Create Stripe products matching our new pricing strategy"
```

### Workflow 3: Documentation and Knowledge Management
```
1. "Use context7 to get the latest documentation for our tech stack"
2. "Create memory entities for each technology we use"
3. "Generate taskmaster tasks for updating our documentation"
4. "Create GitHub issues for documentation improvements"
5. "Use fetch to gather additional resources and tutorials"
```

## Pro Tips for MCP Usage

### 1. Chain Commands Effectively
```
"First use sequential thinking to plan our e-commerce integration, 
then use context7 to get Stripe documentation, 
finally create the necessary components using /ui"
```

### 2. Specify Context
```
"Using our disaster recovery business context stored in memory, 
create a pricing strategy using sequential thinking"
```

### 3. Combine Research with Action
```
"Fetch the latest Next.js 14 features documentation, 
then use context7 to get implementation examples, 
and create upgrade tasks in taskmaster"
```

### 4. Use Memory for Continuity
```
"Remember that we decided to use Supabase for auth and database.
Now use context7 to get Supabase setup examples for Next.js"
```

## Testing Your MCP Setup

### Quick Test Commands:
1. **Context7**: `"Get React useState documentation using context7"`
2. **Sequential Thinking**: `"Plan a simple todo app step by step"`
3. **Memory**: `"Create an entity for our tech stack preferences"`
4. **Fetch**: `"Fetch the content from google.com"`
5. **21st Magic**: `"Create a simple button component /ui"`

### With API Keys:
6. **Stripe**: `"Create a test product called 'Test Service' for $10"`
7. **TaskMaster**: `"Initialize a new project in the current directory"`
8. **GitHub**: `"List my GitHub repositories"`

## Common Issues and Solutions

### "MCP server not responding"
- Restart Claude Desktop completely
- Check internet connection
- Verify Node.js is v18+

### "Authentication failed"
- Verify API keys are set correctly
- Check environment variable names match exactly
- Restart Claude Desktop after setting API keys

### "Command not found"
- Ensure packages are installed with `npm install -g`
- Try using `npx` prefix for commands
- Check Windows PATH environment variable

---

**Remember**: Always restart Claude Desktop after making configuration changes!
