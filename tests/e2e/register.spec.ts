import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('should load register page and display all fields', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /register/i })).toBeVisible();
    await expect(page.locator('input[name="fullName"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
    await expect(page.locator('input[name="confirmPassword"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign up/i })).toBeVisible();
    await expect(page.getByText(/login/i)).toBeVisible();
  });

  test('should register successfully with valid data', async ({ page }) => {
    const randomEmail = `santosh${Date.now()}@example.com`;

    await page.fill('input[name="fullName"]', 'Santosh Shrestha');
    await page.fill('input[name="email"]', randomEmail);
    await page.fill('input[name="password"]', 'Password123!');
    await page.fill('input[name="confirmPassword"]', 'Password123!');
    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page.locator('text=Account created successfully! Please login.')).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('should navigate to login page when clicking login link', async ({ page }) => {
    await page.getByText(/login/i).click();
    await expect(page).toHaveURL(/login/);
  });
});