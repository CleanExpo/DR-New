/**
 * Server-side Supabase env reads that survive Next.js build-time inlining.
 *
 * WHY THIS EXISTS (P0, 2026-07-02): Next.js replaces `process.env.NEXT_PUBLIC_*`
 * member expressions with their BUILD-TIME values in both client AND server
 * bundles. Production deploys are prebuilt in GitHub Actions via
 * `vercel pull && vercel build && vercel deploy --prebuilt`, and the Supabase
 * vars in the Vercel project are type "sensitive" — `vercel pull` cannot read
 * sensitive values, so at build time `NEXT_PUBLIC_SUPABASE_URL` is undefined
 * and gets inlined as undefined into the server bundle, even though the value
 * IS injected into the serverless runtime env. Result: server code that reads
 * `process.env.NEXT_PUBLIC_SUPABASE_URL` sees nothing in production
 * (/api/health reported storage `not_configured` despite the var being set).
 *
 * Reading through an aliased env object defeats the compile-time replacement
 * (per Next.js docs, only static `process.env.NEXT_PUBLIC_X` member
 * expressions are inlined), so the genuine runtime value is used.
 *
 * SERVER ONLY — never import from client components (the service-role key
 * must not reach the browser, and browsers have no runtime env anyway).
 */

const runtimeEnv = process.env as Record<string, string | undefined>;

export interface SupabaseServerEnv {
  /** Supabase project URL (SUPABASE_URL, falling back to NEXT_PUBLIC_SUPABASE_URL). */
  url: string | undefined;
  /** Service-role key (SUPABASE_SERVICE_ROLE_KEY). */
  serviceRoleKey: string | undefined;
}

/**
 * Reads process.env by scanning Object.keys() rather than a literal
 * `process.env.NEXT_PUBLIC_X` (or even a bracket-access alias) member
 * expression. Even the aliased-object bracket-access technique proved
 * insufficient here — /api/health kept reporting the URL absent at
 * runtime despite the var being set (type "sensitive", target
 * production) — so this avoids the literal inlined-name pattern
 * entirely rather than relying on which AST shapes a given bundler's
 * env-inlining pass does or doesn't match.
 */
function findEnvValue(...candidateNames: string[]): string | undefined {
  const keys = Object.keys(runtimeEnv);
  for (const name of candidateNames) {
    const key = keys.find((k) => k === name);
    if (key && runtimeEnv[key]) return runtimeEnv[key];
  }
  return undefined;
}

export function getSupabaseServerEnv(): SupabaseServerEnv {
  const url = findEnvValue('SUPABASE_URL', ['NEXT', 'PUBLIC', 'SUPABASE', 'URL'].join('_'));
  const serviceRoleKey = findEnvValue('SUPABASE_SERVICE_ROLE_KEY');
  return { url, serviceRoleKey };
}
