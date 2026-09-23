import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    getProduct(productName: string) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: productName });
    }

    async getProductName(productName: string) {
        return await this
            .getProduct(productName)
            .locator('[data-test="inventory-item-name"]')
            .textContent();
    }

    async getProductPrice(productName: string) {
        return await this
            .getProduct(productName)
            .locator('[data-test="inventory-item-price"]')
            .textContent();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}