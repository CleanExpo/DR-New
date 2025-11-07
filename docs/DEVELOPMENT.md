# Development Guide

Comprehensive guide for developers working on the Disaster Recovery Local Service
website.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Development Environment](#development-environment)
- [Common Tasks](#common-tasks)
- [Debugging](#debugging)
- [Performance](#performance)
- [Troubleshooting](#troubleshooting)

## Architecture Overview

This is a Next.js 14 application using the App Router with the following key
features:

- **Server Components**: Default for optimal performance
- **Client Components**: Used only when necessary for interactivity
- **API Routes**: RESTful API endpoints
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives

### Key Design Principles

1. **Local-First**: Focus on Brisbane, Ipswich, Logan service areas
2. **SEO Optimized**: Fast loading, semantic HTML, proper meta tags
3. **Mobile-First**: Responsive design for all screen sizes
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Performance**: Core Web Vitals optimization

## Technology Stack

### Core

- **Next.js 14**: React framework with App Router
- **React 18**: UI library
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 3**: Utility-first CSS framework

### Database & ORM

- **PostgreSQL**: Production database
- **Prisma**: Type-safe ORM
- **NextAuth.js**: Authentication solution

### UI Libraries

- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Testing

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

### Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **lint-staged**: Run linters on staged files

## Project Structure

```
dr-new/
├── app/                        # Next.js App Router
│   ├── (routes)/              # Route groups
│   ├── api/                   # API routes
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/                 # React components
│   ├── ui/                    # Base UI components
│   ├── forms/                 # Form components
│   ├── seo/                   # SEO components
│   └── ...
├── lib/                       # Utility functions
│   ├── utils/                 # General utilities
│   ├── seo/                   # SEO utilities
│   └── ...
├── hooks/                     # Custom React hooks
├── types/                     # TypeScript definitions
├── public/                    # Static assets
├── prisma/                    # Database schema
├── scripts/                   # Build and utility scripts
├── tests/                     # E2E tests
├── .vscode/                   # VSCode settings
└── docs/                      # Documentation

```

### Important Directories

#### `/app`
Next.js App Router pages and layouts. Each folder represents a route.

#### `/components`
Reusable React components organized by feature/type.

#### `/lib`
Business logic, utilities, and integrations.

#### `/hooks`
Custom React hooks for shared logic.

#### `/public`
Static assets (images, fonts, etc.).

## Development Environment

### Initial Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment:**
   ```bash
   npm run setup
   ```

3. **Configure `.env`:**
   ```env
   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXTAUTH_URL=http://localhost:3000

   # Database
   DATABASE_URL="postgresql://..."

   # Auth
   NEXTAUTH_SECRET="..."

   # APIs
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="..."
   ```

4. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### VSCode Setup

The project includes VSCode settings for optimal development:

- Auto-format on save
- ESLint auto-fix on save
- Import organization
- TypeScript path mappings
- Debugging configurations

**Recommended Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Prisma
- GitLens

Install all recommended extensions:
```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

## Common Tasks

### Creating a New Page

1. Create a new folder in `app/`:
   ```bash
   mkdir app/new-page
   ```

2. Add `page.tsx`:
   ```typescript
   // app/new-page/page.tsx
   import type { Metadata } from 'next';

   export const metadata: Metadata = {
     title: 'Page Title | Disaster Recovery',
     description: 'Page description',
   };

   export default function NewPage() {
     return (
       <main>
         <h1>New Page</h1>
       </main>
     );
   }
   ```

### Creating a Component

1. Create component file:
   ```typescript
   // components/my-component.tsx
   import React from 'react';

   interface MyComponentProps {
     title: string;
     description?: string;
   }

   export function MyComponent({ title, description }: MyComponentProps) {
     return (
       <div>
         <h2>{title}</h2>
         {description && <p>{description}</p>}
       </div>
     );
   }
   ```

2. Add tests:
   ```typescript
   // components/my-component.test.tsx
   import { render, screen } from '@testing-library/react';
   import { MyComponent } from './my-component';

   describe('MyComponent', () => {
     it('renders title', () => {
       render(<MyComponent title="Test" />);
       expect(screen.getByText('Test')).toBeInTheDocument();
     });
   });
   ```

### Adding an API Route

1. Create route handler:
   ```typescript
   // app/api/my-endpoint/route.ts
   import { NextRequest, NextResponse } from 'next/server';

   export async function GET(request: NextRequest) {
     try {
       const data = { message: 'Success' };
       return NextResponse.json(data);
     } catch (error) {
       return NextResponse.json(
         { error: 'Internal Server Error' },
         { status: 500 }
       );
     }
   }

   export async function POST(request: NextRequest) {
     try {
       const body = await request.json();
       // Process data
       return NextResponse.json({ success: true });
     } catch (error) {
       return NextResponse.json(
         { error: 'Bad Request' },
         { status: 400 }
       );
     }
   }
   ```

### Database Operations

```bash
# Create migration
npm run db:migrate

# Push schema changes (dev)
npm run db:push

# Open Prisma Studio
npm run db:studio

# Seed database
npm run seed
```

### Working with Images

```bash
# Optimize images
npm run optimize-images

# Convert to WebP
npm run images:convert

# Audit images
npm run images:audit
```

## Debugging

### VSCode Debugging

1. Set breakpoints in your code
2. Press F5 or use Debug panel
3. Select configuration:
   - **Next.js: debug server-side** - Debug API routes and SSR
   - **Next.js: debug client-side** - Debug browser code
   - **Next.js: debug full stack** - Debug both

### Browser DevTools

- **React DevTools**: Inspect component tree
- **Network tab**: Monitor API calls
- **Performance tab**: Profile rendering
- **Lighthouse**: Audit performance and SEO

### Logging

```typescript
// Development only
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// Production logging (use sparingly)
console.error('Error:', error);
console.warn('Warning:', warning);
```

## Performance

### Optimization Checklist

- [ ] Use Server Components by default
- [ ] Add `loading.tsx` for route segments
- [ ] Optimize images (WebP, proper sizes)
- [ ] Use dynamic imports for large components
- [ ] Implement proper caching strategies
- [ ] Monitor Core Web Vitals

### Bundle Analysis

```bash
npm run build:analyze
```

This generates a visual bundle analysis to identify large dependencies.

### Performance Monitoring

Monitor these metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1
- **TTFB (Time to First Byte)**: < 600ms

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
npm run dev -- -p 3001
```

#### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

#### Type Errors

```bash
# Regenerate types
npm run type-check

# Regenerate Prisma client
npx prisma generate
```

#### Database Connection Issues

1. Check DATABASE_URL in `.env`
2. Ensure PostgreSQL is running
3. Verify database exists
4. Check network connectivity

#### Build Failures

```bash
# Clear Next.js cache
rm -rf .next

# Clear all caches
npm run clean

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

1. Check error messages carefully
2. Search existing issues on GitHub
3. Review relevant documentation
4. Ask in project discussions
5. Create detailed bug report if needed

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## Best Practices

### Code Organization

- One component per file
- Colocate related files
- Use barrel exports for public APIs
- Keep files under 300 lines

### Component Design

- Make components reusable
- Use composition over inheritance
- Accept generic props for flexibility
- Provide sensible defaults

### State Management

- Use local state when possible
- Lift state up when needed
- Consider React Context for shared state
- Use server state libraries for API data

### Error Handling

- Use error boundaries for component errors
- Handle API errors gracefully
- Provide helpful error messages
- Log errors appropriately

### Security

- Validate all inputs
- Sanitize user content
- Use environment variables for secrets
- Follow OWASP guidelines
- Implement rate limiting on APIs

Happy coding!
