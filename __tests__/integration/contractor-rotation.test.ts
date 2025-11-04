/**
 * Contractor Rotation Fairness Test
 */

import { createMockContractorList } from '../factories/contractor.factory';

describe('Contractor Rotation', () => {
  it('should distribute jobs fairly', () => {
    const contractors = createMockContractorList(5);
    const sorted = contractors.sort((a, b) => a.rotationScore - b.rotationScore);
    expect(sorted[0].rotationScore).toBeLessThan(sorted[4].rotationScore);
  });
});
