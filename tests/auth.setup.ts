import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../src/pages';
import { USERS } from '../src/constants';

const authFile = '.auth/user.json';

setup('authenticate as standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(USERS.standard.username, USERS.standard.password);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: authFile });
});
