/**
 * Env-parity helpers (DR-907).
 *
 * Pure, dependency-free helpers shared by the deep health route
 * (`app/api/health/route.ts`) and the deploy-time env-parity gate
 * (`scripts/env-parity-gate.ts`).
 *
 * SECURITY: these helpers only ever produce coarse CLASSIFICATIONS
 * (`missing` / `invalid` / `placeholder` / `set`) — never the underlying
 * env values — so their output is safe to expose on a public endpoint.
 */

/**
 * Stripe price-ID env vars the app reads (see `lib/stripe/subscription.ts`
 * and `lib/stripe/tenant-subscription.ts`). Live values are owner-gated
 * (DR-901), so the gate REPORTS classification rather than asserting
 * specific values.
 */
export const STRIPE_PRICE_ID_ENV_VARS = [
  'STRIPE_BASIC_PRICE_ID',
  'STRIPE_PRO_PRICE_ID',
  'STRIPE_ENTERPRISE_PRICE_ID',
  'STRIPE_TENANT_BASIC_PRICE_ID',
  'STRIPE_TENANT_PRO_PRICE_ID',
  'STRIPE_TENANT_ENTERPRISE_PRICE_ID',
] as const;

export type StripePriceIdEnvVar = (typeof STRIPE_PRICE_ID_ENV_VARS)[number];

export type PriceIdClassification = 'missing' | 'invalid' | 'placeholder' | 'set';

/**
 * Human-readable placeholder words that never appear in real Stripe price
 * IDs (real ones are `price_` + an opaque alphanumeric token, e.g.
 * `price_1QaBcDeFgHiJkLmNoPqR`), but DO appear in every known placeholder
 * in this repo (`price_tenant_basic_monthly`, `price_basic_monthly`,
 * `price_tenant_basic_xxx`, ...).
 */
const PLACEHOLDER_WORDS =
  /(test|placeholder|sample|example|change|todo|xxx|monthly|yearly|annual|basic|pro|enterprise|tenant)/i;

/** Real price IDs are `price_` followed by a single opaque alnum token. */
const LIVE_FORMAT = /^price_[A-Za-z0-9]+$/;

/**
 * Classify a Stripe price-ID env value WITHOUT revealing it.
 *
 * - `missing`     — unset / empty
 * - `invalid`     — set but not a `price_...` identifier
 * - `placeholder` — a `price_...` value that is clearly not a real Stripe ID
 *                   (contains placeholder words or extra `_` segments)
 * - `set`         — looks like a real Stripe price ID (cannot verify
 *                   live-mode remotely; that is owner-gated DR-901)
 */
export function classifyStripePriceId(value: string | null | undefined): PriceIdClassification {
  const v = value?.trim();
  if (!v) return 'missing';
  if (!v.startsWith('price_')) return 'invalid';
  if (PLACEHOLDER_WORDS.test(v.slice('price_'.length))) return 'placeholder';
  if (!LIVE_FORMAT.test(v)) return 'placeholder';
  return 'set';
}

/** Classify every known price-ID env var in the given environment. */
export function classifyDeployedPriceIds(
  env: Record<string, string | undefined> = process.env
): Record<StripePriceIdEnvVar, PriceIdClassification> {
  const out = {} as Record<StripePriceIdEnvVar, PriceIdClassification>;
  for (const name of STRIPE_PRICE_ID_ENV_VARS) {
    out[name] = classifyStripePriceId(env[name]);
  }
  return out;
}

export interface OriginCheck {
  ok: boolean;
  /** Coarse reason code — never echoes secrets. */
  reason?: 'missing' | 'invalid_url' | 'localhost' | 'origin_mismatch';
  /** Actual origin found (URLs here are public routing config, not secrets). */
  actualOrigin?: string;
}

/**
 * Does `url` resolve to `expectedOrigin` (e.g. `https://nrpg.business`)?
 * Flags localhost/placeholder/apex-mismatch resolutions.
 */
export function urlResolvesToOrigin(
  url: string | null | undefined,
  expectedOrigin: string
): OriginCheck {
  if (!url || !url.trim()) return { ok: false, reason: 'missing' };
  let actual: URL;
  let expected: URL;
  try {
    actual = new URL(url);
    expected = new URL(expectedOrigin);
  } catch {
    return { ok: false, reason: 'invalid_url' };
  }
  if (
    actual.hostname === 'localhost' ||
    actual.hostname === '127.0.0.1' ||
    actual.hostname === '0.0.0.0'
  ) {
    return { ok: false, reason: 'localhost', actualOrigin: actual.origin };
  }
  if (actual.origin !== expected.origin) {
    return { ok: false, reason: 'origin_mismatch', actualOrigin: actual.origin };
  }
  return { ok: true, actualOrigin: actual.origin };
}
