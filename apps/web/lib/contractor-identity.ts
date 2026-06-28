/**
 * Contractor identity convention (DR-879, decision: Option B — 2026-06-28).
 *
 * The contractor *lifecycle* tables — `contractor_onboarding`, `nrpg_onboarding_phase`,
 * `nrpg_commitment`, `contractor_module_progress`, `contractor_assessments`,
 * `contractor_certifications`, etc. — key their `contractorId` column on the
 * **User.id**, NOT on `Contractor.id`. This is the de-facto convention already used
 * across ~24 call sites (e.g. `onboarding/start` sets `contractorId = user.id`) and
 * the frontend (`/api/onboarding/progress/${userId}`). There is a 1:1 relationship
 * between a User and their Contractor record, so User.id is a stable, sufficient key.
 *
 * We standardise on this (rather than remapping dozens of tables to `Contractor.id`)
 * because it is the existing reality and avoids a high-risk live-data migration.
 *
 * IMPORTANT for ownership checks: a contractor "owns" a lifecycle row when its
 * `contractorId === session user.id`. Do NOT resolve `Contractor.id` and compare it
 * to `contractorId` — that mismatch caused the regression reverted in PR #159.
 * Use {@link contractorKey} and {@link ownsContractorResource} to stay consistent.
 */

import type { User } from '@prisma/client';

type UserLike = Pick<User, 'id' | 'userType'>;

/**
 * The canonical key used for a contractor's lifecycle rows (`contractorId`).
 * It is the User's id.
 */
export function contractorKey(user: Pick<User, 'id'>): string {
  return user.id;
}

/**
 * Whether `user` may access a lifecycle resource whose `contractorId` is `resourceContractorId`.
 * Contractors may access only their own (`contractorId === user.id`); ADMIN/SUPER_ADMIN may access any.
 */
export function ownsContractorResource(
  user: UserLike,
  resourceContractorId: string
): boolean {
  if (user.userType === 'ADMIN' || user.userType === 'SUPER_ADMIN') return true;
  return resourceContractorId === user.id;
}
