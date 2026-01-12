# Database Backup Scripts

This directory contains automated backup and restoration scripts for the Disaster Recovery NRPG Platform PostgreSQL database.

## Quick Start

### Prerequisites
- PostgreSQL client tools (`pg_dump`, `psql`)
- AWS CLI (for S3 operations)
- AWS credentials with S3 access
- Bash shell

### Installation

1. Make scripts executable:
```bash
chmod +x scripts/backup/*.sh
```

2. Set environment variables:
```bash
export DATABASE_URL="postgresql://user:password@host:5432/dbname"
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export S3_BACKUP_BUCKET="dr-platform-backups"
export BACKUP_RETENTION_DAYS=30
```

## Scripts

### 1. backup-database.sh
**Automated database backup to S3**

Creates a compressed backup of the PostgreSQL database and uploads to AWS S3 for safe storage.

**Usage**:
```bash
./backup-database.sh
```

**What it does**:
1. Connects to PostgreSQL database
2. Creates logical dump using `pg_dump`
3. Compresses with gzip (~80% size reduction)
4. Uploads to S3 with metadata
5. Verifies S3 upload
6. Cleans up old local backups (7+ days)
7. Cleans up old S3 backups (30+ days)

**Output**:
- Compressed backup file: `dr-platform-backup-YYYYMMDD_HHMMSS.sql.gz`
- Metadata file: `dr-platform-backup-YYYYMMDD_HHMMSS.sql.gz.metadata`
- Log file: `backups/backup-YYYYMMDD_HHMMSS.log`

