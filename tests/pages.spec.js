import { test, expect } from '@playwright/test';

test.describe('Pages directory', () => {
  test('pages index renders all live cards', async ({ page }) => {
    await page.goto('/pages/');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveTitle(/Pages/);
    await expect(page.locator('[data-testid="pages-grid"]')).toBeVisible();
    const cards = page.locator('[data-testid="site-card"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(8);

    const firstHref = await page.locator('[data-testid="site-card"] a').first().getAttribute('href');
    expect(firstHref).toMatch(/^https?:\/\//);
  });

  test.describe('mobile layout', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('stacks cards into one column without overlap', async ({ page }) => {
      await page.goto('/pages/');
      await page.waitForLoadState('networkidle');

      const intro = page.locator('.intro-block');
      const firstCard = page.locator('[data-testid="site-card"]').nth(0);
      const secondCard = page.locator('[data-testid="site-card"]').nth(1);

      await expect(intro).toBeVisible();
      await expect(firstCard).toBeVisible();
      await expect(secondCard).toBeVisible();

      const introBox = await intro.boundingBox();
      const firstBox = await firstCard.boundingBox();
      const secondBox = await secondCard.boundingBox();

      expect(introBox).not.toBeNull();
      expect(firstBox).not.toBeNull();
      expect(secondBox).not.toBeNull();

      expect(Math.abs(firstBox.x - secondBox.x)).toBeLessThan(4);
      expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height - 4);
      expect(firstBox.y).toBeGreaterThan(introBox.y + introBox.height - 4);
    });
  });
});
