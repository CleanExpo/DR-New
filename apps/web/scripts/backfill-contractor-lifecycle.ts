/**
 * Backfill legacy contractors into the lifecycle model (DR-882).
 *
 * Ensures every `CONTRACTOR` user has a `Contractor` row and a step-0
 * `ContractorOnboarding` row. Lifecycle rows key `contractorId` on User.id
 * (DR-879, Option B). Created onboarding rows are PENDING_START placeholders, which
 * are non-dispatch-eligible by construction (no training/verification) — so the
 * backfill cannot make any legacy contractor newly eligible.
 *
 * Idempotent: rows that already exist are skipped. Dry-run by default.
 *
 *   DRY RUN:  DATABASE_URL=... tsx scripts/backfill-contractor-lifecycle.ts
 *   APPLY:    DATABASE_URL=... tsx scripts/backfill-contractor-lifecycle.ts --apply
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const APPLY = process.argv.includes('--apply');

async function main(): Promise<void> {
  const contractorUsers = await prisma.user.findMany({
    where: { userType: 'CONTRACTOR' },
    select: { id: true, name: true, email: true },
  });

  let missingContractor = 0;
  let missingOnboarding = 0;
  let created = 0;
  const actions: string[] = [];

  for (const u of contractorUsers) {
    const [contractor, onboarding, profile] = await Promise.all([
      prisma.contractor.findUnique({ where: { userId: u.id }, select: { id: true } }),
      prisma.contractorOnboarding.findUnique({ where: { contractorId: u.id }, select: { id: true } }),
      prisma.contractorProfile.findUnique({ where: { userId: u.id }, select: { businessName: true } }),
    ]);

    if (!contractor) {
      missingContractor++;
      const businessName = profile?.businessName || `${u.name ?? 'Contractor'}'s Business`;
      actions.push(`User ${u.id} (${u.email}) -> create Contractor (businessName="${businessName}")`);
      if (APPLY) {
        await prisma.contractor.create({ data: { userId: u.id, businessName } });
        created++;
      }
    }

    if (!onboarding) {
      missingOnboarding++;
      actions.push(`User ${u.id} (${u.email}) -> create ContractorOnboarding (PENDING_START, specialization=PENDING)`);
      if (APPLY) {
        await prisma.contractorOnboarding.create({
          data: { contractorId: u.id, specialization: 'PENDING' },
        });
        created++;
      }
    }
  }

  console.log(`[backfill] mode=${APPLY ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`[backfill] contractor users scanned: ${contractorUsers.length}`);
  console.log(`[backfill] missing Contractor: ${missingContractor}`);
  console.log(`[backfill] missing ContractorOnboarding: ${missingOnboarding}`);
  for (const a of actions) console.log('  - ' + a);
  if (APPLY) console.log(`[backfill] rows created: ${created}`);
  console.log('[backfill] newly-dispatch-eligible: 0 (placeholders cannot pass eligibility gates)');
}

main()
  .catch((e) => {
    console.error('[backfill] error:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
