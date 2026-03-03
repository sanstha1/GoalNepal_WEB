import { test, expect } from '@playwright/test';

test.describe('HomePage', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/localhost:3000/);
  });

  test('should navigate to login page from navbar', async ({ page }) => {
    await page.goto('/');

    const loginLink = page.getByRole('link', { name: /login/i });

    if (await loginLink.isVisible()) {
      await loginLink.click();
      await expect(page).toHaveURL(/login/);
    }
  });

  test('should navigate to tournaments if link exists', async ({ page }) => {
    await page.goto('/');

    const tournamentsLink = page.getByRole('link', { name: /tournament/i });

    if (await tournamentsLink.isVisible()) {
      await tournamentsLink.click();
      await expect(page).toHaveURL(/tournament/);
    }
  });

  test('should navigate to news if link exists', async ({ page }) => {
    await page.goto('/');

    const newsLink = page.getByRole('link', { name: /news/i });

    if (await newsLink.isVisible()) {
      await newsLink.click();
      await expect(page).toHaveURL(/news/);
    }
  });
});