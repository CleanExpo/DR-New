# Database Migration Runbook

**QUICK START**: Safe database migration in ~30 minutes (including testing and verification)

---

## Pre-Migration Checklist

```
☐ Migration script tested on staging
☐ Database backup created
☐ Rollback procedure prepared
☐ Team notified
☐ Maintenance window approved
☐ Monitoring configured
☐ Emergency contacts on standby
```

---

## Migration Planning

### Types of Migrations

**Safe Migrations** (can run during business hours):
- Add new column (non-critical)
- Add index
- Add new table
- Drop unused column
- Rename column (if application code already handles both names)

**Risky Migrations** (require maintenance window):
- Drop column
- Change column type
- Add NOT NULL column without default
- Drop table
- Constraint changes

**Very Risky Migrations** (careful testing required):
- Large table alterations (> 1GB)
- Bulk data changes
- Foreign key changes
- Schema reorganization

---

## Testing Migrations

### 1. Test on Staging (30 minutes before production)

**Step 1: Create Staging Backup**
```bash
# Restore latest production backup to staging
bash scripts/backup/restore-database.sh \
  s3://dr-platform-backups/database/latest.sql.gz \
  staging_test_db

# Expected: Database restored in ~30 minutes
```

**Step 2: Run Migration on Staging**
```bash
# Connect to staging database
export DATABASE_URL="postgresql://user:pass@staging-db:5432/staging_test_db"

# Check pending migrations
npm run migrate:status

# Output should show the new migration as pending
# Run migration
npm run migrate:deploy

# Expected: Migration completes without errors
# Output: "Migration completed: 20240115_add_audit_log_table"
```

**Step 3: Verify Migration Success**
```bash
# Check all migrations applied
npm run migrate:status
# Expected: No pending migrations

# Run data integrity checks
npm run db:check-integrity

# Expected: All checks pass
# Output: "✓ Foreign key constraints valid"
```

**Step 4: Verify Application Works**
```bash
# Restart staging application
kubectl rollout restart deployment/app-staging

# Test critical endpoints
curl https://api.staging.disasterrecovery.com.au/health
# Expected: 200 OK

# Run smoke tests
npm run test:smoke -- --target https://api.staging.disasterrecovery.com.au
# Expected: All tests pass
```

### 2. Test Rollback (5 minutes)

**Step 1: Rollback Migration**
```bash
# Rollback last migration
npm run migrate:rollback

# Expected: Migration rolled back
# Output: "Rollback completed: 20240115_add_audit_log_table"
```

**Step 2: Verify Rollback**
```bash
# Verify table gone (if that's what was added)
psql staging_test_db -c "\dt audit_log"
# Expected: no results

# Verify application still works after rollback
curl https://api.staging.disasterrecovery.com.au/health
# Expected: 200 OK
```

**Step 3: Re-apply Migration**
```bash
# Make sure migration works both ways
npm run migrate:deploy

# Verify again
npm run migrate:status
# Expected: Migration applied
```

### 3. Cleanup Staging

```bash
# Delete staging test database
psql postgres -c "DROP DATABASE staging_test_db;"

# Notify team: "Migration tested and verified ✓"
```

---

## Production Migration

### Phase 1: Pre-Migration (5 minutes)

**Step 1: Backup Production Database**
```bash
# Create pre-migration backup
bash scripts/backup/backup-database.sh

# Verify backup created
aws s3 ls s3://dr-platform-backups/database/ | tail -1
# Expected: Recent backup visible
```

**Step 2: Notify Team**
```bash
# Post to #incidents
echo "🔧 Database Migration Starting
Target database: production
Estimated duration: 15 minutes
Migration: 20240115_add_audit_log_table
Expected downtime: < 2 minutes

Maintenance window: 2024-01-15 02:00 UTC - 02:30 UTC"

# Alert on-call team
pagerduty alerts create --title "Database Migration Window" \
  --service prod-database
```

