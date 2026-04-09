import { test, expect } from './fixtures/pages.fixture';
import { PRODUCTS } from '../src/constants';

test.describe('Cart Flow', () => {
  test('add a product to the cart', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('add multiple products to the cart', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight);

    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('remove a product from the cart', async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeFromCartByName(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('cart displays added items correctly', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await inventoryPage.goToCart();

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItems.first()).toContainText(PRODUCTS.backpack);
  });

  test('cart is empty by default', async ({ inventoryPage }) => {
    await inventoryPage.goto();

    await expect(inventoryPage.cartBadge).not.toBeVisible();
  });

  test('cart persists after page refresh', async ({ inventoryPage, page }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await page.reload();

    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
