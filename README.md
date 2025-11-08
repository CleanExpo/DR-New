# Disaster Recovery Services - Brisbane, Ipswich & Logan

Professional disaster recovery and restoration services website for water
damage, fire damage, mould remediation, and emergency response across Brisbane,
Ipswich, and Logan areas.

## Quick Start

Get up and running in under 5 minutes:

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local and add your NEXTAUTH_SECRET

# 3. Initialize database
npx prisma generate
npx prisma db push

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Documentation](#documentation)

## Project Overview

This is a **local service website** for disaster recovery and restoration
services featuring:

### Key Features

- 24/7 Emergency response services
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Commercial property restoration
- High-end residential restoration
- Master Restorer certification (Phill McGurk)

### Service Areas

- **Brisbane**: Hamilton, Ascot, New Farm, Toowong, CBD, Fortitude Valley
- **Ipswich**: Karalee, Brookwater, Springfield Lakes, Ipswich CBD
- **Logan**: Logan Central and surrounding areas

### Target Market

- Insurance companies requiring certified Master Restorer services
- High net worth property owners
- Commercial property managers
- Strata managers and body corporates
- Real estate agencies

## Tech Stack

### Core

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Runtime**: Node.js 18+
- **Package Manager**: npm

### Frontend

- **UI Framework**: React 18
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React, Heroicons

### Backend

- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **API**: Next.js API Routes
- **Validation**: Zod

### Developer Tools

- **Type Checking**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier
- **Testing**: Jest, Playwright
- **Git Hooks**: Husky, lint-staged

### DevOps

- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Built-in health checks
- **Analytics**: Custom implementation

## Project Structure

```
disaster-recovery/
├── app/                      # Next.js app router
│   ├── (routes)/            # Route groups
│   │   ├── emergency/       # Emergency service pages
│   │   ├── services/        # Service pages
│   │   ├── locations/       # Location-specific pages
│   │   └── insurance/       # Insurance provider pages
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Base UI components (shadcn)
│   │   ├── emergency/      # Emergency-specific components
│   │   ├── seo/            # SEO components
│   │   └── ...
│   ├── lib/                # Utilities and configurations
│   │   ├── auth.ts         # Authentication logic
│   │   ├── prisma.ts       # Prisma client
│   │   ├── utils.ts        # Utility functions
│   │   └── seo/            # SEO utilities
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript type definitions
│   ├── content/            # Content and data
│   └── data/               # Static data files
├── public/                  # Static assets
│   ├── images/             # Images and graphics
│   └── ...
├── prisma/                  # Database schema and migrations
│   └── schema.prisma
├── scripts/                 # Build and utility scripts
├── __tests__/              # Test files
└── docs/                   # Additional documentation

Key Configuration Files:
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── .eslintrc.json         # ESLint configuration
├── .prettierrc.json       # Prettier configuration
├── jest.config.js         # Jest configuration
└── playwright.config.ts   # Playwright configuration
```

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher (LTS recommended)
- **npm**: 9.x or higher
- **Git**: Latest version
- **PostgreSQL**: 14+ (or SQLite for development)
- **Code Editor**: VS Code recommended

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd disaster-recovery
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/disaster_recovery"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-api-key"
```

4. **Initialize database**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Seed database with sample data
npm run seed
```

5. **Verify setup**

```bash
npm run setup:check
```

6. **Start development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Development

### Available Scripts

#### Development

```bash
npm run dev              # Start development server on port 3000
npm run dev:turbo        # Start with Turbo mode (faster compilation)
npm run dev:debug        # Start with Node.js debugger enabled
npm run dev:clean        # Clean build artifacts and start fresh
```

#### Building

```bash
npm run build            # Production build
npm run build:analyze    # Build with bundle size analysis
npm start                # Start production server
```

#### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint issues
npm run type-check       # TypeScript type checking
npm run type-check:watch # Type checking in watch mode
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run validate         # Run all checks (type-check + lint + format)
```

#### Testing

```bash
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:ci          # Run tests in CI mode

npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with Playwright UI
npm run test:e2e:debug   # Debug E2E tests
npm run test:e2e:headed  # Run E2E tests in headed mode

npm run test:all         # Run all tests (unit + E2E)
```

#### Database

```bash
npm run db:migrate       # Run database migrations
npm run db:push          # Push schema changes to database
npm run db:studio        # Open Prisma Studio (GUI)
npm run db:reset         # Reset database (WARNING: deletes all data)
npm run seed             # Seed database with sample data
```

#### Utilities

```bash
npm run clean            # Clean build artifacts
npm run clean:all        # Clean everything including node_modules
npm run verify:dx        # Verify developer experience setup
npm run setup            # Complete setup and verification
npm run setup:check      # Check setup status
```

#### Deployment

```bash
npm run deploy           # Deploy to Vercel (once)
npm run deploy:watch     # Watch for changes and auto-deploy
npm run monitor          # Monitor deployment status
npm run health-check     # Check production health
```

### Development Workflow

1. **Start a new feature**

```bash
git checkout -b feat/your-feature-name
npm run dev
```

2. **Make changes** and verify in browser

3. **Run checks before committing**

```bash
npm run validate        # Type-check, lint, format
npm test               # Run tests
```

4. **Commit changes** (hooks will run automatically)

```bash
git add .
git commit -m "feat: your feature description"
```

5. **Push and create PR**

```bash
git push origin feat/your-feature-name
```

### Hot Reload & Fast Refresh

Hot Module Replacement (HMR) is enabled by default:

- **React Fast Refresh**: Preserves component state during edits
- **CSS Hot Reload**: Instant style updates without page reload
- **API Route Reload**: Automatic server restart on API changes

If you experience issues:

```bash
# Clear Next.js cache
npm run dev:clean

# Or manually
rm -rf .next
npm run dev
```

### IDE Setup (VS Code)

Recommended extensions are configured in `.vscode/extensions.json`:

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript
- Prisma

VS Code will prompt you to install these when you open the project.

### Environment Variables

| Variable                          | Description                  | Required | Default                 |
| --------------------------------- | ---------------------------- | -------- | ----------------------- |
| `DATABASE_URL`                    | PostgreSQL connection string | Yes      | -                       |
| `NEXTAUTH_URL`                    | Application URL              | Yes      | `http://localhost:3000` |
| `NEXTAUTH_SECRET`                 | Auth encryption key          | Yes      | -                       |
| `NEXT_PUBLIC_APP_URL`             | Public app URL               | No       | Same as NEXTAUTH_URL    |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps API key          | No       | -                       |

See `.env.example` for complete list with descriptions.

## Testing

### Unit Tests

Located next to source files with `.test.ts` or `.test.tsx` extension:

```bash
npm test                    # Run all tests
npm run test:watch          # Watch mode
npm run test:coverage       # With coverage
```

### E2E Tests

Located in `__tests__/` directory:

```bash
npm run test:e2e           # Run all E2E tests
npm run test:e2e:ui        # Interactive mode
npm run test:e2e:debug     # Debug mode
```

### Writing Tests

See [TEST_QUICK_START_GUIDE.md](./TEST_QUICK_START_GUIDE.md) for detailed
testing guide.

## Deployment

### Vercel (Recommended)

1. **Connect repository to Vercel**

2. **Configure environment variables** in Vercel dashboard

3. **Deploy**

```bash
npm run deploy
```

Or push to main branch for automatic deployment.

### Manual Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

### Environment-Specific Builds

```bash
# Production
NODE_ENV=production npm run build

# Staging
NODE_ENV=staging npm run build
```

### Post-Deployment

```bash
# Health check
npm run health-check

# Monitor deployment
npm run monitor
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for:

- Code style guidelines
- Development workflow
- Commit message format
- Pull request process
- Testing requirements

## Documentation

### Core Documentation

- [CLAUDE.md](./CLAUDE.md) - Project focus and guidelines
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contribution guide
- [rules.md](./rules.md) - Project rules and enforcement

### Developer Guides

- [DEVELOPER_QUICK_START.md](./DEVELOPER_QUICK_START.md) - Quick start guide
- [DX_OPTIMIZATION_SUMMARY.md](./DX_OPTIMIZATION_SUMMARY.md) - DX improvements
- [TEST_QUICK_START_GUIDE.md](./TEST_QUICK_START_GUIDE.md) - Testing guide
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Detailed development guide

### Technical Documentation

- [ARCHITECTURE_REVIEW.md](./ARCHITECTURE_REVIEW.md) - Architecture overview
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md) - Performance
  guide
- [SECURITY.md](./SECURITY.md) - Security practices
- [TEST_SUITE_DOCUMENTATION.md](./TEST_SUITE_DOCUMENTATION.md) - Test suite
  details

### Content & SEO

- [SEO_OPTIMIZATION_INDEX.md](./SEO_OPTIMIZATION_INDEX.md) - SEO guide
- [CONTENT_OPTIMIZATION_COMPLETE.md](./CONTENT_OPTIMIZATION_COMPLETE.md) -
  Content guide

## Key Commands Reference

```bash
# Quick Start
npm install && npm run setup && npm run dev

# Daily Development
npm run dev              # Start server
npm run validate         # Check code quality
npm test                 # Run tests

# Before Commit
npm run validate && npm test

# Deploy
git push origin main     # Auto-deploy to Vercel
```

## Troubleshooting

### Build Errors

```bash
# Clear caches
npm run clean
rm -rf node_modules package-lock.json
npm install
```

### Database Issues

```bash
# Reset database
npm run db:reset

# Regenerate Prisma client
npx prisma generate
```

### Type Errors

```bash
# Check types
npm run type-check

# Rebuild
npm run clean && npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

## Performance

- **Lighthouse Score**: 90+ (Desktop), 85+ (Mobile)
- **Core Web Vitals**: All green scores
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: WebP format with lazy loading

See [PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md) for details.

## Security

- **Authentication**: NextAuth.js with secure sessions
- **HTTPS Only**: Enforced in production
- **CSP Headers**: Content Security Policy enabled
- **SQL Injection**: Protected by Prisma ORM
- **XSS Protection**: React escaping + sanitization

See [SECURITY.md](./SECURITY.md) for security practices.

## License

Proprietary - All rights reserved

## Support

For questions or issues:

1. Check documentation in `/docs`
2. Search existing issues on GitHub
3. Create a new issue with detailed information

## Project Status

- Production ready
- Active development
- Regular updates and maintenance

---

Built with Next.js 14, TypeScript, and Tailwind CSS for disaster recovery
services in Brisbane, Ipswich, and Logan.
