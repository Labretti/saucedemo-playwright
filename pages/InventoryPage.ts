import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    getProduct(drinkName: string) {
        return this.page
            .locator('[data-test="inventory-item"]')
            .filter({ hasText: drinkName });
    }

    async addProductToCart(productName: string) {
        const product = this.getProduct(productName);

        await product
            .getByRole("button", { name: "Add to cart" })
            .click();
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async getTitle() {
        return await this.title.textContent();
    }

    async getCartCount() {
        return await this.cartBadge.textContent();
    }
}