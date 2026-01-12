# Database Recovery Runbook

**QUICK START** (First 5 minutes):
1. Verify database is down: `psql $DATABASE_URL -c "SELECT 1;"` (should fail)
2. List available backups: `aws s3 ls s3://dr-platform-backups/database/ --region us-east-1`
3. Declare incident in #incidents Slack
4. Follow "Full Restore Procedure" below

---

## Quick Reference

| Action | Command | Time |
|--------|---------|------|
| Check backup status | `aws s3 ls s3://dr-platform-backups/database/` | 1 min |
| Verify backup | `bash scripts/backup/verify-backup.sh <file>` | 5 min |
| Dry run restore | `bash scripts/backup/restore-database.sh <file> --dry-run` | 10 min |
| Actual restore | `bash scripts/backup/restore-database.sh <file>` | 45 min |
| Verify after | `psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"User\";"` | 2 min |
| **Total Time** | | **~60 min** |

---

## Scenario: Database Completely Down

### Symptoms
- Application unable to connect to database
- Sentry shows 100% error rate
- Connection refused errors in logs
- Health checks fail

### Diagnosis (5 minutes)

**Step 1: Verify database connectivity**
```bash
# Try to connect
psql $DATABASE_URL -c "SELECT 1;" 2>&1 | tee /tmp/db-test.log

# Errors to look for:
# - "could not connect to server" → Network issue or database down
# - "FATAL: remaining connection slots reserved" → Connection limit reached
# - "FATAL: database "production" does not exist" → Database doesn't exist
```

**Step 2: Check AWS RDS status**
```bash
# Get database instance details
aws rds describe-db-instances \
  --db-instance-identifier production-db \
  --region us-east-1 \
  --query 'DBInstances[0].[DBInstanceStatus,DBInstanceIdentifier,Engine,AllocatedStorage,Endpoint.Address,DBPortNumber]' \
  --output table

# Look for:
# Status: "available" (good) or "failed", "incompatible-parameters" (bad)
# Storage: Has it exceeded allocated storage?
```

**Step 3: Check network connectivity**
```bash
# If using bastion host:
ssh bastion "nc -zv prod-db.example.com 5432"

# If direct access:
nc -zv prod-db.example.com 5432

# Should see: "succeeded!" or "open"
```

**Step 4: Check database logs (if still accessible)**
```bash
# Get recent database logs
aws rds describe-db-log-files \
  --db-instance-identifier production-db \
  --query 'DescribeDBLogFiles[0:10]'

# Get specific log
aws rds download-db-log-file-portion \
  --db-instance-identifier production-db \
  --log-file-name error/postgresql.log \
  --starting-token 0 \
  --max-items 100
```

### Decision Tree

```
Can you connect to database?
│
├─ YES:
│  ├─ Database is accessible
│  └─ Problem is likely:
│     ├─ Connection pool exhausted → See "Connection Pool" section
│     ├─ Slow queries → Kill long-running queries
│     └─ Other application issue → Check app logs
│
└─ NO: Database is down
   ├─ AWS RDS shows "available"?
   │  ├─ YES → Network issue
   │  │  ├─ Check security groups
   │  │  ├─ Check network ACLs
   │  │  └─ Check routing
   │  │
   │  └─ NO → Database failed
   │     ├─ If recent deployment → Rollback
   │     └─ Otherwise → Restore from backup
   │
   └─ Decision: Restore from backup → Continue below
```

### Full Restore Procedure

**Prerequisites**:
- AWS credentials configured
- Access to backup S3 bucket
- Application stopped or read-only
- Downtime window approved

**Step 1: Get List of Backups** (2 min)
```bash
# List available backups
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1 | tail -10

# Output looks like:
# 2024-01-15 02:00:00   1234567890 dr-platform-backup-20240115_020000.sql.gz
# 2024-01-14 02:00:00   1234567890 dr-platform-backup-20240114_020000.sql.gz
# ...
```

**Step 2: Choose Backup** (1 min)
```bash
# Use most recent backup (unless specific recovery point needed)
BACKUP_FILE="dr-platform-backup-20240115_020000.sql.gz"
BACKUP_PATH="s3://dr-platform-backups/database/${BACKUP_FILE}"

echo "Selected backup: $BACKUP_FILE"
```

**Step 3: Dry Run Restore** (10-15 min)
```bash
# Verify backup before actual restore
bash scripts/backup/restore-database.sh "$BACKUP_PATH" --dry-run

# Expected output:
# ✓ Backup file is valid gzip
# ✓ Backup file size: 1.2G
# ✓ Backup contains SQL dump headers
# ✓ Found 45 tables in backup
# ✓ Critical table found: User
# Status: PASSED

# If it fails:
# → Download backup and verify locally
# → Try with different backup
# → Contact infrastructure team
```

**Step 4: Stop Application** (2 min)
```bash
# Stop accepting new connections
kubectl scale deployment app --replicas=0

# OR if not using Kubernetes:
systemctl stop application

# Verify no connections to database
psql postgres -c "SELECT COUNT(*) FROM pg_stat_activity WHERE datname = 'production';"
# Should return 0 or very close to 0
```

