import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('should not have any automatically detectable WCAG A or AA violations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForURL('http://localhost:3000/start');
  });
  test('start page', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  test('login page', async ({ page }) => {
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  test('register page', async ({ page }) => {
    await page.getByTestId('register-start').click();
    await page.waitForURL('http://localhost:3000/regist');
    await expect(page.getByTestId('register-form')).toBeVisible();
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
  test('reset page', async ({ page }) => {
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await page.getByTestId('reset-password').click();
    await page.waitForURL('http://localhost:3000/reset');
    await expect(page.getByTestId('reset-form')).toBeVisible();
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
