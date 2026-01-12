# Rollback Runbook

**QUICK START**: Complete rollback in ~10 minutes (including verification)

---

## When to Rollback

**Immediate Rollback If**:
- Error rate > 10% after deployment
- API latency p95 > 10 seconds
- Database connection failures
- Payment processing down
- Critical feature broken
- Security issue introduced

**Consider Rollback If**:
- Error rate 5-10% after deployment
- Performance degraded significantly
- Unusual user complaints
- Health checks intermittently failing

---

## Rollback Decision Tree

```
Is there a critical issue?
│
├─ YES:
│  ├─ Can it be fixed in < 5 minutes? → Fix it
│  └─ Can't be fixed quickly? → ROLLBACK
│
└─ NO: Continue monitoring
   └─ Investigate root cause
```

---

## Rollback Procedure

### Option 1: Vercel (Recommended)

**Step 1: List Recent Deployments**
```bash
# Get deployment list
vercel deployments list | head -10

# Output looks like:
# Created              Duration            Status   URL
# 3 minutes ago        2 minutes           Ready    v1.2.3
# 1 hour ago           1 minute 30s        Ready    v1.2.2 ← Previous
# 2 hours ago          3 minutes           Ready    v1.2.1
```

**Step 2: Identify Previous Deployment**
```bash
# Previous deployment is the one before current
# If current is v1.2.3, previous is v1.2.2
PREVIOUS_DEPLOYMENT_ID="<deployment-id-v1.2.2>"

# Get full deployment info
vercel deployments inspect $PREVIOUS_DEPLOYMENT_ID
```

**Step 3: Promote Previous Deployment**
```bash
# Promote to production (takes 30-60 seconds)
vercel promote $PREVIOUS_DEPLOYMENT_ID

# Expected output:
# Production alias updated
# Domain points to: <previous-deployment-url>
```

**Step 4: Verify Rollback**
```bash
# Check health endpoint
curl https://api.disasterrecovery.com.au/health

# Check metrics
curl https://api.disasterrecovery.com.au/metrics | jq .error_rate

# Expected: Previous version responding, error rate < 0.5%
```

### Option 2: Kubernetes

**Step 1: Check Rollout History**
```bash
# Get previous revisions
kubectl rollout history deployment/app

# Output looks like:
# REVISION  CHANGE-CAUSE
# 5         v1.2.3: Deployed
# 4         v1.2.2: Deployed ← Previous
# 3         v1.2.1: Deployed
```

**Step 2: Rollback to Previous**
```bash
# Rollback to previous revision
kubectl rollout undo deployment/app

# Expected output:
# deployment.apps/app rolled back
```

**Step 3: Monitor Rollback**
```bash
# Watch rollout status
kubectl rollout status deployment/app --timeout=5m

# Expected:
# deployment "app" successfully rolled out

# Verify pods are ready
kubectl get pods -l app=app
# Expected: All pods Running
```

**Step 4: Verify Rollback**
```bash
# Check all pods are healthy
kubectl get pods -l app=app -o wide

# Check logs for errors
kubectl logs -l app=app | tail -20 | grep -i error

# Health check
for pod in $(kubectl get pods -l app=app -o name); do
  echo "Checking $pod..."
  kubectl exec $pod -- curl -s localhost:3000/health | jq .status
done
# Expected: All return "healthy"
```

### Option 3: Manual Rollback (Docker/Direct)

**Step 1: Get Previous Version**
```bash
# Check current version
git log --oneline | head -5

# Output:
# abc1234 v1.2.3: Deployed
# def5678 v1.2.2: Previous ← Checkout this
# ghi9012 v1.2.1

# Checkout previous version
git checkout def5678  # or git checkout main~1
```

**Step 2: Build Previous Version**
```bash
# Install dependencies
npm ci

# Build production bundle
npm run build

# Expected: Build completes without errors
```

**Step 3: Deploy Previous Version**
```bash
# Option A: Docker
docker build -t app:v1.2.2 .
docker push gcr.io/project/app:v1.2.2
kubectl set image deployment/app app=gcr.io/project/app:v1.2.2

# Option B: Direct (systemd)
sudo systemctl stop app
npm run start > /var/log/app.log 2>&1 &
sudo systemctl start app

# Option C: Check if service is running
systemctl status app
```

**Step 4: Verify Rollback**
```bash
# Check service is running
curl localhost:3000/health

# Monitor logs
tail -f /var/log/app.log | grep -E "error|ERROR|Error" &

# After 2 minutes, if no errors, rollback successful
```

---

## Post-Rollback Procedure

### Immediate Actions (0-5 minutes)

**Step 1: Announce Rollback**
```bash
# Notify team immediately
cat <<EOF | jq . > /tmp/rollback.json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "⚠️  *PRODUCTION ROLLBACK EXECUTED*\nFrom: v1.2.3\nTo: v1.2.2\nReason: High error rate (8%)\nStatus: Previous version now active"
      }
    }
  ]
}
EOF

curl -X POST $SLACK_WEBHOOK_URL -d @/tmp/rollback.json

# Email notification
mail -s "ALERT: Production Rollback from v1.2.3 to v1.2.2" \
  team@disasterrecovery.com.au
```

**Step 2: Verify System Health**
```bash
# Monitor error rate (should drop immediately)
watch -n 2 'curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate'

# Expected: Error rate drops to < 1% within 1 minute

# Check database
psql $DATABASE_URL -c "SELECT 1;"

# Check cache
redis-cli -u $REDIS_URL PING
```

