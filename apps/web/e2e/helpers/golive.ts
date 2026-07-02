import { PrismaClient } from '@prisma/client';

/**
 * Go-live proof test-data namespace (DR-905).
 *
 * Every row the go-live proof creates is marked with the deterministic
 * GOLIVE_MARKER prefix:
 *   - User.email  starts with the marker (namespaced per test run)
 *   - User.name   starts with the marker, which also propagates into
 *     Contractor.businessName (`${name}'s Business` — see /api/auth/register)
 *
 * The `golive-cleanup` teardown project (e2e/golive.cleanup.spec.ts) finds
 * rows by this marker, deletes them, and then ASSERTS zero residual rows.
 * Never use this prefix for non-test data.
 */
export const GOLIVE_MARKER = 'e2e-golive-';

/** Unique per-test namespace so parallel/consecutive runs never collide. */
export function makeGoLiveNamespace(): string {
  return `${GOLIVE_MARKER}${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Marker-prefixed email — teardown discovers rows via startsWith(GOLIVE_MARKER). */
export function goLiveEmail(namespace: string, label: string): string {
  return `${namespace}-${label}@nrpg-e2e.test`;
}

// Matches the registerSchema policy: >=8 chars, at least one letter + one digit.
export const GOLIVE_PASSWORD = 'GoLive-Proof-2026';

let prismaSingleton: PrismaClient | undefined;

/**
 * Prisma client for asserting DB truth from the e2e process.
 * Uses the same DATABASE_URL the app under test uses (set by the CI job;
 * falls back to the local smoke DB used by playwright.config webServer).
 */
export function getPrisma(): PrismaClient {
  if (!prismaSingleton) {
    process.env.DATABASE_URL =
      process.env.DATABASE_URL ?? 'postgresql://smoke:smoke@localhost:5432/smoke_test';
    process.env.DIRECT_URL = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
    prismaSingleton = new PrismaClient();
  }
  return prismaSingleton;
}
