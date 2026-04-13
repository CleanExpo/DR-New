# Secrets Rotation Runbook

**QUICK START**: Rotate secrets in ~1 hour (production impact: minimal)

---

## Secrets to Rotate

### Critical Secrets (Monthly)
```
☐ JWT_SECRET / NEXTAUTH_SECRET
☐ Database password
☐ Redis password
☐ AWS access keys
☐ API keys (Stripe, SendGrid, etc.)
```

### Important Secrets (Quarterly)
```
☐ GitHub tokens
☐ Sentry DSN
☐ Third-party service keys
☐ Encryption keys
```

### Review Secrets (Annually)
```
☐ SSL/TLS certificates
☐ Database backups encryption keys
☐ Vault master keys
```

---

## Rotation Schedule

| Secret | Frequency | Last Rotated | Next Due |
|--------|-----------|--------------|----------|
| NEXTAUTH_SECRET | Monthly | Jan 1, 2024 | Feb 1, 2024 |
| Database Password | Monthly | Jan 1, 2024 | Feb 1, 2024 |
| AWS Keys | Monthly | Jan 1, 2024 | Feb 1, 2024 |
| API Keys | Quarterly | Oct 1, 2023 | Jan 1, 2024 |

---

## Rotation Procedure

### Phase 1: Prepare New Secrets (10 minutes)

**Step 1: Generate New Secrets**
```bash
# Generate new JWT secret
openssl rand -hex 32
# Output: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6

# Generate new database password (20 chars, mixed case/numbers/symbols)
openssl rand -base64 20 | tr -dc 'A-Za-z0-9!@#$%^&*' | head -c 20

# Generate new Redis password
openssl rand -base64 16

# Store temporarily in secure location
echo "JWT_SECRET=<new-secret>" > /tmp/secrets.txt
chmod 600 /tmp/secrets.txt
```

**Step 2: Verify New Secrets**
```bash
# Check format
grep "^JWT_SECRET=" /tmp/secrets.txt
grep "^DB_PASSWORD=" /tmp/secrets.txt

# Verify length (min 16 chars)
wc -c < /tmp/secrets.txt

# Verify no special characters that could break configs
cat /tmp/secrets.txt | grep -E '[^A-Za-z0-9!@#$%^&*]'
# Should return nothing (blank line)
```

### Phase 2: Update in Secret Manager (5-10 minutes)

**Step 1: Update GitHub Secrets**
```bash
# If using GitHub Secrets
gh secret set JWT_SECRET < <(echo -n "new-jwt-secret-value")
gh secret set DATABASE_URL < <(echo -n "postgresql://user:newpassword@host:5432/db")
gh secret set REDIS_URL < <(echo -n "redis://:newpassword@host:6379")

# Verify update
gh secret list
```

**Step 2: Update Vercel Secrets (if deployed on Vercel)**
```bash
# Using Vercel CLI
vercel env add JWT_SECRET
# Prompted for: [production] [preview] [development]
# Select: production

vercel env add DATABASE_URL
# Select: production

vercel env add REDIS_URL
# Select: production

# Verify
vercel env list
```

**Step 3: Update AWS Secrets Manager**
```bash
# Create new secret version
aws secretsmanager put-secret-value \
  --secret-id dr-platform/production \
  --secret-string '{
    "JWT_SECRET": "new-secret",
    "DATABASE_PASSWORD": "new-password",
    "REDIS_PASSWORD": "new-redis-password"
  }'

# Verify
aws secretsmanager get-secret-value --secret-id dr-platform/production
```

**Step 4: Update Environment Variables**
```bash
# SSH into production servers
ssh prod-app-1 "export JWT_SECRET=new-secret && export DATABASE_URL=..."

# Or if using Kubernetes secrets
kubectl create secret generic app-secrets \
  --from-literal=JWT_SECRET="new-jwt-secret" \
  --from-literal=DATABASE_URL="..." \
  --dry-run=client -o yaml | kubectl apply -f -
```

### Phase 3: Restart Services (5 minutes)

**Step 1: Restart Application Services**
```bash
# Option A: Rolling restart (Kubernetes - no downtime)
kubectl rollout restart deployment/app
kubectl rollout status deployment/app --timeout=5m

# Option B: Systemd restart (with brief downtime)
systemctl restart app

# Option C: Docker restart
docker restart app-container

# Wait for services to stabilize
sleep 30
```

**Step 2: Verify Services Are Running**
```bash
# Check pods
kubectl get pods -l app=app

# Check service endpoint
curl https://api.disasterrecovery.com.au/health
# Expected: 200 OK, status: "healthy"

# Check database connectivity
psql $DATABASE_URL -c "SELECT 1;"

# Check Redis connectivity
redis-cli -u $REDIS_URL PING
# Expected: PONG
```

### Phase 4: Verify Functionality (5 minutes)

**Step 1: Test Critical Flows**
```bash
# Test user login (uses JWT_SECRET)
curl -X POST https://api.disasterrecovery.com.au/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
# Expected: 200 OK or 401 (depends on credentials)

# Test database access
curl https://api.disasterrecovery.com.au/api/user/me \
  -H "Authorization: Bearer $TEST_TOKEN"
# Expected: 200 OK

# Test cache access (if used)
curl https://api.disasterrecovery.com.au/api/cache-test
# Expected: 200 OK
```

**Step 2: Monitor Error Rate**
```bash
# Watch for errors after restart
watch -n 5 'curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate'

# Expected: Error rate < 1% and stable
# If error rate > 5%, investigate before proceeding
```

### Phase 5: Revoke Old Secrets (5 minutes)