**Step 5: Perform Restore** (30-60 min)
```bash
# This is the main recovery step
bash scripts/backup/restore-database.sh "$BACKUP_PATH"

# When prompted, type: RESTORE
# (This is a safety measure to prevent accidental restores)

# Monitor the logs in another terminal:
tail -f scripts/backup/backups/restore-$(date +%Y%m%d)*.log

# Expected steps:
# - Safety backup created
# - Connections terminated
# - Database dropped
# - New database created
# - Backup restored (most time-consuming step)
# - Verification complete

# DO NOT INTERRUPT - Let it complete fully
```

**Step 6: Verify Restoration** (10 min)
```bash
# Check database connectivity
psql $DATABASE_URL -c "SELECT 1;" && echo "✓ Connected"

# Verify table counts
psql $DATABASE_URL -c "
SELECT COUNT(*) as table_count
FROM information_schema.tables
WHERE table_schema = 'public';"
# Should show: 45 (or whatever your table count is)

# Check critical tables have data
psql $DATABASE_URL -c "
SELECT
  'User'::text as table_name, COUNT(*) as row_count FROM \"User\"
UNION ALL
SELECT 'Payment'::text, COUNT(*) FROM \"Payment\"
UNION ALL
SELECT 'ServiceRequest'::text, COUNT(*) FROM \"ServiceRequest\"
UNION ALL
SELECT 'Contractor'::text, COUNT(*) FROM \"Contractor\";"

# Expected: All should show reasonable row counts

# Run data integrity checks
psql $DATABASE_URL < scripts/validation/integrity-checks.sql

# Look for any constraint violations
```

**Step 7: Restart Application** (5 min)
```bash
# Start application instances
kubectl scale deployment app --replicas=3

# OR if not using Kubernetes:
systemctl start application

# Wait for health checks to pass
for i in {1..30}; do
  if curl -f http://localhost:3000/health > /dev/null 2>&1; then
    echo "✓ Application healthy"
    break
  fi
  echo "Waiting for application ($i/30)..."
  sleep 2
done

# Verify error rate drops
curl http://localhost:3000/metrics | grep error_rate
# Should be close to 0%
```

**Step 8: Monitor for Stability** (5-10 min)
```bash
# Watch error rate
watch -n 2 'curl -s http://localhost:3000/metrics | grep -E "error_rate|api_latency"'

# Check application logs for errors
kubectl logs -f deployment/app --tail=50 | grep -i error

# Verify key endpoints
curl https://api.disasterrecovery.com.au/health
curl https://api.disasterrecovery.com.au/api/user/me

# If all looks good, declare incident resolved
```

### Post-Restore Steps

**Within 1 hour**:
1. Notify customers (if affected) with timeline and status
2. Create new backup immediately
3. Verify backup is working

**Within 24 hours**:
1. Investigate root cause
2. Implement preventative measures
3. Update runbook if needed
4. Schedule post-mortem meeting

**Within 1 week**:
1. Complete post-mortem
2. Implement agreed-upon fixes
3. Schedule next DR drill

---

## Scenario: Data Corruption Detected

### Symptoms
- Invalid data in database
- Data validation failures
- Business logic errors (e.g., negative amounts)
- Inconsistent state (orders without customers)

### Investigation (10-20 minutes)

**Step 1: Identify Corruption**
```bash
# Run integrity checks
psql $DATABASE_URL < scripts/validation/integrity-checks.sql

# Check for common issues
psql $DATABASE_URL -c "
-- Find rows with invalid amounts
SELECT id, amount, created_at FROM \"Payment\"
WHERE amount < 0 OR amount > 1000000
LIMIT 10;

-- Find orphaned records
SELECT booking_id FROM \"Booking\" b
WHERE NOT EXISTS (SELECT 1 FROM \"ServiceRequest\" sr WHERE sr.id = b.service_request_id);
"

# Find when corruption started
psql $DATABASE_URL -c "
SELECT created_at FROM \"Payment\"
WHERE amount < 0
ORDER BY created_at ASC
LIMIT 1;"
```

**Step 2: Assess Scope**
- How many records affected?
- How long has corruption existed?
- Is it spreading?
- Are current transactions OK?

### Decision: Fix vs Restore

**Fix in place if**:
- < 10 affected records
- Easy to identify and fix
- Corruption not spreading
- Low risk of other corruption

**Restore from backup if**:
- > 10 affected records
- Hard to identify cause
- Widespread corruption
- Recent good backup available

### Fix in Place Procedure (30 min)

**Step 1: Identify and Document** (5 min)
```bash
# Export corrupted records
psql $DATABASE_URL -c "
SELECT id, data FROM \"Payment\"
WHERE amount < 0;" > /tmp/corrupted_records.csv

# Document what's wrong
# Email to team for review before applying fix
```

**Step 2: Backup Database** (5 min)
```bash
# Create emergency backup before applying fix
bash scripts/backup/backup-database.sh

# Wait for completion
```

