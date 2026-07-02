/**
 * @jest-environment node
 *
 * DR-929 — NRPG_CONTRACTOR_GO_LIVE flag module.
 *
 * The contractor go-live program has been live in production since
 * 2026-07-02 (PRs #191-#219). This flag is a kill switch for an
 * ALREADY-LIVE program, not a pre-launch gate: it must default to ON so
 * deploying this change is a no-op for current behaviour. Only the literal
 * string 'false' turns it off.
 */
import { isGoLiveEnabled } from '@/lib/feature-flags/nrpg-go-live';

const ORIGINAL = process.env.NRPG_CONTRACTOR_GO_LIVE;

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
  } else {
    process.env.NRPG_CONTRACTOR_GO_LIVE = ORIGINAL;
  }
});

describe('DR-929 — isGoLiveEnabled()', () => {
  it('defaults to ON when the env var is unset (matches current live behaviour)', () => {
    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
    expect(isGoLiveEnabled()).toBe(true);
  });

  it('is ON for any value other than the literal string "false"', () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'true';
    expect(isGoLiveEnabled()).toBe(true);

    process.env.NRPG_CONTRACTOR_GO_LIVE = '1';
    expect(isGoLiveEnabled()).toBe(true);

    process.env.NRPG_CONTRACTOR_GO_LIVE = 'False'; // wrong case is not the kill value
    expect(isGoLiveEnabled()).toBe(true);
  });

  it('is OFF only when set to exactly "false"', () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    expect(isGoLiveEnabled()).toBe(false);
  });

  it('rollback proof: OFF -> back to unset restores ON', () => {
    process.env.NRPG_CONTRACTOR_GO_LIVE = 'false';
    expect(isGoLiveEnabled()).toBe(false);

    delete process.env.NRPG_CONTRACTOR_GO_LIVE;
    expect(isGoLiveEnabled()).toBe(true);
  });
});
