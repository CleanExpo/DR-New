# Development Guide - Disaster Recovery Brisbane

## Quick Start (5 Minutes)

```bash
# 1. Clone and install
git clone <repository>
cd "DR New"
npm install

# 2. Setup environment
cp .env.local.example .env.local
# Edit .env.local with your values (optional for basic dev)

# 3. Start development
npm run dev
# Open http://localhost:3000
```

## Environment Setup

### Required Software
- Node.js 18+ (recommended: 20+)
- Git
- VS Code (recommended)

### First Time Setup

```bash
# Run automated setup
npm run setup

# Or manually:
cp .env.local.example .env.local
npm install
npx husky install
```

### Environment Variables

**Minimum for Development:**
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-local-secret-min-32-chars
DATABASE_URL="file:./dev.db"
```

**Optional (for full features):**
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - For map components
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- See `.env.example` for complete list

## Development Workflow

### Daily Development

```bash
# Start dev server with hot reload
npm run dev

# Run in turbo mode (faster)
npm run dev:turbo

# Check environment health
npm run check
```

### Before Committing

```bash
# Run all checks
make ci

# Or individually:
npm run lint          # Check code style
npm run type-check    # TypeScript errors
npm run test          # Unit tests
npm run format:check  # Code formatting
```

### Makefile Commands

We use a Makefile for common tasks:

```bash
make help           # Show all available commands
make quick-start    # Full setup
make dev            # Start dev server
make build          # Production build
make test           # Run tests
make lint           # Run linter
make ci             # Run all CI checks
```

## Code Standards

### File Structure
```
D:\DR New\
├── app/              # Next.js 14 App Router pages
├── components/       # Reusable React components
├── lib/             # Utility functions and configs
├── public/          # Static assets
├── scripts/         # Build and automation scripts
└── __tests__/       # Test files
```

### Naming Conventions
- **Components**: PascalCase (`EmergencyCTA.tsx`)
- **Utilities**: camelCase (`imageOptimizer.ts`)
- **Pages**: kebab-case folders (`about-phil-mcgurk/`)
- **CSS**: kebab-case (`emergency-cta.css`)

### Import Order
```typescript
// 1. External libraries
import { useState } from 'react';
import Image from 'next/image';

// 2. Internal absolute imports
import { Button } from '@/components/ui/button';
import { optimizeImage } from '@/lib/utils';

// 3. Relative imports
import { LocalComponent } from './LocalComponent';

// 4. Types
import type { ImageProps } from '@/types';
```

## Testing

### Unit Tests
```bash
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # With coverage
```

### E2E Tests
```bash
npm run test:e2e          # Run Playwright tests
npm run test:e2e:ui       # With UI
npm run test:e2e:debug    # Debug mode
```

### Writing Tests
```typescript
// __tests__/unit/components/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Building & Deployment

### Local Build
```bash
# Standard build
npm run build

# Analyze bundle size
npm run build:analyze

# Optimized production build
npm run build:production
```

### Deployment

**Vercel (Automatic):**
- Push to `main` branch → Production deploy
- Pull Request → Preview deploy

**Manual Deploy:**
```bash
npm run deploy          # Deploy once
npm run health-check    # Check production health
```

## Performance Optimization

### Image Optimization
```bash
npm run images:optimize      # Optimize all images
npm run images:convert       # Convert to WebP
npm run images:audit         # Audit image usage
```

### Bundle Analysis
```bash
ANALYZE=true npm run build
# Opens bundle analyzer in browser
```

### Performance Monitoring
- Built-in Web Vitals tracking
- Lighthouse CI in GitHub Actions
- Real-time performance monitoring at `/api/performance/dashboard`

## Debugging

### VS Code Debugging
1. Press F5 or use Debug panel
2. Choose configuration:
   - "Next.js: debug full stack" - Server + Client
   - "Next.js: debug server-side" - SSR only
   - "Next.js: debug client-side" - Browser only

### Console Debugging
```bash
# Server logs
NODE_OPTIONS='--inspect' npm run dev

# Client debugging
# Open http://localhost:3000
# Use Chrome DevTools
```

### Common Issues

**Build Fails:**
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

**Type Errors:**
```bash
# Check types
npm run type-check

# Regenerate Prisma client
npx prisma generate
```

**Husky Hooks Fail:**
```bash
# Reinstall hooks
npx husky install
chmod +x .husky/*
```

## Git Workflow

### Commit Messages
We use conventional commits:

```bash
feat: Add emergency contact form
fix: Resolve image loading issue
docs: Update API documentation
style: Format code with Prettier
refactor: Simplify image optimizer
perf: Optimize bundle size
test: Add unit tests for Button
chore: Update dependencies
```

### Pre-commit Hooks
Automatically runs:
- ESLint fix
- Prettier format
- TypeScript type check

### Branch Strategy
- `main` - Production (protected)
- `staging` - Pre-production testing
- `feature/*` - New features
- `fix/*` - Bug fixes

## Database

### Prisma Commands
```bash
npm run db:migrate    # Create migration
npm run db:push       # Push schema changes
npm run db:studio     # Open Prisma Studio
npm run seed          # Seed database
```

### Schema Changes
1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Commit migration files

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors After Pull
```bash
# Regenerate types
npm run type-check
npx prisma generate
```

## Getting Help

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Prisma](https://www.prisma.io/docs)

### Project-Specific
- See `CLAUDE.md` for project guidelines
- Check `IMPLEMENTATION_GUIDE.md` for architecture
- Review `SECURITY.md` for security standards

### Commands Reference
```bash
npm run setup        # Initial setup
npm run dev          # Development server
npm run build        # Production build
npm run test         # Run tests
npm run lint         # Check code style
make help            # Show all Makefile commands
```

## Performance Targets

- **Lighthouse Score**: 90+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 250KB initial JS

---

**Need help?** Check existing issues or create a new one with:
- What you tried
- Expected vs actual result
- Error messages
- Environment (OS, Node version)
