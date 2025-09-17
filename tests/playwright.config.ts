import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: ['**/e2e/**/*.spec.ts', '**/traffic/**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:8080', // ✅ safer than localhost in CI
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'npm run preview -- --port 8080 --host 127.0.0.1',
    url: 'http://127.0.0.1:8080',   // ✅ wait for this exact URL
    timeout: 180 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
