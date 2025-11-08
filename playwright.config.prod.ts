import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: 'test-production.spec.ts',
  timeout: 60000,
  retries: 2,
  workers: 1,
  reporter: 'list',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
