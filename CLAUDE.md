# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 PROJECT IDENTITY
**Disaster Recovery Brisbane - Direct Service Provider**
- Repository: DR-New (Brisbane/Ipswich/Logan focused)
- NOT a platform/marketplace - Direct disaster recovery SERVICE PROVIDER
- Emergency Hotline: 1300 309 361
- Service Areas: Brisbane, Ipswich, Logan

## 📦 Development Commands

```bash
# Setup
npm install                   # Install dependencies
cp .env.example .env.local    # Copy environment variables

# Development
npm run dev                   # Start Next.js dev server (http://localhost:3000)
npm run build                 # Build for production
npm run start                 # Start production server
npm run lint                  # Run ESLint

# Performance Testing
npm run lighthouse            # Run Lighthouse audit with viewer
npm run performance           # Build and run Lighthouse performance test
npm run test:performance      # Run custom performance test script
npm run build:analyze        # Analyze bundle size (ANALYZE=true)

# MCP Server Management (Windows)
mcp-auto-start.bat           # Start Claude CLI with automatic health check
mcp-health-check.bat         # Validate and repair MCP configuration
verify-mcp-fix.bat           # Quick verification of MCP status
```

**Note**: No test framework is currently configured. Tests should be added using Jest or Vitest as needed.

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion
- **UI Library**: Radix UI primitives
- **MCP Servers**: Context7, Sequential Thinking, Playwright

### Core Architecture Layers

1. **Frontend Layer** (Next.js App Router)
   - Server Components by default, Client Components only when needed
   - Page structure: `app/` for routes, `components/` for reusable UI
   - Optimized image loading with next/image

2. **Integration Layer** (`lib/integration/master-integration.ts`)
   - Central orchestration hub connecting all modules
   - Singleton pattern managing personalization, analytics, chatbot, and conversion
   - Provides `MasterIntegrationProvider` React context wrapper
   - Auto-initializes all connected services on app load

3. **Intelligence Systems**
   - **Personalization** (`lib/personalization/`) - User profiling, emergency detection, content adaptation
   - **Analytics** (`lib/analytics/`) - Real-time tracking, AI insights, predictive metrics
   - **Chatbot** (`lib/chatbot/`) - Multi-language support, sentiment analysis, OpenAI integration
   - **Conversion** (`lib/conversion/`) - A/B testing, funnel optimization, urgency components
   - **Brand** (`lib/brand/`) - Authority building, social proof amplification

4. **API Layer** (`app/api/`)
   - `/api/analytics/` - Analytics event tracking and reporting
   - `/api/chatbot/` - OpenAI-powered chat services (server-side only)
   - `/api/weather/` - Location-based weather for personalization

### Key Integration Points

- **MasterIntegrationProvider** wraps the app to provide unified context
- All premium components (HeroPremium, TrustIndicators, etc.) connect to master integration
- Real-time data flows through WebSocket/Server-Sent Events
- OpenAI API calls are server-side only (via API routes)

### Key Patterns

#### Component Architecture
- **Server Components by default** - Client components only when needed (useState, onClick, etc.)
- **shadcn/ui pattern** - Components in `components/ui/` are customizable, copy-paste friendly
- **Image optimization** - All images use Next.js Image component with proper sizing

