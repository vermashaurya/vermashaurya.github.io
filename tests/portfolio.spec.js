import { test, expect } from '@playwright/test';

const BASE_URL = 'https://vermashaurya.github.io';

test.describe('Portfolio UI Tests', () => {

  // 1️⃣ Page load
  test('homepage loads correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Shaurya Verma/);
  });

  // 2️⃣ Hero section visible
  test('hero section renders', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('h1')).toBeVisible();
  });

  // 3️⃣ Navbar navigation - Projects
  test('navigate to projects section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('[data-testid="nav-projects"]');
    await expect(page.locator('[data-testid="section-projects"]')).toBeVisible();
  });

  // 4️⃣ Navbar navigation - Skills
  test('navigate to skills section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('[data-testid="nav-skills"]');
    await expect(page.locator('[data-testid="section-skills"]')).toBeVisible();
  });

  // 5️⃣ Navbar navigation - Contact
  test('navigate to contact section', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click('[data-testid="nav-contact"]');
    await expect(page.locator('[data-testid="section-contact"]')).toBeVisible();
  });

  // 6️⃣ Resume button exists
  test('resume button is visible', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="btn-resume"]')).toBeVisible();
  });

  // 7️⃣ Download resume works
  test('download resume works', async ({ page }) => {
    await page.goto(BASE_URL);

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('[data-testid="btn-download-resume"]')
    ]);

    expect(download.suggestedFilename()).toContain('Resume');
  });

  // 8️⃣ Email button works (mailto)
  test('email button has correct mailto', async ({ page }) => {
    await page.goto(BASE_URL);

    const href = await page.locator('[data-testid="btn-email"]').getAttribute('href');
    expect(href).toContain('mailto:');
  });

  // 9️⃣ Section visibility - Experience
  test('experience section renders', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="section-experience"]')).toBeVisible();
  });

  // 🔟 Projects section content
  test('projects section contains project cards', async ({ page }) => {
    await page.goto(BASE_URL);
    const projects = page.locator('[data-testid="section-projects"] article');
    await expect(projects.first()).toBeVisible();
  });

  // 1️⃣1️⃣ Skills section content
  test('skills section renders categories', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('[data-testid="section-skills"]')).toBeVisible();
  });

  // 1️⃣2️⃣ Chess UI loads
  test('chess board and reset button exist', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('[data-testid="chess-board"]')).toBeVisible();
    await expect(page.locator('[data-testid="chess-reset"]')).toBeVisible();
  });

  // 1️⃣3️⃣ Map section loads
  test('map iframe loads', async ({ page }) => {
    await page.goto(BASE_URL);

    const iframe = page.locator('iframe');
    await expect(iframe).toBeVisible();
  });

  // 1️⃣4️⃣ External links exist
  test('contact links are present', async ({ page }) => {
    await page.goto(BASE_URL);

    await expect(page.locator('[data-testid="btn-linkedin"]')).toBeVisible();
    await expect(page.locator('[data-testid="btn-github"]')).toBeVisible();
  });

});