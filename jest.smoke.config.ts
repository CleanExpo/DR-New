import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  rootDir: '.',
  resolver: '<rootDir>/jest.resolver.js',
  moduleNameMapper: {
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  },
  testMatch: ['<rootDir>/tests/smoke/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          skipLibCheck: true
        }
      }
    ]
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 30000,
  verbose: true,
  forceExit: true,
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};

export default config;
