# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---
**Version**: 2.0.0
**Last Updated**: January 2025
**Maintainer**: Development Team
**Production Status**: 45% Complete (25/56 checklist items)

---

## 🎯 PROJECT IDENTITY

**Disaster Recovery - Direct Service Provider**
*(Rebranded from Disaster Recovery QLD)*

- **Repository**: DR-New (Production deployment for disasterrecovery.com.au)
- **Business Model**: Direct disaster recovery SERVICE PROVIDER (NOT a platform/marketplace)
- **Production URL**: https://disasterrecovery.com.au
- **Emergency Hotline**: 1300 309 361
- **Service Areas**: Brisbane, Ipswich, Logan, Gold Coast, Sunshine Coast

## 📊 PROJECT STATUS

### Production Readiness: 45% Complete

#### ✅ Completed (25 items)
- Schema Markup (LocalBusiness, EmergencyService)
- Legal Pages (Privacy Policy, Terms of Service)
- Core Pages (About, Contact with full business details)
- Accessibility (Skip navigation, icon system, cookie consent)
- SEO Foundation (Sitemap, meta tags, OpenGraph)
- Environment Configuration (.env.production)
- Security Headers
- Contact Forms
- Brand Assets
- Emergency CTAs

#### ⏳ Remaining Critical Tasks (31 items)
1. **SSL Certificate Configuration** - Critical for production
2. **Complete 8 Service Pages** - Core service content
3. **Location Landing Pages** - Suburb-specific SEO pages
4. **Performance Optimization** - Target <2s load time
5. **Google Analytics 4 Integration** - Tracking setup
6. **Sticky Mobile CTA** - Mobile conversion optimization
7. **Domain Redirect Setup** - From disasterrecovery.com.au
8. **CDN Configuration** - Performance enhancement
9. **Backup Strategy** - Data protection
10. **Monitoring Setup** - Uptime and error tracking

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

# Vercel Deployment Monitoring
# Latest deployment URL: https://dr-gyshmkcj0-unite-group.vercel.app
# Previous deployment URL: https://dr-kv13xi3us-unite-group.vercel.app
# Use Playwright MCP to monitor build errors after each deployment

# Build Error Detection
node scripts/simple-readability-test.js  # Check Hemingway compliance
npm run build                            # Verify local build success

# Windows Batch Scripts
start-all-mcp-servers.bat    # Start Context7, Sequential Thinking, and Playwright
playwright-with-config.bat    # Start Playwright with Brisbane config
mcp-troubleshoot.bat         # Diagnose MCP issues
test-all-mcps.bat            # Test all MCP servers
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

### Company Information
- **Business Name**: Disaster Recovery (formerly Disaster Recovery QLD)
- **Founded**: July 2011
- **Founders**: Phill & Bronwyn McGurk
- **Experience**: 25+ years in restoration industry
- **Office**: 4/17 Tile St, Wacol, QLD 4076
- **Phone**: 1300 309 361
- **Email**: info@disasterrecovery.com.au
- **Website**: disasterrecovery.com.au

### Certifications & Insurance
- **IICRC Certified**: Water, Fire, Mould, Biohazard
- **CARSI Member**: Certified Australian Restoration Services Industry
- **Insurance**: $20 million public liability
- **Partners**: QBE, IAG, RACQ, Allianz

### Industry Leadership
- **NRPG Initiative**: National Restoration Professionals Group (Founder)
- **Education**: Developing industry's first ASQA-approved restoration course
- **Media**: Professional restoration podcast in development

### Target Audience
- **Residential**: High net worth homeowners in Brisbane/Ipswich
- **Commercial**: Business properties across Queensland
- **Insurance**: Direct insurance company partnerships
- **Emergency**: 24/7 immediate disaster recovery assistance

### Service Focus
- Water Damage Restoration
- Fire & Smoke Damage
- Mould Remediation
- Biohazard & Trauma Cleaning
- Storm & Natural Disaster Recovery
- Sewage Cleanup
- Commercial Restoration
- Contents Restoration

