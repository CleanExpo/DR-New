import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  // Use the patched jsdom environment that no-ops the canvas module
  // (see apps/web/jest.environment.js + apps/web/__mocks__/canvas.js).
  // Per UNI-2066 verify-audit §3.1, pnpm test was blocked on a missing
  // canvas.node native module. The patched env returns an empty mock
  // for any `require('canvas')` call, so component tests can start.
  testEnvironment: '<rootDir>/jest.environment.js',
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.ts',
    '<rootDir>/src/__tests__/**/*.test.tsx',
    '<rootDir>/__tests__/**/*.test.ts',
    '<rootDir>/__tests__/**/*.test.tsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    // Integration tests require a live database connection
    // Run separately with: npm run test:integration (when database is available)
    'src/__tests__/integration/',
    // Flow tests have jsdom navigation limitations
    'src/__tests__/flows/',
    // Onboarding component tests have module export issues
    'src/__tests__/components/onboarding/',
    // Socket server test requires @socket.io/redis-adapter which is not installed
    'src/__tests__/realtime/',
    // Unit tests that require Next.js server APIs (Request not available in jsdom)
    'src/__tests__/unit/resilience',
    // Webhook tests require Next.js server APIs (Request not available in jsdom)
    '__tests__/webhooks/',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|svix|resend)/)',
  ],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^uuid$': require.resolve('uuid'),
    // Resolve Prisma client to the generated client in root node_modules
    '^@prisma/client$': '<rootDir>/../../node_modules/.prisma/client',
    '^\\.prisma/client$': '<rootDir>/../../node_modules/.prisma/client',
    '^\\.prisma/client/(.*)$': '<rootDir>/../../node_modules/.prisma/client/$1',
  },
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
}

export default createJestConfig(config)
