# Emergency Procedures Runbook

**IMMEDIATE ACTION GUIDE** for critical emergencies

---

## Emergency Decision Matrix

```
Is production down?
│
├─ YES (Complete outage)
│  └─ Declare P0 incident → See "Complete Outage" below
│
└─ NO: Check severity
   ├─ Payment processing down? → P1, See "Payment Processing"
   ├─ Database down? → P1, See "Database Down"
   ├─ Security breach detected? → P0, See "Security Breach"
   ├─ Data corruption? → P1, See "Data Corruption"
   └─ Performance critical? → P1, See "Performance Crisis"
```

---

## P0: Complete Service Outage

**Timeline**: Recovery in 60 minutes maximum

### Immediate Actions (0-5 minutes)

```bash
# 1. DECLARE INCIDENT
pagerduty incidents create --title "P0: Complete Service Outage" \
  --service "production-api" \
  --urgency high

# 2. OPEN WAR ROOM
# Post in #incidents
# "🚨 P0 INCIDENT: Complete service outage
# Time: $(date)
# Investigating..."

# Zoom: https://disasterrecovery.com.au/incident-bridge (auto-records)

# 3. PAGE EVERYONE
pagerduty escalation-policies trigger all-hands
```

### Diagnosis (5-15 minutes)

```bash
# Check if it's network or service
curl -v https://api.disasterrecovery.com.au/health

# Check AWS status
aws elbv2 describe-load-balancers

# Check if database is running
psql $DATABASE_URL -c "SELECT 1;" 2>&1

# Check app logs
kubectl logs -f deployment/app --tail=50

# Check infrastructure
kubectl get nodes
kubectl get pods

# Check Sentry
curl -s https://sentry.io/api/0/events/latest
```

### Recovery Actions

**If infrastructure down**:
```bash
# Failover to backup infrastructure
See: docs/recovery/failover.md
```

**If database down**:
```bash
# Restore from backup
See: docs/recovery/database-recovery.md
```

**If application crashed**:
```bash
# Restart services
kubectl rollout restart deployment/app

# Wait for pods
kubectl wait --for=condition=ready pod -l app=app --timeout=5m

# Verify
curl https://api.disasterrecovery.com.au/health
```

**If configuration issue**:
```bash
# Check environment variables
kubectl describe deployment app | grep -A 20 "Environment"

# Rollback to previous deployment
kubectl rollout undo deployment/app

# Verify
curl https://api.disasterrecovery.com.au/health
```

---

## P1: Database Down

**Timeline**: Recovery in 30 minutes

### Symptoms
- Connection refused errors
- "remaining connection slots reserved for non-replication superuser"
- SQL query timeouts
- Application unable to fetch data

### Immediate Actions (0-2 minutes)

```bash
# 1. VERIFY ISSUE
psql $DATABASE_URL -c "SELECT 1;" 2>&1
# If fails: Database definitely down

# 2. CHECK AWS RDS
aws rds describe-db-instances --db-instance-identifier production-db

# 3. ALERT TEAM
echo "🚨 P1 INCIDENT: Database Down" > /tmp/alert.txt
# Post in #incidents
```

### Recovery (2-30 minutes)

**Option A: Database Just Needs Restart** (5 min)
```bash
# Restart RDS instance
aws rds reboot-db-instance --db-instance-identifier production-db

# Wait for reboot (~2 minutes)
aws rds wait db-instance-available

# Test connection
psql $DATABASE_URL -c "SELECT 1;"
```

**Option B: Connection Pool Exhausted** (5 min)
```bash
# Kill idle connections
psql $DATABASE_URL -c "
SELECT pg_terminate_backend(pid)
FROM pg_stat_activity
WHERE state = 'idle' AND query_start < now() - interval '5 minutes';"

# Increase pool size
export POSTGRES_POOL_MAX=100

# Restart app
kubectl rollout restart deployment/app
```

**Option C: Disk Full** (15 min)
```bash
# Check disk
aws rds describe-db-instances --query 'DBInstances[0].AllocatedStorage'

# Scale storage
aws rds modify-db-instance --db-instance-identifier production-db \
  --allocated-storage 500 --apply-immediately

# Wait and verify
aws rds wait db-instance-available
psql $DATABASE_URL -c "SELECT 1;"
```

