import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vermashaurya.github.io';

test.describe('Portfolio UI Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('homepage loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Shaurya Verma/);
  });

  test('hero section renders', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navigate to projects section', async ({ page }) => {
    await page.click('[data-testid="nav-projects"]');
    await expect(page.locator('[data-testid="section-projects"]')).toBeVisible();
  });

  test('navigate to skills section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('[data-testid="nav-skills"]');
    await expect(page.locator('[data-testid="section-skills"]')).toBeVisible();
  });

  test('navigate to contact section', async ({ page }) => {
    await page.click('[data-testid="nav-contact"]');
    await expect(page.locator('[data-testid="section-contact"]')).toBeVisible();
  });

  test('resume button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="btn-resume"]')).toBeVisible();
  });

  test('download resume works', async ({ page }) => {
    await page.goto(BASE_URL);

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('[data-testid="btn-download-resume"]')
    ]);

    expect(download.suggestedFilename()).toContain('Resume');
  });

  test('email button has correct mailto', async ({ page }) => {
    await page.goto(BASE_URL);

    const href = await page.locator('[data-testid="btn-email"]').getAttribute('href');
    expect(href).toContain('mailto:');
  });

  test('experience section renders', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="section-experience"]')).toBeVisible();
  });

  test('projects section contains project cards', async ({ page }) => {
    await page.goto(BASE_URL);
    const projects = page.locator('[data-testid="section-projects"] article');
    await expect(projects.first()).toBeVisible();
  });

  test('skills section renders categories', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="section-skills"]')).toBeVisible();
  });

  test('chess board and reset button exist', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('[data-testid="chess-board"]')).toBeVisible();
    await expect(page.locator('[data-testid="chess-reset"]')).toBeVisible();
  });

  test('map iframe loads', async ({ page }) => {
    await page.goto(BASE_URL);

    const iframe = page.locator('iframe');
    await expect(iframe).toBeVisible();
  });

  test('contact links are present', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('[data-testid="btn-linkedin"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-github"]')).toBeVisible();
  });

});