// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,

  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 100
    }
  },

  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'https://vermashaurya.github.io',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [['html', { open: 'never' }]],
});
