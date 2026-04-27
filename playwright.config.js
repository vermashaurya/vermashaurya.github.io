// @ts-check
import { defineConfig } from '@playwright/test';

const port = process.env.PORT || 4173;
const localBaseURL = `http://127.0.0.1:${port}`;
const baseURL = process.env.PLAYWRIGHT_BASE_URL || localBaseURL;

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
    baseURL,
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `python3 -m http.server ${port} --bind 127.0.0.1`,
        url: localBaseURL,
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: 'pipe',
      },

  reporter: [['html', { open: 'never' }]],
});
