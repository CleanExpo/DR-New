/**
 * NRPG_CONTRACTOR_GO_LIVE kill switch (DR-929).
 *
 * The contractor go-live program (signup, ICA acceptance, training/quiz,
 * dispatch eligibility, Stripe Connect payouts, bid/accept, admin
 * claims-matching — PRs #191-#219) has been LIVE IN PRODUCTION since
 * 2026-07-02. This flag is a kill switch for an ALREADY-LIVE program, not a
 * pre-launch gate: it defaults to ON (enabled) when the env var is unset, so
 * deploying this change is a no-op for current behaviour. Setting the env
 * var to the literal string 'false' is the only way to turn the program off.
 *
 * Single source of truth: every gated surface must call isGoLiveEnabled()
 * from this module. Do not read process.env.NRPG_CONTRACTOR_GO_LIVE
 * anywhere else — a scattered read is how a future rename or typo silently
 * stops working as a kill switch.
 *
 * What this flag gates (when OFF) — stopping NEW activity only:
 *   - new contractor registrations (app/api/auth/register)
 *   - new bid submissions (app/api/contractor/requests/[id]/bid)
 *   - bid ACCEPTED/COUNTER_OFFER responses (app/api/contractor/bids/[matchId]/respond)
 *   - admin claims-matching to contractors (lib/claim-intake matchContractorsToBooking)
 *
 * What this flag deliberately does NOT gate (must keep working when OFF):
 *   - existing contractor login / session / dashboard / profile access
 *   - bid DECLINED responses (frees the job, grants nothing)
 *   - payout sweep crons (money already owed must still get paid)
 *   - claim intake itself (PublicClaim -> Booking conversion still runs;
 *     only the contractor-matching step is skipped)
 *   - the DR-905 go-live e2e proof's own signup/bid flows, which run with
 *     the flag at its default (ON) — see docs/runbooks/nrpg-kill-switch.md
 *
 * See apps/web/docs/runbooks/nrpg-kill-switch.md for how to flip this in
 * Vercel, verify it's off, and what happens to in-flight work.
 */
export function isGoLiveEnabled(): boolean {
  return process.env.NRPG_CONTRACTOR_GO_LIVE !== 'false';
}

/** Shared 503 message across every gated surface — points at the status page. */
export const GO_LIVE_KILLED_MESSAGE =
  'Contractor go-live is temporarily paused for maintenance. Existing contractor accounts, logins, and dashboards are unaffected. See the status page for updates.';
