import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  reporter: 'html',
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:8080', // use 127.0.0.1 for CI reliability
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'on',
  },
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

  // Use preview server for CI
  webServer: {
  command: 'npm run preview',
  url: 'http://127.0.0.1:8080',
  reuseExistingServer: !process.env.CI,
  timeout: 180_000,
},

});
