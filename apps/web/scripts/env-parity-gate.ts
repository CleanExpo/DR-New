/**
 * Env-parity gate (DR-907).
 *
 * READ-ONLY verification that a DEPLOYED environment resolves correctly.
 * Performs only GETs against public endpoints of the given base URL —
 * no secrets required, no writes, no schema access.
 *
 * Usage:
 *   npx tsx scripts/env-parity-gate.ts [baseUrl] [--expect-origin <origin>] [--json]
 *
 *   baseUrl          deployment to probe (default https://nrpg.business)
 *   --expect-origin  canonical origin auth URLs must resolve to
 *                    (default: the baseUrl's own origin)
 *   --json           also print a machine-readable JSON summary
 *
 * What it checks:
 *   HARD (exit 1 on failure):
 *     - GET /api/health is reachable, returns 200, overall status healthy,
 *       and individually asserts database / stripe / storage healthy.
 *       A deployed health route that does not report those subsystems is a
 *       failure (shallow pre-DR-907 route still deployed).
 *     - GET /api/auth/providers: every provider signinUrl/callbackUrl
 *       resolves to the expected origin (not localhost/apex/placeholder) —
 *       this is how NEXTAUTH_URL resolution is observable from outside.
 *     - GET /api/auth/csrf returns 200 with a csrfToken (auth stack up).
 *   REPORT-ONLY (WARN, never fails the gate — live Stripe price IDs are
 *   owner-gated DR-901, so the gate reports what it finds):
 *     - Stripe price-ID env classification from /api/health `config`
 *       (`missing` / `invalid` / `placeholder` / `set`).
 *     - NEXTAUTH_SECRET / redis informational checks.
 *
 * NOTE (CI wiring): running this in the deploy workflow is a follow-up for
 * after the DR-905 workflow changes land — do not add workflow steps here.
 */

import { urlResolvesToOrigin } from '../lib/monitoring/env-parity';

const REQUEST_TIMEOUT_MS = 20_000;

type Level = 'PASS' | 'FAIL' | 'WARN' | 'INFO';

interface Finding {
  level: Level;
  check: string;
  detail: string;
}

const findings: Finding[] = [];

function record(level: Level, check: string, detail: string): void {
  findings.push({ level, check, detail });
  // eslint-disable-next-line no-console
  console.log(`[${level}] ${check} — ${detail}`);
}

async function getJson(
  url: string
): Promise<{ status: number; body: unknown } | { error: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
      headers: { accept: 'application/json', 'user-agent': 'env-parity-gate/DR-907' },
    });
    let body: unknown = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }
    return { status: res.status, body };
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  } finally {
    clearTimeout(timer);
  }
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

async function checkHealth(baseUrl: string): Promise<void> {
  const result = await getJson(`${baseUrl}/api/health`);
  if ('error' in result) {
    record('FAIL', 'health.reachable', `GET /api/health failed: ${result.error}`);
    return;
  }
  record('INFO', 'health.http', `GET /api/health -> HTTP ${result.status}`);

  const body = isRecord(result.body) ? result.body : {};
  const checks = isRecord(body.checks) ? body.checks : {};

  for (const subsystem of ['database', 'stripe', 'storage'] as const) {
    const check = isRecord(checks[subsystem]) ? (checks[subsystem] as Record<string, unknown>) : null;
    if (!check || (check.status !== 'healthy' && check.status !== 'unhealthy')) {
      record(
        'FAIL',
        `health.${subsystem}`,
        'not asserted by deployed health route (shallow pre-DR-907 route still deployed)'
      );
    } else if (check.status === 'healthy') {
      record('PASS', `health.${subsystem}`, `healthy${check.backend ? ` (${check.backend})` : ''}`);
    } else {
      record('FAIL', `health.${subsystem}`, `unhealthy (reason: ${check.reason ?? 'unknown'})`);
    }
  }

  if (result.status === 200 && body.status === 'healthy') {
    record('PASS', 'health.overall', 'HTTP 200, status=healthy');
  } else {
    record('FAIL', 'health.overall', `HTTP ${result.status}, status=${String(body.status)}`);
  }

  // Stripe key mode + price-ID parity — REPORT-ONLY (owner-gated DR-901).
  const stripeCheck = isRecord(checks.stripe) ? (checks.stripe as Record<string, unknown>) : null;
  if (stripeCheck?.keyMode) {
    record(
      stripeCheck.keyMode === 'live' ? 'INFO' : 'WARN',
      'parity.stripe.keyMode',
      `deployed Stripe key mode: ${String(stripeCheck.keyMode)}`
    );
  }

  const config = isRecord(body.config) ? body.config : null;
  const priceIds = config && isRecord(config.stripePriceIds) ? config.stripePriceIds : null;
  if (!priceIds) {
    record(
      'WARN',
      'parity.stripe.priceIds',
      'deployed health route does not report price-ID classifications (pre-DR-907 deploy)'
    );
  } else {
    for (const [name, classification] of Object.entries(priceIds)) {
      const level: Level = classification === 'set' ? 'PASS' : 'WARN';
      record(level, `parity.stripe.${name}`, String(classification));
    }
  }

  const authCheck = isRecord(checks.auth) ? (checks.auth as Record<string, unknown>) : null;
  if (authCheck) {
    record(
      authCheck.status === 'configured' ? 'PASS' : 'FAIL',
      'parity.env.NEXTAUTH_SECRET',
      String(authCheck.status)
    );
  }

  const authUrl = config && isRecord(config.authUrl) ? (config.authUrl as Record<string, unknown>) : null;
  if (authUrl?.host) {
    const expectedHost = new URL(expectOrigin).host;
    record(
      authUrl.host === expectedHost ? 'PASS' : 'FAIL',
      'parity.env.NEXTAUTH_URL',
      `resolves to host ${String(authUrl.host)} (expected ${expectedHost})`
    );
  }
}

