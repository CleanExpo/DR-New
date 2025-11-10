# Development Guide - Disaster Recovery Brisbane

## Overview

Comprehensive development guide for contributing to the Disaster Recovery Brisbane website with best practices, workflows, and conventions.

## Table of Contents

- [Quick Start](#quick-start)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Git Workflow](#git-workflow)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# 1. Clone repository
git clone <repository-url>
cd DR-New

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env.local
# Edit .env.local with your values

# 4. Generate Prisma client
npx prisma generate

# 5. Start development server
npm run dev

# Open http://localhost:3000
```

## Development Environment

### Required Software

- **Node.js**: 18.x or higher (LTS recommended)
- **npm**: 9.x or higher
- **Git**: Latest version
- **VS Code**: Recommended IDE

### VS Code Extensions

Install recommended extensions (`.vscode/extensions.json`):
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript
- Prisma
- Error Lens
- GitLens

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/disaster_recovery"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Optional
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"
```

Generate secrets:
```bash
openssl rand -base64 32
```

## Project Structure

```
DR-New/
├── app/                        # Next.js App Router
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── services/              # Service pages (static routes)
│   ├── locations/             # Location pages
│   ├── emergency/             # Emergency pages
│   ├── insurance/             # Insurance provider pages
│   └── api/                   # API routes
│
├── components/                 # React components
│   ├── hero/                  # Hero sections
│   ├── services/              # Service components
│   ├── schema/                # JSON-LD schemas
│   ├── ui/                    # shadcn/ui components
│   └── shared/                # Shared utilities
│
├── lib/                       # Utilities and configs
│   ├── utils.ts               # Utility functions
│   ├── prisma.ts              # Prisma client
│   └── auth.ts                # Auth configuration
│
├── public/                    # Static assets
│   └── images/                # Images (optimized)
│
├── prisma/                    # Database
│   └── schema.prisma          # Database schema
│
├── docs/                      # Documentation
│   ├── guides/                # Development guides
│   └── archive/               # Historical docs
│
├── .claude/                   # Claude Code config
│   ├── settings.local.json    # Permissions
│   └── config/                # Project context
│
├── CLAUDE.md                  # Project guidelines
├── rules.md                   # Enforcement rules
└── README.md                  # Main documentation
```

## Coding Standards

### TypeScript

**Use strict mode:**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

**Type everything explicitly:**
```typescript
// Good
interface ServiceProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceProps> = ({ title, description, icon }) => {
  return <div>{title}</div>;
};

// Bad
const ServiceCard = ({ title, description, icon }: any) => {
  return <div>{title}</div>;
};
```

### React Components

**Use functional components:**
```typescript
// Good
export const ServiceCard: React.FC<ServiceProps> = (props) => {
  return <div>{props.title}</div>;
};

// Avoid class components
```

**File naming:**
```
PascalCase for components: ServiceCard.tsx
camelCase for utilities: utils.ts
kebab-case for styles: service-card.module.css
```

### Styling

**Use Tailwind CSS:**
```tsx
// Good
<div className="container mx-auto px-6 py-16">
  <h2 className="text-3xl font-semibold mb-6">Services</h2>
</div>

// Avoid inline styles
<div style={{ padding: '16px' }}>
```

**Component-specific styles:**
```tsx
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

<button
  className={cn(
    "px-4 py-2 rounded",
    isActive && "bg-blue-500",
    disabled && "opacity-50"
  )}
>
```

### File Organization

```tsx
// Component file structure
import React from 'react';                    // External imports
import { useRouter } from 'next/navigation';  // Next.js imports

import { Button } from '@/components/ui/button';  // Internal components
import { cn } from '@/lib/utils';                 // Utilities

import type { ServiceProps } from './types';  // Types

// Component code
export const ServiceCard: React.FC<ServiceProps> = () => {
  // Component logic
};
```

## Git Workflow

### Branch Naming

```bash
# Feature
feat/add-location-pages

# Bug fix
fix/image-loading-issue

# Hotfix
hotfix/emergency-contact-link

# Refactor
refactor/service-components

# Documentation
docs/update-readme
```

### Commit Messages

Follow conventional commits:

```bash
# Format
<type>(<scope>): <subject>

# Examples
feat(services): add mould remediation page
fix(hero): resolve image loading issue
docs(readme): update installation instructions
refactor(components): simplify ServiceCard logic
style(homepage): adjust heading spacing
test(api): add tests for contact endpoint
chore(deps): update dependencies
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Commit Flow

```bash
# 1. Create branch
git checkout -b feat/new-feature

# 2. Make changes
# ... edit files ...

# 3. Run checks
npm run validate        # Type-check + lint + format
npm test               # Run tests

# 4. Stage changes
git add .

# 5. Commit with message
git commit -m "feat(services): add storm damage page"

# 6. Push to remote
git push origin feat/new-feature

# 7. Create pull request on GitHub
```

### Pre-commit Checks

Husky runs automatically:
- ESLint
- Prettier
- Type checking
- Unit tests

Fix issues before committing:
```bash
npm run lint:fix
npm run format
```

## Common Tasks

### Adding a New Service Page

```bash
# 1. Create directory
mkdir -p app/services/storm-damage-restoration

# 2. Create page.tsx
cat > app/services/storm-damage-restoration/page.tsx << 'EOF'
import { ServicePageLayout } from '@/components/services/ServicePageLayout';

export const metadata = {
  title: 'Storm Damage Restoration Brisbane | 24/7 Emergency',
  description: 'Expert storm damage restoration in Brisbane...'
};

export default function StormDamagePage() {
  return (
    <ServicePageLayout
      title="Storm Damage Restoration"
      description="24/7 emergency storm damage repair"
    >
      {/* Content */}
    </ServicePageLayout>
  );
}
EOF

# 3. Test locally
npm run dev

# 4. Run checks
npm run validate && npm test
```

### Adding a New Location Page

```bash
# 1. Create directory
mkdir -p app/locations/toowong

# 2. Create page.tsx with location-specific content
# 3. Include suburb name, postcode, landmarks
# 4. Add service area map
# 5. Include local testimonials
```

### Optimizing Images

```bash
# 1. Add images to public/images/
cp ~/Downloads/new-image.jpg public/images/

# 2. Optimize
npm run web-optimise

# 3. Use in component
import Image from 'next/image';

<Image
  src="/images/new-image.webp"
  alt="Descriptive alt text"
  width={800}
  height={600}
  loading="lazy"
/>
```

### Database Changes

```bash
# 1. Update schema
nano prisma/schema.prisma

# 2. Generate migration
npx prisma migrate dev --name add_new_field

# 3. Generate client
npx prisma generate

# 4. Update types
npm run type-check
```

### Running Tests

```bash
# Unit tests
npm test                    # Run all
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage

# E2E tests
npm run test:e2e           # Run all
npm run test:e2e:ui        # Interactive
npm run test:e2e:debug     # Debug mode

# Specific test
npm test ServiceCard.test.tsx
```

## Build & Deploy

### Local Build

```bash
# 1. Clean previous build
npm run clean

# 2. Run all checks
npm run validate
npm test

# 3. Build
npm run build

# 4. Test production build
npm start
```

### Deploy to Vercel

```bash
# Automatic: Push to main
git push origin main

# Manual: Use Vercel CLI
npm run deploy
```

## Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Kill process
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

**Issue**: Prisma client not generated
```bash
npx prisma generate
npm run dev
```

**Issue**: Type errors
```bash
npm run type-check
# Fix errors then rebuild
npm run build
```

**Issue**: Build fails
```bash
# Clear cache
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Issue**: Images not loading
- Check file path is correct
- Verify file is in `public/` directory
- Check `next.config.js` image domains
- Run `npm run web-optimise`

### Debug Mode

```bash
# Development with debugging
npm run dev:debug

# Type checking with watch
npm run type-check:watch

# Prisma Studio (database GUI)
npx prisma studio
```

## Code Review Checklist

Before submitting PR:

- [ ] Code follows TypeScript standards
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Formatting correct (`npm run format`)
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors in browser
- [ ] Mobile responsive tested
- [ ] Accessibility checked
- [ ] Images optimized
- [ ] Documentation updated

## Performance Guidelines

### Bundle Size

- Keep page bundles < 200KB
- Use dynamic imports for heavy components
- Optimize images before adding
- Remove unused dependencies

### Loading Strategy

```tsx
// Code splitting
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false  // Client-side only if needed
});

// Image lazy loading
<Image
  src="/image.webp"
  loading="lazy"
  priority={false}  // Only true for above-fold images
/>
```

## Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Project Guides

- `CLAUDE.md` - Project guidelines
- `rules.md` - Enforcement rules
- `docs/guides/testing.md` - Testing guide
- `docs/guides/deployment.md` - Deployment guide
- `docs/guides/design-system.md` - Design system

### Archived Documentation

For historical development docs, see:
- `docs/archive/development-docs/` - Previous implementations
- `docs/archive/historical-summaries/` - Project summaries

---

**Last Updated**: 2025-11-10
**Framework**: Next.js 14.2.32
**Node Version**: 18+
