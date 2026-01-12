# Failover Runbook

**QUICK START**: Complete active-passive failover in ~15 minutes

---

## Prerequisites

Before executing failover:
- [ ] Backup infrastructure ready (test monthly)
- [ ] Database backup available and verified
- [ ] Failover procedures practiced in drills
- [ ] DNS failover tested (TTL set to 60 seconds)
- [ ] All team members know their role
- [ ] Communication channel open (#incidents on Slack)

---

## When to Activate Failover

**Activate failover if**:
- Primary infrastructure completely down (not recoverable in < 15 min)
- Primary data center failure
- Primary region becomes unavailable
- Cannot restore database on primary
- Decision made by incident commander

**Do NOT activate failover if**:
- Issue can be fixed in < 5 minutes
- Only partial service impacted
- Database is recoverable in < 30 minutes

---

## Failover Procedure

### Phase 1: Prepare (5-10 minutes)

**Step 1: Declare Failover Decision** (1 min)
```
In #incidents Slack:
"FAILOVER DECLARED: Activating backup infrastructure
Estimated downtime: 10-15 minutes
Next update: 2 minutes"
```

**Step 2: Notify Team** (1 min)
- Post in #incidents
- Page backup infrastructure team
- Alert customer communication team

**Step 3: Stop Primary Application** (2 min)
```bash
# Prevent new connections to primary
kubectl set env deployment/app MAINTENANCE_MODE=true

# Wait for graceful shutdown of in-flight requests
sleep 30

# Stop all primary app instances
kubectl scale deployment app --replicas=0

# Verify no connections to primary database
psql primary-db -c "SELECT COUNT(*) FROM pg_stat_activity;" || echo "✓ Primary unavailable as expected"
```

### Phase 2: Start Backup Infrastructure (10-15 minutes)

**Step 4: Spin Up Backup Application** (5 min)
```bash
# Switch to backup cluster context
kubectl config use-context backup-cluster

# Verify backup cluster connectivity
kubectl cluster-info

# Scale up backup application
kubectl scale deployment app --replicas=3

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app=app --timeout=300s

# Verify deployment health
kubectl get pods | grep app
# Expected: 3 pods in Running state
```

**Step 5: Restore Database to Backup Infrastructure** (5-10 min)
```bash
# Set database URL for backup environment
export DATABASE_URL="postgresql://user:pass@backup-db.region.rds.amazonaws.com:5432/production"

# If backup database doesn't have data:
bash scripts/backup/restore-database.sh \
  s3://dr-platform-backups/database/dr-platform-backup-20240115_020000.sql.gz

# If backup database already has data:
# → Verify it's recent enough
# → Skip restore if < 15 minutes old
```

**Step 6: Verify Backup Database Connectivity** (2 min)
```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1;" && echo "✓ Database connected"

# Check table counts
psql $DATABASE_URL -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public';"
# Should show reasonable number (45+)

# Verify critical tables have data
psql $DATABASE_URL -c "
SELECT 'User'::text, COUNT(*) FROM \"User\" UNION ALL
SELECT 'Payment'::text, COUNT(*) FROM \"Payment\" UNION ALL
SELECT 'ServiceRequest'::text, COUNT(*) FROM \"ServiceRequest\";"
```

### Phase 3: Failover Traffic (2-5 minutes)

**Step 7: Update Load Balancer** (2 min)
```bash
# Option A: Load balancer target group (if using AWS ALB)
aws elbv2 modify-target-group-attributes \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --attributes Key=deregistration_delay.timeout_seconds,Value=30

# Route traffic to backup targets
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-backup-instance-1,Port=3000 \
            Id=i-backup-instance-2,Port=3000 \
            Id=i-backup-instance-3,Port=3000

# Deregister primary targets
aws elbv2 deregister-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-primary-instance-1,Port=3000 \
            Id=i-primary-instance-2,Port=3000 \
            Id=i-primary-instance-3,Port=3000
```

**Step 8: Update DNS (if needed)** (1 min)
```bash
# If using DNS-based failover (not ALB), update Route53
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123 \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "api.disasterrecovery.com.au",
        "Type": "A",
        "TTL": 60,
        "ResourceRecords": [
          {"Value": "backup-alb-ip"}
        ]
      }
    }]
  }'

# Verify DNS update
nslookup api.disasterrecovery.com.au
# Should resolve to backup infrastructure IP
```

### Phase 4: Verify Failover (5-10 minutes)

**Step 9: Health Checks** (3 min)
```bash
# Check application health endpoint
curl -v https://api.disasterrecovery.com.au/health
# Should return 200 OK

# Check critical API endpoints
curl -X GET https://api.disasterrecovery.com.au/api/user/me \
  -H "Authorization: Bearer $TEST_TOKEN"
# Should return valid user data

# Check database connectivity from application
curl -X GET https://api.disasterrecovery.com.au/api/metrics
# Should return metrics with no database errors
```

**Step 10: Run Smoke Tests** (3 min)
```bash
# Run pre-prepared smoke tests
npm run test:smoke -- --target https://api.disasterrecovery.com.au

# Expected results:
# ✓ User login works
# ✓ Create service request works
# ✓ View dashboard works
# ✓ Payment endpoints accessible
```

**Step 11: Monitor Error Rates** (3 min)
```bash
# Watch error metrics
watch -n 2 'curl -s https://api.disasterrecovery.com.au/metrics | grep -E "error_rate|api_latency_ms"'

# Expected:
# error_rate: < 1%
# api_latency_ms p95: < 1000

# If error rate > 5%, abort and investigate
```

### Phase 5: Notify Stakeholders (2 min)

**Step 12: Declare Failover Complete** (1 min)
```
In #incidents:
"✅ FAILOVER COMPLETE

Backup infrastructure is now ACTIVE
Services available at: api.disasterrecovery.com.au
Database: backup-db.region.rds.amazonaws.com
Status: All systems operational
Error rate: 0.1%

Next steps:
- Monitor for 30 minutes
- Investigate primary failure
- Schedule recovery of primary
"
```

**Step 13: Notify Customers** (1 min)
```
Email/SMS template:
"We experienced a brief service interruption (15 min).
Services have been fully restored.
No customer data was affected.
We apologize for any inconvenience."

Post on status page:
"Scheduled Maintenance: COMPLETED"
```

---

## Monitoring During Failover

**Continuous Monitoring** (ongoing):
```bash
# Watch key metrics in real-time
watch -n 5 'echo "=== ERROR RATE ===" && \
  curl -s https://api.disasterrecovery.com.au/metrics | grep error_rate && \
  echo "=== API LATENCY ===" && \
  curl -s https://api.disasterrecovery.com.au/metrics | grep api_latency && \
  echo "=== DATABASE ===" && \
  psql $DATABASE_URL -c "SELECT NOW();" 2>&1 | tail -1'
```

**What to Watch For**:
- Error rates spike → Check application logs
- Database latency high → Check query performance
- API timeouts → Check connection pool
- Memory usage spike → Check for memory leak

---

## Recovery Procedure After Failover

Once primary infrastructure is recovered:

### Option A: Re-failover to Primary (Recommended)

**When Primary is Recovered**:
1. Verify primary infrastructure is stable
2. Restore primary database from latest backup
3. Update load balancer to point back to primary
4. Monitor primary for stability (15 min)
5. Begin winding down backup infrastructure

**Procedure**:
```bash
# 1. Stop backup application
kubectl config use-context backup-cluster
kubectl scale deployment app --replicas=0

# 2. Update load balancer back to primary
aws elbv2 register-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-primary-instance-1,Port=3000 \
            Id=i-primary-instance-2,Port=3000 \
            Id=i-primary-instance-3,Port=3000

# 3. Verify traffic is flowing to primary
curl https://api.disasterrecovery.com.au/health

# 4. Deregister backup targets
aws elbv2 deregister-targets \
  --target-group-arn arn:aws:elasticloadbalancing:... \
  --targets Id=i-backup-instance-1,Port=3000 \
            Id=i-backup-instance-2,Port=3000 \
            Id=i-backup-instance-3,Port=3000

# 5. Monitor error rates (15 min)
# If stable, failover complete
```

### Option B: Gradual Re-failover (Safer)

**Canary Failover** (test with small percentage of traffic first):
```bash
# Send 10% of traffic to primary
aws elbv2 modify-target-group \
  --target-group-arn backup-tg \
  --attributes Key=stickiness.enabled,Value=true Key=stickiness.type,Value=source_ip

# Gradually increase percentage
# 10% → 25% → 50% → 100% (each step 5 minutes)
```

---

## Failover Checklist

```
☐ Verify primary is unreachable
☐ Declare failover decision
☐ Alert team and customers
☐ Stop primary application
☐ Start backup application
☐ Restore backup database
☐ Verify database connectivity
☐ Update load balancer
☐ Update DNS (if needed)
☐ Health check endpoints
☐ Run smoke tests
☐ Monitor error rates (5 min)
☐ Declare failover complete
☐ Notify customers
☐ Monitor continuously (30 min)
☐ Investigate primary failure
☐ Plan recovery of primary
```

---

## Troubleshooting

### Backup Application Won't Start
**Symptoms**: Pods stuck in pending or crash loop

**Solution**:
```bash
# Check pod status
kubectl describe pod <pod-name>

# Common issues:
# - Insufficient resources → Scale up cluster
# - ConfigMap missing → Create from primary
# - Database not ready → Wait and retry

# View logs
kubectl logs -f deployment/app
```

### Database Restore Takes Too Long
**Symptoms**: Restore still running after 1 hour

**Solution**:
- Check disk space: `df -h`
- Check I/O performance: `iostat -x 1 10`
- Kill restore and use older backup (with less data)
- Use backup with better compression

### Traffic Not Routing to Backup
**Symptoms**: api.disasterrecovery.com.au still goes to primary (down)

**Solution**:
```bash
# Check load balancer configuration
aws elbv2 describe-target-groups

# Check DNS resolution
nslookup api.disasterrecovery.com.au
dig api.disasterrecovery.com.au

# Force browser cache clear
curl -H 'Cache-Control: no-cache' https://api.disasterrecovery.com.au

# Test from different location
ssh bastion "curl https://api.disasterrecovery.com.au/health"
```

### Health Checks Failing After Failover
**Symptoms**: Endpoints return 500 errors

**Solution**:
```bash
# Check application logs
kubectl logs -f deployment/app

# Check database connection
psql $DATABASE_URL -c "SELECT 1;"

# Check environment variables
kubectl describe deployment app

# Restart application
kubectl rollout restart deployment/app
```

---

## Post-Failover Tasks

**Within 1 hour**:
- [ ] Notify all stakeholders
- [ ] Document what failed and why
- [ ] Monitor metrics for stability

**Within 24 hours**:
- [ ] Begin recovery of primary
- [ ] Investigate root cause
- [ ] Create post-mortem meeting

**Within 1 week**:
- [ ] Complete post-mortem
- [ ] Update failover procedures
- [ ] Plan next DR drill

---

## Key Metrics

| Metric | Target | Alert if |
|--------|--------|----------|
| Failover Decision Time | 2 minutes | > 5 min |
| Backup Infrastructure Startup | 5 minutes | > 10 min |
| Database Restore Time | 10 minutes | > 20 min |
| Traffic Switchover | 2 minutes | > 5 min |
| Error Rate After Failover | < 1% | > 5% |
| **Total RTO** | **15 minutes** | **> 30 min** |

---

**Last Tested**: 2024-01-15 (DR Drill)
**Next Test**: Q2 2024 (Quarterly Drill)
**Tested By**: Infrastructure Team
