# Database Backup & Disaster Recovery Strategy

## Executive Summary

This document outlines the automated backup and disaster recovery procedures for the Disaster Recovery NRPG Platform. The strategy ensures business continuity with:

- **RTO (Recovery Time Objective)**: 1 hour maximum
- **RPO (Recovery Point Objective)**: 15 minutes maximum data loss
- **Daily automated backups** with 30-day retention
- **Geographic redundancy** with cross-region S3 replication
- **Automated verification** of backup integrity

---

## Backup Architecture

### Components

```
Production Database (PostgreSQL)
    ↓
Daily Backup Process (2 AM UTC)
    ↓
Local Backup Storage (7 days)
    ↓
AWS S3 Primary (30 days, us-east-1)
    ↓
S3 Cross-Region Replication (Standby region)
    ↓
Backup Verification Job
    ↓
Slack Notification
```

### Backup Schedule

| Backup Type | Frequency | Retention | Location |
|-------------|-----------|-----------|----------|
| Automated | Daily at 2 AM UTC | 30 days | S3 (us-east-1) |
| Manual | On-demand | 30 days | S3 (us-east-1) |
| Pre-deploy | Before major releases | 30 days | S3 (us-east-1) |
| Ad-hoc | During emergencies | Indefinite | S3 + local |

### Storage Configuration

**AWS S3 Bucket**: `dr-platform-backups`

```
s3://dr-platform-backups/
├── database/
│   ├── dr-platform-backup-20240115_020000.sql.gz
│   ├── dr-platform-backup-20240115_020000.sql.gz.metadata
│   ├── dr-platform-backup-20240114_020000.sql.gz
│   └── ... (30 days of backups)
└── configs/
    └── environment-backup-20240115_020000.tar.gz
```

**S3 Lifecycle Policy**:
- Transition to `STANDARD_IA` after 7 days (cost optimization)
- Delete after 30 days (retention policy)
- Enable versioning for additional protection

---

## RTO & RPO Targets

### Recovery Time Objective (RTO): 1 Hour Maximum

**Breakdown**:
- Database restore: 30-45 minutes (depends on database size)
- DNS/traffic failover: 5-10 minutes
- Verification and health checks: 10-15 minutes
- Total maximum: 60 minutes

**Phases**:
1. **Alert received** (0 minutes)
   - Monitoring detects database issue
   - Incident commander notified

2. **Decision made** (5 minutes)
   - Assess severity
   - Determine if restore needed
   - Approve restore procedure

3. **Backup download** (5-10 minutes)
   - Download latest verified backup from S3
   - Verify backup integrity

4. **Database restore** (30-45 minutes)
   - Drop existing database
   - Restore from backup
   - Run migrations if needed

5. **Verification** (10 minutes)
   - Connect to restored database
   - Verify table counts and data
   - Run health checks

6. **Application restart** (5 minutes)
   - Point application to new database
   - Restart services
   - Verify connectivity

### Recovery Point Objective (RPO): 15 Minutes Maximum Data Loss

**Approach**:
- Daily automated backups (24-hour RPO worst case)
- Combined with automated transaction logging
- Point-in-time recovery capability

**Data Loss Scenarios**:
- Last backup + up to 24 hours of transactions from logs
- WAL (Write-Ahead Logs) enable replay to specific point in time
- Redis caching layer minimizes impact for recent operations

---

## Backup Procedures

### Automated Daily Backup

**Trigger**: GitHub Actions workflow at 2 AM UTC daily

**Process**:
1. **Snapshot** - pg_dump creates logical backup
2. **Compress** - gzip compression (~80% size reduction)
3. **Upload** - S3 with STANDARD_IA storage class
4. **Verify** - Integrity check with gzip -t
5. **Metadata** - Store backup metadata (timestamp, size, tables)
6. **Cleanup** - Remove backups older than 30 days
7. **Notify** - Slack notification with status

**Script**: `scripts/backup/backup-database.sh`

```bash
# Manual execution
DATABASE_URL="postgresql://..." \
AWS_ACCESS_KEY_ID="..." \
AWS_SECRET_ACCESS_KEY="..." \
S3_BACKUP_BUCKET="dr-platform-backups" \
bash scripts/backup/backup-database.sh
```