**Option D: Database Corrupted** (30 min)
```bash
# Restore from backup
See: docs/recovery/database-recovery.md

# Restore command:
bash scripts/backup/restore-database.sh s3://backups/latest.sql.gz
```

---

## P0: Payment Processing Down

**Timeline**: Recovery in 15 minutes maximum

### Immediate Actions (0-5 minutes)

```bash
# 1. VERIFY ISSUE
curl -X POST https://api.disasterrecovery.com.au/api/payments \
  -H "Authorization: Bearer $TEST_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100}'

# If fails: Payment system down

# 2. CHECK STRIPE STATUS
# Go to: https://status.stripe.com/

# 3. ALERT TEAM
# Post: "🚨 P0: Payment Processing Down"
```

### Recovery

**If Stripe API down**:
```bash
# Check Stripe status page
# This is external - wait for Stripe recovery (no action needed)

# Notify customers
echo "Payment processing temporarily unavailable"
```

**If our integration is broken**:
```bash
# Check API logs
kubectl logs -l app=app | grep -i "stripe\|payment"

# Verify Stripe API key
echo $STRIPE_SECRET_KEY

# If key expired:
# 1. Generate new key in Stripe dashboard
# 2. Update secret: See secrets-rotation.md
# 3. Restart app

# Test payment
curl -X POST https://api.disasterrecovery.com.au/api/payments/test
```

**If webhook handling broken**:
```bash
# Check webhook logs
psql $DATABASE_URL -c "SELECT * FROM webhook_logs ORDER BY created_at DESC LIMIT 10;"

# Replay webhooks
# Manually retry failed webhook processing

# Or restart payment processing
kubectl rollout restart deployment/payment-processor
```

---

## P0: Security Breach Detected

**Timeline**: Containment in 5 minutes, analysis within 1 hour

### IMMEDIATE (0-2 minutes)

```bash
# 1. DECLARE SECURITY INCIDENT
# Post: "🚨 SECURITY INCIDENT: Unauthorized access detected"

# 2. ISOLATE SYSTEMS
# Disconnect production from internet if possible
# Disable all external integrations

# 3. PAGE SECURITY TEAM
# Email: security@disasterrecovery.com.au
# Phone: Emergency contact
```

### Assessment (2-10 minutes)

```bash
# Check for unauthorized access
# Review logs for suspicious activity
grep -i "unauthorized\|failed\|denied" /var/log/auth.log | tail -20

# Check for data exfiltration
aws s3 ls s3://production-data/ | grep "today"

# Check for malware/suspicious processes
ps aux | grep -v "grep" | grep -E "nc|netcat|bash\s+i"

# Check database for changes
# Look for new users, modified data, dropped tables
```

### Response (Per Security Team)

```bash
# 1. Rotate all secrets
See: docs/runbooks/secrets-rotation.md

# 2. Rebuild infrastructure
# Rebuild app instances from clean images
# Rebuild database from pre-incident backup

# 3. Patch vulnerability
# Identify and fix the security vulnerability
# Apply patch to all systems

# 4. Restore from backup
bash scripts/backup/restore-database.sh s3://backups/pre-incident.sql.gz
```

See also: `docs/disaster-recovery.md#scenario-3-security-breach`

---

## P1: Data Corruption Detected

### Symptoms
- Negative amounts in payment table
- Missing user accounts
- Orphaned records (booking without customer)
- Data validation errors

### Recovery

```bash
# 1. ASSESS SCOPE
# How many records affected?
# How long has corruption existed?

# 2. DECIDE: Fix vs Restore
# < 10 records? → Manually fix
# > 10 records? → Restore from backup

# MANUAL FIX (if < 10 records):
psql $DATABASE_URL -c "
BEGIN;
DELETE FROM payments WHERE amount < 0;
-- or UPDATE to fix data
COMMIT;"

# RESTORE (if corruption widespread):
See: docs/recovery/database-recovery.md
```

---

## P1: Performance Crisis

**Symptoms**: API latency > 10 seconds, timeouts everywhere

### Immediate Actions (0-5 minutes)

```bash
# 1. IDENTIFY THE PROBLEM
# Check CPU: High usage?
kubectl top nodes
kubectl top pods

# Check memory: High usage?
free -h

# Check database: Slow queries?
psql $DATABASE_URL -c "
SELECT query, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start ASC;"

# Check network: High I/O?
iotop
```

