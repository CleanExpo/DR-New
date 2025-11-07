# Disaster Recovery Services - Australia

Professional disaster recovery and restoration services website for water damage, fire damage, mould remediation, and emergency response across Brisbane, Ipswich, and Logan.

## 🚀 Quick Start for Developers

**New to this project? Start here:**

👉 **[DEVELOPER_QUICK_START.md](./DEVELOPER_QUICK_START.md)** - Get productive in 15 minutes

### Ultra-Quick Setup

```bash
# 1. Clone and install
git clone <repository-url>
cd disaster-recovery
npm install

# 2. Setup environment
cp .env.example .env.local
# Add your NEXTAUTH_SECRET (see .env.example)

# 3. Initialize database
npx prisma generate
npx prisma db push

# 4. Start developing
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you're ready to code!

## 📖 Documentation

- **[DEVELOPER_QUICK_START.md](./DEVELOPER_QUICK_START.md)** - Complete developer guide
- **[CLAUDE.md](./CLAUDE.md)** - Project guidelines and focus
- **[DX_OPTIMIZATION_SUMMARY.md](./DX_OPTIMIZATION_SUMMARY.md)** - DX improvements overview

## 🌟 Overview

This is a local disaster recovery and restoration services website featuring:

- 24/7 Emergency response services in Brisbane, Ipswich, Logan
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Commercial property restoration
- High-end residential restoration
- Master Restorer certification (Phill McGurk)

## 📁 Project Structure

```
Mass-WebPage-Creations/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── services/     # Service pages (water damage, fire, mould, etc.)
│   │   ├── locations/    # Location-specific pages
│   │   ├── emergency/    # Emergency service pages
│   │   ├── insurance/    # Insurance provider pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   ├── lib/              # Utilities and configs
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── images/           # Static images
└── scripts/              # Build and generation scripts
```

## 🌟 Key Features

### Service Pages
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Sewage cleanup
- Biohazard cleaning
- Commercial services
- Emergency services

### Location Coverage
- All Australian states and territories
- Major cities and regional areas
- 24/7 emergency response
- Local contractor network

### Lead Management
- Lead capture forms
- Partner/contractor portal
- Lead scoring and routing
- Quality assessment

## 🚀 Deployment

### Vercel Deployment

The site is configured for automatic deployment to Vercel:

1. Push changes to the main branch
2. Vercel automatically builds and deploys
3. Production URL: [https://disaster-recovery.vercel.app](https://disaster-recovery.vercel.app)

### Build Command
```bash
npm run build
```

### Environment Variables

Required environment variables for production:
- `DATABASE_URL` - Database connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `STRIPE_SECRET_KEY` - Stripe API key (if using payments)
- `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## 🔧 Essential Commands

### Development
```bash
npm run dev              # Start development server
npm run dev:turbo        # Start with Turbo mode (faster)
npm run dev:debug        # Start with debugger
```

### Code Quality
```bash
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run validate         # Run all checks
```

### Testing
```bash
npm test                 # Run unit tests
npm run test:e2e         # Run E2E tests
npm run test:all         # Run all tests
```

### Build & Production
```bash
npm run build            # Build for production
npm run build:analyze    # Build with bundle analysis
npm start                # Start production server
```

### Utilities
```bash
npm run clean            # Clean build artifacts
npm run verify:dx        # Verify DX setup
```

See [DEVELOPER_QUICK_START.md](./DEVELOPER_QUICK_START.md) for complete command reference.

## 📚 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL/SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Vercel

## 📄 License

Proprietary - All rights reserved

## 💬 Support

For support, contact the Disaster Recovery team.
