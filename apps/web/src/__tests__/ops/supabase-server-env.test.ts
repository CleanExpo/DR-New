/**
 * @jest-environment node
 *
 * getSupabaseServerEnv (DR-907/#217 follow-up): proves the URL is found by
 * a fresh Object.keys() scan of process.env, immune to whichever exact
 * literal-string pattern a given bundler's NEXT_PUBLIC_* inlining pass
 * matches — the prior bracket-access alias (`runtimeEnv['NEXT_PUBLIC_...']`)
 * still failed live in production despite the var being set.
 */

const ORIGINAL_ENV = { ...process.env };

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  jest.resetModules();
});

describe('getSupabaseServerEnv', () => {
  it('finds a plain SUPABASE_URL when set', async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.SUPABASE_URL = 'https://plain.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';

    const { getSupabaseServerEnv } = await import('@/lib/supabase/server-env');
    expect(getSupabaseServerEnv()).toEqual({
      url: 'https://plain.supabase.co',
      serviceRoleKey: 'service-key',
    });
  });

  it('falls back to NEXT_PUBLIC_SUPABASE_URL when SUPABASE_URL is absent', async () => {
    delete process.env.SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://public.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-key';

    const { getSupabaseServerEnv } = await import('@/lib/supabase/server-env');
    expect(getSupabaseServerEnv()).toEqual({
      url: 'https://public.supabase.co',
      serviceRoleKey: 'service-key',
    });
  });

  it('reports both undefined when neither var is set', async () => {
    delete process.env.SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const { getSupabaseServerEnv } = await import('@/lib/supabase/server-env');
    expect(getSupabaseServerEnv()).toEqual({ url: undefined, serviceRoleKey: undefined });
  });

  it('ignores empty-string values (treats them as unset)', async () => {
    process.env.SUPABASE_URL = '';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://public.supabase.co';

    const { getSupabaseServerEnv } = await import('@/lib/supabase/server-env');
    expect(getSupabaseServerEnv().url).toBe('https://public.supabase.co');
  });
});
