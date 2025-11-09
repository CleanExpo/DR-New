# Deployment Troubleshooting Guide

## Common Deployment Issues

### Build Failures

#### Issue: TypeScript Errors During Build

**Symptoms:**
```
Error: Type 'X' is not assignable to type 'Y'
Build failed with exit code 1
```

**Solution:**
```bash
# 1. Run type check locally
npm run type-check

# 2. Fix type errors
# Common issues:
# - Missing type imports
# - Incorrect prop types
# - Missing null checks

# 3. Verify fix
npm run build

# 4. Commit and deploy
git commit -m "fix: resolve type errors"
git push origin main
```

#### Issue: Module Not Found

**Symptoms:**
```
Error: Cannot find module '@/components/...'
Module not found: Can't resolve 'package-name'
```

**Solution:**
```bash
# 1. Verify package is installed
npm ls package-name

# 2. Reinstall dependencies
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps

# 3. Check import paths
# Ensure path aliases are correct in tsconfig.json

# 4. Verify in vercel.json build command
# Should include: npm ci --legacy-peer-deps
```

#### Issue: Prisma Client Not Generated

**Symptoms:**
```
Error: @prisma/client did not initialize yet
Cannot find module '@prisma/client'
```

**Solution:**
```bash
# 1. Generate Prisma client
npx prisma generate

# 2. Verify build command includes generation
# vercel.json should have:
# "buildCommand": "npx prisma generate && npm run build"

# 3. Check DATABASE_URL is set in Vercel environment
vercel env ls

# 4. Add to package.json postinstall if needed
"postinstall": "prisma generate || true"
```

#### Issue: Out of Memory

**Symptoms:**
```
FATAL ERROR: Reached heap limit
JavaScript heap out of memory
```

**Solution:**
```bash
# 1. Increase Node memory in vercel.json
{
  "build": {
    "env": {
      "NODE_OPTIONS": "--max-old-space-size=3072"
    }
  }
}

# 2. Reduce build concurrency in next.config.js
experimental: {
  workerThreads: false,
  cpus: 1
}

# 3. Optimize bundle size
npm run build:analyze
# Remove unused dependencies

# 4. Use standalone output
output: 'standalone'
```

### Runtime Errors

#### Issue: 500 Internal Server Error

**Symptoms:**
- Pages showing 500 error
- API routes failing
- High error rate in logs

**Solution:**
```bash
# 1. Check Vercel logs
vercel logs --follow

# 2. Look for error stack traces
# Common causes:
# - Uncaught exceptions
# - Database connection errors
# - Missing environment variables

# 3. Check environment variables
vercel env ls

# 4. Test locally with production env
npm run build
npm start

# 5. Add error handling
try {
  // risky operation
} catch (error) {
  console.error('Error:', error);
  return { error: 'Internal server error' };
}
```

#### Issue: Database Connection Failed

**Symptoms:**
```
Error: P1001: Can't reach database server
Error: Connection pool timeout
```

**Solution:**
```bash
# 1. Verify DATABASE_URL is correct
echo $DATABASE_URL
# Should be: postgresql://user:pass@host:5432/db

# 2. Check database is accessible
psql $DATABASE_URL -c "SELECT 1;"

# 3. Verify connection pool settings
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
DATABASE_CONNECTION_TIMEOUT=30000

# 4. Check Prisma schema
npx prisma studio

# 5. Test connection
npx prisma db pull
```

#### Issue: NextAuth Session Errors

**Symptoms:**
```
Error: No secret provided
Error: JWT expired
Session not persisting
```

**Solution:**
```bash
# 1. Verify NEXTAUTH_SECRET is set
vercel env ls | grep NEXTAUTH

# 2. Generate new secret if needed
openssl rand -base64 32

# 3. Verify NEXTAUTH_URL matches domain
NEXTAUTH_URL=https://disasterrecovery.com.au

# 4. Check JWT configuration
# In [...nextauth].ts:
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
}
```

### Performance Issues

#### Issue: Slow Page Load Times

**Symptoms:**
- TTFB > 1000ms
- LCP > 4000ms
- Poor Lighthouse scores

**Solution:**
```bash
# 1. Analyze bundle size
npm run build:analyze

# 2. Check for large dependencies
npx webpack-bundle-analyzer .next/analyze/client.json

# 3. Implement code splitting
# Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./Heavy'))

# 4. Optimize images
npm run web-optimise

# 5. Enable caching headers
# Already configured in next.config.js

# 6. Use ISR for static pages
export const revalidate = 3600; // 1 hour
```

