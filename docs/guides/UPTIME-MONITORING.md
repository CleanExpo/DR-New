# Uptime Monitoring Setup Guide

**Platform:** DR-NRPG (disasterrecovery.com.au)
**Recommended:** BetterStack (formerly Logtail/Uptime)
**Last Updated:** 2026-03-05

---

## Why BetterStack

BetterStack provides uptime monitoring, log aggregation, and incident management in a single platform. It has native Vercel integration, a generous free tier, and Australian monitoring nodes.

---

## Endpoints to Monitor

| Endpoint | Purpose | Method | Expected Status | Check Interval |
|----------|---------|--------|-----------------|----------------|
| `https://disasterrecovery.com.au/` | Homepage / CDN availability | GET | 200 | 60s |
| `https://disasterrecovery.com.au/api/health` | App server health | GET | 200 | 30s |
| `https://disasterrecovery.com.au/api/health/db` | Database connectivity | GET | 200 | 60s |

---

## Alert Thresholds

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Endpoint down | >2 minutes (3 consecutive failures) | Email + Slack alert |
| Response time | >3 seconds average over 5 checks | Warning notification |
| SSL certificate expiry | <14 days remaining | Email alert |

---

## BetterStack Setup Steps

### 1. Create Account

Sign up at https://betterstack.com (free tier covers 10 monitors, 3 integrations).

### 2. Add Monitors

For each endpoint in the table above:

1. Go to **Monitors** > **Create monitor**
2. Set **Monitor type** to HTTP(S)
3. Enter the URL
4. Set **Check period** per the table (30s or 60s)
5. Set **Confirmation period** to 120 seconds (2 minutes)
6. Set **Request timeout** to 3000ms
7. Enable **SSL expiry monitoring** (14 day warning)

### 3. Configure Alerts

1. Go to **Alerting** > **Escalation policies**
2. Create a policy:
   - **Step 1:** Email to support@disasterrecovery.com.au (immediate)
   - **Step 2:** Slack channel #ops-alerts (immediate)
   - **Step 3:** SMS to on-call (after 10 minutes if unacknowledged)
3. Assign this policy to all monitors

### 4. Status Page (Optional)

1. Go to **Status pages** > **Create status page**
2. Add all three monitors
3. Custom domain: `status.disasterrecovery.com.au` (CNAME to BetterStack)
4. This gives clients a public view of platform health

### 5. Vercel Log Drain Integration

Connect Vercel logs to BetterStack for centralised log search:

1. In BetterStack, go to **Sources** > **Create source**
2. Select **Vercel** as the platform
3. Copy the **Source token** (this is your `BETTERSTACK_SOURCE_TOKEN`)
4. In Vercel project settings, go to **Log Drains**
5. Add a new log drain:
   - **Delivery format:** NDJSON
   - **Endpoint:** `https://in.logs.betterstack.com` (provided by BetterStack)
   - **Headers:** `Authorization: Bearer <BETTERSTACK_SOURCE_TOKEN>`
6. Select environments: Production + Preview

### 6. Environment Variable

Add to your `.env.local` (and Vercel environment variables):

```
BETTERSTACK_SOURCE_TOKEN="your_source_token_here"
```

This token is already templated in `.env.example`.

---

## Health Check Endpoint Implementation

The platform exposes health checks at:

- **`/api/health`** -- Returns `200 OK` if the Next.js server is running
- **`/api/health/db`** -- Returns `200 OK` if the database connection is healthy

These are lightweight endpoints designed for frequent polling without impacting application performance.

---

## Free Tier Limits

BetterStack free tier includes:

- 10 monitors
- 3 alert integrations (email, Slack, webhook)
- 30-second check intervals
- 180 days log retention
- 1 status page

This is sufficient for the DR-NRPG platform's three core endpoints plus any additional monitors for webhook endpoints or third-party service health.

---

## Alternative Monitoring Options

| Provider | Pros | Cons |
|----------|------|------|
| **BetterStack** (recommended) | Vercel integration, logs + uptime combined, AU nodes | Paid tiers for advanced features |
| **UptimeRobot** | Simple, generous free tier (50 monitors) | No log aggregation |
| **Checkly** | Playwright-based checks, API monitoring | More complex setup |
| **Vercel Analytics** | Built into Vercel, zero config | Limited to performance, no uptime alerts |
