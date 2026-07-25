import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  displayName: 'postgresql-rls-acceptance',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/__tests__/integration/rls-tenant-isolation.test.ts',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
}

export default createJestConfig(config)
