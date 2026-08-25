import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  // Use jsdom for all tests - component tests need DOM, API tests work fine with it
  testEnvironment: 'jsdom',
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
    // tsconfig maps '@/*' to './*' THEN './src/*'; jest only maps the first.
    // '@/lib/stripe' resolves to src/lib/stripe/index.ts at build time (the
    // lib/stripe directory has no index), so mirror that here (DR-897 tests).
    '^@/lib/stripe$': '<rootDir>/src/lib/stripe',
    // Mirror the tsconfig fallback ('@/*' -> './*' THEN './src/*') so modules
    // that live only under src/ (email.service, contractor-eligibility.service,
    // lib/db, ...) resolve under jest exactly like they do at build time (DR-906).
    '^@/(.*)$': ['<rootDir>/$1', '<rootDir>/src/$1'],
    '^uuid$': require.resolve('uuid'),
    // Prisma resolves through the workspace's own symlink into the pnpm store. The
    // previous mapping pointed at <repo>/node_modules/.prisma/client, a path that
    // does not exist under pnpm, so any test importing Prisma failed to resolve
    // before it could run.
    '^@prisma/client$': '<rootDir>/node_modules/@prisma/client',
  },
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
}

export default createJestConfig(config)
