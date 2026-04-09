import { test, expect } from './fixtures/pages.fixture';
import { USERS } from '../src/constants';

// Login tests do NOT use storageState — they test the login flow itself
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login Flow', () => {
  test('successful login with standard_user', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory/);
  });

  test('locked out user shows error message', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  });

  test('login with invalid credentials shows error', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(USERS.invalid.username, USERS.invalid.password);

    await expect(loginPage.errorMessage).toBeVisible();
  });
});
