import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CheckoutLocators } from '../locators';
import { ROUTES } from '../constants';

export class CheckoutPage extends BasePage {
  protected readonly url = ROUTES.checkoutStepOne;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId(CheckoutLocators.firstNameInput);
    this.lastNameInput = page.getByTestId(CheckoutLocators.lastNameInput);
    this.postalCodeInput = page.getByTestId(CheckoutLocators.postalCodeInput);
    this.continueButton = page.getByTestId(CheckoutLocators.continueButton);
    this.finishButton = page.getByTestId(CheckoutLocators.finishButton);
    this.completeHeader = page.getByTestId(CheckoutLocators.completeHeader);
    this.backHomeButton = page.getByTestId(CheckoutLocators.backHomeButton);
    this.errorMessage = page.getByTestId(CheckoutLocators.errorMessage);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview() {
    await this.continueButton.click();
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}
