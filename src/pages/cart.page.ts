import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { CartLocators } from '../locators';
import { ROUTES } from '../constants';

export class CartPage extends BasePage {
  protected readonly url = ROUTES.cart;

  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId(CartLocators.title);
    this.cartItems = page.getByTestId(CartLocators.cartItem);
    this.checkoutButton = page.getByTestId(CartLocators.checkoutButton);
    this.continueShoppingButton = page.getByTestId(CartLocators.continueShoppingButton);
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeItemByName(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator(CartLocators.removeButton).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