async function checkAuthProviders(baseUrl: string): Promise<void> {
  const result = await getJson(`${baseUrl}/api/auth/providers`);
  if ('error' in result) {
    record('FAIL', 'auth.providers.reachable', `GET /api/auth/providers failed: ${result.error}`);
    return;
  }
  if (result.status !== 200 || !isRecord(result.body)) {
    record('FAIL', 'auth.providers.reachable', `HTTP ${result.status}`);
    return;
  }
  const providers = Object.entries(result.body);
  if (providers.length === 0) {
    record('FAIL', 'auth.providers', 'no providers returned');
    return;
  }
  for (const [id, provider] of providers) {
    if (!isRecord(provider)) continue;
    for (const field of ['signinUrl', 'callbackUrl'] as const) {
      const url = typeof provider[field] === 'string' ? (provider[field] as string) : undefined;
      const check = urlResolvesToOrigin(url, expectOrigin);
      if (check.ok) {
        record('PASS', `auth.${id}.${field}`, `${url} resolves to ${expectOrigin}`);
      } else {
        record(
          'FAIL',
          `auth.${id}.${field}`,
          `${check.reason}${check.actualOrigin ? ` (${check.actualOrigin})` : ''} — expected ${expectOrigin}`
        );
      }
    }
  }
}

async function checkCsrf(baseUrl: string): Promise<void> {
  const result = await getJson(`${baseUrl}/api/auth/csrf`);
  if ('error' in result) {
    record('FAIL', 'auth.csrf', `GET /api/auth/csrf failed: ${result.error}`);
    return;
  }
  const ok =
    result.status === 200 &&
    isRecord(result.body) &&
    typeof result.body.csrfToken === 'string' &&
    result.body.csrfToken.length > 0;
  record(ok ? 'PASS' : 'FAIL', 'auth.csrf', `HTTP ${result.status}, csrfToken ${ok ? 'present' : 'MISSING'}`);
}

// ─── main ─────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const jsonOutput = args.includes('--json');
const originFlagIndex = args.indexOf('--expect-origin');
const positional = args.filter(
  (a, i) => !a.startsWith('--') && (originFlagIndex === -1 || i !== originFlagIndex + 1)
);
const baseUrl = (positional[0] || 'https://nrpg.business').replace(/\/+$/, '');
const expectOrigin =
  originFlagIndex >= 0 && args[originFlagIndex + 1]
    ? args[originFlagIndex + 1].replace(/\/+$/, '')
    : new URL(baseUrl).origin;

async function main(): Promise<void> {
  // eslint-disable-next-line no-console
  console.log(`env-parity-gate (DR-907) — probing ${baseUrl} (expected origin: ${expectOrigin})`);
  // eslint-disable-next-line no-console
  console.log('read-only: public GET endpoints only\n');

  await checkHealth(baseUrl);
  await checkAuthProviders(baseUrl);
  await checkCsrf(baseUrl);

  const fails = findings.filter((f) => f.level === 'FAIL');
  const warns = findings.filter((f) => f.level === 'WARN');

  // eslint-disable-next-line no-console
  console.log(
    `\nRESULT: ${fails.length === 0 ? 'PASS' : 'FAIL'} — ${fails.length} fail, ${warns.length} warn, ` +
      `${findings.filter((f) => f.level === 'PASS').length} pass`
  );
  if (jsonOutput) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify({ baseUrl, expectOrigin, findings }, null, 2));
  }
  process.exit(fails.length === 0 ? 0 : 1);
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(`env-parity-gate crashed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(2);
});
