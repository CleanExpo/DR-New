# Developer README

Welcome to the Disaster Recovery Local Service project! This guide will help you get
started quickly.

## Quick Links

- [5-Minute Setup](docs/QUICK_START.md)
- [Complete Development Guide](docs/DEVELOPMENT.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Scripts Reference](docs/SCRIPTS.md)
- [DX Optimization Summary](docs/DX_OPTIMIZATION_SUMMARY.md)

## Instant Setup

```bash
npm run setup && npm run check && npm run dev
```

Three commands. Five minutes. Ready to code.

## Project Overview

This is a Next.js 14 application for a local disaster recovery service in Brisbane,
Ipswich, and Logan. It features:

- Server-side rendering with Next.js App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Prisma ORM for database
- Comprehensive testing setup
- SEO optimized
- Mobile responsive

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3
- **Database**: PostgreSQL + Prisma
- **Auth**: NextAuth.js
- **Testing**: Jest + Playwright
- **UI**: Radix UI + Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL
- Git

### Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd dr-new
npm run setup

# 2. Configure environment
cp .env.example .env
# Edit .env with your values

# 3. Setup database
npm run db:migrate

# 4. Start development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Verify Setup

```bash
npm run check
```

This runs a comprehensive health check of your development environment.

## Essential Commands

### Development

```bash
npm run dev              # Start dev server (port 3000)
npm run dev:turbo        # Start with Turbo mode (faster)
npm run build            # Production build
npm run start            # Start production server
```

### Code Quality

```bash
npm run lint             # Check linting
npm run lint:fix         # Fix linting issues
npm run format           # Format all code
npm run type-check       # Check TypeScript types
```

### Testing

```bash
npm test                 # Run unit tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report
npm run test:e2e         # E2E tests
npm run test:e2e:ui      # E2E with UI
```

### Database

```bash
npm run db:studio        # Open Prisma Studio (GUI)
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run seed             # Seed test data
```

### Makefile (Alternative)

```bash
make help               # Show all commands
make setup              # Complete setup
make dev                # Start dev server
make check              # Run all checks
make test               # Run tests
make clean              # Clean build artifacts
```

## Project Structure

```
dr-new/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Route groups
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/               # React components
│   ├── ui/                  # Base UI components
│   ├── forms/               # Form components
│   └── seo/                 # SEO components
├── lib/                     # Utilities & business logic
│   ├── utils/               # Helper functions
│   └── seo/                 # SEO utilities
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript definitions
├── public/                  # Static assets
├── prisma/                  # Database schema
├── scripts/                 # Build scripts
├── tests/                   # E2E tests
├── docs/                    # Documentation
└── .vscode/                 # VSCode configuration
```

## VSCode Setup

### Install Recommended Extensions

Open VSCode and install recommended extensions when prompted, or:

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Show Recommended Extensions"
3. Install all

### Key Features

- **Auto-format on save**: Code automatically formatted
- **Auto-fix on save**: ESLint issues automatically fixed
- **IntelliSense**: Smart autocomplete for TypeScript and Tailwind
- **Debugging**: Built-in debugger configurations
- **Code Snippets**: Quick templates (type `npage`, `rfc`, etc.)

### Debug Your Code

1. Set breakpoints by clicking line numbers
2. Press `F5` or use Debug panel
3. Choose configuration:
   - Next.js: debug server-side
   - Next.js: debug client-side
   - Jest: Current File

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

- Write code in VSCode
- Auto-formatting happens on save
- Type errors shown inline
- Use code snippets for speed

### 3. Run Tests

```bash
npm run test:watch  # In separate terminal
```

### 4. Check Before Commit

```bash
make check
# or
npm run lint && npm run type-check && npm test
```

### 5. Commit

```bash
git add .
git commit -m "feat(scope): your message"
```

Commit format is validated automatically.
Accepted types: feat, fix, docs, style, refactor, perf, test, chore, build, ci

### 6. Push

```bash
git push origin your-branch
```

Tests run automatically before push.

### 7. Create Pull Request

- Clear title following commit format
- Description of changes
- Screenshots for UI changes
- Link related issues

## Code Snippets

Type these prefixes and press Tab in VSCode:

- `npage` → Next.js page component with metadata
- `rfc` → React functional component
- `napi` → API route handler
- `rhook` → Custom React hook
- `jtest` → Jest test suite
- `seo` → SEO metadata
- `rhf` → Form with React Hook Form + Zod validation
- `nload` → Loading component
- `nerror` → Error component

