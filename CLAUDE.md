# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**⚠️ IMPORTANT**: Read `rules.md` first - it contains non-negotiable enforcement guidelines for this project.

---

## Project Overview

**Disaster Recovery Brisbane** - Professional disaster recovery and restoration services website for water damage, fire damage, mould remediation, and emergency response across Brisbane, Ipswich, and Logan.

### Local Service Focus

- **High Net Worth Residential**: Hamilton, Ascot, New Farm, Toowong (Brisbane); Karalee, Brookwater, Springfield Lakes (Ipswich)
- **Commercial Properties**: Brisbane CBD, Fortitude Valley, Ipswich, Logan
- **Key Differentiator**: Phill McGurk - IICRC Master Restorer (one of few in QLD)

### Critical Constraints

❌ **NEVER include:**
- National expansion content
- CRM or contractor management systems
- Pitch decks or investor materials
- Automated claim distribution
- RAI/RIA certification claims (Phill is IICRC Master Restorer ONLY)
- Fake statistics or testimonials

✅ **ALWAYS focus on:**
- Direct local service delivery by certified professionals
- 24/7 emergency response messaging
- Master Restorer certification prominence
- Insurance company partnerships
- Brisbane/Ipswich/Logan service areas

---

## Tech Stack

### Core Framework
- **Next.js 14.2.32** - App Router (React Server Components)
- **React 18** - Server and Client Components
- **TypeScript 5.5.4** - Strict mode enabled
- **Node.js 18+** - Required runtime

### Frontend
- **Tailwind CSS 3.4.7** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon library

### Backend & Database
- **Prisma 5.22.0** - ORM with SQLite (dev) / PostgreSQL (prod)
- **NextAuth.js 4.24.7** - Authentication
- **Zod** - Schema validation

### Image Optimization
- **Next.js Image** - Automatic WebP/AVIF conversion
- **Sharp** - Server-side image processing
- Custom scripts: `scripts/web-optimise-images.js`, `scripts/seo-process-images.js`

### Deployment
- **Vercel** - Production hosting
- **GitHub Actions** - CI/CD pipeline
- **Standalone build** - Optimized for Vercel

---

## Architecture Overview

### App Router Structure

```
app/
├── page.tsx                      # Homepage (main landing)
├── layout.tsx                    # Root layout (Header, Footer, Providers)
├── not-found.tsx                 # 404 page
├── error.tsx                     # Error boundary
│
├── services/                     # Service pages (STATIC routes only)
│   ├── water-damage-restoration/
│   ├── fire-damage-restoration/
│   ├── mould-remediation/
│   ├── storm-damage-restoration/
│   └── [DISABLED ROUTES]
│       ├── _slug_DISABLED/       # ⚠️ DISABLED - was causing 404s
│       └── _category_DISABLED/   # ⚠️ DISABLED - was causing 404s
│
├── locations/                    # Location-specific pages
│   ├── hamilton/
│   ├── ascot/
│   ├── new-farm/
│   └── [location]/              # Dynamic route for other suburbs
│
├── emergency/                    # Emergency service pages
│   ├── page.tsx
│   ├── weekend-emergency/
│   ├── public-holiday-emergency/
│   └── ...
│
├── insurance/                    # Insurance provider pages
│   ├── aami/
│   ├── suncorp/
│   └── ...
│
└── api/                         # API routes
    └── auth/                    # NextAuth endpoints
```

### Key Architectural Patterns

#### 1. **Component Organization**
```
components/
├── hero/
│   ├── HeroSection.tsx          # ✅ WORKING - Renders hero with image
│   └── HeroImageData.ts         # Hero image catalog
│
├── services/
│   └── ServicePageLayout.tsx    # ✅ WORKING - Service page wrapper
│
├── schema/                      # JSON-LD structured data
│   ├── LocalBusinessSchema.tsx
│   ├── ServiceSchema.tsx
│   └── BreadcrumbSchema.tsx
│
├── ui/                          # shadcn/ui components
└── shared/                      # Shared utilities
```

#### 2. **Image Handling** (CRITICAL)

**Hero Images:**
- Location: `public/images/hero/`
- Current hero: `landing-page-hero.png` (479KB PNG with embedded UI)
- **IMPORTANT**: Landing page hero contains pre-rendered text and buttons - NO code overlays needed

**Image Component Pattern:**
```tsx
// ✅ CORRECT - Use Next.js Image directly
import Image from 'next/image';

<Image
  src="/images/hero/landing-page-hero.png"
  alt="Descriptive alt text"
  fill
  style={{ objectFit: 'cover' }}
  priority              // For above-fold images
  sizes="100vw"
/>

// ❌ AVOID - HeroImage wrapper can cause "variant is not defined" errors
import { HeroImage } from '@/components/image-optimization';
```

#### 3. **TypeScript Path Aliases**
```json
{
  "@/*": "./",
  "@/components/*": "./components/*",
  "@/lib/*": "./lib/*",
  "@/hooks/*": "./src/hooks/*",
  "@/types/*": "./src/types/*"
}
```

