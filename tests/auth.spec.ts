import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Authentication test', () => {
  test.beforeEach(async ({ page }) => {
    // go to start page
    await page.goto('http://localhost:3000');
    await page.waitForURL('http://localhost:3000/start');
    // go to login page
    await expect(page.getByTestId('signin-start')).toBeVisible();
    await page.getByTestId('signin-start').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await expect(page.getByTestId('email_login-form')).toBeVisible();
    await expect(page.getByTestId('password_login-form')).toBeVisible();
    await expect(page.getByTestId('signin-button')).toBeVisible();
  });
  test('signIn and signOut', async ({ page }) => {
    // input form to sign in
    await page.getByTestId('email_login-form').fill(process.env.TEST_USER_EMAIL!);
    await page.getByTestId('password_login-form').fill(process.env.TEST_USER_PASSWORD!);
    await page.getByTestId('signin-button').click();
    // sign in
    await page.waitForURL('http://localhost:3000/*/home');
    await expect(page.getByTestId('signout-button')).toBeVisible();
    await page.screenshot({ path: 'tests/images/auth/user-home_signout.png' });
    // sign out
    await page.getByTestId('signout-button').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/auth/login-page_signout.png' });
  });
  test('siginUp and signIn', async ({ page, browserName }) => {
    await page.getByTestId('register-login').click();
    await page.waitForURL('http://localhost:3000/regist');
    await expect(page.getByTestId('register-form')).toBeVisible();
    // input form to sign up
    const RANDOM_NUMBER = Math.floor(Math.random() * 1000);
    await page.getByTestId('email_register-form').fill(`playwright-${browserName}_${RANDOM_NUMBER}@gmail.com`);
    await page.getByTestId('password_register-form').fill(`${process.env.TEST_USER_KEY!}_${RANDOM_NUMBER}`);
    await page
      .getByTestId('password-confirmation_register-form')
      .fill(`${process.env.TEST_USER_KEY!}_${RANDOM_NUMBER}`);
    await page.getByTestId('register-button').click();
    // create account and sign in
    // go to profile page to set up initial user information
    await page.waitForURL('http://localhost:3000/*/profile');
    await expect(page.getByTestId('profile-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/auth/user-profile_signup.png' });
    // input profile form
    // set username
    const USERNAME_FOR_TEST = `test_${RANDOM_NUMBER}_playwright`;
    await expect(page.getByTestId('profile-username')).toBeVisible();
    await page.getByTestId('profile-username').fill(USERNAME_FOR_TEST);
    await expect(page.getByTestId('upload-profile')).toBeVisible();
    // set usericon
    const DUMMY_IMAGES = ['fox.jpg', 'sheep1.jpg', 'sheep2.jpg', 'sheep3.jpg', 'sheep4.jpg', 'sheep5.jpg'];
    const RONDOM_NUMBER = Math.floor(Math.random() * DUMMY_IMAGES.length - 1);
    const DUMMY_IMAGE = `tests/images/dummy/${DUMMY_IMAGES[RONDOM_NUMBER]}`;
    await page.setInputFiles("input[type='file']", DUMMY_IMAGE);
    await page.getByTestId('upload-profile').click();
    await page.waitForURL('http://localhost:3000/*/home');
    await expect(page.getByTestId('header-username')).toBeVisible();
    await expect(page.getByTestId('header-username')).toHaveText(USERNAME_FOR_TEST);
    await page.screenshot({ path: 'tests/images/auth/set-profile_signup.png' });
    // sign out
    await page.getByTestId('signout-button').click();
    await page.waitForURL('http://localhost:3000/login');
    await expect(page.getByTestId('login-form')).toBeVisible();
    await page.screenshot({ path: 'tests/images/auth/login-page_signup.png' });
  });
});
