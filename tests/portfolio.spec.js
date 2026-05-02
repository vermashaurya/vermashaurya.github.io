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

test.describe('Mobile banner — root index.html', () => {
  test('banner element is present in root index.html DOM', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#mobile-banner')).toHaveCount(1);
  });

  test('banner is visible at mobile viewport 375×812 on root page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const banner = page.locator('#mobile-banner');
    await expect(banner).toBeVisible();
  });

  test('banner is hidden at desktop viewport 1280×800 on root page', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const banner = page.locator('#mobile-banner');
    await expect(banner).toBeHidden();
  });

  test('clicking dismiss on root page hides the banner', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const banner = page.locator('#mobile-banner');
    await expect(banner).toBeVisible();
    await page.locator('#mobile-banner .mobile-banner-dismiss').click();
    await expect(banner).toBeHidden();
  });

  test('supporting text appears before CTA in DOM order', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const textIndex = await page.evaluate(() => {
      const banner = document.querySelector('#mobile-banner');
      const children = Array.from(banner.children);
      return children.findIndex(el => el.classList.contains('mobile-banner-text'));
    });
    const ctaIndex = await page.evaluate(() => {
      const banner = document.querySelector('#mobile-banner');
      const children = Array.from(banner.children);
      return children.findIndex(el => el.classList.contains('mobile-banner-cta'));
    });
    expect(textIndex).toBeLessThan(ctaIndex);
  });

  test('CTA click opens a new tab to https://portfolio.shaurya.online', async ({ page, context }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.locator('#mobile-banner .mobile-banner-cta').click(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    expect(newPage.url()).toContain('portfolio.shaurya.online');
  });
});