### Recovery

**High CPU Usage**:
```bash
# Scale up app instances
kubectl scale deployment app --replicas=10

# Kill expensive processes
# Identify resource hog
ps aux --sort=%cpu | head -5

# If it's a bad query, kill it
psql $DATABASE_URL -c "SELECT pg_terminate_backend(pid)"
```

**Memory Leak**:
```bash
# Restart app instances (rolling restart)
kubectl rollout restart deployment/app

# Monitor memory
kubectl top pods --watch
```

**Slow Database Queries**:
```bash
# Find slow queries
psql $DATABASE_URL -c "SELECT * FROM pg_stat_statements ORDER BY total_time DESC LIMIT 5;"

# Kill long-running query
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE query_start < now() - interval '5 minutes';

# Add index to slow queries
CREATE INDEX idx_user_email ON \"User\"(email);
```

**High Network I/O**:
```bash
# Check for large data transfers
netstat -an | grep ESTABLISHED | wc -l

# Check for DDoS attack
# If yes, enable DDoS protection or block source IPs
```

---

## P1: Memory Leak Detected

**Symptoms**: Memory usage increasing 10%+ per hour, OOM kills

### Recovery (10 minutes)

```bash
# 1. IDENTIFY
# Check memory trend
kubectl top pod <pod-name> --containers

# 2. RESTART AFFECTED PODS
kubectl rollout restart deployment/app

# 3. MONITOR
watch kubectl top pods

# 4. INVESTIGATE
# Check logs for memory leaks
# Review recent code changes
# Check for event listener leaks
```

---

## P1: Certificate Expiration

**Symptoms**: HTTPS connections fail, browser warnings

### Immediate (0-5 minutes)

```bash
# 1. CHECK CERTIFICATE
openssl s_client -connect api.disasterrecovery.com.au:443 -showcerts | grep "notAfter"

# 2. RENEW CERTIFICATE
# If using Let's Encrypt:
certbot renew --force-renewal

# 3. DEPLOY NEW CERT
kubectl create secret tls app-tls \
  --cert=path/to/cert \
  --key=path/to/key \
  --dry-run=client -o yaml | kubectl apply -f -

# 4. RESTART INGRESS
kubectl rollout restart deployment/ingress
```

---

## Emergency Contact Tree

**Trigger**: When declaring P0 incident

```
Incident Commander (Primary)
├─ On-Call Engineer (if not IC)
├─ DBA Team Lead
├─ Infrastructure Lead
├─ Security Lead (if security incident)
└─ VP Engineering
    ├─ CEO (if revenue impacting)
    └─ Board (if major incident)

Call Bridge: Zoom link auto-created
Communication: #incidents Slack channel
```

---

## Communication During Emergency

**Every 5 minutes** (to team and customers if customer-facing):
```
🔧 INCIDENT UPDATE

Status: [INVESTIGATING / WORKING ON FIX / RESOLVED]
Issue: [Brief description]
Impact: [# users affected / # transactions failed]
ETA: [Estimated time to resolution]

Last Update: $(date)
Next Update: In 5 minutes
```

---

## Post-Emergency

**First 24 hours**:
- [ ] Document incident thoroughly
- [ ] Identify root cause
- [ ] Plan fix to prevent recurrence
- [ ] Schedule post-mortem meeting

**Within 1 week**:
- [ ] Complete post-mortem
- [ ] Implement improvements
- [ ] Update runbooks
- [ ] Train team

---

## Emergency Checklist

```
☐ Declare incident
☐ Open war room
☐ Page team
☐ Diagnose issue
☐ Execute recovery
☐ Verify resolution
☐ Notify stakeholders
☐ Monitor for stability
☐ Document incident
☐ Schedule post-mortem
```

---

## Key Numbers

```
Incident Commander: TBD (Update from ops team)
On-Call Engineer: PagerDuty
VP Engineering: TBD
CEO: TBD

Incident Bridge Zoom: https://disasterrecovery.com.au/incident-bridge
#incidents Slack: Disaster Recovery Incidents
```

---

**Last Updated**: 2024-01-15
**Test Frequency**: Quarterly emergency drills
**Distribution**: All ops/engineering staff
