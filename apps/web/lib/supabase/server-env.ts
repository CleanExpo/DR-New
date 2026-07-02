/**
 * Server-side Supabase env reads that survive Next.js build-time inlining.
 *
 * WHY THIS EXISTS (P0, 2026-07-02): Next.js replaces static
 * `process.env.NEXT_PUBLIC_*` reads with their BUILD-TIME values in both
 * client AND server bundles. Production deploys are prebuilt in GitHub
 * Actions via `vercel pull && vercel build && vercel deploy --prebuilt`, and
 * the Supabase vars in the Vercel project are type "sensitive" — `vercel pull`
 * cannot read sensitive values, so at build time `NEXT_PUBLIC_SUPABASE_URL`
 * is absent and gets baked into the server bundle as undefined, even though
 * the value IS injected into the serverless runtime env. Result: server code
 * reading `process.env.NEXT_PUBLIC_SUPABASE_URL` sees nothing in production
 * (/api/health reported storage `not_configured` despite the var being set).
 *
 * IMPORTANT — the read below MUST go through a dynamic (parameter) key.
 * Deployment-bundle inspection (dpl_9nbi3Kve..., 2026-07-02) proved the
 * toolchain folds away even `env['NEXT_PUBLIC_SUPABASE_URL']` on a
 * module-level `const env = process.env` alias: the compiled output became
 * `url: d.SUPABASE_URL || void 0`. Only a lookup whose key is a runtime
 * value (function parameter, per the Next.js docs' "dynamic lookups are not
 * inlined" rule) survives. Do not "simplify" this back to a direct read.
 *
 * SERVER ONLY — never import from client components (the service-role key
 * must not reach the browser, and browsers have no runtime env anyway).
 */

/** Dynamic-key runtime env read — the key is a parameter, so no build-time
 * define/inline pass can substitute the value. Empty strings normalise to
 * undefined (Vercel can hold empty placeholders). */
function readRuntimeEnv(name: string): string | undefined {
  const value = (process.env as Record<string, string | undefined>)[name];
  return value || undefined;
}

/** Candidate names for the Supabase project URL, in priority order. */
const SUPABASE_URL_KEYS = ['SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL'];

export interface SupabaseServerEnv {
  /** Supabase project URL (SUPABASE_URL, falling back to NEXT_PUBLIC_SUPABASE_URL). */
  url: string | undefined;
  /** Service-role key (SUPABASE_SERVICE_ROLE_KEY). */
  serviceRoleKey: string | undefined;
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  let url: string | undefined;
  for (const key of SUPABASE_URL_KEYS) {
    url = readRuntimeEnv(key);
    if (url) break;
  }
  const serviceRoleKey = readRuntimeEnv('SUPABASE_SERVICE_ROLE_KEY');
  return { url, serviceRoleKey };
}
