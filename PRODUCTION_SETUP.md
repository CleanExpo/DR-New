# Production Database Setup

## Current Status

✅ **Local Development:** Demo admin user created successfully
❌ **Production (Vercel):** Demo admin user does NOT exist

## The Problem

The demo admin login fails on production because:
1. We seeded the demo admin to our **local Neon database**
2. Vercel production uses a **different DATABASE_URL** (configured in Vercel environment variables)
3. The production database does not have the demo admin user

## The Solution

Run the seed script against the **Vercel production database**. Here are three options:

---

## Option 1: Run Seed Script via Vercel CLI (Recommended)

This runs the seed script in Vercel's production environment with access to production DATABASE_URL.

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link to your project (if not already linked)
vercel link

# 4. Run seed script in production environment
vercel env pull .env.production.local
npx tsx scripts/seed-demo-admin.ts
```

The script will use Vercel's production DATABASE_URL and create the demo admin user.

---

## Option 2: Run Seed Script Manually via Vercel Dashboard

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Copy the production `DATABASE_URL` value
3. Run locally with production database:

```bash
# Set production database URL temporarily
DATABASE_URL="<paste-production-database-url-here>" npm run seed:demo-admin
```

---

## Option 3: Add Seed Script to Vercel Build Process

Add seed script to run automatically after each deployment.

**Update `apps/web/package.json`:**

```json
{
  "scripts": {
    "build": "next build && npm run seed:demo-admin",
    "seed:demo-admin": "tsx scripts/seed-demo-admin.ts"
  }
}
```

⚠️ **Warning:** This will run the seed on every deployment. Safe for upsert operations but may slow builds.

---

## Demo Admin Credentials

Once seeded to production, use these credentials to test:

```
Email:    demo.admin@disasterrecovery.com.au
Password: demo2026
```

---

## Verification

After running the seed script, test the login:

1. Navigate to https://disaster-recovery-seven.vercel.app/login
2. Enter demo admin credentials
3. Should redirect to dashboard on successful login

---

## Current Environment Status

**Local (.env):**
```
DATABASE_URL="postgresql://neondb_owner:npg_3sElyOTr7vMR@ep-curly-cherry-ahnzhy0c-pooler..."
```
✅ Demo admin exists

**Vercel Production:**
```
DATABASE_URL="<configured in Vercel dashboard>"
```
❌ Demo admin does NOT exist (needs to be seeded)

---

## Next Steps

1. Choose one of the three options above
2. Run the seed script against production database
3. Verify login works at https://disaster-recovery-seven.vercel.app/login
4. Update this document once completed
