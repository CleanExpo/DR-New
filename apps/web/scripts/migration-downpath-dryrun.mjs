#!/usr/bin/env node
/**
 * DR-908 — migration down-path dry-run.
 *
 * Proves the Prisma schema has a clean, computable ROLLBACK (down) path
 * WITHOUT touching any database. `prisma migrate diff --to-empty` asks the
 * schema engine to compute the SQL that takes the current schema back to an
 * empty database — i.e. the teardown / down-path. It only GENERATES the SQL
 * (it is never executed against a live DB here), which is exactly a dry-run.
 *
 * A positive control (the forward `--from-empty` diff) runs first so an empty
 * or broken engine output can never masquerade as a clean rollback: the down
 * diff is only trusted once the forward diff has been proven non-empty.
 *
 * Granular per-migration revert against an ephemeral clone, and the PITR
 * drill, need a real (shadow / branch) database and are owner-Supabase-gated
 * — see apps/web/docs/runbooks/db-rollback-drill.md.
 *
 * Usage:  node scripts/migration-downpath-dryrun.mjs
 * Exit 0 = clean down-path generated; exit 1 = rollback path is not clean.
 */
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const appDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const schemaPath = join(appDir, 'prisma', 'schema.prisma');

// Resolve the Prisma CLI entry point robustly (pnpm hoists it under .pnpm).
const prismaPkg = require.resolve('prisma/package.json');
const prismaBin = join(dirname(prismaPkg), require('prisma/package.json').bin.prisma);

function diff(args) {
  return execFileSync(process.execPath, [prismaBin, 'migrate', 'diff', ...args], {
    cwd: appDir,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
}

// Positive control: forward diff MUST be non-empty and create tables.
const forward = diff([
  '--from-empty',
  '--to-schema-datamodel',
  schemaPath,
  '--script',
]);
if (!/CREATE TABLE/.test(forward)) {
  console.error('FAIL: positive control — forward diff produced no CREATE TABLE.');
  console.error('The schema engine is not working; the down-path result cannot be trusted.');
  process.exit(1);
}

// Down-path dry-run: current schema -> empty database (the teardown).
const down = diff([
  '--from-schema-datamodel',
  schemaPath,
  '--to-empty',
  '--script',
]);

const dropTables = (down.match(/DROP TABLE/g) || []).length;
const createTables = (down.match(/CREATE TABLE/g) || []).length;

if (dropTables === 0) {
  console.error('FAIL: down-path generated no DROP TABLE — schema has no clean rollback.');
  process.exit(1);
}
if (createTables > 0) {
  console.error(`FAIL: down-path contains ${createTables} CREATE TABLE — not a pure teardown.`);
  process.exit(1);
}

console.log('DR-908 migration down-path dry-run: PASS');
console.log(`  forward (control): ${(forward.match(/CREATE TABLE/g) || []).length} CREATE TABLE`);
console.log(`  down-path        : ${dropTables} DROP TABLE, ${createTables} CREATE TABLE (pure teardown)`);
console.log('  database touched : none (schema-engine dry-run only)');