**Timing**:
- Typically takes 20-30 minutes for 1-2 GB database
- Non-blocking (doesn't lock production database)
- Safe to run while application is running

**Example**:
```bash
$ DATABASE_URL="postgresql://..." \
  AWS_ACCESS_KEY_ID="..." \
  AWS_SECRET_ACCESS_KEY="..." \
  S3_BACKUP_BUCKET="dr-platform-backups" \
  ./backup-database.sh

[2024-01-15 02:00:00] Starting Database Backup
[2024-01-15 02:00:00] Database: prod-db.example.com:5432/production
[2024-01-15 02:02:15] Creating database backup...
[2024-01-15 02:02:15] Backup created successfully: 1.2G
[2024-01-15 02:15:30] Successfully uploaded to s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz
[2024-01-15 02:15:30] Backup Completed Successfully
```

### 2. verify-backup.sh
**Verify backup integrity and restorability**

Validates that a backup is complete and can be successfully restored.

**Usage**:
```bash
# Verify local backup
./verify-backup.sh dr-platform-backup-20240115_020000.sql.gz

# Verify S3 backup
./verify-backup.sh s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz

# Verify with test restore (requires DATABASE_URL)
TEST_RESTORE=true ./verify-backup.sh dr-platform-backup-20240115_020000.sql.gz
```

**What it checks**:
1. **File integrity** - Validates gzip compression
2. **Content validation** - Verifies SQL dump headers
3. **Table count** - Checks number of tables
4. **Critical tables** - Ensures core tables present
5. **Optional restore test** - Full restore to test database

**Output**:
```
✓ Backup file is valid gzip
✓ Backup file size: 1.2G
✓ Backup contains SQL dump headers
✓ Found 45 tables in backup
✓ Critical table found: User
✓ Critical table found: Payment
...
✓ Restore test successful
✓ Test database has 45 tables
Status: PASSED
```

### 3. restore-database.sh
**Restore database from backup**

Restores the production database from a backup file (local or S3).

**⚠️ WARNING**: This script overwrites the current database! Use with extreme caution.

**Usage**:
```bash
# Dry run (verify without changes)
./restore-database.sh dr-platform-backup-20240115_020000.sql.gz --dry-run

# Actual restore from local file
./restore-database.sh dr-platform-backup-20240115_020000.sql.gz

# Restore from S3
./restore-database.sh s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz
```

**What it does**:
1. Validates backup file integrity
2. Creates safety backup of current database
3. Terminates existing connections
4. Drops and recreates database
5. Restores from backup
6. Verifies restoration
7. Provides detailed logging

**Safety Features**:
- **Dry run mode**: Test restore without changes
- **Manual confirmation**: Requires user to type "RESTORE"
- **Safety backup**: Automatic backup before restore
- **Detailed logging**: Full restore log for troubleshooting

**Output**:
```
[2024-01-15 03:00:00] Database Restoration Script
[2024-01-15 03:00:00] Dry Run: false
[2024-01-15 03:00:01] Target Database: prod-db.example.com:5432/production
[2024-01-15 03:00:05] Backup file: dr-platform-backup-20240115_020000.sql.gz
[2024-01-15 03:00:05] Backup size: 1.2G
[2024-01-15 03:00:08] ✓ Backup file integrity verified
[2024-01-15 03:00:08] DANGER: This will OVERWRITE the current database!
Type 'RESTORE' to continue (or anything else to cancel):
```

**Restore Procedure**:
1. Type `RESTORE` when prompted to confirm
2. Safety backup is automatically created
3. Existing connections are terminated
4. Database is restored (30-45 minutes for 1-2 GB)
5. Verification runs automatically

**Example Complete Restoration**:
```bash
$ DATABASE_URL="postgresql://..." ./restore-database.sh s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz

[2024-01-15 03:00:00] Database Restoration Script
[2024-01-15 03:00:05] Target Database: prod-db.example.com:5432/production
[2024-01-15 03:00:08] Backup file: dr-platform-backup-20240115_020000.sql.gz
[2024-01-15 03:00:08] DANGER: This will OVERWRITE the current database!
[2024-01-15 03:00:08] Type 'RESTORE' to continue (or anything else to cancel):
RESTORE
[2024-01-15 03:00:09] User confirmed restore. Proceeding...
[2024-01-15 03:00:15] ✓ Safety backup created: safety-backup-20240115_030000.sql.gz
[2024-01-15 03:00:20] ✓ Dropping current database...
[2024-01-15 03:00:21] ✓ Creating new database...
[2024-01-15 03:00:22] Restoring database from backup...
[2024-01-15 03:44:12] ✓ Database restore completed successfully
[2024-01-15 03:44:12] Duration: 2630 seconds
[2024-01-15 03:44:15] ✓ Restored database has 45 tables
[2024-01-15 03:44:15] Database Restore Completed Successfully
```

## Automated Backup Schedule

Backups are automatically scheduled via GitHub Actions:

**Configuration**: `.github/workflows/backup.yml`

**Schedule**: Daily at 2 AM UTC (10 AM AEDT)

**Jobs**:
1. **backup** - Create and upload backup (30 min)
2. **verify** - Verify backup integrity (20 min)
3. **cleanup** - Remove old backups (5 min)

**Required Secrets** (GitHub):
```
AWS_BACKUP_ACCESS_KEY_ID
AWS_BACKUP_SECRET_ACCESS_KEY
DATABASE_URL_PROD
S3_BACKUP_BUCKET
SLACK_WEBHOOK_URL (optional)
```

## Storage & Retention

### Local Storage
- **Location**: `scripts/backup/backups/`
- **Retention**: 7 days
- **Cleanup**: Automatic, daily at backup time

### S3 Storage
- **Bucket**: `dr-platform-backups`
- **Path**: `s3://dr-platform-backups/database/`
- **Retention**: 30 days (configured)
- **Storage class**: STANDARD_IA (cost-optimized after 7 days)
- **Replication**: Cross-region replication to standby region

### Cost Estimates
- 30 backups × 1.2 GB = ~$0.50/month
- Cross-region replication = ~$1.50/month
- **Total**: ~$2-3/month for 30 days retention

## Troubleshooting

### Backup Fails: "Connection refused"
**Cause**: Database host not accessible

**Fix**:
1. Verify DATABASE_URL is correct
2. Check network connectivity to database
3. Verify database is running
4. Check firewall rules

### Backup Fails: "Permission denied"
**Cause**: Insufficient database or AWS permissions

**Fix**:
1. Verify database user has backup permissions
2. Verify AWS credentials are valid
3. Verify S3 bucket access permissions

### Restore Fails: "Database still has connections"
**Cause**: Other processes connected to database

**Fix**:
- Script automatically terminates connections
- If fails, manually terminate connections:
```sql
SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'production'
AND pid <> pg_backend_pid();
```

### Restore Takes Too Long (> 2 hours)
**Cause**: Large database or slow storage

**Fix**:
1. Use machine with SSD storage
2. Increase database resources during restore
3. Restore to staging first if possible

### S3 Upload Fails
**Cause**: Network issues or AWS credentials invalid

**Fix**:
1. Verify AWS credentials
2. Test AWS CLI: `aws s3 ls s3://dr-platform-backups/`
3. Check internet connectivity
4. Verify S3 bucket exists and is accessible

## Testing Backups

### Monthly Restore Test
Run on first Monday of each month:

```bash
# 1. Get latest backup
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1 | tail -1

# 2. Download (if not using S3 path)
aws s3 cp s3://dr-platform-backups/database/<backup-file> ./

# 3. Verify with test restore
TEST_RESTORE=true ./verify-backup.sh <backup-file>

# 4. Run data integrity checks
psql staging_db -c "SELECT COUNT(*) FROM \"User\";"
```

### Before Major Deployments
Always create and verify a backup:

```bash
# Create backup
./backup-database.sh

# Wait for completion...

# Verify backup
./verify-backup.sh <latest-backup-file>
```

## Documentation

- **Full Backup Strategy**: [docs/backup-strategy.md](../../docs/backup-strategy.md)
- **Disaster Recovery Plan**: [docs/disaster-recovery.md](../../docs/disaster-recovery.md)
- **PostgreSQL Backup**: https://www.postgresql.org/docs/current/backup.html
- **AWS S3 Best Practices**: https://docs.aws.amazon.com/AmazonS3/latest/userguide/BestPractices.html

## Support

For issues or questions:
1. Check logs in `scripts/backup/backups/`
2. Review troubleshooting section above
3. Consult disaster recovery documentation
4. Contact infrastructure team

---

**Last Updated**: 2024-01-15
**Maintainer**: Infrastructure Team
