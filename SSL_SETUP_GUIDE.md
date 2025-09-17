
# SSL CERTIFICATE SETUP GUIDE

## Option 1: Vercel Deployment (Recommended)
If deploying to Vercel, SSL is automatic. Just:
1. Connect your domain in Vercel dashboard
2. Vercel handles SSL automatically

## Option 2: Traditional Hosting

### Step 1: Obtain SSL Certificate
- Let's Encrypt (Free): https://letsencrypt.org/
- Or purchase from your hosting provider

### Step 2: Install Certificate
Contact your hosting provider for specific instructions.

### Step 3: Update Middleware
Add to middleware.ts:

```typescript
// Force HTTPS redirect
if (process.env.NODE_ENV === 'production' &&
    !request.headers.get('x-forwarded-proto')?.includes('https')) {
  return NextResponse.redirect(
    `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
    301
  );
}
```

### Step 4: Update Environment Variables
In .env.production:
```
NEXT_PUBLIC_SITE_URL=https://disasterrecovery.com.au
```

## Verification
After setup, verify at: https://www.ssllabs.com/ssltest/
