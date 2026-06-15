/** @type {import('jest').Config} */
// Per UNI-2066 verify-audit §3.2, pnpm test:smoke was failing with
// 'fetch failed' (11/12 tests) because the smoke target was
// unreachable locally. Gate smoke tests to CI: locally they're a
// no-op (testPathIgnorePatterns excludes them), in CI they run.
const isCI = process.env.CI === 'true' || process.env.CI === '1';

const config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: '.',
  resolver: './jest.resolver.js',
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1',
  },
  testMatch: ['<rootDir>/tests/smoke/**/*.test.ts'],
  passWithNoTests: !isCI,
  testPathIgnorePatterns: isCI ? ['/node_modules/'] : ['<rootDir>/tests/smoke/'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          skipLibCheck: true,
        },
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
};

module.exports = config;
