# Deployment Runbook

**QUICK START**: Deploy to production in ~30 minutes (after testing)

---

## Pre-Deployment Checklist

```
☐ All tests passing (unit, integration, e2e)
☐ Code reviewed and approved
☐ Security scan passed
☐ Performance baseline acceptable
☐ Database migrations tested on staging
☐ Rollback plan prepared
☐ Incident commander assigned
☐ Deployment window approved
☐ Team on standby
☐ Monitoring dashboards ready
```

---

## Deployment Phases

### Phase 1: Pre-Flight Checks (5 minutes)

**Step 1: Verify Everything is Ready**
```bash
# Check git status
git status
# Expected: Clean working directory, on main branch

# Verify build artifacts
ls -la .next/
# Expected: Production build present

# Check environment
printenv | grep -E "NODE_ENV|NEXTAUTH_SECRET|DATABASE_URL"
# Expected: production, secrets set, database URL present

# Verify database migrations are ready
npm run migrate:status
# Expected: Pending migrations are the ones being deployed

# Check deployment credentials
aws sts get-caller-identity
# Expected: Correct AWS account (production)
```

**Step 2: Verify Monitoring is Active**
```bash
# Check Sentry is receiving events
curl -s https://sentry.io/api/0/projects/ | jq '.[] | {name, slug}'

# Verify PagerDuty integration
pagerduty services list | grep "Disaster Recovery"

# Check health check endpoints
curl https://api.staging.disasterrecovery.com.au/health
# Expected: 200 OK with healthy status

# Verify backup system working
aws s3 ls s3://dr-platform-backups/database/ | tail -3
# Expected: Recent backups present
```

**Step 3: Create Pre-Deployment Backup**
```bash
# Take manual backup before deploy
bash scripts/backup/backup-database.sh

# Verify backup created
aws s3 ls s3://dr-platform-backups/database/ | tail -1

# Wait for backup to complete
echo "Pre-deployment backup: ✅ Complete"
```

### Phase 2: Staging Verification (5 minutes)

**Step 1: Deploy to Staging First**
```bash
# Build production bundle
npm run build

# Verify build succeeds
echo "Build status: $?"
# Expected: 0 (success)

# Run final tests
npm run test:smoke -- --target https://api.staging.disasterrecovery.com.au

# Expected output:
# ✓ User login works
# ✓ Create service request works
# ✓ View dashboard works
# ✓ Payment endpoints accessible
# All tests passed: 12/12
```

**Step 2: Verify Staging Health**
```bash
# Check staging environment metrics
curl https://api.staging.disasterrecovery.com.au/metrics | jq '.error_rate'
# Expected: < 1%

# Check database connectivity
psql $STAGING_DATABASE_URL -c "SELECT 1;"
# Expected: 1

# Verify recent logs look clean
curl -s https://sentry.io/api/0/projects/ | grep -i "staging"
```

### Phase 3: Production Deployment (15 minutes)

**Step 1: Announce Deployment**
```bash
# Post to #deployments
cat <<EOF | jq . > /tmp/announce.json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "🚀 *PRODUCTION DEPLOYMENT STARTING*\nVersion: v1.2.3\nEstimated duration: 20 minutes\nServices: API, Dashboard, Payment Processing"
      }
    }
  ]
}
EOF

# Post message
curl -X POST $SLACK_WEBHOOK_URL -d @/tmp/announce.json
```

**Step 2: Deploy Application**
```bash
# Set environment
export ENVIRONMENT=production
export NODE_ENV=production

# Deploy using your deployment system (e.g., Vercel, Docker, K8s)
# Option A: Vercel (npm)
npm run deploy:prod

# Option B: Docker (manual)
docker build -t app:latest .
docker push gcr.io/project/app:latest
kubectl set image deployment/app app=gcr.io/project/app:latest

# Option C: Direct deployment
ssh prod-server "cd /app && git fetch origin && git checkout main && npm ci && npm run build && systemctl restart app"

# Expected output:
# Deployment successful
# New version active at: api.disasterrecovery.com.au
```

