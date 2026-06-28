/**
 * Dispatch eligibility — the single ICA gate (DR-889).
 *
 * A contractor may be dispatched only if they have a CURRENT, non-superseded
 * acceptance of the live ICA version. Because eligibility is checked against
 * `ICA_VERSION`, bumping the version auto-re-gates everyone (old acceptances stop
 * qualifying) until they re-sign — and a re-sign inserts a new row (the model's
 * unique is on contractorId+version, so versions coexist).
 *
 * Scope: this module is the ICA gate only. Other criteria (insurance/cert
 * currency, suspension) can be AND-ed into these helpers later without changing
 * call sites.
 *
 * contractorId == User.id (Option B). Callers must pass the contractor's User.id.
 */
import { prisma } from '@/lib/prisma';
import { ICA_VERSION } from '@/lib/legal/ica';

/** True iff `userId` has a current-version, non-superseded ICA acceptance. */
export async function isDispatchEligible(userId: string): Promise<boolean> {
  const acceptance = await prisma.contractorAgreementAcceptance.findFirst({
    where: { contractorId: userId, version: ICA_VERSION, supersededAt: null },
    select: { id: true },
  });
  return acceptance !== null;
}

/**
 * Batch variant: given contractor User.ids, return the subset that is currently
 * dispatch-eligible. One query rather than N.
 */
export async function filterDispatchEligible(userIds: string[]): Promise<Set<string>> {
  if (userIds.length === 0) return new Set();
  const rows = await prisma.contractorAgreementAcceptance.findMany({
    where: {
      contractorId: { in: userIds },
      version: ICA_VERSION,
      supersededAt: null,
    },
    select: { contractorId: true },
  });
  return new Set(rows.map((r) => r.contractorId));
}
