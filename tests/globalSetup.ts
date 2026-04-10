export default async function globalSetup() {
  // Set up test environment variables
  process.env.NODE_ENV = 'test';
  // Use TEST_DATABASE_URL if set (CI), otherwise fall back to local test DB
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL =
      process.env.TEST_DATABASE_URL || 'postgresql://test:test@localhost:5432/test_db';
  }

  console.log('\n[Global Setup] Test environment initialized');
  console.log('[Global Setup] Test database URL:', process.env.DATABASE_URL);

  // Any global test setup tasks can go here
  // For example: seed test database, start test containers, etc.
}
