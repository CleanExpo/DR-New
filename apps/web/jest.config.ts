import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/__tests__/**/*.test.ts',
    '<rootDir>/src/__tests__/**/*.test.tsx',
    '<rootDir>/__tests__/**/*.test.ts',
    '<rootDir>/__tests__/**/*.test.tsx',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    // Integration test references non-existent Prisma models (chatRoom, message)
    // Needs rewrite to match current schema
    'src/__tests__/integration/api\\.test\\.ts',
    // Socket server test requires @socket.io/redis-adapter which is not installed
    // Tests are placeholder stubs — skip until dependency is added
    'src/__tests__/realtime/socket-server\\.test\\.ts',
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
  },
  clearMocks: true,
  restoreMocks: true,
  verbose: true,
  forceExit: true,
}

export default createJestConfig(config)
