/**
 * @jest-environment node
 *
 * DR-908 — migration down-path dry-run (rollback proof, DB dimension).
 *
 * The flag-off rollback is proven by the DR-929 kill-switch suites
 * (auth/go-live-kill-switch-register, dispatch/go-live-kill-switch-*). This
 * suite proves the OTHER half of DR-908: that the Prisma schema has a clean,
 * computable down-path (rollback) — driven through the real
 * scripts/migration-downpath-dryrun.mjs so the checked-in drill command is
 * what CI actually exercises, not a paraphrase of it.
 *
 * `prisma migrate diff --to-empty` generates (never executes) the teardown
 * SQL from the schema engine, so this needs no database. Granular
 * per-migration revert against an ephemeral clone + the PITR drill need a
 * real database and are owner-Supabase-gated — see
 * apps/web/docs/runbooks/db-rollback-drill.md.
 */
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const APP_DIR = join(__dirname, '..', '..', '..');
const SCRIPT = join(APP_DIR, 'scripts', 'migration-downpath-dryrun.mjs');

describe('DR-908 — migration down-path dry-run', () => {
  it('generates a clean, DROP-only rollback path and exits 0', () => {
    const out = execFileSync(process.execPath, [SCRIPT], {
      cwd: APP_DIR,
      encoding: 'utf8',
      // The script shells out to the Prisma schema engine twice.
      timeout: 120_000,
      maxBuffer: 32 * 1024 * 1024,
    });

    // Non-zero exit throws before this point, so reaching here already proves
    // the positive control (forward diff) passed and the down-path is a pure
    // teardown. Assert the human-readable proof line is present.
    expect(out).toContain('DR-908 migration down-path dry-run: PASS');
    expect(out).toMatch(/down-path\s+:\s+\d+ DROP TABLE, 0 CREATE TABLE \(pure teardown\)/);
    expect(out).toContain('database touched : none');
  }, 130_000);
});
