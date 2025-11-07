# Developer Quick Start Guide

Welcome to the Disaster Recovery Platform! This guide will get you up and running in less than 15 minutes.

## Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn
- Git
- VS Code (recommended)

## Quick Setup (5 minutes)

### 1. Clone and Install

```bash
git clone <repository-url>
cd disaster-recovery
npm install
```

### 2. Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local

# Generate a secure NextAuth secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Add the generated secret to .env.local
# NEXTAUTH_SECRET=<your-generated-secret>
```

### 3. Database Setup

```bash
# Initialize the database (SQLite by default)
npx prisma generate
npx prisma db push
```

### 4. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you're ready to code!

## Essential Commands

### Development

```bash
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbo mode (faster)
npm run dev:debug        # Start with debugger attached
npm run dev:clean        # Clean build and start fresh
```

### Build & Production

```bash
npm run build            # Production build
npm run build:analyze    # Build with bundle analyzer
npm start                # Start production server
```

### Code Quality

```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run type-check:watch # Watch mode for type checking
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run validate         # Run all checks (lint, type, format)
```

### Testing

```bash
npm test                 # Run unit tests
npm run test:watch       # Watch mode for tests
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # E2E tests with UI
npm run test:e2e:debug   # Debug E2E tests
npm run test:all         # Run all tests
```

### Database

```bash
npm run db:push          # Push schema changes
npm run db:migrate       # Create a migration
npm run db:studio        # Open Prisma Studio
npm run db:reset         # Reset database
```

### Utilities

```bash
npm run clean            # Clean build artifacts
npm run clean:all        # Clean everything including node_modules
```

## Project Structure

```
disaster-recovery/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── services/          # Service pages
│   └── locations/         # Location pages
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Shadcn UI components
│   │   └── ...
│   ├── lib/              # Utilities and helpers
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── __tests__/            # Test files
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
│   └── e2e/             # E2E tests
└── scripts/             # Build and utility scripts
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
```

### 2. Make Changes

Write your code, tests, and documentation.

### 3. Commit (Conventional Commits)

```bash
git add .
git commit -m "feat(auth): add login functionality"
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Test changes
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD changes

### 4. Pre-commit Checks

Git hooks automatically run:
- Lint-staged (lints and formats changed files)
- Type checking
- Commit message validation

### 5. Push and Create PR

```bash
git push origin feat/your-feature-name
```

## VS Code Setup

### Recommended Extensions

The project automatically suggests these extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- Error Lens
- GitLens

### Debugging

Press `F5` or use the Debug panel to:
- Debug server-side code
- Debug client-side code
- Debug full stack
- Debug Jest tests
- Debug Playwright tests

## Environment Variables

### Required for Development

```env
NEXTAUTH_SECRET=<generate-with-openssl>
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

### Optional (for full features)

See `.env.example` for the complete list of available variables.

## Common Issues & Solutions

### Issue: Build fails with "Cannot find module"

```bash
npm run clean:all
npm install
```

### Issue: Type errors in VS Code

```bash
npm run type-check
# If Prisma types are missing:
npx prisma generate
```

### Issue: Husky hooks not running

```bash
npm run prepare
```

### Issue: Port 3000 already in use

```bash
# Kill the process on port 3000 (Windows)
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Issue: Database locked or corrupted

```bash
npm run db:reset
```

## Performance Tips

1. **Turbo Mode**: Use `npm run dev:turbo` for faster hot reloading
2. **Parallel Type Checking**: Run `npm run type-check:watch` in separate terminal
3. **Bundle Analysis**: Use `npm run build:analyze` to identify large dependencies
4. **Clean Builds**: Run `npm run clean` before production builds

## Testing Strategy

### Unit Tests
- Location: `__tests__/unit/`
- Run: `npm test`
- Focus: Individual functions and components

### Integration Tests
- Location: `__tests__/integration/`
- Run: `npm test`
- Focus: API routes and data flow

### E2E Tests
- Location: `__tests__/e2e/`
- Run: `npm run test:e2e`
- Focus: User workflows and critical paths

## Code Style

- **Formatting**: Prettier (automatic on save)
- **Linting**: ESLint with Next.js config
- **Line Length**: 100 characters
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS/TS, double for JSX
- **Trailing Commas**: ES5 style

## Git Hooks

### Pre-commit
- Runs lint-staged on changed files
- Auto-formats code
- Runs type checking

### Commit-msg
- Validates commit message format
- Enforces conventional commits

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev)

## Getting Help

1. Check existing documentation
2. Search issues in the repository
3. Ask in team chat
4. Create a new issue with details

## Next Steps

1. Read `CLAUDE.md` for project-specific guidelines
2. Explore the codebase structure
3. Run the test suite to understand coverage
4. Pick up a task from the backlog

Happy coding!
