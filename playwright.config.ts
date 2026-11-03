import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: false,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4300',
    channel: 'chrome',
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'node tests/serve.mjs',
    url: 'http://127.0.0.1:4300',
    reuseExistingServer: false
  }
});
