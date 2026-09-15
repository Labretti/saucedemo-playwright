import { test, expect } from '@playwright/test';

test('Successful login', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);

    await expect(
        page.locator('[data-test="inventory-container"]')
    ).toBeVisible();

    await expect(
        page.locator('[data-test="title"]')
    ).toHaveText('Products');
});
test('Add Sauce Labs Backpack to cart', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);

    const backpack = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(backpack).toBeVisible();

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    await expect(
        page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart\.html/);

    const cartItem = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(
        cartItem.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');

    await expect(
        cartItem.locator('[data-test="inventory-item-price"]')
    ).toHaveText('$29.99');
});
test('Complete checkout', async ({ page }) => {
    await page.goto('/');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL(/inventory\.html/);

    const backpack = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await backpack.getByRole('button', { name: 'Add to cart' }).click();

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(page).toHaveURL(/cart\.html/);

    await page.locator('[data-test="checkout"]').click();

    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await page.locator('[data-test="firstName"]').fill('Sergey');
    await page.locator('[data-test="lastName"]').fill('Topal');
    await page.locator('[data-test="postalCode"]').fill('65000');

    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    const checkoutItem = page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: 'Sauce Labs Backpack' });

    await expect(
        checkoutItem.locator('[data-test="inventory-item-name"]')
    ).toHaveText('Sauce Labs Backpack');

    await expect(
        checkoutItem.locator('[data-test="inventory-item-price"]')
    ).toHaveText('$29.99');

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/checkout-complete\.html/);

    await expect(
        page.locator('[data-test="complete-header"]')
    ).toHaveText('Thank you for your order!');
});