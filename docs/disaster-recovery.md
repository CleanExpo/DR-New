# Disaster Recovery Plan

## Executive Summary

This document defines the Disaster Recovery (DR) plan for the Disaster Recovery NRPG Platform. It outlines procedures for responding to critical incidents and recovering from various disaster scenarios.

**Objectives**:
- Restore critical services within 1 hour (RTO)
- Minimize data loss to ≤ 15 minutes (RPO)
- Provide clear escalation and response procedures
- Enable team coordination during crisis
- Document recovery and testing procedures

**This is a living document** - Review quarterly and update with lessons learned from incidents and drills.

---

## Table of Contents

1. [Contact Information](#contact-information)
2. [Incident Classifications](#incident-classifications)
3. [Response Procedures](#response-procedures)
4. [Specific Scenarios](#specific-scenarios)
5. [Failover Procedures](#failover-procedures)
6. [Recovery Procedures](#recovery-procedures)
7. [Testing & Drills](#testing--drills)
8. [Post-Incident Review](#post-incident-review)

---

## Contact Information

### On-Call Escalation

| Role | Primary | Backup | Escalation |
|------|---------|--------|-----------|
| **Incident Commander** | `ic@disasterrecovery.com.au` | `ic-backup@disasterrecovery.com.au` | CEO |
| **Database Admin** | `dba@disasterrecovery.com.au` | `dba-backup@disasterrecovery.com.au` | CTO |
| **Infrastructure** | `infra@disasterrecovery.com.au` | `infra-backup@disasterrecovery.com.au` | VP Eng |
| **Security** | `security@disasterrecovery.com.au` | `security-backup@disasterrecovery.com.au` | CEO |

### Escalation Channels
- **Slack**: #incidents (critical only)
- **Phone**: Use PagerDuty for calling sequences
- **Zoom**: https://disasterrecovery.com.au/incident-bridge (auto-record)

### External Contacts
- **AWS Support**: Premier Support account, case: 12345
- **Upstash**: support@upstash.com
- **Vercel**: support@vercel.com

---

## Incident Classifications

### P0: Critical - Immediate Action Required
**Impact**: Complete service outage, customer data at risk, revenue impact

**Response Time**: 5 minutes
**Resolution Target**: 30-60 minutes
**Examples**:
- Database completely down
- Security breach detected
- Entire infrastructure failure
- Data corruption affecting core features

**Actions**:
1. Page all on-call engineers immediately
2. Declare incident in #incidents Slack channel
3. Create Zoom bridge
4. Assign incident commander
5. Begin recovery procedures immediately

### P1: High - Urgent
**Impact**: Significant service degradation, some features unavailable

**Response Time**: 15 minutes
**Resolution Target**: 1-4 hours
**Examples**:
- Payment processing down
- Dashboard extremely slow
- API errors for specific endpoints
- Data inconsistency detected

**Actions**:
1. Page on-call engineer
2. Notify in #incidents channel
3. Investigate and assess impact
4. Begin mitigation

### P2: Medium - Important
**Impact**: Minor features unavailable or degraded, no customer data impact

**Response Time**: 1 hour
**Resolution Target**: 4-24 hours
**Examples**:
- Non-critical feature broken
- Performance degradation
- Email notifications delayed
- UI bugs affecting subset of users

**Actions**:
1. Create incident ticket
2. Assign to on-call engineer
3. Monitor for escalation

### P3: Low - Standard
**Impact**: Cosmetic issues, feature requests, internal tools

**Response Time**: 24 hours
**Resolution Target**: 1-2 weeks
**Examples**:
- UI typos
- Feature requests
- Documentation updates
- Internal tool issues

---

## Response Procedures

### Incident Detection & Alert

**Detection Sources**:
1. **Automated Monitoring** (highest priority)
   - Sentry error rate > 10% of baseline
   - API latency p95 > 5 seconds
   - Database connection pool exhausted
   - Payment processing failures
   - Application health check failures

2. **Customer Reports** (within 1 hour of issue)
   - Support tickets
   - Direct communication
   - Twitter/social media

3. **Internal Discovery** (less critical)
   - Team members noticing issues
   - Failed deploys
   - Build failures

### Initial Response (0-5 Minutes)

**Step 1: Verify Incident** (1 min)
- Confirm issue is real (not false alarm)
- Determine scope (what's affected?)
- Check status page and dashboards

**Step 2: Alert Team** (2 min)
```bash
# If P0:
/pagerduty trigger "P0 Incident: <description>" -p all-engineers

# If P1:
/pagerduty trigger "P1 Incident: <description>" -p on-call-engineer
```

**Step 3: Establish War Room** (3 min)
- Post in #incidents: "P0 Incident declared: <description>"
- Create Zoom bridge: `meeting start incident`
- Record for post-mortem

**Step 4: Assign Roles** (5 min)
- **Incident Commander**: Coordinate response, make decisions
- **Technical Lead**: Direct technical investigation
- **Communicator**: Update status, notify customers
- **Scribe**: Document timeline and actions

### Investigation Phase (5-30 Minutes)

**Incident Commander Checks**:
```
❏ Is application still running?
❏ Can we connect to database?
❏ Are API endpoints responding?
❏ Is it widespread or isolated?
❏ Are backups available?
❏ What was last successful deployment?
❏ Any recent changes that could cause this?
❏ Any alerts/errors in logs?
```

**Technical Investigation**:
1. Check monitoring dashboards
2. Review recent logs (last 15 minutes)
3. Check recent deployments
4. Review recent database changes
5. Check infrastructure health
6. Run diagnostic commands

**Communication Template**:
```
🚨 INCIDENT DECLARED: P0 - Database Connection Loss

Timeline:
- 14:32 UTC: Sentry alert triggered (100% error rate)
- 14:33 UTC: Verified in multiple regions
- 14:34 UTC: War room opened

Status:
- Application: Down ❌
- Database: Investigating 🔍
- Backups: Available ✅

Next Steps:
- Database diagnostics in progress
- Consider failover to staging
- Estimate 20 minutes to update
```

### Decision Point (15-30 Minutes)

**Can we fix it quickly (< 30 min)?**
- YES: Continue investigation, provide updates every 5 minutes
- NO: Escalate to failover/restore procedures

**Incident Commander Decides**:
- [ ] Attempt fix in place (if safe)
- [ ] Failover to backup infrastructure
- [ ] Restore from backup
- [ ] Scale up resources
- [ ] Activate alternative service

---

## Specific Scenarios

### Scenario 1: Database Connection Lost

**Detection**: Sentry shows 100% error rate, API endpoints return database connection errors

**Diagnosis** (5-10 min):
```bash
# Check database connectivity
psql $DATABASE_URL -c "SELECT 1;"

# Check connection pool status
curl http://localhost:5555/metrics | grep pg_pool

# Check AWS RDS instance
aws rds describe-db-instances --db-instance-identifier production-db

# Check network connectivity
nc -zv prod-db.example.com 5432

# Check database logs
aws rds describe-db-log-files --db-instance-identifier production-db
```

**Response Decision Tree**:
```
┌─ Database responding? ──NO──┐
└─ YES ──┐                     │
         ├─ Connection pool      │
         │  exhausted?           │
         │                       │
         ├─ Scale app            │ Check AWS RDS
         │  instances?           │ - Disk full?
         │                       │ - CPU maxed?
         │                       │ - Parameter groups?
         │                       │
         └─ Restart database ────┼─ Database unreachable
            or failover          │
                                 └─ Restore from backup
                                    OR
                                    Failover to standby
```

**Mitigation** (in order of preference):
1. **Increase connection pool** (5 min)
   ```bash
   # Modify pool settings
   export POSTGRES_POOL_MIN=10
   export POSTGRES_POOL_MAX=50
   # Restart app instances
   ```

2. **Scale down active connections** (5 min)
   ```bash
   # Terminate long-running queries
   psql $DATABASE_URL -c "SELECT pg_terminate_backend(pid)
   FROM pg_stat_activity WHERE state = 'idle' AND idle_in_xact > 600;"
   ```

3. **Restart affected app instances** (5 min)
   - Rolling restart to maintain service
   - Monitor error rate after each restart

4. **Failover to standby database** (10-15 min)
   - If primary database is down
   - See "Failover Procedures" section

5. **Restore from backup** (30-60 min)
   - If database corruption detected
   - See "Recovery Procedures" section

**Communication**:
```
🔧 INVESTIGATING: Database Connection Loss

Current Status:
- Database status: Checking...
- Error rate: 95%
- Estimated fix: 10-20 minutes

Actions Taken:
- ✓ Verified database is running
- → Scaling connection pool
- → Restarting app instances

Next Update: 14:42 UTC (in 5 min)
```

**Resolution**: When error rate drops below 1% for 5 minutes, declare "incident resolved"

---

### Scenario 2: Data Corruption Detected

**Detection**:
- Application queries return invalid data
- Data validation checks fail
- Users report impossible data states

**Diagnosis** (10-15 min):
```bash
# Check for constraint violations
psql $DATABASE_URL -c "
SELECT COUNT(*) as invalid_records
FROM payments
WHERE amount < 0 OR status NOT IN ('pending', 'completed', 'failed');
"

# Check database integrity
psql $DATABASE_URL -c "REINDEX DATABASE production;"

# Check recent changes
git log --oneline -20

# Check recent migrations
ls -la prisma/migrations/ | tail -10
```

**Response**:
1. **Investigate scope** (5 min)
   - Which tables affected?
   - How many records?
   - When did corruption start?

2. **Options**:
   - **Small corruption**: Manually fix affected records
   - **Large corruption**: Restore from backup

3. **Restore from backup** (30-60 min)
   ```bash
   # Find last known good backup
   aws s3 ls s3://dr-platform-backups/database/ --region us-east-1 | grep "20240115"

   # Restore to staging first to verify
   TEST_DB=staging_verify bash scripts/backup/restore-database.sh <backup-file>

   # Verify data looks good
   psql staging_verify -c "SELECT COUNT(*) FROM \"User\";"

   # Once verified, restore to production
   bash scripts/backup/restore-database.sh <backup-file>
   ```

4. **Reconcile lost transactions**
   - Determine what data was lost
   - Identify affected users
   - Manually recreate critical records if needed

---

### Scenario 3: Security Breach / Ransomware

**Detection**:
- Unauthorized access detected in logs
- Suspicious processes running
- Files encrypted with unknown extension
- Alerts from security monitoring

**IMMEDIATE ACTIONS** (Within 1 minute):
1. **Declare P0 incident** immediately
2. **Isolate affected systems**:
   - Disconnect database server from internet (if possible)
   - Stop all API services
   - Preserve logs for forensics

3. **Alert Security Team** 📞 (mandatory - not optional)
4. **Activate Incident Command**

**Investigation Phase** (5-15 min):
```bash
# Identify compromise:
- Check recent logins (who accessed what?)
- Review application logs
- Check AWS CloudTrail
- Review Sentry for suspicious activity

# Find last clean backup:
aws s3 ls s3://dr-platform-backups/database/ --region us-east-1
# Use backup from before suspected compromise date
```

**Recovery** (30-120 min):
1. **Restore from clean backup** (before compromise)
   ```bash
   # Use oldest clean backup available
   bash scripts/backup/restore-database.sh s3://dr-platform-backups/database/clean-backup.sql.gz
   ```

2. **Rotate all secrets**:
   - Database passwords
   - API keys
   - AWS credentials
   - GitHub tokens
   - All environment variables

3. **Rebuild infrastructure** (in parallel):
   - Rebuild app instances from clean images
   - Rebuild database from backup
   - Replace SSL certificates
   - Update firewall rules

4. **Security review**:
   - Identify attack vector
   - Patch vulnerability
   - Update security policies
   - Notify affected users

**Communication**:
```
🚨 CRITICAL SECURITY INCIDENT

We have detected unauthorized access to our systems.
Actions taken:
- ✓ Systems isolated and secured
- ✓ Investigation in progress
- → Restoring from clean backup
- → Rotating all credentials

Customer data security: Our top priority
- Backups verified clean ✓
- No indication of data exfiltration
- Full forensic investigation underway

We will provide updates every 30 minutes.
```

---

### Scenario 4: Complete Infrastructure Failure

**Detection**: All services down, DNS still resolving, AWS account alerts

**Response**:
1. **Activate failover infrastructure** (5 min)
   - Spin up backup environment
   - Point load balancer to new infrastructure

2. **Restore database** (30-60 min)
   - Download backup from S3
   - Restore to new database instance
   - Verify data integrity

3. **Point application to new database** (5 min)
   - Update environment variables
   - Restart application services
   - Verify connectivity

---

## Failover Procedures

### Active-Passive Failover

**When to use**: Primary infrastructure completely down

**Procedure**:

**Phase 1: Prepare Backup Infrastructure** (5 min)
```bash
# Start backup environment
cd infrastructure/
terraform apply -target=aws_instance.backup_app_server

# Start backup database
aws rds create-db-instance \
  --db-instance-identifier production-db-backup \
  --engine postgres \
  --restore-from-db-snapshot-identifier production-db-latest
```

**Phase 2: Restore Data** (30-60 min)
```bash
# Wait for RDS to come online (~10 min)
aws rds wait db-instance-available \
  --db-instance-identifier production-db-backup

# Run migrations
DATABASE_URL="new-db-url" npm run migrate
```

**Phase 3: Failover Traffic** (5 min)
```bash
# Update load balancer
aws elbv2 modify-target-group \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-backup-instance-id,Port=3000

# Update DNS (if needed)
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123 \
  --change-batch '{"Changes": [{"Action": "UPSERT", "ResourceRecordSet": {"Name": "api.disasterrecovery.com.au", "Type": "A", "AliasTarget": {"HostedZoneId": "Z456", "DNSName": "backup-alb.region.elb.amazonaws.com", "EvaluateTargetHealth": false}}}]}'

# Verify traffic routing
curl https://api.disasterrecovery.com.au/health
```

**Phase 4: Verify Functionality** (10 min)
```bash
# Run smoke tests
npm run test:smoke

# Check error rates
curl http://monitoring.internal/metrics | grep error_rate

# Verify critical flows
curl -X POST https://api.disasterrecovery.com.au/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ user { id email } }"}'
```

---

## Recovery Procedures

### Database Recovery from Backup

**Prerequisites**:
- Backup file available (local or S3)
- Backup verified as good
- Downtime window approved

**Procedure**:

```bash
# 1. Stop application to prevent connections
kubectl scale deployment app --replicas=0

# 2. Dry run restore (optional but recommended)
TEST_DB=test_restore_verify bash scripts/backup/restore-database.sh backup.sql.gz

# 3. Perform actual restore
bash scripts/backup/restore-database.sh backup.sql.gz

# 4. Run data validation
psql $DATABASE_URL < scripts/validation/integrity-checks.sql

# 5. Restart application
kubectl scale deployment app --replicas=3

# 6. Verify application health
kubectl logs deployment/app | tail -20
curl https://api.disasterrecovery.com.au/health
```

### Point-in-Time Recovery (PITR)

**Prerequisites**:
- WAL files archived
- Restore target time identified
- Backup from before target time available

**Procedure**:
```bash
# 1. Restore base backup
gzip -cd backup.sql.gz | psql $DATABASE_URL

# 2. Check recovery status
SELECT now();
SELECT pg_is_in_recovery();

# 3. Replay WAL files to target time
# (Automated by PostgreSQL when recovery.conf is configured)

# 4. Verify data at recovery point
SELECT * FROM audit_log WHERE created_at > '2024-01-15 14:00:00 UTC'::timestamp ORDER BY created_at DESC LIMIT 10;
```

---

## Testing & Drills

### Monthly Restore Test

**Schedule**: First Monday of each month, 3 AM UTC

**Duration**: 30 minutes

**Participants**: Database admin, infrastructure engineer

**Procedure**:
1. Get latest backup from S3
2. Verify backup integrity
3. Restore to staging database
4. Run data integrity checks
5. Compare with production metrics
6. Document any issues
7. Clean up staging database

**Documentation**: Update `/docs/recovery/restore-test-results.md`

### Quarterly Disaster Recovery Drill

**Schedule**: Mid-quarter, during maintenance window

**Duration**: 2-4 hours

**Scope**: Test specific disaster scenario

**Participants**: All ops team members

**Scenarios to rotate**:
- Q1: Database failure and restore
- Q2: Complete infrastructure failover
- Q3: Security incident response
- Q4: Multi-region failover

**Procedure**:
1. Announce drill in #ops-team
2. Simulate disaster scenario
3. Execute recovery procedures
4. Document timeline
5. Post-mortem meeting
6. Update procedures based on findings

**Success Criteria**:
- Recovery time < RTO (1 hour)
- Data loss < RPO (15 minutes)
- Zero customer impact
- All procedures executed correctly

### Annual Chaos Engineering Test

**Schedule**: Once per year, 1-2 week window

**Duration**: 8-16 hours

**Scope**: Complex failure scenarios

**Procedure**:
1. Implement random failures:
   - Kill database connections
   - Introduce network latency
   - Corrupt data
   - Disk full simulation
   - Memory pressure
2. Observe system behavior
3. Measure impact metrics
4. Document failures and recoveries
5. Identify improvements
6. Update runbooks with findings

---

## Post-Incident Review

### Incident Debrief (Blameless Post-Mortem)

**When**: Within 24 hours of incident resolution

**Who**: All engineers involved + incident commander + manager

**Duration**: 30-60 minutes

**Agenda**:
1. **Timeline Review** (10 min)
   - When was incident detected?
   - When was incident recognized as serious?
   - When was recovery started?
   - When was service restored?

2. **Root Cause Analysis** (15 min)
   - What happened?
   - Why did it happen?
   - What could have prevented it?
   - What could have detected it earlier?

3. **Impact Assessment** (10 min)
   - How many customers affected?
   - Duration of outage?
   - Revenue impact?
   - Reputation impact?

4. **Action Items** (15 min)
   - What needs to be fixed?
   - Who is responsible?
   - When should it be done?
   - How do we prevent recurrence?

**Document Template**:
```markdown
# Incident Report: P0 Database Outage - Jan 15, 2024

## Timeline
- 14:32 UTC: Sentry alert triggered
- 14:34 UTC: Incident declared
- 14:52 UTC: Root cause identified
- 15:18 UTC: Service restored
- **Total duration**: 46 minutes

## Root Cause
Connection pool exhaustion due to...

## Impact
- 1,200 affected users
- 46 minutes downtime
- $5,000 estimated revenue impact

## Action Items
1. [ ] Increase connection pool size (Due: Jan 17)
2. [ ] Add connection pool monitoring (Due: Jan 24)
3. [ ] Update runbook (Due: Jan 17)
4. [ ] Schedule quarterly drill (Due: Jan 30)

## Lessons Learned
- Detection could have been faster with X metric
- Runbook was helpful but needed update for Y scenario
```

### Continuous Improvement

**After each incident**:
1. Update runbooks with lessons learned
2. Add new monitoring/alerting
3. Train team on new procedures
4. Schedule follow-up drill if applicable

**Quarterly Review**:
- Review all incidents from quarter
- Identify patterns
- Prioritize improvements
- Update disaster recovery plan

---

## Appendices

### A. Checklist: P0 Incident Response

```
☐ Verify incident is real (not false alarm)
☐ Check status page
☐ Declare P0 incident
☐ Alert team via PagerDuty
☐ Open #incidents Slack channel
☐ Create Zoom war room
☐ Assign incident commander
☐ Assign technical lead
☐ Assign communicator
☐ Document timeline
☐ Investigate root cause
☐ Implement mitigation
☐ Monitor for stability (5 min)
☐ Declare incident resolved
☐ Notify customers (if affected)
☐ Schedule post-mortem
```

### B. Emergency Contacts

See "Contact Information" section above

### C. Escalation Decision Tree

```
Is service down?
├─ YES: P0 Incident
│  ├─ Can we fix in < 5 min? → Try fix
│  └─ No? → Failover/Restore
│
└─ NO: Performance issue?
   ├─ Severe (API latency > 5s) → P1 Incident
   ├─ Moderate (UI slow) → P2 Incident
   └─ Minor (cosmetic) → P3 Ticket
```

### D. Runbooks (Linked)

- [Database Recovery Runbook](./recovery/database-recovery.md)
- [Failover Runbook](./recovery/failover.md)
- [Security Incident Runbook](./recovery/security-incident.md)

---

**Document Status**: ACTIVE
**Last Updated**: 2024-01-15
**Next Review**: 2024-03-15
**Approval**: Engineering Leadership