#### Styling System
- **Design tokens** in `tailwind.config.ts`:
  - Primary: Blue (#2563eb) for trust
  - Emergency: Red (#dc2626) for CTAs
  - Custom Brisbane theme colors
- **CSS variables** in `app/globals.css` for theme switching capability
- **Responsive breakpoints**: Mobile-first with sm/md/lg/xl/2xl

#### SEO Strategy
- **Metadata** in layout.tsx with OpenGraph and Twitter cards
- **Location-based pages** in `/locations/` for local SEO
- **Service pillar pages** in `/services/` for service-specific SEO
- **Schema markup** ready structure for LocalBusiness/EmergencyService

### Image Management
```
public/images/
├── hero/              # 7 rotating hero images
├── equipment/         # Equipment showcase
├── process/           # Process photos
└── optimized/        # Pre-optimized versions
```

Hero rotation sequence:
1. disaster-recovery-services.jpg
2. fire-smoke-damage-restoration.jpg
3. fire-water-damage-restoration.jpg
4. mould-remediation-services.jpg
5. commercial-restoration-services.jpg
6. sewage-remediation-services.png
7. biohazard-remediation-services.png

## 🛠️ Common Development Workflows

### Fixing Build Errors
1. Check dev server output: `npm run dev`
2. Look for import errors, missing exports, case sensitivity issues
3. Clear Next.js cache if needed: `rm -rf .next` or `del /s /q .next`
4. Restart dev server after major changes

### Working with Premium Components
- Components ending in "Premium" (HeroPremium, HeroConversion) use advanced features
- These connect to master integration for AI insights and personalization
- Always check window availability: `typeof window !== 'undefined'`

### Debugging Import Issues
- Windows filesystem is case-insensitive but webpack is case-sensitive
- Common issue: `Card.tsx` vs `card.tsx` imports
- Fix with: `sed -i "s/from '.*\/card'/from '@\/components\/ui\/Card'/g" filename`

## 🤖 MCP Server Configuration

### Setup Location
- Configuration: `.claude/mcp.json`
- MCP servers need to be enabled in Claude's settings
- Restart Claude after configuration changes

### Available Servers
1. **Context7**: Library documentation lookup
2. **Sequential Thinking**: Complex problem solving
3. **Playwright**: Browser automation and testing

**Note**: MCP servers may not be available in all Claude environments

## 🎯 Business Context

### Target Audience
- **Residential**: High net worth homeowners in Brisbane/Ipswich
- **Commercial**: Business properties in Brisbane/Ipswich/Logan
- **Emergency**: Anyone needing immediate disaster recovery assistance

### Service Focus
- Water Damage Restoration
- Fire & Smoke Damage
- Mould Remediation
- Biohazard & Trauma Cleaning
- Storm & Natural Disaster Recovery

### Service Areas
- **Primary**: Brisbane (all suburbs), Ipswich, Logan
- **Extended**: Gold Coast & Sunshine Coast (emergency only)
- **Office**: 4/17 Tile St, Wacol, QLD 4076

### Key Differentiators
- IICRC certified technicians
- 1-hour emergency response
- Insurance approved processes
- Local Brisbane team
- Direct service (no contractors)

## ⚡ Performance Targets
- Page Load: < 2 seconds
- Core Web Vitals: All green
- Mobile Score: 90+ PageSpeed Insights
- Accessibility: WCAG 2.1 AA

## 🔧 Development Guidelines

### Environment Setup
- Copy `.env.example` to `.env.local` before development
- Environment variables include contact info, service areas, and URLs
- All contact details are configurable via environment variables

### When Adding Features
1. Maintain direct service provider messaging ("We provide", "Our team")
2. Keep emergency CTA prominent (1300 309 361)
3. Optimize images before adding to public/images/
4. Follow existing component patterns in components/ui/
5. Test responsive design on mobile/tablet/desktop
6. Focus on premium look targeting high net worth clients

### Code Style
- Use TypeScript strict mode
- Follow Next.js App Router conventions
- Keep components small and focused
- Use semantic HTML for accessibility
- Implement proper error boundaries
- Avoid using OpenAI client directly in browser - use API routes

### Critical Files & Modules
- `lib/integration/master-integration.ts` - Central orchestration hub
- `app/page.tsx` - Homepage with premium components integration
- `app/layout.tsx` - Root layout with providers and metadata
- `components/sections/HeroPremium.tsx` - Main hero with AI-powered personalization
- `components/integration/MasterIntegrationProvider.tsx` - Context provider wrapper
- `lib/personalization/personalization-engine.ts` - Singleton personalization engine
- `lib/analytics/realtime.ts` - WebSocket/SSE real-time metrics

### Data Flow Architecture
1. User visits site → `MasterIntegrationProvider` initializes
2. Personalization engine profiles user (location, behavior, emergency status)
3. AI insights analyze patterns and predict needs
4. Components adapt content based on real-time data
5. Analytics track engagement and conversions
6. Chatbot provides proactive assistance when needed

### State Management
- **Zustand** for global state (if needed for complex features)
- **React Context** via MasterIntegrationProvider for cross-component data
- **Server state** via React Query/SWR for API data fetching
- **Local state** with useState/useReducer for component-specific needs

---

**Last Updated**: December 2024
**Business Model**: Direct Service Provider (NOT a platform)