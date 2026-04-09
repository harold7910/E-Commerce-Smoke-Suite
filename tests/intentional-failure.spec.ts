import { test, expect } from './fixtures/pages.fixture';
import { PRODUCTS } from '../src/constants';

// Force trace recording ON for this test to generate trace.zip
test.use({ trace: 'on' });

test.describe('Intentional Failure (Trace Demo)', () => {
  test('should fail: expect non-existent product in cart', async ({ inventoryPage }) => {
    await inventoryPage.goto();

    // Add a real product
    await inventoryPage.addToCartByName(PRODUCTS.backpack);

    // INTENTIONAL FAILURE: assert the cart badge shows "5" when it actually shows "1"
    // This generates a trace.zip in test-results/ for debugging demonstration
    await expect(inventoryPage.cartBadge).toHaveText('5', { timeout: 3000 });
  });
});
