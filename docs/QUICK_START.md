# Quick Start Guide

Get up and running with the Disaster Recovery Local Service project in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- npm 9+ installed
- Git installed
- PostgreSQL installed (or use cloud database)

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd dr-new

# Automated setup (recommended)
npm run setup
```

The setup script will:
- Check your Node.js version
- Install all dependencies
- Setup Git hooks
- Generate Prisma client
- Create .env file from template

## Step 2: Configure Environment

Edit `.env` file with your local values:

```env
# Required for local development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/db_name
NEXTAUTH_SECRET=your-secret-here

# Optional - Add if you have API keys
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-key-here
```

## Step 3: Setup Database

```bash
# Run migrations
npm run db:migrate

# Seed with sample data (optional)
npm run seed
```

## Step 4: Start Development

```bash
# Start the development server
npm run dev

# Or with Turbo mode (faster)
npm run dev:turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Verify Setup

```bash
# Run health check
npm run check
```

This will verify:
- All configuration files exist
- Dependencies are installed
- Environment variables are set
- TypeScript compiles without errors

## Common Commands

### Development

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Start production server
```

### Code Quality

```bash
npm run lint             # Check for linting errors
npm run lint:fix         # Fix linting errors
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types
```

### Testing

```bash
npm test                 # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run E2E tests
```

### Database

```bash
npm run db:studio        # Open Prisma Studio
npm run db:migrate       # Run migrations
npm run db:push          # Push schema changes
```

## Using Make (Alternative)

If you prefer using Make:

```bash
make setup              # Complete setup
make dev                # Start development
make dev-check          # Health check
make test               # Run tests
make lint               # Run linter
make format             # Format code
make help               # Show all commands
```

## Troubleshooting

### Port Already in Use

```bash
# Use different port
npm run dev -- -p 3001
```

### Module Not Found

```bash
# Reinstall dependencies
npm install
```

### Type Errors

```bash
# Regenerate Prisma client
npx prisma generate

# Check types
npm run type-check
```

### Database Connection Failed

1. Check DATABASE_URL in `.env`
2. Ensure PostgreSQL is running
3. Verify credentials

## Next Steps

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
2. Check [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed development guide
3. Review [CLAUDE.md](../CLAUDE.md) for project focus and guidelines

## VSCode Setup

Install recommended extensions:

1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Extensions: Show Recommended Extensions"
3. Install all recommended extensions

Or manually install:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma

## Project Structure

```
dr-new/
├── app/              # Next.js pages (App Router)
├── components/       # React components
├── lib/             # Utilities and business logic
├── public/          # Static assets
├── prisma/          # Database schema
└── tests/           # E2E tests
```

## Key Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Prisma for database ORM
- NextAuth.js for authentication
- Comprehensive testing setup
- SEO optimized
- Mobile responsive

## Development Workflow

1. Create feature branch
2. Make changes
3. Run checks: `make check` or `npm run lint && npm run type-check && npm test`
4. Commit with conventional format: `feat(scope): message`
5. Push and create PR

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)

## Getting Help

- Check documentation in `/docs`
- Review existing issues
- Ask in project discussions
- Create new issue with details

Happy coding!
