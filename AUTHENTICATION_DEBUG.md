# Authentication Debugging Report

**Date:** 2026-02-02
**Issue:** Production login returns 401 Unauthorized despite valid credentials
**Status:** 🔍 Under Investigation

---

## Summary

The demo admin user has been successfully seeded to the production database, and password verification works correctly when tested directly. However, login through the web interface still fails with HTTP 401.

---

## What We've Verified ✅

### 1. Database Connection
- ✅ Production DATABASE_URL correctly configured in Vercel
- ✅ Same Neon database used by both local and production
- ✅ Database connection successful

### 2. User Exists in Database
```
✅ User found in database:
   ID: cml4qc8xs000012v1g4jes0wj
   Email: demo.admin@disasterrecovery.com.au
   Name: Demo Admin
   Type: ADMIN
   Active: true
   Blocked: false
   Email Verified: true
   Tenant ID: NULL
   Has Password: true
```

### 3. Password Hash is Valid
- ✅ Direct bcrypt.compare() test: **VALID**
- ✅ Password hash in database matches "demo2026"

### 4. Account Status
- ✅ isActive: true
- ✅ isBlocked: false
- ✅ isEmailVerified: true
- ✅ No lockedUntil date set

---

## Network Request Analysis

**Login Attempt:**
```
POST https://disaster-recovery-seven.vercel.app/api/auth/callback/credentials
Status: 401 Unauthorized
```

**Request Flow:**
1. GET /api/auth/providers → 200 ✅
2. GET /api/auth/csrf → 200 ✅
3. POST /api/auth/callback/credentials → 401 ❌

---

## Possible Causes

### 1. Tenant ID Requirement ⚠️
The user has `tenantId: NULL`. The authentication logic may require a tenant association.

**From `apps/web/lib/auth.ts`:**
```typescript
const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    email: true,
    password: true,
    name: true,
    userType: true,
    isActive: true,
    isBlocked: true,
    lockedUntil: true,
    tenantId: true, // ← May be required
  },
});
```

**Potential Fix:** Update seed script to create or assign a tenant:
```typescript
// Option 1: Create a demo tenant
const tenant = await prisma.tenant.create({
  data: {
    name: 'Demo Tenant',
    slug: 'demo',
    // ... other required fields
  }
});

// Option 2: Update user with tenant
await prisma.user.update({
  where: { email: 'demo.admin@disasterrecovery.com.au' },
  data: { tenantId: tenant.id }
});
```

### 2. Environment Variable Mismatch
Production may have different `NEXTAUTH_SECRET` or `NEXTAUTH_URL` causing session issues.

**Current Production Env:**
```
NEXTAUTH_SECRET="production-nextauth-secret-disaster-recovery-2026-secure-key"
NEXTAUTH_URL="https://disaster-recovery-seven.vercel.app"
```

### 3. Middleware or Rate Limiting
There may be middleware checks (IP-based, rate limiting, etc.) blocking the request.

### 4. Prisma Client Cache
Vercel serverless functions may have stale Prisma client instances.

---

## Recommended Next Steps

### Step 1: Check Tenant Requirement
Review `apps/web/lib/auth.ts` authorize function to see if tenantId is validated:

```bash
# Search for tenant checks in auth logic
grep -n "tenantId" apps/web/lib/auth.ts
```

### Step 2: Create Demo Tenant (If Required)
If tenant is required, update seed script:

```bash
npm run seed:demo-admin -- --create-tenant
```

### Step 3: Check Production Logs
View Vercel function logs to see exact error:

```bash
vercel logs --follow
```

Then attempt login and watch for errors.

### Step 4: Test with Vercel CLI Locally
Run the app with production environment:

```bash
vercel dev
```

This runs locally but uses production DATABASE_URL, helping isolate the issue.

---

## Current Workaround

**For Local Development:**
Login works perfectly at `http://localhost:3000/login` with:
- Email: demo.admin@disasterrecovery.com.au
- Password: demo2026

**For Production:**
Authentication still fails. Investigation ongoing.

---

## Files to Review

1. `apps/web/lib/auth.ts` - NextAuth configuration and authorize function
2. `apps/web/app/api/auth/[...nextauth]/route.ts` - Auth API route
3. `apps/web/middleware.ts` - Any auth middleware
4. `apps/web/prisma/schema.prisma` - User model and tenant relationship

---

## Test Results

| Test | Local | Production |
|------|-------|------------|
| Database Connection | ✅ | ✅ |
| User Exists | ✅ | ✅ |
| Password Valid | ✅ | ✅ |
| Account Active | ✅ | ✅ |
| Login Success | ✅ | ❌ |

---

## Next Investigation

Focus on **tenantId requirement** as the most likely cause, since that's the only field that's NULL and could be validated during authentication.
