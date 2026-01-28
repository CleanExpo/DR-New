# Database Connection Fix Guide

## Problem Identified

Your `DIRECT_URL` in `.env` is using an **old Supabase format** that is no longer accessible:
```
❌ OLD: db.lccqasmurmsisnnjqqmr.supabase.co:5432
```

Supabase has migrated to a new connection format using regional poolers.

## Solution

Update both connection strings in `apps/web/.env`:

### 1. DATABASE_URL (Session Pooler)
**Current** (in your .env):
```bash
DATABASE_URL="postgresql://postgres.lccqasmurmsisnnjqqmr:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

**Should be** (note port 5432, NOT 6543):
```bash
DATABASE_URL="postgresql://postgres.lccqasmurmsisnnjqqmr:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:5432/postgres"
```

### 2. DIRECT_URL (Direct Connection)
**Current** (in your .env) - BROKEN:
```bash
DIRECT_URL="postgresql://postgres.[YOUR-PASSWORD]@db.lccqasmurmsisnnjqqmr.supabase.co:5432/postgres"
```

**Should be** (use Transaction pooler for migrations):
```bash
DIRECT_URL="postgresql://postgres.lccqasmurmsisnnjqqmr:[YOUR-PASSWORD]@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
```

## Key Differences

| Connection Type | Port | Pgbouncer | Use Case |
|----------------|------|-----------|----------|
| **DATABASE_URL** (Session pooler) | 5432 | No | Application queries (default) |
| **DIRECT_URL** (Transaction pooler) | 6543 | Yes | Migrations, admin operations |

## How to Update

### Option 1: Manual Update (Fastest)

1. Open `apps/web/.env` in your editor
2. Find the two lines starting with `DATABASE_URL=` and `DIRECT_URL=`
3. Replace them with the corrected versions above
4. **Important**: Replace `[YOUR-PASSWORD]` with your actual database password

### Option 2: Get Connection Strings from Supabase Dashboard

1. Go to: https://supabase.com/dashboard/project/lccqasmurmsisnnjqqmr/settings/database
2. Click "Connect" button
3. **For DATABASE_URL**:
   - Select "Session pooler"
   - Copy the connection string
4. **For DIRECT_URL**:
   - Select "Transaction pooler" (NOT "Direct connection")
   - Copy the connection string

## Finding Your Password

If you don't have your database password:

1. Go to: https://supabase.com/dashboard/project/lccqasmurmsisnnjqqmr/settings/database
2. Scroll to "Database password"
3. Click "Reset database password" if needed
4. Copy the new password and update both connection strings

## Testing the Fix

After updating the `.env` file, test the connection:

```bash
cd apps/web
npx prisma db execute --stdin <<< "SELECT 1;"
```

If successful, you should see:
```
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database...
```

If it still fails, the password might be incorrect.

---

## Quick Checklist

- [ ] Updated DATABASE_URL with port 5432 (Session pooler)
- [ ] Updated DIRECT_URL with port 6543 (Transaction pooler)
- [ ] Replaced `[YOUR-PASSWORD]` with actual password in both URLs
- [ ] Tested connection with `npx prisma db execute`
- [ ] Connection successful

**Once this is done, let me know and I'll apply the missing RLS policies!**