**Step 3: Fix Corrupted Data** (10 min)
```bash
# Use carefully crafted UPDATE statements
# ALWAYS test on staging first!

# Example: Remove invalid records
psql $DATABASE_URL -c "
BEGIN;
DELETE FROM \"Payment\" WHERE amount < 0;
ROLLBACK;  -- First test with ROLLBACK"

# If looks good, run with COMMIT:
psql $DATABASE_URL -c "
BEGIN;
DELETE FROM \"Payment\" WHERE amount < 0;
COMMIT;"

# Verify fix
psql $DATABASE_URL -c "
SELECT COUNT(*) FROM \"Payment\" WHERE amount < 0;
-- Should return 0
"
```

**Step 4: Verify System** (5 min)
```bash
# Run integrity checks again
psql $DATABASE_URL < scripts/validation/integrity-checks.sql

# Monitor application errors
curl http://localhost:3000/metrics | grep error_rate
```

### Restore from Backup Procedure

Follow "Full Restore Procedure" above, but:

1. **Find backup from before corruption**:
```bash
# If corruption detected at 14:00 UTC
# Use backup from 02:00 UTC (before corruption)

# List backups with timestamps
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1 | grep "2024011[34]"
```

2. **Identify lost data**:
```bash
# After restore, identify what was lost
# Manually recreate if possible

# Query which transactions happened after restore point
SELECT * FROM audit_log WHERE created_at > '2024-01-15 02:00:00 UTC';
```

---

## Scenario: Partial Data Loss / Need to Recover Specific Records

### Procedure

**Step 1: Restore to Staging Database** (30 min)
```bash
# Create separate database for point-in-time recovery
psql postgres -c "DROP DATABASE IF EXISTS staging_recovery;" 2>/dev/null || true
psql postgres -c "CREATE DATABASE staging_recovery;"

# Restore backup to staging
bash scripts/backup/restore-database.sh \
  s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz \
  staging_recovery

# (When prompted, confirm restore)
```

**Step 2: Query Staging to Get Lost Data** (5 min)
```bash
# Find records that existed in staging but not in production
psql staging_recovery -c "
SELECT * FROM \"User\" u
WHERE u.id = 'user-123-from-staging';" > /tmp/lost_record.sql
```

**Step 3: Migrate Data Back** (10 min)
```bash
# Use insert/update to restore lost records
# Test carefully in staging first!

# Export data
psql staging_recovery -c "
SELECT 'INSERT INTO user VALUES (...);'
FROM \"User\" u
WHERE u.id IN ('list-of-lost-ids');" > /tmp/restore_records.sql

# Apply to production after verification
psql $DATABASE_URL < /tmp/restore_records.sql
```

**Step 4: Cleanup Staging** (2 min)
```bash
psql postgres -c "DROP DATABASE staging_recovery;"
```

---

## Connection Pool Exhaustion

### Symptoms
- "remaining connection slots reserved for non-replication superuser"
- Application can't connect to database
- Other connections work fine

### Quick Fix (5-10 min)

**Step 1: Check Connection Pool Status**
```bash
psql $DATABASE_URL -c "
SELECT count(*) as connection_count
FROM pg_stat_activity
WHERE datname = 'production';"
```

**Step 2: Kill Idle Connections**
```bash
psql $DATABASE_URL -c "
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE datname = 'production'
  AND state = 'idle'
  AND query_start < now() - interval '5 minutes';"
```

**Step 3: Increase Connection Limit** (if needed)
```bash
# Update environment variable
export POSTGRES_POOL_MAX=75

# Restart app instances
kubectl rollout restart deployment/app
```

---

## Long-Running Queries / Database Locked

### Symptoms
- Queries hang
- Database appears to lock
- Performance degrades slowly

### Procedure

**Step 1: Find Long-Running Queries**
```bash
psql $DATABASE_URL -c "
SELECT pid, now() - pg_stat_activity.query_start as duration, query, state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';"
```

**Step 2: Kill Problematic Queries**
```bash
# Kill specific query (replace PID)
psql $DATABASE_URL -c "SELECT pg_terminate_backend(12345);"

# Or kill all idle queries in transaction
psql $DATABASE_URL -c "
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle in transaction'
  AND query_start < now() - interval '1 minute';"
```

**Step 3: Identify Root Cause**
```bash
# Check slow query log
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 10;"

# Check for index issues
psql $DATABASE_URL -c "
SELECT schemaname, tablename, indexname
FROM pg_indexes
WHERE schemaname != 'pg_catalog'
ORDER BY tablename;"
```

---

## Checklist: Database Recovery

```
☐ Verify database is actually down
☐ Check AWS RDS instance status
☐ Check network connectivity
☐ List available backups
☐ Select most recent (or specific) backup
☐ Dry run restore (verify backup)
☐ Stop application instances
☐ Declare incident in #incidents
☐ Perform restore (30-60 min)
☐ Verify restoration (data integrity checks)
☐ Restart application
☐ Monitor error rate (5-10 min)
☐ Declare incident resolved
☐ Create new backup immediately
☐ Schedule post-mortem
☐ Document lessons learned
```

---

**This runbook was last tested**: 2024-01-15
**Next test date**: 2024-02-15
**Contact for questions**: DBA team