#### Issue: High Database Query Times

**Symptoms:**
- API routes slow (>1000ms)
- Database CPU high
- Connection pool exhausted

**Solution:**
```bash
# 1. Check slow queries
npm run db:test-performance

# 2. Add database indexes
# In schema.prisma:
@@index([field_name])

# 3. Use Prisma query optimization
// Bad:
const all = await prisma.model.findMany();
const filtered = all.filter(...)

// Good:
const filtered = await prisma.model.findMany({
  where: { ... }
})

# 4. Implement caching
# Use Redis or memory cache for frequent queries

# 5. Use connection pooling
# Already configured in DATABASE_URL
```

#### Issue: Large Bundle Size

**Symptoms:**
- First load JS > 300KB
- Page size > 2MB
- Slow downloads on mobile

**Solution:**
```bash
# 1. Analyze bundle
npm run build:analyze

# 2. Remove unused dependencies
npm uninstall unused-package

# 3. Use dynamic imports
const Modal = dynamic(() => import('./Modal'), {
  ssr: false
})

# 4. Optimize package imports
# next.config.js already has:
experimental: {
  optimizePackageImports: ['lucide-react', '@radix-ui/*']
}

# 5. Use tree-shaking
# Import specific functions only
import { specificFunction } from 'package';
```

### Image Issues

#### Issue: Images Not Loading

**Symptoms:**
- Broken image icons
- 404 errors for images
- Images not optimized

**Solution:**
```bash
# 1. Verify image path
# Should be in /public/images/

# 2. Check Next.js Image component
<Image
  src="/images/hero/image.png"  // Correct
  src="images/hero/image.png"   // Wrong (missing leading /)
  alt="Description"
  width={800}
  height={600}
/>

# 3. Add domain to next.config.js if external
images: {
  domains: ['external-domain.com']
}

# 4. Optimize images
npm run web-optimise

# 5. Check image format support
# Use WebP or AVIF for better compression
```

#### Issue: Hero Image Not Displaying

**Symptoms:**
- Landing page hero blank
- "variant is not defined" error

**Solution:**
```typescript
// DO NOT use HeroImage wrapper
// Use Next.js Image directly:
import Image from 'next/image';

<Image
  src="/images/hero/landing-page-hero.png"
  alt="Disaster Recovery Brisbane"
  fill
  style={{ objectFit: 'cover' }}
  priority
  sizes="100vw"
/>
```

### Environment Variable Issues

#### Issue: Environment Variables Not Loading

**Symptoms:**
- Undefined env variables at runtime
- Features not working
- API keys missing

**Solution:**
```bash
# 1. Verify variables in Vercel dashboard
vercel env ls

# 2. Check variable naming
# Client-side must start with NEXT_PUBLIC_
NEXT_PUBLIC_APP_URL=https://...

# Server-side can be any name
DATABASE_URL=postgresql://...

# 3. Redeploy to pick up changes
vercel --prod --force

# 4. Validate environment
npm run env:validate
```

#### Issue: Wrong Environment Used

**Symptoms:**
- Development config in production
- Debug mode enabled
- Test API keys used

**Solution:**
```bash
# 1. Check NODE_ENV
echo $NODE_ENV  # Should be 'production'

# 2. Verify environment in Vercel
# Go to Settings > Environment Variables
# Ensure production values are set

# 3. Use environment-specific files
# .env.production (production)
# .env.staging (staging)
# .env.local (development)

# 4. Run environment validation
NODE_ENV=production npm run env:validate
```

### Deployment Failures

#### Issue: Vercel Deployment Fails

**Symptoms:**
- Deployment shows "Error"
- Build doesn't start
- Deployment canceled

**Solution:**
```bash
# 1. Check Vercel status
curl https://www.vercel-status.com/

# 2. Verify git integration
vercel link

# 3. Check deployment logs
vercel logs <deployment-id>

# 4. Manually deploy
vercel --prod

# 5. Check build command
# Should be in vercel.json:
"buildCommand": "npx prisma generate && npm run build"
```

#### Issue: Deployment Succeeds But Site Broken

**Symptoms:**
- Deployment shows "Ready"
- Site shows errors or blank pages
- Features not working

