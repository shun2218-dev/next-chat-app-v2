import { test, expect } from '@playwright/test';

test.describe('Routing tests before authenticated', () => {
  test.beforeEach(async ({ page }) => {
    // go to start page
    await page.goto('http://localhost:3000');
    await page.waitForURL('http://localhost:3000/start');
  });
  test('start page', async ({ page }) => {
    await page.screenshot({ path: 'tests/images/routing/start-page.png' });
    await expect(page.getByTestId('register-start')).toBeVisible();
    await expect(page.getByTestId('signin-start')).toBeVisible();
  });
  test('login page', async ({ page }) => {
    await expect(page.getByTestId('signin-start')).toBeVisible();
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/routing/login-page.png' });
  });
  test('register page', async ({ page }) => {
    await expect(page.getByTestId('register-start')).toBeVisible();
    await page.getByTestId('register-start').click();
    await page.waitForURL('http://localhost:3000/regist');
    await expect(page.getByTestId('register-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/routing/register-page.png' });
  });
  test('password reset page', async ({ page }) => {
    await expect(page.getByTestId('signin-start')).toBeVisible();
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByTestId('reset-password')).toBeVisible();
    await page.getByTestId('reset-password').click();
    await page.waitForURL('http://localhost:3000/reset');
    await expect(page.getByTestId('reset-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/routing/reset-page.png' });
  });
});