**Step 3: Enable Maintenance Mode**
```bash
# Option A: Kubernetes
kubectl set env deployment/app MAINTENANCE_MODE=true

# Option B: Application config
export MAINTENANCE_MODE=true

# Verify maintenance page shows
curl https://api.disasterrecovery.com.au/
# Expected: Maintenance page displays
```

### Phase 2: Run Migration (10-15 minutes)

**Step 1: Connect to Production Database**
```bash
# Verify connection
psql $DATABASE_URL -c "SELECT version();"
# Expected: PostgreSQL version info
```

**Step 2: Check Pending Migrations**
```bash
# List pending migrations
npm run migrate:status

# Expected output:
# Pending migrations:
# 20240115_add_audit_log_table.sql
```

**Step 3: Run Migration**
```bash
# Start migration
START_TIME=$(date +%s)

npm run migrate:deploy

# Record end time for log
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

# Expected output:
# Running migration: 20240115_add_audit_log_table.sql
# Migration completed successfully (12 seconds)
```

**Step 4: Verify Migration Results**
```bash
# Check migration was recorded
npm run migrate:status
# Expected: No pending migrations

# Verify new structure
psql $DATABASE_URL -c "\dt audit_log"
# Expected: Table exists

# Verify data integrity
psql $DATABASE_URL -c "
  SELECT COUNT(*) FROM information_schema.tables
  WHERE table_schema = 'public';"
# Expected: Correct table count
```

### Phase 3: Disable Maintenance Mode (2 minutes)

**Step 1: Disable Maintenance Mode**
```bash
# Option A: Kubernetes
kubectl set env deployment/app MAINTENANCE_MODE=false

# Option B: Application config
export MAINTENANCE_MODE=false
systemctl restart app
```

**Step 2: Verify Services Resume**
```bash
# Check API is responding
curl https://api.disasterrecovery.com.au/health
# Expected: 200 OK, status: "healthy"

# Monitor error rate
watch -n 2 'curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate'
# Expected: Error rate < 0.5%
```

### Phase 4: Post-Migration Verification (5 minutes)

**Step 1: Run Smoke Tests**
```bash
npm run test:smoke -- --target https://api.disasterrecovery.com.au

# Expected: All tests pass
# ✓ User login
# ✓ Create request
# ✓ View dashboard
# etc.
```

**Step 2: Verify Data Integrity**
```bash
# Run integrity checks
npm run db:check-integrity

# Expected output:
# ✓ Foreign key constraints valid
# ✓ Unique constraints valid
# ✓ Not null constraints valid
# ✓ Check constraints valid
```

**Step 3: Verify Application Logs**
```bash
# Check for migration-related errors
kubectl logs -l app=app --since=5m | grep -i error

# Expected: No migration errors
```

---

## Common Issues & Solutions

### Migration Hangs

**Symptoms**: Migration running for > 30 minutes on a < 1GB table

**Cause**: Long-running query blocking migration

**Solution**:
```bash
# Check active queries
psql $DATABASE_URL -c "
SELECT pid, query, state, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start ASC;"

# Kill long-running queries (if safe)
psql $DATABASE_URL -c "SELECT pg_terminate_backend(12345);"

# Retry migration
npm run migrate:deploy
```

### Migration Fails with Constraint Error

**Symptoms**: "Cannot add foreign key constraint"

**Solution**:
```bash
# Check what data violates constraint
psql $DATABASE_URL -c "
SELECT * FROM <table>
WHERE <column> NOT IN (SELECT id FROM <referenced_table>);"

# Fix data before retry
UPDATE <table> SET <column> = NULL WHERE <column> NOT IN (...);

# Retry migration
npm run migrate:deploy
```

### Out of Disk Space

**Symptoms**: "No space left on device"

**Solution**:
```bash
# Check available space
df -h

# Check table sizes
psql $DATABASE_URL -c "
SELECT schemaname, tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"

# Free up space by deleting old backups/logs
rm /var/log/postgresql/*.log

# Retry migration
npm run migrate:deploy
```

---

## Rollback Procedure

### If Migration Fails