**Step 3: Run Database Migrations (if needed)**
```bash
# Check for pending migrations
npm run migrate:status

# If migrations pending:
npm run migrate:deploy

# Expected:
# Running migration: 20240115_add_audit_log.sql
# Migration completed successfully
# All migrations applied

# Verify migrations applied
psql $DATABASE_URL -c "SELECT name FROM migrations ORDER BY created_at DESC LIMIT 5;"
```

**Step 4: Deploy Configuration Updates**
```bash
# Update environment variables (if changed)
# This depends on your deployment platform

# Verify new configs are loaded
curl https://api.disasterrecovery.com.au/config/version
# Expected: New version number

# Restart services if needed
kubectl rollout restart deployment/app
```

### Phase 4: Verification (10 minutes)

**Step 1: Health Checks**
```bash
# Check all instances healthy
kubectl get pods -l app=app
# Expected: All pods Running, Ready 1/1

# Check API connectivity
for i in {1..5}; do
  curl -s https://api.disasterrecovery.com.au/health | jq .status
  sleep 1
done
# Expected: All return "healthy"

# Verify database connection
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"User\";"
# Expected: Reasonable row count

# Check cache connectivity
redis-cli -u $REDIS_URL PING
# Expected: PONG
```

**Step 2: Error Rate Check**
```bash
# Monitor error rate for 2 minutes
for i in {1..12}; do
  echo "Check $i: $(date)"
  curl -s https://api.disasterrecovery.com.au/metrics | grep error_rate
  sleep 10
done

# Expected: Error rate stays < 0.5% (within normal range)
# If error rate > 2%, investigate before proceeding
```

**Step 3: Critical Endpoint Tests**
```bash
# Test user authentication
curl -X POST https://api.disasterrecovery.com.au/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
# Expected: 200 OK or 401 Unauthorized (depends on credentials)

# Test service requests
curl -X GET https://api.disasterrecovery.com.au/api/service-requests \
  -H "Authorization: Bearer $TEST_TOKEN"
# Expected: 200 OK with data

# Test payments
curl -X GET https://api.disasterrecovery.com.au/api/payments \
  -H "Authorization: Bearer $TEST_TOKEN"
# Expected: 200 OK

# Test dashboard
curl -X GET https://api.disasterrecovery.com.au/api/dashboard/metrics \
  -H "Authorization: Bearer $TEST_TOKEN"
# Expected: 200 OK with metrics
```

### Phase 5: Post-Deployment (5 minutes)

**Step 1: Monitor for Stability**
```bash
# Watch metrics dashboard for 5 minutes
watch -n 5 'curl -s https://api.disasterrecovery.com.au/metrics | \
  jq "{error_rate, api_latency_p95_ms, requests_per_second}"'

# Check logs for errors
kubectl logs -f deployment/app --tail=50 | grep -i error

# Expected: No new errors, metrics stable
```

**Step 2: Notify Stakeholders**
```bash
# Post deployment success message
cat <<EOF | jq . > /tmp/success.json
{
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "✅ *PRODUCTION DEPLOYMENT COMPLETE*\nVersion: v1.2.3\nStatus: HEALTHY\nError rate: 0.1%\nResponse time p95: 250ms"
      }
    }
  ]
}
EOF

curl -X POST $SLACK_WEBHOOK_URL -d @/tmp/success.json

# Send email notification
mail -s "Production Deployment Complete v1.2.3" \
  team@disasterrecovery.com.au <<EOF
Deployment completed successfully.

Version: v1.2.3
Deployed: $(date)
Services: All operational
Status: Healthy

Monitoring dashboards:
- Operations: https://grafana.internal/d/ops
- Errors: https://sentry.io/
EOF
```

