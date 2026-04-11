/**
 * Jest configuration for smoke tests (DR-213)
 *
 * Smoke tests run against a live server at SMOKE_TEST_URL.
 * They check that pages return 200 and contain expected content markers.
 * Not mocked — requires a running Next.js server.
 */

import type { Config } from 'jest'

const config: Config = {
  displayName: 'smoke',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/smoke/**/*.smoke.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: { module: 'commonjs' } }],
  },
  testTimeout: 30000,
  // No module name mapper needed — smoke tests only use fetch/http
}

export default config