```bash
# IMMEDIATE ACTION:
1. Stop the migration (Ctrl+C if running)
2. Rollback to previous state
   npm run migrate:rollback

3. Verify rollback
   npm run migrate:status
   # Expected: No pending migrations (old state)

4. Verify application works
   curl https://api.disasterrecovery.com.au/health

5. Disable maintenance mode
   kubectl set env deployment/app MAINTENANCE_MODE=false

# WITHIN 1 HOUR:
6. Investigate failure
   - Check migration script for errors
   - Check data validation rules
   - Check database constraints

7. Fix migration script
   - Revise problematic SQL
   - Test on staging again
   - Plan re-deployment

# COMMUNICATION:
8. Notify team of failure
9. Schedule retry for later
```

### If Application Breaks After Migration

```bash
# IMMEDIATE:
1. Enable maintenance mode
   kubectl set env deployment/app MAINTENANCE_MODE=true

2. Rollback migration
   npm run migrate:rollback

3. Restart application
   kubectl rollout restart deployment/app

4. Verify working
   curl https://api.disasterrecovery.com.au/health

5. Disable maintenance mode
   kubectl set env deployment/app MAINTENANCE_MODE=false

# ROOT CAUSE:
6. Check what went wrong
   - Migration correct but application code incompatible?
   - Data transformation issue?
   - Timing issue?

7. Fix application code or migration
8. Test again on staging
```

---

## Large Table Migrations

### Handling Multi-GB Tables

For migrations on very large tables (> 10GB), use online migration strategy:

```bash
# 1. Create new column WITHOUT constraint
ALTER TABLE large_table ADD COLUMN new_col VARCHAR(255);

# 2. Backfill data in batches
DO $$
DECLARE
  batch_size INT := 10000;
  total_rows INT;
  processed INT := 0;
BEGIN
  SELECT count(*) INTO total_rows FROM large_table;

  WHILE processed < total_rows LOOP
    UPDATE large_table
    SET new_col = old_col
    WHERE id > processed AND id <= processed + batch_size;

    processed := processed + batch_size;
    RAISE NOTICE 'Progress: % / %', processed, total_rows;
  END LOOP;
END $$;

# 3. Add constraint after backfill
ALTER TABLE large_table ADD CONSTRAINT unique_new_col UNIQUE (new_col);

# 4. Drop old column if needed
ALTER TABLE large_table DROP COLUMN old_col;
```

---

## Documentation & Logging

### Migration Log

```
Date             Migration Name                  Duration  Status  Downtime
----             ------------------              --------  ------  --------
2024-01-15       add_audit_log_table             12 sec    ✓       2 min
2024-01-14       add_payment_status_tracking     5 sec     ✓       1 min
2024-01-13       add_contractor_reputation       8 sec     ✓       1 min
```

### Document Each Migration

```
Migration: 20240115_add_audit_log_table
Purpose: Add audit logging table for security tracking
Testing: ✓ Tested on staging
Risk Level: Low (new table, no data changes)
Rollback Time: < 2 seconds
Downtime Required: < 2 minutes (cache clear)
Estimated Impact: None (background feature)
```

---

## Checklist

```
PLANNING:
☐ Migration type identified (safe/risky/very risky)
☐ Risk assessment complete
☐ Rollback procedure prepared

TESTING (STAGING):
☐ Migration tested on staging
☐ Application works after migration
☐ Rollback tested
☐ Data integrity verified

PRE-PRODUCTION:
☐ Backup created
☐ Team notified
☐ Maintenance window approved
☐ Monitoring ready

EXECUTION:
☐ Maintenance mode enabled
☐ Migration started
☐ Migration completed successfully
☐ Maintenance mode disabled
☐ Smoke tests pass
☐ Error rate normal

POST-MIGRATION:
☐ Verification complete
☐ Team notified
☐ Migration logged
☐ Backup retained (7+ days)
```

---

**Last Updated**: 2024-01-15
**Next Review**: 2024-02-15
**Contact**: Database Team
