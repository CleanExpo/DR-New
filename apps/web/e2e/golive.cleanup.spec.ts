import { test, expect } from '@playwright/test';
import { getPrisma, GOLIVE_MARKER } from './helpers/golive';

/**
 * Go-live proof teardown (DR-905).
 *
 * Runs as the `golive-cleanup` Playwright teardown project — Playwright
 * executes it after the `golive-proof` project finishes, PASS OR FAIL.
 *
 * It deletes every row the proof created (discovered via the deterministic
 * GOLIVE_MARKER namespace) and then ASSERTS zero residual rows. A green
 * go-live run therefore proves the test data is gone, not just that a
 * delete was attempted.
 */

test('teardown: delete all go-live namespaced rows and assert zero residual', async () => {
  const prisma = getPrisma();

  // Discover every user the proof created — the marker prefix is the
  // single source of truth for go-live test data.
  const markedUsers = await prisma.user.findMany({
    where: {
      OR: [
        { email: { startsWith: GOLIVE_MARKER } },
        { name: { startsWith: GOLIVE_MARKER } },
      ],
    },
    select: { id: true },
  });
  const userIds = markedUsers.map((u) => u.id);

  // Delete children first (ContractorOnboarding.contractorId keys on User.id
  // with no FK cascade), then the users. LoginAttempt/audit rows cascade or
  // detach via the schema's referential actions.
  await prisma.contractorOnboarding.deleteMany({ where: { contractorId: { in: userIds } } });
  await prisma.contractor.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.contractorProfile.deleteMany({ where: { userId: { in: userIds } } });
  await prisma.user.deleteMany({ where: { id: { in: userIds } } });

  // Zero-residual assertions — re-queried by MARKER, so they also catch
  // leftovers from earlier/aborted runs, FK-restrict failures, and any row
  // a test created without routing through the namespace helpers.
  expect(
    await prisma.user.count({ where: { email: { startsWith: GOLIVE_MARKER } } })
  ).toBe(0);
  expect(
    await prisma.user.count({ where: { name: { startsWith: GOLIVE_MARKER } } })
  ).toBe(0);
  expect(
    await prisma.contractor.count({
      where: { businessName: { startsWith: GOLIVE_MARKER } },
    })
  ).toBe(0);
  expect(
    await prisma.contractorOnboarding.count({
      where: { contractorId: { in: userIds } },
    })
  ).toBe(0);
  expect(
    await prisma.contractorProfile.count({
      where: { businessName: { startsWith: GOLIVE_MARKER } },
    })
  ).toBe(0);

  await prisma.$disconnect();
});