**Step 3: Create Incident**
```bash
# Create incident ticket
gh issue create \
  --title "INCIDENT: Production Rollback from v1.2.3 to v1.2.2" \
  --body "Rollback executed due to high error rate.

From: v1.2.3
To: v1.2.2
Error rate: 8% (threshold: 5%)
Rollback time: $(date)

Root cause: TBD
Resolution: TBD" \
  --label "severity/P1,type/incident"
```

### Investigation (5-60 minutes)

**Step 1: Gather Failure Information**
```bash
# Get error details from Sentry
curl -s "https://sentry.io/api/0/issues/?is:unresolved&statsPeriod=1h" | \
  jq '.[] | {title, count, lastSeen}'

# Get error logs
kubectl logs -l app=app --since=15m | grep -i error | head -20

# Check database logs
psql $DATABASE_URL -c "
SELECT * FROM pg_log
WHERE logged > NOW() - INTERVAL '15 minutes'
ORDER BY logged DESC
LIMIT 10;"
```

**Step 2: Identify Root Cause**
```bash
# What changed in v1.2.3?
git log main~1..HEAD --oneline

# git diff v1.2.2..v1.2.3 | head -100

# Was it a code change?
# - Review git commits
# - Check changes in lib/auth, lib/api, database
# - Look for error handling issues

# Was it a configuration change?
# - Environment variables changed?
# - Database schema changed?
# - New features enabled?

# Was it infrastructure?
# - Database migration failed?
# - Cache connection issues?
# - Payment processing down?
```

**Step 3: Document Root Cause**
```bash
# Update incident ticket with findings
gh issue edit <issue-number> \
  --body "... Root cause: Database migration introduced a constraint violation in payment table ..."
```

### Resolution (60+ minutes)

**Step 1: Fix the Issue**
```bash
# Create new branch
git checkout -b fix/payment-constraint-issue

# Make necessary fixes
# - Revert problematic migration
# - Fix constraint validation
# - Add comprehensive tests

# Test locally
npm run test:integration

# Test on staging
git push origin fix/payment-constraint-issue
# Deploy to staging and verify
```

**Step 2: Re-deploy with Fix**
```bash
# Create pull request
gh pr create \
  --title "Fix: Payment constraint validation error" \
  --body "This PR fixes the issue introduced in v1.2.3..."

# Get PR reviewed and approved

# Merge to main
gh pr merge <pr-number> --merge

# Deploy new version
# See deployment.md for full deployment procedure

# New version: v1.2.4
```

**Step 3: Verify Fix**
```bash
# Monitor error rate
watch 'curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate'

# Run smoke tests
npm run test:smoke -- --target https://api.disasterrecovery.com.au

# Check specific issue is resolved
psql $DATABASE_URL -c "
SELECT COUNT(*) FROM payment
WHERE amount < 0 OR amount > 999999999;"
# Expected: 0 (no constraint violations)
```

**Step 4: Close Incident**
```bash
# Update incident ticket
gh issue edit <issue-number> \
  --body "... RESOLVED in v1.2.4 - Re-deployed with fix ..."

# Close ticket
gh issue close <issue-number>

# Post resolution message
curl -X POST $SLACK_WEBHOOK_URL -d '{
  "text": "✅ INCIDENT RESOLVED: Production back to v1.2.4 with fix"
}'
```

---

## Fallback Strategies

### If Rollback Fails

**Symptoms**: Rollback didn't fix the issue

**Solution**:
```bash
# Go back further
kubectl rollout undo deployment/app --to-revision=3
# or
vercel promote <two-versions-back-id>

# If still not working:
# - Restore from backup
# - Bring up standby infrastructure
# - See disaster-recovery.md
```

### If Previous Version Also Has Issues

**Solution**:
```bash
# Roll forward instead of back
git checkout main
git revert <problematic-commit-hash>
npm run build && npm run deploy

# Or restore from backup
bash scripts/backup/restore-database.sh s3://backups/pre-issue.sql.gz
```

---

## Monitoring After Rollback

**First 5 minutes**:
- Error rate
- API latency
- Database connections
- Cache connectivity

**First 30 minutes**:
- Customer complaints
- Payment processing
- User sessions
- Feature functionality

**Ongoing**:
- Root cause analysis
- Fix implementation
- Re-testing
- Re-deployment planning

---

## Rollback Checklist

```
DECISION:
☐ Error rate > threshold
☐ Critical feature broken
☐ Infrastructure failure
☐ Decision to rollback approved

EXECUTION:
☐ Identify previous version
☐ Confirm rollback procedure
☐ Execute rollback
☐ Verify health checks pass

VERIFICATION:
☐ Error rate drops
☐ API responds normally
☐ Database accessible
☐ No new errors

POST-ROLLBACK:
☐ Team notified
☐ Incident created
☐ Root cause identified
☐ Fix developed
☐ Re-deployment scheduled
```

---

## Prevention

### Testing Before Deployment
- ✅ All tests passing
- ✅ Performance benchmarks met
- ✅ Database migrations tested
- ✅ Staged deployment verified

### Monitoring
- ✅ Real-time alerts configured
- ✅ Error tracking active
- ✅ Health checks frequent
- ✅ Team on standby

### Process
- ✅ Code review required
- ✅ Security scan passed
- ✅ Staged deployment required
- ✅ Gradual rollout (canary/blue-green)

---

**Last Updated**: 2024-01-15
**Test Frequency**: Monthly rollback drill
**Contact**: DevOps team
