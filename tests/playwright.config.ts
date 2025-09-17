import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: ['**/e2e/**/*.spec.ts', '**/traffic/**/*.spec.ts'],

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Use 1 worker in CI for stability */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: 'html',

  /* Shared settings */
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:8080', // reliable for CI
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'on',
  },

  /* Configure browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  /* Start preview server before running tests */
  webServer: {
    command: 'npm run preview -- --port 8080 --host 127.0.0.1',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 180 * 1000, // allow 3 minutes for CI
  },
});
