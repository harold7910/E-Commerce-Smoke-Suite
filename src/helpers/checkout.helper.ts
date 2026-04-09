import { InventoryPage, CartPage, CheckoutPage } from '../pages';

interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Performs the full checkout flow: add product → cart → fill info → finish.
 */
export async function completeCheckoutFlow(
  inventory: InventoryPage,
  cart: CartPage,
  checkout: CheckoutPage,
  productName: string,
  info: CheckoutInfo,
) {
  await inventory.goto();
  await inventory.addToCartByName(productName);
  await inventory.goToCart();
  await cart.proceedToCheckout();
  await checkout.fillInformation(info.firstName, info.lastName, info.postalCode);
  await checkout.continueToOverview();
  await checkout.finishOrder();
}
