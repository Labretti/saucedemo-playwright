import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type Credentials = { username: string; password: string };

type PageFixtures = {
    credentials: Credentials;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;

    // Страница, на которой пользователь уже залогинен и открыт inventory
    loggedInPage: InventoryPage;
};

export const test = base.extend<PageFixtures>({
    page: async ({ page }, use) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await use(page);
    },
    credentials: async ({}, use) => {
        await use({
            username: process.env.SAUCE_USERNAME ?? "standard_user",
            password: process.env.SAUCE_PASSWORD ?? "secret_sauce",
        });
    },

    loginPage: async ({ page }, use) => await use(new LoginPage(page)),
    inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
    cartPage: async ({ page }, use) => await use(new CartPage(page)),
    checkoutPage: async ({ page }, use) => await use(new CheckoutPage(page)),

    loggedInPage: async (
        { loginPage, inventoryPage, credentials }, use) => {
        await loginPage.navigateToLoginPage();
        await loginPage.login(credentials.username, credentials.password);
        await use(inventoryPage);
    },
});

export { expect } from "@playwright/test";