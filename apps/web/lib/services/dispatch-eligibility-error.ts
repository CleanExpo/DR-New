/**
 * DR-925: shared 403 payload for surfaces gated by dispatch eligibility
 * (bid submit, bid accept/counter — any direct surface that would let an
 * ineligible contractor take on work).
 *
 * Deliberately generic: it must NOT enumerate which gate failed. Per-gate
 * detail belongs to the contractor's own status surfaces (onboarding /
 * eligibility endpoints), never to a bid error response.
 *
 * Kept in its own dependency-free module so tests and routes can import the
 * payload without pulling in the Prisma-backed gate implementation.
 */
export const DISPATCH_INELIGIBLE_ERROR = {
  reason: 'NOT_DISPATCH_ELIGIBLE',
  message:
    'You are not currently eligible to bid on or accept jobs. Complete your onboarding and keep your credentials current, then try again.',
  link: '/dashboard/contractor/onboarding',
} as const;