#### 4. **Database Schema** (Prisma)
- **Development**: SQLite (`prisma/dev.db`)
- **Production**: PostgreSQL (via `DATABASE_URL` env var)
- **Models**: Agency, User, Client, Audit, Proposal, Invoice, Enquiry
- **Important**: Always run `npx prisma generate` after schema changes

#### 5. **Dynamic vs Static Routes**

⚠️ **CRITICAL ROUTING ISSUE:**
- Catch-all routes `[...slug]` and `[category]` in `/services` were **DISABLED** because they intercepted ALL service URLs and returned 404
- All service pages are now **STATIC** routes (e.g., `/services/water-damage-restoration/page.tsx`)
- If you need dynamic routes, ensure they don't conflict with existing static pages

---

## Development Commands

### Essential Commands

```bash
# Development
npm run dev                       # Start dev server (port 3000)
npm run dev:clean                 # Clean build + start fresh

# Building
npm run build                     # Production build (with wrapper script)
npm run build:direct              # Direct Next.js build (skip wrapper)
npm start                         # Start production server

# Code Quality
npm run type-check                # TypeScript validation
npm run lint                      # ESLint
npm run lint:fix                  # Auto-fix lint issues
npm run format                    # Prettier formatting
npm run validate                  # Run all checks (type + lint + format)

# Testing
npm test                          # Jest unit tests
npm run test:e2e                  # Playwright E2E tests
npm run test:e2e:ui               # Playwright with UI
npm run test:production           # Production deployment tests

# Database
npx prisma generate               # Generate Prisma client
npx prisma db push                # Push schema to database
npx prisma studio                 # Open Prisma Studio GUI (port 5555)
npm run db:reset                  # Reset database (⚠️ DELETES ALL DATA)

# Deployment
npm run deploy                    # Deploy to Vercel (once)
npm run health-check              # Check production health
git push origin main              # Auto-deploy via Vercel
```

### Image Optimization Commands

```bash
npm run web-optimise              # Optimize images in public/images
npm run seo-images:downloads      # Process images from Downloads folder
npm run optimise:check            # Check image sizes
npm run images:convert            # Convert to WebP format
```

### Advanced Commands

```bash
npm run build:analyze             # Bundle size analysis
npm run monitor                   # Monitor deployment status
npm run env:validate              # Validate environment variables
npm run mcp:check                 # MCP health check
```

---

## Common Development Workflows

### 1. **Starting Work**
```bash
git pull origin main
npm install                       # If package.json changed
npm run dev
```

### 2. **Adding New Service Page**
```bash
# Create static route (NOT dynamic)
mkdir -p app/services/new-service
touch app/services/new-service/page.tsx

# Use ServicePageLayout pattern:
import { ServicePageLayout } from '@/components/services/ServicePageLayout';

export default function NewServicePage() {
  return (
    <ServicePageLayout
      title="Service Title"
      description="Service description"
    >
      {/* Content */}
    </ServicePageLayout>
  );
}
```

### 3. **Updating Hero Image**
```bash
# 1. Add image to public/images/hero/
cp ~/Downloads/new-hero.png public/images/hero/

# 2. Optimize (optional)
npm run web-optimise

# 3. Update app/page.tsx
<Image
  src="/images/hero/new-hero.png"
  alt="Descriptive alt text"
  fill
  priority
  sizes="100vw"
/>

# 4. Build and test
npm run build
npm run dev
```

### 4. **Before Committing**
```bash
npm run validate                  # Type-check + lint + format
npm test                          # Run tests
git add .
git commit -m "feat: description"
git push origin branch-name
```

### 5. **Fixing Build Errors**
```bash
# Clear caches
npm run clean
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma client
npx prisma generate

# Rebuild
npm run build
```

---

## Critical Technical Details

### Next.js Configuration Highlights

**Build Optimizations** (`next.config.js`):
- `output: 'standalone'` - Vercel deployment optimization
- `typescript.ignoreBuildErrors: true` - Skip type check in build (types checked separately)
- `experimental.cpus: 1` - Memory-optimized builds for Vercel
- `experimental.optimizePackageImports` - Tree-shaking for Radix UI, Lucide, etc.

**Image Domains Allowed:**
- `disasterrecovery.com.au`
- `dr-new-ten.vercel.app`
- `images.unsplash.com`

**Security Headers:**
- CSP (Content Security Policy) configured for Google Maps, Analytics
- HSTS, X-Frame-Options, XSS-Protection enabled
- Frame-ancestors set to `'none'`

### Environment Variables

**Required:**
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://disasterrecovery.com.au"
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
```

**Optional:**
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
NEXT_PUBLIC_APP_URL="https://disasterrecovery.com.au"
```

### Performance Targets

- **Lighthouse Score**: 90+ (Desktop), 85+ (Mobile)
- **Core Web Vitals**: All green
- **Bundle Size**: Optimized with code splitting
- **Image Formats**: WebP/AVIF with lazy loading

---

## Known Issues & Workarounds

### 1. **Dynamic Routes Causing 404s**
**Problem**: `app/services/[...slug]` and `app/services/[category]` intercepted all service URLs
**Solution**: Routes disabled (renamed to `_slug_DISABLED` and `_category_DISABLED`)
**Workaround**: Use static routes only for service pages

