# Monitoring & Alerting Strategy

## Overview

This document describes the comprehensive monitoring and alerting system for the Disaster Recovery NRPG Platform. It includes metrics, dashboards, alerting rules, and thresholds for maintaining platform health and responding to issues.

---

## Architecture

```
Applications (Next.js, Database, Services)
        ↓
Instrumentation (Sentry, StatsD, OpenTelemetry)
        ↓
Aggregation Layer (Sentry, Prometheus, InfluxDB)
        ↓
Visualization (Sentry Dashboard, Grafana)
        ↓
Alerting (PagerDuty, Slack, Email)
        ↓
Response (Incident Management)
```

---

## Key Metrics

### Application Metrics

**Response Time**:
- API p50: < 100ms
- API p95: < 1 second
- API p99: < 5 seconds
- Alert: p95 > 5 seconds (P1)

**Error Rate**:
- Target: < 0.5%
- Warning: 0.5% - 2%
- Critical: > 5%
- Alert: Error rate spike > 200% above baseline (P1)

**Request Rate**:
- Normal: 100-500 req/s
- Peak: 1000-2000 req/s
- Alert: Rate > 5x baseline (possible DDoS)

**Resource Usage**:
- CPU: < 70% normal, > 85% alert
- Memory: < 75% normal, > 90% alert
- Disk: < 80% normal, > 90% alert

### Database Metrics

**Connection Pool**:
- Used: < 50% of max
- Alert: Used > 80% of max

**Query Performance**:
- p50: < 50ms
- p95: < 500ms
- p99: < 2 seconds
- Alert: p95 > 2s (slow queries)

**Query Count**:
- Normal: 100-500 queries/s
- Alert: Rapid increase (query explosion)

**Lock Wait Time**:
- Normal: 0ms
- Alert: Any lock wait > 100ms

**Replication Lag** (if applicable):
- Target: < 1 second
- Alert: > 5 seconds

### Business Metrics

**Revenue**:
- Daily revenue
- Failed transactions
- Chargeback rate

**User Activity**:
- Active users
- New signups
- Session duration
- Churn rate

**Service Completion**:
- Jobs completed
- Completion rate
- Average time-to-completion

---

## Alerting Rules

### P0 (Critical - Immediate)

| Alert | Condition | Action |
|-------|-----------|--------|
| Application Down | No healthy instances | Page on-call immediately |
| Database Down | Connection refused | Page DBA immediately |
| Payment Processing Down | 100% failures | Page VP Eng |
| Data Corruption | Constraint violations | Declare incident |
| Security Breach | Unauthorized access detected | Security team + incident |

### P1 (Urgent - 15 min)

| Alert | Condition | Action |
|-------|-----------|--------|
| Error Rate Spike | > 5% error rate | Page on-call |
| High API Latency | p95 > 5 seconds | Page on-call |
| Database Slow | Query p95 > 2s | Page DBA |
| Memory Leak | Memory increasing 100% over 1 hour | Page on-call |
| Disk Full | > 90% disk usage | Page ops team |
| Certificate Expiring | < 14 days to expiry | Send notification |

### P2 (Important - 1 hour)

| Alert | Condition | Action |
|-------|-----------|--------|
| Elevated Error Rate | 1% - 5% error rate | Ticket + monitoring |
| Performance Degradation | p95 latency 2-5 seconds | Investigate |
| High CPU | > 80% CPU for 10+ min | Check for expensive operations |
| Memory High | > 85% memory usage | Monitor for leak |

### P3 (Informational)

| Alert | Condition | Action |
|-------|-----------|--------|
| Backup Failed | Backup didn't complete | Review logs |
| Slow Query Detected | Single query > 5s | Log and optimize |
| Unusual Traffic Pattern | Not critical but anomalous | Log for analysis |

---

## Dashboard Configuration

### Executive Dashboard
**Audience**: Leadership, stakeholders

**Metrics**:
- System status (all green/red)
- Revenue today/this week
- Active users (real-time)
- Uptime percentage
- Incident count

### Operations Dashboard
**Audience**: On-call engineers

**Metrics**:
- Error rate trend (1h, 24h)
- API latency (p50, p95, p99)
- Request rate
- Database performance
- Resource utilization (CPU, memory, disk)
- Active incidents/alerts
- Response time distribution

### Database Dashboard
**Audience**: Database team

**Metrics**:
- Connection pool status
- Active connections
- Query performance (p50, p95, p99)
- Replication lag
- Long-running queries
- Lock wait times
- Transaction rate
- Vacuum/maintenance status

### Business Dashboard
**Audience**: Product, Finance

**Metrics**:
- Daily revenue
- New users
- Active users
- Retention rate
- Feature usage
- Service completion rate
- Customer satisfaction

### Security Dashboard
**Audience**: Security team

**Metrics**:
- Failed login attempts
- Account lockouts
- Suspicious activity
- API abuse patterns
- SSL/TLS issues
- Access control violations
- Data export attempts

---

## Sentry Configuration

### Transaction Tracing
- 10% sampling in production
- 100% in staging/development
- Critical paths at 100% sampling

### Error Tracking
- All errors captured
- Sourcemaps enabled
- Session replay enabled (5% sample)
- Breadcrumb trail with depth 50+

### Performance Monitoring
- API endpoints traced
- Database operations traced
- Frontend interactions traced
- Custom metrics captured

---

## Alert Routing