See `.vscode/snippets.code-snippets` for all snippets.

## Common Tasks

### Add a New Page

```bash
# 1. Create page file
mkdir -p app/new-page
touch app/new-page/page.tsx

# 2. Use 'npage' snippet in VSCode
# or copy from docs/DEVELOPMENT.md

# 3. Test locally
npm run dev
```

### Add a Component

```bash
# 1. Create component
touch components/my-component.tsx

# 2. Use 'rfc' snippet

# 3. Add tests
touch components/my-component.test.tsx

# 4. Use 'jtest' snippet
```

### Add API Route

```bash
# 1. Create route
mkdir -p app/api/my-endpoint
touch app/api/my-endpoint/route.ts

# 2. Use 'napi' snippet

# 3. Test with curl or Postman
```

### Database Changes

```bash
# 1. Edit prisma/schema.prisma

# 2. Create migration
npm run db:migrate

# 3. Generate types
npx prisma generate

# 4. Use in code (types auto-generated)
```

## Testing Guide

### Unit Tests (Jest)

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Specific file
npm test -- my-component.test.tsx
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# With UI (visual mode)
npm run test:e2e:ui

# Debug mode
npm run test:e2e:debug

# Specific test
npm run test:e2e -- tests/login.spec.ts
```

### Writing Tests

Use the `jtest` snippet in VSCode or see `docs/DEVELOPMENT.md`.

## Debugging

### Server-Side Code

1. Add breakpoint in API route or server component
2. Press `F5` in VSCode
3. Select "Next.js: debug server-side"
4. Make request to trigger breakpoint

### Client-Side Code

1. Add breakpoint in client component
2. Press `F5` in VSCode
3. Select "Next.js: debug client-side"
4. Interact with component in browser

### Tests

1. Add breakpoint in test file
2. Press `F5` in VSCode
3. Select "Jest: Current File"

## Performance

### Check Bundle Size

```bash
npm run build:analyze
```

Opens visual analyzer showing bundle composition.

### Monitor Performance

- Check Core Web Vitals in browser DevTools
- Use Lighthouse for audits
- Monitor build times
- Check test execution times

## Troubleshooting

### Port Already in Use

```bash
npm run dev -- -p 3001
```

### Type Errors

```bash
npx prisma generate
npm run type-check
```

### Module Not Found

```bash
npm install
```

### Git Hooks Not Working

```bash
npx husky install
```

### Database Issues

```bash
npm run db:push  # Push schema
npm run db:studio  # Check data
```

### Clean Start

```bash
make clean
npm install
npm run setup
```

## Git Workflow

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore, build, ci

**Examples**:
```
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation steps
```

### Automated Checks

**Pre-commit** (runs on `git commit`):
- ESLint auto-fix
- Prettier formatting
- TypeScript type check

**Pre-push** (runs on `git push`):
- All tests
- Critical checks

## Environment Variables

Copy `.env.example` to `.env` and configure:

### Required

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

### Optional

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=...
```

See `.env.example` for complete list.

## Project-Specific Guidelines

This is a **local service website** focused on Brisbane, Ipswich, and Logan areas.

### Do

- Focus on local SEO
- Emphasize Master Restorer certification
- Use Brisbane/Queensland specific information
- Target high-value residential and commercial clients
- Professional, trustworthy tone

### Don't

- Add national or interstate coverage claims
- Include contractor management features
- Add CRM or automated systems (except contact forms)
- Use unverified statistics or testimonials

See `CLAUDE.md` for complete project guidelines.

## Resources

### Documentation

- [Quick Start Guide](docs/QUICK_START.md) - Get started in 5 minutes
- [Development Guide](docs/DEVELOPMENT.md) - Comprehensive development docs
- [Scripts Reference](docs/SCRIPTS.md) - All commands explained
- [Contributing](CONTRIBUTING.md) - How to contribute

### External Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### Commands

- `make help` - Show all Make commands
- `npm run check` - Verify environment
- `npm run` - List all npm scripts

## Getting Help

1. Check documentation in `/docs`
2. Run `npm run check` for diagnostics
3. Search existing issues
4. Ask in project discussions
5. Create detailed issue

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Testing requirements
- Pull request process
- Review guidelines

## License

See LICENSE file for details.

## Acknowledgments

Built with Next.js, React, TypeScript, and the amazing open-source community.

---

**Ready to start developing?**

```bash
npm run dev
```

Happy coding!