### Service Areas
- **Primary**: Brisbane (all suburbs), Ipswich, Logan
- **Secondary**: Gold Coast, Sunshine Coast
- **Emergency Coverage**: Southeast Queensland region

### Key Differentiators
- IICRC & CARSI certified technicians
- 1-hour emergency response guarantee
- Insurance approved processes
- Local Brisbane team (not franchised)
- Direct service (no subcontractors)
- $20M insurance coverage
- 25+ years industry experience

## ⚡ Performance Targets
- Page Load: < 2 seconds
- Core Web Vitals: All green
- Mobile Score: 90+ PageSpeed Insights
- Accessibility: WCAG 2.1 AA

## 🔧 Development Guidelines

### Environment Setup
```bash
# Development
cp .env.example .env.local    # Local development config

# Production
cp .env.production .env.local # Use production values for testing
```

**Key Environment Variables**:
- `NEXT_PUBLIC_SITE_URL`: https://disasterrecovery.com.au
- `NEXT_PUBLIC_BUSINESS_NAME`: Disaster Recovery
- `NEXT_PUBLIC_PHONE`: 1300 309 361
- `NEXT_PUBLIC_EMAIL`: info@disasterrecovery.com.au
- `NEXT_PUBLIC_ADDRESS`: 4/17 Tile St, Wacol, QLD 4076

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

#### Core Application
- `lib/integration/master-integration.ts` - Central orchestration hub
- `app/page.tsx` - Homepage with premium components integration
- `app/layout.tsx` - Root layout with providers and metadata
- `.env.production` - Production environment configuration

#### Completed Pages
- `app/about/page.tsx` - Company information and team
- `app/contact/page.tsx` - Contact forms and business details
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms of service

#### Premium Components
- `components/sections/HeroPremium.tsx` - Main hero with AI-powered personalization
- `components/sections/HeroConversion.tsx` - Conversion-optimized hero
- `components/sections/TrustIndicators.tsx` - Social proof components
- `components/integration/MasterIntegrationProvider.tsx` - Context provider wrapper

#### Intelligence Systems
- `lib/personalization/personalization-engine.ts` - Singleton personalization engine
- `lib/analytics/realtime.ts` - WebSocket/SSE real-time metrics
- `lib/chatbot/chatbot-engine.ts` - AI-powered chat support
- `lib/conversion/conversion-optimizer.ts` - A/B testing and funnel optimization

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

### Production Deployment Checklist

#### Pre-Launch Requirements
- [ ] SSL certificate installed and verified
- [ ] Domain redirect configured (disasterrecovery.com.au)
- [ ] Google Analytics 4 connected
- [ ] All 8 service pages completed
- [ ] Performance <2s load time achieved
- [ ] Mobile sticky CTA implemented
- [ ] Location landing pages created
- [ ] Monitoring and alerting configured
- [ ] Backup strategy implemented
- [ ] CDN configured for assets

#### Post-Launch Tasks
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Google My Business integration
- [ ] Set up conversion tracking
- [ ] Implement review collection system
- [ ] Configure email automation
- [ ] Set up performance monitoring

---

## 📝 CHANGELOG

### Version 2.0.0 (January 2025)
- Updated company branding from "Disaster Recovery QLD" to "Disaster Recovery"
- Added production deployment status (45% complete)
- Updated business information with certifications and partnerships
- Added NRPG initiative and education programs
- Created production deployment checklist
- Updated MCP server batch scripts
- Added completed vs pending task tracking

### Version 1.0.0 (December 2024)
- Initial CLAUDE.md creation
- Established project structure and conventions
- Defined architecture and tech stack

---

**Last Updated**: January 2025
**Business Model**: Direct Service Provider (NOT a platform)
**Production Status**: 45% Complete - Ready for SSL and final content