### 2. **HeroImage Component Errors**
**Problem**: `HeroImage` wrapper caused "ReferenceError: variant is not defined"
**Solution**: Use basic Next.js `Image` component directly (see Image Handling section)

### 3. **Build Errors on /404 and /500**
**Expected**: Next.js App Router limitation - these pages prerender with errors but work at runtime
**Ignore**: Build output shows errors for `/_error: /404` and `/_error: /500`
**Note**: Handled by `app/not-found.tsx` and `app/error.tsx` at runtime

### 4. **Vercel Deployment Size**
**Problem**: Large deployments can exceed Vercel limits
**Solution**:
- Standalone output enabled
- Excluded large dependencies in `outputFileTracingExcludes`
- Worker threads disabled (`workerThreads: false`)

### 5. **Browser Caching Issues**
**Problem**: Users seeing old content after deployments
**Solution**: Instruct users to hard refresh (Ctrl+Shift+R) or use incognito mode

---

## SEO & Content Guidelines

### Schema Markup Required

Every page must include JSON-LD structured data:
- LocalBusiness schema (root layout)
- Service schema (service pages)
- BreadcrumbList schema (all pages with breadcrumbs)
- FAQPage schema (FAQ sections)

### Contact Information (CRITICAL - Verify in rules.md)

✅ **Correct Contact Details:**
- Phone: **1300 309 361**
- Email: **admin@disasterrecovery.com.au**
- Office: Brisbane, Ipswich, Logan areas

### Keywords Priority

1. "water damage restoration Brisbane"
2. "emergency restoration Brisbane"
3. "IICRC master restorer Brisbane"
4. "fire damage restoration Brisbane"
5. "mould removal Brisbane"
6. Location-specific: "water damage Hamilton", "water damage Ascot", etc.

### Content Rules

1. Use only verified, factual information
2. No embellished statistics or fake reviews
3. Emphasize Phill McGurk's IICRC Master Restorer certification
4. Highlight 24/7 emergency response and 60-minute response times
5. Professional, trustworthy tone throughout

---

## Testing Strategy

### Unit Tests (Jest)
```bash
npm test                          # Run all unit tests
npm run test:watch                # Watch mode
npm run test:coverage             # Coverage report
```

### E2E Tests (Playwright)
```bash
npm run test:e2e                  # Run all E2E tests
npm run test:e2e:ui               # Interactive UI mode
npm run test:production           # Test production deployment
```

### Visual Regression
- Playwright screenshots stored in `__tests__/`
- Use `@playwright/mcp` for MCP integration

---

## Deployment Process

### Automatic Deployment (Recommended)
```bash
git push origin main              # Auto-deploys to Vercel
```

### Manual Deployment
```bash
npm run deploy                    # One-time deployment
npm run health-check              # Verify deployment
```

### Post-Deployment Verification
1. Check build status in Vercel dashboard
2. Run `npm run health-check`
3. Test critical pages:
   - Homepage (/)
   - Service pages (/services/water-damage-restoration)
   - Emergency pages (/emergency)
   - Location pages (/locations/hamilton)

---

## Advanced Engineering Skills Agent

A custom agent skill is available at `.claude/skills/advanced-engineering-skills-agent/SKILL.md` that provides:

- **73 automated quality checks** across 9 domains
- **Error taxonomy** (SE-, IE-, QE-, CE-, SECU-)
- **Orchestration** to specialist agents
- **4-phase validation framework**

**Domains covered:**
1. Backend Services & Architecture (18 checks)
2. Frontend Components & State (16 checks)
3. API Layer (12 checks)
4. Data Persistence (15 checks)
5. Security Protocols (14 CRITICAL checks)
6. Design System - Colors (8 checks)
7. Design System - Typography (8 checks)
8. Design System - Spacing (10 checks)
9. Accessibility - WCAG 2.1 AA (10 checks, 8 CRITICAL)

---

## Support & Documentation

### Project Documentation
- **rules.md** - Non-negotiable project constraints
- **README.md** - Quick start and overview
- **CLAUDE.md** - This file (technical architecture)

### External Resources
- Next.js 14 Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Vercel Deployment: https://vercel.com/docs

---

## Quick Reference

### File Paths to Remember
```
app/page.tsx                      # Homepage
app/layout.tsx                    # Root layout
components/hero/HeroSection.tsx   # Hero component
public/images/hero/               # Hero images
prisma/schema.prisma              # Database schema
next.config.js                    # Next.js config
tailwind.config.ts                # Tailwind config
```

### Common Patterns

**Service Page Template:**
```tsx
import { ServicePageLayout } from '@/components/services/ServicePageLayout';

export default function ServicePage() {
  return (
    <ServicePageLayout
      title="Service Title"
      description="Description"
      showCTA={true}
    >
      <section className="container mx-auto px-6 py-16">
        {/* Content */}
      </section>
    </ServicePageLayout>
  );
}
```

**Image Component:**
```tsx
<Image
  src="/images/service.jpg"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

**Schema Markup:**
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

---

**Last Updated:** 2025-11-09
**Maintained by:** Disaster Recovery Brisbane Development Team