**Step 1: Revoke Old Database Password**
```bash
# Connect with old password (last time it will work)
psql -h $DB_HOST -U $DB_USER -W

# Create new user with new password (already done above)
# Drop old password from any other apps that might use it

# Document revocation
echo "$(date): Revoked old database password" >> /var/log/secrets-rotation.log
```

**Step 2: Revoke Old API Keys**
```bash
# Stripe
curl https://api.stripe.com/v1/api_keys \
  -u sk_live_old_key_here: \
  -X DELETE

# SendGrid
curl "https://api.sendgrid.com/v3/api_keys/old-key-id" \
  -X DELETE \
  -H "Authorization: Bearer $SENDGRID_MASTER_KEY"

# Others - Follow vendor documentation
```

**Step 3: Revoke Old AWS Keys**
```bash
# Deactivate old access key (don't delete immediately)
aws iam update-access-key \
  --access-key-id YOUR_OLD_ACCESS_KEY_ID \
  --status Inactive

# Wait 7 days to ensure no active connections
# Then delete
aws iam delete-access-key --access-key-id YOUR_OLD_ACCESS_KEY_ID
```

---

## Rotation Schedule

### Monthly Rotation (First of Month, 2 AM UTC)

```
1. Generate new JWT_SECRET
2. Update GitHub Secrets
3. Update Vercel Secrets
4. Update AWS Secrets Manager
5. Restart all services
6. Verify functionality
7. Revoke old secrets
8. Document rotation
9. Alert team
```

### Quarterly Rotation (Feb 1, May 1, Aug 1, Nov 1)

Include all monthly secrets plus:
```
- API keys (Stripe, SendGrid, etc.)
- GitHub tokens
- Third-party service credentials
```

### Annual Review (Jan 1)

Review all secrets and decide:
```
- Keep current rotation schedule? Yes/No
- Need to rotate SSL certificates? Yes/No
- Update secret manager? Yes/No
- Train team on procedures? Yes/No
```

---

## Emergency Secret Rotation

**If secret is compromised**:

```bash
# IMMEDIATE (0-5 min):
1. Revoke compromised secret
   - Disable API key in vendor console
   - Deactivate IAM access key
   - Expire JWT tokens

2. Generate new secret
   openssl rand -hex 32

3. Update in all systems
   - GitHub Secrets
   - Environment variables
   - Kubernetes secrets

4. Restart services
   kubectl rollout restart deployment/app

5. Monitor for unusual activity
   curl https://api.disasterrecovery.com.au/metrics

# FIRST HOUR:
6. Notify security team
7. Check for unauthorized access in logs
8. Investigate how secret was compromised
9. Document incident

# WITHIN 24 HOURS:
10. Complete incident investigation
11. Patch vulnerability (if applicable)
12. Update security procedures
13. Schedule post-incident review
```

---

## Automation

### Automated Secret Rotation Script

```bash
#!/bin/bash
# rotation-script.sh - Automate secret rotation

set -e

SECRET_NAME="dr-platform/production"
ROTATE_DATE=$(date +%Y-%m-%d)

# Generate new secrets
NEW_JWT_SECRET=$(openssl rand -hex 32)
NEW_DB_PASSWORD=$(openssl rand -base64 20 | tr -dc 'A-Za-z0-9!@#$%^&*' | head -c 20)

# Update AWS Secrets Manager
aws secretsmanager put-secret-value \
  --secret-id $SECRET_NAME \
  --secret-string "{\"JWT_SECRET\": \"$NEW_JWT_SECRET\", \"DATABASE_PASSWORD\": \"$NEW_DB_PASSWORD\"}"

# Update GitHub Secrets
gh secret set JWT_SECRET <<< "$NEW_JWT_SECRET"

# Update Vercel
vercel env add JWT_SECRET "production" <<< "$NEW_JWT_SECRET"

# Restart services
kubectl rollout restart deployment/app

# Monitor
sleep 30
ERROR_RATE=$(curl -s https://api.disasterrecovery.com.au/metrics | jq .error_rate)

if (( $(echo "$ERROR_RATE > 0.05" | bc -l) )); then
  echo "ERROR: High error rate after rotation: $ERROR_RATE"
  exit 1
fi

echo "Rotation completed: $ROTATE_DATE"
```

### Schedule with Cron

```bash
# Rotate secrets on 1st of every month at 2 AM UTC
0 2 1 * * /usr/local/bin/rotation-script.sh >> /var/log/rotation.log 2>&1

# Email report
0 2 1 * * mail -s "Secrets Rotated $(date +\%Y-\%m-\%d)" ops@disasterrecovery.com.au < /var/log/rotation.log
```

---

## Documentation

### Rotation Log

```
Date            Secret              Status    Notes
---             ------              ------    -----
2024-01-01      JWT_SECRET          ✓         Completed without issues
2024-01-01      DATABASE_PASSWORD   ✓         Completed without issues
2024-01-01      REDIS_PASSWORD      ✓         Completed without issues
```

### Secret Vault

Store securely in password manager or secret vault:
```
Service: Stripe
Key: sk_live_...
Next Rotation: Jan 1, 2024
Rotation Method: Via Stripe console
```

---

## Checklist

```
PREPARATION:
☐ Generate new secrets
☐ Verify secret format
☐ Backup old secrets
☐ Notify team

UPDATE SYSTEMS:
☐ GitHub Secrets updated
☐ Vercel Secrets updated
☐ AWS Secrets Manager updated
☐ Environment variables updated

RESTART & VERIFY:
☐ Services restarted
☐ Health checks pass
☐ Error rate normal
☐ Functionality tested

CLEANUP:
☐ Old secrets revoked
☐ Documentation updated
☐ Rotation logged
☐ Team notified
```

---

**Last Rotated**: 2024-01-01
**Next Rotation**: 2024-02-01
**Rotation Owner**: DevOps Team
