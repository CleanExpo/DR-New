# BACKLOG-002 Security Verification

**Date:** 2026-06-15  
**Scope:** Safe local repository/security-control verification for BACKLOG-002.  
**Status:** PARTIAL — local controls exist, but this is **not** a completed external penetration test and dependency audit is not green.

## What was verified locally

This pass checked repository-visible controls only. It did not use production credentials, hit production systems, perform exploit attempts against a live environment, or create any new vendor account.

### Controls present in code

| Area | Evidence | Result |
|---|---|---|
| Security headers | `apps/web/middleware.ts:154-197` sets CSP, `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, and `Permissions-Policy`. | Present |
| API rate limiting | `apps/web/middleware.ts:122-152` applies per-IP API rate limiting and 429 responses with rate-limit headers. | Present |
| Route-level rate limit utilities | `apps/web/lib/api/rate-limit.ts:72-158` exports strict/standard/lenient/burst limiters. | Present |
| Redis-backed rate limiting path | `apps/web/lib/api/rate-limit.ts:177-250` contains Upstash Redis rate-limit implementation for configured production envs. | Present, env-dependent |
| Cron route auth | `apps/web/middleware.ts:102-120` requires `CRON_SECRET` for cron routes outside local development. | Present, env-dependent |
| CORS whitelist path | `apps/web/middleware.ts:199-259` applies configured CORS handling to `/api/public` routes. | Present |
| CSRF token generation | `apps/web/lib/services/csrf.service.ts:24-36` uses 32 random bytes / 256-bit token entropy. | Present |
| CSRF expiry/single-use | `apps/web/lib/services/csrf.service.ts:44-128` stores expiring tokens and deletes valid tokens after verification. | Present |
| Security policy | `SECURITY.md` documents vulnerability reporting, env secret rules, rate-limit expectations, auth/session controls, and incident response. | Present |

## Dependency audit result

Command run from `apps/web`:

```bash
pnpm audit --prod --audit-level moderate
```

Observed result:

```text
37 vulnerabilities found
Severity: 4 low | 17 moderate | 16 high
audit_exit:1
```

Representative advisories shown in the audit tail:

- `uuid` missing buffer bounds check — `GHSA-w5hq-g745-h8pq`
- `qs` remotely triggerable DoS in `qs.stringify` — `GHSA-q8mj-m7cp-5q26`
- `brace-expansion` large numeric range DoS — `GHSA-jxxr-4gwj-5jf2`
- `fabric` SVG serialization XSS in gradient colorStops — `GHSA-w22m-hvvm-xmwx`

## Result

BACKLOG-002 cannot be marked complete.

The accurate state is:

- Repository-visible security controls are partially implemented and inspectable.
- A safe local verification artifact now exists.
- Production/staging penetration testing is still not evidenced.
- Dependency audit is currently failing at moderate-or-higher severity.

## Follow-up gates

To move BACKLOG-002 from PARTIAL to VERIFIED, complete all of the following:

1. Resolve or explicitly risk-accept the current production dependency audit findings.
2. Run a staging-safe dynamic security test against the deployed app.
3. Capture a signed/dated pen-test report or internal test report with scope, methodology, findings, severity, and remediation status.
4. Re-run `pnpm audit --prod --audit-level moderate` and record a green or accepted-risk result.

Until then, any claim that BACKLOG-002 penetration testing is complete is not supported by current evidence.
