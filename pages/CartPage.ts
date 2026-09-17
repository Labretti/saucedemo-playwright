import { Page, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    getProduct(name: string) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: name });
    }

    async expectProduct(name: string, price: string) {
        const product = this.getProduct(name);

        await expect(product).toBeVisible();

        await expect(
            product.locator('[data-test="inventory-item-name"]')
        ).toHaveText(name);

        await expect(
            product.locator('[data-test="inventory-item-price"]')
        ).toHaveText(price);
    }

    async checkout() {
        await this.page
            .locator('[data-test="checkout"]')
            .click();
    }
}