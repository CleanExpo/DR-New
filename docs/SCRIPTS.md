# Scripts Reference

Complete reference for all npm scripts and Make commands available in the project.

## Table of Contents

- [Development Scripts](#development-scripts)
- [Build Scripts](#build-scripts)
- [Testing Scripts](#testing-scripts)
- [Database Scripts](#database-scripts)
- [Code Quality Scripts](#code-quality-scripts)
- [Image Optimization Scripts](#image-optimization-scripts)
- [Deployment Scripts](#deployment-scripts)
- [Utility Scripts](#utility-scripts)
- [Make Commands](#make-commands)

## Development Scripts

### `npm run dev`
Start the Next.js development server on port 3000.

```bash
npm run dev
```

### `npm run dev:turbo`
Start development server with Turbo mode enabled (faster refresh).

```bash
npm run dev:turbo
```

### `npm run dev:optimized`
Start development server with optimizations enabled.

```bash
npm run dev:optimized
```

### `npm run setup`
Complete automated development environment setup.

```bash
npm run setup
```

Performs:
- Node.js version check
- Dependency installation
- Git hooks setup
- Environment file creation
- Prisma client generation

### `npm run check`
Run development environment health check.

```bash
npm run check
```

Validates:
- Configuration files
- Dependencies
- Environment variables
- TypeScript compilation
- Git hooks

## Build Scripts

### `npm run build`
Build the application for production.

```bash
npm run build
```

### `npm run build:production`
Optimized production build.

```bash
npm run build:production
```

### `npm run build:analyze`
Build with bundle size analysis.

```bash
npm run build:analyze
```

Opens visual bundle analyzer to identify large dependencies.

### `npm run build:vercel`
Build configuration for Vercel deployment.

```bash
npm run build:vercel
```

### `npm run start`
Start production server on port 3000.

```bash
npm run start
```

## Testing Scripts

### `npm test`
Run all unit tests.

```bash
npm test
```

### `npm run test:watch`
Run tests in watch mode (re-runs on file changes).

```bash
npm run test:watch
```

### `npm run test:coverage`
Generate test coverage report.

```bash
npm run test:coverage
```

Creates coverage report in `/coverage` directory.

### `npm run test:ci`
Run tests in CI mode (no watch, with coverage).

```bash
npm run test:ci
```

### `npm run test:e2e`
Run end-to-end tests with Playwright.

```bash
npm run test:e2e
```

### `npm run test:e2e:ui`
Run E2E tests with Playwright UI.

```bash
npm run test:e2e:ui
```

### `npm run test:e2e:debug`
Run E2E tests in debug mode.

```bash
npm run test:e2e:debug
```

## Database Scripts

### `npm run db:migrate`
Create and run database migrations.

```bash
npm run db:migrate
```

### `npm run db:push`
Push schema changes to database (development).

```bash
npm run db:push
```

### `npm run db:studio`
Open Prisma Studio (database GUI).

```bash
npm run db:studio
```

Opens on port 5555.

### `npm run seed`
Seed database with test data.

```bash
npm run seed
```

## Code Quality Scripts

### `npm run lint`
Run ESLint to check for code issues.

```bash
npm run lint
```

### `npm run lint:fix`
Automatically fix ESLint issues.

```bash
npm run lint:fix
```

### `npm run format`
Format all code with Prettier.

```bash
npm run format
```

### `npm run format:check`
Check if code is properly formatted.

```bash
npm run format:check
```

### `npm run type-check`
Run TypeScript type checking.

```bash
npm run type-check
```

## Image Optimization Scripts

### `npm run optimize-images`
Optimize all images in the project.

```bash
npm run optimize-images
```

### `npm run images:convert`
Convert images to WebP format.

```bash
npm run images:convert
```

### `npm run images:convert:quality`
Convert images to WebP with specific quality.

```bash
npm run images:convert:quality
```

### `npm run images:audit`
Audit all images and identify issues.

```bash
npm run images:audit
```

### `npm run process-images`
Process images with SEO optimization.

```bash
npm run process-images
```

## Deployment Scripts

### `npm run deploy`
Deploy to Vercel (production).

```bash
npm run deploy
```

### `npm run deploy:watch`
Watch for changes and auto-deploy.

```bash
npm run deploy:watch
```

### `npm run monitor`
Monitor deployment status.

```bash
npm run monitor
```

### `npm run monitor:watch`
Continuously monitor deployments.

```bash
npm run monitor:watch
```

## Utility Scripts

### `npm run check:critical`
Run critical issue checks.

```bash
npm run check:critical
```

### `npm run validate-env`
Validate environment variables.

```bash
npm run validate-env
```

### `npm run admin`
Run admin CLI tool.

```bash
npm run admin
```

### `npm run mcp:check`
Check MCP (Model Context Protocol) health.

```bash
npm run mcp:check
```

## Make Commands

The Makefile provides convenient shortcuts for common tasks.

### Development

```bash
make help           # Show all available commands
make setup          # Complete environment setup
make dev            # Start development server
make dev-check      # Check environment health
make build          # Build for production
make start          # Start production server
```

### Code Quality

```bash
make lint           # Run linter
make lint-fix       # Fix linting issues
make format         # Format code
make format-check   # Check formatting
make type-check     # Check TypeScript types
make check          # Run all checks (lint, format, type-check, test)
```

### Testing

```bash
make test           # Run unit tests
make test-watch     # Run tests in watch mode
make test-coverage  # Generate coverage report
make test-e2e       # Run E2E tests
make test-e2e-ui    # Run E2E tests with UI
```

### Database

```bash
make db-migrate     # Run migrations
make db-push        # Push schema changes
make db-studio      # Open Prisma Studio
make db-seed        # Seed database
```

### Maintenance

```bash
make clean          # Clean all build artifacts
make clean-cache    # Clean Next.js cache only
make update         # Update dependencies
make security-audit # Run security audit
```

### Image Optimization

```bash
make images-optimize # Optimize all images
```

### Deployment

```bash
make deploy-preview     # Deploy preview to Vercel
make deploy-production  # Deploy to production
make monitor           # Monitor deployments
```

### Git Workflow

```bash
make commit         # Interactive commit with conventional format
make push          # Run checks and push to remote
```

### Workflow Shortcuts

```bash
make quick-start    # Install, setup, and check (first time setup)
make ci            # Run all CI checks locally
```

## Script Combinations

### Pre-commit Workflow
```bash
npm run lint:fix && npm run format && npm run type-check && npm test
# or
make check
```

### Full Quality Check
```bash
npm run lint && npm run format:check && npm run type-check && npm test
# or
make ci
```

### Development Setup (First Time)
```bash
npm run setup && npm run check && npm run dev
# or
make quick-start && make dev
```

### Production Build and Test
```bash
npm run build && npm run start
# or
make build && make start
```

## Environment-Specific Scripts

### Development
```bash
NODE_ENV=development npm run dev
```

### Production
```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

### Testing
```bash
NODE_ENV=test npm test
```

## Custom Script Arguments

Some scripts accept arguments:

### Development Server with Custom Port
```bash
npm run dev -- -p 3001
```

### Jest with Specific File
```bash
npm test -- my-component.test.tsx
```

### Playwright with Specific Browser
```bash
npm run test:e2e -- --project=chromium
```

## Parallel Execution

Run multiple commands in parallel:

```bash
# Using npm-run-all (if installed)
npx npm-run-all --parallel lint type-check test

# Or run in separate terminals
npm run dev          # Terminal 1
npm run db:studio    # Terminal 2
npm run test:watch   # Terminal 3
```

## Debugging Scripts

Add `--inspect` flag for Node.js debugging:

```bash
node --inspect node_modules/.bin/next dev
```

## Script Exit Codes

- `0` - Success
- `1` - Failure (linting errors, test failures, etc.)
- `2` - Syntax errors

Check exit code:
```bash
npm run lint
echo $?  # Unix/Mac
echo %ERRORLEVEL%  # Windows
```

## Troubleshooting

### Script Not Found

```bash
npm install  # Reinstall dependencies
```

### Permission Denied

```bash
# Unix/Mac
chmod +x scripts/your-script.js

# Windows - run as Administrator
```

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

## Best Practices

1. Always run `npm run check` before committing
2. Use `make ci` to run all checks locally before pushing
3. Run `npm run test:coverage` periodically to maintain test coverage
4. Use `npm run build` locally before deploying to catch build issues
5. Keep scripts organized and documented

## Adding New Scripts

To add a new script:

1. Add to `package.json`:
   ```json
   "scripts": {
     "my-script": "node scripts/my-script.js"
   }
   ```

2. Add to `Makefile` (if appropriate):
   ```makefile
   my-command: ## Description
       @npm run my-script
   ```

3. Document in this file

4. Add tests if applicable

## Further Reading

- [npm scripts documentation](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [GNU Make manual](https://www.gnu.org/software/make/manual/)
- [Next.js CLI](https://nextjs.org/docs/api-reference/cli)

