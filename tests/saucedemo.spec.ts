import { test, expect } from "../fixtures/test-fixtures";

const productName = "Sauce Labs Backpack";
const productPrice = "$29.99";

test("Test 1 - Successful login", async ({
                                             page,
                                             loginPage,
                                             inventoryPage,
                                             credentials,
                                         }) => {
    await loginPage.navigateToLoginPage();
    await loginPage.login(credentials.username, credentials.password);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText("Products");
});

test("Test 2 - Add product to cart", async ({
                                                page,
                                                loggedInPage: inventoryPage,
                                                cartPage,
                                            }) => {
    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText("1");

    await inventoryPage.goToCart();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.getProduct(productName)).toBeVisible();
    await expect.poll(() => cartPage.getProductName(productName)).toBe(productName);

    await expect.poll(() => cartPage.getProductPrice(productName)).toBe(productPrice);
});

test("Test 3 - Complete checkout", async ({
                                              page,
                                              loggedInPage: inventoryPage,
                                              cartPage,
                                              checkoutPage,
                                          }) => {
    await inventoryPage.addProductToCart(productName);

    await inventoryPage.goToCart();

    await cartPage.clickCheckout();
    await expect(page).toHaveURL(/\/checkout-step-one\.html$/);

    await checkoutPage.fillCustomerInformation(
        "Sergey",
        "Topal",
        "65000"
    );

    await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(checkoutPage.getProduct(productName)).toBeVisible();
    await expect.poll(() => checkoutPage.getProductName(productName)).toBe(productName);

    await expect.poll(() => checkoutPage.getProductPrice(productName)).toBe(productPrice);

    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(checkoutPage.successMessage).toBeVisible();
    await expect(checkoutPage.successMessage).toHaveText("Thank you for your order!");
});