# BACKLOG-003 Performance / Load-Test Verification

Date: 2026-06-15
Branch: `fix/nrpg-recruitment-dry-run-import`
Scope: safe local performance evidence only — no production traffic, no deploy, no external vendor, no new CLI install.

## Senior PM decision

BACKLOG-003 is **PARTIAL VERIFIED**.

Reason: the repo contains a k6 load-test scaffold, but `k6` is not installed on the operator machine and installing new CLIs is operator-gated. To keep moving without breaching gates, this batch added and ran a reproducible Node-based local performance smoke runner using the existing Node toolchain.

This does **not** replace full k6/staging load testing. It provides real local evidence for the critical public surfaces.

## Implemented repeatable command

```bash
cd load-tests
PERF_CONCURRENCY=5 PERF_ITERATIONS=5 BASE_URL=http://localhost:3000 \
  OUTPUT_PATH=reports/local-performance-smoke-2026-06-15-baseline.json \
  pnpm local:smoke
```

Script added:

- `load-tests/scripts/local-performance-smoke.mjs`
- package alias: `pnpm --dir load-tests local:smoke`

Endpoints measured:

- `/api/health`
- `/`
- `/claim`

Thresholds:

- `/api/health`: p95 <= 500ms, 0 failures
- `/`: p95 <= 2500ms, 0 failures
- `/claim`: p95 <= 2500ms, 0 failures

## Environment

Local app was started with non-secret local placeholders only:

```bash
cd apps/web
DATABASE_URL='postgresql://user:***@localhost:5432/nrpg_local_perf' \
NEXTAUTH_SECRET='local-...prod' \
NEXTAUTH_URL='http://localhost:3000' \
pnpm dev
```

Reason: `instrumentation.ts` correctly fails closed when required environment variables are absent.

## Results

### Baseline warm local smoke — PASS

Artifact: `load-tests/reports/local-performance-smoke-2026-06-15-baseline.json`

| Endpoint | Requests | Failures | p95 | Threshold | Result |
|---|---:|---:|---:|---:|---|
| `/api/health` | 25 | 0 | 143.49ms | <= 500ms | PASS |
| `/` | 25 | 0 | 682.99ms | <= 2500ms | PASS |
| `/claim` | 25 | 0 | 309.31ms | <= 2500ms | PASS |

Total requests: 75
Overall result: PASS

### Higher-concurrency warm observation — NOT A PASS, useful finding

Artifact: `load-tests/reports/local-performance-smoke-2026-06-15-warm.json`

| Endpoint | Requests | Failures | p95 | Observation |
|---|---:|---:|---:|---|
| `/api/health` | 50 | 1 (`429`) | 231.41ms | rate-limit surfaced at concurrency 10 |
| `/` | 50 | 0 | 1216.37ms | PASS latency |
| `/claim` | 50 | 0 | 661.71ms | PASS latency |

Interpretation: page latency was fine once warm, but health endpoint rate limiting should be reviewed before relying on `/api/health` for aggressive uptime/load probes.

### Cold/dev compile observation — NOT A PASS, expected dev-mode note

Artifact: `load-tests/reports/local-performance-smoke-2026-06-15.json`

- 0 request failures
- `/` p95 8026.13ms and `/claim` p95 4282.30ms during initial dev compile/cold path
- Warm rerun removed page latency issue

## Gates and follow-up

Still required before BACKLOG-003 can be fully verified:

1. Operator approval to install/use `k6`, or CI runner with k6 already available.
2. Staging/prod-like run of existing k6 scenarios:
   - `load-tests/scenarios/smoke.js`
   - `load-tests/scenarios/claim-submission.js`
3. Decide whether `/api/health` should bypass rate limiting for uptime probes or use a lower-frequency monitoring path.

## Status change

- Previous proof-ledger status: ❌ UNVERIFIED
- New status: ⚠️ PARTIAL
- Evidence level: local reproducible performance smoke, not full production load test
