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
npm run dev          # Start Next.js dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint

# MCP Servers (for AI assistance)
start-all-mcp-servers.bat    # Start Context7, Sequential Thinking, and Playwright
playwright-with-config.bat    # Start Playwright with Brisbane config
mcp-troubleshoot.bat         # Diagnose MCP issues
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

### Project Structure
```
app/
├── page.tsx                 # Homepage with Hero, Services, ServiceAreas
├── layout.tsx              # Root layout with SEO metadata
├── services/               # Service pillar pages
│   ├── water-damage-restoration/
│   └── fire-damage-restoration/
├── locations/              # Location-specific pages
│   └── brisbane/
└── water-damage/          # Legacy pillar page

components/
├── layout/
│   ├── Header.tsx         # Navigation with emergency CTA
│   └── Footer.tsx         # Site footer
├── sections/
│   ├── Hero.tsx           # 7-image rotating hero banner
│   ├── Services.tsx       # Service cards grid
│   └── ServiceAreas.tsx   # Location coverage
├── ui/                    # Reusable shadcn/ui components
│   ├── Card.tsx
│   ├── Button.tsx
│   └── OptimizedImage.tsx
├── gallery/
│   └── EquipmentGallery.tsx
└── process/
    └── ProcessShowcase.tsx
```

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

## 🤖 AI Development Tools

### Context7 MCP
- Add "use context7" to prompts for current library docs
- Example: "Create a Next.js API route with auth. use context7"

### Sequential Thinking MCP
- For complex problem-solving and architecture planning
- Example: "Plan the booking system architecture using sequential thinking"

### Playwright MCP
- Browser automation for testing (Brisbane config available)
- Example: "Test the contact form submission flow"

### Auto-invoke Rules
1. **Always use context7** for code generation and library documentation
2. **Use sequential thinking** for complex multi-step problems
3. **Use Playwright** for browser automation and testing

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

---

**Last Updated**: September 2025
**Business Model**: Direct Service Provider (NOT a platform)