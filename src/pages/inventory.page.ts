import { type Page, type Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { InventoryLocators } from '../locators';
import { ROUTES } from '../constants';

export class InventoryPage extends BasePage {
  protected readonly url = ROUTES.inventory;

  readonly title: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.getByTestId(InventoryLocators.title);
    this.cartBadge = page.getByTestId(InventoryLocators.cartBadge);
    this.cartLink = page.getByTestId(InventoryLocators.cartLink);
    this.inventoryItems = page.getByTestId(InventoryLocators.inventoryItem);
  }

  async addToCartByIndex(index: number) {
    const item = this.inventoryItems.nth(index);
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async addToCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartBadge.textContent() ?? '0';
  }
}
