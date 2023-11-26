import { test, expect } from '@playwright/test';

test.describe('Profile update test', () => {
  test.beforeEach(async ({ page }) => {
    // go to start page
    await page.goto('http://localhost:3000');
    await page.waitForURL('http://localhost:3000/start');
    // go to login page
    await expect(page.getByTestId('signin-start')).toBeVisible();
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    const emailInput = page.getByTestId('email_login-form');
    const passwordInput = page.getByTestId('password_login-form');
    const signInButton = page.getByTestId('signin-button');
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(signInButton).toBeVisible();
    // input form to login
    await emailInput.fill(process.env.TEST_USER_EMAIL!);
    await passwordInput.fill(process.env.TEST_USER_PASSWORD!);
    await signInButton.click();
    await page.waitForURL('http://localhost:3000/*/home');
    await expect(page.getByTestId('signout-button')).toBeVisible();
    // got profile page
    await expect(page.getByTestId('header-usericon')).toBeVisible();
    await page.getByTestId('header-usericon').click();
    await page.waitForURL('http://localhost:3000/*/profile');
    await expect(page.getByTestId('profile-form')).toBeVisible();
  });
  test('profile page', async ({ page }) => {
    await page.screenshot({ path: 'tests/images/profile/page.png' });
  });
  test('update username', async ({ page }) => {
    const RANDOM_NUMBER = Math.floor(Math.random() * 20);
    const USERNAME_FOR_TEST = `test_${RANDOM_NUMBER}_playwright`;
    await expect(page.getByTestId('profile-username')).toBeVisible();
    await page.getByTestId('profile-username').fill(USERNAME_FOR_TEST);
    await expect(page.getByTestId('upload-profile')).toBeVisible();
    await page.getByTestId('upload-profile').click();
    await page.waitForURL('http://localhost:3000/*/home');
    await expect(page.getByTestId('header-username')).toBeVisible();
    await expect(page.getByTestId('header-username')).toHaveText(USERNAME_FOR_TEST);
    await page.screenshot({ path: 'tests/images/profile/update-username.png' });
  });
  test('update usericon', async ({ page }) => {
    const DUMMY_IMAGES = ['fox.jpg', 'sheep1.jpg', 'sheep2.jpg', 'sheep3.jpg', 'sheep4.jpg', 'sheep5.jpg'];
    const RONDOM_NUMBER = Math.floor(Math.random() * DUMMY_IMAGES.length - 1);
    const DUMMY_IMAGE = `tests/images/dummy/${DUMMY_IMAGES[RONDOM_NUMBER]}`;
    await page.setInputFiles("input[type='file']", DUMMY_IMAGE);
    await page.getByTestId('upload-profile').click();
  });
});
