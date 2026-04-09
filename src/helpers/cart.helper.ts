import { InventoryPage } from '../pages';

/**
 * Adds one or more products to the cart from the inventory page.
 */
export async function addProductsToCart(inventory: InventoryPage, productNames: string[]) {
  await inventory.goto();
  for (const name of productNames) {
    await inventory.addToCartByName(name);
  }
}