**Solution:**
```bash
# 1. Check runtime logs
vercel logs --follow

# 2. Test health endpoints
npm run health-check

# 3. Verify environment variables
vercel env ls

# 4. Check for console errors
# Open browser DevTools

# 5. Compare with local build
npm run build && npm start
# Should match production behavior
```

### Route Issues

#### Issue: 404 Errors on Valid Routes

**Symptoms:**
- Service pages return 404
- Dynamic routes not working
- Static routes broken

**Solution:**
```bash
# 1. Verify route file structure
# Correct:
app/services/water-damage-restoration/page.tsx

# Wrong:
app/services/[slug]/page.tsx  # Interferes with static routes

# 2. Check for disabled routes
# Look for _DISABLED suffix:
app/services/_slug_DISABLED/

# 3. Verify export
export default function Page() {
  return <div>Content</div>;
}

# 4. Check routing in Next.js
# Static routes take precedence over dynamic
```

#### Issue: Redirects Not Working

**Symptoms:**
- Old URLs not redirecting
- Redirect loops
- Incorrect destination

**Solution:**
```bash
# 1. Check next.config.js redirects
async redirects() {
  return [
    {
      source: '/old-path',
      destination: '/new-path',
      permanent: true  // 308
    }
  ];
}

# 2. Check vercel.json redirects
{
  "redirects": [...]
}

# 3. Test redirect
curl -I https://disasterrecovery.com.au/old-path
# Should show 308 and Location header

# 4. Clear browser cache
# Redirects are cached aggressively
```

### Security Issues

#### Issue: CORS Errors

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
No 'Access-Control-Allow-Origin' header
```

**Solution:**
```bash
# 1. Add CORS headers to API routes
// app/api/route.ts
export async function GET(request: Request) {
  return new Response(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST',
    }
  });
}

# 2. Or use Next.js middleware
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*');
  return response;
}

# 3. Configure in next.config.js
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' }
      ]
    }
  ];
}
```

#### Issue: Content Security Policy Violations

**Symptoms:**
```
Refused to load script due to CSP
Refused to connect to API due to CSP
```

**Solution:**
```bash
# 1. Check CSP header in next.config.js
# Add domain to appropriate directive:
Content-Security-Policy: script-src 'self' https://trusted-domain.com

# 2. For inline scripts, use nonce
<script nonce={nonce}>...</script>

# 3. Test CSP
# Use browser DevTools Console
# Check for CSP violations

# 4. Temporarily relax for debugging
# Remove from next.config.js headers
# Deploy and test
```

## Monitoring and Debugging

### Enable Debug Mode

```bash
# 1. Set debug environment variable
NEXT_PUBLIC_DEBUG=true

# 2. Add debug logging
console.log('[DEBUG]', 'Component rendered', { props });

# 3. Use React DevTools
# Install browser extension

# 4. Enable Vercel logs
vercel logs --follow --output=raw
```

### Performance Monitoring

```bash
# 1. Run Lighthouse
npm run test:lighthouse

# 2. Check Core Web Vitals
# Google Search Console > Core Web Vitals

# 3. Analyze bundle
npm run build:analyze

# 4. Test load times
curl -w "@curl-format.txt" -o /dev/null -s https://disasterrecovery.com.au/
```

### Error Tracking

```bash
# 1. Check Sentry (if configured)
# Go to Sentry dashboard

# 2. Check Vercel logs
vercel logs --follow

# 3. Enable source maps
# next.config.js:
productionBrowserSourceMaps: true

# 4. Test error boundaries
# Add ErrorBoundary components
```

## Getting Help

### Before Escalating

1. Check this troubleshooting guide
2. Review recent deployments
3. Check Vercel status page
4. Review error logs
5. Test locally

### Escalation Path

1. Check #dev-help Slack channel
2. Tag @dev-team in #deployments
3. Create incident ticket
4. Contact on-call engineer

### Useful Commands

```bash
# Health check
npm run health-check

# View logs
vercel logs --follow

# Rollback
vercel rollback

# Validate environment
npm run env:validate

# Test locally
npm run build && npm start

# Check build size
npm run build:analyze
```

## References

- [PRODUCTION.md](./PRODUCTION.md) - Deployment guide
- [ROLLBACK.md](./ROLLBACK.md) - Rollback procedures
- [ENVIRONMENTS.md](./ENVIRONMENTS.md) - Environment configuration
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation
- [Vercel Docs](https://vercel.com/docs) - Platform documentation
