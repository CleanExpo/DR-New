import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Security dependency-override hygiene (DR-934).
 *
 * The repo installs with pnpm (`pnpm.overrides`) but the npm-style top-level
 * `overrides` block must mirror the same security pins so a fallback `npm`
 * install cannot silently resolve a vulnerable transitive dependency.
 *
 * lodash prototype-pollution advisories cover BOTH the CJS `lodash` package
 * and the ESM `lodash-es` package, so both must be pinned in each block.
 */
describe('Security: dependency override parity', () => {
  // apps/web/src/__tests__/security -> repo root is five levels up.
  const rootPkgPath = join(__dirname, '..', '..', '..', '..', '..', 'package.json');
  const pkg = JSON.parse(readFileSync(rootPkgPath, 'utf8'));

  it('pins lodash-es in the npm-style overrides block', () => {
    expect(pkg.overrides['lodash-es']).toBeDefined();
  });

  it('mirrors the pnpm.overrides lodash-es pin in npm overrides', () => {
    expect(pkg.overrides['lodash-es']).toBe(pkg.pnpm.overrides['lodash-es']);
  });

  it('keeps the lodash security pins consistent across both override blocks', () => {
    for (const name of ['lodash', 'lodash-es']) {
      expect(pkg.overrides[name]).toBe(pkg.pnpm.overrides[name]);
    }
  });
});
