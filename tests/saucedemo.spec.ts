import { expect } from "@playwright/test";
import { test } from "../fixtures/test-fixtures";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

const username = "standard_user";
const password = "secret_sauce";

const productName = "Sauce Labs Backpack";
const productPrice = "$29.99";

test("Test 1 - Successful login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/inventory\.html/);

    expect(await inventoryPage.getTitle()).toContain("Products");
});

test("Test 2 - Add product to cart", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    await inventoryPage.addProductToCart(productName);

    expect(await inventoryPage.getCartCount()).toContain("1");

    await inventoryPage.goToCart();

    expect(
        await cartPage.getProductName(productName)
    ).toContain(productName);

    expect(
        await cartPage.getProductPrice(productName)
    ).toContain(productPrice);
});

test("Test 3 - Complete checkout", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    await inventoryPage.addProductToCart(productName);
    await inventoryPage.goToCart();

    await cartPage.clickCheckout();

    await checkoutPage.fillCustomerInformation(
        "Sergey",
        "Topal",
        "65000"
    );

    expect(
        await checkoutPage.getProductName(productName)
    ).toContain(productName);

    expect(
        await checkoutPage.getProductPrice(productName)
    ).toContain(productPrice);

    await checkoutPage.finishOrder();

    expect(
        await checkoutPage.getSuccessMessage()
    ).toContain("Thank you for your order!");
});