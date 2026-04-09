import { test, expect } from './fixtures/pages.fixture';
import { PRODUCTS } from '../src/constants';

test.describe('Checkout Flow', () => {
  test('complete checkout process successfully', async ({ inventoryPage, cartPage, checkoutPage, page }) => {
    // Step 1: Add product to cart
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.backpack);

    // Step 2: Go to cart
    await inventoryPage.goToCart();
    await expect(cartPage.cartItems).toHaveCount(1);

    // Step 3: Proceed to checkout
    await cartPage.proceedToCheckout();

    // Step 4: Fill checkout information
    await checkoutPage.fillInformation('Harold', 'Mejia', '10001');
    await checkoutPage.continueToOverview();

    // Step 5: Verify overview and finish
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finishOrder();

    // Step 6: Verify order complete
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout fails without filling information', async ({ inventoryPage, cartPage, checkoutPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCartByName(PRODUCTS.bikeLight);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();

    // Try to continue without filling the form
    await checkoutPage.continueToOverview();

    await expect(checkoutPage.errorMessage).toBeVisible();
  });
});