### PagerDuty Integration
```
P0 Alert
  ↓
Page on-call engineer (SMS + phone)
  ↓
5 min: Escalate to backup if not acknowledged
  ↓
15 min: Escalate to manager
  ↓
30 min: Escalate to CTO
```

### Slack Notifications
- **#incidents**: All P0/P1 alerts, incident status
- **#alerts**: All P2/P3 alerts, warnings
- **#monitoring**: Metrics, analytics, insights

### Email Alerts
- **Critical Issues**: Immediate email
- **Daily Digest**: Summary of P2/P3 events
- **Weekly Report**: Performance trends

---

## Threshold Configuration

### API Response Time
```yaml
- name: api_latency_p95
  threshold: 5_000ms  # 5 seconds
  severity: P1
  duration: 2 minutes

- name: api_latency_p99
  threshold: 10_000ms  # 10 seconds
  severity: P2
  duration: 5 minutes
```

### Database Performance
```yaml
- name: db_query_duration_p95
  threshold: 2_000ms  # 2 seconds
  severity: P1
  duration: 2 minutes

- name: db_connections_used_pct
  threshold: 80%
  severity: P1
  duration: immediate
```

### Error Rates
```yaml
- name: error_rate_absolute
  threshold: 5%
  severity: P1
  duration: 5 minutes

- name: error_rate_spike
  threshold: 200% increase from baseline
  severity: P1
  duration: 2 minutes
```

### Resource Utilization
```yaml
- name: cpu_usage_pct
  threshold: 85%
  severity: P1
  duration: 5 minutes

- name: memory_usage_pct
  threshold: 90%
  severity: P1
  duration: 5 minutes

- name: disk_usage_pct
  threshold: 90%
  severity: P1
  duration: immediate
```

---

## Health Checks

### Application Health
```bash
# Endpoint: /health
GET /health HTTP/1.1
Host: api.disasterrecovery.com.au

Response:
{
  "status": "healthy",
  "version": "1.2.3",
  "uptime": 86400,
  "database": "connected",
  "cache": "connected",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

**Check Frequency**: Every 10 seconds
**Timeout**: 5 seconds
**Failure Threshold**: 3 consecutive failures

### Database Health
```sql
-- Run every 30 seconds
SELECT
  CASE WHEN pg_is_in_recovery() THEN 'standby' ELSE 'primary' END as mode,
  EXTRACT(EPOCH FROM (NOW() - pg_postmaster_start_time())) as uptime_seconds,
  (SELECT count(*) FROM pg_stat_activity) as active_connections,
  (SELECT sum(heap_blks_read) FROM pg_statio_user_tables) as cache_misses;
```

### Cache Health (Redis)
```bash
# Command: PING
# Expected: PONG
# Check frequency: Every 30 seconds
```

---

## On-Call Runbook

### When Alert Fires

1. **Acknowledge Alert** (within 2 minutes)
   - Click "Acknowledge" in PagerDuty
   - Confirm in #incidents Slack channel

2. **Assess Severity**
   - Check dashboard
   - Review related alerts
   - Determine if incident vs anomaly

3. **Take Action**
   - If simple fix (restart service): Do it
   - If investigation needed: Start war room
   - If infrastructure: Escalate to ops team

4. **Communicate**
   - Update #incidents every 5 minutes
   - Notify via email if customer-facing
   - Page escalation contacts if needed

5. **Document**
   - Log actions taken
   - Record timeline
   - Schedule post-incident review

---

## Monitoring Gaps & Improvements

### Current Monitoring
- ✅ Application errors (Sentry)
- ✅ Infrastructure metrics (CloudWatch)
- ✅ Uptime monitoring
- ✅ Database query logs

### Monitoring to Add
- ⏳ Distributed tracing (OpenTelemetry)
- ⏳ Log aggregation (ELK/Loki)
- ⏳ Custom business metrics
- ⏳ Frontend performance (Core Web Vitals)
- ⏳ Real user monitoring (RUM)

### Priority: Q1 2024
1. Implement OpenTelemetry for distributed tracing
2. Add log aggregation system
3. Set up Real User Monitoring
4. Create business metrics dashboard

---

## Testing Monitoring

### Monthly Alert Test
```bash
# Trigger test alert in PagerDuty
pagerduty alerts trigger --service monitoring-test

# Verify:
- PagerDuty notification received
- Slack message posted
- Alert acknowledged
- Escalation not triggered
```

### Quarterly Monitoring Drill
1. Simulate database failure
2. Verify monitoring detects it
3. Verify alerts fire
4. Test escalation
5. Document findings

---

## Tools & Services

| Tool | Purpose | Config |
|------|---------|--------|
| Sentry | Error tracking & APM | `lib/observability/sentry-config.ts` |
| PagerDuty | Incident alerting | Configured with API key |
| Grafana | Dashboard visualization | Production dashboards |
| CloudWatch | Infrastructure metrics | AWS monitoring |
| Custom Scripts | Health checks | Running every 10-30s |

---

## References

- [Sentry Documentation](https://docs.sentry.io)
- [PagerDuty Documentation](https://developer.pagerduty.com)
- [CloudWatch Documentation](https://docs.aws.amazon.com/cloudwatch/)
- [Observability Best Practices](https://opentelemetry.io/docs/)

---

**Document Version**: 1.0
**Last Updated**: 2024-01-15
**Next Review**: 2024-03-15