**Step 3: Update Deployment Log**
```bash
# Log deployment details
cat >> /var/log/deployments.log <<EOF
[$(date)] Deployment v1.2.3
Status: SUCCESS
Duration: 25 minutes
Error rate: 0.1%
Issues: None
Deployed by: $(whoami)
EOF

# Document in change log
echo "## v1.2.3 - $(date +%Y-%m-%d)" >> CHANGELOG.md
echo "- Feature: X" >> CHANGELOG.md
echo "- Fix: Y" >> CHANGELOG.md
git add CHANGELOG.md && git commit -m "docs: Update changelog for v1.2.3"
```

---

## Monitoring During Deployment

**Every 5 minutes check**:
```bash
# Error rate
curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate

# API latency (p95)
curl -s https://api.disasterrecovery.com.au/metrics | jq .api_latency_p95_ms

# Request rate
curl -s https://api.disasterrecovery.com.au/metrics | jq .requests_per_second

# Database connections
psql $DATABASE_URL -c "SELECT count(*) FROM pg_stat_activity;"

# Active errors
curl -s https://sentry.io/api/0/issues/?is:unresolved | jq '.[] | {title, count}'
```

**Alert Thresholds**:
- Error rate > 5% → STOP and investigate
- API latency p95 > 5s → STOP and investigate
- Database connections > 80% → Scale and continue monitoring
- New critical errors → STOP and investigate

---

## Rollback Procedure

**If deployment causes issues**:

```bash
# STEP 1: Immediate action (within 2 minutes)
# Option A: Vercel - Revert to previous deployment
vercel deployments list | head -5
vercel promote <previous-deployment-id>

# Option B: Kubernetes - Rollback previous version
kubectl rollout history deployment/app
kubectl rollout undo deployment/app

# Option C: Manual - Restart previous version
git checkout main~1  # Previous commit
npm run build
npm run start

# STEP 2: Verify rollback
curl https://api.disasterrecovery.com.au/health
# Expected: Previous version responding

# STEP 3: Notify team
echo "ROLLBACK COMPLETE - Previous version active"

# STEP 4: Investigate issue
# - Check logs for errors
# - Review changes that caused issue
# - Plan fix and re-test
```

**Post-Rollback**:
1. Notify stakeholders
2. Create incident ticket
3. Root cause analysis
4. Fix issues locally
5. Re-test thoroughly
6. Plan re-deployment with fixes

---

## Deployment Checklist

```
PRE-DEPLOYMENT:
☐ All tests passing
☐ Code reviewed
☐ Security scan passed
☐ Performance acceptable
☐ Migrations tested
☐ Team notified
☐ Monitoring ready
☐ Rollback plan ready

DEPLOYMENT:
☐ Pre-flight checks passed
☐ Staging verified
☐ Backup created
☐ Application deployed
☐ Migrations applied
☐ Configurations updated
☐ Health checks passed
☐ Error rate < 0.5%

POST-DEPLOYMENT:
☐ All endpoints working
☐ Database healthy
☐ Metrics stable
☐ Stakeholders notified
☐ Deployment logged
☐ Changelog updated
☐ Monitoring active
☐ Team standing by
```

---

## Common Issues & Solutions

### Deployment Hangs
**Symptoms**: Deployment status stuck for > 30 min

**Solution**:
```bash
# Check deployment status
kubectl get pods -l app=app
# If ImagePullBackOff → Docker image issue

# Check logs
kubectl logs <pod-name> --previous

# Restart deployment
kubectl rollout restart deployment/app
```

### Database Migration Fails
**Symptoms**: Migration error during deployment

**Solution**:
```bash
# Check migration status
npm run migrate:status

# Rollback migration
npm run migrate:rollback

# Fix migration file
# Edit migration file
# Re-apply
npm run migrate:deploy
```

### High Error Rate After Deploy
**Symptoms**: Error rate > 5% after deployment

**Solution**:
```bash
# Immediate: Rollback
kubectl rollout undo deployment/app

# Check error details
curl -s https://sentry.io/api/0/issues/?is:unresolved | jq '.[0] | {title, firstSeen}'

# Review recent changes
git diff HEAD~1

# Fix and test locally
# Re-deploy after verification
```

---

**Last Updated**: 2024-01-15
**Next Review**: 2024-02-15
