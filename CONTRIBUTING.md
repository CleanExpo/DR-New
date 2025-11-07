# Contributing to Disaster Recovery Local Service

Thank you for your interest in contributing! This document provides guidelines and
instructions for setting up your development environment and contributing to the
project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Testing](#testing)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn 1.22+
- Git
- PostgreSQL (for local database)

### Quick Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd dr-new
   ```

2. Run the automated setup:
   ```bash
   npm run setup
   # or
   make setup
   ```

3. Configure your environment:
   - Copy `.env.example` to `.env`
   - Update environment variables with your local values

4. Start development server:
   ```bash
   npm run dev
   # or
   make dev
   ```

### Manual Setup

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Setup Git hooks
npx husky install

# Generate Prisma client
npx prisma generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## Development Workflow

### Available Commands

#### Using npm scripts:
```bash
# Development
npm run dev              # Start dev server
npm run dev:turbo        # Start with Turbo mode
npm run build            # Production build
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript type check

# Testing
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run E2E tests
npm run test:e2e:ui      # Run E2E tests with UI

# Database
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
npm run db:studio        # Open Prisma Studio

# Utilities
npm run setup            # Setup dev environment
npm run check            # Health check
npm run build:analyze    # Analyze bundle size
```

#### Using Makefile:
```bash
make help           # Show all available commands
make setup          # Complete environment setup
make dev            # Start development server
make dev-check      # Check environment health
make test           # Run tests
make lint           # Run linter
make format         # Format code
make check          # Run all checks
make clean          # Clean build artifacts
```

### Development Process

1. Check environment health:
   ```bash
   npm run check
   # or
   make dev-check
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes following the code style guidelines

4. Run checks before committing:
   ```bash
   npm run lint
   npm run type-check
   npm test
   # or
   make check
   ```

5. Commit using conventional commit format:
   ```bash
   git commit -m "feat(scope): your message"
   # or
   make commit  # Interactive commit helper
   ```

## Code Style

### General Guidelines

- Use TypeScript for all new code
- Follow the existing code structure and patterns
- Write self-documenting code with clear variable names
- Add comments for complex logic
- Keep functions small and focused
- Use functional programming patterns where appropriate

### TypeScript

- Use strict type checking
- Avoid `any` types (use `unknown` if necessary)
- Define interfaces for complex objects
- Use type inference when obvious

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types and default values
- Avoid inline styles (use Tailwind CSS)

### File Organization

```
app/              # Next.js app router pages
components/       # Reusable React components
  ├── ui/        # Base UI components
  ├── forms/     # Form components
  └── ...
lib/              # Utility functions and business logic
hooks/            # Custom React hooks
types/            # TypeScript type definitions
```

### Naming Conventions

- Components: PascalCase (e.g., `UserProfile.tsx`)
- Files: kebab-case (e.g., `user-profile.ts`)
- Functions: camelCase (e.g., `getUserData`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types/Interfaces: PascalCase (e.g., `UserProfile`)

## Testing

### Unit Tests

- Write tests for business logic and utilities
- Use Jest and React Testing Library
- Place test files next to the code they test
- Name test files: `*.test.ts` or `*.test.tsx`

Example:
```typescript
// user-profile.test.tsx
import { render, screen } from '@testing-library/react';
import { UserProfile } from './user-profile';

describe('UserProfile', () => {
  it('renders user name', () => {
    render(<UserProfile name="John" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });
});
```

### E2E Tests

- Write E2E tests for critical user flows
- Use Playwright
- Place tests in `tests/` directory
- Name test files: `*.spec.ts`

### Running Tests

```bash
# Unit tests
npm test
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report

# E2E tests
npm run test:e2e
npm run test:e2e:ui     # With UI
npm run test:e2e:debug  # Debug mode
```

## Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
type(scope): subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD changes
- `revert`: Revert a previous commit

### Examples

```bash
feat(auth): add login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation steps
refactor(api): simplify error handling
test(auth): add login tests
```

### Commit Hooks

Pre-commit hooks will automatically:
- Run ESLint and fix issues
- Format code with Prettier
- Run TypeScript type checking

Pre-push hooks will:
- Run all tests
- Run critical checks

## Pull Request Process

1. Update your branch with the latest main:
   ```bash
   git checkout main
   git pull
   git checkout your-branch
   git rebase main
   ```

2. Ensure all checks pass:
   ```bash
   make check
   ```

3. Push your changes:
   ```bash
   git push origin your-branch
   ```

4. Create a Pull Request with:
   - Clear title following conventional commit format
   - Description of changes
   - Screenshots for UI changes
   - Related issue numbers

5. Address review feedback

6. Once approved, the PR will be merged by a maintainer

### PR Requirements

- All tests must pass
- Code coverage should not decrease
- No merge conflicts with main
- At least one approval from a maintainer
- All conversations resolved

## Project-Specific Guidelines

### Local Service Focus

This is a LOCAL service website for Brisbane, Ipswich, and Logan areas. When
contributing:

- Focus on local SEO and service area content
- Emphasize Master Restorer certification (Phil McGurk)
- Use accurate Brisbane/Queensland specific information
- Avoid national or interstate service claims
- No contractor management or CRM features
- Professional, trustworthy tone for insurance and high-value clients

### SEO Considerations

- Use semantic HTML
- Optimize images (WebP, proper sizes)
- Add proper meta tags and schema markup
- Use descriptive alt text
- Follow accessibility guidelines

### Performance

- Keep bundle sizes small
- Use dynamic imports for large components
- Optimize images before committing
- Test on mobile devices
- Monitor Core Web Vitals

## Questions?

If you have questions or need help:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with detailed information

Thank you for contributing!