**Timing**:
- 2 AM UTC chosen for low-traffic period
- Parallel with scheduled maintenance window
- Non-blocking (doesn't lock application database)

### Backup Verification

**Trigger**: After each backup completes

**Verification Steps**:
1. **File integrity** - Verify gzip compression
2. **Content validation** - Check SQL headers and structure
3. **Table count** - Verify all critical tables present
4. **Metadata check** - Validate backup metadata
5. **Optional restore test** - Full restore to test database (daily on staging)

**Script**: `scripts/backup/verify-backup.sh`

```bash
# Verify local backup
bash scripts/backup/verify-backup.sh dr-platform-backup-20240115_020000.sql.gz

# Verify S3 backup
bash scripts/backup/verify-backup.sh s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz

# Verify with test restore
TEST_RESTORE=true bash scripts/backup/verify-backup.sh <backup-file>
```

### Manual Backup

**When to use**:
- Before major deployments
- Before data migrations
- Before system upgrades
- During emergency response

**Procedure**:
```bash
# Export DATABASE_URL and AWS credentials
export DATABASE_URL="..."
export AWS_ACCESS_KEY_ID="..."
export AWS_SECRET_ACCESS_KEY="..."

# Run manual backup
bash scripts/backup/backup-database.sh

# Verify
bash scripts/backup/verify-backup.sh <backup-filename>
```

---

## Restoration Procedures

### Full Database Restore

**When to use**:
- Complete database corruption
- Accidental data deletion
- Ransomware/security incident
- Infrastructure failure

**Procedure**:

```bash
# 1. Get list of available backups
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1

# 2. Download backup (or use S3 path)
aws s3 cp s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz ./

# 3. Dry run (verify without modifying)
DATABASE_URL="postgresql://..." bash scripts/backup/restore-database.sh \
  dr-platform-backup-20240115_020000.sql.gz --dry-run

# 4. Perform actual restore (will prompt for confirmation)
DATABASE_URL="postgresql://..." bash scripts/backup/restore-database.sh \
  dr-platform-backup-20240115_020000.sql.gz

# 5. Verify restoration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"User\";"
```

**Safety Features**:
- Dry-run mode for testing without changes
- Manual confirmation required (type "RESTORE" to proceed)
- Automatic safety backup of current database before restore
- Detailed restore logging

### Point-in-Time Recovery (PITR)

**Prerequisites**:
- PostgreSQL continuous archiving enabled
- WAL files retained and available
- Backup from before target time

**Procedure**:
1. Restore latest backup
2. Configure recovery target time
3. Replay WAL files up to target time

```bash
# PostgreSQL PITR procedure
# 1. Stop application and clear connections
psql -d postgres -c "ALTER DATABASE production_db SET datistemplate = true;"
psql -d postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity
  WHERE datname = 'production_db' AND pid <> pg_backend_pid();"

# 2. Restore base backup
gzip -cd backup.sql.gz | psql

# 3. Create recovery.conf
cat > $PGDATA/recovery.conf <<EOF
restore_command = 'cp /archive/wal_files/%f %p'
recovery_target_time = '2024-01-15 12:00:00 UTC'
recovery_target_timeline = 'latest'
EOF

# 4. Start PostgreSQL
pg_ctl start -D $PGDATA

# 5. Verify recovery state
psql -c "SELECT now();"  # Should show recovery completed
```

---

## Disaster Recovery Plan

### Disaster Scenarios & Response

#### Scenario 1: Database Connectivity Lost
**Severity**: P1 (Immediate action required)

**Detection**: Monitoring alert

**Response Timeline**:
- 0-5 min: Alert and page on-call engineer
- 5-10 min: Assess if database is down or network issue
- 10-30 min: If database down, initiate restore
- 30-60 min: Complete restore and verify

**Procedure**: See "Full Database Restore" above

#### Scenario 2: Data Corruption Detected
**Severity**: P1 (Critical data integrity issue)

**Detection**: Application errors, data validation failures

**Response Timeline**:
- 0-5 min: Isolate affected systems
- 5-15 min: Assess extent of corruption
- 15-60 min: Restore from last known good backup
- 60+ min: Reconcile any lost transactions

**Procedure**:
1. Identify last known good backup
2. Perform full restore
3. Run data integrity checks
4. Notify customers if data loss occurred

#### Scenario 3: Accidental Data Deletion
**Severity**: P1 (Customer data loss)

**Detection**: Support ticket or monitoring alert

**Response Timeline**:
- 0-5 min: Assess scope of deletion
- 5-10 min: Restore from backup just before deletion
- 10-60 min: Verify restoration and update application

**Procedure**:
1. Identify time of deletion
2. Find backup from 1-2 hours before deletion
3. Perform full restore
4. Verify affected data is present

#### Scenario 4: Infrastructure Failure
**Severity**: P1 (Service unavailable)

**Detection**: Health monitoring, customer reports

**Response Timeline**:
- 0-5 min: Detect failure
- 5-15 min: Spin up new infrastructure
- 15-30 min: Restore database from backup
- 30-60 min: Point application to new infrastructure

**Procedure**: Failover to standby infrastructure with backup restoration

#### Scenario 5: Ransomware Attack
**Severity**: P0 (Critical security incident)

**Detection**: Monitoring alert, security team

**Response Timeline**:
- 0-2 min: Isolate affected systems
- 2-10 min: Assess attack scope
- 10-60 min: Restore from clean backup
- 60+ min: Investigate and patch vulnerability

**Procedure**:
1. Isolate all systems
2. Disconnect from internet if necessary
3. Verify backup is clean (restore to staging first)
4. Perform full restoration
5. Investigate attack vector
6. Deploy security patches

---

## Backup Monitoring & Alerts

### Metrics to Monitor

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Backup success | < 100% daily | Investigate immediately |
| Backup size | > 2x normal | Check for data explosion |
| Backup duration | > 45 minutes | Optimize or increase timeout |
| S3 upload time | > 30 minutes | Check network connectivity |
| Backup age | > 36 hours | Manual backup needed |
| Verification fails | Any failure | Restore test required |

### Slack Notifications

**Daily Success**:
```
✅ Database backup completed successfully
📦 Size: 1.2 GB
📍 Location: s3://dr-platform-backups/database/...
⏱️ Duration: 23 minutes
```

**Failure Alert**:
```
❌ Database backup FAILED - Immediate attention required
🚨 Error: Connection timeout
📋 Check logs: GitHub Actions workflow
👤 Notify: On-call engineer
```

---

## Testing & Validation

### Monthly Restore Test

**First Monday of each month**:
1. Download latest backup
2. Restore to staging database
3. Run full data integrity checks
4. Compare with production metrics
5. Document results
6. Clean up staging database

**Procedure**:
```bash
# Download latest backup
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1 | tail -1

# Restore to staging
TEST_RESTORE=true bash scripts/backup/verify-backup.sh <backup-file>

# Run integrity checks
psql staging_db -f scripts/backup/integrity-checks.sql
```

### Quarterly Disaster Recovery Drill

**Each quarter, run full DR scenario**:
1. Simulate database failure
2. Execute restore procedure
3. Verify application functionality
4. Measure actual RTO/RPO
5. Document findings
6. Update procedures if needed

### Annual Full Restore Test

**Once per year, perform complete production failover**:
1. Coordinate with stakeholders
2. Announce maintenance window (1 hour)
3. Perform full database restore from oldest backup
4. Verify all services working
5. Document actual metrics
6. Plan any improvements

---

## Backup Security

### Encryption

**In Transit**:
- S3 uploads use TLS 1.2+
- AWS credentials protected in GitHub Secrets
- No backup data stored in logs

**At Rest**:
- S3 encryption: SSE-S3 (default)
- Recommended upgrade: SSE-KMS with customer-managed keys
- Local backups stored in secure directory

### Access Control

**S3 Bucket Policy**:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RestrictBackupAccess",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::dr-platform-backups/*",
      "Condition": {
        "StringNotLike": {
          "aws:SourceArn": [
            "arn:aws:iam::ACCOUNT_ID:role/GitHubActionsBackupRole",
            "arn:aws:iam::ACCOUNT_ID:role/DisasterRecoveryTeam"
          ]
        }
      }
    }
  ]
}
```

**IAM Permissions**:
- Backup script: `s3:PutObject`, `s3:GetObject`, `s3:DeleteObject`
- Restore script: `s3:GetObject` (read-only)
- Minimal permissions principle

### Audit Trail

**Backup logging**:
- All backup operations logged
- S3 access logging enabled
- CloudTrail captures all API calls
- Slack notifications provide real-time alerts

---

## Costs & Resource Planning

### Storage Costs (Estimated)

| Component | Size | Cost/Month |
|-----------|------|-----------|
| 30 backups × 1.2GB | 36 GB | $0.50 |
| S3 API calls | ~100 | $0.10 |
| Cross-region replication | 36 GB | $1.50 |
| **Monthly Total** | | **~$2.10** |

### Scaling Considerations

- Database grows ~500MB/month
- Keep 30-day retention indefinitely
- Quarterly archive of old backups to Glacier
- Estimated 1-year: 600GB, ~$25/month cost

---

## Troubleshooting

### Backup Fails to Complete

**Symptoms**: GitHub Actions workflow shows failure

**Diagnosis**:
1. Check workflow logs for error message
2. Verify DATABASE_URL is set correctly
3. Verify AWS credentials are valid
4. Check database size hasn't exceeded limits

**Resolution**:
- Manual backup from command line
- Check database performance
- Increase timeout if needed

### Restore Takes Too Long

**Symptoms**: Restore hangs or takes > 2 hours

**Diagnosis**:
1. Large database size
2. Slow storage I/O
3. Network issues

**Resolution**:
- Run on faster infrastructure
- Use SSD for temporary storage
- Increase database resources

### Backup Verification Fails

**Symptoms**: gzip or SQL validation fails

**Diagnosis**:
1. Corrupted backup file
2. Incomplete S3 upload
3. Network interruption

**Resolution**:
- Use previous backup
- Perform manual backup
- Check S3 upload logs

---

## References

- [PostgreSQL Backup Documentation](https://www.postgresql.org/docs/current/backup.html)
- [AWS S3 Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/BestPractices.html)
- [Disaster Recovery Guide](./docs/disaster-recovery.md)

---

**Document Version**: 1.0
**Last Updated**: 2024-01-15
**Next Review**: 2024-03-15
