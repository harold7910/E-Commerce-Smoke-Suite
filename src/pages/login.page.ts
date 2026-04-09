import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { LoginLocators } from '../locators';
import { ROUTES } from '../constants';

export class LoginPage extends BasePage {
  protected readonly url = ROUTES.login;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId(LoginLocators.usernameInput);
    this.passwordInput = page.getByTestId(LoginLocators.passwordInput);
    this.loginButton = page.getByTestId(LoginLocators.loginButton);
    this.errorMessage = page.getByTestId(LoginLocators.errorMessage);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
